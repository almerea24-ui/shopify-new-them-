/* ============================================
   JANA — Minimal Fashion Theme JavaScript
   ============================================ */

(function() {
  'use strict';

  /* --- Mobile Menu Drawer --- */
  const menuBtn = document.querySelector('[data-jana-menu-toggle]');
  const menuDrawer = document.querySelector('[data-jana-menu-drawer]');
  const menuOverlay = document.querySelector('[data-jana-menu-overlay]');
  const menuClose = document.querySelector('[data-jana-menu-close]');

  function openMenu() {
    if (menuDrawer) menuDrawer.classList.add('active');
    if (menuOverlay) menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (menuDrawer) menuDrawer.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

  /* --- Cart Drawer --- */
  const cartBtns = document.querySelectorAll('[data-jana-cart-toggle]');
  const cartDrawer = document.querySelector('[data-jana-cart-drawer]');
  const cartOverlay = document.querySelector('[data-jana-cart-overlay]');
  const cartClose = document.querySelector('[data-jana-cart-close]');

  function openCart() {
    if (cartDrawer) cartDrawer.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  cartBtns.forEach(function(btn) {
    btn.addEventListener('click', openCart);
  });
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  /* --- Search Overlay --- */
  const searchBtns = document.querySelectorAll('[data-jana-search-toggle]');
  const searchOverlay = document.querySelector('[data-jana-search-overlay]');
  const searchClose = document.querySelector('[data-jana-search-close]');
  const searchInput = document.querySelector('[data-jana-search-input]');

  function openSearch() {
    if (searchOverlay) searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (searchInput) {
      setTimeout(function() { searchInput.focus(); }, 300);
    }
  }

  function closeSearch() {
    if (searchOverlay) searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  searchBtns.forEach(function(btn) {
    btn.addEventListener('click', openSearch);
  });
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  // Close search on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeSearch();
      closeCart();
      closeMenu();
    }
  });

  /* --- Hero Slideshow --- */
  const heroSlides = document.querySelectorAll('[data-jana-hero-slide]');
  const heroDots = document.querySelectorAll('[data-jana-hero-dot]');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    heroSlides.forEach(function(slide) { slide.classList.remove('active'); });
    heroDots.forEach(function(dot) { dot.classList.remove('active'); });

    if (heroSlides[index]) heroSlides[index].classList.add('active');
    if (heroDots[index]) heroDots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    var next = (currentSlide + 1) % heroSlides.length;
    goToSlide(next);
  }

  if (heroSlides.length > 1) {
    slideInterval = setInterval(nextSlide, 5000);

    heroDots.forEach(function(dot, index) {
      dot.addEventListener('click', function() {
        clearInterval(slideInterval);
        goToSlide(index);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  /* --- Header Hide on Scroll --- */
  const header = document.querySelector('[data-jana-header]');
  let lastScrollY = 0;
  let ticking = false;

  function handleScroll() {
    var currentScrollY = window.scrollY;

    if (header) {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('jana-header--hidden');
      } else {
        header.classList.remove('jana-header--hidden');
      }

      // Transparent header
      if (header.hasAttribute('data-jana-transparent')) {
        if (currentScrollY > 50) {
          header.classList.remove('jana-header--transparent');
          header.style.background = '';
        } else {
          header.classList.add('jana-header--transparent');
        }
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  /* --- Back to Top --- */
  const backToTop = document.querySelector('[data-jana-back-to-top]');

  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Scroll Reveal Animation --- */
  var revealElements = document.querySelectorAll('.jana-reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  }

  /* --- Quantity Selector --- */
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-jana-qty-btn]');
    if (!btn) return;

    var container = btn.closest('[data-jana-qty]');
    if (!container) return;

    var valueEl = container.querySelector('[data-jana-qty-value]');
    if (!valueEl) return;

    var currentVal = parseInt(valueEl.textContent) || 1;
    var action = btn.getAttribute('data-jana-qty-btn');

    if (action === 'minus' && currentVal > 1) {
      valueEl.textContent = currentVal - 1;
    } else if (action === 'plus') {
      valueEl.textContent = currentVal + 1;
    }

    // Trigger change event for cart updates
    var event = new CustomEvent('jana:qty-change', {
      detail: {
        quantity: parseInt(valueEl.textContent),
        container: container
      }
    });
    document.dispatchEvent(event);
  });

  /* --- Add to Cart (AJAX) --- */
  document.addEventListener('submit', function(e) {
    var form = e.target.closest('[data-jana-add-to-cart]');
    if (!form) return;

    e.preventDefault();

    var submitBtn = form.querySelector('[type="submit"]');
    var originalText = submitBtn ? submitBtn.textContent : '';

    if (submitBtn) {
      submitBtn.textContent = 'Adding...';
      submitBtn.disabled = true;
    }

    var formData = new FormData(form);

    fetch('/cart/add.js', {
      method: 'POST',
      body: formData
    })
    .then(function(response) { return response.json(); })
    .then(function(data) {
      if (submitBtn) {
        submitBtn.textContent = 'Added!';
        setTimeout(function() {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1500);
      }

      // Update cart count
      updateCartCount();

      // Open cart drawer
      openCart();
    })
    .catch(function(error) {
      console.error('Add to cart error:', error);
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  });

  /* --- Update Cart Count --- */
  function updateCartCount() {
    fetch('/cart.js')
      .then(function(response) { return response.json(); })
      .then(function(cart) {
        var countElements = document.querySelectorAll('[data-jana-cart-count]');
        countElements.forEach(function(el) {
          el.textContent = cart.item_count;
          if (cart.item_count > 0) {
            el.style.display = 'flex';
          } else {
            el.style.display = 'none';
          }
        });
      });
  }

  // Initial cart count update
  updateCartCount();

})();
