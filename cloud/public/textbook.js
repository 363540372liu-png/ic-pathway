(()=>{
'use strict';
const M=window.IC_TEXTBOOK_MODEL;
const e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels={'not-started':'未开始',learning:'学习中',practiced:'已练习',mastered:'已掌握（自评）'};
let cleanup=()=>{};
function hardware(kind){
 const box=(x,y,w,h,t)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="3"/><text x="'+(x+w/2)+'" y="'+(y+h/2+5)+'" text-anchor="middle">'+e(t)+'</text>';
 let b='';
 if(kind==='mux')b=box(215,45,130,100,'MUX')+'<path d="M60 65H215 M60 125H215 M345 95H530 M280 190V145"/><text x="25" y="70">a</text><text x="25" y="130">b</text><text x="535" y="100">y</text><text x="260" y="215">sel</text>';
 else if(kind==='pipeline')b=box(150,65,100,75,'DFF a')+box(385,65,100,75,'DFF b')+'<path d="M50 100H150 M250 100H385 M485 100H585 M200 185V140 M435 185V140 M200 185H435"/><text x="25" y="105">D</text><text x="300" y="85">旧 a →</text><text x="550" y="85">b</text><text x="295" y="210">共用 clk ↑</text>';
 else if(kind==='counter')b=box(100,65,110,65,'+ 1')+box(270,65,105,65,'选择器')+box(450,65,110,65,'4位寄存器')+'<path d="M210 95H270 M375 95H450 M560 95H590V175H55V95H100 M320 30V65 M500 205V130"/><text x="270" y="23">复位 / en</text><text x="485" y="225">clk ↑</text><text x="565" y="85">Q</text>';
 else if(kind==='fsm')b=box(65,65,170,80,'下一状态逻辑')+box(345,65,145,80,'state寄存器')+'<path d="M235 105H345 M490 105H580V185H30V105H65 M420 215V145"/><text x="260" y="85">next</text><text x="495" y="90">state</text><text x="395" y="238">clk ↑</text><text x="35" y="40">start / finish → 逻辑</text>';
 else b=box(245,60,130,100,'DFF / Q')+'<path d="M60 110H245 M375 110H555 M310 205V160"/><text x="35" y="115">D</text><text x="560" y="115">Q</text><text x="280" y="230">clk ↑</text>';
 return '<figure class="hardware-map"><svg viewBox="0 0 640 255" role="img" aria-label="'+e({mux:'a与b经sel控制的MUX到y',dff:'D接触发器输入，clk上升沿采样，Q保持',pipeline:'D经a、b两个触发器，同一沿b采旧a',counter:'Q反馈到加法器与控制选择器，再接寄存器D',fsm:'组合下一状态经state寄存器，当前状态反馈到组合逻辑'}[kind]||'触发器数据路径')+'">'+b+'</svg><figcaption>结构图表示逻辑映射；不按门级数量、布线或真实延迟绘制。</figcaption></figure>';
}
function enhance(api,l){
 cleanup();cleanup=()=>{};
 const lab=l.lab,host=document.querySelector('#lesson'),st=api.progress.hdl[l.id];
 if(!lab)return;
 const principle=document.createElement('div');principle.className='textbook-principle';principle.innerHTML='<p class="teaching-hook">'+e(lab.hook)+'</p>'+lab.principle.map(p=>'<p>'+e(p)+'</p>').join('')+hardware(lab.hardware);
 document.querySelector('#study-concept').append(principle);
 const code=host.querySelector('.code-workbench'),rows=[...code.querySelectorAll('.code-line')];
 code.classList.add('explainable-code');
 const rowpanel=document.createElement('div');rowpanel.className='code-explanation';rowpanel.setAttribute('role','status');rowpanel.setAttribute('aria-live','polite');
 rowpanel.innerHTML='<strong>选择代码行，查看这一行的电路含义</strong><p>支持Tab聚焦与Enter选择；行号不是执行顺序。</p>';
 code.after(rowpanel);
 const codeLayout=document.createElement('div');codeLayout.className='code-explain-layout';code.before(codeLayout);codeLayout.append(code,rowpanel);
 function selectLine(n,message){
  rows.forEach((r,i)=>{r.classList.toggle('selected',i+1===n);r.setAttribute('aria-pressed',String(i+1===n))});
  rowpanel.innerHTML='<strong>第 '+n+' 行</strong><p>'+e(message||lab.lines[n]||'这一行用于组织模块或语句块，结合相邻关键行阅读。')+'</p>';
 }
 rows.forEach((r,i)=>{
  r.tabIndex=0;r.setAttribute('role','button');r.setAttribute('aria-label','解释第'+(i+1)+'行：'+r.textContent.trim());
  r.onclick=()=>selectLine(i+1);
  r.onkeydown=ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();selectLine(i+1)}};
 });
 const tooltips={always:'重复响应事件的过程',always_ff:'SystemVerilog沿触发存储过程',always_comb:'SystemVerilog组合逻辑过程',reg:'Verilog过程变量；硬件取决于赋值行为',logic:'SystemVerilog四态数据类型',posedge:'0到1的上升沿',assign:'持续驱动组合关系',input:'模块输入端口',output:'模块输出端口'};
 code.querySelectorAll('.syntax-keyword').forEach(span=>{if(tooltips[span.textContent])span.title=tooltips[span.textContent]});
 const tools=document.createElement('div');tools.className='code-study-tools';tools.innerHTML='<button type="button" data-code-fold aria-expanded="true">折叠代码</button><button type="button" data-code-wide aria-pressed="false">加宽工作区</button>'+(lab.compare?'<button type="button" data-code-compare aria-expanded="false">Verilog / SV 对照</button>':'');
 code.querySelector('.code-workbench-header').append(tools);
 tools.querySelector('[data-code-fold]').onclick=ev=>{const pre=code.querySelector('pre');pre.hidden=!pre.hidden;ev.currentTarget.textContent=pre.hidden?'展开代码':'折叠代码';ev.currentTarget.setAttribute('aria-expanded',String(!pre.hidden))};
 tools.querySelector('[data-code-wide]').onclick=ev=>{const on=host.classList.toggle('wide-workspace');ev.currentTarget.textContent=on?'恢复阅读宽度':'加宽工作区';ev.currentTarget.setAttribute('aria-pressed',String(on))};
 if(lab.compare){
  const comparison=document.createElement('pre');comparison.className='rtl-compare';comparison.hidden=true;comparison.textContent=lab.compare;rowpanel.after(comparison);
  tools.querySelector('[data-code-compare]').onclick=ev=>{comparison.hidden=!comparison.hidden;ev.currentTarget.setAttribute('aria-expanded',String(!comparison.hidden))};
 }
 const bug=document.createElement('section');bug.className='bug-clinic';bug.innerHTML='<h3>把错误变成可验证的假设</h3><div class="bug-columns"><div><h4>错误片段</h4><pre>'+e(lab.bug.wrong)+'</pre></div><div><h4>修正片段</h4><pre>'+e(lab.bug.fix)+'</pre></div></div><p><strong>原因：</strong>'+e(lab.bug.why)+'</p><p><strong>怎样验证：</strong>'+e(lab.bug.test)+'</p>';
 document.querySelector('#study-code').append(bug);
 mountExercises(api,l,st);
 const old=host.querySelector('#hdl-demo');if(old)old.hidden=true;
 const waveHost=document.createElement('div');waveHost.className='timeline-workbench';waveHost.id='textbook-timeline';
 (host.querySelector('#study-example')||host.querySelector('#study-concept')).append(waveHost);
 cleanup=mountTimeline(waveHost,lab,selectLine);
}
function mountExercises(api,l,st){
 st.activities||={};
 const section=document.createElement('section');section.className='practice-ladder';
 section.innerHTML='<h3>练习阶梯 · 从预测到独立设计</h3><p>自动反馈只检查下面的封闭题。开放RTL解答保存后由你对照规格自查；网页不会编译任意代码。</p>'+l.lab.exercises.map((ex,i)=>{
  const a=st.activities[i]||{},name='activity-'+i;
  return '<details class="practice-step" '+(i===0?'open':'')+'><summary><span>'+String(i+1).padStart(2,'0')+' · '+e(ex.type)+'</span><span id="'+name+'-badge">'+(a.passed||a.reviewed?'✓ 已核对':'待练习')+'</span></summary><p>'+e(ex.prompt)+'</p>'+(ex.options?'<form data-activity="'+i+'"><fieldset><legend class="sr-only">'+e(ex.type)+'</legend>'+ex.options.map((o,j)=>'<label><input type="radio" name="'+name+'" value="'+j+'" '+(a.choice===j?'checked':'')+'>'+e(o)+'</label>').join('')+'</fieldset><button type="submit" class="secondary-button">核对这一步</button><p class="activity-feedback" role="status">'+(a.passed?'✓ 正确。'+e(ex.explain):'')+'</p><button type="button" class="review-explanation">回看对应解释 ↑</button></form>':'<label for="'+name+'-draft">独立实现与测试记录</label><textarea id="'+name+'-draft" maxlength="15000" spellcheck="false">'+e(a.draft||ex.starter||'')+'</textarea><details><summary>参考实现与自查要点</summary><pre>'+e(ex.solution)+'</pre></details><label class="review-check"><input data-review="'+i+'" type="checkbox" '+(a.reviewed?'checked':'')+'>我已按输入、输出、边界和预期表自查；实际仿真情况已注明</label>')+'</details>';
 }).join('');
 document.querySelector('#study-practice .complete-row').before(section);
 function save(i,a){st.activities[i]=a;api.persist();api.refreshStatus();const badge=section.querySelector('#activity-'+i+'-badge');badge.textContent=a.passed||a.reviewed?'✓ 已核对':'待练习';}
 section.querySelectorAll('[data-activity]').forEach(form=>{
  const i=+form.dataset.activity,ex=l.lab.exercises[i],feedback=form.querySelector('.activity-feedback');
  form.onchange=()=>{const a={...(st.activities[i]||{}),choice:+form.querySelector('input:checked').value,passed:false};save(i,a);feedback.textContent='选择已改变，请重新核对。'};
  form.onsubmit=ev=>{ev.preventDefault();const input=form.querySelector('input:checked');if(!input){feedback.textContent='先选择一个答案。';return;}const a={...(st.activities[i]||{}),choice:+input.value};a.passed=a.choice===ex.correct;a.attempts=(a.attempts||0)+1;save(i,a);feedback.textContent=(a.passed?'✓ 正确。':'需要复习。')+ex.explain;feedback.dataset.passed=String(a.passed)};
  form.querySelector('.review-explanation').onclick=()=>document.querySelector(i===3?'#study-code':'#study-concept').scrollIntoView({block:'start',behavior:'instant'});
 });
 section.querySelectorAll('textarea').forEach(textarea=>{
  const i=+textarea.id.split('-')[1];
  textarea.oninput=()=>{const a={...(st.activities[i]||{}),draft:textarea.value,reviewed:false};section.querySelector('[data-review="'+i+'"]').checked=false;save(i,a)};
 });
 section.querySelectorAll('[data-review]').forEach(input=>input.onchange=()=>{
  const i=+input.dataset.review,textarea=section.querySelector('#activity-'+i+'-draft');
  const a={...(st.activities[i]||{}),draft:textarea.value,reviewed:input.checked&&textarea.value.trim()!==l.lab.exercises[i].starter?.trim()&&!!textarea.value.trim()};
  input.checked=a.reviewed;save(i,a);if(!a.reviewed)api.toast('先写下自己的实现或推导，再完成自查。');
 });
}
function mountTimeline(host,lab,selectLine){
 let input={d:1,en:1,rst_n:1,start:0,finish:0,sel:0,left:2,right:7,blocking:false},frames=[{before:M.initial(),after:M.initial(),input:{...input}}],cursor=0,timer=null,zoom=1,selected='q';
 const kind=lab.kind,mux=kind==='mux';
 host.innerHTML='<div class="timeline-heading"><div><h3>'+(mux?'组合输入观察记录':'逐拍回放 · 采样旧值，再提交新值')+'</h3><p>固定规则教学模型，不解析或执行任意 HDL。</p></div><label>缩放 <select id="wave-zoom"><option value="1">1×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></label></div><div class="timeline-inputs">'+(mux?'<label>a <input id="wave-left" type="number" min="0" max="15" value="2"></label><label>b <input id="wave-right" type="number" min="0" max="15" value="7"></label><button data-toggle="sel">sel = 0</button>':kind==='fsm'?'<button data-toggle="start">start = 0</button><button data-toggle="finish">finish = 0</button>':kind==='counter'?'':'<button data-toggle="d">D = 1</button>')+(['counter','enabled'].includes(kind)?'<button data-toggle="en">en = 1</button>':'')+(['counter','enabled','fsm'].includes(kind)?'<button data-toggle="rst_n">rst_n = 1</button>':'')+(kind==='pipeline'?'<label>赋值方式 <select id="wave-assign"><option value="nba">非阻塞 &lt;=（正确两级）</option><option value="blocking">阻塞 =（错误对比）</option></select></label>':'')+'</div><div class="timeline-controls"><button id="wave-back" type="button">← 后退</button><button id="wave-play" type="button">播放</button><button id="wave-next" type="button">'+(mux?'应用输入 / 下一步 →':'下一拍 →')+'</button><button id="wave-home" type="button">回到起点</button><span id="wave-position"></span></div><div class="timeline-scroll" tabindex="0" role="group" aria-label="波形回放，左右键移动观察点"><div id="wave-chart"></div></div><div class="signal-picker" aria-label="选择信号"></div><p id="wave-value" role="status"></p><div class="sample-commit"><div><strong>① 读取沿前值</strong><p id="wave-before"></p></div><div><strong>② 沿后提交值</strong><p id="wave-after"></p></div></div><details class="timeline-text"><summary>文本等价：查看每一步的输入和输出</summary><div id="wave-text"></div></details><p class="timeline-limit">起点假设状态已知为0；没有tCQ、门延迟或亚稳态建模。每格表示一次采样观察，横轴没有纳秒刻度；沿后绘制表示理想更新；并发调度完整规则请读“事件调度”课。回退后更改输入会从当前观察点建立新的后续记录。</p>';
 const $=s=>host.querySelector(s);
 const keys=mux?['left','right','sel','q']:kind==='pipeline'?['clk','d','a','b']:kind==='fsm'?['clk','start','finish','state','busy']:['clk','d',...(['counter','enabled'].includes(kind)?['en','rst_n']:[]),'q'];
 if(kind==='counter')keys.splice(1,1);
 if(!keys.includes(selected))selected=keys.at(-1);
 if(mux){frames[0].after.q=input.left;}
 function value(f,k){if(k==='clk')return f.after.cycle?1:0;return k in f.after?f.after[k]:f.input[k];}
 const describe=s=>kind==='pipeline'?'a='+s.a+'，b='+s.b:kind==='fsm'?'state='+(s.state?'RUN':'IDLE')+'，busy='+s.busy:'Q='+s.q;
 function draw(){
  const current=frames[cursor],width=Math.max(640,frames.length*86*zoom+80),height=keys.length*43+65;
  let body='';keys.forEach((key,row)=>{
   const y=row*43+35;body+='<text x="8" y="'+y+'">'+e(key==='q'?'Q':key)+'</text>';
   frames.forEach((f,j)=>{const x=80+j*86*zoom,v=value(f,key),isBus=key==='q'&&(kind==='counter'||mux);
    if(isBus){body+='<path d="M'+x+' '+(y-20)+'h'+(86*zoom)+' M'+x+' '+y+'h'+(86*zoom)+'"/><text x="'+(x+25)+'" y="'+(y-5)+'">'+v+'</text>';}
    else if(key==='clk'){body+=j?'<path d="M'+x+' '+y+'h8v-20h'+(40*zoom)+'v20h'+(86*zoom-8-40*zoom)+'"/>':'<path d="M'+x+' '+y+'h'+(86*zoom)+'"/>';}
    else{const z=y-(v?20:0),old=j?value(frames[j-1],key):v,output=['a','b','q','state','busy'].includes(key),change=x+(j&&output?14:0);body+='<path d="M'+x+' '+(y-(old?20:0))+'H'+change+'V'+z+'H'+(x+86*zoom)+'"/>';}
   });
  });
  body+='<path class="observation-line" d="M'+(100+cursor*86*zoom)+' 0V'+(height-18)+'"/>';
  body+='<rect class="time-marker" x="'+(80+cursor*86*zoom)+'" y="5" width="'+(86*zoom)+'" height="'+(height-20)+'"/><text x="'+(90+cursor*86*zoom)+'" y="'+(height-7)+'">观察点 '+cursor+'</text>';
  $('#wave-chart').innerHTML='<svg width="'+width+'" height="'+height+'" viewBox="0 0 '+width+' '+height+'" role="img" aria-label="'+e('观察点'+cursor+'：'+describe(current.after))+'">'+body+'</svg>';
  $('#wave-position').textContent='观察点 '+cursor+' / '+(frames.length-1);
  $('#wave-back').disabled=cursor===0;
  $('#wave-before').textContent=cursor?describe(current.before)+'；'+Object.entries(current.input).filter(([k])=>keys.includes(k)).map(([k,v])=>k+'='+Number(v)).join('，'):'已知起点；尚未施加一次有效采样。';
  $('#wave-after').textContent=describe(current.after)+(kind==='pipeline'?(current.input.blocking?'；阻塞赋值使b读新a。':'；b读取沿前a。'):'');
  $('#wave-value').textContent='信号 '+selected+' 在观察点 '+cursor+' 的值：'+value(current,selected);
  $('.signal-picker').innerHTML=keys.map(k=>'<button type="button" data-signal="'+k+'" aria-pressed="'+(k===selected)+'">'+e(k)+' = '+value(current,k)+'</button>').join('');
  $('.signal-picker').querySelectorAll('button').forEach(b=>b.onclick=()=>{selected=b.dataset.signal;draw()});
  $('#wave-text').innerHTML='<table><caption>固定模型的沿后记录</caption><thead><tr><th>观察点</th>'+keys.map(k=>'<th>'+e(k)+'</th>').join('')+'</tr></thead><tbody>'+frames.map((f,j)=>'<tr><td>'+j+'</td>'+keys.map(k=>'<td>'+value(f,k)+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
  if(cursor)selectLine(current.after.line);
 }
 function pause(){if(timer){clearInterval(timer);timer=null;}$('#wave-play').textContent='播放';}
 function next(){if(cursor<frames.length-1)cursor++;else{if(frames.length>=25){pause();return;}frames.push(M.step(kind,frames[cursor].after,input));cursor++;}draw();}
 function changed(){pause();frames=frames.slice(0,cursor+1);host.querySelectorAll('[data-toggle]').forEach(b=>b.textContent=b.dataset.toggle+' = '+input[b.dataset.toggle]);if(mux){frames.push(M.step(kind,frames[cursor].after,input));cursor++;draw();}}
 host.querySelectorAll('[data-toggle]').forEach(b=>b.onclick=()=>{input[b.dataset.toggle]^=1;changed()});
 ['left','right'].forEach(k=>{const el=$('#wave-'+k);if(el)el.onchange=()=>{const v=Number(el.value);if(!Number.isInteger(v)||v<0||v>15){el.value=input[k];return;}input[k]=v;changed()}});
 if($('#wave-assign'))$('#wave-assign').onchange=ev=>{pause();input.blocking=ev.target.value==='blocking';frames=[{before:M.initial(),after:M.initial(),input:{...input}}];cursor=0;draw()};
 $('#wave-next').onclick=()=>{pause();next()};
 $('#wave-back').onclick=()=>{pause();if(cursor)cursor--;draw()};
 $('#wave-play').onclick=()=>{if(timer)pause();else{timer=setInterval(next,650);$('#wave-play').textContent='暂停'}};
 $('#wave-home').onclick=()=>{pause();cursor=0;draw()};
 $('#wave-zoom').onchange=ev=>{zoom=Number(ev.target.value);draw()};
 $('.timeline-scroll').onkeydown=ev=>{if(ev.key==='ArrowRight'){ev.preventDefault();pause();next()}else if(ev.key==='ArrowLeft'){ev.preventDefault();pause();cursor=Math.max(0,cursor-1);draw()}};
 document.addEventListener('visibilitychange',onVisibility);function onVisibility(){if(document.hidden)pause();}
 draw();return ()=>{pause();document.removeEventListener('visibilitychange',onVisibility)};
}
window.IC_TEXTBOOK={enhance,canComplete:M.canComplete,dispose:()=>cleanup(),level:M.level,labels};
})();
