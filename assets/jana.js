/* ============================================
   JANA — Complete Theme JavaScript (Clean)
   ============================================ */
(function(){
  'use strict';

  /* ========== ANNOUNCEMENT BAR ========== */
  var announceEl = document.querySelector('[data-jana-announce]');
  if (announceEl) {
    var msgs = announceEl.querySelectorAll('[data-jana-announce-msg]');
    var prevBtn = announceEl.querySelector('[data-jana-announce-prev]');
    var nextBtn = announceEl.querySelector('[data-jana-announce-next]');
    var aCurrent = 0;
    var aTotal = msgs.length;
    var aInterval;

    function showMsg(i) {
      msgs.forEach(function(m) { m.style.display = 'none'; m.style.opacity = '0'; });
      msgs[i].style.display = 'block';
      setTimeout(function() { msgs[i].style.opacity = '1'; }, 20);
      aCurrent = i;
    }

    function nextMsg() { showMsg((aCurrent + 1) % aTotal); }
    function prevMsg() { showMsg((aCurrent - 1 + aTotal) % aTotal); }

    if (aTotal > 1) {
      aInterval = setInterval(nextMsg, 4000);
      if (prevBtn) prevBtn.addEventListener('click', function() { clearInterval(aInterval); prevMsg(); aInterval = setInterval(nextMsg, 4000); });
      if (nextBtn) nextBtn.addEventListener('click', function() { clearInterval(aInterval); nextMsg(); aInterval = setInterval(nextMsg, 4000); });
    }
  }

  /* ========== HEADER SHADOW ON SCROLL ========== */
  var header = document.querySelector('[data-jana-header]');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) header.classList.add('jana-header--shadow');
      else header.classList.remove('jana-header--shadow');
    }, { passive: true });
  }

  /* ========== MEGA MENU ========== */
  var megaTriggers = document.querySelectorAll('[data-jana-mega-trigger]');
  var megaPanels = document.querySelectorAll('[data-jana-mega]');
  var megaTimer;

  megaTriggers.forEach(function(trigger) {
    var id = trigger.getAttribute('data-jana-mega-trigger');
    var panel = document.querySelector('[data-jana-mega="' + id + '"]');
    if (!panel) return;
    trigger.addEventListener('mouseenter', function() {
      clearTimeout(megaTimer);
      megaPanels.forEach(function(p) { p.classList.remove('jana-mega--open'); });
      panel.classList.add('jana-mega--open');
    });
    trigger.addEventListener('mouseleave', function() {
      megaTimer = setTimeout(function() { panel.classList.remove('jana-mega--open'); }, 200);
    });
    panel.addEventListener('mouseenter', function() { clearTimeout(megaTimer); });
    panel.addEventListener('mouseleave', function() { panel.classList.remove('jana-mega--open'); });
  });

  /* ========== MOBILE DRAWER ========== */
  var menuOpenBtn = document.querySelector('[data-jana-menu-open]');
  var menuCloseBtn = document.querySelector('[data-jana-menu-close]');
  var menuDrawer = document.querySelector('[data-jana-menu-drawer]');
  var menuOverlay = document.querySelector('[data-jana-menu-overlay]');

  function openMenu() {
    if (menuDrawer) menuDrawer.classList.add('jana-mobile-drawer--open');
    if (menuOverlay) menuOverlay.classList.add('jana-mobile-overlay--open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (menuDrawer) menuDrawer.classList.remove('jana-mobile-drawer--open');
    if (menuOverlay) menuOverlay.classList.remove('jana-mobile-overlay--open');
    document.body.style.overflow = '';
  }

  if (menuOpenBtn) menuOpenBtn.addEventListener('click', openMenu);
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

  /* ========== SEARCH ========== */
  var searchPanel = document.querySelector('[data-jana-search]');
  var searchOpens = document.querySelectorAll('[data-jana-search-open]');
  var searchCloseBtn = document.querySelector('[data-jana-search-close]');
  var searchInput = document.querySelector('[data-jana-search-input]');
  var searchIsOpen = false;

  function toggleSearch() {
    if (searchIsOpen) {
      if (searchPanel) searchPanel.classList.remove('jana-search--open');
      searchIsOpen = false;
    } else {
      if (searchPanel) searchPanel.classList.add('jana-search--open');
      searchIsOpen = true;
      if (searchInput) setTimeout(function() { searchInput.focus(); }, 200);
    }
  }

  searchOpens.forEach(function(btn) { btn.addEventListener('click', toggleSearch); });
  if (searchCloseBtn) searchCloseBtn.addEventListener('click', function() { if (searchIsOpen) toggleSearch(); });

  /* ========== CART DRAWER ========== */
  var cartOverlay = document.querySelector('[data-jana-cart-overlay]');
  var cartDrawer = document.querySelector('[data-jana-cart-drawer]');
  var cartCloseBtn = document.querySelector('[data-jana-cart-close]');
  var cartOpens = document.querySelectorAll('[data-jana-cart-open]');

  function openCart() {
    if (cartDrawer) cartDrawer.classList.add('jana-cart--open');
    if (cartOverlay) cartOverlay.classList.add('jana-cart-overlay--open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('jana-cart--open');
    if (cartOverlay) cartOverlay.classList.remove('jana-cart-overlay--open');
    document.body.style.overflow = '';
  }

  cartOpens.forEach(function(btn) { btn.addEventListener('click', openCart); });
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  /* ========== ESCAPE KEY ========== */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMenu();
      closeCart();
      if (searchIsOpen) toggleSearch();
    }
  });

  /* ========== HERO SLIDESHOW ========== */
  var heroEl = document.querySelector('[data-jana-hero]');
  if (heroEl) {
    var slides = heroEl.querySelectorAll('[data-jana-slide]');
    var textSlides = heroEl.querySelectorAll('[data-jana-hero-text]');
    var dots = heroEl.querySelectorAll('[data-jana-hero-dot]');
    var prevArrow = heroEl.querySelector('[data-jana-hero-prev]');
    var nextArrow = heroEl.querySelector('[data-jana-hero-next]');
    var heroIdx = 0;
    var heroTotal = slides.length;
    var heroInterval;

    function goSlide(i) {
      slides.forEach(function(s) { s.classList.remove('jana-hero__slide--active'); });
      slides[i] && slides[i].classList.add('jana-hero__slide--active');
      textSlides.forEach(function(t) { t.style.display = 'none'; });
      if (textSlides[i]) textSlides[i].style.display = 'block';
      dots.forEach(function(d) { d.classList.remove('jana-hero__dot--active'); d.style.width = '0.5rem'; d.style.opacity = '0.4'; });
      if (dots[i]) { dots[i].classList.add('jana-hero__dot--active'); dots[i].style.width = '1.75rem'; dots[i].style.opacity = '1'; }
      heroIdx = i;
    }

    function nextHero() { goSlide((heroIdx + 1) % heroTotal); }
    function prevHero() { goSlide((heroIdx - 1 + heroTotal) % heroTotal); }

    if (heroTotal > 1) {
      heroInterval = setInterval(nextHero, 6000);
      if (nextArrow) nextArrow.addEventListener('click', function() { clearInterval(heroInterval); nextHero(); heroInterval = setInterval(nextHero, 6000); });
      if (prevArrow) prevArrow.addEventListener('click', function() { clearInterval(heroInterval); prevHero(); heroInterval = setInterval(nextHero, 6000); });
      dots.forEach(function(d, idx) {
        d.addEventListener('click', function() { clearInterval(heroInterval); goSlide(idx); heroInterval = setInterval(nextHero, 6000); });
      });

      // Touch swipe
      var touchX = 0;
      heroEl.addEventListener('touchstart', function(e) { touchX = e.touches[0].clientX; }, { passive: true });
      heroEl.addEventListener('touchend', function(e) {
        var diff = touchX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { clearInterval(heroInterval); if (diff > 0) nextHero(); else prevHero(); heroInterval = setInterval(nextHero, 6000); }
      }, { passive: true });
    }
  }

  /* ========== COUNTDOWN TIMER ========== */
  var cdEl = document.querySelector('[data-jana-countdown]');
  if (cdEl) {
    var cdHours = parseInt(cdEl.getAttribute('data-hours')) || 24;
    var cdKey = 'jana_cd_end_' + cdHours;
    var stored = localStorage.getItem(cdKey);
    var endTime;

    if (stored && parseInt(stored) > Date.now()) { endTime = parseInt(stored); }
    else { endTime = Date.now() + cdHours * 3600000; localStorage.setItem(cdKey, endTime); }

    var hEl = cdEl.querySelector('[data-jana-cd-hours]');
    var mEl = cdEl.querySelector('[data-jana-cd-mins]');
    var sEl = cdEl.querySelector('[data-jana-cd-secs]');

    function updateCD() {
      var rem = Math.max(0, endTime - Date.now());
      var h = Math.floor(rem / 3600000);
      var m = Math.floor((rem % 3600000) / 60000);
      var s = Math.floor((rem % 60000) / 1000);
      if (hEl) hEl.textContent = String(h).padStart(2, '0');
      if (mEl) mEl.textContent = String(m).padStart(2, '0');
      if (sEl) sEl.textContent = String(s).padStart(2, '0');
    }
    updateCD();
    setInterval(updateCD, 1000);
  }

  /* ========== BACK TO TOP ========== */
  var btt = document.querySelector('[data-jana-btt]');
  if (btt) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) btt.classList.add('jana-btt--visible');
      else btt.classList.remove('jana-btt--visible');
    }, { passive: true });
    btt.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ========== SCROLL REVEAL ========== */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(function(el) { revealObs.observe(el); });
  }

  /* ========== CART: QTY CHANGE (AJAX) ========== */
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-jana-qty-change]');
    if (!btn) return;
    var container = btn.closest('[data-jana-qty]');
    if (!container) return;
    var key = container.getAttribute('data-line-key');
    var valEl = container.querySelector('[data-jana-qty-value]');
    if (!valEl || !key) return;
    var cur = parseInt(valEl.textContent) || 1;
    var delta = parseInt(btn.getAttribute('data-jana-qty-change')) || 0;
    var newQty = Math.max(0, cur + delta);
    valEl.textContent = newQty || '…';

    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: newQty })
    })
    .then(function(r) { return r.json(); })
    .then(function(cart) { refreshCart(cart); })
    .catch(function() { valEl.textContent = cur; });
  });

  /* ========== CART: REMOVE ITEM ========== */
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-jana-remove-item]');
    if (!btn) return;
    var key = btn.getAttribute('data-jana-remove-item');
    if (!key) return;
    var line = btn.closest('[data-jana-cart-line]');
    if (line) line.style.opacity = '0.3';

    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: 0 })
    })
    .then(function(r) { return r.json(); })
    .then(function(cart) {
      if (line) line.remove();
      refreshCart(cart);
      if (cart.item_count === 0) location.reload();
    });
  });

  /* ========== CART: CONTINUE SHOPPING ========== */
  document.addEventListener('click', function(e) {
    if (e.target.closest('[data-jana-continue-shopping]')) closeCart();
  });

  /* ========== CART: ORDER NOTE ========== */
  document.addEventListener('click', function(e) {
    var toggle = e.target.closest('[data-jana-note-toggle]');
    if (!toggle) return;
    var field = document.querySelector('[data-jana-note-field]');
    if (field) {
      field.style.display = field.style.display === 'none' ? 'block' : 'none';
      if (field.style.display === 'block') field.focus();
    }
  });

  var noteField = document.querySelector('[data-jana-note-field]');
  if (noteField) {
    noteField.addEventListener('blur', function() {
      fetch('/cart/update.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: noteField.value })
      });
    });
  }

  /* ========== ADD TO CART (AJAX) ========== */
  document.addEventListener('submit', function(e) {
    var form = e.target.closest('[data-jana-add-to-cart]');
    if (!form) return;
    e.preventDefault();
    var btn = form.querySelector('[type="submit"]') || form.querySelector('button');
    var origText = btn ? btn.textContent : '';
    if (btn) { btn.textContent = 'Adding...'; btn.disabled = true; }

    fetch('/cart/add.js', { method: 'POST', body: new FormData(form) })
    .then(function(r) { return r.json(); })
    .then(function() {
      if (btn) { btn.textContent = '\u2713 Added'; setTimeout(function() { btn.textContent = origText; btn.disabled = false; }, 1500); }
      fetchAndRefreshCart();
      openCart();
    })
    .catch(function() { if (btn) { btn.textContent = origText; btn.disabled = false; } });
  });

  /* ========== CART: REFRESH UI ========== */
  function refreshCart(cart) {
    // Badge counts
    document.querySelectorAll('[data-jana-cart-count]').forEach(function(el) {
      el.textContent = cart.item_count;
      el.style.display = cart.item_count > 0 ? 'flex' : 'none';
    });
    // Item count text
    document.querySelectorAll('[data-jana-cart-item-count]').forEach(function(el) {
      el.textContent = cart.item_count;
    });
    // Total
    var totalEl = document.querySelector('[data-jana-cart-total]');
    if (totalEl) totalEl.textContent = formatMoney(cart.total_price);
    // Shipping bar
    var threshold = parseInt(document.body.getAttribute('data-jana-shipping-threshold')) || 15000;
    var remaining = Math.max(0, threshold - cart.total_price);
    var pct = Math.min(100, (cart.total_price / threshold) * 100);
    var msgEl = document.querySelector('[data-jana-shipping-msg]');
    var barEl = document.querySelector('[data-jana-shipping-bar]');
    if (msgEl) {
      msgEl.textContent = remaining > 0 ? formatMoney(remaining) + ' away from free shipping' : '\uD83C\uDF89 You\'ve earned free shipping!';
      msgEl.style.color = remaining <= 0 ? 'var(--color-success)' : '';
    }
    if (barEl) {
      barEl.style.width = pct + '%';
      barEl.style.background = pct >= 100 ? 'var(--color-success)' : '';
    }
  }

  function fetchAndRefreshCart() {
    fetch('/cart.js')
      .then(function(r) { return r.json(); })
      .then(function(cart) { refreshCart(cart); });
  }

  function formatMoney(cents) {
    var fmt = window.janaMoneyFormat || '${{amount}}';
    var amount = (cents / 100).toFixed(2);
    return fmt.replace('{{amount}}', amount).replace('{{amount_no_decimals}}', Math.round(cents / 100));
  }

  // Initial cart count
  fetchAndRefreshCart();

})();
