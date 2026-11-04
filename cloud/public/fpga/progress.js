(function(root){
const C=root.IC_FPGA_CATALOG;
const MAIN=['bits','gates','mux','clock','module','width','combinational','sequential','counter','fsm','testbench','waveforms','selfcheck','local-tools','linux-vcs','vcs-run','debug','synthesis','libraries','constraints','dc-run','post-synthesis','project','acceptance'];
const text=(x,n=15000)=>typeof x==='string'?x.slice(0,n):'';
const blankLesson=()=>({guided:'',independent:'',choices:[null,null],quizPassed:false,checks:[false,false,false],completed:false,evidence:''});
function prerequisites(p,id){const m=C.modules.find(x=>x.id===id);if(!m)return {open:false,missing:[],previous:null};const missing=MAIN.slice(0,m.main).filter(k=>!p.lessons?.[k]?.completed);return {open:!missing.length&&(!m.previous||p.fpga?.lessons?.[m.previous]?.completed===true),missing,previous:m.previous};}
function eligible(st){return !!(st?.guided?.trim()&&st?.independent?.trim()&&st.quizPassed&&st.checks?.length===3&&st.checks.every(Boolean));}
function complete(p,id){if(!prerequisites(p,id).open||!eligible(p.fpga?.lessons?.[id]))return false;p.fpga.lessons[id].completed=true;return true;}
function normalize(raw={}){
 const fpga={schema:1,lessons:{},readiness:{},board:{model:text(raw.fpga?.board?.model,200),part:text(raw.fpga?.board?.part,200),clock:text(raw.fpga?.board?.clock,100),manual:text(raw.fpga?.board?.manual,1000)}};
 for(const m of C.modules){const v=raw.fpga?.lessons?.[m.id];if(!v||typeof v!=='object')continue;fpga.lessons[m.id]={...blankLesson(),guided:text(v.guided),independent:text(v.independent),evidence:text(v.evidence,8000),choices:[0,1].map(i=>Number.isInteger(v.choices?.[i])&&v.choices[i]>=0&&v.choices[i]<3?v.choices[i]:null),quizPassed:v.quizPassed===true,checks:[0,1,2].map(i=>v.checks?.[i]===true),completed:v.completed===true};
  const quiz=root.IC_FPGA_CONTENT?.[m.id]?.quiz;if(quiz)fpga.lessons[m.id].quizPassed=!!v.quizPassed&&quiz.every((q,i)=>q.correct===fpga.lessons[m.id].choices[i]);
  fpga.lessons[m.id].completed=fpga.lessons[m.id].completed&&eligible(fpga.lessons[m.id]);
 }
 const ultraFPGA={};
 for(const u of C.ultras){const v=raw.ultraFPGA?.[u.id];if(!v||typeof v!=='object')continue;const clean=x=>({spec:text(x.spec,8000),rtl:text(x.rtl,15000),tb:text(x.tb,15000),evidence:text(x.evidence,12000),checks:Array.from({length:9},(_,i)=>x.checks?.[i]===true),hints:Math.max(0,Math.min(3,Number.isInteger(x.hints)?x.hints:0))});ultraFPGA[u.id]={...clean(v),attempts:(Array.isArray(v.attempts)?v.attempts:[]).filter(x=>x&&Number.isFinite(Date.parse(x.at))).slice(-5).map(x=>({...clean(x),at:x.at,passed:x.passed===true&&ultraEligible(clean(x))}))};}
 for(const [k,v]of Object.entries(raw.fpga?.readiness||{})){if(/^[a-z-]+$/.test(k)&&v&&typeof v==='object')fpga.readiness[k]={confirmed:v.confirmed===true,evidence:text(v.evidence,2000)};}
 return {fpga,ultraFPGA};
}
function status(p,id){if(!prerequisites(p,id).open)return 'locked';const s=p.fpga?.lessons?.[id];return s?.completed?'completed':s&&(s.guided||s.independent||s.choices?.some(x=>x!==null))?'progress':'available';}
function ultraOpen(p,id){const u=C.ultras.find(x=>x.id===id);return !!u&&MAIN.slice(0,u.main).every(k=>p.lessons?.[k]?.completed)&&C.modules.filter(m=>+m.id<=+u.after).every(m=>p.fpga?.lessons?.[m.id]?.completed);}
function ultraEligible(s){return !!s&&['spec','rtl','tb','evidence'].every(k=>text(s[k]).trim().length>=20)&&s.checks?.length===9&&s.checks.every(Boolean);}
root.IC_FPGA_PROGRESS={MAIN,blankLesson,prerequisites,eligible,complete,normalize,status,ultraOpen,ultraEligible};
})(typeof window==='undefined'?globalThis:window);
