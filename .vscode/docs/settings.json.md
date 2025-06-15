```json
{
  // === VS Code 内置功能 ===

  // ✅ 启用括号配对上色（不同层级颜色不同）
  "editor.bracketPairColorization.enabled": true,

  // ✅ 显示竖直作用域线（括号对之间的竖线）
  // 可选值: "none" | "active" | "visible"
  // - none：不显示
  // - active：仅当前光标所在括号显示线
  // - visible：所有括号对都显示线（推荐初学者）
  "editor.guides.bracketPairs": "active",

  // ✅ 显示水平括号配对线（跨行时显示），例如函数大括号之间的水平线
  "editor.guides.bracketPairsHorizontal": "active",

  // ✅ 高亮当前括号对的作用域线颜色（配合 bracketPairs 使用）
  "editor.guides.highlightActiveBracketPair": true,

  // ✅ 显示缩进线（左边的竖直引导线）
  "editor.guides.indentation": true,

  // ✅ 启用语义高亮（高亮变量、类型、函数等）
  "editor.semanticHighlighting.enabled": true,

  // === Guides 插件功能 ===
  // 插件地址：https://marketplace.visualstudio.com/items?itemName=spywhere.guides

  // ✅ 启用 Guides 插件（必开）
  "guides.enabled": true,

  // ✅ 显示垂直引导线（缩进层级线）
  "guides.includeVerticalGuides": true,

  // ❌ 是否显示水平引导线（例如 if/else 后的横线）
  // 不常用，建议关闭以保持简洁
  "guides.includeHorizontalGuides": false,

  // ✅ 高亮当前缩进层的引导线（与光标所在层一致）
  "guides.highlightActive": true,

  // 🎨 普通缩进层引导线颜色（灰色）
  // "guides.normal.color": "#888888",

  // 🎯 当前激活层（光标所在）缩进线颜色（蓝绿色）
  // "guides.active.color": "#00BCD4",

  // ❗ 错误缩进层颜色（例如代码不规范时），通常不常出现
  // "guides.error.color": "#FF0000",

  // ✅ 是否在文件底部空行也显示缩进线
  "guides.trailingBlankLines": true
}
```
