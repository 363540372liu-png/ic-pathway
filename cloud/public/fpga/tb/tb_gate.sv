`timescale 1ns/1ps
module tb_gate;
 reg a,b;wire y;integer i;
 and_gate dut(.a(a),.b(b),.y(y));
 initial begin
  for(i=0;i<4;i=i+1) begin
   {a,b}=i[1:0];#10;
   if(y !== (a & b)) $fatal(1,"gate mismatch");
  end
  $display("PASS gate");$finish;
 end
endmodule
