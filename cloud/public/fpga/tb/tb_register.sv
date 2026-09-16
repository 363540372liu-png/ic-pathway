`timescale 1ns/1ps
module tb_register;
 reg clk=0,rst_n=0,en=0;reg [7:0] d=0;wire [7:0] q;
 register8 dut(.*);always #5 clk=~clk;
 initial begin
  @(negedge clk);rst_n=1;en=1;d=8'hA5;
  @(posedge clk);#1;if(q!==8'hA5)$fatal(1,"capture");
  @(negedge clk);en=0;d=8'h3C;
  @(posedge clk);#1;if(q!==8'hA5)$fatal(1,"hold");
  @(negedge clk);rst_n=0;
  @(posedge clk);#1;if(q!==0)$fatal(1,"reset");
  $display("PASS register");$finish;
 end
 initial begin #1000;$fatal(1,"timeout");end
endmodule
