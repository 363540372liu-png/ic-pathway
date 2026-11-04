module rv_register(input logic clk,rst_n,s_valid,m_ready,input logic [7:0] s_data,
 output logic s_ready,m_valid,output logic [7:0] m_data);
 assign s_ready=!m_valid || m_ready;
 always_ff @(posedge clk) begin
  if(!rst_n) begin m_valid<=0;m_data<=0;end
  else if(s_ready) begin m_valid<=s_valid; if(s_valid) m_data<=s_data;end
 end
endmodule
