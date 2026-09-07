# Learning design

## Learner and endpoint

The primary learner is an undergraduate or self-directed beginner who has not studied Verilog and may be filling digital-logic gaps while attending IC coursework. Basic arithmetic and file editing are assumed. Prior C proficiency, an FPGA board, and commercial EDA licenses are not assumed.

The endpoint is the ability to explain, implement, test, and perform basic synthesis of a small synchronous block. Course completion does not imply readiness for production-chip signoff.

## Why the stages have this order

1. **Logic before syntax.** Representation, truth tables, selection, and storage give language constructs a hardware meaning.
2. **State before complex control.** Flip-flops and short edge traces make nonblocking assignment and state machines easier to reason about.
3. **Tests before simulator migration.** Establish expected behavior and self-checks, then change simulator while preserving the design and tests.
4. **Function before implementation metrics.** Introduce libraries, constraints, and area/timing tradeoffs after the functional specification is explicit.
5. **Evidence before completion claims.** Distinguish a written answer, a browser check, an actual simulator result, and a reviewed synthesis report.

## The repeated lesson loop

| Activity | Learner action | Feedback or evidence |
| --- | --- | --- |
| Understand | Read the objective and circuit behavior | Explicit assumptions and a concrete model |
| Predict | Work out an output, edge trace, or failure first | A written expectation |
| Observe | Change controls in a labeled teaching model | An immediate deterministic result |
| Apply | Write an explanation, RTL fragment, or lab record | A response and reference answer |
| Check | Answer a focused knowledge question | Immediate reasoning feedback |
| Reproduce | Run the actual lab when tools are available | Source, commands, logs, and waveforms/reports |

Only the multiple-choice knowledge question is automatically graded. Open responses need self-review, instructor review, or real execution. The app does not infer code correctness from saved text.

## One design reduces unrelated setup

The counter is small enough to understand completely while exercising reset priority, synchronous sampling, enable/hold behavior, width, wraparound, and control interactions. The same design moves through Icarus, VCS, and DC.

The test uses WIDTH=4 to reach wraparound quickly. Default synthesis uses WIDTH=8. Parameter-specific checks in the optional HDL runner cover widths 1, 4, and 8; those checks provide evidence only when actually executed.

The FSM is an additional control example, not an undisclosed replacement for the counter capstone.

## Two assessment layers

**Lesson progress** requires a nonempty practice response and a passed knowledge check before the learner explicitly marks completion. A response can honestly state that a tool run is pending. This records study progress, not practical certification.

**Practical acceptance** uses a separate six-item checklist. Confirm it with actual evidence: independent explanation, RTL implementation, self-checks and an intentionally failing mutation, a VCS run, a justified DC run, and reviewed outputs with their limits.

A final submission should include specification, source, test plan, versions, repeatable commands, permitted library/constraint notes, actual outputs, and a defect investigation. Unperformed work remains pending.

## Pacing and review

Lesson minutes estimate a first reading. Setup, debugging, and independent implementation may take much longer. A short concept session and a separate practical session are often more useful than rushing both.

Review the prerequisite behavior when stuck: representation for width errors, storage for latch confusion, and edge sampling for waveform races. Navigation stays open so learners can revisit any lesson without an artificial lock.

## Boundaries

The browser omits physical delay and device effects. The timing calculator is a simplified setup budget, not STA. The application supplies no commercial tools/libraries and does not connect to an institutional server. Later topics include CDC, assertions, coverage, formal equivalence, DFT, low power, physical implementation, and signoff.
