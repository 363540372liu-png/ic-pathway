(() => {
let api,user=null,ready=false,busy=false,timer,revision=0,base=null,pending=false,conflict=null;
const clone=x=>JSON.parse(JSON.stringify(x)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const note=t=>{document.querySelector('.local-note').textContent=t;};
const account=()=>document.querySelector('#account');
function cache(){if(!user||!api)return;try{localStorage.setItem('ic-pathway.account.'+user.id,JSON.stringify({data:api.get(),base,revision,pending,conflict}));}catch{note('本机缓存不可用，请保持联网并及时导出进度');}}
async function request(path,options){const r=await fetch(path,{credentials:'same-origin',cache:'no-store',...options});let body;try{body=await r.json();}catch{throw Error('云端响应异常，请稍后重试');}return {r,body};}
// Merge at individual lesson fields, so unrelated edits from two devices coexist.
function merge(b,l,r,path='',conflicts=[]){
 if(same(l,b))return clone(r??null);if(same(r,b)||same(l,r))return clone(l??null);
 if(l&&r&&typeof l==='object'&&typeof r==='object'&&!Array.isArray(l)&&!Array.isArray(r)){
  const out={};for(const k of new Set([...Object.keys(l),...Object.keys(r)]))out[k]=merge(b?.[k],l[k],r[k],path+'.'+k,conflicts);return out;
 }
 if(path==='.last')return clone(l??r);
 conflicts.push(path);return clone(l??null);
}
function showConflict(remote){
 const previousBase=clone(base);const conflicts=[],merged=merge(base||{},api.get(),remote.data||{},'',conflicts);
 revision=remote.revision;base=clone(remote.data);conflict={remote:clone(remote.data),merged,base:previousBase};pending=true;cache();
 document.querySelector('#lesson').inert=true;const box=document.querySelector('#sync-conflict');box.hidden=false;
 box.innerHTML='<strong>两台设备修改了同一项记录</strong><p>两份记录已保留在本机待处理缓存。先导出备份，再选择冲突项保留哪一份；没有冲突的改动会合并。</p><button id="keep-local" class="secondary-button">冲突项保留本机</button> <button id="keep-remote" class="secondary-button">冲突项保留云端</button><button id="export-conflict" class="quiet-button">导出两份备份</button>';
 document.querySelector('#export-conflict').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify({local:api.get(),remote:conflict.remote},null,2)],{type:'application/json'}));a.download='芯路-冲突备份.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000);};
 document.querySelector('#keep-local').onclick=()=>resolve(conflict.merged);
 document.querySelector('#keep-remote').onclick=()=>{const out=clone(conflict.merged);for(const p of conflicts){const ks=p.slice(1).split('.');let o=out,r=conflict.remote;for(const k of ks.slice(0,-1)){o=o[k];r=r?.[k];}o[ks.at(-1)]=r?.[ks.at(-1)]??null;}resolve(out);};
 note('同步有冲突，请选择要保留的记录');
}
function resolve(data){document.querySelector('#lesson').inert=false;conflict=null;document.querySelector('#sync-conflict').hidden=true;api.set(data);pending=true;cache();save();}
async function save(){
 if(!ready||!user||busy||conflict||!pending)return;
 busy=true;let retry=false;const snapshot=clone(api.get());note('正在保存到云端…');
 try{
  const {r,body}=await request('/api/progress',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({revision,data:snapshot})});
  if(r.status===409){const conflicts=[],merged=merge(base||{},api.get(),body.data||{},'',conflicts);if(conflicts.length){showConflict(body);return;}base=clone(body.data);revision=body.revision;api.set(merged);pending=true;cache();retry=true;return;}
  if(r.status===401){ready=false;note('登录已过期；本机待同步内容已保留，请重新登录');account().innerHTML='<a href="/signin-with-chatgpt?return_to=%2F" target="_top">重新使用 ChatGPT 登录</a>';return;}
  if(!r.ok)throw Error(body.error||'云端保存失败');
  revision=body.revision;base=snapshot;pending=!same(api.get(),snapshot);retry=pending;cache();note(pending?'还有新修改等待同步':'已保存到云端 · 换设备登录同一账号即可继续');
 }catch(e){note(e.message+'；解答暂存在本机，可点重试');cache();}
 finally{busy=false;if(retry&&ready&&!conflict)timer=setTimeout(save,700);}
}
async function refresh(){
 if(!ready||!user||busy||conflict)return;if(pending){save();return;}
 busy=true;try{const {r,body}=await request('/api/progress');if(!r.ok)throw Error(body.error||'同步失败');if(body.revision!==revision){if(pending){return;}revision=body.revision;base=clone(body.data);api.set(body.data);cache();note('已载入另一设备的最新进度');}}catch(e){note(e.message+'；可点重试');}finally{busy=false;}
}
window.IC_SYNC={
 schedule(){if(!ready)return;pending=true;cache();clearTimeout(timer);timer=setTimeout(save,650);},
 async init(callbacks){api=callbacks;document.querySelector('#lesson').inert=true;
  document.querySelector('#sync-retry').onclick=()=>{if(!ready){this.init(callbacks);}else if(pending)save();else refresh();};
  try{
   const {r,body}=await request('/api/session');if(!r.ok)throw Error('无法确认登录状态');user=body.user;
   if(!user){account().innerHTML='<a href="/signin-with-chatgpt?return_to=%2F" target="_top">使用 ChatGPT 登录</a>';note('登录后同步进度；未登录时的解答仅暂存在本机');return;}
   account().textContent=user.email+' · ';const link=document.createElement('a');link.href='/signout-with-chatgpt?return_to=%2F';link.target='_top';link.textContent='退出';link.onclick=e=>{if(pending||busy||conflict){e.preventDefault();note('还有未同步内容，请先同步成功或导出备份，再退出');}else{try{localStorage.removeItem('ic-pathway.progress.v1');}catch{}}};account().append(link);
   let saved=null;try{saved=JSON.parse(localStorage.getItem('ic-pathway.account.'+user.id)||'null');}catch{}
   const {r:pr,body:cloud}=await request('/api/progress');if(!pr.ok)throw Error(cloud.error||'云端读取失败');
   revision=cloud.revision;base=clone(cloud.data);let next=cloud.data;
   let owner=null;try{owner=localStorage.getItem('ic-pathway.legacy-owner');}catch{}
   if(saved?.conflict){base=saved.conflict.base;api.set(saved.data);ready=true;showConflict(cloud);return;}
   if(saved?.pending){const conflicts=[];next=merge(saved.base||{},saved.data,cloud.data||{},'',conflicts);if(conflicts.length){base=saved.base;api.set(saved.data);ready=true;showConflict(cloud);return;}pending=true;}
   else if(!owner||owner===user.id){
    // One-time migration of the old device-only course progress into this account.
    if(!owner){const local=api.get();if(cloud.data){
      next=clone(cloud.data);const migrationBase=clone(cloud.data);let hasConflict=false;
      for(const [id,v] of Object.entries(local.lessons||{})){
       if(!v.draft&&!v.completed&&!v.extraDraft)continue;
       if(!next.lessons[id]||!next.lessons[id].draft){next.lessons[id]=v;continue;}
       if(v.completed)next.lessons[id].completed=true;
       for(const field of ['draft','extraDraft'])if(v[field]&&v[field]!==next.lessons[id][field]){if(next.lessons[id][field]){delete migrationBase.lessons[id][field];hasConflict=true;}next.lessons[id][field]=v[field];}
      }
      for(const [k,v]of Object.entries(local.acceptance||{}))if(v)next.acceptance[k]=true;
      if(hasConflict){base=migrationBase;api.set(next);ready=true;try{localStorage.setItem('ic-pathway.legacy-owner',user.id);}catch{}showConflict(cloud);return;}
     }else next=local;pending=true;}
   }
   api.set(next||{schema:1,course:'ic-pathway',last:'bits',lessons:{},acceptance:{},ultra:{}});
   try{localStorage.setItem('ic-pathway.legacy-owner',user.id);}catch{}
   ready=true;cache();if(pending)save();else note('云端进度已载入 · 使用同一 ChatGPT 账号跨设备继续');
  }catch(e){ready=false;note(e.message+'；未覆盖本机记录，请点重试');}
  finally{if(!conflict)document.querySelector('#lesson').inert=false;}
 }
};
window.addEventListener('online',()=>{if(pending)save();else refresh();});
window.addEventListener('focus',refresh);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refresh();else if(pending)save();});
window.addEventListener('beforeunload',e=>{if(pending||busy){e.preventDefault();e.returnValue='';}});
})();
