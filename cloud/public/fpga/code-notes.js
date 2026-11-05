window.IC_FPGA_CODE_NOTES={
  "rtl/elastic_stage.v": {
    "6": {
      "source": " assign in_ready=!out_valid||out_ready;",
      "explain": "本级无有效数据，或旧数据本沿能被下游接收，两种情况都允许上游写入。不是要求两者同时发生。"
    },
    "8": {
      "source": "  if(!rst_n) begin out_valid<=0;out_data<=0;end",
      "explain": "清out_valid取消旧字节；out_data清零只是确定显示，只有valid才决定数据是否有效。"
    },
    "9": {
      "source": "  else if(in_ready) begin out_valid<=in_valid;if(in_valid)out_data<=in_data;end",
      "explain": "仅in_ready时更新有效位和数据；阻塞时保留旧字节。消费旧字节且in_valid=1时可同沿替换。"
    }
  },
  "rtl/uart_tx.v": {
    "10": {
      "source": " assign tx=busy?frame[0]:1'b1;",
      "explain": "忙时发送锁存帧最低位，空闲强制线路为1。输出不直接读取外部data，因此不会在帧中途换字节。"
    },
    "16": {
      "source": "    if(start) begin frame<={1'b1,data,1'b0};busy<=1;timer<=0;bit_index<=0;end",
      "explain": "只在不忙且start有效时接受一个字节，锁存停止1、8位数据、起始0共10位，并从bit0开始。"
    },
    "17": {
      "source": "   end else if(timer==CLKS_PER_BIT-1) begin",
      "explain": "计时从0开始，到CLKS_PER_BIT-1正好经历一个位宽，下一沿换位；比较CLKS_PER_BIT会慢一拍。"
    },
    "20": {
      "source": "    else begin frame<={1'b1,frame[9:1]};bit_index<=bit_index+1'b1;end",
      "explain": "把帧右移一位，让下一数据位到frame[0]，高位补1保证结束后仍是空闲电平。"
    }
  },
  "rtl/fixed_scale.v": {
    "4": {
      "source": " wire [16:0] product=sample*gain;",
      "explain": "8位sample乘9位gain保留17位积；gain采用8位小数，384表示1.5而不是384倍。"
    },
    "5": {
      "source": " wire [17:0] rounded={1'b0,product}+18'd128;",
      "explain": "先把积补0到18位再加128，相当于丢8个小数位前加半个单位进行最近舍入。"
    },
    "7": {
      "source": " assign result=(scaled>10'd255)?8'd255:scaled[7:0];",
      "explain": "缩放后超过255就钳位255，否则取低8位；若直接截8位，溢出会回绕成小数值。"
    }
  },
  "rtl/register8.v": {
    "2": {
      "source": "module register8(input wire clk,rst_n,en,input wire [7:0] d,output reg [7:0] q);",
      "explain": "d和q各8位，clk/rst_n/en各1位。这里q是过程输出变量，沿触发行为决定它是寄存器。"
    },
    "4": {
      "source": "  if(!rst_n) q<=8'd0;",
      "explain": "低有效同步复位在上升沿被采样，优先让8位q全部为0。"
    },
    "5": {
      "source": "  else if(en) q<=d;",
      "explain": "只有非复位且en=1才读d，en=0不赋值，保持上次采样。此处保持是寄存器需求而非组合漏赋值。"
    }
  },
  "rtl/button_filter.v": {
    "5": {
      "source": " (* ASYNC_REG=\"TRUE\" *) reg meta,sync;",
      "explain": "meta/sync标为AMD常见同步链属性；其他工具须采用自己的标识。属性不消除物理亚稳态概率。"
    },
    "12": {
      "source": "   meta<=button_async; sync<=meta; previous<=pressed;",
      "explain": "meta采异步按钮、sync采旧meta，previous采旧pressed；三条<=都使用各自沿前输入。"
    },
    "14": {
      "source": "   else if(count==STABLE-1) begin pressed<=sync; count<=0; end",
      "explain": "新电平连续达到STABLE拍才更新pressed；中途若回到已认可电平，上一分支会清计数。"
    },
    "18": {
      "source": " assign rise=pressed & ~previous;",
      "explain": "pressed为本次滤波输出，previous为旧输出，0→1期间rise为一个周期。不要把rise当新时钟。"
    }
  },
  "rtl/led_minimal.v": {
    "5": {
      "source": " localparam integer W=(HALF_PERIOD<=1)?1:$clog2(HALF_PERIOD);",
      "explain": "HALF_PERIOD=1仍要留至少一位count，避免$clog2(1)=0形成零宽声明；参数必须至少为1。"
    },
    "10": {
      "source": "   if(count==HALF_PERIOD-1) begin count<=0; led<=~led; end",
      "explain": "旧count达到H-1时，本沿清零并翻转LED。H=3时从旧0、1、2经过三个使能沿翻转。"
    },
    "18": {
      "source": " always @(posedge clk or negedge rst_n) begin",
      "explain": "低有效复位下降可立即清释放链；释放后必须随clk推进两级，再由core同步采到末级。"
    },
    "24": {
      "source": "  .clk(clk),.rst_n(reset_pipe[1]),.en(1'b1),.led(led));",
      "explain": "两层共用clk，core复位取链末级，en接常量1。按钮暂停扩展应先解决同步/消抖，不能直接换时钟。"
    },
    "25": {
      "source": " assign led_pin=LED_ACTIVE_LOW?~led:led;",
      "explain": "逻辑亮灭与引脚电平分开；低有效LED把逻辑亮1映射为引脚0。"
    }
  },
  "rtl/uart_led_top.v": {
    "7": {
      "source": " localparam integer CLKS_PER_BIT=CLOCK_HZ/BAUD;",
      "explain": "每位的整数系统周期数由CLOCK_HZ/BAUD求得，会有截断误差；实际振荡器不等于默认值时必须重算。"
    },
    "9": {
      "source": " always @(posedge clk or negedge reset_button_n) begin",
      "explain": "复位下降沿异步清释放链；时钟上升沿推动释放，不能把这段与普通同步复位混为一谈。"
    },
    "11": {
      "source": "  else reset_pipe<={reset_pipe[0],1'b1};",
      "explain": "1逐级进入复位链；子模块看旧末级，所以释放不是外部按钮抬高的同一瞬间。"
    },
    "13": {
      "source": " wire rst_n=reset_pipe[1];",
      "explain": "两块子模块共用末级rst_n与clk，避免各自随意释放。reset_pipe本身还需按器件方法处理约束。"
    },
    "16": {
      "source": " uart_rx #(.CLKS_PER_BIT(CLKS_PER_BIT)) receiver(",
      "explain": "receiver是一份uart_rx实例，覆盖每位周期参数，不是软件调用。它把串行rx变成8位数据与有效脉冲。"
    },
    "19": {
      "source": " command_led decoder(.clk(clk),.rst_n(rst_n),.valid(rx_valid),.data(rx_data),.led(led_state));",
      "explain": "decoder同沿读旧rx_valid和旧rx_data，接收器提交字节后的下一沿才处理命令，两者必须成对传递。"
    },
    "20": {
      "source": " assign led_pin=LED_ACTIVE_LOW ? ~led_state : led_state;",
      "explain": "只在最外层处理LED高低有效极性，命令解码保持逻辑亮灭不受板卡接线影响。"
    }
  },
  "rtl/uart_rx.v": {
    "13": {
      "source": "   meta<=rx;sync<=meta;valid<=0;frame_error<=0;",
      "explain": "先同步线路，并默认把valid/frame_error清0；后面成功收帧或错帧分支只把脉冲拉高一周期。"
    },
    "15": {
      "source": "    IDLE: begin timer<=0;if(!sync) state<=START;end",
      "explain": "空闲高电平变低只表示候选起始，先进入START复查，不能立即当成有效字节。"
    },
    "16": {
      "source": "    START: if(timer==(CLKS_PER_BIT/2)-1) begin",
      "explain": "等待半个位时间到候选起始中心，再确认仍为0，降低窄低脉冲被误当起始的风险。"
    },
    "21": {
      "source": "     timer<=0;buffer[bit_index]<=sync;",
      "explain": "每完整位时间采同步线路，写入bit_index对应位，依次从低位到高位组装buffer。"
    },
    "26": {
      "source": "     if(sync) begin data<=buffer;valid<=1;end else frame_error<=1;",
      "explain": "停止位为1才提交buffer并拉高valid；停止位为0只报frame_error，不交付数据。"
    }
  },
  "rtl/led_toggle.v": {
    "3": {
      "source": " always @(posedge clk) begin",
      "explain": "此处只在系统clk上升沿工作，press_pulse是采样条件，不接到敏感事件列表当时钟。"
    },
    "4": {
      "source": "  if(!rst_n) led<=1'b0;",
      "explain": "同步复位把逻辑LED状态清0；实际引脚高低亮应在顶层适配。"
    },
    "5": {
      "source": "  else if(press_pulse) led<=~led;",
      "explain": "只在按钮已同步消抖形成的一拍脉冲时翻转一次，持续高电平会每拍翻转，不能当原始按钮直接输入。"
    }
  },
  "rtl/fifo4.v": {
    "7": {
      "source": " wire take=pop&&!empty,put=push&&!full;",
      "explain": "put和take使用沿前满空状态门控。满时push不接受，即便同沿也pop，这是本例的保守边界。"
    },
    "12": {
      "source": "   out_valid<=take;",
      "explain": "out_valid记录本沿是否接受读请求；与新dout在沿后一起有效，不是沿前FWFT输出。"
    },
    "14": {
      "source": "   if(take)begin dout<=mem[rd];rd<=rd+1'b1;end",
      "explain": "成功读取才把旧mem[rd]装到dout并推进rd，下游同沿仍看旧dout，需要按接口相位采样。"
    },
    "15": {
      "source": "   case({put,take}) 2'b10:count<=count+1'b1;2'b01:count<=count-1'b1;default:count<=count;endcase",
      "explain": "仅进数量加一，仅出减一，同时接受保持数量。不能用两个独立NBA相互覆盖。"
    }
  },
  "rtl/pwm8.v": {
    "3": {
      "source": "module pwm8(input wire clk,rst_n,input wire [8:0] duty,output wire pwm);",
      "explain": "duty用9位表示0..256；若只留8位就无法表示256，即精确100%占空比。"
    },
    "7": {
      "source": "  else phase<=phase+1'b1;",
      "explain": "phase每个系统沿前进，8位自然从255回0，形成256拍比较窗口。"
    },
    "9": {
      "source": " assign pwm=rst_n && ({1'b0,phase}<duty);",
      "explain": "phase先补成9位与duty比，duty=0全关，256全开；rst_n为0时组合屏蔽输出。"
    }
  },
  "rtl/multiply8.v": {
    "2": {
      "source": "module multiply8(input wire clk,rst_n,input wire [7:0] a,b,output reg [15:0] y);",
      "explain": "两个无符号8位数的完整积最多16位，y必须保留这16位而非只留一个输入宽度。"
    },
    "4": {
      "source": "  if(!rst_n) y<=16'd0;",
      "explain": "复位优先把输出寄存器清0，不等于清a/b或硬件乘法器本身。"
    },
    "5": {
      "source": "  else y<=a*b;",
      "explain": "上升沿采a*b并寄存；是否映射DSP由器件、综合设置和约束决定，不能仅凭乘号宣布用了DSP。"
    }
  },
  "rtl/and_gate.v": {
    "2": {
      "source": "module and_gate(input wire a,b,output wire y);",
      "explain": "a、b、y都是一位端口；input/output从这个与门自身看方向。"
    },
    "3": {
      "source": " assign y=a & b;",
      "explain": "y持续等于a与b，只有11输出1；没有时钟输入，改变a或b即可重算。"
    },
    "4": {
      "source": "endmodule",
      "explain": "结束与门定义，实例会持续按输入工作，不是执行到这里就停止。"
    }
  },
  "rtl/running_led.v": {
    "2": {
      "source": "module running_led(input wire clk,rst_n,tick,en,output reg [3:0] led);",
      "explain": "tick和en都是clk域的控制条件，led是一组4位状态，不另建tick时钟。"
    },
    "4": {
      "source": "  if(!rst_n) led<=4'b0001;",
      "explain": "复位为0001而非全0，因为全0循环移位会永远全0。"
    },
    "5": {
      "source": "  else if(tick && en) led<={led[2:0],led[3]};",
      "explain": "仅tick与en同为1才旋转旧led，0001→0010→0100→1000→0001；其余系统沿保持。"
    }
  },
  "rtl/small_rom.v": {
    "4": {
      "source": " always @(*) begin",
      "explain": "输入address变化就重算，不等待时钟；这类异步查找小表通常可映射LUT，不能预设为BRAM。"
    },
    "5": {
      "source": "  case(address)",
      "explain": "按2位地址选择常量，0/1/2/3共四种地址都需要确定输出。"
    },
    "6": {
      "source": "   0:data=8'h11;1:data=8'h22;2:data=8'h44;default:data=8'h88;",
      "explain": "前三个地址返回11/22/44，default负责剩余地址3返回88，过程无存储需求。"
    }
  },
  "rtl/pipeline_stage.v": {
    "4": {
      "source": " input wire valid_in,output reg [7:0] data_out,output reg valid_out);",
      "explain": "valid_out与data_out是一起传给下级的采样记录；本模块没有ready，不支持背压等待。"
    },
    "6": {
      "source": "  if(!rst_n) begin data_out<=0;valid_out<=0;end",
      "explain": "复位取消有效数据；数据清0只是确定显示，不代表一个有效零字节。"
    },
    "7": {
      "source": "  else begin valid_out<=valid_in;if(valid_in)data_out<=data_in;end",
      "explain": "每拍推进valid，即便输入无效也要输出气泡；只有有效输入才更新data，不能因为数据保持就说上拍仍有效。"
    }
  },
  "rtl/sync_ram.v": {
    "6": {
      "source": " reg [7:0] mem[0:15];",
      "explain": "16个8位元素未初始化；读未写地址可能未知，测试不能默认全0。"
    },
    "8": {
      "source": "  dout<=mem[addr];",
      "explain": "先读取沿前mem[addr]排队给dout，同址写时也得到旧值，即read-first。"
    },
    "9": {
      "source": "  if(we)mem[addr]<=din;",
      "explain": "we有效才在沿后改存储，语句先后不把NBA读旧值改成写后读新值。实际RAM原语碰撞行为仍需核对。"
    }
  },
  "rtl/command_led.v": {
    "6": {
      "source": "  else if(valid) begin",
      "explain": "只有valid=1才把data当新命令处理；valid=0时即便data改变，也不改LED。"
    },
    "8": {
      "source": "    8'h30: led<=0;",
      "explain": "ASCII字符0是十六进制30，不是数值00；接受后把逻辑状态熄灭。"
    },
    "9": {
      "source": "    8'h31: led<=1;",
      "explain": "ASCII字符1是31，接受后置亮；其他字节进入default保留原状态。"
    },
    "10": {
      "source": "    default: led<=led;",
      "explain": "非法命令保持上一次LED状态，测试要分别在已亮和已灭时发非法字节。"
    }
  },
  "rtl/tick_enable.v": {
    "5": {
      "source": " localparam integer W=(DIV<2)?1:$clog2(DIV);",
      "explain": "DIV周期计数需要能保存0..DIV-1，$clog2求所需位数；本例要求DIV至少为2。"
    },
    "10": {
      "source": "   tick<=0;",
      "explain": "每个非复位沿先把tick安排清0，保证终值时置1只持续一拍。"
    },
    "11": {
      "source": "   if(count==DIV-1) begin count<=0; tick<=1; end",
      "explain": "旧count达到DIV-1才清零并置tick。下游同沿看到旧tick，因此会在后一个沿按该使能更新，仍共用clk。"
    }
  },
  "tb/tb_led_minimal.sv": {
    "10": {
      "source": " always #5 clk=~clk;",
      "explain": "always重复这个仿真过程，#5等待5ns，~clk翻转。相邻上升沿间隔10ns；这不是可综合的时钟发生器。"
    },
    "20": {
      "source": "    if(phase==3) begin phase=0; expected=~expected; end",
      "explain": "参考模型phase从0累加允许沿，达到3才翻转expected；它不用读取DUT内部count来给自己做答案。"
    },
    "22": {
      "source": "   @(posedge clk); #1;",
      "explain": "在下降沿改变激励后，等待下个上升沿再等1ns，避开NBA尚未提交的观察时刻。"
    },
    "23": {
      "source": "   if(led3 !== expected || led1 !== expected1)",
      "explain": "两份参数实例都必须等于各自独立预期，!==能把X/Z也判成失败。"
    }
  },
  "tb/tb_uart_led.sv": {
    "7": {
      "source": " always #10 clk=~clk;",
      "explain": "本测试台单位1ns，每10ns翻转clk一次，系统周期20ns即50MHz。测试用8个周期一位来缩短运行时间。"
    },
    "9": {
      "source": "  begin @(negedge clk);uart_rx_pin=level;repeat(8)@(posedge clk);end",
      "explain": "在下降沿改串口线路，再跨过8个上升沿，形成一个位的持续区间；这是发送激励，不是接收器采样算法。"
    },
    "16": {
      "source": "  begin @(negedge clk);if(led_pin!==expected)$fatal(1,\"LED expected %b got %b\",expected,led_pin);end",
      "explain": "在下降沿检查LED，让上个上升沿的命令状态已提交。!==与$fatal保证不符时失败而非静默退出。"
    },
    "19": {
      "source": "  repeat(3)@(negedge clk);reset_button_n=1;repeat(4)@(negedge clk);check_led(0);",
      "explain": "先经历复位采样，再等待释放链和子模块更新，初始预期为熄灭。不能抬起按钮就立刻断言释放完成。"
    }
  },
  "tb/tb_register.sv": {
    "4": {
      "source": " register8 dut(.*);always #5 clk=~clk;",
      "explain": "dut(.*)按同名信号连接，本例已有匹配声明；always #5仅在测试台产生10ns周期时钟。不要把.*当作任意名字自动接线。"
    },
    "7": {
      "source": "  @(posedge clk);#1;if(q!==8'hA5)$fatal(1,\"capture\");",
      "explain": "上升沿后等待1ns，再用四态不等检查A5是否被捕获，不把沿前旧值误报为错。"
    },
    "9": {
      "source": "  @(posedge clk);#1;if(q!==8'hA5)$fatal(1,\"hold\");",
      "explain": "en=0时输入已改3C，但q必须仍为先前A5；这个反例检验保持，而非重复测试加载。"
    }
  },
  "tb/tb_gate.sv": {
    "5": {
      "source": " initial begin",
      "explain": "initial把后面的四组输入实验执行一遍，不是每个时钟沿重复，也不作为被测组合门的组成部分。"
    },
    "8": {
      "source": "   if(y !== (a & b)) $fatal(1,\"gate mismatch\");",
      "explain": "预期直接来自a与b的真值规则，输出不相等或含未知就结束失败；这仍应结合错误注入检查测试是否有效。"
    }
  }
};
