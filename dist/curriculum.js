/* Original English course notes and exercises. Browser demos do not execute HDL. */
window.IC_COURSE = {
  "SOURCES": {
    "logic": [
      "MIT Computation Structures notes",
      "https://computationstructures.org/notes/"
    ],
    "iverilog": [
      "Icarus Verilog: Getting Started",
      "https://steveicarus.github.io/iverilog/usage/getting_started.html"
    ],
    "install": [
      "Icarus Verilog: Installation Guide",
      "https://steveicarus.github.io/iverilog/usage/installation.html"
    ],
    "wave": [
      "GTKWave documentation",
      "https://gtkwave.github.io/gtkwave/"
    ],
    "vcs": [
      "Synopsys VCS: product and documentation entry",
      "https://www.synopsys.com/verification/simulation/vcs.html"
    ],
    "dc": [
      "Synopsys Design Compiler",
      "https://www.synopsys.com/implementation-and-signoff/rtl-synthesis-test/design-compiler.html"
    ],
    "yosys": [
      "Yosys: a primer on digital circuit synthesis",
      "https://yosyshq.readthedocs.io/projects/yosys/en/v0.48/appendix/primer.html"
    ]
  },
  "STAGES": [
    {
      "title": "Digital logic foundations",
      "short": "Foundations",
      "desc": "Understand the circuit before describing it"
    },
    {
      "title": "Verilog RTL",
      "short": "Verilog",
      "desc": "Describe combinational logic and registers"
    },
    {
      "title": "Simulation and testing",
      "short": "Simulation",
      "desc": "Make defects observable and reproducible"
    },
    {
      "title": "VCS practice",
      "short": "VCS",
      "desc": "Run the same design in a licensed environment"
    },
    {
      "title": "DC synthesis basics",
      "short": "DC synthesis",
      "desc": "Map RTL into a standard-cell implementation"
    },
    {
      "title": "Project and acceptance",
      "short": "Project",
      "desc": "Deliver a small reproducible engineering result"
    }
  ],
  "LESSONS": [
    {
      "id": "bits",
      "stage": 0,
      "title": "Start with 0 and 1",
      "minutes": 20,
      "intro": "No software installation yet. Toggle four bits and discover how logic levels represent a number.",
      "goals": [
        "Understand bits and width",
        "Read binary numbers",
        "Explain finite-width results"
      ],
      "lab": "bits",
      "sections": [
        [
          "What do 0 and 1 mean?",
          "Digital circuits interpret ranges of voltage as logic 0 or logic 1. These are discrete logical values: 1 does not universally mean 5 V, and 0 does not universally mean exactly 0 V. The thresholds depend on the device and process. One bit can represent two states."
        ],
        [
          "Why do four bits represent sixteen states?",
          "From right to left, the weights are 1, 2, 4, and 8. Binary 1010 means 1×8 + 0×4 + 1×2 + 0×1 = 10. There are 2^n patterns in n independent bits. A four-bit unsigned number therefore ranges from 0 to 15, inclusive."
        ],
        [
          "Width changes the stored result",
          "If a result is stored in four bits, any higher bits are discarded. Mathematically, 1111 + 0001 is 10000. Keeping only the lowest four bits gives 0000. This is wraparound. Reserve a fifth bit explicitly when the carry must be preserved."
        ],
        [
          "How to use this course",
          "Learn the circuit idea, predict an outcome, try the model, and then write an explanation. Later you will run real HDL tests and a synthesis flow. The suggested minutes estimate an initial reading; debugging and tool setup take additional time. You do not need to finish a C course before starting."
        ]
      ],
      "code": {
        "name": "Verilog numeric literals",
        "lang": "verilog",
        "text": "4'b1010   // 4-bit binary literal, value 10\n4'd10     // 4-bit decimal literal, value 10\n4'hA      // 4-bit hexadecimal literal, value 10"
      },
      "trap": "The first model uses unsigned values. Two's complement and sign extension appear in the width lesson; the highest bit is not always a sign bit.",
      "exercise": {
        "task": "Write decimal 13 as four-bit binary. Explain what a four-bit unsigned counter stores after adding one to 15.",
        "placeholder": "13 = …; the stored result of 15 + 1 is … because …",
        "answer": "13 is 1101. The fifth carry bit does not fit in four bits, so 1111 + 1 leaves 0000 and the stored value wraps to zero."
      },
      "quiz": {
        "q": "What is the largest five-bit unsigned value?",
        "options": [
          "16",
          "31",
          "32"
        ],
        "correct": 1,
        "why": "Five bits provide 2^5 = 32 patterns. Counting from zero makes the largest value 31."
      },
      "sources": [
        "logic"
      ]
    },
    {
      "id": "gates",
      "stage": 0,
      "title": "Logic gates and truth tables",
      "minutes": 25,
      "intro": "The current inputs determine a combinational circuit's output. A truth table states that relationship completely.",
      "goals": [
        "Distinguish AND, OR, NOT, XOR",
        "Enumerate input combinations",
        "Translate a rule into logic"
      ],
      "lab": "gates",
      "sections": [
        [
          "Turn a sentence into a rule",
          "Suppose a device may run only when power is healthy (A) and permission is asserted (B). Y = A AND B is 1 only when both inputs are 1. OR produces 1 when at least one input is 1. NOT inverts a single bit."
        ],
        [
          "XOR detects different inputs",
          "A two-input XOR produces 1 for 01 and 10, and 0 for 00 and 11. XOR is useful in arithmetic and parity logic. It differs from OR when both inputs are 1."
        ],
        [
          "A truth table is an executable specification",
          "Two input bits have four combinations; three have eight. For a small combinational block, list all combinations, implement the rule, and check every row in a testbench. The browser uses ideal logic. Real gates also introduce propagation delay."
        ]
      ],
      "code": {
        "name": "gate_demo.v",
        "lang": "verilog",
        "text": "module gate_demo(input wire a, b,\n                 output wire y_and, y_or, y_xor);\n  assign y_and = a & b;\n  assign y_or  = a | b;\n  assign y_xor = a ^ b;\nendmodule"
      },
      "trap": "The examples here use one-bit inputs. For vectors, & is bitwise AND while && is logical AND; they are not interchangeable.",
      "exercise": {
        "task": "List all four combinations of a and b. Give the outputs of a | b and a ^ b, and identify the row where they differ.",
        "placeholder": "a b | OR XOR\n0 0 | …\n0 1 | …\n1 0 | …\n1 1 | …",
        "answer": "00: 0,0; 01: 1,1; 10: 1,1; 11: 1,0. Only the last row differs."
      },
      "quiz": {
        "q": "For a=1 and b=1, what is a ^ b?",
        "options": [
          "0",
          "1",
          "Unknown"
        ],
        "correct": 0,
        "why": "XOR is 1 when its two inputs differ. These inputs are equal, so the result is zero."
      },
      "sources": [
        "logic"
      ]
    },
    {
      "id": "mux",
      "stage": 0,
      "title": "Multiplexers and adders",
      "minutes": 30,
      "intro": "Logic gates can implement two common operations: selecting data and calculating a result.",
      "goals": [
        "Understand a two-input MUX",
        "Recognize a datapath",
        "Preserve an addition carry"
      ],
      "lab": "mux",
      "sections": [
        [
          "Select one of two inputs",
          "A multiplexer, or MUX, has data inputs a and b, a selection input sel, and output y. Our specification selects a when sel=0 and b when sel=1. The selection convention belongs in the specification; do not guess it from a signal name."
        ],
        [
          "An adder is combinational logic",
          "For two input bits, the sum bit is a XOR b and the carry is a AND b. A wider adder combines bit and carry relationships. A plus sign in RTL describes addition. The synthesis tool chooses an implementation; no software function is called by the circuit at run time."
        ],
        [
          "Width is part of the interface",
          "Two four-bit unsigned inputs can sum to 30, which requires five bits. Zero-extend both inputs before addition to make carry preservation explicit. An interface that returns only the lowest four bits intentionally discards the carry."
        ]
      ],
      "code": {
        "name": "datapath.v",
        "lang": "verilog",
        "text": "module datapath(input wire [3:0] a, b,\n                input wire sel,\n                output wire [3:0] y,\n                output wire [4:0] sum);\n  assign y = sel ? b : a;\n  assign sum = {1'b0, a} + {1'b0, b};\nendmodule"
      },
      "trap": "This combinational datapath cannot remember its previous output. State requires storage such as flip-flops.",
      "exercise": {
        "task": "For a=9 and b=7, give y for sel=0 and sel=1. Write sum as a five-bit binary value.",
        "placeholder": "sel=0: …; sel=1: …; sum: …",
        "answer": "The MUX returns 9 for sel=0 and 7 for sel=1. The sum is 16, or 10000 in five bits."
      },
      "quiz": {
        "q": "How many output bits are needed to preserve every sum of two four-bit unsigned numbers?",
        "options": [
          "4 bits",
          "5 bits",
          "8 bits"
        ],
        "correct": 1,
        "why": "The largest sum is 30. Five unsigned bits represent values from 0 through 31."
      },
      "sources": [
        "logic",
        "yosys"
      ]
    },
    {
      "id": "clock",
      "stage": 0,
      "title": "Clocks, flip-flops, and state",
      "minutes": 30,
      "intro": "A circuit with memory needs a rule for when its state changes. A clock edge provides that rule.",
      "goals": [
        "Distinguish levels and edges",
        "Understand a D flip-flop",
        "Recognize synchronous reset"
      ],
      "lab": "clock",
      "sections": [
        [
          "Combinational versus sequential behavior",
          "Combinational logic does not need to retain history. Sequential logic contains state, so its behavior can depend on earlier events. A counter must retain its previous value before it can increment on the next clock."
        ],
        [
          "An edge-triggered D flip-flop",
          "A rising edge is the transition from clock value 0 to 1. An ideal D flip-flop samples D at that edge and retains the sampled value on Q between edges. A high clock level does not continuously update Q. A real device also imposes setup and hold requirements around the sampling edge."
        ],
        [
          "Reset defines a starting state",
          "Synchronous reset acts only at the active clock edge; asynchronous reset can assert between clock edges. Our project uses an active-low synchronous reset called rst_n: the next rising edge clears the register when rst_n=0. The suffix is a naming convention; the code determines the behavior."
        ],
        [
          "What the browser model leaves out",
          "Each edge button represents one ideal sampling event. It does not model propagation delay, metastability, or setup and hold constraints. Observing this model cannot establish that a physical implementation meets timing."
        ]
      ],
      "code": {
        "name": "dff.v",
        "lang": "verilog",
        "text": "module dff(input wire clk, rst_n, d,\n           output reg q);\n  always @(posedge clk) begin\n    if (!rst_n) q <= 1'b0;\n    else        q <= d;\n  end\nendmodule"
      },
      "trap": "In classic Verilog, reg names a procedural variable type. It does not by itself prove that synthesis will infer a register; the assignment process determines storage behavior.",
      "exercise": {
        "task": "Starting with Q=0, change D to 1 without a clock edge. What is Q now, and what does it become after a rising edge with reset inactive?",
        "placeholder": "Before the edge: …; after the edge: …",
        "answer": "Q remains zero before the edge. After the rising edge samples D, Q becomes one."
      },
      "quiz": {
        "q": "Synchronous rst_n changes to 0 before the next active clock edge. What happens to Q?",
        "options": [
          "It clears immediately",
          "It keeps toggling",
          "It holds until the edge, then clears"
        ],
        "correct": 2,
        "why": "A synchronous reset is sampled at the clock edge. Asynchronous reset assertion has different behavior."
      },
      "sources": [
        "logic"
      ]
    },
    {
      "id": "module",
      "stage": 1,
      "title": "Write your first Verilog module",
      "minutes": 30,
      "intro": "A module describes a named circuit with an interface that other modules can connect to.",
      "goals": [
        "Read module declarations and ports",
        "Use continuous assignments",
        "Think in concurrent hardware"
      ],
      "lab": "gates",
      "sections": [
        [
          "HDL means Hardware Description Language",
          "Verilog describes circuit structure and behavior, and can also describe tests. At the register-transfer level (RTL), begin with three questions: what are the inputs, what are the outputs, and does the behavior require stored state?"
        ],
        [
          "The module skeleton",
          "The name follows module; ports appear inside parentheses; endmodule ends the definition. input and output specify directions. A wire is a connecting net, and assign continuously drives a net from an expression. A semicolon ends declarations and statements. A module name and a file name are different concepts."
        ],
        [
          "Two assign statements describe concurrent relationships",
          "The example contains two logic functions that exist together. Do not interpret the whole module as a C program executing one source line at a time. Statements within a procedural block have ordering, but separate processes and continuous assignments are concurrent simulation activities."
        ],
        [
          "Start with a circuit you can explain",
          "Use gates and a small MUX to learn ports, connections, and width before adding registers. This lesson shows the design module. The simulation stage adds a testbench so that the module can be exercised in a real HDL simulator."
        ]
      ],
      "code": {
        "name": "first_logic.v",
        "lang": "verilog",
        "text": "module first_logic(\n  input  wire a,\n  input  wire b,\n  output wire both,\n  output wire either\n);\n  assign both   = a & b;\n  assign either = a | b;\nendmodule"
      },
      "trap": "Check spelling, letter case, and port width. The simulation top is normally the testbench; the synthesis top is the design.",
      "exercise": {
        "task": "Write a module named invert with input a and output y. The output must be the inverse of the input.",
        "placeholder": "module invert(…);\n  …\nendmodule",
        "answer": "module invert(input wire a, output wire y);\n  assign y = ~a;\nendmodule"
      },
      "quiz": {
        "q": "What do two independent assign statements normally describe?",
        "options": [
          "Two software operations executed in source order",
          "Concurrent combinational relationships",
          "Two instructions that require a clock"
        ],
        "correct": 1,
        "why": "Continuous assignments represent ongoing logic relationships. A clock is not needed to execute them line by line."
      },
      "sources": [
        "yosys",
        "iverilog"
      ]
    },
    {
      "id": "width",
      "stage": 1,
      "title": "Vectors, width, and operators",
      "minutes": 35,
      "intro": "Many designs compile yet produce the wrong result because of truncation, width, or signedness.",
      "goals": [
        "Read bits and slices",
        "Distinguish & from &&",
        "Extend operands explicitly"
      ],
      "lab": "bits",
      "sections": [
        [
          "Collect bits into a vector",
          "wire [7:0] data declares an eight-bit net. data[0] is the lowest bit, and data[7:4] selects the upper four bits. {a,b} concatenates bit sequences. {4{1'b0}} repeats zero four times. The range [7:0] contains eight bits, not seven."
        ],
        [
          "Bitwise and logical operators",
          "For a=4'b0101 and b=4'b1010, a & b evaluates each pair of bits and produces 0000. a && b treats each operand as a Boolean value: both are nonzero, so the result is a one-bit 1. Use parentheses to clarify mixed arithmetic, comparison, and logical expressions."
        ],
        [
          "Unsigned and two's complement interpretation",
          "The pattern 1111 represents 15 as a four-bit unsigned value and -1 as a four-bit signed two's complement value. Four-bit signed values range from -8 to 7. Unsigned extension adds zeros; signed extension copies the sign bit. Mixing signed and unsigned operands requires careful attention to conversion rules."
        ],
        [
          "Make your width assumptions explicit",
          "Declare output widths, size constants deliberately, and extend operands before arithmetic when needed. Add tests for overflow, negative values, and comparison boundaries. Do not rely on a synthesis tool to infer an intention that the language does not express."
        ]
      ],
      "code": {
        "name": "Width examples: module fragment",
        "lang": "verilog",
        "text": "wire [3:0] a, b;\nwire [4:0] full_sum;\nwire [3:0] low_sum;\nassign full_sum = {1'b0, a} + {1'b0, b};\nassign low_sum  = full_sum[3:0];\n// full_sum[4] holds the preserved carry"
      },
      "trap": "The interactive bit display interprets values as unsigned. It is not a signed-expression evaluator.",
      "exercise": {
        "task": "For a=4'b0010 and b=4'b0100, give a & b, a && b, and {a,b}, including each result's width.",
        "placeholder": "a & b = …\na && b = …\n{a,b} = …",
        "answer": "a & b = 4'b0000; a && b = 1'b1; {a,b} = 8'b00100100."
      },
      "quiz": {
        "q": "What does 4'b1111 represent when interpreted as a four-bit signed two's complement value?",
        "options": [
          "15",
          "-1",
          "-15"
        ],
        "correct": 1,
        "why": "The highest bit has weight -8; the remaining weights are 4, 2, and 1. Their sum is -1."
      },
      "sources": [
        "logic",
        "yosys"
      ]
    },
    {
      "id": "combinational",
      "stage": 1,
      "title": "Procedural combinational logic and latches",
      "minutes": 35,
      "intro": "if and case express selection clearly, provided every possible path assigns the intended outputs.",
      "goals": [
        "Use always @(*)",
        "Assign outputs on every path",
        "Recognize unintended latches"
      ],
      "lab": "mux",
      "sections": [
        [
          "Describe combinational behavior procedurally",
          "Put more involved selection logic in always @(*). The wildcard derives sensitivity from signals read by the procedure. In classic Verilog, a procedurally assigned output is declared reg. It can still synthesize to purely combinational logic when all paths assign it."
        ],
        [
          "Set a default, then override it",
          "The example first assigns y=a and then overrides y with b when sel=1. Both binary values of sel therefore produce an assignment. Our introductory convention uses blocking assignment (=) in combinational processes so that the calculation order is clear."
        ],
        [
          "An omitted assignment can create memory",
          "Writing only if(sel) y=b leaves y unchanged when sel=0. Simulation retains the earlier value, so synthesis may infer a latch to implement that memory. A latch is level-sensitive storage, distinct from a rising-edge flip-flop. The combinational blocks in this course do not intend to use latches."
        ],
        [
          "Check case statements too",
          "Assign all combinational outputs in every branch, or establish defaults before the case. A default branch states behavior for unlisted inputs, but it cannot replace thinking through an incomplete specification."
        ]
      ],
      "code": {
        "name": "mux_proc.v",
        "lang": "verilog",
        "text": "module mux_proc(input wire a, b, sel,\n                output reg y);\n  always @(*) begin\n    y = a;\n    if (sel) y = b;\n  end\nendmodule"
      },
      "trap": "A successful compile does not establish that no latch was inferred. Check behavior, synthesis warnings, and inferred cell types.",
      "exercise": {
        "task": "Repair this intended MUX so that sel=0 selects a: always @(*) begin if(sel) y=b; end",
        "placeholder": "always @(*) begin\n  …\nend",
        "answer": "always @(*) begin\n  y = a;\n  if (sel) y = b;\nend\nAn explicit else y = a; is also valid."
      },
      "quiz": {
        "q": "What is the main risk when a combinational output is not assigned on one execution path?",
        "options": [
          "It automatically becomes zero",
          "An unintended latch may be inferred",
          "A clock is automatically inserted"
        ],
        "correct": 1,
        "why": "No new assignment means retaining the previous value. That storage behavior can require a latch."
      },
      "sources": [
        "yosys"
      ]
    },
    {
      "id": "sequential",
      "stage": 1,
      "title": "Sequential logic and nonblocking assignment",
      "minutes": 35,
      "intro": "At a clock edge, registers sample earlier state before their new values become visible.",
      "goals": [
        "Use posedge processes",
        "Explain <= evaluation and update",
        "Trace a two-stage pipeline"
      ],
      "lab": "nba",
      "sections": [
        [
          "Specify when a register updates",
          "always @(posedge clk) responds to a rising clock edge. Register updates normally use nonblocking assignment (<=). The right-hand expression is evaluated when the statement executes; the left-hand update is scheduled in the nonblocking assignment region. This does not mean procedural statement order disappears."
        ],
        [
          "Follow the one-cycle separation",
          "a <= d; b <= a; makes a sample current d and b sample the earlier a. If a=0 and d=1 before the edge, the updated values are a=1 and b=0. On the following edge, b can capture the 1 previously stored in a."
        ],
        [
          "Why not simply use equals signs?",
          "Within one process, a=d; b=a; lets the second statement read the already updated a. That differs from the two-register pipeline above. The introductory convention is blocking assignments for combinational logic and nonblocking assignments for clocked registers. Avoid driving the same register from multiple processes."
        ],
        [
          "The testbench must respect update timing",
          "A testbench reading Q immediately after @(posedge clk) may run before the nonblocking update. For our explicitly timed example, sample after a short delay. More advanced environments use clocking blocks and other scheduling mechanisms to define drive and sample timing."
        ]
      ],
      "code": {
        "name": "pipeline2.v",
        "lang": "verilog",
        "text": "module pipeline2(input wire clk, rst_n, d,\n                 output reg a, b);\n  always @(posedge clk) begin\n    if (!rst_n) begin\n      a <= 1'b0;\n      b <= 1'b0;\n    end else begin\n      a <= d;\n      b <= a;\n    end\n  end\nendmodule"
      },
      "trap": "Correct assignment syntax does not guarantee a correct design. Trace each register immediately before and after an edge.",
      "exercise": {
        "task": "Initially a=0 and b=0. D is 1, 0, and 1 at three successive edges. Write a and b after each edge.",
        "placeholder": "Edge 1: a=… b=…\nEdge 2: …\nEdge 3: …",
        "answer": "After edge 1: a=1,b=0. After edge 2: a=0,b=1. After edge 3: a=1,b=0. Each time, b receives the earlier a."
      },
      "quiz": {
        "q": "Before an edge, a=1, b=0, d=0. What follows a<=d; b<=a;?",
        "options": [
          "a=0, b=0",
          "a=1, b=1",
          "a=0, b=1"
        ],
        "correct": 2,
        "why": "a receives the current d value, zero. b receives the pre-update a value, one."
      },
      "sources": [
        "logic",
        "yosys"
      ]
    },
    {
      "id": "counter",
      "stage": 1,
      "title": "Reset, enable, and a parameterized counter",
      "minutes": 40,
      "intro": "The same design will be used in simulation and synthesis. First make its specification precise.",
      "goals": [
        "Write active-low synchronous reset",
        "Hold state with an enable",
        "Handle wraparound correctly"
      ],
      "lab": "counter",
      "sections": [
        [
          "Define control priority",
          "At every rising edge: clear the counter when rst_n=0; otherwise increment when en=1; otherwise hold. Reset has priority over enable. WIDTH is a positive integer parameter. Adding one to the all-ones state wraps the stored result to zero."
        ],
        [
          "A clocked register can intentionally hold",
          "In a clocked process, leaving the register unassigned when en=0 preserves its state. This is intentional flip-flop behavior, unlike an incomplete combinational assignment that can infer a latch. Writing count <= count is unnecessary for this hold behavior."
        ],
        [
          "Parameters are elaboration-time choices",
          "parameter WIDTH=8 allows a different width when the module is instantiated. It is not an input that can change the circuit width while the chip is running. Changing WIDTH also changes the interface, wrap boundary, and expected test values."
        ],
        [
          "Work out a short trace by hand",
          "Starting at zero after reset, enable two edges, pause for one edge, and enable another edge. The expected values are 1,2,2,3. Then test wraparound, reset during a pause, and reset asserted together with enable."
        ]
      ],
      "code": {
        "name": "counter.v: complete design",
        "lang": "verilog",
        "text": "module counter #(parameter WIDTH = 8) (\n  input wire clk,\n  input wire rst_n,\n  input wire en,\n  output reg [WIDTH-1:0] count\n);\n  always @(posedge clk) begin\n    if (!rst_n)\n      count <= {WIDTH{1'b0}};\n    else if (en)\n      count <= count + 1'b1;\n  end\nendmodule"
      },
      "trap": "rst_n is synchronous in this design. A low pulse entirely between active edges can go unsampled.",
      "exercise": {
        "task": "For WIDTH=3 and count=7, what happens on an edge with rst_n=1 and en=1? What takes priority when rst_n=0 and en=1 together?",
        "placeholder": "After wrap: …; when reset and enable overlap: …",
        "answer": "The three-bit counter wraps from 7 to 0. An active reset clears the register even when enable is asserted."
      },
      "quiz": {
        "q": "Which control values preserve the current counter value?",
        "options": [
          "rst_n=0, en=0",
          "rst_n=1, en=0",
          "rst_n=1, en=1"
        ],
        "correct": 1,
        "why": "With reset inactive and enable low, the register retains its current state."
      },
      "sources": [
        "yosys",
        "iverilog"
      ]
    },
    {
      "id": "fsm",
      "stage": 1,
      "title": "Describe control with a finite-state machine",
      "minutes": 40,
      "intro": "A state machine makes the current activity and the next transition explicit.",
      "goals": [
        "Specify states and transitions",
        "Separate current and next state",
        "Define outputs and recovery"
      ],
      "lab": "fsm",
      "sections": [
        [
          "Write transition rules before code",
          "The example has IDLE, RUN, and DONE states. IDLE goes to RUN on the next edge when start=1. RUN goes to DONE when finish=1. DONE returns to IDLE on the next edge. Reset selects IDLE. start is ignored while RUN is active."
        ],
        [
          "State register and next-state logic",
          "state stores the current state. A combinational process calculates next_state, initially defaulting to state and then applying transition rules. A rising edge copies next_state into state. Separating these roles helps distinguish memory from combinational calculation."
        ],
        [
          "What determines an output?",
          "busy depends only on the current state in this example, making it a Moore-style output. It is high after the state has entered RUN. An output that also depends directly on inputs is a Mealy-style relationship. Either is valid when its timing is specified clearly."
        ],
        [
          "What a default branch guarantees",
          "The default branch sends unlisted state encodings to IDLE in this RTL description. That is not a complete fault-tolerance claim: encoding, fault assumptions, and optimization matter in the implementation. This lesson covers basic control behavior."
        ]
      ],
      "code": {
        "name": "controller.v",
        "lang": "verilog",
        "text": "module controller(input wire clk, rst_n, start, finish,\n                  output wire busy, done);\n  localparam IDLE=2'd0, RUN=2'd1, DONE=2'd2;\n  reg [1:0] state, next_state;\n  always @(*) begin\n    next_state = state;\n    case (state)\n      IDLE: if (start)  next_state = RUN;\n      RUN:  if (finish) next_state = DONE;\n      DONE: next_state = IDLE;\n      default: next_state = IDLE;\n    endcase\n  end\n  always @(posedge clk) begin\n    if (!rst_n) state <= IDLE;\n    else state <= next_state;\n  end\n  assign busy = (state == RUN);\n  assign done = (state == DONE);\nendmodule"
      },
      "trap": "start and finish are assumed to be valid synchronous inputs. Physical buttons or signals from another clock domain require additional synchronization and, where relevant, debouncing.",
      "exercise": {
        "task": "Start in IDLE. At edge 1, start=1. At edge 2, finish=0. At edge 3, finish=1. At edge 4, inputs are inactive. Give state,busy,done after every edge.",
        "placeholder": "Edge 1: …\nEdge 2: …\nEdge 3: …\nEdge 4: …",
        "answer": "Edge 1: RUN,1,0. Edge 2: RUN,1,0. Edge 3: DONE,0,1. Edge 4: IDLE,0,0."
      },
      "quiz": {
        "q": "While in RUN, finish becomes 1 before the next edge. What is the current state?",
        "options": [
          "It immediately becomes DONE",
          "It remains RUN",
          "It immediately becomes IDLE"
        ],
        "correct": 1,
        "why": "Combinational next_state may change immediately, but the state register updates at the clock edge."
      },
      "sources": [
        "logic",
        "yosys"
      ]
    },
    {
      "id": "testbench",
      "stage": 2,
      "title": "Build a testbench",
      "minutes": 40,
      "intro": "The design does not create its own test inputs. A testbench supplies stimuli and checks responses.",
      "goals": [
        "Separate the DUT from its testbench",
        "Connect named ports",
        "Generate clocks and stimuli"
      ],
      "lab": "counter",
      "sections": [
        [
          "Two distinct responsibilities",
          "DUT means Design Under Test. The testbench instantiates it, drives inputs, computes expected values, checks outputs, and ends the simulation. A testbench usually has no external ports because it is the simulation top."
        ],
        [
          "Prefer named port connections",
          "counter #(.WIDTH(4)) dut(.clk(clk), ...) creates a four-bit instance. Named connections make accidental positional swaps less likely. The testbench drives en and rst_n with procedural variables and observes count through a wire."
        ],
        [
          "Simulation time is explicit",
          "The testbench uses `timescale 1ns/1ps: one time unit is 1 ns and the precision is 1 ps. always #5 clk=~clk toggles every 5 ns, giving a complete 10 ns clock period. initial, delays, $display, and $finish control the experiment."
        ],
        [
          "Keep design and test sources separate",
          "Store design sources under rtl/ and test sources under tb/. Synthesis receives only the synthesizable design. The test clock generator, stimulus timing, and $finish are not this ASIC's implementation. Some targets support limited initialization constructs, but this course does not depend on them."
        ]
      ],
      "code": {
        "name": "tb_counter.sv: basic testbench",
        "lang": "verilog",
        "text": "`timescale 1ns/1ps\nmodule tb_counter;\n  reg clk=0, rst_n=0, en=0;\n  wire [3:0] count;\n  counter #(.WIDTH(4)) dut(\n    .clk(clk), .rst_n(rst_n), .en(en), .count(count)\n  );\n  always #5 clk = ~clk;\n  initial begin\n    repeat (2) @(negedge clk);\n    rst_n=1; en=1;\n    repeat (5) @(negedge clk);\n    $display(\"count=%0d\", count);\n    $finish;\n  end\nendmodule"
      },
      "trap": "The testbench uses a .sv extension and an explicit SystemVerilog mode. Renaming a file alone does not guarantee that every simulator version supports every language feature.",
      "exercise": {
        "task": "With a 1ns/1ps timescale, what are the period and frequency of always #10 clk=~clk?",
        "placeholder": "Period: … ns; frequency: … MHz",
        "answer": "The clock toggles every 10 ns, so the period is 20 ns and the frequency is 50 MHz."
      },
      "quiz": {
        "q": "Which top module should be selected to generate simulation stimuli?",
        "options": [
          "The counter design",
          "An arbitrary standard cell",
          "The tb_counter testbench"
        ],
        "correct": 2,
        "why": "The testbench instantiates counter and drives clock, reset, and enable. The synthesis top is counter instead."
      },
      "sources": [
        "iverilog",
        "vcs"
      ]
    },
    {
      "id": "waveforms",
      "stage": 2,
      "title": "Read waveforms and avoid races",
      "minutes": 35,
      "intro": "Waveforms reveal event order, but one plausible trace is not a complete test.",
      "goals": [
        "Recognize 0, 1, X, and Z",
        "Inspect values around edges",
        "Avoid drive and sample races"
      ],
      "lab": "counter",
      "sections": [
        [
          "Simulation has four logic states",
          "X means unknown and Z means high impedance. Uninitialized variables and conflicting drivers can produce X. Z does not mean zero. Trace the source of an unexpected X instead of forcing it to zero merely to make the waveform look clean."
        ],
        [
          "Read the trace in causal order",
          "Inspect clk first, then rst_n and en, then count. Distinguish values before and after the edge. Synchronous reset acts at an edge; enable low holds the value; enable high increments it. Locate the first edge where the observation differs from the specification."
        ],
        [
          "Separate driving and sampling",
          "If a testbench changes an input with a blocking assignment on the same rising edge that the DUT samples it, behavior can depend on process scheduling. Our testbench drives at the falling edge and checks 1 ns after the rising edge, with an explicitly defined 10 ns period."
        ],
        [
          "Record and inspect real waveforms",
          "Use $dumpfile and $dumpvars to write a standard VCD file, then open it in GTKWave. Browser state traces come from the teaching model. Evidence about Verilog execution must come from the simulator's actual output."
        ]
      ],
      "code": {
        "name": "Waveform recording: testbench fragment",
        "lang": "verilog",
        "text": "initial begin\n  $dumpfile(\"counter.vcd\");\n  $dumpvars(0, tb_counter);\nend\n// View with：gtkwave counter.vcd"
      },
      "trap": "If an output can contain X or Z, an ordinary != comparison may not reliably fail an if check. The self-checking test uses !== so unknown values also trigger failure.",
      "exercise": {
        "task": "count is X from the beginning of the simulation. List three things you would inspect first.",
        "placeholder": "1. …\n2. …\n3. …",
        "answer": "Check whether the clock toggles, whether reset is connected and sampled at an active edge, and whether the DUT is correctly instantiated without undriven or multiply driven signals. Also confirm the top module and signal path."
      },
      "quiz": {
        "q": "Which scheduling convention is used by this counter testbench?",
        "options": [
          "Drive at falling edges and check shortly after rising edges",
          "Drive and sample everything immediately at the same rising edge",
          "Inspect only one number at the end"
        ],
        "correct": 0,
        "why": "Separating drive and sample events avoids the illustrated race and allows nonblocking updates to settle before checking."
      },
      "sources": [
        "wave",
        "iverilog"
      ]
    },
    {
      "id": "selfcheck",
      "stage": 2,
      "title": "Self-checking tests and boundary coverage",
      "minutes": 40,
      "intro": "Make the test report the first incorrect cycle instead of relying only on visual inspection.",
      "goals": [
        "Build an independent reference",
        "Compare and fail automatically",
        "Cover reset, hold, and wrap"
      ],
      "lab": "counter",
      "sections": [
        [
          "Start with a test plan",
          "Break the specification into startup reset, enabled counting, disabled hold, all-ones wraparound, reset during operation, and reset priority over enable. Each requirement needs a corresponding stimulus sequence and a concrete expected outcome."
        ],
        [
          "Derive expected behavior from the specification",
          "The testbench tracks an integer expected value and constrains it to the range 0 through 2^WIDTH-1. A !== comparison also fails on X or Z. Useful messages include time, expected and actual values, and control inputs."
        ],
        [
          "Check after the correct event",
          "The example fragment drives controls at a falling edge and computes the expected value for the next rising edge. It then waits for that edge and delays 1 ns before comparing. This delay belongs in the testbench, not the RTL. Download the complete project for the runnable task."
        ],
        [
          "Know what a PASS establishes",
          "PASS means the checks executed in that run found no mismatch. Untested input sequences may still expose defects. Begin with understandable directed tests, then learn randomized stimulus, coverage, assertions, and formal methods as separate extensions."
        ]
      ],
      "code": {
        "name": "Core per-cycle self-check fragment",
        "lang": "verilog",
        "text": "@(negedge clk);\nrst_n = r; en = e;\nif (!r) expected = 0;\nelse if (e) expected = (expected + 1) % 16;\n@(posedge clk);\n#1;\nif (count !== expected[3:0])\n  $fatal(1, \"t=%0t expected=%0d actual=%0d\",\n         $time, expected, count);"
      },
      "trap": "Copying the DUT's flawed algorithm into the reference model can make both agree on the same mistake. Include hand-checked vectors and derive the reference from the specification.",
      "exercise": {
        "task": "Your only test currently counts for five cycles after reset. Propose three additional sequences and state which defects each targets.",
        "placeholder": "Stimulus: …; expected behavior: …",
        "answer": "Pause for several cycles to check hold; run past the maximum value to check wraparound; assert reset while enable is high to check clearing and priority during operation."
      },
      "quiz": {
        "q": "What does a test printing PASS directly establish?",
        "options": [
          "Every possible input sequence is correct",
          "The checks actually executed found no mismatch",
          "The physical chip necessarily meets timing"
        ],
        "correct": 1,
        "why": "Untested cases remain unverified, and RTL functional tests do not establish physical timing closure."
      },
      "sources": [
        "iverilog",
        "vcs"
      ]
    },
    {
      "id": "local-tools",
      "stage": 2,
      "title": "Run a real simulation locally",
      "minutes": 45,
      "intro": "Establish a repeatable open-source simulation before moving the same design to VCS.",
      "goals": [
        "Separate compilation and execution",
        "Generate a real VCD file",
        "Check your tool installation"
      ],
      "lab": null,
      "sections": [
        [
          "Three tool roles",
          "An editor creates source files. Icarus Verilog compiles and simulates the HDL. GTKWave displays the waveform file. Use an editor you already know and select a supported installation method from the official tool documentation. Different operating systems need not use identical installation steps."
        ],
        [
          "Confirm commands are available",
          "Run iverilog -V, vvp -V, and gtkwave --version to inspect the installed tools. A missing command points to installation or PATH setup. Changing the counter RTL will not repair that environment problem. On a university server, use the provided installation."
        ],
        [
          "Compile, then execute",
          "Run the commands from the project root. -g2012 selects a SystemVerilog mode, -s chooses the testbench top, and -o names the compiler output. Only run vvp after compilation succeeds. Execution then advances simulation time, performs checks, and generates counter.vcd."
        ],
        [
          "What you can learn without a commercial license",
          "Basic RTL and the included tests can be exercised with Icarus. Its SystemVerilog support differs from VCS, so advanced verification features require a separate compatibility check. The reference project intentionally uses basic constructs."
        ]
      ],
      "code": {
        "name": "Commands from the project root",
        "lang": "bash",
        "text": "iverilog -g2012 -s tb_counter -o simv_iverilog \\\n  rtl/counter.v tb/tb_counter.sv\nvvp simv_iverilog\ngtkwave counter.vcd"
      },
      "trap": "Do not run an old simulation executable after a failed compile. That would test earlier source instead of the current design.",
      "exercise": {
        "task": "Run the downloadable project. Record the installed version, exact command, and final result. If tools are not installed yet, record the remaining setup steps.",
        "placeholder": "Tool version: …\nCommand: …\nObserved result: …",
        "answer": "Evidence should include successful compilation, an actual simulator run, the self-check result, and a VCD file that opens. If you have not run it, record that honestly; the browser model is not a substitute."
      },
      "quiz": {
        "q": "What should happen after iverilog reports a compilation error?",
        "options": [
          "Run the previous executable anyway",
          "Remove all testbench checks",
          "Fix the error and compile successfully"
        ],
        "correct": 2,
        "why": "An old executable may still exist. Running it does not verify the current source."
      },
      "sources": [
        "install",
        "iverilog",
        "wave"
      ],
      "download": true
    },
    {
      "id": "linux-vcs",
      "stage": 3,
      "title": "University tools and Linux basics",
      "minutes": 40,
      "intro": "Using VCS requires a working installation and a license provided by your institution or organization.",
      "goals": [
        "Locate files and working directories",
        "Recognize environment problems",
        "Use your own project directory"
      ],
      "lab": null,
      "sections": [
        [
          "Use the access method your course provides",
          "Follow the supplied workstation, remote desktop, or SSH instructions. The host, account, VPN requirements, and initialization commands come from your institution. The website does not connect to the server and does not ask for passwords or license files."
        ],
        [
          "Working directories affect commands",
          "pwd prints the current directory, ls lists files, cd changes directory, and mkdir -p creates directories. Relative paths are resolved from the working directory. Start in the project root before using the supplied scripts."
        ],
        [
          "Installed does not always mean available in this shell",
          "command -v vcs checks command lookup; vcs -help shows the installed version's options. If the command is missing, follow your course's module-loading or environment-script instructions. For a license checkout failure, preserve the relevant error and contact the course administrator."
        ],
        [
          "Keep a minimal reproduction record",
          "Record the version, working directory, complete command, and first meaningful error. Share only necessary diagnostic text, without account secrets or internal license details. A copied error message is usually easier to investigate than a cropped screenshot."
        ]
      ],
      "code": {
        "name": "University terminal: environment checks",
        "lang": "bash",
        "text": "pwd\nls\nmkdir -p work\ncommand -v vcs\nvcs -help\n# Use the environment initialization specified by your course"
      },
      "trap": "The VCS and DC commands are teaching templates. Installed versions, paths, licenses, and local lab conventions take precedence.",
      "exercise": {
        "task": "Record the actual project directory, whether VCS is available, and the environment initialization method supplied by your course. Mark unavailable access as pending.",
        "placeholder": "Project directory: …\nVCS availability: …\nInitialization method: … (no passwords)",
        "answer": "This requires checking the real environment. Locating the command and opening its help are preparation steps; an actual compile and simulation are still required."
      },
      "quiz": {
        "q": "A license checkout failed error first suggests a problem with what?",
        "options": [
          "Adder width in the RTL",
          "License or environment configuration",
          "Counter enable behavior"
        ],
        "correct": 1,
        "why": "This error concerns obtaining a tool license. Follow the institution's setup and support process first."
      },
      "sources": [
        "vcs"
      ]
    },
    {
      "id": "vcs-run",
      "stage": 3,
      "title": "VCS compilation, execution, and file lists",
      "minutes": 45,
      "intro": "Keep the same design and checks when changing simulators so that the comparison is meaningful.",
      "goals": [
        "Create a file list",
        "Choose the simulation top",
        "Separate compile and run logs"
      ],
      "lab": null,
      "sections": [
        [
          "Make the working directory explicit",
          "The supplied run_vcs.sh script starts from its project root and writes results under work/vcs. The ../../rtl paths in filelist.f are relative to that working directory. Manual commands must preserve this relationship."
        ],
        [
          "Read common compiler options",
          "-full64 selects the 64-bit tool mode; -sverilog enables SystemVerilog parsing; -f reads a file list; -top selects the testbench top; -o names the generated program; -l writes the compilation log. Verify supported options with the installed vcs -help."
        ],
        [
          "Execute simv after compilation succeeds",
          "The generated simv is a simulation program. Running ./simv -l sim.log executes stimuli and checks. compile.log records compilation; sim.log records execution. Distinguish errors by stage before changing the design."
        ],
        [
          "Reuse waveform recording and checks",
          "The reference testbench records standard VCD. Open that output in GTKWave or the viewer configured by your course. FSDB or Verdi integration requires the installation's recording and debug setup; do not add arbitrary plugin flags from another environment."
        ]
      ],
      "code": {
        "name": "Run inside work/vcs",
        "lang": "bash",
        "text": "vcs -full64 -sverilog -top tb_counter \\\n  -f ../../filelist.f -o simv -l compile.log\n./simv -l sim.log\n# filelist.f contents：\n# ../../rtl/counter.v\n# ../../tb/tb_counter.sv"
      },
      "trap": "The counter animation is not evidence of a VCS run. Keep the current source, compile log, self-check output, and real waveform.",
      "exercise": {
        "task": "Run the same counter and testbench in VCS. Record compilation, the self-check result, and the waveform path, then compare with Icarus.",
        "placeholder": "Compilation: …\nSelf-check: …\nWaveform: …\nComparison: …",
        "answer": "For the same design, stimulus, and assumptions, the check outcomes should agree. Investigate source selection, language modes, timescale, top modules, and scheduling races before attributing a difference to a simulator defect."
      },
      "quiz": {
        "q": "Does successful VCS compilation mean all testbench checks have executed?",
        "options": [
          "Yes, compilation advances every clock",
          "No, the generated simulation program must run",
          "Any generated log means the test is complete"
        ],
        "correct": 1,
        "why": "Compilation builds the program. Running simv executes its stimuli and checks."
      },
      "sources": [
        "vcs"
      ],
      "download": true
    },
    {
      "id": "debug",
      "stage": 3,
      "title": "Debug the first failure and keep regressions",
      "minutes": 40,
      "intro": "Independently diagnosing one failure is more valuable than memorizing many command-line switches.",
      "goals": [
        "Identify the failing stage",
        "Reduce to a minimal reproduction",
        "Preserve failure in scripts"
      ],
      "lab": null,
      "sections": [
        [
          "Classify the failure first",
          "Missing commands and license failures belong to environment setup. Syntax, port, and undefined-module errors usually arise during compilation or elaboration. Mismatches, unknown values, and timeouts happen during simulation. Address the first meaningful error; later messages may be consequences."
        ],
        [
          "Trace backward from the first mismatch",
          "If count first diverges at cycle 18, inspect reset and enable before that edge and verify both widths and expected values. Reduce the stimulus to a short reproducing sequence. Keep the failing case, repair the design, and run both old and new cases afterward."
        ],
        [
          "Make scripts stop on failure",
          "The Bash setting set -euo pipefail exposes common command failures and unset variables. Use $fatal for failed checks and a timeout watchdog for a stuck test. Confirm exit behavior in the actual tool version, and require the expected PASS marker as an additional check."
        ],
        [
          "Test the testbench",
          "In a disposable copy, deliberately change increment-by-one to increment-by-two. The self-check should reject this defect. Restore the correct design afterward. If that obvious mutation still passes, investigate stimulus, connectivity, and the checker before trusting it."
        ]
      ],
      "code": {
        "name": "run_vcs.sh: flow outline",
        "lang": "bash",
        "text": "#!/usr/bin/env bash\nset -euo pipefail\n# First enter the working directory specified by the script\nvcs -full64 -sverilog -top tb_counter \\\n  -f ../../filelist.f -o simv -l compile.log\n./simv -l sim.log"
      },
      "trap": "Recompile after every RTL or testbench change. Re-running an old simv only tests the old compiled source.",
      "exercise": {
        "task": "A modified design still prints the same PASS result and appears unchanged. List three checks you would perform.",
        "placeholder": "1. …\n2. …\n3. …",
        "answer": "Verify a new compile succeeded, that filelist points to the modified files, and that the chosen testbench actually drives and observes the intended DUT. Inject a known defect into a copy to confirm that the checker rejects it."
      },
      "quiz": {
        "q": "Why should a failing test be retained after a bug is fixed?",
        "options": [
          "To increase the number of files",
          "To detect reintroduction of the same defect",
          "Because VCS requires multiple test files"
        ],
        "correct": 1,
        "why": "The retained case becomes a regression test that guards against later changes breaking the behavior again."
      },
      "sources": [
        "vcs",
        "iverilog"
      ]
    },
    {
      "id": "synthesis",
      "stage": 4,
      "title": "What logic synthesis actually does",
      "minutes": 35,
      "intro": "DC transforms synthesizable RTL into circuit connectivity using a target cell library and constraints.",
      "goals": [
        "Separate simulation and synthesis",
        "Understand a mapped netlist",
        "Identify the flow boundary"
      ],
      "lab": null,
      "sections": [
        [
          "Inputs and outputs",
          "The main inputs are synthesizable RTL, a top module, target standard-cell libraries, and timing or other design constraints. Outputs include a mapped netlist, saved constraints, a design database, and reports. A netlist lists cells and their connections; it is not a completed routed chip layout."
        ],
        [
          "Behavior must become hardware",
          "An addition can map to combinational arithmetic logic. A rising-edge process can map to flip-flops and input selection logic. Constants and redundant or unreachable logic may be optimized away, so the implementation does not necessarily correspond one-to-one with source lines."
        ],
        [
          "Behavioral and implementation evidence differ",
          "RTL self-checking simulation tests selected behavior against the specification. Synthesis maps and optimizes an implementation. Successful synthesis alone does not prove functional correctness; a functional PASS does not prove that timing constraints are met. Preserve both kinds of evidence."
        ],
        [
          "Where this course stops",
          "This introduction stops at basic synthesis and interpreting reports. Full chip development also includes physical implementation, clock trees, routing, extraction, testability, and signoff. A basic synthesis report does not replace post-route timing analysis."
        ]
      ],
      "code": {
        "name": "Illustrative netlist structure: fictitious cells",
        "lang": "verilog",
        "text": "// Illustrates instance and connection structure only\n// Actual cell names, pins, and counts depend on the library and synthesis\nSOME_DFF u_reg (.CLK(clk), .D(next_q), .Q(q));\nSOME_MUX u_sel (.A(q), .B(add_q), .S(en), .Y(next_q));"
      },
      "trap": "The illustrative cell names are not real library models. Do not treat them as your institution's standard-cell interfaces.",
      "exercise": {
        "task": "List at least three synthesis input categories and three output categories. Explain why a simulation PASS screenshot is insufficient.",
        "placeholder": "Inputs: …\nOutputs: …\nWhy the screenshot is insufficient: …",
        "answer": "Inputs include RTL and top, target libraries, and constraints. Outputs include a mapped netlist, saved design/constraints, and structural/area/timing reports. A functional PASS does not identify the mapping target, establish valid constraints, or describe implementation quality."
      },
      "quiz": {
        "q": "What does a mapped gate-level netlist describe?",
        "options": [
          "A physically manufactured chip",
          "A fully routed and signed-off design",
          "Standard cells and their connections"
        ],
        "correct": 2,
        "why": "The netlist describes logical implementation. Physical implementation and signoff remain separate work."
      },
      "sources": [
        "dc",
        "yosys"
      ]
    },
    {
      "id": "libraries",
      "stage": 4,
      "title": "Cell libraries, linking, and the top module",
      "minutes": 40,
      "intro": "Synthesis needs to know which cells are available and how their models describe area and timing.",
      "goals": [
        "Understand target_library",
        "Understand link_library",
        "Find unresolved references"
      ],
      "lab": null,
      "sections": [
        [
          "What the cell library supplies",
          "A standard-cell library describes gates, flip-flops, and related functional, timing, area, and electrical properties. Process, voltage, temperature, and library corner affect results. Use the authorized .db library supplied for your digital lab, not an unrelated analog device model."
        ],
        [
          "Target and link libraries serve different roles",
          "target_library identifies cells available for mapping. link_library helps resolve referenced modules, macros, and cells. A simple teaching setup adds the target library and the * search entry for loaded designs. Macro or multi-library flows require the course's actual configuration."
        ],
        [
          "The top defines the design boundary",
          "elaborate counter expands the design; current_design counter selects it; link resolves references; check_design inspects structure. Do not synthesize tb_counter. The reference synthesis uses default WIDTH=8, while simulation uses WIDTH=4 to reach wraparound sooner. Record that difference explicitly."
        ],
        [
          "Resolve missing references before continuing",
          "For an unresolved reference or missing library, check paths, file versions, loaded sources, and module names. Do not casually turn missing modules into black boxes merely to continue compilation. Black-box treatment requires an explicit flow and appropriate models."
        ]
      ],
      "code": {
        "name": "DC / Tcl: teaching setup",
        "lang": "tcl",
        "text": "set_app_var target_library [list $env(STDCELL_DB)]\nset_app_var link_library [concat [list *] $target_library]\nanalyze -format verilog ../../rtl/counter.v\nelaborate counter\ncurrent_design counter\nlink\ncheck_design"
      },
      "trap": "STDCELL_DB must refer to an authorized real .db file. The website and archive do not distribute commercial tools, PDKs, or standard-cell libraries.",
      "exercise": {
        "task": "Record the permitted library/corner information, design top, width, and unresolved check_design warnings from your actual lab environment.",
        "placeholder": "Library/corner: …\nTop/width: …\nWarnings: …",
        "answer": "This is an environment-specific record. It must match the current RTL and configuration. If you lack DC or the library, mark the practical task as pending."
      },
      "quiz": {
        "q": "Which module should DC elaborate for this counter project?",
        "options": [
          "tb_counter",
          "counter",
          "GTKWave"
        ],
        "correct": 1,
        "why": "counter is the synthesizable design. tb_counter contains stimulus and checks for simulation."
      },
      "sources": [
        "dc"
      ]
    },
    {
      "id": "constraints",
      "stage": 4,
      "title": "Clock constraints and interface budgets",
      "minutes": 45,
      "intro": "A synthesis tool needs an explicit timing target. Incorrect constraints can make an impressive report meaningless.",
      "goals": [
        "Define a clock period",
        "Distinguish maximum and minimum delays",
        "Use timing exceptions deliberately"
      ],
      "lab": "timing",
      "sections": [
        [
          "Give the clock a period",
          "If the library time unit is ns, create_clock -period 10 describes a 10 ns period, or 100 MHz. Confirm units with report_units. A clock constraint defines the analysis target; it does not create an oscillator or guarantee that the implementation can meet the target."
        ],
        [
          "Budget time outside the module",
          "set_input_delay describes external data arrival relative to a reference clock. set_output_delay reserves time for the external output path. Maximum and minimum values participate in different timing checks; defining only a maximum can leave important assumptions unspecified."
        ],
        [
          "Constraint values need a reason",
          "The template assumes a 10 ns period, maximum/minimum input and output delays of 1.0/0.2 ns, 0.1 ns clock uncertainty, and illustrative transition/load values. These are teaching assumptions, not measurements of your board or interface. Confirm the units and adjust every value to the actual lab specification."
        ],
        [
          "Do not hide a failure with an exception",
          "false_path and multicycle change what is checked and how. Adding an exception solely to eliminate negative slack changes the analysis instead of speeding up the circuit. Use exceptions only with justified timing intent and supporting verification. The project's synchronous reset is constrained as a synchronous input."
        ]
      ],
      "code": {
        "name": "constraints.sdc: confirm library units",
        "lang": "tcl",
        "text": "create_clock -name core_clk -period 10 [get_ports clk]\nset_clock_uncertainty 0.1 [get_clocks core_clk]\nset_input_delay -max 1.0 -clock core_clk [get_ports {en rst_n}]\nset_input_delay -min 0.2 -clock core_clk [get_ports {en rst_n}]\nset_output_delay -max 1.0 -clock core_clk [all_outputs]\nset_output_delay -min 0.2 -clock core_clk [all_outputs]\nset_input_transition 0.1 [get_ports {en rst_n}]\nset_clock_transition 0.1 [get_clocks core_clk]\nset_load 0.01 [all_outputs]"
      },
      "trap": "The interactive timing budget is a simplified setup example, not an STA engine. It omits detailed clock skew, cell arcs, parasitics, and exceptions.",
      "exercise": {
        "task": "Assuming ns units, what period targets 200 MHz? Why should a failing path not simply be marked false_path?",
        "placeholder": "Period: …; why exclusion is not a repair: …",
        "answer": "200 MHz corresponds to 5 ns. A false path removes an analysis requirement; it does not make the physical path faster. A justified timing relationship must support any exception."
      },
      "quiz": {
        "q": "Changing a clock period from 10 ns to 5 ns usually makes the setup target what?",
        "options": [
          "More relaxed",
          "More demanding",
          "Automatically satisfied"
        ],
        "correct": 1,
        "why": "Less time remains for propagation. The target frequency doubles from 100 MHz to 200 MHz."
      },
      "sources": [
        "dc"
      ]
    },
    {
      "id": "dc-run",
      "stage": 4,
      "title": "Run DC and interpret its reports",
      "minutes": 50,
      "intro": "After synthesis, inspect structural checks and constraint coverage before judging area or timing.",
      "goals": [
        "Follow a basic Tcl flow",
        "Interpret area and slack",
        "Preserve reproducible outputs"
      ],
      "lab": "timing",
      "sections": [
        [
          "The basic script sequence",
          "Read libraries and RTL, elaborate the top, link, and check the design. Apply SDC, inspect timing setup, compile, generate reports, and save the mapped netlist and constraints. The archive supplies a teaching template; consult help/man in the installed DC version for supported commands and options."
        ],
        [
          "Check assumptions before comparing numbers",
          "Investigate unresolved references, unintended latches, multiple drivers, missing clocks, unconstrained paths, and unexpectedly optimized-away logic. Read check_design and check_timing output. A zero process exit code does not make every warning harmless."
        ],
        [
          "Read setup slack correctly",
          "For a setup path, slack is data required time minus data arrival time. Negative slack means data arrives too late under the current model and constraints. Positive slack provides margin for that analysis. Hold checks use a different timing relationship; do not apply the setup formula indiscriminately."
        ],
        [
          "Area and timing are conditional results",
          "report_area uses the selected library's area model. It is not automatically the full chip area or a transistor count. Basic synthesis estimates differ from post-route results. Compare implementations only with consistent libraries, corners, parameters, and constraints."
        ]
      ],
      "code": {
        "name": "DC: compile and save outputs",
        "lang": "tcl",
        "text": "source ../../dc/constraints.sdc\ncheck_timing\ncompile\nreport_area > reports/area.rpt\nreport_timing -delay_type max > reports/setup.rpt\nreport_timing -delay_type min > reports/hold.rpt\nreport_constraint -all_violators > reports/violations.rpt\nwrite -format verilog -hierarchy -output netlist/counter_mapped.v\nwrite_sdc netlist/counter.sdc"
      },
      "trap": "Without an actual DC run and target library, do not claim synthesis passed or invent area/timing results. The website provides illustrative calculations and practical tasks for you to complete.",
      "exercise": {
        "task": "A setup path has required time 9.4 ns and arrival time 10.1 ns. Calculate and explain slack. Then record one path from your own DC report, or mark it pending.",
        "placeholder": "Example slack: …; interpretation: …\nActual report or pending task: …",
        "answer": "Slack is 9.4 - 10.1 = -0.7 ns, so data arrives 0.7 ns too late for that check. Your actual result must come from the specific RTL, library, and constraints used in your run."
      },
      "quiz": {
        "q": "For setup required time 8 ns and arrival time 9 ns, what is slack?",
        "options": [
          "+1 ns, met",
          "-1 ns, violated",
          "17 ns, met"
        ],
        "correct": 1,
        "why": "Setup slack is required minus arrival: 8 - 9 = -1 ns, a violation under the current analysis assumptions."
      },
      "sources": [
        "dc"
      ],
      "download": true
    },
    {
      "id": "post-synthesis",
      "stage": 4,
      "title": "Checks after synthesis and fair comparisons",
      "minutes": 40,
      "intro": "Generating a netlist is a milestone. Function, constraint coverage, and comparison conditions still need review.",
      "goals": [
        "Distinguish RTL and gate-level simulation",
        "Explain equivalence checking",
        "Compare synthesis runs fairly"
      ],
      "lab": null,
      "sections": [
        [
          "Gate-level simulation needs matching cell models",
          "A simulator needs Verilog models for the standard cells referenced by the netlist. The .db file used by DC is not a direct replacement for those simulation models. Obtain authorized matching models from your course. If unavailable, keep gate-level simulation marked as pending."
        ],
        [
          "Zero-delay and annotated simulation differ",
          "A gate-level simulation without delay annotation can check logical connectivity and certain initialization behavior. SDF timing annotation changes event timing and checks; it requires appropriate data and a review of annotation coverage. The RTL testbench's #1 sampling convention is not universally valid for annotated gate-level timing."
        ],
        [
          "Formal equivalence is another source of evidence",
          "Equivalence tools compare RTL and netlist behavior under explicit assumptions and correspondence rules, rather than only exercising selected stimulus sequences. A simulation PASS and a completed synthesis do not replace this analysis. This website does not run a commercial equivalence tool."
        ],
        [
          "Compare versions under the same conditions",
          "After changing coding style, first preserve the functional specification. Then compare with the same tool version, library, corner, parameters, clock and interface budgets, and optimization settings. Smaller area with failed timing, or with missing constraints, is not an unconditional improvement."
        ]
      ],
      "trap": "This lesson introduces the boundary of later checks. The introductory project is not a complete signoff flow; record which analyses have not been executed.",
      "exercise": {
        "task": "Version A has smaller area but uses a different library and clock period. Can you conclude that its RTL is better? List the conditions that need to match.",
        "placeholder": "Conclusion: …\nConditions to align: …",
        "answer": "No. Align specification, width parameters, tool version, library/corner, clock and interface constraints, and relevant optimization settings. Check function and timing alongside area."
      },
      "quiz": {
        "q": "A simulator cannot resolve the standard cells in a mapped netlist. What is needed?",
        "options": [
          "Corresponding standard-cell Verilog simulation models",
          "An arbitrary PCB schematic",
          "Removal of every cell instance"
        ],
        "correct": 0,
        "why": "The simulator needs functional cell models. A synthesis .db library cannot directly substitute for Verilog simulation models."
      },
      "sources": [
        "dc",
        "vcs"
      ]
    },
    {
      "id": "project",
      "stage": 5,
      "title": "Complete the counter project independently",
      "minutes": 60,
      "intro": "Implement the specification yourself, then use the reference files to compare and produce a repeatable result.",
      "goals": [
        "Deliver RTL and self-checks",
        "Run the same specification across tools",
        "Document a synthesis run"
      ],
      "lab": "counter",
      "sections": [
        [
          "Project specification",
          "Create a parameterized unsigned counter named counter, default WIDTH=8, with inputs clk, rst_n, en and output count. Use rising-edge operation and active-low synchronous reset. Reset has priority. Increment when enabled, hold otherwise, and wrap from all ones to zero. WIDTH must be positive."
        ],
        [
          "Attempt it before opening the reference",
          "Write RTL and a test plan from the specification. Work out a pause/reset/wrap trace by hand before running checks. The reference test uses a four-bit instance to reach wraparound quickly; the synthesis top uses the default eight-bit configuration."
        ],
        [
          "What the reference archive contains",
          "rtl/counter.v holds the reference design. tb/tb_counter.sv contains the self-checking test. Separate scripts run Icarus and VCS. The dc directory includes a checked library-path entry point, explicit teaching constraints, and a basic synthesis template. README states prerequisites, working directories, outputs, and validation limits."
        ],
        [
          "Continue productively without a university environment",
          "Complete the open-source simulation work first and save actual evidence. Leave VCS and DC tasks pending until access is available. Yosys can provide additional practice with generic synthesis, but it does not replace required DC evidence or establish equivalent results under a commercial library."
        ]
      ],
      "code": {
        "name": "Run from the extracted project root",
        "lang": "bash",
        "text": "bash run_iverilog.sh\n# In your licensed VCS environment：\nbash run_vcs.sh\n# For DC, first configure the actual library and units as described in README：\nbash run_dc.sh"
      },
      "trap": "You should be able to explain each register, test category, and important constraint. Running a script alone is not the learning objective.",
      "exercise": {
        "task": "Write at least six tests for this project. Give actual stimuli and expected behavior for each rather than headings such as “test reset.”",
        "placeholder": "1. Stimulus: …; expected behavior: …\n2. …",
        "answer": "Cover startup clearing, enabled counting, disabled hold, wraparound, synchronous reset during operation, and reset priority. State when signals change and when values are checked. Also verify that an intentionally broken implementation is rejected."
      },
      "quiz": {
        "q": "Why can a four-bit test instance and an eight-bit default synthesis instance be reasonable?",
        "options": [
          "Width does not affect behavior",
          "The smaller test reaches wraparound faster, with each parameter choice explicitly recorded",
          "DC cannot handle four-bit counters"
        ],
        "correct": 1,
        "why": "Parameterized designs can use different widths, but their settings and boundary values must be recorded and relevant parameter configurations checked."
      },
      "sources": [
        "iverilog",
        "vcs",
        "dc"
      ],
      "download": true
    },
    {
      "id": "acceptance",
      "stage": 5,
      "title": "Acceptance: can you reproduce the flow?",
      "minutes": 40,
      "intro": "Use actual evidence to assess whether you can independently design, test, and synthesize a small module.",
      "goals": [
        "Separate reading from practical completion",
        "Organize verification evidence",
        "Choose a next learning direction"
      ],
      "lab": null,
      "sections": [
        [
          "Explain the design before showing outputs",
          "Without the reference, explain synchronous versus asynchronous reset, the key difference between = and <=, why incomplete combinational assignments may infer latches, and the different responsibilities of VCS and DC. Revisit any lesson you cannot explain clearly."
        ],
        [
          "Make the result reproducible",
          "Keep the specification, RTL, testbench, tool versions, run scripts, permitted library/constraint notes, logs, waveforms, netlist, and synthesis reports. Ask a peer to repeat the README steps in an equivalent authorized environment. Do not redistribute commercial libraries or license material."
        ],
        [
          "Identify what remains unverified",
          "This introductory project does not establish full-chip reliability. Equivalence checking, advanced coverage, clock-domain crossings, DFT, low power, physical implementation, and signoff remain later topics. Conclusions apply only to the recorded configurations and checks."
        ],
        [
          "Choose a next step after the small project",
          "For digital design, extend to FIFOs, UART control, handshake protocols, and systematic testing. For verification, study assertions, coverage, and verification methodology. For analog design, study MOS circuits and the relevant custom-design environment. Expand responsibilities after you can explain a small complete project."
        ]
      ],
      "trap": "Course progress is a record of study and self-assessment, not commercial-tool certification. Confirm the practical checklist only from your own real results.",
      "exercise": {
        "task": "Write a short project review: a real defect, how you found it, how you repaired it, the test you added, and remaining work.",
        "placeholder": "Defect: …\nDiagnosis: …\nRepair: …\nNew check: …\nRemaining work: …",
        "answer": "A useful review identifies specific source, input conditions, and observations. If no real run or defect investigation has happened, record that as pending rather than inventing an experience."
      },
      "quiz": {
        "q": "Which evidence best supports a claim of completed basic synthesis?",
        "options": [
          "The browser animation and a course-completion screenshot",
          "Actual RTL, library/constraint notes, DC logs, netlist, and structural/area/timing reports",
          "The absence of syntax errors alone"
        ],
        "correct": 1,
        "why": "Synthesis depends on the design, target library, and constraints. Logs, netlists, and reports make the claim inspectable and reproducible."
      },
      "sources": [
        "dc",
        "vcs"
      ],
      "download": true,
      "checklist": true
    }
  ]
};
