(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.markedPreserveLatexDelimiters = factory());
})(this, (function () {
  'use strict';

  function preserveLatexDelimiters () {
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

  return preserveLatexDelimiters;
}));
