module uart_tx #(parameter CLKS_PER_BIT=4)(
 input logic clk,rst_n,start,input logic [7:0] data,output logic tx,busy);
 logic [9:0] frame;
 integer tick,bitno;
 always_ff @(posedge clk) begin
  if(!rst_n) begin tx<=1;busy<=0;tick<=0;bitno<=0;frame<=10'h3ff;end
  else if(!busy) begin
   tx<=1;
   if(start) begin frame<={1'b1,data,1'b0};tx<=0;busy<=1;tick<=0;bitno<=0;end
  end else if(tick==CLKS_PER_BIT-1) begin
   tick<=0;
   if(bitno==9) begin tx<=1;busy<=0;end
   else begin bitno<=bitno+1;tx<=frame[bitno+1];end
  end else tick<=tick+1;
 end
endmodule
