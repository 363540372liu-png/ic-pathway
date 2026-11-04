(function(root){
'use strict';
const initial=()=>({cycle:0,a:0,b:0,q:0,state:0,busy:0});
function step(kind,s,input){
 const i={d:1,en:1,rst_n:1,sel:0,left:2,right:7,start:0,finish:0,blocking:false,...input},n={...s,cycle:s.cycle+1};
 if(kind==='mux'){n.q=i.sel?i.right:i.left;n.line=i.sel?6:4;}
 else if(kind==='pipeline'){n.a=i.d;n.b=i.blocking?i.d:s.a;n.line=5;}
 else if(kind==='dff'){n.q=i.d;n.line=3;}
 else if(kind==='enabled'){n.q=!i.rst_n?0:i.en?i.d:s.q;n.line=!i.rst_n?8:9;}
 else if(kind==='counter'){n.q=!i.rst_n?0:i.en?(s.q+1)&15:s.q;n.line=!i.rst_n?4:5;}
 else if(kind==='fsm'){n.state=!i.rst_n?0:s.state?(i.finish?0:1):(i.start?1:0);n.busy=n.state;n.line=15;}
 else throw Error('Unknown teaching model');
 return {before:{...s},after:n,input:i};
}
function level(l,s={}){
 if(s.done)return 'mastered';
 if(s.passed&&s.draft?.trim())return 'practiced';
 if(s.viewedAt||s.draft||Object.keys(s.activities||{}).length)return 'learning';
 return 'not-started';
}
function canComplete(l,s={}){
 if(!l.lab)return true;
 return l.lab.exercises.every((ex,i)=>ex.options?s.activities?.[i]?.passed===true:s.activities?.[i]?.reviewed===true&&!!s.activities?.[i]?.draft?.trim());
}
function normalizeActivities(l,raw){
 const out={};for(const [i,ex]of (l.lab?.exercises||[]).entries()){
  const a=raw?.[i];if(!a||typeof a!=='object')continue;
  const choice=ex.options&&Number.isInteger(a.choice)&&a.choice>=0&&a.choice<ex.options.length?a.choice:null;
  const draft=typeof a.draft==='string'?a.draft.slice(0,15000):'';
  out[i]={choice,passed:!!ex.options&&a.passed===true&&choice===ex.correct,draft,reviewed:a.reviewed===true&&!!draft.trim(),attempts:Number.isInteger(a.attempts)?Math.max(0,Math.min(a.attempts,10000)):0};
 }return out;
}
root.IC_TEXTBOOK_MODEL={initial,step,level,canComplete,normalizeActivities};
})(typeof window==='undefined'?globalThis:window);
