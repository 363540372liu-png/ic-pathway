// Verification harness, not a board top or mini-project solution.
module fixture(input clk,resetn,start,rx,button,en,pulse,valid,a,b,
 input [7:0] data, input [8:0] duty,
 output tx,busy,done,rxvalid,rxerror,tick,pressed,rise,pwm,led,cmdled,y,
 output [7:0] rxdata,q,rom,ramq,pipeq,elasticq,fifoq,scaled,output pipevalid,elasticvalid,inready,fifofull,fifoempty,fifovalid,output [15:0] product,output [3:0] lights);
 uart_tx #(.CLKS_PER_BIT(8)) ut(clk,resetn,start,data,tx,busy,done);
 uart_rx #(.CLKS_PER_BIT(8)) ur(clk,resetn,rx,rxdata,rxvalid,rxerror);
 tick_enable #(.DIV(5)) ce(clk,resetn,tick);
 button_filter #(.STABLE(4)) bf(clk,resetn,button,pressed,rise);
 pwm8 pw(clk,resetn,duty,pwm);
 led_toggle lt(clk,resetn,pulse,led);
 command_led cl(clk,resetn,valid,data,cmdled);
 running_led rl(clk,resetn,tick,en,lights);
 register8 re(clk,resetn,en,data,q);
 small_rom ro(data[1:0],rom);
 multiply8 mu(clk,resetn,data,data,product);
 and_gate ag(a,b,y);
 pipeline_stage ps(clk,resetn,data,valid,pipeq,pipevalid);
 elastic_stage es(clk,resetn,data,valid,inready,elasticq,elasticvalid,en);
 sync_ram sr(clk,valid,data[3:0],data,ramq);
 fifo4 fi(clk,resetn,valid,pulse,data,fifoq,fifofull,fifoempty,fifovalid);
 fixed_scale fx(data,duty,scaled);
endmodule
