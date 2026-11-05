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
const stateLabels={'not-started':'未开始',learning:'学习中',understood:'已完成基础理解',practiced:'已完成练习（含自查）','automatic-checked':'已通过封闭题自动检查',legacy:'保留的旧版完成（自评）'};
function level(l,s={}){
 if(s.historicalMastery&&s.done&&!canComplete(l,s))return 'legacy';
 if(canComplete(l,s)&&s.passed)return milestones(l,s).automatic?'automatic-checked':'practiced';
 if(Object.values(s.activities||{}).some(a=>a.reviewed||a.passed))return 'practiced';
 if(s.passed)return 'understood';
 if(s.viewedAt||s.draft||Object.keys(s.activities||{}).length)return 'learning';
 return 'not-started';
}
const canonical=v=>{const s=String(v??'').replace(/[，、]/g,',').replace(/；/g,';');return (s.match(/"(?:\\.|[^"\\])*"|\d+'[sS]?[bBoOdDhH][0-9a-fA-FxXzZ?_]+|[a-zA-Z_$][\w$]*|\d+(?:\.\d+)?|!==|===|<=|>=|&&|\|\||!=|==|::|[^\s]/g)||[]).join(' ');};
// A deliberately small recognizer: one named-port instance, simple identifiers only.
// It compares the same wiring, not arbitrary Verilog behavior. Duplicates are rejected.
function namedInstance(v){
 const m=String(v).trim().match(/^(\w+)\s+(\w+)\s*\(([\s\S]*)\)\s*;$/);if(!m)return null;
 const parts=m[3].split(','),ports={};
 for(const part of parts){const p=part.trim().match(/^\.(\w+)\s*\(\s*(\w+)\s*\)$/);if(!p||p[1] in ports)return null;ports[p[1]]=p[2];}
 return JSON.stringify([m[1],m[2],Object.entries(ports).sort(([a],[b])=>a.localeCompare(b))]);
}
function sameAnswer(a,b){return canonical(a)===canonical(b)||(namedInstance(a)!==null&&namedInstance(a)===namedInstance(b));}
function evaluate(ex,a={}){
 if(ex.kind==='choice'||ex.options)return a.choice===ex.correct;
 if(ex.kind==='fill')return ex.blanks.every((b,i)=>b.accepted.some(x=>sameAnswer(x,a.answers?.[i])));
 if(['answer','repair'].includes(ex.kind))return ex.accepted.some(x=>sameAnswer(x,a.response));
 return false;
}
function grade(ex,a={}){
 if(evaluate(ex,a))return {status:'recognized',message:'本题已核对：符合已收录的答案形式。代码未在网页中编译或仿真。'};
 if(ex.kind==='repair'){
  if(!a.response?.trim()||canonical(a.response)===canonical(ex.starter))return {status:'needs-change',message:'代码仍与给定错误片段相同，尚未完成修改。'};
  return {status:'unverified',message:'尚不能自动判定这份修改是否等价。已保存，请用测试条件和真实工具核对；这里不把它断言为错误。'};
 }
 if(ex.kind==='fill'&&ex.blanks.some(b=>b.accepted.some(x=>/[=+&|<>]/.test(x))))return {status:'unverified',message:'这份表达式不在已收录答案中，尚不能自动判定。请回到输入条件手算，或用真实工具验证。'};
 return {status:'incorrect',message:'当前结果与本题给定条件不符。'};
}
function milestones(l,s={}){
 const all=l.lab?.exercises||[],closed=all.filter(x=>!['implementation','analysis'].includes(x.kind));
 return {started:!!(s.viewedAt||s.draft),understood:s.passed===true,practiced:all.length>0&&all.every((x,i)=>{const a=s.activities?.[i]||{};return ['implementation','analysis'].includes(x.kind)?a.reviewed===true:x.kind==='repair'?(a.passed===true||a.reviewed===true)&&!!a.reason?.trim():a.passed===true}),automatic:closed.length>0&&closed.every(x=>{const i=all.indexOf(x),a=s.activities?.[i];return a?.revision===(x.revision||1)&&a.passed===true&&evaluate(x,a)}),simulation:false,board:false,legacy:s.historicalMastery===true};
}
function canComplete(l,s={}){
 if(!l.lab)return true;
 return l.lab.exercises.every((ex,i)=>{const a=s.activities?.[i]||{};return ['implementation','analysis'].includes(ex.kind)?a.reviewed===true&&!!a.draft?.trim()&&a.draft.trim()!==ex.starter?.trim():a.revision===(ex.revision||1)&&(ex.kind==='repair'?!!a.reason?.trim()&&((a.passed===true&&evaluate(ex,a))||(a.reviewed===true&&!!a.response?.trim()&&canonical(a.response)!==canonical(ex.starter))):a.passed===true&&evaluate(ex,a))});
}
function normalizeActivities(l,raw){
 const out={};for(const [i,ex] of (l.lab?.exercises||[]).entries()){
  const a=raw?.[i];if(!a||typeof a!=='object')continue;
  // Older multiple-choice activities remain inspectable history; they cannot pass a new editor task.
  const history=a.history||a.legacyClientAnswer||((a.revision||1)!==(ex.revision||1)?{...a}:null);
  const current=(a.revision||1)===(ex.revision||1),draft=typeof a.draft==='string'?a.draft.slice(0,15000):'';
  const v={revision:ex.revision||1,choice:ex.options&&Number.isInteger(a.choice)?a.choice:null,answers:Array.isArray(a.answers)?a.answers.map(x=>String(x).slice(0,1000)):[],response:typeof a.response==='string'?a.response.slice(0,15000):'',reason:typeof a.reason==='string'?a.reason.slice(0,3000):'',draft,attempts:Number.isInteger(a.attempts)?Math.max(0,Math.min(a.attempts,10000)):0,history};
  v.passed=current&&a.passed===true&&evaluate(ex,v);v.reviewed=current&&a.reviewed===true&&(ex.kind==='repair'?!!v.reason.trim()&&!!v.response.trim()&&canonical(v.response)!==canonical(ex.starter):!!draft.trim()&&draft.trim()!==ex.starter?.trim());out[i]=v;
 }return out;
}
root.IC_TEXTBOOK_MODEL={initial,step,level,canComplete,normalizeActivities,evaluate,grade,sameAnswer,namedInstance,milestones,stateLabels};
})(typeof window==='undefined'?globalThis:window);
