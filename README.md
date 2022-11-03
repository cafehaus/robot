# node 环境下的 robotjs 桌面自动化

### 安装依赖

```bash
npm install
```

## 使用问题

### npm install robotjs各种报错

这个库依赖 Visual Studio 环境和 python 环境，需先安装一些其他东西

```bash
# 第一步：用管理员权限运行 PowerShell 安装
npm install -g windows-build-tools

# 第二步：安装 Visual Studio Build Tools

# windows 上安装这个 Visual Studio Community，https://visualstudio.microsoft.com/zh-hans/free-developer-offers/，这个开发工具跟我们常用的 vscode 类似，只不过这个是用来开发桌面应用的。

# 安装的时候把 vscode 关了，否则有可能安装不成功，安装的时候选择 "使用 c++ 的桌面开发" 那项。

# 第三步：安装 robotjs
npm install robotjs
```

### robot.screen.capture 截屏保存图片无效

要借助 Jimp 库去写入图片数据

* [robotjs](http://robotjs.io/docs/)
* [robotjs api文档](http://robotjs.io/docs/syntax)