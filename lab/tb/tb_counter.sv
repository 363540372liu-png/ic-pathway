`timescale 1ns/1ps
module tb_counter;
  localparam WIDTH = 4;
  localparam MODULUS = 1 << WIDTH;
  reg clk = 0;
  reg rst_n = 0;
  reg en = 0;
  wire [WIDTH-1:0] count;
  integer expected = 0;
  integer checks = 0;

  counter #(.WIDTH(WIDTH)) dut (
    .clk(clk), .rst_n(rst_n), .en(en), .count(count)
  );

  always #5 clk = ~clk;

  initial begin
    $dumpfile("counter.vcd");
    $dumpvars(0, tb_counter);
  end

  task step;
    input r;
    input e;
    begin
      // Drive away from the active sampling edge.
      @(negedge clk);
      rst_n = r;
      en = e;
      if (!r)
        expected = 0;
      else if (e)
        expected = (expected + 1) % MODULUS;

      @(posedge clk);
      // 1 ns is safe here because the test clock period is exactly 10 ns.
      // This is a zero-delay RTL test, not a timing-annotated gate-level test.
      #1;
      checks = checks + 1;
      if (count !== expected[WIDTH-1:0])
        $fatal(1, "FAIL t=%0t check=%0d rst_n=%b en=%b expected=%0d actual=%0d",
               $time, checks, rst_n, en, expected, count);
    end
  endtask

  initial begin
    // 1. Startup reset.
    step(0, 0);
    step(0, 0);
    // 2. Enabled counting.
    repeat (5) step(1, 1);
    // 3. Disabled hold.
    repeat (3) step(1, 0);
    // 4. At least two complete modulo cycles, including wraparound.
    repeat (2 * MODULUS + 2) step(1, 1);
    // 5. Reset while active; reset has priority over enable.
    step(0, 1);
    step(0, 1);
    // 6. Remain at zero when reset is released but enable is off.
    step(1, 0);
    // 7. Check synchronous behavior before the next active edge.
    repeat (3) step(1, 1);
    @(negedge clk);
    rst_n = 0;
    en = 1;
    #1;
    checks = checks + 1;
    if (count !== expected[WIDTH-1:0])
      $fatal(1, "FAIL: synchronous reset changed count before posedge");
    @(posedge clk);
    #1;
    expected = 0;
    checks = checks + 1;
    if (count !== {WIDTH{1'b0}})
      $fatal(1, "FAIL: reset did not clear count at posedge");
    // 8. Mixed enable pattern after another reset.
    repeat (4) begin
      step(1, 1);
      step(1, 0);
      step(1, 1);
    end
    $display("PASS: counter WIDTH=%0d checks=%0d", WIDTH, checks);
    $finish;
  end

  // A missing clock or stuck test must fail instead of running forever.
  initial begin
    #10000;
    $fatal(1, "FAIL: simulation timeout");
  end
endmodule
