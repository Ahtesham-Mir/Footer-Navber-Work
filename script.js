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
