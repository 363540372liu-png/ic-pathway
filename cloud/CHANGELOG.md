# v4.1.0 · 教学修复与FPGA全流程（待合并、未发布）

- 56课逐课语义审查、概念回链、教师叙述与255项真实分型练习。替换14道重复通用主问题，并修订另外3道检查。
- 统一字体尺度；默认正文17/代码14/练习16–17px，大字20/17/19–20px。六类课×五种宽度×两模式实测。
- 删除比赛项目及依赖，保留旧记录和安全跳转；27个稳定FPGA ID重组九阶段UART LED工程，明确三厂商适配和无板学习模式。
- 34项Node回归、HDL展开、CXXRTL及错误注入通过；实际商业工具与板测未执行。
- 本次不合并main、不部署正式站。详见docs/QUALITY_REPAIR_REPORT.md。

# v4.0.1 · 2026-11-04

- 增加版本标识、检查更新、静态文件内容指纹及no-store响应。
- 发现新版时提供载入入口，保留学习数据，不自动打断编辑。
- 35项测试、构建与手机/桌面版本按钮检查通过，见docs/RELEASE_CACHE_FIX.md。

# v4.0.0 · 2026-11-04

- 完善全部56课/280阶梯活动，52主线、4选修，保留原ID/进度。
- 增加时序预算与窗口、CDC漏采/Gray交互、完整SV接口、RAM/FIFO/UART及背压工程、下载自检TB。
- 33项Node、4项Golden、46个HDL展开、560基础+95997工程CXXRTL比较和三种错误注入通过。
- 浏览器逐页检查56课，修复320px错误代码列溢出。
- 完整范围与限制见docs/IMPLEMENTATION_REPORT.md。

# Unreleased · 交互式RTL教材 P0

- 八阶段42课语言路线、七个语法/设计补缺与六课精讲，保留旧ID和所有既有路线。
- 可访问的逐行解释、结构图、可回退波形、五级练习与四级学习状态。
- 明确加载/失败状态、请求超时、脚本恢复、旧客户端活动字段保护。
- 30项Node、4项Golden、34个完整HDL例子、六模块560次CXXRTL比较及负例检测通过。
- 完整范围、截图、限制见docs/IMPLEMENTATION_REPORT.md；未经合并或发布。

# v3.1.0 · 2026-09-17

- Added `public/teaching.js`: 14 detailed learning bridges for lessons 11–24, with 79 teaching steps, worked tables, small code fragments, complete counter/testbench examples and reflection checkpoints.
- Lessons 11–13 continue the existing counter example from wiring and virtual time through waveforms, scheduling, reference values and self-checking. Lessons 14–24 explain tools, paths, synthesis, libraries, timing budgets and evidence before commands.
- `public/app.js` renders structured reading blocks with escaped text, existing copyable code panels and responsive tables. Prior summaries/code remain available in a review disclosure; all exercise IDs, answers, choices and completion requirements are unchanged.
- Updated `public/index.html`, `public/style.css` and package version. No persistence/API/schema changes or progress migration.
- Validation: 19 existing regression tests; direct comparison confirms all 24 lesson IDs, exercises and quiz definitions unchanged; complete new HDL examples parsed/elaborated with pyslang. Browser loaded all 14 expanded lessons and checked desktop/mobile/tablet reading. Commercial simulation and synthesis are external; no new board execution is claimed.

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

## 2026-11-03 — Beginner Verilog / SystemVerilog path
- Default course map now leads through 28 sequential lessons with prerequisite links, explained code, conceptual checks and saved independent practice.
- Added timing and circuit SVGs, stepped sampling/pipeline/counter models, and an adjustable setup/hold teaching window.
- Added syntax search and a clear distinction between complete modules, snippets, testbenches and terminal commands.
- Preserved legacy courses, FPGA/project progress, and progress compatibility for older clients.
- Checked core flows in the browser; webpage teaching models do not execute HDL.

## 2026-11-04 — Learning-route audit and reading UI
- Reordered the course into 30 core lessons and 5 optional verification lessons; added logic gates, setup, loops, arrays, tasks and handshake bridges.
- Replaced early undeclared-signal snippets with complete modules, removed premature initial/task usage, and added explicit prerequisite links, goals, terms and worked tables.
- Moved the independent counter exercise before advanced verification. Existing lesson IDs, answers and completion records are preserved.
- Added a calm workbook layout, searchable stage lists, recent-lesson resume, code highlighting, reading navigation, larger text and focus mode.
- Added synchronous/asynchronous reset comparison and a visible setup/hold change marker.
- Browser QA: course search, pipeline stepping, practice persistence, reading modes, 390px layout and menu, reset comparison. HDL simulation binaries are unavailable in this executor, so physical/HDL simulation is not claimed as part of these checks.
