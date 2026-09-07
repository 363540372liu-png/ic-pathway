# Validation record

## Initial English export

Prepared on 2026-09-07. This record distinguishes offline checks from real EDA execution.

| Check | Status |
| --- | --- |
| All 24 lessons, stage mappings, exercises, and quiz schemas | Passed offline |
| JavaScript syntax and local asset references | Passed offline |
| English-only shipped text and exclusion of private hosting identifiers | Passed offline |
| Counter, pipeline, FSM, and timing-budget boundary cases | Passed offline |
| Imported-progress normalization and completion invariants | Passed offline |
| Canonical RTL versus displayed reference and packaged source | Passed offline |
| Deterministic lab archive, safe paths, freshness, and included license | Passed offline |
| Shell/Python syntax | Passed offline |
| Actual Icarus compilation and HDL self-checks | Not run: simulator unavailable in the export environment |
| VCS and DC execution | Not run: licensed tools and target library unavailable |
| Browser visual or end-to-end testing | Not performed |
| GitHub Actions | Configured; not claimed to have run |

Run `node tests/validate.mjs` and `python3 tools/package_lab.py --check` to reproduce the offline checks. Run `python3 tests/hdl.py` with Icarus installed for actual HDL evidence.

The initial export completed all eight offline check groups and the archive check with exit code 0. The HDL runner exited with code 1 and reported `HDL checks NOT RUN; missing tools: iverilog, vvp`; this records an unavailable prerequisite, not a simulator result.

The expected testbench output is described as an expectation, never as an observed log. No commercial synthesis area or timing values are supplied. Future updates should record the source revision, actual tool versions, configuration, command, and observed result before changing a status here.
