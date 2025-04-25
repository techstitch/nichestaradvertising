window.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.querySelector('#page-content');
  
    function loadPage(href, addToHistory = true) {
      fetch(href)
        .then(res => res.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const newContent = doc.querySelector('#page-content');
  
          if (newContent) {
            // Animate out
            contentContainer.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            contentContainer.style.transform = 'translateX(-100px)';
            contentContainer.style.opacity = '0';
  
            setTimeout(() => {
              contentContainer.innerHTML = newContent.innerHTML;
  
              // Animate in
              contentContainer.style.transform = 'translateX(100px)';
              contentContainer.style.opacity = '0';
  
              setTimeout(() => {
                contentContainer.style.transform = 'translateX(0)';
                contentContainer.style.opacity = '1';
              }, 30);
  
              // Dynamically load <script> tags from the new page
              const newScripts = doc.querySelectorAll('script');
              newScripts.forEach(script => {
                const s = document.createElement('script');
                if (script.src) {
                  s.src = script.src;
                } else {
                  s.textContent = script.textContent;
                }
                document.body.appendChild(s);
              });
  
              if (addToHistory) {
                history.pushState(null, '', href);
              }
            }, 300);
          }
        });
    }
  
    // Intercept all internal link clicks
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      const isInternal = link.hostname === window.location.hostname;
  
      if (isInternal && !href.startsWith('#') && !link.hasAttribute('download') && !link.target) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          loadPage(href);
        });
      }
    });
  
    // Handle back/forward button
    window.addEventListener('popstate', () => {
      loadPage(location.pathname, false);
    });
  });
  