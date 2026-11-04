(()=>{
'use strict';
const current=document.querySelector('meta[name="ic-release"]')?.content;
if(!current)return;
let checking=false,last=0;
function entry(version){const url=new URL(location.href);url.searchParams.set('v',version);return url.href;}
async function check(manual=false){
 if(checking||(!manual&&Date.now()-last<30000))return;
 checking=true;last=Date.now();
 const button=document.querySelector('#check-release');
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),8000);
 try{
  const response=await fetch('/release.json?check='+Date.now(),{cache:'no-store',credentials:'same-origin',signal:controller.signal});
  if(!response.ok)throw Error('release unavailable');
  const release=await response.json();if(!/^\d+\.\d+\.\d+$/.test(release.version))throw Error('invalid release');
  if(release.version!==current){
   let banner=document.querySelector('#release-update');
   if(!banner){banner=document.createElement('aside');banner.id='release-update';banner.className='release-update';banner.setAttribute('role','status');document.querySelector('#main').prepend(banner);}
   banner.replaceChildren();const text=document.createElement('p');text.textContent='学习室已更新至 v'+release.version+'。重新载入即可使用新版；学习记录继续保留。';
   const link=document.createElement('a');link.className='secondary-button';link.textContent='载入新版';link.href=entry(release.version);banner.append(text,link);
   if(button)button.textContent='有新版';
  }else if(manual&&button){button.textContent='当前已是最新版';}
 }catch{if(manual&&button)button.textContent='检查失败，点击重试';}
 finally{clearTimeout(timeout);checking=false;}
}
const button=document.querySelector('#check-release');if(button)button.onclick=()=>check(true);
window.addEventListener('pageshow',()=>check());
document.addEventListener('visibilitychange',()=>{if(!document.hidden)check()});
check();
})();
