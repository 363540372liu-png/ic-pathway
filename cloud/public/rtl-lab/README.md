# RTL项目练习包

这是可下载后在本机执行的工程，不是网页在线编译器。RTL与教材中的memory、fifo-project、uart-project、integration和capstone保持一致。

## 运行

安装Icarus Verilog后，在此目录执行：

```sh
iverilog -g2012 -s tb_engineering -o sim memory.sv fifo-project.sv uart-project.sv integration.sv tb_engineering.sv
vvp sim
```

检查器失败会调用`$fatal(1,...)`。需要波形时在TB加入`$dumpfile`/`$dumpvars`，再用GTKWave打开。计数器capstone另按课程规格编写TB；不要把本TB声称为计数器全覆盖。

## 规格与结构

- RAM：16×8，同步写/同步读，同址读写为read-first，无数据复位。
- FIFO：深度4、8位、首字直通；满时同时请求仅接受读，空时仅接受写，不旁路；空时dout无效。
- UART：8N1、LSB-first、整数CLKS_PER_BIT>=1；空闲接受start，busy忽略start，复位tx=1/busy=0。start需脉冲。
- Ready/Valid：一拍弹性寄存器，背压时valid/data保持，允许同沿消费与替换；同域使用。

## 验证与验收

本TB检查RAM冲突、FIFO满空/顺序/回绕、RV保持/替换、UART全部256字节的每位持续4周期与复位。它不包含物理时序、CDC模拟、UART接收器、波特率容差或板级电平检查。

仓库另用Yosys CXXRTL对完全相同的四模块进行了12000周期功能回归，并通过FIFO满保护、UART位序的负例检测。CXXRTL是二态可综合模型，不能替代四态事件仿真。本SV测试台已做语法/展开检查，具体模拟器运行结果应以自己的实际日志为准。

交付要求：规格与接口表、结构图、完整文件列表、测试命令/版本、首次失败与修复记录、真实结果。综合需记录资源、锁存/多驱动告警、max/min时序与约束覆盖；FPGA还需引脚、电平、时钟、布局布线及板上证据。未运行项如实写“未运行”。

调试从第一个失败事务开始：先查输入是否被接受，再查状态/指针，再查输出相位，最后查检查器是否符合本包的边界策略。错误注入后必须让检查器失败，不能只展示一张正常波形。
