(()=>{
'use strict';
const retired=new Set(['competition','milestones','project-journal','skills','system-integration','ultra-image','ultra-image-concept','ultra-image-stream']);
function isRetiredRoute(id){return typeof id==='string'&&(retired.has(id)||/^edge-\d+$/.test(id));}
function preserve(raw,out){
 // Retired records are opaque backup data, never loaded as a course or used for readiness.
 if(raw?.competition&&typeof raw.competition==='object'&&!Array.isArray(raw.competition))out.competition=JSON.parse(JSON.stringify(raw.competition));
 return out;
}
window.IC_PROGRESS_COMPAT={isRetiredRoute,preserve};
})();
