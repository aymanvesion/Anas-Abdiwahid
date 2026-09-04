/**
 * Admin Panel JavaScript Interactivity
 * Anas Abdiwahid Portfolio Backend
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dark / Light Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  const savedTheme = localStorage.getItem('admin_theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('admin_theme', next);
    });
  }

  // 2. Mobile Sidebar Toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('adminSidebar');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('show') && !sidebar.contains(e.target) && e.target !== menuToggle) {
        sidebar.classList.remove('show');
      }
    });
  }

  // 3. Confirm Delete Actions
  document.querySelectorAll('[data-confirm]').forEach(el => {
    el.addEventListener('click', (e) => {
      const msg = el.getAttribute('data-confirm') || 'Are you sure you want to delete this item?';
      if (!confirm(msg)) {
        e.preventDefault();
      }
    });
  });

  // 4. Dynamic Image Preview for file inputs
  document.querySelectorAll('input[type="file"][data-preview]').forEach(input => {
    input.addEventListener('change', function() {
      const targetId = this.getAttribute('data-preview');
      const previewEl = document.getElementById(targetId);
      
      if (previewEl && this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewEl.src = e.target.result;
          previewEl.style.display = 'block';
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  });

  // 5. Auto dismiss alert messages after 5 seconds
  const alertBox = document.querySelector('.alert');
  if (alertBox) {
    setTimeout(() => {
      alertBox.style.transition = 'opacity 0.5s ease';
      alertBox.style.opacity = '0';
      setTimeout(() => alertBox.remove(), 500);
    }, 5000);
  }
});
