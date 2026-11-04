// counter_sv.sv
module counter_sv #(parameter int W=4)(
 input logic clk,rst_n,en,
 output logic [W-1:0] q);
 always_ff @(posedge clk) begin
  if(!rst_n) q <= '0;
  else if(en) q <= q + {{(W-1){1'b0}},1'b1};
 end
endmodule
