`timescale 1ns/1ps
// DIV >= 2. tick is a one-cycle ENABLE, never use it as a clock.
module tick_enable #(parameter integer DIV=100000000)(
 input wire clk,rst_n,output reg tick);
 localparam integer W=(DIV<2)?1:$clog2(DIV);
 reg [W-1:0] count;
 always @(posedge clk) begin
  if(!rst_n) begin count<=0; tick<=0; end
  else begin
   tick<=0;
   if(count==DIV-1) begin count<=0; tick<=1; end
   else count<=count+1'b1;
  end
 end
endmodule
