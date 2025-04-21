**引言**

HTML (HyperText Markup Language) 是创建网页内容结构的标准标记语言。浏览器解析 HTML 代码，将其渲染成用户看到的页面。下面我们将分模块详细介绍 HTML 的各个方面。

---

**模块 1: HTML 基础与文档结构**

**目标:** 了解 HTML 的基本概念和标准文档结构。

* **什么是 HTML?**
    * 超文本标记语言，用于定义网页的**结构**和**内容**。
    * 使用**标签 (Tags)** 来标记内容。

* **基本文档结构:** 每个 HTML 文档都应遵循此基本结构。

    ```html
    <!DOCTYPE html>
    <html lang="zh-CN">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="这是页面的描述，会显示在搜索结果中">
            <title>页面标题</title>
        </head>

    <body>
        <h1>我的第一个网页</h1>
        <p>欢迎来到我的网站！</p>
    </body>

    </html>
    ```

**关键点:**
* `<!DOCTYPE html>`：必须放在最前面。
* `<html>`：根元素，包含 `lang` 属性。
* `<head>`：元数据容器，`charset`, `viewport`, `title` 是常见的子元素。
* `<body>`：可见内容的容器。

---

**模块 2: 核心概念 - 元素、标签、属性**

**目标:** 理解构成 HTML 的基本单位及其工作方式。

* **元素 (Element):** HTML 的基本构建块。
    * **结构:** 通常由 `开始标签` + `内容` + `结束标签` 组成。
    * **示例:**
        ```html
        <p>这是一个段落元素。</p>
        ```
        这里，`<p>` 是开始标签，`这是一个段落元素。` 是内容，`</p>` 是结束标签。

* **标签 (Tag):** 用尖括号 `<>` 包裹的名称，如 `<p>`, `<h1>`, `<img>`。结束标签带斜杠 `/`。推荐使用小写。

* **空元素 (Void Element):** 没有内容的元素，只有开始标签（可在标签内自闭合，HTML5中斜杠可选）。
    * **示例:**
        ```html
        换行：<br>
        水平线：<hr>
        图片：<img src="logo.png" alt="网站 Logo"> ```

* **属性 (Attribute):** 在**开始标签**中为元素提供额外信息，形式为 `名称="值"`。
    * **示例:**
        ```html
        <a href="https://www.google.com">访问谷歌</a>

        <img src="photo.jpg" alt="风景照片">

        <input type="text" id="username" name="user" required>
        ```

* **嵌套 (Nesting):** 元素可以包含其他元素，形成层级结构。必须正确嵌套（标签不能交叉）。
    * **正确示例:** `<div><p>一些文本</p></div>`
    * **错误示例:** `<div><p>一些文本</div></p>` (标签交叉)

* **全局属性 (Global Attributes):** 可用于几乎所有 HTML 元素。
    * **示例:**
        ```html
        <h1 id="main-title">主标题</h1>

        <p class="important intro">这是重要的介绍段落。</p>

        <span style="color: blue; font-weight: bold;">蓝色粗体文本</span>

        <abbr title="HyperText Markup Language">HTML</abbr>
        ```

---

**模块 3: 文本格式化与内容**

**目标:** 学习用于组织和表示文本内容的各种标签。

* **标题 (Headings):** `<h1>` 到 `<h6>` 定义不同级别的标题。
    ```html
    <h1>一级标题 (最重要的)</h1>
    <h2>二级标题</h2>
    <h3>三级标题</h3>
    ```

* **段落 (Paragraph):** `<p>` 定义一个文本段落。
    ```html
    <p>这是一个段落。浏览器会自动在段落前后添加一些空白。</p>
    <p>这是另一个段落。</p>
    ```

* **强调 (Emphasis):**
    * `<strong>`: 表示内容的重要性、严重性或紧急性 (通常显示为粗体)。
    * `<em>`: 表示需要强调的内容 (通常显示为斜体)。
    ```html
    <p><strong>警告：</strong> 操作不可逆！</p>
    <p>请 <em>务必</em> 阅读说明。</p>
    ```

* **格式化 (无额外语义):**
    * `<b>`: 粗体文本。
    * `<i>`: 斜体文本。
    * `<u>`: 下划线文本 (避免使用，易与链接混淆)。
    * `<s>`: 删除线文本 (不再相关或准确)。
    ```html
    <p>这是 <b>粗体</b> 文本，这是 <i>斜体</i> 文本。</p>
    ```

* **通用容器:**
    * `<span>`: 内联 (inline) 容器，用于组合行内元素或应用样式。
    * `<div>`: 块级 (block) 容器，用于组合块级元素或划分页面区域。
    ```html
    <p>部分文本需要<span style="color: red;">标红</span>显示。</p>
    <div class="content-block">
      <h2>区块标题</h2>
      <p>区块内容...</p>
    </div>
    ```

* **换行与分割线:**
    * `<br>`: 强制换行。
    * `<hr>`: 水平分割线，表示主题内容的切换。
    ```html
    地址：<br>
    北京市朝阳区<br>
    某某街道 123 号
    <hr>
    下一部分内容...
    ```

* **列表 (Lists):**
    * `<ul>`: 无序列表 (项目符号)。
    * `<ol>`: 有序列表 (数字或字母)。
    * `<li>`: 列表项。
    * `<dl>`, `<dt>`, `<dd>`: 定义列表/描述列表。
    ```html
    <ul>
      <li>苹果</li>
      <li>香蕉</li>
      <li>橙子</li>
    </ul>

    <ol type="A" start="3"> <li>第一步</li>
      <li>第二步</li>
      <li>第三步</li>
    </ol>

    <dl>
      <dt>HTML</dt>
      <dd>超文本标记语言，用于构建网页结构。</dd>
      <dt>CSS</dt>
      <dd>层叠样式表，用于设置网页样式。</dd>
    </dl>
    ```

* **链接 (Links):** `<a>` (Anchor)
    * `href`: 目标 URL。
    * `target="_blank"`: 在新标签页打开链接。
    ```html
    <a href="https://developer.mozilla.org/">MDN Web 文档</a>

    <a href="page2.html" target="_blank">打开第二页</a>

    <a href="#section2">跳转到第二部分</a>
    <h2 id="section2">第二部分</h2>
    ```

* **引用 (Quotes):**
    * `<blockquote>`: 块级引用。
    * `<q>`: 行内引用。
    * `<cite>`: 引用作品标题。
    ```html
    <blockquote cite="http://example.com/source">
      <p>这是一个较长的引用段落。</p>
    </blockquote>
    <p>他说：<q>你好！</q></p>
    <p>我正在阅读 <cite>《百年孤独》</cite>。</p>
    ```

* **代码与预格式化文本:**
    * `<pre>`: 保留空格和换行，适合显示代码块。
    * `<code>`: 表示计算机代码片段。
    ```html
    <pre><code>
    function greet(name) {
      console.log("Hello, " + name + "!");
    }
    greet("World");
    </code></pre>
    <p>使用 <code>document.getElementById()</code> 方法获取元素。</p>
    ```

---

**模块 4: 图像与多媒体**

**目标:** 学习如何在网页中嵌入图像、音频和视频。

* **图像 (Image):** `<img>`
    * `src`: 图像文件路径 (**必需**)。
    * `alt`: 替代文本 (**必需**)，用于可访问性和 SEO。
    * `width`, `height`: 图像尺寸 (可选，设置一个可保持比例)。
    ```html
    <img src="images/logo.png" alt="公司 Logo" width="150">
    ```

* **图像容器 (Figure & Figcaption):** `<figure>` 包裹图像和其标题 `<figcaption>`。
    ```html
    <figure>
      <img src="chart.png" alt="2024 年销售图表">
      <figcaption>图 1: 2024 年度销售数据图表</figcaption>
    </figure>
    ```

* **音频 (Audio):** `<audio>`
    * `controls`: 显示浏览器默认播放控件。
    * `<source>`: 指定多种音频格式以兼容不同浏览器。
    ```html
    <audio controls>
      <source src="sound.mp3" type="audio/mpeg">
      <source src="sound.ogg" type="audio/ogg">
      您的浏览器不支持 audio 元素。
    </audio>
    ```

* **视频 (Video):** `<video>`
    * `controls`: 显示播放控件。
    * `width`, `height`: 播放器尺寸。
    * `poster`: 视频加载前显示的预览图。
    ```html
    <video controls width="640" height="360" poster="preview.jpg">
      <source src="movie.mp4" type="video/mp4">
      <source src="movie.webm" type="video/webm">
      您的浏览器不支持 video 元素。
    </video>
    ```

---

**模块 5: 表格 (Tables)**

**目标:** 学习创建和组织表格数据。

* **基本结构:** `<table>`, `<tr>` (行), `<th>` (表头单元格), `<td>` (数据单元格)。
* **结构化:** `<thead>`, `<tbody>`, `<tfoot>` 用于分组。
* **合并单元格:** `colspan` (跨列), `rowspan` (跨行)。
* **可访问性:** `<caption>` (表格标题), `scope` 属性 (`col` 或 `row`) 用于 `<th>`。

```html
<table border="1"> <caption>员工信息表</caption>
  <thead>
    <tr>
      <th scope="col">姓名</th>
      <th scope="col">部门</th>
      <th scope="col">入职年份</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>张三</td>
      <td>技术部</td>
      <td>2020</td>
    </tr>
    <tr>
      <td>李四</td>
      <td rowspan="2">市场部</td> <td>2021</td>
    </tr>
     <tr>
      <td>王五</td>
      <td>2022</td>
    </tr>
     <tr>
      <td colspan="2">赵六 (横跨姓名和部门两列)</td> <td>2023</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">统计日期：2025-04-15</td> </tr>
  </tfoot>
</table>
```

---

**模块 6: 表单 (Forms)**

**目标:** 学习创建用于收集用户输入的表单。

* **表单容器:** `<form>`
    * `action`: 数据提交的 URL。
    * `method`: 提交方法 (`GET` 或 `POST`)。

* **标签:** `<label>` 关联表单控件，提高可访问性。
    * `for` 属性指向控件的 `id`。

* **输入控件:** `<input>` (最常用)
    * `type`: 决定控件类型 (text, password, checkbox, radio, submit, file, email, number, date, etc.)。
    * `name`: 控件名称，用于提交数据。
    * `value`: 控件的值。
    * `placeholder`: 输入提示。
    * `required`: 必填项。

* **其他控件:** `<textarea>` (多行文本), `<select>` + `<option>` (下拉列表), `<button>` (按钮)。

```html
<form action="/submit-form" method="post">
  <fieldset> <legend>用户信息</legend> <div>
      <label for="username">用户名:</label>
      <input type="text" id="username" name="username" required placeholder="请输入用户名">
    </div>

    <div>
      <label for="password">密码:</label>
      <input type="password" id="password" name="password" required>
    </div>

    <div>
      <label for="email">邮箱:</label>
      <input type="email" id="email" name="email" placeholder="例如: user@example.com">
    </div>

    <div>
      <label for="gender">性别:</label>
      <input type="radio" id="male" name="gender" value="male" checked> <label for="male">男</label>
      <input type="radio" id="female" name="gender" value="female"> <label for="female">女</label>
    </div>

    <div>
      <label>兴趣爱好:</label><br>
      <input type="checkbox" id="coding" name="interests" value="coding"> <label for="coding">编程</label>
      <input type="checkbox" id="reading" name="interests" value="reading"> <label for="reading">阅读</label>
      <input type="checkbox" id="travel" name="interests" value="travel"> <label for="travel">旅游</label>
    </div>

     <div>
        <label for="country">国家:</label>
        <select id="country" name="country">
          <option value="">--请选择--</option>
          <option value="cn">中国</option>
          <option value="us">美国</option>
          <option value="jp" selected>日本</option> </select>
      </div>

    <div>
      <label for="message">留言:</label><br>
      <textarea id="message" name="message" rows="4" cols="50" placeholder="请输入留言"></textarea>
    </div>

    <div>
      <label for="avatar">上传头像:</label>
      <input type="file" id="avatar" name="avatar" accept="image/*"> </div>

  </fieldset>

  <div>
    <button type="submit">提交</button>
    <button type="reset">重置</button>
    <button type="button" onclick="alert('Hello!')">点击我</button>
  </div>

</form>
```

---

**模块 7: 语义化 HTML (HTML5)**

**目标:** 理解并使用 HTML5 语义化标签构建更有意义的页面结构。

* **为什么用语义化标签?**
    * **SEO:** 帮助搜索引擎理解页面结构和内容重要性。
    * **可访问性:** 帮助屏幕阅读器等辅助技术解析页面。
    * **可维护性:** 使代码更清晰易懂。

* **常用语义化元素:**
    * `<header>`: 页眉或区域头部。
    * `<footer>`: 页脚或区域尾部。
    * `<nav>`: 导航链接区域。
    * `<main>`: 页面主体内容 (每个页面唯一)。
    * `<article>`: 独立的、可分发的内容单元 (如博客文章)。
    * `<section>`: 文档中按主题分组的区域。
    * `<aside>`: 侧边栏内容 (与主内容相关性较低)。

* **示例页面结构:**

    ```html
    <body>
      <header>
        <h1>网站标题</h1>
        <nav>
          <ul>
            <li><a href="/">首页</a></li>
            <li><a href="/about">关于</a></li>
            <li><a href="/contact">联系</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <article>
          <h2>文章标题</h2>
          <p>文章第一段...</p>
          <section>
            <h3>小节标题 1</h3>
            <p>小节内容...</p>
          </section>
          <section>
            <h3>小节标题 2</h3>
            <p>小节内容...</p>
          </section>
        </article>

        <aside>
          <h3>相关链接</h3>
          <ul>
            <li><a href="#">链接 1</a></li>
            <li><a href="#">链接 2</a></li>
          </ul>
        </aside>
      </main>

      <footer>
        <p>&copy; 2025 我的网站. 保留所有权利。</p>
      </footer>
    </body>
    ```

---

**模块 8: 链接 CSS 与 JavaScript**

**目标:** 了解如何在 HTML 中引入样式和脚本。

* **链接外部 CSS:** 使用 `<link>` 标签，通常放在 `<head>` 中。
    ```html
    <head>
      <link rel="stylesheet" href="styles.css"> </head>
    ```

* **内部 CSS:** 使用 `<style>` 标签，通常放在 `<head>` 中（或 `<body>` 中，但不推荐）。
    ```html
    <head>
      <style>
        body {
          font-family: sans-serif;
        }
        h1 {
          color: navy;
        }
      </style>
    </head>
    ```

* **链接外部 JavaScript:** 使用 `<script>` 标签的 `src` 属性。通常放在 `<body>` 结束前，以避免阻塞页面渲染。
    ```html
    <body>
      <script src="scripts/main.js"></script> </body>
    ```
    * `async` 属性：异步加载并执行脚本，不保证执行顺序。
    * `defer` 属性：异步加载脚本，但在 HTML 解析完成后、`DOMContentLoaded` 事件前按顺序执行。

* **内部 JavaScript:** 直接在 `<script>` 标签内编写代码。
    ```html
    <body>
      <script>
        console.log("页面加载完成！");
        // 不推荐在此写大量代码
      </script>
    </body>
    ```

**核心原则:** 分离关注点 - HTML (结构), CSS (样式), JavaScript (行为)。尽量使用外部文件。

---

**模块 9: HTML 实体与注释**

**目标:** 学习如何在 HTML 中显示特殊字符和添加注释。

* **HTML 实体 (Entities):** 用于显示 HTML 预留字符或特殊符号。
    * **格式:** `&名称;` 或 `&#数字;`
    * **示例:**
        ```html
        <p>要显示小于号 (<) 和大于号 (>)，需要使用实体：&lt; 和 &gt;。</p>
        <p>显示和号 (&)：&amp;</p>
        <p>显示版权符号 (©)：&copy; 或 &#169;</p>
        <p>插入一个不间断空格：&nbsp; 这里不会断行。</p>
        ```

* **HTML 注释 (Comments):** 用于添加开发者注释，浏览器会忽略注释内容。
    * **格式:** ``
    * **示例:**
        ```html
        ```

---

**模块 10: 其他重要概念**

**目标:** 简要了解一些其他相关技术和概念。

* **内联框架 (Inline Frame):** `<iframe>` 用于在当前页面嵌入另一个 HTML 页面。
    ```html
    <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=..." width="600" height="450" style="border:0;"></iframe>
    ```

* **HTML 验证 (Validation):** 检查 HTML 代码是否符合 W3C 标准，确保兼容性和质量。使用 W3C 验证器 ([https://validator.w3.org/](https://validator.w3.org/))。

* **可访问性 (Accessibility - a11y):** 使网站内容能被包括残障人士在内的所有人访问。关键在于：
    * 使用语义化标签。
    * 提供 `alt` 文本。
    * 正确使用 `<label>`。
    * 确保键盘可导航。
    * (结合 CSS) 保证足够的色彩对比度。
    * 使用 ARIA 属性 (在需要时)。

* **HTML5 APIs:** HTML5 引入了许多强大的 JavaScript API，如 Geolocation, Web Storage (localStorage, sessionStorage), Web Workers, WebSocket, Canvas, Drag and Drop 等，用于实现更丰富的 Web 应用功能。

---

**模块 11: 总结与最佳实践**

* **核心:** HTML 定义网页**结构**与**语义**。
* **实践:**
    * 始终使用 `<!DOCTYPE html>` 和正确的文档结构。
    * 使用语义化标签 (`<header>`, `<nav>`, `<main>`, etc.)。
    * 验证 HTML 代码。
    * 为图像提供 `alt` 文本。
    * 正确使用 `<label>` 关联表单控件。
    * 分离 HTML, CSS, JavaScript。
    * 保持代码整洁、缩进良好。
    * 优先考虑可访问性。
    * 使用 UTF-8 编码。
