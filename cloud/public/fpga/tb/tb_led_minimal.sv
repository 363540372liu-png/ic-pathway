`timescale 1ns/1ps
module tb_led_minimal;
 reg clk=0,rst_n=0,en=0;
 wire led3,led1;
 integer i,phase=0;
 reg expected=0;
 led_core #(.HALF_PERIOD(3)) d3(.clk(clk),.rst_n(rst_n),.en(en),.led(led3));
 led_core #(.HALF_PERIOD(1)) d1(.clk(clk),.rst_n(rst_n),.en(en),.led(led1));
 reg expected1=0;
 always #5 clk=~clk;
 initial begin
  for(i=0;i<45;i=i+1) begin
   @(negedge clk);
   rst_n=(i!=0 && i!=23);
   en=(i%7!=3 && i%7!=4);
   if(!rst_n) begin phase=0; expected=0; expected1=0; end
   else if(en) begin
    expected1=~expected1;
    phase=phase+1;
    if(phase==3) begin phase=0; expected=~expected; end
   end
   @(posedge clk); #1;
   if(led3 !== expected || led1 !== expected1)
    $fatal(1,"cycle=%0d expected=%b/%b got=%b/%b",i,expected,expected1,led3,led1);
  end
  $display("PASS: 45 LED cycles, H=1/3, pause and reset");
  $finish;
 end
 initial begin #2000; $fatal(1,"timeout"); end
endmodule
