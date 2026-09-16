(function(root){
const C=root.IC_PROJECT_CATALOG;
const text=(v,n=6000)=>typeof v==='string'?v.slice(0,n):'';
const blank=()=>({schema:1,modules:{},milestones:{},journal:{},skills:{},integration:{},reflection:'',journalDraft:{},ultra:{}});
function normalize(raw){const v=raw?.competition||{},p=blank();
 for(const m of C.modules){const x=v.modules?.[m.id];if(x&&typeof x==='object')p.modules[m.id]={state:C.states.includes(x.state)?x.state:'NOT STARTED',draft:text(x.draft),evidence:text(x.evidence,3000),reviewed:!!x.reviewed};}
 for(const m of C.milestones){const x=v.milestones?.[m.id];if(x&&typeof x==='object')p.milestones[m.id]={state:C.states.includes(x.state)?x.state:'NOT STARTED',evidence:text(x.evidence,4000),checked:!!x.checked};}
 for(const [id,x]of Object.entries(v.journal||{}).slice(-80)){if(!/^[a-zA-Z0-9_-]{1,80}$/.test(id)||!x||typeof x!=='object'||['__proto__','constructor','prototype'].includes(id))continue;p.journal[id]={at:Number.isFinite(Date.parse(x.at))?x.at:'',...Object.fromEntries(['attempt','worked','failed','bug','learned','next'].map(k=>[k,text(x[k],1200)])),tags:C.tags.filter(t=>x.tags?.includes(t))};}
 for(const s of C.skills){const x=v.skills?.[s.id];if(x&&typeof x==='object')p.skills[s.id]={level:C.levels.includes(x.level)?x.level:'NOT LEARNED',evidence:text(x.evidence,2000)};}
 for(const [k]of C.interfaceFields)p.integration[k]=text(v.integration?.[k],2000);
 p.reflection=text(v.reflection,2000);
 const jd=v.journalDraft||{};p.journalDraft={...Object.fromEntries(['attempt','worked','failed','bug','learned','next'].map(k=>[k,text(jd[k],1200)])),id:/^[a-zA-Z0-9_-]{1,80}$/.test(jd.id||'')?jd.id:'',at:Number.isFinite(Date.parse(jd.at))?jd.at:'',tags:C.tags.filter(t=>jd.tags?.includes(t))};
 for(const id of ['concept','stream']){const x=v.ultra?.[id];if(x&&typeof x==='object')p.ultra[id]={draft:text(x.draft,12000),answers:Array.from({length:7},(_,i)=>text(x.answers?.[i],100)),hints:Math.min(3,Math.max(0,Number(x.hints)||0)),checks:Array.from({length:4},(_,i)=>!!x.checks?.[i]),attempts:(Array.isArray(x.attempts)?x.attempts:[]).slice(-5).filter(a=>a&&Number.isFinite(Date.parse(a.at))).map(a=>({at:a.at,draft:text(a.draft,12000),answers:Array.from({length:7},(_,i)=>text(a.answers?.[i],100)),assisted:!!a.assisted,checks:Array.from({length:4},(_,i)=>!!a.checks?.[i])}))};}
 return p;
}
function learned(p,route){if(route.startsWith('fpga-'))return !!p.fpga?.lessons?.[route.slice(5)]?.completed;if(route.startsWith('edge-'))return p.competition?.modules?.[route.slice(5)]?.state==='COMPLETED';return !!p.lessons?.[route]?.completed;}
function readiness(p,id){const m=C.modules.find(x=>x.id===id);const missing=m.foundation.filter(r=>!learned(p,r));const review=m.depends.filter(k=>!learned(p,'edge-'+k));return {state:missing.length?'PREREQUISITE MISSING':review.length?'RECOMMENDED TO REVIEW':'READY',missing,review};}
function milestoneComplete(p,id,seen=new Set()){const m=C.milestones.find(x=>x.id===id),x=p.competition?.milestones?.[id];if(!m||seen.has(id)||x?.state!=='COMPLETED'||!x.checked||x.evidence.trim().length<20)return false;seen.add(id);return m.depends.every(k=>milestoneComplete(p,k,new Set(seen)));}
function gray(r,g,b){return (77*r+150*g+29*b)>>8;}
function sobel(p,t=300){const gx=-p[0]+p[2]-2*p[3]+2*p[5]-p[6]+p[8],gy=-p[0]-2*p[1]-p[2]+p[6]+2*p[7]+p[8],mag=Math.abs(gx)+Math.abs(gy);return {gx,gy,mag,edge:mag>t?255:0};}
function windowAt(width,height,index){const row=Math.floor(index/width),col=index%width;return {row,col,valid:row>=2&&col>=2&&row<height,center:[col-1,row-1],pixels:Array.from({length:9},(_,i)=>{const y=row-2+Math.floor(i/3),x=col-2+i%3;return y<0||x<0?null:y*width+x;})};}
root.IC_PROJECT_MODEL={blank,normalize,learned,readiness,milestoneComplete,gray,sobel,windowAt};
})(window);
