function toggleSearch() {
  document.getElementById('searchInput').classList.toggle('open');
}

// Contact Page Js
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';

    if (name.length < 2) { document.getElementById('nameError').textContent = 'Please enter your name'; valid = false; }
    if (!email.includes('@') || !email.includes('.')) { document.getElementById('emailError').textContent = 'Enter a valid email address'; valid = false; }
    if (message.length < 10) { document.getElementById('messageError').textContent = 'Message must be at least 10 characters'; valid = false; }

    if (valid) {
      alert("Thank you for reaching out! We'll get back to you soon.");
      form.reset();
    }
  });
}

// Privacy-Policy Page Js
(function setEffectiveDate(){
  const el = document.getElementById('effectiveDate');
  if(!el) return;
  const d = new Date();
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const day = String(d.getDate()).padStart(2,'0');
  el.textContent = `EFFECTIVE: ${months[d.getMonth()]} ${day}, ${d.getFullYear()}`;
})();

// Auto year in footer
(function setYear(){
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();

// Back to Top Button
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  function toggleBtn() {
    if (window.scrollY > 400) btn.classList.add('show');
    else btn.classList.remove('show');
  }

  window.addEventListener('scroll', toggleBtn, { passive: true });
  toggleBtn();

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});


// About Us Js
// Back to Top button — appears after 400px scroll
(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  const toggle = () => {
    if (window.scrollY > 400) btn.classList.add('show');
    else btn.classList.remove('show');
  };
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// Search — hidden by default. Click SEARCH button: input slides in.
// Type + Enter (or click again when open) to run the search.
(function () {
  const wrap = document.querySelector('.search-wrap');
  const input = document.getElementById('searchInput');
  const btn = document.getElementById('searchBtn');
  if (!wrap || !btn || !input) return;

  const HL_CLASS = 'search-highlight';

  function clearHighlights() {
    document.querySelectorAll('mark.' + HL_CLASS).forEach(m => {
      const parent = m.parentNode;
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    });
  }

  function highlight(term) {
    if (!term) return null;
    const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = node.parentNode;
        if (!p || ['SCRIPT','STYLE','MARK','INPUT','BUTTON'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
        if (p.closest('.navbar') || p.closest('.marquee-bar')) return NodeFilter.FILTER_REJECT;
        return regex.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    let n; while ((n = walker.nextNode())) nodes.push(n);
    let first = null;
    nodes.forEach(node => {
      const frag = document.createDocumentFragment();
      let lastIdx = 0; const text = node.nodeValue;
      text.replace(regex, (match, idx) => {
        frag.appendChild(document.createTextNode(text.slice(lastIdx, idx)));
        const mark = document.createElement('mark');
        mark.className = HL_CLASS;
        mark.textContent = match;
        if (!first) first = mark;
        frag.appendChild(mark);
        lastIdx = idx + match.length;
      });
      frag.appendChild(document.createTextNode(text.slice(lastIdx)));
      node.parentNode.replaceChild(frag, node);
    });
    return first;
  }

  function runSearch() {
    clearHighlights();
    const term = input.value.trim();
    if (!term) return;
    const first = highlight(term);
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    else alert('No results found for "' + term + '"');
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!wrap.classList.contains('open')) {
      // First click: just open the input
      wrap.classList.add('open');
      setTimeout(() => input.focus(), 200);
    } else {
      // Already open: run search if there's a term, else close
      if (input.value.trim()) runSearch();
      else wrap.classList.remove('open');
    }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); runSearch(); }
    if (e.key === 'Escape') { wrap.classList.remove('open'); clearHighlights(); }
  });

  // Click outside closes input (if empty)
  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target) && !input.value.trim()) {
      wrap.classList.remove('open');
    }
  });
})();

// Prevent jump for nav anchor placeholders
document.querySelectorAll('.navbar a').forEach(a => {
  a.addEventListener('click', e => {
    if (a.getAttribute('href') === '#') e.preventDefault();
  });
});
