(()=>{
'use strict';
const L=window.HDL_LESSONS;
const STAGES=[
 ['数字电路与 HDL 入门','先理解数字、逻辑关系和存储元件。'],
 ['Verilog 语法','从模块与位宽，到分支、循环、复用与编译单元。'],
 ['RTL 基础设计','组合、寄存器、计数器、脉冲、ALU与状态机。'],
 ['SystemVerilog RTL','用明确的类型与过程表达已学电路。'],
 ['仿真与验证','激励、调度、自检与错误定位。'],
 ['同步设计与时序','用采样窗口和路径预算理解物理时间。'],
 ['综合与工程实践','完成验证闭环，再进入现有综合和工程课程。'],
 ['高级专题 · 选修','任务、握手、接口、随机与断言入门。']
];
const e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const href=id=>'#hdl-'+id;
const link=(id,t)=>'<a href="'+href(id)+'">'+e(t)+'</a>';
const isRoute=id=>['home','learning','hdl'].includes(id)||L.some(l=>href(l.id)==='#'+id);
const core=L.filter(l=>!l.optional);
const lessonState=(p,l)=>p.hdl?.[l.id]||{};
function normalize(raw){
 const out={};
 for(const l of L){
  const s=raw?.[l.id];if(!s||typeof s!=='object')continue;
  const draft=typeof s.draft==='string'?s.draft.slice(0,15000):'';
  const choice=Number.isInteger(s.choice)&&s.choice>=0&&s.choice<l.options.length?s.choice:null;
  const revision=s.quizRevision||1;
  const passed=s.passed===true&&choice===l.correct&&revision===(l.quizRevision||1);
  const historicalMastery=s.historicalMastery===true||(s.done===true&&s.passed===true&&!!draft.trim()&&choice===(revision===1&&l.previousCorrect!==undefined?l.previousCorrect:l.correct));
  out[l.id]={draft,choice,passed,done:s.done===true&&(historicalMastery||passed)&&!!draft.trim(),historicalMastery,quizRevision:revision,viewedAt:Number.isSafeInteger(s.viewedAt)&&s.viewedAt>0?s.viewedAt:0,activities:window.IC_TEXTBOOK_MODEL?.normalizeActivities(l,s.activities)||{}};
 }
 return out;
}
function resume(p){
 const viewed=L.filter(l=>lessonState(p,l).viewedAt).sort((a,b)=>lessonState(p,b).viewedAt-lessonState(p,a).viewedAt)[0];
 const next=core.find(l=>!lessonState(p,l).done);
 return {viewed,next,target:viewed&&!lessonState(p,viewed).done?viewed:next||viewed||core[0]};
}
function nav(p){
 const current=L.find(l=>href(l.id)==='#'+p.last),next=resume(p).next;
 return '<div class="nav-group hdl-course-nav"><h2 class="nav-group-title">学习课程</h2><a href="#hdl" class="lesson-link hdl-map-link">路线与学习记录 <span>↗</span></a>'+STAGES.map((s,i)=>{
 const lessons=L.filter(l=>l.stage===i),done=lessons.filter(l=>lessonState(p,l).done).length;
 return '<details '+((current?current.stage===i:next?.stage===i)?'open':'')+'><summary class="hdl-nav-stage"><span>'+String(i+1).padStart(2,'0')+' '+e(s[0])+'</span><small>'+done+'/'+lessons.length+'</small></summary>'+lessons.map(l=>'<a class="lesson-link" href="'+href(l.id)+'"><span class="nav-number">'+String(L.indexOf(l)+1).padStart(2,'0')+'</span><span>'+e(l.title)+'</span>'+(lessonState(p,l).done?'<span class="nav-done" aria-label="已完成">✓</span>':'')+'</a>').join('')+'</details>';
 }).join('')+'</div>';
}
const txt=(x,y,t)=>'<text x="'+x+'" y="'+y+'" fill="#233b49" font-size="15">'+e(t)+'</text>';
function svg(body,label){return '<div class="hdl-diagram"><svg viewBox="0 0 760 250" role="img" aria-label="'+e(label)+'"><title>'+e(label)+'</title>'+body+'</svg></div>';}
function waves(rows,caption){let b='';for(let x=120;x<=720;x+=100)b+='<path d="M'+x+' 20V210" stroke="#d6e1e6" stroke-dasharray="4 4"/>';rows.forEach((r,j)=>{const y=55+j*45;b+=txt(8,y,r[0]);let d='';r[1].forEach((v,i)=>{const x=120+i*50,z=y-(v?24:0);d+=i?'H'+x+'V'+z:'M'+x+' '+z;d+='H'+(x+50);});b+='<path d="'+d+'" fill="none" stroke="'+(j===0?'#8299a5':'#177b75')+'" stroke-width="3"/>';});return svg(b+txt(120,240,caption),'理想时序波形，从左向右读；'+caption);}
function diagram(kind){
 if(kind==='fsm')return svg('<rect x="80" y="60" width="180" height="90" rx="35" fill="#e2f0ec"/><rect x="480" y="60" width="180" height="90" rx="35" fill="#fff0e9"/><path d="M260 85H480 M480 130H260" stroke="#177b75" stroke-width="3" fill="none"/>'+txt(120,110,'IDLE / busy=0')+txt(515,110,'RUN / busy=1')+txt(290,65,'start=1 →')+txt(290,165,'← finish=1')+txt(80,220,'箭头条件决定下一状态；有效时钟沿才更新当前状态'),'IDLE和RUN两状态机，在上升沿按条件转移');
 if(kind==='gates')return svg('<rect x="280" y="35" width="160" height="65" rx="12" fill="#e2f0ec"/><rect x="280" y="125" width="160" height="65" rx="12" fill="#e9edf8"/><path d="M110 60H280 M110 80H280 M440 65H650 M110 150H280 M110 170H280 M440 155H650" stroke="#177b75" stroke-width="3"/>'+txt(60,60,'a')+txt(60,85,'b')+txt(60,150,'a')+txt(60,175,'b')+txt(330,75,'AND &')+txt(330,165,'OR |')+txt(660,70,'y')+txt(660,160,'z'),'两个并行存在的组合逻辑门');
 if(kind==='path')return svg('<path d="M180 90H295 M445 90H560" stroke="#177b75" stroke-width="4"/><rect x="50" y="50" width="130" height="80" rx="8" fill="#e2f0ec"/><rect x="295" y="50" width="150" height="80" rx="8" fill="#fff0e9"/><rect x="560" y="50" width="140" height="80" rx="8" fill="#e2f0ec"/>'+txt(65,95,'发射寄存器')+txt(320,95,'组合逻辑')+txt(575,95,'捕获寄存器')+txt(195,70,'Q →')+txt(475,70,'→ D')+txt(70,180,'tCQ(max) + tcomb(max) + tsetup ≤ T')+txt(70,220,'无时钟偏斜的简化建立模型；不是完整 STA 报告'),'寄存器到寄存器的数据路径');
 if(kind==='setup')return svg('<rect x="330" y="20" width="120" height="150" fill="#ffecdf"/><path d="M60 140H410V45H700" fill="none" stroke="#8299a5" stroke-width="3"/><path d="M60 90H190V65H620V90H700" fill="none" stroke="#177b75" stroke-width="3"/><path d="M410 15V175" stroke="#c05835" stroke-dasharray="5 4"/>'+txt(65,35,'D 在橙色窗口内必须稳定')+txt(295,197,'8ns')+txt(380,197,'10ns ↑')+txt(470,197,'11ns')+txt(330,118,'setup')+txt(420,118,'hold'),'10ns采样，setup2ns，hold1ns，稳定窗口8到11ns');
 if(kind==='reset')return waves([['clk',[0,1,0,1,0,1,0,1,0,1,0,1]],['rst_n',[1,1,1,1,0,0,0,0,1,1,1,1]],['Q 同步',[1,1,1,1,1,0,0,0,0,1,1,1]],['Q 异步',[1,1,1,1,0,0,0,0,0,1,1,1]]],'低有效复位在第5格拉低；D恒为1；同步Q等下一上升沿清零');
 if(kind==='pipeline')return waves([['clk',[0,1,0,1,0,1,0,1,0,1,0,1]],['D',[0,0,1,1,1,1,0,0,0,0,0,0]],['a',[0,0,0,1,1,1,1,0,0,0,0,0]],['b',[0,0,0,0,0,1,1,1,1,0,0,0]]],'a在上升沿采D；b同沿采旧a，因此比a晚一拍');
 if(kind==='counter')return svg(txt(45,45,'rst_n=1，en依次为 1 → 1 → 0 → 1')+'<path d="M110 105H665" stroke="#177b75" stroke-width="3"/>'+[0,1,2,2,3].map((v,i)=>'<rect x="'+(60+i*135)+'" y="75" width="85" height="65" rx="8" fill="#e2f0ec"/>'+txt(95+i*135,113,String(v))+txt(65+i*135,180,i===0?'已复位起点':'第'+i+'个沿后')).join('')+txt(65,225,'en=0 时即使有时钟沿也保持；切换使能本身不更新Q'),'计数器逐拍状态，0到1到2到2到3');
 return waves([['clk',[0,1,0,1,0,1,0,1,0,1,0,1]],['D',[0,0,1,1,1,1,0,0,0,0,1,1]],['Q',[0,0,0,1,1,1,1,0,0,0,0,1]]],'D在沿间变化，Q保持；到下一上升沿才采样更新');
}
function highlight(code){
 const tokens=/\/\/[^\n]*|"(?:\\.|[^"\\])*"|\b(?:module|endmodule|input|output|wire|reg|logic|bit|always|always_comb|always_ff|initial|begin|end|assign|if|else|case|endcase|default|parameter|localparam|genvar|generate|endgenerate|for|integer|function|endfunction|task|endtask|automatic|typedef|enum|struct|packed|package|endpackage|interface|endinterface|modport|class|endclass|rand|constraint|property|endproperty|assert|cover|posedge|negedge|repeat)\b|\b\d+'[sS]?[bBdDhHoO][0-9a-fA-F_xXzZ?]+|\$[A-Za-z_]\w*/g;
 return code.split('\n').map((line,i)=>{
 let result='',at=0;
 for(const m of line.matchAll(tokens)){
  result+=e(line.slice(at,m.index));const t=m[0],kind=t.startsWith('//')?'comment':t.startsWith('"')?'string':/^\d/.test(t)?'number':t.startsWith('$')?'system':'keyword';
  result+='<span class="syntax-'+kind+'">'+e(t)+'</span>';at=m.index+t.length;
 }
 result+=e(line.slice(at));return '<span class="code-line" data-line="'+(i+1)+'">'+(result||' ')+'</span>';
 }).join('\n');
}
function table(trace){
 return '<div class="teaching-table hdl-trace"><table><caption>跟着例子手算一遍</caption><thead><tr>'+trace.heads.map(h=>'<th scope="col">'+e(h)+'</th>').join('')+'</tr></thead><tbody>'+trace.rows.map(r=>'<tr>'+r.map(c=>'<td>'+e(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
}
function prerequisiteHtml(l,p){
 if(!l.prerequisites.length)return '<p>本课从零开始，不要求编程基础。</p>';
 return '<p>用到这些已学概念；不熟时直接回看：</p><div class="prereq-links">'+l.prerequisites.map(id=>{
 const pre=L.find(x=>x.id===id);return '<a href="'+href(id)+'">'+e(pre.title)+' <span>'+ (lessonState(p,pre).done?'已完成':'回看')+'</span></a>';
 }).join('')+'</div>';
}
function lessonHeader(l,ix,p){
 return '<header class="lesson-header study-header"><div class="lesson-topline"><a href="#hdl">← 学习路线</a><span>'+e(STAGES[l.stage][0])+' / '+String(ix+1).padStart(2,'0')+'</span></div><h1>'+e(l.title)+'</h1><p class="study-estimate">'+(l.optional?'进阶选修':'核心主线')+' · 初读约 '+l.minutes+' 分钟，动手时间另计</p><ul class="study-goals">'+l.goals.map(t=>'<li>'+e(t)+'</li>').join('')+'</ul><nav class="knowledge-points" aria-label="本课知识点">'+(l.knowledge||[]).map(k=>'<button data-jump="'+({concept:'study-concept',code:'study-code',practice:'study-practice'}[k.id])+'">'+e(k.title)+'</button>').join('')+'</nav><details class="prereq-box"><summary>前置知识 · '+l.prerequisites.length+' 课</summary>'+prerequisiteHtml(l,p)+(l.conceptDependencies?.length?'<p>做题时会用到：</p><ul class="concept-links">'+l.conceptDependencies.map(d=>'<li>'+link(d.taughtIn,d.concept)+'</li>').join('')+'</ul>':'')+'</details></header>';
}
function courseMap(api,host){
 const p=api.progress,r=resume(p),done=core.filter(l=>lessonState(p,l).done).length;
 document.title='学习路线 · 芯路';
 host.innerHTML='<header class="course-map-header"><p class="eyebrow">芯路 / 数字 IC 学习室</p><h1>Verilog → SystemVerilog</h1><p class="course-map-intro">从真值表到可验证的 RTL，一步一步学会描述电路。</p></header>'+
 '<section class="resume-panel" aria-label="学习进度"><div><span class="eyebrow">你的核心主线</span><h2>'+ (r.viewed?(r.target.id===r.viewed.id?'接着上次，继续理解。':'沿着路线，补齐下一步。'):'从这里开始，不需要编程基础。')+'</h2><p>'+(r.viewed?'最近学习：'+link(r.viewed.id,r.viewed.title)+'<br>本次建议：'+e(r.target.title):'先看学习方法，再认识二进制和逻辑门。')+'</p><a class="primary-button" href="'+href(r.target.id)+'">'+(r.viewed?'继续学习':'开始第一课')+' <span aria-hidden="true">→</span></a></div><div class="resume-progress"><strong>'+done+'<small> / '+core.length+'</small></strong><span>核心课已记录完成</span><progress value="'+done+'" max="'+core.length+'" aria-label="核心课程完成进度"></progress><p>另有 '+L.filter(l=>l.optional).length+' 课进阶选修，按需学习。</p></div></section>'+
 '<div class="map-guide"><p><strong>每课四步</strong> 理解概念 → 拆解代码 → 预测结果 → 独立练习</p><a href="#hdl-orientation">第一次来？先看学习方法 ↗</a></div>'+
 '<section class="course-finder" aria-label="查找课程"><label class="search-wrap" for="hdl-search"><span aria-hidden="true">⌕</span><input id="hdl-search" type="search" placeholder="查课程、语法或术语，例如 always_ff" autocomplete="off"><span class="sr-only">搜索课程与语法</span></label><div class="course-filters" role="group" aria-label="课程范围"><button data-filter="core" aria-pressed="true">核心主线</button><button data-filter="optional" aria-pressed="false">进阶选修</button><button data-filter="all" aria-pressed="false">全部</button></div><p id="hdl-search-count" role="status"></p></section>'+
 '<div id="hdl-map">'+STAGES.map((stage,i)=>{
 const ls=L.filter(l=>l.stage===i),complete=ls.filter(l=>lessonState(p,l).done).length;
 return '<details class="course-stage" data-stage="'+i+'" '+(i===(r.next?.stage??0)?'open':'')+'><summary><span class="stage-index">'+String(i+1).padStart(2,'0')+'</span><div><h2>'+e(stage[0])+'</h2><p>'+e(stage[1])+'</p></div><span class="stage-count">'+complete+' / '+ls.length+'</span><span class="stage-chevron" aria-hidden="true">⌄</span></summary><ol class="lesson-rows">'+ls.map(l=>'<li class="lesson-row" data-optional="'+l.optional+'" data-search="'+e(l.title+' '+l.concept.join(' ')+' '+l.code+' '+l.terms.map(t=>t.join(' ')).join(' '))+'"><a href="'+href(l.id)+'"><span class="row-number">'+String(L.indexOf(l)+1).padStart(2,'0')+'</span><div><h3>'+e(l.title)+'</h3><p>'+e(l.goals.join(' · '))+'</p></div><span class="row-meta">'+(window.IC_TEXTBOOK?.labels[window.IC_TEXTBOOK.level(l,lessonState(p,l))]||'未开始')+' · '+l.minutes+'分'+'</span><span class="row-arrow" aria-hidden="true">→</span></a></li>').join('')+'</ol></details>';
 }).join('')+'</div><div id="hdl-empty" class="empty-search" hidden><h2>暂时没有匹配的课程</h2><p>试试“时钟”“数组”或切换到全部课程。</p><button id="hdl-clear" class="secondary-button">清空搜索并显示全部</button></div>'+
 '<section class="further-study"><h2>阶段 7 · 工程工具与扩展实践</h2><p>配合主线项目，继续使用原有工具课和实践模块。</p><div class="project-links"><a href="#synthesis">RTL 到门级综合 ↗</a><a href="#constraints">时钟与输入输出约束 ↗</a><a href="#dc-run">DC 与报告 ↗</a><a href="#acceptance">完整工程验收 ↗</a><a href="#bits">原版24课 ↗</a><a href="#fpga">FPGA 工程实践 ↗</a></div></section>';
 let filter='core',query='';
 const search=host.querySelector('#hdl-search');
 function apply(){
  let n=0;host.querySelectorAll('.lesson-row').forEach(row=>{
   const scope=filter==='all'||(filter==='optional')===(row.dataset.optional==='true');
   row.hidden=!scope||!row.dataset.search.toLowerCase().includes(query);if(!row.hidden)n++;
  });
  host.querySelectorAll('.course-stage').forEach(stage=>{
   stage.hidden=![...stage.querySelectorAll('.lesson-row')].some(row=>!row.hidden);
   if(query||filter==='optional')stage.open=true;
  });
  host.querySelector('#hdl-search-count').textContent=query?'找到 '+n+' 课':(filter==='core'?''+core.length+' 课核心主线，覆盖基础 RTL 与自检；每课附语法对照与练习阶梯。':filter==='optional'?''+L.filter(l=>l.optional).length+' 课进阶选修，主线完成后按需进入。':'全部 '+L.length+' 课');
  host.querySelector('#hdl-empty').hidden=n>0;
  host.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));
 }
 search.oninput=()=>{query=search.value.toLowerCase().trim();apply()};
 host.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;apply()});
 host.querySelector('#hdl-clear').onclick=()=>{filter='all';query='';search.value='';apply();search.focus();};apply();
}
let readingObserver;
function render(api,id){
 readingObserver?.disconnect();readingObserver=null;
 const {progress:p,persist,refreshNav}=api;p.hdl||={};
 const host=document.querySelector('#lesson'),l=L.find(l=>href(l.id)==='#'+id);
 document.body.classList.add('hdl-mode');document.body.classList.toggle('hdl-lesson-mode',!!l);
 document.querySelector('#pathbar').innerHTML='';
 if(!l){document.body.classList.remove('reading-focus');courseMap(api,host);return;}
 const ix=L.indexOf(l),st=p.hdl[l.id]||(p.hdl[l.id]={draft:'',choice:null,passed:false,done:false,viewedAt:0});
 st.viewedAt=Date.now();persist();document.title=l.title+' · 芯路';
 const sections=[['study-concept','理解概念'],...(l.diagram||l.trace||l.lab?.timing?[['study-example','看图与推演']]:[]),['study-code','逐步拆代码'],['study-quiz','预测与检查'],['study-practice','独立练习']];
 host.innerHTML=lessonHeader(l,ix,p)+'<div class="study-layout"><div class="study-article">'+
 '<section id="study-concept" class="study-section"><p class="section-number">01 / 理解概念</p><h2>'+e(l.goals[0])+'</h2>'+l.concept.map(t=>'<p>'+e(t)+'</p>').join('')+'</section>'+
 (l.diagram||l.trace||l.lab?.timing?'<section id="study-example" class="study-section"><p class="section-number">02 / 看图与推演</p><h2>先顺着这个例子走一遍</h2>'+(l.diagram?diagram(l.diagram)+'<p class="figure-caption">图示采用理想行为模型；横向滑动可查看完整图。</p>':'')+(l.trace?table(l.trace):'')+(['sample','pipeline','counter','reset'].includes(l.diagram)?'<div id="hdl-demo" class="experiment"></div>':'')+(l.diagram==='setup'?'<div id="hdl-window" class="experiment"></div>':'')+'</section>':'')+
 '<section id="study-code" class="study-section"><p class="section-number">代码 / 逐步拆解</p><h2>把规则对应到每一段代码</h2><p class="code-context">'+e(l.context)+'</p><div class="code-workbench"><div class="code-workbench-header"><span>'+e(l.language==='text'||!/^\s*(module|package)\b/m.test(l.code)&&l.code.split('\n').every(x=>!x.trim()||x.trim().startsWith('//'))?'行为规格 / 推导说明':l.language==='terminal'?'系统终端':l.language==='systemverilog'?'SystemVerilog · .sv':'Verilog · .v')+'</span><button id="hdl-copy" class="copy-button">复制代码</button></div><pre><code>'+highlight(l.code)+'</code></pre></div><ol class="code-explanations">'+l.notes.map(t=>'<li>'+e(t)+'</li>').join('')+'</ol><aside class="common-mistake"><strong>容易误会的地方</strong><p>'+e(l.trap)+'</p></aside></section>'+
 '<section id="study-quiz" class="study-section"><p class="section-number">练习 / 先预测</p><h2>'+e(l.q)+'</h2><form id="hdl-quiz"><fieldset><legend class="sr-only">本课理解检查</legend><div class="quiz-options">'+l.options.map((o,i)=>'<label class="quiz-option"><input type="radio" name="hdl-answer" value="'+i+'" '+(st.choice===i?'checked':'')+'><span>'+e(o)+'</span></label>').join('')+'</div></fieldset><button class="secondary-button">检查答案</button><p id="hdl-feedback" class="study-feedback" role="status">'+(st.passed?'答对了。'+e(l.answer):'选好再检查，答案会附推理说明。')+'</p></form></section>'+
 '<section id="study-practice" class="study-section"><p class="section-number">练习 / 独立完成</p><h2>'+e(l.task)+'</h2><label for="hdl-draft">你的推导、代码与验证记录</label><textarea id="hdl-draft" class="exercise-input" maxlength="15000" placeholder="先独立写。实际运行过时，注明工具和结果；还没运行也可以如实记录。"></textarea><p id="hdl-save-note" class="draft-note" role="status">解答随学习进度保存。</p><details class="reference-answer"><summary>写完后展开参考与解释</summary><pre class="hdl-answer">'+e(l.solution)+'</pre></details><div class="complete-row"><button id="hdl-complete" class="primary-button"></button><p id="hdl-completion" role="status"></p></div></section>'+
 '<nav class="lesson-navigation study-bottom-nav" aria-label="前后课程">'+(ix?'<div><small>上一课</small>'+link(L[ix-1].id,L[ix-1].title)+'</div>':'<a href="#hdl">学习路线</a>')+(ix<L.length-1?'<div><small>'+(!l.optional&&L[ix+1].optional?'核心主线已结束 · 下一课为选修':'下一课')+'</small>'+link(L[ix+1].id,L[ix+1].title+' →')+'</div>':'<a href="#hdl">返回学习路线 →</a>')+'</nav>'+
 '<details class="lesson-sources"><summary>参考资料与工具说明</summary><p>网页演示不执行HDL。Verilog采用常见2001语法；SV代码需启用相应模式，高级验证支持因工具而异。</p><div class="source-links"><a href="https://docs.amd.com/r/2024.1-English/ug903-vivado-using-constraints/Multicycle-Paths" target="_blank" rel="noopener">AMD · 多周期约束与边沿关系 ↗</a><a href="https://docs.altera.com/r/docs/683323/18.1/intel-quartus-prime-standard-edition-user-guide-design-recommendations/metastability-analysis-in-the-intel-quartus-prime-software" target="_blank" rel="noopener">Altera · 亚稳态与同步链 ↗</a><a href="https://steveicarus.github.io/iverilog/usage/getting_started.html" target="_blank" rel="noopener">Icarus 官方运行指南 ↗</a><a href="https://steveicarus.github.io/iverilog/usage/installation.html" target="_blank" rel="noopener">安装文档 ↗</a><a href="https://fpga.mit.edu/6205/_static/F24/lectures/L03.pdf" target="_blank" rel="noopener">MIT · SystemVerilog 讲义 ↗</a></div></details></div>'+
 '<aside class="lesson-rail"><div class="reading-tools" aria-label="阅读设置"><button id="reading-size" aria-pressed="false">大字阅读</button><button id="reading-focus" aria-pressed="false">专注阅读</button></div><nav aria-label="本课导航"><h2>本课内容</h2>'+sections.map(([id,title])=>'<button data-jump="'+id+'">'+e(title)+'</button>').join('')+'</nav><details class="lesson-terms"><summary>本课词条</summary><dl>'+l.terms.map(([t,v])=>'<dt>'+e(t)+'</dt><dd>'+e(v)+'</dd>').join('')+'</dl></details><a class="rail-map" href="#hdl">查看完整学习路线 ↗</a></aside></div>';
 if(['capstone','memory','fifo-project','uart-project','integration'].includes(l.id)){const kit=document.createElement('p');kit.className='project-kit-link';kit.innerHTML='<a class="secondary-button" href="/rtl-lab/rtl-projects.zip" download>下载工程：RTL、完整自检TB与运行说明 ↓</a><br><a href="/rtl-lab/README.md" target="_blank" rel="noopener">查看规格、验证范围与验收条件</a>';host.querySelector('#study-code').append(kit);}
 const draft=host.querySelector('#hdl-draft');draft.value=st.draft;
 const focus=host.querySelector('#reading-focus'),size=host.querySelector('#reading-size');
 function settings(){
  const big=document.body.classList.contains('reading-large'),focused=document.body.classList.contains('reading-focus');
  size.setAttribute('aria-pressed',String(big));size.textContent=big?'恢复字号':'大字阅读';
  focus.setAttribute('aria-pressed',String(focused));focus.textContent=focused?'退出专注':'专注阅读';
 }
 try{document.body.classList.toggle('reading-large',localStorage.getItem('ic.reading-large')==='1')}catch{}
 settings();size.onclick=()=>{document.body.classList.toggle('reading-large');try{localStorage.setItem('ic.reading-large',document.body.classList.contains('reading-large')?'1':'0')}catch{}settings()};
 focus.onclick=()=>{document.body.classList.toggle('reading-focus');settings()};
 function syncCount(){
  refreshNav();
  const a=document.querySelector('#course-nav a[href="'+href(l.id)+'"]');if(a){a.classList.add('active');a.setAttribute('aria-current','page');a.closest('details').open=true;}
 }
 function status(){
  const b=host.querySelector('#hdl-complete');b.textContent=st.done?'已完成 · 标为待复习':'记录本课完成';
  b.disabled=!st.done&&(!st.passed||!st.draft.trim()||!window.IC_TEXTBOOK?.canComplete(l,st));
  host.querySelector('#hdl-completion').textContent=st.done?'已保存。可以继续下一课，或回看巩固。':!st.passed?'先回答这个问题，再把推导过程写下来。':!st.draft.trim()?'检查已通过；现在写下你的解答。':window.IC_TEXTBOOK?.canComplete(l,st)?'已满足记录条件；自查后可标记为已掌握（自评）。':'继续完成本课练习阶梯，再记录掌握状态。';
 }
 draft.oninput=()=>{const old=st.done;st.draft=draft.value;st.done=false;persist();host.querySelector('#hdl-save-note').textContent='解答已写入本机；登录后的云端同步状态见左侧目录。';if(old)syncCount();status()};
 host.querySelector('#hdl-quiz').onchange=()=>{const old=st.done;st.choice=Number(host.querySelector('[name="hdl-answer"]:checked').value);st.passed=false;st.done=false;persist();host.querySelector('#hdl-feedback').textContent='答案已改变，再检查一次。';if(old)syncCount();status()};
 host.querySelector('#hdl-quiz').onsubmit=ev=>{ev.preventDefault();const feedback=host.querySelector('#hdl-feedback');if(st.choice===null){feedback.textContent='先选择一个答案。';return;}st.quizRevision=l.quizRevision||1;st.passed=st.choice===l.correct;feedback.textContent=(st.passed?'答对了。':'还需要想一下。')+l.answer;feedback.dataset.passed=String(st.passed);persist();status()};
 host.querySelector('#hdl-complete').onclick=()=>{st.done=!st.done;persist();syncCount();status()};
 host.querySelector('#hdl-copy').onclick=async()=>{try{await navigator.clipboard.writeText(l.code);api.toast('代码已复制')}catch{api.toast('复制受限，请选中代码手动复制')}};
 host.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>{const target=document.getElementById(b.dataset.jump);target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});target.setAttribute('tabindex','-1');target.focus({preventScroll:true})});
 if(typeof IntersectionObserver!=='undefined'){
  readingObserver=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){host.querySelectorAll('[data-jump]').forEach(b=>{const on=b.dataset.jump===entry.target.id;b.classList.toggle('current',on);if(on)b.setAttribute('aria-current','location');else b.removeAttribute('aria-current')})}},{rootMargin:'-80px 0px -55% 0px',threshold:0});
  sections.forEach(([id])=>readingObserver.observe(document.getElementById(id)));
 }
 attachExperiments(host,l);
 window.IC_TEXTBOOK?.enhance({...api,refreshStatus:status},l);
 status();
}
function attachExperiments(host,l){
 const demo=host.querySelector('#hdl-demo');
 if(demo){
  let d=1,a=0,b=0,en=1,rst=1,n=0,history=[];const counter=l.diagram==='counter',pipeline=l.diagram==='pipeline',reset=l.diagram==='reset';
  let asyncMode=false;
  demo.innerHTML='<div class="experiment-heading"><h3>动手观察 · 一次只推进一个边沿</h3>'+(reset?'<label>复位类型 <select id="hd-mode"><option value="sync">同步低有效</option><option value="async">异步低有效</option></select></label>':'')+'</div><div class="experiment-values"><span id="hd-input"></span><span id="hd-output"></span></div><div class="lab-controls"><button id="hd-d" class="lab-button">切换 '+(counter?'en':'D')+'</button><button id="hd-r" class="lab-button">拉低复位</button><button id="hd-step" class="primary-button">下一上升沿 ↑</button><button id="hd-reset" class="quiet-button">重新开始</button></div><p id="hd-state" role="status"></p><div class="teaching-table"><table><caption>沿后状态记录 · 最近8次</caption><thead><tr><th>沿</th><th>'+(counter?'en':'D')+'</th><th>rst_n</th><th>'+(pipeline?'a / b':'Q')+'</th></tr></thead><tbody id="hd-history"></tbody></table></div><p class="figure-caption">起点假定已复位。除“复位”课的异步选项外，模型按同步复位采样；真实电路延迟、亚稳态和复位释放约束不在此模型中。</p>';
  const $=s=>demo.querySelector(s);
  function update(message){
   $('#hd-input').textContent=(counter?'en='+en:'D='+d)+' · rst_n='+rst;
   $('#hd-output').textContent=pipeline?'a='+a+'，b='+b:'Q='+a;
   $('#hd-r').textContent=rst?'拉低复位':'释放复位';
   $('#hd-state').textContent=message||'输入已准备好。先预测沿后值，再给一个上升沿。';
   $('#hd-history').innerHTML=history.length?history.slice(-8).map(r=>'<tr>'+r.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join(''):'<tr><td colspan="4">尚未推进时钟；起点Q=0。</td></tr>';
  }
  $('#hd-d').onclick=()=>{if(counter)en^=1;else d^=1;update('输入已变化，未产生时钟沿；输出保持。')};
  $('#hd-r').onclick=()=>{rst^=1;if(asyncMode&&!rst){a=0;b=0;update('异步复位拉低：不用等时钟，Q立即清零（理想模型）。')}else update(rst?'复位已释放；等待下一个有效沿采样数据。':'同步复位拉低：还没有时钟沿，Q保持。')};
  $('#hd-step').onclick=()=>{const old=a;n++;if(!rst){a=0;b=0}else{a=counter?(en?(a+1)&15:a):d;b=old}history.push([n,counter?en:d,rst,pipeline?a+' / '+b:a]);update(!rst?'第'+n+'沿：复位优先，状态清零。':pipeline?'第'+n+'沿：a采D='+d+'，b采旧a='+old+'。':counter?'第'+n+'沿：'+(en?'Q加1并保留4位。':'使能为0，Q保持。'):'第'+n+'沿：Q采到D='+d+'。')};
  function restart(){d=1;en=1;rst=1;a=0;b=0;n=0;history=[];update('回到已复位起点；还没有推进时钟。')}
  $('#hd-reset').onclick=restart;
  if(reset)$('#hd-mode').onchange=ev=>{asyncMode=ev.target.value==='async';restart()};
  update();
 }
 const w=host.querySelector('#hdl-window');
 if(w){
  w.innerHTML='<h3>试一试：把数据变化放到哪里？</h3><label for="hd-change">D变化时刻 <output id="hd-time">7.0 ns</output></label><input id="hd-change" type="range" min="5" max="14" step="0.1" value="7"><div class="window-scale"><span>5ns</span><span>8ns · setup开始</span><span>10ns ↑</span><span>11ns · hold结束</span><span>14ns</span></div><div class="window-indicator" aria-hidden="true"><span class="window-band"></span><span id="hd-marker"></span><span class="window-clock"></span></div><p id="hd-result" role="status"></p>';
  const update=()=>{const t=+w.querySelector('input').value,risk=t>=8&&t<=11;w.querySelector('output').textContent=t.toFixed(1)+' ns';w.querySelector('#hd-marker').style.left=((t-5)/9*100)+'%';w.querySelector('#hd-result').textContent=risk?'变化落入示例稳定窗口：存在采样风险，不表示一定采错；边界按实际库要求判定。':'这次变化在窗口外；仍需保证8～11ns没有其他数据变化。';w.querySelector('#hd-result').dataset.risk=String(risk)};
  w.querySelector('input').oninput=update;update();
 }
}
window.IC_HDL={isRoute,render,nav,normalize,lessons:L,resume};
})();
