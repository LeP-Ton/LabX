# LabX 内容编写指南

## 文件位置

每个作品保存为 `content/<module>/<slug>.mdx`。`module` 只能是 `game`、`music`、`book`、`art`、`movie` 或 `life`，文件名必须与 frontmatter 中的 `slug` 完全一致。

## 元数据模板

```yaml
---
id: game-stable-id
slug: work-slug
type: game
title: 作品标题
summary: 不超过 180 个字符的作品摘要。
cover: module:game
publishedAt: 2026-08-30
status: draft
featured: false
demo: false
tags:
  - 标签
creators:
  - 创作者或团队
relatedWorks:
  - id: other-stable-id
    relation: 与当前作品的关系
actions:
  - kind: play
    label: 试玩作品
    url: https://example.com/work
---
```

## 规则

- `id` 是全局唯一且永久稳定的作品标识，作品改名时也不要修改。
- `slug` 只使用小写字母、数字和连字符，并与文件名一致。
- `status` 为 `draft` 或 `published`；生产环境只发布 `published`。
- `kind` 为 `view`、`listen`、`buy`、`play` 或 `follow`。
- 所有行动链接必须使用 HTTPS。
- `relatedWorks` 只引用已经存在的作品 ID，构建会拒绝失效引用和重复 ID。
- 音乐、视频、模型等大文件使用外部平台或对象存储，不能直接提交到仓库。
- `Life` 真实人格内容在取得明确授权和完成隐私、伦理评估前不得入库。

## 本地校验

提交内容前执行：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
