import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const c=vm.createContext({window:{}});for(const f of ['hdl-content','textbook-content','textbook-depth','textbook-model','timing','textbook','hdl'])vm.runInContext(fs.readFileSync('public/'+f+'.js','utf8'),c);
const M=c.window.IC_TEXTBOOK_MODEL,L=c.window.HDL_LESSONS;
test('nonblocking pipeline captures old a while blocking comparison collapses stages',()=>{
 const s=M.initial();let n=M.step('pipeline',s,{d:1});assert.equal(n.after.a,1);assert.equal(n.after.b,0);assert.equal(s.a,0);
 n=M.step('pipeline',n.after,{d:0});assert.equal(n.after.a,0);assert.equal(n.after.b,1);
 assert.equal(M.step('pipeline',s,{d:1,blocking:true}).after.b,1);
});
test('counter reset priority, hold, rollover and FSM edge commit',()=>{
 let s={...M.initial(),q:15};assert.equal(M.step('counter',s,{en:1}).after.q,0);assert.equal(M.step('counter',s,{en:0}).after.q,15);
 assert.equal(M.step('counter',s,{rst_n:0,en:1}).after.q,0);
 const start=M.step('fsm',M.initial(),{start:1});assert.equal(start.before.state,0);assert.equal(start.after.state,1);
 assert.equal(M.step('fsm',start.after,{finish:1}).after.busy,0);
});
test('six deep lessons provide real scoped practices and complete mastery requirements',()=>{
 const ids=['branches','edges','nba','counter','fsm','sv-always'];
 for(const id of ids){
  const l=L.find(l=>l.id===id);assert.equal(l.lab.exercises.length,5);
  assert.equal(new Set(l.lab.exercises.map(e=>e.type)).size,5);
  for(const e of l.lab.exercises)assert.ok(e.prompt.length>10);
  const st={done:false,passed:true,draft:'independent work',activities:{}};
  assert.equal(M.level(l,st),'understood');assert.equal(M.canComplete(l,st),false);
  for(const [i,e] of l.lab.exercises.entries())st.activities[i]=['implementation','analysis'].includes(e.kind)?{revision:e.revision,draft:'my implementation and evidence',reviewed:true}:{revision:e.revision,choice:e.correct,answers:e.blanks?.map(b=>b.accepted[0]),response:e.accepted?.[0],reason:'my counterexample and correction',passed:true};
  assert.equal(M.canComplete(l,st),true);st.done=true;assert.equal(M.level(l,st),'automatic-checked');
  const norm=M.normalizeActivities(l,st.activities);assert.equal(M.canComplete(l,{activities:norm}),true);
  const first=l.lab.exercises.findIndex(e=>e.options);norm[first].choice=99;assert.equal(M.normalizeActivities(l,norm)[first].passed,false);
 }
});
test('all published knowledge points map to real reading sections',()=>{
 for(const l of L){assert.ok(l.knowledge.length>=3);for(const k of l.knowledge)assert.ok(['concept','code','practice'].includes(k.id));}
});
test('authored deeper explanations remain available in every lesson',()=>{for(const l of L){assert.ok(l.furtherReading.length>=2,l.id);assert.ok(Array.isArray(l.lab.syntax),l.id);assert.ok(Object.keys(l.lab.lines).length>=3,l.id);}});
test('timing budget checks max/min independently, positive skew helps setup and hurts hold',()=>{
 const T=c.window.IC_TIMING,p={period:10,skew:0.5,cqMax:1,cqMin:.2,delayMax:6,delayMin:.4,setup:1,hold:.2,uSetup:.2,uHold:.1};
 const b=T.budget(p);assert.ok(Math.abs(b.setup-2.3)<1e-9);assert.ok(Math.abs(b.hold+.2)<1e-9);
 assert.equal(T.budget({...p,period:20}).hold,b.hold);
 assert.ok(T.budget({...p,skew:1}).setup>b.setup);assert.ok(T.budget({...p,skew:1}).hold<b.hold);
 assert.ok(T.budget({...p,cqMin:2}).error);assert.ok(T.budget({...p,period:0}).error);
 assert.equal(T.windowCheck(9),'setup');assert.equal(T.windowCheck(10.5),'hold');assert.equal(T.windowCheck(10),'edge');assert.equal(T.windowCheck(8),'safe');
 for(let i=0;i<16;i++){const d=T.gray(i)^T.gray((i+1)&15);assert.equal(d&(d-1),0);assert.notEqual(d,0);}
});
test('downloadable project RTL exactly matches canonical teaching modules',()=>{
 for(const id of ['memory','fifo-project','uart-project','integration','capstone'])assert.equal(fs.readFileSync('public/rtl-lab/'+id+'.sv','utf8').trim(),L.find(l=>l.id===id).code.trim());
 assert.ok(fs.existsSync('public/rtl-lab/rtl-projects.zip'));
});
