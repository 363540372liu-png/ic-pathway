window.HDL_LESSONS=[
 {
  "id": "orientation",
  "title": "怎么学：先认识电路，再认识语言",
  "concept": [
   "这条路线默认你没有写过HDL。先用0和1表达输入输出，再用Verilog描述电路，最后用SystemVerilog把设计意图写清楚。HDL是Hardware Description Language（硬件描述语言）；输入是送进电路的信号，输出是电路给出的结果。",
   "一课分四步：读概念、对照代码、先预测再核对、独立写一遍。第一次先理解代码在描述什么，不必立刻记住所有符号。碰到不认识的词，看本课词条或点前置课。",
   "核心主线先掌握组合与寄存器，再完成SystemVerilog、自检、同步时序及工程项目。高级随机验证、SVA扩展和UVM地图是选修。完成记录表示学习自评；实际工具结果要另行保留。"
  ],
  "code": "// 先用一句规格描述电路：\n// 输入：开关 a、开关 b\n// 规则：两个开关都打开，灯才亮\n// 输出：灯 y（0=灭，1=亮）",
  "notes": [
   "//后是注释，用来解释意图，不产生电路。",
   "先定义输入、规则和输出，下一课认识0和1，再学怎样写成语法。"
  ],
  "trap": "别急着把后面的工程工具一次装完。先按路径学，工具起步课只需验证编译器可用。",
  "q": "第一次看一段HDL，先问什么？",
  "options": [
   "输入、输出和行为是什么",
   "用了多少行代码",
   "能否立即上板"
  ],
  "correct": 0,
  "answer": "先明确电路应做什么，才有办法检查代码是否正确。",
  "task": "用输入、规则、输出三句话描述一个走廊灯。",
  "solution": "例如输入是门口开关a和楼梯口开关b；任一开关打开则灯亮；输出y表示亮灭。这是或逻辑的一个约定。",
  "stage": 0,
  "optional": false,
  "prerequisites": [],
  "goals": [
   "知道输入、规则、输出是什么",
   "知道每课怎样学，核心主线在哪里结束"
  ],
  "terms": [
   [
    "HDL",
    "硬件描述语言，用文字描述数字电路结构和行为。"
   ],
   [
    "RTL",
    "寄存器传输级，描述寄存器之间的数据计算和更新。"
   ]
  ],
  "minutes": 30,
  "context": "先读自然语言规格；这段是注释，不要求编译。",
  "knowledge": [
   {
    "id": "concept",
    "title": "知道输入、规则、输出是什么"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "numbers",
  "stage": 0,
  "title": "bit、二进制与常量写法",
  "concept": [
   "1 bit 只有 0/1 两种取值，4 bit 有16种组合。无符号的 4 位数字表示0～15。二进制从右到左的权重是1、2、4、8；1010=8+2=10。",
   "Verilog 常量采用 位宽'进制数值：b二进制、d十进制、h十六进制。下划线只帮助阅读；定宽常量让你明确每个信号装得下多少位。"
  ],
  "code": "module number_demo(output wire [3:0] a);\n assign a = 4'b1010;\n // 同一个值也可写 4'd10 或 4'hA\nendmodule",
  "notes": [
   "[3:0] 包含编号3、2、1、0，共4位，左边是最高位。",
   "4 是位数，不是数值；b 后的1010才是数值。",
   "十六进制一位对应4 bit：A对应1010。",
   "有限位宽会截断高位，不会自动扩展存储空间。"
  ],
  "trap": "不要用“有16种组合”推出最大值16；0也占一种。",
  "q": "5 位无符号数最大是多少？",
  "options": [
   "16",
   "31",
   "32"
  ],
  "correct": 1,
  "answer": "2⁵种组合从0数起，最大为31。",
  "task": "写出13的4位二进制和十六进制常量。",
  "solution": "4'b1101 和 4'hD；8+4+1=13。",
  "diagram": null,
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "optional": false,
  "prerequisites": [
   "orientation"
  ],
  "goals": [
   "读懂定宽二/十/十六进制常量",
   "手算位权、最大值与截断"
  ],
  "terms": [
   [
    "bit",
    "一位二进制信息，逻辑上有0和1两种取值。"
   ],
   [
    "向量",
    "按位编号的一组信号，例如[7:0]是8位。"
   ]
  ],
  "minutes": 30,
  "trace": {
   "heads": [
    "写法",
    "展开",
    "十进制"
   ],
   "rows": [
    [
     "4'b1101",
     "1×8 + 1×4 + 0×2 + 1×1",
     "13"
    ],
    [
     "4'hD",
     "十六进制D对应二进制1101",
     "13"
    ]
   ]
  },
  "knowledge": [
   {
    "id": "concept",
    "title": "读懂定宽二/十/十六进制常量"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "logic-gates",
  "title": "与、或、非、异或：先画真值表",
  "concept": [
   "逻辑门把输入位变成输出位。AND（与）要求输入都为1；OR（或）只要至少一个为1；NOT（非）把0变1、1变0；XOR（异或）在两个输入不同时为1。",
   "两个单比特输入有00、01、10、11四种组合。把每组输入和对应输出列出来就是“真值表”。用它先验证规则，再写代码，能避免只试一个输入就误以为设计正确。"
  ],
  "code": "// a b | 与 AND | 或 OR | 异或 XOR\n// 0 0 |   0    |  0    |    0\n// 0 1 |   0    |  1    |    1\n// 1 0 |   0    |  1    |    1\n// 1 1 |   1    |  1    |    0\n// Verilog对应符号：&、|、^；单比特取反用 ~",
  "notes": [
   "每一行是一组同时存在的输入，不是四个时钟周期。",
   "两个输入各有两种可能，一共2×2=4行。",
   "OR与XOR在11这行不同；NOT只需要一个输入。"
  ],
  "trap": "本课只讨论单比特；多位信号的逐位与和逻辑与会在运算符课区分。",
  "q": "a=1、b=1，异或结果？",
  "options": [
   "0",
   "1",
   "2"
  ],
  "correct": 0,
  "answer": "两个输入相同，异或为0。",
  "task": "画出一个输入a的取反真值表。",
  "solution": "a=0时~a=1；a=1时~a=0。单比特只有这两种情况。",
  "diagram": "gates",
  "stage": 0,
  "optional": false,
  "prerequisites": [
   "numbers"
  ],
  "goals": [
   "列全两个输入的四种组合",
   "区分与、或、非和异或"
  ],
  "terms": [
   [
    "bit",
    "一位二进制信息，逻辑上有0和1两种取值。"
   ],
   [
    "组合逻辑",
    "在理想功能模型中，输出由当前输入决定。"
   ]
  ],
  "minutes": 30,
  "trace": {
   "heads": [
    "a",
    "b",
    "a & b",
    "a | b",
    "a ^ b"
   ],
   "rows": [
    [
     "0",
     "0",
     "0",
     "0",
     "0"
    ],
    [
     "0",
     "1",
     "0",
     "1",
     "1"
    ],
    [
     "1",
     "0",
     "0",
     "1",
     "1"
    ],
    [
     "1",
     "1",
     "1",
     "1",
     "0"
    ]
   ]
  },
  "context": "这是文字真值表；目前先手算，不要求运行工具。",
  "knowledge": [
   {
    "id": "concept",
    "title": "列全两个输入的四种组合"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "boolean-decoder",
  "title": "布尔代数与译码器：从真值表得到电路",
  "stage": 0,
  "prerequisites": [
   "logic-gates"
  ],
  "code": "module decode2(input wire [1:0] a,input wire en,output wire [3:0] y);\n assign y[0]=en & ~a[1] & ~a[0];\n assign y[1]=en & ~a[1] &  a[0];\n assign y[2]=en &  a[1] & ~a[0];\n assign y[3]=en &  a[1] &  a[0];\nendmodule",
  "concept": [
   "真值表逐行规定输入和输出，布尔式把使输出为1的条件合起来。两个输入有四种组合，译码器把编号转换成独热选择。",
   "布尔代数用于证明不同表达式的功能相同，再讨论门数与延迟。德摩根律把与的取反变成各输入取反的或。"
  ],
  "notes": [
   "~是逐位取反，&是逐位与，单比特控制用en门控。",
   "a从00到11时只有对应y位为1；en=0时全部为0。"
  ],
  "trap": "先明确规格、输入边界和验证依据；不要把网页模型的通过当作实际RTL仿真通过。",
  "goals": [
   "从真值表写出译码器",
   "用德摩根律验证等价表达式"
  ],
  "q": "完成本课后，什么证据最能支持设计符合规格？",
  "options": [
   "完整规格、边界测试和可复现的工具结果",
   "只看代码长度",
   "只看波形颜色"
  ],
  "correct": 0,
  "answer": "按规格逐项检查，记录输入、预期和实际结果；一次正常案例不足以证明所有边界。",
  "task": "按本课练习阶梯实现并记录边界条件。",
  "solution": "先独立完成阶梯中的设计，再逐项对照参考实现和验收条件。",
  "terms": [
   [
    "规格",
    "约定输入、输出、时钟、复位和边界行为。"
   ]
  ],
  "context": "完整模块，保存为.v；测试平台与工具命令另外提供。",
  "minutes": 30,
  "optional": false,
  "language": "verilog",
  "knowledge": [
   {
    "id": "concept",
    "title": "真值表逐行规定输入和输出，布尔式把使输出为1的条件合起来"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "mindset",
  "stage": 0,
  "title": "先懂电路，再读代码",
  "concept": [
   "Verilog用代码描述同时存在的电路。下面两条assign分别描述与门、或门的连接，不是CPU先算第一条再算第二条。读懂电路规则后，再到下一课逐项学module、端口和实例连接。",
   "组合逻辑像计算器：当前输入决定输出。时序逻辑像带记忆的计数器：还要用到上一拍的状态。真实组合电路有传播延迟；网页中用理想模型帮助理解。",
   "这一课的代码先当作电路图的文字版本：a、b是输入，y、z是输出；assign表示持续连接一个计算关系。module和wire下一课正式拆解，暂不要求独立写出。"
  ],
  "code": "module gates(input wire a, b,\n             output wire y, z);\n  assign y = a & b;\n  assign z = a | b;\nendmodule",
  "notes": [
   "module 开始定义电路模块，gates 是自己取的名字。",
   "input/output 定义从外部观察的方向，wire 是连接信号的网络。",
   "& 是逐位与，| 是逐位或；两条 assign 并行、持续地驱动输出。",
   "endmodule 结束模块；语句用分号结束。"
  ],
  "trap": "不要把 HDL 当作普通程序从第一行一直运行到最后一行。",
  "q": "a=b=1 时，y 和 z 是多少？",
  "options": [
   "y=1,z=1",
   "y=0,z=1",
   "先 y 后 z 才有结果"
  ],
  "correct": 0,
  "answer": "与门和或门同时存在，输入均为1时输出均为1。",
  "task": "画出 a、b 到两个输出的连线，说明是否需要时钟。",
  "solution": "a、b 同时连接到与门和或门；输出分别是 y、z。没有保存状态，不需要时钟。",
  "diagram": "gates",
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "optional": false,
  "prerequisites": [
   "logic-gates"
  ],
  "goals": [
   "把两条assign理解成并行电路",
   "区分组合关系和保存状态"
  ],
  "terms": [
   [
    "HDL",
    "硬件描述语言，用文字描述数字电路结构和行为。"
   ],
   [
    "RTL",
    "寄存器传输级，描述寄存器之间的数据计算和更新。"
   ],
   [
    "组合逻辑",
    "在理想功能模型中，输出由当前输入决定。"
   ]
  ],
  "minutes": 30,
  "knowledge": [
   {
    "id": "concept",
    "title": "把两条assign理解成并行电路"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "storage",
  "title": "电平与边沿：锁存器、触发器、寄存器",
  "concept": [
   "门电路和MUX只根据当前输入计算；要保存过去的值，需要存储元件。锁存器在使能电平有效时透明，输入变化能传到输出；使能无效时保存。D触发器只在规定边沿采样，其余时间保持。",
   "寄存器是一组一起保存数据的触发器。一个8位寄存器需要保存8个位，不是“一个软件变量放在CPU内存”。代码类型名reg并不决定是不是寄存器：要看赋值触发条件以及是否要求保留历史。这里先读图和规则，时序代码稍后逐行解释。"
  ],
  "code": "// 不需编译的电路规格\n// 组合MUX：en=1选d，否则选固定0\n// 锁存器：en=1跟随d，否则保存上次值\n// DFF：仅在clk上升沿保存d\n// 8位寄存器：8份DFF，共用时钟",
  "notes": [
   "先判断有没有“保持过去”的要求。",
   "锁存器看电平窗口，DFF看瞬时边沿。",
   "DFF高电平阶段不持续透明。"
  ],
  "trap": "不要把“reg声明”和“寄存器硬件”画等号。",
  "q": "clk保持1，D改变，上升沿DFF会持续跟随吗？",
  "options": [
   "会",
   "不会",
   "一定变X"
  ],
  "correct": 1,
  "answer": "没有新的有效边沿，输出保持。",
  "task": "比较锁存器与DFF采样的时间条件。",
  "solution": "锁存器在有效电平窗口透明；上升沿DFF仅在0→1的边沿采样。",
  "prerequisites": [
   "mindset"
  ],
  "stage": 0,
  "optional": false,
  "goals": [
   "比较锁存器与DFF采样的时间条件。",
   "先判断有没有“保持过去”的要求。"
  ],
  "terms": [
   [
    "RTL",
    "寄存器传输级；描述组合逻辑与寄存器在时钟沿的更新。"
   ]
  ],
  "minutes": 30,
  "context": "完整单文件教学示例；代码的文件边界及测试用途见讲解。",
  "knowledge": [
   {
    "id": "concept",
    "title": "比较锁存器与DFF采样的时间条件。"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "module",
  "stage": 1,
  "title": "模块、端口与实例连接",
  "concept": [
   "模块是一块可复用电路的边界，端口是它与外部的连接。输入只读进来，输出送出去。命名区分大小写；注释 // 到行尾，/* */ 可以跨行。",
   "定义模块不等于把它接进顶层。实例化创建并连接一个子电路；命名端口 .a(x) 表示子模块的a口接当前层的x信号。"
  ],
  "code": "module and2(input wire a, b, output wire y);\n  assign y = a & b;\nendmodule\nmodule top(input wire x, z, output wire result);\n  and2 u_and(.a(x), .b(z), .y(result));\nendmodule",
  "notes": [
   "and2 是模块类型，u_and 是这一次实例的名字。",
   ".a 是子模块端口名，括号里的 x 是本层信号。",
   "两个模块同时存在，不是调用函数后再返回。",
   "一个模块可实例化多次，每个实例是独立的硬件。"
  ],
  "trap": "按位置连接容易接反；入门阶段优先命名连接。",
  "q": " .a(x) 中哪个是子模块端口？",
  "options": [
   "a",
   "x",
   "u_and"
  ],
  "correct": 0,
  "answer": "点号后是被实例化模块的端口名。",
  "task": "再实例化一个 and2，输入仍为x和z，输出接第二个输出other。",
  "solution": "先在top端口声明output wire other；再写 and2 u_other(.a(x), .b(z), .y(other));",
  "diagram": null,
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "optional": false,
  "prerequisites": [
   "mindset"
  ],
  "goals": [
   "区分模块类型与实例名",
   "用命名端口正确连线"
  ],
  "terms": [
   [
    "端口",
    "模块与外部连接的信号入口或出口。"
   ],
   [
    "实例",
    "在当前设计中创建并连接的一份子模块电路。"
   ]
  ],
  "minutes": 30,
  "knowledge": [
   {
    "id": "concept",
    "title": "区分模块类型与实例名"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "tool-start",
  "title": "准备工具：先完成一次语法编译",
  "concept": [
   "这一课先确认工具能识别Verilog，不要求你已经会写测试台。需要的免费工具是Icarus Verilog，命令名iverilog；后续用vvp运行仿真，用GTKWave看波形。学校已有VCS环境也可以继续用，基础课不依赖商业工具。",
   "从Icarus官方安装文档选择操作系统。Windows使用官方文档指向的发行渠道并确认bin目录在PATH中；Linux使用发行版软件包；macOS可用包管理器。装好后重新打开终端，输入iverilog -V查看版本。网站不提供安装程序。",
   "把上一课完整的and2模块保存为and2.v；编辑器选纯文本，确认不是and2.v.txt。打开该文件所在目录的终端，再运行下面命令。-tnull只做编译检查，不生成要运行的仿真程序；没有错误退出只代表语法和展开通过，不代表功能正确。"
  ],
  "code": "# 以下在终端执行，不要粘进 .v 文件\niverilog -V\niverilog -g2005 -s and2 -tnull and2.v\n# -g2005：Verilog语言模式\n# -s and2：选择顶层模块\n# -tnull：只检查，不输出仿真程序",
  "notes": [
   "文件夹路径里有空格时，在终端给文件路径加引号。",
   "出现command not found或“不是内部或外部命令”：先检查安装与PATH，重新打开终端。",
   "出现Unable to find root module：检查-s后模块名是否与module声明一致。",
   "通过编译后先继续语言课；到测试台课才运行激励和检查输出。"
  ],
  "trap": "语法编译不检查真值表。想知道电路算得对不对，还要用测试输入、自检和波形。",
  "q": "这一步编译通过说明什么？",
  "options": [
   "所有功能正确",
   "语法与展开检查通过",
   "已经完成综合"
  ],
  "correct": 1,
  "answer": "编译器能理解代码，不等于每个输入情况下的功能都符合规格。",
  "task": "记录你的系统、版本和第一条编译结果；还没安装时写下待办。",
  "solution": "记录示例：Windows；iverilog版本xx；and2.v编译无错误。未安装也可以继续阅读，但后续实操验收需真正运行。",
  "language": "terminal",
  "stage": 1,
  "optional": false,
  "prerequisites": [
   "module"
  ],
  "goals": [
   "找到工具版本信息",
   "完成一次语法编译并区分功能验证"
  ],
  "terms": [
   [
    "DUT",
    "Design Under Test，被测试的设计模块。"
   ],
   [
    "测试台",
    "仿真环境，产生激励并检查设计输出。"
   ]
  ],
  "minutes": 30,
  "context": "这是讲解用代码片段，不是独立模块；按本课说明放入已有模块或测试台，再补齐接口声明。",
  "knowledge": [
   {
    "id": "concept",
    "title": "找到工具版本信息"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "net-var",
  "stage": 1,
  "title": "wire、reg 与 assign",
  "concept": [
   "wire 是网络，由连续赋值或模块输出等驱动。reg 是 Verilog 过程赋值使用的变量类型；reg这个名字不保证电路一定是寄存器。",
   "assign 是连续赋值：右边相关输入变化时，输出随表达式更新。always 过程中的赋值需要变量；生成组合电路还是存储电路，要看触发条件和分支是否完整。"
  ],
  "code": "module gate_styles(input wire a,b,\n output wire y1, output reg y2);\n assign y1 = a & b;\n always @(*) begin\n  y2 = a & b;\n end\nendmodule",
  "notes": [
   "wire y1 由 assign 持续驱动。",
   "reg y2 可以在过程块内赋值。",
   "@(*) 自动对所读取的相关信号变化作出响应。",
   "两种写法在这个完整单驱动例子里都描述与门。"
  ],
  "trap": "不能在Verilog的过程块里直接对wire做普通过程赋值。",
  "q": "这里 y2 是触发器吗？",
  "options": [
   "是，因为叫reg",
   "不是，这里是组合与门",
   "一定是锁存器"
  ],
  "correct": 1,
  "answer": "没有边沿触发，且所有路径都赋值，是组合逻辑。",
  "task": "把与门改成或门，分别用assign和always写。",
  "solution": "assign y1 = a | b;\nalways @(*) begin y2 = a | b; end",
  "diagram": null,
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "optional": false,
  "prerequisites": [
   "module"
  ],
  "goals": [
   "知道连续赋值和过程赋值用在哪里",
   "解释reg不一定产生寄存器"
  ],
  "terms": [
   [
    "wire",
    "Verilog网络，由驱动源决定值，常用于连线。"
   ],
   [
    "reg",
    "Verilog过程变量类型；是否形成存储由赋值行为决定。"
   ]
  ],
  "minutes": 30,
  "knowledge": [
   {
    "id": "concept",
    "title": "知道连续赋值和过程赋值用在哪里"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "vectors",
  "stage": 1,
  "title": "向量、位选、切片与拼接",
  "concept": [
   "总线是一组位；[7:0]是8位，bus[0]取最低位，bus[7:4]取高4位。位号不是十进制数位。",
   "拼接 {a,b} 把a放高位、b放低位。复制 {4{bit}} 重复一个表达式4次。拼接不会执行加法，必须先算清每个部分的位宽。"
  ],
  "code": "module slices(output wire low,\n output wire [3:0] hi,ones, output wire [7:0] swap);\n wire [7:0] bus;\n assign bus = 8'hA5;\n assign low = bus[0];\n assign hi = bus[7:4];\n assign swap = {bus[3:0],bus[7:4]};\n assign ones = {4{1'b1}};\nendmodule",
  "notes": [
   "A5对应1010_0101，因此bus[0]=1。",
   "hi得到1010，即十进制10。",
   "两个4位片段拼成8位，swap=5A。",
   "双层花括号是复制写法，ones=1111。"
  ],
  "trap": "[7:4] 取4位，不能误认为7减4只取3位。",
  "q": "swap 是多少？",
  "options": [
   "8'hA5",
   "8'h5A",
   "8'h0F"
  ],
  "correct": 1,
  "answer": "低半字节放到高位，高半字节放到低位。",
  "task": "将一个4位无符号数a零扩展为8位。",
  "solution": "wire [7:0] wide = {4'b0000, a};",
  "diagram": null,
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "optional": false,
  "prerequisites": [
   "numbers",
   "net-var"
  ],
  "goals": [
   "计算位宽并做位选/切片",
   "用拼接和复制构造新向量"
  ],
  "terms": [
   [
    "向量",
    "按位编号的一组信号，例如[7:0]是8位。"
   ],
   [
    "bit",
    "一位二进制信息，逻辑上有0和1两种取值。"
   ]
  ],
  "minutes": 30,
  "trace": {
   "heads": [
    "表达式",
    "位宽",
    "结果（bus=A5）"
   ],
   "rows": [
    [
     "bus[0]",
     "1",
     "1"
    ],
    [
     "bus[7:4]",
     "4",
     "1010"
    ],
    [
     "{bus[3:0],bus[7:4]}",
     "8",
     "0101_1010"
    ]
   ]
  },
  "knowledge": [
   {
    "id": "concept",
    "title": "计算位宽并做位选/切片"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "four-state",
  "stage": 1,
  "title": "0、1、X、Z 与初始化",
  "concept": [
   "仿真中的 wire/reg 可以有4种状态：0、1、X未知、Z高阻。X常表示未初始化、冲突或未知传播；Z表示没有主动驱动，不等于逻辑0。",
   "寄存器在仿真开始时可能是X。复位是规定起点的电路行为，给波形中的X随便填0不能证明设计正确。芯片与FPGA的上电行为取决于器件和实现。"
  ],
  "code": "module unknown_demo(output wire undriven);\n reg q; // 尚未给初值的过程变量\n // undriven没有驱动源，四态仿真通常为Z\n // q尚未赋值，四态仿真通常为X\nendmodule",
  "notes": [
   "reg q声明过程变量，这里尚未赋值，四态仿真通常为X。",
   "undriven是没有驱动源的wire输出，通常为Z。",
   "本例只观察声明与默认状态，测试台和打印语句在仿真阶段再学。",
   "X与Z是仿真状态标记，不能简单翻译成某个固定电压。"
  ],
  "trap": "不要把 X 当作“随便取0或1都正确”；综合中的无关项与仿真未知值用途不同。",
  "q": "未初始化 reg 在四态仿真中通常是？",
  "options": [
   "0",
   "X",
   "Z"
  ],
  "correct": 1,
  "answer": "reg 变量默认未知；未驱动网络通常是Z。",
  "task": "解释为何计数器没有复位时可能一直是X。",
  "solution": "X+1仍然是未知；必须通过明确的初始化/复位与目标实现约定建立起点。",
  "diagram": null,
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "optional": false,
  "prerequisites": [
   "net-var"
  ],
  "goals": [
   "解释X和Z的常见来源",
   "知道未知值不能随意当作0"
  ],
  "terms": [
   [
    "X",
    "仿真未知值，常见于未初始化、冲突或未知传播。"
   ],
   [
    "Z",
    "高阻状态，常见于网络没有主动驱动。"
   ]
  ],
  "minutes": 30,
  "knowledge": [
   {
    "id": "concept",
    "title": "解释X和Z的常见来源"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "operators",
  "stage": 1,
  "title": "算术、位运算、逻辑与比较",
  "concept": [
   "&、|、^、~按位运算，每一位分别处理。&&、||、!把整个操作数看作真假，非零为真，结果为单个位。归约 &a 只有一个操作数，把所有位相与。",
   "== 比较数值，遇X可能产生X；===连X/Z也逐位比较，总返回0或1，常用于测试台。移位<<右侧补零；>>补零；>>>只有左操作数是有符号类型时才作符号扩展。"
  ],
  "code": "module choose_max(input wire [3:0] a,b,\n output wire [3:0] y);\n // a=1010,b=0101时：\n // a&b=0000，a&&b=1，&a=0\n assign y = (a > b) ? a : b;\nendmodule",
  "notes": [
   "逐位与对齐每一个bit；逻辑与只问两边是否非零。",
   "归约与要求a的每一位都为1才得到1。",
   "三元表达式 条件?真分支:假分支 在这里描述选择器。",
   "复杂条件主动加括号，避免依赖你尚未记牢的运算符优先级。"
  ],
  "trap": "位运算和逻辑运算位宽不同；不要用&&替换多位数据通路里的&。",
  "q": "a=1010、b=0101，a&&b是多少？",
  "options": [
   "0000",
   "1",
   "1010"
  ],
  "correct": 1,
  "answer": "两个向量都非零，逻辑与为真。",
  "task": "计算 a|b、a^b、!a，并注明位宽。",
  "solution": "a|b=4位1111；a^b=4位1111；!a=1位0。",
  "diagram": null,
  "context": "完整模块示例，接口声明已补齐；保存为.v，仿真时用测试台提供输入。",
  "optional": false,
  "prerequisites": [
   "logic-gates",
   "vectors",
   "four-state"
  ],
  "goals": [
   "区分按位、逻辑与归约",
   "根据类型解释比较和移位"
  ],
  "terms": [
   [
    "向量",
    "按位编号的一组信号，例如[7:0]是8位。"
   ],
   [
    "X",
    "仿真未知值，常见于未初始化、冲突或未知传播。"
   ]
  ],
  "minutes": 30,
  "trace": {
   "heads": [
    "表达式",
    "计算方式",
    "a=1010,b=0101"
   ],
   "rows": [
    [
     "a & b",
     "逐位与",
     "4位0000"
    ],
    [
     "a && b",
     "两者都非零？",
     "1位1"
    ],
    [
     "&a",
     "a所有位都为1？",
     "1位0"
    ]
   ]
  },
  "knowledge": [
   {
    "id": "concept",
    "title": "区分按位、逻辑与归约"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "width-sign",
  "stage": 1,
  "title": "位宽、截断与补码",
  "concept": [
   "4位无符号数范围0～15；4位二进制补码范围−8～7。位串1111是15还是−1，取决于解释它的类型，不是写法本身。补码的−1所有位都为1。",
   "加法先明确计算宽度和接收宽度。最稳妥的入门方式是把操作数显式扩展，再存入足够宽的结果；缩窄时高位会丢失。有符号和无符号混算会改变扩展/比较规则。"
  ],
  "code": "module extend_demo(input wire [3:0] a,b,\n input wire signed [3:0] s,\n output wire [4:0] sum,\n output wire signed [7:0] extended);\n assign sum = {1'b0,a} + {1'b0,b};\n assign extended = {{4{s[3]}},s};\nendmodule",
  "notes": [
   "两个4位无符号数最大和为30，需要5位。",
   "{1'b0,a} 明确补一个0到高位。",
   "signed 规定s按补码解释。",
   "复制符号位扩展，s=1111时结果11111111，仍表示−1。"
  ],
  "trap": "无尺寸十进制常量通常至少32位；避免随手写1造成宽度和符号混算不明确。",
  "q": "4位补码1000表示？",
  "options": [
   "8",
   "−8",
   "−0"
  ],
  "correct": 1,
  "answer": "最高位权重−8，其余位0，因此为−8。",
  "task": "两个8位无符号数最大和多少，结果需几位？",
  "solution": "255+255=510，需要9位；{1'b0,a}+{1'b0,b}。",
  "diagram": null,
  "context": "完整模块示例，接口声明已补齐；保存为.v，仿真时用测试台提供输入。",
  "optional": false,
  "prerequisites": [
   "operators"
  ],
  "goals": [
   "区分无符号与补码范围",
   "显式扩展并保留进位"
  ],
  "terms": [
   [
    "bit",
    "一位二进制信息，逻辑上有0和1两种取值。"
   ],
   [
    "向量",
    "按位编号的一组信号，例如[7:0]是8位。"
   ]
  ],
  "minutes": 30,
  "knowledge": [
   {
    "id": "concept",
    "title": "区分无符号与补码范围"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "casts",
  "title": "符号转换：位串不变，解释可能变",
  "concept": [
   "$signed和$unsigned改变表达式的有符号属性，不会凭空增加位宽。4位1111按无符号是15，按补码是−1。把它赋到更宽的目标时，表达式的符号属性会影响补位方式。",
   "比较混合有符号和无符号操作数时，规则可能把比较当成无符号。优先显式规定两侧宽度和符号，先手算边界，再在真实仿真器中确认；不要仅靠输出变量声明是signed就认为中间运算都按有符号执行。"
  ],
  "code": "module cast_demo(input wire [3:0] raw,\n output wire signed [7:0] sx,\n output wire [7:0] zx,\n output wire negative);\n assign sx=$signed(raw);\n assign zx=$unsigned(raw);\n assign negative=($signed(raw) < 4'sd0);\nendmodule",
  "notes": [
   "$signed(raw)仍是4位表达式，赋给8位signed输出时符号扩展。",
   "raw=1111时sx=11111111，zx=00001111。",
   "比较两侧都显式有符号，negative才表达补码负数检测。"
  ],
  "trap": "拼接通常产生无符号表达式，不能忽略拼接后再参与运算的类型。",
  "q": "raw=1111时sx十进制是多少？",
  "options": [
   "15",
   "−1",
   "255"
  ],
  "correct": 1,
  "answer": "sx按8位补码解释11111111为−1。",
  "task": "给raw=1000写出sx和zx的十进制。",
  "solution": "sx=−8；zx=8。原始位串相同，扩展方式和解释不同。",
  "prerequisites": [
   "width-sign"
  ],
  "stage": 1,
  "optional": false,
  "goals": [
   "给raw=1000写出sx和zx的十进制。",
   "$signed(raw)仍是4位表达式，赋给8位signed输出时符号扩展。"
  ],
  "terms": [
   [
    "RTL",
    "寄存器传输级；描述组合逻辑与寄存器在时钟沿的更新。"
   ]
  ],
  "minutes": 30,
  "context": "完整单文件教学示例；代码的文件边界及测试用途见讲解。",
  "knowledge": [
   {
    "id": "concept",
    "title": "给raw=1000写出sx和zx的十进制。"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "branches",
  "stage": 1,
  "title": "begin/end、if/else 与组合逻辑",
  "concept": [
   "always @(*) 用过程表达组合规则。begin/end 把多条语句组成一组；if根据条件选分支，else提供条件不成立时的行为。组合逻辑不应该暗中记住上一次结果。",
   "先给输出一个默认值，再按条件覆盖，可以确保每条路径都有赋值。同一过程内阻塞赋值按书写顺序生效；后面的语句能看到前面算出的临时结果。"
  ],
  "code": "module mux_proc(input wire [3:0] a,b,\n input wire sel, output reg [3:0] y);\n always @(*) begin\n  y = a;\n  if(sel) begin\n   y = b;\n  end\n end\nendmodule",
  "notes": [
   "y=a 是默认行为，sel为0仍有明确输出。",
   "sel为1进入begin/end并把y改为b。",
   "= 是阻塞赋值，本课的组合计算采用它。",
   "这是MUX，不是先输出a再等待一段时间变b。"
  ],
  "trap": "遗漏else或默认值可能推导锁存器，不是工具自动帮你补0。",
  "q": "sel=0时y是多少？",
  "options": [
   "a",
   "b",
   "保持上次值"
  ],
  "correct": 0,
  "answer": "进入过程先有默认赋值y=a。",
  "task": "添加使能en：en=0时y=0，否则按sel选择。",
  "solution": "always @(*) begin\n y = 4'b0000;\n if (en) y = sel ? b : a;\nend",
  "diagram": null,
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "optional": false,
  "prerequisites": [
   "net-var",
   "operators"
  ],
  "goals": [
   "读懂begin/end和if/else",
   "为组合输出覆盖所有路径"
  ],
  "terms": [
   [
    "组合逻辑",
    "在理想功能模型中，输出由当前输入决定。"
   ],
   [
    "reg",
    "Verilog过程变量类型；是否形成存储由赋值行为决定。"
   ]
  ],
  "minutes": 10,
  "trace": {
   "heads": [
    "sel",
    "首先执行",
    "条件覆盖",
    "最终y"
   ],
   "rows": [
    [
     "0",
     "y=a",
     "不进入if",
     "a"
    ],
    [
     "1",
     "y=a",
     "y=b",
     "b"
    ]
   ]
  },
  "knowledge": [
   {
    "id": "concept",
    "title": "读懂begin/end和if/else"
   },
   {
    "id": "code",
    "title": "语法与完整示例"
   },
   {
    "id": "practice",
    "title": "练习与常见错误"
   }
  ]
 },
 {
  "id": "case-latch",
  "stage": 1,
  "title": "case、优先级与意外锁存器",
  "concept": [
   "case 按选择值匹配分支，default处理没有列出的情况。普通case比较全部四态位；casex会把X也当通配，可能掩盖错误，新手不要拿它消除未知值。",
   "锁存器在使能有效时透明，在使能无效时保存值。组合块中只在en=1给y赋值，就要求en=0时记住旧值，因此可能生成锁存器。触发器则在边沿采样，两者不同。"
  ],
  "code": "module select3(input wire [3:0] a,b,c,\n input wire [1:0] sel, output reg [3:0] y);\n always @(*) begin\n  case(sel)\n   2'b00: y = a;\n   2'b01: y = b;\n   2'b10: y = c;\n   default: y = 4'b0000;\n  endcase\n end\nendmodule",
  "notes": [
   "case(sel) 检查选择信号，不是软件跳转表。",
   "每项后的冒号跟该分支的语句，多条语句加begin/end。",
   "default使11和未知等未匹配情况有明确行为。",
   "endcase与case配对，end与begin配对。"
  ],
  "trap": "默认赋值是完整性设计，不是所有输出都应该默认X。",
  "q": "always @(*) if(en) y=d; 最大风险是？",
  "options": [
   "多一拍延迟",
   "意外锁存器",
   "自动清零"
  ],
  "correct": 1,
  "answer": "en为0时无赋值，要求保存历史值。",
  "task": "给出无存储的修复：en=0时输出0。",
  "solution": "always @(*) begin\n y = 4'b0000;\n if(en) y = d;\nend",
  "diagram": null,
  "context": "完整模块示例，接口声明已补齐；保存为.v，仿真时用测试台提供输入。",
  "optional": false,
  "prerequisites": [
   "branches"
  ],
  "goals": [
   "用case写选择规则",
   "发现漏赋值导致的意外存储"
  ],
  "terms": [
   [
    "组合逻辑",
    "在理想功能模型中，输出由当前输入决定。"
   ],
   [
    "锁存器",
    "使能有效时透明、无效时保存值的电平敏感存储元件。"
   ]
  ],
  "minutes": 30,
  "trace": {
   "heads": [
    "en",
    "只写if(en) y=d",
    "有默认赋值的组合写法"
   ],
   "rows": [
    [
     "1",
     "y跟随d",
     "y=d"
    ],
    [
     "0",
     "要求保持旧y，可能推导锁存器",
     "y=默认值，无需记忆"
    ]
   ]
  },
  "knowledge": [
   {
    "id": "concept",
    "title": "用case写选择规则"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "casez",
  "title": "casez：通配规则与优先级",
  "concept": [
   "case逐位比较全部四态；casez把Z和?当作通配。它可以表达模式匹配，但选择信号本身出现Z时也可能被忽略，因此应保证输入有效。casex连X也忽略，可能掩盖未初始化错误，入门RTL避免使用。",
   "优先编码器在多个输入同时为1时选最高优先级。case项按书写顺序匹配，第一项匹配就采用；同一个输入可能匹配多个模式时，顺序就是功能规格的一部分。下面req[3]优先最高。"
  ],
  "code": "module priority4(input wire [3:0] req,output reg valid,\n output reg [1:0] index);\n always @(*) begin\n  valid=1'b1; index=2'd0;\n  casez(req)\n   4'b1???: index=2'd3;\n   4'b01??: index=2'd2;\n   4'b001?: index=2'd1;\n   4'b0001: index=2'd0;\n   default: valid=1'b0;\n  endcase\n end\nendmodule",
  "notes": [
   "?只在casez模式中表示通配。",
   "默认值让每个输出在每条路径都有赋值。",
   "req=1010匹配首项，index=3。"
  ],
  "trap": "不要拿casez消除波形中的X/Z，先查输入来源。",
  "q": "req=0110时index？",
  "options": [
   "1",
   "2",
   "3"
  ],
  "correct": 1,
  "answer": "最高有效请求是req[2]。",
  "task": "给req=0000写出valid和index。",
  "solution": "valid=0,index=0；index在valid=0时不是有效请求编号。",
  "prerequisites": [
   "case-latch"
  ],
  "stage": 1,
  "optional": false,
  "goals": [
   "给req=0000写出valid和index。",
   "?只在casez模式中表示通配。"
  ],
  "terms": [
   [
    "RTL",
    "寄存器传输级；描述组合逻辑与寄存器在时钟沿的更新。"
   ]
  ],
  "minutes": 30,
  "context": "完整单文件教学示例；代码的文件边界及测试用途见讲解。",
  "knowledge": [
   {
    "id": "concept",
    "title": "给req=0000写出valid和index。"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "loops",
  "title": "for 循环：展开的是硬件还是时间？",
  "concept": [
   "for(起始;条件;更新)先做起始赋值；条件成立则执行循环体，再更新循环变量，直到条件不成立。integer是Verilog的整数变量类型，本例仅用于固定次数的循环索引。",
   "下面用4次异或求奇偶校验。过程里的=按顺序算出中间结果，但电路仍是组合逻辑；没有时钟事件，不会自动变成4个周期。静态边界循环常被综合工具展开成组合硬件。跨周期处理需要另外设计计数器和状态。"
  ],
  "code": "module parity4(input wire [3:0] data, output reg parity);\n integer i;\n always @(*) begin\n  parity = 1'b0;\n  for(i=0; i<4; i=i+1) begin\n   parity = parity ^ data[i];\n  end\n end\nendmodule",
  "notes": [
   "先把parity清0，否则会把旧值带入本次计算。",
   "i依次为0、1、2、3，读取data各个位。",
   "每轮用=更新临时结果，下一轮读取更新后的结果。",
   "这是异或归约的一种展开写法，也可以写assign parity=^data。"
  ],
  "trap": "不要用没有确定结束条件的while循环来等待硬件信号变化；新手先使用固定循环边界。",
  "q": "这个组合for循环需要4个时钟沿吗？",
  "options": [
   "需要",
   "不需要",
   "每轮产生新时钟"
  ],
  "correct": 1,
  "answer": "代码里没有时钟，4次循环表达组合计算结构。",
  "task": "data=1011时写出i=0到3各轮parity。",
  "solution": "从最低位开始：1 → 0 → 0 → 1，因此结果1（有3个1）。",
  "stage": 1,
  "optional": false,
  "prerequisites": [
   "case-latch",
   "operators"
  ],
  "goals": [
   "手工展开固定for循环",
   "分清循环次数与时钟拍数"
  ],
  "terms": [
   [
    "组合逻辑",
    "在理想功能模型中，输出由当前输入决定。"
   ]
  ],
  "minutes": 30,
  "trace": {
   "heads": [
    "i",
    "data[i]（1011）",
    "本轮parity"
   ],
   "rows": [
    [
     "起点",
     "—",
     "0"
    ],
    [
     "0",
     "1",
     "1"
    ],
    [
     "1",
     "1",
     "0"
    ],
    [
     "2",
     "0",
     "0"
    ],
    [
     "3",
     "1",
     "1"
    ]
   ]
  },
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "knowledge": [
   {
    "id": "concept",
    "title": "手工展开固定for循环"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "parameters",
  "stage": 1,
  "title": "parameter、localparam 与 generate",
  "concept": [
   "parameter 是实例可配置的常量，例如数据位宽；localparam 是模块内部不可通过实例覆盖的常量。它们在展开设计时确定，不是运行中变化的寄存器。",
   "generate for 在展开时复制硬件。genvar是展开用索引。过程for则写在always等过程中；可综合的固定边界循环通常也展开为硬件，不意味着每次循环占一个时钟。"
  ],
  "code": "module invert #(parameter W=8)(\n input wire [W-1:0] a, output wire [W-1:0] y);\n genvar i;\n generate for(i=0;i<W;i=i+1) begin: g\n   assign y[i] = ~a[i];\n end endgenerate\nendmodule",
  "notes": [
   "W=8给默认位宽，调用者可用#(.W(4))改成4。",
   "[W-1:0] 让端口随参数一起变化。",
   "begin:g为生成块命名，每个索引有自己的硬件。",
   "W必须为正整数；参数边界是接口设计的一部分。"
  ],
  "trap": "for不会自动生成多周期控制器；要跨周期，必须显式设计状态与计数器。",
  "q": "W=4会生成多少个位反相器？",
  "options": [
   "1个复用4拍",
   "4个",
   "8个"
  ],
  "correct": 1,
  "answer": "generate展开4个并行位反相器。",
  "task": "实例化一个4位invert模块。",
  "solution": "invert #(.W(4)) u_inv(.a(data), .y(result));",
  "diagram": null,
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "optional": false,
  "prerequisites": [
   "loops",
   "vectors"
  ],
  "goals": [
   "用参数配置硬件位宽",
   "解释generate在展开时复制硬件"
  ],
  "terms": [
   [
    "向量",
    "按位编号的一组信号，例如[7:0]是8位。"
   ],
   [
    "实例",
    "在当前设计中创建并连接的一份子模块电路。"
   ]
  ],
  "minutes": 30,
  "knowledge": [
   {
    "id": "concept",
    "title": "用参数配置硬件位宽"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "functions",
  "stage": 1,
  "title": "function：给组合计算起一个名字",
  "concept": [
   "function封装可复用计算，纯组合函数在输入给定时返回结果，不应包含等待时间。函数调用并不天然节省硬件，多处调用可能复制逻辑。",
   "本课只学习不等待时间的纯组合函数。把重复表达式写成一个有名字的计算规则，再用函数名返回结果。带时钟等待的task放到仿真后的选修课，避免现在把函数计算与跨拍操作混在一起。"
  ],
  "code": "module use_function(input wire [3:0] a,\n output wire [3:0] y);\n function [3:0] inc;\n  input [3:0] x;\n  begin inc = x + 4'd1; end\n endfunction\n assign y = inc(a);\nendmodule",
  "notes": [
   "function [3:0] 指返回值宽度。",
   "input定义形参，调用时a的值传给x。",
   "Verilog通过给函数名inc赋值返回结果。",
   "结果仍是4位，15加1会截断为0。"
  ],
  "trap": "RTL中的#10不能当作芯片里精确10ns的延迟元件。",
  "q": "inc(4'd15)返回？",
  "options": [
   "16",
   "0",
   "X"
  ],
  "correct": 1,
  "answer": "4位结果只保留低4位。",
  "task": "解释函数里把返回宽度改成5位还需检查什么。",
  "solution": "还需检查内部表达式宽度和接收信号宽度；可显式扩展x为5位，再加5'd1，结果接到5位信号。",
  "diagram": null,
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "optional": false,
  "prerequisites": [
   "parameters"
  ],
  "goals": [
   "声明函数的输入与返回值",
   "解释函数调用的位宽和硬件含义"
  ],
  "terms": [
   [
    "组合逻辑",
    "在理想功能模型中，输出由当前输入决定。"
   ]
  ],
  "minutes": 30,
  "knowledge": [
   {
    "id": "concept",
    "title": "声明函数的输入与返回值"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "directives",
  "title": "编译指令、宏与多文件边界",
  "concept": [
   "反引号开头的指令在编译预处理阶段工作。define定义文本宏，include把另一个文件的文本放入当前位置；它们不是时钟触发的硬件行为。parameter则是模块展开时的常量配置，两者用途不同。",
   "单文件例子用ifdef/else/endif选择两份实现。多文件时可把宏放在defs.vh，用include引入；同一模块定义不要既include又列入编译文件列表，避免重复定义。文件先预处理、再解析展开，最后仿真。"
  ],
  "code": "`define WIDTH 4\nmodule macro_demo(input wire [`WIDTH-1:0] a,\n output wire [`WIDTH-1:0] y);\n`ifdef INVERT\n assign y=~a;\n`else\n assign y=a;\n`endif\nendmodule\n`undef WIDTH",
  "notes": [
   "宏是文本替换，使用时同样有反引号。",
   "ifdef检查宏是否已定义，不检查输入信号。",
   "undeclared macro与模块端口报错属于编译阶段，先看第一条错误。"
  ],
  "trap": "include是文本粘贴，不是硬件实例化。",
  "q": "运行中修改输入a能改变ifdef选哪支吗？",
  "options": [
   "能",
   "不能",
   "每个时钟重新选择"
  ],
  "correct": 1,
  "answer": "ifdef在编译阶段已经选择完成。",
  "task": "解释include与实例化的区别。",
  "solution": "include引入文本；模块实例创建并连接一份硬件。多个实例不需要多次include同一模块定义。",
  "prerequisites": [
   "module",
   "parameters"
  ],
  "stage": 1,
  "optional": false,
  "goals": [
   "解释include与实例化的区别。",
   "宏是文本替换，使用时同样有反引号。"
  ],
  "terms": [
   [
    "RTL",
    "寄存器传输级；描述组合逻辑与寄存器在时钟沿的更新。"
   ]
  ],
  "minutes": 30,
  "context": "完整单文件教学示例；代码的文件边界及测试用途见讲解。",
  "knowledge": [
   {
    "id": "concept",
    "title": "解释include与实例化的区别。"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "hierarchy",
  "title": "多模块工程、层次与RTL task",
  "stage": 1,
  "prerequisites": [
   "functions",
   "directives"
  ],
  "code": "module nibble_add(input wire [3:0] a,b,output wire [4:0] sum);\n assign sum={1'b0,a}+{1'b0,b};\nendmodule\nmodule pair_add(input wire [7:0] a,b,output wire [9:0] sums);\n nibble_add lo(.a(a[3:0]),.b(b[3:0]),.sum(sums[4:0]));\n nibble_add hi(.a(a[7:4]),.b(b[7:4]),.sum(sums[9:5]));\nendmodule",
  "concept": [
   "层次是模块实例组成的树；两个实例同时存在，各有端口和资源。编译文件不是运行顺序，顶层决定展开哪些实例。",
   "层次引用适合测试台观察内部信号，综合RTL优先通过端口连接，避免依赖跨层内部名字。无延时task可抽取组合操作，带事件等待的task属于测试台。"
  ],
  "notes": [
   "同一个模块可实例化两次，lo和hi不是两次先后调用。",
   "命名端口.a(信号)把子模块端口接到父模块信号。"
  ],
  "trap": "先明确规格、输入边界和验证依据；不要把网页模型的通过当作实际RTL仿真通过。",
  "goals": [
   "正确连接多模块工程",
   "区分实例、层次与任务"
  ],
  "q": "完成本课后，什么证据最能支持设计符合规格？",
  "options": [
   "完整规格、边界测试和可复现的工具结果",
   "只看代码长度",
   "只看波形颜色"
  ],
  "correct": 0,
  "answer": "按规格逐项检查，记录输入、预期和实际结果；一次正常案例不足以证明所有边界。",
  "task": "按本课练习阶梯实现并记录边界条件。",
  "solution": "先独立完成阶梯中的设计，再逐项对照参考实现和验收条件。",
  "terms": [
   [
    "规格",
    "约定输入、输出、时钟、复位和边界行为。"
   ]
  ],
  "context": "完整模块，保存为.v；测试平台与工具命令另外提供。",
  "minutes": 30,
  "optional": false,
  "language": "verilog",
  "knowledge": [
   {
    "id": "concept",
    "title": "层次是模块实例组成的树；两个实例同时存在，各有端口和资源"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "edges",
  "stage": 2,
  "title": "时钟边沿、D 触发器与逐拍读图",
  "concept": [
   "时钟从0到1叫上升沿，1到0叫下降沿。posedge clk只在上升沿触发，时钟保持高电平并不会反复采样。周期T是相邻同类边沿之间的时间，频率f=1/T；10ns对应100MHz。",
   "D是将要保存的输入，Q是已保存的输出。理想模型中，上升沿后Q获得边沿前的D；边沿之间D变化不改变Q。真实电路在边沿后还需要clock-to-Q传播时间。"
  ],
  "code": "module dff(input wire clk,d, output reg q);\n always @(posedge clk) begin\n  q <= d;\n end\nendmodule",
  "notes": [
   "@等待指定事件，posedge选择上升沿。",
   "<=在时序块里是非阻塞赋值，不是小于等于比较。",
   "边沿发生时读取右侧d，安排更新q。",
   "同一个q不要再被另一个过程驱动。"
  ],
  "trap": "时钟高电平和时钟上升沿不是同一回事。",
  "q": "Q=0，D变1但没有上升沿，Q是？",
  "options": [
   "0",
   "1",
   "每次自动翻转"
  ],
  "correct": 0,
  "answer": "触发器只在有效边沿采样。",
  "task": "D在第1个边沿前是1，第2个边沿前是0，写出Q变化。",
  "solution": "第1沿采样后Q=1；两沿之间保持；第2沿采样后Q=0。",
  "diagram": "sample",
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "optional": false,
  "prerequisites": [
   "branches",
   "case-latch"
  ],
  "goals": [
   "指出上升沿与一个完整周期",
   "预测D变化后Q何时更新"
  ],
  "terms": [
   [
    "触发器",
    "在规定边沿采样并保存输入值的存储元件。"
   ],
   [
    "时钟周期",
    "相邻两个同类有效时钟沿之间的时间。"
   ]
  ],
  "minutes": 9,
  "knowledge": [
   {
    "id": "concept",
    "title": "指出上升沿与一个完整周期"
   },
   {
    "id": "code",
    "title": "语法与完整示例"
   },
   {
    "id": "practice",
    "title": "练习与常见错误"
   }
  ]
 },
 {
  "id": "nba",
  "stage": 2,
  "title": "阻塞 = 与非阻塞 <=",
  "concept": [
   "阻塞赋值先更新左边，再执行后续语句；非阻塞赋值先读取并记录右侧值，在当前时间步的NBA更新阶段提交左边。多个时钟过程的执行顺序不应成为电路正确性的前提。",
   "入门RTL约定：组合过程用=，边沿触发寄存器过程用<=。这让代码清楚反映组合计算和同一边沿各寄存器采样旧值的关系；不是说交换符号而不看语义就能修好电路。"
  ],
  "code": "module pipeline2(input wire clk,d,\n output reg a,b);\n always @(posedge clk) begin\n  a <= d;\n  b <= a;\n end\nendmodule",
  "notes": [
   "边沿前若a=0、d=1，第一句安排a变1。",
   "第二句读到的是旧a=0，安排b变0。",
   "更新提交后a=1、b=0，这是两级寄存器。",
   "若改成a=d; b=a;，块内b会读到新a，不能再按两级延迟解释。"
  ],
  "trap": "非阻塞并不表示“延迟一个完整周期后才执行赋值”；当前沿后即更新，第二级读旧值造成跨拍传输。",
  "q": "旧a=0、b=0、d=1，一沿后？",
  "options": [
   "a=1,b=1",
   "a=1,b=0",
   "a=0,b=0"
  ],
  "correct": 1,
  "answer": "两句右侧在更新提交前读取，b采旧a。",
  "task": "保持d=1再给一沿，a和b是多少？",
  "solution": "第2沿a读d=1，b读第1沿后a=1，因此a=1、b=1。",
  "diagram": "pipeline",
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "optional": false,
  "prerequisites": [
   "edges"
  ],
  "goals": [
   "读出同一沿各寄存器采到的旧值",
   "区分=和<=在例子中的结果"
  ],
  "terms": [
   [
    "非阻塞赋值",
    "先记录右值，再在NBA更新阶段提交左值的过程赋值。"
   ],
   [
    "触发器",
    "在规定边沿采样并保存输入值的存储元件。"
   ]
  ],
  "minutes": 9,
  "trace": {
   "heads": [
    "时刻",
    "D",
    "a",
    "b"
   ],
   "rows": [
    [
     "已复位起点",
     "1",
     "0",
     "0"
    ],
    [
     "第1上升沿后",
     "1",
     "1",
     "0"
    ],
    [
     "第2上升沿后",
     "1",
     "1",
     "1"
    ]
   ]
  },
  "knowledge": [
   {
    "id": "concept",
    "title": "读出同一沿各寄存器采到的旧值"
   },
   {
    "id": "code",
    "title": "语法与完整示例"
   },
   {
    "id": "practice",
    "title": "练习与常见错误"
   }
  ]
 },
 {
  "id": "reset",
  "stage": 2,
  "title": "同步复位、异步复位与使能",
  "concept": [
   "同步复位写在posedge clk的过程内部，只在时钟沿生效。异步低有效复位还把negedge rst_n列进事件表达式，复位拉低可以不等时钟。_n只是命名约定。",
   "if复位在前、else if使能在后，表示复位优先。时序过程没有最后的else通常表示触发器保持原值，这和组合块中漏赋值导致锁存器不同。异步复位释放还需考虑恢复/移除约束，工程上常采用异步置位、同步释放的复位方案。"
  ],
  "code": "module enabled_reg(input wire clk,rst_n,en,\n input wire [3:0] d, output reg [3:0] q);\n always @(posedge clk) begin\n  if(!rst_n) q <= 4'd0;\n  else if(en) q <= d;\n end\n // 异步版只替换上面的事件表达式为：\n // @(posedge clk or negedge rst_n)\nendmodule",
  "notes": [
   "同步版本只在时钟上升沿检查rst_n。",
   "!rst_n表示低电平时复位有效。",
   "复位有效时忽略en，优先清零。",
   "无复位且en=0时不安排赋值，保持寄存器。"
  ],
  "trap": "不要把同步复位波形画成复位信号一变就立即清零。",
  "q": "同步复位拉低但还没到时钟沿，Q？",
  "options": [
   "立即为0",
   "保持",
   "变Z"
  ],
  "correct": 1,
  "answer": "同步复位必须等待有效时钟沿。",
  "task": "rst_n=0且en=1时下一沿Q是什么？",
  "solution": "复位优先，Q清零。en不会覆盖复位分支。",
  "diagram": "reset",
  "context": "完整模块示例，接口声明已补齐；保存为.v，仿真时用测试台提供输入。",
  "optional": false,
  "prerequisites": [
   "nba",
   "branches"
  ],
  "goals": [
   "区分同步与异步复位",
   "解释复位、使能、保持的优先级"
  ],
  "terms": [
   [
    "复位",
    "把电路带到规定起始状态的控制操作。"
   ],
   [
    "使能",
    "决定在当前有效沿是否执行某项状态更新的条件。"
   ]
  ],
  "minutes": 30,
  "trace": {
   "heads": [
    "条件",
    "同步低有效复位",
    "异步低有效复位"
   ],
   "rows": [
    [
     "rst_n从1变0，没有时钟沿",
     "Q暂时保持",
     "Q清零"
    ],
    [
     "rst_n=0，出现上升沿",
     "Q清零",
     "Q保持复位"
    ],
    [
     "rst_n回1，无时钟沿",
     "仍保持",
     "仍保持；释放须检查物理约束"
    ]
   ]
  },
  "knowledge": [
   {
    "id": "concept",
    "title": "区分同步与异步复位"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "counter",
  "stage": 2,
  "title": "从规格到完整计数器",
  "concept": [
   "先写规格：4位计数，低有效同步复位；en=1每拍加1，en=0保持；15之后回到0。再写端口、状态更新和测试。这能避免“代码能编译但规格不明确”。",
   "计数器把组合加法器接到寄存器D端，寄存器Q再反馈到加法器。回绕来自有限位宽，不是代码另外写了清零条件。"
  ],
  "code": "module counter(input wire clk, rst_n, en,\n output reg [3:0] q);\n always @(posedge clk) begin\n  if (!rst_n) q <= 4'd0;\n  else if (en) q <= q + 4'd1;\n end\nendmodule",
  "notes": [
   "output reg 允许输出在过程里更新。",
   "q+4'd1基于旧q计算下一值。",
   "复位、使能、保持的优先级由if链规定。",
   "真实设计还需考虑计数终值、位宽和输入是否同一时钟域。"
  ],
  "trap": "不要用另一个always对q补复位，会产生多驱动。",
  "q": "q=15且en=1、rst_n=1，一沿后q？",
  "options": [
   "0",
   "16",
   "15"
  ],
  "correct": 0,
  "answer": "4位只保存和的低4位。",
  "task": "写出复位、计数2拍、暂停1拍、继续1拍的结果。",
  "solution": "复位沿0；计数沿1；计数沿2；暂停沿2；继续沿3。",
  "diagram": "counter",
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "optional": false,
  "prerequisites": [
   "reset",
   "width-sign"
  ],
  "goals": [
   "从自然语言规格写完整RTL",
   "预测复位、暂停和回绕"
  ],
  "terms": [
   [
    "使能",
    "决定在当前有效沿是否执行某项状态更新的条件。"
   ],
   [
    "触发器",
    "在规定边沿采样并保存输入值的存储元件。"
   ]
  ],
  "minutes": 10,
  "trace": {
   "heads": [
    "有效沿",
    "rst_n",
    "en",
    "沿前Q",
    "沿后Q"
   ],
   "rows": [
    [
     "1",
     "0",
     "1",
     "X",
     "0"
    ],
    [
     "2",
     "1",
     "1",
     "0",
     "1"
    ],
    [
     "3",
     "1",
     "0",
     "1",
     "1"
    ],
    [
     "回绕示例",
     "1",
     "1",
     "15",
     "0"
    ]
   ]
  },
  "knowledge": [
   {
    "id": "concept",
    "title": "从自然语言规格写完整RTL"
   },
   {
    "id": "code",
    "title": "语法与完整示例"
   },
   {
    "id": "practice",
    "title": "练习与常见错误"
   }
  ]
 },
 {
  "id": "shift-pulse",
  "title": "移位寄存器与单周期边沿脉冲",
  "concept": [
   "移位寄存器每拍把旧值向相邻触发器传递。边沿检测可用“当前已采样值”和“上一拍采样值”比较，找出0→1。下面只接收同一时钟域、满足采样要求的信号sig。",
   "prev保存上一拍sig。pulse在当前沿根据sig与旧prev计算，之后prev更新成sig；持续高电平只产生第一拍脉冲。异步输入不能直接用此模块，必须先考虑同步器、窄脉冲丢失和CDC协议。"
  ],
  "code": "module rise_pulse(input wire clk,rst_n,sig,\n output reg pulse,output reg [3:0] history);\n reg prev;\n always @(posedge clk) begin\n  if(!rst_n) begin\n   prev<=1'b0; pulse<=1'b0; history<=4'd0;\n  end else begin\n   prev<=sig;\n   pulse<=sig & ~prev;\n   history<={history[2:0],sig};\n  end\n end\nendmodule",
  "notes": [
   "非阻塞赋值让pulse读到旧prev，而不是刚安排的新值。",
   "history丢掉最高位，最低位插入sig。",
   "sig保持1时prev随后也为1，pulse回0。"
  ],
  "trap": "这是同域边沿检测器，不是异步事件无损传输器。",
  "q": "sig连续三拍是1，已复位，pulse依次？",
  "options": [
   "1,1,1",
   "1,0,0",
   "0,0,1"
  ],
  "correct": 1,
  "answer": "只在首次从0到1时产生脉冲。",
  "task": "画出sig依次0、1、1、0时pulse序列。",
  "solution": "0、1、0、0；prev分别保存上一拍sig。",
  "prerequisites": [
   "counter",
   "nba"
  ],
  "stage": 2,
  "optional": false,
  "goals": [
   "画出sig依次0、1、1、0时pulse序列。",
   "非阻塞赋值让pulse读到旧prev，而不是刚安排的新值。"
  ],
  "terms": [
   [
    "RTL",
    "寄存器传输级；描述组合逻辑与寄存器在时钟沿的更新。"
   ]
  ],
  "minutes": 30,
  "context": "完整单文件教学示例；代码的文件边界及测试用途见讲解。",
  "knowledge": [
   {
    "id": "concept",
    "title": "画出sig依次0、1、1、0时pulse序列。"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "alu",
  "title": "小型 ALU：选择运算与保留进位",
  "concept": [
   "ALU是算术逻辑单元。先定义op如何选择加法、与、异或等运算，再决定输出宽度和进位标志。本课4位输入相加扩展到5位，sum[4]是加法进位；它与有符号溢出不是同一概念。",
   "不同case分支表示组合数据通路的选择，不是先算完一项再开始下一项。综合工具可能优化或共享资源，实际实现取决于写法、约束和工具；不能仅从代码行数估计面积。"
  ],
  "code": "module alu4(input wire [3:0] a,b,input wire [1:0] op,\n output reg [3:0] y,output reg carry);\n reg [4:0] sum;\n always @(*) begin\n  sum={1'b0,a}+{1'b0,b};\n  y=4'd0; carry=1'b0;\n  case(op)\n   2'd0: begin y=sum[3:0]; carry=sum[4]; end\n   2'd1: y=a & b;\n   2'd2: y=a ^ b;\n   default: y=4'd0;\n  endcase\n end\nendmodule",
  "notes": [
   "先扩展输入再加，保留第5位。",
   "默认输出覆盖未知选择或保留操作码。",
   "carry只有加法分支有意义，其余分支明确为0。"
  ],
  "trap": "无符号进位与补码有符号溢出不要混用。",
  "q": "a=15,b=1,op=0时y和carry？",
  "options": [
   "y=0,c=1",
   "y=16,c=0",
   "y=15,c=1"
  ],
  "correct": 0,
  "answer": "5位和为10000，低4位0，进位1。",
  "task": "给每个op至少设计一组测试，并加上全0和最大值边界。",
  "solution": "op0测试15+1；op1测试1010&0101=0；op2测试1010^0101=1111；default输出0。",
  "prerequisites": [
   "case-latch",
   "width-sign"
  ],
  "stage": 2,
  "optional": false,
  "goals": [
   "给每个op至少设计一组测试，并加上全0和最大值边界。",
   "先扩展输入再加，保留第5位。"
  ],
  "terms": [
   [
    "RTL",
    "寄存器传输级；描述组合逻辑与寄存器在时钟沿的更新。"
   ]
  ],
  "minutes": 30,
  "context": "完整单文件教学示例；代码的文件边界及测试用途见讲解。",
  "knowledge": [
   {
    "id": "concept",
    "title": "给每个op至少设计一组测试，并加上全0和最大值边界。"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "fsm",
  "stage": 2,
  "title": "有限状态机：当前状态与下一状态",
  "concept": [
   "FSM是用有限个状态组织控制逻辑。当前状态是寄存器，下一状态由当前状态和输入组合计算。先列状态转移表，再写代码，避免状态之间暗含未写出的跳转条件。",
   "下面IDLE收到start进入RUN，RUN收到finish回IDLE。busy只由当前状态决定，属于Moore型输出；若输出还直接依赖输入则是Mealy型。"
  ],
  "code": "module controller(input wire clk,rst_n,start,finish,\n output wire busy);\n localparam IDLE=1'b0, RUN=1'b1;\n reg state,next_state;\n always @(*) begin\n  next_state = state;\n  case(state)\n   IDLE: if(start) next_state = RUN;\n   RUN: if(finish) next_state = IDLE;\n   default: next_state = IDLE;\n  endcase\n end\n always @(posedge clk) begin\n  if(!rst_n) state <= IDLE;\n  else state <= next_state;\n end\n assign busy = (state == RUN);\nendmodule",
  "notes": [
   "next_state=state 默认不转移，保证完整赋值。",
   "组合块算将来去哪里，不立即改变state。",
   "时序块在沿后更新state。",
   "busy来自state，非start的直接连接。"
  ],
  "trap": "不要把next_state变化当成state已经变化。",
  "q": "IDLE时start=1但还没到沿，busy？",
  "options": [
   "0",
   "1",
   "Z"
  ],
  "correct": 0,
  "answer": "当前state仍是IDLE，busy还没有置1。",
  "task": "写出从IDLE开始start=1一拍，随后finish=1一拍的状态序列。",
  "solution": "IDLE → RUN → IDLE，每次转移发生在有效上升沿。",
  "diagram": "fsm",
  "context": "完整模块示例，接口声明已补齐；保存为.v，仿真时用测试台提供输入。",
  "optional": false,
  "prerequisites": [
   "counter",
   "case-latch"
  ],
  "goals": [
   "区分state与next_state",
   "按转移表预测沿后状态"
  ],
  "terms": [
   [
    "FSM",
    "有限状态机，用状态和条件描述控制转移。"
   ],
   [
    "触发器",
    "在规定边沿采样并保存输入值的存储元件。"
   ]
  ],
  "minutes": 12,
  "trace": {
   "heads": [
    "当前state",
    "条件",
    "next_state",
    "沿前busy"
   ],
   "rows": [
    [
     "IDLE",
     "start=0",
     "IDLE",
     "0"
    ],
    [
     "IDLE",
     "start=1",
     "RUN",
     "0"
    ],
    [
     "RUN",
     "finish=0",
     "RUN",
     "1"
    ],
    [
     "RUN",
     "finish=1",
     "IDLE",
     "1"
    ]
   ]
  },
  "knowledge": [
   {
    "id": "concept",
    "title": "区分state与next_state"
   },
   {
    "id": "code",
    "title": "语法与完整示例"
   },
   {
    "id": "practice",
    "title": "练习与常见错误"
   }
  ]
 },
 {
  "id": "moore-mealy",
  "title": "Moore与Mealy：沿间响应和输出寄存",
  "stage": 2,
  "prerequisites": [
   "fsm"
  ],
  "code": "module detect11(input wire clk,rst_n,bit_in,output wire mealy,output reg moore);\n reg prev;\n assign mealy=prev & bit_in;\n always @(posedge clk) begin\n  if(!rst_n) begin prev<=0; moore<=0; end\n  else begin prev<=bit_in; moore<=prev & bit_in; end\n end\nendmodule",
  "concept": [
   "相同检测条件可以直接作为组合输出，也可以先写进寄存器。组合Mealy输出依赖当前状态和输入，可能在时钟沿之间变化。",
   "寄存输出等到采样沿后才改变，便于接口时序，但可能引入一拍延迟。设计前先规定输出被谁、在哪个沿接收。"
  ],
  "notes": [
   "prev是上一次采样输入，mealy随当前bit_in变化。",
   "moore在沿取检测结果，是寄存化输出；把输出寄存等价看作扩展后的Moore状态。"
  ],
  "trap": "先明确规格、输入边界和验证依据；不要把网页模型的通过当作实际RTL仿真通过。",
  "goals": [
   "区分沿间与沿后输出",
   "说明寄存输出的延迟代价"
  ],
  "q": "完成本课后，什么证据最能支持设计符合规格？",
  "options": [
   "完整规格、边界测试和可复现的工具结果",
   "只看代码长度",
   "只看波形颜色"
  ],
  "correct": 0,
  "answer": "按规格逐项检查，记录输入、预期和实际结果；一次正常案例不足以证明所有边界。",
  "task": "按本课练习阶梯实现并记录边界条件。",
  "solution": "先独立完成阶梯中的设计，再逐项对照参考实现和验收条件。",
  "terms": [
   [
    "规格",
    "约定输入、输出、时钟、复位和边界行为。"
   ]
  ],
  "context": "完整模块，保存为.v；测试平台与工具命令另外提供。",
  "minutes": 30,
  "optional": false,
  "language": "verilog",
  "knowledge": [
   {
    "id": "concept",
    "title": "相同检测条件可以直接作为组合输出，也可以先写进寄存器"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "sv-logic",
  "stage": 3,
  "title": "迈入 SystemVerilog：logic 与 bit",
  "concept": [
   "SystemVerilog扩展Verilog，既能写RTL也能写验证代码；.sv文件名帮助工具识别，但仍应明确启用对应语言模式。先把熟悉的RTL迁移，不必一开始就学UVM。",
   "logic是四态数据类型，bit是二态类型，无法保留X/Z信息。logic适用于常见单驱动信号，但不等于可以随意多驱动；需要网络解析的连接仍用wire等网络类型。"
  ],
  "code": "module mux_sv(input logic a,b,sel,\n output logic y);\n assign y = sel ? b : a;\nendmodule",
  "notes": [
   "logic a可表达0、1、X、Z。",
   "单个assign驱动logic输出在SystemVerilog中合法。",
   "若改用过程，使用always_comb并确保单一写入者。",
   "iverilog -g2012启用SV模式，但不同工具对高级特性的支持不同。"
  ],
  "trap": "不要把所有信号换成bit来“消灭X”，那可能掩盖未初始化错误。",
  "q": "logic与bit的重要差别？",
  "options": [
   "logic四态、bit二态",
   "logic一定为寄存器",
   "bit可以保留Z"
  ],
  "correct": 0,
  "answer": "二态变量把未知信息折叠，不能替代四态RTL检查。",
  "task": "把wire [7:0] data的单驱动SV变量声明写出。",
  "solution": "logic [7:0] data; 但如果需要网络解析语义，应保留wire，不能仅机械替换。",
  "diagram": null,
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "optional": false,
  "prerequisites": [
   "net-var",
   "four-state"
  ],
  "goals": [
   "区分四态logic和二态bit",
   "启用SV模式，保持单驱动规则"
  ],
  "terms": [
   [
    "logic",
    "SystemVerilog四态数据类型，常用于单驱动信号。"
   ],
   [
    "X",
    "仿真未知值，常见于未初始化、冲突或未知传播。"
   ]
  ],
  "minutes": 30,
  "knowledge": [
   {
    "id": "concept",
    "title": "区分四态logic和二态bit"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ],
  "language": "systemverilog"
 },
 {
  "id": "sv-always",
  "stage": 3,
  "title": "always_comb、always_ff 与迁移",
  "concept": [
   "always_comb明确组合意图，自动包含相关读取信号，并在仿真开始执行一次；也包含所调用函数中的相关读取。工具可检查非法存储行为，但它不会帮你补上漏写的分支。",
   "always_ff明确触发器意图，限制事件控制并要求变量没有其他过程写入者。保留组合=、时序<=的清晰风格；不使用这两个关键字也能写正确Verilog，但SV能让意图和检查更明确。"
  ],
  "code": "module enabled_ff(input logic clk,rst_n,en,d,\n output logic q);\n logic next_q;\n always_comb begin\n  next_q = en ? d : q;\n end\n always_ff @(posedge clk) begin\n  if(!rst_n) q <= 1'b0;\n  else q <= next_q;\n end\nendmodule",
  "notes": [
   "next_q是组合计算，不是额外一拍状态。",
   "always_comb里每条路径都给next_q赋值。",
   "always_ff上升沿保存next_q。",
   "q只有一个过程写入，符合单写入者原则。"
  ],
  "trap": "always_comb不会自动避免锁存器；漏赋值仍应修复。",
  "q": "哪句应使用非阻塞赋值？",
  "options": [
   "next_q=en?d:q",
   "q<=next_q",
   "所有语句都用<="
  ],
  "correct": 1,
  "answer": "q是沿触发状态，用<=表达寄存器更新。",
  "task": "将always @(*) y=a&b迁移成SV。",
  "solution": "logic y;\nalways_comb begin y = a & b; end",
  "diagram": null,
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "optional": false,
  "prerequisites": [
   "sv-logic",
   "nba"
  ],
  "goals": [
   "用always_comb/always_ff表达电路意图",
   "把熟悉的Verilog迁移到SV"
  ],
  "terms": [
   [
    "logic",
    "SystemVerilog四态数据类型，常用于单驱动信号。"
   ],
   [
    "非阻塞赋值",
    "先记录右值，再在NBA更新阶段提交左值的过程赋值。"
   ]
  ],
  "minutes": 11,
  "knowledge": [
   {
    "id": "concept",
    "title": "用always_comb/always_ff表达电路意图"
   },
   {
    "id": "code",
    "title": "语法与完整示例"
   },
   {
    "id": "practice",
    "title": "练习与常见错误"
   }
  ],
  "language": "systemverilog"
 },
 {
  "id": "sv-latch",
  "title": "always_latch：有意的锁存与意外漏赋值",
  "stage": 3,
  "prerequisites": [
   "sv-always"
  ],
  "code": "module latch_example(input logic gate,d,output logic q);\n always_latch begin\n  if(gate) q<=d;\n end\nendmodule",
  "concept": [
   "锁存器在gate有效的整个电平区间透明，gate无效时保持；它和只在边沿采样的DFF不同。",
   "always_latch声明存储意图，不能用来消除组合漏赋值的真实缺陷。基础同步RTL优先使用DFF，锁存器设计需要专门的时序方法。"
  ],
  "notes": [
   "if没有else是这里刻意保留状态，而不是组合逻辑遗漏。",
   "工具应检查过程是否符合锁存意图；支持和告警强度因工具而异。"
  ],
  "trap": "先明确规格、输入边界和验证依据；不要把网页模型的通过当作实际RTL仿真通过。",
  "goals": [
   "解释锁存器的透明区间",
   "区分有意存储与组合漏赋值"
  ],
  "q": "完成本课后，什么证据最能支持设计符合规格？",
  "options": [
   "完整规格、边界测试和可复现的工具结果",
   "只看代码长度",
   "只看波形颜色"
  ],
  "correct": 0,
  "answer": "按规格逐项检查，记录输入、预期和实际结果；一次正常案例不足以证明所有边界。",
  "task": "按本课练习阶梯实现并记录边界条件。",
  "solution": "先独立完成阶梯中的设计，再逐项对照参考实现和验收条件。",
  "terms": [
   [
    "规格",
    "约定输入、输出、时钟、复位和边界行为。"
   ]
  ],
  "context": "完整模块，保存为.sv；测试平台与工具命令另外提供。",
  "minutes": 30,
  "optional": false,
  "language": "systemverilog",
  "knowledge": [
   {
    "id": "concept",
    "title": "锁存器在gate有效的整个电平区间透明，gate无效时保持；它和只在边沿采样的DFF不同"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "sv-arrays",
  "title": "SystemVerilog 数组：位和元素要分清",
  "concept": [
   "logic [7:0] word是一份8位数据；logic [7:0] mem [0:3]是4份8位数据。名字前的维度是packed（打包成位）；名字后的维度是unpacked（元素列表）。总共4×8=32位。",
   "mem[2]选择第2号元素，返回8位；mem[2][0]再选这个元素的最低位。循环访问固定数组可描述硬件；动态数组、队列用于验证时很方便，但不能直接当作固定深度RAM。此例只练读端，实际RAM时序和推导规则另学。"
  ],
  "code": "module table4(input logic [1:0] index,\n output logic [7:0] data);\n logic [7:0] mem [0:3];\n // 这里用四个固定常量当只读查找表\n assign mem[0] = 8'd10;\n assign mem[1] = 8'd20;\n assign mem[2] = 8'd30;\n assign mem[3] = 8'd40;\n assign data = mem[index];\nendmodule",
  "notes": [
   "[7:0]是元素宽度；[0:3]是4个元素的编号范围。",
   "index是2位，能选择0到3。",
   "index=2时data=30，没有时钟，不表示同步RAM读。",
   "mem不是自动带读写协议的RAM，推导结果需看代码和综合工具。"
  ],
  "trap": "不要把mem[2]理解成第二个位；这是8位的第2号元素。",
  "q": "logic [15:0] mem [0:7]共多少位？",
  "options": [
   "16",
   "128",
   "120"
  ],
  "correct": 1,
  "answer": "8个元素，每个16位，合计128位。",
  "task": "写出mem第3号元素的第5位访问方式。",
  "solution": "mem[3][5]。编号从声明的范围取，不把“第几个”与编号混用。",
  "stage": 3,
  "optional": false,
  "prerequisites": [
   "sv-logic",
   "vectors"
  ],
  "goals": [
   "分清元素数量与每个元素位宽",
   "正确访问数组元素和某一位"
  ],
  "terms": [
   [
    "packed",
    "声明中位于变量名前、打包成连续位的维度或结构。"
   ],
   [
    "unpacked",
    "变量名后的元素数组维度。"
   ]
  ],
  "minutes": 30,
  "trace": {
   "heads": [
    "声明/表达式",
    "含义"
   ],
   "rows": [
    [
     "logic [7:0] mem [0:3]",
     "4个8位元素，共32位"
    ],
    [
     "mem[2]",
     "第2号8位元素"
    ],
    [
     "mem[2][0]",
     "该元素的最低位"
    ]
   ]
  },
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "knowledge": [
   {
    "id": "concept",
    "title": "分清元素数量与每个元素位宽"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ],
  "language": "systemverilog"
 },
 {
  "id": "sv-types",
  "stage": 3,
  "title": "typedef、enum、struct：给数据明确类型",
  "concept": [
   "typedef给类型命名；enum给有限取值命名，让状态机可读；struct把相关字段打包，避免valid、data等接口字段散落。类型不会自动替你设计协议。",
   "上一课已分清位向量与元素数组；这里把它们组织成有名字的类型。typedef是给类型取别名，state_t和beat_t是自己取的类型名，后面的state和beat才是变量名。packed struct把字段打包成一个连续位向量。"
  ],
  "code": "module type_demo;\n typedef enum logic [1:0] {\n  IDLE=2'd0, RUN=2'd1, DONE=2'd2\n } state_t;\n state_t state;\n typedef struct packed {\n  logic valid;\n  logic [7:0] data;\n } beat_t;\n beat_t beat;\nendmodule",
  "notes": [
   "state_t是2位枚举类型，state是该类型变量。",
   "packed struct字段拼成连续位，beat共9位。",
   "beat.data访问8位数据字段。",
   "mem[3]是8位元素，mem[3][0]是该元素最低位。"
  ],
  "trap": "数组维度的位置改变含义，不能只看两个中括号就认为相同。",
  "q": "beat_t共几位？",
  "options": [
   "8",
   "9",
   "16"
  ],
  "correct": 1,
  "answer": "1位valid加8位data，共9位。",
  "task": "声明32个16位元素的数组。",
  "solution": "logic [15:0] mem [0:31];",
  "diagram": null,
  "context": "完整SV声明示例，可保存为type_demo.sv。它只演示类型组织，尚未实现状态更新或输出行为。",
  "optional": false,
  "prerequisites": [
   "sv-arrays",
   "fsm"
  ],
  "goals": [
   "用typedef与enum表达状态类型",
   "计算packed struct总位数"
  ],
  "terms": [
   [
    "packed",
    "声明中位于变量名前、打包成连续位的维度或结构。"
   ],
   [
    "FSM",
    "有限状态机，用状态和条件描述控制转移。"
   ]
  ],
  "minutes": 30,
  "knowledge": [
   {
    "id": "concept",
    "title": "用typedef与enum表达状态类型"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ],
  "language": "systemverilog"
 },
 {
  "id": "sv-package",
  "stage": 3,
  "title": "package、interface 与 modport：组织RTL接口",
  "concept": [
   "package把类型、常量、函数放在共享命名空间，使用import导入；它不会产生一块可连接的模块硬件。编译文件顺序要让使用者先看见包定义。",
   "interface把一组信号及相关连接约定组织起来，modport声明从某个角色看到的输入输出方向。它解决接口可读性，不自动完成握手，也不保证跨时钟安全。"
  ],
  "code": "package types_pkg;\n typedef logic [7:0] byte_t;\nendpackage\ninterface link_if;\n logic valid,ready;\n types_pkg::byte_t data;\n modport source(output valid,data,input ready);\n modport sink(input valid,data,output ready);\nendinterface\nmodule link_source(input logic req,input types_pkg::byte_t payload,link_if.source bus);\n assign bus.valid=req;\n assign bus.data=payload;\nendmodule\nmodule link_sink(link_if.sink bus,output logic [7:0] observed);\n assign bus.ready=1'b1;\n assign observed=bus.data;\nendmodule\nmodule link_demo(input logic req,input logic [7:0] payload,output logic [7:0] observed);\n link_if bus();\n link_source src(.req(req),.payload(payload),.bus(bus));\n link_sink dst(.bus(bus),.observed(observed));\nendmodule",
  "notes": [
   "package中的byte_t可用types_pkg::byte_t限定访问。",
   "valid表示发送方有有效数据，ready表示接收方能接。",
   "source从发送方视角输出valid/data并读ready。",
   "同一沿valid&&ready才是一次传输，本例假定同一时钟域。"
  ],
  "trap": "ready为0时发送方通常必须保持valid和data，不能每拍随意换数据。",
  "q": "sink的ready方向是？",
  "options": [
   "input",
   "output",
   "无法确定"
  ],
  "correct": 1,
  "answer": "接收方通过输出ready告诉发送方自己能否接收。",
  "task": "valid=1、ready=0连续两拍，是否完成两次传输？",
  "solution": "没有传输。只有采样沿valid和ready同时为1才完成一次。发送方保持等待中的数据稳定。",
  "diagram": null,
  "context": "完整SV编译单元，package必须先于使用者。此例只演示组合接口连接；请求保持规则在Ready/Valid课学习。综合支持需检查目标工具。",
  "optional": false,
  "prerequisites": [
   "sv-types",
   "hierarchy"
  ],
  "goals": [
   "使用包中的共享类型",
   "按角色读懂modport方向"
  ],
  "terms": [
   [
    "端口",
    "模块与外部连接的信号入口或出口。"
   ],
   [
    "packed",
    "声明中位于变量名前、打包成连续位的维度或结构。"
   ]
  ],
  "minutes": 30,
  "knowledge": [
   {
    "id": "concept",
    "title": "使用包中的共享类型"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ],
  "language": "systemverilog"
 },
 {
  "id": "testbench",
  "stage": 4,
  "title": "测试台、时间单位与激励",
  "concept": [
   "DUT是被测设计；测试台负责产生时钟、复位、输入和检查输出。仿真中的initial、#延时、$finish通常属于验证环境，不是要综合进芯片的电路。",
   "`timescale 1ns/1ps规定延时单位1ns、精度1ps。#5使该测试进程等待5ns；always #5 clk=~clk生成周期10ns的时钟。为了避开采样竞争，常在下降沿改变同步输入。"
  ],
  "code": "`timescale 1ns/1ps\nmodule tb;\n reg clk=0, rst_n=0, en=0;\n wire [3:0] q;\n counter dut(.clk(clk),.rst_n(rst_n),.en(en),.q(q));\n always #5 clk=~clk;\n initial begin\n  repeat(2) @(negedge clk);\n  rst_n=1; en=1;\n  repeat(3) @(negedge clk);\n  $display(\"q=%d\",q);\n  $finish;\n end\nendmodule",
  "notes": [
   "计数器使用上一课完整counter模块，单独保存为counter.v。",
   "clk初始化为0，5ns时首次上升沿。",
   "复位覆盖至少两个上升沿，再在下降沿释放。",
   "该时序在50ns下降沿打印q=3，不与上升沿采样竞争。",
   "repeat(2) @(negedge clk) 表示等待两次下降沿；@事件等待和#时间等待都只暂停当前进程，其他进程继续。reg clk=0是声明初始化，本例放在测试台，不作为芯片复位方案。"
  ],
  "trap": "把激励和DUT在同一个上升沿用阻塞赋值更新，可能产生仿真竞争。",
  "q": "这里时钟周期多少？",
  "options": [
   "5ns",
   "10ns",
   "20ns"
  ],
  "correct": 1,
  "answer": "翻转一次是半周期，完整周期为10ns。",
  "task": "解释为什么在negedge而不是posedge更新en。",
  "solution": "为输入留出半周期稳定时间，同时避开与DUT上升沿过程的调度竞争；这只是测试台安排，不是CDC处理。",
  "diagram": null,
  "context": "这是完整测试台，保存为tb.v，并与“从规格到完整计数器”课的counter.v一起编译。顶层为tb，不是counter。",
  "optional": false,
  "prerequisites": [
   "module",
   "counter",
   "tool-start"
  ],
  "goals": [
   "识别DUT与测试台的职责",
   "避免激励与采样在同一沿竞争"
  ],
  "terms": [
   [
    "DUT",
    "Design Under Test，被测试的设计模块。"
   ],
   [
    "测试台",
    "仿真环境，产生激励并检查设计输出。"
   ]
  ],
  "minutes": 30,
  "trace": {
   "heads": [
    "时刻",
    "动作",
    "Q"
   ],
   "rows": [
    [
     "5ns、15ns上升沿",
     "rst_n=0，复位",
     "0"
    ],
    [
     "20ns下降沿",
     "释放复位并en=1",
     "0"
    ],
    [
     "25/35/45ns上升沿",
     "连续加1",
     "1/2/3"
    ],
    [
     "50ns下降沿",
     "打印或自检",
     "3"
    ]
   ]
  },
  "knowledge": [
   {
    "id": "concept",
    "title": "识别DUT与测试台的职责"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "scheduling",
  "title": "事件调度、delta 与竞争：同一时刻不等于同时更新",
  "concept": [
   "仿真时间可以保持不变，而多个事件区域依次处理。delta cycle常用来描述不推进物理时间的零延迟求值迭代；它不是FPGA额外运行的一拍，也不是一个固定的纳秒数。",
   "在时钟沿的活动事件处理中，非阻塞赋值读取右值并安排NBA更新；同样在活动区打印可能读旧值。$strobe在当前时间槽末尾报告稳定后的值。下面只是活动处理/NBA/观察的简化说明；完整SystemVerilog还有更多区域。",
   "两个并发always在同一上升沿用阻塞赋值交换a、b，结果可能依赖进程执行顺序，属于竞争。把DUT寄存器写成<=，并把测试激励移到下降沿或使用明确的采样策略。不要靠代码块的上下排列推断并发执行顺序。"
  ],
  "code": "`timescale 1ns/1ps\nmodule schedule_demo;\n reg clk=0,q=0,d=1;\n always #5 clk=~clk;\n always @(posedge clk) begin\n  q<=d;\n  $display(\"active q=%b\",q);\n  $strobe(\"end-slot q=%b\",q);\n end\n initial begin #6; $finish; end\nendmodule",
  "notes": [
   "5ns沿处q<=d先读取d=1，q仍是旧0。",
   "$display在该活动处理里看到q=0。",
   "$strobe在时间槽末尾看到NBA更新后的q=1。"
  ],
  "trap": "网页阶段动画只是解释固定示例，不是完整事件调度器。",
  "q": "第一次上升沿的display/strobe输出？",
  "options": [
   "0 / 1",
   "1 / 1",
   "0 / 0"
  ],
  "correct": 0,
  "answer": "活动处理读旧值，时间槽末尾看更新值。",
  "task": "解释为什么在同沿立刻用if检查q可能误报。",
  "solution": "检查可能早于NBA提交，读到旧q；应明确采样区域或在后续下降沿检查。",
  "prerequisites": [
   "testbench",
   "nba"
  ],
  "stage": 4,
  "optional": false,
  "goals": [
   "解释为什么在同沿立刻用if检查q可能误报。",
   "5ns沿处q<=d先读取d=1，q仍是旧0。"
  ],
  "terms": [
   [
    "RTL",
    "寄存器传输级；描述组合逻辑与寄存器在时钟沿的更新。"
   ]
  ],
  "minutes": 30,
  "context": "完整单文件教学示例；代码的文件边界及测试用途见讲解。",
  "knowledge": [
   {
    "id": "concept",
    "title": "解释为什么在同沿立刻用if检查q可能误报。"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "checking",
  "stage": 4,
  "title": "自检、波形与第一次实际运行",
  "concept": [
   "能看到波形不等于测试通过。自检测试台给出明确预期，并在不符合时主动报错。先检查复位，再检查计数、保持、回绕和复位优先级，错误才不会藏在一段好看的波形中。",
   "安装Icarus Verilog与GTKWave后，将counter.v和tb.v放在同目录。终端执行编译和运行；GTKWave打开VCD查看信号。网页演示不是HDL编译器，不能替代这一步。"
  ],
  "code": "// 在上一课initial中、打印之后、$finish之前插入：\nif (q !== 4'd3) $fatal(1, \"count mismatch\");\n// 另加一个独立initial用于记录波形：\ninitial begin\n $dumpfile(\"counter.vcd\");\n $dumpvars(0,tb);\nend\n// 终端：\n// iverilog -g2012 -s tb -o sim counter.v tb.v\n// vvp sim\n// gtkwave counter.vcd",
  "notes": [
   "!==连X也能检测，若q未知则检查失败。",
   "$fatal终止仿真并给出失败信息。",
   "$dumpvars记录层级中的信号变化。",
   "编译出错先看第一条错误，常见原因是端口名、分号或文件遗漏。"
  ],
  "trap": "检查不能紧贴posedge就假设<=已经更新；可在后续下降沿检查，或采用合适的采样区域。",
  "q": "把期望值3故意改4，测试应？",
  "options": [
   "仍通过",
   "报错失败",
   "自动修改RTL"
  ],
  "correct": 1,
  "answer": "故意破坏预期应能触发失败，才能证明检查确实在运行。",
  "task": "再增加en=0保持的测试思路。",
  "solution": "在下降沿保存q并将en=0，跨过两个上升沿后在下降沿比较q与保存值；使用!==检查保持。",
  "diagram": null,
  "context": "这是对上一课tb.v的补充：第一条检查放在$display之后、$finish之前；波形initial放在module tb内部、原initial外部。终端命令在系统终端执行。",
  "optional": false,
  "prerequisites": [
   "testbench",
   "four-state"
  ],
  "goals": [
   "写主动失败的输出检查",
   "运行仿真、看波形并故意注入错误"
  ],
  "terms": [
   [
    "VCD",
    "记录信号随仿真时间变化的波形文件格式。"
   ],
   [
    "测试台",
    "仿真环境，产生激励并检查设计输出。"
   ]
  ],
  "minutes": 30,
  "knowledge": [
   {
    "id": "concept",
    "title": "写主动失败的输出检查"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "setup-hold",
  "stage": 5,
  "title": "建立/保持时间：边沿附近发生什么",
  "concept": [
   "建立时间setup：数据必须在采样沿之前稳定一段时间；保持时间hold：沿之后仍需稳定一段时间。满足两者才落在器件规定的可靠采样条件内。",
   "违反窗口不等于一定采成错误值，也不等于RTL仿真必然出现X；物理触发器可能亚稳态，常规零延迟RTL仿真无法证明它不会发生。让时钟变慢能增加相邻沿的建立预算，但通常不能解决同一沿的保持违例。"
  ],
  "code": "module sampled_data(input wire clk,d,\n output reg q);\n always @(posedge clk) q <= d;\n // RTL只表达逻辑行为；setup/hold由库和STA检查\n // 不在这里用#delay修复物理时序\nendmodule",
  "notes": [
   "采样沿是时间参考点。",
   "setup窗口在沿之前，hold窗口在沿之后。",
   "数据变化落进任一窗口，都应检查实际约束。",
   "图中的时间是教学示例，真实数值取决于单元库和工作条件。"
  ],
  "trap": "不要说“过了建立时间就一定安全”，还必须满足保持等约束。",
  "q": "降低频率通常不能直接修复哪类问题？",
  "options": [
   "相邻沿建立预算不足",
   "同沿保持违例",
   "计算周期太短"
  ],
  "correct": 1,
  "answer": "保持比较最早数据与当前捕获沿，延长下一周期通常无助。",
  "task": "采样沿10ns，setup=2ns、hold=1ns，稳定窗口是什么？",
  "solution": "数据应在8ns前稳定，并保持到11ns之后；8～11ns是示例要求稳定的窗口。",
  "diagram": "setup",
  "context": "完整模块示例，接口声明已补齐。纯类型示例用于学习声明；带时钟但未复位的例子需先理解起点假设，不能直接当作工程交付模板。",
  "optional": false,
  "prerequisites": [
   "edges",
   "checking"
  ],
  "goals": [
   "标出采样前后的稳定窗口",
   "解释降频通常不能直接解决保持违例"
  ],
  "terms": [
   [
    "setup",
    "建立时间，数据在采样沿之前需稳定的时间要求。"
   ],
   [
    "hold",
    "保持时间，数据在采样沿之后仍需稳定的时间要求。"
   ]
  ],
  "minutes": 30,
  "knowledge": [
   {
    "id": "concept",
    "title": "标出采样前后的稳定窗口"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "timing-path",
  "stage": 5,
  "title": "寄存器路径、流水线与延迟",
  "concept": [
   "一条寄存器路径：发射寄存器Q → 组合逻辑 → 捕获寄存器D。简化无偏斜建立条件为 tCQ(max)+tcomb(max)+tsetup ≤ T。slack是预算减去需求，负值表示此模型下不足。",
   "在长组合逻辑中间插寄存器，能缩短每级路径，但增加端到端延迟。流水线装满后可每拍处理一个输入；吞吐率与延迟不是同一个指标。保持条件使用最短路径，不是把建立公式倒过来。",
   "本例为了突出两级传输，省略复位。四态仿真开始时s1和out_data可能为X；若输入已知且稳定，连续采样两沿后对应输出才变为已知。实际项目需按规格处理复位与valid，不能把未知阶段当作有效输出。"
  ],
  "code": "module math_pipeline(input wire clk,\n input wire [7:0] in_data,\n output reg [7:0] out_data);\n reg [7:0] s1;\n always @(posedge clk) begin\n  s1 <= in_data + 8'd1;\n  out_data <= s1 ^ 8'h55;\n end\nendmodule",
  "notes": [
   "两级寄存器各自在边沿采样旧输入。",
   "输出对应前一拍s1保存的数据，需把valid等控制信号同步延迟。",
   "示例每级输出8位，加法会回绕。",
   "公式忽略偏斜与不确定性，真实设计需要STA报告。"
  ],
  "trap": "不能只给数据加流水线而不处理与之对应的控制信号。",
  "q": "T=10ns，tCQ=1、组合=6、setup=1，slack？",
  "options": [
   "2ns",
   "−2ns",
   "8ns"
  ],
  "correct": 0,
  "answer": "10−1−6−1=2ns，简化建立条件满足。",
  "task": "若组合变9ns，提出一种RTL优化思路及代价。",
  "solution": "总需求11ns，slack=−1ns。可拆分组合计算并加流水级，代价是额外寄存器与延迟，控制信号也要对齐。",
  "diagram": "path",
  "context": "完整模块示例，接口声明已补齐。纯类型示例用于学习声明；带时钟但未复位的例子需先理解起点假设，不能直接当作工程交付模板。",
  "optional": false,
  "prerequisites": [
   "nba",
   "setup-hold"
  ],
  "goals": [
   "算一条简化路径的建立裕量",
   "区分流水线延迟与吞吐率"
  ],
  "terms": [
   [
    "slack",
    "时序裕量；预算减去所需时间，负值意味着该约束不足。"
   ],
   [
    "时钟周期",
    "相邻两个同类有效时钟沿之间的时间。"
   ]
  ],
  "minutes": 30,
  "trace": {
   "heads": [
    "量",
    "示例值",
    "作用"
   ],
   "rows": [
    [
     "T",
     "10ns",
     "一个周期预算"
    ],
    [
     "tCQ(max)",
     "1ns",
     "发射寄存器输出延迟"
    ],
    [
     "tcomb(max)",
     "6ns",
     "最长组合传播延迟"
    ],
    [
     "tsetup",
     "1ns",
     "捕获前稳定要求"
    ],
    [
     "slack",
     "10−1−6−1=2ns",
     "此简化模型下有2ns余量"
    ]
   ]
  },
  "knowledge": [
   {
    "id": "concept",
    "title": "算一条简化路径的建立裕量"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "clock-skew",
  "title": "Clock-to-Q、偏斜与Setup/Hold预算",
  "stage": 5,
  "prerequisites": [
   "setup-hold",
   "timing-path"
  ],
  "code": "// SDC示意：对象名必须替换为实际顶层端口\n// create_clock -name core_clk -period 10 [get_ports clk]\n// set_clock_uncertainty -setup 0.2 [get_clocks core_clk]\n// set_clock_uncertainty -hold 0.1 [get_clocks core_clk]\n// report_timing -delay_type max\n// report_timing -delay_type min",
  "concept": [
   "数据从发射寄存器的Q经组合路径到捕获寄存器D。最大延迟约束建立时间，最小延迟约束保持时间，两者必须分别检查。",
   "定义偏斜s为捕获时钟到达时间减发射时钟到达时间。正偏斜给setup更多时间，却让hold更困难；降低频率通常不能修复同沿hold违例。"
  ],
  "notes": [
   "setup slack=T+s-tCQmax-tcombmax-tsetup-Usetup。",
   "hold slack=tCQmin+tcombmin-s-thold-Uhold。只用于本课同频、同相、单周期简化模型。"
  ],
  "trap": "先明确规格、输入边界和验证依据；不要把网页模型的通过当作实际RTL仿真通过。",
  "goals": [
   "分别计算Setup与Hold裕量",
   "解释正偏斜的两种作用"
  ],
  "q": "完成本课后，什么证据最能支持设计符合规格？",
  "options": [
   "完整规格、边界测试和可复现的工具结果",
   "只看代码长度",
   "只看波形颜色"
  ],
  "correct": 0,
  "answer": "按规格逐项检查，记录输入、预期和实际结果；一次正常案例不足以证明所有边界。",
  "task": "按本课练习阶梯实现并记录边界条件。",
  "solution": "先独立完成阶梯中的设计，再逐项对照参考实现和验收条件。",
  "terms": [
   [
    "规格",
    "约定输入、输出、时钟、复位和边界行为。"
   ]
  ],
  "context": "完整模块，保存为.v；测试平台与工具命令另外提供。",
  "minutes": 30,
  "optional": false,
  "language": "terminal",
  "knowledge": [
   {
    "id": "concept",
    "title": "数据从发射寄存器的Q经组合路径到捕获寄存器D"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "multicycle",
  "title": "多周期路径：先证明使能，再写例外",
  "stage": 5,
  "prerequisites": [
   "clock-skew"
  ],
  "code": "module slow_capture(input wire clk,rst_n,en3,\n input wire [7:0] d,output reg [7:0] q);\n always @(posedge clk) begin\n  if(!rst_n) q<=0;\n  else if(en3) q<=d;\n end\nendmodule",
  "concept": [
   "多周期不是组合逻辑真的变快，而是规格允许捕获寄存器隔几个周期才接收一次。必须证明源数据在窗口内稳定、捕获使能符合约定。",
   "对相同周期同相时钟的常见末端使能场景，setup N和hold N-1经常成对使用。不同相位、-start/-end及不同频率关系要用实际报告确认，不能盲套。"
  ],
  "notes": [
   "en3只控制捕获，不单独证明源数据稳定。",
   "set_multicycle_path不能修复协议，错误例外可能隐藏真正的失败。"
  ],
  "trap": "先明确规格、输入边界和验证依据；不要把网页模型的通过当作实际RTL仿真通过。",
  "goals": [
   "证明多周期的功能前提",
   "核对捕获边沿与Hold关系"
  ],
  "q": "完成本课后，什么证据最能支持设计符合规格？",
  "options": [
   "完整规格、边界测试和可复现的工具结果",
   "只看代码长度",
   "只看波形颜色"
  ],
  "correct": 0,
  "answer": "按规格逐项检查，记录输入、预期和实际结果；一次正常案例不足以证明所有边界。",
  "task": "按本课练习阶梯实现并记录边界条件。",
  "solution": "先独立完成阶梯中的设计，再逐项对照参考实现和验收条件。",
  "terms": [
   [
    "规格",
    "约定输入、输出、时钟、复位和边界行为。"
   ]
  ],
  "context": "完整模块，保存为.v；测试平台与工具命令另外提供。",
  "minutes": 30,
  "optional": false,
  "language": "verilog",
  "knowledge": [
   {
    "id": "concept",
    "title": "多周期不是组合逻辑真的变快，而是规格允许捕获寄存器隔几个周期才接收一次"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "cdc",
  "title": "亚稳态与CDC：双触发器能做什么",
  "stage": 5,
  "prerequisites": [
   "clock-skew",
   "nba"
  ],
  "code": "module sync_bit(input wire dst_clk,rst_n,async_level,output wire synced);\n (* ASYNC_REG=\"TRUE\" *) reg meta,stable;\n always @(posedge dst_clk) begin\n  if(!rst_n) begin meta<=0;stable<=0;end\n  else begin meta<=async_level;stable<=meta;end\n end\n assign synced=stable;\nendmodule",
  "concept": [
   "异步输入可能在目的时钟采样窗口内变化，使第一级进入亚稳态。第二级给第一级更多恢复时间，降低失败概率，但不保证绝对不会失败。",
   "该结构适合慢变化单比特电平。窄脉冲可能漏采，多位总线逐位同步可能组合出不存在的数值；事件用握手或toggle协议，多位数据用稳定数据握手或异步FIFO。"
  ],
  "notes": [
   "ASYNC_REG是工具相关属性，仍要遵循目标器件的布局和CDC规则。",
   "第一级meta不能扇出到功能逻辑；目的逻辑使用stable。复位释放也要满足目的域要求。"
  ],
  "trap": "先明确规格、输入边界和验证依据；不要把网页模型的通过当作实际RTL仿真通过。",
  "goals": [
   "判断双FF的适用边界",
   "为脉冲与多位数据选择协议"
  ],
  "q": "完成本课后，什么证据最能支持设计符合规格？",
  "options": [
   "完整规格、边界测试和可复现的工具结果",
   "只看代码长度",
   "只看波形颜色"
  ],
  "correct": 0,
  "answer": "按规格逐项检查，记录输入、预期和实际结果；一次正常案例不足以证明所有边界。",
  "task": "按本课练习阶梯实现并记录边界条件。",
  "solution": "先独立完成阶梯中的设计，再逐项对照参考实现和验收条件。",
  "terms": [
   [
    "规格",
    "约定输入、输出、时钟、复位和边界行为。"
   ]
  ],
  "context": "完整模块，保存为.v；测试平台与工具命令另外提供。",
  "minutes": 30,
  "optional": false,
  "language": "verilog",
  "knowledge": [
   {
    "id": "concept",
    "title": "异步输入可能在目的时钟采样窗口内变化，使第一级进入亚稳态"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "async-fifo",
  "title": "异步FIFO：数据留在RAM，指针跨域",
  "stage": 5,
  "prerequisites": [
   "cdc",
   "sv-arrays"
  ],
  "code": "module gray_step #(parameter A=3)(input wire [A:0] binary,output wire [A:0] gray);\n assign gray=(binary>>1)^binary;\nendmodule",
  "concept": [
   "异步FIFO有独立写时钟和读时钟。数据通过真正支持双时钟的存储结构传递；跨域传递的是指针状态，不是每一位数据各过两级。",
   "本地二进制指针用于地址，额外一位用于区分回绕；对应Gray指针经同步链到对端。Empty比较本地读指针与同步写指针，Full需要考虑一圈距离；标志保守延迟是正常现象。"
  ],
  "notes": [
   "Gray=(binary>>1)^binary，相邻计数只变一位；这不取消同步链或位间偏差约束。",
   "这段只实现Gray编码，不是完整异步FIFO。真实工程应使用经过验证的IP并检查CDC、复位及约束。"
  ],
  "trap": "先明确规格、输入边界和验证依据；不要把网页模型的通过当作实际RTL仿真通过。",
  "goals": [
   "解释数据与指针跨域路径",
   "计算Gray并说明约束边界"
  ],
  "q": "完成本课后，什么证据最能支持设计符合规格？",
  "options": [
   "完整规格、边界测试和可复现的工具结果",
   "只看代码长度",
   "只看波形颜色"
  ],
  "correct": 0,
  "answer": "按规格逐项检查，记录输入、预期和实际结果；一次正常案例不足以证明所有边界。",
  "task": "按本课练习阶梯实现并记录边界条件。",
  "solution": "先独立完成阶梯中的设计，再逐项对照参考实现和验收条件。",
  "terms": [
   [
    "规格",
    "约定输入、输出、时钟、复位和边界行为。"
   ]
  ],
  "context": "完整模块，保存为.v；测试平台与工具命令另外提供。",
  "minutes": 30,
  "optional": false,
  "language": "verilog",
  "knowledge": [
   {
    "id": "concept",
    "title": "异步FIFO有独立写时钟和读时钟"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "capstone",
  "stage": 6,
  "title": "贯穿练习：写、预测、仿真、再迁移",
  "concept": [
   "核心主线的最后一课：先用Verilog写参数化计数器，再写自检测试台，最后迁移为SystemVerilog。先手算输入序列和预期，再运行仿真；不需要先掌握接口、class或SVA。",
   "验收六类行为：复位、计数、保持、回绕、复位优先、未知值检测。先手算短序列，再运行仿真；故意将加1改加2，确认自检能捕获错误。遇到问题先定位规格、连线、语言模式与采样点。"
  ],
  "code": "// counter_sv.sv\nmodule counter_sv #(parameter int W=4)(\n input logic clk,rst_n,en,\n output logic [W-1:0] q);\n always_ff @(posedge clk) begin\n  if(!rst_n) q <= '0;\n  else if(en) q <= q + {{(W-1){1'b0}},1'b1};\n end\nendmodule",
  "notes": [
   "W要求≥1，实例化前检查参数约束。",
   "'0是SV无尺寸无基数常量，按目标上下文填充0。",
   "增量显式构造为W位，避免与无尺寸整数混算。",
   "使用.sv和SV语言模式；测试台可以沿用已学结构。"
  ],
  "trap": "工具课放在语言和自检之后；不要用综合成功替代功能验证。",
  "q": "验证闭环最关键的证据？",
  "options": [
   "页面已读",
   "自检能抓住故意错误",
   "代码行数多"
  ],
  "correct": 1,
  "answer": "失败注入检验检查器是否真的有效。",
  "task": "独立写一份8位版本，并给出255→0、使能保持与同步复位的预期表。",
  "solution": "W=8；rst_n=1,en=1,q=255时下一沿0；en=0时保持；rst_n=0时无论en如何下一沿0。实际运行后保存日志和VCD；再进入原有仿真与综合课程。",
  "diagram": null,
  "context": "完整模块示例。保存为.v（SystemVerilog使用.sv）；仿真还需测试台提供输入。先读懂下面的逐步拆解。",
  "optional": false,
  "prerequisites": [
   "parameters",
   "counter",
   "checking",
   "sv-always"
  ],
  "goals": [
   "独立完成可复用计数器与自检",
   "让故意错误触发检查失败"
  ],
  "terms": [
   [
    "RTL",
    "寄存器传输级，描述寄存器之间的数据计算和更新。"
   ],
   [
    "DUT",
    "Design Under Test，被测试的设计模块。"
   ]
  ],
  "minutes": 30,
  "knowledge": [
   {
    "id": "concept",
    "title": "独立完成可复用计数器与自检"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ],
  "language": "systemverilog"
 },
 {
  "id": "synthesis-lab",
  "title": "从RTL到门级：Lint、资源与约束闭环",
  "stage": 6,
  "prerequisites": [
   "checking",
   "capstone"
  ],
  "code": "module shared_add(input wire [7:0] a,b,c,input wire sel,output wire [8:0] y);\n wire [7:0] chosen=sel?b:c;\n assign y={1'b0,a}+{1'b0,chosen};\nendmodule",
  "concept": [
   "综合把可综合RTL转换为目标库或器件资源，不执行测试台的时间脚本。组合完整赋值、时钟过程、数组读写方式决定推断出的硬件。",
   "先用lint发现位宽、锁存和多驱动，再综合检查资源和时序。共享加法器可能减少面积，但选择器也会改变路径；PPA要依据同约束下的报告比较。"
  ],
  "notes": [
   "选择操作数再加法，表达共享意图。是否共享及映射结果以综合报告为准。",
   "无标准单元库时可看通用单元统计，不能冒充实际工艺面积或签核时序。"
  ],
  "trap": "先明确规格、输入边界和验证依据；不要把网页模型的通过当作实际RTL仿真通过。",
  "goals": [
   "从RTL推断资源并检查报告",
   "完成Lint到综合的回归闭环"
  ],
  "q": "完成本课后，什么证据最能支持设计符合规格？",
  "options": [
   "完整规格、边界测试和可复现的工具结果",
   "只看代码长度",
   "只看波形颜色"
  ],
  "correct": 0,
  "answer": "按规格逐项检查，记录输入、预期和实际结果；一次正常案例不足以证明所有边界。",
  "task": "按本课练习阶梯实现并记录边界条件。",
  "solution": "先独立完成阶梯中的设计，再逐项对照参考实现和验收条件。",
  "terms": [
   [
    "规格",
    "约定输入、输出、时钟、复位和边界行为。"
   ]
  ],
  "context": "完整模块，保存为.v；测试平台与工具命令另外提供。",
  "minutes": 30,
  "optional": false,
  "language": "verilog",
  "knowledge": [
   {
    "id": "concept",
    "title": "综合把可综合RTL转换为目标库或器件资源，不执行测试台的时间脚本"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "memory",
  "title": "RAM/ROM：读延迟与读写冲突",
  "stage": 6,
  "prerequisites": [
   "sv-arrays",
   "sv-always"
  ],
  "code": "module ram16(input logic clk,we,input logic [3:0] addr,\n input logic [7:0] wdata,output logic [7:0] rdata);\n logic [7:0] mem[0:15];\n always_ff @(posedge clk) begin\n  if(we) mem[addr]<=wdata;\n  rdata<=mem[addr];\n end\nendmodule",
  "concept": [
   "16×8表示16个8位元素，不是16位总宽。写端在沿采样we、地址、数据；同步读把选中元素送到输出寄存器。",
   "同一沿对同一地址写入并读取时，本例非阻塞语义使rdata取得旧内容。器件RAM有read-first/write-first/no-change等模式，必须检查推断报告与仿真模型是否一致。"
  ],
  "notes": [
   "没有复位或初始化的mem在四态仿真中可能为X，测试应先写再读。",
   "不要用一个大复位循环强行清RAM而又假定一定推导块RAM；通常复位有效位或控制状态。"
  ],
  "trap": "先明确规格、输入边界和验证依据；不要把网页模型的通过当作实际RTL仿真通过。",
  "goals": [
   "预测同步读与同址冲突",
   "核对RAM推断的工具边界"
  ],
  "q": "完成本课后，什么证据最能支持设计符合规格？",
  "options": [
   "完整规格、边界测试和可复现的工具结果",
   "只看代码长度",
   "只看波形颜色"
  ],
  "correct": 0,
  "answer": "按规格逐项检查，记录输入、预期和实际结果；一次正常案例不足以证明所有边界。",
  "task": "按本课练习阶梯实现并记录边界条件。",
  "solution": "先独立完成阶梯中的设计，再逐项对照参考实现和验收条件。",
  "terms": [
   [
    "规格",
    "约定输入、输出、时钟、复位和边界行为。"
   ]
  ],
  "context": "完整模块，保存为.sv；测试平台与工具命令另外提供。",
  "minutes": 30,
  "optional": false,
  "language": "systemverilog",
  "knowledge": [
   {
    "id": "concept",
    "title": "16×8表示16个8位元素，不是16位总宽"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "fifo-project",
  "title": "项目一：可回归的同步FIFO",
  "stage": 6,
  "prerequisites": [
   "memory",
   "counter",
   "checking"
  ],
  "code": "module fifo4(input logic clk,rst_n,push,pop,input logic [7:0] din,\n output logic [7:0] dout,output logic full,empty);\n logic [7:0] mem[0:3];\n logic [1:0] wp,rp;\n logic [2:0] count;\n wire wr=push && !full, rd=pop && !empty;\n assign full=(count==4);\n assign empty=(count==0);\n assign dout=mem[rp];\n always_ff @(posedge clk) begin\n  if(!rst_n) begin wp<=0;rp<=0;count<=0;end\n  else begin\n   if(wr) begin mem[wp]<=din;wp<=wp+2'd1;end\n   if(rd) rp<=rp+2'd1;\n   case({wr,rd})\n    2'b10: count<=count+3'd1;\n    2'b01: count<=count-3'd1;\n    default: count<=count;\n   endcase\n  end\n end\nendmodule",
  "concept": [
   "规格固定深度4、8位数据、单时钟、同步低有效复位；dout为首字直通，只在非空时有效。push/pop仅在沿前非满/非空时接受。",
   "本例在full且同时push/pop时只接受pop；empty且同时push/pop时只接受push，没有旁路。先明确这种边界策略，再与队列参考模型比较，不混用其他FIFO的吞吐规则。"
  ],
  "notes": [
   "count范围0到4，需要3位，读写指针各2位自动回绕。",
   "count由一个case统一更新；有效读写同时发生时保持。dout空时未定义，不能检查其有效内容。"
  ],
  "trap": "先明确规格、输入边界和验证依据；不要把网页模型的通过当作实际RTL仿真通过。",
  "goals": [
   "按规格实现深度4同步FIFO",
   "验证满空、并发与回绕"
  ],
  "q": "完成本课后，什么证据最能支持设计符合规格？",
  "options": [
   "完整规格、边界测试和可复现的工具结果",
   "只看代码长度",
   "只看波形颜色"
  ],
  "correct": 0,
  "answer": "按规格逐项检查，记录输入、预期和实际结果；一次正常案例不足以证明所有边界。",
  "task": "按本课练习阶梯实现并记录边界条件。",
  "solution": "先独立完成阶梯中的设计，再逐项对照参考实现和验收条件。",
  "terms": [
   [
    "规格",
    "约定输入、输出、时钟、复位和边界行为。"
   ]
  ],
  "context": "完整模块，保存为.sv；测试平台与工具命令另外提供。",
  "minutes": 30,
  "optional": false,
  "language": "systemverilog",
  "knowledge": [
   {
    "id": "concept",
    "title": "规格固定深度4、8位数据、单时钟、同步低有效复位；dout为首字直通，只在非空时有效"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "uart-project",
  "title": "项目二：UART 8N1发送与自检",
  "stage": 6,
  "prerequisites": [
   "fsm",
   "counter",
   "checking"
  ],
  "code": "module uart_tx #(parameter CLKS_PER_BIT=4)(\n input logic clk,rst_n,start,input logic [7:0] data,output logic tx,busy);\n logic [9:0] frame;\n integer tick,bitno;\n always_ff @(posedge clk) begin\n  if(!rst_n) begin tx<=1;busy<=0;tick<=0;bitno<=0;frame<=10'h3ff;end\n  else if(!busy) begin\n   tx<=1;\n   if(start) begin frame<={1'b1,data,1'b0};tx<=0;busy<=1;tick<=0;bitno<=0;end\n  end else if(tick==CLKS_PER_BIT-1) begin\n   tick<=0;\n   if(bitno==9) begin tx<=1;busy<=0;end\n   else begin bitno<=bitno+1;tx<=frame[bitno+1];end\n  end else tick<=tick+1;\n end\nendmodule",
  "concept": [
   "UART 8N1线空闲为1，一帧依次是起始0、8个数据位低位先发、停止1。发送器在空闲且start=1的沿锁存整字节，busy期间忽略start。",
   "CLKS_PER_BIT必须为正整数；波特率约为时钟频率除以该值。每个位保持恰好N个时钟周期；波特率误差、外部电平标准和接收过采样是额外工程约束。"
  ],
  "notes": [
   "frame[0]是起始，frame[1]是data[0]，frame[9]是停止。",
   "发送期间不读取外部data，保证外部数据变化不会破坏当前帧。start持续高会在下次空闲沿再发一帧，调用方需产生脉冲。"
  ],
  "trap": "先明确规格、输入边界和验证依据；不要把网页模型的通过当作实际RTL仿真通过。",
  "goals": [
   "实现8N1低位先发发送器",
   "验证帧位序和每位持续周期"
  ],
  "q": "完成本课后，什么证据最能支持设计符合规格？",
  "options": [
   "完整规格、边界测试和可复现的工具结果",
   "只看代码长度",
   "只看波形颜色"
  ],
  "correct": 0,
  "answer": "按规格逐项检查，记录输入、预期和实际结果；一次正常案例不足以证明所有边界。",
  "task": "按本课练习阶梯实现并记录边界条件。",
  "solution": "先独立完成阶梯中的设计，再逐项对照参考实现和验收条件。",
  "terms": [
   [
    "规格",
    "约定输入、输出、时钟、复位和边界行为。"
   ]
  ],
  "context": "完整模块，保存为.sv；测试平台与工具命令另外提供。",
  "minutes": 30,
  "optional": false,
  "language": "systemverilog",
  "knowledge": [
   {
    "id": "concept",
    "title": "UART 8N1线空闲为1，一帧依次是起始0、8个数据位低位先发、停止1"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "sv-handshake",
  "title": "Ready / Valid：传输、背压与保持",
  "concept": [
   "流接口用valid表示发送方当前有有效数据，用ready表示接收方愿意接收。双方使用同一个时钟时，只有某个采样沿valid与ready都为1，才完成一次传输。",
   "发送方一旦给出valid=1，若ready=0，应保持valid和data等待；接收成功后才可以换下一份数据。接口只是把信号组织起来，协议规则仍需实现和检查。这一课先读协议，再到下一课学interface/modport。"
  ],
  "code": "// 同一时钟域中的传输计数示意\nalways_ff @(posedge clk) begin\n if(!rst_n) transfers <= 8'd0;\n else if(valid && ready) transfers <= transfers + 8'd1;\nend\n// valid=1, ready=0：没有接收，发送方保持data\n// valid=1, ready=1：在该上升沿接收一次",
  "notes": [
   "&&是单比特握手条件，表示两边同时为真。",
   "ready在两沿之间拉高不是一次传输，必须等有效采样沿。",
   "transfers是已成功传输次数，8位计数会回绕。",
   "此处假设同域；跨时钟传输要使用专门CDC结构。"
  ],
  "trap": "不能看到valid持续三拍就认定收了三次，还要逐沿检查ready。",
  "q": "三个沿valid均为1，ready依次0、1、1，接收几次？",
  "options": [
   "1",
   "2",
   "3"
  ],
  "correct": 1,
  "answer": "第二、第三个沿满足valid&&ready，共两次。",
  "task": "ready=0时为什么不能继续换data？",
  "solution": "接收方还没有接收当前这份数据；继续换会丢掉待发送的数据。",
  "optional": false,
  "stage": 6,
  "prerequisites": [
   "checking",
   "sv-always"
  ],
  "goals": [
   "逐沿判断一次有效传输",
   "解释背压时为何必须保持数据"
  ],
  "terms": [
   [
    "使能",
    "决定在当前有效沿是否执行某项状态更新的条件。"
   ],
   [
    "时钟周期",
    "相邻两个同类有效时钟沿之间的时间。"
   ]
  ],
  "minutes": 30,
  "trace": {
   "heads": [
    "沿",
    "valid",
    "ready",
    "是否传输"
   ],
   "rows": [
    [
     "1",
     "1",
     "0",
     "否，保持当前data"
    ],
    [
     "2",
     "1",
     "1",
     "是，接收第1份"
    ],
    [
     "3",
     "1",
     "1",
     "是，可接收下一份"
    ]
   ]
  },
  "context": "这是讲解用代码片段，不是独立模块；按本课说明放入已有模块或测试台，再补齐接口声明。",
  "knowledge": [
   {
    "id": "concept",
    "title": "逐沿判断一次有效传输"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ],
  "language": "systemverilog"
 },
 {
  "id": "integration",
  "title": "Ready/Valid集成：背压、交付与工程验收",
  "stage": 6,
  "prerequisites": [
   "fifo-project",
   "uart-project",
   "sv-handshake",
   "synthesis-lab"
  ],
  "code": "module rv_register(input logic clk,rst_n,s_valid,m_ready,input logic [7:0] s_data,\n output logic s_ready,m_valid,output logic [7:0] m_data);\n assign s_ready=!m_valid || m_ready;\n always_ff @(posedge clk) begin\n  if(!rst_n) begin m_valid<=0;m_data<=0;end\n  else if(s_ready) begin m_valid<=s_valid; if(s_valid) m_data<=s_data;end\n end\nendmodule",
  "concept": [
   "一拍弹性寄存器在下游停顿时保存valid和data，下游接收旧数据的同时可以装入新数据。接口transfer仅在同沿valid&&ready成立。",
   "集成FIFO到UART时要明确一次握手消费一个字节、busy期间不能丢数据、复位清空有效性。工程交付包括规格、结构、文件列表、约束、测试结果、失败日志和版本。"
  ],
  "notes": [
   "s_ready在本级为空或下游接收时为1，允许替换旧拍。",
   "下游背压时m_valid=1,m_ready=0，此时s_ready=0，m_data保持；注意长ready组合链的时序。"
  ],
  "trap": "先明确规格、输入边界和验证依据；不要把网页模型的通过当作实际RTL仿真通过。",
  "goals": [
   "实现背压下保持的弹性寄存器",
   "用事务检查证明集成不丢不重"
  ],
  "q": "完成本课后，什么证据最能支持设计符合规格？",
  "options": [
   "完整规格、边界测试和可复现的工具结果",
   "只看代码长度",
   "只看波形颜色"
  ],
  "correct": 0,
  "answer": "按规格逐项检查，记录输入、预期和实际结果；一次正常案例不足以证明所有边界。",
  "task": "按本课练习阶梯实现并记录边界条件。",
  "solution": "先独立完成阶梯中的设计，再逐项对照参考实现和验收条件。",
  "terms": [
   [
    "规格",
    "约定输入、输出、时钟、复位和边界行为。"
   ]
  ],
  "context": "完整模块，保存为.sv；测试平台与工具命令另外提供。",
  "minutes": 30,
  "optional": false,
  "language": "systemverilog",
  "knowledge": [
   {
    "id": "concept",
    "title": "一拍弹性寄存器在下游停顿时保存valid和data，下游接收旧数据的同时可以装入新数据"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 },
 {
  "id": "sv-tasks",
  "title": "选修：用 task 和队列组织测试",
  "concept": [
   "task封装一串操作，在测试台中可以等待时钟事件。automatic使每次调用有独立的局部存储，便于复用。下面任务在下降沿拉高en，一个周期后在下降沿拉低。",
   "队列像验证程序里的待办列表：int expected[$]声明整数队列，push_back加入末尾，pop_front取出最早一项。用它记录期望值再与DUT对比，这叫记分板。队列取空之前必须检查size()。"
  ],
  "code": "task automatic pulse_enable;\n @(negedge clk); en = 1'b1;\n @(negedge clk); en = 1'b0;\nendtask\n// 下列声明位于测试模块内部、initial外部\nint expected[$];\n// 在initial内调用：\n// pulse_enable();\n// expected.push_back(3);\n// if(expected.size()>0) ref_value=expected.pop_front();",
  "notes": [
   "task放在测试模块内部，调用语句放在initial等过程中。",
   "clk、en、ref_value须在测试模块中声明，en连接到计数器。",
   "task等待时钟时只暂停调用它的进程，不暂停DUT。",
   "队列用于测试期望值，不是在RTL中推导硬件FIFO。"
  ],
  "trap": "带事件等待的测试任务不可直接当作可综合的控制器。",
  "q": "pulse_enable把en保持高多久？",
  "options": [
   "一个时钟周期",
   "一个仿真时间步",
   "永远为高"
  ],
  "correct": 0,
  "answer": "相邻两个下降沿之间是一个完整周期。",
  "task": "为什么pop_front前要检查size()？",
  "solution": "避免从空队列取出无有效意义的数据；测试台应把缺少期望项作为明确错误。",
  "optional": true,
  "stage": 7,
  "prerequisites": [
   "checking"
  ],
  "goals": [
   "用task安排测试激励",
   "正确操作期望值队列"
  ],
  "terms": [
   [
    "测试台",
    "仿真环境，产生激励并检查设计输出。"
   ]
  ],
  "minutes": 30,
  "context": "这是讲解用代码片段，不是独立模块；按本课说明放入已有模块或测试台，再补齐接口声明。",
  "knowledge": [
   {
    "id": "concept",
    "title": "用task安排测试激励"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ],
  "language": "systemverilog"
 },
 {
  "id": "sv-verification",
  "stage": 7,
  "title": "选修：class、约束与随机输入",
  "concept": [
   "class是验证用对象的模板，把数据和对数据的操作放在一起。item是类名；item t声明一个对象句柄，new()创建对象，t.value访问字段。它是测试程序组织方式，不意味着芯片里会生成一个“对象”。",
   "在字段前加rand，使它参与随机化；constraint写允许的取值范围。t.randomize()返回1表示求解成功，返回0表示本次约束无法满足。随机测试只能补充定向测试，不能保证每个边界都被覆盖。"
  ],
  "code": "class item;\n rand bit [3:0] value;\n constraint small_values { value inside {[0:9]}; }\nendclass\nmodule tb_random;\n item t; // 对象句柄\n initial begin\n  t = new();\n  if (!t.randomize()) $fatal(1,\"random failed\");\n  $display(\"value=%0d\",t.value);\n end\nendmodule",
  "notes": [
   "rand让value成为随机化候选字段。",
   "constraint把值限制在0到9，包含边界。",
   "new创建对象，randomize求解约束。",
   "这些高级验证特性需支持它们的仿真器，Icarus的支持可能有限；可先用定向激励。"
  ],
  "trap": "不要把随机产生1000次当成所有情况都覆盖了。",
  "q": "randomize返回失败应？",
  "options": [
   "忽略继续",
   "报告失败并排查约束",
   "自动认为0"
  ],
  "correct": 1,
  "answer": "冲突约束或求解失败意味着本次激励无效。",
  "task": "列出计数器仍需定向测试的边界。",
  "solution": "复位、复位与使能同时有效、en关闭保持、最大值回绕、连续复位；随机测试作为补充。",
  "diagram": null,
  "context": "完整SV验证示例，需要支持class/constraint的仿真器（如学校VCS）。免费工具对高级特性支持可能不同，核心RTL学习不依赖本课。",
  "optional": true,
  "prerequisites": [
   "sv-tasks",
   "sv-logic"
  ],
  "goals": [
   "区分类、句柄和对象",
   "检查随机化返回值和约束边界"
  ],
  "terms": [
   [
    "class",
    "验证程序中对象的模板，可包含数据与方法。"
   ]
  ],
  "minutes": 30,
  "knowledge": [
   {
    "id": "concept",
    "title": "区分类、句柄和对象"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ],
  "language": "systemverilog"
 },
 {
  "id": "sv-assert",
  "stage": 7,
  "title": "选修：断言与覆盖的采样语义",
  "concept": [
   "assert检查性质，cover记录某种行为是否到达。并发断言按时钟采样，适合表达跨周期关系；它的采样语义和普通过程内if不同，要先用小波形核对。",
   "下面检查同步低有效复位：若某沿采到rst_n=0，则下一个上升沿采样时q应该为0。|=>表示非重叠蕴含，后件从下一采样点开始。此例故意不写disable iff，以免复位时把要检查的性质关掉。"
  ],
  "code": "property reset_check;\n @(posedge clk) !rst_n |=> (q == 4'd0);\nendproperty\nassert property(reset_check);\ncover property(@(posedge clk) q == 4'd15);",
  "notes": [
   "property定义命名性质，endproperty结束。",
   "前件在当前沿采样，后件在下一沿检查采样值。",
   "cover表示最大值曾经出现，不证明回绕逻辑正确。",
   "需要支持SVA的仿真器；不支持时用下降沿过程自检实现基础检查。"
  ],
  "trap": "覆盖率高不等于没有bug；断言也只能证明写下并被检查到的性质。",
  "q": "cover触发一次说明什么？",
  "options": [
   "设计全对",
   "指定场景到达过",
   "所有状态都覆盖"
  ],
  "correct": 1,
  "answer": "这里只说明q=15在某个采样点出现过。",
  "task": "为计数器写一句自然语言保持性质。",
  "solution": "若某沿复位无效且使能关闭，下一采样沿看到的q应等于上一采样沿q；需同时说明复位及采样条件。",
  "diagram": null,
  "context": "把property与assert/cover放在已有计数器测试模块内部（initial外部）；clk、rst_n与q连接到被测计数器，使用支持SVA的仿真器。",
  "optional": true,
  "prerequisites": [
   "sv-always",
   "checking"
  ],
  "goals": [
   "解释非重叠蕴含的采样点",
   "区分性质检查与场景覆盖"
  ],
  "terms": [
   [
    "SVA",
    "SystemVerilog Assertions，用采样时序描述并检查性质。"
   ]
  ],
  "minutes": 30,
  "knowledge": [
   {
    "id": "concept",
    "title": "解释非重叠蕴含的采样点"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ],
  "language": "systemverilog"
 },
 {
  "id": "advanced-map",
  "title": "进阶地图：SVA、覆盖率、总线、ASIC与PPA",
  "stage": 7,
  "prerequisites": [
   "sv-assert",
   "sv-verification",
   "integration"
  ],
  "code": "// 工程检查计划片段，不是可直接编译的模块\n// 规格：每个accepted请求最终完成，复位取消未完成事务\n// 断言：背压时valid和data保持\n// 覆盖：空/满/回绕/背压/复位组合\n// 总线：先确定握手，再研究地址、响应和突发\n// PPA：同一功能、约束和工艺下比较面积/功耗/性能",
  "concept": [
   "高级验证把规格转成检查器、激励约束和覆盖计划。随机测试不等于覆盖完整，覆盖命中也不等于功能正确，三者必须互相核对。",
   "UVM提供组件、事务、序列和scoreboard组织方式，是工程规模化方法，不是学习RTL的前置。ASIC流程在逻辑综合后还包括DFT、布局布线、时钟树、寄生提取、STA和物理验证。"
  ],
  "notes": [
   "总线学习从单次事务与背压开始，再加入多笔在途、排序和错误响应。",
   "功耗近似关系Pdynamic≈αCV²f只能解释趋势；必须考虑实际活动率、库、布局与时序后比较。"
  ],
  "trap": "先明确规格、输入边界和验证依据；不要把网页模型的通过当作实际RTL仿真通过。",
  "goals": [
   "建立规格到覆盖的验证计划",
   "说明UVM、ASIC与PPA学习边界"
  ],
  "q": "完成本课后，什么证据最能支持设计符合规格？",
  "options": [
   "完整规格、边界测试和可复现的工具结果",
   "只看代码长度",
   "只看波形颜色"
  ],
  "correct": 0,
  "answer": "按规格逐项检查，记录输入、预期和实际结果；一次正常案例不足以证明所有边界。",
  "task": "按本课练习阶梯实现并记录边界条件。",
  "solution": "先独立完成阶梯中的设计，再逐项对照参考实现和验收条件。",
  "terms": [
   [
    "规格",
    "约定输入、输出、时钟、复位和边界行为。"
   ]
  ],
  "context": "完整模块，保存为.v；测试平台与工具命令另外提供。",
  "minutes": 30,
  "optional": true,
  "language": "verilog",
  "knowledge": [
   {
    "id": "concept",
    "title": "高级验证把规格转成检查器、激励约束和覆盖计划"
   },
   {
    "id": "code",
    "title": "语法、完整示例与错误修正"
   },
   {
    "id": "practice",
    "title": "分层练习与验证"
   }
  ]
 }
];
