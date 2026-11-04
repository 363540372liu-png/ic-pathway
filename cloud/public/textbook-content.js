(()=>{
const D=Object.fromEntries(window.HDL_LESSONS.map(l=>[l.id,l]));
const content={
branches:{
 hook:'一条数据线需要在a和b之间切换。先写清sel=0选谁，再决定代码；组合电路不应该偷偷记住上次结果。',
 hardware:'mux',kind:'mux',
 principle:['把y默认接到a，sel=1时改接b，等价于一个二选一MUX。always过程内的语句顺序用于算出最终组合关系，并不表示电路输出先等一会儿接a、再接b。','完整赋值是组合设计的核心。若只写if(sel) y=b而没有默认/else，sel=0时必须保留旧值，工具可能推导锁存器；这时电路已经变了。'],
 lines:{1:'模块边界。a和b各4位，sel是1位选择控制；y是过程赋值输出。',3:'@(*)根据过程读取的输入变化重新求值，没有时钟采样。',4:'默认赋值覆盖sel=0路径，防止意外存储。',5:'sel为1才进入条件块。',6:'用阻塞赋值=覆盖默认值，最终组合输出选择b。'},
 bug:{wrong:'always @(*) begin\n if(sel) y=b;\nend',why:'sel=0时y没有赋值，需要保存历史，可能推导锁存器。',fix:'always @(*) begin\n y=a;\n if(sel) y=b;\nend',test:'先令sel=1,b=7，再令sel=0,a=2；修正后y应随a变2，而不是保持7。'},
 exercises:[
 {type:'基础理解',prompt:'a=2,b=7,sel=0，组合y是多少？',options:['2','7','保持旧值'],correct:0,explain:'默认赋值y=a，选择条件不成立。'},
 {type:'代码补全',prompt:'默认y=a之后，if(sel)应填哪条？',options:['y=b;','y<=clk;','没有赋值'],correct:0,explain:'组合计算使用阻塞赋值，把真分支接到b。'},
 {type:'独立实现',prompt:'输入a,b均4位，sel和en各1位；en=0输出0，否则sel=0选a、sel=1选b。写完整模块，并列出4组控制组合。',starter:'module exercise(input wire [3:0] a,b,input wire sel,en,\n output reg [3:0] y);\n // 写完整组合过程\nendmodule',solution:"always @(*) begin\n y=4'd0;\n if(en) y=sel ? b : a;\nend\n// en/sel=00、01时输出0；10选a；11选b。"},
 {type:'Bug 修复',prompt:'if(sel) y=b没有else。为什么组合逻辑可能变存储？',options:['缺少sel=0时的赋值','reg一定生成触发器','分号太多'],correct:0,explain:'漏赋值要求保持旧y，修复应补默认或else。'},
 {type:'波形分析',prompt:'sel=1且b由3变4，中间没有时钟；理想组合y？',options:['跟随变4','必须等上升沿','始终3'],correct:0,explain:'这是组合MUX，不是沿触发寄存器。'}]
},
edges:{
 hook:'按键输入可以随时变化，但寄存器只在约定的时刻拍一张“快照”。这让多个模块能在同一节奏传递数据。',
 hardware:'dff',kind:'dff',
 principle:['DFF的D端是待采样数据，Q端保存已采到的值。clk从0变1才是上升沿；保持高电平不等于连续采样。真实Q会在沿后经过tCQ才变化，本页用理想沿后更新表示逻辑。','代码q<=d在沿到来时读取D并安排Q更新。若边沿前Q=0,D=1，沿后Q=1；两沿之间D再变0，Q仍保持1。未复位的真实四态RTL可能从X开始，演示明确假设初态Q=0。'],
 lines:{1:'输入clk和d、输出变量q。没有复位端口，仿真初态可能是X。',2:'posedge clk只选上升沿事件。',3:'非阻塞赋值先取d的值，再提交q；不会在高电平期间反复执行。'},
 bug:{wrong:'always @(*) q=d;',why:'这描述跟随输入的组合关系，没有边沿采样和保存能力。',fix:'always @(posedge clk) q<=d;',test:'沿后令D翻转但不再给边沿；DFF的Q应保持，错误组合写法会跟随。'},
 exercises:[
 {type:'基础理解',prompt:'D变化而clk没有新上升沿，Q？',options:['保持','跟随','每ns取反'],correct:0,explain:'DFF在规定边沿采样。'},
 {type:'代码补全',prompt:'只在0→1时触发的事件表达式是？',options:['@(posedge clk)','@(*)','@(negedge d)'],correct:0,explain:'posedge表示上升沿，信号是clk。'},
 {type:'独立实现',prompt:'写1位DFF：clk上升沿保存d，低有效同步复位清0。给复位有效、无效两种预期。',starter:'module exercise(input wire clk,rst_n,d,output reg q);\n // 只允许一个过程写q\nendmodule',solution:"always @(posedge clk) begin\n if(!rst_n) q<=1'b0;\n else q<=d;\nend\n// rst_n=0：沿后0；rst_n=1：沿后取D。"},
 {type:'Bug 修复',prompt:'always @(clk) q=d;为什么不是上升沿DFF？',options:['上升下降变化都触发','clk不能输入','d只能是常量'],correct:0,explain:'应显式指定posedge，且寄存器更新用<=。'},
 {type:'波形分析',prompt:'Q初态0；第1沿D=1，第2沿D=0，沿后Q序列？',options:['1,0','0,1','1,1'],correct:0,explain:'每个沿采样该沿前稳定的D。'}]
},
nba:{
 hook:'希望数据经过两级寄存器逐拍传递，为什么b不能在同一沿直接拿到刚写进a的新值？关键是“采样旧状态、一起更新”。',
 hardware:'pipeline',kind:'pipeline',
 principle:['a和b是两份独立DFF。a的D端接d，b的D端接a的Q；同一个沿到来时，两份触发器分别采样各自输入。b采的是沿前a的Q，不能穿过两个触发器。','在仿真活动处理里，两句<=先读取右值、安排更新；NBA提交时才改变左值。代码先写a不表示b会读新a。非阻塞不是“等下一周期才执行”，a在当前沿后就更新，只是b同沿已取走旧a。','若同一块改用a=d; b=a;，第二句会读到第一句已经更新的a，零延迟行为失去两级延迟。多个并发块用阻塞赋值相互读写时还可能产生竞争。'],
 lines:{1:'两个独立寄存器a、b共享clk。',3:'当前上升沿开始：先观察沿前各信号。',4:'记录d作为a的下一值，a当前值尚未改变。',5:'记录旧a作为b的下一值，不读取待提交的新a。',6:'本轮活动处理结束后，安排的非阻塞更新在NBA区域提交。'},
 compare:"module pipeline_sv(input logic clk,d,output logic a,b);\n always_ff @(posedge clk) begin\n  a<=d;\n  b<=a;\n end\nendmodule",
 bug:{wrong:'always @(posedge clk) begin\n a=d;\n b=a;\nend',why:'=立即改变a，后面的b=a读到新值；不能再解释为两级寄存器延迟。',fix:'always @(posedge clk) begin\n a<=d;\n b<=a;\nend',test:'初态a=b=0，D=1。第1沿后应a=1,b=0；第2沿后b才为1。'},
 exercises:[
 {type:'基础理解',prompt:'旧a=0,D=1时，第1沿b取哪个值？',options:['旧a=0','新a=1','随机'],correct:0,explain:'右侧取值发生在NBA更新之前。'},
 {type:'代码补全',prompt:'让b接收上一拍a，应使用哪句？',options:['b <= a;','b = d;','assign b=clk;'],correct:0,explain:'b<=a把沿前a安排为b的下一值。'},
 {type:'独立实现',prompt:'扩成三级a、b、c，共用时钟且同步复位。输入D首次置1后，列出前三沿a/b/c。',starter:'module exercise(input wire clk,rst_n,d,output reg a,b,c);\n // 增加一级，不能让新值同沿穿透\nendmodule',solution:"always @(posedge clk) begin\n if(!rst_n) begin a<=0; b<=0; c<=0; end\n else begin a<=d; b<=a; c<=b; end\nend\n// 100 → 110 → 111。"},
 {type:'Bug 修复',prompt:'a=d; b=a;的主要问题？',options:['b读取已更新的a','<=只能比较','少了时钟'],correct:0,explain:'阻塞更新改变后续语句所读到的值。'},
 {type:'波形分析',prompt:'D按沿依次1、0、1，初态a=b=0；b沿后序列？',options:['0,1,0','1,0,1','0,0,1'],correct:0,explain:'b相对a晚一拍，依次采旧a。'}]
},
counter:{
 hook:'每次允许工作时加1；暂停时记住数字；复位时清零。三个规则先写成优先级，再落到电路。',
 hardware:'counter',kind:'counter',
 principle:['Q通过组合加法器算Q+1，复位与使能选择器决定D端取0、加1结果还是旧Q。寄存器在上升沿把D存回Q，因此反馈不会在同一个时间步无限加。','if复位写在前面，规定复位优先；else if(en)更新，剩下路径保持。4位最大15，加1产生第5位进位，输出只保留低4位，回到0。同步复位拉低后要等有效沿才清零。'],
 lines:{1:'模块输入clk、低有效复位rst_n与使能en。',2:'q是4位过程变量输出，范围0～15（无符号）。',3:'只有上升沿更新状态。',4:'复位优先，rst_n=0时清零，不受en影响。',5:'复位无效且en=1，用旧q算加1；不满足时无赋值，触发器保持。'},
 compare:"module counter_sv_demo(input logic clk,rst_n,en,output logic [3:0] q);\n always_ff @(posedge clk) begin\n  if(!rst_n) q<='0;\n  else if(en) q<=q+4'd1;\n end\nendmodule",
 bug:{wrong:"always @(posedge clk) begin\n if(!rst_n) q<=0;\n if(en) q<=q+1;\nend",why:'两个独立if都可能安排对q的更新。同一过程同一沿多次非阻塞赋值时，最后执行的那次可覆盖前面的复位意图。',fix:"always @(posedge clk) begin\n if(!rst_n) q<=4'd0;\n else if(en) q<=q+4'd1;\nend",test:'复位有效且en=1、沿前q=7，正确结果0。错误写法可能提交8。'},
 exercises:[
 {type:'基础理解',prompt:'en=0且rst_n=1时上升沿后Q？',options:['保持','加1','清0'],correct:0,explain:'没有安排新值，沿触发存储保持。'},
 {type:'代码补全',prompt:'为保证复位优先，第二个判断应写？',options:['else if(en)','if(en)','always(en)'],correct:0,explain:'互斥分支保证计数不会覆盖复位安排。'},
 {type:'独立实现',prompt:'把计数器改为3位，检查复位、en=0保持、7→0回绕、复位与en同时有效。写预期表。',starter:'module exercise(input wire clk,rst_n,en,output reg [2:0] q);\n // 实现并列出测试步骤\nendmodule',solution:"always @(posedge clk) begin\n if(!rst_n) q<=3'd0;\n else if(en) q<=q+3'd1;\nend\n// 复位沿0；en=1计数；en=0保持；7+1截为0；rst_n=0,en=1仍为0。"},
 {type:'Bug 修复',prompt:'两个独立if分别复位和计数，最大问题？',options:['同沿后一次赋值可能覆盖复位','计数器必须异步复位','4位不能加1'],correct:0,explain:'应以if/else if显式编码优先级。'},
 {type:'波形分析',prompt:'从0开始，en按沿为1,0,1，复位一直无效，Q？',options:['1,1,2','1,0,1','1,2,3'],correct:0,explain:'第二沿使能为0，保持1。'}]
},
fsm:{
 hook:'控制器需要记住“现在处于等待还是运行”。状态寄存器保存当前位置，组合逻辑计算下个沿去哪里。',
 hardware:'fsm',kind:'fsm',
 principle:['state是当前状态，next_state是组合计算的候选值。IDLE看到start可使next_state变RUN，但state仍等下一个时钟沿更新。输出busy由state决定，因此沿前不会因为start先变化就立即置1。','这个busy是Moore型输出，只依赖当前状态。Mealy型输出还依赖当前输入，可能在沿间变化；选哪种要看协议要求。本课先把两块式Moore控制器写完整，再扩展协议。'],
 lines:{3:'localparam给状态编码命名，数值只是一种表示。',4:'state是存储，next_state是组合信号。',6:'默认保持当前状态，防止漏赋值。',8:'IDLE且start有效，候选下一状态改为RUN。',9:'RUN且finish有效，候选回到IDLE。',13:'时序块只负责在沿更新当前状态。',17:'busy只依赖当前state，是Moore输出。'},
 bug:{wrong:'assign busy=(next_state==RUN);',why:'输出改为依赖组合候选状态，start可能在沿前使busy置1，违反本课Moore规格。',fix:'assign busy=(state==RUN);',test:'在IDLE时把start拉高但不给时钟；busy应仍为0。'},
 exercises:[
 {type:'基础理解',prompt:'IDLE时start=1，尚无新沿，state？',options:['IDLE','RUN','DONE'],correct:0,explain:'next_state变RUN，当前state尚未采样。'},
 {type:'代码补全',prompt:'组合块默认的下一状态通常写？',options:['next_state=state;','state=next_state;','next_state<=clk;'],correct:0,explain:'默认不转移，时序块再提交状态。'},
 {type:'独立实现',prompt:'加入DONE状态：RUN收到finish进入DONE，DONE下一拍回IDLE；done仅在DONE为1。画转移表并写两块式RTL。',starter:'// 先列IDLE/RUN/DONE转移表\n// 再写next_state组合块、state时序块和done输出',solution:'IDLE+start→RUN；RUN+finish→DONE；DONE→IDLE；其余保持。组合块给默认值，时序块复位IDLE，assign done=(state==DONE)。'},
 {type:'Bug 修复',prompt:'把busy改为next_state==RUN会怎样？',options:['可能在时钟沿前响应start','仍严格Moore输出','自动减少状态位'],correct:0,explain:'next_state可随输入组合变化，输出语义改变。'},
 {type:'波形分析',prompt:'初态IDLE；第1沿start=1；第2沿finish=1，沿后state？',options:['RUN,IDLE','IDLE,RUN','RUN,RUN'],correct:0,explain:'每沿采样当时的next_state。'}]
},
'sv-always':{
 hook:'已会写寄存器和MUX后，用更明确的关键字告诉工具：哪块是组合计算，哪块是触发器。',
 hardware:'dff',kind:'dff',
 principle:['always_comb描述组合意图，并在仿真开始执行一次；它不会帮你补默认分支。always_ff描述沿触发存储意图，并限制事件控制与写入者，降低多人维护时意外多驱动的风险。','logic是四态类型，不等于有存储。next_q由完整的组合赋值产生；q只有always_ff写入，才是一份沿触发状态。always_latch用来明确声明电平敏感存储意图，不应拿它掩盖无意漏赋值。','always_ff不自动推导使能或复位优先级，也不把阻塞赋值改成非阻塞。保持组合=、时序<=的规范，并检查lint/仿真工具的诊断。'],
 lines:{1:'SV端口用logic表达四态数据，仍要满足单驱动规则。',3:'next_q是组合计算结果，不是额外一拍寄存器。',4:'always_comb运行组合计算；右值变化时重新求值。',5:'en=1选d，en=0选旧q，形成保持反馈选择。',7:'always_ff只在上升沿采样next_q。',8:'同步低有效复位优先。',9:'非阻塞更新q，其他过程不能再写q。'},
 compare:"module enabled_ff_v(input wire clk,rst_n,en,d,output reg q);\n reg next_q;\n always @(*) next_q=en ? d : q;\n always @(posedge clk) begin\n  if(!rst_n) q<=1'b0;\n  else q<=next_q;\n end\nendmodule",
 bug:{wrong:"always_comb if(en) next_q=d;",why:'en=0没有赋值，要求保存next_q，违背纯组合意图；关键字不会自动补全逻辑。',fix:'always_comb next_q=en ? d : q;',test:'en=0时next_q应明确等于q，且lint/综合不应报告意外锁存器。'},
 exercises:[
 {type:'基础理解',prompt:'声明logic next_q就意味着它是寄存器吗？',options:['不，取决于赋值行为','是','一定是网络解析器'],correct:0,explain:'类型与硬件存储结构不是一一对应。'},
 {type:'代码补全',prompt:'沿触发q更新应放在哪个块？',options:['always_ff @(posedge clk)','always_comb','generate for'],correct:0,explain:'明确的边沿触发存储过程。'},
 {type:'独立实现',prompt:'将计数器迁移到SV：端口logic、always_ff、低有效同步复位、en保持。写出与原版相同的4类测试。',starter:'module exercise(input logic clk,rst_n,en,output logic [3:0] q);\n // 保持原版行为\nendmodule',solution:"always_ff @(posedge clk) begin\n if(!rst_n) q<='0;\n else if(en) q<=q+4'd1;\nend\n// 复位/计数/保持/回绕，另测复位优先。"},
 {type:'Bug 修复',prompt:'always_comb漏赋值应怎样处理？',options:['补完整组合赋值','换成always_latch压下警告','把变量全换bit'],correct:0,explain:'按规格消除意外存储，不能隐藏未知或告警。'},
 {type:'波形分析',prompt:'en=0且q=1，d变0，无时钟沿；q？',options:['保持1','变0','变Z'],correct:0,explain:'next_q由反馈取q；寄存器也未采样新沿。'}]
}
};
for(const [id,lab] of Object.entries(content)){D[id].lab=lab;D[id].minutes=25;}
window.IC_TEXTBOOK_CONTENT=content;
})();
