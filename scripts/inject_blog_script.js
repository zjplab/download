// Function to dynamically load CSS files into the document head
function loadCSS(url) {
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}

// Function to dynamically load JavaScript files into the document head
function loadScript(url, isModule = false) {
    const script = document.createElement('script');
    script.src = url;
    if (isModule) {
        script.type = 'module';
    }
    document.head.appendChild(script);
}

// Load CSS files
loadCSS('https://zjplab.github.io/download/prism.css');
loadCSS('https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.18.2/tocbot.css');

// Load JavaScript files
loadScript('https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.18.2/tocbot.min.js');
loadScript('https://zjplab.github.io/download/prism.js');

// Load MathJax and Mermaid with specific configurations
loadScript('http://cdn.mathjax.org/mathjax/latest/MathJax.js', true);
document.addEventListener('DOMContentLoaded', function() {
    window.MathJax = {
        extensions: ["tex2jax.js", "TeX/AMSmath.js", "TeX/AMSsymbols.js"],
        jax: ["input/TeX", "output/HTML-CSS"],
        tex2jax: {
            inlineMath: [['$', '$'], ["\\(", "\\)"]],
            displayMath: [['$$', '$$'], ["\\[", "\\]"]],
        },
        "HTML-CSS": { availableFonts: ["TeX"] }
    };
});

// Since Mermaid is ES module based, it needs to be handled specifically
loadScript('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs', true);
