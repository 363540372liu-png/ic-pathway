// Additive presentation migration: lesson IDs and completion records never change.
(function(root){
const C=root.IC_FPGA_CATALOG,D=root.IC_FPGA_CONTENT;
const titles={'02':'建立可复现的 FPGA 工程','03':'功能仿真与测试台','07':'时钟与 I/O 约束','19':'连起来读综合与实现报告'};
for(const m of C.modules)if(titles[m.id])m.title=titles[m.id];
const neutral=s=>s.replaceAll('Vivado','FPGA 工具').replaceAll('XDC','约束文件').replaceAll('DRC','设计规则检查');
for(const [id,d]of Object.entries(D)){
 d.vivadoSteps=d.steps.slice();
 for(const k of ['hardware','expected'])d[k]=neutral(d[k]);
 for(const k of ['goals','diagram','mistakes','debug'])d[k]=d[k].map(neutral);
 d.concepts=d.concepts.map(([h,t])=>[neutral(h),neutral(t)]);
 for(const k of ['guided','independent']){d[k].task=neutral(d[k].task);d[k].hint=neutral(d[k].hint);if(d[k].steps)d[k].steps=d[k].steps.map(neutral);}
 d.steps=[`先写本次实验规格：${d.goals.join('；')}。把 ${d.code.split('/').at(-1)} 的接口、参数、复位与预期时序记入工程说明。`,
 '把可综合 RTL 与仅仿真的测试台放在不同源集合。确认本次顶层、参数、工具版本和实际器件来源；未知板卡时仅做明确标注的仿真实验。',
 `按本课调试清单逐项检查：${d.debug.join('；')}。从仿真日志或对应阶段的报告中找证据，不用界面上的绿色标记代替分析。`,
 `保存结果并和预期比较：${d.expected} 具体软件界面放在独立工具适配器，概念与检查目标保持不变。`];
}
D['02'].steps=['建立独立工程目录：rtl/、tb/、constraints/、reports/，保存 README 中的设计顶层、仿真顶层、器件和版本。','设计源只加入 and_gate.v；测试源加入 tb_gate.sv，两者顶层分别选择 and_gate 与 tb_gate。','运行行为仿真，查编译顺序和模块解析日志。确定器件后才配置综合与物理实现工程，不能猜测封装。','关闭并从目录重新打开工程，确认没有依赖电脑上的临时绝对路径。'];
D['03'].steps=['先手算测试台的输入和预期。使用已安装的 HDL 仿真器编译 RTL 与 tb，选择 tb 顶层。','运行至 $finish，读断言、超时和最后的 PASS；窗口打开并不代表测试通过。','把 clk、rst_n、en、d、q 加入波形，观察采样边沿前的输入与边沿后的寄存器值。','故意改错一项预期，确认测试失败，再恢复并回归。不要把有 #delay 的测试台加入综合源。'];
D['07'].concepts=[['约束表达设计意图','RTL 描述逻辑，约束告诉工具时钟周期与外部接口的时间关系。时序约束和物理引脚分配是两类不同信息。很多工具使用 SDC 的时钟语法，AMD 工具也使用 XDC；具体支持项、层级名称和例外命令必须核对厂商版本。不要把 XDC 的 PACKAGE_PIN 属性直接复制到其他厂商。'],['没有时钟约束，正裕量也可能没有意义','先查工具识别了几个时钟、哪些端点没有约束，再查 setup/hold。I/O 延迟来自板上外围器件和时钟关系，不能为了让报告好看填零。同步器等例外路径需要设计依据，不要用一条宽泛 false_path 把错误全部屏蔽。']];
D['07'].steps=['从实际时钟来源求周期 T(ns)=1000/f(MHz)，记录资料页码。','为系统时钟创建明确约束；引脚与电压设置按目标厂商的接口/约束方式单独核对。','确认所有时钟已识别，检查未约束路径、输入输出预算和设计规则。','只在有设计理由时添加例外，并保存解释；随后重新读完整实现后时序报告。'];
D['21'].concepts[1][1]='准备面板用于盘点通用工程证据。当前比赛采用独立的 Efinix 图像项目路线，算法、验证和团队接口单独推进。未来更复杂的技术按实际需要加入，不改变数字 IC 长期主线。';
root.IC_FPGA_FLOW=root.IC_FPGA_FLOW.map(([h,t])=>[h,neutral(t)]);
C.future=[{id:'advanced-memory',title:'更复杂的存储与接口',topics:'等待基础项目稳定后按需要学习'}, {id:'asic',title:'数字 IC / ASIC 深化',topics:'继续原有 RTL、验证与综合主线'}];
})(window);
