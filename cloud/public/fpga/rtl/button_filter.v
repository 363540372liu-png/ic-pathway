`timescale 1ns/1ps
// Active-high button. STABLE >= 2. rst_n must be synchronous to clk.
module button_filter #(parameter integer STABLE=1000000)(
 input wire clk,rst_n,button_async,output reg pressed,output wire rise);
 (* ASYNC_REG="TRUE" *) reg meta,sync;
 localparam integer W=(STABLE<2)?1:$clog2(STABLE);
 reg [W-1:0] count;
 reg previous;
 always @(posedge clk) begin
  if(!rst_n) begin meta<=0; sync<=0; pressed<=0; previous<=0; count<=0; end
  else begin
   meta<=button_async; sync<=meta; previous<=pressed;
   if(sync==pressed) count<=0;
   else if(count==STABLE-1) begin pressed<=sync; count<=0; end
   else count<=count+1'b1;
  end
 end
 assign rise=pressed & ~previous;
endmodule
