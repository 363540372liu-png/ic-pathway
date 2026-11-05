(()=>{const data={
  "orientation": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "规格",
        "输入/输出/边界",
        "决定验收条件"
      ],
      [
        "RTL",
        "门与状态更新",
        "通常可综合"
      ],
      [
        "TB",
        "激励与检查",
        "仿真专用"
      ],
      [
        "报告",
        "资源/时序",
        "来自真实工具"
      ]
    ],
    "bug": {
      "wrong": "// 看见绿色就认为所有RTL都正确",
      "why": "封闭模型没有执行任意代码，不能覆盖真实工程。",
      "fix": "// 列出规格、输入、预期、工具和实际结果",
      "test": "先对两个开关的4种组合逐项写预期。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "两个开关都打开灯才亮。a=1、b=0时，灯的输出？",
        "options": [
          "0",
          "1",
          "无法确定"
        ],
        "correct": 0,
        "explain": "b没有打开，“两个都打开”的条件不成立。",
        "kind": "choice",
        "revision": 2,
        "objective": "知道输入、规则、输出是什么",
        "reviewSection": "study-concept",
        "hint": "别急着把后面的工程工具一次装完。先按路径学，工具起步课只需验证编译器可用。",
        "objectiveId": "orientation-task-1"
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "把开关规则写成四行输出：a/b=00、01、10、11。",
        "accepted": [
          "0,0,0,1"
        ],
        "explain": "只有两个开关都为1灯才亮。",
        "objective": "知道每课怎样学，核心主线在哪里结束",
        "reviewSection": "study-concept",
        "hint": "别急着把后面的工程工具一次装完。先按路径学，工具起步课只需验证编译器可用。",
        "objectiveId": "orientation-task-2"
      }
    ],
    "lines": {
      "2": "a和b是两个可以分别改变的开关；先列00、01、10、11四种输入，避免只试灯亮的情况。",
      "3": "“都”要求a=1且b=1。只打开a时仍不满足，输出必须为0。",
      "4": "y记录灯的逻辑状态，0/1是本题约定，不要求先理解LED引脚电压。"
    },
    "lineSources": {
      "2": "// 输入：开关 a、开关 b",
      "3": "// 规则：两个开关都打开，灯才亮",
      "4": "// 输出：灯 y（0=灭，1=亮）"
    }
  },
  "numbers": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "4'b1010",
        "4位二进制",
        "值10"
      ],
      [
        "8'hA5",
        "8位十六进制",
        "值165"
      ],
      [
        "4'hA",
        "A表示十进制10",
        "一位十六进制对应四个二进制位"
      ],
      [
        "1 byte",
        "8 bit",
        "不是8种值"
      ]
    ],
    "bug": {
      "wrong": "4'd16",
      "why": "16写成二进制10000要5位。4位只能保留0000；问题在位数不够，不在十进制写法。",
      "fix": "5'd16",
      "test": "写出15和16的二进制，再数需要几位。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "8位无符号最大值是多少？",
        "options": [
          "256",
          "8",
          "255"
        ],
        "correct": 2,
        "explain": "2^8-1=255。",
        "kind": "choice",
        "revision": 2,
        "objective": "读懂定宽二/十/十六进制常量",
        "reviewSection": "study-concept",
        "hint": "不要用“有16种组合”推出最大值16；0也占一种。",
        "objectiveId": "numbers-task-1"
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "把十进制13写成四位二进制，不加进制前缀。",
        "accepted": [
          "1101"
        ],
        "explain": "8+4+1=13。",
        "objective": "手算位权、最大值与截断",
        "reviewSection": "study-concept",
        "hint": "不要用“有16种组合”推出最大值16；0也占一种。",
        "objectiveId": "numbers-task-2"
      }
    ],
    "lines": {
      "1": "最高位代表8，随后是4、2、1；位的位置决定权重，不是每个1都只算一。",
      "2": "1010中只有8和2的位为1，因此相加为10；中间的0占位但不增加数值。",
      "3": "4表示保留4位，b/d/h分别选择二、十、十六进制。A代表十进制10，不是变量名。",
      "4": "4位最大为8+4+2+1=15。16的二进制10000需要第5位；丢掉高位会留下0000。"
    },
    "lineSources": {
      "1": "// 4位数的位权，从左到右：8、4、2、1",
      "2": "// 1010 = 8 + 0 + 2 + 0 = 10",
      "3": "// 4'b1010、4'd10、4'hA 表示同一个4位数",
      "4": "// 1111 = 15；10000需要5位才能保留"
    }
  },
  "logic-gates": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "a & b",
        "逐位与",
        "每位分别计算"
      ],
      [
        "a | b",
        "逐位或",
        "任一为1"
      ],
      [
        "a ^ b",
        "逐位异或",
        "不同为1"
      ],
      [
        "~a",
        "逐位非",
        "不是逻辑!"
      ]
    ],
    "bug": {
      "wrong": "a=1、b=1 → 异或输出1",
      "why": "这里把或门与异或门混淆了。或门允许两输入同为1；异或只在两者不同时输出1。",
      "fix": "a=1、b=1 → 异或输出0",
      "test": "把00、01、10、11全部列出，对比或门与异或门。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "1与0的异或结果？",
        "options": [
          "X",
          "1",
          "0"
        ],
        "correct": 1,
        "explain": "两输入不同。",
        "kind": "choice",
        "revision": 2,
        "objective": "列全两个输入的四种组合",
        "reviewSection": "study-concept",
        "hint": "本课只讨论单比特；多位信号的逐位与和逻辑与会在运算符课区分。",
        "objectiveId": "logic-gates-task-1"
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "依次输入00、01、10、11，填写异或的四个输出。",
        "accepted": [
          "0,1,1,0"
        ],
        "explain": "不同为1，相同为0。",
        "objective": "区分与、或、非和异或",
        "reviewSection": "study-concept",
        "hint": "本课只讨论单比特；多位信号的逐位与和逻辑与会在运算符课区分。",
        "objectiveId": "logic-gates-task-2"
      }
    ],
    "hardware": "gates",
    "lines": {
      "2": "两个输入都是0：没有任何条件成立，与、或、异或都输出0。",
      "3": "只有b为1：与要求两者都为1所以为0；或与异或都为1。",
      "5": "两个输入都是1：与、或为1，但异或要求两者不同，所以为0。"
    },
    "lineSources": {
      "2": "// 0 0 |   0    |  0    |    0",
      "3": "// 0 1 |   0    |  1    |    1",
      "5": "// 1 1 |   1    |  1    |    0"
    }
  },
  "boolean-decoder": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "2→4",
        "2位地址",
        "4条选择输出"
      ],
      [
        "独热",
        "最多一位为1",
        "en=0允许全0"
      ],
      [
        "德摩根",
        "先交换与/或再各自取反",
        "括号不能省"
      ],
      [
        "译码与MUX",
        "产生选择/选择数据",
        "功能不同"
      ]
    ],
    "bug": {
      "wrong": "y[2] = a[1] & ~a[0];",
      "why": "漏掉en，地址10时即使en=0仍点亮输出2。这里先读逻辑式，不要求尚未讲解的移位或条件运算符。",
      "fix": "y[2] = en & a[1] & ~a[0];",
      "test": "分别取a=10且en=0/1，输出2应依次为0/1。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "en=1,a=10时y？",
        "options": [
          "4'b0100",
          "4'b0010",
          "4'b1010"
        ],
        "correct": 0,
        "explain": "编号2选择第2位。",
        "kind": "choice",
        "revision": 2,
        "objective": "从真值表写出译码器",
        "reviewSection": "study-concept",
        "hint": "漏掉en，地址10时即使en=0仍点亮输出2。这里先读逻辑式，不要求尚未讲解的移位或条件运算符。",
        "objectiveId": "boolean-decoder-task-1"
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "en=1，地址依次00、01、10、11，填写4位译码输出。",
        "accepted": [
          "0001,0010,0100,1000"
        ],
        "explain": "地址n只点亮输出位n。",
        "objective": "用德摩根律验证等价表达式",
        "reviewSection": "study-concept",
        "hint": "漏掉en，地址10时即使en=0仍点亮输出2。这里先读逻辑式，不要求尚未讲解的移位或条件运算符。",
        "objectiveId": "boolean-decoder-task-2"
      }
    ],
    "hardware": "gates",
    "lines": {
      "1": "a1是两位地址中的高位，a0是低位；二进制10选编号2，不是编号10。",
      "2": "使能关闭时，任何地址都不应点亮输出。四个0覆盖四根输出线。",
      "4": "地址10时只有y2为1，地址11时只有y3为1；输出不是地址值本身。",
      "5": "选中00要同时满足en为1、a1为0、a0为0。把三个条件相与得到y0。"
    },
    "lineSources": {
      "1": "// 输入：使能en，以及两位地址a1、a0",
      "2": "// en=0：y3 y2 y1 y0 = 0000",
      "4": "// en=1，地址10：0100；11：1000",
      "5": "// y0 = en 与 非a1 与 非a0"
    }
  },
  "mindset": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "assign",
        "持续驱动",
        "不是调用一次"
      ],
      [
        "always",
        "事件触发的过程",
        "并发过程之一"
      ],
      [
        "实例",
        "一份硬件层次",
        "不是函数调用"
      ],
      [
        "寄存器",
        "跨沿保存状态",
        "组合逻辑没有这种记忆"
      ]
    ],
    "bug": {
      "wrong": "// 认为y先算完z才开始",
      "why": "并行电路没有这种源代码行间时间保证。",
      "fix": "// 分别写y(a,b)和z(a,b)的真值表",
      "test": "同一输入变化下检查两路输出。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "把两条互不依赖的电路关系写成相反顺序，物理功能怎样？",
        "options": [
          "输出晚一拍",
          "电路停止",
          "组合功能不变"
        ],
        "correct": 2,
        "explain": "它们描述同时存在的门电路，不是按源码先后运行的程序。",
        "kind": "choice",
        "revision": 2,
        "objective": "把两条assign理解成并行电路",
        "reviewSection": "study-concept",
        "hint": "不要把 HDL 当作普通程序从第一行一直运行到最后一行。",
        "objectiveId": "mindset-task-1"
      },
      {
        "kind": "fill",
        "type": "逻辑式补全",
        "revision": 3,
        "prompt": "不用写模块：两个一位开关必须同时为1才亮，选择与运算符填入关系式。",
        "template": "y = a ___ b   // 与门逻辑式",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "&"
            ]
          }
        ],
        "explain": "逻辑关系是逐位与；此处不要求完整模块。",
        "objective": "区分组合关系和保存状态",
        "reviewSection": "study-code",
        "hint": "不要把 HDL 当作普通程序从第一行一直运行到最后一行。",
        "objectiveId": "mindset-task-2"
      },
      {
        "type": "解释与应用",
        "prompt": "画出y=a&b、z=a|b的两路电路，并写所有输入对应的(y,z)。",
        "starter": "00→\n01→\n10→\n11→",
        "solution": "00→00；01→01；10→01；11→11。",
        "kind": "analysis",
        "revision": 2,
        "interface": "00→\n01→\n10→\n11→",
        "tests": [
          "按00、01、10、11枚举；(与,或)分别为(0,0)、(0,1)、(0,1)、(1,1)。"
        ],
        "objective": "区分组合关系和保存状态",
        "reviewSection": "study-concept",
        "hint": "不要把 HDL 当作普通程序从第一行一直运行到最后一行。",
        "objectiveId": "mindset-task-3"
      },
      {
        "type": "情境分析",
        "prompt": "a=1，b从0到1，两输出从什么变成什么？",
        "options": [
          "必须等时钟",
          "(0,1)到(1,1)",
          "(1,0)到(1,1)"
        ],
        "correct": 1,
        "explain": "都是组合关系。",
        "kind": "choice",
        "revision": 2,
        "objective": "区分组合关系和保存状态",
        "reviewSection": "study-concept",
        "hint": "不要把 HDL 当作普通程序从第一行一直运行到最后一行。",
        "objectiveId": "mindset-task-4"
      }
    ],
    "hardware": "gates",
    "lines": {
      "2": "y只要求两个输入都为1，不读取z。两条关系不存在软件变量更新的先后依赖。",
      "3": "z在任意一个输入为1时为1，它和y使用同一组输入，但走不同的逻辑门。",
      "4": "a=1,b=0时两条电路关系同时成立：y灭、z亮。写在下面的z不需要等y算完。"
    },
    "lineSources": {
      "2": "// y = a 与 b",
      "3": "// z = a 或 b",
      "4": "// a=1、b=0：y=0，同时z=1"
    }
  },
  "storage": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "组合",
        "任何输入变化求值",
        "不保存旧输出"
      ],
      [
        "锁存",
        "有效电平期间跟随",
        "关闭时保持"
      ],
      [
        "DFF",
        "有效边沿采样",
        "沿间保持"
      ],
      [
        "寄存器组",
        "多位DFF共享时钟",
        "每位仍独立采样和保存"
      ]
    ],
    "bug": {
      "wrong": "只要clk是高电平，DFF的Q就一直跟随D",
      "why": "把有效电平与有效边沿混为一谈了。高有效透明锁存器才在打开期间跟随输入。",
      "fix": "上升沿DFF只在0→1时采D；之后clk保持高电平，Q保持已采到的值",
      "test": "先给一个D=1的上升沿，再保持clk=1把D改0；DFF的Q仍为1。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "gate=1时D变化，透明锁存Q？",
        "options": [
          "必须等待上升沿",
          "始终0",
          "跟随D"
        ],
        "correct": 2,
        "explain": "使能电平内透明。",
        "kind": "choice",
        "revision": 2,
        "objective": "比较锁存器与DFF采样的时间条件。",
        "reviewSection": "study-concept",
        "hint": "高电平持续一段时间不等于出现多个上升沿。锁存器透明窗口和DFF采样瞬间要分开判断。",
        "objectiveId": "storage-task-1"
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "初Q=0。第二列为上升沿后，第三列只是D改变，clk仍高。 请按时间先后填写题目所问的输出序列，用逗号分隔。观察第二、第三列Q。",
        "accepted": [
          "1,1"
        ],
        "explain": "第二次变化没有触发采样，DFF保持1。",
        "wave": {
          "signals": [
            [
              "clk",
              [
                0,
                1,
                1
              ]
            ],
            [
              "D",
              [
                1,
                1,
                0
              ]
            ],
            [
              "Q",
              [
                0,
                1,
                1
              ]
            ]
          ],
          "caption": "初Q=0。第二列为上升沿后，第三列只是D改变，clk仍高。"
        },
        "objective": "先判断有没有“保持过去”的要求。",
        "reviewSection": "study-concept",
        "hint": "高电平持续一段时间不等于出现多个上升沿。锁存器透明窗口和DFF采样瞬间要分开判断。",
        "objectiveId": "storage-task-2"
      }
    ],
    "hardware": "dff",
    "lines": {
      "2": "en=0时MUX仍有明确输入0可选择；它不必记忆之前的d。",
      "3": "en=1的整个区间内d变化会影响q；en变0后，q才保留关闭前的值。",
      "4": "clk从0到1的那一瞬间采d，时钟持续为1时不继续跟随。这正是触发器与锁存器的区别。"
    },
    "lineSources": {
      "2": "// 组合MUX：en=1选d，否则选固定0",
      "3": "// 锁存器：en=1跟随d，否则保存上次值",
      "4": "// DFF：仅在clk上升沿保存d"
    }
  },
  "module": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "module / endmodule",
        "圈定一份电路定义",
        "定义名可被多个实例复用"
      ],
      [
        "input / output wire",
        "从本模块视角规定方向，并命名信号连接",
        "wire不自行产生值"
      ],
      [
        "assign y = a & b;",
        "用两个一位输入的与持续驱动输出",
        "无时钟、无存储"
      ],
      [
        "and2 u_pair(.a(x))",
        "and2是模块类型；u_pair是实例；a接父层x",
        "命名映射的次序不影响连线"
      ]
    ],
    "bug": {
      "wrong": "and2 u_and(x,z);",
      "why": "漏接输出且位置端口易混淆。",
      "fix": "and2 u_and(.a(x),.b(z),.y(result));",
      "test": "编译顶层并枚举x,z四种组合。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "and2 u_pair(...)中，and2与u_pair分别是什么？",
        "options": [
          "电路定义类型与这份实例的名字",
          "两个输入端口",
          "两个顺序执行的函数"
        ],
        "correct": 0,
        "explain": "and2是可复用的定义，u_pair命名父模块中这一份电路。",
        "kind": "choice",
        "revision": 2,
        "objective": "区分模块类型与实例名",
        "reviewSection": "study-concept",
        "hint": "按位置连接容易接反；入门阶段优先命名连接。",
        "objectiveId": "module-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "先完成一份完整与门：a、b输入，y输出。补齐定义起止与连续赋值，四组输入只有11亮灯。",
        "template": "___ and2(input wire a,b,output wire y);\n  ___ y = a & b;\n___",
        "blanks": [
          {
            "label": "定义开始",
            "accepted": [
              "module"
            ]
          },
          {
            "label": "持续驱动",
            "accepted": [
              "assign"
            ]
          },
          {
            "label": "定义结束",
            "accepted": [
              "endmodule"
            ]
          }
        ],
        "explain": "module开始and2定义；assign用与关系持续驱动y；endmodule结束定义。三个元素齐全才是完整与门，00/01/10/11只有最后一组输出1。",
        "objective": "独立补齐与门的定义与连续赋值",
        "reviewSection": "study-code",
        "hint": "先圈出模块的开始和结束，再找哪一行持续驱动输出。",
        "objectiveId": "module-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "父模块已声明input wire p,q和output wire lamp；and2定义与正文相同。只修改下面的实例语句。",
        "starter": "and2 u_lamp(.a(p),.b(p),.y(lamp));",
        "accepted": [
          "and2 u_lamp(.a(p),.b(q),.y(lamp));"
        ],
        "solution": "and2 u_lamp(.a(p),.b(q),.y(lamp));",
        "explain": "灯应为p与q，错误代码却把两个输入都接p。p=1,q=0时会错误亮灯。",
        "hint": "画出两个输入端口各自应接的父层信号。",
        "context": "父模块已声明input wire p,q和output wire lamp；and2定义与正文相同。只修改下面的实例语句。",
        "requireReason": true,
        "objective": "按命名端口修复父子信号连接",
        "reviewSection": "study-code",
        "objectiveId": "module-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "先不看参考，独立写出or2；再用两个and2连接出result=x & z & enable。写完整顶层并画出pair。",
        "starter": "module top(input wire x,z,enable,output wire result);\nendmodule",
        "solution": "module or2(input wire a,b,output wire y);\n assign y=a|b;\nendmodule\nmodule top(input wire x,z,enable,output wire result);\n wire pair;\n and2 first(.a(x),.b(z),.y(pair));\n and2 second(.a(pair),.b(enable),.y(result));\nendmodule",
        "kind": "implementation",
        "revision": 3,
        "interface": "// or2: input wire a,b; output wire y\nmodule top(input wire x,z,enable,output wire result);\nendmodule",
        "tests": [
          "or2枚举00/01/10/11，预期0/1/1/1",
          "top枚举000..111，仅111输出1",
          "x=z=1时只改变enable，应观察pair保持1而result跟随enable"
        ],
        "objective": "独立编写逻辑并连接多个实例",
        "reviewSection": "study-code",
        "hint": "按位置连接容易接反；入门阶段优先命名连接。",
        "objectiveId": "module-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "顶层x=z=1，enable依次0、1、0，result应怎样变化？",
        "options": [
          "1,1,0",
          "等时钟",
          "0,1,0"
        ],
        "correct": 2,
        "explain": "pair恒为1，u_mask随enable计算1与enable，输出0、1、0。",
        "kind": "choice",
        "revision": 2,
        "objective": "逐输入推导多级组合输出",
        "reviewSection": "study-concept",
        "hint": "按位置连接容易接反；入门阶段优先命名连接。",
        "objectiveId": "module-task-5"
      }
    ],
    "lines": {
      "1": "and2给这份电路定义命名。a、b从外面进入，y向外输出；每个wire是一位连接。括号后分号结束接口声明。",
      "2": "&把a、b做按位与；本例都是一位。assign持续驱动y，所以a从0变1时就会重新求值，不必等时钟。",
      "3": "endmodule结束and2的定义。后面的top是另一个模块，不是and2内部的顺序程序。",
      "4": "top是父模块，enable是第三个输入。我们要把两份and2放入其中，得到三输入与关系。",
      "5": "pair是父模块内部连接，不是外部端口。第一份子模块驱动它，第二份读取它；不要再用另一个assign重复驱动。",
      "6": "and2是类型，u_pair是实例名称。.a(x)把子模块a接父层x；.y(pair)把输出引到内部线。命名连接顺序可以改变。",
      "7": "u_mask是另一份and2实例。它读取pair和enable，驱动result。enable=0时即便pair=1，result仍为0。"
    },
    "sequence": [
      {
        "title": "先遮住答案：写出一个与门",
        "text": "输入a、b都是一位，输出y为一位。先写模块边界，再写端口，最后把已经会的与关系放到assign中。",
        "code": "module and2(input wire a, b, output wire y);\n  assign y = a & b;\nendmodule"
      },
      {
        "title": "只改规则，不改接口",
        "text": "把模块名改成or2，&改成|；再写xor2，使用^。两种新电路在a=b=1时分别输出1和0。端口方向、wire和分号都沿用刚才的结构。",
        "code": "module xor2(input wire a, b, output wire y);\n  assign y = a ^ b;\nendmodule"
      },
      {
        "title": "只放一个实例",
        "text": "top输入x、z，输出result；它不需要再写assign。子模块输出本身就是result的驱动源。先画a接x、b接z、y接result三根线，再写实例。",
        "code": "module one_gate(input wire x,z,output wire result);\n  and2 u1(.a(x), .b(z), .y(result));\nendmodule"
      }
    ],
    "prediction": {
      "question": "x=1、z=0、enable=1，不先点按钮，预测pair与result。",
      "answer": "pair=0、result=0。第一份与门已经把pair置0，第二份再与1仍是0。"
    },
    "lineSources": {
      "1": "module and2(input wire a, input wire b, output wire y);",
      "2": "  assign y = a & b;",
      "3": "endmodule",
      "4": "module top(input wire x, z, enable, output wire result);",
      "5": "  wire pair;",
      "6": "  and2 u_pair(.a(x), .b(z), .y(pair));",
      "7": "  and2 u_mask(.a(pair), .b(enable), .y(result));"
    }
  },
  "tool-start": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "iverilog",
        "编译器",
        "须安装"
      ],
      [
        "-g2012",
        "SV模式",
        "不是输出文件"
      ],
      [
        "-s tb",
        "顶层tb",
        "名字须存在"
      ],
      [
        "vvp sim",
        "运行已编译仿真",
        "与编译分开"
      ]
    ],
    "bug": {
      "wrong": "iverilog and2.sv # 依赖默认语言模式",
      "why": "SV特性可能按旧模式被拒绝。",
      "fix": "iverilog -g2012 -s and2 -tnull and2.sv",
      "test": "先编译正确文件，再故意删分号确认退出失败。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "-tnull通过能证明什么？",
        "options": [
          "所有测试通过",
          "板卡已工作",
          "语法和展开通过，非功能保证"
        ],
        "correct": 2,
        "explain": "功能要另写激励和检查。",
        "kind": "choice",
        "revision": 2,
        "objective": "找到工具版本信息",
        "reviewSection": "study-concept",
        "hint": "语法编译不检查真值表。想知道电路算得对不对，还要用测试输入、自检和波形。",
        "objectiveId": "tool-start-task-1"
      },
      {
        "kind": "fill",
        "type": "命令补全",
        "revision": 3,
        "prompt": "现在只检查and2.v中的and2顶层，不生成仿真程序。缺少哪一个顶层选择参数？",
        "template": "iverilog -g2005 ___ and2 -tnull and2.v",
        "blanks": [
          {
            "label": "顶层选择参数",
            "accepted": [
              "-s"
            ]
          }
        ],
        "explain": "-s选择顶层，-tnull不生成运行程序。",
        "objective": "完成一次语法编译并区分功能验证",
        "reviewSection": "study-code",
        "hint": "语法编译不检查真值表。想知道电路算得对不对，还要用测试输入、自检和波形。",
        "objectiveId": "tool-start-task-2"
      },
      {
        "type": "解释与应用",
        "prompt": "记录你环境中的工具版本，编译and2，故意引入一次错误并保存第一条报错。",
        "starter": "版本：\n命令：\n退出码：\n错误与修复：",
        "solution": "实际运行后填写；工具不可用时注明未运行，不编造成功日志。",
        "kind": "analysis",
        "revision": 2,
        "interface": "版本：\n命令：\n退出码：\n错误与修复：",
        "tests": [
          "保存实际工具版本及命令；错误版应返回编译错误，修正后应成功。编译成功不替代功能真值表。"
        ],
        "objective": "完成一次语法编译并区分功能验证",
        "reviewSection": "study-concept",
        "hint": "语法编译不检查真值表。想知道电路算得对不对，还要用测试输入、自检和波形。",
        "objectiveId": "tool-start-task-3"
      },
      {
        "type": "情境分析",
        "prompt": "编译成功但灯真值表错误，应做什么？",
        "options": [
          "直接标验收完成",
          "运行带预期的测试",
          "重复安装编译器"
        ],
        "correct": 1,
        "explain": "编译与功能检查是不同步骤。",
        "kind": "choice",
        "revision": 2,
        "objective": "完成一次语法编译并区分功能验证",
        "reviewSection": "study-concept",
        "hint": "语法编译不检查真值表。想知道电路算得对不对，还要用测试输入、自检和波形。",
        "objectiveId": "tool-start-task-4"
      }
    ],
    "lines": {
      "2": "-V询问已安装的Icarus版本。它不读取and2.v，也不证明电路功能。",
      "3": "-g2005指定Verilog语言，-s and2选择本次展开的顶层，-tnull只检查，不产生可运行的仿真程序。",
      "5": "选择顶层要写module后的定义名and2，不是文件名and2.v，也不是内部实例名u_pair。"
    },
    "sequence": [
      {
        "title": "保存为tb_and2.v：先把它当四次实验来读",
        "text": "reg保存由实验人员改变的输入；wire y接收and2输出。initial把这一组实验执行一次。每个#1在1ns时间单位下等待1ns，让组合关系求值后再检查；!==要求输出确定等于预期，出错由$fatal结束。这里先理解每组“给输入、等更新、查结果”，更复杂的测试台在验证阶段展开。",
        "code": "`timescale 1ns/1ps\nmodule tb_and2;\n  reg a,b;\n  wire y;\n  and2 dut(.a(a),.b(b),.y(y));\n  initial begin\n    a=0; b=0; #1; if(y !== 1'b0) $fatal(1,\"00\");\n    a=0; b=1; #1; if(y !== 1'b0) $fatal(1,\"01\");\n    a=1; b=0; #1; if(y !== 1'b0) $fatal(1,\"10\");\n    a=1; b=1; #1; if(y !== 1'b1) $fatal(1,\"11\");\n    $display(\"PASS: four AND inputs\");\n    $finish;\n  end\nendmodule"
      },
      {
        "title": "从检查语法到实际运行",
        "text": "and2.v使用上一课的单个与门定义；仿真顶层改选tb_and2。第一条命令生成gate_sim，第二条才执行。把与门故意改成或门，再运行应该在01处失败；如果没有失败，先查是否重新编译了修改后的文件。网页未执行这些终端命令。",
        "code": "iverilog -g2012 -s tb_and2 -o gate_sim and2.v tb_and2.v\nvvp gate_sim"
      }
    ],
    "lineSources": {
      "2": "iverilog -V",
      "3": "iverilog -g2005 -s and2 -tnull and2.v",
      "5": "# -s and2：选择顶层模块"
    }
  },
  "net-var": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "wire",
        "网络",
        "持续驱动"
      ],
      [
        "reg",
        "过程变量",
        "always/initial赋值"
      ],
      [
        "assign",
        "持续赋值",
        "源变化触发"
      ],
      [
        "@(*)",
        "组合敏感",
        "仍需完整赋值"
      ]
    ],
    "bug": {
      "wrong": "wire y; always @(*) y=a&b;",
      "why": "Verilog过程不能给wire赋值。",
      "fix": "reg y; always @(*) y=a&b;",
      "test": "编译后再检查所有a,b组合y1==y2。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "例子中y2推导什么？",
        "options": [
          "因为reg所以是DFF",
          "RAM",
          "组合与门"
        ],
        "correct": 2,
        "explain": "完整组合过程不需要存储。",
        "kind": "choice",
        "revision": 2,
        "objective": "知道连续赋值和过程赋值用在哪里",
        "reviewSection": "study-concept",
        "hint": "不能在Verilog的过程块里直接对wire做普通过程赋值。",
        "objectiveId": "net-var-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "传统Verilog中，输出y由下方assign持续驱动。补上网络类型，而不是过程变量类型。",
        "template": "output ___ y;\nassign y = a & b;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "wire"
            ]
          }
        ],
        "explain": "传统Verilog持续赋值驱动网络。",
        "objective": "解释reg不一定产生寄存器",
        "reviewSection": "study-code",
        "hint": "不能在Verilog的过程块里直接对wire做普通过程赋值。",
        "objectiveId": "net-var-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "在Verilog-2005中写一个异或门。a、b为input wire，y应由一个组合过程驱动；修复输出声明，保留逻辑。",
        "starter": "output wire y;\nalways @(*) y=a^b;",
        "accepted": [
          "output reg y;\nalways @(*) y=a^b;"
        ],
        "solution": "output reg y;\nalways @(*) y=a^b;",
        "explain": "过程赋值要求变量型输出；每次输入变化完整覆盖y，因此reg在这里不表示保存历史。",
        "hint": "赋值发生在assign还是always中？",
        "context": "在Verilog-2005中写一个异或门。a、b为input wire，y应由一个组合过程驱动；修复输出声明，保留逻辑。",
        "requireReason": true,
        "objective": "根据赋值过程选择输出变量类型",
        "reviewSection": "study-code",
        "objectiveId": "net-var-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "分别用assign与always @(*)实现一位异或门，独立命名两个输出。不要用尚未学习的if或多位总线。",
        "starter": "module two_xor(input wire a,b,output wire y1,output reg y2);\nendmodule",
        "solution": "module two_xor(input wire a,b,output wire y1,output reg y2);\n assign y1=a^b;\n always @(*) y2=a^b;\nendmodule",
        "kind": "implementation",
        "revision": 3,
        "interface": "module two_xor(input wire a,b,output wire y1,output reg y2);\nendmodule",
        "tests": [
          "00/01/10/11时y1、y2都应为0/1/1/0",
          "a不变只改变b，两输出都更新"
        ],
        "objective": "解释reg不一定产生寄存器",
        "reviewSection": "study-code",
        "hint": "不能在Verilog的过程块里直接对wire做普通过程赋值。",
        "objectiveId": "net-var-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "a变化且无时钟，两种与门写法的理想输出？",
        "options": [
          "都要等沿",
          "都按新输入重算",
          "仅assign变化"
        ],
        "correct": 1,
        "explain": "两者都是组合描述。",
        "kind": "choice",
        "revision": 2,
        "objective": "解释reg不一定产生寄存器",
        "reviewSection": "study-concept",
        "hint": "不能在Verilog的过程块里直接对wire做普通过程赋值。",
        "objectiveId": "net-var-task-5"
      }
    ],
    "lines": {
      "2": "y1由assign驱动，声明wire；y2在always过程里被赋值，传统Verilog声明reg。两者在这个例子中都不保存历史。",
      "3": "连续与关系直接驱动y1，a或b改变就重新计算，不能再在always里给y1赋值。",
      "4": "@(*)等待此过程读取的a、b变化；begin/end把本次要算的语句放进一组，不产生时钟。",
      "5": "每次进入过程都用当前a、b覆盖y2。所有输入情况下都有赋值，所以不需要锁存旧值。"
    },
    "lineSources": {
      "2": " output wire y1, output reg y2);",
      "3": " assign y1 = a & b;",
      "4": " always @(*) begin",
      "5": "  y2 = a & b;"
    }
  },
  "vectors": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "bus[0]",
        "1位",
        "最低位"
      ],
      [
        "bus[7:4]",
        "4位",
        "高半字节"
      ],
      [
        "{a,b}",
        "宽度相加",
        "a在高位"
      ],
      [
        "{N{x}}",
        "N次复制",
        "N展开时常量"
      ]
    ],
    "bug": {
      "wrong": "assign y=bus[7:0:4];",
      "why": "Verilog没有这种三段切片语法。",
      "fix": "assign y=bus[7:4];",
      "test": "bus=A5时检查y=A、low=1、swap=5A。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "bus=A5时bus[7:4]？",
        "options": [
          "5",
          "A5",
          "A"
        ],
        "correct": 2,
        "explain": "高4位为1010。",
        "kind": "choice",
        "revision": 2,
        "objective": "计算位宽并做位选/切片",
        "reviewSection": "study-concept",
        "hint": "[7:4] 取4位，不能误认为7减4只取3位。",
        "objectiveId": "vectors-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "bus是8位，要求A5交换为5A。拼接左项应取原低半字节，填写范围。",
        "template": "assign swap = {bus[___], bus[7:4]};",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "3:0"
            ]
          }
        ],
        "explain": "低四位搬到高半字节。",
        "objective": "用拼接和复制构造新向量",
        "reviewSection": "study-code",
        "hint": "[7:4] 取4位，不能误认为7减4只取3位。",
        "objectiveId": "vectors-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "input wire [7:0] data；output wire [7:0] rotated。要求高低半字节交换，data=3C时输出C3。",
        "starter": "assign rotated={data[7:4],data[3:0]};",
        "accepted": [
          "assign rotated={data[3:0],data[7:4]};"
        ],
        "solution": "assign rotated={data[3:0],data[7:4]};",
        "explain": "错误拼接保持原顺序。拼接左项进入高位，所以低半字节要写在左侧。",
        "hint": "把3和C分别写到结果高四位和低四位。",
        "context": "input wire [7:0] data；output wire [7:0] rotated。要求高低半字节交换，data=3C时输出C3。",
        "requireReason": true,
        "objective": "调整拼接顺序完成半字节交换",
        "reviewSection": "study-code",
        "objectiveId": "vectors-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "输入16位a，交换高低字节，并输出a[11:8]；给1234的预期。",
        "starter": "module swap16(input wire [15:0] a,output wire [15:0] y,output wire [3:0] nib);\nendmodule",
        "solution": "assign y={a[7:0],a[15:8]}; assign nib=a[11:8]; 1234→3412，nib=2。",
        "kind": "implementation",
        "revision": 2,
        "interface": "module swap16(input wire [15:0] a,output wire [15:0] y,output wire [3:0] nib);\nendmodule",
        "tests": [
          "a=16'h1234时，交换字节为3412，a[11:8]=2；再检查0000与FFFF。"
        ],
        "objective": "用拼接和复制构造新向量",
        "reviewSection": "study-code",
        "hint": "[7:4] 取4位，不能误认为7减4只取3位。",
        "objectiveId": "vectors-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "bus从A5变3C，low位序列？",
        "options": [
          "5,C",
          "1,0",
          "0,1"
        ],
        "correct": 1,
        "explain": "位0分别为1和0。",
        "kind": "choice",
        "revision": 2,
        "objective": "用拼接和复制构造新向量",
        "reviewSection": "study-concept",
        "hint": "[7:4] 取4位，不能误认为7减4只取3位。",
        "objectiveId": "vectors-task-5"
      }
    ],
    "lines": {
      "3": "[7:0]有8位，bus[7]是最高位、bus[0]是最低位。两端都计入，所以是7-0+1位。",
      "5": "A5是10100101，bus[0]取最右边的1；不是取整个数的第0个字节。",
      "6": "bus[7:4]取左四位1010，宽度4位，数值A。",
      "7": "拼接左项成为结果高位：低半字节5放到高位，高半字节A放到低位，得到5A。",
      "8": "{4{1'b1}}把一位1复制四次，得到1111；外层大括号表示复制，不是乘法。"
    },
    "lineSources": {
      "3": " wire [7:0] bus;",
      "5": " assign low = bus[0];",
      "6": " assign hi = bus[7:4];",
      "7": " assign swap = {bus[3:0],bus[7:4]};",
      "8": " assign ones = {4{1'b1}};"
    }
  },
  "four-state": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "X",
        "未知/冲突",
        "不是随机数"
      ],
      [
        "Z",
        "高阻",
        "不是逻辑0"
      ],
      [
        "== / !=",
        "逻辑相等",
        "结果可能X"
      ],
      [
        "=== / !==",
        "四态相等",
        "TB常用"
      ]
    ],
    "bug": {
      "wrong": "if(q != expected) $fatal;",
      "why": "未知比较结果可能是X，if不会按确定真进入。",
      "fix": "if(q !== expected) $fatal(1,\"mismatch or X/Z\");",
      "test": "复位前后分别检查q；断开一个驱动观察Z。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "0 & X是什么？",
        "options": [
          "X",
          "Z",
          "0"
        ],
        "correct": 2,
        "explain": "已知0控制与门输出。",
        "kind": "choice",
        "revision": 2,
        "objective": "解释X和Z的常见来源",
        "reviewSection": "study-concept",
        "hint": "不要把 X 当作“随便取0或1都正确”；综合中的无关项与仿真未知值用途不同。",
        "objectiveId": "four-state-task-1"
      },
      {
        "kind": "answer",
        "type": "四态推导",
        "revision": 3,
        "prompt": "不使用if语句。按四态真值表计算0 & X、1 & X、1 | X，按顺序填写0、1或X。",
        "accepted": [
          "0,X,1",
          "0,x,1"
        ],
        "explain": "与门有一个确定0就输出0；1与未知仍未知；或门已有确定1就不依赖另一个输入。",
        "objective": "知道未知值不能随意当作0",
        "reviewSection": "study-concept",
        "hint": "不要把 X 当作“随便取0或1都正确”；综合中的无关项与仿真未知值用途不同。",
        "objectiveId": "four-state-task-2"
      },
      {
        "kind": "answer",
        "type": "未知比较",
        "revision": 2,
        "prompt": "q=X，expected=0。q != expected和q !== expected的结果分别是什么？填X/0/1，用逗号分隔。",
        "accepted": [
          "X,1"
        ],
        "explain": "普通不等不能确定未知位，得到X；四态不等把X作为参与比较的状态，确定不相同，得到1。",
        "objective": "知道未知值不能随意当作0",
        "reviewSection": "study-concept",
        "hint": "不要把 X 当作“随便取0或1都正确”；综合中的无关项与仿真未知值用途不同。",
        "objectiveId": "four-state-task-3"
      },
      {
        "type": "真值推导",
        "prompt": "列出0&X、1&X、1|X、0|X的结果。对每一项分别代入未知位可能的0和1，解释是否能确定输出。",
        "starter": "表达式 | X取0 | X取1 | 是否确定\n",
        "solution": "0&X=0，1&X=X，1|X=1，0|X=X。输出不随未知位的具体值改变时才可确定。",
        "kind": "analysis",
        "revision": 2,
        "interface": "只需填写逻辑值表，不要求尚未讲解的测试台或断言语法。",
        "tests": [
          "输出依次0、X、1、X；对不能确定的项，必须指出未知位取0与1时结果不同。"
        ],
        "objective": "知道未知值不能随意当作0",
        "reviewSection": "study-concept",
        "hint": "不要把 X 当作“随便取0或1都正确”；综合中的无关项与仿真未知值用途不同。",
        "objectiveId": "four-state-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "q复位前X、复位后0，q===0的序列？",
        "options": [
          "1,1",
          "0,1",
          "X,1"
        ],
        "correct": 1,
        "explain": "===始终返回已知真假。",
        "kind": "choice",
        "revision": 2,
        "objective": "知道未知值不能随意当作0",
        "reviewSection": "study-concept",
        "hint": "不要把 X 当作“随便取0或1都正确”；综合中的无关项与仿真未知值用途不同。",
        "objectiveId": "four-state-task-5"
      }
    ],
    "lines": {
      "1": "undriven声明为wire输出却没有驱动源，四态模型显示Z。把名字叫输出并不能产生有效电平。",
      "2": "q是尚未赋值的reg，仿真初始为X；没有初值不等于自动得到0。",
      "4": "X是无法确定0/1的仿真状态，真实上电值要看器件和复位；不能拿X作实际逻辑电平设计。"
    },
    "lineSources": {
      "1": "module unknown_demo(output wire undriven);",
      "2": " reg q; // 尚未给初值的过程变量",
      "4": " // q尚未赋值，四态仿真通常为X"
    }
  },
  "operators": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "&a",
        "归约与",
        "结果1位"
      ],
      [
        "a&&b",
        "逻辑与",
        "结果1位"
      ],
      [
        "a>>n",
        "逻辑右移",
        "左侧补0"
      ],
      [
        "s>>>n",
        "算术右移",
        "左操作数须signed"
      ]
    ],
    "bug": {
      "wrong": "assign zero=a&b==0;",
      "why": "运算符优先级可能导致错误分组。",
      "fix": "assign zero=((a & b)==4'd0);",
      "test": "a=1010,b=0101时zero应1。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "1010&&0101的结果？",
        "options": [
          "1",
          "0000",
          "1111"
        ],
        "correct": 0,
        "explain": "两操作数都非零。",
        "kind": "choice",
        "revision": 2,
        "objective": "区分按位、逻辑与归约",
        "reviewSection": "study-concept",
        "hint": "位运算和逻辑运算位宽不同；不要用&&替换多位数据通路里的&。",
        "objectiveId": "operators-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "a是4位请求掩码，all_ones仅在1111时为1。填写一位归约表达式。",
        "template": "assign all_ones = ___;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "&a"
            ]
          }
        ],
        "explain": "归约与把所有位相与，结果一位。",
        "objective": "根据类型解释比较和移位",
        "reviewSection": "study-code",
        "hint": "位运算和逻辑运算位宽不同；不要用&&替换多位数据通路里的&。",
        "objectiveId": "operators-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "input wire [3:0] req；output wire any_req。要求至少一个请求位为1时输出1，不能只检测四位全为1。",
        "starter": "assign any_req=&req;",
        "accepted": [
          "assign any_req=|req;"
        ],
        "solution": "assign any_req=|req;",
        "explain": "&req是归约与，0001会输出0；归约或才能检测任意一位为1。",
        "hint": "先用0001作反例，再判断所需归约运算。",
        "context": "input wire [3:0] req；output wire any_req。要求至少一个请求位为1时输出1，不能只检测四位全为1。",
        "requireReason": true,
        "objective": "用归约或判断任意请求有效",
        "reviewSection": "study-code",
        "objectiveId": "operators-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "写出4位输入a的零检测、奇偶校验、乘2低4位，并测a=9。",
        "starter": "zero=\nparity=\ntwice=",
        "solution": "zero=(a==0); parity=^a; twice=a<<1; 9时0、0、2。",
        "kind": "implementation",
        "revision": 2,
        "interface": "zero=\nparity=\ntwice=",
        "tests": [
          "a=4'h9时零检测0、奇偶0、左移低4位2；a=0时零检测1。"
        ],
        "objective": "根据类型解释比较和移位",
        "reviewSection": "study-code",
        "hint": "位运算和逻辑运算位宽不同；不要用&&替换多位数据通路里的&。",
        "objectiveId": "operators-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "4位a=1001左移1并只留4位，结果？",
        "options": [
          "10010",
          "1100",
          "0010"
        ],
        "correct": 2,
        "explain": "移出的最高位丢弃。",
        "kind": "choice",
        "revision": 2,
        "objective": "根据类型解释比较和移位",
        "reviewSection": "study-concept",
        "hint": "位运算和逻辑运算位宽不同；不要用&&替换多位数据通路里的&。",
        "objectiveId": "operators-task-5"
      }
    ],
    "lines": {
      "1": "a和b各4位。按位运算逐个位置配对；逻辑运算先看整个向量是否非零。",
      "4": "1010与0101逐位没有共同的1，所以a&b=0000；两个数都非零，所以a&&b=1。&a把a自身所有位相与，有0则为0。",
      "5": "先比较a>b，再由?选择a或b。例如a=10,b=5选a=10。括号把比较整体写清，避免误读运算分组。"
    },
    "lineSources": {
      "1": "module choose_max(input wire [3:0] a,b,",
      "4": " // a&b=0000，a&&b=1，&a=0",
      "5": " assign y = (a > b) ? a : b;"
    }
  },
  "width-sign": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "[3:0] unsigned",
        "0..15",
        "4位"
      ],
      [
        "signed [3:0]",
        "-8..7",
        "补码"
      ],
      [
        "{1'b0,a}",
        "零扩展",
        "保持无符号值"
      ],
      [
        "{{4{s[3]}},s}",
        "符号扩展",
        "保持补码值"
      ]
    ],
    "bug": {
      "wrong": "wire [3:0] sum=a+b;",
      "why": "输出只有4位，进位无法保存。",
      "fix": "wire [4:0] sum={1'b0,a}+{1'b0,b};",
      "test": "测试15+1和15+15，应16、30。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "4位signed 1000代表？",
        "options": [
          "8",
          "-0",
          "-8"
        ],
        "correct": 2,
        "explain": "负权最高位-8。",
        "kind": "choice",
        "revision": 2,
        "objective": "区分无符号与补码范围",
        "reviewSection": "study-concept",
        "hint": "无尺寸十进制常量通常至少32位；避免随手写1造成宽度和符号混算不明确。",
        "objectiveId": "width-sign-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "a、b各4位无符号，sum为5位且需保存15+15=30。补齐b运算前的扩展位。",
        "template": "assign sum = {1'b0,a} + {___,b};",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "1'b0"
            ]
          }
        ],
        "explain": "两个操作数运算前同为5位。",
        "objective": "显式扩展并保留进位",
        "reviewSection": "study-code",
        "hint": "无尺寸十进制常量通常至少32位；避免随手写1造成宽度和符号混算不明确。",
        "objectiveId": "width-sign-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "input wire signed [3:0] sample；output wire signed [7:0] wide。要求扩位后保留补码数值，1001仍表示-7。",
        "starter": "assign wide={4'b0000,sample};",
        "accepted": [
          "assign wide={{4{sample[3]}},sample};"
        ],
        "solution": "assign wide={{4{sample[3]}},sample};",
        "explain": "补零把1001变00001001即+9。复制符号位得到11111001，仍为-7。",
        "hint": "最高位为1时，新增高位应填什么？",
        "context": "input wire signed [3:0] sample；output wire signed [7:0] wide。要求扩位后保留补码数值，1001仍表示-7。",
        "requireReason": true,
        "objective": "复制符号位保留补码数值",
        "reviewSection": "study-code",
        "objectiveId": "width-sign-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "设计4位无符号加法输出5位，再设计4位signed到8位扩展；测15+15和-8。",
        "starter": "// 明确每条线宽度与signed",
        "solution": "sum={1'b0,a}+{1'b0,b}; ext={{4{s[3]}},s}; 30=11110，-8扩为11111000。",
        "kind": "implementation",
        "revision": 2,
        "interface": "// 明确每条线宽度与signed",
        "tests": [
          "15+15=5'b11110；4位signed -8扩成8位为11111000；同时检查0和+7。"
        ],
        "objective": "显式扩展并保留进位",
        "reviewSection": "study-code",
        "hint": "无尺寸十进制常量通常至少32位；避免随手写1造成宽度和符号混算不明确。",
        "objectiveId": "width-sign-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "4位Q从14加1再加1，仅低4位依次？",
        "options": [
          "0,1",
          "15,0",
          "15,16"
        ],
        "correct": 1,
        "explain": "第二次进位截断。",
        "kind": "choice",
        "revision": 2,
        "objective": "显式扩展并保留进位",
        "reviewSection": "study-concept",
        "hint": "无尺寸十进制常量通常至少32位；避免随手写1造成宽度和符号混算不明确。",
        "objectiveId": "width-sign-task-5"
      }
    ],
    "lines": {
      "2": "s被声明为4位signed，最高位s[3]是符号位；1000解释为-8而非无符号8。",
      "5": "两个4位输入各前补0变5位，再相加。15+1得到10000，sum[4]保留进位，不在4位输出中截掉。",
      "6": "s[3]复制4次再拼上原4位。s=1000时得到11111000，8位补码仍是-8；补0会变成+8。"
    },
    "lineSources": {
      "2": " input wire signed [3:0] s,",
      "5": " assign sum = {1'b0,a} + {1'b0,b};",
      "6": " assign extended = {{4{s[3]}},s};"
    }
  },
  "casts": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "$signed(raw)",
        "宽度不变",
        "符号解释改变"
      ],
      [
        "$unsigned(raw)",
        "宽度不变",
        "按无符号解释"
      ],
      [
        "符号扩展",
        "复制最高位",
        "由类型决定"
      ],
      [
        "截断",
        "只留低位",
        "转换不能恢复已丢进位"
      ]
    ],
    "bug": {
      "wrong": "assign negative=(raw<0);",
      "why": "raw为unsigned，不能按4位负数比较。",
      "fix": "assign negative=($signed(raw)<4'sd0);",
      "test": "用7、8、F分别检查非负/负。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "$signed(4'hF)的数值？",
        "options": [
          "255",
          "-1",
          "15"
        ],
        "correct": 1,
        "explain": "4位宽不变，补码解释为-1。",
        "kind": "choice",
        "revision": 2,
        "objective": "给raw=1000写出sx和zx的十进制。",
        "reviewSection": "study-concept",
        "hint": "拼接通常产生无符号表达式，不能忽略拼接后再参与运算的类型。",
        "objectiveId": "casts-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "raw是4位位串1000，sx为signed 8位，要求结果仍为-8。填写把raw按有符号解释的转换函数。",
        "template": "assign sx = ___(raw);",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "$signed"
            ]
          }
        ],
        "explain": "先按signed解释，赋给宽左值时符号扩展。",
        "objective": "$signed(raw)仍是4位表达式，赋给8位signed输出时符号扩展。",
        "reviewSection": "study-code",
        "hint": "拼接通常产生无符号表达式，不能忽略拼接后再参与运算的类型。",
        "objectiveId": "casts-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "input wire [3:0] raw；output wire [7:0] magnitude。规格是无符号扩位，raw=F应得到0F而非FF。",
        "starter": "assign magnitude=$signed(raw);",
        "accepted": [
          "assign magnitude=$unsigned(raw);"
        ],
        "solution": "assign magnitude=$unsigned(raw);",
        "explain": "把raw先转signed会在宽左值中符号扩展；本题需要无符号数15，新增位应为0。",
        "hint": "先决定F代表15还是-1，再选择转换。",
        "context": "input wire [3:0] raw；output wire [7:0] magnitude。规格是无符号扩位，raw=F应得到0F而非FF。",
        "requireReason": true,
        "objective": "选择无符号解释进行零扩展",
        "reviewSection": "study-code",
        "objectiveId": "casts-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "列出raw=7、8、F时的sx/zx和negative，并解释每个宽度。",
        "starter": "raw | sx | zx | negative",
        "solution": "7→07/07/0；8→F8/08/1；F→FF/0F/1。",
        "kind": "implementation",
        "revision": 2,
        "interface": "raw | sx | zx | negative",
        "tests": [
          "raw=7：sx=07,zx=07,negative=0；8：sx=F8,zx=08,negative=1；F：sx=FF,zx=0F,negative=1。"
        ],
        "objective": "$signed(raw)仍是4位表达式，赋给8位signed输出时符号扩展。",
        "reviewSection": "study-code",
        "hint": "拼接通常产生无符号表达式，不能忽略拼接后再参与运算的类型。",
        "objectiveId": "casts-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "raw从7变8，negative从什么变什么？",
        "options": [
          "0到1",
          "1到0",
          "始终0"
        ],
        "correct": 0,
        "explain": "4位补码符号位从0变1。",
        "kind": "choice",
        "revision": 2,
        "objective": "$signed(raw)仍是4位表达式，赋给8位signed输出时符号扩展。",
        "reviewSection": "study-concept",
        "hint": "拼接通常产生无符号表达式，不能忽略拼接后再参与运算的类型。",
        "objectiveId": "casts-task-5"
      }
    ],
    "lines": {
      "5": "$signed(raw)保留raw的4个位但赋予有符号解释；赋给8位sx时按符号扩展。raw=1000时sx=11111000。",
      "6": "$unsigned同样不先改变4个位；赋给8位zx时补零，得到00001000。",
      "7": "比较的两侧都明确为有符号4位，因此1000小于4'sd0。不要与不明确位宽和符号的常量随意混算。"
    },
    "lineSources": {
      "5": " assign sx=$signed(raw);",
      "6": " assign zx=$unsigned(raw);",
      "7": " assign negative=($signed(raw) < 4'sd0);"
    }
  },
  "case-latch": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "case(sel)",
        "精确匹配",
        "不是switch穿透"
      ],
      [
        "endcase",
        "关闭case",
        "不同于end"
      ],
      [
        "default",
        "所有未匹配情况",
        "不应随意输出X"
      ],
      [
        "漏赋值",
        "保持历史",
        "可能锁存"
      ]
    ],
    "bug": {
      "wrong": "case(sel) 0:y=a; 1:y=b; endcase",
      "why": "sel其他值时y保留旧结果。",
      "fix": "y=0; case(sel) 0:y=a; 1:y=b; default:y=0; endcase",
      "test": "从已选b切换sel=3，检查不是保留b。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "sel=11时本例y？",
        "options": [
          "c",
          "保持",
          "0"
        ],
        "correct": 2,
        "explain": "default定义为0。",
        "kind": "choice",
        "revision": 2,
        "objective": "用case写选择规则",
        "reviewSection": "study-concept",
        "hint": "默认赋值是完整性设计，不是所有输出都应该默认X。",
        "objectiveId": "case-latch-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "sel为2位，00/01/10分别选a/b/c，其他情况输出零。补上处理未匹配输入的case标签。",
        "template": "case(sel)\n 2'b00:y=a;\n 2'b01:y=b;\n 2'b10:y=c;\n ___:y=4'b0;\nendcase",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "default"
            ]
          }
        ],
        "explain": "未匹配情况按本例输出0。",
        "objective": "发现漏赋值导致的意外存储",
        "reviewSection": "study-code",
        "hint": "默认赋值是完整性设计，不是所有输出都应该默认X。",
        "objectiveId": "case-latch-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "input wire [1:0] mode；output reg red,green。00全灭，01仅red亮，10仅green亮，其余全灭。",
        "starter": "always @(*) begin\n red=0; green=0;\n case(mode)\n  2'b01: red=1;\n  2'b10: begin green=1; red=1; end\n  default: begin red=0; green=0; end\n endcase\nend",
        "accepted": [
          "always @(*) begin\n red=0; green=0;\n case(mode)\n  2'b01: red=1;\n  2'b10: green=1;\n  default: begin red=0; green=0; end\n endcase\nend"
        ],
        "solution": "always @(*) begin\n red=0; green=0;\n case(mode)\n  2'b01: red=1;\n  2'b10: green=1;\n  default: begin red=0; green=0; end\n endcase\nend",
        "explain": "这次不是漏default；mode=10分支错误点亮red。要逐行对照各输入规格，不能看见case就只查锁存。",
        "hint": "mode=10时两盏灯各应是什么？",
        "context": "input wire [1:0] mode；output reg red,green。00全灭，01仅red亮，10仅green亮，其余全灭。",
        "requireReason": true,
        "objective": "按选择规格校正两个输出",
        "reviewSection": "study-code",
        "objectiveId": "case-latch-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "实现4选1的8位MUX，明确default，列出所有选择预期。",
        "starter": "module mux4(input wire [7:0] a,b,c,d,input wire [1:0] s,output reg [7:0] y);\nendmodule",
        "solution": "always @(*) case(s) 0:y=a;1:y=b;2:y=c;3:y=d;default:y=0;endcase",
        "kind": "implementation",
        "revision": 2,
        "interface": "module mux4(input wire [7:0] a,b,c,d,input wire [1:0] s,output reg [7:0] y);\nendmodule",
        "tests": [
          "令四个数据互不相同，sel=00/01/10/11逐项选择；定义未知选择时default为0，并在TB中使用四态比较。测试台写法可在后续仿真课补做。"
        ],
        "objective": "发现漏赋值导致的意外存储",
        "reviewSection": "study-code",
        "hint": "默认赋值是完整性设计，不是所有输出都应该默认X。",
        "objectiveId": "case-latch-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "sel依次0、1、3，a=2,b=7，本例y序列？",
        "options": [
          "0,1,3",
          "2,7,0",
          "2,7,7"
        ],
        "correct": 1,
        "explain": "第三步走default。",
        "kind": "choice",
        "revision": 2,
        "objective": "发现漏赋值导致的意外存储",
        "reviewSection": "study-concept",
        "hint": "默认赋值是完整性设计，不是所有输出都应该默认X。",
        "objectiveId": "case-latch-task-5"
      }
    ],
    "lines": {
      "4": "case按sel的完整位串逐项匹配，普通case不会把X自动当0或任意位。",
      "7": "sel=10时给y=c。若这里漏掉赋值，从01切到10就可能保持旧b而不是选择c。",
      "8": "未匹配前三项就给0000，包含sel=11。default必须真的给输出赋值；只写空default不能防锁存。"
    },
    "lineSources": {
      "4": "  case(sel)",
      "7": "   2'b10: y = c;",
      "8": "   default: y = 4'b0000;"
    }
  },
  "casez": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "?",
        "casez项通配",
        "不是任意运行时随机值"
      ],
      [
        "casez",
        "忽略Z/?",
        "X仍有意义"
      ],
      [
        "valid",
        "有请求",
        "不能只看index"
      ],
      [
        "优先级",
        "首个匹配项",
        "重叠需设计"
      ]
    ],
    "bug": {
      "wrong": "casex(req) 4'b1xxx:index=3; endcase",
      "why": "忽略X可能把未知请求判成有效。",
      "fix": "casez(req) 4'b1???:index=3; default:valid=0; endcase",
      "test": "注入X/Z并确认检查器报告未知，不能只看编号。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "req=0101时最高优先index？",
        "options": [
          "1",
          "2",
          "0"
        ],
        "correct": 1,
        "explain": "最高置位是位2。",
        "kind": "choice",
        "revision": 2,
        "objective": "给req=0000写出valid和index。",
        "reviewSection": "study-concept",
        "hint": "不要拿casez消除波形中的X/Z，先查输入来源。",
        "objectiveId": "casez-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "req是4位，bit3优先级最高。填写匹配bit3=1、忽略其余三位的casez模式。",
        "template": "casez(req)\n ___: index=2'd3;\n 4'b01??: index=2'd2;\nendcase",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "4'b1???"
            ]
          }
        ],
        "explain": "最高位为1优先匹配，其余低位通配。",
        "objective": "?只在casez模式中表示通配。",
        "reviewSection": "study-code",
        "hint": "不要拿casez消除波形中的X/Z，先查输入来源。",
        "objectiveId": "casez-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "input wire [3:0] req；output reg [1:0] idx。至少最高位为1时必须选3，其次bit2选2；其余暂定0。",
        "starter": "always @(*) begin\n idx=0;\n casez(req)\n  4'b?1??: idx=2;\n  4'b1???: idx=3;\n  default: idx=0;\n endcase\nend",
        "accepted": [
          "always @(*) begin\n idx=0;\n casez(req)\n  4'b1???: idx=3;\n  4'b?1??: idx=2;\n  default: idx=0;\n endcase\nend"
        ],
        "solution": "always @(*) begin\n idx=0;\n casez(req)\n  4'b1???: idx=3;\n  4'b?1??: idx=2;\n  default: idx=0;\n endcase\nend",
        "explain": "1100同时匹配两项，casez取第一项。最高优先级应写在前面；X/Z输入仍需额外检查。",
        "hint": "先用1100同时匹配两行，观察谁先出现。",
        "context": "input wire [3:0] req；output reg [1:0] idx。至少最高位为1时必须选3，其次bit2选2；其余暂定0。",
        "requireReason": true,
        "objective": "按casez首个匹配规则安排优先级",
        "reviewSection": "study-code",
        "objectiveId": "casez-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "实现低位优先4路编码器，明确无请求valid=0。",
        "starter": "// 按bit0、1、2、3优先顺序",
        "solution": "casez(req) 4'b???1:index=0;4'b??10:index=1;4'b?100:index=2;4'b1000:index=3;default:valid=0;endcase；组合默认valid=1,index=0。",
        "kind": "implementation",
        "revision": 2,
        "interface": "// 按bit0、1、2、3优先顺序",
        "tests": [
          "低位优先：0000应valid=0；0001、0101、1001都选index0；1010选index1。"
        ],
        "objective": "?只在casez模式中表示通配。",
        "reviewSection": "study-code",
        "hint": "不要拿casez消除波形中的X/Z，先查输入来源。",
        "objectiveId": "casez-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "req依次0000、0001、1001，valid/index？",
        "options": [
          "0/0,1/0,1/3",
          "1/0,1/0,1/0",
          "0/0,1/1,1/2"
        ],
        "correct": 0,
        "explain": "最高位优先，空请求无效。",
        "kind": "choice",
        "revision": 2,
        "objective": "?只在casez模式中表示通配。",
        "reviewSection": "study-concept",
        "hint": "不要拿casez消除波形中的X/Z，先查输入来源。",
        "objectiveId": "casez-task-5"
      }
    ],
    "lines": {
      "4": "本次先假定有请求且编号0；后续分支可以覆盖编号，default负责撤销valid。",
      "6": "1???匹配最高位为1的请求，低三位不参与这一项比较。1001仍选3。输入Z也会被casez当通配，需另查未知。",
      "7": "01??把最高位限定为0，再选第2位。写成?1??会与上一项重叠，结果将依赖谁写在前面。"
    },
    "lineSources": {
      "4": "  valid=1'b1; index=2'd0;",
      "6": "   4'b1???: index=2'd3;",
      "7": "   4'b01??: index=2'd2;"
    }
  },
  "loops": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "for",
        "初值;条件;步进",
        "固定次数"
      ],
      [
        "integer i",
        "循环索引",
        "不自带时钟"
      ],
      [
        "parity=0",
        "本次计算初值",
        "防反馈"
      ],
      [
        "generate for",
        "展开硬件实例",
        "展开阶段"
      ]
    ],
    "bug": {
      "wrong": "always @(*) for(i=0;i<4;i=i+1) parity=parity^data[i];",
      "why": "缺初始值，计算依赖旧parity。",
      "fix": "always @(*) begin parity=0; for(i=0;i<4;i=i+1) parity=parity^data[i]; end",
      "test": "同输入重复求值应输出同值。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "组合for迭代4次代表几拍？",
        "options": [
          "必定1ns",
          "不代表时钟拍数",
          "4拍"
        ],
        "correct": 1,
        "explain": "无时钟事件，属于组合计算。",
        "kind": "choice",
        "revision": 2,
        "objective": "手工展开固定for循环",
        "reviewSection": "study-concept",
        "hint": "不要用没有确定结束条件的while循环来等待硬件信号变化；新手先使用固定循环边界。",
        "objectiveId": "loops-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "四位data的奇偶校验必须只由本次输入决定。补上循环前的累加初值，使data=0000时parity=0。",
        "template": "always @(*) begin\n ___;\n for(i=0;i<4;i=i+1) parity=parity^data[i];\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "parity=1'b0",
              "parity=0"
            ]
          }
        ],
        "explain": "本次组合计算重新从0累加，避免读取旧parity。",
        "objective": "分清循环次数与时钟拍数",
        "reviewSection": "study-code",
        "hint": "不要用没有确定结束条件的while循环来等待硬件信号变化；新手先使用固定循环边界。",
        "objectiveId": "loops-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "input wire [3:0] flags；output reg any_set；integer i已声明。用循环计算四位或归约。",
        "starter": "always @(*) begin\n any_set=1'b1;\n for(i=0;i<4;i=i+1) any_set=any_set|flags[i];\nend",
        "accepted": [
          "always @(*) begin\n any_set=1'b0;\n for(i=0;i<4;i=i+1) any_set=any_set|flags[i];\nend"
        ],
        "solution": "always @(*) begin\n any_set=1'b0;\n for(i=0;i<4;i=i+1) any_set=any_set|flags[i];\nend",
        "explain": "或运算从1开始永远为1；初始0才是或归约的中性值。0000必须得到0。",
        "hint": "把flags=0000逐次代入循环，不要只查有没有初始化。",
        "context": "input wire [3:0] flags；output reg any_set；integer i已声明。用循环计算四位或归约。",
        "requireReason": true,
        "objective": "选择组合归约的正确初值",
        "reviewSection": "study-code",
        "objectiveId": "loops-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "用for计算8位奇偶校验，再与^data逐项比较全部256个值。",
        "starter": "// 固定8次循环，与归约异或对照",
        "solution": "初始化0后for(i=0;i<8;i=i+1) p=p^data[i]; 参考p_ref=^data；所有256组应一致。",
        "kind": "implementation",
        "revision": 2,
        "interface": "// 固定8次循环，与归约异或对照",
        "tests": [
          "对data=00、01、03、FF手算奇偶0、1、0、0；完整256值自动比对在后面的TB课补做。"
        ],
        "objective": "分清循环次数与时钟拍数",
        "reviewSection": "study-code",
        "hint": "不要用没有确定结束条件的while循环来等待硬件信号变化；新手先使用固定循环边界。",
        "objectiveId": "loops-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "data依次0001、0011、0111，奇偶位？",
        "options": [
          "1,0,1",
          "1,1,1",
          "0,1,0"
        ],
        "correct": 0,
        "explain": "奇数个1输出1。",
        "kind": "choice",
        "revision": 2,
        "objective": "分清循环次数与时钟拍数",
        "reviewSection": "study-concept",
        "hint": "不要用没有确定结束条件的while循环来等待硬件信号变化；新手先使用固定循环边界。",
        "objectiveId": "loops-task-5"
      }
    ],
    "lines": {
      "2": "i是展开时索引的整数描述，不是一个每拍自动加一的硬件计数器。",
      "4": "本轮先把parity置0，让结果只取决于本次data。漏掉它会把旧结果带回计算。",
      "5": "循环四次组合计算，不等待四个时钟。固定上界允许工具形成四位异或关系。",
      "6": "每次把一位并入当前parity。data=1011时依次得到1、0、0、1，最终奇数个1使输出1。"
    },
    "lineSources": {
      "2": " integer i;",
      "4": "  parity = 1'b0;",
      "5": "  for(i=0; i<4; i=i+1) begin",
      "6": "   parity = parity ^ data[i];"
    }
  },
  "parameters": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "parameter W=8",
        "外部可覆盖",
        "编译展开常量"
      ],
      [
        "localparam",
        "内部派生",
        "禁止父层覆盖"
      ],
      [
        "genvar",
        "生成索引",
        "不是运行时变量"
      ],
      [
        "begin:g",
        "命名生成块",
        "便于层次定位"
      ]
    ],
    "bug": {
      "wrong": "localparam W=8; // 父层想覆盖",
      "why": "localparam不是可配置参数。",
      "fix": "parameter W=8; localparam LAST=W-1;",
      "test": "分别展开W=1、4、8，检查位宽与功能。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "运行时能给parameter W赋值吗？",
        "options": [
          "能，每拍改变",
          "只有initial能",
          "不能"
        ],
        "correct": 2,
        "explain": "结构在展开时确定。",
        "kind": "choice",
        "revision": 2,
        "objective": "用参数配置硬件位宽",
        "reviewSection": "study-concept",
        "hint": "for不会自动生成多周期控制器；要跨周期，必须显式设计状态与计数器。",
        "objectiveId": "parameters-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "已有参数化invert模块；父层a、y都是4位。填写实例参数W，确保恰好生成四个反相位。",
        "template": "invert #(.W(___)) u_inv(.a(a),.y(y));",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "4"
            ]
          }
        ],
        "explain": "构建时把宽度参数设为4。",
        "objective": "解释generate在展开时复制硬件",
        "reviewSection": "study-code",
        "hint": "for不会自动生成多周期控制器；要跨周期，必须显式设计状态与计数器。",
        "objectiveId": "parameters-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "WIDTH是可由父层覆盖的模块参数，LIMIT表示最大地址，必须随WIDTH变化。修改局部常量声明。",
        "starter": "localparam LIMIT=8-1;",
        "accepted": [
          "localparam LIMIT=WIDTH-1;"
        ],
        "solution": "localparam LIMIT=WIDTH-1;",
        "explain": "把上界写死7时WIDTH=4仍会访问第7位；派生常量应使用配置参数。",
        "hint": "默认宽度以外再代入WIDTH=4看上界。",
        "context": "WIDTH是可由父层覆盖的模块参数，LIMIT表示最大地址，必须随WIDTH变化。修改局部常量声明。",
        "requireReason": true,
        "objective": "从配置参数推导内部边界",
        "reviewSection": "study-code",
        "objectiveId": "parameters-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "设计参数化W位按位异或模块，测试W=1和8，声明W>=1限制。",
        "starter": "module xor_bus #(parameter W=8)(input wire [W-1:0] a,b,output wire [W-1:0] y);\nendmodule",
        "solution": "assign y=a^b; 用两组参数展开并检查0^1、AA^55=FF。",
        "kind": "implementation",
        "revision": 2,
        "interface": "module xor_bus #(parameter W=8)(input wire [W-1:0] a,b,output wire [W-1:0] y);\nendmodule",
        "tests": [
          "W=1取0/1输入；W=8取00/FF/AA；逐位异或结果与^两个输入的对应位一致；W=0不在规格内。"
        ],
        "objective": "解释generate在展开时复制硬件",
        "reviewSection": "study-code",
        "hint": "for不会自动生成多周期控制器；要跨周期，必须显式设计状态与计数器。",
        "objectiveId": "parameters-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "W从4改8，生成反相位数？",
        "options": [
          "每拍变动",
          "8",
          "4"
        ],
        "correct": 1,
        "explain": "展开生成8份位逻辑。",
        "kind": "choice",
        "revision": 2,
        "objective": "解释generate在展开时复制硬件",
        "reviewSection": "study-concept",
        "hint": "for不会自动生成多周期控制器；要跨周期，必须显式设计状态与计数器。",
        "objectiveId": "parameters-task-5"
      }
    ],
    "lines": {
      "1": "W默认8，是建立电路时确定的宽度配置；输入a变化不会改变W。",
      "3": "genvar仅用于generate展开索引，不是运行时寄存器i。",
      "4": "W=4时生成g[0]到g[3]四份连接结构，它们并行工作，不轮流占用一个反相器。",
      "5": "每个生成项将a对应位取反接到y对应位；位之间没有状态传递。"
    },
    "lineSources": {
      "1": "module invert #(parameter W=8)(",
      "3": " genvar i;",
      "4": " generate for(i=0;i<W;i=i+1) begin: g",
      "5": "   assign y[i] = ~a[i];"
    }
  },
  "functions": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "function [3:0] inc",
        "返回4位",
        "Verilog写法"
      ],
      [
        "inc=表达式",
        "设置返回值",
        "不写return"
      ],
      [
        "task",
        "可多输出",
        "时间控制只放TB"
      ],
      [
        "automatic",
        "自动局部存储",
        "非物理动态分配"
      ]
    ],
    "bug": {
      "wrong": "function [3:0] inc; input [3:0] x; #5 inc=x+1; endfunction",
      "why": "函数中不可加入时间等待。",
      "fix": "function [3:0] inc; input [3:0] x; begin inc=x+4'd1; end endfunction",
      "test": "测试0、14、15，得到1、15、0。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "inc(15)返回4位结果？",
        "options": [
          "0",
          "16",
          "X必然"
        ],
        "correct": 0,
        "explain": "固定4位回绕。",
        "kind": "choice",
        "revision": 2,
        "objective": "声明函数的输入与返回值",
        "reviewSection": "study-concept",
        "hint": "RTL中的#10不能当作芯片里精确10ns的延迟元件。",
        "objectiveId": "functions-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "inc返回4位，输入x，函数体应返回x+1（15回绕0）。按传统Verilog规则补返回赋值目标。",
        "template": "function [3:0] inc;\n input [3:0] x;\n begin ___ = x + 4'd1; end\nendfunction",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "inc"
            ]
          }
        ],
        "explain": "传统Verilog给函数名赋返回值。",
        "objective": "解释函数调用的位宽和硬件含义",
        "reviewSection": "study-code",
        "hint": "RTL中的#10不能当作芯片里精确10ns的延迟元件。",
        "objectiveId": "functions-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "需要4位减一函数dec4，输入x，按模16返回x-1。修改整个函数定义。",
        "starter": "function [3:0] dec4;\n input [3:0] x;\n begin dec4=x+4'd1; end\nendfunction",
        "accepted": [
          "function [3:0] dec4;\n input [3:0] x;\n begin dec4=x-4'd1; end\nendfunction"
        ],
        "solution": "function [3:0] dec4;\n input [3:0] x;\n begin dec4=x-4'd1; end\nendfunction",
        "explain": "原式加一而不是减一。x=0时减一截成1111，即15；x=5应返回4。",
        "hint": "用x=5与x=0分别推导普通情况和回绕。",
        "context": "需要4位减一函数dec4，输入x，按模16返回x-1。修改整个函数定义。",
        "requireReason": true,
        "objective": "定义并测试返回减一结果的函数",
        "reviewSection": "study-code",
        "objectiveId": "functions-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "写8位饱和加1函数，255保持255，其余加1。",
        "starter": "function [7:0] sat_inc; input [7:0] x;\nendfunction",
        "solution": "begin if(x==8'hff) sat_inc=x; else sat_inc=x+8'd1; end；测0、254、255。",
        "kind": "implementation",
        "revision": 2,
        "interface": "function [7:0] sat_inc; input [7:0] x;\nendfunction",
        "tests": [
          "输入0→1，254→255，255→255；返回8位，不在255回绕。"
        ],
        "objective": "解释函数调用的位宽和硬件含义",
        "reviewSection": "study-code",
        "hint": "RTL中的#10不能当作芯片里精确10ns的延迟元件。",
        "objectiveId": "functions-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "inc输入14→15→0，输出？",
        "options": [
          "15,16,1",
          "14,15,0",
          "15,0,1"
        ],
        "correct": 2,
        "explain": "每次独立组合计算。",
        "kind": "choice",
        "revision": 2,
        "objective": "解释函数调用的位宽和硬件含义",
        "reviewSection": "study-concept",
        "hint": "RTL中的#10不能当作芯片里精确10ns的延迟元件。",
        "objectiveId": "functions-task-5"
      }
    ],
    "lines": {
      "3": "inc声明返回4位的组合函数，调用时输入x会用调用实参替代；没有等待事件。",
      "5": "传统Verilog用函数名inc接收返回值。15+1最终只保留4位，返回0。",
      "7": "a作为实参交给inc，结果持续驱动y；不是在时钟到来时才调用一次的软件流程。"
    },
    "lineSources": {
      "3": " function [3:0] inc;",
      "5": "  begin inc = x + 4'd1; end",
      "7": " assign y = inc(a);"
    }
  },
  "directives": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "`include \"defs.vh\"",
        "文本插入",
        "路径要可找到"
      ],
      [
        "`ifdef INVERT",
        "编译条件",
        "不是输入信号"
      ],
      [
        "`undef WIDTH",
        "清除宏",
        "控制作用范围"
      ],
      [
        "-f files.f",
        "文件列表",
        "包先于使用者"
      ]
    ],
    "bug": {
      "wrong": "`include \"child.v\" // 同时又编译child.v",
      "why": "同一模块可能定义两次。",
      "fix": "// 在files.f各列一次child.v和top.v",
      "test": "两套宏配置分别编译，核对y=a或~a。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "未定义INVERT时例子输出？",
        "options": [
          "~a",
          "X",
          "a"
        ],
        "correct": 2,
        "explain": "选择`else文本。",
        "kind": "choice",
        "revision": 2,
        "objective": "解释include与实例化的区别。",
        "reviewSection": "study-concept",
        "hint": "include是文本粘贴，不是硬件实例化。",
        "objectiveId": "directives-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "同一头文件可能被include两次。第一次尚无DEFS_VH，需要定义保护宏，以便下一次跳过。填写编译指令。",
        "template": "`ifndef DEFS_VH\n___ DEFS_VH\n// 共享声明\n`endif",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "`define"
            ]
          }
        ],
        "explain": "保护宏第一次包含时定义，后续跳过。",
        "objective": "宏是文本替换，使用时同样有反引号。",
        "reviewSection": "study-code",
        "hint": "include是文本粘贴，不是硬件实例化。",
        "objectiveId": "directives-task-2"
      },
      {
        "kind": "analysis",
        "type": "调试推理",
        "revision": 2,
        "prompt": "在“编译指令、宏与多文件边界”中检查这个错误方案：`include \"child.v\" // 同时又编译child.v。写出具体修改办法与核对步骤。",
        "starter": "`include \"child.v\" // 同时又编译child.v",
        "solution": "// 在files.f各列一次child.v和top.v",
        "explain": "同一模块可能定义两次。 修正后可这样核对：两套宏配置分别编译，核对y=a或~a。",
        "tests": [
          "同一个头文件include两次仍只保留一份定义；源文件列表中每个模块定义只出现一次。"
        ],
        "objective": "宏是文本替换，使用时同样有反引号。",
        "reviewSection": "study-concept",
        "hint": "include是文本粘贴，不是硬件实例化。",
        "objectiveId": "directives-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "写带防重包含的defs.vh，并列出一次编译top和child的文件列表。",
        "starter": "`ifndef DEFS_VH\n// 补全\n`endif",
        "solution": "`define DEFS_VH置于保护内；files.f列child.v、top.v各一次；共享宏仅include头文件。",
        "kind": "implementation",
        "revision": 2,
        "interface": "`ifndef DEFS_VH\n// 补全\n`endif",
        "tests": [
          "同一个头文件include两次仍只保留一份定义；源文件列表中每个模块定义只出现一次。"
        ],
        "objective": "宏是文本替换，使用时同样有反引号。",
        "reviewSection": "study-code",
        "hint": "include是文本粘贴，不是硬件实例化。",
        "objectiveId": "directives-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "分别不定义和定义INVERT，a=1010，两次构建y？",
        "options": [
          "0101,0101",
          "1010,0101",
          "1010,1010"
        ],
        "correct": 1,
        "explain": "每种配置是不同展开结果。",
        "kind": "choice",
        "revision": 2,
        "objective": "宏是文本替换，使用时同样有反引号。",
        "reviewSection": "study-concept",
        "hint": "include是文本粘贴，不是硬件实例化。",
        "objectiveId": "directives-task-5"
      }
    ],
    "lines": {
      "1": "预处理器把后续`WIDTH文本展开为4；它不是电路输入，不能运行时改变。",
      "4": "编译时定义了INVERT才保留下面的取反assign；未定义时选`else那条，不会综合成可选MUX。",
      "7": "未定义INVERT时，a直接驱动y；与取反关系只会保留其一。",
      "10": "撤销WIDTH宏，避免之后文件意外沿用4这一文本定义；跨文件作用域仍应核对编译顺序。"
    },
    "lineSources": {
      "1": "`define WIDTH 4",
      "4": "`ifdef INVERT",
      "7": " assign y=a;",
      "10": "`undef WIDTH"
    }
  },
  "hierarchy": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "pair_add",
        "顶层",
        "8位输入分成两组"
      ],
      [
        "lo / hi",
        "两份实例",
        "并行"
      ],
      [
        "dut.lo.sum",
        "层次观察",
        "用于TB调试"
      ],
      [
        "task output",
        "多返回接口",
        "RTL task不加延时"
      ]
    ],
    "bug": {
      "wrong": "// 把sums直接当a+b",
      "why": "两个半字节独立求和，没有跨半字节进位。",
      "fix": "// 要完整8位加法则明确连接carry或直接扩位相加",
      "test": "a=0F,b=01时sums低组16，高组0，而a+b=10。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "pair_add是完整8位加法吗？",
        "options": [
          "不是，两路独立4位和",
          "是，自动传进位",
          "取决于文件顺序"
        ],
        "correct": 0,
        "explain": "硬件连接决定进位路径。",
        "kind": "choice",
        "revision": 2,
        "objective": "正确连接多模块工程",
        "reviewSection": "study-concept",
        "hint": "两个半字节独立求和，没有跨半字节进位。",
        "objectiveId": "hierarchy-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "这次要算完整8位a+b，输出y为9位，不能分别丢掉半字节进位。补齐第二个操作数的扩展位。",
        "template": "assign y = {1'b0,a} + {___,b};",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "1'b0"
            ]
          }
        ],
        "explain": "完整8位和先把两操作数扩为9位。",
        "objective": "区分实例、层次与任务",
        "reviewSection": "study-code",
        "hint": "两个半字节独立求和，没有跨半字节进位。",
        "objectiveId": "hierarchy-task-2"
      },
      {
        "kind": "analysis",
        "type": "调试推理",
        "revision": 2,
        "prompt": "在“多模块工程、层次与RTL task”中检查这个错误方案： 把sums直接当a+b。写出具体修改办法与核对步骤。",
        "starter": "// 把sums直接当a+b",
        "solution": "// 要完整8位加法则明确连接carry或直接扩位相加",
        "explain": "两个半字节独立求和，没有跨半字节进位。 修正后可这样核对：a=0F,b=01时sums低组16，高组0，而a+b=10。",
        "tests": [
          "a=0F,b=01应9位010；a=FF,b=01应100；a=b=FF应1FE。"
        ],
        "objective": "区分实例、层次与任务",
        "reviewSection": "study-concept",
        "hint": "两个半字节独立求和，没有跨半字节进位。",
        "objectiveId": "hierarchy-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "把两个半字节加法改为完整8位、9位输出，列出0F+01、FF+01预期。",
        "starter": "module add8(input wire [7:0] a,b,output wire [8:0] y);\nendmodule",
        "solution": "assign y={1'b0,a}+{1'b0,b}; 两测试为010、100。",
        "kind": "implementation",
        "revision": 2,
        "interface": "module add8(input wire [7:0] a,b,output wire [8:0] y);\nendmodule",
        "tests": [
          "a=0F,b=01应9位010；a=FF,b=01应100；a=b=FF应1FE。"
        ],
        "objective": "区分实例、层次与任务",
        "reviewSection": "study-code",
        "hint": "两个半字节独立求和，没有跨半字节进位。",
        "objectiveId": "hierarchy-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "a=11,b=22，两组和分别？",
        "options": [
          "高1、低2",
          "高0、低33",
          "高3、低3"
        ],
        "correct": 2,
        "explain": "每半字节1+2=3。",
        "kind": "choice",
        "revision": 2,
        "objective": "区分实例、层次与任务",
        "reviewSection": "study-concept",
        "hint": "两个半字节独立求和，没有跨半字节进位。",
        "objectiveId": "hierarchy-task-5"
      }
    ],
    "lines": {
      "2": "两个半字节先各补0，再相加得到5位，保留各自的进位。",
      "5": "lo只计算低半字节和，sums[4:0]接收其完整5位结果，不会自动把进位送入hi。",
      "6": "hi独立计算高半字节和。因此0F+01得到低组10000、高组00000，这不是完整8位加法的010。"
    },
    "lineSources": {
      "2": " assign sum={1'b0,a}+{1'b0,b};",
      "5": " nibble_add lo(.a(a[3:0]),.b(b[3:0]),.sum(sums[4:0]));",
      "6": " nibble_add hi(.a(a[7:4]),.b(b[7:4]),.sum(sums[9:5]));"
    }
  },
  "reset": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "!rst_n",
        "低有效复位",
        "先判断"
      ],
      [
        "else if(en)",
        "次优先",
        "未使能保持"
      ],
      [
        "negedge rst_n",
        "异步断言",
        "不同于同步复位"
      ],
      [
        "释放复位",
        "域内同步",
        "仍需时序检查"
      ]
    ],
    "bug": {
      "wrong": "always @(posedge clk) if(en) q<=d; else if(!rst_n) q<=0;",
      "why": "en=1时复位可能被忽略。",
      "fix": "always @(posedge clk) if(!rst_n) q<=0; else if(en) q<=d;",
      "test": "复位与使能同时有效，沿后必须0。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "rst_n刚变0而无时钟，本例同步Q？",
        "options": [
          "变Z",
          "先保持到有效沿",
          "立即清零"
        ],
        "correct": 1,
        "explain": "同步复位要在沿检查。",
        "kind": "choice",
        "revision": 2,
        "objective": "区分同步与异步复位",
        "reviewSection": "study-concept",
        "hint": "不要把同步复位波形画成复位信号一变就立即清零。",
        "objectiveId": "reset-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "rst_n=0时必须压过en=1的加载请求。补连接词，使加载只在非复位分支进行。",
        "template": "always @(posedge clk) begin\n if(!rst_n) q<=4'd0;\n ___(en) q<=d;\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "else if"
            ]
          }
        ],
        "explain": "复位与加载互斥，复位优先。",
        "objective": "解释复位、使能、保持的优先级",
        "reviewSection": "study-code",
        "hint": "不要把同步复位波形画成复位信号一变就立即清零。",
        "objectiveId": "reset-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "input wire clk,rst_n,en,d；output reg q。规格是同步低有效复位、en使能。不能在两沿间因rst_n变化立刻改q。",
        "starter": "always @(posedge clk or negedge rst_n) begin\n if(!rst_n) q<=0;\n else if(en) q<=d;\nend",
        "accepted": [
          "always @(posedge clk) begin\n if(!rst_n) q<=0;\n else if(en) q<=d;\nend"
        ],
        "solution": "always @(posedge clk) begin\n if(!rst_n) q<=0;\n else if(en) q<=d;\nend",
        "explain": "条件优先级正确，但事件列表实现了异步复位。同步规格只允许时钟沿更新。",
        "hint": "把复位在两个上升沿之间拉低，错误版何时变0？",
        "context": "input wire clk,rst_n,en,d；output reg q。规格是同步低有效复位、en使能。不能在两沿间因rst_n变化立刻改q。",
        "requireReason": true,
        "objective": "按同步复位规格选择事件列表",
        "reviewSection": "study-code",
        "objectiveId": "reset-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "实现8位同步低有效复位使能寄存器，列出复位、保持、加载、复位优先四种测试。",
        "starter": "module reg8(input wire clk,rst_n,en,input wire [7:0] d,output reg [7:0] q);\nendmodule",
        "solution": "always @(posedge clk) if(!rst_n) q<=0; else if(en) q<=d; 测d=AA,en=0保持及rst_n=0,en=1清零。",
        "kind": "implementation",
        "revision": 2,
        "interface": "module reg8(input wire clk,rst_n,en,input wire [7:0] d,output reg [7:0] q);\nendmodule",
        "tests": [
          "rst_n=0时不论en为何值，采样沿后Q=0；rst_n=1,en=0保持；rst_n=1,en=1加载d。"
        ],
        "objective": "解释复位、使能、保持的优先级",
        "reviewSection": "study-code",
        "hint": "不要把同步复位波形画成复位信号一变就立即清零。",
        "objectiveId": "reset-task-4"
      },
      {
        "type": "波形分析",
        "prompt": "Q原5，同步复位在两个时钟沿之间拉低；最后一列为新上升沿后。 请按时间先后填写题目所问的输出序列，用逗号分隔。观察复位拉低后、新时钟沿后的Q。",
        "explain": "复位由有效沿采样。",
        "kind": "answer",
        "revision": 2,
        "wave": {
          "signals": [
            [
              "clk",
              [
                0,
                0,
                1
              ]
            ],
            [
              "rst_n",
              [
                1,
                0,
                0
              ]
            ],
            [
              "Q",
              [
                5,
                5,
                0
              ]
            ]
          ],
          "caption": "Q原5，同步复位在两个时钟沿之间拉低；最后一列为新上升沿后。",
          "answer": [
            "5,0"
          ]
        },
        "accepted": [
          "5,0"
        ],
        "objective": "解释复位、使能、保持的优先级",
        "reviewSection": "study-concept",
        "hint": "不要把同步复位波形画成复位信号一变就立即清零。",
        "objectiveId": "reset-task-5"
      }
    ],
    "kind": "enabled",
    "hardware": "dff",
    "lines": {
      "3": "敏感事件只有posedge clk，所以rst_n拉低本身不会立即改q。这是同步复位。",
      "4": "!rst_n为真说明低有效复位被请求，q安排清零；即便en同时为1也不执行else。",
      "5": "非复位且en为1才装入d；en为0没有赋值，寄存器保持旧q。保持在时序过程里是正确需求。",
      "8": "把negedge rst_n加入事件列表后才成为异步置零。释放仍需核对恢复/移除时序，不能只换名字。"
    },
    "lineSources": {
      "3": " always @(posedge clk) begin",
      "4": "  if(!rst_n) q <= 4'd0;",
      "5": "  else if(en) q <= d;",
      "8": " // @(posedge clk or negedge rst_n)"
    }
  },
  "shift-pulse": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "prev<=sig",
        "记录本次供下拍",
        "读旧值"
      ],
      [
        "sig & ~prev",
        "上升检测",
        "结果寄存"
      ],
      [
        "history[2:0]",
        "保留旧低3位",
        "最高位丢弃"
      ],
      [
        "pulse",
        "一个周期有效",
        "不是固定ns脉宽"
      ]
    ],
    "bug": {
      "wrong": "prev=sig; pulse=sig & ~prev;",
      "why": "阻塞先改prev使检测恒0。",
      "fix": "prev<=sig; pulse<=sig & ~prev;",
      "test": "初0时连续采0,1,1,0,1，脉冲应0,1,0,0,1。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "sig连续保持1，pulse会一直1吗？",
        "options": [
          "每拍交替",
          "不会，仅首次上升一个周期",
          "会"
        ],
        "correct": 1,
        "explain": "prev下一拍已经1。",
        "kind": "choice",
        "revision": 2,
        "objective": "画出sig依次0、1、1、0时pulse序列。",
        "reviewSection": "study-concept",
        "hint": "这是同域边沿检测器，不是异步事件无损传输器。",
        "objectiveId": "shift-pulse-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "sig属于本时钟域。prev保留上一采样值，要求仅在0→1的采样沿产生pulse。填写检测表达式。",
        "template": "prev<=sig;\npulse<=___;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "sig&~prev"
            ]
          }
        ],
        "explain": "比较当前输入与旧prev，不读待提交的新prev。",
        "objective": "非阻塞赋值让pulse读到旧prev，而不是刚安排的新值。",
        "reviewSection": "study-code",
        "hint": "这是同域边沿检测器，不是异步事件无损传输器。",
        "objectiveId": "shift-pulse-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "同域sig；clk,rst_n输入，prev和pulse为reg。要求检测1→0下降变化，复位全0。",
        "starter": "always @(posedge clk) begin\n if(!rst_n) begin prev<=0; pulse<=0; end\n else begin prev<=sig; pulse<=sig & ~prev; end\nend",
        "accepted": [
          "always @(posedge clk) begin\n if(!rst_n) begin prev<=0; pulse<=0; end\n else begin prev<=sig; pulse<=~sig & prev; end\nend"
        ],
        "solution": "always @(posedge clk) begin\n if(!rst_n) begin prev<=0; pulse<=0; end\n else begin prev<=sig; pulse<=~sig & prev; end\nend",
        "explain": "课堂演示的是上升检测，本题要求下降。旧prev=1、本拍sig=0时才产生脉冲。",
        "hint": "分别列prev/sig为01和10时想要的输出。",
        "context": "同域sig；clk,rst_n输入，prev和pulse为reg。要求检测1→0下降变化，复位全0。",
        "requireReason": true,
        "objective": "将变化检测迁移为下降沿检测",
        "reviewSection": "study-code",
        "objectiveId": "shift-pulse-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "实现下降沿检测和8位历史，给1,1,0,0,1采样的pulse预期。",
        "starter": "// 初始prev=0，明确复位策略",
        "solution": "pulse<=~sig & prev; history<={history[6:0],sig}; 预期0,0,1,0,0。",
        "kind": "implementation",
        "revision": 2,
        "interface": "// 初始prev=0，明确复位策略",
        "tests": [
          "初prev=1，sig按沿1、1、0、0、1，下降沿脉冲应0、0、1、0、0；输入必须已在本时钟域同步。"
        ],
        "objective": "非阻塞赋值让pulse读到旧prev，而不是刚安排的新值。",
        "reviewSection": "study-code",
        "hint": "这是同域边沿检测器，不是异步事件无损传输器。",
        "objectiveId": "shift-pulse-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "prev初0，sig按1,1,0,1采，pulse？",
        "options": [
          "1,0,0,1",
          "1,1,0,1",
          "0,1,1,0"
        ],
        "correct": 0,
        "explain": "按新sig与旧prev比较。",
        "kind": "choice",
        "revision": 2,
        "objective": "非阻塞赋值让pulse读到旧prev，而不是刚安排的新值。",
        "reviewSection": "study-concept",
        "hint": "这是同域边沿检测器，不是异步事件无损传输器。",
        "objectiveId": "shift-pulse-task-5"
      }
    ],
    "lines": {
      "8": "prev安排保存本沿sig，但这行没有立刻改变后面的prev读取值。",
      "9": "pulse比较本沿sig与上一沿保存的prev；从0到1的第一个采样沿输出1，连续高电平只输出一次。sig应已属于本时钟域。",
      "10": "旧history低3位左移，最新sig接最低位。history=1010,sig=1后为0101，最高旧位被丢弃。"
    },
    "lineSources": {
      "8": "   prev<=sig;",
      "9": "   pulse<=sig & ~prev;",
      "10": "   history<={history[2:0],sig};"
    }
  },
  "alu": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "sum[4]",
        "无符号进位",
        "不等于signed溢出"
      ],
      [
        "sum[3:0]",
        "低4位结果",
        "截断明确"
      ],
      [
        "op",
        "操作码",
        "规格固定"
      ],
      [
        "default",
        "非法码行为",
        "本例清0"
      ]
    ],
    "bug": {
      "wrong": "case(op) 0:{carry,y}=a+b; 1:y=a&b; endcase",
      "why": "逻辑分支没有给carry赋值。",
      "fix": "y=0; carry=0; case(op) 0:{carry,y}={1'b0,a}+{1'b0,b}; 1:y=a&b; default:y=0; endcase",
      "test": "先15+1，再切AND，carry必须清0。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "15+1时carry/y？",
        "options": [
          "1/0",
          "0/0",
          "0/16"
        ],
        "correct": 0,
        "explain": "5位和10000。",
        "kind": "choice",
        "revision": 2,
        "objective": "给每个op至少设计一组测试，并加上全0和最大值边界。",
        "reviewSection": "study-concept",
        "hint": "无符号进位与补码有符号溢出不要混用。",
        "objectiveId": "alu-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "两个4位无符号输入已扩为5位sum，y取低四位。填写无符号进位的位号，使15+1产生carry=1。",
        "template": "sum={1'b0,a}+{1'b0,b};\ny=sum[3:0]; carry=sum[___];",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "4"
            ]
          }
        ],
        "explain": "第5位是无符号进位。",
        "objective": "先扩展输入再加，保留第5位。",
        "reviewSection": "study-code",
        "hint": "无符号进位与补码有符号溢出不要混用。",
        "objectiveId": "alu-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "input wire [3:0] a,b；input wire op；output reg [3:0] y。op=0与运算，op=1异或运算。",
        "starter": "always @(*) begin\n if(op) y=a|b;\n else y=a&b;\nend",
        "accepted": [
          "always @(*) begin\n if(op) y=a^b;\n else y=a&b;\nend"
        ],
        "solution": "always @(*) begin\n if(op) y=a^b;\n else y=a&b;\nend",
        "explain": "错误把异或写成或；a=b=1111、op=1时应为0000而不是1111。",
        "hint": "选择能让OR与XOR不同的输入作为反例。",
        "context": "input wire [3:0] a,b；input wire op；output reg [3:0] y。op=0与运算，op=1异或运算。",
        "requireReason": true,
        "objective": "用反例区分异或与或",
        "reviewSection": "study-code",
        "objectiveId": "alu-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "扩展ALU加入OR与减法，明确减法借位/标志定义，列出每个操作预期。",
        "starter": "// 先写操作码表与标志规格",
        "solution": "扩大op宽度；每分支赋y和标志。减法标志可定义borrow=(a<b)，不可与加法carry混称。",
        "kind": "implementation",
        "revision": 2,
        "interface": "// 先写操作码表与标志规格",
        "tests": [
          "a=F,b=1：加法进位1、结果0；OR结果F；减法E且无借位；a=0,b=1减法借位1、低4位F。先在规格中约定借位含义。"
        ],
        "objective": "先扩展输入再加，保留第5位。",
        "reviewSection": "study-code",
        "hint": "无符号进位与补码有符号溢出不要混用。",
        "objectiveId": "alu-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "a=F,b=1，op从加法切XOR，carry序列？",
        "options": [
          "1,1",
          "0,1",
          "1,0"
        ],
        "correct": 2,
        "explain": "XOR分支用默认carry=0。",
        "kind": "choice",
        "revision": 2,
        "objective": "先扩展输入再加，保留第5位。",
        "reviewSection": "study-concept",
        "hint": "无符号进位与补码有符号溢出不要混用。",
        "objectiveId": "alu-task-5"
      }
    ],
    "lines": {
      "5": "sum宽5位，保存两个4位数之和及进位；使用阻塞赋值让下面case读本次sum。",
      "6": "每次重算都先清y、carry，所以切换到AND/XOR操作不会留住加法的旧进位。",
      "8": "op=0取sum低4位为y，第4位为无符号进位。例如F+1得到y=0,carry=1。",
      "10": "op=2每位异或，不能用逻辑||替换；carry沿用本次默认0。"
    },
    "lineSources": {
      "5": "  sum={1'b0,a}+{1'b0,b};",
      "6": "  y=4'd0; carry=1'b0;",
      "8": "   2'd0: begin y=sum[3:0]; carry=sum[4]; end",
      "10": "   2'd2: y=a ^ b;"
    }
  },
  "moore-mealy": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "当前状态",
        "prev",
        "历史信息"
      ],
      [
        "Mealy",
        "状态和当前输入",
        "沿间可变"
      ],
      [
        "Moore",
        "状态/寄存输出",
        "沿后更新"
      ],
      [
        "延迟",
        "以接收事件定义",
        "不能只看图形位置"
      ]
    ],
    "bug": {
      "wrong": "assign done=next_state==DONE; // 声称严格Moore",
      "why": "next_state含当前输入，输出可能沿前变化。",
      "fix": "assign done=state==DONE;",
      "test": "改变start但不给时钟，检查输出是否按规格保持。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "prev=1，bit_in沿间0→1，mealy？",
        "options": [
          "保持0",
          "立即逻辑变1",
          "必须下一沿"
        ],
        "correct": 1,
        "explain": "组合依赖输入。",
        "kind": "choice",
        "revision": 2,
        "objective": "区分沿间与沿后输出",
        "reviewSection": "study-concept",
        "hint": "next_state含当前输入，输出可能沿前变化。",
        "objectiveId": "moore-mealy-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "prev是一拍前的输入，bit_in为当前输入。要求沿间检测连续两个1，填写组合检测关系。",
        "template": "assign mealy = ___;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "prev&bit_in"
            ]
          }
        ],
        "explain": "组合输出依赖当前状态prev和当前输入。",
        "objective": "说明寄存输出的延迟代价",
        "reviewSection": "study-code",
        "hint": "next_state含当前输入，输出可能沿前变化。",
        "objectiveId": "moore-mealy-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "input wire prev,bit_in；output wire detect。prev是上一位，要求检测连续11，并在沿间组合响应。",
        "starter": "assign detect=prev | bit_in;",
        "accepted": [
          "assign detect=prev & bit_in;"
        ],
        "solution": "assign detect=prev & bit_in;",
        "explain": "或门会把01和10也当成11。需要历史与当前输入同时为1，仍是Mealy组合输出。",
        "hint": "列四种prev/bit_in组合，只允许哪一行输出1？",
        "context": "input wire prev,bit_in；output wire detect。prev是上一位，要求检测连续11，并在沿间组合响应。",
        "requireReason": true,
        "objective": "用上一位和当前位共同检测11",
        "reviewSection": "study-code",
        "objectiveId": "moore-mealy-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "给序列1,1,0,1画mealy沿前与moore沿后结果，注明观察相位。",
        "starter": "初始prev=0、moore=0",
        "solution": "每个沿前mealy按旧prev和输入为0,1,0,0；沿后moore同序列。沿后mealy还可能因prev提交而改变，因此须标相位。",
        "kind": "implementation",
        "revision": 2,
        "interface": "初始prev=0、moore=0",
        "tests": [
          "给定初prev=0、moore=0，输入1、1、0、1：Mealy各沿前结果0、1、0、0，Moore各沿后结果0、1、0、0；另在prev=1时沿间改bit_in，比较是否立即响应。"
        ],
        "objective": "说明寄存输出的延迟代价",
        "reviewSection": "study-code",
        "hint": "next_state含当前输入，输出可能沿前变化。",
        "objectiveId": "moore-mealy-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "prev=1,moore=0，输入1但还没新沿，输出？",
        "options": [
          "mealy=1,moore=0",
          "都1",
          "都0"
        ],
        "correct": 0,
        "explain": "寄存输出尚未更新。",
        "kind": "choice",
        "revision": 2,
        "objective": "说明寄存输出的延迟代价",
        "reviewSection": "study-concept",
        "hint": "next_state含当前输入，输出可能沿前变化。",
        "objectiveId": "moore-mealy-task-5"
      }
    ],
    "lines": {
      "2": "prev保存上一采样位，表示检测器的历史状态。它不是当前输入的另一名字。",
      "3": "prev与当前bit_in相与，只要这两个条件在沿间成立，mealy就可立刻变化。",
      "6": "两条<=都读旧prev。moore把当前检测结果保存到输出寄存器，沿后变化；这是把输出纳入扩展状态的实现。"
    },
    "lineSources": {
      "2": " reg prev;",
      "3": " assign mealy=prev & bit_in;",
      "6": "  else begin prev<=bit_in; moore<=prev & bit_in; end"
    }
  },
  "sv-logic": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "logic",
        "四态类型",
        "常见单驱动"
      ],
      [
        "bit",
        "两态类型",
        "未知可能丢失"
      ],
      [
        "wire logic",
        "网络+四态",
        "解析网络场景"
      ],
      [
        "logic输出",
        "不决定门/DFF",
        "看驱动行为"
      ]
    ],
    "bug": {
      "wrong": "logic y; assign y=a; always_comb y=b;",
      "why": "两个驱动源冲突。",
      "fix": "logic y; assign y=sel?b:a;",
      "test": "lint/编译检查多驱动，枚举选择。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "logic声明自动生成DFF吗？",
        "options": [
          "自动生成RAM",
          "不，取决于赋值行为",
          "会"
        ],
        "correct": 1,
        "explain": "类型不是结构。",
        "kind": "choice",
        "revision": 2,
        "objective": "区分四态logic和二态bit",
        "reviewSection": "study-concept",
        "hint": "不要把所有信号换成bit来“消灭X”，那可能掩盖未初始化错误。",
        "objectiveId": "sv-logic-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "迁移到SystemVerilog：y由下面一条assign单独驱动，仍需保留四态信息。填写本课的数据类型。",
        "template": "output ___ y;\nassign y=sel?b:a;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "logic"
            ]
          }
        ],
        "explain": "SV四态数据类型，可用于这条单驱动组合输出。",
        "objective": "启用SV模式，保持单驱动规则",
        "reviewSection": "study-code",
        "hint": "不要把所有信号换成bit来“消灭X”，那可能掩盖未初始化错误。",
        "objectiveId": "sv-logic-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "SystemVerilog模块内部采样值saved必须保留X以暴露未初始化；保持1位并修改类型。",
        "starter": "bit saved;",
        "accepted": [
          "logic saved;"
        ],
        "solution": "logic saved;",
        "explain": "bit是两态，会丢失未知信息。logic保留四态但仍要正常初始化或复位，不能把未知简单隐藏。",
        "hint": "本题需要表示0、1之外的未知，选择几态类型？",
        "context": "SystemVerilog模块内部采样值saved必须保留X以暴露未初始化；保持1位并修改类型。",
        "requireReason": true,
        "objective": "保留未知值而非隐藏为两态",
        "reviewSection": "study-code",
        "objectiveId": "sv-logic-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "把gate_styles迁移到SV，保证每个输出只有一个驱动。",
        "starter": "// 分别保留连续与过程写法",
        "solution": "y1用assign，y2用always_comb；均logic且驱动各自独立，功能同与门。",
        "kind": "implementation",
        "revision": 2,
        "interface": "// 分别保留连续与过程写法",
        "tests": [
          "每个输出只保留一个驱动源；组合MUX遍历sel0/1及a=b、a!=b；DFF沿间保持。"
        ],
        "objective": "启用SV模式，保持单驱动规则",
        "reviewSection": "study-code",
        "hint": "不要把所有信号换成bit来“消灭X”，那可能掩盖未初始化错误。",
        "objectiveId": "sv-logic-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "单驱动logic的MUX，sel从0变1，y？",
        "options": [
          "从a切b，不等时钟",
          "始终a",
          "等posedge"
        ],
        "correct": 0,
        "explain": "连续赋值仍是组合电路。",
        "kind": "choice",
        "revision": 2,
        "objective": "启用SV模式，保持单驱动规则",
        "reviewSection": "study-concept",
        "hint": "不要把所有信号换成bit来“消灭X”，那可能掩盖未初始化错误。",
        "objectiveId": "sv-logic-task-5"
      }
    ],
    "lines": {
      "1": "logic仍是四态类型，可保留X/Z帮助调试；bit为两态，不能用它“修好”未知值。",
      "2": "y是变量型输出，下面只由一条连续赋值驱动。这里不再按传统Verilog要求写output wire。",
      "3": "sel选择b或a，y不会因为类型名logic就存储旧值；若同时再让always_comb写y会违反单驱动意图。"
    },
    "lineSources": {
      "1": "module mux_sv(input logic a,b,sel,",
      "2": " output logic y);",
      "3": " assign y = sel ? b : a;"
    }
  },
  "sv-latch": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "always_latch",
        "电平敏感存储意图",
        "不是时钟沿"
      ],
      [
        "if(gate)",
        "透明条件",
        "gate=1"
      ],
      [
        "无else",
        "刻意保持",
        "须写在规格里"
      ],
      [
        "always_ff",
        "沿触发",
        "不能互换"
      ]
    ],
    "bug": {
      "wrong": "always_comb if(gate) q=d;",
      "why": "要求保持的行为违背组合意图。",
      "fix": "always_latch if(gate) q<=d; // 仅当规格确实需要锁存",
      "test": "gate高时切d应跟随，gate低切d应保持。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "gate=0，d从0变1，q？",
        "options": [
          "必清0",
          "保持",
          "随d变1"
        ],
        "correct": 1,
        "explain": "关门后存储。",
        "kind": "choice",
        "revision": 2,
        "objective": "解释锁存器的透明区间",
        "reviewSection": "study-concept",
        "hint": "要求保持的行为违背组合意图。",
        "objectiveId": "sv-latch-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "规格明确需要gate=1透明、=0保持。填写表达有意锁存的SystemVerilog过程关键字。",
        "template": "___ begin\n if(gate) q<=d;\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "always_latch"
            ]
          }
        ],
        "explain": "只有规格确需电平敏感存储时声明锁存意图。",
        "objective": "区分有意存储与组合漏赋值",
        "reviewSection": "study-code",
        "hint": "要求保持的行为违背组合意图。",
        "objectiveId": "sv-latch-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "input logic gate_n,d；output logic q。规格是gate_n=0时透明、=1时保持。",
        "starter": "always_latch if(gate_n) q<=d;",
        "accepted": [
          "always_latch if(!gate_n) q<=d;"
        ],
        "solution": "always_latch if(!gate_n) q<=d;",
        "explain": "always_latch不理解名字后缀_n；条件为真才赋值，低有效门控必须取反。",
        "hint": "gate_n=0代入原条件，是透明还是保持？",
        "context": "input logic gate_n,d；output logic q。规格是gate_n=0时透明、=1时保持。",
        "requireReason": true,
        "objective": "按低有效规格实现透明锁存",
        "reviewSection": "study-code",
        "objectiveId": "sv-latch-task-3"
      },
      {
        "type": "透明窗口推导",
        "prompt": "写高有效透明锁存规格，列gate=1和0各两次D切换的Q预期。",
        "starter": "gate=1: D0→1\ngate=0: D1→0",
        "solution": "开门Q随0→1；关门后Q保持1，D变0也不改变。",
        "kind": "analysis",
        "revision": 2,
        "interface": "gate=1: D0→1\ngate=0: D1→0",
        "tests": [
          "gate=1时D=0→1→0，Q跟随；gate关闭后D再变化，Q保持关闭前的值；不要按posedge模型解释。"
        ],
        "objective": "区分有意存储与组合漏赋值",
        "reviewSection": "study-concept",
        "hint": "要求保持的行为违背组合意图。",
        "objectiveId": "sv-latch-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "先gate=1,d=1，再gate=0,d=0，Q？",
        "options": [
          "1,1",
          "1,0",
          "0,0"
        ],
        "correct": 0,
        "explain": "关闭后保存1。",
        "kind": "choice",
        "revision": 2,
        "objective": "区分有意存储与组合漏赋值",
        "reviewSection": "study-concept",
        "hint": "要求保持的行为违背组合意图。",
        "objectiveId": "sv-latch-task-5"
      }
    ],
    "lines": {
      "1": "gate是电平开关，不是边沿时钟。规格确实要求透明区间才选锁存器。",
      "2": "always_latch表达有意的电平存储；工具可检查行为是否像锁存，但不自动纠正条件极性。",
      "3": "gate=1时q跟随d，gate=0时不写q所以保持。这与always_ff在posedge采一次不同。"
    },
    "lineSources": {
      "1": "module latch_example(input logic gate,d,output logic q);",
      "2": " always_latch begin",
      "3": "  if(gate) q<=d;"
    }
  },
  "sv-arrays": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "[7:0] mem[0:3]",
        "4元素×8位",
        "32bit"
      ],
      [
        "mem[index]",
        "选元素",
        "8位结果"
      ],
      [
        "mem[2][0]",
        "元素2最低位",
        "1位"
      ],
      [
        "queue[$]",
        "动态队列",
        "验证用"
      ]
    ],
    "bug": {
      "wrong": "logic mem[0:3]; // 想存4个字节",
      "why": "每个元素只有1位。",
      "fix": "logic [7:0] mem[0:3];",
      "test": "写入AA/55/F0/0F逐元素读回。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "mem[0:3]每元素8位，总位数？",
        "options": [
          "32",
          "12",
          "4"
        ],
        "correct": 0,
        "explain": "4乘8。",
        "kind": "choice",
        "revision": 2,
        "objective": "分清元素数量与每个元素位宽",
        "reviewSection": "study-concept",
        "hint": "不要把mem[2]理解成第二个位；这是8位的第2号元素。",
        "objectiveId": "sv-arrays-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "需要4个字节，元素地址0..3。填写名字左边的位范围，使每个mem[i]恰好8位。",
        "template": "logic [___] mem [0:3];",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "7:0"
            ]
          }
        ],
        "explain": "每元素8位，共4个元素。",
        "objective": "正确访问数组元素和某一位",
        "reviewSection": "study-code",
        "hint": "不要把mem[2]理解成第二个位；这是8位的第2号元素。",
        "objectiveId": "sv-arrays-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "需要8个16位字，地址0..7；请只修改存储声明，不把元素维写成位维。",
        "starter": "logic [7:0] words [0:15];",
        "accepted": [
          "logic [15:0] words [0:7];"
        ],
        "solution": "logic [15:0] words [0:7];",
        "explain": "错误是16个8位元素，虽然总位数相同，接口和寻址语义不同。左边规定元素宽度，右边规定个数。",
        "hint": "先问words[0]需要几位，再问最后一个地址是几。",
        "context": "需要8个16位字，地址0..7；请只修改存储声明，不把元素维写成位维。",
        "requireReason": true,
        "objective": "同时确定元素宽度和元素个数",
        "reviewSection": "study-code",
        "objectiveId": "sv-arrays-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "声明8×16固定数组，计算总bit和地址位数，并画元素/位两个层次。",
        "starter": "声明：\n总位：\n地址：",
        "solution": "logic [15:0] mem[0:7]; 共128bit，3位地址。",
        "kind": "implementation",
        "revision": 2,
        "interface": "声明：\n总位：\n地址：",
        "tests": [
          "8个元素，每个16位，总128bit；元素地址需要3位；[15:0]放在名字前，[0:7]放在名字后。"
        ],
        "objective": "正确访问数组元素和某一位",
        "reviewSection": "study-code",
        "hint": "不要把mem[2]理解成第二个位；这是8位的第2号元素。",
        "objectiveId": "sv-arrays-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "本例index依次0、3、1，data？",
        "options": [
          "0,3,1",
          "10,30,40",
          "10,40,20"
        ],
        "correct": 2,
        "explain": "查找表按元素索引。",
        "kind": "choice",
        "revision": 2,
        "objective": "正确访问数组元素和某一位",
        "reviewSection": "study-concept",
        "hint": "不要把mem[2]理解成第二个位；这是8位的第2号元素。",
        "objectiveId": "sv-arrays-task-5"
      }
    ],
    "lines": {
      "3": "名字左边[7:0]规定每个元素8位，右边[0:3]规定4个元素，总容量32位。",
      "7": "mem[2]被固定驱动为30，这是查找常量，不是时钟沿写RAM。",
      "9": "index为2位，选择0到3的一个8位元素。mem[index][0]才是该元素最低位。"
    },
    "lineSources": {
      "3": " logic [7:0] mem [0:3];",
      "7": " assign mem[2] = 8'd30;",
      "9": " assign data = mem[index];"
    }
  },
  "sv-types": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "typedef",
        "类型别名",
        "不是实例"
      ],
      [
        "state_t state",
        "声明变量",
        "枚举类型"
      ],
      [
        "beat.data",
        "字段访问",
        "8位"
      ],
      [
        "struct packed",
        "连续位串",
        "本例9位"
      ]
    ],
    "bug": {
      "wrong": "beat_t beat; assign beat=8'hff;",
      "why": "结构宽9位，valid字段意图不清。",
      "fix": "assign beat={1'b1,8'hff};",
      "test": "核对beat.valid=1且data=FF。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "beat_t总宽度？",
        "options": [
          "2",
          "9",
          "8"
        ],
        "correct": 1,
        "explain": "1+8。",
        "kind": "choice",
        "revision": 2,
        "objective": "用typedef与enum表达状态类型",
        "reviewSection": "study-concept",
        "hint": "数组维度的位置改变含义，不能只看两个中括号就认为相同。",
        "objectiveId": "sv-types-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "beat属于含valid和data的beat_t；out_data为8位，只要数据字段，不含最高有效位。填写成员访问。",
        "template": "typedef struct packed {\n logic valid;\n logic [7:0] data;\n} beat_t;\nassign out_data = ___;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "beat.data"
            ]
          }
        ],
        "explain": "点号访问实例字段。",
        "objective": "计算packed struct总位数",
        "reviewSection": "study-code",
        "hint": "数组维度的位置改变含义，不能只看两个中括号就认为相同。",
        "objectiveId": "sv-types-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "已定义typedef struct packed {logic [3:0] tag; logic [7:0] value;} item_t；item为wire item_t。要求tag=A,value=35。",
        "starter": "assign item={8'h35,4'hA};",
        "accepted": [
          "assign item={4'hA,8'h35};"
        ],
        "solution": "assign item={4'hA,8'h35};",
        "explain": "packed第一个字段占高位。错误拼接虽也是12位，但会把字段边界错位。",
        "hint": "按声明顺序标出高4位与低8位，再摆放常量。",
        "context": "已定义typedef struct packed {logic [3:0] tag; logic [7:0] value;} item_t；item为wire item_t。要求tag=A,value=35。",
        "requireReason": true,
        "objective": "按声明顺序拼接结构字段",
        "reviewSection": "study-code",
        "objectiveId": "sv-types-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "定义包含valid、2位kind、16位data的packed结构，列出总宽和字段位置。",
        "starter": "typedef struct packed {\n} packet_t;",
        "solution": "共19位；valid在18，kind在17:16，data在15:0。",
        "kind": "implementation",
        "revision": 2,
        "interface": "typedef struct packed {\n} packet_t;",
        "tests": [
          "结构总宽1+2+16=19；valid位18，kind位17:16，data位15:0；按字段赋值后再核对整体位串。"
        ],
        "objective": "计算packed struct总位数",
        "reviewSection": "study-code",
        "hint": "数组维度的位置改变含义，不能只看两个中括号就认为相同。",
        "objectiveId": "sv-types-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "valid=1,data=00时结构9位串？",
        "options": [
          "1_00000000",
          "0_11111111",
          "00000001"
        ],
        "correct": 0,
        "explain": "按字段顺序拼接。",
        "kind": "choice",
        "revision": 2,
        "objective": "计算packed struct总位数",
        "reviewSection": "study-concept",
        "hint": "数组维度的位置改变含义，不能只看两个中括号就认为相同。",
        "objectiveId": "sv-types-task-5"
      }
    ],
    "lines": {
      "3": "IDLE/RUN/DONE分别具有显式2位编码；enum把状态的允许名称和类型放在一起。",
      "5": "state是state_t类型的变量，不是新定义的类型。typedef只造类型名，不自动创建存储实例。",
      "7": "packed按声明顺序排列字段，valid放在整个9位结构的最高位[8]，data占[7:0]。",
      "10": "beat创建一个9位结构对象，beat.data访问低8位，beat.valid访问状态位。"
    },
    "lineSources": {
      "3": "  IDLE=2'd0, RUN=2'd1, DONE=2'd2",
      "5": " state_t state;",
      "7": "  logic valid;",
      "10": " beat_t beat;"
    }
  },
  "sv-package": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "types_pkg::byte_t",
        "包内的8位共享类型",
        "先定义包"
      ],
      [
        "sample_if wires()",
        "创建一份实际信号集合",
        "对象不是类型名"
      ],
      [
        "modport producer",
        "允许连接模块驱动value",
        "observer读取同一份value"
      ]
    ],
    "bug": {
      "wrong": "modport observer(output value);",
      "fix": "modport observer(input value);",
      "why": "观察者应读取已有value，不能和生产者共同驱动。",
      "test": "x=A5时确认wires.value和y均为A5，且只有source驱动value。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "sample_if.producer把value声明为output，这个方向是谁的视角？",
        "options": [
          "使用producer视图的模块",
          "外部电脑",
          "package本身"
        ],
        "correct": 0,
        "explain": "source使用producer视图，负责驱动bus.value；sink使用observer视图，只读取它。包定义类型，不是信号驱动者。",
        "kind": "choice",
        "revision": 3,
        "objective": "从使用模块视角判断modport方向",
        "reviewSection": "study-concept",
        "hint": "modport限定读写方向，不会自动插入缓存、仲裁或实现协议。先检查每个信号谁驱动、谁读取。",
        "objectiveId": "sv-package-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "byte_t在types_pkg包中，不是模块实例成员。填写包作用域分隔符。",
        "template": "types_pkg___byte_t payload;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "::"
            ]
          }
        ],
        "explain": "包作用域不是实例层次的点号。",
        "objective": "引用包内共享类型",
        "reviewSection": "study-code",
        "hint": "modport限定读写方向，不会自动插入缓存、仲裁或实现协议。先检查每个信号谁驱动、谁读取。",
        "objectiveId": "sv-package-task-2"
      },
      {
        "kind": "analysis",
        "type": "调试推理",
        "revision": 3,
        "prompt": "一个16位采样接口被writer和reader共同使用，两者都声明output sample。请写出正确方向并解释冲突。",
        "starter": "modport writer(output sample);\nmodport reader(output sample);",
        "solution": "writer(output sample)，reader(input sample)；仅writer驱动同一个接口对象。",
        "explain": "同一条sample只有writer驱动；reader声明input来读取，不额外复制信号。",
        "tests": [
          "writer驱动sample；reader只读sample，二者连接同一份接口对象"
        ],
        "objective": "识别接口中的多驱动",
        "reviewSection": "study-concept",
        "hint": "modport限定读写方向，不会自动插入缓存、仲裁或实现协议。先检查每个信号谁驱动、谁读取。",
        "objectiveId": "sv-package-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "独立定义16位sample的interface和writer/reader modport，再在顶层创建一份对象。说明谁驱动它。",
        "starter": "interface sample16_if;\nendinterface",
        "solution": "interface sample16_if; logic [15:0] sample; modport writer(output sample); modport reader(input sample); endinterface\n// 在顶层声明：sample16_if wires();",
        "kind": "implementation",
        "revision": 3,
        "interface": "interface sample16_if; // 16位sample与两个视图\nendinterface",
        "tests": [
          "x=1234时读回1234",
          "只有writer驱动sample"
        ],
        "objective": "定义接口并创建一份对象",
        "reviewSection": "study-code",
        "hint": "modport限定读写方向，不会自动插入缓存、仲裁或实现协议。先检查每个信号谁驱动、谁读取。",
        "objectiveId": "sv-package-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "sample_if wires()创建了几份value信号？producer与observer是两份数据吗？",
        "options": [
          "一份信号的两种访问视图",
          "两份独立数据",
          "没有信号只有类型"
        ],
        "correct": 0,
        "explain": "接口对象wires只有一份value；modport描述模块访问同一信号的方向。",
        "kind": "choice",
        "revision": 3,
        "objective": "区分接口对象与访问视图",
        "reviewSection": "study-concept",
        "hint": "modport限定读写方向，不会自动插入缓存、仲裁或实现协议。先检查每个信号谁驱动、谁读取。",
        "objectiveId": "sv-package-task-5"
      }
    ],
    "lines": {
      "2": "byte_t是types_pkg共享的8位类型，使用types_pkg::byte_t引用它。包没有输入输出信号。",
      "6": "producer视图允许连接它的模块驱动value，与observer访问的是同一个接口对象。",
      "10": "source把输入x持续接到接口成员bus.value。这里没有valid/ready传输规则。",
      "16": "wires创建一份sample_if接口对象。两个子模块的bus都连它，不能误写成两份不同接口。",
      "18": "u_sink只读wires.value并驱动父层y。沿x到y追线即可解释组合关系。"
    },
    "lineSources": {
      "2": "  typedef logic [7:0] byte_t;",
      "6": "  modport producer(output value);",
      "10": "  assign bus.value=x;",
      "16": "  sample_if wires();",
      "18": "  sink u_sink(.bus(wires),.y(y));"
    }
  },
  "testbench": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "initial",
        "启动一次过程",
        "TB常用"
      ],
      [
        "always #5",
        "每5ns翻转",
        "10ns周期"
      ],
      [
        "@(negedge clk)",
        "等待下降沿",
        "不是延迟5个周期"
      ],
      [
        "$finish",
        "结束仿真",
        "要防无限运行"
      ]
    ],
    "bug": {
      "wrong": "@(posedge clk); en=1; // 和DUT同沿驱动",
      "why": "活动区执行顺序可能竞争。",
      "fix": "@(negedge clk); en=1;",
      "test": "打印每个有效沿前后值，确认没有多计/少计。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "always #5翻转时钟的周期？",
        "options": [
          "10ns",
          "5ns",
          "2ns"
        ],
        "correct": 0,
        "explain": "高低各5ns。",
        "kind": "choice",
        "revision": 2,
        "objective": "识别DUT与测试台的职责",
        "reviewSection": "study-concept",
        "hint": "把激励和DUT在同一个上升沿用阻塞赋值更新，可能产生仿真竞争。",
        "objectiveId": "testbench-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "当前timescale为1ns/1ps，clk初值0。要求周期10ns，填写每次翻转前的延迟数值。",
        "template": "always #___ clk=~clk;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "5"
            ]
          }
        ],
        "explain": "timescale为1ns单位时，高低各5ns形成10ns周期。",
        "objective": "避免激励与采样在同一沿竞争",
        "reviewSection": "study-code",
        "hint": "把激励和DUT在同一个上升沿用阻塞赋值更新，可能产生仿真竞争。",
        "objectiveId": "testbench-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "TB已定义reg clk=0；需要20ns周期且timescale为1ns/1ps。只修时钟生成。",
        "starter": "always #20 clk=~clk;",
        "accepted": [
          "always #10 clk=~clk;"
        ],
        "solution": "always #10 clk=~clk;",
        "explain": "#后面是每次翻转的半周期；等20ns翻转会得到40ns整周期。",
        "hint": "从0→1→0画两个相邻翻转间隔。",
        "context": "TB已定义reg clk=0；需要20ns周期且timescale为1ns/1ps。只修时钟生成。",
        "requireReason": true,
        "objective": "从半周期推导测试台时钟延迟",
        "reviewSection": "study-code",
        "objectiveId": "testbench-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "为计数器编写复位两拍、使能三拍、保持两拍的TB，给每段预期并加超时。",
        "starter": "// 在下降沿驱动，在下降沿核对",
        "solution": "先复位q=0，三个使能沿后q=3，再保持仍3；独立initial #1000 $fatal(1,\"timeout\");",
        "kind": "implementation",
        "revision": 2,
        "interface": "// 在下降沿驱动，在下降沿核对",
        "tests": [
          "先完成有效复位，再使能3个上升沿应q=3；保持2沿仍3；在下降沿观察，设置超时并对错误退出。"
        ],
        "objective": "避免激励与采样在同一沿竞争",
        "reviewSection": "study-code",
        "hint": "把激励和DUT在同一个上升沿用阻塞赋值更新，可能产生仿真竞争。",
        "objectiveId": "testbench-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "解除复位后en=1经过三沿，在下一下降沿q？",
        "options": [
          "2",
          "0",
          "3"
        ],
        "correct": 2,
        "explain": "三个沿各加1。",
        "kind": "choice",
        "revision": 2,
        "objective": "避免激励与采样在同一沿竞争",
        "reviewSection": "study-concept",
        "hint": "把激励和DUT在同一个上升沿用阻塞赋值更新，可能产生仿真竞争。",
        "objectiveId": "testbench-task-5"
      }
    ],
    "lines": {
      "1": "延迟单位为1ns，精度1ps。因此#5是5ns，不是5个时钟周期。",
      "3": "把clk初始化为0，翻转才会产生确定边沿；若初始X，~X仍为X。",
      "5": "dut是counter的一份实例，测试台驱动clk/rst_n/en，wire q接收计数结果。综合顶层应选counter，仿真选tb。",
      "6": "always重复执行；#5先等5个时间单位；~翻转clk；=更新仿真变量。本文件每5ns翻转，周期10ns。仅用于测试台，不是可综合时钟发生器。",
      "8": "等两个下降沿，即10ns与20ns，再解除复位；此前5ns与15ns的上升沿已经把同步计数器清零。",
      "10": "释放后再等30/40/50ns三个下降沿，之前25/35/45ns三个上升沿使q=3。",
      "12": "$finish结束仿真，否则生成时钟的always会一直运行。"
    },
    "lineSources": {
      "1": "`timescale 1ns/1ps",
      "3": " reg clk=0, rst_n=0, en=0;",
      "5": " counter dut(.clk(clk),.rst_n(rst_n),.en(en),.q(q));",
      "6": " always #5 clk=~clk;",
      "8": "  repeat(2) @(negedge clk);",
      "10": "  repeat(3) @(negedge clk);",
      "12": "  $finish;"
    }
  },
  "scheduling": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "Active",
        "执行过程与阻塞赋值",
        "可读旧q"
      ],
      [
        "NBA",
        "提交非阻塞更新",
        "同一时间槽"
      ],
      [
        "$display",
        "调用时打印",
        "不等待NBA"
      ],
      [
        "$strobe",
        "时间槽末观察",
        "TB诊断"
      ]
    ],
    "bug": {
      "wrong": "q<=d; #0; if(q!=d) $fatal;",
      "why": "#0不保证等待NBA提交。",
      "fix": "// 在后续安全采样相位检查，或用SV clocking block",
      "test": "对照本例display与strobe输出0和1。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "初q=0,d=1，同沿display读q？",
        "options": [
          "1",
          "随机一定",
          "0"
        ],
        "correct": 2,
        "explain": "本块安排尚未提交。",
        "kind": "choice",
        "revision": 2,
        "objective": "解释为什么在同沿立刻用if检查q可能误报。",
        "reviewSection": "study-concept",
        "hint": "网页阶段动画只是解释固定示例，不是完整事件调度器。",
        "objectiveId": "scheduling-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "q<=d后，要在同一时间槽末打印NBA提交后的q，不增加真实时间。填写适合的报告系统任务。",
        "template": "q<=d;\n$display(\"active=%b\",q);\n___(\"end-slot=%b\",q);",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "$strobe"
            ]
          }
        ],
        "explain": "在时间槽末观察提交后的q。",
        "objective": "5ns沿处q<=d先读取d=1，q仍是旧0。",
        "reviewSection": "study-code",
        "hint": "网页阶段动画只是解释固定示例，不是完整事件调度器。",
        "objectiveId": "scheduling-task-2"
      },
      {
        "kind": "analysis",
        "type": "调试推理",
        "revision": 2,
        "prompt": "在“事件调度、delta 与竞争：同一时刻不等于同时更新”中检查这个错误方案：q<=d; #0; if(q!=d) $fatal;。写出具体修改办法与核对步骤。",
        "starter": "q<=d; #0; if(q!=d) $fatal;",
        "solution": "// 在后续安全采样相位检查，或用SV clocking block",
        "explain": "#0不保证等待NBA提交。 修正后可这样核对：对照本例display与strobe输出0和1。",
        "tests": [
          "并发阻塞读写在同一沿不应依赖Active执行顺序；NBA版在Active读旧q，末尾观察新q；#0不等同等待NBA。"
        ],
        "objective": "5ns沿处q<=d先读取d=1，q仍是旧0。",
        "reviewSection": "study-concept",
        "hint": "网页阶段动画只是解释固定示例，不是完整事件调度器。",
        "objectiveId": "scheduling-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "写两个并发过程说明阻塞读写竞争，再改为NBA并明确采样相位。",
        "starter": "// 不依赖两个always谁先执行",
        "solution": "共享沿用非阻塞更新状态；TB在下降沿驱动/检查。记录初值和预期，不声称delta是物理延迟。",
        "kind": "implementation",
        "revision": 2,
        "interface": "// 不依赖两个always谁先执行",
        "tests": [
          "并发阻塞读写在同一沿不应依赖Active执行顺序；NBA版在Active读旧q，末尾观察新q；#0不等同等待NBA。"
        ],
        "objective": "5ns沿处q<=d先读取d=1，q仍是旧0。",
        "reviewSection": "study-code",
        "hint": "网页阶段动画只是解释固定示例，不是完整事件调度器。",
        "objectiveId": "scheduling-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "本例同一上升沿display/strobe各读？",
        "options": [
          "0/0",
          "0/1",
          "1/1"
        ],
        "correct": 1,
        "explain": "先活动区旧值，再NBA后的新值。",
        "kind": "choice",
        "revision": 2,
        "objective": "5ns沿处q<=d先读取d=1，q仍是旧0。",
        "reviewSection": "study-concept",
        "hint": "网页阶段动画只是解释固定示例，不是完整事件调度器。",
        "objectiveId": "scheduling-task-5"
      }
    ],
    "lines": {
      "4": "1ns时间单位下每5ns翻转clk，首个上升沿5ns，initial在6ns结束，所以本例只观察一个上升沿。",
      "6": "在5ns计算d=1并安排NBA写q，下面display暂时仍能看到初始q=0。",
      "7": "$display在调用时读取q，打印active q=0；同一时间戳不代表NBA已完成。",
      "8": "$strobe在当前时间槽末报告q，NBA已提交，打印end-slot q=1。#0仍在NBA前，不能当等待提交。"
    },
    "lineSources": {
      "4": " always #5 clk=~clk;",
      "6": "  q<=d;",
      "7": "  $display(\"active q=%b\",q);",
      "8": "  $strobe(\"end-slot q=%b\",q);"
    }
  },
  "checking": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "$fatal(1,...)",
        "失败退出",
        "自动化可识别"
      ],
      [
        "$dumpfile",
        "VCD文件名",
        "TB输出"
      ],
      [
        "$dumpvars",
        "波形范围",
        "可控层次"
      ],
      [
        "!==",
        "捕获未知",
        "失败条件明确"
      ]
    ],
    "bug": {
      "wrong": "if(q==expected) $display(\"PASS\"); // 无失败分支",
      "why": "错误时仿真仍可能正常退出。",
      "fix": "if(q !== expected) $fatal(1,\"mismatch\");",
      "test": "把DUT加1故意改成加2，回归应非0退出。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "最有价值的首个调试位置？",
        "options": [
          "文件最长行",
          "第一次预期与实际分歧",
          "最后一张截图"
        ],
        "correct": 1,
        "explain": "从首个分歧追溯原因。",
        "kind": "choice",
        "revision": 2,
        "objective": "写主动失败的输出检查",
        "reviewSection": "study-concept",
        "hint": "检查不能紧贴posedge就假设<=已经更新；可在后续下降沿检查，或采用合适的采样区域。",
        "objectiveId": "checking-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "actual q可能含X，expected是确定预期。填写能把未知也判为失败的四态不等运算符。",
        "template": "if(q ___ expected) $fatal(1,\"mismatch\");",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "!=="
            ]
          }
        ],
        "explain": "四态不等检查未知也不通过。",
        "objective": "运行仿真、看波形并故意注入错误",
        "reviewSection": "study-code",
        "hint": "检查不能紧贴posedge就假设<=已经更新；可在后续下降沿检查，或采用合适的采样区域。",
        "objectiveId": "checking-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "仅测试台片段，已声明wire [3:0] actual与reg [3:0] expected。actual为X时也必须失败，修复比较运算符。",
        "starter": "if(actual != expected) $fatal(1,\"bad result\");",
        "accepted": [
          "if(actual !== expected) $fatal(1,\"bad result\");"
        ],
        "solution": "if(actual !== expected) $fatal(1,\"bad result\");",
        "explain": "!=遇X可能返回X，if不把X当真，因此漏报；!==会给确定的不相等。",
        "hint": "先把actual设为4'bxxxx，问原条件能否确定为1。",
        "context": "仅测试台片段，已声明wire [3:0] actual与reg [3:0] expected。actual为X时也必须失败，修复比较运算符。",
        "requireReason": true,
        "objective": "用四态比较捕获未知输出",
        "reviewSection": "study-code",
        "objectiveId": "checking-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "为3位计数器写至少四类边界检查，再故意改加2证明检测器有效。",
        "starter": "测试名 | 输入 | 预期 | 实际",
        "solution": "复位、保持、7→0、复位优先；实际运行后记录错误注入首次失败。",
        "kind": "implementation",
        "revision": 2,
        "interface": "测试名 | 输入 | 预期 | 实际",
        "tests": [
          "覆盖复位、保持、回绕及连续使能；把DUT加1改为加2后，应出现第一次明确比较失败并非正常通过。"
        ],
        "objective": "运行仿真、看波形并故意注入错误",
        "reviewSection": "study-code",
        "hint": "检查不能紧贴posedge就假设<=已经更新；可在后续下降沿检查，或采用合适的采样区域。",
        "objectiveId": "checking-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "q预期0但实际X，用!==检查？",
        "options": [
          "失败",
          "通过",
          "自动忽略"
        ],
        "correct": 0,
        "explain": "未知也不匹配。",
        "kind": "choice",
        "revision": 2,
        "objective": "运行仿真、看波形并故意注入错误",
        "reviewSection": "study-concept",
        "hint": "检查不能紧贴posedge就假设<=已经更新；可在后续下降沿检查，或采用合适的采样区域。",
        "objectiveId": "checking-task-5"
      }
    ],
    "lines": {
      "2": "!==把X/Z也纳入确定比较。q不是确定0011时触发$fatal，进程失败退出；普通!=可能得到X漏过if。",
      "5": "选择要写出的VCD文件名；仅声明记录还没产生结果，必须运行仿真。",
      "6": "0表示向下记录所有层级；tb要与实际测试顶层名一致。",
      "9": "先编译counter.v和tb.v，选择tb顶层，生成sim；找不到模块应检查文件表，不是改预期。",
      "10": "vvp执行刚生成的sim；改代码之后必须重编译，否则会看见旧程序结果。"
    },
    "lineSources": {
      "2": "if (q !== 4'd3) $fatal(1, \"count mismatch\");",
      "5": " $dumpfile(\"counter.vcd\");",
      "6": " $dumpvars(0,tb);",
      "9": "// iverilog -g2012 -s tb -o sim counter.v tb.v",
      "10": "// vvp sim"
    }
  },
  "setup-hold": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "setup",
        "沿前稳定",
        "限制最大路径"
      ],
      [
        "hold",
        "沿后稳定",
        "限制最小路径"
      ],
      [
        "tCQ",
        "时钟到Q",
        "分min/max"
      ],
      [
        "T=10ns",
        "f=100MHz",
        "单位换算"
      ]
    ],
    "bug": {
      "wrong": "always @(posedge clk) #2 q<=d; // 想修setup",
      "why": "RTL仿真延时不修复物理路径。",
      "fix": "// 在实现中优化路径/流水线并正确约束",
      "test": "用库参数和STA看max/min slack，非仅看RTL波形。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "10ns沿、setup2ns，数据最晚何时稳定？",
        "options": [
          "10ns",
          "12ns",
          "8ns"
        ],
        "correct": 2,
        "explain": "捕获沿减setup。",
        "kind": "choice",
        "revision": 2,
        "objective": "标出采样前后的稳定窗口",
        "reviewSection": "study-concept",
        "hint": "不要说“过了建立时间就一定安全”，还必须满足保持等约束。",
        "objectiveId": "setup-hold-task-1"
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "捕获沿10ns，setup=2、hold=1，填写禁止变化窗口的两个边界(ns)。",
        "accepted": [
          "8,11"
        ],
        "explain": "沿前减setup，沿后加hold；边界零裕量。",
        "objective": "解释降频通常不能直接解决保持违例",
        "reviewSection": "study-concept",
        "hint": "不要说“过了建立时间就一定安全”，还必须满足保持等约束。",
        "objectiveId": "setup-hold-task-2"
      },
      {
        "type": "解释与应用",
        "prompt": "画10ns采样、setup2ns、hold1ns窗口，判断7、9、10.5、12ns变化各影响何种检查。",
        "starter": "变化时刻 | 判断",
        "solution": "7在窗口前；9违setup；10.5违hold；12在窗口后。边界精度由真实库与分析决定。",
        "kind": "analysis",
        "revision": 2,
        "interface": "变化时刻 | 判断",
        "tests": [
          "捕获10ns，稳定窗口8～11ns；7和12在窗口外，9影响setup，10.5影响hold。零裕量边界按本页简化约定判断。"
        ],
        "objective": "解释降频通常不能直接解决保持违例",
        "reviewSection": "study-concept",
        "hint": "不要说“过了建立时间就一定安全”，还必须满足保持等约束。",
        "objectiveId": "setup-hold-task-3"
      },
      {
        "type": "情境分析",
        "prompt": "D在9ns变化，捕获10ns且setup2，判定？",
        "options": [
          "满足",
          "setup违例",
          "hold违例"
        ],
        "correct": 1,
        "explain": "只有1ns稳定，小于2ns。",
        "kind": "choice",
        "revision": 2,
        "objective": "解释降频通常不能直接解决保持违例",
        "reviewSection": "study-concept",
        "hint": "不要说“过了建立时间就一定安全”，还必须满足保持等约束。",
        "objectiveId": "setup-hold-task-4"
      }
    ],
    "timing": "window",
    "lines": {
      "1": "这个RTL接口只包括理想clk、d、q，建立保持参数并未由端口声明给出。",
      "3": "理想模型在上升沿读d并更新q，不模拟采样窗口内的模拟不稳定。",
      "4": "真实tsetup、thold来自器件或库，工具结合数据与时钟路径检查；RTL功能通过不能证明物理时序通过。"
    },
    "lineSources": {
      "1": "module sampled_data(input wire clk,d,",
      "3": " always @(posedge clk) q <= d;",
      "4": " // RTL只表达逻辑行为；setup/hold由库和STA检查"
    }
  },
  "timing-path": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "延迟",
        "一笔数据经过多少拍",
        "可能增加"
      ],
      [
        "吞吐",
        "每拍可接受几笔",
        "流水线可每拍一笔"
      ],
      [
        "critical path",
        "最紧约束路径",
        "由报告决定"
      ],
      [
        "控制对齐",
        "valid与数据同级",
        "避免错配"
      ]
    ],
    "bug": {
      "wrong": "s1=in+1; out=s1^8'h55;",
      "why": "阻塞读新s1失去寄存器逐级语义。",
      "fix": "s1<=in+1; out<=s1^8'h55;",
      "test": "初s1=0，输入1，首沿out=55而非57。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "T=10,tCQ=1,comb=6,setup=2，无偏斜slack？",
        "options": [
          "-1ns",
          "1ns",
          "3ns"
        ],
        "correct": 1,
        "explain": "10-1-6-2=1。",
        "kind": "choice",
        "revision": 2,
        "objective": "算一条简化路径的建立裕量",
        "reviewSection": "study-concept",
        "hint": "不能只给数据加流水线而不处理与之对应的控制信号。",
        "objectiveId": "timing-path-task-1"
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "时钟周期10ns，CQ=1ns、组合延迟6ns、setup=1ns，忽略skew和不确定度。填setup slack(ns)。",
        "accepted": [
          "2"
        ],
        "explain": "10-1-6-1=2ns。先从周期扣去数据路径和建立时间。",
        "objective": "区分流水线延迟与吞吐率",
        "reviewSection": "study-concept",
        "hint": "不能只给数据加流水线而不处理与之对应的控制信号。",
        "objectiveId": "timing-path-task-2"
      },
      {
        "type": "解释与应用",
        "prompt": "把9ns逻辑拆成4ns和5ns两级，假设tCQ1、setup1，计算最小简化周期及延迟变化。",
        "starter": "原周期：\n新周期：\n对齐信号：",
        "solution": "原至少11ns；新至少max(4,5)+2=7ns；多一级寄存，valid也延迟一级。",
        "kind": "analysis",
        "revision": 2,
        "interface": "原周期：\n新周期：\n对齐信号：",
        "tests": [
          "原9ns逻辑周期至少1+9+1=11ns；拆成4/5ns后至少1+5+1=7ns，同时数据多等一级寄存器。"
        ],
        "objective": "区分流水线延迟与吞吐率",
        "reviewSection": "study-concept",
        "hint": "不能只给数据加流水线而不处理与之对应的控制信号。",
        "objectiveId": "timing-path-task-3"
      },
      {
        "type": "情境分析",
        "prompt": "初s1=0，首沿in=1，沿后s1/out？",
        "options": [
          "2/55(hex)",
          "2/57(hex)",
          "0/55(hex)"
        ],
        "correct": 0,
        "explain": "out读旧s1=0。",
        "kind": "choice",
        "revision": 2,
        "objective": "区分流水线延迟与吞吐率",
        "reviewSection": "study-concept",
        "hint": "不能只给数据加流水线而不处理与之对应的控制信号。",
        "objectiveId": "timing-path-task-4"
      }
    ],
    "timing": "path",
    "lines": {
      "4": "s1保存第一段加法的结果，是新插入的一级寄存器，切开组合路径。",
      "6": "第一沿in_data=1时，s1安排变2；它的后续逻辑本沿仍读旧s1。",
      "7": "out_data使用旧s1再异或55。初s1=0时首沿out=55，下一沿才处理上一拍输入对应的s1=2，得到57。"
    },
    "lineSources": {
      "4": " reg [7:0] s1;",
      "6": "  s1 <= in_data + 8'd1;",
      "7": "  out_data <= s1 ^ 8'h55;"
    }
  },
  "clock-skew": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "s=capture-launch",
        "正为捕获晚到",
        "单位ns"
      ],
      [
        "setup slack",
        "T+s-CQmax-combmax-setup-U",
        "≥0通过"
      ],
      [
        "hold slack",
        "CQmin+combmin-s-hold-U",
        "≥0通过"
      ],
      [
        "min/max",
        "分别取边界",
        "非典型值"
      ]
    ],
    "bug": {
      "wrong": "hold_slack=T+CQmin+combmin-hold;",
      "why": "同沿hold检查不加周期T。",
      "fix": "hold_slack=CQmin+combmin-skew-hold-Uhold;",
      "test": "保持其余参数，改变T，hold slack应不变。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "正偏斜增加时，其他不变，hold？",
        "options": [
          "变松",
          "完全不变",
          "变紧"
        ],
        "correct": 2,
        "explain": "捕获同沿更晚，要求旧数据保持更久。",
        "kind": "choice",
        "revision": 2,
        "objective": "分别计算Setup与Hold裕量",
        "reviewSection": "study-concept",
        "hint": "正偏斜为setup增加时间，却把同沿hold窗口向后推。不要把周期T加进同沿hold式，也不要用同一个典型延迟代替max/min。",
        "objectiveId": "clock-skew-task-1"
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "周期10ns、偏斜0.5ns；最大CQ为1ns，最大组合延时6ns，建立时间1ns，不确定度0.2ns。求setup裕量，单位ns。",
        "accepted": [
          "2.3"
        ],
        "explain": "10+0.5-1-6-1-0.2=2.3。",
        "objective": "解释正偏斜的两种作用",
        "reviewSection": "study-concept",
        "hint": "正偏斜为setup增加时间，却把同沿hold窗口向后推。不要把周期T加进同沿hold式，也不要用同一个典型延迟代替max/min。",
        "objectiveId": "clock-skew-task-2"
      },
      {
        "type": "解释与应用",
        "prompt": "分别求建立与保持裕量。周期10ns，捕获时钟晚到0.5ns。建立检查用CQ=1ns、组合6ns、setup=1ns、不确定度0.2ns；保持检查用CQ=0.2ns、组合0.4ns、hold=0.2ns、不确定度0.1ns。",
        "starter": "setup：\nhold：",
        "solution": "setup=2.3ns；hold=-0.2ns，需要处理最短路径或时钟关系，不能只降频。",
        "kind": "analysis",
        "revision": 2,
        "interface": "setup：\nhold：",
        "tests": [
          "setup=10+0.5-1-6-1-0.2=2.3ns；hold=0.2+0.4-0.5-0.2-0.1=-0.2ns；只改变T不能修复同沿hold。"
        ],
        "objective": "解释正偏斜的两种作用",
        "reviewSection": "study-concept",
        "hint": "正偏斜为setup增加时间，却把同沿hold窗口向后推。不要把周期T加进同沿hold式，也不要用同一个典型延迟代替max/min。",
        "objectiveId": "clock-skew-task-3"
      },
      {
        "type": "情境分析",
        "prompt": "仅把T从10改20，hold slack？",
        "options": [
          "减少10",
          "不变",
          "增加10"
        ],
        "correct": 1,
        "explain": "同沿hold不含T。",
        "kind": "choice",
        "revision": 2,
        "objective": "解释正偏斜的两种作用",
        "reviewSection": "study-concept",
        "hint": "正偏斜为setup增加时间，却把同沿hold窗口向后推。不要把周期T加进同沿hold式，也不要用同一个典型延迟代替max/min。",
        "objectiveId": "clock-skew-task-4"
      }
    ],
    "timing": "budget",
    "lines": {
      "2": "T+s是下一捕获沿相对发射沿的时间预算，再减最长CQ、组合、setup及不确定度。s为正时捕获更晚，setup裕量增加。",
      "3": "保持比较同一对边沿：最短CQ+组合必须抵住捕获晚到s及hold要求。正s让hold更难，增加周期T不能修好它。",
      "4": "偏斜符号固定为捕获到达减发射到达。换符号定义会改变公式，不能只记正偏斜“有利”这一半结论。"
    },
    "prediction": {
      "question": "其他参数不变，捕获时钟晚到0.5ns。setup和hold裕量各如何改变？",
      "answer": "setup增加0.5ns，hold减少0.5ns。前者得到更晚的下个捕获沿，后者更难挡住本沿最早的新数据。"
    },
    "lineSources": {
      "2": "// Setup: T + s - tCQmax - combmax - tsetup - Usetup",
      "3": "// Hold: tCQmin + combmin - s - thold - Uhold",
      "4": "// s = 捕获时钟到达 - 发射时钟到达"
    }
  },
  "multicycle": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "setup N",
        "选择更晚捕获沿",
        "须功能许可"
      ],
      [
        "hold N-1",
        "常见同频配对",
        "不适用所有相位"
      ],
      [
        "-from/-to",
        "精确限定路径",
        "别全局放宽"
      ],
      [
        "false_path",
        "移除检查",
        "必须有理由"
      ]
    ],
    "bug": {
      "wrong": "set_multicycle_path 3 -setup -from [all_registers] -to [all_registers]",
      "why": "把普通单周期路径也隐藏。",
      "fix": "// 只约束经过验证的具体源/目的寄存器并核对hold关系",
      "test": "检查源在三拍窗口稳定、目的仅第三拍接收。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "仅把时序例外改3周期能改变RTL功能吗？",
        "options": [
          "能自动等三拍",
          "能自动保持源",
          "不能"
        ],
        "correct": 2,
        "explain": "约束不是RTL状态机。",
        "kind": "choice",
        "revision": 2,
        "objective": "证明多周期的功能前提",
        "reviewSection": "study-concept",
        "hint": "把普通单周期路径也隐藏。",
        "objectiveId": "multicycle-task-1"
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "三拍窗口，目的仅第三拍接收。填写前两拍目的使能。",
        "accepted": [
          "0,0"
        ],
        "explain": "目的未接收，源仍需按协议保持数据。",
        "objective": "核对捕获边沿与Hold关系",
        "reviewSection": "study-concept",
        "hint": "把普通单周期路径也隐藏。",
        "objectiveId": "multicycle-task-2"
      },
      {
        "type": "解释与应用",
        "prompt": "列三拍路径的数据稳定和捕获使能表；说明第二拍若源变化为何可能失效。",
        "starter": "沿0发射：\n沿1：\n沿2：\n沿3捕获：",
        "solution": "0发射后保持数据；1/2目的禁用；3接收。源中途变化需重新核对稳定与最大路径，不能仅靠例外。",
        "kind": "analysis",
        "revision": 2,
        "interface": "沿0发射：\n沿1：\n沿2：\n沿3捕获：",
        "tests": [
          "前两拍目的使能0，第三拍1；源在所需窗口内稳定；第二拍改变源可能使第三拍捕获另一笔数据，时序例外不修复功能协议。"
        ],
        "objective": "核对捕获边沿与Hold关系",
        "reviewSection": "study-concept",
        "hint": "把普通单周期路径也隐藏。",
        "objectiveId": "multicycle-task-3"
      },
      {
        "type": "情境分析",
        "prompt": "en3在第1、2拍为0，第3拍为1，Q何时可接收？",
        "options": [
          "每拍",
          "第3拍",
          "第1拍"
        ],
        "correct": 1,
        "explain": "RTL使能决定真实捕获。",
        "kind": "choice",
        "revision": 2,
        "objective": "核对捕获边沿与Hold关系",
        "reviewSection": "study-concept",
        "hint": "把普通单周期路径也隐藏。",
        "objectiveId": "multicycle-task-4"
      }
    ],
    "timing": "multicycle",
    "lines": {
      "3": "每个上升沿都会进入过程，多周期例外不会让这个always自动跳过边沿。",
      "4": "同步复位仍在每个有效沿优先清零，不受en3控制。",
      "5": "只有en3=1才真正捕获d。允许三周期的前提需要源数据稳定和捕获使能配合，不是给路径写个数字3。"
    },
    "lineSources": {
      "3": " always @(posedge clk) begin",
      "4": "  if(!rst_n) q<=0;",
      "5": "  else if(en3) q<=d;"
    }
  },
  "cdc": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "单比特电平",
        "两级/多级同步链",
        "降低风险不归零"
      ],
      [
        "窄脉冲",
        "可能漏采",
        "需协议"
      ],
      [
        "多位总线",
        "逐位同步不保证一致",
        "握手/FIFO"
      ],
      [
        "复位释放",
        "每目的域同步",
        "不共用未同步释放"
      ]
    ],
    "bug": {
      "wrong": "assign use_data=meta;",
      "why": "第一级可能亚稳，不能扇出给功能逻辑。",
      "fix": "assign use_data=stable;",
      "test": "CDC工具检查链结构，并测试不同相位下事件是否会丢。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "双FF能保证多位总线原子性吗？",
        "options": [
          "不能",
          "能",
          "只需每位各2级"
        ],
        "correct": 0,
        "explain": "各位可能不同拍同步。",
        "kind": "choice",
        "revision": 2,
        "objective": "判断双FF的适用边界",
        "reviewSection": "study-concept",
        "hint": "第一级可能亚稳，不能扇出给功能逻辑。",
        "objectiveId": "cdc-task-1"
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "目的沿0、100ns，脉冲20–30ns；填这两个沿采到的电平。",
        "accepted": [
          "0,0"
        ],
        "explain": "两次采样都在脉冲外。",
        "objective": "为脉冲与多位数据选择协议",
        "reviewSection": "study-concept",
        "hint": "第一级可能亚稳，不能扇出给功能逻辑。",
        "objectiveId": "cdc-task-2"
      },
      {
        "type": "解释与应用",
        "prompt": "为异步慢电平设计同步链，再说明10ns窄脉冲对100ns目的周期为何可能漏掉。",
        "starter": "结构：\n假设：\n不适用：",
        "solution": "两级目的域DFF，首级不扇出；若脉冲在两个目的沿之间完整出现并消失，可完全漏采。",
        "kind": "analysis",
        "revision": 2,
        "interface": "结构：\n假设：\n不适用：",
        "tests": [
          "目的沿0/100ns，20～30ns脉冲两次均采0；慢电平两级同步有延迟且只降低风险；窄脉冲需另设计事件传递协议。"
        ],
        "objective": "为脉冲与多位数据选择协议",
        "reviewSection": "study-concept",
        "hint": "第一级可能亚稳，不能扇出给功能逻辑。",
        "objectiveId": "cdc-task-3"
      },
      {
        "type": "情境分析",
        "prompt": "目的沿在0、100ns，脉冲在20–30ns，理想采样能看到吗？",
        "options": [
          "必看到一次",
          "必看到两次",
          "可能完全看不到"
        ],
        "correct": 2,
        "explain": "没有目的沿落在高电平内。",
        "kind": "choice",
        "revision": 2,
        "objective": "为脉冲与多位数据选择协议",
        "reviewSection": "study-concept",
        "hint": "第一级可能亚稳，不能扇出给功能逻辑。",
        "objectiveId": "cdc-task-4"
      }
    ],
    "hardware": "pipeline",
    "timing": "cdc",
    "lines": {
      "2": "ASYNC_REG是AMD工具常见属性，用于标识同步链；其他厂商识别方式要查适配说明。它不改变RTL逻辑或保证零失效率。",
      "5": "meta采异步电平，stable采旧meta，给首级更长恢复时间。RTL模型只显示0/1延迟，无法显示模拟亚稳态概率。",
      "7": "只输出第二级stable。窄脉冲若未碰到目的沿，两个寄存器都不会帮它延长；多位数据也不能各位独立这样同步。"
    },
    "lineSources": {
      "2": " (* ASYNC_REG=\"TRUE\" *) reg meta,stable;",
      "5": "  else begin meta<=async_level;stable<=meta;end",
      "7": " assign synced=stable;"
    }
  },
  "capstone": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "W>=1",
        "配置前提",
        "防复制负次数"
      ],
      [
        "'0",
        "按上下文全0",
        "SV写法"
      ],
      [
        "files.f",
        "可复现文件列表",
        "顶层明确"
      ],
      [
        "验收",
        "功能/结构/工具证据",
        "分别记录"
      ]
    ],
    "bug": {
      "wrong": "// 只运行W=4的连续加1",
      "why": "未验证参数边界、保持与复位优先。",
      "fix": "// 多宽度、多边界，另做错误注入",
      "test": "将+1改+2，测试必须失败。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "W=1时最大Q？",
        "options": [
          "0",
          "1",
          "2"
        ],
        "correct": 1,
        "explain": "只有0、1两个值。",
        "kind": "choice",
        "revision": 2,
        "objective": "独立完成可复用计数器与自检",
        "reviewSection": "study-concept",
        "hint": "工具课放在语言和自检之后；不要用综合成功替代功能验证。",
        "objectiveId": "capstone-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "q宽度由W配置，W=1、3、8都应整组清零。补SystemVerilog的上下文全零字面量。",
        "template": "always_ff @(posedge clk) begin\n if(!rst_n) q<=___;\n else if(en) q<=q+1'b1;\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "'0"
            ]
          }
        ],
        "explain": "SV按上下文把整个q清0。",
        "objective": "让故意错误触发检查失败",
        "reviewSection": "study-code",
        "hint": "工具课放在语言和自检之后；不要用综合成功替代功能验证。",
        "objectiveId": "capstone-task-2"
      },
      {
        "kind": "analysis",
        "type": "调试推理",
        "revision": 2,
        "prompt": "在“贯穿练习：写、预测、仿真、再迁移”中检查这个错误方案： 只运行W=4的连续加1。写出具体修改办法与核对步骤。",
        "starter": "// 只运行W=4的连续加1",
        "solution": "// 多宽度、多边界，另做错误注入",
        "explain": "未验证参数边界、保持与复位优先。 修正后可这样核对：将+1改+2，测试必须失败。",
        "tests": [
          "W=1与W=4分别检查复位、保持、最大值回绕和复位优先；注入加2错误后检测器必须失败。"
        ],
        "objective": "让故意错误触发检查失败",
        "reviewSection": "study-concept",
        "hint": "工具课放在语言和自检之后；不要用综合成功替代功能验证。",
        "objectiveId": "capstone-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "提交参数化计数器规格、RTL、TB、命令、预期和实际结果；未运行项明确标注。",
        "starter": "规格：\n文件：\n边界：\n实际工具：",
        "solution": "复位/保持/回绕/优先级均检查，W=1/3/4分别展开；保存失败和修复记录。",
        "kind": "implementation",
        "revision": 2,
        "interface": "规格：\n文件：\n边界：\n实际工具：",
        "tests": [
          "W=1与W=4分别检查复位、保持、最大值回绕和复位优先；注入加2错误后检测器必须失败。"
        ],
        "objective": "让故意错误触发检查失败",
        "reviewSection": "study-code",
        "hint": "工具课放在语言和自检之后；不要用综合成功替代功能验证。",
        "objectiveId": "capstone-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "W=3,Q=7,en=1且复位无效，下一沿？",
        "options": [
          "0",
          "8",
          "7"
        ],
        "correct": 0,
        "explain": "模8回绕。",
        "kind": "choice",
        "revision": 2,
        "objective": "让故意错误触发检查失败",
        "reviewSection": "study-concept",
        "hint": "工具课放在语言和自检之后；不要用综合成功替代功能验证。",
        "objectiveId": "capstone-task-5"
      }
    ],
    "lines": {
      "2": "W默认4，工程验收还要展开W=1、3、8，不能只看默认参数。",
      "6": "'0按q的上下文宽度填满零，所以W变化时不必写死4位。它仍是同步复位，在上升沿生效。",
      "7": "把W-1个零与最低位1拼成W位步长。W=1时复制0次，整体仍有最后那一位1；最高值加一会回绕。"
    },
    "lineSources": {
      "2": "module counter_sv #(parameter int W=4)(",
      "6": "  if(!rst_n) q <= '0;",
      "7": "  else if(en) q <= q + {{(W-1){1'b0}},1'b1};"
    }
  },
  "synthesis-lab": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "仿真",
        "行为检查",
        "TB不综合"
      ],
      [
        "通用综合",
        "抽象单元",
        "非工艺面积"
      ],
      [
        "映射",
        "库/器件相关",
        "报告才是证据"
      ],
      [
        "PPA",
        "同条件比较",
        "面积/功耗/性能"
      ]
    ],
    "bug": {
      "wrong": "// 把#10当时序修复，再综合",
      "why": "延时语句不能代表可实现的路径优化。",
      "fix": "// 优化组合结构或加流水，再更新接口延迟",
      "test": "相同约束下比较前后功能与报告。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "无工艺库的通用单元数量能等同实际面积吗？",
        "options": [
          "能",
          "单位就是平方微米",
          "不能"
        ],
        "correct": 2,
        "explain": "映射和实现决定物理结果。",
        "kind": "choice",
        "revision": 2,
        "objective": "从RTL推断资源并检查报告",
        "reviewSection": "study-concept",
        "hint": "延时语句不能代表可实现的路径优化。",
        "objectiveId": "synthesis-lab-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "sel=1时计算a+b，sel=0时计算a+c。填写先选操作数的真分支，保留一个加法表达式。",
        "template": "wire [7:0] chosen = sel ? ___ : c;\nassign y={1'b0,a}+{1'b0,chosen};",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "b"
            ]
          }
        ],
        "explain": "先选择操作数表达共享加法关系。",
        "objective": "完成Lint到综合的回归闭环",
        "reviewSection": "study-code",
        "hint": "延时语句不能代表可实现的路径优化。",
        "objectiveId": "synthesis-lab-task-2"
      },
      {
        "kind": "analysis",
        "type": "调试推理",
        "revision": 2,
        "prompt": "在“从RTL到门级：Lint、资源与约束闭环”中检查这个错误方案： 把#10当时序修复，再综合。写出具体修改办法与核对步骤。",
        "starter": "// 把#10当时序修复，再综合",
        "solution": "// 优化组合结构或加流水，再更新接口延迟",
        "explain": "延时语句不能代表可实现的路径优化。 修正后可这样核对：相同约束下比较前后功能与报告。",
        "tests": [
          "功能输入相同且位宽相同；分别保存网表与通用资源统计；报告需注明工具与目标，不把通用单元数当工艺面积。"
        ],
        "objective": "完成Lint到综合的回归闭环",
        "reviewSection": "study-concept",
        "hint": "延时语句不能代表可实现的路径优化。",
        "objectiveId": "synthesis-lab-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "分别综合共享和两路加法选择版本，保留约束和资源/时序报告，未安装工具时写预期而非编日志。",
        "starter": "版本A：\n版本B：\n约束：\n实际报告：",
        "solution": "比较同功能同约束，记录加法单元和MUX以及关键路径；未运行注明待验证。",
        "kind": "implementation",
        "revision": 2,
        "interface": "版本A：\n版本B：\n约束：\n实际报告：",
        "tests": [
          "功能输入相同且位宽相同；分别保存网表与通用资源统计；报告需注明工具与目标，不把通用单元数当工艺面积。"
        ],
        "objective": "完成Lint到综合的回归闭环",
        "reviewSection": "study-code",
        "hint": "延时语句不能代表可实现的路径优化。",
        "objectiveId": "synthesis-lab-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "sel切换但无时钟，shared_add输出？",
        "options": [
          "保持上次",
          "按新选择组合计算",
          "等下一沿"
        ],
        "correct": 1,
        "explain": "本模块没有寄存器。",
        "kind": "choice",
        "revision": 2,
        "objective": "完成Lint到综合的回归闭环",
        "reviewSection": "study-concept",
        "hint": "延时语句不能代表可实现的路径优化。",
        "objectiveId": "synthesis-lab-task-5"
      }
    ],
    "lines": {
      "1": "y是9位，可保留两个8位数相加的进位；综合顶层选择shared_add。",
      "2": "sel先从b/c选8位操作数chosen，表达MUX在加法器之前的结构意图。",
      "3": "a与chosen各补0后做一次9位加法。实际资源还受优化与器件映射影响，要看综合网表而不是仅数源代码加号。"
    },
    "lineSources": {
      "1": "module shared_add(input wire [7:0] a,b,c,input wire sel,output wire [8:0] y);",
      "2": " wire [7:0] chosen=sel?b:c;",
      "3": " assign y={1'b0,a}+{1'b0,chosen};"
    }
  },
  "memory": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "we=1",
        "本沿写入",
        "数据提交NBA"
      ],
      [
        "rdata<=mem[addr]",
        "同步读",
        "沿后更新输出"
      ],
      [
        "同址冲突",
        "本例读旧值",
        "器件模式需核对"
      ],
      [
        "未初始化",
        "可能X",
        "先写后读"
      ]
    ],
    "bug": {
      "wrong": "// 同址写后当沿期待新值",
      "why": "本例读取旧mem值。",
      "fix": "// 按read-first检查；需write-first则显式旁路并核对推断",
      "test": "先写地址2=5A，后同址写A5，rdata先5A再A5。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "mem[2]旧5A，同沿写A5并读，rdata？",
        "options": [
          "5A",
          "A5",
          "固定0"
        ],
        "correct": 0,
        "explain": "NBA右值读取旧内容。",
        "kind": "choice",
        "revision": 2,
        "objective": "预测同步读与同址冲突",
        "reviewSection": "study-concept",
        "hint": "本例读取旧mem值。",
        "objectiveId": "memory-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "mem[addr]在沿前为5A，本沿we=1写A5；规定read-first，rdata本沿后应为5A。填写读取右值。",
        "template": "always_ff @(posedge clk) begin\n if(we) mem[addr]<=wdata;\n rdata<=___;\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "mem[addr]"
            ]
          }
        ],
        "explain": "右值取沿前存储，示例同址读旧值。",
        "objective": "核对RAM推断的工具边界",
        "reviewSection": "study-code",
        "hint": "本例读取旧mem值。",
        "objectiveId": "memory-task-2"
      },
      {
        "kind": "analysis",
        "type": "调试推理",
        "revision": 2,
        "prompt": "在“RAM/ROM：读延迟与读写冲突”中检查这个错误方案： 同址写后当沿期待新值。写出具体修改办法与核对步骤。",
        "starter": "// 同址写后当沿期待新值",
        "solution": "// 按read-first检查；需write-first则显式旁路并核对推断",
        "explain": "本例读取旧mem值。 修正后可这样核对：先写地址2=5A，后同址写A5，rdata先5A再A5。",
        "tests": [
          "两地址写不同值后读回，检查地址隔离；同址旧5A写A5时，首个沿后读5A、下一只读沿后读A5；未初始化地址不假设0。"
        ],
        "objective": "核对RAM推断的工具边界",
        "reviewSection": "study-concept",
        "hint": "本例读取旧mem值。",
        "objectiveId": "memory-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "写先写后读TB，覆盖两个地址隔离与同址冲突；说明未初始化地址不检查为0。",
        "starter": "地址/写入/读出预期：",
        "solution": "地址2写5A、3写A5，再分别读；同址写验证read-first，不把X当0。",
        "kind": "implementation",
        "revision": 2,
        "interface": "地址/写入/读出预期：",
        "tests": [
          "两地址写不同值后读回，检查地址隔离；同址旧5A写A5时，首个沿后读5A、下一只读沿后读A5；未初始化地址不假设0。"
        ],
        "objective": "核对RAM推断的工具边界",
        "reviewSection": "study-code",
        "hint": "本例读取旧mem值。",
        "objectiveId": "memory-task-4"
      },
      {
        "type": "波形分析",
        "prompt": "地址2原5A，写数据A5；第一沿写并读，第二沿只读。X表示未规定的初始输出。 请按时间先后填写题目所问的输出序列，用逗号分隔。观察两个沿后rdata，使用十六进制字节。",
        "explain": "第一沿读旧、第二沿见已提交新值。",
        "kind": "answer",
        "revision": 2,
        "wave": {
          "signals": [
            [
              "clk",
              [
                0,
                1,
                0,
                1
              ]
            ],
            [
              "we",
              [
                1,
                1,
                0,
                0
              ]
            ],
            [
              "rdata",
              [
                "X",
                "5A",
                "5A",
                "A5"
              ]
            ]
          ],
          "caption": "地址2原5A，写数据A5；第一沿写并读，第二沿只读。X表示未规定的初始输出。",
          "answer": [
            "5A,A5"
          ]
        },
        "accepted": [
          "5A,A5"
        ],
        "objective": "核对RAM推断的工具边界",
        "reviewSection": "study-concept",
        "hint": "本例读取旧mem值。",
        "objectiveId": "memory-task-5"
      }
    ],
    "hardware": "memory",
    "lines": {
      "3": "16个8位元素，容量128位。声明本身没有把所有元素初始化成0。",
      "5": "we=1时，沿后把wdata写入沿前addr选中的位置；本过程下一行仍读取写入前的mem。",
      "6": "rdata无论we为何都安排读旧mem[addr]。同址5A写A5时此沿输出5A，下一个只读沿才输出A5。"
    },
    "prediction": {
      "question": "mem[2]原5A，本沿向2写A5并读取2。这个沿后rdata是多少？",
      "answer": "5A。两个非阻塞右值都在写提交之前读取；A5要到后续读沿输出。"
    },
    "lineSources": {
      "3": " logic [7:0] mem[0:15];",
      "5": "  if(we) mem[addr]<=wdata;",
      "6": "  rdata<=mem[addr];"
    }
  },
  "fifo-project": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "count=0/4",
        "empty/full",
        "沿前判定"
      ],
      [
        "wr/rd",
        "真正接受",
        "非原始请求"
      ],
      [
        "dout",
        "首字直通",
        "空时无效"
      ],
      [
        "同时读写",
        "数量保持",
        "边界策略固定"
      ]
    ],
    "bug": {
      "wrong": "if(push) count<=count+1; if(pop) count<=count-1;",
      "why": "忽略满空，且两个NBA更新可覆盖。",
      "fix": "case({wr,rd}) 2'b10:count<=count+1;2'b01:count<=count-1;default:count<=count;endcase",
      "test": "填满再同时push/pop，只出队并降至3。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "满时push=pop=1，本例接受？",
        "options": [
          "只读",
          "同时读写",
          "只写"
        ],
        "correct": 0,
        "explain": "wr被full禁止。",
        "kind": "choice",
        "revision": 2,
        "objective": "按规格实现深度4同步FIFO",
        "reviewSection": "study-concept",
        "hint": "忽略满空，且两个NBA更新可覆盖。",
        "objectiveId": "fifo-project-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "pop只是请求；FIFO为空时不能推进读指针。补真正接受读操作的门控条件。",
        "template": "wire rd = pop && ___;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "!empty"
            ]
          }
        ],
        "explain": "沿前非空才接受读请求。",
        "objective": "验证满空、并发与回绕",
        "reviewSection": "study-code",
        "hint": "忽略满空，且两个NBA更新可覆盖。",
        "objectiveId": "fifo-project-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "深度4的FWFT FIFO，wp为2位，mem每项8位，din输入，wr为已接受的写；要求顺序写入旧wp再推进。",
        "starter": "if(wr) begin mem[wp+2'd1]<=din; wp<=wp+2'd1; end",
        "accepted": [
          "if(wr) begin mem[wp]<=din; wp<=wp+2'd1; end"
        ],
        "solution": "if(wr) begin mem[wp]<=din; wp<=wp+2'd1; end",
        "explain": "把数据写到下个地址会让初始读指针0对不上第一个字节。两条<=都读旧wp，先写旧地址才匹配。",
        "hint": "初始wp=rp=0，第一次写入后读队首应该在哪个格？",
        "context": "深度4的FWFT FIFO，wp为2位，mem每项8位，din输入，wr为已接受的写；要求顺序写入旧wp再推进。",
        "requireReason": true,
        "objective": "在写指针的旧地址保存队列数据",
        "reviewSection": "study-code",
        "objectiveId": "fifo-project-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "写独立队列TB，覆盖满/空/同时/回绕，并记录每次接受事务序号。",
        "starter": "规格：\n队列参考：\n边界：\n失败注入：",
        "solution": "先算wr/rd；rd时沿前比较队首；wr时追加；count应等于模型大小，复位清队列。",
        "kind": "implementation",
        "revision": 2,
        "interface": "规格：\n队列参考：\n边界：\n失败注入：",
        "tests": [
          "空时pop拒绝，满时push拒绝；同时push/pop按沿前标志决定是否接受；回绕后逐笔核对顺序；FWFT在消费沿前比较队头。"
        ],
        "objective": "验证满空、并发与回绕",
        "reviewSection": "study-code",
        "hint": "忽略满空，且两个NBA更新可覆盖。",
        "objectiveId": "fifo-project-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "count=1，同时合法push/pop，沿后count？",
        "options": [
          "0",
          "2",
          "1"
        ],
        "correct": 2,
        "explain": "接受一进一出数量保持。",
        "kind": "choice",
        "revision": 2,
        "objective": "验证满空、并发与回绕",
        "reviewSection": "study-concept",
        "hint": "忽略满空，且两个NBA更新可覆盖。",
        "objectiveId": "fifo-project-task-5"
      }
    ],
    "hardware": "fifo",
    "lines": {
      "5": "count需要表示0..4共5个值，必须3位；两位只能到3，无法表示满。",
      "6": "wr/rd是沿前真正被接受的操作，不等于裸请求push/pop。满时push不接受，即便同沿也请求pop。",
      "9": "非空时dout在读沿前已是队首。这是首字直通；empty=1时其值不表示有效字节。",
      "13": "接受写入才把din存到旧wp并推进wp；指针写回截断到2位，3后回0。",
      "14": "接受读取才推进rp；测试台要在沿前取得被消费的dout，不是沿后再看新队首。",
      "18": "没有操作或同时接受一进一出，count保持，但指针仍可各自推进。"
    },
    "lineSources": {
      "5": " logic [2:0] count;",
      "6": " wire wr=push && !full, rd=pop && !empty;",
      "9": " assign dout=mem[rp];",
      "13": "   if(wr) begin mem[wp]<=din;wp<=wp+2'd1;end",
      "14": "   if(rd) rp<=rp+2'd1;",
      "18": "    default: count<=count;"
    }
  },
  "async-fifo": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "地址",
        "低A位",
        "深度2^A"
      ],
      [
        "指针",
        "A+1位",
        "多一位回绕"
      ],
      [
        "Gray",
        "(b>>1)^b",
        "相邻仅一位变"
      ],
      [
        "标志",
        "本域计算",
        "远端有同步延迟"
      ]
    ],
    "bug": {
      "wrong": "// 逐位双FF同步8位数据作为FIFO",
      "why": "各位可能在不同拍完成，无法保证字一致。",
      "fix": "// 使用双时钟存储和Gray指针同步的验证实现",
      "test": "核对写读序列、回绕、满空及不同频率复位。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "深度8的常见指针总宽？",
        "options": [
          "3",
          "8",
          "4"
        ],
        "correct": 2,
        "explain": "3位地址加1位绕圈。",
        "kind": "choice",
        "revision": 2,
        "objective": "解释数据与指针跨域路径",
        "reviewSection": "study-concept",
        "hint": "各位可能在不同拍完成，无法保证字一致。",
        "objectiveId": "async-fifo-task-1"
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "将binary 0011、0100分别转为Gray，按顺序填写。",
        "accepted": [
          "0010,0110"
        ],
        "explain": "Gray=(binary>>1)^binary，相邻只改变一位。",
        "objective": "计算Gray并说明约束边界",
        "reviewSection": "study-concept",
        "hint": "各位可能在不同拍完成，无法保证字一致。",
        "objectiveId": "async-fifo-task-2"
      },
      {
        "type": "解释与应用",
        "prompt": "列出binary0..7与Gray，并说明异步FIFO为何同步指针不逐位同步数据。",
        "starter": "binary | gray",
        "solution": "000,001,011,010,110,111,101,100；数据靠受控存储转移，指针用于安全判定可读写。",
        "kind": "analysis",
        "revision": 2,
        "interface": "binary | gray",
        "tests": [
          "binary0..7的Gray依次000、001、011、010、110、111、101、100；相邻差一位；同步控制指针不等于逐位同步数据总线。"
        ],
        "objective": "计算Gray并说明约束边界",
        "reviewSection": "study-concept",
        "hint": "各位可能在不同拍完成，无法保证字一致。",
        "objectiveId": "async-fifo-task-3"
      },
      {
        "type": "情境分析",
        "prompt": "binary3→4，Gray从？",
        "options": [
          "001到010",
          "010到110",
          "011到100"
        ],
        "correct": 1,
        "explain": "只最高位翻转。",
        "kind": "choice",
        "revision": 2,
        "objective": "计算Gray并说明约束边界",
        "reviewSection": "study-concept",
        "hint": "各位可能在不同拍完成，无法保证字一致。",
        "objectiveId": "async-fifo-task-4"
      }
    ],
    "hardware": "fifo",
    "timing": "gray",
    "lines": {
      "1": "深度2的A次方时，地址A位，binary含额外一位绕回信息，所以本例[A:0]总共A+1位。",
      "2": "Gray等于右移一位的binary逐位异或原binary。3=0011得到0010，4=0100得到0110，只一位变化。",
      "3": "此模块只结束Gray编码器，完全没有实现存储、同步链、满空比较和复位。不要把它当可交付的异步FIFO。"
    },
    "lineSources": {
      "1": "module gray_step #(parameter A=3)(input wire [A:0] binary,output wire [A:0] gray);",
      "2": " assign gray=(binary>>1)^binary;",
      "3": "endmodule"
    }
  },
  "uart-project": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "8N1",
        "8数据/无校验/1停止",
        "LSB先发"
      ],
      [
        "frame[0]",
        "起始0",
        "立即输出"
      ],
      [
        "busy",
        "正在发送",
        "拒绝新start"
      ],
      [
        "CLKS_PER_BIT",
        "正整数",
        "fclk/baud近似"
      ]
    ],
    "bug": {
      "wrong": "tx<=data[bitno]; // 发送中读外部data",
      "why": "外部data改变会撕裂当前帧。",
      "fix": "// start时先锁存frame，后续从frame取位",
      "test": "接受A5后立刻改data为00，输出仍应A5。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "8N1一帧共几位？",
        "options": [
          "10",
          "8",
          "9"
        ],
        "correct": 0,
        "explain": "1起始+8数据+1停止。",
        "kind": "choice",
        "revision": 2,
        "objective": "实现8N1低位先发发送器",
        "reviewSection": "study-concept",
        "hint": "外部data改变会撕裂当前帧。",
        "objectiveId": "uart-project-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "8N1低位先发。frame最低位为起始0，最高位为停止1，中间一次锁存本次待发字节。填写数据项。",
        "template": "frame <= {1'b1, ___, 1'b0};",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "data"
            ]
          }
        ],
        "explain": "低位是起始0，随后从data[0]发送。",
        "objective": "验证帧位序和每位持续周期",
        "reviewSection": "study-code",
        "hint": "外部data改变会撕裂当前帧。",
        "objectiveId": "uart-project-task-2"
      },
      {
        "kind": "analysis",
        "type": "调试推理",
        "revision": 2,
        "prompt": "在“项目二：UART 8N1发送与自检”中检查这个错误方案：tx<=data[bitno]; // 发送中读外部data。写出具体修改办法与核对步骤。",
        "starter": "tx<=data[bitno]; // 发送中读外部data",
        "solution": "// start时先锁存frame，后续从frame取位",
        "explain": "外部data改变会撕裂当前帧。 修正后可这样核对：接受A5后立刻改data为00，输出仍应A5。",
        "tests": [
          "每帧起始0、D0到D7、停止1；N=1与4时每位持续N拍；busy期间修改外部data/start不撕裂已锁存帧。"
        ],
        "objective": "验证帧位序和每位持续周期",
        "reviewSection": "study-concept",
        "hint": "外部data改变会撕裂当前帧。",
        "objectiveId": "uart-project-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "为A5和00写逐位自检，测试N=1与4，并在busy中改data/start。",
        "starter": "帧预期：\n位时长：\n异常场景：",
        "solution": "A5帧0,1,0,1,0,0,1,0,1,1；每位N周期，忙中忽略start，复位tx=1,busy=0。",
        "kind": "implementation",
        "revision": 2,
        "interface": "帧预期：\n位时长：\n异常场景：",
        "tests": [
          "每帧起始0、D0到D7、停止1；N=1与4时每位持续N拍；busy期间修改外部data/start不撕裂已锁存帧。"
        ],
        "objective": "验证帧位序和每位持续周期",
        "reviewSection": "study-code",
        "hint": "外部data改变会撕裂当前帧。",
        "objectiveId": "uart-project-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "fclk=40MHz,N=4，理想位时长？",
        "options": [
          "10ns",
          "1us",
          "100ns"
        ],
        "correct": 2,
        "explain": "周期25ns，4周期100ns。",
        "kind": "choice",
        "revision": 2,
        "objective": "验证帧位序和每位持续周期",
        "reviewSection": "study-concept",
        "hint": "外部data改变会撕裂当前帧。",
        "objectiveId": "uart-project-task-5"
      }
    ],
    "lines": {
      "3": "frame共10位，保存起始、8位数据和停止位；busy期间不再从外部data临时取位。",
      "9": "接受start时一次锁存{停止1,data,起始0}；立即输出最低位起始0，并把tick和bitno置0。",
      "10": "tick到N-1才过完一个位时间；N=4时每位持续4个系统周期，比较N会多一拍。",
      "13": "旧bitno加1选下一位，先data[0]再到data[7]和停止位。外部data改变不会污染已锁存的frame。"
    },
    "lineSources": {
      "3": " logic [9:0] frame;",
      "9": "   if(start) begin frame<={1'b1,data,1'b0};tx<=0;busy<=1;tick<=0;bitno<=0;end",
      "10": "  end else if(tick==CLKS_PER_BIT-1) begin",
      "13": "   else begin bitno<=bitno+1;tx<=frame[bitno+1];end"
    }
  },
  "sv-handshake": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "valid&&ready",
        "同沿接受",
        "一次事务"
      ],
      [
        "背压",
        "valid=1,ready=0",
        "保持数据"
      ],
      [
        "源",
        "主动提出valid",
        "不要互等"
      ],
      [
        "同域",
        "协议前提",
        "非CDC方案"
      ]
    ],
    "bug": {
      "wrong": "if(valid) transfers<=transfers+1;",
      "why": "背压期间被误计为传输。",
      "fix": "if(valid && ready) transfers<=transfers+1;",
      "test": "valid=1,ready连续0,0,1，应只数一次。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "valid=1,ready=0时发生传输吗？",
        "options": [
          "没有",
          "有",
          "半次"
        ],
        "correct": 0,
        "explain": "必须双方同时1。",
        "kind": "choice",
        "revision": 2,
        "objective": "逐沿判断一次有效传输",
        "reviewSection": "study-concept",
        "hint": "不能看到valid持续三拍就认定收了三次，还要逐沿检查ready。",
        "objectiveId": "sv-handshake-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "同域valid与ready只有在同一个上升沿都为1才接受一次。填写计数条件的逻辑运算符。",
        "template": "if(valid ___ ready) transfers<=transfers+8'd1;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "&&"
            ]
          }
        ],
        "explain": "两者在同一采样沿都有效才计一次。",
        "objective": "解释背压时为何必须保持数据",
        "reviewSection": "study-code",
        "hint": "不能看到valid持续三拍就认定收了三次，还要逐沿检查ready。",
        "objectiveId": "sv-handshake-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "同域发送寄存器holding；input logic clk,rst_n,ready；output logic [7:0] data。仅在ready=1时把data加1，ready=0为背压必须保持。",
        "starter": "always_ff @(posedge clk) begin\n if(!rst_n) data<=0;\n else data<=data+8'd1;\nend",
        "accepted": [
          "always_ff @(posedge clk) begin\n if(!rst_n) data<=0;\n else if(ready) data<=data+8'd1;\nend"
        ],
        "solution": "always_ff @(posedge clk) begin\n if(!rst_n) data<=0;\n else if(ready) data<=data+8'd1;\nend",
        "explain": "此情境假设valid恒1，因此ready决定何时消费当前字节。每拍自增会在等待期间跳过字节。",
        "hint": "把ready连续两拍置0，接收者应看到同一字节还是两个新字节？",
        "context": "同域发送寄存器holding；input logic clk,rst_n,ready；output logic [7:0] data。仅在ready=1时把data加1，ready=0为背压必须保持。",
        "requireReason": true,
        "objective": "在背压时保持待交付字节",
        "reviewSection": "study-code",
        "objectiveId": "sv-handshake-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "写三拍背压表，data=5A提出后ready为0,0,1，说明源保持规则并实现计数。",
        "starter": "沿 | valid | ready | data | accepted",
        "solution": "前三沿valid保持1，data保持5A；仅第三沿accepted=1。",
        "kind": "implementation",
        "revision": 2,
        "interface": "沿 | valid | ready | data | accepted",
        "tests": [
          "三沿valid=1、ready=0/0/1，数据5A保持，只有第三沿计一次传输；不得在未接收时更换该笔内容。"
        ],
        "objective": "解释背压时为何必须保持数据",
        "reviewSection": "study-code",
        "hint": "不能看到valid持续三拍就认定收了三次，还要逐沿检查ready。",
        "objectiveId": "sv-handshake-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "三个沿valid/ready为10、11、11，传输数？",
        "options": [
          "1",
          "3",
          "2"
        ],
        "correct": 2,
        "explain": "后两沿分别一次。",
        "kind": "choice",
        "revision": 2,
        "objective": "解释背压时为何必须保持数据",
        "reviewSection": "study-concept",
        "hint": "不能看到valid持续三拍就认定收了三次，还要逐沿检查ready。",
        "objectiveId": "sv-handshake-task-5"
      }
    ],
    "lines": {
      "2": "这个片段在共同clk上升沿观察两方信号，前提是同一时钟域，不是跨域同步协议。",
      "4": "valid和ready同沿都为1才加一。valid连续三拍为1但ready=0,0,1时只发生一次传输。",
      "6": "背压时源必须保留valid=1及同一data，直到一次接受沿。不是每等一拍就换一个新字节。"
    },
    "lineSources": {
      "2": "always_ff @(posedge clk) begin",
      "4": " else if(valid && ready) transfers <= transfers + 8'd1;",
      "6": "// valid=1, ready=0：没有接收，发送方保持data"
    }
  },
  "integration": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "s_ready=!m_valid||m_ready",
        "空或可替换",
        "组合ready"
      ],
      [
        "背压保持",
        "m_valid&&!m_ready",
        "数据和valid都不变"
      ],
      [
        "复位",
        "清有效性",
        "旧事务被取消"
      ],
      [
        "验收",
        "有序不丢不重",
        "端到端scoreboard"
      ]
    ],
    "bug": {
      "wrong": "if(s_valid) m_data<=s_data;",
      "why": "下游不ready时仍覆盖旧有效数据。",
      "fix": "if(s_ready) begin m_valid<=s_valid;if(s_valid)m_data<=s_data;end",
      "test": "阻塞下游五拍，队首不能改变。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "本级有效且下游未ready，s_ready？",
        "options": [
          "随data位0",
          "0",
          "1"
        ],
        "correct": 1,
        "explain": "不能覆盖未接收数据。",
        "kind": "choice",
        "revision": 2,
        "objective": "实现背压下保持的弹性寄存器",
        "reviewSection": "study-concept",
        "hint": "下游不ready时仍覆盖旧有效数据。",
        "objectiveId": "integration-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "单级缓冲当前为空，或旧数据本沿会被下游取走时，可接新数据。补表示空位的条件。",
        "template": "assign s_ready = ___ || m_ready;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "!m_valid"
            ]
          }
        ],
        "explain": "本级为空或旧拍本沿被消费时可接受。",
        "objective": "用事务检查证明集成不丢不重",
        "reviewSection": "study-code",
        "hint": "下游不ready时仍覆盖旧有效数据。",
        "objectiveId": "integration-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "单级缓冲；input logic m_valid,m_ready；output logic s_ready。当前字节被本沿取走时，应允许同时接新字节。",
        "starter": "assign s_ready=!m_valid && m_ready;",
        "accepted": [
          "assign s_ready=!m_valid || m_ready;"
        ],
        "solution": "assign s_ready=!m_valid || m_ready;",
        "explain": "与运算使非空时即便下游愿意接收也不能替换，空但下游暂停时也不能装入。或运算覆盖空位和同沿释放两种情况。",
        "hint": "分别代入空/下游停和满/下游收这两行。",
        "context": "单级缓冲；input logic m_valid,m_ready；output logic s_ready。当前字节被本沿取走时，应允许同时接新字节。",
        "requireReason": true,
        "objective": "允许缓冲同时消费和替换",
        "reviewSection": "study-code",
        "objectiveId": "integration-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "把输入字节队列接FIFO再接UART，提交接口表、背压测试、复位策略和端到端顺序检查。",
        "starter": "模块 | 输入接受 | 输出接受 | 复位\n测试记录：",
        "solution": "输入只在握手接受；UART start在空闲且队列非空时脉冲；参考队列逐字节比较发送帧，不丢不重。",
        "kind": "implementation",
        "revision": 2,
        "interface": "模块 | 输入接受 | 输出接受 | 复位\n测试记录：",
        "tests": [
          "下游长期ready=0时有效数据保持；允许同时出旧入新；复位清有效标志；队列与串口按接受事务顺序端到端比对。"
        ],
        "objective": "用事务检查证明集成不丢不重",
        "reviewSection": "study-code",
        "hint": "下游不ready时仍覆盖旧有效数据。",
        "objectiveId": "integration-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "本级有A、下游接收，同时上游送B，沿后？",
        "options": [
          "保存B且valid=1",
          "清空丢B",
          "仍保存A"
        ],
        "correct": 0,
        "explain": "旧A被消费，新B替换。",
        "kind": "choice",
        "revision": 2,
        "objective": "用事务检查证明集成不丢不重",
        "reviewSection": "study-concept",
        "hint": "下游不ready时仍覆盖旧有效数据。",
        "objectiveId": "integration-task-5"
      }
    ],
    "hardware": "pipeline",
    "lines": {
      "3": "本级为空就可收；本级非空但m_ready=1时旧字节会被消费，也可同沿装新字节。",
      "5": "复位清有效位取消未交付字节，m_data清0只是方便观察，不能把0当有效数据。",
      "6": "仅s_ready时更新整个缓冲状态。若旧A本沿被取走且s_valid=1，沿后装B并继续有效；背压时保留A。"
    },
    "lineSources": {
      "3": " assign s_ready=!m_valid || m_ready;",
      "5": "  if(!rst_n) begin m_valid<=0;m_data<=0;end",
      "6": "  else if(s_ready) begin m_valid<=s_valid; if(s_valid) m_data<=s_data;end"
    }
  },
  "sv-tasks": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "task automatic",
        "独立局部变量",
        "并发仍需仲裁"
      ],
      [
        "@(negedge clk)",
        "驱动时刻",
        "TB等待"
      ],
      [
        "expected[$]",
        "动态队列",
        "验证专用"
      ],
      [
        "pop_front",
        "消费最早预期",
        "先检查非空"
      ]
    ],
    "bug": {
      "wrong": "actual=expected.pop_front(); // 未检查队列",
      "why": "空队列或多余输出可能被掩盖。",
      "fix": "if(expected.size()==0) $fatal(1,\"unexpected output\"); else ref_value=expected.pop_front();",
      "test": "故意让DUT多输出一次，应报unexpected。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "automatic能防止两个任务同时驱动en吗？",
        "options": [
          "会自动排队",
          "不能",
          "能"
        ],
        "correct": 1,
        "explain": "只隔离局部状态。",
        "kind": "choice",
        "revision": 2,
        "objective": "用task安排测试激励",
        "reviewSection": "study-concept",
        "hint": "带事件等待的测试任务不可直接当作可综合的控制器。",
        "objectiveId": "sv-tasks-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "测试台收到实际输出之前要确认参考队列非空。填写返回元素数量的队列方法名。",
        "template": "if(expected.___()==0) $fatal(1,\"unexpected output\");",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "size"
            ]
          }
        ],
        "explain": "队列为空时出现输出应失败。",
        "objective": "正确操作期望值队列",
        "reviewSection": "study-code",
        "hint": "带事件等待的测试任务不可直接当作可综合的控制器。",
        "objectiveId": "sv-tasks-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "测试台已声明int expected[$]; int ref_value; 队列保存待检查输出。取最早进入的一项，空时失败。",
        "starter": "if(expected.size()==0) $fatal(1,\"empty\");\nelse ref_value=expected.pop_back();",
        "accepted": [
          "if(expected.size()==0) $fatal(1,\"empty\");\nelse ref_value=expected.pop_front();"
        ],
        "solution": "if(expected.size()==0) $fatal(1,\"empty\");\nelse ref_value=expected.pop_front();",
        "explain": "pop_back取最后加入的一项，形成栈而非FIFO。依次push3、push8后，参考输出应先3后8。",
        "hint": "画队头与队尾，判断最早值在哪一端。",
        "context": "测试台已声明int expected[$]; int ref_value; 队列保存待检查输出。取最早进入的一项，空时失败。",
        "requireReason": true,
        "objective": "从参考队头提取最早预期项",
        "reviewSection": "study-code",
        "objectiveId": "sv-tasks-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "写send_enable任务与参考队列流程，定义谁唯一驱动en，并检查多余输出。",
        "starter": "任务：\n队列：\n唯一驱动：",
        "solution": "单一driver调用automatic任务，输入接受后push预期，输出出现先检查size非0再比较pop。",
        "kind": "implementation",
        "revision": 2,
        "interface": "任务：\n队列：\n唯一驱动：",
        "tests": [
          "队列压入3、5后输出应按3、5比对；空队列多余输出必须失败；只有一个驱动进程写en，automatic不提供互斥。"
        ],
        "objective": "正确操作期望值队列",
        "reviewSection": "study-code",
        "hint": "带事件等待的测试任务不可直接当作可综合的控制器。",
        "objectiveId": "sv-tasks-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "队列依次push3,push5，再pop两次？",
        "options": [
          "3,5",
          "5,3",
          "3,3"
        ],
        "correct": 0,
        "explain": "先进先出。",
        "kind": "choice",
        "revision": 2,
        "objective": "正确操作期望值队列",
        "reviewSection": "study-concept",
        "hint": "带事件等待的测试任务不可直接当作可综合的控制器。",
        "objectiveId": "sv-tasks-task-5"
      }
    ],
    "lines": {
      "1": "automatic为每次调用提供独立局部存储，不阻止两个调用同时改共享en。激励仍需唯一驱动者。",
      "2": "调用过程暂停到下降沿，再把en置1；这个等待是测试台时间行为，不是组合表达式。",
      "3": "下一个下降沿才清en，所以覆盖一个上升沿采样机会。",
      "6": "[$]声明可变长度队列，用于测试台参考序列，不是本课可综合FIFO。"
    },
    "lineSources": {
      "1": "task automatic pulse_enable;",
      "2": " @(negedge clk); en = 1'b1;",
      "3": " @(negedge clk); en = 1'b0;",
      "6": "int expected[$];"
    }
  },
  "sv-verification": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "new()",
        "创建对象",
        "句柄须非null"
      ],
      [
        "rand",
        "候选随机字段",
        "不是RTL随机硬件"
      ],
      [
        "inside {[0:9]}",
        "合法闭区间",
        "含两端"
      ],
      [
        "randomize()",
        "有成功返回值",
        "失败要处理"
      ]
    ],
    "bug": {
      "wrong": "void'(t.randomize()); // 忽略失败",
      "why": "约束矛盾时仍可能继续使用旧值。",
      "fix": "if(!t.randomize()) $fatal(1,\"random failed\");",
      "test": "加入矛盾约束验证失败被识别。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "10次随机能保证0到9全部出现吗？",
        "options": [
          "不能",
          "能",
          "仅SV能"
        ],
        "correct": 0,
        "explain": "随机可能重复，需覆盖记录。",
        "kind": "choice",
        "revision": 2,
        "objective": "区分类、句柄和对象",
        "reviewSection": "study-concept",
        "hint": "不要把随机产生1000次当成所有情况都覆盖了。",
        "objectiveId": "sv-verification-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "求解失败不能继续使用旧事务。检查t的一次随机化返回值，填写本课方法名。",
        "template": "if(!t.___()) $fatal(1,\"random failed\");",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "randomize"
            ]
          }
        ],
        "explain": "检查求解是否成功，不默认使用旧值。",
        "objective": "检查随机化返回值和约束边界",
        "reviewSection": "study-code",
        "hint": "不要把随机产生1000次当成所有情况都覆盖了。",
        "objectiveId": "sv-verification-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "事务需允许0..9，包括0和9。修复约束；value已声明rand bit [3:0]，下面片段位于class内。",
        "starter": "constraint legal { value > 0; value < 9; }",
        "accepted": [
          "constraint legal { value inside {[0:9]}; }"
        ],
        "solution": "constraint legal { value inside {[0:9]}; }",
        "explain": "开区间排除了两个边界。本题约束是闭区间；修复后仍需定向测试边界，随机不保证命中。",
        "hint": "单独把0和9代入每条原约束，看是否成立。",
        "context": "事务需允许0..9，包括0和9。修复约束；value已声明rand bit [3:0]，下面片段位于class内。",
        "requireReason": true,
        "objective": "用闭区间允许两个随机边界",
        "reviewSection": "study-code",
        "objectiveId": "sv-verification-task-3"
      },
      {
        "type": "独立实现",
        "prompt": "为0..9事务写边界定向计划、随机种子记录和命中统计，区分未支持工具。",
        "starter": "边界：\n种子：\n覆盖表：",
        "solution": "先0和9，记录randomize失败；每值命中计数，遗漏不能算覆盖完成。",
        "kind": "implementation",
        "revision": 2,
        "interface": "边界：\n种子：\n覆盖表：",
        "tests": [
          "显式定向0、9并记录种子；randomize失败立即报错；随机重复命中不能替代覆盖所有0..9，检查结果正确性与命中率分开。"
        ],
        "objective": "检查随机化返回值和约束边界",
        "reviewSection": "study-code",
        "hint": "不要把随机产生1000次当成所有情况都覆盖了。",
        "objectiveId": "sv-verification-task-4"
      },
      {
        "type": "情境分析",
        "prompt": "随机序列0,0,9,3命中不同值几个？",
        "options": [
          "4",
          "10",
          "3"
        ],
        "correct": 2,
        "explain": "去重后0、9、3。",
        "kind": "choice",
        "revision": 2,
        "objective": "检查随机化返回值和约束边界",
        "reviewSection": "study-concept",
        "hint": "不要把随机产生1000次当成所有情况都覆盖了。",
        "objectiveId": "sv-verification-task-5"
      }
    ],
    "lines": {
      "2": "rand允许求解器给4位value选值，bit是两态；这里对象用于测试台事务，不是RTL寄存器定义。",
      "3": "inside约束只允许0..9；它不要求十次调用遍历十个数。",
      "8": "new创建对象实例，t只是句柄，未创建便调用方法会出错。",
      "9": "randomize返回成功/失败。无解时应报告失败，不能拿旧value继续当新随机样本。"
    },
    "lineSources": {
      "2": " rand bit [3:0] value;",
      "3": " constraint small_values { value inside {[0:9]}; }",
      "8": "  t = new();",
      "9": "  if (!t.randomize()) $fatal(1,\"random failed\");"
    }
  },
  "sv-assert": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "|->",
        "同周期蕴含",
        "重叠"
      ],
      [
        "|=>",
        "下一周期蕴含",
        "非重叠"
      ],
      [
        "$past",
        "过去采样值",
        "需初态保护"
      ],
      [
        "cover",
        "发生记录",
        "不是正确性证明"
      ]
    ],
    "bug": {
      "wrong": "assert property(@(posedge clk) !rst_n |-> q==0);",
      "why": "同步复位同沿采样可能读到尚未清零的旧q。",
      "fix": "assert property(@(posedge clk) !rst_n |=> q==0);",
      "test": "初q非0，在某沿复位，下一采样沿检查上次更新结果。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "|=>的后件通常在哪个采样周期检查？",
        "options": [
          "下一周期",
          "同周期",
          "任意未来无限期"
        ],
        "correct": 0,
        "explain": "非重叠蕴含。",
        "kind": "choice",
        "revision": 2,
        "objective": "解释非重叠蕴含的采样点",
        "reviewSection": "study-concept",
        "hint": "覆盖率高不等于没有bug；断言也只能证明写下并被检查到的性质。",
        "objectiveId": "sv-assert-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "本沿采到复位有效后，要在下一采样沿检查q为0。填写非重叠蕴含运算符。",
        "template": "@(posedge clk) !rst_n ___ (q==4'd0);",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "|=>"
            ]
          }
        ],
        "explain": "下一采样沿检查前沿同步复位结果。",
        "objective": "区分性质检查与场景覆盖",
        "reviewSection": "study-code",
        "hint": "覆盖率高不等于没有bug；断言也只能证明写下并被检查到的性质。",
        "objectiveId": "sv-assert-task-2"
      },
      {
        "type": "独立实现",
        "prompt": "写背压保持性质草案，并说明复位禁用与$past首次采样的处理。",
        "starter": "// valid&&!ready |=> valid && $stable(data)",
        "solution": "在协议允许范围使用disable iff(!rst_n)；先定义复位取消事务；$past需有效历史保护，工具支持要确认。",
        "kind": "implementation",
        "revision": 2,
        "interface": "// valid&&!ready |=> valid && $stable(data)",
        "tests": [
          "valid=1且ready=0后下一拍仍需valid有效、data保持；按规格处理复位；首次$past没有前一有效样本时需屏蔽或显式标记。"
        ],
        "objective": "区分性质检查与场景覆盖",
        "reviewSection": "study-code",
        "hint": "覆盖率高不等于没有bug；断言也只能证明写下并被检查到的性质。",
        "objectiveId": "sv-assert-task-3"
      },
      {
        "type": "情境分析",
        "prompt": "本沿复位将q从7清0，下沿采样|=>后件q为？",
        "options": [
          "7",
          "必须X",
          "0"
        ],
        "correct": 2,
        "explain": "看到前沿NBA提交结果。",
        "kind": "choice",
        "revision": 2,
        "objective": "区分性质检查与场景覆盖",
        "reviewSection": "study-concept",
        "hint": "覆盖率高不等于没有bug；断言也只能证明写下并被检查到的性质。",
        "objectiveId": "sv-assert-task-4"
      }
    ],
    "lines": {
      "1": "property为一条时序规则命名，不创建数据寄存器；下面的assert才启用检查。",
      "2": "在采样沿看到!rst_n成立，|=>要求下一个采样沿q为0。采样在NBA更新前，因此不能拿本沿刚清零的新q解释同沿后件。",
      "4": "assert实例化reset_check，前件没发生的通过与真正测试到复位不同，应结合cover观察场景。",
      "5": "cover记录采样到q=15的经历，不比较任何输出规格，命中不能证明功能正确。"
    },
    "lineSources": {
      "1": "property reset_check;",
      "2": " @(posedge clk) !rst_n |=> (q == 4'd0);",
      "4": "assert property(reset_check);",
      "5": "cover property(@(posedge clk) q == 4'd15);"
    }
  },
  "advanced-map": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "代码覆盖",
        "执行了哪些分支",
        "非规格完备"
      ],
      [
        "功能覆盖",
        "哪些场景出现",
        "需检查器"
      ],
      [
        "UVM",
        "组织验证组件",
        "不是RTL必修"
      ],
      [
        "PPA",
        "面积/功耗/性能",
        "同条件比较"
      ]
    ],
    "bug": {
      "wrong": "// 100%覆盖率，所以芯片无Bug",
      "why": "覆盖计划可能遗漏规格，检查器也可能错。",
      "fix": "// 规格追踪→激励→检查→覆盖闭环",
      "test": "加入一个未检查输出错误，确认覆盖高也可能漏检。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "代码覆盖100%能证明规格完全正确吗？",
        "options": [
          "不能",
          "能",
          "只有UVM能保证"
        ],
        "correct": 0,
        "explain": "执行覆盖不等于功能证明。",
        "kind": "choice",
        "revision": 2,
        "objective": "建立规格到覆盖的验证计划",
        "reviewSection": "study-concept",
        "hint": "覆盖计划可能遗漏规格，检查器也可能错。",
        "objectiveId": "advanced-map-task-1"
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "一条功能覆盖点命中，但没有比对输出。填它能证明“发生过”还是“正确”。",
        "accepted": [
          "发生过"
        ],
        "explain": "覆盖命中不能替代结果检查。",
        "objective": "说明UVM、ASIC与PPA学习边界",
        "reviewSection": "study-concept",
        "hint": "覆盖计划可能遗漏规格，检查器也可能错。",
        "objectiveId": "advanced-map-task-2"
      },
      {
        "type": "解释与应用",
        "prompt": "为FIFO写功能覆盖矩阵，列空/满/同时/回绕/复位交叉，并对应检查器。",
        "starter": "场景 | 激励 | 检查器 | 命中证据",
        "solution": "每条场景要有预期与比对，未命中保留待办，不能仅计输入次数。",
        "kind": "analysis",
        "revision": 2,
        "interface": "场景 | 激励 | 检查器 | 命中证据",
        "tests": [
          "每个覆盖格对应检查器和输入条件；命中不能证明输出正确；缺失格在计划中标明定向补测。"
        ],
        "objective": "说明UVM、ASIC与PPA学习边界",
        "reviewSection": "study-concept",
        "hint": "覆盖计划可能遗漏规格，检查器也可能错。",
        "objectiveId": "advanced-map-task-3"
      },
      {
        "type": "情境分析",
        "prompt": "频率提高但电压不变，动态功耗趋势通常？",
        "options": [
          "必然下降",
          "与活动率无关",
          "其他相同下随f增加"
        ],
        "correct": 2,
        "explain": "αCV²f是趋势模型，实际需报告。",
        "kind": "choice",
        "revision": 2,
        "objective": "说明UVM、ASIC与PPA学习边界",
        "reviewSection": "study-concept",
        "hint": "覆盖计划可能遗漏规格，检查器也可能错。",
        "objectiveId": "advanced-map-task-4"
      }
    ],
    "lines": {
      "2": "accepted应由具体接口定义，例如valid&&ready；“最终”还要界定复位、取消和超时，否则断言无法清楚表达。",
      "4": "覆盖空、满、回绕和背压说明这些情境出现过；每种情境还需要独立预期值比较。",
      "6": "PPA比较必须固定功能、工艺、约束和活动条件；较少源码不自动意味着较小面积或较低功耗。"
    },
    "lineSources": {
      "2": "// 规格：每个accepted请求最终完成，复位取消未完成事务",
      "4": "// 覆盖：空/满/回绕/背压/复位组合",
      "6": "// PPA：同一功能、约束和工艺下比较面积/功耗/性能"
    }
  }
};window.IC_TEXTBOOK_DEPTH=true;for(const l of window.HDL_LESSONS)if(data[l.id])l.lab=data[l.id];})();
