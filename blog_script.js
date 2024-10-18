// Function to inject CSS between head and body
function injectCSS(url) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.parentNode.insertBefore(link, document.body);
}

// Inject Prism.css and Tocbot.css between the head and body
injectCSS('https://zjplab.github.io/download/prism.css');
injectCSS('https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.18.2/tocbot.css');

// Add MathJax to the head
(function() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    script.async = true;
    document.head.appendChild(script);

    MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']]
        },
        options: {
            renderActions: {
                addMenu: []
            }
        }
    };
})();

// Add Mermaid to the head
(function() {
    var script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    script.onload = function() {
        mermaid.initialize({ startOnLoad: true });
    };
    document.head.appendChild(script);
})();

// Add Tocbot to the head
(function() {
    var script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.18.2/tocbot.min.js";
    script.async = true;
    script.onload = function() {
        tocbot.init({
            tocSelector: '.toc',
            contentSelector: '.content',
            headingSelector: 'h1, h2, h3'
        });
    };
    document.head.appendChild(script);
})();

// Add Prism.js to the head
(function() {
    var script = document.createElement('script');
    script.src = "https://zjplab.github.io/download/prism.js";
    script.async = true;
    document.head.appendChild(script);
})();
