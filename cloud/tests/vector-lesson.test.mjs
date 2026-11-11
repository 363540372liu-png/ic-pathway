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
