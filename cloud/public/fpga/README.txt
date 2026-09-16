FPGA teaching examples / 芯路

rtl/*.v are synthesizable teaching modules with synchronous active-low rst_n.
tb/*.sv are simulation-only testbenches. Add them to Simulation Sources, not Design Sources.
Read parameter limits in each source. Tick signals are enables, not clocks.
No board model is assumed. Verify device part, oscillator, bank voltage, pin map and polarity against the manufacturer's documents.
A physical reset button needs proper synchronization/release handling before driving the synchronous rst_n interface. Button inputs need synchronization and debounce; these are different functions.
constraints-template.xdc intentionally fails until adapted; never program a board using guessed pins or bypassed DRC.
UART is logic-level 8N1, not RS-232 voltage. Use compatible USB-UART voltage and common ground; PC TX connects to FPGA RX. These examples are basic, single-clock teaching modules, not production UART IP.
The mini project must be assembled by the student; no complete board-ready top is provided.
