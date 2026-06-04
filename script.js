 AOS.init({ duration: 800, once: true });
  // dark mode
  const toggle = document.getElementById('darkModeToggle');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = toggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) icon.classList.replace('fa-moon', 'fa-sun');
    else icon.classList.replace('fa-sun', 'fa-moon');
  });
  // course filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseItems = document.querySelectorAll('.course-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      courseItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-level') === filter) item.style.display = 'block';
        else item.style.display = 'none';
      });
    });
  });
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== "#" && href !== "#!") {
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      }
    });
  });
  // contact form prevention
  document.getElementById('contactForm')?.addEventListener('submit', (e) => { e.preventDefault(); alert('Thank you! We’ll contact you soon.'); });
