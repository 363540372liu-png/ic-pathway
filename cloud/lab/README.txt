芯路 · 数字 IC 入门计数器项目
================================

一、学习目标与规格
实现参数化无符号计数器。默认 WIDTH=8，必须为正整数。
输入：clk、rst_n、en；输出：count[WIDTH-1:0]。
上升沿触发；低有效同步复位；复位优先；使能时加一；否则保持；全1后回绕。
测试台用 WIDTH=4 加快回绕覆盖，综合顶层使用默认 WIDTH=8。

本项目到 RTL 功能验证与基础逻辑综合，不包含完整芯片后端或流片签核。
请先独立写设计、测试计划，再使用这些参考文件核对。

二、目录与前提
rtl/counter.v           参考设计
tb/tb_counter.sv        自检测试台，10 ns时钟，1ns/1ps精度声明
run_iverilog.sh         开源仿真流程
run_vcs.sh              学校VCS流程模板
filelist.f             相对 work/vcs 目录的源文件列表
run_dc.sh              学校DC流程入口
dc/run.tcl             基础综合流程模板
dc/constraints.sdc     明确标注假设的教学约束
work/                  运行时生成的日志、波形和综合输出

脚本需要Bash。Windows用户可在适用的Linux/WSL或学校环境运行，
也可按下面的直接命令使用自己已经安装好的工具。
压缩包不含商业软件、许可、PDK或标准单元库。

三、Icarus / GTKWave
安装方法按官方说明选择，不要下载来源不明的商业工具镜像。
先检查：iverilog -V、vvp -V；波形查看器：gtkwave --version。
在解压后的项目根目录执行：
  bash run_iverilog.sh
运行后查看 work/iverilog/compile.log、sim.log 和 counter.vcd。
  gtkwave work/iverilog/counter.vcd

也可以从项目根目录依次执行（上一条成功才执行下一条）：
  iverilog -g2012 -s tb_counter -o simv_iverilog rtl/counter.v tb/tb_counter.sv
  vvp simv_iverilog
  gtkwave counter.vcd

四、VCS
先按老师说明进入授权环境并加载相应工具配置。
核对 command -v vcs 与 vcs -help。版本相关选项以当前安装为准。
从项目根目录执行：
  bash run_vcs.sh
脚本在 work/vcs 内编译和运行，读取根目录 filelist.f。
输出：work/vcs/compile.log、sim.log、counter.vcd。
若要使用学校配置的Verdi/FSDB，按课程规定另外配置；这里使用标准VCD。

五、自检应覆盖的行为
启动复位、连续计数、使能关闭时保持、两次以上回绕、运行中复位、
复位优先、复位释放后的保持、同步复位在边沿前不改变输出、混合使能。
测试有超时保护，遇到X/Z也会失败。正确运行预计打印：
  PASS: counter WIDTH=4 checks=64
这是由测试台计划得出的预期输出，不能当成已经实测的日志。
请实际运行，并在练习副本中把“加一”改成“加二”，确认测试会失败。
不要修改检查器来让错误设计通过；验证完成后恢复正确副本。

六、DC：必须先确认库与单位
这个环境没有附带DC或商业单元库，命令尚需在学校安装版本验证。
拿到学校许可使用的实际.db标准单元库绝对路径，设置：
  export STDCELL_DB='/学校提供的实际路径/实际库.db'
不要原样使用这个占位路径，也不要把许可或商业库打包分享。

在DC环境中根据库文档或report_units核对时间、负载单位，
检查并调整dc/constraints.sdc里的每个假设：
  时钟10（假设时间单位ns，相当于100MHz）
  不确定性0.1；输入最大/最小延时1.0/0.2；输出最大/最小延时1.0/0.2
  输入/时钟转换时间0.1；输出负载0.01（按实际库电容单位解释）
这些数值只是教学预算，不代表真实板卡、接口或签核要求。
同步复位rst_n作为数据输入约束，没有随意加入false_path。
确认并必要时修改后，设置：
  export DC_UNITS_CONFIRMED=1
  bash run_dc.sh

输出在work/dc：
dc.log；reports/units.rpt、check_design*.rpt、check_timing*.rpt、
area.rpt、setup.rpt、hold.rpt、violations.rpt、qor.rpt；
netlist/counter_mapped.v、counter.ddc、counter.sdc。
必须阅读未解析引用、锁存器、未约束路径和重要警告。
脚本只检查基本输出存在，不把“有输出文件”标成时序通过。
面积/时序值必须来自自己的实际运行，不可填入示例或猜测数值。
门级仿真另需学校提供的对应Verilog单元模型；.db不能直接代替仿真模型。
本项目没有执行商业形式等价、带SDF门级仿真或物理签核。

七、验证状态（交付时）
网站课程结构、JS语法、资源路径、交互模型和脚本语法会做离线检查。
计数器RTL与testbench提供完整参考，但本次制作环境未安装HDL仿真器，
未实际运行Icarus/VCS/DC。因此不附带伪造PASS日志或综合结果。
请以你自己在对应环境的真实运行结果作为验收证据。

八、官方资料
Icarus：https://steveicarus.github.io/iverilog/usage/getting_started.html
安装：https://steveicarus.github.io/iverilog/usage/installation.html
GTKWave：https://gtkwave.github.io/gtkwave/
VCS：https://www.synopsys.com/verification/simulation/vcs.html
DC：https://www.synopsys.com/implementation-and-signoff/rtl-synthesis-test/design-compiler.html

九、提交记录
保存规格、源代码、测试计划、工具版本、实际命令、日志、波形、
库/约束说明及综合报告。写清楚尚未完成的检查，不附带密码或授权文件。
