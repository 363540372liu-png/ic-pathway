# Curriculum

24 lessons in six stages. Suggested minutes are initial reading estimates, not completion guarantees. Each lesson also includes an independent exercise, reference answer, and knowledge check.

## 1. Digital logic foundations

Understand the circuit before describing it.

| Lesson | ID | Focus | Initial reading |
| --- | --- | --- | --- |
| 1. Start with 0 and 1 | `bits` | Understand bits and width; Read binary numbers; Explain finite-width results | 20 min |
| 2. Logic gates and truth tables | `gates` | Distinguish AND, OR, NOT, XOR; Enumerate input combinations; Translate a rule into logic | 25 min |
| 3. Multiplexers and adders | `mux` | Understand a two-input MUX; Recognize a datapath; Preserve an addition carry | 30 min |
| 4. Clocks, flip-flops, and state | `clock` | Distinguish levels and edges; Understand a D flip-flop; Recognize synchronous reset | 30 min |

## 2. Verilog RTL

Describe combinational logic and registers.

| Lesson | ID | Focus | Initial reading |
| --- | --- | --- | --- |
| 5. Write your first Verilog module | `module` | Read module declarations and ports; Use continuous assignments; Think in concurrent hardware | 30 min |
| 6. Vectors, width, and operators | `width` | Read bits and slices; Distinguish & from &&; Extend operands explicitly | 35 min |
| 7. Procedural combinational logic and latches | `combinational` | Use always @(*); Assign outputs on every path; Recognize unintended latches | 35 min |
| 8. Sequential logic and nonblocking assignment | `sequential` | Use posedge processes; Explain <= evaluation and update; Trace a two-stage pipeline | 35 min |
| 9. Reset, enable, and a parameterized counter | `counter` | Write active-low synchronous reset; Hold state with an enable; Handle wraparound correctly | 40 min |
| 10. Describe control with a finite-state machine | `fsm` | Specify states and transitions; Separate current and next state; Define outputs and recovery | 40 min |

## 3. Simulation and testing

Make defects observable and reproducible.

| Lesson | ID | Focus | Initial reading |
| --- | --- | --- | --- |
| 11. Build a testbench | `testbench` | Separate the DUT from its testbench; Connect named ports; Generate clocks and stimuli | 40 min |
| 12. Read waveforms and avoid races | `waveforms` | Recognize 0, 1, X, and Z; Inspect values around edges; Avoid drive and sample races | 35 min |
| 13. Self-checking tests and boundary coverage | `selfcheck` | Build an independent reference; Compare and fail automatically; Cover reset, hold, and wrap | 40 min |
| 14. Run a real simulation locally | `local-tools` | Separate compilation and execution; Generate a real VCD file; Check your tool installation | 45 min |

## 4. VCS practice

Run the same design in a licensed environment.

| Lesson | ID | Focus | Initial reading |
| --- | --- | --- | --- |
| 15. University tools and Linux basics | `linux-vcs` | Locate files and working directories; Recognize environment problems; Use your own project directory | 40 min |
| 16. VCS compilation, execution, and file lists | `vcs-run` | Create a file list; Choose the simulation top; Separate compile and run logs | 45 min |
| 17. Debug the first failure and keep regressions | `debug` | Identify the failing stage; Reduce to a minimal reproduction; Preserve failure in scripts | 40 min |

## 5. DC synthesis basics

Map RTL into a standard-cell implementation.

| Lesson | ID | Focus | Initial reading |
| --- | --- | --- | --- |
| 18. What logic synthesis actually does | `synthesis` | Separate simulation and synthesis; Understand a mapped netlist; Identify the flow boundary | 35 min |
| 19. Cell libraries, linking, and the top module | `libraries` | Understand target_library; Understand link_library; Find unresolved references | 40 min |
| 20. Clock constraints and interface budgets | `constraints` | Define a clock period; Distinguish maximum and minimum delays; Use timing exceptions deliberately | 45 min |
| 21. Run DC and interpret its reports | `dc-run` | Follow a basic Tcl flow; Interpret area and slack; Preserve reproducible outputs | 50 min |
| 22. Checks after synthesis and fair comparisons | `post-synthesis` | Distinguish RTL and gate-level simulation; Explain equivalence checking; Compare synthesis runs fairly | 40 min |

## 6. Project and acceptance

Deliver a small reproducible engineering result.

| Lesson | ID | Focus | Initial reading |
| --- | --- | --- | --- |
| 23. Complete the counter project independently | `project` | Deliver RTL and self-checks; Run the same specification across tools; Document a synthesis run | 60 min |
| 24. Acceptance: can you reproduce the flow? | `acceptance` | Separate reading from practical completion; Organize verification evidence; Choose a next learning direction | 40 min |

## Final evidence

Submit the specification, independently explained RTL, a test plan and self-checking testbench, actual simulator logs and VCD, permitted library/constraint notes, a mapped netlist, reviewed synthesis reports, and an honest list of remaining checks.
