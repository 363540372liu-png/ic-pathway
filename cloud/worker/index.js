const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json;charset=utf-8','Cache-Control':'no-store','Vary':'oai-authenticated-user-id'}});
const readProgress=async(db,id)=>await db.prepare('SELECT data, revision FROM learning_progress WHERE user_id = ?').bind(id).first();
export default {async fetch(request,env){
 const url=new URL(request.url),id=request.headers.get('oai-authenticated-user-id');
 if(url.pathname==='/api/session')return json({user:id?{id,email:request.headers.get('oai-authenticated-user-email')||'ChatGPT 用户'}:null});
 if(url.pathname==='/api/progress'){
  if(!id)return json({error:'请先使用 ChatGPT 登录'},401);
  try{
   if(request.method==='GET'){const row=await readProgress(env.DB,id);return json({data:row?JSON.parse(row.data):null,revision:row?.revision||0});}
   if(request.method!=='PUT')return json({error:'Method not allowed'},405);
   if(request.headers.get('Origin')!==url.origin)return json({error:'来源不匹配'},403);
   if(!request.headers.get('content-type')?.includes('application/json'))return json({error:'需要 JSON'},415);
   const raw=await request.text();if(raw.length>900000)return json({error:'进度过大，请导出备份并缩短解答'},413);
   const body=JSON.parse(raw),data=body.data;
   if(!Number.isSafeInteger(body.revision)||body.revision<0||data?.schema!==1||data?.course!=='ic-pathway'||!data.lessons||typeof data.lessons!=='object'||Array.isArray(data.lessons))return json({error:'无效进度'},400);
   // Older clients do not know these extensions. Preserve them under the same CAS revision.
   if(body.revision>0&&(!Object.hasOwn(data,'fpga')||!Object.hasOwn(data,'ultraFPGA')||!Object.hasOwn(data,'competition'))){
    const row=await readProgress(env.DB,id);
    if(row?.revision===body.revision){const previous=JSON.parse(row.data);for(const key of ['fpga','ultraFPGA','competition'])if(!Object.hasOwn(data,key)&&Object.hasOwn(previous,key))data[key]=previous[key];}
   }
   const content=JSON.stringify(data),now=new Date().toISOString();
   let result;
   if(body.revision===0)result=await env.DB.prepare('INSERT INTO learning_progress (user_id,data,revision,updated_at) VALUES (?,?,1,?) ON CONFLICT(user_id) DO NOTHING').bind(id,content,now).run();
   else result=await env.DB.prepare('UPDATE learning_progress SET data=?, revision=revision+1, updated_at=? WHERE user_id=? AND revision=?').bind(content,now,id,body.revision).run();
   if(!result.meta.changes){const row=await readProgress(env.DB,id);return json({error:'另一设备已更新',data:row?JSON.parse(row.data):null,revision:row?.revision||0},409);}
   return json({revision:body.revision+1,savedAt:now});
  }catch(error){console.error('Progress unavailable',error.message);return json({error:'云端暂时无法保存，请保留页面并重试'},503);}
 }
 if(request.method!=='GET'&&request.method!=='HEAD')return new Response('Method not allowed',{status:405});
 const key=url.pathname==='/'?'/index.html':url.pathname,asset=ASSETS[key];
 if(!asset)return new Response('Not found',{status:404});
 const ext=key.split('.').pop(),type={html:'text/html;charset=utf-8',js:'text/javascript;charset=utf-8',css:'text/css;charset=utf-8',txt:'text/plain;charset=utf-8',zip:'application/zip'}[ext]||'application/octet-stream';
 return new Response(request.method==='HEAD'?null:Uint8Array.from(atob(asset),c=>c.charCodeAt(0)),{headers:{'Content-Type':type,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'}});
}};
