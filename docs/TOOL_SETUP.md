# Tool setup and evidence

## Website only

Run `python3 -m http.server 8000 --directory dist` from the repository root and open `http://localhost:8000`. The website needs a modern browser with JavaScript; Python is only a convenient local HTTP server. No npm install is needed.

## Open-source simulation

Install Icarus using its [official instructions](https://steveicarus.github.io/iverilog/usage/installation.html). Install GTKWave if you want to inspect VCD files. Confirm:

```bash
iverilog -V
vvp -V
gtkwave --version
```

From the repository root:

```bash
bash lab/run_iverilog.sh
gtkwave lab/work/iverilog/counter.vcd
python3 tests/hdl.py
```

The first command runs the reference test. The last command runs separate parameter and intentionally broken-design checks in temporary directories. It fails when Icarus is missing rather than reporting a skipped test as a pass.

The scripts require Bash. Windows learners may use a suitable Linux/WSL or university environment, or the direct Icarus commands in `lab/README.txt` with their installed tools.

## VCS

Use the account, connection method, license, and initialization instructions supplied by your institution. The website does not provide access.

```bash
command -v vcs
vcs -help
bash lab/run_vcs.sh
```

The script works under `lab/work/vcs`, reads the same RTL/testbench via `filelist.f`, compiles, and then executes the resulting program. Keep `compile.log`, `sim.log`, and `counter.vcd`. Check options against your installed version. A missing executable or license is an environment problem; a mismatch is a different diagnostic stage.

The reference uses standard VCD. Use your institution's documented configuration for FSDB/Verdi rather than adding unrelated debug-plugin flags.

## Design Compiler

Obtain the authorized standard-cell `.db` library and inspect its timing and capacitance units. Configure `STDCELL_DB` with an actual absolute path:

```bash
export STDCELL_DB='/absolute/path/to/your/authorized/library.db'
```

The path is a placeholder; replace it. In DC, use the library documentation or `report_units` to confirm units before adopting the example constraints. Review `lab/dc/constraints.sdc`:

| Teaching assumption | Value to review |
| --- | --- |
| Clock period | 10 time units, assuming ns |
| Clock uncertainty | 0.1 time units |
| Input maximum/minimum delay | 1.0 / 0.2 time units |
| Output maximum/minimum delay | 1.0 / 0.2 time units |
| Input and clock transition | 0.1 time units |
| Output load | 0.01 library capacitance units |

These values are illustrative budgets, not measured board or signoff conditions. The reset is synchronous and constrained as data. After checking and adjusting the assumptions:

```bash
export DC_UNITS_CONFIRMED=1
bash lab/run_dc.sh
```

Inspect `lab/work/dc/dc.log`, the `reports/` directory, and `netlist/`. Review unresolved references, latches, unconstrained paths, setup/hold results, units, and significant warnings. File generation is not a timing PASS.

Gate-level simulation separately requires matching Verilog cell models. A `.db` synthesis library does not directly replace them. No commercial library, license, or proprietary model belongs in this public repository.

## Record actual evidence

Save the source revision, exact tool versions, working directory, commands, relevant configuration, and actual output. Mark unperformed stages as pending. Do not reuse a browser-model result or a predicted PASS line as a tool log.

## Primary references

- [Icarus getting started](https://steveicarus.github.io/iverilog/usage/getting_started.html)
- [GTKWave documentation](https://gtkwave.github.io/gtkwave/)
- [Synopsys VCS](https://www.synopsys.com/verification/simulation/vcs.html)
- [Synopsys Design Compiler](https://www.synopsys.com/implementation-and-signoff/rtl-synthesis-test/design-compiler.html)
