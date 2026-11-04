(()=>{
'use strict';
const e=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function budget(p){
 const keys=['period','skew','cqMax','cqMin','delayMax','delayMin','setup','hold','uSetup','uHold'];
 if(keys.some(k=>!Number.isFinite(p[k]))||keys.filter(k=>k!=='skew').some(k=>p[k]<0)||p.period<=0||p.cqMin>p.cqMax||p.delayMin>p.delayMax)return {error:'周期须大于0；除偏斜外的时间非负；min不能大于max。'};
 return {setup:p.period+p.skew-p.cqMax-p.delayMax-p.setup-p.uSetup,hold:p.cqMin+p.delayMin-p.skew-p.hold-p.uHold,latest:p.cqMax+p.delayMax,earliest:p.cqMin+p.delayMin,required:p.period+p.skew-p.setup-p.uSetup,holdRequired:p.skew+p.hold+p.uHold};
}
function windowCheck(change,edge=10,setup=2,hold=1){
 if(change===edge)return 'edge';
 if(change>edge-setup&&change<edge)return 'setup';
 if(change>edge&&change<edge+hold)return 'hold';
 return 'safe';
}
function gray(n){return (n>>>1)^n;}
const svg=(body,label)=>'<svg viewBox="0 0 760 230" role="img" aria-label="'+e(label)+'">'+body+'</svg>';
const text=(x,y,t)=>'<text x="'+x+'" y="'+y+'">'+e(t)+'</text>';
function mount(host,mode){
 host.className='timing-lab';
 if(['budget','path','multicycle'].includes(mode)){
 const defaults={period:10,skew:0.5,cqMax:1,cqMin:0.2,delayMax:6,delayMin:0.4,setup:1,hold:0.2,uSetup:0.2,uHold:0.1};
 const fields={period:'周期 T',skew:'偏斜 s（捕获−发射）',cqMax:'tCQ max',cqMin:'tCQ min',delayMax:'组合 max',delayMin:'组合 min',setup:'Setup',hold:'Hold',uSetup:'Setup不确定度',uHold:'Hold不确定度'};
 host.innerHTML='<h3>路径预算实验 · 最大与最小路径分别检查</h3><p>所有时间单位为ns；同频同相单周期的简化分析，不替代STA。</p><div class="timing-fields">'+Object.entries(fields).map(([k,v])=>'<label>'+e(v)+'<input data-time="'+k+'" aria-label="'+e(v)+'" type="number" step="0.1" '+(k==='skew'?'':'min="0"')+' max="1000" value="'+defaults[k]+'"></label>').join('')+'</div>'+(mode==='path'?'<label>理想均分逻辑的级数 <input id="pipeline-stages" type="range" min="1" max="4" step="1" value="1"></label><p id="pipeline-result"></p><p>仅假设组合max平均分割，不含布线、级间不平衡与额外控制代价；真实结果需综合/实现。</p>':'')+(mode==='multicycle'?'<label>允许捕获的周期数 N <input id="multi-count" type="number" min="1" max="4" value="1"></label><p>下图按已证明数据稳定且仅第N拍捕获的假设显示边沿；hold仍检查本模型的原同沿关系。不是自动生成安全约束。</p>':'')+'<div class="timing-scroll" tabindex="0" aria-label="路径预算图，可横向滚动"></div><div class="timing-result" role="status"></div><p class="timing-equations">Setup = T + s − tCQmax − combmax − setup − Usetup<br>Hold = tCQmin + combmin − s − hold − Uhold</p><button type="button" class="secondary-button" data-restore>恢复例子参数</button>';
 const draw=()=>{
 const p={...defaults};for(const input of host.querySelectorAll('[data-time]'))p[input.dataset.time]=input.value.trim()===''?NaN:Number(input.value);
 if(mode==='path'){const n=Number(host.querySelector('#pipeline-stages').value);p.delayMax/=n;host.querySelector('#pipeline-result').textContent='级数 '+n+'；理想每级组合max '+p.delayMax.toFixed(2)+'ns；寄存器级延迟 '+n+' 拍，吞吐可为每拍一笔（需协议允许）。';}
 const n=mode==='multicycle'?Number(host.querySelector('#multi-count').value):1;
 if(!Number.isInteger(n)||n<1||n>4){host.querySelector('.timing-result').textContent='N须为1到4的整数。';return;}
 const b=budget({...p,period:p.period*n}),result=host.querySelector('.timing-result'),chart=host.querySelector('.timing-scroll');
 if(b.error){result.textContent=b.error;chart.innerHTML='';return;}
 const label='Setup '+(b.setup>=0?'✓ 满足':'✕ 违例')+'，Slack '+b.setup.toFixed(2)+'ns；Hold '+(b.hold>=0?'✓ 满足':'✕ 违例')+'，Slack '+b.hold.toFixed(2)+'ns。';
 result.textContent=label;result.dataset.passed=String(b.setup>=0&&b.hold>=0);
 const lo=Math.min(0,p.skew,b.holdRequired,b.earliest)-1,hi=Math.max(p.period*n+p.skew,b.latest,b.required)+2,x=v=>80+(v-lo)/(hi-lo)*620;
 chart.innerHTML=svg('<path d="M80 180H710" class="axis"/>'+[0,p.period*n+p.skew,b.earliest,b.latest].map((v,i)=>'<path d="M'+x(v)+' '+(i<2?35:95)+'V180" class="'+(i<2?'clock-mark':'data-mark')+'"/>'+text(x(v)-12,i<2?25:210,v.toFixed(2)+'ns')).join('')+'<rect x="'+x(b.required)+'" y="45" width="'+Math.max(1,x(p.period*n+p.skew)-x(b.required))+'" height="100" class="setup-zone"/>'+text(85,70,'发射沿0 → 数据最早/最晚到达 → 第'+n+'个捕获沿')+text(85,105,'最晚到达 '+b.latest.toFixed(2)+'；最晚允许 '+b.required.toFixed(2))+text(85,140,'最早到达 '+b.earliest.toFixed(2)+'；Hold要求不早于 '+b.holdRequired.toFixed(2)),label);
 };
 host.querySelectorAll('input').forEach(i=>i.oninput=draw);host.querySelector('[data-restore]').onclick=()=>{for(const i of host.querySelectorAll('[data-time]'))i.value=defaults[i.dataset.time];if(host.querySelector('#pipeline-stages'))host.querySelector('#pipeline-stages').value=1;if(host.querySelector('#multi-count'))host.querySelector('#multi-count').value=1;draw()};draw();
 }else if(mode==='window'){
 host.innerHTML='<h3>移动数据变化时刻，观察采样窗口</h3><label>D从0变1的时刻（ns）<input id="window-change" type="range" min="0" max="20" step="0.5" value="7"></label><div class="timing-scroll" tabindex="0" aria-label="建立保持窗口"></div><p class="timing-result" role="status"></p><p>采样沿10ns，setup=2ns、hold=1ns；只放一个数据变化。恰好边界意味着零裕量，本图没有抖动与库精度模型。窗口内只标风险，不伪造亚稳态输出值。</p>';
 const draw=()=>{const t=Number(host.querySelector('input').value),kind=windowCheck(t),labels={safe:'✓ 在示例禁变窗口之外（边界为零裕量）',setup:'✕ Setup不足：沿前稳定时间太短',hold:'✕ Hold不足：沿后太早变化',edge:'✕ 数据与采样沿重合：采样风险'};const label='变化 '+t.toFixed(1)+'ns。'+labels[kind];host.querySelector('.timing-result').textContent=label;const x=v=>90+v*29;host.querySelector('.timing-scroll').innerHTML=svg('<rect x="'+x(8)+'" y="20" width="'+(3*29)+'" height="155" class="setup-zone"/><path d="M90 140H'+x(10)+'V100H'+x(20)+'" class="clock-mark"/><path d="M90 75H'+x(t)+'V45H'+x(20)+'" class="data-mark"/><path d="M'+x(10)+' 20V180" class="clock-mark"/>'+text(22,60,'D')+text(20,130,'clk')+[0,8,10,11,20].map(v=>text(x(v)-8,205,v+'ns')).join(''),label);};host.querySelector('input').oninput=draw;draw();
 }else if(mode==='cdc'){
 host.innerHTML='<h3>窄脉冲会不会被采到？</h3><p>目的时钟沿固定为0、10、20、30、40ns。本实验只做理想采样，不模拟亚稳态或同步器MTBF。</p><label>脉冲开始ns<input id="cdc-start" type="range" min="0" max="25" step="1" value="2"></label><label>脉冲宽度ns<input id="cdc-width" type="range" min="1" max="15" step="1" value="3"></label><div class="timing-scroll"></div><p class="timing-result" role="status"></p>';
 const draw=()=>{const s=+host.querySelector('#cdc-start').value,w=+host.querySelector('#cdc-width').value,edges=[0,10,20,30,40],samples=edges.map(t=>t>=s&&t<s+w?1:0),near=edges.some(t=>t===s||t===s+w);const label='脉冲区间 ['+s+','+(s+w)+')ns；目的域理想采样 '+samples.join(' → ')+(near?'；边界与沿重合，实际存在采样窗口风险。':samples.some(Boolean)?'；至少一个沿采到高电平。':'；全部漏采，双FF不能找回未采到的事件。');host.querySelector('.timing-result').textContent=label;const x=t=>70+t*15;host.querySelector('.timing-scroll').innerHTML=svg(edges.map(t=>'<path d="M'+x(t)+' 30V180" class="clock-mark"/>'+text(x(t)-8,210,t+'ns')).join('')+'<path d="M70 100H'+x(s)+'V55H'+x(s+w)+'V100H700" class="data-mark"/>'+text(80,150,'高电平必须覆盖目的采样机会，真实硬件还需要setup/hold裕量。'),label);};host.querySelectorAll('input').forEach(i=>i.oninput=draw);draw();
 }else if(mode==='gray'){
 host.innerHTML='<h3>二进制与Gray指针逐步比较</h3><div class="timeline-controls"><button data-prev>← 前一个</button><button data-next>下一个 →</button><button data-reset>回到0</button></div><div class="gray-visual" role="status"></div><p>展示4位指针（3位地址+1位回绕）。Gray表只是编码关系，不是完整异步FIFO；同步链、存储及跨域约束仍然必要。</p>';
 let n=0,prev=15;const bits=n=>n.toString(2).padStart(4,'0');const draw=()=>{const diff=gray(n)^gray(prev);host.querySelector('.gray-visual').textContent='binary '+bits(prev)+' → '+bits(n)+'；Gray '+bits(gray(prev))+' → '+bits(gray(n))+'；改变位掩码 '+bits(diff)+'（相邻只变1位）';};host.querySelector('[data-next]').onclick=()=>{prev=n;n=(n+1)&15;draw()};host.querySelector('[data-prev]').onclick=()=>{prev=n;n=(n+15)&15;draw()};host.querySelector('[data-reset]').onclick=()=>{n=0;prev=15;draw()};draw();
 }
 return ()=>{};
}
window.IC_TIMING={budget,windowCheck,gray,mount};
})();
