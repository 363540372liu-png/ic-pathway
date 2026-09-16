`timescale 1ns/1ps
// Basic single-sample 8N1 receiver; no FIFO/flow control. CLKS_PER_BIT >= 8.
module uart_rx #(parameter integer CLKS_PER_BIT=868)(
 input wire clk,rst_n,rx,output reg [7:0] data,
 output reg valid,output reg frame_error);
 (* ASYNC_REG="TRUE" *) reg meta,sync;
 localparam integer W=$clog2(CLKS_PER_BIT);
 localparam IDLE=2'd0,START=2'd1,DATA=2'd2,STOP=2'd3;
 reg [1:0] state;reg [W-1:0] timer;reg [2:0] bit_index;reg [7:0] buffer;
 always @(posedge clk) begin
  if(!rst_n) begin meta<=1;sync<=1;state<=IDLE;timer<=0;bit_index<=0;buffer<=0;data<=0;valid<=0;frame_error<=0;end
  else begin
   meta<=rx;sync<=meta;valid<=0;frame_error<=0;
   case(state)
    IDLE: begin timer<=0;if(!sync) state<=START;end
    START: if(timer==(CLKS_PER_BIT/2)-1) begin
     timer<=0;
     if(!sync) begin state<=DATA;bit_index<=0;end else state<=IDLE;
    end else timer<=timer+1'b1;
    DATA: if(timer==CLKS_PER_BIT-1) begin
     timer<=0;buffer[bit_index]<=sync;
     if(bit_index==7) state<=STOP;else bit_index<=bit_index+1'b1;
    end else timer<=timer+1'b1;
    STOP: if(timer==CLKS_PER_BIT-1) begin
     timer<=0;state<=IDLE;
     if(sync) begin data<=buffer;valid<=1;end else frame_error<=1;
    end else timer<=timer+1'b1;
    default: begin state<=IDLE;timer<=0;end
   endcase
  end
 end
endmodule
