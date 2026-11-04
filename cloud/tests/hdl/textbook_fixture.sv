module textbook_fixture(
 input clk,rst_n,en,d,sel,start,finish,
 input [3:0] left,right,
 output [3:0] mux_y,count,
 output ff_q,pipe_a,pipe_b,enabled_q,busy
);
 mux_proc u_mux(.a(left),.b(right),.sel(sel),.y(mux_y));
 dff u_ff(.clk(clk),.d(d),.q(ff_q));
 pipeline2 u_pipe(.clk(clk),.d(d),.a(pipe_a),.b(pipe_b));
 counter u_count(.clk(clk),.rst_n(rst_n),.en(en),.q(count));
 enabled_ff u_enabled(.clk(clk),.rst_n(rst_n),.en(en),.d(d),.q(enabled_q));
 controller u_fsm(.clk(clk),.rst_n(rst_n),.start(start),.finish(finish),.busy(busy));
endmodule
