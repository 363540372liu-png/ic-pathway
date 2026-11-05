import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const c=vm.createContext({window:{}});for(const f of ['catalog','examples','content','neutral','progress','view'])vm.runInContext(fs.readFileSync(`public/fpga/${f}.js`,'utf8'),c);
const {IC_FPGA_CATALOG:C,IC_FPGA_CONTENT:D,IC_FPGA_PROGRESS:P,IC_FPGA:V,IC_FPGA_TOOLS:T}=c.window;
const fresh=()=>({schema:1,course:'ic-pathway',lessons:{},...P.normalize({})});
function enter(p){p.fpga.entry={passed:true,choices:P.entryQuestions.map(q=>q.correct)};}
function ready(p,id){p.fpga.lessons[id]={...P.blankLesson(),guided:'guided reasoning',independent:'independent implementation',choices:D[id].quiz.map(q=>q.correct),quizPassed:true,checks:[true,true,true]};}
test('27 stable chapters teach nine engineering phases with exact available source examples',()=>{
 assert.equal(C.modules.length,27);assert.equal(C.phases.length,9);assert.equal(new Set(C.modules.map(m=>m.id)).size,27);for(let n=1;n<=27;n++)assert.ok(C.modules.some(m=>m.id===String(n).padStart(2,'0')));
 for(const m of C.modules){const d=D[m.id];assert.ok(d.opening.length>15);assert.ok(d.concepts.length>=2);assert.ok(d.concepts.every(x=>x[1].length>=2&&x[1].every(p=>p.length>30)),m.id);assert.ok(d.steps.length>=2&&d.mistakes.length>=1);assert.ok(d.independent.task&&d.guided.task);assert.equal(d.quiz.length,2);for(const q of d.quiz)assert.ok(q.why&&q.correct>=0&&q.correct<q.options.length);for(const path of [d.code,d.tb].filter(Boolean))assert.equal(c.window.IC_FPGA_EXAMPLES[path],fs.readFileSync('public/fpga/'+path,'utf8'));}
 assert.ok(fs.existsSync('public/fpga/uart-led-workflow.zip'));
});
test('pretest admits existing RTL learners without the original 24-course lock',()=>{
 const p=fresh();const late=C.modules.find(m=>m.phase>=2);assert.equal(P.prerequisites(p,late.id).open,true);ready(p,late.id);assert.equal(P.complete(p,late.id),false);enter(p);assert.equal(P.complete(p,late.id),true);assert.equal(Object.keys(p.lessons).length,0);
});
test('new completion revalidates quizzes; legitimate historical completion survives changed material',()=>{
 const p=fresh();enter(p);for(const m of C.modules){ready(p,m.id);assert.equal(P.complete(p,m.id),true);}const n=P.normalize(p);assert.equal(n.fpga.lessons['21'].completed,true);n.fpga.lessons['21'].choices[0]=99;assert.equal(P.normalize(n).fpga.lessons['21'].completed,false);
 const old={fpga:{lessons:{'01':{guided:'old guided',independent:'old independent',quizPassed:true,choices:[0,0],checks:[true,true,true],completed:true}}}};const a=P.normalize(old);assert.equal(a.fpga.lessons['01'].completed,true);assert.equal(P.normalize(a).fpga.lessons['01'].completed,true);assert.equal(P.normalize({fpga:{lessons:{'01':{completed:true,quizPassed:true}}}}).fpga.lessons['01'].completed,false);
});
test('simulation and board evidence stay distinct and do not assert commercial tool validation',()=>{
 const p=fresh();assert.equal(p.fpga.mode,'simulation');enter(p);assert.equal(P.ultraOpen(p,'led'),true);const a={spec:'requirements',rtl:'RTL',tb:'testbench',evidence:'simulation report',checks:[true,true,true,true,true,true,false,false,false],mode:'simulation'};assert.equal(P.ultraEligible(a),true);assert.equal(P.ultraEligible({...a,mode:'board'}),false);assert.equal(P.ultraEligible({...a,evidence:''}),false);
 for(const key of ['vivado','quartus','efinity']){assert.ok(T[key].version&&T[key].verified);assert.ok(Object.keys(T[key].stages).length>=8);assert.ok(T[key].source.startsWith('https://'));}assert.equal(V.readiness(p).count,0);
});
test('old FPGA IDs, self-test, stages and RTL routes remain resolvable',()=>{for(const route of ['fpga','fpga-entry','fpga-readiness','ultra-hub','ultra-fpga',...C.modules.map(m=>'fpga-'+m.id)])assert.equal(V.isRoute(route),true);for(const route of ['bits','ultra-rtl','fpga-99',undefined])assert.equal(V.isRoute(route),false);});
test('fresh app progress initializes a usable tool and mode before any saved record exists',()=>{
 const source=fs.readFileSync('public/app.js','utf8'),declaration=source.match(/const blank=\(\)=>[^\n]+/)[0];
 const p=vm.runInContext(declaration+'\nblank()',c);assert.equal(p.fpga.mode,'simulation');assert.equal(p.fpga.tool,'vivado');assert.ok(T[p.fpga.tool].stages[1]);assert.equal(p.fpga.schema,2);
});
