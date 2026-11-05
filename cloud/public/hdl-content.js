window.HDL_LESSONS=[
  {
    "id": "orientation",
    "title": "怎么学：先认识电路，再认识语言",
    "concept": [
      "两个开关都打开，灯才亮。这句话已经是一份很小的设计需求。先不碰工具：输入是什么，输出是什么，四种输入各会得到什么结果？",
      "把a、b当输入，y当灯的状态，列出00、01、10、11后，只有最后一行y=1。我们先把这种输入输出关系说清，再学习怎样写成HDL。以后每个实验也沿用这个习惯：先预测，再用代码和测试核对，遇到分歧回到最初的规则。"
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
    "task": "把开关规则写成四行输出：a/b=00、01、10、11。",
    "solution": "0,0,0,1；只有两个开关都为1灯才亮。",
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
    "context": "这是输入、规则与输出的说明，不需要编译。四种开关组合就是本课的完整例子。",
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
    ],
    "narrative": true,
    "furtherReading": [
      "学习顺序是规格→真值表或逐拍表→RTL→测试平台→仿真→综合。规格规定可观察行为，RTL描述结构与更新规则，测试平台产生输入并核对输出；它们承担不同职责。",
      "每节课先预测一个具体结果，再运行或核对。能背代码但不能解释输入改变后哪个输出在何时变化，说明还需要回到电路模型。遇到新术语先用前置链接补课。",
      "学习状态分未开始、学习中、已练习、已掌握（自评）。浏览器封闭题只证明该题回答正确；开放代码须记录实际仿真与测试条件，未运行可以如实写“尚未运行”。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [],
      "introduced": [
        "知道输入、规则、输出是什么",
        "知道每课怎样学，核心主线在哪里结束"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": []
  },
  {
    "id": "numbers",
    "stage": 0,
    "title": "bit、二进制与常量写法",
    "concept": [
      "四根只能表示0或1的线，能给多少个不同编号？不是4个，也不是从0数到16；先把每根线代表的位权写出来。",
      "四位从高到低的权是8、4、2、1，所以1010表示8+2=10。所有位都为1时是15，一共16种编码。4'b1010、4'd10和4'hA是同一个四位值的不同写法；本课只要求读懂这些数，下面完整模块的外壳在模块课再拆。"
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
    "task": "把十进制13写成四位二进制，不加进制前缀。",
    "solution": "1101；8+4+1=13。",
    "diagram": null,
    "context": "这是可编译模块，但本课只要求读懂4位常量的数值。module、端口与assign将在模块和驱动课拆解。",
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
    ],
    "narrative": true,
    "furtherReading": [
      "bit只有0或1，byte通常为8bit。n位无符号有2^n种编码，范围0到2^n-1；4位是0到15，不是0到16。二进制每一位的权为2的幂。",
      "1010₂=1×8+0×4+1×2+0=10₁₀=A₁₆。十六进制每位对应4个二进制位，所以8'hA5对应1010_0101。下划线只辅助阅读。",
      "字面量写成位宽'进制数字。4'b1010、4'd10、4'hA给出同一4位值。无尺寸十进制常量通常至少32位且带符号，初学者在RTL中优先显式给宽度。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "orientation"
      ],
      "introduced": [
        "读懂定宽二/十/十六进制常量",
        "手算位权、最大值与截断"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "位与输入输出",
        "taughtIn": "orientation"
      }
    ]
  },
  {
    "id": "logic-gates",
    "title": "与、或、非、异或：先画真值表",
    "concept": [
      "一个控制器有两种要求：“两个条件都满足才开灯”和“只要有一个满足就报警”。同样两个输入，为什么要接不同的门？",
      "取a=1、b=0来比较：与门输出0，或门输出1。再把另外三组输入补齐，就得到完整真值表。异或只在两输入不同时输出1，取反把0和1交换；先用这些关系写逻辑式，不急着背模块语法。"
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
    "task": "依次输入00、01、10、11，填写异或的四个输出。",
    "solution": "0,1,1,0；不同为1，相同为0。",
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
    "context": "先读这张真值表，再把门符号对应到每一行。完整模块语法从后面的模块课开始。",
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
    ],
    "narrative": true,
    "furtherReading": [
      "与门要求所有输入为1，或门至少一个为1，异或门检测两输入不同，非门逐位翻转。真值表枚举所有输入，因此能完整描述小型组合逻辑。",
      "向量按位运算是多组并行的门。例如1010 & 1100=1000，四个结果位各由对应输入位决定。逻辑运算&&先把整个向量解释为真或假，结果只1位。",
      "布尔表达式可以化简，但必须保持所有输入组合输出一致。不要凭某一组测试认为两个表达式等价；两输入只有4组，可以全部检查。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "numbers"
      ],
      "introduced": [
        "列全两个输入的四种组合",
        "区分与、或、非和异或"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "二进制0/1",
        "taughtIn": "numbers"
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
      "地址a=10时，只想选中四条输出中的第2条，其余都关掉。怎样从真值表一步步得到这四个输出？",
      "对y[2]来说，条件是使能有效、a[1]=1、a[0]=0，所以它的逻辑式是en & a[1] & ~a[0]。另外三位各自照着对应行写。这样地址不是直接“复制到输出”，而是被展开为独热选择。本课用真值表和门表达式推导，移位写法留到运算符课以后。"
    ],
    "notes": [
      "~是逐位取反，&是逐位与，单比特控制用en门控。",
      "a从00到11时只有对应y位为1；en=0时全部为0。"
    ],
    "trap": "漏掉en，地址10时即使en=0仍点亮输出2。这里先读逻辑式，不要求尚未讲解的移位或条件运算符。",
    "goals": [
      "从真值表写出译码器",
      "用德摩根律验证等价表达式"
    ],
    "q": "en=1且a=10，四位译码输出y[3:0]应该是哪一个？",
    "options": [
      "0100",
      "0010",
      "1010"
    ],
    "correct": 0,
    "answer": "地址2选中位2，不是把二进制地址复制到输出。",
    "task": "en=1，地址依次00、01、10、11，填写4位译码输出。",
    "solution": "0001,0010,0100,1000；地址n只点亮输出位n。",
    "terms": [
      [
        "规格",
        "约定输入、输出、时钟、复位和边界行为。"
      ]
    ],
    "context": "本课先读四个输出的与/非关系。module、wire与assign的完整语法在后面的模块、驱动课讲解，这里不要求独立写模块。",
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
    ],
    "narrative": true,
    "furtherReading": [
      "对y[2]而言，只有en=1且a=10时输出1，所以条件是en & a[1] & ~a[0]。对每个输出重复这种从真值表到最小项的过程，就能得到完整译码器。",
      "德摩根律：~(a&b)=(~a)|(~b)，~(a|b)=(~a)&(~b)。它们可由4行真值表验证。吸收律a|(a&b)=a也能由a的两种取值证明。",
      "本例是组合电路，没有时钟、没有历史。编码器反向把有效输入变编号，但多路同时有效时需要优先级，不能假定总有唯一输入。"
    ],
    "previousCorrect": 0,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "logic-gates"
      ],
      "introduced": [
        "从真值表写出译码器",
        "用德摩根律验证等价表达式"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "与、非与真值表",
        "taughtIn": "logic-gates"
      },
      {
        "concept": "二位地址与位权",
        "taughtIn": "numbers"
      }
    ]
  },
  {
    "id": "mindset",
    "stage": 0,
    "title": "先懂电路，再读代码",
    "concept": [
      "把两条assign交换位置，y和z会不会交换先后？先想一下：图上的与门和或门会因为我们换了两行字就先后开始工作吗？",
      "a=1、b从0变1时，两路组合输出各按自己的连接重新求值：y由0变1，z仍为1。两条assign描述两路同时存在的关系，并不轮流占用一个软件执行位置。后面遇到always时，我们会再分清“过程内怎样计算”与“多个过程并发存在”。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "软件通常用顺序指令更新一份机器状态，HDL用模块、网络和过程描述同时存在的结构。两个assign分别驱动y和z，两路电路并行工作。",
      "仿真器会按事件队列求值以得到一致状态，但事件处理顺序不意味着物理硬件先后制造。组合过程内部的语句顺序定义计算关系，多个过程之间不能依靠隐含顺序通信。",
      "硬件资源取决于表达式、状态和综合优化，而不是源文件行数。把同一个组合模块实例化两次通常表达两份逻辑；把它当作函数先后调用会误解吞吐与面积。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "logic-gates"
      ],
      "introduced": [
        "把两条assign理解成并行电路",
        "区分组合关系和保存状态"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "门的输入输出关系",
        "taughtIn": "logic-gates"
      }
    ]
  },
  {
    "id": "storage",
    "title": "电平与边沿：锁存器、触发器、寄存器",
    "concept": [
      "输入D在时钟高电平期间先变1、再变0。输出Q是一路跟着变，还是只在某个时刻取一次值？这个问题把组合电路、锁存器和触发器区分开了。",
      "组合连接随当前输入变化；高有效锁存器在gate=1期间跟随，gate=0后保存；上升沿DFF只在clk从0变1时取样。若DFF在那个沿读到1，沿后D再变0，Q仍保持1。本课先用图和取值表辨认三种行为，暂不要求写if/else或复位代码。"
    ],
    "code": "// 不需编译的电路规格\n// 组合MUX：en=1选d，否则选固定0\n// 锁存器：en=1跟随d，否则保存上次值\n// DFF：仅在clk上升沿保存d\n// 8位寄存器：8份DFF，共用时钟",
    "notes": [
      "先判断有没有“保持过去”的要求。",
      "锁存器看电平窗口，DFF看瞬时边沿。",
      "DFF高电平阶段不持续透明。"
    ],
    "trap": "高电平持续一段时间不等于出现多个上升沿。锁存器透明窗口和DFF采样瞬间要分开判断。",
    "q": "clk保持1，D改变，上升沿DFF会持续跟随吗？",
    "options": [
      "会",
      "不会",
      "一定变X"
    ],
    "correct": 1,
    "answer": "没有新的有效边沿，输出保持。",
    "task": "DFF初Q=0，第一上升沿D=1，沿后D改0但没有新沿。填“沿后Q、D改后Q”。",
    "solution": "1,1；第二次变化没有触发采样，DFF保持1。",
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
    "context": "这是电路行为规格，不是要编译的Verilog。先用输入变化与Q的取值检验自己的判断。",
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
    ],
    "narrative": true,
    "furtherReading": [
      "MUX由当前输入决定输出；锁存器在使能有效期间透明，关闭后保存；DFF只在规定边沿采样。它们都可能出现“选择或保持”的描述，但采样时间不同。",
      "8位寄存器是8份存储位共享控制，每位在此理想数字模型下保存0或1。之后的四态仿真课还会说明未知初态怎样显示为X。",
      "现在先辨认电路行为，到了组合分支和边沿RTL课，再把“未给新值所以要保持”对应到漏分支或寄存器代码。这里不要求提前使用if/else。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "mindset"
      ],
      "introduced": [
        "比较锁存器与DFF采样的时间条件。",
        "先判断有没有“保持过去”的要求。"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "当前输入决定组合输出",
        "taughtIn": "mindset"
      }
    ]
  },
  {
    "id": "module",
    "stage": 1,
    "title": "模块、端口与实例连接",
    "concept": [
      "一个与门已经会写了，怎样在更大的电路里接上它？先把模块看成有名字、方向和宽度的一组接口。",
      "and2是电路类型，u_and是top里的一份实例。.a(x)的意思是把子模块a端口接到父模块x信号，不是把父子名字反过来。沿x→a、z→b、y→result逐根追线，就能检查连接；两个实例同时存在，不是先后调用两次软件函数。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "module名字定义可复用电路类型，实例名标识其中一份硬件。and2是类型，u_and是top里的一份实例；输入x,z连接a,b，result连接输出y。",
      "命名连接不依赖端口声明顺序。端口宽度不符可能被补位或截断并产生告警，不能把告警当作正常类型转换。多实例输出不可直接并接普通变量而不定义仲裁。",
      "顶层没有父实例，仿真时由测试平台实例化设计并驱动端口；综合时顶层端口连接芯片/FPGA边界。endmodule关闭模块，不是函数返回。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "mindset"
      ],
      "introduced": [
        "区分模块类型与实例名",
        "用命名端口正确连线"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "并行电路",
        "taughtIn": "mindset"
      },
      {
        "concept": "位与位宽",
        "taughtIn": "numbers"
      }
    ]
  },
  {
    "id": "tool-start",
    "title": "准备工具：先完成一次语法编译",
    "concept": [
      "文件里有一个and2模块，第一次运行工具最值得确认什么？先别同时处理波形和综合，先让工具确实读到这个文件、找到这个顶层。",
      "在终端运行iverilog -V确认程序可用，再用-g2005 -s and2 -tnull编译检查。这里-s选的是模块名，-tnull不生成运行程序。通过说明语法和展开过关，下一步仍需给输入并检查输出；编译与仿真不是同一件事。"
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
    "context": "这是系统终端命令，不是Verilog源文件。先保存前一课的and2.v，再按自己安装的工具版本执行。",
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
    ],
    "narrative": true,
    "furtherReading": [
      "把and2完整模块保存为and2.v，再在该目录打开终端。iverilog -V确认工具可用；语言参数-g2005用于Verilog 2005，-g2012用于SystemVerilog，文件后缀本身不保证启用模式。",
      "-s选择顶层，-tnull进行编译/展开检查而不产生可运行仿真程序。编译成功仅证明语法和连接能通过，不证明真值表或时序正确。",
      "真正仿真通常先生成sim文件，再用vvp sim运行测试台。应保留完整命令、退出码和第一条报错；后续连锁语法错误可能都来自前面少一个分号。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "module"
      ],
      "introduced": [
        "找到工具版本信息",
        "完成一次语法编译并区分功能验证"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "模块名与顶层",
        "taughtIn": "module"
      }
    ]
  },
  {
    "id": "net-var",
    "stage": 1,
    "title": "wire、reg 与 assign",
    "concept": [
      "同样计算a&b，一种输出声明wire，另一种写reg，为什么综合出来仍可能是同一个与门？",
      "y1由assign持续驱动，y2在完整的always @(*)里每次求值都被赋成a&b。两者都没有“记住过去”的要求，所以都能形成组合电路。wire与reg先规定在Verilog中怎样连接、怎样赋值；是否需要触发器或锁存器，还要看触发条件和漏没漏分支。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "wire是网络类型，表达连接，由assign、模块输出等驱动；reg是Verilog过程变量，允许在always/initial里赋值。变量在仿真里保持值，不等于综合一定生成存储。",
      "例子y1由连续赋值计算，y2由完整组合过程计算，都是a&b的组合关系。判断硬件要看事件控制和每条路径是否赋值，不能只看端口声明。",
      "网络可有解析多个驱动的语义，但普通RTL多驱动通常是错误。内部FPGA三态通常映射为MUX，只有受支持的I/O才有真实三态能力；不要据此随意把wire并接。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "module"
      ],
      "introduced": [
        "知道连续赋值和过程赋值用在哪里",
        "解释reg不一定产生寄存器"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "端口与模块",
        "taughtIn": "module"
      },
      {
        "concept": "组合关系",
        "taughtIn": "mindset"
      }
    ]
  },
  {
    "id": "vectors",
    "stage": 1,
    "title": "向量、位选、切片与拼接",
    "concept": [
      "bus=8'hA5，取bus[0]、bus[7:4]，再把高低半字节交换，各得到什么？先把A5写成1010_0101。",
      "索引0对应最右侧一位，所以bus[0]=1；[7:4]取高四位1010，即A。拼接{bus[3:0],bus[7:4]}把低半放到高半，得到5A。大括号是在排列已有的线，不是先后执行两次读取；复制则把同一个位串重复连接。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "[7:0]共有8位，索引7通常为最高位，索引0为最低位；总宽是两端差的绝对值加1。bus[0]取一位，bus[7:4]取连续4位。",
      "拼接{高部分,低部分}按从左到右排列比特，复制{4{1'b1}}得到1111。拼接自身按无符号位串处理，后续算术需重新考虑signed。",
      "固定部分选择的边界需为常量；可变起点配常量宽度可以使用bus[base +: 4]（升方向）或[base -: 4]。越界选择可能产生X，不能假设自动循环索引。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "numbers",
        "net-var"
      ],
      "introduced": [
        "计算位宽并做位选/切片",
        "用拼接和复制构造新向量"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "声明位宽",
        "taughtIn": "net-var"
      },
      {
        "concept": "二进制位权",
        "taughtIn": "numbers"
      }
    ]
  },
  {
    "id": "four-state",
    "stage": 1,
    "title": "0、1、X、Z 与初始化",
    "concept": [
      "刚开始仿真，为什么有的线是X，有的却是Z？先找它有没有驱动，再看保存的状态有没有被初始化。",
      "未赋值的过程变量q通常是X，表示还不知道它的值；没有驱动源的wire通常是Z，表示高阻。它们不是另一种“随机0或1”。例如0 & X仍为0，因为无论未知位是哪种值，与0相与都不可能为1；1 & X则仍无法确定。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "0/1是已知逻辑，X表示未知或驱动冲突，Z表示高阻。未初始化reg通常为X，未驱动wire通常为Z；这些可以暴露漏复位和接线问题。",
      "普通==遇到X/Z可能得到X，===按四态逐位比较且结果为已知0/1。测试台检查用!==能把未知也识别为失败；不要拿case equality当一般数据运算的替代。",
      "四态逻辑并非遇X就全X：0 & X=0，1 | X=1，而1 & X=X。if条件是X时不会被当作确定真，可能掩盖错误；验证要显式检查未知。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "net-var"
      ],
      "introduced": [
        "解释X和Z的常见来源",
        "知道未知值不能随意当作0"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "网络驱动与过程变量",
        "taughtIn": "net-var"
      }
    ]
  },
  {
    "id": "operators",
    "stage": 1,
    "title": "算术、位运算、逻辑与比较",
    "concept": [
      "a=1010、b=0101，a&b、a&&b和&a为什么给出三个不同结果？它们虽然都带&，处理的对象不同。",
      "逐位与把对应位相与，得到0000；逻辑与先判断两个向量是否非零，二者都非零所以结果1；归约与要求a所有位为1，结果0。先说明自己要的是“几位结果”和“怎样组合输入”，再选运算符，括号也要把分组写清。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "a&b逐位相与，a&&b判断两整个操作数是否非零，&a把a所有位归约为一位。a=1010,b=0101时三者分别为0000、1、0。",
      "加减乘除、移位、关系、相等、条件运算各有宽度和符号规则。移位不是进制转换，左移通常不自动增宽；有符号算术右移>>>与逻辑右移>>不同。",
      "括号表达意图比背优先级可靠。a&b==0通常不是“先与再比较”的直观分组，应写(a&b)==0。避免在组合RTL使用不能展开的动态循环或随意除法，并检查资源代价。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "logic-gates",
        "vectors",
        "four-state"
      ],
      "introduced": [
        "区分按位、逻辑与归约",
        "根据类型解释比较和移位"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "向量与单比特",
        "taughtIn": "vectors"
      },
      {
        "concept": "门逻辑",
        "taughtIn": "logic-gates"
      }
    ]
  },
  {
    "id": "width-sign",
    "stage": 1,
    "title": "位宽、截断与补码",
    "concept": [
      "4位最大数15再加1，数学上是16，为什么输出却可能回到0？把16写成二进制10000，答案就在多出来的那一位里。",
      "四根输出线只能留下低四位，所以10000被截为0000。若要保留进位，先把两个操作数扩到5位再相加。signed又是另一层解释：四位1000可表示-8，扩展时要复制符号位；不能把零扩展和符号扩展混着用。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "无符号4位15+1需要5位表示16。为保留进位，在运算前把两个操作数各扩成5位，而不是事后猜测表达式宽度。表达式宽度既有自决定项，也有来自赋值上下文的规则。",
      "4位补码1111表示-1，1000表示-8，最大正数0111为7。符号扩展复制最高位，零扩展补0；复制4个1把1111扩成11111111，仍为-1。",
      "混合signed/unsigned可能使比较或扩展按unsigned进行。不能只看左值signed就认定整个右侧算术有符号；先统一操作数类型和宽度，再计算。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "operators"
      ],
      "introduced": [
        "区分无符号与补码范围",
        "显式扩展并保留进位"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "运算符结果",
        "taughtIn": "operators"
      },
      {
        "concept": "位选与拼接",
        "taughtIn": "vectors"
      }
    ]
  },
  {
    "id": "casts",
    "title": "符号转换：位串不变，解释可能变",
    "concept": [
      "raw=4'hF，同一串1111怎样会一边得到15，另一边得到-1？这里没有改变线上的位，而是改变了运算如何解释它。",
      "把raw转成$signed后，它仍是4位，但按补码解释为-1；再赋给8位signed输出时复制最高位，得到FF。$unsigned(raw)按15解释，扩大为0F。先转换、后扩展这两个步骤分开想，就不会误以为转换本身替你增加了位宽。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "$signed把现有位串解释成signed，$unsigned解释成unsigned，转换本身不改变位数。随后赋给更宽左值时，扩展方式依赖右值的有符号属性。",
      "raw=4'hF时，$signed(raw)是4位-1，赋给8位signed得到FF；$unsigned(raw)赋给8位得到0F。输出negative比较前明确把raw转为signed。",
      "SystemVerilog还允许类型转换，例如int'(x)与定宽转换；必须同时考虑大小和符号。转换不应被当作绕过宽度告警的补丁，先写出预期的位串与数值。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "width-sign"
      ],
      "introduced": [
        "给raw=1000写出sx和zx的十进制。",
        "$signed(raw)仍是4位表达式，赋给8位signed输出时符号扩展。"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "补码、符号扩展与位宽",
        "taughtIn": "width-sign"
      }
    ]
  },
  {
    "id": "branches",
    "stage": 1,
    "title": "begin/end、if/else 与组合逻辑",
    "concept": [
      "sel=0选a、sel=1选b。写if之前，先问一句：两个分支是不是都能给y一个明确值？",
      "例子先令y=a，再在sel=1时用y=b覆盖它。因此sel为0时也有输出，不需要记忆。若只留下if(sel) y=b，sel=0时程序没给新值，硬件就得保存旧结果；这已经不是原本的纯MUX规格。"
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
    "minutes": 25,
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
    ],
    "narrative": true,
    "furtherReading": [
      "把y默认接到a，sel=1时改接b，等价于一个二选一MUX。always过程内的语句顺序用于算出最终组合关系，并不表示电路输出先等一会儿接a、再接b。",
      "完整赋值是组合设计的核心。若只写if(sel) y=b而没有默认/else，sel=0时必须保留旧值，工具可能推导锁存器；这时电路已经变了。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "net-var",
        "operators"
      ],
      "introduced": [
        "读懂begin/end和if/else",
        "为组合输出覆盖所有路径"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "过程变量",
        "taughtIn": "net-var"
      },
      {
        "concept": "条件表达式",
        "taughtIn": "operators"
      },
      {
        "concept": "组合与保持",
        "taughtIn": "storage"
      }
    ]
  },
  {
    "id": "case-latch",
    "stage": 1,
    "title": "case、优先级与意外锁存器",
    "concept": [
      "有三个输入却用两位选择码，00、01、10都安排好了，剩下的11该输出什么？这个空缺不能交给工具猜。",
      "本例让11和其他未匹配情况输出0。case按项匹配，不像某些软件switch那样自动落入后续分支。若某个选择值没有给y赋值，就要求它保留上次结果；补default或先给默认值，是在补完整电路关系。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "case按四态精确匹配分支，默认不忽略X/Z。00选a、01选b、10选c，11和未匹配状态走default。与if/else一样，分支完整性决定是否需要存储。",
      "if/else常用于优先选择，case适合枚举。若case项重复或使用通配产生重叠，不能假定工具会自动报告全部错误；应显式设计并测试优先级。",
      "在组合块开头给默认值，再在分支覆盖，可以避免漏赋值。DFF时序块的未赋值路径表示保持，是刻意状态；两种场景不能混为一谈。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "branches"
      ],
      "introduced": [
        "用case写选择规则",
        "发现漏赋值导致的意外存储"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "默认赋值与漏分支",
        "taughtIn": "branches"
      }
    ]
  },
  {
    "id": "casez",
    "title": "casez：通配规则与优先级",
    "concept": [
      "req=1010时两个请求同时有效，编码器该报告3还是1？只有先规定“高位优先”，代码的第一项才有依据。",
      "1???先接住最高位置1的所有情况；再检查01??，然后001?和0001。本例把有效性valid与编号index分开，因为无请求和只有位0请求时index都可能为0。casez的?是匹配通配，不是运行时随机数；输入Z也会参与通配，验证时要另查未知。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "casez把匹配项及选择表达式中的Z/?当作通配。1???匹配所有最高位为1的请求，01??再匹配下一优先级。分支按源码顺序选择第一个匹配项。",
      "本例用互斥前缀清楚表达高位优先，req=1010时index=3。valid区分无请求与最低位请求，两者index都可能是0。",
      "输入Z也被当作通配有风险，输入X则不是casez通配。casex更会忽略X，常掩盖未知输入，不推荐用于稳健控制RTL；验证中要检查请求无未知。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "case-latch"
      ],
      "introduced": [
        "给req=0000写出valid和index。",
        "?只在casez模式中表示通配。"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "case匹配",
        "taughtIn": "case-latch"
      },
      {
        "concept": "X/Z的含义",
        "taughtIn": "four-state"
      }
    ]
  },
  {
    "id": "loops",
    "title": "for 循环：展开的是硬件还是时间？",
    "concept": [
      "for循环四次，是做四拍，还是做一段组合计算？先看循环里面有没有等待时钟的事件。",
      "这里parity先清0，再依次与data[0]到data[3]异或。整个过程没有时钟等待，描述的是这一次组合求值，等价于四位归约异或。若忘记每次清初值，就会把旧parity带进来，输出不再只由当前data决定。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "组合always里的固定for在本次求值中顺序展开计算。parity从0开始依次异或4位，等价于data[0]^data[1]^data[2]^data[3]，没有时钟等待。",
      "迭代次数可静态确定时常能综合。循环变量integer是计算索引，不应被误读为独立32位计数器；若跨时钟逐次处理，必须另写计数状态机。",
      "每次组合求值都要初始化累加结果，否则parity读取旧parity形成反馈。大循环可能产生长组合路径；结构平衡或流水线需要额外设计，不能靠for自动完成。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "case-latch",
        "operators"
      ],
      "introduced": [
        "手工展开固定for循环",
        "分清循环次数与时钟拍数"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "过程内语句顺序",
        "taughtIn": "branches"
      },
      {
        "concept": "异或与归约",
        "taughtIn": "operators"
      }
    ]
  },
  {
    "id": "parameters",
    "stage": 1,
    "title": "parameter、localparam 与 generate",
    "concept": [
      "同一份反相器写成4位或8位，需要复制两份源码吗？参数让我们在展开电路前决定尺寸。",
      "父实例用#(.W(4))选择四位，generate循环随之展开四份位逻辑。电路运行后W不会随时钟改变；运行时改变的是输入信号，不是参数。localparam适合内部推导出的常量，和供父层覆盖的parameter分工不同。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "parameter允许父实例在#(.W(4))覆盖默认值；localparam只在模块内部定义派生常量，不能由父实例直接覆盖。改变参数会重新展开不同尺寸硬件。",
      "genvar用于generate循环，生成命名块g[0]等。这里每次生成一位反相器，等价于assign y=~a，但更适合说明条件生成和模块阵列。",
      "参数需要合法范围，W必须至少1。$clog2用于SV计算地址位数，深度1时返回0可能导致零宽端口，应使用(DEPTH<=1)?1:$clog2(DEPTH)。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "loops",
        "vectors"
      ],
      "introduced": [
        "用参数配置硬件位宽",
        "解释generate在展开时复制硬件"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "常量与位宽",
        "taughtIn": "width-sign"
      },
      {
        "concept": "循环展开",
        "taughtIn": "loops"
      }
    ]
  },
  {
    "id": "functions",
    "stage": 1,
    "title": "function：给组合计算起一个名字",
    "concept": [
      "很多地方都要算“加1”，能不能把这段组合计算取个名字？函数正好适合这种不等待时间的计算。",
      "inc(a)把输入交给同一规则，本例用给函数名inc赋值来表示返回值。a=15时结果仍只有4位，所以回到0；函数没有自动扩宽。它也不替我们等待五纳秒或一个沿，想跨周期保存结果仍要写寄存器过程。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "Verilog function返回值通过给函数名赋值，本例inc=x+1。函数体不应包含#延时、@等待或其他时间控制；RTL函数通常表示可组合计算。",
      "传统Verilog function至少一个输入且返回单值；task可以带output/inout，也能在测试台等待事件。SV语法更灵活，但可综合边界仍由行为和工具决定。",
      "多次函数引用可能被综合复制或共享，不能假设函数只有一份硬件。automatic为每次调用分配独立局部变量语义，测试台可重入场景尤其需要。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "parameters"
      ],
      "introduced": [
        "声明函数的输入与返回值",
        "解释函数调用的位宽和硬件含义"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "组合过程与分支",
        "taughtIn": "branches"
      },
      {
        "concept": "运算位宽",
        "taughtIn": "width-sign"
      }
    ]
  },
  {
    "id": "directives",
    "title": "编译指令、宏与多文件边界",
    "concept": [
      "希望同一份源码在一个配置里直通、另一个配置里反相，应该用输入sel还是`ifdef？先区分“运行时切换”和“构建时选择”。",
      "sel进入电路形成MUX，运行中可改变；`ifdef在编译前选出一段文本，本次构建只留下对应写法。`include也是把文本放到当前位置，因此同一模块既include又列进文件表可能重复定义。多文件组织要看哪些声明被工具读了几次。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "`define定义文本宏，`ifdef根据是否定义选择代码，`include把文件文本插入当前位置。它们不生成运行时的if选择器，两个宏配置可能得到不同电路。",
      "头文件通常只放类型/宏等共享声明并加include guard，避免重复定义；模块源文件应通过文件列表编译，不要把同一模块include后又重复列入文件列表。",
      "宏没有参数类型检查，优先用parameter表达模块尺寸，package表达SV类型。`default_nettype none可抓拼写导致的隐式wire，文件末恢复默认以免影响其他源。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "module",
        "parameters"
      ],
      "introduced": [
        "解释include与实例化的区别。",
        "宏是文本替换，使用时同样有反引号。"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "模块编译",
        "taughtIn": "tool-start"
      },
      {
        "concept": "构建常量与运行信号",
        "taughtIn": "parameters"
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
      "把两个4位加法器接在一起，就自动成为8位加法器了吗？试一试0F加01，看看低半字节的进位有没有送到高半。",
      "本例lo和hi各算自己的半字节，低组得到16，高组得到0，它们是两个独立结果。要做完整8位加法，必须连接进位或直接扩位后相加。模块名字相同不代表工具替你补上缺失的连线；层次检查要沿接口追数据。"
    ],
    "notes": [
      "同一个模块可实例化两次，lo和hi不是两次先后调用。",
      "命名端口.a(信号)把子模块端口接到父模块信号。"
    ],
    "trap": "两个半字节独立求和，没有跨半字节进位。",
    "goals": [
      "正确连接多模块工程",
      "区分实例、层次与任务"
    ],
    "q": "本例两个半字节加法器，a=0F、b=01，低组与高组分别得到？",
    "options": [
      "16和0",
      "0和1",
      "16和1"
    ],
    "correct": 0,
    "answer": "低组进位没有接到高组，所以不是完整8位加法。",
    "task": "在“多模块工程、层次与RTL task”中检查这个错误方案： 把sums直接当a+b。写出具体修改办法与核对步骤。",
    "solution": "// 要完整8位加法则明确连接carry或直接扩位相加",
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
    ],
    "narrative": true,
    "furtherReading": [
      "pair_add实例化两个4位加法器，每个输出5位。lo连接低半字节，hi连接高半字节，sums拼接两个独立的和；这不是完整8位加法，不会把低位进位送到高位。",
      "文件列表先后不定义电路执行顺序。SV包必须先声明后使用，普通模块通常可以由编译器解析引用，但仍建议维护清晰列表和唯一顶层。",
      "测试台可观察dut.lo.sum等层次名用于调试；模块重构后路径会变化，长期接口检查优先使用端口。RTL task示例：task calc; input [3:0] x; output [3:0] y; begin y=x+1; end endtask，可在组合过程调用且不能含等待。"
    ],
    "previousCorrect": 0,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "functions",
        "directives"
      ],
      "introduced": [
        "正确连接多模块工程",
        "区分实例、层次与任务"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "实例端口",
        "taughtIn": "module"
      },
      {
        "concept": "函数与无时间计算",
        "taughtIn": "functions"
      },
      {
        "concept": "跨位进位",
        "taughtIn": "width-sign"
      }
    ]
  },
  {
    "id": "edges",
    "stage": 2,
    "title": "时钟边沿、D 触发器与逐拍读图",
    "concept": [
      "D在一个周期里变了几次，Q到底取哪一次？我们只看clk从0跳到1前，D已经稳定成了什么。",
      "假设Q原来0，第一上升沿前D=1，沿后Q更新成1。接着D变0但clk没有新的上升沿，Q还保持1，直到下一个有效沿才取0。posedge指定事件，<=描述该沿采样后的更新；它不是高电平期间一直跟随D。"
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
    "minutes": 25,
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
    ],
    "narrative": true,
    "furtherReading": [
      "DFF的D端是待采样数据，Q端保存已采到的值。clk从0变1才是上升沿；保持高电平不等于连续采样。真实Q会在沿后经过tCQ才变化，本页用理想沿后更新表示逻辑。",
      "代码q<=d在沿到来时读取D并安排Q更新。若边沿前Q=0,D=1，沿后Q=1；两沿之间D再变0，Q仍保持1。未复位的真实四态RTL可能从X开始，演示明确假设初态Q=0。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "branches",
        "case-latch"
      ],
      "introduced": [
        "指出上升沿与一个完整周期",
        "预测D变化后Q何时更新"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "DFF与有效边沿",
        "taughtIn": "storage"
      },
      {
        "concept": "过程语法",
        "taughtIn": "branches"
      }
    ]
  },
  {
    "id": "nba",
    "stage": 2,
    "title": "阻塞 = 与非阻塞 <=",
    "concept": [
      "来看两级寄存器：a<=d，b<=a。上升沿前d=1、a=0，那么这个沿过后b是1，还是仍为0？先别按源码从上到下“把值传过去”。",
      "沿到来时，第一句读到d=1，第二句读到的是尚未更新的a=0。随后安排的非阻塞更新提交，所以a=1而b=0。下一沿b才有机会采到已经保存为1的a。两份DFF的D端在同一沿各自拍快照，这比单独背“NBA区域”更容易理解。"
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
    "minutes": 25,
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
    ],
    "narrative": true,
    "furtherReading": [
      "a和b是两份独立DFF。a的D端接d，b的D端接a的Q；同一个沿到来时，两份触发器分别采样各自输入。b采的是沿前a的Q，不能穿过两个触发器。",
      "在仿真活动处理里，两句<=先读取右值、安排更新；NBA提交时才改变左值。代码先写a不表示b会读新a。非阻塞不是“等下一周期才执行”，a在当前沿后就更新，只是b同沿已取走旧a。",
      "若同一块改用a=d; b=a;，第二句会读到第一句已经更新的a，零延迟行为失去两级延迟。多个并发块用阻塞赋值相互读写时还可能产生竞争。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "edges"
      ],
      "introduced": [
        "读出同一沿各寄存器采到的旧值",
        "区分=和<=在例子中的结果"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "边沿采样与保持",
        "taughtIn": "edges"
      }
    ]
  },
  {
    "id": "reset",
    "stage": 2,
    "title": "同步复位、异步复位与使能",
    "concept": [
      "复位拉低的一瞬间，Q一定马上清零吗？答案取决于规格是同步复位还是异步复位，不取决于信号名里有没有_n。",
      "本例只在posedge clk检查rst_n，因此沿间拉低时Q先保持，到下一上升沿才清零。if(!rst_n)放在else if(en)前，表示两者同时有效时复位优先。使能无效且复位无效时没有更新，正是DFF保存旧值的用途。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "同步复位仅在有效时钟沿检查rst_n；异步复位在negedge rst_n也触发，不必等时钟。低有效是电平约定，不意味着一定异步。",
      "本例复位优先于en，en=0时Q保持。保持可以视为D端选择旧Q，不必写一个额外always。异步复位释放仍需满足recovery/removal，常用每域异步置位、同步释放方案。",
      "不要用普通组合逻辑门控时钟来代替en；毛刺可能被当作额外时钟。需要门控时应使用受支持的专用结构与时钟约束。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "nba",
        "branches"
      ],
      "introduced": [
        "区分同步与异步复位",
        "解释复位、使能、保持的优先级"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "非阻塞旧值采样",
        "taughtIn": "nba"
      },
      {
        "concept": "分支优先级",
        "taughtIn": "branches"
      }
    ]
  },
  {
    "id": "counter",
    "stage": 2,
    "title": "从规格到完整计数器",
    "concept": [
      "计数器为什么不会沿后立刻一口气加到最大？把它画成Q经过加法器回到D，就能看出中间还隔着一份寄存器。",
      "沿前Q=7、en=1时，加法器算出8，这个沿把8存回Q。沿后组合D可能又算出9，但Q要等下一个沿才接收它。4位从15再加1只留下低四位回0；en=0则D端选择旧Q，复位仍具有最高优先级。"
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
    "minutes": 25,
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
    ],
    "narrative": true,
    "furtherReading": [
      "Q通过组合加法器算Q+1，复位与使能选择器决定D端取0、加1结果还是旧Q。寄存器在上升沿把D存回Q，因此反馈不会在同一个时间步无限加。",
      "if复位写在前面，规定复位优先；else if(en)更新，剩下路径保持。4位最大15，加1产生第5位进位，输出只保留低4位，回到0。同步复位拉低后要等有效沿才清零。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "reset",
        "width-sign"
      ],
      "introduced": [
        "从自然语言规格写完整RTL",
        "预测复位、暂停和回绕"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "复位与使能",
        "taughtIn": "reset"
      },
      {
        "concept": "有限位宽回绕",
        "taughtIn": "width-sign"
      }
    ]
  },
  {
    "id": "shift-pulse",
    "title": "移位寄存器与单周期边沿脉冲",
    "concept": [
      "sig已经连续两拍为1，为什么我们只想在第一拍产生pulse？需要知道的不是“现在是否为1”，而是“现在与上一拍相比有没有从0变1”。",
      "prev保存上一次采样，pulse<=sig & ~prev在同沿读取旧prev。因此首次sig=1且旧prev=0时pulse为1，下一沿旧prev已经1，pulse回0。这里sig应已属于本时钟域；检测变化不等于替异步信号完成同步。"
    ],
    "code": "module rise_pulse(input wire clk,rst_n,sig,\n output reg pulse,output reg [3:0] history);\n reg prev;\n always @(posedge clk) begin\n  if(!rst_n) begin\n   prev<=1'b0; pulse<=1'b0; history<=4'd0;\n  end else begin\n   prev<=sig;\n   pulse<=sig & ~prev;\n   history<={history[2:0],sig};\n  end\n end\nendmodule",
    "notes": [
      "非阻塞赋值让pulse读到旧prev，而不是刚安排的新值。",
      "history丢掉最高位，最低位插入sig。",
      "sig保持1时prev随后也为1，pulse回0。"
    ],
    "trap": "这是同域边沿检测器，不是异步事件无损传输器。",
    "q": "prev原为0，sig连续两沿都是1，pulse沿后序列？",
    "options": [
      "1,1",
      "1,0",
      "0,1"
    ],
    "correct": 1,
    "answer": "第一沿检测到上升；第二沿旧prev已经为1。",
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
    ],
    "narrative": true,
    "furtherReading": [
      "prev保存上一沿的sig，pulse<=sig & ~prev在同沿读取旧prev，所以识别0→1。下一沿sig继续1时旧prev已1，pulse回0。",
      "history<={history[2:0],sig}丢掉最高位，把新采样放最低位。它是四个寄存位逐拍移动，不是组合循环。",
      "sig必须已在本时钟域稳定；异步按键先同步、必要时去抖。边沿检测不等于CDC同步，窄异步脉冲仍可能漏采。"
    ],
    "previousCorrect": 1,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "counter",
        "nba"
      ],
      "introduced": [
        "画出sig依次0、1、1、0时pulse序列。",
        "非阻塞赋值让pulse读到旧prev，而不是刚安排的新值。"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "旧状态与新输入",
        "taughtIn": "nba"
      },
      {
        "concept": "移位和拼接",
        "taughtIn": "vectors"
      }
    ]
  },
  {
    "id": "alu",
    "title": "小型 ALU：选择运算与保留进位",
    "concept": [
      "同一组a、b有时相加、有时做异或，输出选择之后，carry应该留下加法时的旧值吗？先把每个操作的输出都写完整。",
      "a=15、b=1时加法得到5位10000，y=0、carry=1。切到异或后y=14，carry应按本例规则清0。组合块先给默认值，再在分支覆盖，能让标志与数据一起对应当前操作，避免只更新y却意外保存旧carry。"
    ],
    "code": "module alu4(input wire [3:0] a,b,input wire [1:0] op,\n output reg [3:0] y,output reg carry);\n reg [4:0] sum;\n always @(*) begin\n  sum={1'b0,a}+{1'b0,b};\n  y=4'd0; carry=1'b0;\n  case(op)\n   2'd0: begin y=sum[3:0]; carry=sum[4]; end\n   2'd1: y=a & b;\n   2'd2: y=a ^ b;\n   default: y=4'd0;\n  endcase\n end\nendmodule",
    "notes": [
      "先扩展输入再加，保留第5位。",
      "默认输出覆盖未知选择或保留操作码。",
      "carry只有加法分支有意义，其余分支明确为0。"
    ],
    "trap": "无符号进位与补码有符号溢出不要混用。",
    "q": "a=15、b=1，op从加法切成XOR，本例carry应怎样变化？",
    "options": [
      "1到0",
      "始终1",
      "始终0"
    ],
    "correct": 0,
    "answer": "加法保留进位，XOR用组合默认carry=0。",
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
    ],
    "narrative": true,
    "furtherReading": [
      "op=0做加法并保留进位，1做与，2做异或，其余输出0。sum扩成5位避免最高进位在选择前丢失。",
      "y和carry每次组合求值先有默认，只有加法分支更新carry。否则从加法切到逻辑操作可能保留旧carry而推导存储。",
      "不同操作可能产生并行硬件后选择，也可能被工具共享优化。是否共享、关键路径和资源数量要看综合报告，不能只按case数量猜。"
    ],
    "previousCorrect": 0,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "case-latch",
        "width-sign"
      ],
      "introduced": [
        "给每个op至少设计一组测试，并加上全0和最大值边界。",
        "先扩展输入再加，保留第5位。"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "case默认分支",
        "taughtIn": "case-latch"
      },
      {
        "concept": "扩位与进位",
        "taughtIn": "width-sign"
      }
    ]
  },
  {
    "id": "fsm",
    "stage": 2,
    "title": "有限状态机：当前状态与下一状态",
    "concept": [
      "IDLE时start变1，next_state已经指向RUN，state是不是也立刻变了？先在纸上画开“候选下一状态”和“当前保存状态”两栏。",
      "组合块根据state和输入计算next_state，但state由时钟过程保存，要等有效沿才接收它。busy来自state==RUN，所以它不会只因start沿间变化就提前拉高。这是输出只依赖当前状态的Moore写法；下一课再比较直接依赖输入时会怎样。"
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
    "minutes": 25,
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
    ],
    "narrative": true,
    "furtherReading": [
      "state是当前状态，next_state是组合计算的候选值。IDLE看到start可使next_state变RUN，但state仍等下一个时钟沿更新。输出busy由state决定，因此沿前不会因为start先变化就立即置1。",
      "这个busy是Moore型输出，只依赖当前状态。Mealy型输出还依赖当前输入，可能在沿间变化；选哪种要看协议要求。本课先把两块式Moore控制器写完整，再扩展协议。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "counter",
        "case-latch"
      ],
      "introduced": [
        "区分state与next_state",
        "按转移表预测沿后状态"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "状态寄存器与复位",
        "taughtIn": "reset"
      },
      {
        "concept": "组合默认值",
        "taughtIn": "case-latch"
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
      "同一个“连续两个1”的检测，为什么一个输出沿间就变了，另一个要等时钟？我们用prev=1、当前bit_in从0变1来比较。",
      "组合mealy=prev & bit_in立即成为1，寄存输出moore尚未遇到新沿则保持旧值。等到上升沿，moore才取本次检测结果。把输出寄存器当作扩展状态，就能用Moore形式解释它；代价是必须重新核对接口接收时刻，而非只替换一个名字。"
    ],
    "notes": [
      "prev是上一次采样输入，mealy随当前bit_in变化。",
      "moore在沿取检测结果，是寄存化输出；把输出寄存等价看作扩展后的Moore状态。"
    ],
    "trap": "next_state含当前输入，输出可能沿前变化。",
    "goals": [
      "区分沿间与沿后输出",
      "说明寄存输出的延迟代价"
    ],
    "q": "prev=1、寄存输出原0，bit_in沿间0→1且还没有新时钟沿，两输出？",
    "options": [
      "都1",
      "都0",
      "mealy=1，寄存输出仍0"
    ],
    "correct": 2,
    "answer": "组合输出响应输入，寄存输出尚未采样。",
    "task": "给序列1,1,0,1画mealy沿前与moore沿后结果，注明观察相位。",
    "solution": "每个沿前mealy按旧prev和输入为0,1,0,0；沿后moore同序列。沿后mealy还可能因prev提交而改变，因此须标相位。",
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
    ],
    "narrative": true,
    "furtherReading": [
      "本例prev记录前一采样位。mealy=prev&bit_in在沿间就可响应输入；moore把相同条件在沿取样后寄存，所以输出稳定到下一沿。",
      "严格Moore输出只依赖状态。这里把输出寄存器看作扩展状态的一部分，即可解释为Moore形式；不要把“给任意信号加寄存器”误认为协议行为不变。",
      "组合Mealy路径可能更快响应却形成毛刺或跨模块长路径。接收方应只在约定边沿采样稳定值；接口若要求无毛刺可采用寄存输出并重新核对延迟。"
    ],
    "previousCorrect": 0,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "fsm"
      ],
      "introduced": [
        "区分沿间与沿后输出",
        "说明寄存输出的延迟代价"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "当前状态与下一状态",
        "taughtIn": "fsm"
      }
    ]
  },
  {
    "id": "sv-logic",
    "stage": 3,
    "title": "迈入 SystemVerilog：logic 与 bit",
    "concept": [
      "把reg换成logic后，电路会多出寄存器吗？还是回到我们已经用过的判断：这条赋值在什么事件下发生，需要保存过去吗？",
      "同样的MUX用assign驱动logic y，仍是组合选择；posedge过程中更新q，才描述沿触发状态。logic保留0/1/X/Z四态，bit只有两态。换类型不替代复位或单驱动设计，尤其不能用两态把未知来源藏起来。"
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
    "language": "systemverilog",
    "narrative": true,
    "furtherReading": [
      "logic是四态数据类型，bit是两态。SV变量端口和单驱动场景常用logic；要表达多驱动网络解析可用wire logic等网络声明。logic不等于reg之外又一种硬件。",
      "同一个logic不应既被assign驱动又被always写入；always_comb/ff还对写入者施加额外限制。两个过程同时写变量通常是错误，而不是自动仲裁。",
      "bit可用于不需要X/Z的测试数据，但会隐藏未知状态。RTL控制状态用logic保留初始化和冲突的可见性；是否两态应出于明确验证选择。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "net-var",
        "four-state"
      ],
      "introduced": [
        "区分四态logic和二态bit",
        "启用SV模式，保持单驱动规则"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "wire/reg驱动规则",
        "taughtIn": "net-var"
      },
      {
        "concept": "四态未知",
        "taughtIn": "four-state"
      }
    ]
  },
  {
    "id": "sv-always",
    "stage": 3,
    "title": "always_comb、always_ff 与迁移",
    "concept": [
      "已经会写always @(*)和posedge了，always_comb、always_ff还带来什么？它们让设计意图更明确，也让工具多一些机会指出写法与意图冲突。",
      "本例先在always_comb算next_q=en?d:q，再由always_ff沿上接收。next_q不是额外一级寄存器，而是D端选择结果。若组合块只写if(en) next_q=d，关键字不会自动补en=0路径；仍需我们把保持反馈或其他默认行为说明白。"
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
    "minutes": 25,
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
    "language": "systemverilog",
    "narrative": true,
    "furtherReading": [
      "always_comb描述组合意图，并在仿真开始执行一次；它不会帮你补默认分支。always_ff描述沿触发存储意图，并限制事件控制与写入者，降低多人维护时意外多驱动的风险。",
      "logic是四态类型，不等于有存储。next_q由完整的组合赋值产生；q只有always_ff写入，才是一份沿触发状态。always_latch用来明确声明电平敏感存储意图，不应拿它掩盖无意漏赋值。",
      "always_ff不自动推导使能或复位优先级，也不把阻塞赋值改成非阻塞。保持组合=、时序<=的规范，并检查lint/仿真工具的诊断。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "sv-logic",
        "nba"
      ],
      "introduced": [
        "用always_comb/always_ff表达电路意图",
        "把熟悉的Verilog迁移到SV"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "组合默认与时序采样",
        "taughtIn": "branches"
      },
      {
        "concept": "非阻塞更新",
        "taughtIn": "nba"
      },
      {
        "concept": "logic类型",
        "taughtIn": "sv-logic"
      }
    ]
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
      "gate一直为1，D变了两次，Q会跟着两次变化吗？若规格要求“开门期间透明”，就不是DFF那种只拍一次快照。",
      "always_latch里的if(gate)在有效电平期间允许q跟随，关闭后不赋新值，刻意要求保持。这里没有else是规格的一部分；相同遗漏若出现在本来要纯组合的always_comb里，就会成为错误。先决定要什么电路，再选过程关键字。"
    ],
    "notes": [
      "if没有else是这里刻意保留状态，而不是组合逻辑遗漏。",
      "工具应检查过程是否符合锁存意图；支持和告警强度因工具而异。"
    ],
    "trap": "要求保持的行为违背组合意图。",
    "goals": [
      "解释锁存器的透明区间",
      "区分有意存储与组合漏赋值"
    ],
    "q": "gate=1时q跟随d为1，随后gate关闭、d变0，q为？",
    "options": [
      "0",
      "1",
      "Z"
    ],
    "correct": 1,
    "answer": "关闭后的锁存器保存关门前的值。",
    "task": "写高有效透明锁存规格，列gate=1和0各两次D切换的Q预期。",
    "solution": "开门Q随0→1；关门后Q保持1，D变0也不改变。",
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
    ],
    "narrative": true,
    "furtherReading": [
      "gate=1时q随d跟随，gate=0时q保留关门前的最后值。数据在透明区间可穿过多个级联锁存器，时序方法不同于沿触发DFF。",
      "always_latch是意图检查，不是忽略漏赋值的开关。若规格要求纯组合，应在always_comb补全路径；若规格明确存储，才使用锁存器并检查门控与时序。",
      "本例非阻塞赋值用于存储。真实锁存器有建立保持窗口、透明传播延迟与脉宽要求，理想RTL不证明这些物理约束满足。"
    ],
    "previousCorrect": 0,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "sv-always"
      ],
      "introduced": [
        "解释锁存器的透明区间",
        "区分有意存储与组合漏赋值"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "透明窗口与保持",
        "taughtIn": "storage"
      },
      {
        "concept": "组合/时序过程意图",
        "taughtIn": "sv-always"
      }
    ]
  },
  {
    "id": "sv-arrays",
    "title": "SystemVerilog 数组：位和元素要分清",
    "concept": [
      "logic [7:0] mem[0:3]究竟是4位，8位，还是32位？把“每个字多少位”和“有几个字”分开就不难了。",
      "名字前[7:0]表示一个8位packed字，名字后[0:3]表示4个unpacked元素，总共32位。mem[2][3:0]先选第2个字，再取低4位。改写成多维packed后，整体位串操作和元素数组操作并不完全相同，不能只移动括号位置而不检查接口。"
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
    "language": "systemverilog",
    "narrative": true,
    "furtherReading": [
      "logic [7:0] mem [0:3]是4个8位元素：前面的[7:0]为packed位向量，后面的[0:3]为unpacked元素数组。总存储位数32，但访问通常先选元素再选其中一位。",
      "mem[2][7:4]先取第2元素，再取高4位。logic [3:0][7:0] packed_mem则是多维packed，共32位可作为连续位串进行切片和算术，不能随意与unpacked交换。",
      "动态数组、队列和关联数组适合验证，通常不作为基础可综合RAM结构。固定数组的读写方式、时钟和复位决定是否推导RAM、寄存器组或常量查找逻辑。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "sv-logic",
        "vectors"
      ],
      "introduced": [
        "分清元素数量与每个元素位宽",
        "正确访问数组元素和某一位"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "位选择与切片",
        "taughtIn": "vectors"
      },
      {
        "concept": "logic声明",
        "taughtIn": "sv-logic"
      }
    ]
  },
  {
    "id": "sv-types",
    "stage": 3,
    "title": "typedef、enum、struct：给数据明确类型",
    "concept": [
      "一笔数据既有valid又有8位内容，把它们分散声明容易接错，能不能把这组含义写成一种类型？",
      "packed struct把valid放在高位、data放在低8位，整个beat_t共有9位；beat.data则按字段访问。enum同样给状态编码一个名字和类型，使IDLE/RUN/DONE比裸数字更容易追踪。类型帮助表达关系，但复位、合法状态和驱动规则仍由电路行为决定。"
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
    "language": "systemverilog",
    "narrative": true,
    "furtherReading": [
      "typedef给类型命名，enum为合法状态命名，struct把相关字段组合。state_t是2位枚举，beat_t是valid加8位data的9位packed结构。",
      "packed struct字段按声明顺序从高位往低位排列：valid在第8位，data在低8位。结构整体可以赋值或按字段访问，但不要依赖不清楚的隐式转换。",
      "enum的强类型帮助发现非法状态赋值。需要转换时应明确说明来源和合法范围，仍要在FSM处理异常状态；类型系统不替代复位与错误恢复。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "sv-arrays",
        "fsm"
      ],
      "introduced": [
        "用typedef与enum表达状态类型",
        "计算packed struct总位数"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "packed/unpacked",
        "taughtIn": "sv-arrays"
      },
      {
        "concept": "状态编码",
        "taughtIn": "fsm"
      }
    ]
  },
  {
    "id": "sv-package",
    "stage": 3,
    "title": "package、interface 与 modport：组织RTL接口",
    "concept": [
      "三个模块都需要同一个字节类型，改宽度时却只改了两处，问题会出在哪里？先把共享声明集中到一个package，再用接口把成组端口连接起来。",
      "types_pkg::byte_t表示包内类型，不是一条跨模块导线。link_if实例才包含实际valid、data和ready信号，modport从源或接收端视角限定方向。本课只把它们当“请求/允许”信号解释连接与方向，不要求掌握背压保持；完整Ready/Valid协议在后面的握手课专讲。"
    ],
    "code": "package types_pkg;\n typedef logic [7:0] byte_t;\nendpackage\ninterface link_if;\n logic valid,ready;\n types_pkg::byte_t data;\n modport source(output valid,data,input ready);\n modport sink(input valid,data,output ready);\nendinterface\nmodule link_source(input logic req,input types_pkg::byte_t payload,link_if.source bus);\n assign bus.valid=req;\n assign bus.data=payload;\nendmodule\nmodule link_sink(link_if.sink bus,output logic [7:0] observed);\n assign bus.ready=1'b1;\n assign observed=bus.data;\nendmodule\nmodule link_demo(input logic req,input logic [7:0] payload,output logic [7:0] observed);\n link_if bus();\n link_source src(.req(req),.payload(payload),.bus(bus));\n link_sink dst(.bus(bus),.observed(observed));\nendmodule",
    "notes": [
      "types_pkg::byte_t引用共享声明；包不会因被引用而自动产生一个数据寄存器。",
      "link_if bus()创建一组实际信号，模块连接的是同一份bus实例。",
      "source视图输出valid/data、读取ready；sink视图相反。方向从使用该视图的模块看。",
      "本例的ready固定为1，valid与data直接连线，只演示类型和连接；不讨论传输计数或背压保持。"
    ],
    "trap": "modport限定读写方向，不会自动插入缓存、仲裁或实现协议。先检查每个信号谁驱动、谁读取。",
    "q": "sink的ready方向是？",
    "options": [
      "input",
      "output",
      "无法确定"
    ],
    "correct": 1,
    "answer": "接收方通过输出ready告诉发送方自己能否接收。",
    "task": "从source和sink各自的视角，列出valid、ready、data的读写方向，并解释package类型与interface实例的区别。",
    "solution": "source输出valid/data、输入ready；sink相反。package给出共享类型声明，interface实例包含实际连接信号；它们都不自动实现传输协议。",
    "diagram": null,
    "context": "完整SystemVerilog编译单元；这里演示共享类型和端口方向，不实现缓存或Ready/Valid协议。",
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
    "language": "systemverilog",
    "narrative": true,
    "furtherReading": [
      "package保存类型、常量和函数，不是一份实例硬件。types_pkg::byte_t用作用域操作符引用包内类型；import types_pkg::*可导入名字，但需避免同名冲突。",
      "interface把valid/data/ready放在一起，modport从使用模块视角限制方向：source驱动valid/data读取ready，sink反向。方向声明不自动实现握手或缓存。",
      "link_demo创建一份interface并连接源与接收器。文件列表先编译package，再interface及模块。不同综合器对interface端口支持不一，受限环境可展开为普通端口并保持协议不变。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "sv-types",
        "hierarchy"
      ],
      "introduced": [
        "使用包中的共享类型",
        "按角色读懂modport方向"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "related": [],
    "conceptDependencies": [
      {
        "concept": "共享类型声明",
        "taughtIn": "sv-types"
      },
      {
        "concept": "实例与端口方向",
        "taughtIn": "module"
      }
    ]
  },
  {
    "id": "testbench",
    "stage": 4,
    "title": "测试台、时间单位与激励",
    "concept": [
      "计数器接好后，谁来产生时钟、什么时候解除复位、又由谁判断它是否加对了？这些是测试台要承担的工作。",
      "TB在下降沿改变复位和en，让它们有时间稳定到下一上升沿。三个使能沿后再到下降沿检查q=3，避开与DUT同沿活动处理的竞争。always #5是测试台的10ns周期时钟，不是可综合的片上振荡器；设计顶层与TB顶层因此要分开。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "TB顶层通常没有端口，内部reg驱动DUT输入、wire接DUT输出。initial执行一次激励序列；always #5产生10ns周期时钟，属于仿真代码而非通用可综合时钟源。",
      "`timescale 1ns/1ps表示时间单位与精度，#5对应5ns。SV也可在模块内timeunit/timeprecision声明，混用时要检查各编译单元。",
      "本例在下降沿改变复位与使能，避开DUT上升沿采样竞争。两个下降沿后解除复位，再经过三个有效上升沿，第三个后下降沿检查q应3。检查时必须在NBA更新完成后。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "module",
        "counter",
        "tool-start"
      ],
      "introduced": [
        "识别DUT与测试台的职责",
        "避免激励与采样在同一沿竞争"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "时钟边沿与复位",
        "taughtIn": "reset"
      },
      {
        "concept": "可综合设计模块",
        "taughtIn": "module"
      }
    ]
  },
  {
    "id": "scheduling",
    "title": "事件调度、delta 与竞争：同一时刻不等于同时更新",
    "concept": [
      "同一上升沿，$display和$strobe为什么可能把q打印成两个值？先把“现在读q”和“时间槽末再看q”分成两次观察。",
      "q<=d先读取d并安排更新，紧随其后的$display仍读旧q。NBA更新提交后，$strobe在时间槽末看到新值。因此时间戳一样，不代表观察发生在相同调度区域；#0也不能简单当作“等NBA全部完成”。"
    ],
    "code": "`timescale 1ns/1ps\nmodule schedule_demo;\n reg clk=0,q=0,d=1;\n always #5 clk=~clk;\n always @(posedge clk) begin\n  q<=d;\n  $display(\"active q=%b\",q);\n  $strobe(\"end-slot q=%b\",q);\n end\n initial begin #6; $finish; end\nendmodule",
    "notes": [
      "5ns沿处q<=d先读取d=1，q仍是旧0。",
      "$display在该活动处理里看到q=0。",
      "$strobe在时间槽末尾看到NBA更新后的q=1。"
    ],
    "trap": "网页阶段动画只是解释固定示例，不是完整事件调度器。",
    "q": "q原0、d=1，本例同沿display与strobe分别打印q？",
    "options": [
      "0与1",
      "1与1",
      "0与0"
    ],
    "correct": 0,
    "answer": "前者在NBA提交前，后者观察时间槽末结果。",
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
    ],
    "narrative": true,
    "furtherReading": [
      "在本例上升沿活动处理中，q<=d安排NBA更新，紧接着$display读取的q仍是旧0。NBA提交后，时间槽末的$strobe显示新1。",
      "delta cycle是零时间的事件求值轮次，组合变化可能继续触发其他过程；不是物理纳秒延时。完整SV事件区比Active/NBA更细，本课模型只解释这两个关键观察相位。",
      "多个always的活动区执行顺序不能依赖。#0通常移动到Inactive，不能当作可靠“等待NBA完成”的方法；TB用错开驱动/采样、clocking block或合适事件区避免竞争。"
    ],
    "previousCorrect": 0,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "testbench",
        "nba"
      ],
      "introduced": [
        "解释为什么在同沿立刻用if检查q可能误报。",
        "5ns沿处q<=d先读取d=1，q仍是旧0。"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "非阻塞赋值",
        "taughtIn": "nba"
      },
      {
        "concept": "测试台激励与观察相位",
        "taughtIn": "testbench"
      }
    ]
  },
  {
    "id": "checking",
    "stage": 4,
    "title": "自检、波形与第一次实际运行",
    "concept": [
      "假如DUT把加1写成加2，测试台会主动失败，还是只画出一条看起来也在递增的波形？先用这个错误检验检查器。",
      "参考值按规格独立更新，再在安全采样相位用!==比较。失败调用$fatal，卡住由超时退出。检查复位、保持和回绕后，再故意改错一次，确认原用例能拒绝它；这样波形是定位首个分歧的工具，而不是唯一的正确性证据。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "参考模型由规格写出，不照抄DUT内部实现。计数器参考状态按复位优先、en保持、固定位宽回绕更新，然后与DUT比较。",
      "波形用于定位第一个分歧，退出码用于自动回归。每次测试记录随机种子、工具版本和命令；没有失败条件的波形展示不能成为回归测试。",
      "边界至少覆盖复位与en同时有效、en=0保持、最大值回绕、再次复位。用!==捕获X/Z，用超时防TB永远挂住；错误注入应确认检查器能拒绝错误设计。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "testbench",
        "four-state"
      ],
      "introduced": [
        "写主动失败的输出检查",
        "运行仿真、看波形并故意注入错误"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "仿真调度与竞争",
        "taughtIn": "scheduling"
      },
      {
        "concept": "X/Z比较",
        "taughtIn": "four-state"
      }
    ]
  },
  {
    "id": "setup-hold",
    "stage": 5,
    "title": "建立/保持时间：边沿附近发生什么",
    "concept": [
      "捕获沿在10ns，数据9ns才变稳，能不能放心采样？如果建立时间要求2ns，沿前只留1ns显然不够。",
      "Setup要求沿前稳定，Hold要求沿后继续稳定。设setup=2ns、hold=1ns，窗口围绕10ns展开到8–11ns。理想RTL仍可能显示确定0/1，所以要在物理时序分析中检查这段窗口，不能靠给RTL加#delay来“修复”真实路径。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "setup要求捕获沿之前D已稳定足够久；hold要求沿之后D继续稳定一段时间。tCQ是发射寄存器Q响应时钟的延迟，组合传播延迟再把新数据送到下一级D。",
      "若捕获沿10ns、setup2ns、hold1ns，则D需在8到11ns之间稳定。窗口内变化说明违反该简化要求，但理想RTL可能照常输出0/1，不能据此认为真实硬件安全。",
      "时钟频率f=1/T，10ns对应100MHz。延长周期通常改善setup预算，却不直接改善同沿hold；物理修复需要工具、库和布局信息。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "edges",
        "checking"
      ],
      "introduced": [
        "标出采样前后的稳定窗口",
        "解释降频通常不能直接解决保持违例"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "DFF采样沿",
        "taughtIn": "edges"
      }
    ]
  },
  {
    "id": "timing-path",
    "stage": 5,
    "title": "寄存器路径、流水线与延迟",
    "concept": [
      "一条组合路径太长，插入一级寄存器后，第一笔结果晚了，为什么系统却可能每拍仍出一笔？分别给样本A、B、C编号看看。",
      "第一阶段保存当前输入的计算，第二阶段同沿使用旧s1，因而不同样本可以同时占据不同级。数据延迟增加，但各级可每拍接新样本时吞吐仍每拍一笔。valid和命令标签也要经过相同边界，否则正确计算可能被贴到错误事务上。",
      "例如T=10ns，clock-to-Q=1ns，组合路径6ns，setup=1ns，忽略偏斜和不确定度：数据在7ns到达，必须在9ns前稳定，因此setup裕量为2ns。若把9ns组合路径拆成4ns和5ns两段，简化最小周期由最长一段决定：1+5+1=7ns；同时增加一级寄存器，也增加一个周期的样本延迟。"
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
    ],
    "narrative": true,
    "furtherReading": [
      "单周期同域路径从发射沿出发，经tCQmax与组合max延迟，在下一捕获沿前留setup裕量。无偏斜/不确定度时：tCQmax+tcombmax+tsetup≤T。",
      "流水线把组合路径分成几段，各段加寄存器后可缩短每级最大逻辑延迟，但数据从输入到输出的周期延迟增加。吞吐可保持每拍一个，延迟与吞吐不是同一量。",
      "本例第一级存in+1，第二级用旧s1做异或，因此第1个沿后的out不包含同沿的新in。输入valid等控制也要相同级数对齐，不能只延迟数据。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "nba",
        "setup-hold"
      ],
      "introduced": [
        "算一条简化路径的建立裕量",
        "区分流水线延迟与吞吐率"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "建立/保持窗口",
        "taughtIn": "setup-hold"
      },
      {
        "concept": "跨周期样本",
        "taughtIn": "nba"
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
    "code": "// 本课先读路径预算，不使用尚未学习的SDC命令\n// Setup: T + s - tCQmax - combmax - tsetup - Usetup\n// Hold: tCQmin + combmin - s - thold - Uhold\n// s = 捕获时钟到达 - 发射时钟到达\n// 约束命令请在 FPGA 工程实践的时钟与I/O约束课学习",
    "concept": [
      "捕获寄存器的时钟比发射端晚到0.5ns，对设计是好事还是坏事？把最长路径与最短路径各算一次，你会得到不同答案。",
      "定义s=捕获到达−发射到达。下一捕获沿变成T+s，Setup多出s时间；同沿Hold却要求旧值维持到s+thold，因此更紧。这里先只读延迟、边沿和裕量数字，不提前引入SDC语法；具体命令到FPGA约束阶段再学。"
    ],
    "notes": [
      "setup slack=T+s-tCQmax-tcombmax-tsetup-Usetup。",
      "hold slack=tCQmin+tcombmin-s-thold-Uhold。只用于本课同频、同相、单周期简化模型。"
    ],
    "trap": "正偏斜为setup增加时间，却把同沿hold窗口向后推。不要把周期T加进同沿hold式，也不要用同一个典型延迟代替max/min。",
    "goals": [
      "分别计算Setup与Hold裕量",
      "解释正偏斜的两种作用"
    ],
    "q": "按s=捕获−发射定义，s增大且其他不变，对Setup/Hold的作用？",
    "options": [
      "都变松",
      "Setup变松、Hold变紧",
      "Setup变紧、Hold变松"
    ],
    "correct": 1,
    "answer": "下一捕获沿推迟有利最长路径，同沿保持要求却更严。",
    "task": "分别求建立与保持裕量。周期10ns，捕获时钟晚到0.5ns。建立检查用CQ=1ns、组合6ns、setup=1ns、不确定度0.2ns；保持检查用CQ=0.2ns、组合0.4ns、hold=0.2ns、不确定度0.1ns。",
    "solution": "setup=2.3ns；hold=-0.2ns，需要处理最短路径或时钟关系，不能只降频。",
    "terms": [
      [
        "规格",
        "约定输入、输出、时钟、复位和边界行为。"
      ]
    ],
    "context": "路径预算说明，不是Verilog模块或可执行终端命令。先核对符号与单位。",
    "minutes": 30,
    "optional": false,
    "language": "text",
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
    ],
    "narrative": true,
    "furtherReading": [
      "设发射时钟在0、捕获时钟晚到s。下一沿捕获为T+s，setup可用时间增加s；但同沿hold要求维持到s+thold，正偏斜增加最短数据路径的压力。",
      "必须分别使用max和min延迟。setup看tCQmax、combmax；hold看tCQmin、combmin。把同一“典型延时”代入两式会低估风险。",
      "不确定度包括分析采用的抖动/裕量，本页用Usetup、Uhold各自扣减slack。真实STA还考虑时钟树、CPPR、生成时钟、例外与库弧，本计算器只帮助理解符号。"
    ],
    "previousCorrect": 0,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "setup-hold",
        "timing-path"
      ],
      "introduced": [
        "分别计算Setup与Hold裕量",
        "解释正偏斜的两种作用"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "最大/最小数据路径",
        "taughtIn": "timing-path"
      },
      {
        "concept": "建立/保持检查",
        "taughtIn": "setup-hold"
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
      "目的寄存器每第三拍才允许更新，就能把任意慢路径写成“三周期”吗？还必须问：源数据在这三拍里有没有保持不变？",
      "若源在发射后保持，目的只在第三拍采样，才有可能按更晚的捕获沿分析。约束只改变工具检查的关系，不会替RTL保存源数据。先画源值与使能表，再到工程约束课核对setup/hold配对和工具支持，不能靠放宽报告掩盖功能问题。"
    ],
    "notes": [
      "en3只控制捕获，不单独证明源数据稳定。",
      "set_multicycle_path不能修复协议，错误例外可能隐藏真正的失败。"
    ],
    "trap": "把普通单周期路径也隐藏。",
    "goals": [
      "证明多周期的功能前提",
      "核对捕获边沿与Hold关系"
    ],
    "q": "目的只在第三拍使能，但源每拍都变，能只凭使能就声明安全三周期路径吗？",
    "options": [
      "能",
      "换快器件就能",
      "不能，还需核对数据稳定与采样协议"
    ],
    "correct": 2,
    "answer": "例外必须对应实际功能关系，不是仅按目的使能命名。",
    "task": "列三拍路径的数据稳定和捕获使能表；说明第二拍若源变化为何可能失效。",
    "solution": "0发射后保持数据；1/2目的禁用；3接收。源中途变化需重新核对稳定与最大路径，不能仅靠例外。",
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
    ],
    "narrative": true,
    "furtherReading": [
      "若目的寄存器只在每第三拍使能，且源数据从发射后保持到该捕获沿，才可能把该路径按三周期setup分析。en3名字本身不是证明。",
      "同频同相、常见末端使能场景中，setup N后默认hold关系也会移动，常配hold N-1恢复所需关系。必须看实际launch/capture边沿，不盲目复制其他工程命令。",
      "多周期与false path不同，前者仍检查特定接收边沿，后者排除时序检查。不能用例外消除真实不达标路径；协议、CDC及数据稳定性要独立验证。"
    ],
    "previousCorrect": 0,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "clock-skew"
      ],
      "introduced": [
        "证明多周期的功能前提",
        "核对捕获边沿与Hold关系"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "使能寄存器",
        "taughtIn": "reset"
      },
      {
        "concept": "同沿hold与跨沿setup",
        "taughtIn": "clock-skew"
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
      "一个脉冲从20ns到30ns，而目的时钟只在0、100、200ns采样。即使加两级触发器，它有机会被看到吗？",
      "没有目的沿落进高电平区间，理想采样就可能完全漏掉。双FF主要给单比特电平更多亚稳恢复时间，不是事件缓存。慢电平、快脉冲、多位数据需要不同协议；多位逐位同步还可能拼出不存在的字，不能一概套同一结构。"
    ],
    "notes": [
      "ASYNC_REG是工具相关属性，仍要遵循目标器件的布局和CDC规则。",
      "第一级meta不能扇出到功能逻辑；目的逻辑使用stable。复位释放也要满足目的域要求。"
    ],
    "trap": "第一级可能亚稳，不能扇出给功能逻辑。",
    "goals": [
      "判断双FF的适用边界",
      "为脉冲与多位数据选择协议"
    ],
    "q": "目的沿在0和100ns，脉冲只在20–30ns为高，双FF理想采样可能怎样？",
    "options": [
      "完全漏采",
      "必看到一次",
      "必变成100ns脉冲"
    ],
    "correct": 0,
    "answer": "没有目的采样机会，后级不能恢复从未采到的事件。",
    "task": "为异步慢电平设计同步链，再说明10ns窄脉冲对100ns目的周期为何可能漏掉。",
    "solution": "两级目的域DFF，首级不扇出；若脉冲在两个目的沿之间完整出现并消失，可完全漏采。",
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
    ],
    "narrative": true,
    "furtherReading": [
      "亚稳态是模拟电路现象，理想0/1回放不能模拟其恢复时间。同步链通过增加恢复时间降低失败概率，MTBF还与目的频率、输入翻转率和器件参数有关。",
      "第一级meta只驱动第二级，不用于功能判定；稳定后的stable才进入目的域逻辑。同步后变化可能晚一拍被观察，不能假定固定精确延迟。",
      "慢变化电平、窄脉冲、多位数据是三类不同问题。脉冲可能完全落在目的沿之间；多位独立同步可能不同拍到达。事件用握手/toggle且控制事件速率，多位用握手或异步FIFO。"
    ],
    "previousCorrect": 0,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "clock-skew",
        "nba"
      ],
      "introduced": [
        "判断双FF的适用边界",
        "为脉冲与多位数据选择协议"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "建立/保持窗口",
        "taughtIn": "setup-hold"
      },
      {
        "concept": "两级寄存器",
        "taughtIn": "nba"
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
      "读写两边用不同时钟，怎样知道还有多少数据可读，而不把每一位数据都各自同步一遍？先把数据通道与状态通知分开。",
      "数据保存在支持双时钟访问的存储结构中，本地二进制指针选地址，Gray指针同步给对端帮助判断满空。远端看到指针有延迟，因此标志可能保守。这里的Gray模块只演示编码，不是完整异步FIFO；首字直通还是寄存读，也仍是另需说明的接口选择。",
      "先算一次Gray：binary=0011右移得0001，异或得到0010；下一值0100右移0010，异或得0110。这两个Gray码只差一位。同步器仍不能代替跨域物理约束，指针比较也必须按具体深度与额外回绕位设计。"
    ],
    "notes": [
      "Gray=(binary>>1)^binary，相邻计数只变一位；这不取消同步链或位间偏差约束。",
      "这段只实现Gray编码，不是完整异步FIFO。真实工程应使用经过验证的IP并检查CDC、复位及约束。"
    ],
    "trap": "各位可能在不同拍完成，无法保证字一致。",
    "goals": [
      "解释数据与指针跨域路径",
      "计算Gray并说明约束边界"
    ],
    "q": "异步FIFO通常把哪类状态跨域同步给对端？",
    "options": [
      "每个数据位各自双FF",
      "寄存后的Gray指针",
      "未寄存的地址加法结果"
    ],
    "correct": 1,
    "answer": "数据经存储传递，指针用于满空判断，仍需约束和同步链。",
    "task": "列出binary0..7与Gray，并说明异步FIFO为何同步指针不逐位同步数据。",
    "solution": "000,001,011,010,110,111,101,100；数据靠受控存储转移，指针用于安全判定可读写。",
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
    ],
    "narrative": true,
    "furtherReading": [
      "写域按wr_en&&!full更新写指针，读域按rd_en&&!empty更新读指针。存储地址用低A位，指针额外一位识别绕圈；深度2^A的常见Gray方案不能直接改成任意深度。",
      "Gray相邻编码仅一位变化，发送前先寄存，接收域同步；还需约束跨域位间偏差/最大延迟，不能认为Gray无条件解决一切。远端指针同步延迟使full/empty可能保守保持。",
      "Empty在本域读指针追上同步写指针时成立；常见反射Gray Full检测需翻转对端高两位再比较，细节依指针宽度与下一状态方案。课程只编译Gray转换模块，完整双时钟FIFO优先用受验证IP并审查复位与CDC。"
    ],
    "previousCorrect": 0,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "cdc",
        "sv-arrays"
      ],
      "introduced": [
        "解释数据与指针跨域路径",
        "计算Gray并说明约束边界"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "跨域同步边界",
        "taughtIn": "cdc"
      },
      {
        "concept": "位运算与异或",
        "taughtIn": "operators"
      },
      {
        "concept": "数组存储",
        "taughtIn": "sv-arrays"
      }
    ]
  },
  {
    "id": "capstone",
    "stage": 6,
    "title": "贯穿练习：写、预测、仿真、再迁移",
    "concept": [
      "把位宽从4改到1，你的计数器和检查器还能一致工作吗？现在把前面分散学过的规则汇成一份完整规格。",
      "固定W>=1、上升沿更新、同步低有效复位优先、en=0保持、模2^W回绕。分别用W=1、3、4测试，检查器在安全相位比较预期。参数改变了范围，没改变协议；运行记录要能指出哪种参数、哪类输入已经检查过。"
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
    "language": "systemverilog",
    "narrative": true,
    "furtherReading": [
      "规格：W>=1，posedge更新，rst_n低有效同步复位优先；en=0保持，en=1模2^W加1。参数改变位宽但不改变协议。",
      "文件分counter_sv.sv、tb_counter.sv、files.f。TB在下降沿驱动，参考值独立更新，并检查复位、保持、回绕和复位优先；用W=1、3、4至少三种配置。",
      "完成标准不是“看见递增波形”，而是所有预期检查通过、故意错误会失败、综合没有意外锁存/多驱动且报告可解释。商业综合或板卡未运行时单独标注，不能用网页完成状态替代。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "parameters",
        "counter",
        "checking",
        "sv-always"
      ],
      "introduced": [
        "独立完成可复用计数器与自检",
        "让故意错误触发检查失败"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "参数展开",
        "taughtIn": "parameters"
      },
      {
        "concept": "计数器边界",
        "taughtIn": "counter"
      },
      {
        "concept": "自检失败判据",
        "taughtIn": "checking"
      }
    ]
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
      "同样计算a加上b或c，先选择再加法，与两路加完再选择，是否一定用相同资源？先把两种结构画出来。",
      "共享写法把MUX放在加法器前，并行写法把选择放到候选结果后。综合器可能继续合并或调整，实际资源与最长路径要在同一功能、器件和约束下比较。通用单元统计能帮助看结构，但不能直接当作实际工艺面积。"
    ],
    "notes": [
      "选择操作数再加法，表达共享意图。是否共享及映射结果以综合报告为准。",
      "无标准单元库时可看通用单元统计，不能冒充实际工艺面积或签核时序。"
    ],
    "trap": "延时语句不能代表可实现的路径优化。",
    "goals": [
      "从RTL推断资源并检查报告",
      "完成Lint到综合的回归闭环"
    ],
    "q": "相同功能中把MUX放到共享加法器前，最需要进一步核对什么？",
    "options": [
      "代码行数是否减少",
      "是否自动零延迟",
      "映射资源与MUX所在的关键路径"
    ],
    "correct": 2,
    "answer": "资源共享也改变路径，需同条件报告。",
    "task": "在“从RTL到门级：Lint、资源与约束闭环”中检查这个错误方案： 把#10当时序修复，再综合。写出具体修改办法与核对步骤。",
    "solution": "// 优化组合结构或加流水，再更新接口延迟",
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
    ],
    "narrative": true,
    "furtherReading": [
      "本例先用MUX选择b/c，再进入一个加法表达式。写成sel?(a+b):(a+c)也可功能等价，但综合是否共享由优化和时序目标决定，应查看实际网表与单元统计。",
      "Lint重点检查位宽截断、未驱动、多驱动、锁存、未覆盖分支和时钟复位。警告必须解释或修复，不能把零语法错误当作无结构问题。",
      "工程步骤：功能回归→lint→综合→读资源与max/min时序→核对约束→必要时流水或优化→重新回归。FPGA还需器件/引脚/时钟约束、布局布线、bitstream与板上调试。"
    ],
    "previousCorrect": 0,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "checking",
        "capstone"
      ],
      "introduced": [
        "从RTL推断资源并检查报告",
        "完成Lint到综合的回归闭环"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "RTL结构与共享运算",
        "taughtIn": "alu"
      },
      {
        "concept": "参数和generate",
        "taughtIn": "parameters"
      },
      {
        "concept": "物理路径预算",
        "taughtIn": "clock-skew"
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
      "地址2里原来是5A，同一沿写A5又读地址2，rdata应先看到哪个值？沿内先读取右值，再提交非阻塞更新，就能推出来。",
      "rdata<=mem[addr]读到旧5A，mem写入A5在稍后提交；下一沿只读时才看到A5。没有写过的地址则可能为X，不应假定自动清0。同步读、同址冲突和复位方式都影响器件RAM推断，读延迟必须成为接口的一部分。"
    ],
    "notes": [
      "没有复位或初始化的mem在四态仿真中可能为X，测试应先写再读。",
      "不要用一个大复位循环强行清RAM而又假定一定推导块RAM；通常复位有效位或控制状态。"
    ],
    "trap": "本例读取旧mem值。",
    "goals": [
      "预测同步读与同址冲突",
      "核对RAM推断的工具边界"
    ],
    "q": "地址2原5A，同沿写A5并同步读，下一沿只读，rdata两次沿后结果？",
    "options": [
      "5A、A5",
      "A5、A5",
      "0、A5"
    ],
    "correct": 0,
    "answer": "read-first语义先读旧mem，写入提交后下沿再读新值。",
    "task": "在“RAM/ROM：读延迟与读写冲突”中检查这个错误方案： 同址写后当沿期待新值。写出具体修改办法与核对步骤。",
    "solution": "// 按read-first检查；需write-first则显式旁路并核对推断",
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
    ],
    "narrative": true,
    "furtherReading": [
      "本例同一posedge先安排mem写入，再安排rdata读取旧mem，NBA读值在提交前。因此同址读写为read-first，未写地址的读取在四态仿真可为X。",
      "同步读给输出寄存器，异步读assign rdata=mem[addr]则沿间响应地址，可能映射不同资源。ROM是内容不随运行修改的表，可由case或常量初始化表达，但初始化支持取决于工具。",
      "RAM数据本身不复位，本例只在先写后读时验收数据。若应用必须清空，定义清除流程或有效位，不假定大循环复位仍推导块RAM。"
    ],
    "previousCorrect": 0,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "sv-arrays",
        "sv-always"
      ],
      "introduced": [
        "预测同步读与同址冲突",
        "核对RAM推断的工具边界"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "非阻塞读旧值",
        "taughtIn": "nba"
      },
      {
        "concept": "数组索引",
        "taughtIn": "sv-arrays"
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
      "队列非空，dout在读请求之前就是队首，还是要等成功读沿后才出现？两种FIFO都可以正确，但测试台不能混用它们的时刻。",
      "本课首字直通：!empty时沿前dout已经是队首，读沿消费它，沿后指针指向下一字。本工程选择满时同时请求只读、空时只写。FPGA扩展课的寄存读FIFO则在成功读沿后更新dout并给out_valid；同样的队列参考关系，要换正确的比较相位。",
      "本例是首字直通（FWFT）接口：非空时rdata组合指向当前队头，pop在上升沿表示消费沿前的队头。FPGA实践的fifo4使用寄存读输出，合法读请求后数据才在沿后更新。两者不能共用同一采样相位的检查器；先读清接口，再决定何时比对数据。"
    ],
    "notes": [
      "count范围0到4，需要3位，读写指针各2位自动回绕。",
      "count由一个case统一更新；有效读写同时发生时保持。dout空时未定义，不能检查其有效内容。"
    ],
    "trap": "忽略满空，且两个NBA更新可覆盖。",
    "goals": [
      "按规格实现深度4同步FIFO",
      "验证满空、并发与回绕"
    ],
    "q": "本课首字直通FIFO非空，队首在哪个时刻可作为被读字节检查？",
    "options": [
      "沿前dout已是队首，读沿消费",
      "只有读沿后dout才是刚消费字节",
      "任何空时dout都有效"
    ],
    "correct": 0,
    "answer": "读沿后指针可能已前进；寄存读FIFO的接口相位不同。",
    "task": "写独立队列TB，覆盖满/空/同时/回绕，并记录每次接受事务序号。",
    "solution": "先算wr/rd；rd时沿前比较队首；wr时追加；count应等于模型大小，复位清队列。",
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
    ],
    "narrative": true,
    "furtherReading": [
      "结构含4×8存储、2位读写指针、3位计数。接受写wr=push&&!full，接受读rd=pop&&!empty；满时同时请求只读，空时同时请求只写，不提供旁路或满替换。",
      "dout为当前队首组合读，非空时有效。读请求在沿消费当前队首后rp前进，沿后dout变下一项；TB应在消费沿前保存被读数据，不能在沿后把下一项误认作刚读项。",
      "参考模型用独立队列，先按沿前满空计算接受，再核对出队字节与更新大小。验收覆盖深度0..4、拒绝溢出/下溢、同时读写、两指针回绕、复位丢弃队列；故意错count/指针必须被抓。"
    ],
    "previousCorrect": 0,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "memory",
        "counter",
        "checking"
      ],
      "introduced": [
        "按规格实现深度4同步FIFO",
        "验证满空、并发与回绕"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "RAM读写",
        "taughtIn": "memory"
      },
      {
        "concept": "回绕计数与使能",
        "taughtIn": "counter"
      },
      {
        "concept": "独立参考检查",
        "taughtIn": "checking"
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
      "字符A5要在线上停留多久？先把一帧排成起始0、八个低位先发的数据、停止1，再给每一位标上N个系统周期。",
      "start接受时锁存frame，busy期间外部data改变不影响当前字节。计数到N-1才换下一位，停止位也要保持完整N周期后才能释放busy。先检查位序和位长，再检查忙时start、复位中断与连续两帧，避免只在结尾对一次字节。"
    ],
    "notes": [
      "frame[0]是起始，frame[1]是data[0]，frame[9]是停止。",
      "发送期间不读取外部data，保证外部数据变化不会破坏当前帧。start持续高会在下次空闲沿再发一帧，调用方需产生脉冲。"
    ],
    "trap": "外部data改变会撕裂当前帧。",
    "goals": [
      "实现8N1低位先发发送器",
      "验证帧位序和每位持续周期"
    ],
    "q": "发送接受后外部data改变，当前帧应该？",
    "options": [
      "立即改成新字节",
      "继续发送已锁存frame",
      "停止位缩短"
    ],
    "correct": 1,
    "answer": "完整帧要来自同一接受时刻的字节快照。",
    "task": "在“项目二：UART 8N1发送与自检”中检查这个错误方案：tx<=data[bitno]; // 发送中读外部data。写出具体修改办法与核对步骤。",
    "solution": "// start时先锁存frame，后续从frame取位",
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
    ],
    "narrative": true,
    "furtherReading": [
      "data=A5时线上帧为0、1、0、1、0、0、1、0、1、1，第一位起始，最后停止。frame在start接受沿锁存，busy期间即使外部data改变也不影响这一帧。",
      "接受沿立即拉tx为0，计数tick从0开始；每N个周期切到下一个bit，停止位保持完整N周期后busy清0。参数N>=1；非整数分频要单独设计波特率发生器。",
      "TB检查空闲高、10位顺序、每位N周期、busy期间忽略start、发送中复位、连续两帧。把N小化为1/4加速回归；该课是发送器，接收器过采样与误差容限复用FPGA进阶实践。"
    ],
    "previousCorrect": 0,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "fsm",
        "counter",
        "checking"
      ],
      "introduced": [
        "实现8N1低位先发发送器",
        "验证帧位序和每位持续周期"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "移位与逐拍状态",
        "taughtIn": "shift-pulse"
      },
      {
        "concept": "状态机",
        "taughtIn": "fsm"
      },
      {
        "concept": "自检与超时",
        "taughtIn": "checking"
      }
    ]
  },
  {
    "id": "sv-handshake",
    "title": "Ready / Valid：传输、背压与保持",
    "concept": [
      "valid已经拉高三拍，究竟传了三笔还是一笔？还要把每个采样沿的ready写在旁边。",
      "只有valid&&ready的沿才接受一笔。ready=0时源必须保持当前valid和data，不能因为“已经举手”就换下一字节。此前interface只说明谁驱动哪些信号，这里才给出握手的行为约定；协议不会自动提供缓存，也不自动解决跨时钟域。"
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
    "language": "systemverilog",
    "narrative": true,
    "furtherReading": [
      "valid表示源有有效data，ready表示接收端能接收；只有采样沿两者都1才发生一次传输。连续两个沿都11表示两次，不是一次脉冲。",
      "源在valid=1、ready=0时保持valid和data，直到被接受。源不应等待ready才开始提出valid，否则与等待valid的接收端可能互等。",
      "协议只定义接收条件，不自带CDC能力。两个信号必须处于约定的同一时钟域；背压可能形成长ready组合链，工程中可用弹性寄存器切分。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "checking",
        "sv-always"
      ],
      "introduced": [
        "逐沿判断一次有效传输",
        "解释背压时为何必须保持数据"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "同沿采样",
        "taughtIn": "nba"
      },
      {
        "concept": "使能与保持",
        "taughtIn": "reset"
      }
    ]
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
      "一格缓冲装着A，下游这一沿拿走A，同时上游递来B，能不能原地换成B而不空一拍？",
      "当本格为空，或下游准备消费旧值时，都有空间接收，所以s_ready=!m_valid||m_ready。背压时m_valid=1且m_ready=0，寄存器保持；同沿消费与替换时，则保存B并维持有效。把这张接受表写清，再接FIFO和UART，才知道在哪里计数一笔事务。"
    ],
    "notes": [
      "s_ready在本级为空或下游接收时为1，允许替换旧拍。",
      "下游背压时m_valid=1,m_ready=0，此时s_ready=0，m_data保持；注意长ready组合链的时序。"
    ],
    "trap": "下游不ready时仍覆盖旧有效数据。",
    "goals": [
      "实现背压下保持的弹性寄存器",
      "用事务检查证明集成不丢不重"
    ],
    "q": "本级保存A，下游本沿接收，同时上游送B且握手成立，沿后？",
    "options": [
      "丢B",
      "仍A",
      "保存B且有效"
    ],
    "correct": 2,
    "answer": "旧值消费和新值装入可在同沿完成。",
    "task": "把输入字节队列接FIFO再接UART，提交接口表、背压测试、复位策略和端到端顺序检查。",
    "solution": "输入只在握手接受；UART start在空闲且队列非空时脉冲；参考队列逐字节比较发送帧，不丢不重。",
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
    ],
    "narrative": true,
    "furtherReading": [
      "rv_register只有一拍容量，本级空或下游准备接收时s_ready为1。m_valid=1且m_ready=0时冻结状态，保证背压不破坏数据。",
      "同沿下游接受旧拍且上游提供新拍，可保持m_valid并替换数据，实现一拍一笔。复位优先清有效性，m_data清零只是本例选择，接收端不得在m_valid=0时使用数据。",
      "项目交付按规格→结构→RTL→参考模型→定向/随机测试→lint/综合→约束→板上验收。FIFO到UART的消费条件应是非空且UART空闲，发送start只持续一个接受周期；检查字节顺序、数量和复位丢弃策略。"
    ],
    "previousCorrect": 0,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "fifo-project",
        "uart-project",
        "sv-handshake",
        "synthesis-lab"
      ],
      "introduced": [
        "实现背压下保持的弹性寄存器",
        "用事务检查证明集成不丢不重"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "首字直通FIFO接口",
        "taughtIn": "fifo-project"
      },
      {
        "concept": "有效/就绪传输条件",
        "taughtIn": "sv-handshake"
      },
      {
        "concept": "串口忙闲接口",
        "taughtIn": "uart-project"
      }
    ]
  },
  {
    "id": "sv-tasks",
    "title": "选修：用 task 和队列组织测试",
    "concept": [
      "测试台反复需要打一拍en，封装成task后是不是就不必再管驱动时刻？恰恰要把等待哪个沿写进接口习惯。",
      "automatic隔离每次调用的局部变量，却不替两个任务仲裁同一个en信号。参考队列也要按接受事件入队、按输出出队；若输出出现时队列为空，应该报告多余输出，而不是悄悄跳过比较。"
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
    "language": "systemverilog",
    "narrative": true,
    "furtherReading": [
      "task可以包含事件等待和多个output/inout，适合TB事务。pulse_enable等下降沿再驱动en，调用方会等待任务完成；它不是自动产生一份可综合时钟逻辑。",
      "automatic让并发调用的局部变量互不覆盖。共享的DUT输入仍需唯一驱动者；两个自动任务同时写en依然会竞争，局部独立不代表接口仲裁完成。",
      "队列expected[$]动态保存预期，push_back入队、pop_front出队。出队前检查size()>0，空队列不代表可以跳过DUT多余输出，应把无预期却输出视为失败。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "checking"
      ],
      "introduced": [
        "用task安排测试激励",
        "正确操作期望值队列"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "安全驱动与采样相位",
        "taughtIn": "scheduling"
      },
      {
        "concept": "函数与task边界",
        "taughtIn": "hierarchy"
      },
      {
        "concept": "自检比较",
        "taughtIn": "checking"
      }
    ]
  },
  {
    "id": "sv-verification",
    "stage": 7,
    "title": "选修：class、约束与随机输入",
    "concept": [
      "随机十次0到9，能保证十个值都出现吗？很可能有重复，所以“输入随机过”还不能说明边界已经覆盖。",
      "rand字段由约束求解，inside限定合法集合，randomize的返回值告诉我们本次是否成功。先给0和9定向用例，再记录种子与每个值的命中情况。求解器不受支持时明确改用其他激励，不能把没执行的约束写成通过。"
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
    "language": "systemverilog",
    "narrative": true,
    "furtherReading": [
      "class item定义事务，t只是句柄；new创建对象。rand位可由约束求解器赋值，constraint限制合法空间，randomize返回成功与否，必须检查返回值。",
      "value inside {[0:9]}表示闭区间0到9，不保证一次测试遍历全部值。固定种子用于重现失败，定向边界测试应先覆盖0、9及协议边界，而不是等随机碰到。",
      "约束随机和class不用于基础RTL综合，部分开源模拟器不支持完整求解。若工具不支持，应使用明确的定向激励或受控伪随机TB，并说明覆盖差异，不能伪称求解成功。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "sv-tasks",
        "sv-logic"
      ],
      "introduced": [
        "区分类、句柄和对象",
        "检查随机化返回值和约束边界"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "定向边界检查",
        "taughtIn": "checking"
      },
      {
        "concept": "类型与字段",
        "taughtIn": "sv-types"
      }
    ]
  },
  {
    "id": "sv-assert",
    "stage": 7,
    "title": "选修：断言与覆盖的采样语义",
    "concept": [
      "同步复位这个沿才把q清0，为什么同沿断言仍可能读到旧q？先在图上标“断言采样”和“NBA提交”两个位置。",
      "并发性质按约定的时钟采样值判断。|->把后件放在同一采样周期，|=>放到下一周期；因此例子用下一采样沿检查前一沿复位提交的结果。先写清采样时间，再加disable iff或$past的初态保护，不能只凭箭头形状猜延迟。"
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
    "language": "systemverilog",
    "narrative": true,
    "furtherReading": [
      "并发SVA在时钟事件采样，常用前置采样值而不是NBA提交后的新值。|->是同周期重叠蕴含，|=>是下一周期非重叠蕴含；先画出采样沿，再写性质。",
      "本例同步复位在本沿使q清0，检查|=>在下一采样沿看到上沿提交的结果。若直接同沿|->检查q可能看到旧q而误报；要依据采样区域设计性质。",
      "disable iff常用于异步禁用性质检查，它和把复位写在时钟采样条件里语义不同。cover property表示场景发生过，不代表assert全通过；功能覆盖点也需要对应规格与检查器。"
    ],
    "quizRevision": 1,
    "conceptReview": {
      "prior": [
        "sv-always",
        "checking"
      ],
      "introduced": [
        "解释非重叠蕴含的采样点",
        "区分性质检查与场景覆盖"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "采样调度",
        "taughtIn": "scheduling"
      },
      {
        "concept": "背压保持条件",
        "taughtIn": "sv-handshake"
      }
    ]
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
      "测试命中了所有覆盖点，DUT却仍可能有错，缺的是什么？覆盖告诉我们发生过哪些场景，检查器才判断那些场景的结果对不对。",
      "先把规格拆成激励、预期与覆盖关系，再用框架组织规模。UVM中的driver、monitor和scoreboard服务于这件事，不是初学RTL的门槛。总线和ASIC流程也沿用同样习惯：明确协议与约束，再讨论性能、资源和物理实现结果。"
    ],
    "notes": [
      "总线学习从单次事务与背压开始，再加入多笔在途、排序和错误响应。",
      "功耗近似关系Pdynamic≈αCV²f只能解释趋势；必须考虑实际活动率、库、布局与时序后比较。"
    ],
    "trap": "覆盖计划可能遗漏规格，检查器也可能错。",
    "goals": [
      "建立规格到覆盖的验证计划",
      "说明UVM、ASIC与PPA学习边界"
    ],
    "q": "覆盖点全部命中但输出错误未被检查，能宣称功能正确吗？",
    "options": [
      "不能，覆盖与结果检查不同",
      "能，覆盖等于证明",
      "只有换UVM才能通过"
    ],
    "correct": 0,
    "answer": "激励命中不证明检查器正确或规格完整。",
    "task": "为FIFO写功能覆盖矩阵，列空/满/同时/回绕/复位交叉，并对应检查器。",
    "solution": "每条场景要有预期与比对，未命中保留待办，不能仅计输入次数。",
    "terms": [
      [
        "规格",
        "约定输入、输出、时钟、复位和边界行为。"
      ]
    ],
    "context": "这是后续专题的学习提纲与检查思路，不是完整Verilog模块。先分清检查器证明什么，再按兴趣选择深入方向。",
    "minutes": 30,
    "optional": true,
    "language": "text",
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
    ],
    "narrative": true,
    "furtherReading": [
      "覆盖率驱动验证先从规格列功能点与交叉条件，再写激励命中它们并配对应检查器。代码覆盖看分支是否执行，功能覆盖看规格场景是否出现，两者不能互相替代。",
      "UVM用agent/driver/monitor/sequence/scoreboard等组件组织大规模验证。先能写独立参考模型和事务检查，再学习框架；不需要为了简单计数器引入完整UVM。",
      "总线协议需研究握手、地址/数据通道、响应、突发及排序。ASIC从RTL综合继续到DFT、布局布线、CTS、寄生提取、STA及物理签核；PPA比较必须同功能、同库、同约束，并保留活动率假设。"
    ],
    "previousCorrect": 0,
    "quizRevision": 2,
    "conceptReview": {
      "prior": [
        "sv-assert",
        "sv-verification",
        "integration"
      ],
      "introduced": [
        "建立规格到覆盖的验证计划",
        "说明UVM、ASIC与PPA学习边界"
      ],
      "exerciseScope": "见docs/LESSON_QUALITY_MATRIX.md逐课语义审查"
    },
    "conceptDependencies": [
      {
        "concept": "检查器与通过标准",
        "taughtIn": "checking"
      },
      {
        "concept": "断言/覆盖用途",
        "taughtIn": "sv-assert"
      }
    ]
  }
];
