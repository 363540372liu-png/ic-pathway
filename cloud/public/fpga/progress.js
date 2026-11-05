(function(root){
'use strict';
const C=root.IC_FPGA_CATALOG,text=(v,n=15000)=>typeof v==='string'?v.slice(0,n):'';
const entryQuestions=[
 {q:'posedge clk内a<=d; b<=a;，旧a=0,d=1，一沿后b？',options:['0','1','等于clk'],correct:0,why:'同沿b读取旧a；可回看非阻塞赋值课。',review:'hdl-nba'},
 {q:'设计顶层和测试台顶层应怎样选择？',options:['都选测试台','综合选设计、仿真选测试台','按文件长短'],correct:1,why:'测试台产生激励，不作为可综合设计。',review:'hdl-testbench'},
 {q:'4位无符号计数器从15加1，只保留4位后？',options:['16','保持15','0'],correct:2,why:'溢出高位截断，模16回绕。',review:'hdl-width-sign'},
 {q:'组合过程只写if(en) y=d，没有else/默认，可能推导？',options:['锁存器','自动FIFO','时钟源'],correct:0,why:'未赋值路径要求保持历史。',review:'hdl-case-latch'}
];
const blankLesson=()=>({guided:'',independent:'',choices:[null,null],quizPassed:false,checks:[false,false,false],completed:false,evidence:'',completionMode:null});
function entryReady(p){return entryQuestions.every((q,i)=>p.fpga?.entry?.choices?.[i]===q.correct)&&p.fpga.entry.passed===true||['module','branches','nba','checking'].every(id=>p.hdl?.[id]?.done)||['module','combinational','sequential','testbench','selfcheck'].every(id=>p.lessons?.[id]?.completed);}
function prerequisites(p,id){const m=C.modules.find(x=>x.id===id);return {open:!!m,practiceReady:!!m,missing:entryReady(p)?[]:['module','nba','checking'],previous:m?.previous||null};}
function eligible(st){return !!(st?.guided?.trim()&&st?.independent?.trim()&&st.quizPassed&&st.checks?.length===3&&st.checks.every(Boolean));}
function complete(p,id){if(!prerequisites(p,id).practiceReady||!eligible(p.fpga?.lessons?.[id]))return false;p.fpga.lessons[id].completed=true;p.fpga.lessons[id].completionMode=p.fpga.mode||'simulation';return true;}
function normalize(raw={}){
 const f=raw.fpga||{},fpga={schema:2,mode:f.mode==='board'?'board':'simulation',projects:{led:{draft:text(f.projects?.led?.draft),evidence:text(f.projects?.led?.evidence,8000),updatedAt:Number.isSafeInteger(f.projects?.led?.updatedAt)?f.projects.led.updatedAt:0}},tool:['vivado','quartus','efinity'].includes(f.tool)?f.tool:'vivado',entry:{choices:entryQuestions.map((q,i)=>Number.isInteger(f.entry?.choices?.[i])?f.entry.choices[i]:null),passed:f.entry?.passed===true},lessons:{},readiness:{},board:{model:text(f.board?.model,200),part:text(f.board?.part,200),clock:text(f.board?.clock,100),manual:text(f.board?.manual,1000)}};
 fpga.entry.passed=fpga.entry.passed&&entryQuestions.every((q,i)=>fpga.entry.choices[i]===q.correct);
 for(const m of C.modules){const v=f.lessons?.[m.id];if(!v||typeof v!=='object')continue;
  const choices=[0,1].map(i=>Number.isInteger(v.choices?.[i])&&v.choices[i]>=0&&v.choices[i]<3?v.choices[i]:null),quiz=root.IC_FPGA_CONTENT?.[m.id]?.quiz;
  // Preserve a genuinely completed legacy record even when an editorial revision changes quiz wording.
  const legacyCompleted=(f.schema!==2||v.legacyCompleted===true)&&v.completed===true&&v.quizPassed===true&&!!text(v.guided).trim()&&!!text(v.independent).trim()&&v.checks?.length===3&&v.checks.every(x=>x===true);
  const passed=!!v.quizPassed&&quiz?.every((q,i)=>q.correct===choices[i]);
  fpga.lessons[m.id]={...blankLesson(),guided:text(v.guided),independent:text(v.independent),evidence:text(v.evidence,8000),choices,quizPassed:passed||legacyCompleted,checks:[0,1,2].map(i=>v.checks?.[i]===true),completed:legacyCompleted||(v.completed===true&&passed&&eligible({...v,quizPassed:passed})),completionMode:['simulation','board'].includes(v.completionMode)?v.completionMode:null,legacyCompleted};
 }
 for(const [k,v]of Object.entries(f.readiness||{}))if(/^[a-z-]+$/.test(k)&&v&&typeof v==='object')fpga.readiness[k]={confirmed:v.confirmed===true,evidence:text(v.evidence,2000)};
 const ultraFPGA={};for(const u of C.ultras){const v=raw.ultraFPGA?.[u.id];if(!v||typeof v!=='object')continue;
  const clean=x=>({spec:text(x.spec,8000),rtl:text(x.rtl),tb:text(x.tb),evidence:text(x.evidence,12000),checks:Array.from({length:9},(_,i)=>x.checks?.[i]===true),hints:Number.isInteger(x.hints)?Math.max(0,Math.min(x.hints,3)):0,mode:x.mode==='board'?'board':'simulation'});
  ultraFPGA[u.id]={...clean(v),attempts:(Array.isArray(v.attempts)?v.attempts:[]).filter(a=>a&&Number.isFinite(Date.parse(a.at))).slice(-5).map(a=>({...clean(a),at:a.at,passed:a.passed===true&&ultraEligible(clean(a))}))};
 }
 return {fpga,ultraFPGA};
}
function status(p,id){const s=p.fpga?.lessons?.[id];return s?.completed?'completed':s&&(s.guided||s.independent||s.choices?.some(x=>x!==null))?'progress':'available';}
function ultraOpen(p,id){return C.ultras.some(u=>u.id===id)&&entryReady(p);}
function ultraEligible(s){const n=s?.mode==='board'?9:6;return !!s&&['spec','rtl','tb','evidence'].every(k=>text(s[k]).trim())&&s.checks?.slice(0,n).every(Boolean)&&s.checks.length===9;}
root.IC_FPGA_PROGRESS={entryQuestions,entryReady,blankLesson,prerequisites,eligible,complete,normalize,status,ultraOpen,ultraEligible};
})(typeof window==='undefined'?globalThis:window);
