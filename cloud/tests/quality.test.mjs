import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const c=vm.createContext({window:{}});for(const f of ['hdl-content','textbook-content','textbook-depth','textbook-model','hdl','progress-compat'])vm.runInContext(fs.readFileSync('public/'+f+'.js','utf8'),c);
const L=c.window.HDL_LESSONS,M=c.window.IC_TEXTBOOK_MODEL,canon=x=>x.replace(/\s+/g,'');
test('56 lessons: unique checkpoints, real task schemas, earlier prerequisites and authored reasoning',()=>{
 assert.equal(L.length,56);const stems=new Set(),prompts=new Set();
 for(const [index,l] of L.entries()){
  assert.ok(l.concept.length>=2&&l.concept.every(p=>p.length>=35),l.id);assert.ok(l.narrative,l.id);
  assert.ok(!/什么证据最能支持/.test(l.q),l.id);assert.ok(!/先明确规格、输入边界和验证依据/.test(l.trap),l.id+' generic warning');assert.ok(!stems.has(canon(l.q)),l.id+' repeated checkpoint');stems.add(canon(l.q));
  for(const id of l.prerequisites)assert.ok(L.findIndex(x=>x.id===id)>=0&&L.findIndex(x=>x.id===id)<index,l.id+' prerequisite '+id);
  for(const d of l.conceptDependencies){assert.ok(d.concept.trim());assert.ok(L.findIndex(x=>x.id===d.taughtIn)>=0&&L.findIndex(x=>x.id===d.taughtIn)<index,l.id+' concept '+d.concept);}
  assert.deepEqual(Array.from(l.conceptReview.prior),Array.from(l.prerequisites));
  assert.ok(l.lab.exercises.length>=2&&l.lab.exercises.length<=5,l.id);
  for(const x of l.lab.exercises){
   assert.ok(!prompts.has(canon(x.prompt)),l.id+' repeated activity');prompts.add(canon(x.prompt));assert.ok(Number.isInteger(x.revision)&&x.revision>=2);assert.ok(x.prompt.trim());
   assert.ok(['choice','fill','repair','answer','implementation','analysis'].includes(x.kind),l.id);
   if(x.kind==='choice'){assert.ok(x.options?.length>=2);assert.ok(x.correct>=0&&x.correct<x.options.length);assert.ok(x.explain);}
   else assert.equal(x.options,undefined,l.id+' non-choice has options');
   if(x.kind==='fill'){assert.ok(x.template.includes('___'));assert.equal((x.template.match(/___/g)||[]).length,x.blanks.length);for(const b of x.blanks)assert.ok(b.accepted.length&&b.accepted.every(a=>a.trim()));}
   if(x.kind==='repair'){assert.ok(x.starter.trim()&&x.solution.trim());assert.notEqual(canon(x.starter),canon(x.solution));assert.ok(!/^\s*\/\//.test(x.solution));assert.ok(x.accepted.length);}
   if(x.kind==='answer')assert.ok(x.accepted.length&&x.explain);
   if(x.type==='波形分析'){assert.ok(x.wave?.caption.length>15);assert.ok(x.wave.signals.length>=2);const n=x.wave.signals[0][1].length;assert.ok(x.wave.signals.every(s=>s[1].length===n));}
   if(x.kind==='implementation'){assert.ok(x.interface.trim(),l.id+' missing interface');assert.ok(x.tests.length&&x.solution.trim());}
  }
 }
});
test('closed tasks require actual answers; old multiple-choice responses remain history',()=>{
 for(const l of L)for(const [i,x] of l.lab.exercises.entries()){
  if(['implementation','analysis'].includes(x.kind))continue;
  const wrong={revision:2,choice:99,answers:['wrong'],response:'wrong'};assert.equal(M.evaluate(x,wrong),false,l.id);
  const a={revision:x.revision,choice:x.correct,answers:x.blanks?.map(b=>b.accepted[0]),response:x.accepted?.[0],passed:true};assert.equal(M.evaluate(x,a),true,l.id);
  assert.equal(M.normalizeActivities(l,{[i]:a})[i].passed,true);
  const old={choice:0,passed:true,draft:'older answer',reviewed:true};const restored=M.normalizeActivities(l,{[i]:old})[i];assert.equal(restored.passed,false);assert.equal(restored.reviewed,false);assert.equal(restored.history.draft,'older answer');
 }
});
test('editorial quiz changes preserve old legitimate mastery without passing a revised checkpoint',()=>{
 const l=L.find(l=>l.quizRevision===2),old={[l.id]:{choice:l.previousCorrect,passed:true,done:true,draft:'previous independent work',activities:{0:{choice:0,passed:true}}}};
 const n=c.window.IC_HDL.normalize(old)[l.id];assert.equal(n.done,true);assert.equal(n.passed,false);assert.equal(n.historicalMastery,true);assert.equal(n.activities[0].passed,false);
 assert.equal(c.window.IC_HDL.normalize({[l.id]:n})[l.id].done,true);
});
test('retired project links map safely and old project payload stays opaque',()=>{
 for(const id of ['competition','milestones','project-journal','skills','system-integration','ultra-image','ultra-image-concept','ultra-image-stream','edge-01'])assert.equal(c.window.IC_PROGRESS_COMPAT.isRetiredRoute(id),true);
 assert.equal(c.window.IC_PROGRESS_COMPAT.isRetiredRoute('hdl-fifo-project'),false);const old={competition:{journal:[{text:'old note'}]}},out={};c.window.IC_PROGRESS_COMPAT.preserve(old,out);assert.equal(JSON.stringify(old.competition),JSON.stringify(out.competition));
 assert.equal(fs.existsSync('public/project'),false);assert.ok(!fs.readFileSync('public/index.html','utf8').includes('/project/'));
});
test('teaching source styles use the shared scale instead of unreadable 7–12px declarations',()=>{
 for(const name of ['style.css','hdl-study.css','textbook.css']){const s=fs.readFileSync('public/'+name,'utf8');assert.ok(!/font(?:-size)?:[^;}]*\b(?:[7-9]|1[012])px/.test(s),name);assert.ok(s.includes('var(--font-'),name);}
 const s=fs.readFileSync('public/reading.css','utf8');for(const variable of ['body','code','exercise','caption','table','ui'])assert.ok(s.includes('--font-'+variable));assert.ok(s.includes('body.reading-large'));
});
