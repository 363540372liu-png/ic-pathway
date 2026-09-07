# Contributing

Contributions should improve a learner's ability to explain a circuit and verify it with evidence.

Read the [learning design](docs/LEARNING_DESIGN.md) and [architecture](docs/ARCHITECTURE.md). Keep shipped interface text, explanations, prompts, feedback, and documentation in English.

## Course changes

Keep lesson IDs stable: bookmarks and saved progress use them. Preserve the progression from behavior to implementation and verification. State assumptions about reset polarity, synchrony, width, signedness, time units, and sampling where relevant.

Each lesson needs goals, explanation, exercise, reference answer, and a knowledge check with justified reasoning. Cite primary sources for technical corrections. Do not copy proprietary teaching materials or vendor manuals.

## Code and models

Keep shared teaching rules deterministic and separate from rendering. Add a meaningful boundary case or counterexample when a model changes. The interface must identify models as demonstrations rather than HDL execution or signoff.

Edit canonical lab sources in `lab/`, then run `python3 tools/package_lab.py`. Keep the downloadable copy consistent. Never commit generated simulation outputs, proprietary libraries, license information, credentials, or private hosting configuration.

## Checks

```bash
node tests/validate.mjs
python3 tools/package_lab.py --check
python3 tests/hdl.py
```

The last command requires Icarus and fails if it is missing. Passing offline checks does not imply that an HDL run succeeded. Commercial-tool changes require validation in an authorized environment with the actual version and configuration recorded.

For layout or accessibility changes, report browsers and viewports actually checked. Do not claim an unperformed visual check passed.

## Pull requests

Explain the learner-facing problem, resulting behavior, tests performed, and remaining limitations. Update related documentation and the lab archive. Keep contributions within the MIT-licensed original project content.
