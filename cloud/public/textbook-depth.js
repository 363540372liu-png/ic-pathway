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
        "revision": 2
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "把开关规则写成四行输出：a/b=00、01、10、11。",
        "accepted": [
          "0,0,0,1"
        ],
        "explain": "只有两个开关都为1灯才亮。"
      }
    ],
    "lines": {
      "1": "这是一条说明，不产生电路。先用一句规格描述电路：",
      "2": "这是一条说明，不产生电路。输入：开关 a、开关 b",
      "3": "这是一条说明，不产生电路。规则：两个开关都打开，灯才亮",
      "4": "这是一条说明，不产生电路。输出：灯 y（0=灭，1=亮）"
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
        "revision": 2
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "把十进制13写成四位二进制，不加进制前缀。",
        "accepted": [
          "1101"
        ],
        "explain": "8+4+1=13。"
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "持续驱动这条组合关系：a = 4'b1010;。输入变化时重新求值，不增加寄存器级。",
      "3": "这是一条说明，不产生电路。同一个值也可写 4'd10 或 4'hA",
      "4": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "依次输入00、01、10、11，填写异或的四个输出。",
        "accepted": [
          "0,1,1,0"
        ],
        "explain": "不同为1，相同为0。"
      }
    ],
    "hardware": "gates",
    "lines": {
      "1": "这是一条说明，不产生电路。a b | 与 AND | 或 OR | 异或 XOR",
      "2": "这是一条说明，不产生电路。0 0 |   0    |  0    |    0",
      "3": "这是一条说明，不产生电路。0 1 |   0    |  1    |    1",
      "4": "这是一条说明，不产生电路。1 0 |   0    |  1    |    1",
      "5": "这是一条说明，不产生电路。1 1 |   1    |  1    |    0",
      "6": "这是一条说明，不产生电路。Verilog对应符号：&、|、^；单比特取反用 ~"
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
        "revision": 2
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "en=1，地址依次00、01、10、11，填写4位译码输出。",
        "accepted": [
          "0001,0010,0100,1000"
        ],
        "explain": "地址n只点亮输出位n。"
      }
    ],
    "hardware": "gates",
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "持续驱动这条组合关系：y[0]=en & ~a[1] & ~a[0];。输入变化时重新求值，不增加寄存器级。",
      "3": "持续驱动这条组合关系：y[1]=en & ~a[1] &  a[0];。输入变化时重新求值，不增加寄存器级。",
      "4": "持续驱动这条组合关系：y[2]=en &  a[1] & ~a[0];。输入变化时重新求值，不增加寄存器级。",
      "5": "持续驱动这条组合关系：y[3]=en &  a[1] &  a[0];。输入变化时重新求值，不增加寄存器级。",
      "6": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "prompt": "交换两条独立assign的源码位置会怎样？",
        "options": [
          "输出晚一拍",
          "电路停止",
          "组合功能不变"
        ],
        "correct": 2,
        "explain": "两个独立持续赋值并发。",
        "kind": "choice",
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“先懂电路，再读代码”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "y = a ___ b   // 与门逻辑式",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "&"
            ]
          }
        ],
        "explain": "逻辑关系是逐位与；此处不要求完整模块。"
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
        ]
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
        "revision": 2
      }
    ],
    "hardware": "gates",
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "持续驱动这条组合关系：y = a & b;。输入变化时重新求值，不增加寄存器级。",
      "4": "持续驱动这条组合关系：z = a | b;。输入变化时重新求值，不增加寄存器级。",
      "5": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
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
        }
      }
    ],
    "hardware": "dff",
    "lines": {
      "1": "本段是电路行为的中文规格，不要求尚未学习的if/else语法。",
      "2": "组合选择由当前输入决定，没有保存旧Q的要求。",
      "3": "锁存器在gate有效电平内透明，关闭后保存。",
      "4": "DFF只在约定边沿采样，沿间保持。",
      "5": "多位寄存器是多份存储位共享时钟。"
    }
  },
  "module": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "module and2",
        "模块类型",
        "名字区分大小写"
      ],
      [
        "u_and",
        "实例名",
        "同层唯一"
      ],
      [
        ".a(x)",
        "子端口a接父信号x",
        "不是赋值语句"
      ],
      [
        "input/output",
        "边界方向",
        "从子模块视角"
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
        "prompt": "u_and表示什么？",
        "options": [
          "and2的一份实例",
          "输入端口类型",
          "延时变量"
        ],
        "correct": 0,
        "explain": "实例在硬件层次中存在。",
        "kind": "choice",
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“模块、端口与实例连接”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "and2 u_and(.a(x), .b(z), .y(___));",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "result"
            ]
          }
        ],
        "explain": "子模块y接父层result。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“模块、端口与实例连接”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "and2 u_and(x,z);",
        "accepted": [
          "and2 u_and(.a(x),.b(z),.y(result));"
        ],
        "solution": "and2 u_and(.a(x),.b(z),.y(result));",
        "explain": "漏接输出且位置端口易混淆。 修正后可这样核对：编译顶层并枚举x,z四种组合。"
      },
      {
        "type": "独立实现",
        "prompt": "实例化两个and2，输出(a&b)|(c&d)，写完整顶层与4个边界输入。",
        "starter": "module top(input wire a,b,c,d,output wire y);\nendmodule",
        "solution": "声明两条中间wire，两个and2实例，再assign y=w0|w1；测全0、全1、仅一对为11。",
        "kind": "implementation",
        "revision": 2,
        "interface": "module top(input wire a,b,c,d,output wire y);\nendmodule",
        "tests": [
          "abcd=0000输出0，1100输出1，0011输出1，1010输出0。两个子模块并行产生中间结果。"
        ]
      },
      {
        "type": "情境分析",
        "prompt": "x=1,z依次0、1、0，result？",
        "options": [
          "1,1,0",
          "等时钟",
          "0,1,0"
        ],
        "correct": 2,
        "explain": "子模块与门仍是组合电路。",
        "kind": "choice",
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "持续驱动这条组合关系：y = a & b;。输入变化时重新求值，不增加寄存器级。",
      "3": "模块定义结束；硬件实例不会因为到这一行而暂停运行。",
      "4": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "5": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "6": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "命令补全",
        "revision": 2,
        "prompt": "阅读“准备工具：先完成一次语法编译”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "iverilog -g2005 ___ and2 -tnull and2.v",
        "blanks": [
          {
            "label": "顶层选择参数",
            "accepted": [
              "-s"
            ]
          }
        ],
        "explain": "-s选择顶层，-tnull不生成运行程序。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "2": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "3": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "4": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "5": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "6": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“wire、reg 与 assign”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "output ___ y;\nassign y = a & b;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "wire"
            ]
          }
        ],
        "explain": "传统Verilog持续赋值驱动网络。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“wire、reg 与 assign”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "wire y; always @(*) y=a&b;",
        "accepted": [
          "reg y; always @(*) y=a&b;"
        ],
        "solution": "reg y; always @(*) y=a&b;",
        "explain": "Verilog过程不能给wire赋值。 修正后可这样核对：编译后再检查所有a,b组合y1==y2。"
      },
      {
        "type": "独立实现",
        "prompt": "分别用assign和always @(*)实现4位MUX，并说明输出声明差别。",
        "starter": "// 两种写法，不要让它们驱动同一输出",
        "solution": "wire y1配assign；reg y2配完整if/else。两者选择关系相同。",
        "kind": "implementation",
        "revision": 2,
        "interface": "// 两种写法，不要让它们驱动同一输出",
        "tests": [
          "分别取sel=0/1，输出选择a/b；使输入沿间变化时输出随组合关系变化，不等待时钟。"
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "持续驱动这条组合关系：y1 = a & b;。输入变化时重新求值，不增加寄存器级。",
      "4": "组合过程开始；本次计算应覆盖每条输出路径，不依赖上次结果。",
      "5": "在当前过程里完成这一步计算：y2 = a & b;。组合计算的最终关系由本次执行的路径决定。",
      "6": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "7": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“向量、位选、切片与拼接”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "assign swap = {bus[___], bus[7:4]};",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "3:0"
            ]
          }
        ],
        "explain": "低四位搬到高半字节。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“向量、位选、切片与拼接”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "assign y=bus[7:0:4];",
        "accepted": [
          "assign y=bus[7:4];"
        ],
        "solution": "assign y=bus[7:4];",
        "explain": "Verilog没有这种三段切片语法。 修正后可这样核对：bus=A5时检查y=A、low=1、swap=5A。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "4": "持续驱动这条组合关系：bus = 8'hA5;。输入变化时重新求值，不增加寄存器级。",
      "5": "持续驱动这条组合关系：low = bus[0];。输入变化时重新求值，不增加寄存器级。",
      "6": "持续驱动这条组合关系：hi = bus[7:4];。输入变化时重新求值，不增加寄存器级。",
      "7": "持续驱动这条组合关系：swap = {bus[3:0],bus[7:4]};。输入变化时重新求值，不增加寄存器级。",
      "8": "持续驱动这条组合关系：ones = {4{1'b1}};。输入变化时重新求值，不增加寄存器级。",
      "9": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“0、1、X、Z 与初始化”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "if (q ___ expected) $fatal(1,\"mismatch\");",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "!=="
            ]
          }
        ],
        "explain": "TB用四态不等把X/Z也判为不匹配。"
      },
      {
        "kind": "answer",
        "type": "未知比较",
        "revision": 2,
        "prompt": "q=X，expected=0。q != expected和q !== expected的结果分别是什么？填X/0/1，用逗号分隔。",
        "accepted": [
          "X,1"
        ],
        "explain": "普通不等不能确定未知位，得到X；四态不等把X作为参与比较的状态，确定不相同，得到1。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "这是一条说明，不产生电路。undriven没有驱动源，四态仿真通常为Z",
      "4": "这是一条说明，不产生电路。q尚未赋值，四态仿真通常为X",
      "5": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“算术、位运算、逻辑与比较”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "assign all_ones = ___;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "&a"
            ]
          }
        ],
        "explain": "归约与把所有位相与，结果一位。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“算术、位运算、逻辑与比较”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "assign zero=a&b==0;",
        "accepted": [
          "assign zero=((a & b)==4'd0);"
        ],
        "solution": "assign zero=((a & b)==4'd0);",
        "explain": "运算符优先级可能导致错误分组。 修正后可这样核对：a=1010,b=0101时zero应1。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "这是一条说明，不产生电路。a=1010,b=0101时：",
      "4": "这是一条说明，不产生电路。a&b=0000，a&&b=1，&a=0",
      "5": "持续驱动这条组合关系：y = (a > b) ? a : b;。输入变化时重新求值，不增加寄存器级。",
      "6": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“位宽、截断与补码”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "assign sum = {1'b0,a} + {___,b};",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "1'b0"
            ]
          }
        ],
        "explain": "两个操作数运算前同为5位。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“位宽、截断与补码”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "wire [3:0] sum=a+b;",
        "accepted": [
          "wire [4:0] sum={1'b0,a}+{1'b0,b};"
        ],
        "solution": "wire [4:0] sum={1'b0,a}+{1'b0,b};",
        "explain": "输出只有4位，进位无法保存。 修正后可这样核对：测试15+1和15+15，应16、30。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "4": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "5": "持续驱动这条组合关系：sum = {1'b0,a} + {1'b0,b};。输入变化时重新求值，不增加寄存器级。",
      "6": "持续驱动这条组合关系：extended = {{4{s[3]}},s};。输入变化时重新求值，不增加寄存器级。",
      "7": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“符号转换：位串不变，解释可能变”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "assign sx = ___(raw);",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "$signed"
            ]
          }
        ],
        "explain": "先按signed解释，赋给宽左值时符号扩展。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“符号转换：位串不变，解释可能变”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "assign negative=(raw<0);",
        "accepted": [
          "assign negative=($signed(raw)<4'sd0);"
        ],
        "solution": "assign negative=($signed(raw)<4'sd0);",
        "explain": "raw为unsigned，不能按4位负数比较。 修正后可这样核对：用7、8、F分别检查非负/负。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "4": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "5": "持续驱动这条组合关系：sx=$signed(raw);。输入变化时重新求值，不增加寄存器级。",
      "6": "持续驱动这条组合关系：zx=$unsigned(raw);。输入变化时重新求值，不增加寄存器级。",
      "7": "持续驱动这条组合关系：negative=($signed(raw) < 4'sd0);。输入变化时重新求值，不增加寄存器级。",
      "8": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“case、优先级与意外锁存器”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "case(sel)\n 2'b00:y=a;\n 2'b01:y=b;\n 2'b10:y=c;\n ___:y=4'b0;\nendcase",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "default"
            ]
          }
        ],
        "explain": "未匹配情况按本例输出0。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“case、优先级与意外锁存器”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "case(sel) 0:y=a; 1:y=b; endcase",
        "accepted": [
          "y=0; case(sel) 0:y=a; 1:y=b; default:y=0; endcase"
        ],
        "solution": "y=0; case(sel) 0:y=a; 1:y=b; default:y=0; endcase",
        "explain": "sel其他值时y保留旧结果。 修正后可这样核对：从已选b切换sel=3，检查不是保留b。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "组合过程开始；本次计算应覆盖每条输出路径，不依赖上次结果。",
      "4": "按当前选择值匹配分支，留意四态匹配、通配和是否覆盖所有情况。",
      "5": "在当前过程里完成这一步计算：2'b00: y = a;。组合计算的最终关系由本次执行的路径决定。",
      "6": "在当前过程里完成这一步计算：2'b01: y = b;。组合计算的最终关系由本次执行的路径决定。",
      "7": "在当前过程里完成这一步计算：2'b10: y = c;。组合计算的最终关系由本次执行的路径决定。",
      "8": "在当前过程里完成这一步计算：default: y = 4'b0000;。组合计算的最终关系由本次执行的路径决定。",
      "9": "结束当前case选择，每个未匹配情况也要有确定行为。",
      "10": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "11": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“casez：通配规则与优先级”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "casez(req)\n ___: index=2'd3;\n 4'b01??: index=2'd2;\nendcase",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "4'b1???"
            ]
          }
        ],
        "explain": "最高位为1优先匹配，其余低位通配。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“casez：通配规则与优先级”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "casex(req) 4'b1xxx:index=3; endcase",
        "accepted": [
          "casez(req) 4'b1???:index=3; default:valid=0; endcase"
        ],
        "solution": "casez(req) 4'b1???:index=3; default:valid=0; endcase",
        "explain": "忽略X可能把未知请求判成有效。 修正后可这样核对：注入X/Z并确认检查器报告未知，不能只看编号。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "组合过程开始；本次计算应覆盖每条输出路径，不依赖上次结果。",
      "4": "在当前过程里完成这一步计算：valid=1'b1; index=2'd0;。组合计算的最终关系由本次执行的路径决定。",
      "5": "按当前选择值匹配分支，留意四态匹配、通配和是否覆盖所有情况。",
      "6": "在当前过程里完成这一步计算：4'b1???: index=2'd3;。组合计算的最终关系由本次执行的路径决定。",
      "7": "在当前过程里完成这一步计算：4'b01??: index=2'd2;。组合计算的最终关系由本次执行的路径决定。",
      "8": "在当前过程里完成这一步计算：4'b001?: index=2'd1;。组合计算的最终关系由本次执行的路径决定。",
      "9": "在当前过程里完成这一步计算：4'b0001: index=2'd0;。组合计算的最终关系由本次执行的路径决定。",
      "10": "在当前过程里完成这一步计算：default: valid=1'b0;。组合计算的最终关系由本次执行的路径决定。",
      "11": "结束当前case选择，每个未匹配情况也要有确定行为。",
      "12": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "13": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“for 循环：展开的是硬件还是时间？”下面的片段，填写空缺，使结果符合本课例子的规则。",
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
        "explain": "本次组合计算重新从0累加，避免读取旧parity。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“for 循环：展开的是硬件还是时间？”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "always @(*) for(i=0;i<4;i=i+1) parity=parity^data[i];",
        "accepted": [
          "always @(*) begin parity=0; for(i=0;i<4;i=i+1) parity=parity^data[i]; end"
        ],
        "solution": "always @(*) begin parity=0; for(i=0;i<4;i=i+1) parity=parity^data[i]; end",
        "explain": "缺初始值，计算依赖旧parity。 修正后可这样核对：同输入重复求值应输出同值。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "3": "组合过程开始；本次计算应覆盖每条输出路径，不依赖上次结果。",
      "4": "在当前过程里完成这一步计算：parity = 1'b0;。组合计算的最终关系由本次执行的路径决定。",
      "5": "在当前过程里完成这一步计算：for(i=0; i<4; i=i+1) begin。组合计算的最终关系由本次执行的路径决定。",
      "6": "在当前过程里完成这一步计算：parity = parity ^ data[i];。组合计算的最终关系由本次执行的路径决定。",
      "7": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "8": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "9": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“parameter、localparam 与 generate”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "invert #(.W(___)) u_inv(.a(a),.y(y));",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "4"
            ]
          }
        ],
        "explain": "构建时把宽度参数设为4。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“parameter、localparam 与 generate”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "localparam W=8; // 父层想覆盖",
        "accepted": [
          "parameter W=8; localparam LAST=W-1;"
        ],
        "solution": "parameter W=8; localparam LAST=W-1;",
        "explain": "localparam不是可配置参数。 修正后可这样核对：分别展开W=1、4、8，检查位宽与功能。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "4": "在当前过程里完成这一步计算：generate for(i=0;i<W;i=i+1) begin: g。组合计算的最终关系由本次执行的路径决定。",
      "5": "持续驱动这条组合关系：y[i] = ~a[i];。输入变化时重新求值，不增加寄存器级。",
      "6": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "7": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“function：给组合计算起一个名字”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "function [3:0] inc;\n input [3:0] x;\n begin ___ = x + 4'd1; end\nendfunction",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "inc"
            ]
          }
        ],
        "explain": "传统Verilog给函数名赋返回值。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“function：给组合计算起一个名字”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "function [3:0] inc; input [3:0] x; #5 inc=x+1; endfunction",
        "accepted": [
          "function [3:0] inc; input [3:0] x; begin inc=x+4'd1; end endfunction"
        ],
        "solution": "function [3:0] inc; input [3:0] x; begin inc=x+4'd1; end endfunction",
        "explain": "函数中不可加入时间等待。 修正后可这样核对：测试0、14、15，得到1、15、0。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "4": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "5": "在当前过程里完成这一步计算：begin inc = x + 4'd1; end。组合计算的最终关系由本次执行的路径决定。",
      "6": "函数结束，前面给函数名或return提供本次组合计算的结果。",
      "7": "持续驱动这条组合关系：y = inc(a);。输入变化时重新求值，不增加寄存器级。",
      "8": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“编译指令、宏与多文件边界”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "`ifndef DEFS_VH\n___ DEFS_VH\n// 共享声明\n`endif",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "`define"
            ]
          }
        ],
        "explain": "保护宏第一次包含时定义，后续跳过。"
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
        ]
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "编译指令在文本/编译阶段处理，不是运行时控制信号。",
      "2": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "3": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "4": "编译指令在文本/编译阶段处理，不是运行时控制信号。",
      "5": "持续驱动这条组合关系：y=~a;。输入变化时重新求值，不增加寄存器级。",
      "6": "编译指令在文本/编译阶段处理，不是运行时控制信号。",
      "7": "持续驱动这条组合关系：y=a;。输入变化时重新求值，不增加寄存器级。",
      "8": "编译指令在文本/编译阶段处理，不是运行时控制信号。",
      "9": "模块定义结束；硬件实例不会因为到这一行而暂停运行。",
      "10": "编译指令在文本/编译阶段处理，不是运行时控制信号。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“多模块工程、层次与RTL task”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "assign y = {1'b0,a} + {___,b};",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "1'b0"
            ]
          }
        ],
        "explain": "完整8位和先把两操作数扩为9位。"
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
        ]
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "持续驱动这条组合关系：sum={1'b0,a}+{1'b0,b};。输入变化时重新求值，不增加寄存器级。",
      "3": "模块定义结束；硬件实例不会因为到这一行而暂停运行。",
      "4": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "5": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "6": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "7": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“同步复位、异步复位与使能”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "always @(posedge clk) begin\n if(!rst_n) q<=4'd0;\n ___(en) q<=d;\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "else if"
            ]
          }
        ],
        "explain": "复位与加载互斥，复位优先。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“同步复位、异步复位与使能”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "always @(posedge clk) if(en) q<=d; else if(!rst_n) q<=0;",
        "accepted": [
          "always @(posedge clk) if(!rst_n) q<=0; else if(en) q<=d;"
        ],
        "solution": "always @(posedge clk) if(!rst_n) q<=0; else if(en) q<=d;",
        "explain": "en=1时复位可能被忽略。 修正后可这样核对：复位与使能同时有效，沿后必须0。"
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
        ]
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
        ]
      }
    ],
    "kind": "enabled",
    "hardware": "dff",
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "上升沿触发过程。该沿读取输入与旧状态，非阻塞安排随后提交。",
      "4": "将右侧沿前值安排给左侧变量：if(!rst_n) q <= 4'd0;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "5": "将右侧沿前值安排给左侧变量：else if(en) q <= d;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "6": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "7": "这是一条说明，不产生电路。异步版只替换上面的事件表达式为：",
      "8": "这是一条说明，不产生电路。@(posedge clk or negedge rst_n)",
      "9": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“移位寄存器与单周期边沿脉冲”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "prev<=sig;\npulse<=___;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "sig&~prev"
            ]
          }
        ],
        "explain": "比较当前输入与旧prev，不读待提交的新prev。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“移位寄存器与单周期边沿脉冲”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "prev=sig; pulse=sig & ~prev;",
        "accepted": [
          "prev<=sig; pulse<=sig & ~prev;"
        ],
        "solution": "prev<=sig; pulse<=sig & ~prev;",
        "explain": "阻塞先改prev使检测恒0。 修正后可这样核对：初0时连续采0,1,1,0,1，脉冲应0,1,0,0,1。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "4": "上升沿触发过程。该沿读取输入与旧状态，非阻塞安排随后提交。",
      "5": "选择这一条赋值路径；与相邻分支一起核对默认值、优先级和保持要求。",
      "6": "将右侧沿前值安排给左侧变量：prev<=1'b0; pulse<=1'b0; history<=4'd0;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "7": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "8": "将右侧沿前值安排给左侧变量：prev<=sig;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "9": "将右侧沿前值安排给左侧变量：pulse<=sig & ~prev;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "10": "将右侧沿前值安排给左侧变量：history<={history[2:0],sig};。本过程后续读取仍要按非阻塞旧值规则理解。",
      "11": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "12": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "13": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“小型 ALU：选择运算与保留进位”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "sum={1'b0,a}+{1'b0,b};\ny=sum[3:0]; carry=sum[___];",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "4"
            ]
          }
        ],
        "explain": "第5位是无符号进位。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“小型 ALU：选择运算与保留进位”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "case(op) 0:{carry,y}=a+b; 1:y=a&b; endcase",
        "accepted": [
          "y=0; carry=0; case(op) 0:{carry,y}={1'b0,a}+{1'b0,b}; 1:y=a&b; default:y=0; endcase"
        ],
        "solution": "y=0; carry=0; case(op) 0:{carry,y}={1'b0,a}+{1'b0,b}; 1:y=a&b; default:y=0; endcase",
        "explain": "逻辑分支没有给carry赋值。 修正后可这样核对：先15+1，再切AND，carry必须清0。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "4": "组合过程开始；本次计算应覆盖每条输出路径，不依赖上次结果。",
      "5": "在当前过程里完成这一步计算：sum={1'b0,a}+{1'b0,b};。组合计算的最终关系由本次执行的路径决定。",
      "6": "在当前过程里完成这一步计算：y=4'd0; carry=1'b0;。组合计算的最终关系由本次执行的路径决定。",
      "7": "按当前选择值匹配分支，留意四态匹配、通配和是否覆盖所有情况。",
      "8": "在当前过程里完成这一步计算：2'd0: begin y=sum[3:0]; carry=sum[4]; end。组合计算的最终关系由本次执行的路径决定。",
      "9": "在当前过程里完成这一步计算：2'd1: y=a & b;。组合计算的最终关系由本次执行的路径决定。",
      "10": "在当前过程里完成这一步计算：2'd2: y=a ^ b;。组合计算的最终关系由本次执行的路径决定。",
      "11": "在当前过程里完成这一步计算：default: y=4'd0;。组合计算的最终关系由本次执行的路径决定。",
      "12": "结束当前case选择，每个未匹配情况也要有确定行为。",
      "13": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "14": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“Moore与Mealy：沿间响应和输出寄存”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "assign mealy = ___;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "prev&bit_in"
            ]
          }
        ],
        "explain": "组合输出依赖当前状态prev和当前输入。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“Moore与Mealy：沿间响应和输出寄存”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "assign done=next_state==DONE; // 声称严格Moore",
        "accepted": [
          "assign done=state==DONE;"
        ],
        "solution": "assign done=state==DONE;",
        "explain": "next_state含当前输入，输出可能沿前变化。 修正后可这样核对：改变start但不给时钟，检查输出是否按规格保持。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "持续驱动这条组合关系：mealy=prev & bit_in;。输入变化时重新求值，不增加寄存器级。",
      "4": "上升沿触发过程。该沿读取输入与旧状态，非阻塞安排随后提交。",
      "5": "将右侧沿前值安排给左侧变量：if(!rst_n) begin prev<=0; moore<=0; end。本过程后续读取仍要按非阻塞旧值规则理解。",
      "6": "将右侧沿前值安排给左侧变量：else begin prev<=bit_in; moore<=prev & bit_in; end。本过程后续读取仍要按非阻塞旧值规则理解。",
      "7": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "8": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“迈入 SystemVerilog：logic 与 bit”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "output ___ y;\nassign y=sel?b:a;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "logic"
            ]
          }
        ],
        "explain": "SV四态数据类型，可用于这条单驱动组合输出。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“迈入 SystemVerilog：logic 与 bit”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "logic y; assign y=a; always_comb y=b;",
        "accepted": [
          "logic y; assign y=sel?b:a;"
        ],
        "solution": "logic y; assign y=sel?b:a;",
        "explain": "两个驱动源冲突。 修正后可这样核对：lint/编译检查多驱动，枚举选择。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "持续驱动这条组合关系：y = sel ? b : a;。输入变化时重新求值，不增加寄存器级。",
      "4": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“always_latch：有意的锁存与意外漏赋值”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "___ begin\n if(gate) q<=d;\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "always_latch"
            ]
          }
        ],
        "explain": "只有规格确需电平敏感存储时声明锁存意图。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“always_latch：有意的锁存与意外漏赋值”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "always_comb if(gate) q=d;",
        "accepted": [
          "always_latch if(gate) q<=d; // 仅当规格确实需要锁存"
        ],
        "solution": "always_latch if(gate) q<=d; // 仅当规格确实需要锁存",
        "explain": "要求保持的行为违背组合意图。 修正后可这样核对：gate高时切d应跟随，gate低切d应保持。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "3": "将右侧沿前值安排给左侧变量：if(gate) q<=d;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "4": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "5": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“SystemVerilog 数组：位和元素要分清”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "logic [___] mem [0:3];",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "7:0"
            ]
          }
        ],
        "explain": "每元素8位，共4个元素。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“SystemVerilog 数组：位和元素要分清”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "logic mem[0:3]; // 想存4个字节",
        "accepted": [
          "logic [7:0] mem[0:3];"
        ],
        "solution": "logic [7:0] mem[0:3];",
        "explain": "每个元素只有1位。 修正后可这样核对：写入AA/55/F0/0F逐元素读回。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "4": "这是一条说明，不产生电路。这里用四个固定常量当只读查找表",
      "5": "持续驱动这条组合关系：mem[0] = 8'd10;。输入变化时重新求值，不增加寄存器级。",
      "6": "持续驱动这条组合关系：mem[1] = 8'd20;。输入变化时重新求值，不增加寄存器级。",
      "7": "持续驱动这条组合关系：mem[2] = 8'd30;。输入变化时重新求值，不增加寄存器级。",
      "8": "持续驱动这条组合关系：mem[3] = 8'd40;。输入变化时重新求值，不增加寄存器级。",
      "9": "持续驱动这条组合关系：data = mem[index];。输入变化时重新求值，不增加寄存器级。",
      "10": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“typedef、enum、struct：给数据明确类型”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "typedef struct packed {\n logic valid;\n logic [7:0] data;\n} beat_t;\nassign out_data = ___;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "beat.data"
            ]
          }
        ],
        "explain": "点号访问实例字段。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“typedef、enum、struct：给数据明确类型”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "beat_t beat; assign beat=8'hff;",
        "accepted": [
          "assign beat={1'b1,8'hff};"
        ],
        "solution": "assign beat={1'b1,8'hff};",
        "explain": "结构宽9位，valid字段意图不清。 修正后可这样核对：核对beat.valid=1且data=FF。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "定义一个可复用类型名；之后声明变量时才使用这个类型。",
      "3": "在当前过程里完成这一步计算：IDLE=2'd0, RUN=2'd1, DONE=2'd2。组合计算的最终关系由本次执行的路径决定。",
      "4": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "5": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "6": "定义一个可复用类型名；之后声明变量时才使用这个类型。",
      "7": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "8": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "9": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "10": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "11": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
    }
  },
  "sv-package": {
    "hook": "",
    "principle": [],
    "syntax": [
      [
        "::",
        "包作用域",
        "不同于实例点号"
      ],
      [
        "link_if bus()",
        "接口实例",
        "实际信号集合"
      ],
      [
        "modport source",
        "源视角方向",
        "不增加状态"
      ],
      [
        "import",
        "导入类型/名字",
        "先声明包"
      ]
    ],
    "bug": {
      "wrong": "// source与sink都驱动ready",
      "why": "接口同名不代表自动仲裁，多驱动冲突。",
      "fix": "// 仅sink驱动ready，source读取ready",
      "test": "展开顶层，检查data单驱动与方向。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "link_if.source中ready声明为input，这是谁的视角？",
        "options": [
          "使用source端口的源模块",
          "任意接收器内部",
          "包的类型名"
        ],
        "correct": 0,
        "explain": "modport方向从使用该视图的模块看：源读取ready，驱动data与valid。",
        "kind": "choice",
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“package、interface 与 modport：组织RTL接口”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "types_pkg___byte_t payload;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "::"
            ]
          }
        ],
        "explain": "包作用域不是实例层次的点号。"
      },
      {
        "kind": "analysis",
        "type": "调试推理",
        "revision": 2,
        "prompt": "检查端口方向错误：source和sink同时把ready声明成输出。写出两个modport的正确方向，并说明为什么不能让两个模块同时驱动它。",
        "starter": "// source与sink都驱动ready",
        "solution": "// 仅sink驱动ready，source读取ready",
        "explain": "接口同名不代表自动仲裁，多驱动冲突。 修正后可这样核对：展开顶层，检查data单驱动与方向。",
        "tests": [
          "source驱动valid/data、读取ready；sink方向相反；package先声明，接口实例连接同一组信号；不考查握手保持。"
        ]
      },
      {
        "type": "独立实现",
        "prompt": "定义含valid、ready和16位data的接口及source/sink modport；只说明各模块读写方向，不实现尚未讲解的握手。",
        "starter": "interface data_if;\nendinterface",
        "solution": "source output valid,data / input ready；sink input valid,data / output ready，类型和宽度一致。",
        "kind": "implementation",
        "revision": 2,
        "interface": "interface data_if;\nendinterface",
        "tests": [
          "source驱动valid/data、读取ready；sink方向相反；package先声明，接口实例连接同一组信号；不考查握手保持。"
        ]
      },
      {
        "type": "情境分析",
        "prompt": "在示例中，source modport把data声明为output，sink把data声明为input。哪一个模块负责驱动data？",
        "options": [
          "source视图的模块",
          "sink视图的模块",
          "package自动驱动"
        ],
        "correct": 0,
        "explain": "modport从使用它的模块看方向；包只提供声明，不自动产生信号驱动。",
        "kind": "choice",
        "revision": 2
      }
    ],
    "lines": {
      "1": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "2": "定义一个可复用类型名；之后声明变量时才使用这个类型。",
      "3": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "4": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "5": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "6": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "7": "从使用这个视图的模块看声明端口方向；方向约束不自动生成协议逻辑。",
      "8": "从使用这个视图的模块看声明端口方向；方向约束不自动生成协议逻辑。",
      "9": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "10": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "11": "持续驱动这条组合关系：bus.valid=req;。输入变化时重新求值，不增加寄存器级。",
      "12": "持续驱动这条组合关系：bus.data=payload;。输入变化时重新求值，不增加寄存器级。",
      "13": "模块定义结束；硬件实例不会因为到这一行而暂停运行。",
      "14": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "15": "持续驱动这条组合关系：bus.ready=1'b1;。输入变化时重新求值，不增加寄存器级。",
      "16": "持续驱动这条组合关系：observed=bus.data;。输入变化时重新求值，不增加寄存器级。",
      "17": "模块定义结束；硬件实例不会因为到这一行而暂停运行。",
      "18": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "19": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "20": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "21": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "22": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“测试台、时间单位与激励”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "always #___ clk=~clk;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "5"
            ]
          }
        ],
        "explain": "timescale为1ns单位时，高低各5ns形成10ns周期。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“测试台、时间单位与激励”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "@(posedge clk); en=1; // 和DUT同沿驱动",
        "accepted": [
          "@(negedge clk); en=1;"
        ],
        "solution": "@(negedge clk); en=1;",
        "explain": "活动区执行顺序可能竞争。 修正后可这样核对：打印每个有效沿前后值，确认没有多计/少计。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "编译指令在文本/编译阶段处理，不是运行时控制信号。",
      "2": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "3": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "4": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "5": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "6": "在当前过程里完成这一步计算：always #5 clk=~clk;。组合计算的最终关系由本次执行的路径决定。",
      "7": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "8": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "9": "在当前过程里完成这一步计算：rst_n=1; en=1;。组合计算的最终关系由本次执行的路径决定。",
      "10": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "11": "在当前过程里完成这一步计算：$display(\"q=%d\",q);。组合计算的最终关系由本次执行的路径决定。",
      "12": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "13": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "14": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“事件调度、delta 与竞争：同一时刻不等于同时更新”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "q<=d;\n$display(\"active=%b\",q);\n___(\"end-slot=%b\",q);",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "$strobe"
            ]
          }
        ],
        "explain": "在时间槽末观察提交后的q。"
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
        ]
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "编译指令在文本/编译阶段处理，不是运行时控制信号。",
      "2": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "3": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "4": "在当前过程里完成这一步计算：always #5 clk=~clk;。组合计算的最终关系由本次执行的路径决定。",
      "5": "上升沿触发过程。该沿读取输入与旧状态，非阻塞安排随后提交。",
      "6": "将右侧沿前值安排给左侧变量：q<=d;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "7": "在当前过程里完成这一步计算：$display(\"active q=%b\",q);。组合计算的最终关系由本次执行的路径决定。",
      "8": "在当前过程里完成这一步计算：$strobe(\"end-slot q=%b\",q);。组合计算的最终关系由本次执行的路径决定。",
      "9": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "10": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "11": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“自检、波形与第一次实际运行”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "if(q ___ expected) $fatal(1,\"mismatch\");",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "!=="
            ]
          }
        ],
        "explain": "四态不等检查未知也不通过。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“自检、波形与第一次实际运行”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "if(q==expected) $display(\"PASS\"); // 无失败分支",
        "accepted": [
          "if(q !== expected) $fatal(1,\"mismatch\");"
        ],
        "solution": "if(q !== expected) $fatal(1,\"mismatch\");",
        "explain": "错误时仿真仍可能正常退出。 修正后可这样核对：把DUT加1故意改成加2，回归应非0退出。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "这是一条说明，不产生电路。在上一课initial中、打印之后、$finish之前插入：",
      "2": "选择这一条赋值路径；与相邻分支一起核对默认值、优先级和保持要求。",
      "3": "这是一条说明，不产生电路。另加一个独立initial用于记录波形：",
      "4": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "5": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "6": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "7": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "8": "这是一条说明，不产生电路。终端：",
      "9": "这是一条说明，不产生电路。iverilog -g2012 -s tb -o sim counter.v tb.v",
      "10": "这是一条说明，不产生电路。vvp sim",
      "11": "这是一条说明，不产生电路。gtkwave counter.vcd"
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
        "revision": 2
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "捕获沿10ns，setup=2、hold=1，填写禁止变化窗口的两个边界(ns)。",
        "accepted": [
          "8,11"
        ],
        "explain": "沿前减setup，沿后加hold；边界零裕量。"
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
        ]
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
        "revision": 2
      }
    ],
    "timing": "window",
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "上升沿触发过程。该沿读取输入与旧状态，非阻塞安排随后提交。",
      "4": "这是一条说明，不产生电路。RTL只表达逻辑行为；setup/hold由库和STA检查",
      "5": "这是一条说明，不产生电路。不在这里用#delay修复物理时序",
      "6": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "时钟周期10ns，CQ=1ns、组合延迟6ns、setup=1ns，忽略skew和不确定度。填setup slack(ns)。",
        "accepted": [
          "2"
        ],
        "explain": "10-1-6-1=2ns。先从周期扣去数据路径和建立时间。"
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
        ]
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
        "revision": 2
      }
    ],
    "timing": "path",
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "4": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "5": "上升沿触发过程。该沿读取输入与旧状态，非阻塞安排随后提交。",
      "6": "将右侧沿前值安排给左侧变量：s1 <= in_data + 8'd1;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "7": "将右侧沿前值安排给左侧变量：out_data <= s1 ^ 8'h55;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "8": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "9": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "周期10ns、偏斜0.5ns；最大CQ为1ns，最大组合延时6ns，建立时间1ns，不确定度0.2ns。求setup裕量，单位ns。",
        "accepted": [
          "2.3"
        ],
        "explain": "10+0.5-1-6-1-0.2=2.3。"
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
        ]
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
        "revision": 2
      }
    ],
    "timing": "budget",
    "lines": {
      "1": "这是一条说明，不产生电路。本课先读路径预算，不使用尚未学习的SDC命令",
      "2": "这是一条说明，不产生电路。Setup: T + s - tCQmax - combmax - tsetup - Usetup",
      "3": "这是一条说明，不产生电路。Hold: tCQmin + combmin - s - thold - Uhold",
      "4": "这是一条说明，不产生电路。s = 捕获时钟到达 - 发射时钟到达",
      "5": "这是一条说明，不产生电路。约束命令请在 FPGA 工程实践的时钟与I/O约束课学习"
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
        "revision": 2
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "三拍窗口，目的仅第三拍接收。填写前两拍目的使能。",
        "accepted": [
          "0,0"
        ],
        "explain": "目的未接收，源仍需按协议保持数据。"
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
        ]
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
        "revision": 2
      }
    ],
    "timing": "multicycle",
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "上升沿触发过程。该沿读取输入与旧状态，非阻塞安排随后提交。",
      "4": "将右侧沿前值安排给左侧变量：if(!rst_n) q<=0;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "5": "将右侧沿前值安排给左侧变量：else if(en3) q<=d;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "6": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "7": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "目的沿0、100ns，脉冲20–30ns；填这两个沿采到的电平。",
        "accepted": [
          "0,0"
        ],
        "explain": "两次采样都在脉冲外。"
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
        ]
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
        "revision": 2
      }
    ],
    "hardware": "pipeline",
    "timing": "cdc",
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "上升沿触发过程。该沿读取输入与旧状态，非阻塞安排随后提交。",
      "4": "将右侧沿前值安排给左侧变量：if(!rst_n) begin meta<=0;stable<=0;end。本过程后续读取仍要按非阻塞旧值规则理解。",
      "5": "将右侧沿前值安排给左侧变量：else begin meta<=async_level;stable<=meta;end。本过程后续读取仍要按非阻塞旧值规则理解。",
      "6": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "7": "持续驱动这条组合关系：synced=stable;。输入变化时重新求值，不增加寄存器级。",
      "8": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "将binary 0011、0100分别转为Gray，按顺序填写。",
        "accepted": [
          "0010,0110"
        ],
        "explain": "Gray=(binary>>1)^binary，相邻只改变一位。"
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
        ]
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
        "revision": 2
      }
    ],
    "hardware": "fifo",
    "timing": "gray",
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "持续驱动这条组合关系：gray=(binary>>1)^binary;。输入变化时重新求值，不增加寄存器级。",
      "3": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“贯穿练习：写、预测、仿真、再迁移”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "always_ff @(posedge clk) begin\n if(!rst_n) q<=___;\n else if(en) q<=q+1'b1;\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "'0"
            ]
          }
        ],
        "explain": "SV按上下文把整个q清0。"
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
        ]
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "这是一条说明，不产生电路。counter_sv.sv",
      "2": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "3": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "4": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "5": "上升沿触发过程。该沿读取输入与旧状态，非阻塞安排随后提交。",
      "6": "将右侧沿前值安排给左侧变量：if(!rst_n) q <= '0;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "7": "将右侧沿前值安排给左侧变量：else if(en) q <= q + {{(W-1){1'b0}},1'b1};。本过程后续读取仍要按非阻塞旧值规则理解。",
      "8": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "9": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“从RTL到门级：Lint、资源与约束闭环”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "wire [7:0] chosen = sel ? ___ : c;\nassign y={1'b0,a}+{1'b0,chosen};",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "b"
            ]
          }
        ],
        "explain": "先选择操作数表达共享加法关系。"
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
        ]
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "持续驱动这条组合关系：y={1'b0,a}+{1'b0,chosen};。输入变化时重新求值，不增加寄存器级。",
      "4": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“RAM/ROM：读延迟与读写冲突”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "always_ff @(posedge clk) begin\n if(we) mem[addr]<=wdata;\n rdata<=___;\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "mem[addr]"
            ]
          }
        ],
        "explain": "右值取沿前存储，示例同址读旧值。"
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
        ]
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
        ]
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
        ]
      }
    ],
    "hardware": "memory",
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "4": "上升沿触发过程。该沿读取输入与旧状态，非阻塞安排随后提交。",
      "5": "将右侧沿前值安排给左侧变量：if(we) mem[addr]<=wdata;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "6": "将右侧沿前值安排给左侧变量：rdata<=mem[addr];。本过程后续读取仍要按非阻塞旧值规则理解。",
      "7": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "8": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“项目一：可回归的同步FIFO”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "wire rd = pop && ___;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "!empty"
            ]
          }
        ],
        "explain": "沿前非空才接受读请求。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“项目一：可回归的同步FIFO”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "if(push) count<=count+1; if(pop) count<=count-1;",
        "accepted": [
          "case({wr,rd}) 2'b10:count<=count+1;2'b01:count<=count-1;default:count<=count;endcase"
        ],
        "solution": "case({wr,rd}) 2'b10:count<=count+1;2'b01:count<=count-1;default:count<=count;endcase",
        "explain": "忽略满空，且两个NBA更新可覆盖。 修正后可这样核对：填满再同时push/pop，只出队并降至3。"
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
        ]
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
        "revision": 2
      }
    ],
    "hardware": "fifo",
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "4": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "5": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "6": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "7": "持续驱动这条组合关系：full=(count==4);。输入变化时重新求值，不增加寄存器级。",
      "8": "持续驱动这条组合关系：empty=(count==0);。输入变化时重新求值，不增加寄存器级。",
      "9": "持续驱动这条组合关系：dout=mem[rp];。输入变化时重新求值，不增加寄存器级。",
      "10": "上升沿触发过程。该沿读取输入与旧状态，非阻塞安排随后提交。",
      "11": "将右侧沿前值安排给左侧变量：if(!rst_n) begin wp<=0;rp<=0;count<=0;end。本过程后续读取仍要按非阻塞旧值规则理解。",
      "12": "选择这一条赋值路径；与相邻分支一起核对默认值、优先级和保持要求。",
      "13": "将右侧沿前值安排给左侧变量：if(wr) begin mem[wp]<=din;wp<=wp+2'd1;end。本过程后续读取仍要按非阻塞旧值规则理解。",
      "14": "将右侧沿前值安排给左侧变量：if(rd) rp<=rp+2'd1;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "15": "按当前选择值匹配分支，留意四态匹配、通配和是否覆盖所有情况。",
      "16": "将右侧沿前值安排给左侧变量：2'b10: count<=count+3'd1;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "17": "将右侧沿前值安排给左侧变量：2'b01: count<=count-3'd1;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "18": "将右侧沿前值安排给左侧变量：default: count<=count;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "19": "结束当前case选择，每个未匹配情况也要有确定行为。",
      "20": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "21": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "22": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“项目二：UART 8N1发送与自检”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "frame <= {1'b1, ___, 1'b0};",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "data"
            ]
          }
        ],
        "explain": "低位是起始0，随后从data[0]发送。"
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
        ]
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "4": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "5": "上升沿触发过程。该沿读取输入与旧状态，非阻塞安排随后提交。",
      "6": "将右侧沿前值安排给左侧变量：if(!rst_n) begin tx<=1;busy<=0;tick<=0;bitno<=0;frame<=10'h3ff;end。本过程后续读取仍要按非阻塞旧值规则理解。",
      "7": "选择这一条赋值路径；与相邻分支一起核对默认值、优先级和保持要求。",
      "8": "将右侧沿前值安排给左侧变量：tx<=1;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "9": "将右侧沿前值安排给左侧变量：if(start) begin frame<={1'b1,data,1'b0};tx<=0;busy<=1;tick<=0;bitno<=0;end。本过程后续读取仍要按非阻塞旧值规则理解。",
      "10": "在当前过程里完成这一步计算：end else if(tick==CLKS_PER_BIT-1) begin。组合计算的最终关系由本次执行的路径决定。",
      "11": "将右侧沿前值安排给左侧变量：tick<=0;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "12": "将右侧沿前值安排给左侧变量：if(bitno==9) begin tx<=1;busy<=0;end。本过程后续读取仍要按非阻塞旧值规则理解。",
      "13": "将右侧沿前值安排给左侧变量：else begin bitno<=bitno+1;tx<=frame[bitno+1];end。本过程后续读取仍要按非阻塞旧值规则理解。",
      "14": "将右侧沿前值安排给左侧变量：end else tick<=tick+1;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "15": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "16": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“Ready / Valid：传输、背压与保持”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "if(valid ___ ready) transfers<=transfers+8'd1;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "&&"
            ]
          }
        ],
        "explain": "两者在同一采样沿都有效才计一次。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“Ready / Valid：传输、背压与保持”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "if(valid) transfers<=transfers+1;",
        "accepted": [
          "if(valid && ready) transfers<=transfers+1;"
        ],
        "solution": "if(valid && ready) transfers<=transfers+1;",
        "explain": "背压期间被误计为传输。 修正后可这样核对：valid=1,ready连续0,0,1，应只数一次。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "这是一条说明，不产生电路。同一时钟域中的传输计数示意",
      "2": "上升沿触发过程。该沿读取输入与旧状态，非阻塞安排随后提交。",
      "3": "将右侧沿前值安排给左侧变量：if(!rst_n) transfers <= 8'd0;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "4": "将右侧沿前值安排给左侧变量：else if(valid && ready) transfers <= transfers + 8'd1;。本过程后续读取仍要按非阻塞旧值规则理解。",
      "5": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "6": "这是一条说明，不产生电路。valid=1, ready=0：没有接收，发送方保持data",
      "7": "这是一条说明，不产生电路。valid=1, ready=1：在该上升沿接收一次"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“Ready/Valid集成：背压、交付与工程验收”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "assign s_ready = ___ || m_ready;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "!m_valid"
            ]
          }
        ],
        "explain": "本级为空或旧拍本沿被消费时可接受。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“Ready/Valid集成：背压、交付与工程验收”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "if(s_valid) m_data<=s_data;",
        "accepted": [
          "if(s_ready) begin m_valid<=s_valid;if(s_valid)m_data<=s_data;end"
        ],
        "solution": "if(s_ready) begin m_valid<=s_valid;if(s_valid)m_data<=s_data;end",
        "explain": "下游不ready时仍覆盖旧有效数据。 修正后可这样核对：阻塞下游五拍，队首不能改变。"
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
        ]
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
        "revision": 2
      }
    ],
    "hardware": "pipeline",
    "lines": {
      "1": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "2": "声明信号或端口。先核对总宽度、元素数和驱动者，类型本身不直接等于某种存储。",
      "3": "持续驱动这条组合关系：s_ready=!m_valid || m_ready;。输入变化时重新求值，不增加寄存器级。",
      "4": "上升沿触发过程。该沿读取输入与旧状态，非阻塞安排随后提交。",
      "5": "将右侧沿前值安排给左侧变量：if(!rst_n) begin m_valid<=0;m_data<=0;end。本过程后续读取仍要按非阻塞旧值规则理解。",
      "6": "将右侧沿前值安排给左侧变量：else if(s_ready) begin m_valid<=s_valid; if(s_valid) m_data<=s_data;end。本过程后续读取仍要按非阻塞旧值规则理解。",
      "7": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "8": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“选修：用 task 和队列组织测试”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "if(expected.___()==0) $fatal(1,\"unexpected output\");",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "size"
            ]
          }
        ],
        "explain": "队列为空时出现输出应失败。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“选修：用 task 和队列组织测试”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "actual=expected.pop_front(); // 未检查队列",
        "accepted": [
          "if(expected.size()==0) $fatal(1,\"unexpected output\"); else ref_value=expected.pop_front();"
        ],
        "solution": "if(expected.size()==0) $fatal(1,\"unexpected output\"); else ref_value=expected.pop_front();",
        "explain": "空队列或多余输出可能被掩盖。 修正后可这样核对：故意让DUT多输出一次，应报unexpected。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "2": "在当前过程里完成这一步计算：@(negedge clk); en = 1'b1;。组合计算的最终关系由本次执行的路径决定。",
      "3": "在当前过程里完成这一步计算：@(negedge clk); en = 1'b0;。组合计算的最终关系由本次执行的路径决定。",
      "4": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "5": "这是一条说明，不产生电路。下列声明位于测试模块内部、initial外部",
      "6": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "7": "这是一条说明，不产生电路。在initial内调用：",
      "8": "这是一条说明，不产生电路。pulse_enable();",
      "9": "这是一条说明，不产生电路。expected.push_back(3);",
      "10": "这是一条说明，不产生电路。if(expected.size()>0) ref_value=expected.pop_front();"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“选修：class、约束与随机输入”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "if(!t.___()) $fatal(1,\"random failed\");",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "randomize"
            ]
          }
        ],
        "explain": "检查求解是否成功，不默认使用旧值。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“选修：class、约束与随机输入”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "void'(t.randomize()); // 忽略失败",
        "accepted": [
          "if(!t.randomize()) $fatal(1,\"random failed\");"
        ],
        "solution": "if(!t.randomize()) $fatal(1,\"random failed\");",
        "explain": "约束矛盾时仍可能继续使用旧值。 修正后可这样核对：加入矛盾约束验证失败被识别。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "2": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "3": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "4": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "5": "模块头声明这份电路的外部接口，端口宽度和方向从这里核对。",
      "6": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "7": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "8": "在当前过程里完成这一步计算：t = new();。组合计算的最终关系由本次执行的路径决定。",
      "9": "选择这一条赋值路径；与相邻分支一起核对默认值、优先级和保持要求。",
      "10": "在当前过程里完成这一步计算：$display(\"value=%0d\",t.value);。组合计算的最终关系由本次执行的路径决定。",
      "11": "结束相应语句块或定义；块边界本身不引入时间延迟。",
      "12": "模块定义结束；硬件实例不会因为到这一行而暂停运行。"
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
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“选修：断言与覆盖的采样语义”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "@(posedge clk) !rst_n ___ (q==4'd0);",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "|=>"
            ]
          }
        ],
        "explain": "下一采样沿检查前沿同步复位结果。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "2": "上升沿触发过程。该沿读取输入与旧状态，非阻塞安排随后提交。",
      "3": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "4": "这里组织本课的声明、连接或过程边界；与紧邻的关键赋值一起阅读，不把行号当作时钟顺序。",
      "5": "上升沿触发过程。该沿读取输入与旧状态，非阻塞安排随后提交。"
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
        "revision": 2
      },
      {
        "kind": "answer",
        "type": "动笔推导",
        "revision": 2,
        "prompt": "一条功能覆盖点命中，但没有比对输出。填它能证明“发生过”还是“正确”。",
        "accepted": [
          "发生过"
        ],
        "explain": "覆盖命中不能替代结果检查。"
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
        ]
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
        "revision": 2
      }
    ],
    "lines": {
      "1": "这是一条说明，不产生电路。工程检查计划片段，不是可直接编译的模块",
      "2": "这是一条说明，不产生电路。规格：每个accepted请求最终完成，复位取消未完成事务",
      "3": "这是一条说明，不产生电路。断言：背压时valid和data保持",
      "4": "这是一条说明，不产生电路。覆盖：空/满/回绕/背压/复位组合",
      "5": "这是一条说明，不产生电路。总线：先确定握手，再研究地址、响应和突发",
      "6": "这是一条说明，不产生电路。PPA：同一功能、约束和工艺下比较面积/功耗/性能"
    }
  }
};window.IC_TEXTBOOK_DEPTH=true;for(const l of window.HDL_LESSONS)if(data[l.id])l.lab=data[l.id];})();
