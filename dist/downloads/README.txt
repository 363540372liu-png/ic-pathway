IC Pathway: Counter Reference Lab
================================

1. Learning goal and specification

Build a parameterized unsigned counter named counter.
Default WIDTH=8; WIDTH must be a positive integer.
Inputs: clk, rst_n, en. Output: count[WIDTH-1:0].
Use the rising clock edge and active-low synchronous reset.
Reset takes priority. Count when enabled; otherwise hold.
The all-ones state wraps to zero on the next enabled edge.

The testbench uses WIDTH=4 to cover wraparound quickly.
The default synthesis top uses WIDTH=8. Record parameter choices explicitly.
This project ends at RTL verification and basic synthesis, not chip signoff.
Try your own implementation and test plan before consulting the reference.

2. Files and prerequisites

rtl/counter.v       Reference RTL
tb/tb_counter.sv    Self-checking test, 10 ns clock, 1ns/1ps timescale
run_iverilog.sh     Open-source simulation script
run_vcs.sh          Licensed VCS simulation template
filelist.f         Source paths relative to work/vcs
run_dc.sh          Licensed DC entry point
dc/run.tcl         Basic synthesis flow template
dc/constraints.sdc Explicit teaching assumptions
work/              Generated outputs, not source files
LICENSE            Included in the standalone archive

Scripts require Bash. Windows learners can use a suitable Linux/WSL or
university environment, or run the direct commands with installed tools.
No commercial software, license, PDK, or standard-cell library is bundled.

3. Icarus and GTKWave

Follow the official installation instructions for your operating system.
Check: iverilog -V, vvp -V, and optionally gtkwave --version.
From this lab directory:

  bash run_iverilog.sh
  gtkwave work/iverilog/counter.vcd

Inspect work/iverilog/compile.log, sim.log, and counter.vcd.
Alternatively, execute from this lab directory, only continuing after success:

  iverilog -g2012 -s tb_counter -o simv_iverilog rtl/counter.v tb/tb_counter.sv
  vvp simv_iverilog
  gtkwave counter.vcd

When working from the full repository root, use bash lab/run_iverilog.sh.

4. VCS

First enter your institution's licensed environment and load its prescribed
configuration. Check command -v vcs and vcs -help.
From this lab directory:

  bash run_vcs.sh

The script works under work/vcs and reads the root filelist.f.
Inspect compile.log, sim.log, and counter.vcd there.
Options must match your installed version. Follow the institution's setup
for FSDB/Verdi if required; this reference records standard VCD.

5. Test behavior and expected output

The test covers startup reset, enabled counting, hold, multiple wraparounds,
reset during operation, reset priority, holding after reset release,
synchronous behavior before an edge, and mixed enable patterns.
It rejects X/Z mismatches and includes a timeout watchdog.
For the default WIDTH=4 test, the planned expected output is:

  PASS: counter WIDTH=4 checks=64

This line describes the expectation; it is not a supplied observation log.
Run the test yourself. In a disposable copy, change increment-by-one to
increment-by-two and confirm failure. Restore the correct design afterward.

6. Design Compiler

Obtain an authorized actual .db library. Set an absolute path, replacing
the placeholder below:

  export STDCELL_DB='/absolute/path/to/your/authorized/library.db'

Confirm time and capacitance units with the library documentation or
report_units in DC. Review and adjust dc/constraints.sdc before use:
clock period 10 (assuming ns); uncertainty 0.1; input max/min 1.0/0.2;
output max/min 1.0/0.2; input/clock transition 0.1; output load 0.01
in the library's capacitance unit.

These are illustrative budgets, not measured board or signoff conditions.
rst_n is synchronous and is constrained as an input; no arbitrary false
paths are added. After confirming the units and assumptions:

  export DC_UNITS_CONFIRMED=1
  bash run_dc.sh

Inspect work/dc/dc.log, reports/, and netlist/.
Read units, structural checks, timing setup, area, setup/hold, and violations.
Generated files alone do not establish timing closure. The script checks
for fresh expected output files, not full correctness of every report.
Do not fill in example numbers as if they were actual area/timing results.

Gate-level simulation additionally requires matching authorized Verilog cell
models. A synthesis .db library is not a direct substitute for those models.
No commercial equivalence check, SDF run, or physical signoff is supplied.

7. Validation status

The English export has offline source, schema, model, resource, archive,
and script checks. The export environment lacks HDL simulators and licensed
commercial tools, so no actual Icarus/VCS/DC run is claimed here.
In the full repository, tests/hdl.py and GitHub CI are prepared for real
Icarus parameter and defect-rejection checks. Their presence is not a PASS.
Use your actual tool output for practical acceptance.

8. Primary references

Icarus: https://steveicarus.github.io/iverilog/usage/getting_started.html
Installation: https://steveicarus.github.io/iverilog/usage/installation.html
GTKWave: https://gtkwave.github.io/gtkwave/
VCS: https://www.synopsys.com/verification/simulation/vcs.html
DC: https://www.synopsys.com/implementation-and-signoff/rtl-synthesis-test/design-compiler.html

9. Submission record

Keep the specification, source revision, test plan, versions, commands,
actual logs and waveforms, permitted library/constraint notes, and reports.
State remaining checks honestly. Do not include credentials, license files,
or proprietary library/model files in a public submission.
