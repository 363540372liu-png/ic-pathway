# 完整学习路线 · 教学修复评审版

56课：52课主线、4课选修。阶段→课程→知识点结构；保留原42课ID与历史进度。按知识点选择2–5项实质练习，不强制统一题型；填空需填写，Bug题需修改代码，波形题给出观察条件。

## 1. 数字电路与HDL入门

|课程ID|课程|前置知识|
|---|---|---|
|orientation|怎么学：先认识电路，再认识语言|无|
|numbers|bit、二进制与常量写法|orientation|
|logic-gates|与、或、非、异或：先画真值表|numbers|
|boolean-decoder|布尔代数与译码器：从真值表得到电路|logic-gates|
|mindset|先懂电路，再读代码|logic-gates|
|storage|电平与边沿：锁存器、触发器、寄存器|mindset|

## 2. Verilog语法

|课程ID|课程|前置知识|
|---|---|---|
|module|模块、端口与实例连接|mindset|
|tool-start|准备工具：先完成一次语法编译|module|
|net-var|wire、reg 与 assign|module|
|vectors|向量、位选、切片与拼接|numbers、net-var|
|four-state|0、1、X、Z 与初始化|net-var|
|operators|算术、位运算、逻辑与比较|logic-gates、vectors、four-state|
|width-sign|位宽、截断与补码|operators|
|casts|符号转换：位串不变，解释可能变|width-sign|
|branches|begin/end、if/else 与组合逻辑|net-var、operators|
|case-latch|case、优先级与意外锁存器|branches|
|casez|casez：通配规则与优先级|case-latch|
|loops|for 循环：展开的是硬件还是时间？|case-latch、operators|
|parameters|parameter、localparam 与 generate|loops、vectors|
|functions|function：给组合计算起一个名字|parameters|
|directives|编译指令、宏与多文件边界|module、parameters|
|hierarchy|多模块工程、层次与RTL task|functions、directives|

## 3. RTL基础设计

|课程ID|课程|前置知识|
|---|---|---|
|edges|时钟边沿、D 触发器与逐拍读图|branches、case-latch|
|nba|阻塞 = 与非阻塞 <=|edges|
|reset|同步复位、异步复位与使能|nba、branches|
|counter|从规格到完整计数器|reset、width-sign|
|shift-pulse|移位寄存器与单周期边沿脉冲|counter、nba|
|alu|小型 ALU：选择运算与保留进位|case-latch、width-sign|
|fsm|有限状态机：当前状态与下一状态|counter、case-latch|
|moore-mealy|Moore与Mealy：沿间响应和输出寄存|fsm|

## 4. SystemVerilog RTL

|课程ID|课程|前置知识|
|---|---|---|
|sv-logic|迈入 SystemVerilog：logic 与 bit|net-var、four-state|
|sv-always|always_comb、always_ff 与迁移|sv-logic、nba|
|sv-latch|always_latch：有意的锁存与意外漏赋值|sv-always|
|sv-arrays|SystemVerilog 数组：位和元素要分清|sv-logic、vectors|
|sv-types|typedef、enum、struct：给数据明确类型|sv-arrays、fsm|
|sv-package|package、interface 与 modport：组织RTL接口|sv-types、hierarchy|

## 5. 仿真与验证

|课程ID|课程|前置知识|
|---|---|---|
|testbench|测试台、时间单位与激励|module、counter、tool-start|
|scheduling|事件调度、delta 与竞争：同一时刻不等于同时更新|testbench、nba|
|checking|自检、波形与第一次实际运行|testbench、four-state|

## 6. 同步设计与时序

|课程ID|课程|前置知识|
|---|---|---|
|setup-hold|建立/保持时间：边沿附近发生什么|edges、checking|
|timing-path|寄存器路径、流水线与延迟|nba、setup-hold|
|clock-skew|Clock-to-Q、偏斜与Setup/Hold预算|setup-hold、timing-path|
|multicycle|多周期路径：先证明使能，再写例外|clock-skew|
|cdc|亚稳态与CDC：双触发器能做什么|clock-skew、nba|
|async-fifo|异步FIFO：数据留在RAM，指针跨域|cdc、sv-arrays|

## 7. 综合与工程实践

|课程ID|课程|前置知识|
|---|---|---|
|capstone|贯穿练习：写、预测、仿真、再迁移|parameters、counter、checking、sv-always|
|synthesis-lab|从RTL到门级：Lint、资源与约束闭环|checking、capstone|
|memory|RAM/ROM：读延迟与读写冲突|sv-arrays、sv-always|
|fifo-project|项目一：可回归的同步FIFO|memory、counter、checking|
|uart-project|项目二：UART 8N1发送与自检|fsm、counter、checking|
|sv-handshake|Ready / Valid：传输、背压与保持|checking、sv-always|
|integration|Ready/Valid集成：背压、交付与工程验收|fifo-project、uart-project、sv-handshake、synthesis-lab|

## 8. 高级选修

|课程ID|课程|前置知识|
|---|---|---|
|sv-tasks|选修：用 task 和队列组织测试|checking|
|sv-verification|选修：class、约束与随机输入|sv-tasks、sv-logic|
|sv-assert|选修：断言与覆盖的采样语义|sv-always、checking|
|advanced-map|进阶地图：SVA、覆盖率、总线、ASIC与PPA|sv-assert、sv-verification、integration|

保留原24课参考内容与27个FPGA课程ID。图像比赛项目已删除，旧入口回到通用FPGA工程实践。sv-package与sv-handshake保留ID，分别回到阶段4和7；不再让基础RTL依赖高级验证。

每节课的概念、代码和练习是知识点入口。完成状态为自评，封闭题自动评分，开放代码必须结合真实工具证据。完整异步FIFO硬件建议使用验证IP，本课提供原理、Gray模块与约束边界；UVM/总线/ASIC/PPA为选修概览，不标称完整工业签核训练。
