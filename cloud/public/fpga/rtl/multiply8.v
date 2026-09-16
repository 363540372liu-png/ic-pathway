`timescale 1ns/1ps
module multiply8(input wire clk,rst_n,input wire [7:0] a,b,output reg [15:0] y);
 always @(posedge clk) begin
  if(!rst_n) y<=16'd0;
  else y<=a*b;
 end
endmodule
