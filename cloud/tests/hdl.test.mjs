import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const c=vm.createContext({window:{}});
for(const f of ['hdl-content','textbook-content','textbook-model','textbook','hdl'])vm.runInContext(fs.readFileSync('public/'+f+'.js','utf8'),c);
const H=c.window.IC_HDL;
test('beginner routes resolve every lesson and preserve legacy course routes',()=>{
 assert.equal(H.lessons.length,42);
 assert.equal(new Set(H.lessons.map(l=>l.id)).size,42);
 for(const l of H.lessons){assert.equal(H.isRoute('hdl-'+l.id),true);assert.ok(l.code&&l.solution&&l.answer);assert.ok(l.concept.length>=2);assert.ok(l.correct>=0&&l.correct<l.options.length);}
 for(const r of ['bits','fpga','competition','ultra'])assert.equal(H.isRoute(r),false);
 for(const r of ['home','learning','hdl'])assert.equal(H.isRoute(r),true);
});
test('HDL progress preserves drafts, rejects false completion, and bounds imported content',()=>{
 const result=H.normalize({mindset:{draft:'my prediction',choice:0,passed:true,done:true},numbers:{draft:'',choice:1,passed:true,done:true},'four-state':{draft:'x',choice:0,passed:true,done:true},module:{draft:'x'.repeat(20000),choice:999},unknown:{done:true}});
 assert.equal(result.mindset.done,true);assert.equal(result.numbers.done,false);assert.equal(result['four-state'].done,false);
 assert.equal(result.module.draft.length,15000);assert.equal(result.module.choice,null);assert.equal(result.unknown,undefined);
 assert.deepEqual(JSON.parse(JSON.stringify(H.normalize(result))),JSON.parse(JSON.stringify(result)));
});

test('prerequisites are earlier and core path does not depend on optional verification',()=>{
 const ids=H.lessons.map(l=>l.id);
 assert.equal(H.lessons.filter(l=>!l.optional).length,37);
 assert.equal(H.lessons.filter(l=>l.optional).length,5);
 for(const [i,l] of H.lessons.entries()){
  for(const dep of l.prerequisites){
   assert.ok(ids.indexOf(dep)>=0&&ids.indexOf(dep)<i,l.id+' -> '+dep);
   if(!l.optional)assert.equal(H.lessons.find(x=>x.id===dep).optional,false);
  }
  assert.ok(l.goals.length>=2&&l.terms.length>=1);
  if(l.trace)for(const row of l.trace.rows)assert.equal(row.length,l.trace.heads.length);
 }
 assert.ok(ids.indexOf('capstone')<ids.indexOf('sv-verification'));
 assert.ok(ids.indexOf('sv-handshake')<ids.indexOf('sv-package'));
});
test('resume prefers a recent unfinished lesson, preserving older lesson IDs and new prerequisites',()=>{
 const p={hdl:H.normalize({nba:{draft:'old work',choice:1,passed:true,done:false,viewedAt:100},counter:{draft:'later visit',choice:0,passed:true,done:true,viewedAt:80}})};
 assert.equal(H.resume(p).target.id,'nba');
 p.hdl.nba.done=true;
 assert.equal(H.resume(p).target.id,'orientation','new foundations remain visible for older accounts');
 assert.equal(p.hdl.counter.done,true);
 const restored=H.normalize(p.hdl);
 assert.equal(restored.nba.viewedAt,100);
 assert.equal(H.normalize({nba:{viewedAt:'invalid'}}).nba.viewedAt,0);
});
