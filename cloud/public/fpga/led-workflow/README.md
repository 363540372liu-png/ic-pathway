# 项目A：最小LED控制系统

先走通一次，再把串口加进去。逻辑LED复位为0，每经过HALF_PERIOD个允许计数的系统时钟沿翻转一次，en=0时计数进度和LED都保持。完整闪烁周期是2×HALF_PERIOD/fclk；50MHz、25000000对应1Hz。HALF_PERIOD必须>=1。

## 文件与接口

- rtl/led_minimal.v含led_core与led_minimal。core的clk/rst_n/en为一位输入，led为一位输出，同步低有效复位优先于使能。
- 顶层led_minimal只有clk/rst_n/led_pin；将en接常量1，外部复位异步置入、两拍同步释放。ASYNC_REG为AMD常见属性，其他工具需按自身同步链设置核对。不要把计数器的某个位直接当新时钟。
- tb/tb_led_minimal.sv测试core，HALF_PERIOD=1及3，覆盖暂停、恢复、运行中复位。板级顶层复位与LED极性需要另做器件/板卡验收。

## 从干净目录运行

```sh
mkdir -p work
iverilog -g2012 -s tb_led_minimal -o work/led_sim rtl/led_minimal.v tb/tb_led_minimal.sv
vvp work/led_sim
yosys -p 'read_verilog rtl/led_minimal.v; hierarchy -check -top led_minimal; synth -top led_minimal; check -assert; stat; write_json work/led.json'
```

测试台预期输出PASS:45...，必须以实际日志为准；浏览器不会执行这些命令。综合JSON是通用逻辑网表，不是器件可下载文件。

## 约束、实现、下载

输入：实际器件型号、板卡原理图、振荡器频率、LED极性和电压。输出：与器件匹配的综合/实现报告及配置文件。先看网表中count反馈加法器、终值比较与led翻转寄存器；默认参数的计数宽度25位。

Vivado：按板卡核对XDC中的PACKAGE_PIN/IOSTANDARD；时钟例`create_clock -period 20 [get_ports clk]`仅适用50MHz。Quartus：QSF指定器件/引脚/I/O标准，SDC定义时钟，不混用XDC属性。Efinity：在Interface Designer中按器件映射I/O，时钟约束按对应版本配置。三家具体版本和操作见网站工具适配。本包不猜测任何引脚。

布局布线后检查未约束路径、DRC、setup/hold与时钟识别。外部复位的异步入口及同步释放要按厂商方法约束和检查，不用笼统false_path掩盖内部时序。生成配置文件后按器件/下载线连接下载；LED亮灭反了先查极性，不要先改计数算法。

验收顺序：记录板卡/工具版本→仿真正常与故意改错失败→综合资源→约束来源→实现DRC及max/min报告→下载→复位状态→观察多个完整闪烁周期→从干净目录重现。没有板卡时只记录已做的仿真与可用综合，其余明确待做。
