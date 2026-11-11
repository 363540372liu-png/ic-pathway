import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const c=vm.createContext({window:{}});
for(const name of ['hdl-content','textbook-content','textbook-depth','textbook-model','vector-lesson','hdl']){
 vm.runInContext(fs.readFileSync('public/'+name+'.js','utf8'),c);
}
const {IC_VECTOR_LESSON:V,IC_HDL:H}=c.window;

test('select, slice and swap agree with integer masks for all 256 inputs',()=>{
 for(let n=0;n<256;n++){
  const bits=n.toString(2).padStart(8,'0');
  for(let hi=0;hi<8;hi++){
   assert.equal(Number(V.bit(bits,hi)),(n>>hi)&1);
   for(let lo=0;lo<=hi;lo++){
    const width=hi-lo+1;
    const result=V.slice(bits,hi,lo);
    assert.equal(result.length,width);
    assert.equal(parseInt(result,2),(n>>lo)&((1<<width)-1));
   }
  }
  assert.equal(V.join(bits,false),bits);
  assert.equal(parseInt(V.join(bits,true),2),((n&15)<<4)|(n>>4));
 }
 for(let n=1;n<=8;n++)assert.equal(parseInt(V.replicate('1',n),2),(1<<n)-1);
});

test('old vector completions and drafts survive; new fields are scoped and bounded',()=>{
 const draft='old vector work';
 const old=H.normalize({vectors:{draft,choice:1,passed:true,done:true}});
 assert.equal(old.vectors.done,true);
 assert.equal(old.vectors.draft,draft);
 assert.equal(old.vectors.historicalMastery,true);
 assert.equal(old.vectors.vectorSteps,undefined);
 const updated=H.normalize({vectors:{...old.vectors,vectorSteps:{0:true,1:'true',5:true,6:true},vectorExtra:'x'.repeat(15100)},module:{draft:'other',vectorSteps:{0:true}}});
 assert.equal(JSON.stringify(updated.vectors.vectorSteps),'{"0":true,"5":true}');
 assert.equal(updated.vectors.vectorExtra.length,15000);
 assert.equal(updated.module.vectorSteps,undefined);
 assert.equal(H.normalize(JSON.parse(JSON.stringify(updated))).vectors.vectorExtra.length,15000);
});

test('vector questions read the current input and selection, and imported mismatched passes require review',()=>{
 const first=V.normalizeLearning({bits:'10100101',selected:1,hi:5,lo:2});
 assert.equal(V.question(1,first).answer,'0');
 assert.equal(V.question(2,first).answer,'1001');
 const changed=V.normalizeLearning({...first,bits:'11111111',selected:3,checked:{1:'10100101:bus[1]',2:'10100101:bus[5:2]'}});
 assert.equal(V.question(1,changed).expression,'bus[3]');
 assert.equal(V.question(1,changed).answer,'1');
 assert.equal(V.question(2,changed).answer,'1111');
 const steps={0:true,1:true,2:true};
 V.alignSteps(steps,changed);
 assert.deepEqual(steps,{0:true});
 assert.equal(changed.review[1],true);
 assert.equal(changed.review[2],true);
});

test('new vector completion requires the six practices and a draft without marking the old quiz passed',()=>{
 const steps={0:true,1:true,2:true,3:true,4:true,5:true};
 const vectorLearning={bits:'11111111',selected:1,hi:7,lo:4,draft:'my swap',checked:{1:'11111111:bus[1]',2:'11111111:bus[7:4]'}};
 assert.equal(V.complete(steps,{draft:''}),false);
 const state=H.normalize({vectors:{vectorSteps:steps,vectorLearning}}).vectors;
 assert.equal(state.done,true);
 assert.equal(state.passed,false);
 assert.equal(state.historicalMastery,false);
 assert.equal(H.normalize({vectors:{...state,vectorLearning:{...vectorLearning,lo:2}}}).vectors.done,false);
});

test('import retains a completed vector snapshot and merges disjoint old exercise records',()=>{
 const old={done:true,vectorLearning:{bits:'11111111'},vectorSteps:{1:true},activities:{2:{response:'existing'}},vectorExtra:'keep 16-bit'};
 const incoming={done:false,vectorLearning:{bits:'00000000'},vectorSteps:{2:true},activities:{4:{choice:1}}};
 const kept=V.mergeProgress(old,incoming);
 assert.equal(kept.vectorLearning.bits,'11111111');
 assert.equal(kept.vectorSteps[1],true);
 assert.equal(kept.activities[2].response,'existing');
 assert.equal(kept.activities[4].choice,1);
 assert.equal(kept.vectorExtra,'keep 16-bit');
});
