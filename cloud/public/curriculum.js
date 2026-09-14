/* Original course notes and exercises. Browser demos are teaching models, not HDL simulators. */
const SOURCES = {
  logic: ['MIT · 数字电路课程笔记（英文）', 'https://computationstructures.org/notes/'],
  iverilog: ['Icarus Verilog · 官方入门', 'https://steveicarus.github.io/iverilog/usage/getting_started.html'],
  install: ['Icarus Verilog · 安装说明', 'https://steveicarus.github.io/iverilog/usage/installation.html'],
  wave: ['GTKWave · 官方文档', 'https://gtkwave.github.io/gtkwave/'],
  vcs: ['Synopsys · VCS 产品与文档入口', 'https://www.synopsys.com/verification/simulation/vcs.html'],
  dc: ['Synopsys · Design Compiler', 'https://www.synopsys.com/implementation-and-signoff/rtl-synthesis-test/design-compiler.html'],
  yosys: ['Yosys · 综合原理入门', 'https://yosyshq.readthedocs.io/projects/yosys/en/v0.48/appendix/primer.html']
};
const STAGES = [
  {title:'数字电路基础',short:'电路基础',desc:'先知道自己正在描述什么电路'},
  {title:'Verilog RTL',short:'Verilog',desc:'用代码表达组合逻辑和寄存器'},
  {title:'仿真与测试',short:'仿真测试',desc:'让错误主动暴露出来'},
  {title:'VCS 实操',short:'VCS',desc:'在学校环境运行同一个设计'},
  {title:'DC 基础综合',short:'DC 综合',desc:'从 RTL 到标准单元网表'},
  {title:'贯穿项目与验收',short:'项目验收',desc:'用可复现的结果交付一个小模块'}
];
const LESSONS = [
{
 id:'bits',stage:0,title:'从 0 和 1 开始',minutes:20,
 intro:'先不用安装软件。点亮四个位，看看同一组电平怎样表示一个数字。',
 goals:['认识 bit 与位宽','读懂二进制数','理解有限位宽'],lab:'bits',
 sections:[
  ['数字电路里的 0 和 1','数字电路把一定范围内的电压解释成逻辑 0 或逻辑 1。它们是离散的逻辑值；并不是“0 必定等于 0 V、1 必定等于 5 V”。电压阈值取决于器件与工艺。一个 bit（位）只能表达两种状态。'],
  ['四个位，为什么能表示 16 种状态？','从右往左，四位二进制的权重是 1、2、4、8。1010 的值是 1×8＋0×4＋1×2＋0×1＝10。n 个独立的位有 2ⁿ 种组合，因此 4 位无符号数的范围是 0～15，而不是 0～16。'],
  ['位宽会改变运算结果','把结果存进 4 位寄存器时，高出的位会被截掉。1111＋0001 得到的数学结果是 10000；只留下低 4 位就是 0000。这叫回绕。若要保留进位，必须明确准备第 5 位。'],
  ['接下来怎样学习','这条路径从零补数字电路，再写 Verilog，随后建立测试，最后使用 VCS 与 DC。建议每次完成一课的讲解、演示和练习；读完不等于掌握，能预测电路结果才算跨过这一关。每课时间是初读估计，动手排错需要额外时间。']
 ],
 code:{name:'Verilog 数字写法预览',lang:'verilog',text:"4'b1010   // 4 位二进制，值为 10\n4'd10     // 4 位十进制，值为 10\n4'hA      // 4 位十六进制，值为 10"},
 trap:'这里先使用无符号数。补码、有符号比较和符号扩展会在位宽那一课学习，不能把最高位在所有情况下都当作负号。',
 exercise:{task:'把十进制 13 写成 4 位二进制，再解释 4 位无符号计数器从 15 加 1 会得到什么。',placeholder:'13 = …；15 + 1 存入 4 位后 = …，因为 …',answer:'13 = 1101；四位保存不了第五位进位，因此 1111 加一后保留 0000，结果回到 0。'},
 quiz:{q:'一个 5 位无符号数的最大值是多少？',options:['16','31','32'],correct:1,why:'5 位共有 2⁵ = 32 种组合，从 0 开始计数，最大值是 31。'},sources:['logic']
},
{
 id:'gates',stage:0,title:'逻辑门与真值表',minutes:25,
 intro:'组合电路的输出由当前输入决定。真值表能把这种关系完整写出来。',
 goals:['区分与、或、非、异或','列出全部输入组合','从规则写表达式'],lab:'gates',
 sections:[
 ['先把一句话变成规则','假设设备只有在“电源正常 A”和“允许运行 B”同时成立时才能启动。输出 Y = A AND B；只有 A、B 都为 1，Y 才是 1。OR（或）只要求至少一个输入为 1；NOT（非）翻转一个位。'],
 ['异或是“不同为 1”','两输入 XOR（异或）的结果在输入不同的时候为 1：01、10 得到 1，00、11 得到 0。它常用在加法器和奇偶校验里。不要把 XOR 当成 OR，两个输入都为 1 时它们的输出不同。'],
 ['真值表是一份可穷举的规格','两位输入共有 4 种组合，三位共有 8 种。写小型组合逻辑时，先列真值表，再写代码，然后让测试逐项覆盖。我们先采用理想逻辑模型；真实门电路还存在传播延迟。']
 ],
 code:{name:'gate_demo.v',lang:'verilog',text:'module gate_demo(input wire a, b,\n                 output wire y_and, y_or, y_xor);\n  assign y_and = a & b;\n  assign y_or  = a | b;\n  assign y_xor = a ^ b;\nendmodule'},
 trap:'本课的输入是单个位。多位向量中的 & 是逐位与，&& 是逻辑与，不能在下一阶段随意替换。',
 exercise:{task:'列出 a、b 的四组组合，分别给出 a | b 与 a ^ b 的结果，指出它们在哪一行不同。',placeholder:'a b | OR XOR\n0 0 | …\n0 1 | …\n1 0 | …\n1 1 | …',answer:'00：0、0；01：1、1；10：1、1；11：1、0。只有最后一行不同。'},
 quiz:{q:'a=1、b=1 时，a ^ b 等于多少？',options:['0','1','无法确定'],correct:0,why:'异或在两个输入不同时为 1；这里两者相同，所以结果为 0。'},sources:['logic']
},
{
 id:'mux',stage:0,title:'多路选择器与加法器',minutes:30,
 intro:'逻辑门可以组成“选择”和“计算”两种很常见的电路。',
 goals:['理解二选一','认识数据通路','保留加法进位'],lab:'mux',
 sections:[
 ['二选一电路','多路选择器简称 MUX。它有两个数据输入 a、b，一个选择输入 sel 和一个输出 y。本课程规定 sel=0 选 a，sel=1 选 b。选择规则属于规格的一部分，不应靠猜。'],
 ['加法器由组合逻辑构成','对于两个单个位，和位是 a XOR b，进位是 a AND b。多位加法器把各位和进位关系组合起来。RTL 里的加号描述加法行为，综合工具会选择对应实现；不意味着芯片运行时会“调用加法函数”。'],
 ['宽度是接口契约','两个 4 位无符号数相加，最大值是 15＋15＝30，需要 5 位。先把两边补零扩展到 5 位再求和，可以明确保留进位。只输出低 4 位的接口则会截断结果。']
 ],
 code:{name:'datapath.v',lang:'verilog',text:"module datapath(input wire [3:0] a, b,\n                input wire sel,\n                output wire [3:0] y,\n                output wire [4:0] sum);\n  assign y = sel ? b : a;\n  assign sum = {1'b0, a} + {1'b0, b};\nendmodule"},
 trap:'这里所有逻辑都随输入变化，没有保存上一次输出的能力。要让电路记住状态，需要触发器或其他存储结构。',
 exercise:{task:'a=9、b=7 时，分别给出 sel=0、sel=1 的 y，以及 5 位 sum 的二进制值。',placeholder:'sel=0：…；sel=1：…；sum：…',answer:'sel=0 时 y=9，sel=1 时 y=7；sum=16，即 5 位二进制 10000。'},
 quiz:{q:'两个 4 位无符号数相加，为保证不丢失结果，输出至少几位？',options:['4 位','5 位','8 位'],correct:1,why:'最大和为 30，5 位无符号数可以表示 0～31。'},sources:['logic','yosys']
},
{
 id:'clock',stage:0,title:'时钟、触发器与状态',minutes:30,
 intro:'有记忆的电路，需要回答“什么时候更新”。时钟边沿给出了这个约定。',
 goals:['分清电平与边沿','理解 D 触发器','认识同步复位'],lab:'clock',
 sections:[
 ['组合逻辑和时序逻辑','组合逻辑不需要保存历史。时序逻辑包含存储状态，输出可能和过去发生的事情有关。例如计数器必须记住上一次的数值，才能在下一次时钟到来时加一。'],
 ['上升沿触发的 D 触发器','时钟从 0 变为 1 的瞬间叫上升沿。理想 D 触发器在这个边沿采样输入 D，把它保存到输出 Q；其余时间 Q 保持不变。时钟处于高电平不等于“一直更新”。真实电路还要求 D 在边沿附近满足建立、保持时间。'],
 ['复位规定起点','同步复位只在有效时钟边沿生效；异步复位可在时钟边沿之外触发。本课程贯穿项目使用低有效同步复位 rst_n：rst_n=0 且上升沿到来时清零。后缀 _n 只是命名习惯，最终行为由代码规定。'],
 ['理想演示的边界','网页每次点击“时钟边沿”代表一次采样，忽略真实器件的传播延迟、亚稳态和建立保持约束。不能凭网页模型证明物理时序满足要求。']
 ],
 code:{name:'dff.v',lang:'verilog',text:"module dff(input wire clk, rst_n, d,\n           output reg q);\n  always @(posedge clk) begin\n    if (!rst_n) q <= 1'b0;\n    else        q <= d;\n  end\nendmodule"},
 trap:'reg 是 Verilog 的变量类型名称，不能只看到 reg 就断言一定生成寄存器；是否有存储取决于赋值过程与完整性。',
 exercise:{task:'已知 Q=0。先把 D 改成 1，但不给时钟边沿，Q 是多少？随后给上升沿，Q 又是多少？',placeholder:'没有边沿：…；上升沿后：…',answer:'没有边沿时 Q 保持 0；上升沿采样后 Q 变成 1（假设复位未有效）。'},
 quiz:{q:'同步复位 rst_n 变为 0，但有效时钟边沿尚未到来，Q 会怎样？',options:['立即清零','持续取反','仍保持原值，等边沿才清零'],correct:2,why:'同步复位也受时钟边沿控制。异步复位才允许在边沿之外触发。'},sources:['logic']
},
{
 id:'module',stage:1,title:'写出第一个 Verilog 模块',minutes:30,
 intro:'模块就是一块有名字、有输入输出、可以连接到其他模块的数字电路。',
 goals:['读懂 module 与端口','使用 assign','建立并行硬件视角'],lab:'gates',
 sections:[
 ['HDL 是硬件描述语言','HDL 全称 Hardware Description Language。Verilog 可以描述电路结构与行为，也可以编写用于测试的代码。初学 RTL（寄存器传输级）时，先问三个问题：输入是什么，输出是什么，是否需要保存状态。'],
 ['模块的骨架','module 后面是模块名，括号里定义端口，endmodule 结束。input 是输入，output 是输出。wire 表示用于连接的网络，assign 持续驱动一个表达式。分号结束声明或语句，不要把模块名和文件名混为一谈。'],
 ['两条 assign 是并行关系','下面两条语句描述同时存在的两组逻辑。不能按 C 语言程序逐行执行的思路理解整个模块。过程块内部有语句顺序，但多个过程、多个连续赋值在仿真中是并发活动的。'],
 ['从可解释的最小电路开始','先用逻辑门和二选一练习端口、连接与位宽，再写寄存器。本课暂时只展示设计模块；第三阶段会加入测试模块，让它在真实仿真器里运行。']
 ],
 code:{name:'first_logic.v',lang:'verilog',text:'module first_logic(\n  input  wire a,\n  input  wire b,\n  output wire both,\n  output wire either\n);\n  assign both   = a & b;\n  assign either = a | b;\nendmodule'},
 trap:'端口名称、大小写和连接位宽要一致。仿真时顶层通常是测试模块，综合时顶层是设计模块。',
 exercise:{task:'写出一个名为 invert 的模块：输入 a、输出 y，y 是 a 的取反。',placeholder:'module invert(…);\n  …\nendmodule',answer:'module invert(input wire a, output wire y);\n  assign y = ~a;\nendmodule'},
 quiz:{q:'两个独立的 assign 语句通常描述什么？',options:['按文件顺序轮流执行的两步软件操作','并行存在的组合逻辑关系','必须由时钟启动的两条指令'],correct:1,why:'连续赋值描述持续有效的逻辑驱动关系，不需要时钟按行执行。'},sources:['yosys','iverilog']
},
{
 id:'width',stage:1,title:'向量、位宽与运算符',minutes:35,
 intro:'很多“代码能跑但结果不对”的错误，来自位宽、截断和有符号属性。',
 goals:['读取位和切片','区分 & 与 &&','显式扩展位宽'],lab:'bits',
 sections:[
 ['把多个位组成向量','wire [7:0] data 表示 8 位网络。data[0] 是最低位，data[7:4] 取高四位。{a,b} 把两段位拼接起来；{4{1\'b0}} 表示重复四次 0。范围 [7:0] 有 8 位，不是 7 位。'],
 ['逐位运算与逻辑运算','若 a=4\'b0101、b=4\'b1010，a & b 逐位计算，结果是 0000；a && b 把两个操作数分别看成真或假，两者都非零，所以结果是一位 1。括号可让运算优先级更清楚，尤其是比较与逻辑运算混用时。'],
 ['无符号与补码','同一串 1111，按 4 位无符号解释是 15，按 4 位二进制补码有符号解释是 -1。4 位有符号范围是 -8～7。无符号扩展通常补 0，有符号扩展需要复制符号位。混合 signed/unsigned 的表达式容易产生非预期转换。'],
 ['把宽度写进设计意图','不要依赖“综合器应该知道我想要什么”。声明输出宽度，给常量明确位宽，必要时先拼接扩展再运算。对溢出、负数和比较边界单独编写测试。']
 ],
 code:{name:'width_examples.v · 模块内片段',lang:'verilog',text:"wire [3:0] a, b;\nwire [4:0] full_sum;\nwire [3:0] low_sum;\nassign full_sum = {1'b0, a} + {1'b0, b};\nassign low_sum  = full_sum[3:0];\n// full_sum[4] 是保留下来的进位"},
 trap:'演示区只按无符号数显示。不要把其中的十进制显示用作 signed 表达式的判定。',
 exercise:{task:'a=4\'b0010、b=4\'b0100 时，写出 a & b、a && b、{a,b} 的结果及位宽。',placeholder:'a & b = …\na && b = …\n{a,b} = …',answer:"a & b = 4'b0000；a && b = 1'b1；{a,b} = 8'b00100100。"},
 quiz:{q:"4'b1111 按 4 位二进制补码有符号数解释，值是多少？",options:['15','-1','-15'],correct:1,why:'最高位权重是 -8，其余权重为 4、2、1，因此 -8+4+2+1=-1。'},sources:['logic','yosys']
},
{
 id:'combinational',stage:1,title:'always 组合逻辑与锁存器',minutes:35,
 intro:'用 if 和 case 表达选择很自然，但必须给每一种输入情况安排输出。',
 goals:['使用 always @(*)','写完整的组合赋值','发现意外锁存器'],lab:'mux',
 sections:[
 ['过程方式描述组合逻辑','复杂选择逻辑可以写在 always @(*) 中。星号表示按过程读取的相关信号建立敏感关系。在经典 Verilog 写法中，过程块赋值的输出声明为 reg；如果所有路径都赋值，它仍然可以综合成纯组合逻辑。'],
 ['先默认赋值，再覆盖','下面先令 y=a，再在 sel=1 时令 y=b。无论 sel 是 0 还是 1，都有确定的赋值。入门阶段，组合块统一使用阻塞赋值 =，保持清晰的计算顺序。'],
 ['漏掉分支为什么会有记忆','若只写 if(sel) y=b，sel=0 时没有新赋值，仿真中 y 会保持旧值。要实现这种行为，综合工具可能推断锁存器。锁存器是电平敏感存储，和上升沿触发器不同。本课程的组合模块不打算使用它。'],
 ['case 也需要检查完整性','每个分支都应给所有组合输出赋值，或者在 case 前设置默认值。加入 default 可以明确未列出的输入行为，但不能拿它掩盖规格中未想清楚的情况。']
 ],
 code:{name:'mux_proc.v',lang:'verilog',text:'module mux_proc(input wire a, b, sel,\n                output reg y);\n  always @(*) begin\n    y = a;\n    if (sel) y = b;\n  end\nendmodule'},
 trap:'“编译没有报错”不代表没有锁存器。要结合行为测试、综合警告和推断出的单元类型检查。',
 exercise:{task:'修复下面这个本来想表示二选一的组合块，使 sel=0 时输出 a：always @(*) begin if(sel) y=b; end',placeholder:'always @(*) begin\n  …\nend',answer:'always @(*) begin\n  y = a;\n  if (sel) y = b;\nend\n也可以显式补上 else y = a;。'},
 quiz:{q:'组合块中，一个输出在某条执行路径没有赋值，最需要警惕什么？',options:['自动变成零','意外推断锁存器','自动加入时钟'],correct:1,why:'没有赋值意味着保留旧值；这种存储行为可能导致锁存器。'},sources:['yosys']
},
{
 id:'sequential',stage:1,title:'时序逻辑与非阻塞赋值',minutes:35,
 intro:'寄存器在同一个时钟边沿采样旧状态，再更新到新状态。',
 goals:['使用 posedge','理解 <= 的采样与更新','辨认两级流水'],lab:'nba',
 sections:[
 ['把“何时更新”写出来','always @(posedge clk) 在 clk 上升沿触发。寄存器更新通常使用非阻塞赋值 <=。它在执行语句时计算右侧，再安排到非阻塞更新阶段写入左侧；不要简单理解成“所有代码没有顺序”。'],
 ['两个寄存器的一拍差','a <= d; b <= a; 表示 a 采样当前 d，b 采样更新前的 a。例如边沿前 a=0、d=1，那么边沿更新后 a=1、b=0。下一个边沿，b 才会得到此前 a 中的 1。'],
 ['为什么不直接换成等号','在同一过程里写 a=d; b=a;，第二句会读取已经更新的 a，行为与上面的两级寄存器不同。入门编码约定是：组合块用 =，时钟触发的寄存器块用 <=；不要在多个过程里驱动同一个寄存器。'],
 ['测试也要考虑更新阶段','如果 testbench 刚在 @(posedge clk) 返回后就读 Q，可能尚未等到非阻塞赋值更新。入门测试可以在明确的 timescale 下延后一个很小的时间再检查；更复杂环境可用 clocking block 等机制管理采样。']
 ],
 code:{name:'pipeline2.v',lang:'verilog',text:"module pipeline2(input wire clk, rst_n, d,\n                 output reg a, b);\n  always @(posedge clk) begin\n    if (!rst_n) begin\n      a <= 1'b0;\n      b <= 1'b0;\n    end else begin\n      a <= d;\n      b <= a;\n    end\n  end\nendmodule"},
 trap:'时钟边沿触发的代码也可能写错。必须分析每个寄存器在边沿前后分别是什么值，而不只是记住“时序用 <=”。',
 exercise:{task:'初始 a=0、b=0，d 在连续三个边沿分别为 1、0、1。逐拍写出 a 和 b 更新后的值。',placeholder:'第 1 拍：a=… b=…\n第 2 拍：…\n第 3 拍：…',answer:'第1拍 a=1、b=0；第2拍 a=0、b=1；第3拍 a=1、b=0。每拍 b 取得边沿之前的 a。'},
 quiz:{q:'边沿前 a=1、b=0、d=0，执行 a<=d; b<=a; 后是什么？',options:['a=0，b=0','a=1，b=1','a=0，b=1'],correct:2,why:'a 取得 d 的 0，b 取得更新前 a 的 1。'},sources:['logic','yosys']
},
{
 id:'counter',stage:1,title:'复位、使能与参数化计数器',minutes:40,
 intro:'这是后续仿真和综合都会使用的同一个设计。先把它的规格写清楚。',
 goals:['写同步低有效复位','用使能保持状态','正确处理回绕'],lab:'counter',
 sections:[
 ['先确定优先级','规格规定：每个上升沿，若 rst_n=0 则清零；否则若 en=1 则加一；否则保持。复位优先于使能。WIDTH 指定位宽，必须是正整数。全 1 加一后回到 0。'],
 ['保持也可以由结构表达','时钟触发块中，en=0 时没有赋新值，寄存器会保持原值。这是有意的寄存器保持行为，和组合块漏赋值推断锁存器的情形不同。无需额外写 count <= count 才能保持。'],
 ['参数在展开时确定','parameter WIDTH=8 允许实例化时选择位宽。WIDTH 不是芯片工作时可以随时变化的输入。修改位宽后，接口、回绕边界、测试预期都要对应修改。'],
 ['先画一段手算轨迹','从复位后的 0 开始，给两拍 en=1、一拍 en=0、一拍 en=1，预期依次是 1、2、2、3。再覆盖全 1 回到 0、暂停期间复位、复位和使能同时有效等边界。']
 ],
 code:{name:'counter.v · 完整设计',lang:'verilog',text:"module counter #(parameter WIDTH = 8) (\n  input wire clk,\n  input wire rst_n,\n  input wire en,\n  output reg [WIDTH-1:0] count\n);\n  always @(posedge clk) begin\n    if (!rst_n)\n      count <= {WIDTH{1'b0}};\n    else if (en)\n      count <= count + 1'b1;\n  end\nendmodule"},
 trap:'这个 rst_n 是同步复位。仅仅在两个边沿之间把它拉低又拉高，可能完全不会被寄存器采到。',
 exercise:{task:'如果 WIDTH=3，当前 count=7，下一拍 rst_n=1、en=1，count 是多少？再写出 rst_n=0、en=1 同时出现时的优先级。',placeholder:'回绕后 …；复位与使能同时有效时 …',answer:'3 位 count 从 7 加一回绕到 0。rst_n=0 时优先复位，即使 en=1 也清零。'},
 quiz:{q:'想让计数器保持当前数值，应该怎样设置控制信号？',options:['rst_n=0，en=0','rst_n=1，en=0','rst_n=1，en=1'],correct:1,why:'复位无效且使能为 0 时，寄存器保持原值。'},sources:['yosys','iverilog']
},
{
 id:'fsm',stage:1,title:'用状态机描述控制流程',minutes:40,
 intro:'状态机把“正在做什么”和“下一步去哪里”写成明确的电路行为。',
 goals:['列出状态与转换','区分当前与下一状态','定义输出与异常状态'],lab:'fsm',
 sections:[
 ['先画规则，再写代码','示例有 IDLE（等待）、RUN（运行）、DONE（完成）三个状态。IDLE 遇到 start=1，下一拍进入 RUN；RUN 遇到 finish=1，下一拍进入 DONE；DONE 在下一拍回到 IDLE。复位回到 IDLE。RUN 期间忽略 start。'],
 ['状态寄存器与下一状态逻辑','state 寄存器保存当前状态。组合块计算 next_state，默认先保持 state，再根据输入覆盖。时钟边沿到来时将 next_state 保存进 state。把两者分开能更清楚地检查存储与组合逻辑。'],
 ['输出属于哪一种关系','下面 busy 只由当前 state 决定，是 Moore 型输出；进入 RUN 后才为 1。如果输出还直接依赖输入，就是 Mealy 型关系。两种都可以使用，关键是把生效时刻写进规格。'],
 ['默认分支的含义','default 让未列出的状态编码回到 IDLE。但这并不自动构成完整的故障安全设计；状态编码、故障模型和综合优化都影响真实异常行为。本课只练习基本状态机。']
 ],
 code:{name:'controller.v',lang:'verilog',text:"module controller(input wire clk, rst_n, start, finish,\n                  output wire busy, done);\n  localparam IDLE=2'd0, RUN=2'd1, DONE=2'd2;\n  reg [1:0] state, next_state;\n  always @(*) begin\n    next_state = state;\n    case (state)\n      IDLE: if (start)  next_state = RUN;\n      RUN:  if (finish) next_state = DONE;\n      DONE: next_state = IDLE;\n      default: next_state = IDLE;\n    endcase\n  end\n  always @(posedge clk) begin\n    if (!rst_n) state <= IDLE;\n    else state <= next_state;\n  end\n  assign busy = (state == RUN);\n  assign done = (state == DONE);\nendmodule"},
 trap:'本课假设 start、finish 已在同一时钟域中满足采样要求。真实按键或异步外设信号还需要同步、消抖等设计。',
 exercise:{task:'从 IDLE 出发，第1拍 start=1；第2拍 finish=0；第3拍 finish=1；第4拍无输入。写出每拍之后的 state、busy、done。',placeholder:'第1拍 …\n第2拍 …\n第3拍 …\n第4拍 …',answer:'第1拍 RUN/1/0；第2拍 RUN/1/0；第3拍 DONE/0/1；第4拍 IDLE/0/0。'},
 quiz:{q:'本例在 RUN 状态，finish 变为 1 但还没到时钟边沿，state 是什么？',options:['立刻变为 DONE','仍是 RUN','立刻变为 IDLE'],correct:1,why:'next_state 可以随组合输入变化，但 state 寄存器要等时钟边沿才更新。'},sources:['logic','yosys']
},
{
 id:'testbench',stage:2,title:'测试台：给电路输入并检查输出',minutes:40,
 intro:'设计模块本身不会主动产生测试信号。testbench 负责搭起它的测试环境。',
 goals:['区分 DUT 与测试台','连接模块实例','创建时钟和激励'],lab:'counter',
 sections:[
 ['两个不同的角色','DUT 是 Design Under Test，即被测设计。testbench 是测试台，它实例化 DUT、驱动输入、计算预期、检查结果并结束仿真。测试台通常没有外部端口，因为它是仿真的顶层。'],
 ['连接时优先写端口名','counter #(.WIDTH(4)) dut(.clk(clk), ...); 表示实例化 4 位 counter。按名字连接比靠端口顺序连接更不容易接错。测试台中的 en、rst_n 用 reg 驱动，count 作为 wire 接收 DUT 输出。'],
 ['时间控制用于仿真','本课程测试台使用 `timescale 1ns/1ps：时间单位是 1 ns，时间精度是 1 ps。always #5 clk=~clk 每 5 ns 翻转一次，因此完整时钟周期是 10 ns。initial 中的 #、$display 和 $finish 用来控制这次仿真实验。'],
 ['设计与测试分开保存','rtl/ 存放设计，tb/ 存放测试。综合时只输入可综合设计文件，不能把产生时钟的 always #5、测试循环和 $finish 当作待制造的电路。某些工具可综合部分 initial 行为，但本课程 ASIC 设计不依赖它。']
 ],
 code:{name:'tb_counter.sv · 基本测试台',lang:'verilog',text:"`timescale 1ns/1ps\nmodule tb_counter;\n  reg clk=0, rst_n=0, en=0;\n  wire [3:0] count;\n  counter #(.WIDTH(4)) dut(\n    .clk(clk), .rst_n(rst_n), .en(en), .count(count)\n  );\n  always #5 clk = ~clk;\n  initial begin\n    repeat (2) @(negedge clk);\n    rst_n=1; en=1;\n    repeat (5) @(negedge clk);\n    $display(\"count=%0d\", count);\n    $finish;\n  end\nendmodule"},
 trap:'testbench 里用了 SystemVerilog 兼容语法与任务的文件采用 .sv，并在命令中明确选择支持模式。不要只改扩展名就假设所有版本支持所有语言特性。',
 exercise:{task:'在 1ns/1ps 下，always #10 clk=~clk 的时钟周期和频率分别是多少？',placeholder:'周期 … ns；频率 … MHz',answer:'每10 ns翻转，完整周期为20 ns；频率为1/(20 ns)=50 MHz。'},
 quiz:{q:'仿真时应选谁做顶层，才能产生测试激励？',options:['counter 设计模块','某个标准单元','tb_counter 测试模块'],correct:2,why:'测试台实例化 counter 并驱动时钟、复位和使能。综合的顶层才是 counter。'},sources:['iverilog','vcs']
},
{
 id:'waveforms',stage:2,title:'读波形、四态与竞态',minutes:35,
 intro:'波形让你看到事情发生的先后，但一条“看起来对”的曲线还不够。',
 goals:['认识 0/1/X/Z','观察边沿前后','避开测试采样竞态'],lab:'counter',
 sections:[
 ['数字仿真有四种逻辑状态','除了 0 和 1，还有 X（未知）和 Z（高阻）。未初始化变量、多个驱动冲突等都可能产生 X；Z 表示高阻，并不等同于逻辑 0。看到 X 要定位来源，不能直接把它改成 0 来获得漂亮波形。'],
 ['沿着因果关系读波形','先看 clk，再看 rst_n、en，最后看 count。明确是在边沿之前还是之后采样。同步复位在边沿上生效，en=0 时 count 保持，en=1 时每个有效边沿加一。优先检查第一次与预期不一致的边沿。'],
 ['避免同时驱动与采样','如果测试台在 posedge clk 上用阻塞赋值修改输入，同时 DUT 也在 posedge 采样，可能出现依赖仿真调度顺序的竞态。本课程在 negedge 驱动输入，在 posedge 后 #1 检查结果；前提是这里明确使用 10 ns 周期与 1 ns 检查延后。'],
 ['记录文件并打开波形','标准 VCD 可以由 $dumpfile、$dumpvars 生成，再用 GTKWave 打开。网页的波形只来自本页教学模型，完整仿真的信号应来自真实仿真器输出的 VCD 文件。']
 ],
 code:{name:'加入测试台的波形记录块',lang:'verilog',text:'initial begin\n  $dumpfile("counter.vcd");\n  $dumpvars(0, tb_counter);\nend\n// 外部查看：gtkwave counter.vcd'},
 trap:'如果比较结果可能包含 X/Z，if (actual != expected) 不一定可靠报错。自检测试会使用 !==，让未知值也能明确触发失败。',
 exercise:{task:'count 从一开始就全是 X。列出三项你会优先检查的内容。',placeholder:'1. …\n2. …\n3. …',answer:'检查时钟是否翻转；复位是否接对、是否在有效边沿被采到；DUT 是否正确实例化及是否存在未驱动/多重驱动。再检查顶层选择与信号路径。'},
 quiz:{q:'在本课程计数器测试中，怎样安排激励和检查更清楚？',options:['下降沿驱动输入，上升沿后稍延时检查','所有输入和输出都在同一上升沿立即读写','只看仿真结束时一个数'],correct:0,why:'驱动与采样分离可避免本例中的竞态，边沿后延时检查还避开非阻塞更新阶段。'},sources:['wave','iverilog']
},
{
 id:'selfcheck',stage:2,title:'自检测试与边界覆盖',minutes:40,
 intro:'让测试告诉你“哪一拍错了”，比每次靠眼睛盯波形更可靠。',
 goals:['建立独立参考结果','自动比较与报错','覆盖复位、暂停、回绕'],lab:'counter',
 sections:[
 ['先写测试计划','把计数器的规格拆成独立条目：初始复位清零；连续使能递增；关闭使能保持；全1回绕；运行中复位；复位和使能同时有效时复位优先。每一项都需要至少一段对应激励。'],
 ['参考模型从规格出发','测试台用整数 expected 保存预期，按规格更新，再限制到 0～2^WIDTH-1。比较使用 !==，如果 count 含 X/Z 也判失败。错误信息写出时间、预期、实际和控制信号，便于复现。'],
 ['检查要发生在正确时刻','下面是每拍检查任务中的核心片段。在下降沿设置 r/e，先计算该拍预期；等下一上升沿后 #1 再比较。本例的 #1 是 testbench 的时间控制，不应搬进 RTL。完整版本在最终项目中下载。'],
 ['测试通过的结论有限','PASS 只能说明这次执行的检查没有发现错误。没有覆盖到的输入序列仍可能有缺陷。初学时先做可解释的定向测试，再逐步学习随机激励、覆盖率和形式验证。']
 ],
 code:{name:'逐拍自检核心片段',lang:'verilog',text:'@(negedge clk);\nrst_n = r; en = e;\nif (!r) expected = 0;\nelse if (e) expected = (expected + 1) % 16;\n@(posedge clk);\n#1;\nif (count !== expected[3:0])\n  $fatal(1, "t=%0t expected=%0d actual=%0d",\n         $time, expected, count);'},
 trap:'测试台如果照抄 DUT 的同一段错误算法，两个错误可能彼此吻合。预期应来自清楚的规格，并包含手工可核对的关键向量。',
 exercise:{task:'现在只有“复位后连续计数5拍”的测试。再写三段最值得增加的激励，并说明想发现什么错误。',placeholder:'激励 …；检查 …',answer:'暂停若干拍，检查en=0是否保持；至少运行到回绕，检查位宽与溢出；在en=1时拉低复位，检查运行中清零与复位优先级。'},
 quiz:{q:'一个测试打印 PASS，能直接证明什么？',options:['所有输入情况都正确','实际执行的检查没有发现错误','芯片的物理时序一定满足要求'],correct:1,why:'未执行的情况仍未验证，RTL功能测试也没有证明物理时序。'},sources:['iverilog','vcs']
},
{
 id:'local-tools',stage:2,title:'在自己的电脑跑第一次仿真',minutes:45,
 intro:'先用开源工具建立真正可重复的仿真流程，再把同一份代码带到 VCS。',
 goals:['区分编译与运行','生成真实 VCD','检查工具安装'],lab:null,
 sections:[
 ['准备三个工具角色','代码编辑器负责写文件；Icarus Verilog 负责 Verilog 编译与仿真；GTKWave 读取波形。已有 VS Code 可以继续用。根据官方安装说明选择系统适用的包；不同系统和安装方式不必强求完全相同。'],
 ['检查终端能否找到命令','运行 iverilog -V、vvp -V、gtkwave --version 查看安装状态。若命令找不到，先排查安装与 PATH；不需要修改课程 RTL 来修复环境问题。Windows 可按官方指引选择合适的安装方式，学校Linux环境则使用已有工具。'],
 ['编译和运行是两步','从项目根目录运行下面的命令。-g2012 选择 SystemVerilog 支持模式，-s 指定测试顶层，-o 指定编译输出。第一条命令成功后才执行 vvp。VVP运行时会执行测试台，生成日志输出与 counter.vcd。'],
 ['没有学校许可也能先学的部分','前面的 RTL 与基础测试可以用 Icarus 完成。它对 SystemVerilog 的支持范围与 VCS 并不相同；复杂验证特性需要根据工具文档确认。本课程的下载项目只使用基础特性。']
 ],
 code:{name:'项目根目录 · 终端命令',lang:'bash',text:'iverilog -g2012 -s tb_counter -o simv_iverilog \\\n  rtl/counter.v tb/tb_counter.sv\nvvp simv_iverilog\ngtkwave counter.vcd'},
 trap:'只有上一条命令成功，才进入下一步。终端显示语法错误时不要继续运行旧的可执行文件，否则可能测试到上一次的设计。',
 exercise:{task:'用最终项目下载包完成一次真实仿真，把工具版本、执行命令和最后的PASS/FAIL行记在这里。暂未安装也可以先保存准备步骤。',placeholder:'工具版本：…\n命令：…\n实际结果：…',answer:'验收应包含：编译退出成功、仿真实际运行、自检PASS行、counter.vcd可打开。若尚未运行，请如实记为待完成，不能用网页演示结果代替。'},
 quiz:{q:'iverilog 编译报错后，最合理的下一步是什么？',options:['直接运行以前的 simv_iverilog','删除测试台所有检查','解决编译错误并重新编译成功'],correct:2,why:'旧的编译输出可能仍然存在，运行它不能验证当前源代码。'},sources:['install','iverilog','wave'],download:true
},
{
 id:'linux-vcs',stage:3,title:'连接学校环境与 Linux 基础',minutes:40,
 intro:'VCS 是真实仿真器，使用它需要学校提供的软件环境与许可。',
 goals:['定位文件与目录','辨认环境问题','保留独立工作目录'],lab:null,
 sections:[
 ['先获得课程规定的访问方式','使用老师提供的实验机、远程桌面或 SSH 入口。主机名、账号、VPN 和环境初始化命令都来自学校。本网站不提供也不需要你的密码或许可文件。浏览器课程不会自动连接学校服务器。'],
 ['文件位置会影响命令','pwd 显示当前目录，ls 显示文件，cd 切换目录，mkdir -p 创建目录。相对路径从当前目录计算。先确认自己位于项目根目录，再用课程脚本，避免把输出写入别人的目录。'],
 ['软件已安装，不代表当前终端可用','command -v vcs 查看能否定位命令；vcs -help 查看当前版本选项。如果找不到，按学校指引加载模块或 source 指定环境脚本。若出现license checkout失败，记录信息联系课程管理员；不要改写代码或许可设置来猜测修复。'],
 ['保留最小可复现信息','记录工具版本、工作目录、完整命令和首个错误。账号、密码、内部许可地址不应贴进公共求助。错误截图不如可复制的相关文本便于定位，但只需要分享必要片段。']
 ],
 code:{name:'学校终端 · 基本检查',lang:'bash',text:'pwd\nls\nmkdir -p work\ncommand -v vcs\nvcs -help\n# 环境加载命令以老师提供的说明为准'},
 trap:'本课的 VCS 和 DC 命令是教学模板，具体版本、路径、授权和实验规范以学校环境为准。',
 exercise:{task:'写出你在学校环境实际确认的：进入项目目录的方法、VCS是否可找到、老师提供的环境加载方式。没有权限时标为待获取。',placeholder:'项目目录：…\nVCS：…\n初始化方式：…（不要记录密码）',answer:'这一题需要你在真实环境核对。command -v vcs能找到程序，且帮助/版本信息可显示，是开始运行项目的准备条件；最终仍需一次实际编译和仿真。'},
 quiz:{q:'出现 license checkout failed 时，应先检查哪个方向？',options:['Verilog 的加法器位宽','授权和环境配置','计数器的使能逻辑'],correct:1,why:'这类错误指向许可获取，首先按学校环境说明和管理员支持处理。'},sources:['vcs']
},
{
 id:'vcs-run',stage:3,title:'VCS 编译、运行与文件列表',minutes:45,
 intro:'更换仿真器时保留同一份设计、同一套检查，这样才能比较结果。',
 goals:['建立 filelist','指定仿真顶层','区分编译与运行日志'],lab:null,
 sections:[
 ['先明确运行位置','下载包中，run_vcs.sh 会进入项目根目录，再在 work/vcs 子目录生成输出。文件列表里的 ../../rtl 等路径按这个工作目录解释。手动运行时也必须保持相同目录，否则会找不到源文件。'],
 ['读懂常用编译选项','-full64 使用64位工具模式，-sverilog 启用SystemVerilog解析，-f 读取文件列表，-top 指定测试顶层，-o 指定仿真程序名，-l 保存编译日志。选项以你安装版本的 vcs -help 为准；这里给出常见命令模板。'],
 ['编译成功后运行 simv','VCS生成的simv是待运行的仿真程序。执行 ./simv -l sim.log 才会推进仿真时间、执行测试并输出结果。compile.log 记录编译阶段，sim.log 记录仿真阶段，两类错误不能混着判断。'],
 ['波形与检查沿用原设计','课程测试台使用标准VCD记录，运行后可用GTKWave或学校规定的波形工具查看。若课程要求FSDB/Verdi，需按学校已配置的记录与调试方式改动；不要照搬不明版本的插件参数。']
 ],
 code:{name:'在 work/vcs 目录执行',lang:'bash',text:'vcs -full64 -sverilog -top tb_counter \\\n  -f ../../filelist.f -o simv -l compile.log\n./simv -l sim.log\n# filelist.f 的内容：\n# ../../rtl/counter.v\n# ../../tb/tb_counter.sv'},
 trap:'不要用网页上的计数器动画冒充 VCS 运行结果。真实验收需要本次源代码对应的编译日志、自检输出与波形文件。',
 exercise:{task:'用同一份counter与testbench跑VCS，记录编译结果、仿真自检行和波形位置，并与Icarus结果比较。',placeholder:'编译：…\n自检：…\n波形：…\n与Icarus比较：…',answer:'应确认两边相同规格和激励下的自检结果一致。若不一致，先查文件是否相同、语言模式、timescale、顶层和竞态，不应直接认定某个工具出错。'},
 quiz:{q:'VCS 编译成功后就已经完成了 testbench 的全部测试吗？',options:['是，编译已经推进全部时钟','否，还需要运行生成的仿真程序','只要生成日志就算完成'],correct:1,why:'编译生成仿真程序，运行 simv 才会执行激励和检查。'},sources:['vcs'],download:true
},
{
 id:'debug',stage:3,title:'排错与回归：定位第一个失败',minutes:40,
 intro:'能独立排查一个失败，比背下十个命令选项更重要。',
 goals:['区分错误发生阶段','缩小最小复现','用脚本保留失败状态'],lab:null,
 sections:[
 ['把错误按阶段归位','找不到命令或许可失败是环境问题；语法、端口、未定义模块通常发生在编译/展开阶段；FAIL、X、超时出现在运行阶段。优先解决日志中的第一个有意义错误，后续很多报错可能只是连锁反应。'],
 ['从第一次分歧向前找原因','如果第18拍count第一次不对，先看第18拍之前的复位和使能，再核对参考值与DUT位宽。只截取能复现的短输入序列。保留原失败用例，再修改设计，最后同时运行旧用例和新增用例。'],
 ['脚本应该遇错就停','Bash脚本中的 set -euo pipefail 让常见命令失败和未定义变量更容易暴露。测试台用 $fatal 明确报错，且应设置仿真超时看门狗。实际工具退出状态与脚本行为仍需在所用环境核对。'],
 ['验证测试本身有用','尝试把参考练习副本中的“加一”故意改成“加二”，检查自检能否失败。再恢复正确设计。如果这种明显的缺陷仍能PASS，说明测试覆盖或连接存在问题。保留干净原件，故障注入只在练习副本进行。']
 ],
 code:{name:'run_vcs.sh · 流程示意',lang:'bash',text:'#!/usr/bin/env bash\nset -euo pipefail\n# 先进入脚本规定的工作目录\nvcs -full64 -sverilog -top tb_counter \\\n  -f ../../filelist.f -o simv -l compile.log\n./simv -l sim.log'},
 trap:'当你修改了RTL或testbench，必须重新编译。只重复运行旧的simv，验证的是旧设计。',
 exercise:{task:'某次修改后终端仍打印PASS，但输出始终和以前一样。写出三项排查步骤。',placeholder:'1. …\n2. …\n3. …',answer:'确认编译成功而非沿用旧程序；确认filelist引用的是刚修改的文件及正确路径；确认仿真顶层和测试确实驱动、观察了该模块；再故意注入错误验证检查器能否发现。'},
 quiz:{q:'修复一个仿真缺陷后，为什么要把原失败用例保留下来？',options:['为了让文件数量增加','防止以后修改重新引入同类错误','因为VCS必须有多个测试文件'],correct:1,why:'保留失败用例形成回归测试，能检查之后的修改是否破坏已有行为。'},sources:['vcs','iverilog']
},
{
 id:'synthesis',stage:4,title:'逻辑综合到底做了什么',minutes:35,
 intro:'DC 把可综合的 RTL 转成电路连接关系，并依据约束和单元库进行优化。',
 goals:['区分仿真与综合','读懂网表的含义','明确流程边界'],lab:null,
 sections:[
 ['综合的输入与输出','主要输入是可综合RTL、顶层模块、目标标准单元库，以及时钟和输入输出等约束。输出包括映射后的网表、约束与报告。网表描述哪些单元通过哪些信号连接，并不是已经完成布线的芯片图。'],
 ['行为需要落到可实现硬件','一个加号可能映射成加法相关组合逻辑，一个posedge寄存器过程可能映射成触发器与输入选择逻辑。常量、不可达逻辑和冗余表达式可能被优化，所以网表不保证逐行对应原代码。'],
 ['仿真回答行为，综合回答实现','RTL自检检查给定激励下功能是否符合规格；综合把设计映射到目标库并优化实现。综合无报错不能证明功能正确，功能仿真通过也不能保证时序满足。两类证据要同时保存。'],
 ['这里的终点在哪里','本课程到基础综合与报告解释。完整芯片还包含物理实现、时钟树、布线、寄生提取、签核、可测性设计等工作。基础综合报告也不能替代布线后的时序签核。']
 ],
 code:{name:'网表结构示意 · 单元名并非真实工艺库',lang:'verilog',text:'// 仅说明“实例 + 连接”的形状\n// 实际单元名称、引脚和数量由目标库与综合决定\nSOME_DFF u_reg (.CLK(clk), .D(next_q), .Q(q));\nSOME_MUX u_sel (.A(q), .B(add_q), .S(en), .Y(next_q));'},
 trap:'这里的示意单元不是可以直接运行的库模型。不要把虚构单元名称当成学校PDK或标准单元库的接口。',
 exercise:{task:'分别列出基础综合所需的三类输入和三类输出，并解释为什么不能只交一张PASS截图。',placeholder:'输入：…\n输出：…\n原因：…',answer:'输入至少含RTL/顶层、目标单元库、时序等约束；输出含网表、约束/设计数据库、检查与面积时序报告。PASS只能反映执行过的功能检查，不能说明映射目标、约束有效性和实现质量。'},
 quiz:{q:'DC 输出的门级网表代表什么？',options:['已经完成制造的芯片','已经完成全部布线与签核','标准单元及其连接关系'],correct:2,why:'网表是逻辑实现的连接描述，后续物理实现与签核仍需要继续。'},sources:['dc','yosys']
},
{
 id:'libraries',stage:4,title:'标准单元库、link 与顶层',minutes:40,
 intro:'综合器必须知道“有哪些元件可用、这些元件多快、多大”。',
 goals:['理解 target_library','理解 link_library','发现悬空引用'],lab:null,
 sections:[
 ['单元库提供什么','标准单元库包含门、触发器等单元的逻辑功能及相关时序、面积、电气模型。不同工艺、工作电压、温度和角落会影响结果。本课使用学校为数字综合提供的.db库，不应随意拿模拟器件模型替代。'],
 ['target 与 link 的分工','target_library 告诉DC可映射到哪些目标单元；link_library帮助解析设计里引用的模块、宏和单元。常见教学设置将目标库放入link库并加上*，用于搜索已加载设计。实际包含宏、IP或多库时需按课程环境配置。'],
 ['顶层是设计边界','elaborate counter 展开设计顶层，current_design counter 选择当前设计，link 解析引用，check_design检查结构。仿真顶层tb_counter绝不能作为这次综合的顶层。参数默认WIDTH=8，因此综合的是8位实例，测试台则用4位方便覆盖回绕。'],
 ['先解决未解析引用','若出现unresolved reference、找不到库或模块，先检查路径、库版本、文件读入和模块名。不要为了让compile继续而把缺失模块随便当作黑盒，除非实验规格明确要求并提供相应模型。']
 ],
 code:{name:'DC / Tcl · 教学设置',lang:'tcl',text:'set_app_var target_library [list $env(STDCELL_DB)]\nset_app_var link_library [concat [list *] $target_library]\nanalyze -format verilog ../../rtl/counter.v\nelaborate counter\ncurrent_design counter\nlink\ncheck_design'},
 trap:'STDCELL_DB必须指向学校允许使用的实际.db文件。此网页和下载包不附带商业工具、PDK或授权单元库。',
 exercise:{task:'记录学校提供的综合库名称/工艺角（只记课程允许分享的信息）、顶层模块、位宽，以及check_design中的未解决警告。',placeholder:'库/工艺角：…\n顶层/位宽：…\n警告：…',answer:'这是实际环境核对题。正确答案应与本次源代码和库配置一致；尚未获得.db库或DC权限时，应记为待完成。'},
 quiz:{q:'这个计数器项目在DC中应展开哪个顶层？',options:['tb_counter','counter','GTKWave'],correct:1,why:'DC综合设计模块counter；tb_counter包含用于仿真的激励与检查。'},sources:['dc']
},
{
 id:'constraints',stage:4,title:'时钟约束与输入输出预算',minutes:45,
 intro:'综合器需要知道目标有多快。约束错误，会让漂亮的报告失去意义。',
 goals:['理解 create_clock','区分 max/min 约束','避免随意屏蔽路径'],lab:'timing',
 sections:[
 ['先给时钟一个周期','在库的时间单位为ns时，create_clock -period 10 表示10 ns周期，即100 MHz。单位应通过report_units核对。时钟约束定义分析目标，不会凭空产生晶振，也不代表工具必然能达到该目标。'],
 ['输入输出有外部时间预算','set_input_delay描述外部电路到本模块输入的到达时间相对时钟的关系；set_output_delay为输出后面的外部路径保留时间。最大值和最小值分别参与不同的时序检查，不能只关注max而忘记min。'],
 ['参数必须有依据','教学模板使用10 ns时钟、1.0/0.2 ns输入延时、1.0/0.2 ns输出延时、0.1 ns不确定性，以及示例输入转换和输出负载。这些是假设，不代表你的板卡或工艺条件。更换库/设计时要核对单位并根据实验规格调整。'],
 ['不要用例外掩盖失败','false_path和multicycle会改变哪些路径如何被检查。仅仅因为负裕量就添加例外，是在改变问题定义。只有有真实时序意图与验证依据时才设置。该项目使用同步复位，复位端口也作为同步输入约束。']
 ],
 code:{name:'constraints.sdc · 单位需与库核对',lang:'tcl',text:'create_clock -name core_clk -period 10 [get_ports clk]\nset_clock_uncertainty 0.1 [get_clocks core_clk]\nset_input_delay -max 1.0 -clock core_clk [get_ports {en rst_n}]\nset_input_delay -min 0.2 -clock core_clk [get_ports {en rst_n}]\nset_output_delay -max 1.0 -clock core_clk [all_outputs]\nset_output_delay -min 0.2 -clock core_clk [all_outputs]\nset_input_transition 0.1 [get_ports {en rst_n}]\nset_clock_transition 0.1 [get_clocks core_clk]\nset_load 0.01 [all_outputs]'},
 trap:'右侧只演示简化的建立时间预算，不是静态时序分析引擎；没有包含时钟偏斜、实际库弧、所有例外和寄生参数。',
 exercise:{task:'若时间单位为ns，目标200 MHz对应的create_clock周期是多少？如果路径失败，为什么不能直接加false_path？',placeholder:'周期 …；不能直接屏蔽的原因 …',answer:'200 MHz对应5 ns。false_path会排除时序检查，不能让实际路径变快；只有规格确认为不需要按该关系检查的路径才能使用相应例外。'},
 quiz:{q:'把时钟周期从10 ns缩短到5 ns，对建立时间目标通常意味着什么？',options:['要求更宽松','要求更严格','自动修好所有违例'],correct:1,why:'可供数据传播的时间变少，目标频率从100 MHz提高到200 MHz，通常更难满足。'},sources:['dc']
},
{
 id:'dc-run',stage:4,title:'运行 DC 与读懂报告',minutes:50,
 intro:'综合完成之后，先看检查与约束，再解释面积和时序。',
 goals:['串起基础 Tcl 流程','读 slack 与面积','保存可复现输出'],lab:'timing',
 sections:[
 ['基本脚本顺序','读库与RTL、展开顶层、link、check_design，然后加载SDC、检查时序约束、compile、生成报告、写出网表和约束。下载包中的dc/run.tcl给出了教学模板，具体支持选项按学校DC版本help/man核对。'],
 ['先检查，再看数字','检查未解析引用、锁存器、多重驱动、没有时钟或未约束路径，以及被优化掉的异常逻辑。check_design和check_timing的输出必须阅读；脚本退出成功不等于所有警告都可以忽略。'],
 ['建立时间裕量怎么读','在一条建立时间路径中，slack = data required time - data arrival time。负值表示到得太晚，正值表示在当前模型和约束下有余量。保持时间检查的关系不同，不要把所有报告都套入这一个公式。'],
 ['面积与性能是有条件的','report_area的面积由库模型定义，不能脱离库单位直接说是芯片面积或晶体管数量。普通逻辑综合的线网与物理估计和布线后实际情况不同；比较两个版本必须使用一致的库、角落和约束。']
 ],
 code:{name:'DC · 综合与输出片段',lang:'tcl',text:'source ../../dc/constraints.sdc\ncheck_timing\ncompile\nreport_area > reports/area.rpt\nreport_timing -delay_type max > reports/setup.rpt\nreport_timing -delay_type min > reports/hold.rpt\nreport_constraint -all_violators > reports/violations.rpt\nwrite -format verilog -hierarchy -output netlist/counter_mapped.v\nwrite_sdc netlist/counter.sdc'},
 trap:'没有实际DC与目标库运行，就不能填写“综合通过”“面积是多少”或“时序已达标”。网站保留的是示例计算与待填写验收项。',
 exercise:{task:'一条建立时间路径required=9.4 ns、arrival=10.1 ns，计算slack并解释；再记录你实际DC报告中的一条路径。',placeholder:'示例 slack = …，含义 …\n真实报告（尚未运行可写待完成）：…',answer:'示例slack=9.4-10.1=-0.7 ns，数据比要求晚到0.7 ns。真实结果必须来自你使用的库、约束和本次综合，不能沿用这个示例数值。'},
 quiz:{q:'建立时间报告中required=8 ns、arrival=9 ns，slack是多少？',options:['+1 ns，满足','-1 ns，违例','17 ns，满足'],correct:1,why:'建立时间slack=required-arrival=8-9=-1 ns，当前模型与约束下存在违例。'},sources:['dc'],download:true
},
{
 id:'post-synthesis',stage:4,title:'综合后的检查与结果比较',minutes:40,
 intro:'网表生成只是一个阶段结果。需要核对功能、约束覆盖和比较条件。',
 goals:['区分RTL与门级仿真','理解等价检查的作用','公平比较两次综合'],lab:null,
 sections:[
 ['门级网表需要匹配的仿真模型','把网表交给仿真器时，还需要库中单元对应的Verilog仿真模型，不能只拿DC使用的.db文件直接代替。模型应由学校提供，并与本次映射使用的库对应。没有这些模型时，先保留任务为待完成。'],
 ['零延时与带延时是不同实验','不回标延时的门级仿真主要检查逻辑连接及部分初始化行为。SDF等延时信息会改变事件发生时间和时序检查，需要按真实流程提供并核对回标覆盖率。RTL中的#1检查策略不能直接当作所有带延时门级测试的正确采样方式。'],
 ['形式等价是另一种证据','形式等价工具在明确的假设和映射关系下比较RTL与综合后网表，而不只是执行几段激励。学习到这里先知道它的作用：基础仿真PASS与综合完成不能代替等价检查。本网站没有运行商业等价工具。'],
 ['比较优化前后的版本','若你改变了编码方式，先证明功能规格仍然相同，再用相同工具版本、库、角落、参数和约束比较面积与时序。面积变小但时序失败，或只约束了一部分路径，都不能直接称为优化成功。']
 ],
 trap:'本课介绍后续检查的边界。入门验收不要求你搭建完整签核流程，但必须如实标记哪些检查尚未执行。',
 exercise:{task:'A版面积更小，但使用了不同单元库、不同的时钟周期。你能否断言A版代码更优？写出需要统一的比较条件。',placeholder:'结论：…\n需要统一：…',answer:'不能直接断言。至少应统一规格、位宽参数、工具版本、库/工艺角、输入输出预算、时钟约束与其他优化设置，并同时检查功能和时序。'},
 quiz:{q:'门级网表引用的标准单元在仿真中无法解析，应该准备什么？',options:['对应的标准单元Verilog仿真模型','任意一份PCB原理图','删掉全部单元实例'],correct:0,why:'仿真器需要能解释单元功能的模型，DC综合用的.db库不能直接充当Verilog仿真模型。'},sources:['dc','vcs']
},
{
 id:'project',stage:5,title:'独立完成计数器项目',minutes:60,
 intro:'先按规格独立写，再使用参考文件对照。把学习变成一套能重跑的结果。',
 goals:['交付 RTL 和自检','跨工具运行同一规格','完成综合记录'],lab:'counter',
 sections:[
 ['项目规格','实现参数化无符号计数器counter，默认WIDTH=8；输入clk、rst_n、en；输出count。使用上升沿触发、低有效同步复位，复位优先于使能。使能时加一，关闭使能时保持，全1后回绕。WIDTH必须为正整数。'],
 ['先独立完成，再看参考','先根据第9课写出RTL与测试计划，不要立即照抄下载包。至少手算一段暂停/复位/回绕序列，再用自检验证。参考包中的4位实例能更快覆盖回绕，综合默认实例是8位。'],
 ['下载包包括什么','rtl/counter.v是参考设计，tb/tb_counter.sv是完整自检，run_iverilog.sh与run_vcs.sh分别负责两种仿真流程。dc/含库配置检查、约束与基础综合模板。README写明操作目录、前提、结果位置和未经商业工具验证的部分。'],
 ['没有学校环境时如何推进','先完成开源仿真和源码练习，保存真实结果；VCS和DC任务保留为待完成。可以额外用Yosys理解通用综合过程，但它不能替代学校要求的DC运行证据，也不能提供同一商业库条件下的等价PPA结论。']
 ],
 code:{name:'在解压后的项目根目录',lang:'bash',text:'bash run_iverilog.sh\n# 学校VCS环境：\nbash run_vcs.sh\n# 学校DC环境，先按README配置实际库与单位：\nbash run_dc.sh'},
 trap:'参考包用于学习与核对。你应能解释每个寄存器、每类测试和每条关键约束；如果只能运行脚本，先返回对应课程补齐理解。',
 exercise:{task:'为这个项目写一份自己的测试计划：至少六项，每项都给出激励与预期，不要只写“测试复位”“测试计数”。',placeholder:'1. 激励 …；预期 …\n2. …',answer:'至少覆盖初始清零、连续计数、en=0保持、最大值回绕、运行中同步复位、复位与使能同时有效时清零。每项应注明边沿和预期值，并验证自检能捕捉一次故意注入的错误。'},
 quiz:{q:'为什么测试中用4位计数器，而参考综合默认8位，也可以合理？',options:['因为位宽不影响行为','为了较快覆盖回绕，同时明确验证与综合各自的参数','因为DC不支持4位'],correct:1,why:'参数化设计可用不同位宽，但必须明确记录，并补充关键参数配置的检查，不能混淆两者的边界值。'},sources:['iverilog','vcs','dc'],download:true
},
{
 id:'acceptance',stage:5,title:'验收：你真的走通流程了吗',minutes:40,
 intro:'完成课程是起点。用实际证据检查自己能否独立完成设计、测试和综合。',
 goals:['区分已读与已实操','整理验收证据','确定下一步方向'],lab:null,
 sections:[
 ['先口头解释，再展示结果','不看参考，你应能说明同步复位与异步复位的差异、<=与=的关键区别、组合漏赋值为什么可能有锁存器，以及VCS和DC分别解决什么问题。解释不清楚的部分先返回对应课。'],
 ['验收必须可重现','交付规格、RTL、testbench、工具版本、运行脚本、库/约束配置说明、实际日志、波形与综合报告。由同学按README在同一授权环境重跑，是很好的检查方式。不要把商业库或授权文件打包传播。'],
 ['识别仍然没有验证的内容','这套入门项目没有证明完整芯片可靠性。形式等价、复杂覆盖率、跨时钟域、DFT、低功耗、物理设计和签核都是后续主题。即便本项目通过，也只能对记录的环境、参数和检查范围下结论。'],
 ['下一步根据课程选择','偏数字前端：增加FIFO、UART控制器、握手协议与更系统的测试；偏验证：逐步学习SystemVerilog断言、覆盖率与验证方法；偏模拟：回到MOS电路与Virtuoso。先完成一个能解释的小项目，再扩展工具数量。']
 ],
 trap:'页面上的“课程完成”由知识检查与个人记录组成，不是商业工具认证。下方实操验收项只由你依据真实结果确认。',
 exercise:{task:'写一段项目复盘：你发现过的一个真实问题、如何定位、怎样修复、增加了什么检查，以及还有哪些任务待完成。',placeholder:'问题：…\n定位：…\n修复：…\n新增检查：…\n待完成：…',answer:'一份合格复盘应能追溯到具体代码、输入条件和观察结果。若尚无真实运行或失败案例，请保留待完成，不编造经历。'},
 quiz:{q:'以下哪一组证据最能支持“完成基础综合”这一结论？',options:['网页动画和一张课程完成截图','实际RTL、库/约束说明、DC日志、网表及检查/时序/面积报告','只要没有语法错误'],correct:1,why:'综合结果依赖RTL、目标库和约束；日志、网表和报告使结论可检查、可复现。'},sources:['dc','vcs'],download:true,checklist:true
}
];
window.IC_COURSE = {SOURCES,STAGES,LESSONS};
