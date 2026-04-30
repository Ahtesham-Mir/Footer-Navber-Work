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