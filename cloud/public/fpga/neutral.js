// Tool adapters are explicit teaching data. They never rewrite the common lesson text.
(()=>{
const tools={
 vivado:{name:'AMD Vivado',version:'2024.1 文档流程',verified:'本轮未运行Vivado、Hardware Manager或实际板卡；菜单和命令以安装版本核对。',format:'工程 .xpr；物理/时序约束 .xdc；常见非Versal器件配置 .bit',debug:'ILA / VIO（AMD专用IP）',source:'https://docs.amd.com/r/2024.1-English/ug904-vivado-implementation/Running-Implementation-in-Steps',
 stages:{
  1:{title:'设计源与仿真源分组',steps:['New Project选择RTL工程，器件由板卡资料确认；不要选猜测的开发板。','Design Sources加入uart_rx、command_led、uart_led_top；Simulation Sources另加tb_uart_led。','综合top选uart_led_top，仿真top选tb_uart_led；检查相对路径和参数。'],command:'read_verilog {rtl/uart_rx.v rtl/command_led.v rtl/uart_led_top.v}\n# synth_design -top uart_led_top -part <实际完整part>'},
  2:{title:'行为仿真',steps:['先选择tb_uart_led作为simulation top，再运行Behavioral Simulation。','波形检查rx_valid、rx_data和led_state；$fatal/超时出现时先定位第一个错误。','xvlog/xelab/xsim为Vivado模拟器工具链，不是通用Verilog语言命令。'],command:'xvlog --sv rtl/uart_rx.v rtl/command_led.v rtl/uart_led_top.v tb/tb_uart_led.sv\nxelab tb_uart_led -s uart_led_sim\nxsim uart_led_sim -runall'},
  3:{title:'综合与网表',steps:['运行Synthesis后打开Synthesized Design。','用Utilization查看LUT/FF等资源，检查被裁剪逻辑、锁存和宽度告警。','追踪LED输出扇入及接收器计数比较，区分RTL示意图和映射网表。'],command:'synth_design -top uart_led_top -part <实际完整part>\nreport_utilization\nreport_timing_summary'},
  4:{title:'XDC：时钟与器件I/O',steps:['按真实频率创建clk；引脚与IOSTANDARD来自板卡原理图和bank供电。','PACKAGE_PIN和IOSTANDARD是AMD属性，不复制到其他厂商工程。','对异步输入同步链核对CDC及精确例外；不能全局屏蔽接收器时序。'],command:'# 例：仅当实际时钟确为50MHz\ncreate_clock -name sys_clk -period 20.000 [get_ports clk]\n# set_property PACKAGE_PIN <实际封装号> [get_ports led_pin]\n# set_property IOSTANDARD <实际bank支持标准> [get_ports led_pin]'},
  5:{title:'实现与规则/时序检查',steps:['综合后的同一设计依次完成优化、放置和布线。','分别检查DRC、setup/hold、未约束路径和时钟；一个绿色运行图标不代替这些报告。','若修改引脚或逻辑，重新运行依赖阶段，不混用旧报告。'],command:'opt_design\nplace_design\nroute_design\nreport_drc\nreport_timing_summary\nreport_utilization'},
  6:{title:'生成与下载',steps:['非Versal常见流程为write_bitstream生成.bit；器件系列可能采用不同镜像格式。','Hardware Manager识别目标后选择同器件同版本文件下载。','Flash持久化还需适配器件、存储型号和启动模式，不能把临时配置当掉电启动。'],command:'# 在完成实现并检查报告后\nwrite_bitstream -force build/uart_led.bit'},
  7:{title:'片内调试',steps:['使用ILA/VIO时选择正确采样时钟、探针与触发。','修改调试IP后重新实现并核对时序。','先看物理RX位时间，再看片内state/data/valid，逐段缩小问题。'],command:'# ILA/VIO为AMD专用IP；按UG908与实际版本配置。'},
  8:{title:'可复现交付',steps:['导出Tcl与相对路径源文件，记录实际part和工具版本。','保存同次运行的DRC、Timing Summary、Utilization及配置校验值。','从干净目录重建，再执行固定UART命令与复位序列。'],command:'# 同时保留源、XDC、构建脚本、版本和报告索引。'}
 }},
 quartus:{name:'Altera / Intel Quartus Prime',version:'Pro 25.1 Timing Analyzer 文档；Standard器件流程需按安装版核对',verified:'本轮未运行Quartus、Fitter、Programmer或SignalTap；Standard/Pro及器件支持存在差异。',format:'工程 .qpf/.qsf；时序 .sdc；常见临时配置 .sof；持久配置格式依器件/存储选择',debug:'SignalTap（Quartus专用）',source:'https://www.intel.com/content/www/us/en/docs/programmable/683243/25-1/create-clock-create-clock.html',
 stages:{
  1:{title:'QPF/QSF与源集合',steps:['New Project Wizard建立工程，top选uart_led_top，器件从实际手册填写。','QSF列设计Verilog文件；测试台通过仿真设置选择，不作为综合top。','不同版本的仿真器集成可能不同，也可以用独立Icarus先完成通用功能自检。'],command:'# QSF示意：占位值必须替换\nset_global_assignment -name TOP_LEVEL_ENTITY uart_led_top\nset_global_assignment -name VERILOG_FILE rtl/uart_rx.v\nset_global_assignment -name VERILOG_FILE rtl/command_led.v\nset_global_assignment -name VERILOG_FILE rtl/uart_led_top.v'},
  2:{title:'先完成工具无关功能仿真',steps:['使用本项目run-sim.sh进行Icarus自检，或按本机安装的Questa等模拟器建立TB。','Quartus本身的编译成功不是测试台运行结果。','仿真顶层保持tb_uart_led，设计顶层保持uart_led_top。'],command:'mkdir -p build\niverilog -g2012 -s tb_uart_led -o build/sim -f files.f\nvvp build/sim'},
  3:{title:'Analysis & Synthesis与资源',steps:['运行Analysis & Synthesis，确认top和器件参数。','从Compilation Report查看寄存器、组合资源及推断结果。','Technology Map Viewer等视图随版本变化，沿LED输出追踪逻辑关系。'],command:'# 需要有效QPF/QSF与实际器件设置\nquartus_map uart_led'},
  4:{title:'QSF位置与SDC时间约束分开',steps:['Pin Planner或QSF分配封装位置与I/O标准，Standard/Pro和器件名称以本机支持为准。','SDC创建clk并加入工程；在Timing Analyzer临时建立的约束需正确保存/纳入构建。','QSF的set_location_assignment不是XDC PACKAGE_PIN。'],command:'# QSF示意，禁止原样用于未确认板卡\n# set_location_assignment <实际PIN_编号> -to led_pin\n# set_instance_assignment -name IO_STANDARD "<实际支持标准>" -to led_pin\nset_global_assignment -name SDC_FILE constraints/clock.sdc\n# clock.sdc（仅实际50MHz时）：\n# create_clock -name sys_clk -period 20.000 [get_ports {clk}]'},
  5:{title:'Fitter与Timing Analyzer',steps:['Fitter完成目标器件的放置与布线。','Timing Analyzer分别检查setup、hold、时钟与未约束路径；不要只看资源使用率。','不同器件/版本可能采用更多细分阶段，保留本次实际流程和报告。'],command:'quartus_fit uart_led\nquartus_sta uart_led'},
  6:{title:'Assembler与Programmer',steps:['Assembler生成配置；常见.sof用于临时配置。','Programmer确认硬件、器件和链后下载。','需要掉电恢复时选择器件支持的Flash流程及格式，不把.sof简单重命名。'],command:'quartus_asm uart_led\n# Programmer的线缆/链/Flash设置需按实际硬件选择。'},
  7:{title:'SignalTap定位',steps:['给SignalTap指定采样时钟和触发，加入探针后重新编译。','比较外部串口位时间与内部valid/data。','诊断优先从复位、时钟、引脚和极性开始。'],command:'# SignalTap为Quartus专用；按对应版本文档设置。'},
  8:{title:'工程与报告交付',steps:['保存QPF/QSF/SDC、相对源路径和工具版本。','将Fitter、Timing Analyzer、资源与配置文件对应同一源码。','记录模拟器和板测条件，保留未执行项。'],command:'# 从干净目录重建，不依赖工作站旧db缓存。'}
 }},
 efinity:{name:'Efinix Efinity',version:'2026.1.132 产品资料；Timing Closure Guide v7.6 / CLI Guide v1.1',verified:'本轮未运行Efinity GUI、Interface Designer、Programmer或板卡。下列为文档对照教学，不是实测日志。',format:'Efinity工程及Interface Designer接口配置；时序SDC支持需核对版本；配置格式随器件与模式选择',debug:'Efinity Debugger / 调试逻辑（依器件与版本）',source:'https://www.efinixinc.com/support/docs.php?p=e',
 stages:{
  1:{title:'工程与目标器件',steps:['在Efinity建立工程，选择实际器件、封装与速度等级。','添加三个RTL设计源并指定uart_led_top；测试台用于独立模拟器。','把工程配置和接口配置纳入版本管理，记录相对路径。'],command:'# 不提供未经本轮工具验证的CLI参数；以安装版CLI Guide为准。'},
  2:{title:'独立功能仿真',steps:['先用本项目Icarus文件列表仿真，核对UART与LED逻辑。','厂商综合流程通过不等于TB通过。','器件原语/IP进入设计后，需要对应仿真模型与库设置。'],command:'mkdir -p build\niverilog -g2012 -s tb_uart_led -o build/sim -f files.f\nvvp build/sim'},
  3:{title:'综合与资源映射',steps:['运行实际版本的Synthesis流程，检查top、参数与源集合。','阅读逻辑、寄存器和存储/算术资源报告，追踪异常裁剪。','结果仅对选定Efinix器件与配置有效，不套用AMD LUT统计单位。'],command:'# 在GUI/已核对CLI执行综合，保存实际版本和报告。'},
  4:{title:'Interface Designer与时钟约束',steps:['在Interface Designer配置GPIO、方向、电气标准及封装连接。','时钟输入和时钟资源按器件接口配置，再核对设计中clk的时序约束。','不复制XDC PACKAGE_PIN或Quartus PIN_写法；查看当前版本支持的SDC对象与命令。'],command:'# Interface Designer生成的接口配置是Efinix专属输入。\n# create_clock等命令须对照当前Timing Closure Guide支持范围。'},
  5:{title:'布局布线与时序收敛',steps:['运行项目的物理实现流程，读取布局布线状态和首个错误。','分别查资源、时钟、setup/hold及未约束路径。','接口配置变化后重建相关结果，不能仅复用旧配置文件。'],command:'# 按本机2026.1流程执行并保存实际报告；这里不伪造命令输出。'},
  6:{title:'位流与器件配置',steps:['生成与目标器件及接口配置匹配的位流。','Programmer选择正确下载器、器件和配置方式。','临时下载与掉电启动分开测试，Flash/启动模式以具体板卡资料为准。'],command:'# 配置扩展名、Flash器件和下载参数按目标器件确认。'},
  7:{title:'分段调试',steps:['先查板上时钟、复位、串口电平和LED极性。','需要片内观察时对照器件支持与Efinity调试文档配置探针。','加入调试逻辑后重新实现，检查时序与资源影响。'],command:'# 调试功能/原语非跨厂商通用模块。'},
  8:{title:'可复现工程',steps:['保存RTL、工程、接口配置、约束和版本。','报告、位流与源码标识逐一对应。','从干净目录重建，并明确区分仿真通过、实现结果和板级结果。'],command:'# 用实际版本支持的导出/构建方式复现。'}
 }}
};
window.IC_FPGA_TOOLS=tools;
})();
