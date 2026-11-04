# 本轮教学路线与实施边界

42个实质课程节点，原有课程ID保留；37个核心节点、5个选修节点。六个P0精讲课有完整原理、电路、行解释、错误修正和五级练习。其他课程已迁入统一阅读模板，教学深度仍按审计矩阵继续补齐，不能把课数当成“全面完成”。

## 1. 数字电路与HDL入门

| 课程ID | 课程 | 前置知识 | 本轮深度 |
|---|---|---|---|
|orientation|怎么学：先认识电路，再认识语言|无|基础讲解；继续按覆盖矩阵补强|
|numbers|bit、二进制与常量写法|orientation|基础讲解；继续按覆盖矩阵补强|
|logic-gates|与、或、非、异或：先画真值表|numbers|基础讲解；继续按覆盖矩阵补强|
|mindset|先懂电路，再读代码|logic-gates|基础讲解；继续按覆盖矩阵补强|
|storage|电平与边沿：锁存器、触发器、寄存器|mindset|基础讲解；继续按覆盖矩阵补强|

## 2. Verilog语法

| 课程ID | 课程 | 前置知识 | 本轮深度 |
|---|---|---|---|
|module|模块、端口与实例连接|mindset|基础讲解；继续按覆盖矩阵补强|
|tool-start|准备工具：先完成一次语法编译|module|基础讲解；继续按覆盖矩阵补强|
|net-var|wire、reg 与 assign|module|基础讲解；继续按覆盖矩阵补强|
|vectors|向量、位选、切片与拼接|numbers、net-var|基础讲解；继续按覆盖矩阵补强|
|four-state|0、1、X、Z 与初始化|net-var|基础讲解；继续按覆盖矩阵补强|
|operators|算术、位运算、逻辑与比较|logic-gates、vectors、four-state|基础讲解；继续按覆盖矩阵补强|
|width-sign|位宽、截断与补码|operators|基础讲解；继续按覆盖矩阵补强|
|casts|符号转换：位串不变，解释可能变|width-sign|基础讲解；继续按覆盖矩阵补强|
|branches|begin/end、if/else 与组合逻辑|net-var、operators|P0精讲|
|case-latch|case、优先级与意外锁存器|branches|基础讲解；继续按覆盖矩阵补强|
|casez|casez：通配规则与优先级|case-latch|基础讲解；继续按覆盖矩阵补强|
|loops|for 循环：展开的是硬件还是时间？|case-latch、operators|基础讲解；继续按覆盖矩阵补强|
|parameters|parameter、localparam 与 generate|loops、vectors|基础讲解；继续按覆盖矩阵补强|
|functions|function：给组合计算起一个名字|parameters|基础讲解；继续按覆盖矩阵补强|
|directives|编译指令、宏与多文件边界|module、parameters|基础讲解；继续按覆盖矩阵补强|

## 3. RTL基础设计

| 课程ID | 课程 | 前置知识 | 本轮深度 |
|---|---|---|---|
|edges|时钟边沿、D 触发器与逐拍读图|branches、case-latch|P0精讲|
|nba|阻塞 = 与非阻塞 <=|edges|P0精讲|
|reset|同步复位、异步复位与使能|nba、branches|基础讲解；继续按覆盖矩阵补强|
|counter|从规格到完整计数器|reset、width-sign|P0精讲|
|shift-pulse|移位寄存器与单周期边沿脉冲|counter、nba|基础讲解；继续按覆盖矩阵补强|
|alu|小型 ALU：选择运算与保留进位|case-latch、width-sign|基础讲解；继续按覆盖矩阵补强|
|fsm|有限状态机：当前状态与下一状态|counter、case-latch|P0精讲|

## 4. SystemVerilog RTL

| 课程ID | 课程 | 前置知识 | 本轮深度 |
|---|---|---|---|
|sv-logic|迈入 SystemVerilog：logic 与 bit|net-var、four-state|基础讲解；继续按覆盖矩阵补强|
|sv-always|always_comb、always_ff 与迁移|sv-logic、nba|P0精讲|
|sv-arrays|SystemVerilog 数组：位和元素要分清|sv-logic、vectors|基础讲解；继续按覆盖矩阵补强|
|sv-types|typedef、enum、struct：给数据明确类型|sv-arrays、fsm|基础讲解；继续按覆盖矩阵补强|

## 5. 仿真与验证

| 课程ID | 课程 | 前置知识 | 本轮深度 |
|---|---|---|---|
|testbench|测试台、时间单位与激励|module、counter、tool-start|基础讲解；继续按覆盖矩阵补强|
|scheduling|事件调度、delta 与竞争：同一时刻不等于同时更新|testbench、nba|基础讲解；继续按覆盖矩阵补强|
|checking|自检、波形与第一次实际运行|testbench、four-state|基础讲解；继续按覆盖矩阵补强|

## 6. 同步设计与时序

| 课程ID | 课程 | 前置知识 | 本轮深度 |
|---|---|---|---|
|setup-hold|建立/保持时间：边沿附近发生什么|edges、checking|基础讲解；继续按覆盖矩阵补强|
|timing-path|寄存器路径、流水线与延迟|nba、setup-hold|基础讲解；继续按覆盖矩阵补强|

## 7. 综合与工程实践

| 课程ID | 课程 | 前置知识 | 本轮深度 |
|---|---|---|---|
|capstone|贯穿练习：写、预测、仿真、再迁移|parameters、counter、checking、sv-always|基础讲解；继续按覆盖矩阵补强|

复用原24课中 synthesis → libraries → constraints → dc-run → post-synthesis → project → acceptance，保留Linux/VCS工具课。FPGA路线已有RAM/FIFO/UART实践；本轮不假称已把它们重写成连续教材。

## 8. 高级专题（选修）

| 课程ID | 课程 | 前置知识 | 本轮深度 |
|---|---|---|---|
|sv-tasks|选修：用 task 和队列组织测试|checking|基础讲解；继续按覆盖矩阵补强|
|sv-handshake|选修：valid / ready 到底何时传一次？|sv-always、counter|基础讲解；继续按覆盖矩阵补强|
|sv-package|选修：package、interface 与 modport|sv-handshake、sv-types|基础讲解；继续按覆盖矩阵补强|
|sv-verification|选修：class、约束与随机输入|sv-tasks、sv-logic|基础讲解；继续按覆盖矩阵补强|
|sv-assert|选修：断言与覆盖的采样语义|sv-always、checking|基础讲解；继续按覆盖矩阵补强|

## 后续优先级

- P1：布尔代数/译码器、层次引用完整工程、always_latch例题、Moore/Mealy对照、SV package与interface完整RTL、skew/多周期/hold交互、CDC与异步FIFO边界、UART/FIFO项目连续路线。
- P2：完整SVA/覆盖率驱动验证、UVM概览、总线、ASIC/PPA专题、受限沙箱后端仿真。
- 不创建未写内容的空课程入口；P1/P2仅在文档中标记，不以完成状态展示。
