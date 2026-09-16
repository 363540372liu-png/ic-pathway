`timescale 1ns/1ps
// 8N1, idle high, LSB first. CLKS_PER_BIT >= 8. Synchronous reset.
module uart_tx #(parameter integer CLKS_PER_BIT=868)(
 input wire clk,rst_n,start,input wire [7:0] data,
 output wire tx,output reg busy,output reg done);
 localparam integer W=$clog2(CLKS_PER_BIT);
 reg [W-1:0] timer;
 reg [3:0] bit_index;
 reg [9:0] frame;
 assign tx=busy?frame[0]:1'b1;
 always @(posedge clk) begin
  if(!rst_n) begin busy<=0;done<=0;timer<=0;bit_index<=0;frame<=10'h3ff;end
  else begin
   done<=0;
   if(!busy) begin
    if(start) begin frame<={1'b1,data,1'b0};busy<=1;timer<=0;bit_index<=0;end
   end else if(timer==CLKS_PER_BIT-1) begin
    timer<=0;
    if(bit_index==9) begin busy<=0;done<=1;end
    else begin frame<={1'b1,frame[9:1]};bit_index<=bit_index+1'b1;end
   end else timer<=timer+1'b1;
  end
 end
endmodule
