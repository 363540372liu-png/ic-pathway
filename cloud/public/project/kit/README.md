# Edge algorithm verification kit

Run `python golden.py --out results --threshold 300`. No third-party package is
needed for the built-in 8x6 deterministic test image. For your own PNG/JPEG,
install Pillow and add `--image input.png`. PPM/PGM output can be opened by
compatible image viewers or converted with Pillow. Never modify image scaling
before numerical comparison.

`input.hex` is RGB888 in row-major order, `expected.txt` is `x y edge` for valid
center coordinates (1..W-2,1..H-2). `stages.csv` retains signed gradients and
unsaturated magnitude. `metrics.json` compares float-gray/L2 against integer-gray/L1;
it does NOT require the approximated algorithm to equal the float algorithm.

Your independent RTL testbench must produce `rtl.txt` in the same coordinate
order, only when output valid is high. Run
`python compare.py results/expected.txt rtl.txt`. Empty files, missing pixels,
extra pixels, wrong order, X/Z values or first value mismatch cause FAIL.

Baseline contract: RGB888, gray=(77R+150G+29B)>>8 (floor), Sobel kernels as taught,
L1=abs(Gx)+abs(Gy), strict magnitude>threshold, valid crop, no automatic padding,
one clock domain with valid bubbles allowed and no downstream backpressure.
Valid must advance every clock through arithmetic pipeline stages, while row
counters and line/window storage advance only when a pixel is accepted.
Line-buffer synchronous RAM latency requires delaying current pixels and column
coordinates. First valid window forms on accepted input (row=2,col=2), zero-based.
The output belongs to center (row=1,col=1), after RAM and arithmetic latency.

This kit is software only. No complete edge_pipeline_top solution, vendor device,
pin assignments, Efinity execution or fabricated RTL output is provided.
