# 完整课程路线 · 零基础复审版

保留56个ID（52主线、4选修）。前6课不要求写RTL，第7课内部按单模块→修改→一个实例→两个实例前进；第8课首次运行四组组合输入测试。casez/宏/多周期标明可后读，参数/generate、接口等标为进阶。

|序号|阶段|ID / 课程|前置ID|新概念与独立目标|
|---|---|---|---|---|
|1|1|orientation · 怎么学：先认识电路，再认识语言|无|按输入规则推导输出|
|2|1|numbers · bit、二进制与常量写法|orientation|从位权计算定宽数值|
|3|1|logic-gates · 与、或、非、异或：先画真值表|numbers|独立填写AND/OR/XOR真值表|
|4|1|boolean-decoder · 布尔代数与译码器：从真值表得到电路|logic-gates|用最小项得到独热输出|
|5|1|mindset · 先懂电路，再读代码|logic-gates|理解两条组合关系并存|
|6|1|storage · 电平与边沿：锁存器、触发器、寄存器|mindset|区分透明、边沿与保持|
|7|2|module · 从第一个与门到模块实例连接|mindset|独立写模块并连接两个实例|
|8|2|tool-start · 第一次编译与四组输入仿真|module|编译并运行最小组合仿真|
|9|2|net-var · wire、reg 与 assign|module|按驱动方式选择wire/reg|
|10|2|vectors · 向量、位选、切片与拼接|numbers、net-var|读写位选、切片与拼接|
|11|2|four-state · 0、1、X、Z 与初始化|net-var|区分未知与断线|
|12|2|operators · 算术、位运算、逻辑与比较|logic-gates、vectors、four-state|区分按位、逻辑与归约|
|13|2|width-sign · 位宽、截断与补码|operators|保存进位并正确符号扩展|
|14|2|casts · 符号转换：位串不变，解释可能变|width-sign|区分解释类型与改变位串|
|15|2|branches · begin/end、if/else 与组合逻辑|net-var、operators|写全组合MUX路径|
|16|2|case-latch · case、优先级与意外锁存器|branches|覆盖所有选择输入|
|17|2|casez · casez：通配规则与优先级|case-latch|理解优先级与通配风险|
|18|2|loops · for 循环：展开的是硬件还是时间？|case-latch、operators|把循环展开成组合计算|
|19|2|parameters · parameter、localparam 与 generate|loops、vectors|用参数确定硬件规模|
|20|2|functions · function：给组合计算起一个名字|parameters|给组合表达式命名|
|21|2|directives · 编译指令、宏与多文件边界|module、parameters|区分文本选择与运行条件|
|22|2|hierarchy · 多模块工程、层次与RTL task|functions、directives|理解子实例结果与整字运算|
|23|3|edges · 时钟边沿、D 触发器与逐拍读图|branches、case-latch|按上升沿推导DFF|
|24|3|nba · 阻塞 = 与非阻塞 <=|edges|推导两级寄存器旧值传递|
|25|3|reset · 同步复位、异步复位与使能|nba、branches|复位优先，释放后按使能加载|
|26|3|counter · 从规格到完整计数器|reset、width-sign|独立设计模计数与保持|
|27|3|shift-pulse · 移位寄存器与单周期边沿脉冲|counter、nba|用旧prev识别输入变化|
|28|3|alu · 小型 ALU：选择运算与保留进位|case-latch、width-sign|分别处理数据输出和进位|
|29|3|fsm · 有限状态机：当前状态与下一状态|counter、case-latch|当前状态经沿更新，next组合计算|
|30|3|moore-mealy · Moore与Mealy：沿间响应和输出寄存|fsm|区分沿间响应和状态输出|
|31|4|sv-logic · 迈入 SystemVerilog：logic 与 bit|net-var、four-state|理解四态变量与驱动限制|
|32|4|sv-always · always_comb、always_ff 与迁移|sv-logic、nba|按意图迁移组合和时序过程|
|33|4|sv-latch · always_latch：有意的锁存与意外漏赋值|sv-always|有意设计电平保持|
|34|4|sv-arrays · SystemVerilog 数组：位和元素要分清|sv-logic、vectors|区分位维与元素维|
|35|4|sv-types · typedef、enum、struct：给数据明确类型|sv-arrays、fsm|按字段计算packed位布局|
|36|4|sv-package · package、interface 与 modport：组织RTL接口|sv-types、hierarchy|分清包类型、接口对象和方向|
|37|5|testbench · 测试台、时间单位与激励|module、counter、tool-start|产生激励并确定观察时刻|
|38|5|scheduling · 事件调度、delta 与竞争：同一时刻不等于同时更新|testbench、nba|区分Active/NBA/槽末观察|
|39|5|checking · 自检、波形与第一次实际运行|testbench、four-state|写会失败的自检与超时|
|40|6|setup-hold · 建立/保持时间：边沿附近发生什么|edges、checking|从采样沿划出稳定窗口|
|41|6|timing-path · 寄存器路径、流水线与延迟|nba、setup-hold|分开延迟、吞吐和周期|
|42|6|clock-skew · Clock-to-Q、偏斜与Setup/Hold预算|setup-hold、timing-path|分别计算max/min裕量|
|43|6|multicycle · 多周期路径：先证明使能，再写例外|clock-skew|理解使能和例外的前提|
|44|6|cdc · 亚稳态与CDC：双触发器能做什么|clock-skew、nba|选择适合电平、脉冲、总线的方法|
|45|7|capstone · 贯穿练习：写、预测、仿真、再迁移|parameters、counter、checking、sv-always|把参数RTL与自检连起来|
|46|7|synthesis-lab · 从RTL到门级：Lint、资源与约束闭环|checking、capstone|从RTL表达式判断推断结构|
|47|7|memory · RAM/ROM：读延迟与读写冲突|sv-arrays、sv-always|按read-first规则推导读写|
|48|7|fifo-project · 项目一：可回归的同步FIFO|memory、counter、checking|按接受事件更新队列|
|49|7|async-fifo · 异步FIFO：数据留在RAM，指针跨域|cdc、fifo-project|解释跨域指针与本域存储|
|50|7|uart-project · 项目二：UART 8N1发送与自检|fsm、counter、checking|按8N1帧位和位时间发字节|
|51|7|sv-handshake · Ready / Valid：传输、背压与保持|checking、sv-always|只在valid与ready同沿为1传输|
|52|7|integration · Ready/Valid集成：背压、交付与工程验收|fifo-project、uart-project、sv-handshake、synthesis-lab|一拍缓冲能消费并替换|
|53|8|sv-tasks · 选修：用 task 和队列组织测试|checking|任务等待与队列模型|
|54|8|sv-verification · 选修：class、约束与随机输入|sv-tasks、sv-logic|检查randomize结果与命中|
|55|8|sv-assert · 选修：断言与覆盖的采样语义|sv-always、checking|按采样沿解释性质|
|56|8|advanced-map · 进阶地图：SVA、覆盖率、总线、ASIC与PPA|sv-assert、sv-verification、integration|规划后续验证与PPA学习|

## FPGA双项目

项目A（#fpga-led）：最小LED系统，九环节完整示范；项目B（#fpga-20开始）：UART接收与LED命令控制，复用工程方法。27个历史课程ID保留，20必修和7选修分别统计。RAM、FIFO、PWM、流水线、握手缓冲和数值专题放在独立选修目录，主线“下一步”跳过选修。

学习记录保留旧版完成并标明自评；封闭题自动核对、开放实现自查、真实仿真与板级验证分开。本站当前没有任意RTL仿真后端，后两类不自动点亮。
