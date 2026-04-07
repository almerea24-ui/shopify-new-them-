/* ============================================
   JANA — Complete Theme JavaScript
   ============================================ */
(function(){
  'use strict';

  // --- Announcement Bar Rotation ---
  var announceEl = document.querySelector('[data-jana-announce]');
  if (announceEl) {
    var msgs = announceEl.querySelectorAll('[data-jana-announce-msg]');
    var prevBtn = announceEl.querySelector('[data-jana-announce-prev]');
    var nextBtn = announceEl.querySelector('[data-jana-announce-next]');
    var current = 0;
    var total = msgs.length;

    function showMsg(i) {
      msgs.forEach(function(m){ m.style.display='none'; m.style.opacity='0'; });
      msgs[i].style.display='block';
      setTimeout(function(){ msgs[i].style.opacity='1'; }, 10);
      current = i;
    }

    if (total > 1) {
      setInterval(function(){ showMsg((current+1)%total); }, 4000);
      if (prevBtn) prevBtn.addEventListener('click', function(){ showMsg((current-1+total)%total); });
      if (nextBtn) nextBtn.addEventListener('click', function(){ showMsg((current+1)%total); });
    }
  }

  // --- Header Shadow on Scroll ---
  var header = document.querySelector('[data-jana-header]');
  if (header) {
    window.addEventListener('scroll', function(){
      if (window.scrollY > 50) header.classList.add('jana-header--shadow');
      else header.classList.remove('jana-header--shadow');
    }, {passive:true});
  }

  // --- Mega Menu ---
  var megaTriggers = document.querySelectorAll('[data-jana-mega-trigger]');
  var megaPanels = document.querySelectorAll('[data-jana-mega]');
  var megaTimer;

  megaTriggers.forEach(function(trigger){
    var id = trigger.getAttribute('data-jana-mega-trigger');
    var panel = document.querySelector('[data-jana-mega="'+id+'"]');
    if (!panel) return;

    trigger.addEventListener('mouseenter', function(){
      clearTimeout(megaTimer);
      megaPanels.forEach(function(p){ p.classList.remove('jana-mega--open'); });
      panel.classList.add('jana-mega--open');
    });
    trigger.addEventListener('mouseleave', function(){
      megaTimer = setTimeout(function(){ panel.classList.remove('jana-mega--open'); }, 200);
    });
    panel.addEventListener('mouseenter', function(){ clearTimeout(megaTimer); });
    panel.addEventListener('mouseleave', function(){ panel.classList.remove('jana-mega--open'); });
  });

  // --- Mobile Drawer ---
  var menuOpen = document.querySelector('[data-jana-menu-open]');
  var menuClose = document.querySelector('[data-jana-menu-close]');
  var menuDrawer = document.querySelector('[data-jana-menu-drawer]');
  var menuOverlay = document.querySelector('[data-jana-menu-overlay]');

  function openMenu(){ menuDrawer&&menuDrawer.classList.add('jana-mobile-drawer--open'); menuOverlay&&menuOverlay.classList.add('jana-mobile-overlay--open'); document.body.style.overflow='hidden'; }
  function closeMenu(){ menuDrawer&&menuDrawer.classList.remove('jana-mobile-drawer--open'); menuOverlay&&menuOverlay.classList.remove('jana-mobile-overlay--open'); document.body.style.overflow=''; }

  if(menuOpen) menuOpen.addEventListener('click', openMenu);
  if(menuClose) menuClose.addEventListener('click', closeMenu);
  if(menuOverlay) menuOverlay.addEventListener('click', closeMenu);

  // --- Search ---
  var searchPanel = document.querySelector('[data-jana-search]');
  var searchOpens = document.querySelectorAll('[data-jana-search-open]');
  var searchInput = document.querySelector('[data-jana-search-input]');
  var searchOpen = false;

  function toggleSearch(){
    if(searchOpen){ searchPanel&&searchPanel.classList.remove('jana-search--open'); searchOpen=false; }
    else{ searchPanel&&searchPanel.classList.add('jana-search--open'); searchOpen=true; if(searchInput) setTimeout(function(){ searchInput.focus(); },200); }
  }
  searchOpens.forEach(function(btn){ btn.addEventListener('click', toggleSearch); });
  var searchCloseBtn = document.querySelector('[data-jana-search-close]');
  if(searchCloseBtn) searchCloseBtn.addEventListener('click', function(){ if(searchOpen) toggleSearch(); });

  // --- Cart Drawer ---
  var cartOverlay = document.querySelector('[data-jana-cart-overlay]');
  var cartDrawer = document.querySelector('[data-jana-cart-drawer]');
  var cartClose = document.querySelector('[data-jana-cart-close]');
  var cartOpens = document.querySelectorAll('[data-jana-cart-open]');

  function openCart(){ cartDrawer&&cartDrawer.classList.add('jana-cart--open'); cartOverlay&&cartOverlay.classList.add('jana-cart-overlay--open'); document.body.style.overflow='hidden'; }
  function closeCart(){ cartDrawer&&cartDrawer.classList.remove('jana-cart--open'); cartOverlay&&cartOverlay.classList.remove('jana-cart-overlay--open'); document.body.style.overflow=''; }

  cartOpens.forEach(function(btn){ btn.addEventListener('click', openCart); });
  if(cartClose) cartClose.addEventListener('click', closeCart);
  if(cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // --- Escape Key ---
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape'){ closeMenu(); closeCart(); if(searchOpen) toggleSearch(); }
  });

  // --- Hero Slideshow ---
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

    function goSlide(i){
      // Fade images
      slides.forEach(function(s){ s.classList.remove('jana-hero__slide--active'); });
      slides[i] && slides[i].classList.add('jana-hero__slide--active');

      // Switch text content
      textSlides.forEach(function(t){ t.style.display='none'; });
      if(textSlides[i]) textSlides[i].style.display='block';

      // Update dots
      dots.forEach(function(d){ d.classList.remove('jana-hero__dot--active'); d.style.width='0.5rem'; d.style.opacity='0.4'; });
      if(dots[i]){ dots[i].classList.add('jana-hero__dot--active'); dots[i].style.width='1.75rem'; dots[i].style.opacity='1'; }
      heroIdx = i;
    }

    function nextSlide(){ goSlide((heroIdx+1)%heroTotal); }
    function prevSlide(){ goSlide((heroIdx-1+heroTotal)%heroTotal); }

    if(heroTotal > 1){
      heroInterval = setInterval(nextSlide, 6000);
      if(nextArrow) nextArrow.addEventListener('click', function(){ clearInterval(heroInterval); nextSlide(); heroInterval=setInterval(nextSlide,6000); });
      if(prevArrow) prevArrow.addEventListener('click', function(){ clearInterval(heroInterval); prevSlide(); heroInterval=setInterval(nextSlide,6000); });
      dots.forEach(function(d,idx){
        d.addEventListener('click', function(){ clearInterval(heroInterval); goSlide(idx); heroInterval=setInterval(nextSlide,6000); });
      });

      // Touch swipe
      var touchX = 0;
      heroEl.addEventListener('touchstart', function(e){ touchX = e.touches[0].clientX; }, {passive:true});
      heroEl.addEventListener('touchend', function(e){
        var diff = touchX - e.changedTouches[0].clientX;
        if(Math.abs(diff)>50){ clearInterval(heroInterval); if(diff>0) nextSlide(); else prevSlide(); heroInterval=setInterval(nextSlide,6000); }
      }, {passive:true});
    }
  }

  // --- Countdown Timer ---
  var cdEl = document.querySelector('[data-jana-countdown]');
  if (cdEl) {
    var hours = parseInt(cdEl.getAttribute('data-hours')) || 24;
    var endKey = 'jana_cd_end';
    var stored = localStorage.getItem(endKey);
    var endTime;

    if(stored && parseInt(stored) > Date.now()){ endTime = parseInt(stored); }
    else { endTime = Date.now() + hours*3600000; localStorage.setItem(endKey, endTime); }

    var hEl = cdEl.querySelector('[data-jana-cd-hours]');
    var mEl = cdEl.querySelector('[data-jana-cd-mins]');
    var sEl = cdEl.querySelector('[data-jana-cd-secs]');

    function updateCD(){
      var rem = Math.max(0, endTime - Date.now());
      var h = Math.floor(rem/3600000);
      var m = Math.floor((rem%3600000)/60000);
      var s = Math.floor((rem%60000)/1000);
      if(hEl) hEl.textContent = String(h).padStart(2,'0');
      if(mEl) mEl.textContent = String(m).padStart(2,'0');
      if(sEl) sEl.textContent = String(s).padStart(2,'0');
    }
    updateCD();
    setInterval(updateCD, 1000);
  }

  // --- Back to Top ---
  var btt = document.querySelector('[data-jana-btt]');
  if(btt){
    window.addEventListener('scroll', function(){
      if(window.scrollY>400) btt.classList.add('jana-btt--visible');
      else btt.classList.remove('jana-btt--visible');
    }, {passive:true});
    btt.addEventListener('click', function(){ window.scrollTo({top:0,behavior:'smooth'}); });
  }

  // --- Scroll Reveal ---
  var reveals = document.querySelectorAll('.reveal');
  if(reveals.length && 'IntersectionObserver' in window){
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, {threshold:0.1, rootMargin:'0px 0px -50px 0px'});
    reveals.forEach(function(el){ obs.observe(el); });
  }

  // --- Quantity Buttons ---
  document.addEventListener('click', function(e){
    var btn = e.target.closest('[data-jana-qty-btn]');
    if(!btn) return;
    var container = btn.closest('[data-jana-qty]');
    var val = container && container.querySelector('[data-jana-qty-value]');
    if(!val) return;
    var cur = parseInt(val.textContent)||1;
    var action = btn.getAttribute('data-jana-qty-btn');
    if(action==='minus'&&cur>1) val.textContent=cur-1;
    else if(action==='plus') val.textContent=cur+1;
  });

  // --- Add to Cart AJAX ---
  document.addEventListener('submit', function(e){
    var form = e.target.closest('[data-jana-add-to-cart]');
    if(!form) return;
    e.preventDefault();
    var btn = form.querySelector('[type="submit"]') || form.querySelector('button');
    var origText = btn ? btn.textContent : '';
    if(btn){ btn.textContent='Adding...'; btn.disabled=true; }

    fetch('/cart/add.js', {method:'POST', body:new FormData(form)})
    .then(function(r){ return r.json(); })
    .then(function(){
      if(btn){ btn.textContent='Added!'; setTimeout(function(){ btn.textContent=origText; btn.disabled=false; },1500); }
      updateCartCount();
      openCart();
    })
    .catch(function(){ if(btn){ btn.textContent=origText; btn.disabled=false; } });
  });

  // --- Update Cart Count ---
  function updateCartCount(){
    fetch('/cart.js').then(function(r){ return r.json(); }).then(function(cart){
      document.querySelectorAll('[data-jana-cart-count]').forEach(function(el){
        el.textContent = cart.item_count;
        el.style.display = cart.item_count > 0 ? 'flex' : 'none';
      });
    });
  }
  updateCartCount();

})();
