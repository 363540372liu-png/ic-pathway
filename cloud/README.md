# 芯路 · 数字 IC 学习室

保留原有 24 课、交互模型与计数器练习包；每课有详细文字、代码推演、两份练习和三道选择题。Ultra 在第 4、8、10、14、17、21、24 课后提供阶段任务，分别记录概念分数与由学习者确认的实操证据。

## 运行与数据

- `public/` 是课程界面源文件；`worker/index.js` 提供静态资源和按已认证用户隔离的进度 API。
- `npm run build` 无运行时依赖，打包到 `dist/server/index.js`。下载练习包由 `python3 tools/package_lab.py` 更新。
- 身份由 Sites 提供的 ChatGPT 登录及可信请求头确定；登录、退出由平台处理，不实现自己的 OAuth。
- 进度存储在 Sites D1 `DB`，`db/schema.ts` 为模式，`drizzle/` 是已生成迁移。`npx drizzle-kit generate` 生成后续增量迁移；不要重写已应用迁移。
- `/api/progress` 要求身份。PUT 校验同源、输入大小和单调修订号；不接受客户端指定用户。冲突返回 409，客户端按字段合并，冲突解答需用户选择，支持导出两份备份。
- 旧 localStorage 键 `ic-pathway.progress.v1` 保留用于首个账号的一次迁移。已完成的旧课不因新增练习被清零。每账号缓存仅用于待同步草稿，云端是持久状态来源。首次迁移必须从有旧进度的浏览器进入。
- 未登录可以阅读和暂存；登录后才保证跨设备同步。网络错误保留待同步草稿，用户可以重试或导出。
- `node --test tests/progress.test.mjs` 检查课程覆盖、进度迁移、身份隔离、并发覆盖保护、合并及离线缓存。

## 教学边界

网站不执行 Verilog，也不连接学校服务器。开放代码题用参考实现与自查清单核对，Ultra 概念题自动评分；代码和实操不能被这些分数证明正确。VCS、DC 和工艺库需要学校提供的授权环境。具体版本选项以各课官方链接及学校环境为准。

## v3.0.0 · 双路线

保留24课数字IC主线，新增27个通用FPGA实践模块，以及21个Efinix图像边缘检测项目模块。比赛进展、基础学习、技能自评分别保存；项目日志、A–K里程碑、团队接口表和Ultra图像检验复用已有账号和云端进度。

完整文件清单、迁移逻辑、实测范围和限制见 [CHANGELOG.md](CHANGELOG.md)。

- `npm install` 后 `npm run dev -- --host 0.0.0.0 --port 4173` 启动本地预览。
- `/__qa` 仅在开发服务器提供合成账号与响应式测试入口，不进入正式构建。
- `npm test` 运行19项Node回归；`python -m unittest discover -s tests -p test_golden.py` 运行4项算法测试。
- `python tools/check-hdl.py` 需要 pyslang、yowasp-yosys 和 C++ 编译器，检查教学RTL。
- `public/project/kit/README.md` 说明如何运行Golden模型与逐像素比较。
