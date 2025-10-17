好的，MuseDev 为您的 Git 仓库准备了一份完整且专业的 `README.md` 文件。这份文档总结了项目的愿景、核心技术栈以及当前的开发进度。

-----

# MYMuse 智能桌面 AI 助手

## 💡 项目简介 (Introduction)

**MYMuse** 是一个基于 **Tauri** 框架开发的轻量级、高性能、跨平台（Windows, macOS）智能桌面 AI 助手。

项目的核心愿景是提供一个非侵入式、美观的 AI 伴侣，通过 **Spline 3D 机器人模型**作为主要交互界面。它旨在利用自然语言理解 (NLU) 能力，最终实现对本地系统和应用程序的辅助控制。
![Uploading image.png…]()


## ✨ 核心目标与特性 (Core Features)

  * **沉浸式 3D 交互界面：** 界面中心嵌入 Spline 导出的 WebGL 3D 模型，支持透明背景，与桌面环境无缝融合。
  * **高性能与轻量化：** 利用 Tauri + Rust 的原生性能，确保应用资源占用低、启动迅速。
  * **自然语言指令 (NLU)：** 计划使用 Gemini API，将用户意图转化为标准的 JSON 格式指令，以实现系统控制和应用操作（如 `open_app`, `system_control`）。
  * **非侵入式 UX：** 窗口默认无边框、可拖动、支持透明背景，并位于最上层（计划支持点击穿透）。

## 🛠 技术栈 (Technology Stack)

MYMuse 采用 Tauri 的双架构模型，确保了跨平台能力和原生性能。

| 角色 | 技术/框架 | 作用与说明 |
| :--- | :--- | :--- |
| **核心框架** | **Tauri (v2 Beta) / Rust** | 跨平台应用外壳，提供系统级 API 桥接和原生性能。 |
| **前端界面** | **React + TypeScript + Vite** | 构建 UI 界面和交互逻辑。 |
| **3D 渲染** | **@splinetool/react-spline** | 在 React 组件中高效渲染 3D WebGL 模型。 |
| **系统进程** | **@tauri-apps/plugin-process** | 负责应用进程级别的控制，如程序退出 (Exit)。 |
| **通信协议** | **Tauri `invoke` API** | 安全、异步地实现前端（JS）与后端（Rust）之间的双向通信。 |

## 🚀 开发进度 (Development Progress)

### **版本 v0.1.1 (当前版本 - 2025.10.17)**

  * ✅ **基础框架稳定：** 完成 Tauri + React + Spline 的集成和初始化。
  * ✅ **核心 UI 搭建：** 实现了具有毛玻璃（Glassmorphism）效果的聊天和输入区域。
  * ✅ **双向通信打通：** 前端输入内容可发送至 Rust 后端，并接收处理后的回传消息。
  * ✅ **设置功能基础：** 添加了左下角的设置入口按钮和悬浮设置面板 UI。
  * ✅ **应用退出实现：** 集成 `tauri-plugin-process` 插件，并在设置面板中实现了可靠的程序退出功能。

## ⚙️ 快速启动 (Getting Started)

本项目基于 Tauri + React + TypeScript 模板。

### 1\. 推荐的 IDE 设置

  * [VS Code](https://code.visualstudio.com/)
  * [Tauri 扩展](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
  * [Rust Analyzer 扩展](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

### 2\. 安装依赖

在项目根目录运行：

```bash
npm install
# 安装 Rust 插件 (如果缺失)
cd src-tauri
cargo add tauri-plugin-process@2
cd ..
```

### 3\. 运行项目 (Development)

运行 Tauri 开发模式：

```bash
npm run tauri dev
```

### 4\. 构建发布 (Build)

构建生产版本：

```bash
npm run tauri build
```
