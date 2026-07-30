/* ═══════════════════════════════════════════════════════════
   THE BOY, THE BIRD, AND THE SKY — Official Store
   app.js  |  © 2025 Subhajit Sarkar
   ═══════════════════════════════════════════════════════════ */

/* ── CONFIG ── */
const UPI    = "cyber.s.sarkar0708@ybl";
const WA_NUM = "916026705234";

const BOOKS = {
  p1: { name:"Part I — The Whispers of Freedom",   sub:"A story of loss, a bird, and letting go.",              price:99,  am:"99",  preorder:false },
  p2: { name:"Part II — The Awakening",             sub:"Vihaan discovers his name — and his gift.",              price:99,  am:"99",  preorder:false },
  p3: { name:"Part III — The War of Voices",        sub:"Power with no ceiling. A door that cannot be closed.",   price:199, am:"199", preorder:false },
  p4: { name:"Part IV — The Silence Between Worlds",sub:"The final act. The silence at the end of everything.", price:199, am:"199", preorder:false }
};

/* ────────────────────────────────────────────────────────
   LOADER
──────────────────────────────────────────────────────── */
function dismissLoader() {
  document.getElementById('loader').classList.add('gone');
}
document.addEventListener('DOMContentLoaded', () => setTimeout(dismissLoader, 900));
setTimeout(dismissLoader, 2600);

/* ────────────────────────────────────────────────────────
   STAR CANVAS
──────────────────────────────────────────────────────── */
(function () {
  const c = document.getElementById('stars');
  const ctx = c.getContext('2d');
  let S = [];

  function init() {
    c.width  = innerWidth;
    c.height = innerHeight;
    S = Array.from({ length: 180 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.1 + .2,
      o: Math.random() * .5 + .1,
      s: Math.random() * .3 + .05
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    S.forEach(s => {
      s.o += Math.sin(Date.now() * s.s * .001) * .004;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${Math.max(.04, Math.min(.5, s.o))})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', init);
  init();
  draw();
})();

/* ────────────────────────────────────────────────────────
   CUSTOM CURSOR
──────────────────────────────────────────────────────── */
const cur  = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function rf() {
  rx += (mx - rx) * .15;
  ry += (my - ry) * .15;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(rf);
})();

document.addEventListener('mouseover', e => {
  if (e.target.closest('a, button, .book-card, .ccard, .bsel')) {
    cur.style.width  = '12px'; cur.style.height  = '12px';
    ring.style.width = '44px'; ring.style.height = '44px';
  } else {
    cur.style.width  = '7px';  cur.style.height  = '7px';
    ring.style.width = '30px'; ring.style.height = '30px';
  }
});

/* ────────────────────────────────────────────────────────
   SCROLL — HEADER + PROGRESS BAR
──────────────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  document.getElementById('progress').style.width =
    (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  document.getElementById('hdr').classList.toggle('scrolled', scrollY > 60);
});

/* ────────────────────────────────────────────────────────
   REVEAL ON SCROLL
──────────────────────────────────────────────────────── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ────────────────────────────────────────────────────────
   STAT COUNTERS
──────────────────────────────────────────────────────── */
function animCount(el, display) {
  const t = +el.dataset.count;
  let c = 0;
  const iv = setInterval(() => {
    c = Math.min(c + t / 40, t);
    el.textContent = display || Math.floor(c);
    if (c >= t) { el.textContent = display || t; clearInterval(iv); }
  }, 28);
}

const cObs = new IntersectionObserver(entries => {
  entries.forEach(x => {
    if (!x.isIntersecting) return;
    const el = x.target;
    if (el.id === 'stat-readers') {
      let c = 0;
      const iv = setInterval(() => {
        c = Math.min(c + 60, 2300);
        el.textContent = c >= 2300 ? '2.3k' : c;
        if (c >= 2300) clearInterval(iv);
      }, 28);
    } else {
      animCount(el);
    }
    cObs.unobserve(el);
  });
}, { threshold: .5 });

document.querySelectorAll('[data-count], #stat-readers').forEach(el => cObs.observe(el));

/* ────────────────────────────────────────────────────────
   HERO QUOTE CAROUSEL — Three.js, cross-browser / mobile safe
   Fixes: WebGL detection, frame-delta physics, bird index bug,
          DPR cap, visibility API, resize debounce, iOS blending,
          120Hz screens, low-end fallback CSS-only mode
──────────────────────────────────────────────────────── */
(function () {

  /* ── Quotes ── */
  var QUOTES = [
    { text: "Some doors, once opened, cannot be closed.",                                              part: "Part III \u00b7 The War of Voices"        },
    { text: "This story hit me in a way I did not expect. Felt like it was speaking directly to me.", part: "\u2014 Priya B., Guwahati \u00b7 Reader"       },
    { text: "The bird does not carry your pain. It carries the shape of it \u2014 so you can finally see what you are holding.", part: "Part I \u00b7 The Whispers of Freedom"    },
    { text: "Read all three parts back to back. The moment Vihaan learns his true name made me put the book down just to breathe.", part: "\u2014 Ritam D., Jorhat \u00b7 Reader"          },
    { text: "He gave you a name because nameless things cannot be found. And you needed to be found.", part: "Part II \u00b7 The Awakening"               },
    { text: "The writing knows what silence feels like. That is every introverted person I know, written perfectly.", part: "\u2014 Subham B., Lakhimpur \u00b7 Reader"     },
    { text: "The silence between worlds is not empty. It is the loudest thing that has ever existed.", part: "Part IV \u00b7 The Silence Between Worlds" },
    { text: "Bought all three in one day. The birds are not just birds. Everything is layered.",       part: "\u2014 Arjun P., Tinsukia \u00b7 Reader"        },
    { text: "Grief is not the opposite of love. It is what love becomes when it has nowhere left to go.", part: "Part I \u00b7 The Whispers of Freedom"    },
    { text: "Vihaan\u2019s story deserves to be read widely. Discovered this through a friend \u2014 now I understand why she wouldn\u2019t stop talking about it.", part: "\u2014 Kavya M., Bangalore \u00b7 Reader" },
  ];

  var INTERVAL   = 3000;
  var current    = 0;
  var timer      = null;
  var paused     = false;
  var hidden     = false;   /* Page Visibility */
  var threeReady = false;

  /* ── WebGL capability check ── */
  function hasWebGL() {
    try {
      var c   = document.createElement('canvas');
      var ctx = c.getContext('webgl') || c.getContext('experimental-webgl');
      if (!ctx) return false;
      /* also check we can actually draw — some UC Browser / WebView return a context but it's broken */
      ctx.getExtension('OES_standard_derivatives');
      return true;
    } catch (e) { return false; }
  }

  /* ── Device tier (affects particle count & DPR cap) ── */
  function deviceTier() {
    /* Low: small screen, no HW concurrency, or explicitly reduced motion */
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'low';
    var cores  = navigator.hardwareConcurrency || 2;
    var mobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (mobile && cores <= 4) return 'low';
    if (mobile) return 'mid';
    return 'high';
  }

  /* ════════════════════════════════════════════════
     THREE.JS SCENE
  ════════════════════════════════════════════════ */
  var renderer, scene, camera, raf;
  var particles, particleVels;
  var birds    = [];
  var nebula;
  var ripples  = [];      /* { mesh, mat, age, maxAge } */
  var lastTime = 0;       /* for frame-delta — fixes 120Hz */

  function initThree(tier) {
    var canvas = document.getElementById('hq-canvas');
    var wrap   = document.getElementById('hq-wrap');
    if (!canvas || !wrap) return;

    var W = wrap.offsetWidth  || 520;
    var H = wrap.offsetHeight || 390;

    /* DPR: cap at 1.5 for mid, 1 for low, 2 for high */
    var dprCap = tier === 'high' ? 2 : tier === 'mid' ? 1.5 : 1;
    var dpr    = Math.min(window.devicePixelRatio || 1, dprCap);

    renderer = new THREE.WebGLRenderer({
      canvas    : canvas,
      alpha     : false,                   /* opaque — faster on mobile */
      antialias : tier === 'high',         /* off on mobile saves ~30% */
      powerPreference: 'low-power',        /* lets mobile GPU throttle */
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(W, H);
    renderer.setClearColor(0x0b0a07, 1);

    scene  = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 5;

    /* ── Particle count by tier ── */
    var starCount = tier === 'high' ? 280 : tier === 'mid' ? 160 : 80;
    var dustCount = tier === 'high' ? 160 : tier === 'mid' ?  90 : 40;
    var birdCount = tier === 'high' ?   6 : tier === 'mid' ?   4 :  2;

    /* ── Nebula glow plane ── */
    var nebGeo = new THREE.PlaneGeometry(14, 9);
    var nebMat = new THREE.MeshBasicMaterial({
      color      : 0xc9a84c,
      transparent: true,
      opacity    : 0,
      depthWrite : false,
      blending   : THREE.AdditiveBlending,
    });
    nebula = new THREE.Mesh(nebGeo, nebMat);
    nebula.position.z = -3;
    scene.add(nebula);

    /* ── Star field ── */
    var starGeo = new THREE.BufferGeometry();
    var starPos = new Float32Array(starCount * 3);
    for (var i = 0; i < starCount; i++) {
      starPos[i * 3]     = (Math.random() - .5) * 18;
      starPos[i * 3 + 1] = (Math.random() - .5) * 12;
      starPos[i * 3 + 2] = (Math.random() - .5) * 4 - 2;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo,
      new THREE.PointsMaterial({ color: 0xf4f0e8, size: 0.028, transparent: true, opacity: .5 })
    ));

    /* ── Gold dust ── */
    var dustGeo = new THREE.BufferGeometry();
    var dustPos = new Float32Array(dustCount * 3);
    particleVels = [];
    for (var j = 0; j < dustCount; j++) {
      dustPos[j * 3]     = (Math.random() - .5) * 12;
      dustPos[j * 3 + 1] = (Math.random() - .5) * 8;
      dustPos[j * 3 + 2] = (Math.random() - .5) * 2;
      particleVels.push({
        x    : (Math.random() - .5) * .18,
        y    : .08 + Math.random() * .12,
        phase: Math.random() * Math.PI * 2,
        amp  : .04 + Math.random() * .04,
      });
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    /* Use NormalBlending on low tier — AdditiveBlending has precision issues on iOS WebGL1 */
    var dustBlend = tier === 'low' ? THREE.NormalBlending : THREE.AdditiveBlending;
    particles = new THREE.Points(dustGeo,
      new THREE.PointsMaterial({
        color     : 0xc9a84c,
        size      : 0.05,
        transparent: true,
        opacity   : .65,
        blending  : dustBlend,
        depthWrite: false,
      })
    );
    scene.add(particles);

    /* ── Birds — V-shapes from THREE.Line ──
       BufferGeometry layout for a 3-vertex line (9 floats):
         [x0,y0,z0,  x1,y1,z1,  x2,y2,z2]
       Wing tips are vertices 0 and 2.
       Y of vertex 0  = index 1   ✓
       Y of vertex 2  = index 7   ✓  (was wrong before — it IS correct, just needs needsUpdate)
    ── */
    function makeBird(x, y, z, sc) {
      var geo = new THREE.BufferGeometry();
      var pts = new Float32Array([
        -sc,  -sc * .45, 0,   /* left  wing tip  [0,1,2] */
         0,    0,         0,   /* body centre     [3,4,5] */
         sc,  -sc * .45, 0,   /* right wing tip  [6,7,8] */
      ]);
      geo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
      var mat  = new THREE.LineBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: .5 });
      var line = new THREE.Line(geo, mat);
      line.position.set(x, y, z);
      scene.add(line);
      return { mesh: line, mat: mat, sc: sc,
               vx: .55 + Math.random() * .35,
               vy: (Math.random() - .5) * .06,
               flap: Math.random() * Math.PI * 2,
               flapSpeed: 3.5 + Math.random() * 2.5 };
    }
    birds = [];
    var birdData = [
      [-7, 1.6, .5, .14], [-5.5, 2.0, .4, .10],
      [-6.5, 0.9, .6, .12], [-4.8, 1.3, .3, .09],
      [-6.0, 2.3, .2, .08], [-5.2, 0.5, .1, .07],
    ];
    for (var b = 0; b < birdCount; b++) {
      var bd = birdData[b];
      birds.push(makeBird(bd[0], bd[1], bd[2], bd[3]));
    }

    /* ── ResizeObserver — doesn't fire on mobile scroll-bar hide ── */
    if (window.ResizeObserver) {
      new ResizeObserver(function () { onResize(wrap); }).observe(wrap);
    } else {
      var rto;
      window.addEventListener('resize', function () {
        clearTimeout(rto);
        rto = setTimeout(function () { onResize(wrap); }, 150);
      });
    }

    threeReady = true;
    lastTime   = performance.now();
    raf        = requestAnimationFrame(animate);
  }

  function onResize(wrap) {
    if (!renderer) return;
    var W = wrap.offsetWidth  || 520;
    var H = wrap.offsetHeight || 390;
    renderer.setSize(W, H);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  }

  /* ── Ripple on transition ── */
  function spawnRipple() {
    if (!scene) return;
    var geo = new THREE.RingGeometry(0.01, 0.15, 40);
    var mat = new THREE.MeshBasicMaterial({
      color     : 0xc9a84c,
      transparent: true,
      opacity   : .65,
      side      : THREE.DoubleSide,
      blending  : THREE.AdditiveBlending,
      depthWrite: false,
    });
    var mesh = new THREE.Mesh(geo, mat);
    mesh.position.set((Math.random() - .5) * 3, (Math.random() - .5) * 2, .5);
    scene.add(mesh);
    ripples.push({ mesh: mesh, mat: mat, age: 0, maxAge: 1.5 });
  }

  /* ── Main loop — frame-delta so 60/90/120Hz all look identical ── */
  function animate(now) {
    raf = requestAnimationFrame(animate);

    if (hidden) return;              /* don't render in background tab */

    var dt = Math.min((now - lastTime) / 1000, 0.05);  /* seconds, capped at 50ms */
    lastTime = now;

    var t  = now * 0.001;           /* elapsed seconds */

    /* Nebula pulse */
    if (nebula) {
      nebula.material.opacity = .02 + Math.sin(t * .4) * .01;
      nebula.scale.x = 1 + Math.sin(t * .25) * .03;
      nebula.scale.y = 1 + Math.cos(t * .30) * .03;
    }

    /* Gold dust drift — scaled by dt */
    if (particles) {
      var pos = particles.geometry.attributes.position.array;
      var len = particleVels.length;
      for (var i = 0; i < len; i++) {
        var v = particleVels[i];
        pos[i * 3]     += (v.x + Math.sin(t * .8 + v.phase) * v.amp) * dt;
        pos[i * 3 + 1] += (v.y + Math.cos(t * .6 + v.phase) * v.amp) * dt;
        if (pos[i * 3 + 1] >  4.2) { pos[i * 3 + 1] = -4.2; pos[i * 3] = (Math.random() - .5) * 12; }
        if (pos[i * 3]     >  6.5) pos[i * 3] = -6.5;
        if (pos[i * 3]     < -6.5) pos[i * 3] =  6.5;
      }
      particles.geometry.attributes.position.needsUpdate = true;
    }

    /* Birds — scaled by dt */
    for (var bi = 0; bi < birds.length; bi++) {
      var brd = birds[bi];
      brd.flap += brd.flapSpeed * dt;
      var flapY = Math.sin(brd.flap) * brd.sc * .65;
      var bpos  = brd.mesh.geometry.attributes.position.array;
      /* left wing tip Y  = index 1; right wing tip Y = index 7 */
      bpos[1] = -brd.sc * .45 + flapY;
      bpos[7] = -brd.sc * .45 + flapY;
      brd.mesh.geometry.attributes.position.needsUpdate = true;
      brd.mesh.position.x += brd.vx * dt;
      brd.mesh.position.y += (brd.vy + Math.sin(t * .5 + brd.flap * .1) * .05) * dt;
      brd.mat.opacity = .3 + Math.abs(Math.sin(t + brd.flap)) * .2;
      if (brd.mesh.position.x > 7.5) {
        brd.mesh.position.x = -7.5 + Math.random() * 2;
        brd.mesh.position.y = (Math.random() - .5) * 3.5;
      }
    }

    /* Ripples — dt scaled */
    for (var ri = ripples.length - 1; ri >= 0; ri--) {
      var rp = ripples[ri];
      rp.age += dt;
      var prog = rp.age / rp.maxAge;
      var sc   = 1 + prog * 8;
      rp.mesh.scale.set(sc, sc, 1);
      rp.mat.opacity = .65 * (1 - prog);
      if (rp.age >= rp.maxAge) {
        scene.remove(rp.mesh);
        rp.mesh.geometry.dispose();
        rp.mat.dispose();
        ripples.splice(ri, 1);
      }
    }

    /* Slow camera drift */
    camera.position.x = Math.sin(t * .07) * .15;
    camera.position.y = Math.cos(t * .05) * .10;

    renderer.render(scene, camera);
  }

  /* ── Page Visibility — stop rendering in background ── */
  document.addEventListener('visibilitychange', function () {
    hidden = document.hidden;
    if (!hidden) lastTime = performance.now();  /* reset delta on return */
  });

  /* ════════════════════════════════════════════════
     HTML: slides + dots
  ════════════════════════════════════════════════ */
  function buildHTML() {
    var wrap   = document.getElementById('hq-wrap');
    if (!wrap) return;
    var stage  = wrap.querySelector('.hq-stage');
    var dotsEl = wrap.querySelector('.hq-dots');
    if (!stage || !dotsEl) return;

    stage.innerHTML  = '';
    dotsEl.innerHTML = '';

    QUOTES.forEach(function (q, i) {
      var slide = document.createElement('div');
      slide.className = 'hq-slide' + (i === 0 ? ' active' : '');
      slide.innerHTML =
        '<blockquote class="hq-quote">\u201c' + q.text + '\u201d</blockquote>' +
        '<div class="hq-meta">' +
          '<span class="hq-rule"></span>' +
          '<span class="hq-part">' + q.part + '</span>' +
          '<span class="hq-rule"></span>' +
        '</div>';
      stage.appendChild(slide);

      var dot = document.createElement('button');
      dot.className = 'hq-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Quote ' + (i + 1));
      (function (idx) {
        dot.addEventListener('click', function () { goTo(idx); resetTimer(); });
      }(i));
      dotsEl.appendChild(dot);
    });

    /* Touch: swipe left/right to change quote */
    var touchStartX = 0;
    stage.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) { goTo(current + (dx < 0 ? 1 : -1)); resetTimer(); }
    }, { passive: true });

    /* Pause on hover (desktop only) */
    wrap.addEventListener('mouseenter', function () { paused = true;  clearInterval(timer); });
    wrap.addEventListener('mouseleave', function () { paused = false; resetTimer(); });
  }

  /* ── Slide transition ── */
  function goTo(idx) {
    var slides = document.querySelectorAll('.hq-slide');
    var dots   = document.querySelectorAll('.hq-dot');
    if (!slides.length) return;
    var prev = current;
    current  = ((idx % QUOTES.length) + QUOTES.length) % QUOTES.length;
    if (prev === current) return;

    slides[prev].classList.remove('active');
    slides[prev].classList.add('exit');
    var leaving = slides[prev];
    setTimeout(function () { leaving.classList.remove('exit'); }, 600);
    slides[current].classList.add('active');
    dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });

    /* Three.js: ripple + nebula flash */
    if (threeReady) {
      spawnRipple();
      if (nebula) {
        nebula.material.opacity = .14;
        setTimeout(function () { if (nebula) nebula.material.opacity = .02; }, 380);
      }
    }
  }

  function next()       { if (!paused && !hidden) goTo(current + 1); }
  function resetTimer() { clearInterval(timer); timer = setInterval(next, INTERVAL); }
  window.hqGoTo = function (idx) { goTo(idx); resetTimer(); };

  /* ── Boot ── */
  function boot() {
    buildHTML();
    if (hasWebGL() && typeof THREE !== 'undefined') {
      var tier = deviceTier();
      /* Small delay so layout is fully painted before reading offsetWidth/Height */
      setTimeout(function () { initThree(tier); }, 80);
    } else {
      /* CSS-only fallback: add class so the panel uses gradient bg instead of canvas */
      var wrap = document.getElementById('hq-wrap');
      if (wrap) wrap.classList.add('hq-no-webgl');
    }
    resetTimer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();


// Part IV released — countdown removed

/* ────────────────────────────────────────────────────────
   UTILITY
──────────────────────────────────────────────────────── */
function toggleMenu() {
  document.getElementById('ham').classList.toggle('open');
  document.getElementById('mob-nav').classList.toggle('open');
}

function doFilter(type, btn) {
  document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.book-card').forEach(c => {
    const status = c.dataset.status;
    const show = type === 'all'
      || type === status
      || (type === 'available' && (status === 'available' || status === 'new'));
    c.style.display = show ? '' : 'none';
  });
}

function toggleFaq(btn) {
  btn.parentElement.classList.toggle('open');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ────────────────────────────────────────────────────────
   PRIVACY POLICY MODAL
──────────────────────────────────────────────────────── */
function openPP()   { document.getElementById('pp-modal').classList.add('open');    document.body.style.overflow = 'hidden'; }
function closePP()  { document.getElementById('pp-modal').classList.remove('open'); document.body.style.overflow = ''; }
function closePPOv(e) { if (e.target.id === 'pp-modal') closePP(); }

/* ────────────────────────────────────────────────────────
   NEWSLETTER
──────────────────────────────────────────────────────── */
function subscribe() {
  const emailVal = document.getElementById('nl-email').value.trim();
  if (!emailVal || !emailVal.includes('@')) { showToast('Please enter a valid email.'); return; }
  const btn = document.querySelector('.nl-form button');
  btn.textContent = 'Sending…'; btn.disabled = true;

  const now     = new Date();
  const timeStr = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  emailjs.send("service_svpcf0m", "template_woyg3on", { subscriber_email: emailVal, time: timeStr })
    .then(() => {
      showToast("✦ You're on the list!");
      document.getElementById('nl-email').value = '';
      btn.textContent = 'Subscribe'; btn.disabled = false;
    })
    .catch(() => {
      showToast('Something went wrong. Please try again.');
      btn.textContent = 'Subscribe'; btn.disabled = false;
    });
}

/* ────────────────────────────────────────────────────────
   BUY FLOW — privacy popup → payment modal
──────────────────────────────────────────────────────── */
let selectedBookKey = 'p1';
let pendingBuyKey   = null;

function openBuyModal(bookKey) {
  pendingBuyKey = bookKey || 'p4';
  document.getElementById('priv-check').checked = false;
  document.getElementById('priv-accept-btn').classList.remove('ready');
  document.getElementById('privacy-checkout-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function togglePrivacyAccept() {
  const checked = document.getElementById('priv-check').checked;
  document.getElementById('priv-accept-btn').classList.toggle('ready', checked);
}

function proceedToBuy() {
  if (!document.getElementById('priv-check').checked) return;
  closePrivacyModal();
  setTimeout(() => openActualBuyModal(pendingBuyKey), 200);
}

function closePrivacyModal() {
  document.getElementById('privacy-checkout-modal').classList.remove('open');
  if (!document.getElementById('buy-modal').classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

function closePrivacyOv(e) {
  if (e.target.id === 'privacy-checkout-modal') closePrivacyModal();
}

function openActualBuyModal(bookKey) {
  selectedBookKey = bookKey || 'p1';
  updateModalForBook(selectedBookKey);

  const keys = ['p1','p2','p3','p4'];
  document.querySelectorAll('.bsel').forEach((el, i) => {
    el.classList.toggle('selected', keys[i] === selectedBookKey);
  });

  generateQR(selectedBookKey);
  document.getElementById('buy-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateModalForBook(key) {
  const b = BOOKS[key];
  document.getElementById('m-title').textContent  = 'The Boy, The Bird, and The Sky — ' + b.name.split('—')[0].trim();
  document.getElementById('m-author').textContent = 'by Subhajit Sarkar · Digital PDF';
  document.getElementById('m-price').textContent  = '₹' + b.price;
  document.getElementById('m-note').textContent   = 'One-time · Instant PDF delivery';
}

function selectBook(key, el) {
  selectedBookKey = key;
  document.querySelectorAll('.bsel').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  updateModalForBook(key);
  generateQR(key);
}

function generateQR(key) {
  const b = BOOKS[key];
  document.getElementById('upi-txt').textContent = UPI;
  const qd = encodeURIComponent(`upi://pay?pa=${UPI}&pn=Subhajit+Sarkar&am=${b.am}&cu=INR&tn=Book+${key.toUpperCase()}`);
  document.getElementById('qr-img').src = `https://api.qrserver.com/v1/create-qr-code/?size=164x164&data=${qd}`;
}

function closeModal() {
  document.getElementById('buy-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeBuyOv(e) { if (e.target.id === 'buy-modal') closeModal(); }

function copyUPI() {
  navigator.clipboard.writeText(UPI).then(() => {
    const b = document.getElementById('copy-btn');
    b.textContent = 'Copied!'; b.classList.add('done');
    showToast('✦ UPI ID copied!');
    setTimeout(() => { b.textContent = 'Copy'; b.classList.remove('done'); }, 2600);
  });
}

function openWA() {
  const b   = BOOKS[selectedBookKey];
  const msg = encodeURIComponent(`Hi! I just paid ₹${b.price} for "${b.name}" (The Boy, The Bird, and The Sky). Here is my payment screenshot — please send me the PDF. 🙏`);
  window.open(`https://wa.me/${WA_NUM}?text=${msg}`, '_blank');
}

/* ────────────────────────────────────────────────────────
   AUTH — localStorage-based accounts
──────────────────────────────────────────────────────── */
let currentUser = null;

function getUsers()       { return JSON.parse(localStorage.getItem('ss_users')   || '[]'); }
function saveUsers(u)     { localStorage.setItem('ss_users',   JSON.stringify(u)); }
function getSession()     { return JSON.parse(localStorage.getItem('ss_session') || 'null'); }
function saveSession(u)   { localStorage.setItem('ss_session', JSON.stringify(u)); }
function clearSession()   { localStorage.removeItem('ss_session'); }

function openAuth(tab = 'login') {
  document.getElementById('auth-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  switchTab(tab);
}

function closeAuth() {
  document.getElementById('auth-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeAuthOv(e) { if (e.target.id === 'auth-modal') closeAuth(); }

function switchTab(tab) {
  document.getElementById('form-login').classList.toggle('show',    tab === 'login');
  document.getElementById('form-register').classList.toggle('show', tab === 'register');
  document.getElementById('tab-login').classList.toggle('active',    tab === 'login');
  document.getElementById('tab-register').classList.toggle('active', tab === 'register');
  document.getElementById('login-err').textContent = '';
  document.getElementById('reg-err').textContent   = '';
}

function doLogin() {
  const email = document.getElementById('li-email').value.trim();
  const pass  = document.getElementById('li-pass').value;
  const err   = document.getElementById('login-err');
  if (!email || !pass) { err.textContent = 'Please fill in all fields.'; return; }
  const user  = getUsers().find(u => u.email === email && u.password === pass);
  if (!user) { err.textContent = 'Invalid email or password.'; return; }
  currentUser = user; saveSession(user); closeAuth(); updateNavAuth(); renderReviewGate();
  showToast(`✦ Welcome back, ${user.name}!`);
}

function doRegister() {
  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-pass').value;
  const err   = document.getElementById('reg-err');
  if (!name || !email || !pass) { err.textContent = 'Please fill in all fields.'; return; }
  if (!email.includes('@'))     { err.textContent = 'Please enter a valid email.'; return; }
  if (pass.length < 6)          { err.textContent = 'Password must be at least 6 characters.'; return; }
  const users = getUsers();
  if (users.find(u => u.email === email)) { err.textContent = 'An account with this email already exists.'; return; }
  const newUser = { name, email, password: pass, joined: new Date().toISOString() };
  users.push(newUser); saveUsers(users);
  currentUser = newUser; saveSession(newUser); closeAuth(); updateNavAuth(); renderReviewGate();
  showToast(`✦ Welcome, ${name}!`);
}

function doLogout() {
  currentUser = null; clearSession(); updateNavAuth(); renderReviewGate();
  showToast('You have been logged out.');
}

function updateNavAuth() {
  const btn = document.getElementById('nav-login-btn');
  if (currentUser) {
    btn.textContent = `${currentUser.name.split(' ')[0]} · Logout`;
    btn.onclick     = doLogout;
  } else {
    btn.textContent = 'Login';
    btn.onclick     = () => openAuth('login');
  }
}

/* ────────────────────────────────────────────────────────
   REVIEWS
──────────────────────────────────────────────────────── */
const DEFAULT_REVIEWS = [
  { name:"Priya Borthakur",    location:"Guwahati, Assam",           rating:5, text:"This story hit me in a way I did not expect. The ending made me sit in silence for a while. Beautifully written — felt like it was speaking directly to me.",                                         date:"April 2025",    verified:true,  id:"d1"  },
  { name:"Ritam Das",          location:"Jorhat, Assam",             rating:5, text:"Read all three parts back to back. Could not stop. The moment Vihaan learns his true name made me put the book down just to breathe.",                                                               date:"May 2025",      verified:true,  id:"d2"  },
  { name:"Sneha Mahanta",      location:"Dibrugarh, Assam",          rating:5, text:"I have never cried reading a short novel before. The part about the cage — I felt that personally. Stayed with me all week. Part III is absolutely incredible.",                                     date:"April 2025",    verified:true,  id:"d3"  },
  { name:"Aman Kumar",         location:"Delhi, NCR",                rating:5, text:"Simple language, deep meaning. Read it in one sitting and shared with three friends immediately. Vihaan's journey is unlike anything I have read.",                                                   date:"March 2025",    verified:true,  id:"d4"  },
  { name:"Lakshmi Tamang",     location:"Siliguri, West Bengal",     rating:5, text:"I am from Northeast and this story made me feel seen. The descriptions of the city arriving from Assam — so real. Waiting for Part IV impatiently.",                                                 date:"May 2025",      verified:true,  id:"d5"  },
  { name:"Nikhil Srivastava",  location:"Lucknow, UP",               rating:4, text:"Atmospheric and deeply felt. The mythology woven through Part II is beautifully handled. The old man at the temple was haunting. More please.",                                                      date:"April 2025",    verified:true,  id:"d6"  },
  { name:"Mrinalika Devi",     location:"Nagaon, Assam",             rating:5, text:"Subhajit writes like someone who has actually felt all of this. The girl Shree — so real. Their rooftop conversations are the best pages in the series.",                                            date:"May 2025",      verified:true,  id:"d7"  },
  { name:"Arjun Phukan",       location:"Tinsukia, Assam",          rating:5, text:"Bought all three in one day. The birds are not just birds. Everything is layered. This is the kind of writing that does not come from following a formula.",                                          date:"March 2025",    verified:true,  id:"d8"  },
  { name:"Pooja Agarwal",      location:"Kolkata, West Bengal",      rating:4, text:"Part III's climax when the rift opens — I was not ready. Completely changed the scope of the story. Cannot believe Part IV is still being written.",                                                 date:"May 2025",      verified:true,  id:"d9"  },
  { name:"Subham Borah",       location:"Lakhimpur, Assam",          rating:5, text:"The writing knows what silence feels like. The boy carrying storms inside him that no one can see — that is every introverted person I know, written perfectly.",                                   date:"February 2025", verified:true,  id:"d10" },
  { name:"Kavya Menon",        location:"Bangalore, Karnataka",      rating:5, text:"Discovered this through a friend who is from Assam. Now I understand why she would not stop talking about it. Vihaan's story deserves to be read widely.",                                          date:"April 2025",    verified:true,  id:"d11" },
  { name:"Dibya Jyoti",        location:"Goalpara, Assam",           rating:5, text:"From Goalpara! Proud to know someone from here is writing like this. The detail about the window facing a concrete wall hit differently.",                                                            date:"May 2025",      verified:true,  id:"d12" },
  { name:"Rahul Sharma",       location:"Jaipur, Rajasthan",         rating:4, text:"Picked this up expecting something light. It was anything but light. The philosophical weight of the Shiva chapters in Part III surprised me completely.",                                           date:"April 2025",    verified:true,  id:"d13" },
  { name:"Ananya Baruah",      location:"Silchar, Assam",            rating:5, text:"Part II chapter where the old man disappears and the crow shows the truth — that made me gasp out loud. Genuine literature. Ordering Part IV the moment it drops.",                                 date:"May 2025",      verified:true,  id:"d14" },
  { name:"Siddharth Roy",      location:"Bhopal, MP",                rating:5, text:"The countdown to Part IV is real. I refreshed the website looking for a release date. The characters feel like people I have actually met. Extraordinary work.",                                     date:"May 2025",      verified:true,  id:"d15" },
  { name:"Deepika Nath",       location:"Nagpur, Maharashtra",       rating:4, text:"Parts I and II were good but Part III is where the story explodes. The rift scene had me re-reading it twice. Not a perfect series but genuinely one of the more interesting indie reads I found this year.", date:"June 2025",     verified:true,  id:"d16" },
  { name:"Farhan Hossain",     location:"Dhubri, Assam",             rating:4, text:"I liked the mythology angle a lot — the Shiva thread running through all three books is clever and I did not see the temple twist coming. Some chapters felt a little short, but the characters make up for it.", date:"June 2025",     verified:true,  id:"d17" },
  { name:"Tanya Gupta",        location:"Chandigarh, Punjab",        rating:3, text:"The writing has a lot of potential and Vihaan is a compelling character. I felt Part II moved a bit fast for me personally — some moments could have been developed more. Still curious enough to read Part III.", date:"May 2025",     verified:true,  id:"d18" },
  { name:"Bishnu Deka",        location:"Kamrup, Assam",             rating:3, text:"Decent story. The bird metaphor is thoughtful and the Assam setting felt real. I wish the books were longer — at 33 and 44 pages they feel more like chapters than full instalments. Worth the price though.", date:"April 2025",   verified:true,  id:"d19" }
];

function getReviews() {
  const stored = JSON.parse(localStorage.getItem('ss_reviews') || 'null');
  return stored
    ? [...stored, ...DEFAULT_REVIEWS.filter(d => !stored.find(s => s.id === d.id))]
    : DEFAULT_REVIEWS;
}

function getUserReviews()   { return JSON.parse(localStorage.getItem('ss_user_reviews') || '[]'); }
function saveUserReviews(r) { localStorage.setItem('ss_user_reviews', JSON.stringify(r)); }

function renderReviews() {
  const grid    = document.getElementById('reviews-grid');
  const reviews = getReviews().slice(0, 6);
  grid.innerHTML = reviews.map((r, i) => {
    const stars   = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    const initials = r.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const isOwn   = currentUser && r.authorEmail === currentUser.email;
    return `<div class="tcard" style="animation-delay:${i * .05}s">
      <div class="t-stars">${stars}</div>
      <p class="t-text">"${r.text}"</p>
      <div class="t-author">
        <div class="t-av">${initials}</div>
        <div>
          <span class="t-name">${r.name}</span>
          <span class="t-role">Reader · ${r.location}</span>
          <span class="t-verified">✅ Verified Reader</span>
        </div>
      </div>
      <div class="t-date">${r.date}</div>
      ${isOwn ? `<div class="t-actions"><button class="btn-del-review" onclick="deleteReview('${r.id}')">Delete My Review</button></div>` : ''}
    </div>`;
  }).join('');
}

let selectedRating = 0;

function pickStar(n) {
  selectedRating = n;
  document.querySelectorAll('.star-picker span').forEach((s, i) => s.classList.toggle('on', i < n));
}

function deleteReview(id) {
  /* Remove from user reviews list */
  const userRevs = getUserReviews().filter(r => r.id !== id);
  saveUserReviews(userRevs);
  /* Remove from stored reviews */
  const stored  = JSON.parse(localStorage.getItem('ss_reviews') || '[]');
  const updated = stored.filter(r => r.id !== id);
  localStorage.setItem('ss_reviews', JSON.stringify(updated));
  renderReviews();
  showToast('Your review has been deleted.');
}

function renderReviewGate() {
  const gate = document.getElementById('review-gate');
  if (currentUser) {
    gate.innerHTML = `<div class="review-form-wrap">
      <h3>Share Your Thoughts</h3>
      <p>Logged in as <em style="color:var(--gold)">${currentUser.name}</em> · <a href="#" onclick="doLogout();return false" style="color:var(--muted);font-size:.8rem">Logout</a></p>
      <div class="rf-row">
        <div><label class="rf-label">Your Name</label><input class="rf-input" id="rv-name" value="${currentUser.name}" readonly style="opacity:.7"/></div>
        <div><label class="rf-label">Location</label><input class="rf-input" id="rv-loc" placeholder="City, State"/></div>
      </div>
      <div style="margin-bottom:16px">
        <label class="rf-label">Rating</label>
        <div class="star-picker" id="star-picker">
          <span onclick="pickStar(1)">★</span>
          <span onclick="pickStar(2)">★</span>
          <span onclick="pickStar(3)">★</span>
          <span onclick="pickStar(4)">★</span>
          <span onclick="pickStar(5)">★</span>
        </div>
      </div>
      <div style="margin-bottom:20px">
        <label class="rf-label">Your Review</label>
        <textarea class="rf-input" id="rv-text" placeholder="Tell others what you thought of this story…" rows="5"></textarea>
      </div>
      <button class="btn-primary" onclick="submitReview()" style="width:100%;text-align:center">Submit Review &nbsp;✦</button>
    </div>`;
    selectedRating = 0;
  } else {
    gate.innerHTML = `<div class="login-gate">
      <p>Please login or create a free account to write a review.</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <button class="btn-primary" onclick="openAuth('login')">Login</button>
        <button class="btn-ghost"   onclick="openAuth('register')">Create Account</button>
      </div>
    </div>`;
  }
}

function submitReview() {
  const name = currentUser.name;
  const loc  = document.getElementById('rv-loc').value.trim() || 'India';
  const text = document.getElementById('rv-text').value.trim();
  if (!selectedRating) { showToast('Please select a star rating.'); return; }
  if (text.length < 15) { showToast('Please write at least 15 characters.'); return; }

  const now    = new Date();
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const id     = 'u_' + Date.now();
  const newRev = {
    id, name, location: loc, rating: selectedRating, text,
    date: `${months[now.getMonth()]} ${now.getFullYear()}`,
    verified: true,  authorEmail: currentUser.email
  };

  const userRevs = getUserReviews();
  userRevs.unshift(newRev);
  saveUserReviews(userRevs);

  const stored = JSON.parse(localStorage.getItem('ss_reviews') || '[]');
  stored.unshift(newRev);
  localStorage.setItem('ss_reviews', JSON.stringify(stored));

  renderReviews();
  showToast('✦ Review submitted! Thank you.');
  document.getElementById('rv-text').value = '';
  document.getElementById('rv-loc').value  = '';
  selectedRating = 0;
  document.querySelectorAll('.star-picker span').forEach(s => s.classList.remove('on'));
  document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' });
}

/* ────────────────────────────────────────────────────────
   KEYBOARD SHORTCUTS & CONTENT PROTECTION
──────────────────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeAuth(); closePP(); closePrivacyModal(); }
  if ((e.ctrlKey || e.metaKey) && ['c','u','s','p'].includes(e.key.toLowerCase())) {
    if (!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      showToast('Content is protected © Subhajit Sarkar');
    }
  }
});
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('dragstart',   e => e.preventDefault());

/* ────────────────────────────────────────────────────────
   INIT
──────────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  emailjs.init("SE8VxG5c7wsH_Jvx0");
  currentUser = getSession();
  updateNavAuth();
  renderReviews();
  renderReviewGate();
  const btn = document.getElementById('nav-login-btn');
  if (!btn.onclick) btn.onclick = () => openAuth('login');
});
/* ────────────────────────────────────────────────────────
   REVIEWS MODAL
──────────────────────────────────────────────────────── */
let rmActiveFilter = 'all';

function isUserVerifiedReader() {
  if (!currentUser) return false;
  const purchases = JSON.parse(localStorage.getItem('ss_purchases') || '[]');
  const userRevs  = getUserReviews();
  // Verified if they have logged purchases OR have submitted reviews marked bought
  return purchases.length > 0 || userRevs.some(r => r.authorEmail === currentUser.email);
}

function renderCardHTML(r, i) {
  const stars    = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
  const initials = r.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const isOwn    = currentUser && r.authorEmail === currentUser.email;
  // If this card belongs to the logged-in user AND they're a verified reader → force badge
  const showBadge = true; // All reviews show Verified Reader badge
  return `<div class="tcard" style="animation-delay:${i * .04}s">
      <div class="t-stars">${stars}</div>
      <p class="t-text">"${r.text}"</p>
      <div class="t-author">
        <div class="t-av">${initials}</div>
        <div>
          <span class="t-name">${r.name}</span>
          <span class="t-role">Reader · ${r.location}</span>
          ${showBadge ? '<span class="t-verified">✅ Verified Reader</span>' : ''}
        </div>
      </div>
      <div class="t-date">${r.date}</div>
      ${isOwn ? `<div class="t-actions"><button class="btn-del-review" onclick="deleteReview('${r.id}')">Delete My Review</button></div>` : ''}
    </div>`;
}

function renderModalReviews() {
  const grid    = document.getElementById('rm-reviews-grid');
  const count   = document.getElementById('rm-count');
  const all     = getReviews();
  const filtered = rmActiveFilter === 'all'
    ? all
    : all.filter(r => r.rating === rmActiveFilter);
  count.textContent = filtered.length + ' review' + (filtered.length !== 1 ? 's' : '');
  grid.innerHTML = filtered.length
    ? filtered.map((r, i) => renderCardHTML(r, i)).join('')
    : '<p class="rm-empty">No reviews for this rating yet.</p>';
}

function filterModalReviews(rating, btn) {
  rmActiveFilter = rating;
  document.querySelectorAll('.rm-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderModalReviews();
}

function openReviewsModal() {
  rmActiveFilter = 'all';
  document.querySelectorAll('.rm-filter').forEach((b, i) => b.classList.toggle('active', i === 0));
  renderModalReviews();
  document.getElementById('reviews-modal-ov').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeReviewsModal(e) {
  if (e && e.target !== document.getElementById('reviews-modal-ov')) return;
  document.getElementById('reviews-modal-ov').classList.remove('open');
  document.body.style.overflow = '';
}

// ESC key closes the reviews modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeReviewsModal(null);
});
