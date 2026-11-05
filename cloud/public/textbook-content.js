(()=>{const data={
  "branches": {
    "hook": "",
    "hardware": "mux",
    "kind": "mux",
    "principle": [],
    "lines": {
      "3": "@(*)监听本过程读到的a、b、sel，任何一个变化都重算y。没有posedge，所以不是寄存器。",
      "4": "先给y=a，使sel=0路径也有值；这次过程不需要引用上一次y。",
      "6": "sel=1时用b覆盖本次默认a。阻塞=使本过程后续语句看见新y，但不引入一个时钟周期。"
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
        "revision": 2,
        "objective": "读懂begin/end和if/else",
        "reviewSection": "study-concept",
        "hint": "遗漏else或默认值可能推导锁存器，不是工具自动帮你补0。",
        "objectiveId": "branches-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "a、b、y均4位，sel为一位；默认选择a，sel=1改选b。填写真分支的赋值，保留完整组合路径。",
        "template": "always @(*) begin\n y = a;\n if(sel) ___;\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "y=b"
            ]
          }
        ],
        "explain": "默认覆盖sel=0，真分支选b。",
        "objective": "为组合输出覆盖所有路径",
        "reviewSection": "study-code",
        "hint": "遗漏else或默认值可能推导锁存器，不是工具自动帮你补0。",
        "objectiveId": "branches-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "组合告警：input wire en,hot；output reg lamp,alarm。lamp=en；alarm只有en与hot都为1才为1。只改过程。",
        "starter": "always @(*) begin\n lamp=en;\n if(en) alarm=hot;\nend",
        "accepted": [
          "always @(*) begin\n lamp=en;\n alarm=1'b0;\n if(en) alarm=hot;\nend"
        ],
        "solution": "always @(*) begin\n lamp=en;\n alarm=1'b0;\n if(en) alarm=hot;\nend",
        "explain": "lamp路径完整，alarm在en=0时缺赋值。从en=1,hot=1切到en=0会保留告警。",
        "hint": "逐个输出分别检查en=0路径，不能只看lamp。",
        "context": "组合告警：input wire en,hot；output reg lamp,alarm。lamp=en；alarm只有en与hot都为1才为1。只改过程。",
        "requireReason": true,
        "objective": "分别覆盖组合逻辑的每个输出路径",
        "reviewSection": "study-code",
        "objectiveId": "branches-task-3"
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
        ],
        "objective": "为组合输出覆盖所有路径",
        "reviewSection": "study-code",
        "hint": "遗漏else或默认值可能推导锁存器，不是工具自动帮你补0。",
        "objectiveId": "branches-task-4"
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
        "revision": 2,
        "objective": "为组合输出覆盖所有路径",
        "reviewSection": "study-concept",
        "hint": "遗漏else或默认值可能推导锁存器，不是工具自动帮你补0。",
        "objectiveId": "branches-task-5"
      }
    ],
    "syntax": [],
    "lineSources": {
      "3": " always @(*) begin",
      "4": "  y = a;",
      "6": "   y = b;"
    }
  },
  "edges": {
    "hook": "",
    "hardware": "dff",
    "kind": "dff",
    "principle": [],
    "lines": {
      "1": "clk控制何时采样，d是数据，q是在过程里更新的输出reg。端口列表没有自动产生时钟源。",
      "2": "posedge clk只在0→1的有效边沿触发此过程；时钟保持高电平不会重复采样。",
      "3": "<=读取沿前d，安排随后更新q；沿后d再变不影响已采的q，要等下一个有效沿。"
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
        "revision": 2,
        "objective": "指出上升沿与一个完整周期",
        "reviewSection": "study-concept",
        "hint": "时钟高电平和时钟上升沿不是同一回事。",
        "objectiveId": "edges-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "clk在高电平期间可能停留很久，但q只应在0→1时采d。填写事件控制的边沿关键字。",
        "template": "always @(___ clk) q <= d;",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "posedge"
            ]
          }
        ],
        "explain": "只在上升沿取样，而非高电平持续跟随。",
        "objective": "预测D变化后Q何时更新",
        "reviewSection": "study-code",
        "hint": "时钟高电平和时钟上升沿不是同一回事。",
        "objectiveId": "edges-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "input wire clk,button；output reg saved。要求在时钟上升沿记住button，其后沿间保持。",
        "starter": "always @(posedge button) saved<=clk;",
        "accepted": [
          "always @(posedge clk) saved<=button;"
        ],
        "solution": "always @(posedge clk) saved<=button;",
        "explain": "错误代码把数据当时钟、时钟当数据。button沿间变化会触发错误采样。",
        "hint": "谁规定采样时刻？谁提供被记住的值？",
        "context": "input wire clk,button；output reg saved。要求在时钟上升沿记住button，其后沿间保持。",
        "requireReason": true,
        "objective": "把采样时钟与被采数据分开",
        "reviewSection": "study-code",
        "objectiveId": "edges-task-3"
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
        ],
        "objective": "预测D变化后Q何时更新",
        "reviewSection": "study-code",
        "hint": "时钟高电平和时钟上升沿不是同一回事。",
        "objectiveId": "edges-task-4"
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
        ],
        "objective": "预测D变化后Q何时更新",
        "reviewSection": "study-concept",
        "hint": "时钟高电平和时钟上升沿不是同一回事。",
        "objectiveId": "edges-task-5"
      }
    ],
    "syntax": [],
    "lineSources": {
      "1": "module dff(input wire clk,d, output reg q);",
      "2": " always @(posedge clk) begin",
      "3": "  q <= d;"
    }
  },
  "nba": {
    "hook": "",
    "hardware": "pipeline",
    "kind": "pipeline",
    "principle": [],
    "lines": {
      "3": "a与b共享同一个上升沿，不存在先给a一个沿、再给b一个沿。",
      "4": "此沿计算d并排队给a，尚未让下一条语句读到新a；旧a=0、d=1时安排a变1。",
      "5": "此时a仍是旧0，所以b安排变0。NBA提交后a=1、b=0；下一沿b才取得1。用=先改a会改变后续读取。"
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
        "revision": 2,
        "objective": "读出同一沿各寄存器采到的旧值",
        "reviewSection": "study-concept",
        "hint": "非阻塞并不表示“延迟一个完整周期后才执行赋值”；当前沿后即更新，第二级读旧值造成跨拍传输。",
        "objectiveId": "nba-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "初a=b=0，首沿d=1后必须a=1,b=0，下一沿b才为1。第一条应使用什么赋值符号？",
        "template": "always @(posedge clk) begin\n a ___ d;\n b <= a;\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "<="
            ]
          }
        ],
        "explain": "非阻塞先读右值，b同沿读旧a。",
        "objective": "区分=和<=在例子中的结果",
        "reviewSection": "study-code",
        "hint": "非阻塞并不表示“延迟一个完整周期后才执行赋值”；当前沿后即更新，第二级读旧值造成跨拍传输。",
        "objectiveId": "nba-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "input wire clk,d；output reg [2:0] stages。移位方向为d进bit0，旧bit0进bit1，旧bit1进bit2。",
        "starter": "always @(posedge clk) stages<={d,stages[2:1]};",
        "accepted": [
          "always @(posedge clk) stages<={stages[1:0],d};"
        ],
        "solution": "always @(posedge clk) stages<={stages[1:0],d};",
        "explain": "错误方向使d先到bit2。初000，连续d=1时正确沿后001、011、111。",
        "hint": "先只看第一沿，新输入应该落在哪一位？",
        "context": "input wire clk,d；output reg [2:0] stages。移位方向为d进bit0，旧bit0进bit1，旧bit1进bit2。",
        "requireReason": true,
        "objective": "用旧寄存器位实现正确移位方向",
        "reviewSection": "study-code",
        "objectiveId": "nba-task-3"
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
        ],
        "objective": "区分=和<=在例子中的结果",
        "reviewSection": "study-code",
        "hint": "非阻塞并不表示“延迟一个完整周期后才执行赋值”；当前沿后即更新，第二级读旧值造成跨拍传输。",
        "objectiveId": "nba-task-4"
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
        ],
        "objective": "区分=和<=在例子中的结果",
        "reviewSection": "study-concept",
        "hint": "非阻塞并不表示“延迟一个完整周期后才执行赋值”；当前沿后即更新，第二级读旧值造成跨拍传输。",
        "objectiveId": "nba-task-5"
      }
    ],
    "syntax": [],
    "prediction": {
      "question": "沿前a=1、b=0、d=0。给一个上升沿后，a和b分别是多少？",
      "answer": "a=0、b=1。a取本沿d=0，b取沿前a=1，不取正在安排的新a。"
    },
    "lineSources": {
      "3": " always @(posedge clk) begin",
      "4": "  a <= d;",
      "5": "  b <= a;"
    }
  },
  "counter": {
    "hook": "",
    "hardware": "counter",
    "kind": "counter",
    "principle": [],
    "lines": {
      "2": "q是4位，能保留0到15。加法若产生第5位，写回q时会截去。",
      "4": "低有效同步复位优先，无论en和旧q为何，在此上升沿后得到0。",
      "5": "右侧q是沿前值；en=1时新q为旧q+1，en=0时保持。旧15加1只留4位成为0，反馈形成计数。"
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
        "revision": 2,
        "objective": "从自然语言规格写完整RTL",
        "reviewSection": "study-concept",
        "hint": "不要用另一个always对q补复位，会产生多驱动。",
        "objectiveId": "counter-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "q是4位寄存器，复位无效且en=1时前进一个状态，15后回0。填写使用沿前q的下一值表达式。",
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
        "explain": "用旧Q计算下一值，只在使能沿提交。",
        "objective": "预测复位、暂停和回绕",
        "reviewSection": "study-code",
        "hint": "不要用另一个always对q补复位，会产生多驱动。",
        "objectiveId": "counter-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "input wire clk,rst_n,en；output reg [2:0] q。模6计数：0→1→…→5→0，en=0保持。",
        "starter": "always @(posedge clk) begin\n if(!rst_n) q<=0;\n else if(en) begin\n  if(q==3'd6) q<=0;\n  else q<=q+3'd1;\n end\nend",
        "accepted": [
          "always @(posedge clk) begin\n if(!rst_n) q<=0;\n else if(en) begin\n  if(q==3'd5) q<=0;\n  else q<=q+3'd1;\n end\nend"
        ],
        "solution": "always @(posedge clk) begin\n if(!rst_n) q<=0;\n else if(en) begin\n  if(q==3'd5) q<=0;\n  else q<=q+3'd1;\n end\nend",
        "explain": "终值比较的是沿前q，旧5时已经应回0；等到旧6才回0会多出一个状态。",
        "hint": "把旧q=5代入分支，核对规格的下一值。",
        "context": "input wire clk,rst_n,en；output reg [2:0] q。模6计数：0→1→…→5→0，en=0保持。",
        "requireReason": true,
        "objective": "在模6终值处回绕且保留使能",
        "reviewSection": "study-code",
        "objectiveId": "counter-task-3"
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
        ],
        "objective": "预测复位、暂停和回绕",
        "reviewSection": "study-code",
        "hint": "不要用另一个always对q补复位，会产生多驱动。",
        "objectiveId": "counter-task-4"
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
        ],
        "objective": "预测复位、暂停和回绕",
        "reviewSection": "study-concept",
        "hint": "不要用另一个always对q补复位，会产生多驱动。",
        "objectiveId": "counter-task-5"
      }
    ],
    "syntax": [],
    "prediction": {
      "question": "旧q=15，rst_n=1，en=0。再来一个上升沿，q是0还是15？",
      "answer": "仍是15。自然回绕只有在允许加一时发生，不能跳过en条件。"
    },
    "lineSources": {
      "2": " output reg [3:0] q);",
      "4": "  if (!rst_n) q <= 4'd0;",
      "5": "  else if (en) q <= q + 4'd1;"
    }
  },
  "fsm": {
    "hook": "",
    "hardware": "fsm",
    "kind": "fsm",
    "principle": [],
    "lines": {
      "6": "先令next_state等于当前state。没有转移条件时，下一沿应继续原状态，不需要保存旧next_state。",
      "8": "仅当当前为IDLE且start=1，组合候选值才变RUN；state尚未更新。",
      "9": "RUN必须等finish才返回IDLE。start在RUN中不影响这条转移。",
      "15": "有效沿把已算好的next_state装入state，状态寄存器在沿间保持。",
      "17": "busy只由当前state译码；IDLE中start刚拉高但还没时钟时，busy仍为0。"
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
        "revision": 2,
        "objective": "区分state与next_state",
        "reviewSection": "study-concept",
        "hint": "不要把next_state变化当成state已经变化。",
        "objectiveId": "fsm-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "IDLE等start，RUN等finish；没有转移请求时要继续当前状态。补上组合下一状态的默认值。",
        "template": "always @(*) begin\n ___;\n case(state)\n IDLE:if(start)next_state=RUN;\n RUN:if(finish)next_state=IDLE;\n default:next_state=IDLE;\n endcase\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "next_state=state"
            ]
          }
        ],
        "explain": "未命中转移时默认保持当前状态。",
        "objective": "按转移表预测沿后状态",
        "reviewSection": "study-code",
        "hint": "不要把next_state变化当成state已经变化。",
        "objectiveId": "fsm-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "已声明IDLE=0,RUN=1，reg state,next_state；input wire start,finish。RUN必须等finish才退出。",
        "starter": "always @(*) begin\n next_state=state;\n case(state)\n  IDLE: if(start) next_state=RUN;\n  RUN: next_state=IDLE;\n  default: next_state=IDLE;\n endcase\nend",
        "accepted": [
          "always @(*) begin\n next_state=state;\n case(state)\n  IDLE: if(start) next_state=RUN;\n  RUN: if(finish) next_state=IDLE;\n  default: next_state=IDLE;\n endcase\nend"
        ],
        "solution": "always @(*) begin\n next_state=state;\n case(state)\n  IDLE: if(start) next_state=RUN;\n  RUN: if(finish) next_state=IDLE;\n  default: next_state=IDLE;\n endcase\nend",
        "explain": "错误的RUN分支无条件退出，只忙一拍。finish=0时应沿用默认保持RUN。",
        "hint": "当前RUN、finish=0时，next应该还是谁？",
        "context": "已声明IDLE=0,RUN=1，reg state,next_state；input wire start,finish。RUN必须等finish才退出。",
        "requireReason": true,
        "objective": "让运行状态在完成条件前保持",
        "reviewSection": "study-code",
        "objectiveId": "fsm-task-3"
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
        ],
        "objective": "按转移表预测沿后状态",
        "reviewSection": "study-code",
        "hint": "不要把next_state变化当成state已经变化。",
        "objectiveId": "fsm-task-4"
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
        "revision": 2,
        "objective": "按转移表预测沿后状态",
        "reviewSection": "study-concept",
        "hint": "不要把next_state变化当成state已经变化。",
        "objectiveId": "fsm-task-5"
      }
    ],
    "syntax": [],
    "prediction": {
      "question": "当前IDLE，start已变1但还没时钟沿，next与busy分别为何？",
      "answer": "next=RUN，但state仍IDLE，所以busy=0。给时钟后才装入新状态。"
    },
    "lineSources": {
      "6": "  next_state = state;",
      "8": "   IDLE: if(start) next_state = RUN;",
      "9": "   RUN: if(finish) next_state = IDLE;",
      "15": "  else state <= next_state;",
      "17": " assign busy = (state == RUN);"
    }
  },
  "sv-always": {
    "hook": "",
    "hardware": "dff",
    "kind": "enabled",
    "principle": [],
    "lines": {
      "4": "always_comb表达组合意图，并自动处理读取敏感性和初次执行；它不能替你补漏赋值。",
      "5": "en=1候选输入是d，否则是当前q，形成寄存器前的使能MUX，而非next_q自身的锁存。",
      "7": "always_ff声明沿触发存储意图，q不应再由其他过程驱动。",
      "9": "q在非复位沿装入next_q；即使组合next_q沿间改变，q仍等边沿。"
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
        "revision": 2,
        "objective": "用always_comb/always_ff表达电路意图",
        "reviewSection": "study-concept",
        "hint": "always_comb不会自动避免锁存器；漏赋值仍应修复。",
        "objectiveId": "sv-always-task-1"
      },
      {
        "kind": "fill",
        "type": "代码补全",
        "revision": 3,
        "prompt": "next_q已由完整组合逻辑产生。填写明确表达上升沿存储意图的SystemVerilog过程关键字。",
        "template": "___ @(posedge clk) begin\n if(!rst_n) q<=0; else q<=next_q;\nend",
        "blanks": [
          {
            "label": "空缺内容",
            "accepted": [
              "always_ff"
            ]
          }
        ],
        "explain": "SV明确表达沿触发存储。",
        "objective": "把熟悉的Verilog迁移到SV",
        "reviewSection": "study-code",
        "hint": "always_comb不会自动避免锁存器；漏赋值仍应修复。",
        "objectiveId": "sv-always-task-2"
      },
      {
        "kind": "repair",
        "type": "Bug修复",
        "revision": 3,
        "prompt": "input logic a,b；output logic y。两个输入都可能变化，迁移成SystemVerilog组合意图过程。",
        "starter": "always @(a) y=a^b;",
        "accepted": [
          "always_comb y=a^b;"
        ],
        "solution": "always_comb y=a^b;",
        "explain": "原敏感表漏b，a不变而b变化时仿真输出陈旧。always_comb从读取关系得到敏感性。",
        "hint": "让a固定0，只把b从0改1看过程是否触发。",
        "context": "input logic a,b；output logic y。两个输入都可能变化，迁移成SystemVerilog组合意图过程。",
        "requireReason": true,
        "objective": "修复遗漏输入敏感性的组合仿真",
        "reviewSection": "study-code",
        "objectiveId": "sv-always-task-3"
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
        ],
        "objective": "把熟悉的Verilog迁移到SV",
        "reviewSection": "study-code",
        "hint": "always_comb不会自动避免锁存器；漏赋值仍应修复。",
        "objectiveId": "sv-always-task-4"
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
        "revision": 2,
        "objective": "把熟悉的Verilog迁移到SV",
        "reviewSection": "study-concept",
        "hint": "always_comb不会自动避免锁存器；漏赋值仍应修复。",
        "objectiveId": "sv-always-task-5"
      }
    ],
    "syntax": [],
    "lineSources": {
      "4": " always_comb begin",
      "5": "  next_q = en ? d : q;",
      "7": " always_ff @(posedge clk) begin",
      "9": "  else q <= next_q;"
    }
  }
};for(const l of window.HDL_LESSONS)if(data[l.id])l.lab=data[l.id];})();
