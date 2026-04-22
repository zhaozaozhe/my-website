---
title: "GitHub Pages 部署踩坑记：Jekyll 过滤下划线文件导致的 404 白屏"
type: "article"
summary: "排查 GitHub Pages 部署 Vue SPA 时，因 Jekyll 默认忽略 _ 开头文件而导致的资源 404 白屏问题，以及 .nojekyll 的引入过程。"
cover: "https://picsum.photos/seed/bugfix/600/400"
date: "2026-04-23"
author: "threez"
category: "工程踩坑"
---

# GitHub Pages 部署踩坑记：Jekyll 过滤下划线文件导致的 404 白屏

## 问题发现

当我在 GitHub Pages 上部署好 Vue 3 SPA 之后，满怀期待地打开了线上地址——结果迎接我的是一片白屏。

打开浏览器 DevTools，Console 里赫然躺着一行：

```
Failed to load resource: the server responded with a status of 404
```

所有以 `_` 开头的文件全部 404 了。而我的 Vite 构建产物里，恰好有大量 `_` 前缀的文件：

```
/assets/_plugin-vue_export-helper.js
/assets/_commonjsHelpers.js
```

## 假设与验证

第一反应：**构建配置有问题？**

我本地 `npm run preview` 完全正常，说明构建产物没问题。那就是 GitHub Pages 服务端的行为。

第二反应：**路径问题？**

我检查了 `vite.config.js` 里的 `base` 配置，确认已经设置为 `/<仓库名>/`，路径没问题。

第三反应：**GitHub Pages 本身有什么过滤机制？**

一搜才知道，GitHub Pages 默认使用 **Jekyll** 作为站点构建引擎。而 Jekyll 有一个"特性"：**会忽略所有以 `_`（下划线）或 `.`（点号）开头的文件和目录**。这是 Jekyll 的约定——下划线前缀代表"这是内部文件，不要输出到最终站点"。

偏偏 Vite 打包出来的 chunk 文件正好有 `_` 前缀，于是被 Jekyll 静默丢弃 → 资源不存在 → 404 → 白屏。

## 根因定位

```
Vite 构建产物含 _ 前缀文件
        ↓
GitHub Pages 默认用 Jekyll 构建
        ↓
Jekyll 忽略 _ 开头的文件
        ↓
资源 404 → 白屏
```

这是一个**构建工具约定与部署平台约定冲突**的经典问题。不是你的代码有 bug，而是两个系统的默认行为互不兼容。

## 解决方案

解决方法简单得令人发指：在项目 `public/` 目录下放一个名为 `.nojekyll` 的空文件。

```bash
touch public/.nojekyll
```

这个文件的存在告诉 GitHub Pages：**跳过 Jekyll 处理，直接输出原始文件**。

> **Why `.nojekyll` 要放在 `public/`？** 因为 Vite 构建时会把 `public/` 下的所有文件原样复制到 `dist/` 根目录。所以 `.nojekyll` 最终会出现在部署产物的根目录，GitHub Pages 检测到它就会关闭 Jekyll 处理。

提交、推送、等 CI/CD 跑完——白屏消失，页面正常加载 🎉

## 复盘沉淀

### 这个坑为什么隐蔽？

1. **本地开发完全不受影响**：`npm run dev` 和 `npm run preview` 都不经过 Jekyll，所以你永远不会在本地复现这个问题。
2. **错误信息指向性差**：404 看起来像是路径配置错误，容易让人在 `base` 配置上兜圈子。
3. **Jekyll 是"默认存在但不可见"的**：很多人根本不知道 GitHub Pages 后台跑着 Jekyll，更不知道它会过滤文件。

### 教训与原则

| 原则 | 这次踩坑的对应 |
|------|--------------|
| **部署环境 ≠ 开发环境** | Jekyll 只在 GitHub Pages 端存在，本地无法复现 |
| **404 不一定是路径错误** | 文件可能压根没被部署上去，而不是路径写错了 |
| **了解部署平台的默认行为** | 每个部署平台都有自己的"隐含规则"，需要主动了解 |

### 给后来者的检查清单

- [ ] GitHub Pages 部署 SPA，是否添加了 `.nojekyll`？
- [ ] `vite.config.js` 的 `base` 是否设置为 `/<仓库名>/`？
- [ ] 是否使用 `createWebHashHistory()` 避免 SPA 刷新 404？
- [ ] CI/CD workflow 中是否正确指定了输出目录为 `dist`？

---

> 这篇文章本身就是"反哺递归"机制的第一次闭环：用自己踩过的坑，喂养自己建的站。如果你也遇到了同样的问题，希望这篇文章能帮你省下半小时的排查时间。
