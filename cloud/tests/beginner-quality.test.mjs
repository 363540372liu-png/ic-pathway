import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const c=vm.createContext({window:{}});for(const f of ['hdl-content','textbook-content','textbook-depth','textbook-model','learning-visuals','hdl','fpga/catalog','fpga/content','fpga/progress'])vm.runInContext(fs.readFileSync('public/'+f+'.js','utf8'),c);
const L=c.window.HDL_LESSONS,M=c.window.IC_TEXTBOOK_MODEL,V=c.window.IC_LEARNING_VISUALS,canon=x=>x.replace(/\s+/g,'');
test('every course has specific key-line annotations and objective-linked transfer tasks',()=>{
 const forbidden=/这里组织本课|先核对总宽度、元素数和驱动者|在当前过程里完成这一步计算|声明信号或端口。先|阅读“.*下面的片段，填写空缺/;
 for(const l of L){
  for(const [line,note]of Object.entries(l.lab.lines)){assert.ok(+line>0&&+line<=l.code.split('\n').length,l.id+' stale line');assert.ok(note.length>20);assert.ok(!forbidden.test(note),l.id+' boilerplate');}
  for(const x of l.lab.exercises){assert.ok(x.objective&&x.reviewSection);assert.ok(!forbidden.test(x.prompt));
   if(x.kind==='repair'){assert.notEqual(canon(x.starter),canon(l.lab.bug.wrong),l.id+' repeats clinic');assert.notEqual(canon(x.solution),canon(l.lab.bug.fix),l.id+' repeats clinic solution');assert.ok(x.context&&x.hint&&x.requireReason);assert.ok(x.revision>=3);}
  }
 }
});
test('module/assign precede independent instances; no early if exercise or pre-FIFO async project',()=>{
 const module=L.find(l=>l.id==='module');assert.ok(module.concept.join('').indexOf('assign y')<module.concept.join('').indexOf('and2 u_pair'));
 assert.equal(module.lab.sequence.length,3);assert.ok(module.lab.sequence[0].code.includes('assign y = a & b;'));assert.ok(module.lab.sequence[1].code.includes('^'));assert.ok(module.lab.sequence[2].code.includes('and2 u1'));
 const before=L.slice(0,6);for(const l of before){assert.ok(!/\bmodule\b|\bassign\b/.test(l.code),l.id);assert.ok(!l.lab.exercises.some(x=>x.kind==='implementation'));}
 assert.ok(L.findIndex(l=>l.id==='fifo-project')<L.findIndex(l=>l.id==='async-fifo'));
 assert.ok(!L.find(l=>l.id==='sv-package').code.includes('ready'));assert.ok(!L.find(l=>l.id==='clock-skew').code.includes('create_clock'));
 const tb=L.find(l=>l.id==='testbench');assert.match(tb.lab.lines[6],/#5.*5.*10ns/);assert.match(tb.lab.lines[6],/仅用于测试台/);
});
test('restricted named-port recognition ignores order but rejects duplicates and changed wiring',()=>{
 const ex=L.find(l=>l.id==='module').lab.exercises.find(x=>x.kind==='repair');
 assert.equal(M.grade(ex,{response:'and2 u_lamp(.y(lamp), .b(q), .a(p));'}).status,'recognized');
 assert.equal(M.grade(ex,{response:ex.starter}).status,'needs-change');
 assert.equal(M.grade(ex,{response:'and2 u_lamp(.a(p),.a(q),.y(lamp));'}).status,'unverified');
 assert.equal(M.grade(ex,{response:'assign lamp = p & q;'}).status,'unverified');
 assert.equal(M.grade(ex,{response:'this is not verilog'}).status,'unverified');
 // The recognizer makes no validity claim for other source text.
 assert.equal(M.evaluate(ex,{response:'and2 u_lamp(.a(q),.b(q),.y(lamp));'}),false);
});
test('revised activities retain historical answers/reasons without inventing real verification',()=>{
 const l=L.find(l=>l.id==='module'),old={2:{revision:2,response:'old source',passed:true,reason:'old reason'}};
 const n=M.normalizeActivities(l,old);assert.equal(n[2].passed,false);assert.equal(n[2].history.response,'old source');
 const s={done:true,passed:true,draft:'self check',historicalMastery:true,simulationPassed:true,boardVerified:true,activities:n};
 const ms=M.milestones(l,s);assert.equal(ms.simulation,false);assert.equal(ms.board,false);assert.equal(M.level(l,s),'legacy');
});
test('bit model distinguishes signed overflow, unsigned carry and extension',()=>{
 const a=V.arithmetic(7,1,4,true,'add');assert.equal(a.result.binary,'1000');assert.equal(a.result.value,-8);assert.equal(a.overflow,true);
 const b=V.arithmetic(15,1,4,false,'add');assert.equal(b.result.value,0);assert.equal(b.carry,true);
 assert.equal(V.arithmetic(8,0,4,true,'add').extended,'11111000');assert.equal(V.arithmetic(8,0,4,false,'add').extended,'00001000');
});
test('ready/valid samples only joint assertions and catches changed data under stall',()=>{
 let s={valid:false,ready:false,data:0,count:0};s=V.handshake(s,{valid:true,ready:false,data:90});assert.equal(s.accepted,false);
 s=V.handshake(s,{valid:true,ready:false,data:90});assert.equal(s.violation,false);
 s=V.handshake(s,{valid:true,ready:true,data:90});assert.equal(s.count,1);assert.equal(s.violation,false);
 s=V.handshake({...s,ready:false},{valid:true,ready:true,data:91});assert.equal(s.violation,true);
});
test('LED project drafts and opaque legacy FPGA records survive repeated normalization',()=>{
 const P=c.window.IC_FPGA_PROGRESS,p=P.normalize({fpga:{projects:{led:{draft:'RTL draft',evidence:'not run',updatedAt:123}},mode:'board',lessons:{'24':{guided:'old',independent:'old',quizPassed:true,checks:[true,true,true],completed:true}}}});
 const n=P.normalize(p);assert.equal(n.fpga.projects.led.draft,'RTL draft');assert.equal(n.fpga.projects.led.evidence,'not run');assert.equal(n.fpga.lessons['24'].completed,true);
 assert.equal(c.window.IC_FPGA_CATALOG.modules.filter(m=>!m.optional).length,20);
});
test('answer recognition preserves token boundaries and never promotes edited but unverified RTL',()=>{
 const ex=L.find(l=>l.id==='module').lab.exercises.find(x=>x.kind==='repair');assert.equal(M.grade(ex,{response:'a nd2 u_lamp(.a(p),.b(q),.y(lamp));'}).status,'unverified');
 const l=L.find(l=>l.id==='module'),s={passed:true,activities:{}};for(const [i,x]of l.lab.exercises.entries())s.activities[i]=['analysis','implementation'].includes(x.kind)?{revision:x.revision,draft:'my own work',reviewed:true}:{revision:x.revision,answers:x.blanks?.map(b=>b.accepted[0]),choice:x.correct,response:x.accepted?.[0],reason:'counterexample p=1,q=0',passed:true};
 const i=l.lab.exercises.findIndex(x=>x.kind==='repair');s.activities[i]={revision:ex.revision,response:'assign lamp=p&q;',reason:'one zero input requires zero output',reviewed:true,passed:false};assert.equal(M.canComplete(l,s),true);assert.equal(M.milestones(l,s).automatic,false);assert.equal(M.level(l,s),'practiced');
 s.activities[i].reason='';assert.equal(M.canComplete(l,s),false);
});
test('annotation source signatures and bidirectional assessment mappings never drift silently',()=>{
 for(const l of L){for(const [line,text]of Object.entries(l.lab.lineSources))assert.equal(l.code.split('\n')[+line-1],text,l.id+' line '+line);
  const ids=new Set(l.assessmentGoals.map(g=>g.id));assert.equal(ids.size,l.assessmentGoals.length);
  for(const [i,x]of l.lab.exercises.entries()){const goal=l.assessmentGoals.find(g=>g.id===x.objectiveId);assert.ok(goal&&goal.activities.includes(i),l.id);assert.equal(goal.description,x.objective);}
 }
 const ctx=vm.createContext({window:{}});vm.runInContext(fs.readFileSync('public/fpga/code-notes.js','utf8'),ctx);
 for(const [path,notes]of Object.entries(ctx.window.IC_FPGA_CODE_NOTES)){const lines=fs.readFileSync('public/fpga/'+path,'utf8').split('\n');for(const [n,note]of Object.entries(notes)){assert.equal(note.source,lines[+n-1],path+' stale note '+n);assert.ok(note.explain.length>25);}}
});
