import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const c=vm.createContext({window:{}});for(const f of ['catalog','examples','content','neutral','foundation','progress','view'])vm.runInContext(fs.readFileSync(`public/fpga/${f}.js`,'utf8'),c);
const {IC_FPGA_CATALOG:C,IC_FPGA_CONTENT:D,IC_FPGA_PROGRESS:P,IC_FPGA:V}=c.window;
const fresh=()=>({schema:1,course:'ic-pathway',lessons:{},...P.normalize({})});
function unlockMain(p,n){for(const id of P.MAIN.slice(0,n))p.lessons[id]={completed:true};}
function ready(p,id){p.fpga.lessons[id]={...P.blankLesson(),guided:'guided answer',independent:'independent implementation',choices:D[id].quiz.map(q=>q.correct),quizPassed:true,checks:[true,true,true]};}
test('every FPGA lesson contains real teaching, independent practice, quiz, RTL and valid reference',()=>{
 assert.equal(C.modules.length,27);for(const m of C.modules){const d=D[m.id];assert.ok(d);for(const k of ['goals','concepts','diagram','steps','mistakes','debug','quiz','completion'])assert.ok(d[k].length>=2,`${m.id} ${k}`);assert.ok(d.hardware.length>20);assert.ok(d.expected.length>15);assert.ok(d.concepts.every(x=>x[1].length>80));assert.ok(d.guided.task.length>20&&d.independent.task.length>20);for(const path of [d.code,d.tb,d.additional].filter(Boolean)){assert.equal(c.window.IC_FPGA_EXAMPLES[path],fs.readFileSync('public/fpga/'+path,'utf8'));}assert.equal(d.quiz.length,2);assert.ok(d.quiz.every(q=>q.correct>=0&&q.correct<q.options.length));assert.ok(c.window.IC_FPGA_SOURCES[d.source]);}
});
test('prerequisites enforce full main prefix and previous practice; no completion through locked routes',()=>{
 const p=fresh();ready(p,'01');assert.equal(P.complete(p,'01'),false);unlockMain(p,7);assert.equal(P.complete(p,'01'),false);unlockMain(p,8);assert.equal(P.complete(p,'01'),true);ready(p,'02');assert.equal(P.complete(p,'02'),false);unlockMain(p,9);assert.equal(P.complete(p,'02'),true);p.lessons.bits.completed=false;assert.equal(P.prerequisites(p,'02').open,false);assert.equal(p.fpga.lessons['02'].completed,true,'re-locking preserves existing record');
});
test('all module boundaries follow catalogue and main remains unchanged',()=>{
 const p=fresh();unlockMain(p,24);const before=JSON.stringify(p.lessons);for(const m of C.modules){ready(p,m.id);assert.equal(P.prerequisites(p,m.id).open,true);assert.equal(P.complete(p,m.id),true);}assert.equal(JSON.stringify(p.lessons),before);const restored={...p,...P.normalize(JSON.parse(JSON.stringify(p)))};assert.equal(P.status(restored,'21'),'completed');restored.fpga.lessons['21'].choices[0]=(D['21'].quiz[0].correct+1)%3;assert.equal(P.normalize(restored).fpga.lessons['21'].completed,false);
});
test('legacy defaults preserve original data; malformed extension records are bounded',()=>{
 const old={schema:1,course:'ic-pathway',lessons:{bits:{completed:true,draft:'original'}},ultra:{rtl:{draft:'keep'}}},before=JSON.stringify(old);const out=P.normalize(old);assert.equal(JSON.stringify(old),before);assert.equal(Object.keys(out.fpga.lessons).length,0);assert.equal(Object.keys(out.ultraFPGA).length,0);assert.equal(P.normalize({fpga:{lessons:{'01':{completed:true,quizPassed:true}}}}).fpga.lessons['01'].completed,false);
});
test('Ultra requires both curricula, complete evidence, and independent attempts for readiness',()=>{
 const p=fresh();unlockMain(p,24);assert.equal(P.ultraOpen(p,'led'),false);for(const m of C.modules){ready(p,m.id);P.complete(p,m.id);}assert.equal(P.ultraOpen(p,'led'),true);assert.equal(P.ultraOpen(p,'uart'),true);const a={spec:'requirements and interfaces with explicit reset',rtl:'RTL independently authored implementation record',tb:'self checking testbench with boundary test cases',evidence:'actual tools reports and board validation details',checks:Array(9).fill(true),hints:0,passed:true,at:new Date().toISOString()};assert.equal(P.ultraEligible(a),true);assert.equal(P.ultraEligible({...a,evidence:'pending'}),false);assert.equal(V.readiness(p).count,0);for(const [id]of V.skills)p.fpga.readiness[id]={confirmed:true,evidence:'Actual validation evidence with report and board details'};assert.equal(V.readiness(p).status,'Basic FPGA Ready');for(const u of C.ultras)p.ultraFPGA[u.id]={attempts:[a]};assert.equal(V.readiness(p).status,'Competition Project Ready');p.ultraFPGA.led.attempts=[{...a,hints:1}];assert.equal(V.readiness(p).status,'Basic FPGA Ready');
});
test('new routes are unambiguous and leave old RTL Ultra routes alone',()=>{for(const route of ['fpga','fpga-readiness','ultra-fpga','ultra-fpga-led','ultra-fpga-uart',...C.modules.map(m=>'fpga-'+m.id)])assert.equal(V.isRoute(route),true);for(const route of ['bits','ultra','ultra-rtl','fpga-99',undefined])assert.equal(V.isRoute(route),false);});
