(function(root){
const modules=[
 ['01','FPGA 是什么',8,'基础','bits'],['02','第一个 Vivado 工程',9,'工具','module'],['03','用仿真验证 RTL',10,'仿真','testbench'],
 ['04','综合：从 RTL 到逻辑网表',11,'综合','synthesis'],['05','读懂 RTL 与综合原理图',11,'综合','combinational'],['06','LUT / FF / BRAM / DSP',12,'资源','width'],
 ['07','XDC：给实现写清约束',13,'约束','constraints'],['08','把端口接到正确引脚',14,'约束','module'],['09','LED 与按钮：第一次板级实验',14,'板级','sequential'],
 ['10','计数器与时钟使能',15,'实践','counter'],['11','可暂停的流水灯',16,'实践','fsm'],['12','UART：一根线传一个字节',17,'串口','testbench'],
 ['13','实现 UART TX',18,'串口','fsm'],['14','实现 UART RX',18,'串口','selfcheck'],['15','PWM：占空比与亮度',19,'外设','counter'],
 ['16','GPIO 与简单外围控制',20,'外设','sequential'],['17','建立与保持：时序入门',21,'时序','constraints'],['18','资源利用率与设计取舍',21,'资源','dc-run'],
 ['19','把 Vivado 报告连起来读',22,'报告','post-synthesis'],['20','迷你项目：UART 控制 LED',23,'项目','project'],['21','从源码到板卡的完整交付',24,'交付','acceptance']
].map(([id,title,main,group,bridge],i)=>({id,title,main,group,bridge,previous:i?String(i).padStart(2,'0'):null}));
const ultras=[{id:'led',title:'UF1 · 可控 LED 系统',after:'11',main:16},{id:'uart',title:'UF2 · UART 控制与独立交付',after:'21',main:24}];
const future=[{id:'autonomous',title:'自主 FPGA 项目',topics:'PYNQ · Zynq · PS / PL · AXI · Overlay'},{id:'embodied',title:'具身智能',topics:'传感接口 · 电机控制 · AI PC 通信 · 软硬件闭环'},{id:'agent',title:'RTL / HLS 本地 Agent',topics:'Vivado CLI · xvlog / xelab / xsim · 自动化 EDA · Docker'}];
root.IC_FPGA_CATALOG={modules,ultras,future};
})(typeof window==='undefined'?globalThis:window);
