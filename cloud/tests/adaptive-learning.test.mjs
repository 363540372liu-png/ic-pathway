import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const context=vm.createContext({window:{}});
for(const file of ['hdl-content','textbook-content','textbook-depth','fpga/catalog','adaptive-content','adaptive-learning']){
 vm.runInContext(fs.readFileSync('public/'+file+'.js','utf8'),context);
}
const {IC_ADAPTIVE_CONTENT:content,IC_ADAPTIVE_LEARNING:model,HDL_LESSONS:lessons,IC_FPGA_CATALOG:catalog}=context.window;
test('each current HDL and FPGA course has a distinct contextual checkpoint',()=>{
 assert.equal(Object.keys(content.hdl).length,56);
 assert.equal(Object.keys(content.fpga).length,catalog.modules.length);
 const prompts=new Set();
 for(const l of lessons){
  const [type,target,indices,title,prompt,answer]=content.hdl[l.id];
  assert.ok(model.types[type]&&['concept','example','code'].includes(target));
  assert.ok(title&&prompt&&answer);
  assert.ok(!prompts.has(prompt));prompts.add(prompt);
  assert.equal(new Set(indices).size,indices.length);
  assert.ok(indices.every(i=>l.lab.exercises[i]?.objectiveId));
 }
 for(const m of catalog.modules){
  const [title,task]=content.fpga[m.id];
  assert.ok(title&&task&&!prompts.has(task));prompts.add(task);
 }
});
test('truth-table gates and enabled decoder cover all four inputs',()=>{
 assert.equal(JSON.stringify([0,1,2,3].map(n=>model.logic(n>>1,n&1))),'[[0,0,0],[0,1,1],[0,1,1],[1,1,0]]');
 assert.equal(JSON.stringify([0,1,2,3].map(n=>model.decode(n>>1,n&1))),'[[0,0,0,1],[0,0,1,0],[0,1,0,0],[1,0,0,0]]');
});
test('LED preview counts enabled edges and holds phase during pause',()=>{
 let s={count:0,led:0};
 for(const en of [true,true,false,true])s=model.ledStep(s,en,3);
 assert.equal(JSON.stringify(s),'{"count":0,"led":1}');
 assert.equal(JSON.stringify(model.ledStep(s,true,1)),'{"count":0,"led":0}');
});
