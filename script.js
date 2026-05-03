 function toggleSearch() {
    document.getElementById('searchInput').classList.toggle('open');
  }

// Contact Page Js 
  const form = document.getElementById('contactForm');
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

    // Privacy-Policy Page Js

   // Set effective date dynamically (formatted like: MAY 03, 2026)
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

// Back button — go to previous page if possible
(function backBtn(){
  const btn = document.getElementById('backBtn');
  if(!btn) return;
  btn.addEventListener('click', function(e){
    e.preventDefault();
    if(window.history.length > 1){ window.history.back(); }
    else { window.location.href = '/'; }
  });
})();

// Header: hide on scroll-down, show on scroll-up
(function headerScroll(){
  const header = document.getElementById('siteHeader');
  if(!header) return;
  let lastY = window.scrollY;
  let ticking = false;
  const THRESHOLD = 8;     // ignore tiny jitter
  const TOP_GUARD = 80;    // always show near top

  function onScroll(){
    const y = window.scrollY;
    const diff = y - lastY;

    if(y > 10) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');

    if(y < TOP_GUARD){
      header.classList.remove('is-hidden');     // always visible at top
    } else if(diff > THRESHOLD){
      header.classList.add('is-hidden');        // scrolling down → hide
    } else if(diff < -THRESHOLD){
      header.classList.remove('is-hidden');     // scrolling up → show
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function(){
    if(!ticking){
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
})();

// Smooth scroll reveal for policy items
(function reveal(){
  const items = document.querySelectorAll('.policy-item, .cta-card');
  if(!('IntersectionObserver' in window)){
    items.forEach(i => i.style.opacity = 1);
    return;
  }
  items.forEach(i => {
    i.style.opacity = '0';
    i.style.transform = 'translateY(16px)';
    i.style.transition = 'opacity .6s ease, transform .6s ease';
  });
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});
  items.forEach(i => io.observe(i));
})();


