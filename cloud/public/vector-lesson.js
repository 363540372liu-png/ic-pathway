(()=>{
'use strict';
const titles=['认识向量','选一位','取连续几位','重新排列','重复一段','写成模块'];
const seed='10100101';
const group=s=>s.match(/.{1,4}/g).join('_');
const bit=(s,i)=>s[s.length-1-i];
const slice=(s,hi,lo)=>s.slice(s.length-1-hi,s.length-lo);
const join=(s,swap)=>swap?s.slice(4)+s.slice(0,4):s;
const replicate=(s,n)=>s.repeat(n);
const normalize=s=>Object.fromEntries(titles.flatMap((_,i)=>s?.[i]===true?[[i,true]]:[]));
const moduleCode=`module vector_demo(
  input  wire [7:0] bus,
  output wire       low_bit,
  output wire [3:0] high_half,
  output wire [7:0] swapped,
  output wire [3:0] mask
);
  assign low_bit   = bus[0];
  assign high_half = bus[7:4];
  assign swapped   = {bus[3:0], bus[7:4]};
  assign mask      = {4{1'b1}};
endmodule`;
const swapSpec=width=>`module swap${width}(input wire [${width-1}:0] bus,
              output wire [${width-1}:0] result);
  // 在这里连接 result
endmodule`;
const prompts=[
 '图上哪一格是 bit5？点中它再检查。',
 '用当前输入作答。预测所选位，再用位选验证。',
 '用当前输入作答。预测下方所选切片，再对照高亮位。',
 '调整拼接顺序，让原来的低四位去结果左边。',
 "补全 {__{1'b1}}，让输出恰好有六位。"
];
const hints=['从图上找到编号5。','从右端编号0开始，找到题目要求的那一格。','从左端编号读到右端编号，两端都要算。','看结果左边的来源标签。','每份只有一位，复制次数就是总位数。'];
function question(index,{bits,hi,lo,selected=1}){
 if(index===1)return {expression:`bus[${selected}]`,answer:bit(bits,selected),explain:`编号 ${selected} 对应的格子读到 ${bit(bits,selected)}。`};
 if(index===2)return {expression:`bus[${hi}:${lo}]`,answer:slice(bits,hi,lo),explain:`从 bit${hi} 到 bit${lo} 共 ${hi-lo+1} 位，依次读作 ${slice(bits,hi,lo)}。`};
 return null;
}
const signature=(i,learning)=>learning.bits+':'+question(i,learning).expression;
function alignSteps(steps,learning){
 for(const i of [1,2])if(steps[i]&&learning.checked[i]!==signature(i,learning)){
  delete steps[i];learning.review[i]=true;
 }
 return steps;
}
const complete=(steps,learning)=>titles.every((_,i)=>steps?.[i]===true)&&Boolean(learning?.draft?.trim());
function mergeProgress(old,incoming){
 if(!old)return incoming;
 const merged={...(old.done&&!incoming.done?old:incoming)};
 const snapshot=old.done&&!incoming.done&&old.vectorLearning?old:incoming.vectorLearning?incoming:old.vectorLearning?old:null;
 if(snapshot){
  merged.vectorLearning=snapshot.vectorLearning;
  merged.vectorSteps=snapshot.vectorSteps||{};
 }else if(old.vectorSteps||incoming.vectorSteps){
  merged.vectorSteps={...old.vectorSteps,...incoming.vectorSteps};
 }
 merged.activities={...old.activities,...incoming.activities};
 if(old.historicalMastery||incoming.historicalMastery)merged.historicalMastery=true;
 const extra=merged.vectorExtra??incoming.vectorExtra??old.vectorExtra;
 if(extra!==undefined)merged.vectorExtra=extra;
 return merged;
}
function normalizeLearning(raw){
 const flags=s=>Object.fromEntries(titles.flatMap((_,i)=>s?.[i]===true?[[i,true]]:[]));
 const hi=Number.isInteger(raw?.hi)&&raw.hi>=0&&raw.hi<=7?raw.hi:7;
 const lo=Number.isInteger(raw?.lo)&&raw.lo>=0&&raw.lo<=hi?raw.lo:Math.min(hi,4);
 return {bits:/^[01]{8}$/.test(raw?.bits||'')?raw.bits:seed,
  hi,lo,selected:Number.isInteger(raw?.selected)&&raw.selected>=0&&raw.selected<=7?raw.selected:1,
  checked:Object.fromEntries([1,2].flatMap(i=>typeof raw?.checked?.[i]==='string'?[[i,raw.checked[i].slice(0,30)]]:[])),
  bridge:Array.from({length:2},(_,i)=>typeof raw?.bridge?.[i]==='string'?raw.bridge[i].slice(0,40):''),
  visited:flags(raw?.visited),review:flags(raw?.review),
  draft:typeof raw?.draft==='string'?raw.draft.slice(0,15000):'',
  zeroDraft:typeof raw?.zeroDraft==='string'?raw.zeroDraft.slice(0,15000):''};
}
const prose=[
 `<p>如果有八根信号线一起传一个数，逐根起名字会很麻烦。我们用同一个名字 <code>bus</code> 表示这组线，再给每一根编号。这组有顺序的位就是一个<strong>向量</strong>。</p>
 <dl class="vector-declaration"><dt><code>wire</code></dt><dd>声明连接用的信号线。这里一组线共用一个名字。</dd><dt><code>[7:0]</code></dt><dd>编号从7到0，两个端点都算在内，共8位。图上左边是7，右边是0。</dd><dt><code>bus</code></dt><dd>这组信号的名字。</dd><dt><code>8'b1010_0101</code></dt><dd><code>8</code>是位宽，<code>'b</code>表示后面用二进制。下划线只是把八位分成两组，便于阅读。</dd></dl>
 <p>例子把一个常量接到这组线上。声明里的等号在这里表示连续驱动。试着改动图中的输入，看看哪几根线的值变了。</p>`,
 `<p>如果只想知道最右边那根线的值，写 <code>bus[0]</code>。方括号放在名字后面，里面的数字是<strong>编号</strong>。在本例的 <code>[7:0]</code> 声明中，编号0在右端。</p><p>先选 bit0，再试试 bit1、bit3、bit7。每次读出一位，原向量的八位都保留原值。</p>`,
 `<p>想把左边四根线接到另一个信号上，可以写 <code>bus[7:4]</code>。从7开始，依次经过6、5，最后读到4。数出四个编号，所以结果是四位。</p><p>两个编号都算在内。试试把左端设为5、右端设为2，看看图上哪四格亮起来。</p>`,
 `<p>从八位中取出两组，各有四位。左半叫 <code>high</code>，右半叫 <code>low</code>。写 <code>{high, low}</code> 时，大括号把两组线接成一个结果，逗号左边放到结果高位，右边放到低位。位宽是两组宽度相加。</p><p>现在交换两组的接线。每组内部的四根线保持原来的顺序。用初始输入试一次，<code>1010_0101</code> 会排成 <code>0101_1010</code>。</p>`,
 `<p>如果要把 <code>1'b1</code> 连续接四次，可以写 <code>{4{1'b1}}</code>。内层大括号圈住要重复的位串。外层的大括号包含次数和那段位串。</p><p><code>1'b1</code> 每次提供一位，四次合起来就是 <code>1111</code>。这里的次数在 RTL 里要是常量。下方的控件会生成另一条常量表达式供你观察。</p>`,
 `<p>把这四种连接放进同一个模块。输入 <code>bus</code> 由模块外部提供。四个输出分别接一位、四位、重新排列的八位和四个常量位。</p>`
];
function render({api,host,header,state,lesson}){
 const {persist,refreshNav}=api;
 state.vectorSteps=normalize(state.vectorSteps);
 const firstUpgrade=!state.vectorLearning;
 const learning=state.vectorLearning=normalizeLearning(state.vectorLearning);
 if(firstUpgrade){
  if(state.done)state.historicalMastery=true;
  if(state.draft){
   if(state.vectorSteps[5]||!state.historicalMastery)learning.draft=state.draft;
   else learning.zeroDraft=state.draft;
  }
  for(const i of [1,2,5])if(state.vectorSteps[i]){delete state.vectorSteps[i];learning.review[i]=true;}
 }
 let step=Array.from({length:6},(_,i)=>i).find(i=>!state.vectorSteps[i])??5;
 let bits=learning.bits, selected=learning.selected, hi=learning.hi,lo=learning.lo,swapped=false,count=4,line=0;
 host.innerHTML=header+`<article class="vector-lesson">
 <p>从读懂八根线开始，练到独立交换高低两组位。</p>
 <p class="vector-note">前置知识 <a href="#hdl-numbers">二进制字面量</a> · <a href="#hdl-net-var">信号线与连续赋值</a> · <a href="#hdl-module">模块与端口</a></p>
 <div class="vector-controls"><button type="button" class="secondary-button" id="vector-size">大字阅读</button><button type="button" class="secondary-button" id="vector-focus" aria-pressed="false">专注阅读</button></div>
 <nav class="vector-steps" aria-label="本课小节">${titles.map((t,i)=>`<button type="button" data-step="${i}">${i+1}. ${t}</button>`).join('')}</nav>
 <p class="vector-note" id="vector-progress"></p>
 <section id="vector-current"></section>
 </article>`;
 const $=q=>host.querySelector(q), panel=$('#vector-current');
 const size=$('#vector-size');
 const syncSize=()=>{const large=document.body.classList.contains('reading-large');size.textContent=large?'恢复字号':'大字阅读';size.setAttribute('aria-pressed',String(large));};
 try{document.body.classList.toggle('reading-large',localStorage.getItem('ic.reading-large')==='1');}catch{}
 syncSize();
 size.onclick=()=>{const large=document.body.classList.toggle('reading-large');try{localStorage.setItem('ic.reading-large',large?'1':'0');}catch{}syncSize();};
 const focus=$('#vector-focus');
 focus.setAttribute('aria-pressed',String(document.body.classList.contains('reading-focus')));
 focus.onclick=()=>focus.setAttribute('aria-pressed',String(document.body.classList.toggle('reading-focus')));
 const allDone=()=>complete(state.vectorSteps,learning);
 function updateCompletion(){
  const done=Boolean(state.historicalMastery||allDone());
  if(done!==state.done){state.done=done;refreshNav();}
 }
 function invalidate(i){
  if(state.vectorSteps[i]){delete state.vectorSteps[i];learning.review[i]=true;}
  if(i===step){
   const answer=$('#vector-answer'),feedback=$('#vector-feedback');
   if(answer)answer.value='';
   if(feedback)feedback.textContent='题目条件已更新，请重新作答。';
  }
  updateCompletion();persist();progress();
 }
 const mark=i=>{
  state.vectorSteps[i]=true;
  if(i===1||i===2)learning.checked[i]=signature(i,learning);
  delete learning.review[i];
  updateCompletion();persist();progress();
 };
 function progress(){
  const next=titles.findIndex((_,i)=>!state.vectorSteps[i]);
  $('#vector-progress').textContent=`已完成练习 ${Object.keys(state.vectorSteps).length} / ${titles.length}`+
   (next<0?' · 本课练习已完成':` · 推荐继续：${titles[next]}`)+(state.historicalMastery?' · 保留旧版完成记录':'');
  host.querySelectorAll('[data-step]').forEach(b=>{
   const i=Number(b.dataset.step);
   const label=state.vectorSteps[i]?'已完成练习':learning.review[i]?'需要复习':learning.visited[i]?'已阅读或操作':'未开始';
   b.setAttribute('aria-current',i===step?'step':'false');
   b.textContent=`${i+1}. ${titles[i]} · ${label}`;
  });
 }
 function update(){
  const showBits=step<4||step===5;
  const chosen=i=>step<2?selected===i:step===2?lo<=i&&i<=hi:step===3?(i>=4)===(selected>=4):step===5?(line===0?i===0:line===1?i>=4:line===2):false;
  if(showBits){
   panel.querySelectorAll('[data-bit]').forEach(b=>{const i=Number(b.dataset.bit);b.querySelector('strong').textContent=bit(bits,i);b.setAttribute('aria-label',`bit${i}，值 ${bit(bits,i)}`);b.setAttribute('aria-pressed',String(chosen(i)));});
   $('#vector-value').textContent=`8 位 · ${group(bits)}`;
  }
  if(step===5){$('#vector-module-result').textContent=[`low_bit = ${bit(bits,0)}`,`high_half = ${slice(bits,7,4)}`,`swapped = ${group(join(bits,true))}`,'mask = 1111'][line];return;}
  const expressions=[`wire [7:0] bus = 8'b${group(bits)};`,`bus[${selected}]`,`bus[${hi}:${lo}]`,swapped?'{bus[3:0], bus[7:4]}':'{high, low}',`{${count}{1'b1}}`];
  $('#vector-expression').textContent=expressions[step];
  $('#vector-result').textContent=[`bit${selected} 的值是 ${bit(bits,selected)}`,`选中 bit${selected} → ${bit(bits,selected)}（1 位）`,`${slice(bits,hi,lo)}（${hi-lo+1} 位）`,group(join(bits,swapped))+'（8 位）',replicate('1',count)+`（${count} 位）`][step];
  const q=question(step,learning);
  if(q)$('#vector-question').textContent=`当前输入 ${group(bits)}，${q.expression} 的值是什么？`;
  if(step===2){$('#vector-hi').value=hi;$('#vector-lo').value=lo;}
  if(step===3){
   const halves=[['原高四位',bits.slice(0,4)],['原低四位',bits.slice(4)]];
   if(swapped)halves.reverse();
   panel.querySelectorAll('[data-half]').forEach((b,i)=>{b.textContent=halves[i].join(' · ');b.classList.toggle('vector-origin',(i===0)!==swapped?selected>=4:selected<4);});
   $('#vector-swap').setAttribute('aria-pressed',String(swapped));
  }
 }
 function open(i,focus=true){
  step=i;if(i===1)selected=learning.selected;learning.visited[i]=true;persist();progress();
  const options=(n,offset=0)=>Array.from({length:n},(_,i)=>`<option>${i+offset}</option>`).join('');
  panel.innerHTML=`<h2 tabindex="-1">${i+1}. ${titles[i]}</h2>${prose[i]}`+
   (i!==4?`<figure class="vector-figure">
    <label for="vector-input">修改输入的八位值</label> <input id="vector-input" inputmode="numeric" aria-describedby="vector-input-status" value="${group(bits)}" maxlength="9" autocomplete="off" spellcheck="false">
    <p id="vector-input-status" class="vector-note" role="status"></p>
    <div class="vector-viewport" tabindex="0" role="region" aria-label="八位输入，可横向滚动"><div class="vector-group-labels"><span>高四位</span><span>低四位</span></div>
    <div class="vector-bits">${Array.from({length:8},(_,n)=>`<button type="button" data-bit="${7-n}"><span>bit${7-n}</span><strong></strong></button>`).join('')}</div>
    </div><figcaption id="vector-value"></figcaption></figure>`:'')+
   (i===2?`<div class="vector-controls"><label>左端 <select id="vector-hi">${options(8)}</select></label><label>右端 <select id="vector-lo">${options(8)}</select></label></div><p class="vector-note" id="vector-range-note" role="status"></p>`:'')+
   (i===3?`<button type="button" class="secondary-button" id="vector-swap">交换两组的位置</button><div class="vector-group-labels vector-output"><span data-half></span><span data-half></span></div>`:'')+
   (i===4?`<label>复制次数 <select id="vector-count">${options(8,1)}</select></label>`:'')+
   (i<5?`<p class="vector-expression"><code id="vector-expression"></code></p><p id="vector-result" role="status"></p>
    <form class="vector-exercise"><h3>现在试一试</h3>${[1,2,4].includes(i)?'<label id="vector-question" for="vector-answer">'+prompts[i]+'</label>':'<p>'+prompts[i]+'</p>'}
    ${[1,2,4].includes(i)?'<input id="vector-answer" inputmode="numeric" maxlength="8" autocomplete="off">':''}
    <button class="secondary-button">检查</button><p id="vector-feedback" role="status">${state.vectorSteps[i]?'这一步已练过，可以再试一次。':''}</p></form>
    <button type="button" class="primary-button" id="vector-next">下一小节 · ${titles[i+1]}</button>`:full());
  if(i!==4){
   const input=$('#vector-input');
   input.oninput=()=>{const next=input.value.replaceAll('_','');const valid=/^[01]{8}$/.test(next);input.setAttribute('aria-invalid',String(!valid));$('#vector-input-status').textContent=valid?'':'需要恰好八个 0 或 1。图中仍显示上一个有效值。';if(valid&&next!==bits){bits=learning.bits=next;invalidate(1);invalidate(2);update();}};
   panel.querySelectorAll('[data-bit]').forEach(b=>b.onclick=()=>{
    const n=Number(b.dataset.bit);
    if(i===2){setRange(Math.max(lo,n),Math.min(lo,n));$('#vector-range-note').textContent='以当前右端和点击的位作为两端。';}
    else if(i===5){line=n===0?0:n>=4?1:2;setLine();}
    else {selected=n;if(i===1&&learning.selected!==n){learning.selected=n;invalidate(1);}}
    update();
   });
  }
  function setRange(left,right){if(hi!==left||lo!==right){hi=learning.hi=left;lo=learning.lo=right;invalidate(2);}}
  if(i===2){
   function range(isHigh,value){if(isHigh)setRange(value,Math.min(lo,value));else setRange(Math.max(hi,value),value);$('#vector-range-note').textContent=`当前范围从 ${hi} 到 ${lo}，包含两端。`;update();}
   $('#vector-hi').onchange=ev=>range(true,Number(ev.target.value));$('#vector-lo').onchange=ev=>range(false,Number(ev.target.value));
  }
  if(i===3)$('#vector-swap').onclick=()=>{swapped=!swapped;update();};
  if(i===4){$('#vector-count').value=count;$('#vector-count').onchange=ev=>{count=Number(ev.target.value);update();};}
  if(i<5){
   $('.vector-exercise').onsubmit=ev=>{
    ev.preventDefault();
    const answer=$('#vector-answer')?.value.trim().replaceAll('_','');
    if($('#vector-input')?.getAttribute('aria-invalid')==='true'){
     $('#vector-feedback').textContent='先把输入修正为八个二进制位。';return;
    }
    const q=question(i,learning);
    const ok=i===0?selected===5:i===3?swapped:i===4?answer==='6':answer===q.answer;
    $('#vector-feedback').textContent=ok?(q?'答对了。'+q.explain:
     i===0?'选对了。编号5是从左数第三格。':i===3?'顺序正确。先接低四位，再接高四位。':'答对了。六份一位信号形成111111。'):hints[i];
    if(!ok&&state.vectorSteps[i]){delete state.vectorSteps[i];learning.review[i]=true;updateCompletion();persist();progress();}
    if(ok)mark(i);
   };
   const answer=$('#vector-answer');
   if(answer)answer.oninput=()=>{$('#vector-feedback').textContent='';if(state.vectorSteps[i]){delete state.vectorSteps[i];learning.review[i]=true;updateCompletion();persist();progress();}};
   $('#vector-next').onclick=()=>open(i+1);
  }else bindFull();
  update();
  if(focus){const heading=$('h2[tabindex="-1"]');heading.focus({preventScroll:true});heading.scrollIntoView({block:'start'});}
 }
 function full(){
  return `<pre class="vector-module"><code>${moduleCode.split('\n').map((s,i)=>i>=7&&i<=10?`<button type="button" data-line="${i-7}">${s}</button>`:s).join('\n')}</code></pre>
  <p><code>module vector_demo(</code> 开始声明模块。接下来的五行各声明一个端口，逗号隔开，<code>);</code> 结束端口列表。<code>endmodule</code> 结束整个模块。</p>
  <p id="vector-line-note"></p><p id="vector-module-result" role="status"></p>
  <button type="button" class="secondary-button" id="vector-copy">复制完整模块</button>
  <form id="vector-bridge" class="vector-exercise"><h3>先改一行，再补表达式</h3>
  <label for="vector-change">把 <code>assign low_bit = bus[0];</code> 改成读取 bit2，只填方括号内的编号。</label>
  <input id="vector-change" inputmode="numeric" maxlength="2">
  <label for="vector-fill">现在补出中间两位的表达式。<code>assign mid = ___;</code>，mid 为两位，左侧接 bit4，右侧接 bit3。</label>
  <input id="vector-fill" spellcheck="false" maxlength="40">
  <button class="secondary-button">核对两个空缺</button><p id="vector-bridge-feedback" role="status"></p></form>
  <div class="vector-exercise"><h3>自己写一个8位交换模块</h3>
  <p>输入和输出各有八位。让输入右边四位出现在输出左边，再把输入左边四位放到输出右边。</p>
  <p>用三组输入自查。<code>1010_0101 → 0101_1010</code>，<code>0011_0000 → 0000_0011</code>，<code>1111_0000 → 0000_1111</code>。</p>
  <label for="hdl-draft">编辑下面的模块</label><textarea id="hdl-draft" class="exercise-input" maxlength="15000" spellcheck="false"></textarea>
  <p id="vector-draft-note" role="status">草稿随学习记录保存。</p>
  <button type="button" class="secondary-button" id="vector-self">我已用三组输入自查</button>
  <details><summary>写过后对照参考连接</summary><pre><code>assign result = {bus[3:0], bus[7:4]};</code></pre></details>
  <p id="vector-completion" role="status"></p>
  </div>
  <details class="vector-exercise"><summary>进阶练习 · 交换16位的两个字节</summary>
  <p>一个字节有8位。对 <code>[15:0]</code>，低字节从7读到0，高字节从15读到8。把两组交换，同时保留每组内的顺序。</p>
  <p>试用 <code>0001_0010_1010_0101 → 1010_0101_0001_0010</code>，再用全零和仅最高位为1的输入测试。</p>
  <label for="vector-extra">16位练习草稿</label><textarea id="vector-extra" class="exercise-input" maxlength="15000" spellcheck="false"></textarea>
  <details><summary>写过后对照参考连接</summary><pre><code>assign result = {bus[7:0], bus[15:8]};</code></pre></details></details>
  <section id="vector-review" class="vector-exercise"><h3>巩固练习</h3>
  <label for="vector-zero">把 4 位无符号输入 <code>a</code> 补零扩展成 8 位输出。先画出新添的四根线，再写一条连续赋值。</label>
  <textarea id="vector-zero" class="exercise-input" maxlength="15000" spellcheck="false"></textarea>
  <details><summary>写过后对照参考</summary><pre><code>wire [7:0] wide = {4'b0000, a};</code></pre></details>
  <div id="vector-original"></div></section>
  <h3>把三个写法分清</h3><p>名字后面的单个编号取一位，两个端点取一段。大括号按从左到右的顺序连接各段。</p>
  <p><a href="#hdl-four-state">下一课 · 0、1、X 与 Z</a></p>`;
 }
 function setLine(){
  panel.querySelectorAll('[data-line]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.line)===line)));
  $('#vector-line-note').textContent=['右边的 [0] 只拿出一根线。等号左边的 low_bit 因此只需要一位。','[7:4] 保留四根线的相对顺序，刚好填满 high_half 的四位。','大括号把逗号左边的四根线接到 swapped 的高位，右边的接到低位。','内层圈住一位常量，外层的 4 指定四份。这个输出不随 bus 改变。'][line];
 }
 function bindFull(){
  setLine();
  panel.querySelectorAll('[data-line]').forEach(b=>b.onclick=()=>{line=Number(b.dataset.line);setLine();update();});
  $('#vector-copy').onclick=async()=>{try{await navigator.clipboard.writeText(moduleCode);api.toast('代码已复制');}catch{api.toast('请选中代码手动复制');}};
  const draft=$('#hdl-draft'),extra=$('#vector-extra');
  draft.value=learning.draft||swapSpec(8);extra.value=state.vectorExtra||swapSpec(16);
  const zero=$('#vector-zero');
  zero.value=learning.zeroDraft;
  zero.oninput=()=>{learning.zeroDraft=zero.value;persist();};
  const change=$('#vector-change'),fill=$('#vector-fill');
  [change.value,fill.value]=learning.bridge;
  const bridgeCorrect=()=>change.value.trim()==='2'&&['bus[4:3]','{bus[4],bus[3]}'].includes(fill.value.replace(/\s+/g,''));
  $('#vector-bridge').onsubmit=ev=>{
   ev.preventDefault();
   const index=change.value.trim();
   const bridged=bridgeCorrect();
   $('#vector-bridge-feedback').textContent=bridged?'两处都符合题意。现在试着写完整交换模块。':
    index!=='2'?'先核对第一行。方括号内填信号编号。':'试着用一个连续切片；其他表达式写法尚不能自动判定。';
  };
  $('#vector-bridge').oninput=()=>{learning.bridge=[change.value,fill.value];invalidate(5);status();$('#vector-bridge-feedback').textContent='';};
  if(state.draft&&state.historicalMastery){
   const record=document.createElement('details');
   record.innerHTML='<summary>旧版草稿记录</summary><pre></pre>';
   record.querySelector('pre').textContent=state.draft;
   $('#vector-review').append(record);
  }
  window.IC_TEXTBOOK?.mountExercises({...api,refreshStatus:()=>{}},lesson,state,{target:$('#vector-original'),indices:[2,3,4],reviewTarget:$('#vector-current')});
  [draft,extra,zero].forEach(el=>window.IC_EDITING?.bind(el));
  const status=()=>{$('#vector-completion').textContent=state.vectorSteps[5]?'已记录自查。本站未运行你的代码。':state.done?'历史课程完成记录已保留。':'三组用例都检查过后，可以记录自查。';};
  draft.oninput=()=>{learning.draft=draft.value;invalidate(5);status();$('#vector-draft-note').textContent='草稿已保存到本机。';};
  extra.oninput=()=>{state.vectorExtra=extra.value;persist();};
  $('#vector-self').onclick=()=>{
   if(!draft.value.trim()||draft.value.trim()===swapSpec(8).trim()){$('#vector-completion').textContent='先写出输出的接线，再用三组输入核对。';return;}
   if(!bridgeCorrect()&&!state.vectorSteps[5]){$('#vector-completion').textContent='先核对上方两道过渡练习。';return;}
   mark(5);
   status();
  };
  status();
 }
 host.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>open(Number(b.dataset.step)));
 alignSteps(state.vectorSteps,learning);updateCompletion();open(step,false);
}
window.IC_VECTOR_LESSON={render,normalize,normalizeLearning,mergeProgress,question,alignSteps,complete,moduleCode,bit,slice,join,replicate};
})();
