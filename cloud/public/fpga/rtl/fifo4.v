`timescale 1ns/1ps
// Single-clock 4-entry FIFO. Conservative full behavior: no push when full,
// even if a pop occurs this edge. Registered read output is valid after pop.
module fifo4(input wire clk,rst_n,push,pop,input wire [7:0] din,
 output reg [7:0] dout,output wire full,empty,output reg out_valid);
 reg [7:0] mem[0:3];reg [1:0] rd,wr;reg [2:0] count;
 wire take=pop&&!empty,put=push&&!full;
 assign full=(count==4);assign empty=(count==0);
 always @(posedge clk) begin
  if(!rst_n) begin rd<=0;wr<=0;count<=0;dout<=0;out_valid<=0;end
  else begin
   out_valid<=take;
   if(put)begin mem[wr]<=din;wr<=wr+1'b1;end
   if(take)begin dout<=mem[rd];rd<=rd+1'b1;end
   case({put,take}) 2'b10:count<=count+1'b1;2'b01:count<=count-1'b1;default:count<=count;endcase
  end
 end
endmodule
