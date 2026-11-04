(()=>{
let ready=false,failed=false;
function recover(message){
 if(ready||failed)return;failed=true;window.IC_BOOT_FAILED=true;
 const draw=()=>{const host=document.getElementById('lesson');if(!host)return;host.innerHTML='<section class="load-recovery" role="alert"><h1>课程暂时未能载入</h1><p></p><button type="button">重新载入课程</button><p>你的已保存进度不会因重新载入被清空。</p></section>';host.querySelector('p').textContent=message;host.querySelector('button').onclick=()=>location.reload();};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',draw,{once:true});else draw();
}
window.addEventListener('error',ev=>{if(ev.target?.tagName==='SCRIPT')recover('部分课程文件下载失败。检查网络后可重试。');else if(!ready&&ev.message)recover('课程初始化遇到问题。请重新载入；若仍失败，保留当前地址以便排查。');},true);
const timeout=setTimeout(()=>recover('课程载入超过预期。可以重新载入，不必清除浏览器数据。'),12000);
window.IC_BOOT={fail:recover,ready(){if(!failed){ready=true;clearTimeout(timeout)}}};
})();
