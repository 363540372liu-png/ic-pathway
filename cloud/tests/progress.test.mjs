import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {DatabaseSync} from 'node:sqlite';
import worker from '../worker/index.js';
const context=vm.createContext({window:{}});
for(const file of ['curriculum','enrichment','progress-compat','ultra','fpga/catalog','fpga/examples','fpga/content','fpga/neutral','fpga/progress','fpga/view','hdl-content','textbook-content','textbook-depth','textbook-model','timing','textbook','hdl'])vm.runInContext(fs.readFileSync(`public/${file}.js`,'utf8'),context);
const {LESSONS}=context.window.IC_COURSE;
test('24 stable lessons have two added questions and a substantive code task; seven Ultra stages refer to valid lessons',()=>{
 assert.equal(LESSONS.length,24);
 for(const l of LESSONS){assert.equal(l.extraQuizzes.length,2);assert.ok(l.deep.explain.length>60);assert.ok(l.deep.walk.length>60);assert.ok(l.extraExercise.starter);assert.ok(l.extraExercise.answer);for(const q of l.extraQuizzes)assert.ok(q.correct>=0&&q.correct<q.options.length);}
 assert.equal(context.window.IC_ULTRA.stages.length,7);
 for(const s of context.window.IC_ULTRA.stages){assert.equal(s.range[1]-s.range[0],4);assert.ok(s.after<=24);s.review.forEach(id=>assert.ok(LESSONS.some(l=>l.id===id)));}
});
const db=new DatabaseSync(':memory:');db.exec(fs.readFileSync('drizzle/0000_foamy_luckman.sql','utf8'));
const env={DB:{prepare(sql){
 return {bind(...values){
  return {first:async()=>db.prepare(sql).get(...values),run:async()=>({meta:{changes:db.prepare(sql).run(...values).changes}})};
 }};
}}};
const data={schema:1,course:'ic-pathway',last:'sequential',lessons:{bits:{completed:true,draft:'旧解答',choice:1,quizPassed:true}},acceptance:{},ultra:{}};
async function call(user,method='GET',body,origin='https://course.test'){
 const headers={};if(user)headers['oai-authenticated-user-id']=user;
 if(body){headers.Origin=origin;headers['Content-Type']='application/json';}
 return worker.fetch(new Request('https://course.test/api/progress',{method,headers,body:body?JSON.stringify(body):undefined}),env);
}
test('authenticated progress persists, isolates users, and rejects stale concurrent writes',async()=>{
 assert.equal((await call(null)).status,401);
 assert.equal((await call('alice','PUT',{revision:0,data},'https://other.test')).status,403);
 assert.equal((await call('alice','PUT',{revision:0,data})).status,200);
 const loaded=await (await call('alice')).json();assert.deepEqual(loaded.data,data);assert.equal(loaded.revision,1);
 assert.equal((await (await call('bob')).json()).data,null);
 assert.equal((await call('alice','PUT',{revision:0,data:{...data,last:'bits'}})).status,409);
 assert.equal((await (await call('alice')).json()).data.last,'sequential');
 assert.equal((await call('alice','PUT',{revision:1,data:{...data,last:'ultra-rtl'}})).status,200);
 assert.equal((await (await call('alice')).json()).data.last,'ultra-rtl');
});
test('old completed lessons and extra answers survive normalizing',()=>{
 const source=fs.readFileSync('public/app.js','utf8');
 const blank=()=>({schema:1,course:'ic-pathway',last:'bits',lessons:{},acceptance:{},ultra:{}});
 const normalization=source.slice(source.indexOf('function normalize('),source.indexOf('try{const raw=localStorage'));
 const ctx=vm.createContext({LESSONS,blank,CHECKS:Array(6),window:context.window});vm.runInContext(normalization,ctx);
 const old=ctx.normalize(data);assert.equal(old.lessons.bits.completed,true);assert.equal(old.last,'sequential');
 old.lessons.bits.extraDraft='assign a=4\'d11;';old.lessons.bits.extraChoices=[0,1];old.lessons.bits.extraPassed=[true,true];
 const restored=ctx.normalize(old);assert.equal(restored.lessons.bits.extraDraft,old.lessons.bits.extraDraft);assert.ok(restored.lessons.bits.extraPassed.every(Boolean));
});
test('three-way merge retains unrelated device edits and identifies conflicting drafts',()=>{
 const source=fs.readFileSync('public/sync.js','utf8');
 const start=source.indexOf('function merge('),end=source.indexOf('\nfunction showConflict',start);
 const ctx=vm.createContext({clone:x=>JSON.parse(JSON.stringify(x)),same:(a,b)=>JSON.stringify(a)===JSON.stringify(b)});vm.runInContext(source.slice(start,end),ctx);
 const base={last:'bits',lessons:{bits:{draft:'old'},mux:{draft:'old mux'}}};
 const local=structuredClone(base);local.lessons.bits.draft='local answer';
 const remote=structuredClone(base);remote.lessons.mux.draft='remote answer';
 let conflicts=[];let merged=ctx.merge(base,local,remote,'',conflicts);
 assert.equal(conflicts.length,0);assert.equal(merged.lessons.bits.draft,'local answer');assert.equal(merged.lessons.mux.draft,'remote answer');
 remote.lessons.bits.draft='different answer';conflicts=[];merged=ctx.merge(base,local,remote,'',conflicts);
 assert.deepEqual(conflicts,['.lessons.bits.draft']);assert.equal(merged.lessons.bits.draft,'local answer');
});
test('client migrates old progress, saves to the authenticated account, and retains offline changes without infinite retry',async()=>{
 const memory=new Map(),elements=new Map(),timers=[];
 const element=()=>({textContent:'',innerHTML:'',append(){},hidden:true,inert:false});
 const document={querySelector(key){if(!elements.has(key))elements.set(key,element());return elements.get(key);},createElement:element,addEventListener(){}};
 let current=structuredClone(data),offline=false;
 const ctx=vm.createContext({window:{addEventListener(){}},document,localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)},setTimeout(fn){timers.push(fn);return timers.length;},clearTimeout(){},console,URL,Blob,
 fetch:async(path,options={})=>{if(path==='/api/session')return Response.json({user:{id:'client-test',email:'test@example.com'}});if(offline)throw Error('offline');return call('client-test',options.method||'GET',options.body?JSON.parse(options.body):undefined);}});
 vm.runInContext(fs.readFileSync('public/sync.js','utf8'),ctx);
 await ctx.window.IC_SYNC.init({get:()=>current,set:x=>{current=structuredClone(x);}});
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal((await (await call('client-test')).json()).data.last,'sequential');
 assert.equal(memory.get('ic-pathway.legacy-owner'),'client-test');
 offline=true;current.lessons.bits.draft='offline draft';ctx.window.IC_SYNC.schedule();
 const fn=timers.pop();timers.length=0;await fn();await new Promise(resolve=>setImmediate(resolve));
 const cached=JSON.parse(memory.get('ic-pathway.account.client-test'));assert.equal(cached.pending,true);assert.equal(cached.data.lessons.bits.draft,'offline draft');assert.equal(timers.length,0);
});
test('v2 clients cannot erase FPGA progress, and stale branch writes use existing CAS protection',async()=>{
 const branch={...data,fpga:{schema:1,lessons:{'01':{guided:'keep independent branch'}}},ultraFPGA:{led:{spec:'keep Ultra work'}}};
 assert.equal((await call('old-client','PUT',{revision:0,data:branch})).status,200);
 assert.equal((await call('old-client','PUT',{revision:1,data:{...data,last:'counter'}})).status,200);
 let stored=await(await call('old-client')).json();assert.deepEqual(stored.data.fpga,branch.fpga);assert.deepEqual(stored.data.ultraFPGA,branch.ultraFPGA);
 assert.equal((await call('old-client','PUT',{revision:1,data:{...branch,fpga:{}}})).status,409);
 stored=await(await call('old-client')).json();assert.equal(stored.data.last,'counter');assert.deepEqual(stored.data.fpga,branch.fpga);
});
test('old clients preserve competition journal, milestones and independent skill matrix',async()=>{
 const competition={schema:1,modules:{'01':{state:'LEARNING'}},milestones:{A:{state:'VERIFYING',evidence:'real note'}},journal:{j1:{attempt:'work'}},skills:{ram:{level:'LEARNING'}},integration:{format:'RGB888'}};
 assert.equal((await call('legacy-v3','PUT',{revision:0,data:{...data,competition}})).status,200);
 assert.equal((await call('legacy-v3','PUT',{revision:1,data})).status,200);
 assert.deepEqual((await(await call('legacy-v3')).json()).data.competition,competition);
});
test('legacy clients preserve new HDL drafts and resume timestamps',async()=>{
 const hdl={nba:{draft:'old and new values',choice:1,passed:true,done:true,viewedAt:1700000000000}};
 assert.equal((await call('hdl-backcompat','PUT',{revision:0,data:{...data,hdl}})).status,200);
 assert.equal((await call('hdl-backcompat','PUT',{revision:1,data:{...data,last:'bits'}})).status,200);
 assert.deepEqual((await(await call('hdl-backcompat')).json()).data.hdl,hdl);
});
test('older HDL clients cannot erase new lesson IDs or structured activities',async()=>{
 const hdl={nba:{draft:'retained',choice:1,passed:true,done:true,activities:{0:{choice:0,passed:true}}},casts:{draft:'new topic'}};
 assert.equal((await call('hdl-activities','PUT',{revision:0,data:{...data,hdl}})).status,200);
 const old={...data,hdl:{nba:{draft:'edited on old client',choice:1,passed:true,done:true}}};
 assert.equal((await call('hdl-activities','PUT',{revision:1,data:old})).status,200);
 const stored=(await(await call('hdl-activities')).json()).data.hdl;
 assert.deepEqual(stored.nba.activities,hdl.nba.activities);assert.deepEqual(stored.casts,hdl.casts);
 assert.equal(stored.nba.draft,'edited on old client');
});
test('pending or failed session shows unknown progress, guest recovery restores local count',async()=>{
 const elements=new Map(),memory=new Map();const element=()=>({textContent:'',innerHTML:'',append(){},hidden:false,inert:false,dataset:{}});
 const document={body:{dataset:{}},querySelector(k){if(!elements.has(k))elements.set(k,element());return elements.get(k)},createElement:element,addEventListener(){}};
 document.querySelector('#overall-count').dataset.loadedCount='3 / 37';
 let release;const pending=new Promise(resolve=>release=resolve);let fail=true;
 const ctx=vm.createContext({window:{addEventListener(){}},document,localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)},setTimeout(){return 1},clearTimeout(){},console,URL,Blob,fetch:async()=>fail?pending:Response.json({user:null})});
 vm.runInContext(fs.readFileSync('public/sync.js','utf8'),ctx);
 const task=ctx.window.IC_SYNC.init({get:()=>data,set(){}});
 assert.equal(document.body.dataset.syncState,'loading');assert.equal(document.querySelector('#overall-count').textContent,'待载入');
 release(Response.json({error:'test failure'},{status:503}));await task;
 assert.equal(document.body.dataset.syncState,'error');assert.equal(document.querySelector('#overall-count').textContent,'待载入');
 assert.equal(document.querySelector('#account').textContent,'账号状态未确认');
 fail=false;await ctx.window.IC_SYNC.init({get:()=>data,set(){}});
 assert.equal(document.body.dataset.syncState,'guest');assert.equal(document.querySelector('#overall-count').textContent,'3 / 37');
 assert.equal(document.querySelector('#lesson').inert,false);
});
