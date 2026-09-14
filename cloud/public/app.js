'use strict';
(() => {
const {LESSONS,STAGES,SOURCES}=window.IC_COURSE;
const MODEL=window.IC_MODELS;
const KEY='ic-pathway.progress.v1';
const $=(s,root=document)=>root.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const blank=()=>({schema:1,course:'ic-pathway',last:'bits',lessons:{},acceptance:{},ultra:{}});
const CHECKS=['我能脱离参考解释组合逻辑、触发器和非阻塞赋值。','我独立写过计数器 RTL，并解释了复位、使能和回绕。','我实际运行过自检，覆盖六类关键行为，并确认故意引入的错误会失败。','我在学校 VCS 环境重新编译并运行了同一设计，保存了实际日志和波形。','我用实际标准单元库与确认过的约束运行了 DC，并检查未约束路径及重要警告。','我保存了网表、面积/建立/保持报告，能解释结果的单位、条件与剩余限制。'];
let progress=blank(),canStore=true,current,toastTimer,suppressSync=false;
function normalize(raw){
 if(!raw||raw.schema!==1||raw.course!=='ic-pathway'||!raw.lessons||typeof raw.lessons!=='object')throw Error('不属于这套课程的进度文件');
 const out=blank();
 if(LESSONS.some(l=>l.id===raw.last)||raw.last==='ultra'||window.IC_ULTRA.stages.some(s=>'ultra-'+s.id===raw.last))out.last=raw.last;
 for(const l of LESSONS){const v=raw.lessons[l.id];if(!v||typeof v!=='object')continue;const draft=typeof v.draft==='string'?v.draft.slice(0,15000):'';const choice=Number.isInteger(v.choice)&&v.choice>=0&&v.choice<l.quiz.options.length?v.choice:null;const quizPassed=choice===l.quiz.correct&&v.quizPassed===true;out.lessons[l.id]={draft,choice,quizPassed,completed:!!v.completed&&quizPassed&&!!draft.trim(),extraDraft:typeof v.extraDraft==='string'?v.extraDraft.slice(0,15000):'',extraChoices:[0,1].map(i=>Number.isInteger(v.extraChoices?.[i])?v.extraChoices[i]:null),extraPassed:[0,1].map(i=>v.extraPassed?.[i]===true&&v.extraChoices?.[i]===l.extraQuizzes[i].correct),selfChecked:!!v.selfChecked};}
 for(let i=0;i<CHECKS.length;i++)out.acceptance[i]=raw.acceptance?.[i]===true;
 out.ultra={};
 for(const u of window.IC_ULTRA.stages){
  const v=raw.ultra?.[u.id];if(!v||typeof v!=='object')continue;
  const clean=x=>({draft:typeof x.draft==='string'?x.draft.slice(0,30000):'',choices:[0,1,2,3].map(i=>Number.isInteger(x.choices?.[i])&&x.choices[i]>=0&&x.choices[i]<3?x.choices[i]:null),checks:[0,1,2].map(i=>x.checks?.[i]===true)});
  out.ultra[u.id]={...clean(v),reference:v.reference===true,attempts:(Array.isArray(v.attempts)?v.attempts:[]).filter(a=>a&&typeof a==='object'&&Number.isFinite(Date.parse(a.at))).slice(-10).map(a=>({...clean(a),at:a.at,assisted:!!a.assisted,score:LESSONS.slice(...u.range).filter((l,i)=>a.choices?.[i]===l.extraQuizzes[i%2].correct).length}))};
 }
 return out;
}
try{const raw=localStorage.getItem(KEY);if(raw)progress=normalize(JSON.parse(raw));}catch{canStore=false;}
function state(id=current.id){return progress.lessons[id]||(progress.lessons[id]={draft:'',choice:null,quizPassed:false,completed:false,extraDraft:'',extraChoices:[null,null],extraPassed:[false,false],selfChecked:false});}
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),4000);}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(progress));canStore=true;}catch{canStore=false;}if(!suppressSync)window.IC_SYNC?.schedule();}

function download(name,text,type='application/json'){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([text],{type}));a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);}
function codePanel(code){return code?`<div class="code-panel"><div class="code-header"><span>${esc(code.name)}</span><button class="copy-button" data-copy>复制代码</button></div><pre><code>${esc(code.text)}</code></pre></div>`:'';}
function renderNav(){
 const done=LESSONS.filter(l=>state(l.id).completed).length;
 $('#overall-count').textContent=`${done} / ${LESSONS.length}`;
 $('#overall-progress').max=LESSONS.length;$('#overall-progress').value=done;
 $('#course-nav').innerHTML=STAGES.map((s,i)=>`<div class="nav-group"><h2 class="nav-group-title"><span>${String(i+1).padStart(2,'0')}</span>${esc(s.title)}</h2>${LESSONS.filter(l=>l.stage===i).map(l=>`<a class="lesson-link ${l.id===current.id?'active':''}" href="#${l.id}" ${l.id===current.id?'aria-current="page"':''}><span class="nav-number">${String(LESSONS.indexOf(l)+1).padStart(2,'0')}</span><span>${esc(l.title)}</span>${state(l.id).completed?'<span class="nav-done" aria-label="本课已完成">✓</span>':''}</a>`).join('')}</div>`).join('');
 $('#course-nav').insertAdjacentHTML('beforeend','<div class="nav-group"><h2 class="nav-group-title">ULTRA · 阶段检验</h2><a class="lesson-link" href="#ultra">独立任务与检验记录</a></div>');
 $('#pathbar').innerHTML=STAGES.map((s,i)=>`<button class="stage-button ${i===current.stage?'active':''}" data-stage="${i}" ${i===current.stage?'aria-current="step"':''}><span>${String(i+1).padStart(2,'0')}</span>${esc(s.short)}</button>`).join('');
 $('#pathbar').querySelectorAll('[data-stage]').forEach(b=>b.onclick=()=>navigate(LESSONS.find(l=>l.stage===Number(b.dataset.stage)).id));
}
function navigate(id){if(location.hash==='#'+id){renderLesson(id,true);}else location.hash=id;}
function setMenu(open){$('#sidebar').classList.toggle('open',open);$('#sidebar-backdrop').hidden=!open;$('#menu-button').setAttribute('aria-expanded',String(open));$('#menu-button').setAttribute('aria-label',open?'关闭课程目录':'打开课程目录');}
function checklist(){return `<section class="exercise-card"><div class="section-label">实操验收 · 由你确认实际证据</div><h2>走通流程的六项证据</h2><div class="checklist">${CHECKS.map((text,i)=>`<label><input type="checkbox" data-accept="${i}" ${progress.acceptance[i]?'checked':''}><span>${esc(text)}</span></label>`).join('')}</div><p id="acceptance-count" class="completion-note"></p></section>`;}
function updateAcceptance(){const n=CHECKS.filter((_,i)=>progress.acceptance[i]).length;const el=$('#acceptance-count');if(el)el.textContent=`已由你确认 ${n} / ${CHECKS.length} 项。未执行的实操请保留未勾选。`;}
function completionStatus(){
 const st=state(),el=$('#completion-note');const enhanced=st.extraDraft?.trim()&&st.extraPassed?.every(Boolean)&&st.selfChecked;el.classList.toggle('done',st.completed);
 el.textContent=st.completed?'已记录本课完成。真实工具实操情况请在最终验收中单独确认。':st.quizPassed&&st.draft.trim()&&enhanced?'三道选择题已通过，两份解答已保存并自查。可以记录本课完成。':'完成原练习、新增代码题并自查，答对三道选择题后可记录完成。旧版已完成记录保留，新题可补练。';
 const b=$('#complete-lesson');b.textContent=st.completed?'已完成 · 重新标为待复习':'记录本课完成';b.disabled=!st.completed&&(!st.quizPassed||!st.draft.trim()||!enhanced);
}
function renderLesson(id,focus=false){
 if(id==='ultra'||id.startsWith('ultra-')){
 current=current||LESSONS[0];progress.last=id;persist();renderNav();setMenu(false);
 window.IC_ULTRA.render({progress,persist,esc,toast},id==='ultra'?null:id.slice(6));
 if(focus)window.scrollTo({top:0,behavior:'instant'});return;
 }

 current=LESSONS.find(l=>l.id===id)||LESSONS[0];progress.last=current.id;persist();const st=state(),index=LESSONS.indexOf(current);
 renderNav();setMenu(false);document.title=`${current.title} · 芯路`;
 const sourceHtml=(current.sources||[]).map(k=>SOURCES[k]).filter(Boolean).map(([name,url])=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(name)} ↗</a>`).join('');
 const downloadHtml=current.download?`<aside class="side-note"><h3>计数器参考项目</h3><p>包含 RTL、自检测试台、Icarus/VCS 脚本与 DC 教学模板。商业工具和单元库由学校提供。</p><a class="resource-download" href="/downloads/ic-counter-lab.zip" download>下载完整练习包 .zip ↓</a><a href="/downloads/README.txt" target="_blank" rel="noopener" class="source-links">先读操作与验证说明 ↗</a></aside>`:'';
 $('#lesson').innerHTML=`<header class="lesson-header"><div class="lesson-topline"><span class="label">${esc(STAGES[current.stage].title)} / ${String(index+1).padStart(2,'0')}</span><span>第 ${index+1} / ${LESSONS.length} 课 · 初读约 ${current.minutes} 分钟</span></div><h1>${esc(current.title)}</h1><p class="lesson-intro">${esc(current.intro)}</p><ul class="objective-list">${current.goals.map(g=>`<li>${esc(g)}</li>`).join('')}</ul></header><div class="lesson-layout"><div class="reading-column">${current.sections.map(([h,p])=>`<section class="reading-block"><h2>${esc(h)}</h2><p>${esc(p)}</p></section>`).join('')}${codePanel(current.code)}${current.deep?`<section class="reading-block"><h2>再拆细一点</h2><p>${esc(current.deep.explain)}</p></section>${codePanel({name:'对照示例 · 留意片段使用前提',text:current.deep.example})}<section class="reading-block"><h2>跟着代码走一遍</h2><p>${esc(current.deep.walk)}</p></section>`:''}<aside class="callout warning"><strong>容易弄错的地方</strong>${esc(current.trap)}</aside></div><div class="practice-column">${current.lab?'<section id="interactive-lab" class="lab-card" aria-label="本课交互演示"></section>':''}<aside class="side-note"><h3>这课怎么学</h3><p>先预测结果，再动手验证。把不理解的地方写进下面的练习回答，回看参考解答时逐项对照。</p><p>${current.stage<3?'网页演示采用明确规则的教学模型，真实代码请在仿真器中验证。':'VCS / DC 命令按学校安装版本核对。真实工具结果与网页知识检查分别记录。'}</p></aside>${downloadHtml}<aside class="side-note"><h3>延伸资料</h3><div class="source-links">${sourceHtml}</div><p style="margin-top:12px">英文资料用于核对和深入阅读。本课先掌握上面的中文概念与练习。</p></aside></div></div><section class="exercise-card"><div class="section-label">动手练习 / 先独立想一遍</div><h2>写下你的解答</h2><p id="exercise-task">${esc(current.exercise.task)}</p><label for="exercise-answer" class="sr-only">本课练习回答</label><textarea id="exercise-answer" class="exercise-input" maxlength="15000" aria-describedby="exercise-task" placeholder="${esc(current.exercise.placeholder)}"></textarea><div class="button-row"><button id="save-answer" class="secondary-button">保存我的解答</button><span id="draft-status" class="completion-note" aria-live="polite"></span></div><details class="answer-details"><summary>查看参考解答与核对方向</summary><p style="white-space:pre-wrap">${esc(current.exercise.answer)}</p></details><p class="completion-note">开放题请结合参考解答自查；网站不会把保存文本当作代码编译或正确性验证。</p></section><section class="exercise-card"><div class="section-label">知识检查 / 即时反馈</div><form id="quiz-form"><fieldset><legend class="quiz-question">${esc(current.quiz.q)}</legend><div class="quiz-options">${current.quiz.options.map((o,i)=>`<label class="quiz-option"><input type="radio" name="quiz" value="${i}" ${st.choice===i?'checked':''}><span>${String.fromCharCode(65+i)}. ${esc(o)}</span></label>`).join('')}</div></fieldset><div class="button-row"><button class="primary-button" type="submit">检查答案</button></div><div id="quiz-feedback" class="feedback ${st.quizPassed?'good':''}" role="status">${st.quizPassed?'回答正确。'+esc(current.quiz.why):''}</div></form></section>${current.checklist?checklist():''}<div class="lesson-navigation"><button id="prev-lesson" class="secondary-button" ${index===0?'disabled':''}>上一课</button><button id="complete-lesson" class="primary-button">记录本课完成</button><button id="next-lesson" class="secondary-button" ${index===LESSONS.length-1?'disabled':''}>下一课 →</button></div><p id="completion-note" class="completion-note"></p>`;
 renderExtra(st);
 $('#exercise-answer').value=st.draft;
 $('#exercise-answer').oninput=()=>{st.draft=$('#exercise-answer').value;if(!st.draft.trim()&&st.completed){st.completed=false;renderNav();}persist();$('#draft-status').textContent=canStore?'已暂存 · 云端状态见目录上方':'暂存于当前页面，请导出';completionStatus();};
 $('#save-answer').onclick=()=>{st.draft=$('#exercise-answer').value;persist();$('#draft-status').textContent=canStore?'已保存':'请导出进度';toast(canStore?'解答已暂存，云端同步状态见目录上方':'浏览器未允许暂存，请检查云端状态或导出');completionStatus();};
 $('#quiz-form').onchange=()=>{st.choice=Number($('#quiz-form input:checked').value);st.quizPassed=false;st.completed=false;persist();renderNav();$('#quiz-feedback').textContent='';completionStatus();};
 $('#quiz-form').onsubmit=e=>{e.preventDefault();const checked=$('#quiz-form input:checked'),feedback=$('#quiz-feedback');if(!checked){feedback.className='feedback';feedback.textContent='先选择一个答案，再检查。';return;}st.choice=Number(checked.value);st.quizPassed=st.choice===current.quiz.correct;if(!st.quizPassed)st.completed=false;feedback.className='feedback '+(st.quizPassed?'good':'bad');feedback.textContent=(st.quizPassed?'回答正确。':'还需要再想一下。')+current.quiz.why;persist();renderNav();completionStatus();};
 $('#complete-lesson').onclick=()=>{st.completed=!st.completed;persist();renderNav();completionStatus();toast(st.completed?'本课完成已记录，可以继续下一课':'已标为待复习');};
 $('#prev-lesson').onclick=()=>index>0&&navigate(LESSONS[index-1].id);
 $('#next-lesson').onclick=()=>index<LESSONS.length-1&&navigate(LESSONS[index+1].id);
 document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{const code=button.closest('.code-panel').querySelector('code');try{await navigator.clipboard.writeText(code.textContent);toast('代码已复制');}catch{const range=document.createRange();range.selectNodeContents(code);const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);toast('已选中代码，请复制');}}));
 document.querySelectorAll('[data-accept]').forEach(input=>input.onchange=()=>{progress.acceptance[input.dataset.accept]=input.checked;persist();updateAcceptance();});
 updateAcceptance();completionStatus();if(current.lab)renderLab(current.lab);
 if(focus){window.scrollTo({top:0,behavior:'instant'});$('#lesson').focus({preventScroll:true});}
}
function renderExtra(st){
 st.extraChoices||=[null,null];st.extraPassed||=[false,false];
 const ex=current.extraExercise;
 const html=`<section class="exercise-card"><div class="section-label">新增代码实践 / 独立完成</div><h2>再写一道代码题</h2><p>${esc(ex.task)}</p>${codePanel({name:'代码骨架 · 按题目要求补全',text:ex.starter})}<label for="extra-draft">你的实现与测试记录</label><textarea id="extra-draft" class="exercise-input" maxlength="15000" placeholder="写下代码、预期结果和已完成的验证…"></textarea><details class="answer-details"><summary>参考实现与核对要点</summary><pre class="ultra-code">${esc(ex.answer)}</pre><ul>${ex.checks.map(c=>`<li>${esc(c)}</li>`).join('')}</ul></details><label class="selfcheck"><input id="extra-selfcheck" type="checkbox" ${st.selfChecked?'checked':''}>我已对照要点自查，并注明了尚未实际运行的内容</label><p class="completion-note">网站保存代码草稿，不在浏览器执行 Verilog。保存与自查不等于仿真通过。</p></section><section class="exercise-card"><div class="section-label">新增知识检查 / 2 题</div>${current.extraQuizzes.map((q,i)=>`<form data-extra-quiz="${i}"><fieldset><legend class="quiz-question">${i+2}. ${esc(q.q)}</legend><div class="quiz-options">${q.options.map((o,j)=>`<label class="quiz-option"><input type="radio" name="extra${i}" value="${j}" ${st.extraChoices[i]===j?'checked':''}><span>${esc(o)}</span></label>`).join('')}</div></fieldset><button class="secondary-button" type="submit">检查答案</button><p class="feedback" role="status">${st.extraPassed[i]?'正确。'+esc(q.why):''}</p></form>`).join('')}</section>`;
 $('.lesson-navigation').insertAdjacentHTML('beforebegin',html);
 $('#extra-draft').value=st.extraDraft||'';
 $('#extra-draft').oninput=e=>{st.extraDraft=e.target.value;st.selfChecked=false;$('#extra-selfcheck').checked=false;persist();completionStatus();};
 $('#extra-selfcheck').onchange=e=>{st.selfChecked=e.target.checked;persist();completionStatus();};
 document.querySelectorAll('[data-extra-quiz]').forEach(form=>{const i=+form.dataset.extraQuiz,q=current.extraQuizzes[i];form.onchange=()=>{st.extraChoices[i]=+form.querySelector('input:checked').value;st.extraPassed[i]=false;form.querySelector('.feedback').textContent='';persist();completionStatus();};form.onsubmit=e=>{e.preventDefault();const checked=form.querySelector('input:checked');if(!checked){toast('请先选一个答案');return;}st.extraChoices[i]=+checked.value;st.extraPassed[i]=st.extraChoices[i]===q.correct;form.querySelector('.feedback').textContent=(st.extraPassed[i]?'正确。':'需要再想想。')+q.why;persist();completionStatus();};});
 const milestones=window.IC_ULTRA.stages.filter(s=>s.after===LESSONS.indexOf(current)+1);
 for(const m of milestones)$('.lesson-navigation').insertAdjacentHTML('beforebegin',`<aside class="callout ultra-callout"><strong>阶段检验入口 · ${esc(m.title)}</strong><p>学完本课后，试着独立完成这一阶段的任务。</p><a href="#ultra-${m.id}" class="primary-button">进入 Ultra</a></aside>`);
}
function labFrame(title,desc,content,note='教学模型 · 使用 JavaScript 计算，不执行 Verilog，也不模拟器件延迟。'){$('#interactive-lab').innerHTML=`<div class="lab-eyebrow">动手观察 / INTERACTIVE</div><h2>${esc(title)}</h2><p>${esc(desc)}</p>${content}<p class="lab-note">${esc(note)}</p>`;}
function readout(label,value,id=''){return `<div class="readout"><span>${esc(label)}</span><strong ${id?'id="'+id+'"':''}>${esc(value)}</strong></div>`;}
function wave(values,labels=['count']){
 const n=Math.max(1,values.length),width=Math.max(320,n*42+55),rowH=38;
 let body='';for(let i=0;i<n;i++)body+=`<line class="grid" x1="${50+i*42}" x2="${50+i*42}" y1="0" y2="${labels.length*rowH+30}"/>`;
 labels.forEach((label,r)=>{let y=20+r*rowH;body+=`<text x="0" y="${y+4}">${esc(label)}</text>`;for(let i=0;i<n;i++){const v=Array.isArray(values[i])?values[i][r]:values[i];body+=`<rect x="${53+i*42}" y="${y-12}" width="36" height="24" rx="3" fill="#304c5c"/><text x="${71+i*42}" y="${y+4}" text-anchor="middle">${esc(v)}</text>`;}});
 for(let i=0;i<n;i++)body+=`<text x="${71+i*42}" y="${labels.length*rowH+20}" text-anchor="middle">${i}</text>`;
 return `<svg class="wave-svg" role="img" aria-label="逐拍状态记录，按列从左到右阅读" viewBox="0 0 ${width} ${labels.length*rowH+30}">${body}</svg>`;
}
function renderLab(kind){
 if(kind==='bits'){
  let value=10;labFrame('四个位，十六种可能','点击任意一个位，观察权重与十进制值。',`<div class="bit-grid">${[3,2,1,0].map(i=>`<button class="bit" data-bit="${i}" aria-label="切换第${i}位" aria-pressed="false">0<small>权重 ${2**i}</small></button>`).join('')}</div><div class="readouts">${readout('无符号十进制','10','bit-dec')}${readout('二进制','1010','bit-bin')}</div><div id="bit-equation" class="equation"></div><button id="bit-add" class="lab-button">加 1，保留低 4 位</button>`);
  const update=()=>{document.querySelectorAll('[data-bit]').forEach(b=>{const i=Number(b.dataset.bit),on=(value>>i)&1;b.setAttribute('aria-pressed',String(!!on));b.innerHTML=`${on}<small>权重 ${2**i}</small>`;});$('#bit-dec').textContent=value;$('#bit-bin').textContent=value.toString(2).padStart(4,'0');$('#bit-equation').textContent=[3,2,1,0].map(i=>`${(value>>i)&1}×${2**i}`).join(' + ')+` = ${value}`;};
  document.querySelectorAll('[data-bit]').forEach(b=>b.onclick=()=>{value^=1<<Number(b.dataset.bit);update();});$('#bit-add').onclick=()=>{value=(value+1)&15;update();};update();
 }else if(kind==='gates'){
  let a=0,b=1,gate='AND';const calc=(x,y)=>gate==='AND'?x&y:gate==='OR'?x|y:x^y;
  labFrame('切换输入，读懂真值表','先猜输出，再切换逻辑门验证。',`<label for="gate-type">逻辑门 <select id="gate-type" class="lab-select"><option>AND</option><option>OR</option><option>XOR</option></select></label><div class="lab-controls"><button id="gate-a" class="lab-button" aria-pressed="false">A = 0</button><button id="gate-b" class="lab-button" aria-pressed="true">B = 1</button></div><div class="readouts">${readout('当前输出 Y','0','gate-out')}${readout('逻辑关系','A & B','gate-expr')}</div><table class="truth-table"><caption class="sr-only">当前逻辑门真值表</caption><thead><tr><th>A</th><th>B</th><th>Y</th></tr></thead><tbody id="truth-body"></tbody></table>`);
  const update=()=>{$('#gate-a').textContent='A = '+a;$('#gate-a').setAttribute('aria-pressed',String(!!a));$('#gate-b').textContent='B = '+b;$('#gate-b').setAttribute('aria-pressed',String(!!b));$('#gate-out').textContent=calc(a,b);$('#gate-expr').textContent=`A ${{AND:'&',OR:'|',XOR:'^'}[gate]} B`;$('#truth-body').innerHTML=[0,1,2,3].map(n=>{const x=n>>1,y=n&1;return `<tr class="${x===a&&y===b?'highlight':''}"><td>${x}</td><td>${y}</td><td>${calc(x,y)}</td></tr>`;}).join('');};
  $('#gate-a').onclick=()=>{a^=1;update();};$('#gate-b').onclick=()=>{b^=1;update();};$('#gate-type').onchange=e=>{gate=e.target.value;update();};update();
 }else if(kind==='mux'){
  let sel=0;labFrame('二选一数据通路','调整两个 4 位输入，切换选择信号。',`<div class="lab-controls"><label>A <input id="mux-a" class="lab-input" type="number" min="0" max="15" step="1" value="9"></label><label>B <input id="mux-b" class="lab-input" type="number" min="0" max="15" step="1" value="7"></label></div><button id="mux-select" class="lab-button" aria-pressed="false">sel = 0 · 选择 A</button><div class="readouts">${readout('MUX 输出 Y','9','mux-out')}${readout('5 位加法结果','10000','mux-sum')}</div><p id="mux-equation" class="equation"></p>`);
  const update=()=>{const av=Number($('#mux-a').value),bv=Number($('#mux-b').value);if(!Number.isInteger(av)||!Number.isInteger(bv)||av<0||av>15||bv<0||bv>15||$('#mux-a').value===''||$('#mux-b').value===''){$('#mux-equation').textContent='请输入 0～15 的整数。';$('#mux-out').textContent='—';$('#mux-sum').textContent='—';return;}$('#mux-out').textContent=sel?bv:av;$('#mux-sum').textContent=(av+bv).toString(2).padStart(5,'0');$('#mux-equation').textContent=`${av} + ${bv} = ${av+bv}`;};
  $('#mux-a').oninput=update;$('#mux-b').oninput=update;$('#mux-select').onclick=()=>{sel^=1;$('#mux-select').textContent=`sel = ${sel} · 选择 ${sel?'B':'A'}`;$('#mux-select').setAttribute('aria-pressed',String(!!sel));update();};update();
 }else if(kind==='clock'||kind==='nba'){
  let d=1,a=0,b=0,history=[[0,0]];const nba=kind==='nba';
  labFrame(nba?'旧值如何流过两级寄存器':'边沿到来，才采样 D',nba?'a <= d；b <= a。每次采样后比较 a 和 b。':'改变 D 不会立即改变 Q。点击时钟上升沿再看结果。',`<div class="lab-controls"><button id="ff-d" class="lab-button" aria-pressed="true">D = 1</button><button id="ff-edge" class="lab-button primary">给一个上升沿 ↑</button><button id="ff-reset" class="lab-button">复位并给一拍</button></div><div class="readouts">${readout(nba?'寄存器 a':'D 输入','1','ff-a')}${readout(nba?'寄存器 b':'Q 保存值','0','ff-b')}</div><div id="ff-history" class="wave-wrap"></div><p id="ff-caption"></p>`);
  const update=()=>{$('#ff-d').textContent='D = '+d;$('#ff-d').setAttribute('aria-pressed',String(!!d));$('#ff-a').textContent=nba?a:d;$('#ff-b').textContent=nba?b:a;$('#ff-history').innerHTML=wave(history,nba?['a','b']:['D','Q']);};
  $('#ff-d').onclick=()=>{d^=1;update();$('#ff-caption').textContent='输入已变化；寄存器还没采到新的边沿。';};
  $('#ff-edge').onclick=()=>{const old=a;({a,b}=MODEL.pipeline(a,d));history.push(nba?[a,b]:[d,a]);history=history.slice(-7);update();$('#ff-caption').textContent=nba?`a 采到 D=${d}；b 采到旧 a=${old}。`:`Q 在这个边沿采到 D=${d}。`;};
  $('#ff-reset').onclick=()=>{a=0;b=0;history=[nba?[0,0]:[d,0]];update();$('#ff-caption').textContent='已施加同步复位并给出一个有效边沿。';};if(!nba)history=[[d,a]];update();
 }else if(kind==='counter'){
  let value=0,en=1,rst=1,cycle=0,history=[[0,1,1]];
  labFrame('逐拍观察 4 位计数器','先切换复位和使能，再给时钟边沿。起点已完成一次复位。',`<div class="lab-controls"><button id="count-en" class="lab-button" aria-pressed="true">en = 1 · 计数</button><button id="count-rst" class="lab-button" aria-pressed="false">rst_n = 1 · 复位无效</button></div><div id="count-value" class="clock-label">0000</div><div class="lab-controls"><button id="count-step" class="lab-button primary">下一拍 ↑</button><button id="count-many" class="lab-button">连续 16 拍</button><button id="count-restart" class="lab-button">重新开始</button></div><div class="readouts">${readout('十进制 count','0','count-dec')}${readout('已推进时钟','0','count-cycle')}</div><div id="count-history" class="wave-wrap"></div><p id="count-caption">切换控制信号后，寄存器要等时钟边沿才更新。</p>`);
  const update=()=>{$('#count-value').textContent=value.toString(2).padStart(4,'0');$('#count-dec').textContent=value;$('#count-cycle').textContent=cycle;$('#count-en').textContent=`en = ${en} · ${en?'计数':'保持'}`;$('#count-en').setAttribute('aria-pressed',String(!!en));$('#count-rst').textContent=`rst_n = ${rst} · ${rst?'复位无效':'复位有效'}`;$('#count-rst').setAttribute('aria-pressed',String(!rst));$('#count-history').innerHTML=wave(history,['Q','en','rst_n']);};
  const step=()=>{value=MODEL.nextCounter(value,en,rst,4);cycle++;history.push([value,en,rst]);history=history.slice(-7);};
  $('#count-en').onclick=()=>{en^=1;update();};$('#count-rst').onclick=()=>{rst^=1;update();$('#count-caption').textContent='复位信号已改变；同步复位需要等下一个边沿。';};
  $('#count-step').onclick=()=>{step();update();$('#count-caption').textContent=!rst?'这一拍复位优先，count 清零。':en?'这一拍使能有效，count 加一并保留低 4 位。':'这一拍使能关闭，count 保持。';};
  $('#count-many').onclick=()=>{for(let i=0;i<16;i++)step();update();$('#count-caption').textContent='已推进16拍，下方保留最近7个采样点。';};
  $('#count-restart').onclick=()=>{value=0;en=1;rst=1;cycle=0;history=[[0,1,1]];update();$('#count-caption').textContent='回到已经复位的起点。';};update();
 }else if(kind==='fsm'){
  let s='IDLE',start=0,finish=0;const next=()=>MODEL.nextFSM(s,start,finish);
  labFrame('三状态控制器','输入影响下一状态，时钟边沿才更新当前状态。',`<div class="lab-controls"><button id="fsm-start" class="lab-button" aria-pressed="false">start = 0</button><button id="fsm-finish" class="lab-button" aria-pressed="false">finish = 0</button></div><div class="readouts">${readout('当前 state','IDLE','fsm-state')}${readout('下一 next_state','IDLE','fsm-next')}</div><p id="fsm-output" class="equation"></p><div class="lab-controls"><button id="fsm-edge" class="lab-button primary">下一拍 ↑</button><button id="fsm-reset" class="lab-button">复位并给一拍</button></div>`);
  const update=()=>{$('#fsm-start').textContent='start = '+start;$('#fsm-start').setAttribute('aria-pressed',String(!!start));$('#fsm-finish').textContent='finish = '+finish;$('#fsm-finish').setAttribute('aria-pressed',String(!!finish));$('#fsm-state').textContent=s;$('#fsm-next').textContent=next();$('#fsm-output').textContent=`busy = ${s==='RUN'?1:0} · done = ${s==='DONE'?1:0}`;};
  $('#fsm-start').onclick=()=>{start^=1;update();};$('#fsm-finish').onclick=()=>{finish^=1;update();};$('#fsm-edge').onclick=()=>{s=next();update();};$('#fsm-reset').onclick=()=>{s='IDLE';start=0;finish=0;update();};update();
 }else if(kind==='timing'){
  labFrame('缩短周期，裕量如何变化？','简化建立时间模型：到达时间 7.8 ns，建立时间与不确定性合计 0.7 ns。',`<label for="period-slider">时钟周期 <span id="period-label">10.0 ns</span></label><input id="period-slider" type="range" min="4" max="16" step="0.1" value="10"><div class="readouts">${readout('目标频率','100 MHz','timing-freq')}${readout('建立时间 slack','1.5 ns','timing-slack')}</div><div class="demo-meter" aria-hidden="true"><span id="timing-meter"></span></div><p id="timing-equation" class="equation"></p><p id="timing-state"></p>`,'示例数值 · 不是 DC 报告或完整 STA；忽略时钟偏斜、库弧和寄生等因素。');
  const update=()=>{const p=Number($('#period-slider').value),slack=MODEL.setupSlack(p);$('#period-label').textContent=p.toFixed(1)+' ns';$('#timing-freq').textContent=(1000/p).toFixed(1)+' MHz';$('#timing-slack').textContent=(slack>=0?'+':'')+slack.toFixed(1)+' ns';$('#timing-equation').textContent=`${p.toFixed(1)} − 0.7 − 7.8 = ${slack.toFixed(1)} ns`;$('#timing-state').textContent=slack>=0?'在这个简化模型下，建立时间预算满足。':'在这个简化模型下，建立时间预算不足。';$('#timing-meter').style.width=Math.min(100,8.5/p*100)+'%';$('#timing-meter').style.background=slack>=0?'#79caaa':'#ff9a72';};$('#period-slider').oninput=update;update();
 }
}
$('#menu-button').onclick=()=>setMenu(!$('#sidebar').classList.contains('open'));
$('#sidebar-backdrop').onclick=()=>{setMenu(false);$('#menu-button').focus();};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#sidebar').classList.contains('open')){setMenu(false);$('#menu-button').focus();}});
$('#export-progress').onclick=()=>download('芯路-学习进度.json',JSON.stringify({...progress,exportedAt:new Date().toISOString()},null,2));
$('#import-button').onclick=()=>$('#import-progress').click();
$('#import-progress').onchange=async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>1024*1024)throw Error('文件过大，请选择本课程导出的进度文件');const imported=normalize(JSON.parse(await file.text()));for(const [id,v]of Object.entries(imported.lessons)){const old=progress.lessons[id];if(!old||v.completed||!old.completed)progress.lessons[id]=v;}for(let i=0;i<CHECKS.length;i++)progress.acceptance[i]=!!progress.acceptance[i]||!!imported.acceptance[i];Object.assign(progress.ultra,imported.ultra);persist();renderLesson(current.id);toast('进度已导入，已完成的课程记录已保留');}catch(error){toast('导入失败：'+error.message);}e.target.value='';};
window.addEventListener('hashchange',()=>renderLesson(location.hash.slice(1),true));
renderLesson(location.hash.slice(1)||progress.last);
window.IC_SYNC.init({get:()=>progress,set:data=>{if(!data)return;progress=normalize(data);suppressSync=true;try{renderLesson(location.hash.slice(1)||progress.last);}finally{suppressSync=false;}}});
})();
