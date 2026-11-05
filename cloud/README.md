# 芯路 · 数字 IC 学习室

56节Verilog/SystemVerilog课程（52主线、4选修），保留24节原版参考课与27个FPGA课程ID。教学正文从具体电路问题展开，配合逐行解释、固定模型波形、真实填空/错误编辑与独立推导。

FPGA采用两个连续项目：最小LED系统先走通九阶段，再用UART控制LED深化协议与集成。提供无开发板/真实开发板模式及明确的Vivado、Quartus、Efinity适配。已撤下比赛项目；旧项目链接回到FPGA首页，旧数据作为不显示的备份字段保留。

## 开发与验证

- `npm ci`，`npm run dev`：开发预览；`/__qa`仅在开发服务器提供合成账号、响应式宽度与课程选择，不进入正式构建。
- `npm test`：Node回归，包括数据隔离、并发同步、旧记录迁移、题型结构和重复题干检查。
- `npm run lint`：JavaScript语法检查；`npm run build`：将课程资源和Worker打包到dist。
- `python -m pip install pyslang yowasp-yosys`，并安装g++，再运行`npm run check:hdl`。
- `python tools/check-hdl.py`：通用FPGA教学模块语法与周期级检查。
- `python tools/verify-uart-led.py`：UART LED集成顶层周期级检查。
- `python tools/package-fpga.py`：重建自包含UART LED下载包。
- `python tools/package-rtl-lab.py`：重建主线工程包。

自动题核对封闭答案；命名端口支持顺序变化，未识别代码返回待验证，不运行任意RTL。独立实现保存代码、测试记录及自查状态，不宣称自动功能验证。固定交互模型不包含门延迟、STA或亚稳态概率。

## 记录与兼容

身份由Sites的ChatGPT登录和可信请求头确定。Sites D1的DB绑定、learning_progress表及已有迁移保持不变。Worker按身份隔离记录，PUT使用修订号防止并发覆盖；离线草稿可重试、导出和冲突合并。

旧localStorage键ic-pathway.progress.v1保留。原课程ID、草稿和合法完成记录保留；新版练习不把旧选择题自动算作通过，旧作答存入历史。被撤下的competition字段只作为兼容备份往返，不再加载项目逻辑。未登录可暂存本机，登录后才保证跨设备同步。

## 审查资料

- [逐课程问题矩阵](docs/LESSON_QUALITY_MATRIX.md)
- [本次交付、测量与边界](docs/QUALITY_REPAIR_REPORT.md)
- [完整课程依赖路线](docs/COURSE_ROUTE.md)
- [UART LED工程说明](public/fpga/workflow/README.md)

商业FPGA工具与开发板流程未在本次环境实际运行。VCS/DC需学校授权环境；实际器件、引脚、I/O电压、工具版本和约束必须按板卡与厂商资料核对。

本轮完整改动、逐课审查、真实截图与验证边界见 [教学修复报告](docs/TEACHING_REBUILD_REPORT.md)。
