# Marked Preserve LaTeX Delimiters Extension

## Background

Many modern applications and tools, especially those involving Large Language Models (LLMs), use `\(...\)` and `\[...\]` as delimiters for LaTeX formulas. However, the [Marked](https://github.com/markedjs/marked) Markdown parser converts these delimiters into `(...)` and `[...]`, which cannot be processed by [KaTeX](https://katex.org/). While the [marked-katex-extension](https://github.com/UziTech/marked-katex-extension) handles `$...$` and `$$...$$` delimiters, it does not preserve `\(...\)` and `\[...\]`.

This extension ensures that `\(...\)` and `\[...\]` delimiters are preserved, allowing Marked to correctly render Markdown containing these LaTeX formulas.

## What It Can Do

- Preserves `\(...\)` and `\[...\]` delimiters in Markdown content.
- Works alongside the `marked-katex-extension` to render both `$...$` and `\(...\)` syntaxes.
- Ensures compatibility with KaTeX for rendering mathematical expressions.

## Example

```html
<!DOCTYPE html>
<html>

<head>
  <!-- Load Marked -->
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

  <!-- Load KaTeX CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">

  <!-- Load KaTeX JS -->
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>

  <!-- Load Marked-KaTeX Extension -->
  <script src="https://cdn.jsdelivr.net/npm/marked-katex-extension@5.1.4/lib/index.umd.js"></script>

  <!-- This Extension -->
  <script src="https://zjyang.dev/static/marked-preserve-latex-delimiters.js"></script>

  <!-- Or, you can paste the function directly -->
  <!--
  <script>
    function markedPreserveLatexDelimiters () {
      const render = token => katex.renderToString(token.text, {
        displayMode: token.displayMode,
        throwOnError: false
      });

      return {
        extensions: [{
          name: 'inlineLatex',
          level: 'inline',
          start: src => src.indexOf('\\(') === 0,
          tokenizer (src) {
            const match = src.match(/^\\\(((?:\\[^]|[^\\])+?)\\\)/);
            if (match) {
              return {
                type: 'inlineLatex',
                raw: match[0],
                text: match[1].trim(),
                displayMode: false
              };
            }
          },
          renderer: render
        }, {
          name: 'blockLatex',
          level: 'block',
          start: src => src.indexOf('\\[') === 0,
          tokenizer (src) {
            const match = src.match(/^\\\[((?:\\[^]|[^\\])+?)\\\]/);
            if (match) {
              return {
                type: 'blockLatex',
                raw: match[0],
                text: match[1].trim(),
                displayMode: true
              };
            }
          },
          renderer: t => render(t) + '\n'
        }]
      };
    }
  </script>
  -->
</head>

<body>
  <div id="output"></div>

  <script>
    // KaTeX options
    const options = {
      throwOnError: false,
    };

    // Use both extensions
    marked.use(markedKatex(options)); // For $...$ and $$...$$
    marked.use(markedPreserveLatexDelimiters()); // For \(...\) and \[...\]

    // Markdown content with both LaTeX syntaxes
    const markdownText = `
This is inline katex: \\(c = \\pm\\sqrt{a^2 + b^2}\\)

This is block level katex:

\\[ c = \\pm\\sqrt{a^2 + b^2} \\]

This is inline katex: $c = \\pm\\sqrt{a^2 + b^2}$

This is block level katex:

$$
c = \\pm\\sqrt{a^2 + b^2}
$$
    `;

    // Render the Markdown
    document.getElementById('output').innerHTML = marked.parse(markdownText);
  </script>
</body>

</html>
```

