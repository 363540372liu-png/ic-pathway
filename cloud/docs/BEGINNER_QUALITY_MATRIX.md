# 零基础教学质量复审 · 修改前问题矩阵

基线：2950746（与 GitHub main c953c97 的 cloud 内容对应）。此次按正文、代码和每题需求重新阅读；旧报告不是验收依据。以下“修复”仅表示本轮改动位置，不意味着真实学生试学已通过。

|课序/ID|可独立完成的目标|修改前的语义问题|本轮修复/迁移情境|
|---|---|---|---|
|1 orientation|按输入规则推导输出|工程术语先于电路经验|两个开关的四行真值表；hdl-content.js / textbook-depth.js|
|2 numbers|从位权计算定宽数值|示例提前要求module/assign|位权相加与截断对照；hdl-content.js / textbook-depth.js|
|3 logic-gates|独立填写AND/OR/XOR真值表|代码前必须先形成逻辑关系|同为1与恰一为1的反例；hdl-content.js / textbook-depth.js|
|4 boolean-decoder|用最小项得到独热输出|总线下标先于向量课|先讲两位地址并改为逻辑规格；hdl-content.js / textbook-depth.js|
|5 mindset|理解两条组合关系并存|assign早于语言教学|只推信号关系，语法留到模块课；hdl-content.js / textbook-depth.js|
|6 storage|区分透明、边沿与保持|需避免借if解释未学概念|沿间改变D的反例；hdl-content.js / textbook-depth.js|
|7 module|独立写模块并连接两个实例|wire/assign未教就要求多实例，严重断层|先完整AND，再改OR/XOR，最后两级AND；hdl-content.js / textbook-depth.js|
|8 tool-start|编译并运行最小组合仿真|只检查语法，不能观察功能|提供四组合自检TB及完整命令；hdl-content.js / textbook-depth.js|
|9 net-var|按驱动方式选择wire/reg|首次always缺过程与事件解释|同一与门两种写法逐输入对照；hdl-content.js / textbook-depth.js|
|10 vectors|读写位选、切片与拼接|位编号和数值权重需对应|A5切片与半字节交换；hdl-content.js / textbook-depth.js|
|11 four-state|区分未知与断线|首次if/$fatal早于分支课|本课只算四态逻辑，检查代码移到checking；hdl-content.js / textbook-depth.js|
|12 operators|区分按位、逻辑与归约|同输入对照不够突出|1010/0101预测，括号反例；hdl-content.js / textbook-depth.js|
|13 width-sign|保存进位并正确符号扩展|左值宽度规则不可简单泛化|显式扩宽和负数补位；hdl-content.js / textbook-depth.js|
|14 casts|区分解释类型与改变位串|转换前后宽度容易混为一谈|1000扩展为F8或08；hdl-content.js / textbook-depth.js|
|15 branches|写全组合MUX路径|Bug题照抄课堂漏else|新双输出路径练习；hdl-content.js / textbook-content.js|
|16 case-latch|覆盖所有选择输入|错误题与示范相同|新告警译码的遗漏输出；hdl-content.js / textbook-depth.js|
|17 casez|理解优先级与通配风险|高级语法不应打断初学主线|标为进阶，重叠项优先级；hdl-content.js / textbook-depth.js|
|18 loops|把循环展开成组合计算|不能把累加步骤当时钟周期|新的四位或归约修复；hdl-content.js / textbook-depth.js|
|19 parameters|用参数确定硬件规模|generate与运行循环混淆|先参数宽度，再进阶展开；hdl-content.js / textbook-depth.js|
|20 functions|给组合表达式命名|函数返回名和调用关系不清|减一函数返回值修复；hdl-content.js / textbook-depth.js|
|21 directives|区分文本选择与运行条件|宏污染作用域未被具体解释|保护宏与#undef的作用；hdl-content.js / textbook-depth.js|
|22 hierarchy|理解子实例结果与整字运算|拆字节加法漏跨半字节进位|0F+01的反例；hdl-content.js / textbook-depth.js|
|23 edges|按上升沿推导DFF|<=在NBA课前出现|本课先教采样后更新的最小语义；hdl-content.js / textbook-content.js|
|24 nba|推导两级寄存器旧值传递|修复题照抄两级赋值示例|三位移位寄存器方向错误；hdl-content.js / textbook-content.js|
|25 reset|复位优先，释放后按使能加载|异步复位声明与同步规格混用风险|同步计数使能的新优先级场景；hdl-content.js / textbook-depth.js|
|26 counter|独立设计模计数与保持|课堂和考题均为两个if|新模6终值比较错误；hdl-content.js / textbook-content.js|
|27 shift-pulse|用旧prev识别输入变化|脉冲方向和同步前提需清楚|下降沿检测迁移；hdl-content.js / textbook-depth.js|
|28 alu|分别处理数据输出和进位|复用课堂缺carry默认值|新XOR分支错误运算；hdl-content.js / textbook-depth.js|
|29 fsm|当前状态经沿更新，next组合计算|默认保持不能跳过推导|RUN未等finish就退出的新错误；hdl-content.js / textbook-content.js|
|30 moore-mealy|区分沿间响应和状态输出|输出寄存并不自动等于原状态Moore|新11序列检测极性错误；hdl-content.js / textbook-depth.js|
|31 sv-logic|理解四态变量与驱动限制|logic并非自动解决多个过程驱动|位类型截断与X丢失；hdl-content.js / textbook-depth.js|
|32 sv-always|按意图迁移组合和时序过程|关键字不补全遗漏分支|组合过程漏敏感信号迁移；hdl-content.js / textbook-content.js|
|33 sv-latch|有意设计电平保持|不应把所有漏赋值改成锁存|新低电平透明锁存器；hdl-content.js / textbook-depth.js|
|34 sv-arrays|区分位维与元素维|固定4字节练习照抄示范|新8个16位元素容量；hdl-content.js / textbook-depth.js|
|35 sv-types|按字段计算packed位布局|修复题完整复用课堂结构|新两字段顺序颠倒；hdl-content.js / textbook-depth.js|
|36 sv-package|分清包类型、接口对象和方向|虽然不考握手仍提前使用valid/ready名字|换为不带协议的采样接口；hdl-content.js / textbook-depth.js|
|37 testbench|产生激励并确定观察时刻|always #5被当普通赋值解释|完整解释重复、延迟、翻转和单位；hdl-content.js / textbook-depth.js|
|38 scheduling|区分Active/NBA/槽末观察|delta cycle不等于真实传播延迟|明确#0不能跨NBA；hdl-content.js / textbook-depth.js|
|39 checking|写会失败的自检与超时|错误时只给完整答案|未知输出、错误注入与独立预期；hdl-content.js / textbook-depth.js|
|40 setup-hold|从采样沿划出稳定窗口|不能把理想RTL当物理时序|变化位置与窗口边界；hdl-content.js / textbook-depth.js|
|41 timing-path|分开延迟、吞吐和周期|首拍流水值要说明初始化假设|旧s1参与第二级计算；hdl-content.js / textbook-depth.js|
|42 clock-skew|分别计算max/min裕量|公式符号与到达时间需要推导|正偏斜帮助setup而压缩hold；hdl-content.js / textbook-depth.js|
|43 multicycle|理解使能和例外的前提|不能用约束修改电路功能|源稳定与捕获使能表；hdl-content.js / textbook-depth.js|
|44 cdc|选择适合电平、脉冲、总线的方法|ASYNC_REG属性不是跨厂商保证|明确AMD属性及慢电平边界；hdl-content.js / textbook-depth.js|
|45 async-fifo|解释跨域指针与本域存储|RAM/FIFO尚未学，严重断层|移到同步FIFO后，新增两域操作例；hdl-content.js / textbook-depth.js|
|46 capstone|把参数RTL与自检连起来|自查材料不等于真实仿真|参数边界与错误注入；hdl-content.js / textbook-depth.js|
|47 synthesis-lab|从RTL表达式判断推断结构|源码形式不能保证最终资源数量|MUX后加法器与报告对应；hdl-content.js / textbook-depth.js|
|48 memory|按read-first规则推导读写|下游同沿仍见旧rdata|同址5A写A5的两沿推导；hdl-content.js / textbook-depth.js|
|49 fifo-project|按接受事件更新队列|FWFT与寄存输出不同|非空沿前读队首及满边界；hdl-content.js / textbook-depth.js|
|50 uart-project|按8N1帧位和位时间发字节|忙期间读取新data会混帧|锁存帧和位索引关系；hdl-content.js / textbook-depth.js|
|51 sv-handshake|只在valid与ready同沿为1传输|自查不是自动功能验证|背压中保持数据的新练习；hdl-content.js / textbook-depth.js|
|52 integration|一拍缓冲能消费并替换|旧记录不应被升级为仿真通过|同时取A装B的时序推导；hdl-content.js / textbook-depth.js|
|53 sv-tasks|任务等待与队列模型|任务并发不代表驱动仲裁|两个待检查输出的队列顺序；hdl-content.js / textbook-depth.js|
|54 sv-verification|检查randomize结果与命中|随机次数不保证覆盖|无解约束的新调试场景；hdl-content.js / textbook-depth.js|
|55 sv-assert|按采样沿解释性质|不能把SVA行当时序赋值|前件后件采样及复位取消区别；hdl-content.js / textbook-depth.js|
|56 advanced-map|规划后续验证与PPA学习|概览不等于独立工业签核能力|覆盖与正确性反例；hdl-content.js / textbook-depth.js|

确认：44道填空使用同一通用任务措辞；32道修复题沿用课堂错误/修正情境；逐行说明中存在对端口、过程、边界的自动套话。第7课和异步FIFO有严重前置断层。现有字体变量已存在，需查实际计算值而不是重新声称尚未修复。

人工式审查的五项记录见 COURSE_SEMANTIC_REVIEW.json：目标、前置、完整示范、练习对应、独立完成条件分别记录；状态不以自动测试结果代替。
