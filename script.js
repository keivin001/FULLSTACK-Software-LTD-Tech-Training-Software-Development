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
      if (!href || href === "#" || href === "#!") {
        e.preventDefault();
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const courseModal = document.getElementById('courseModal');
  const courseModalTitle = document.querySelector('.course-modal-title');
  const courseModalDescription = document.querySelector('.course-modal-description');
  const courseModalDuration = document.querySelector('.course-modal-duration');
  const courseModalLevel = document.querySelector('.course-modal-level');
  const courseModalPrice = document.querySelector('.course-modal-price');
  const courseModalInstructor = document.querySelector('.course-modal-instructor');
  const courseModalEnroll = document.querySelector('.course-modal-enroll');
  const courseModalEnrollText = courseModalEnroll?.querySelector('.course-modal-enroll-text');
  const courseModalWhatsapp = document.querySelector('.course-modal-whatsapp');
  const courseModalIcon = document.querySelector('.course-modal-icon i');
  const courseModalEnrollIcon = document.querySelector('.course-modal-enroll-icon');
  const blogModal = document.getElementById('blogModal');
  const blogModalTitle = document.querySelector('.blog-modal-title');
  const blogModalDate = document.querySelector('.blog-modal-date');
  const blogModalContent = document.querySelector('.blog-modal-content');
  const blogModalIcon = document.querySelector('.blog-modal-icon i');
  const blogModalClose = document.querySelector('.blog-modal-close');

  function openCourseModal(courseData) {
    courseModalTitle.textContent = courseData.name;
    courseModalDescription.textContent = courseData.description;
    courseModalDuration.textContent = courseData.duration;
    courseModalLevel.textContent = courseData.level;
    courseModalPrice.textContent = courseData.price;
    courseModalInstructor.textContent = courseData.instructor;
    if (courseModalEnrollText) {
      courseModalEnrollText.textContent = `Request ${courseData.name}`;
    }
    const whatsappText = encodeURIComponent(`Hello FULLSTACK Software LTD, I am interested in the ${courseData.name} course. Please send me more details.`);
    const whatsappNumber = '250798561792';
    if (courseModalWhatsapp) {
      courseModalWhatsapp.href = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
    }
    const iconClass = courseData.icon || 'fas fa-graduation-cap';
    if (courseModalIcon) {
      courseModalIcon.className = iconClass;
    }
    if (courseModalEnrollIcon) {
      courseModalEnrollIcon.className = `course-modal-enroll-icon me-2 ${iconClass}`;
    }
    courseModal.classList.remove('hidden');
  }

  function closeCourseModal() {
    courseModal.classList.add('hidden');
  }

  document.querySelectorAll('.read-more-link').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      if (!blogModal) return;
      const title = link.dataset.title || 'Blog Article';
      const date = link.dataset.date || '';
      const rawContent = link.dataset.content || '';
      const iconClass = link.dataset.icon || 'fas fa-newspaper';
      const paragraphs = rawContent.split('||').map(text => text.trim()).filter(Boolean);
      if (blogModalIcon) blogModalIcon.className = iconClass;
      if (blogModalTitle) blogModalTitle.textContent = title;
      if (blogModalDate) blogModalDate.textContent = date;
      if (blogModalContent) {
        blogModalContent.innerHTML = paragraphs.map(text => `<p>${text}</p>`).join('');
      }
      blogModal.classList.remove('hidden');
    });
  });

  blogModalClose?.addEventListener('click', () => {
    blogModal?.classList.add('hidden');
  });

  blogModal?.addEventListener('click', (event) => {
    if (event.target === blogModal) closeBlogModal();
  });

  function closeBlogModal() {
    blogModal?.classList.add('hidden');
  }

  document.querySelectorAll('.enroll-button').forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const courseData = {
        name: button.dataset.course,
        duration: button.dataset.duration,
        price: button.dataset.price,
        level: button.dataset.level,
        instructor: button.dataset.instructor,
        description: button.dataset.description,
        icon: button.dataset.icon,
      };
      openCourseModal(courseData);
    });
  });

  document.querySelectorAll('.course-modal-close, .course-modal-close-btn').forEach(closeBtn => {
    closeBtn.addEventListener('click', closeCourseModal);
  });

  courseModal.addEventListener('click', (event) => {
    if (event.target === courseModal) closeCourseModal();
  });

  const navbarCollapse = document.getElementById('navbarNav');
  const navbarTogglerIcon = document.querySelector('.navbar-menu-icon');
  if (navbarCollapse && navbarTogglerIcon) {
    navbarCollapse.addEventListener('show.bs.collapse', () => {
      navbarTogglerIcon.classList.replace('fa-bars', 'fa-xmark');
    });
    navbarCollapse.addEventListener('hide.bs.collapse', () => {
      navbarTogglerIcon.classList.replace('fa-xmark', 'fa-bars');
    });
  }

  const contactForm = document.getElementById('contactForm');
  const contactSubject = document.getElementById('contactSubject');
  const contactMessage = document.getElementById('contactMessage');
  const contactCourse = document.getElementById('contactCourse');
  const contactResponse = document.getElementById('contactResponse');

  courseModalEnroll.addEventListener('click', () => {
    closeCourseModal();
    const contactSection = document.querySelector('#contact');
    if (contactCourse) contactCourse.value = courseModalTitle.textContent;
    if (contactSubject) contactSubject.value = `Requesting ${courseModalTitle.textContent}`;
    if (contactMessage) contactMessage.value = `Hello, I would like to enroll in ${courseModalTitle.textContent}. Please send me more information about the course.`;
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    const nameField = document.getElementById('contactName');
    if (nameField) nameField.focus();
  });

  document.getElementById('requestTrainingBtn')?.addEventListener('click', () => {
    const contactSection = document.querySelector('#contact');
    const nameField = document.getElementById('contactName');
    const contactCourseField = document.getElementById('contactCourse');
    if (contactCourseField) contactCourseField.value = 'General Training Request';
    if (contactSubject) contactSubject.value = 'Requesting Training Consultation';
    if (contactMessage) contactMessage.value = 'Hello, I would like to request training information and pricing. Please contact me with the next steps.';
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    if (nameField) nameField.focus();
  });

  document.getElementById('newsletterForm')?.addEventListener('submit', (event) => {
    const emailInput = document.getElementById('newsletterEmail');
    if (!emailInput || emailInput.value.trim() === '') {
      event.preventDefault();
      alert('Please enter your email address to subscribe.');
      emailInput?.focus();
      return;
    }
    alert(`Thanks! We'll keep you updated at ${emailInput.value.trim()}.`);
  });

  contactForm?.addEventListener('submit', (event) => {
    const nameField = document.getElementById('contactName');
    const emailField = document.getElementById('contactEmail');
    const messageField = document.getElementById('contactMessage');

    if (!nameField?.value.trim() || !emailField?.value.trim() || !messageField?.value.trim()) {
      event.preventDefault();
      alert('Please fill in your name, email, and message before submitting your request.');
      nameField?.focus();
      return;
    }

    if (contactResponse) {
      contactResponse.textContent = 'Your course request has been submitted. We will contact you shortly with a response.';
      contactResponse.classList.remove('visually-hidden');
    }

    setTimeout(() => {
      if (contactResponse) contactResponse.classList.add('visually-hidden');
    }, 7000);
  });
