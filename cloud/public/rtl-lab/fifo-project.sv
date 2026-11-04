module fifo4(input logic clk,rst_n,push,pop,input logic [7:0] din,
 output logic [7:0] dout,output logic full,empty);
 logic [7:0] mem[0:3];
 logic [1:0] wp,rp;
 logic [2:0] count;
 wire wr=push && !full, rd=pop && !empty;
 assign full=(count==4);
 assign empty=(count==0);
 assign dout=mem[rp];
 always_ff @(posedge clk) begin
  if(!rst_n) begin wp<=0;rp<=0;count<=0;end
  else begin
   if(wr) begin mem[wp]<=din;wp<=wp+2'd1;end
   if(rd) rp<=rp+2'd1;
   case({wr,rd})
    2'b10: count<=count+3'd1;
    2'b01: count<=count-3'd1;
    default: count<=count;
   endcase
  end
 end
endmodule
