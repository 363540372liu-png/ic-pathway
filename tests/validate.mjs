// Offline checks only. Real HDL execution is covered by tests/hdl.py.
import assert from 'node:assert/strict';
import {readFileSync, readdirSync, existsSync} from 'node:fs';
import {dirname, extname, join, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(join(root, path), 'utf8');
const context = vm.createContext({window: {}});
for (const file of ['curriculum.js', 'models.js', 'progress.js']) {
  vm.runInContext(read(`dist/${file}`), context, {filename: file});
}
const {LESSONS, STAGES, SOURCES} = context.window.IC_COURSE;
const models = context.window.IC_MODELS;
const progress = context.window.IC_PROGRESS;
let groups = 0;
function check(name, fn) {
  fn();
  groups += 1;
  process.stdout.write(`PASS: ${name}\n`);
}
const nonempty = value => typeof value === 'string' && value.trim().length > 0;

check('24 lessons with complete learning and assessment content', () => {
  assert.equal(LESSONS.length, 24);
  assert.equal(STAGES.length, 6);
  assert.equal(new Set(LESSONS.map(lesson => lesson.id)).size, 24);
  assert.deepEqual(Array.from(STAGES, (_, index) =>
    LESSONS.filter(lesson => lesson.stage === index).length), [4, 6, 4, 3, 5, 2]);
  const labKinds = new Set(['bits', 'gates', 'mux', 'clock', 'nba', 'counter', 'fsm', 'timing']);
  const usedKinds = new Set();
  for (const stage of STAGES) {
    for (const key of ['title', 'short', 'desc']) assert(nonempty(stage[key]));
  }
  for (const lesson of LESSONS) {
    assert.match(lesson.id, /^[a-z][a-z-]*$/);
    assert(Number.isInteger(lesson.stage) && STAGES[lesson.stage]);
    for (const key of ['title', 'intro', 'trap']) assert(nonempty(lesson[key]), `${lesson.id}: ${key}`);
    assert(Number.isInteger(lesson.minutes) && lesson.minutes > 0);
    assert(lesson.goals.length >= 2 && lesson.goals.every(nonempty));
    assert(lesson.sections.length >= 3);
    for (const section of lesson.sections) {
      assert.equal(section.length, 2);
      assert(section.every(nonempty));
    }
    for (const key of ['task', 'placeholder', 'answer']) assert(nonempty(lesson.exercise[key]));
    assert(nonempty(lesson.quiz.q) && nonempty(lesson.quiz.why));
    assert.equal(lesson.quiz.options.length, 3);
    assert(lesson.quiz.options.every(nonempty));
    assert(Number.isInteger(lesson.quiz.correct));
    assert(lesson.quiz.correct >= 0 && lesson.quiz.correct < lesson.quiz.options.length);
    assert(lesson.sources.length > 0 && lesson.sources.every(key => SOURCES[key]));
    if (lesson.code) assert(nonempty(lesson.code.name) && nonempty(lesson.code.text));
    if (lesson.lab) {
      assert(labKinds.has(lesson.lab));
      usedKinds.add(lesson.lab);
    }
  }
  assert.equal(usedKinds.size, 8);
  for (const [label, url] of Object.values(SOURCES)) {
    assert(nonempty(label));
    assert.equal(new URL(url).protocol, 'https:');
  }
});

check('counter reset priority, enable, and wraparound at three widths', () => {
  for (const width of [1, 4, 8]) {
    const largest = 2 ** width - 1;
    assert.equal(models.nextCounter(largest, 1, 1, width), 0);
    assert.equal(models.nextCounter(largest, 0, 1, width), largest);
    assert.equal(models.nextCounter(largest, 1, 0, width), 0);
    assert.equal(models.nextCounter(largest, 0, 0, width), 0);
    assert.equal(models.nextCounter(0, 1, 1, width), 1);
    let value = 0;
    for (let i = 0; i < 2 ** width; i++) value = models.nextCounter(value, 1, 1, width);
    assert.equal(value, 0);
  }
  for (const width of [0, 17, 1.5, NaN]) {
    assert.throws(() => models.nextCounter(0, 1, 1, width), /Unsupported teaching width/);
  }
});

check('old-value pipeline behavior, FSM transitions, and setup boundaries', () => {
  let registers = {a: 0, b: 0};
  const inputs = [1, 0, 1];
  const expected = [[1, 0], [0, 1], [1, 0]];
  for (const [index, input] of inputs.entries()) {
    registers = models.pipeline(registers.a, input);
    assert.deepEqual([registers.a, registers.b], expected[index]);
  }
  assert.equal(models.nextFSM('IDLE', 0, 1), 'IDLE');
  assert.equal(models.nextFSM('IDLE', 1, 0), 'RUN');
  assert.equal(models.nextFSM('RUN', 0, 0), 'RUN');
  assert.equal(models.nextFSM('RUN', 1, 1), 'DONE');
  assert.equal(models.nextFSM('DONE', 1, 1), 'IDLE');
  assert.equal(models.nextFSM('invalid', 0, 0), 'IDLE');
  assert.equal(models.setupSlack(10), 1.5);
  assert.equal(models.setupSlack(8.5), 0);
  assert.equal(models.setupSlack(5), -3.5);
});

check('progress rejects unsupported files and inconsistent completion claims', () => {
  const lesson = LESSONS[0];
  const normalize = raw => progress.normalize(raw, LESSONS, 6);
  const make = entry => ({...progress.blank(), lessons: {[lesson.id]: entry}});
  for (const raw of [null, {}, {schema: 2, course: 'ic-pathway', lessons: {}},
    {schema: 1, course: 'another-course', lessons: {}}]) {
    assert.throws(() => normalize(raw), /not a progress file/);
  }
  const valid = {draft: 'My explanation', choice: lesson.quiz.correct, quizPassed: true, completed: true};
  assert.equal(normalize(make(valid)).lessons.bits.completed, true);
  for (const change of [
    {draft: ' \n\t '}, {draft: 123}, {choice: (lesson.quiz.correct + 1) % 3},
    {choice: 99}, {choice: null}, {choice: 1.5}, {quizPassed: false},
    {quizPassed: 'true'}, {completed: 'true'}
  ]) {
    assert.equal(normalize(make({...valid, ...change})).lessons.bits.completed, false);
  }
  const imported = make({...valid, draft: 'a'.repeat(20000), unrecognized: 'ignored'});
  imported.last = 'missing-lesson';
  imported.lessons.unknown = valid;
  imported.acceptance = {0: true, 1: 'true', 2: 1, 99: true};
  const result = normalize(imported);
  assert.equal(result.last, 'bits');
  assert.equal(result.lessons.bits.draft.length, 15000);
  assert.equal(result.lessons.unknown, undefined);
  assert.equal(result.lessons.bits.unrecognized, undefined);
  assert.deepEqual(Object.values(result.acceptance), [true, false, false, false, false, false]);
  assert.equal(JSON.stringify(normalize(JSON.parse(JSON.stringify(result)))), JSON.stringify(result));
});

function walk(directory) {
  return readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    if (['.git', 'node_modules', '__pycache__', 'work'].includes(entry.name)) return [];
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}
const files = walk(root);

check('JavaScript and shell/Python source syntax', () => {
  for (const path of files.filter(path => extname(path) === '.js')) {
    new vm.Script(readFileSync(path, 'utf8'), {filename: relative(root, path)});
  }
  for (const path of files.filter(path => extname(path) === '.sh')) {
    execFileSync('bash', ['-n', path], {stdio: 'pipe'});
  }
  const pythonFiles = files.filter(path => extname(path) === '.py');
  execFileSync('python3', ['-c',
    "import pathlib, sys; [compile(pathlib.Path(p).read_text(), p, 'exec') for p in sys.argv[1:]]",
    ...pythonFiles], {stdio: 'pipe'});
});

check('static assets work under a repository subpath', () => {
  const entry = read('dist/index.html');
  assert.match(entry, /<html[^>]+lang="en"/);
  const scripts = Array.from(entry.matchAll(/<script[^>]+src="([^"]+)"[^>]*>/g));
  assert.deepEqual(scripts.map(match => match[1]), [
    './curriculum.js', './models.js', './progress.js', './app.js'
  ]);
  assert(scripts.every(match => match[0].includes('defer')));
  for (const source of [entry, read('dist/app.js')]) {
    assert.doesNotMatch(source, /(?:src|href)=["']\//);
    for (const [, asset] of source.matchAll(/(?:src|href)=["'](\.\/[^"']+)["']/g)) {
      assert(existsSync(join(root, 'dist', asset)), `Missing asset: ${asset}`);
    }
  }
});

check('reference RTL and documentation links match the exported files', () => {
  const counter = LESSONS.find(lesson => lesson.id === 'counter');
  assert.equal(counter.code.text.trim(), read('lab/rtl/counter.v').trim());
  for (const path of files.filter(path => extname(path) === '.md')) {
    const markdown = readFileSync(path, 'utf8');
    for (const [, target] of markdown.matchAll(/\[[^\]\n]+\]\(([^\s)]+)\)/g)) {
      if (/^(?:https?:|mailto:|#)/.test(target)) continue;
      const local = target.split('#')[0];
      assert(existsSync(resolve(dirname(path), local)), `Broken link in ${relative(root, path)}: ${target}`);
    }
  }
});

check('English shipped text and exclusion of private hosting data', () => {
  assert(!existsSync(join(root, '.openai')), 'Private hosting directory must not be exported');
  for (const path of files) {
    if (extname(path) === '.zip') continue;
    const contents = readFileSync(path, 'utf8');
    assert.doesNotMatch(contents, /\p{Script=Han}/u, `Non-English text in ${relative(root, path)}`);
    assert.doesNotMatch(contents, /appgprj_[0-9a-f]{8,}/i, `Private project ID in ${relative(root, path)}`);
    assert.doesNotMatch(contents, /https:\/\/[a-z0-9.-]*chatgpt\.site/i, `Private host in ${relative(root, path)}`);
    assert.doesNotMatch(contents, /gh[pousr]_[a-zA-Z0-9]{30,}/, `Credential-like string in ${relative(root, path)}`);
    assert.doesNotMatch(contents, /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/);
  }
});

process.stdout.write(`\n${groups} offline check groups passed. No browser or HDL simulator was run by this command.\n`);
