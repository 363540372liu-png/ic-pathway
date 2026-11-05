(()=>{const data={
  "branches": {
    "hook": "",
    "hardware": "mux",
    "kind": "mux",
    "principle": [],
    "lines": {
      "1": "模块边界。a和b各4位，sel是1位选择控制；y是过程赋值输出。",
      "3": "@(*)根据过程读取的输入变化重新求值，没有时钟采样。",
      "4": "默认赋值覆盖sel=0路径，防止意外存储。",
      "5": "sel为1才进入条件块。",
      "6": "用阻塞赋值=覆盖默认值，最终组合输出选择b。"
    },
    "bug": {
      "wrong": "always @(*) begin\n if(sel) y=b;\nend",
      "why": "sel=0时y没有赋值，需要保存历史，可能推导锁存器。",
      "fix": "always @(*) begin\n y=a;\n if(sel) y=b;\nend",
      "test": "先令sel=1,b=7，再令sel=0,a=2；修正后y应随a变2，而不是保持7。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "a=2,b=7,sel=0，组合y是多少？",
        "options": [
          "2",
          "7",
          "保持旧值"
        ],
        "correct": 0,
        "explain": "默认赋值y=a，选择条件不成立。",
        "kind": "choice",
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“begin/end、if/else 与组合逻辑”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "always @(*) begin\n y = a;\n if(sel) ___;\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "y=b"
            ]
          }
        ],
        "explain": "默认覆盖sel=0，真分支选b。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“begin/end、if/else 与组合逻辑”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "always @(*) begin\n if(sel) y=b;\nend",
        "accepted": [
          "always @(*) begin\n y=a;\n if(sel) y=b;\nend"
        ],
        "solution": "always @(*) begin\n y=a;\n if(sel) y=b;\nend",
        "explain": "sel=0时y没有赋值，需要保存历史，可能推导锁存器。 修正后可这样核对：先令sel=1,b=7，再令sel=0,a=2；修正后y应随a变2，而不是保持7。"
      },
      {
        "type": "独立实现",
        "prompt": "输入a,b均4位，sel和en各1位；en=0输出0，否则sel=0选a、sel=1选b。写完整模块，并列出4组控制组合。",
        "starter": "module exercise(input wire [3:0] a,b,input wire sel,en,\n output reg [3:0] y);\n // 写完整组合过程\nendmodule",
        "solution": "always @(*) begin\n y=4'd0;\n if(en) y=sel ? b : a;\nend\n// en/sel=00、01时输出0；10选a；11选b。",
        "kind": "implementation",
        "revision": 2,
        "interface": "module exercise(input wire [3:0] a,b,input wire sel,en,\n output reg [3:0] y);\n // 写完整组合过程\nendmodule",
        "tests": [
          "en/sel=00、01时y均0；10时y=a；11时y=b。再在固定控制下改变所选数据，输出不等待时钟。"
        ]
      },
      {
        "type": "情境分析",
        "prompt": "sel=1且b由3变4，中间没有时钟；理想组合y？",
        "options": [
          "跟随变4",
          "必须等上升沿",
          "始终3"
        ],
        "correct": 0,
        "explain": "这是组合MUX，不是沿触发寄存器。",
        "kind": "choice",
        "revision": 2
      }
    ],
    "syntax": []
  },
  "edges": {
    "hook": "",
    "hardware": "dff",
    "kind": "dff",
    "principle": [],
    "lines": {
      "1": "输入clk和d、输出变量q。没有复位端口，仿真初态可能是X。",
      "2": "posedge clk只选上升沿事件。",
      "3": "非阻塞赋值先取d的值，再提交q；不会在高电平期间反复执行。"
    },
    "bug": {
      "wrong": "always @(*) q=d;",
      "why": "这描述跟随输入的组合关系，没有边沿采样和保存能力。",
      "fix": "always @(posedge clk) q<=d;",
      "test": "沿后令D翻转但不再给边沿；DFF的Q应保持，错误组合写法会跟随。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "D变化而clk没有新上升沿，Q？",
        "options": [
          "保持",
          "跟随",
          "每ns取反"
        ],
        "correct": 0,
        "explain": "DFF在规定边沿采样。",
        "kind": "choice",
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“时钟边沿、D 触发器与逐拍读图”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "always @(___ clk) q <= d;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "posedge"
            ]
          }
        ],
        "explain": "只在上升沿取样，而非高电平持续跟随。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“时钟边沿、D 触发器与逐拍读图”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "always @(*) q=d;",
        "accepted": [
          "always @(posedge clk) q<=d;"
        ],
        "solution": "always @(posedge clk) q<=d;",
        "explain": "这描述跟随输入的组合关系，没有边沿采样和保存能力。 修正后可这样核对：沿后令D翻转但不再给边沿；DFF的Q应保持，错误组合写法会跟随。"
      },
      {
        "type": "独立实现",
        "prompt": "写1位DFF：输入clk、d，输出q；每个clk上升沿保存d，不带复位。给初Q=0、沿前D依次1/0时两个沿后预期。",
        "starter": "module dff(input wire clk,d, output reg q);\n// 写出边沿过程\nendmodule",
        "solution": "always @(posedge clk) q <= d;\n两个沿后q为1、0。复位写法在下一课学习。",
        "kind": "implementation",
        "revision": 2,
        "interface": "clk、d为1位输入，q为1位过程变量输出；初Q=0只用于本题预测，不表示该模块能自行复位。",
        "tests": [
          "给定初Q=0，D按上升沿依次1/0，沿后Q依次1/0；沿间改D不会改变Q。"
        ]
      },
      {
        "type": "波形分析",
        "prompt": "初Q=0。D在各上升沿前分别稳定为1、0；Q按理想沿后更新绘出。 请按时间先后填写题目所问的输出序列，用逗号分隔。观察两个沿后Q。",
        "explain": "每个沿采样该沿前稳定的D。",
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
              "D",
              [
                1,
                1,
                0,
                0
              ]
            ],
            [
              "Q",
              [
                0,
                1,
                1,
                0
              ]
            ]
          ],
          "caption": "初Q=0。D在各上升沿前分别稳定为1、0；Q按理想沿后更新绘出。",
          "answer": [
            "1,0"
          ]
        },
        "accepted": [
          "1,0"
        ]
      }
    ],
    "syntax": []
  },
  "nba": {
    "hook": "",
    "hardware": "pipeline",
    "kind": "pipeline",
    "principle": [],
    "lines": {
      "1": "两个独立寄存器a、b共享clk。",
      "3": "当前上升沿开始：先观察沿前各信号。",
      "4": "记录d作为a的下一值，a当前值尚未改变。",
      "5": "记录旧a作为b的下一值，不读取待提交的新a。",
      "6": "本轮活动处理结束后，安排的非阻塞更新在NBA区域提交。"
    },
    "compare": "module pipeline_sv(input logic clk,d,output logic a,b);\n always_ff @(posedge clk) begin\n  a<=d;\n  b<=a;\n end\nendmodule",
    "bug": {
      "wrong": "always @(posedge clk) begin\n a=d;\n b=a;\nend",
      "why": "=立即改变a，后面的b=a读到新值；不能再解释为两级寄存器延迟。",
      "fix": "always @(posedge clk) begin\n a<=d;\n b<=a;\nend",
      "test": "初态a=b=0，D=1。第1沿后应a=1,b=0；第2沿后b才为1。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "旧a=0,D=1时，第1沿b取哪个值？",
        "options": [
          "旧a=0",
          "新a=1",
          "随机"
        ],
        "correct": 0,
        "explain": "右侧取值发生在NBA更新之前。",
        "kind": "choice",
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“阻塞 = 与非阻塞 <=”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "always @(posedge clk) begin\n a ___ d;\n b <= a;\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "<="
            ]
          }
        ],
        "explain": "非阻塞先读右值，b同沿读旧a。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“阻塞 = 与非阻塞 <=”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "always @(posedge clk) begin\n a=d;\n b=a;\nend",
        "accepted": [
          "always @(posedge clk) begin\n a<=d;\n b<=a;\nend"
        ],
        "solution": "always @(posedge clk) begin\n a<=d;\n b<=a;\nend",
        "explain": "=立即改变a，后面的b=a读到新值；不能再解释为两级寄存器延迟。 修正后可这样核对：初态a=b=0，D=1。第1沿后应a=1,b=0；第2沿后b才为1。"
      },
      {
        "type": "独立实现",
        "prompt": "扩成三级a、b、c，共用上升沿时钟，不带复位。假定初态全0，D首次置1后保持，写RTL并列出前三沿a/b/c。",
        "starter": "module exercise(input wire clk,d,output reg a,b,c);\n// 增加一级，不能让新值同沿穿透\nendmodule",
        "solution": "always @(posedge clk) begin a<=d; b<=a; c<=b; end\n已知初态0且D保持1，前三沿依次100、110、111。无复位时真实初态不由此片段保证。",
        "kind": "implementation",
        "revision": 2,
        "interface": "module exercise(input wire clk,d,output reg a,b,c);\n// 增加一级，不能让新值同沿穿透\nendmodule",
        "tests": [
          "假定a=b=c=0，D保持1；前三个上升沿后a/b/c依次100、110、111；沿间Q保持。初态只是本题预测条件，不代表无复位模块会自行清0。"
        ]
      },
      {
        "type": "波形分析",
        "prompt": "初a=b=0。各上升沿前D依次1、0、1；问b三个沿后值。 请按时间先后填写题目所问的输出序列，用逗号分隔。观察b的三个沿后值。",
        "explain": "b相对a晚一拍，依次采旧a。",
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
                1,
                0,
                1
              ]
            ],
            [
              "D",
              [
                1,
                1,
                0,
                0,
                1,
                1
              ]
            ],
            [
              "a",
              [
                0,
                1,
                1,
                0,
                0,
                1
              ]
            ],
            [
              "b",
              [
                0,
                0,
                0,
                1,
                1,
                0
              ]
            ]
          ],
          "caption": "初a=b=0。各上升沿前D依次1、0、1；问b三个沿后值。",
          "answer": [
            "0,1,0"
          ]
        },
        "accepted": [
          "0,1,0"
        ]
      }
    ],
    "syntax": []
  },
  "counter": {
    "hook": "",
    "hardware": "counter",
    "kind": "counter",
    "principle": [],
    "lines": {
      "1": "模块输入clk、低有效复位rst_n与使能en。",
      "2": "q是4位过程变量输出，范围0～15（无符号）。",
      "3": "只有上升沿更新状态。",
      "4": "复位优先，rst_n=0时清零，不受en影响。",
      "5": "复位无效且en=1，用旧q算加1；不满足时无赋值，触发器保持。"
    },
    "compare": "module counter_sv_demo(input logic clk,rst_n,en,output logic [3:0] q);\n always_ff @(posedge clk) begin\n  if(!rst_n) q<='0;\n  else if(en) q<=q+4'd1;\n end\nendmodule",
    "bug": {
      "wrong": "always @(posedge clk) begin\n if(!rst_n) q<=0;\n if(en) q<=q+1;\nend",
      "why": "两个独立if都可能安排对q的更新。同一过程同一沿多次非阻塞赋值时，最后执行的那次可覆盖前面的复位意图。",
      "fix": "always @(posedge clk) begin\n if(!rst_n) q<=4'd0;\n else if(en) q<=q+4'd1;\nend",
      "test": "复位有效且en=1、沿前q=7，正确结果0。错误写法可能提交8。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "en=0且rst_n=1时上升沿后Q？",
        "options": [
          "保持",
          "加1",
          "清0"
        ],
        "correct": 0,
        "explain": "没有安排新值，沿触发存储保持。",
        "kind": "choice",
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“从规格到完整计数器”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "always @(posedge clk) begin\n if(!rst_n) q<=4'd0;\n else if(en) q<=___;\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "q+4'd1",
              "q+1"
            ]
          }
        ],
        "explain": "用旧Q计算下一值，只在使能沿提交。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“从规格到完整计数器”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "always @(posedge clk) begin\n if(!rst_n) q<=0;\n if(en) q<=q+1;\nend",
        "accepted": [
          "always @(posedge clk) begin\n if(!rst_n) q<=4'd0;\n else if(en) q<=q+4'd1;\nend"
        ],
        "solution": "always @(posedge clk) begin\n if(!rst_n) q<=4'd0;\n else if(en) q<=q+4'd1;\nend",
        "explain": "两个独立if都可能安排对q的更新。同一过程同一沿多次非阻塞赋值时，最后执行的那次可覆盖前面的复位意图。 修正后可这样核对：复位有效且en=1、沿前q=7，正确结果0。错误写法可能提交8。"
      },
      {
        "type": "独立实现",
        "prompt": "把计数器改为3位，检查复位、en=0保持、7→0回绕、复位与en同时有效。写预期表。",
        "starter": "module exercise(input wire clk,rst_n,en,output reg [2:0] q);\n // 实现并列出测试步骤\nendmodule",
        "solution": "always @(posedge clk) begin\n if(!rst_n) q<=3'd0;\n else if(en) q<=q+3'd1;\nend\n// 复位沿0；en=1计数；en=0保持；7+1截为0；rst_n=0,en=1仍为0。",
        "kind": "implementation",
        "revision": 2,
        "interface": "module exercise(input wire clk,rst_n,en,output reg [2:0] q);\n // 实现并列出测试步骤\nendmodule",
        "tests": [
          "3位Q=7且en=1时下一沿为0；en=0保持；rst_n=0与en=1同时有效时应清0。"
        ]
      },
      {
        "type": "波形分析",
        "prompt": "初Q=0，rst_n恒1；en按采样沿依次1、0、1。Q行用数值标记。 请按时间先后填写题目所问的输出序列，用逗号分隔。观察三个沿后Q。",
        "explain": "第二沿使能为0，保持1。",
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
                1,
                0,
                1
              ]
            ],
            [
              "en",
              [
                1,
                1,
                0,
                0,
                1,
                1
              ]
            ],
            [
              "Q",
              [
                0,
                1,
                1,
                1,
                1,
                2
              ]
            ]
          ],
          "caption": "初Q=0，rst_n恒1；en按采样沿依次1、0、1。Q行用数值标记。",
          "answer": [
            "1,1,2"
          ]
        },
        "accepted": [
          "1,1,2"
        ]
      }
    ],
    "syntax": []
  },
  "fsm": {
    "hook": "",
    "hardware": "fsm",
    "kind": "fsm",
    "principle": [],
    "lines": {
      "3": "localparam给状态编码命名，数值只是一种表示。",
      "4": "state是存储，next_state是组合信号。",
      "6": "默认保持当前状态，防止漏赋值。",
      "8": "IDLE且start有效，候选下一状态改为RUN。",
      "9": "RUN且finish有效，候选回到IDLE。",
      "13": "时序块只负责在沿更新当前状态。",
      "17": "busy只依赖当前state，是Moore输出。"
    },
    "bug": {
      "wrong": "assign busy=(next_state==RUN);",
      "why": "输出改为依赖组合候选状态，start可能在沿前使busy置1，违反本课Moore规格。",
      "fix": "assign busy=(state==RUN);",
      "test": "在IDLE时把start拉高但不给时钟；busy应仍为0。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "IDLE时start=1，尚无新沿，state？",
        "options": [
          "IDLE",
          "RUN",
          "DONE"
        ],
        "correct": 0,
        "explain": "next_state变RUN，当前state尚未采样。",
        "kind": "choice",
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“有限状态机：当前状态与下一状态”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "always @(*) begin\n ___;\n case(state)\n IDLE:if(start)next_state=RUN;\n RUN:if(finish)next_state=IDLE;\n default:next_state=IDLE;\n endcase\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "next_state=state"
            ]
          }
        ],
        "explain": "未命中转移时默认保持当前状态。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“有限状态机：当前状态与下一状态”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "assign busy=(next_state==RUN);",
        "accepted": [
          "assign busy=(state==RUN);"
        ],
        "solution": "assign busy=(state==RUN);",
        "explain": "输出改为依赖组合候选状态，start可能在沿前使busy置1，违反本课Moore规格。 修正后可这样核对：在IDLE时把start拉高但不给时钟；busy应仍为0。"
      },
      {
        "type": "独立实现",
        "prompt": "加入DONE状态：RUN收到finish进入DONE，DONE下一拍回IDLE；done仅在DONE为1。画转移表并写两块式RTL。",
        "starter": "// 先列IDLE/RUN/DONE转移表\n// 再写next_state组合块、state时序块和done输出",
        "solution": "IDLE+start→RUN；RUN+finish→DONE；DONE→IDLE；其余保持。组合块给默认值，时序块复位IDLE，assign done=(state==DONE)。",
        "kind": "implementation",
        "revision": 2,
        "interface": "// 先列IDLE/RUN/DONE转移表\n// 再写next_state组合块、state时序块和done输出",
        "tests": [
          "复位IDLE；start沿后RUN；finish沿后DONE且done=1；再下一沿IDLE且done=0；未命中条件保持。"
        ]
      },
      {
        "type": "情境分析",
        "prompt": "初态IDLE；第1沿start=1；第2沿finish=1，沿后state？",
        "options": [
          "RUN,IDLE",
          "IDLE,RUN",
          "RUN,RUN"
        ],
        "correct": 0,
        "explain": "每沿采样当时的next_state。",
        "kind": "choice",
        "revision": 2
      }
    ],
    "syntax": []
  },
  "sv-always": {
    "hook": "",
    "hardware": "dff",
    "kind": "enabled",
    "principle": [],
    "lines": {
      "1": "SV端口用logic表达四态数据，仍要满足单驱动规则。",
      "3": "next_q是组合计算结果，不是额外一拍寄存器。",
      "4": "always_comb运行组合计算；右值变化时重新求值。",
      "5": "en=1选d，en=0选旧q，形成保持反馈选择。",
      "7": "always_ff只在上升沿采样next_q。",
      "8": "同步低有效复位优先。",
      "9": "非阻塞更新q，其他过程不能再写q。"
    },
    "compare": "module enabled_ff_v(input wire clk,rst_n,en,d,output reg q);\n reg next_q;\n always @(*) next_q=en ? d : q;\n always @(posedge clk) begin\n  if(!rst_n) q<=1'b0;\n  else q<=next_q;\n end\nendmodule",
    "bug": {
      "wrong": "always_comb if(en) next_q=d;",
      "why": "en=0没有赋值，要求保存next_q，违背纯组合意图；关键字不会自动补全逻辑。",
      "fix": "always_comb next_q=en ? d : q;",
      "test": "en=0时next_q应明确等于q，且lint/综合不应报告意外锁存器。"
    },
    "exercises": [
      {
        "type": "先预测",
        "prompt": "声明logic next_q就意味着它是寄存器吗？",
        "options": [
          "不，取决于赋值行为",
          "是",
          "一定是网络解析器"
        ],
        "correct": 0,
        "explain": "类型与硬件存储结构不是一一对应。",
        "kind": "choice",
        "revision": 2
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 2,
        "prompt": "阅读“always_comb、always_ff 与迁移”下面的片段，填写空缺，使结果符合本课例子的规则。",
        "template": "___ @(posedge clk) begin\n if(!rst_n) q<=0; else q<=next_q;\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "always_ff"
            ]
          }
        ],
        "explain": "SV明确表达沿触发存储。"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 2,
        "prompt": "下面是“always_comb、always_ff 与迁移”例子的错误片段。按照本课规格修改代码；信号含义与正文相同。",
        "starter": "always_comb if(en) next_q=d;",
        "accepted": [
          "always_comb next_q=en ? d : q;"
        ],
        "solution": "always_comb next_q=en ? d : q;",
        "explain": "en=0没有赋值，要求保存next_q，违背纯组合意图；关键字不会自动补全逻辑。 修正后可这样核对：en=0时next_q应明确等于q，且lint/综合不应报告意外锁存器。"
      },
      {
        "type": "独立实现",
        "prompt": "将计数器迁移到SV：端口logic、always_ff、低有效同步复位、en保持。写出与原版相同的4类测试。",
        "starter": "module exercise(input logic clk,rst_n,en,output logic [3:0] q);\n // 保持原版行为\nendmodule",
        "solution": "always_ff @(posedge clk) begin\n if(!rst_n) q<='0;\n else if(en) q<=q+4'd1;\nend\n// 复位/计数/保持/回绕，另测复位优先。",
        "kind": "implementation",
        "revision": 2,
        "interface": "module exercise(input logic clk,rst_n,en,output logic [3:0] q);\n // 保持原版行为\nendmodule",
        "tests": [
          "与原计数器对照复位优先、en=0保持、末值回绕、连续加1四类行为；代码关键字迁移不应改变观察相位。"
        ]
      },
      {
        "type": "情境分析",
        "prompt": "en=0且q=1，d变0，无时钟沿；q？",
        "options": [
          "保持1",
          "变0",
          "变Z"
        ],
        "correct": 0,
        "explain": "next_q由反馈取q；寄存器也未采样新沿。",
        "kind": "choice",
        "revision": 2
      }
    ],
    "syntax": []
  }
};for(const l of window.HDL_LESSONS)if(data[l.id])l.lab=data[l.id];})();
