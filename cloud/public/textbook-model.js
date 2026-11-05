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
const canonical=v=>String(v??'').replace(/\s+/g,'').replace(/[，、]/g,',').replace(/；/g,';');
function evaluate(ex,a={}){
 if(ex.kind==='choice'||ex.options)return a.choice===ex.correct;
 if(ex.kind==='fill')return ex.blanks.every((b,i)=>b.accepted.some(x=>canonical(x)===canonical(a.answers?.[i])));
 if(['answer','repair'].includes(ex.kind))return ex.accepted.some(x=>canonical(x)===canonical(a.response));
 return false;
}
function canComplete(l,s={}){
 if(!l.lab)return true;
 return l.lab.exercises.every((ex,i)=>{const a=s.activities?.[i]||{};return ['implementation','analysis'].includes(ex.kind)?a.reviewed===true&&!!a.draft?.trim()&&a.draft.trim()!==ex.starter?.trim():a.revision===(ex.revision||1)&&a.passed===true&&evaluate(ex,a)});
}
function normalizeActivities(l,raw){
 const out={};for(const [i,ex] of (l.lab?.exercises||[]).entries()){
  const a=raw?.[i];if(!a||typeof a!=='object')continue;
  // Older multiple-choice activities remain inspectable history; they cannot pass a new editor task.
  const history=a.history||((a.revision||1)!==(ex.revision||1)?{...a}:null);
  const current=(a.revision||1)===(ex.revision||1),draft=typeof a.draft==='string'?a.draft.slice(0,15000):'';
  const v={revision:ex.revision||1,choice:ex.options&&Number.isInteger(a.choice)?a.choice:null,answers:Array.isArray(a.answers)?a.answers.map(x=>String(x).slice(0,1000)):[],response:typeof a.response==='string'?a.response.slice(0,15000):'',draft,attempts:Number.isInteger(a.attempts)?Math.max(0,Math.min(a.attempts,10000)):0,history};
  v.passed=current&&a.passed===true&&evaluate(ex,v);v.reviewed=current&&a.reviewed===true&&!!draft.trim()&&draft.trim()!==ex.starter?.trim();out[i]=v;
 }return out;
}
root.IC_TEXTBOOK_MODEL={initial,step,level,canComplete,normalizeActivities,evaluate};
})(typeof window==='undefined'?globalThis:window);
