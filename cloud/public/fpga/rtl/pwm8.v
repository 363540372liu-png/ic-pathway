`timescale 1ns/1ps
// duty is 0..256, so both 0% and 100% are representable.
module pwm8(input wire clk,rst_n,input wire [8:0] duty,output wire pwm);
 reg [7:0] phase;
 always @(posedge clk) begin
  if(!rst_n) phase<=8'd0;
  else phase<=phase+1'b1;
 end
 assign pwm=rst_n && ({1'b0,phase}<duty);
endmodule
