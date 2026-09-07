# IC Pathway

**An open-source, English-language classroom for learning the digital IC front-end flow from first principles.**

IC Pathway connects digital logic, Verilog RTL, self-checking simulation, Synopsys VCS, and basic Design Compiler synthesis through one small counter project. It contains **24 lessons, eight interactive teaching models, practice prompts, knowledge checks, and downloadable reference sources**.

The goal is concrete: explain, implement, test, and perform basic synthesis of a small synchronous RTL block, then describe what the evidence does and does not establish.

## Who this is for

- Undergraduate students starting digital IC or EDA coursework.
- Students moving into electronics from another engineering discipline.
- FPGA learners who want to understand the ASIC front-end distinction.
- Self-directed beginners seeking a bridge between circuit concepts and tool commands.
- Instructors who want a small, inspectable course they can adapt for a lab.

No previous Verilog knowledge is assumed. Basic arithmetic and file editing are sufficient to begin. C programming, an FPGA board, and a commercial EDA license are not prerequisites for the browser lessons. Real VCS and DC exercises require an authorized installation; DC also requires a suitable standard-cell library.

## Learning logic

Learners repeatedly **predict a result, observe a model, explain the behavior, write RTL, and check it in a real tool**. Commands appear after the learner understands the object those commands manipulate.

| Stage | Lessons | Why it comes here | Evidence to produce |
| --- | --- | --- | --- |
| Digital logic foundations | 1–4 | Establish representation, selection, storage, and sampling before code | Hand-worked values, truth tables, and edge traces |
| Verilog RTL | 5–10 | Connect language constructs to concurrent logic and registers | Small modules and an explained counter/FSM |
| Simulation and testing | 11–14 | Define expected behavior before relying on tool output | A test plan, self-checking testbench, and real VCD |
| VCS practice | 15–17 | Transfer the same design and checks to a licensed simulator | Reproducible logs and a retained failing case |
| DC synthesis basics | 18–22 | Add libraries and constraints after function is understood | A netlist, explicit constraints, and reviewed reports |
| Project and acceptance | 23–24 | Assemble evidence and identify limitations | An independently reproducible small project |

The default synthesis design is an eight-bit parameterized counter. The reference test uses four bits to reach wraparound quickly. That parameter difference is explicit.

Read the [full curriculum](docs/CURRICULUM.md) and [learning design](docs/LEARNING_DESIGN.md).

## Interactive learning

| Teaching model | What to inspect |
| --- | --- |
| Four-bit number | Bit weights, unsigned values, and wraparound |
| Logic gates | AND, OR, XOR, and complete truth tables |
| MUX and adder | Selection and carry preservation |
| D flip-flop | Input changes versus edge-triggered sampling |
| Two-register pipeline | Sampling old state with nonblocking assignments |
| Counter | Reset priority, enable, hold, and wraparound |
| Three-state controller | Current state versus combinational next state |
| Setup-time budget | How a shorter clock period affects simplified slack |

These are deterministic JavaScript teaching models. **The website does not parse or execute Verilog, run VCS/DC, or perform static timing analysis.** The downloadable lab is the bridge to real tools.

Each lesson includes an open practice response, a reference answer, and a multiple-choice knowledge check. Open responses are self-reviewed; saving text is not compilation or correctness checking. Lesson progress and the final practical-evidence checklist are separate records.

## Run locally

Download or clone the repository. From its root, run:

```bash
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000`. No dependency installation or website build is required. Use HTTP rather than relying on a `file://` URL, whose storage behavior varies between browsers.

For development checks, use Node.js 20+ and Python 3.9+:

```bash
node tests/validate.mjs
python3 tools/package_lab.py --check
```

The optional npm scripts expose the same commands. There are no npm dependencies.

## Run the reference HDL lab

Install Icarus according to its [official guide](https://steveicarus.github.io/iverilog/usage/installation.html), then run:

```bash
bash lab/run_iverilog.sh
```

Results appear in `lab/work/iverilog/`. Open `counter.vcd` in GTKWave. In the appropriate licensed environments:

```bash
bash lab/run_vcs.sh
# Read lab/README.txt and configure the actual library and units first.
bash lab/run_dc.sh
```

Read [lab/README.txt](lab/README.txt) and [tool setup](docs/TOOL_SETUP.md). The standalone [lab archive](dist/downloads/ic-counter-lab.zip) contains the same canonical files.

## Validation status

Dependency-free checks cover curriculum completeness, answer schemas, source/resource consistency, progress invariants, and model boundary cases. An additional runner compiles HDL parameter variants and verifies that deliberately broken designs are rejected:

```bash
python3 tests/hdl.py
```

It requires real `iverilog` and `vvp` executables and fails clearly when they are missing. GitHub CI is configured to install these tools and run the checks. **A configured workflow is not evidence of a successful run.**

The export environment did not contain an HDL simulator or commercial EDA tools. Actual HDL simulation, VCS/DC execution, and browser testing remain pending. See [the validation record](docs/VALIDATION.md) for completed checks and remaining limits.

## Architecture and data

The browser loads plain HTML, CSS, and JavaScript. Lessons are declarative data in `dist/curriculum.js`; application behavior lives in `dist/app.js`; teaching rules are in `dist/models.js`; progress validation is in `dist/progress.js`.

There is no application backend, account system, cloud progress database, analytics integration, or school-server connection. Progress stays in browser storage and can be exported/imported as JSON. Hosting access logs are controlled by the chosen host.

See [architecture and data flow](docs/ARCHITECTURE.md) for the source map, routing, storage schema, and lab packaging.

## Publish and adapt

The site uses relative assets and hash-based lesson routes. It can run at a domain root or a GitHub Pages repository subpath. A manually triggered Pages workflow publishes only `dist/`. Read [publishing](docs/PUBLISHING.md) before enabling it.

Edit `dist/curriculum.js` to change lessons. Edit `lab/` to change the reference project, then regenerate its deterministic archive:

```bash
python3 tools/package_lab.py
node tests/validate.mjs
```

## Scope and next steps

This course introduces digital design, functional verification, and basic synthesis. It does not cover a complete tapeout, production verification methodology, physical implementation, signoff, or analog IC design. Later projects can add FIFOs, handshake protocols, a UART controller, assertions, and coverage.

## Contributing and license

Corrections to explanations, examples, and tests are welcome: see [CONTRIBUTING.md](CONTRIBUTING.md). The project was developed with AI assistance; technical changes should be checked against primary sources and executable evidence where available.

Original code and course content are provided under the [MIT License](LICENSE). External documentation, commercial tools, and vendor libraries retain their own terms. See [NOTICE.md](NOTICE.md).
