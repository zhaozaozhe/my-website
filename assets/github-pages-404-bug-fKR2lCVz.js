import{n as e}from"./chunk-CilyBKbf.js";var t=e({default:()=>n}),n=`---
title: "记一次 Vite + GitHub Pages 部署白屏 404 的踩坑日记"
type: "article"
date: "2026-04-23"
summary: "本地 npm run dev 跑得好好的，一推送到 GitHub Pages 就全盘白屏报错 404？本文记录了由于 Jekyll 忽略下划线文件引发的血案及 .nojekyll 终极解决方案。"
cover: "https://picsum.photos/seed/bug/600/400"
author: "threez"
category: "踩坑记录"
---

# 💥 案发现场

今天在搭建个人网站的“项目实验室”页面时，本地 \`npm run dev\` 测试一切完美，路由切换如丝般顺滑。
但是，当我满怀期待地将代码 \`git push\` 到远程仓库，等待 GitHub Actions 部署完成后，打开网页却得到了一个**无情的白屏**。

按下 \`F12\` 打开控制台，发现了一片飘红的报错：
\`GET https://.../_plugin-vue_export-helper-xxx.js net::ERR_ABORTED 404 (Not Found)\`

# 🕵️‍♂️ 剥茧抽丝：排查过程

一开始，我以为是 Vite 的 \`base\` 路径配置错了，或者是 Vue Router 的 \`history\` 模式传错了参数。但经过仔细核对 \`vite.config.js\` 和 \`router/index.js\`，发现代码逻辑没有任何问题。

真正的嫌疑人，其实藏在那个报 404 文件的**名字**里——注意它开头是一个**下划线 \`_\`**。

# 💡 顿悟与解决：Jekyll 的底层规则

经过查阅资料，我发现了导致白屏的真正元凶：
GitHub Pages 的底层使用的是 **Jekyll**（一个静态网站生成器）。Jekyll 默认有一个安全规则：**它会忽略所有以下划线 \`_\` 开头的文件和文件夹**！

Vite 在打包时，自动生成了这个带下划线的辅助脚本文件。文件确确实实被推到了 GitHub 上，但 Jekyll 在对外发布时把它“藏”了起来，导致浏览器请求不到，页面自然就白屏了。

### 终极解决方案：

极其简单但非常有效。在项目的 \`public/\` 目录下，新建一个没有任何内容、连后缀名都没有的文件：
**\`.nojekyll\`**

这个小小的文件就是在向 GitHub Pages 宣告：“**不要用 Jekyll 的规则来处理我的网站！把它当成普通的静态文件服务器就好！**”

重新打包提交后，白屏消失，一切恢复正常。

# 📝 总结

这就是“干中学”的魅力。每一次报错都不是阻碍，而是加深对前端工程化、构建工具和部署环境底层逻辑理解的绝佳机会。`;export{t as n,n as t};