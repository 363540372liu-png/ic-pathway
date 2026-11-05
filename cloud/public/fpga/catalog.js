window.IC_FPGA_CATALOG={
  "title": "FPGA 工程实践 · 从 RTL 到硬件运行",
  "phases": [
    {
      "id": 0,
      "title": "需求与架构",
      "intro": "先说明电脑发什么、LED怎样响应，再认识实现它的器件。",
      "input": "需求、时钟与串口格式",
      "output": "模块图与接口约定"
    },
    {
      "id": 1,
      "title": "工程与环境",
      "intro": "把设计、测试台和器件设置分开，重建工程才不会靠碰巧。",
      "input": "源文件与工具版本",
      "output": "可重复打开的工程"
    },
    {
      "id": 2,
      "title": "RTL与功能仿真",
      "intro": "沿着一个字节逐拍检查：线上电平怎样变成一次LED更新。",
      "input": "RTL、激励与预期",
      "output": "自检日志与失败用例"
    },
    {
      "id": 3,
      "title": "综合与资源",
      "intro": "看看状态机、计数器和数组被变成了哪些器件资源。",
      "input": "可综合RTL与目标器件",
      "output": "综合网表、警告和资源统计"
    },
    {
      "id": 4,
      "title": "时钟与I/O约束",
      "intro": "把真实时钟和板上接线告诉实现工具。",
      "input": "器件、原理图和外部时序",
      "output": "可追溯的约束与引脚表"
    },
    {
      "id": 5,
      "title": "实现与时序",
      "intro": "在芯片上放置和连接逻辑，再问每条路径是否来得及。",
      "input": "综合网表与已核对约束",
      "output": "布局布线结果、DRC与时序报告"
    },
    {
      "id": 6,
      "title": "配置与下载",
      "intro": "确认这份配置属于这颗器件，再选择临时配置或掉电保存。",
      "input": "已实现且通过检查的设计",
      "output": "配置文件、下载日志和复位现象"
    },
    {
      "id": 7,
      "title": "板级调试",
      "intro": "从电源、时钟、复位开始，逐段找出第一处不符合预期的位置。",
      "input": "最小用例和实际板级现象",
      "output": "可重复的定位步骤与修复记录"
    },
    {
      "id": 8,
      "title": "交付与复现",
      "intro": "让另一个人从干净目录得到同一结果。",
      "input": "源码、约束、测试和报告",
      "output": "分清仿真完成与板级验收的交付说明"
    }
  ],
  "modules": [
    {
      "id": "20",
      "title": "UART控制LED：先把需求说清楚",
      "phase": 0,
      "bridge": "module",
      "optional": false,
      "previous": null
    },
    {
      "id": "01",
      "title": "FPGA里什么能被“重新配置”",
      "phase": 0,
      "bridge": "mindset",
      "optional": false,
      "previous": "20"
    },
    {
      "id": "02",
      "title": "工程创建、源码组织与顶层",
      "phase": 1,
      "bridge": "module",
      "optional": false,
      "previous": "01"
    },
    {
      "id": "03",
      "title": "先在仿真里接通整条数据通路",
      "phase": 2,
      "bridge": "testbench",
      "optional": false,
      "previous": "02"
    },
    {
      "id": "12",
      "title": "UART一帧为什么要有起始位和停止位",
      "phase": 2,
      "bridge": "testbench",
      "optional": false,
      "previous": "03"
    },
    {
      "id": "14",
      "title": "接收器：在什么时候读取每一位",
      "phase": 2,
      "bridge": "fsm",
      "optional": false,
      "previous": "12"
    },
    {
      "id": "10",
      "title": "计数器与时钟使能：别制造第二个时钟",
      "phase": 2,
      "bridge": "counter",
      "optional": false,
      "previous": "14"
    },
    {
      "id": "11",
      "title": "用状态机描述等待、接收和结束",
      "phase": 2,
      "bridge": "fsm",
      "optional": false,
      "previous": "10"
    },
    {
      "id": "13",
      "title": "扩展：发送器与回显接口",
      "phase": 2,
      "bridge": "fsm",
      "optional": true,
      "previous": "11"
    },
    {
      "id": "22",
      "title": "扩展：流水线里的样本与气泡",
      "phase": 2,
      "bridge": "nba",
      "optional": true,
      "previous": "13"
    },
    {
      "id": "23",
      "title": "扩展：同步RAM的地址与数据相差哪一拍",
      "phase": 2,
      "bridge": "memory",
      "optional": true,
      "previous": "22"
    },
    {
      "id": "24",
      "title": "扩展：FIFO满空时到底接不接受请求",
      "phase": 2,
      "bridge": "fifo-project",
      "optional": true,
      "previous": "23"
    },
    {
      "id": "25",
      "title": "扩展：背压时怎样保存一笔数据",
      "phase": 2,
      "bridge": "sv-handshake",
      "optional": true,
      "previous": "24"
    },
    {
      "id": "26",
      "title": "扩展：位宽、舍入与饱和",
      "phase": 2,
      "bridge": "width-sign",
      "optional": true,
      "previous": "25"
    },
    {
      "id": "15",
      "title": "扩展：PWM如何改变平均亮度",
      "phase": 2,
      "bridge": "counter",
      "optional": true,
      "previous": "26"
    },
    {
      "id": "04",
      "title": "综合：从代码走到逻辑网表",
      "phase": 3,
      "bridge": "synthesis",
      "optional": false,
      "previous": "11"
    },
    {
      "id": "05",
      "title": "顺着综合网表找回RTL里的信号",
      "phase": 3,
      "bridge": "combinational",
      "optional": false,
      "previous": "04"
    },
    {
      "id": "06",
      "title": "LUT、FF、RAM与DSP分别做了什么",
      "phase": 3,
      "bridge": "width",
      "optional": false,
      "previous": "05"
    },
    {
      "id": "18",
      "title": "面积与速度：同一功能的两种实现",
      "phase": 3,
      "bridge": "synthesis-lab",
      "optional": false,
      "previous": "06"
    },
    {
      "id": "07",
      "title": "时钟与外部接口的时间约束",
      "phase": 4,
      "bridge": "constraints",
      "optional": false,
      "previous": "18"
    },
    {
      "id": "08",
      "title": "从原理图找到引脚、电压和极性",
      "phase": 4,
      "bridge": "module",
      "optional": false,
      "previous": "07"
    },
    {
      "id": "27",
      "title": "异步串口输入与复位释放的边界",
      "phase": 4,
      "bridge": "cdc",
      "optional": false,
      "previous": "08"
    },
    {
      "id": "19",
      "title": "布局布线与设计规则：网表还缺什么",
      "phase": 5,
      "bridge": "post-synthesis",
      "optional": false,
      "previous": "27"
    },
    {
      "id": "17",
      "title": "沿着一条路径读Setup与Hold报告",
      "phase": 5,
      "bridge": "clock-skew",
      "optional": false,
      "previous": "19"
    },
    {
      "id": "09",
      "title": "生成配置文件并下载到器件",
      "phase": 6,
      "bridge": "module",
      "optional": false,
      "previous": "17"
    },
    {
      "id": "16",
      "title": "板上不亮：按信号路径缩小问题",
      "phase": 7,
      "bridge": "debug",
      "optional": false,
      "previous": "09"
    },
    {
      "id": "21",
      "title": "交付验收：从干净目录重新做一遍",
      "phase": 8,
      "bridge": "acceptance",
      "optional": false,
      "previous": "16"
    }
  ],
  "ultras": [
    {
      "id": "led",
      "title": "阶段实训一：计数使能与状态控制",
      "required": [
        "10",
        "11"
      ]
    },
    {
      "id": "uart",
      "title": "阶段实训二：UART控制LED完整交付",
      "required": [
        "03",
        "20",
        "21"
      ]
    }
  ]
};
