# v3.0.0 · 2026-09-16

## Architecture and compatibility

The existing vanilla JavaScript/hash-route classroom, Worker API, Sites ChatGPT identity and D1 JSON progress store remain in place. All 24 lesson IDs, curriculum/enrichment files and seven Ultra RTL assessments are unchanged. No database table migration or progress reset is required.

## Added learning routes

- Long-term route: 27 FPGA modules, vendor-neutral concepts and tool workflow. Includes UART/LED mini-project, pipeline, synchronous RAM/BRAM, FIFO, valid/ready, fixed point and CDC awareness. Existing Vivado steps remain an optional adapter.
- Competition route: 21 substantive modules from image basics, integer grayscale and Sobel to streaming, bit widths, line buffers, sliding windows, six guided RTL modules, verification, Efinity and team integration.
- Python Golden kit: reproducible synthetic image, reference/integer comparison, expected coordinate/pixel output and strict RTL comparator. No embedded Python runtime.
- Interactive Sobel arithmetic and sliding-window visualizations, explicitly distinguished from RTL simulation.
- Home and Learning Path summaries, project dashboard, A–K milestones, interface contract, project journal, 25-skill matrix and Ultra Image conceptual/engineering assessments.
- Ultra FPGA LED/UART assessments and evidence-based engineering readiness.

## Files and routes

| Files | Responsibility |
| --- | --- |
| `public/fpga/{catalog,content,neutral,foundation,progress,view,examples}.js` | Modular FPGA lessons, prerequisites, exercises, quiz/completion and rendering |
| `public/fpga/rtl/`, `tb/`, constraint templates | Downloadable teaching RTL and clearly separated testbenches |
| `public/project/{catalog,content,engineering,model,view}.js` | Competition modules, state model, reusable cards/flows, demos and journal |
| `public/project/kit/` | Golden model, comparator and local workflow |
| `public/{app,sync}.js`, `index.html`, `style.css` | Additive navigation, normalization/import, synchronization and responsive integration |
| `worker/index.js` | Preserve extension fields omitted by older clients within existing revision checks |
| `tests/`, `tools/check-hdl.py` | Content, data compatibility, numerical and RTL regression |
| `tools/build.mjs`, `tools/preview.mjs`, `vite.config.mjs`, package files | Build filtering and isolated authenticated preview QA |

New hash routes: `#home`, `#learning`, `#fpga`, `#fpga-01`…`#fpga-27`, `#ultra-fpga`, `#ultra-fpga-led`, `#ultra-fpga-uart`, `#fpga-readiness`, `#competition`, `#edge-01`…`#edge-21`, `#milestones`, `#project-journal`, `#skills`, `#system-integration`, `#ultra-hub`, `#ultra-image`, `#ultra-image-concept`, `#ultra-image-stream`. Original routes remain valid.

## Progress and migration

Root schema remains 1. Additive `fpga`, `ultraFPGA` and `competition` objects contain independent lesson records, milestones, journal/draft, skills, integration notes and Image Ultra attempts. Missing fields receive empty defaults. Existing `lessons`, `acceptance` and `ultra` records retain their IDs and values. Import/export includes new fields; old imports do not erase the extensions. Old browser migration, per-account pending drafts, revision/CAS checks and field conflict handling are reused. An older client omitting new extension objects cannot delete them through the API.

FPGA availability follows actual completed main lessons and declared FPGA prerequisites. Competition prerequisites are advisory so project work may advance early. Bidirectional cross-links join foundation concepts and their project applications. A competition completion never marks a foundation course or skill mastered.

A milestone becomes effectively complete only with a completion state, at least 20 characters of evidence, explicit verification and necessary predecessor milestones. If a prerequisite is invalidated, dependent records remain but no longer count as complete. Only 11 actual milestones are counted; no invented score. Optional advanced topics remain informational and locked until the stable baseline demo is recorded.

## Verification performed

- 19 Node tests: original content, normalization, isolation, CAS/conflicts, offline behavior, legacy client preservation, unlock gates, separate progress, routes, milestone logic and numerical invariants.
- 4 Python tests: grayscale/Sobel/crop, exhaustive corner-window bounds, comparator failures and actual Golden CLI output.
- pyslang parsing/elaboration of 17 complete synthesizable examples and two testbenches; six non-fatal signed parameter comparison warnings remain.
- Yosys synthesis/check and CXXRTL behavior tests: all 256 UART bytes plus error/reset cases, debounce, LED, PWM, RAM, FIFO, pipeline, elastic buffering and fixed-scale arithmetic.
- Supervised running preview: all 24 original lessons opened; FPGA lesson completion/reload/account isolation; project lesson completion; journal and milestone persistence; skill mastery guard; Ultra FPGA and Image submission/reload; desktop, 768 px tablet and 390 px mobile inspection. Test accounts are synthetic and never use production learner records.

## Limits and external work

No browser execution of Python, RTL synthesis, Efinity, programmer or hardware is claimed. Tool/board evidence is learner-entered and requires external review. Guided competition RTL fragments are intentionally incomplete; the final image pipeline must be independently implemented and verified. Efinity device, version, camera format, clocks, reset, pins and display contract must be supplied by the team. No exact undocumented UI locations or board constraints are invented.

Journal supports 80 entries; FPGA/Image Ultra retain five attempts, original RTL Ultra retains its existing history policy. Export progress for archival. The authenticated preview exercises the actual API with synthetic trusted identity; production ChatGPT authentication is platform-owned. GitHub Pages cannot host the authenticated Worker/D1 edition by itself.

Recommended next task: agree the real board/device and streaming interface contract, then run the guided rgb2gray module against the integer Golden output in the team's installed simulator and Efinity version before advancing to synchronous-RAM line-buffer integration.
