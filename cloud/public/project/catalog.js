(function(root){
const rows=[
 ['01','认识图像与边缘','软件算法',['bits','width'],[]],['02','RGB → 灰度：两种数值模型','软件算法',['fpga-26','width'],['01']],['03','从 3×3 窗口推导 Sobel','软件算法',['combinational','fpga-26'],['01']],['04','幅值近似与阈值','软件算法',['fpga-26'],['03']],['05','建立可复现的 Golden Reference','软件算法',['selfcheck'],['02','03','04']],
 ['06','从二维数组转向像素流','硬件化',['sequential','fpga-25'],['05']],['07','算清每一条数据通路的位宽','硬件化',['width','fpga-26'],['02','03']],['08','流水线：一个像素经历几拍','硬件化',['fpga-22','fpga-25'],['06','07']],
 ['09','为什么需要两行缓存','行缓存',['fpga-23','counter','fpga-22'],['06']],['10','用同步 RAM 保存图像行','行缓存',['fpga-23'],['09']],['11','构造 3×3 滑动窗口','行缓存',['fpga-23','fpga-22','counter'],['10']],
 ['12','RTL 实践 · rgb2gray','RTL 实现',['fpga-26','fpga-22'],['02','07','08']],['13','RTL 实践 · line_buffer','RTL 实现',['fpga-23','counter'],['09','10']],['14','RTL 实践 · window_3x3','RTL 实现',['fpga-22','fpga-25'],['11','13']],['15','RTL 实践 · sobel_core','RTL 实现',['combinational','fpga-26'],['03','07']],['16','RTL 实践 · threshold','RTL 实现',['fpga-22'],['04']],['17','RTL 实践 · edge_pipeline_top','RTL 实现',['module','fpga-25','fpga-27'],['12','14','15','16']],
 ['18','Algorithm Verification · Python 对 RTL','验证',['testbench','selfcheck','waveforms'],['05','17']],['19','逐级调试图像流水线','验证',['debug','waveforms'],['18']],['20','Efinix / Efinity 比赛适配器','工具适配',['fpga-04','fpga-07','fpga-17'],['17','18']],['21','System Integration · 团队接口与演示','团队集成',['fpga-25','fpga-27'],['18','20']]
];
const modules=rows.map(([id,title,phase,foundation,depends])=>({id,title,phase,foundation,depends}));
const milestones=[
 ['A','软件 Sobel 工作','01','一张可解释的灰度测试图','Python Sobel 和手算记录','常量图梯度为0；水平/垂直阶跃方向正确','核翻转或把彩色通道次序弄反',[]],
 ['B','整数硬件模型规格冻结','05','RGB888 输入、浮点参考与误差容限','整数Golden、误差报告、舍入/边界/阈值规格','误差按约定评价；不要求 L1 与 L2 逐值相等','把近似误差当RTL错误或未定义舍入',['A']],
 ['C','rgb2gray RTL 验证','12','冻结的整数灰度公式','颜色边界及随机向量自检','输出和整数Golden逐值相等，valid对齐','乘加位宽不足、RGB/BGR颠倒',['B']],
 ['D','固定窗口 sobel_core 验证','15','手算3×3向量及signed范围','Gx/Gy/幅值波形与自检','常量、阶跃、负梯度均与Golden相同','unsigned减法、左移提前截断',['B']],
 ['E','行缓存与窗口验证','14','已知宽高、递增像素与气泡','完整窗口/中心坐标转储','每个有效窗口九点正确；前两行列无输出','跨行串窗、RAM延迟一拍错配',['B']],
 ['F','完整算法流水线验证','17','C、D、E模块和冻结接口','top、测试台、延迟与复位记录','阶段输出和标签对齐，复位中断后无旧有效像素','只对数据、不对valid',['C','D','E']],
 ['G','整图 Python / RTL 匹配','18','确定性输入图、整数expected','rtl.txt、比较日志、失败注入记录','数量、顺序、坐标、二值像素全部精确一致','只看图片、漏掉尾像素',['F']],
 ['H','算法核在 Efinity 综合实现','20','通过回归的源码和真实目标条件','工程、约束、时序和资源报告','无未解释关键警告；检查覆盖和实现后时序','错器件、未约束路径、存储推断不符',['G']],
 ['I','团队接口接通','21','双方确认的信号/格式/域表','集成版本与责任清单','源/汇格式、同步、复位和延迟一致','摄像头像素格式与算法接口不一致',['G']],
 ['J','真实摄像头边缘输出','21','实际板卡、摄像头、显示依赖','板上演示、日志与问题记录','正常帧、复位和连续运行可观察到正确输出','时钟域、帧边界、引脚或电压错误',['H','I']],
 ['K','稳定比赛演示','21','J完成、团队约定稳定性用例','可复现交付、演示脚本、已知限制','按约定时长和场景连续运行并保存证据','仅跑通一次、无法从干净工程复现',['J']]
].map(([id,title,module,input,deliverable,pass,failure,depends])=>({id,title,module,input,deliverable,pass,failure,depends,goal:title}));
const skills=[['syntax','Verilog Syntax','module'],['comb','Combinational Logic','combinational'],['seq','Sequential Logic','sequential'],['fsm','FSM','fsm'],['tb','Testbench','testbench'],['wave','Waveform Debugging','waveforms'],['pipeline','Pipeline','fpga-22'],['ram','RAM','fpga-23'],['bram','BRAM','fpga-23'],['fifo','FIFO','fpga-24'],['stream','Streaming Interface','fpga-25'],['alignment','Valid/Data Alignment','fpga-22'],['width','Bit Width','width'],['fixed','Fixed Point','fpga-26'],['synth','Synthesis','synthesis'],['timing','Timing','fpga-17'],['flow','FPGA Tool Flow','fpga-21'],['image','Digital Image Basics','edge-01'],['gray','RGB / Gray','edge-02'],['convolution','Convolution','edge-03'],['sobel','Sobel','edge-03'],['window','3×3 Window','edge-11'],['linebuffer','Line Buffer','edge-09'],['verification','Image Pipeline Verification','edge-18'],['efinity','Efinity','edge-20']].map(([id,title,route])=>({id,title,route}));
const interfaceFields=[['format','像素格式 / RGB或BGR / 通道位宽'],['resolution','有效分辨率 W×H'],['clock','像素/算法/显示时钟与时钟域'],['valid','valid / ready 接受规则'],['frame','帧同步 SOF 的定义与对齐'],['line','行同步 EOL / 行消隐的定义'],['reset','复位极性、同步方式、释放责任'],['latency','逐级延迟、首窗等待与总延迟'],['output','输出格式、裁剪/补边、坐标'],['owner','摄像头 / 显示 / CDC / 算法负责人'],['version','协议版本、确认人、日期']];
root.IC_PROJECT_CATALOG={modules,milestones,skills,interfaceFields,tags:['ALGORITHM','RTL','SIMULATION','EFINITY','BOARD','INTEGRATION','BUG','TEAM'],states:['NOT STARTED','LEARNING','IMPLEMENTING','VERIFYING','COMPLETED','BLOCKED'],levels:['NOT LEARNED','LEARNING','PRACTICED','PROJECT-USED','MASTERED']};
})(window);
