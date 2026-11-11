(()=>{
'use strict';
const {hdl,fpga}=window.IC_ADAPTIVE_CONTENT;
const types={A:'数字逻辑',B:'HDL 语法',C:'模块连接',D:'逐拍 RTL',E:'状态与协议',F:'仿真与验证',G:'物理时序',H:'工程实践'};
const logic=(a,b)=>[a&b,a|b,a^b];
const decode=(a,b)=>Array.from({length:4},(_,i)=>Number(i===2*a+b)).reverse();
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function guidedCard(title,prompt,answer){
 const card=document.createElement('section');
 card.className='learning-checkpoint';
 card.innerHTML='<h3>'+escape(title)+'</h3><p>'+escape(prompt)+'</p><details><summary>想过以后，查看推导</summary><p>'+escape(answer)+'</p></details>';
 return card;
}
function truthTable(lesson){
 const decoder=lesson==='boolean-decoder';
 const names=decoder?['y3','y2','y1','y0']:['AND','OR','XOR'];
 const calculate=decoder?decode:logic;
 const box=document.createElement('section');
 box.className='logic-explorer';
 box.innerHTML='<h3>'+(decoder?'观察地址选中哪一条线':'同时比较三个门')+'</h3>'+
  '<p>'+(decoder?'固定使能为 1，切换两位地址。':'把两个门输入各切换一次，观察同一输入如何产生不同输出。')+'</p>'+
  '<div class="logic-controls"><button type="button" class="secondary-button" data-input="0"></button><button type="button" class="secondary-button" data-input="1"></button></div>'+
  '<p role="status"></p><div class="teaching-table"><table><caption>两位输入的全部组合</caption><thead><tr>'+
  [decoder?'高位':'A',decoder?'低位':'B',...names].map(n=>'<th scope="col">'+n+'</th>').join('')+
  '</tr></thead><tbody>'+[0,1,2,3].map(n=>'<tr>'+[n>>1,n&1,...calculate(n>>1,n&1)].map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
 const buttons=[...box.querySelectorAll('button')],rows=[...box.querySelectorAll('tbody tr')],state=[0,0];
 function update(){
  buttons.forEach((b,i)=>{b.textContent=(decoder?['地址高位','地址低位']:['A','B'])[i]+' = '+state[i];b.setAttribute('aria-pressed',String(Boolean(state[i])));});
  const selected=2*state[0]+state[1];
  rows.forEach((r,i)=>{if(i===selected)r.setAttribute('aria-current','true');else r.removeAttribute('aria-current');});
  box.querySelector('[role=status]').textContent=names.map((n,i)=>n+' = '+calculate(...state)[i]).join('，');
 }
 buttons.forEach((b,i)=>b.onclick=()=>{state[i]^=1;update();});
 update();
 return box;
}
function numberExplorer(){
 const box=document.createElement('section');
 box.className='logic-explorer';
 box.innerHTML='<h3>先只用两根线</h3><p>左边这根线的位权是 2，右边是 1。每根线为 1 时，把它的位权加进总数。</p><div class="logic-controls"><button class="secondary-button" type="button"></button><button class="secondary-button" type="button"></button></div><p role="status"></p>';
 const bits=[0,0],buttons=[...box.querySelectorAll('button')];
 const draw=()=>{
  buttons.forEach((b,i)=>{b.textContent='位权 '+(2-i)+'，值 '+bits[i];b.setAttribute('aria-pressed',String(Boolean(bits[i])));});
  box.querySelector('[role=status]').textContent=`${bits.join('')}₂ = ${bits[0]} × 2 + ${bits[1]} × 1 = ${2*bits[0]+bits[1]}`;
 };
 buttons.forEach((b,i)=>b.onclick=()=>{bits[i]^=1;draw();});
 draw();return box;
}
function ledStep(state,enabled,period){
 if(!enabled)return {...state};
 return state.count===period-1?{count:0,led:state.led^1}:{count:state.count+1,led:state.led};
}
function mountLED(target){
 if(!target)return;
 const box=document.createElement('section');
 box.className='logic-explorer';
 box.innerHTML='<h3>用三个允许沿找第一次翻转</h3><p>此处把 HALF_PERIOD 设为 3。先预测下一拍，再推进。初始假定复位完成。</p><div class="logic-controls"><button class="secondary-button" data-en type="button"></button><button class="secondary-button" data-edge type="button">推进一个上升沿</button><button class="secondary-button" data-reset type="button">回到起点</button></div><p role="status"></p>';
 let current={count:0,led:0},enabled=true,edge=0;
 const en=box.querySelector('[data-en]');
 function draw(previous){
  en.textContent='en = '+Number(enabled);en.setAttribute('aria-pressed',String(enabled));
  box.querySelector('[role=status]').textContent=(previous?`第 ${edge} 沿前 count=${previous.count}、LED=${previous.led}；沿后 `:'起点 ')+`count=${current.count}、LED=${current.led}`;
 }
 en.onclick=()=>{enabled=!enabled;draw();};
 box.querySelector('[data-edge]').onclick=()=>{const before=current;current=ledStep(before,enabled,3);edge++;draw(before);};
 box.querySelector('[data-reset]').onclick=()=>{current={count:0,led:0};enabled=true;edge=0;draw();};
 draw();target.append(box);
}
function placement(l,host){
 const row=hdl[l.id];
 if(!row)return null;
 const [type,location,indices,title,prompt,answer]=row;
 const target=host.querySelector('#study-'+location)||host.querySelector('#study-concept');
 target.dataset.teachingType=type;
 if(l.id==='numbers')target.append(numberExplorer());
 if(['logic-gates','boolean-decoder','mindset'].includes(l.id))target.append(truthTable(l.id));
 target.append(guidedCard(title,prompt,answer));
 const targetFor=i=>l.lab.exercises[i].kind==='fill'?host.querySelector('#study-code'):target;
 return {indices,targetFor};
}
function engineering(id,target){
 const entry=fpga[id];
 if(!entry||!target)return;
 const section=document.createElement('aside');
 section.className='learning-checkpoint';
 section.innerHTML='<h3>'+escape(entry[0])+'</h3><p>'+escape(entry[1])+'</p>';
 target.append(section);
}
window.IC_ADAPTIVE_LEARNING={placement,engineering,mountLED,logic,decode,ledStep,types};
})();
