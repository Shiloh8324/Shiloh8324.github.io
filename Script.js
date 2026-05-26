/* ══════════════════════════════════════════
   app.js — Cumpleaños para Princesa 🎉
══════════════════════════════════════════ */

// ── CONFETTI CANVAS ───────────────────────
(function initConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx    = canvas.getContext('2d');
  let   parts  = [];
  let   animId;

  const COLORS  = ['#ff7043','#ffd600','#00bfa5','#7c4dff','#29b6f6','#f44336','#43a047','#ffffff'];
  const EMOJIS  = ['🎉','🎊','🎈','⭐','✨','🎂','🎁','💖'];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function spawn(n) {
    for (let i = 0; i < n; i++) {
      const isEmoji = Math.random() < 0.15;
      parts.push({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height - canvas.height,
        vx:    (Math.random() - 0.5) * 3,
        vy:    Math.random() * 3.5 + 1.5,
        size:  Math.random() * 12 + 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        emoji: isEmoji ? EMOJIS[Math.floor(Math.random() * EMOJIS.length)] : null,
        angle: Math.random() * Math.PI * 2,
        spin:  (Math.random() - 0.5) * 0.14,
        alpha: Math.random() * 0.5 + 0.6,
        shape: ['rect', 'circle', 'tri'][Math.floor(Math.random() * 3)],
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parts.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      if (p.emoji) {
        ctx.font = p.size + 'px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.emoji, 0, 0);
      } else if (p.shape === 'rect') {
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.shape === 'circle') {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, -p.size / 2);
        ctx.lineTo(p.size / 2, p.size / 2);
        ctx.lineTo(-p.size / 2, p.size / 2);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    });
  }

  function update() {
    parts.forEach(p => {
      p.x     += p.vx;
      p.y     += p.vy;
      p.angle += p.spin;
      p.alpha -= 0.004;
    });
    parts = parts.filter(p => p.y < canvas.height + 60 && p.alpha > 0);
    if (parts.length < 150) spawn(10);
  }

  function loop() {
    update();
    draw();
    animId = requestAnimationFrame(loop);
  }

  spawn(150);
  loop();

  window.stopConfetti = () => {
    cancelAnimationFrame(animId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
})();


// ── INTRO → MAIN ──────────────────────────
document.getElementById('open-btn').addEventListener('click', () => {
  const intro = document.getElementById('intro');
  const main  = document.getElementById('main');

  intro.classList.add('fade-out');
  main.classList.remove('hidden');

  requestAnimationFrame(() => requestAnimationFrame(() => {
    main.classList.add('visible');
  }));

  setTimeout(() => {
    intro.remove();
    window.stopConfetti && window.stopConfetti();
    // Lanzar confetti de celebración al abrir
    launchCelebration();
  }, 900);

  // ── Arrancar música automáticamente ──
  // El clic del botón ya cuenta como interacción del usuario
  setTimeout(() => {
    const playBtn = document.getElementById('btn-play');
    if (playBtn) playBtn.click();
  }, 1200);
});


// ── CELEBRACIÓN AL ENTRAR ─────────────────
function launchCelebration() {
  // Pequeño confetti burst desde el centro al cargar la página
  const colors = ['#ff7043','#ffd600','#00bfa5','#7c4dff','#29b6f6','#f44336','#43a047'];
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      burstAt(window.innerWidth / 2, window.innerHeight * 0.3, 60, colors);
    }, i * 400);
  }
}


// ── FLIP DE REGALOS ───────────────────────
document.querySelectorAll('.gift-card').forEach(card => {
  card.addEventListener('click', () => {
    if (card.classList.contains('opened')) return;
    card.classList.add('opened');

    // Explosión de confetti desde el card
    const rect = card.getBoundingClientRect();
    burstAt(
      rect.left + rect.width  / 2,
      rect.top  + rect.height / 2,
      80,
      ['#ff7043','#ffd600','#00bfa5','#7c4dff','#f44336','#43a047','#fff']
    );
  });
});


// ── BURST CONFETTI HELPER ─────────────────
function burstAt(cx, cy, count, colors) {
  const burst = document.createElement('canvas');
  Object.assign(burst.style, {
    position: 'fixed', inset: '0',
    width: '100vw', height: '100vh',
    pointerEvents: 'none', zIndex: '9000',
  });
  document.body.appendChild(burst);
  const bCtx = burst.getContext('2d');
  burst.width  = window.innerWidth;
  burst.height = window.innerHeight;

  const EMOJIS_SMALL = ['🎉','🎊','⭐','✨'];
  let pts = [];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 9 + 4;
    const isEmoji = Math.random() < 0.1;
    pts.push({
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 5,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      emoji: isEmoji ? EMOJIS_SMALL[Math.floor(Math.random() * EMOJIS_SMALL.length)] : null,
      alpha: 1,
      gravity: 0.35,
      spin: (Math.random() - 0.5) * 0.2,
      angle: Math.random() * Math.PI * 2,
    });
  }

  let frame;
  (function animBurst() {
    bCtx.clearRect(0, 0, burst.width, burst.height);
    pts.forEach(p => {
      p.vy    += p.gravity;
      p.x     += p.vx;
      p.y     += p.vy;
      p.angle += p.spin;
      p.alpha -= 0.022;

      bCtx.save();
      bCtx.globalAlpha = Math.max(0, p.alpha);
      bCtx.translate(p.x, p.y);
      bCtx.rotate(p.angle);

      if (p.emoji) {
        bCtx.font = p.size + 'px serif';
        bCtx.textAlign = 'center';
        bCtx.textBaseline = 'middle';
        bCtx.fillText(p.emoji, 0, 0);
      } else {
        bCtx.fillStyle = p.color;
        bCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      bCtx.restore();
    });

    pts = pts.filter(p => p.alpha > 0);
    if (pts.length) {
      frame = requestAnimationFrame(animBurst);
    } else {
      cancelAnimationFrame(frame);
      burst.remove();
    }
  })();
}


// ── HARRY STYLES BOBBLEHEAD 🎤 ───────────
(function initDog() {
  const SPEECH = [
    'Watermelon Sugar 🍉','As It Was 🎵','Treat People With Kindness ✨',
    'Fine Line 💜','¡Hola chicas! 👋','Sign of the Times ⏰',
    'Adore You 🌊','¡Soy Harry! 🎤','Golden ☀️','Kiwi 🥝',
    'Love On Tour 🎸','¡Gucci! 👔','Late Night Talking 📞',
    '¡Sí, soy yo, Harry! 😏','Cherry 🍒','Matilda 🌸',
    '¡Me encanta este cumpleaños! 🎂','¡Eres increíble! 💫',
  ];

  const svgDog = `
  <svg id="dog-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 200" width="110" height="200">
    <style>
      #h-hair-top { animation: h-hair 1.1s ease-in-out infinite alternate; transform-origin: 55px 38px; }
      @keyframes h-hair { from { transform: rotate(-4deg) skewX(-2deg); } to { transform: rotate(4deg) skewX(2deg); } }
      #h-head { animation: h-wobble 0.9s ease-in-out infinite alternate; transform-origin: 55px 70px; }
      @keyframes h-wobble { from { transform: rotate(-3deg) translateY(0); } to { transform: rotate(3deg) translateY(-3px); } }
      #h-blink { animation: h-blink 5s step-end infinite; }
      @keyframes h-blink { 0%,95%,100%{opacity:0} 96%,99%{opacity:1} }
      #h-mic { animation: h-mic 1.8s ease-in-out infinite alternate; transform-origin: 20px 120px; }
      @keyframes h-mic { from { transform: rotate(-8deg); } to { transform: rotate(8deg); } }
    </style>

    <!-- ZAPATOS -->
    <ellipse cx="38" cy="196" rx="14" ry="6" fill="#111"/>
    <ellipse cx="72" cy="196" rx="14" ry="6" fill="#111"/>

    <!-- PIERNA IZQ -->
    <g id="h-leg-l">
      <rect x="30" y="148" width="20" height="50" rx="8" fill="#2c1810"/>
    </g>
    <!-- PIERNA DER -->
    <g id="h-leg-r">
      <rect x="60" y="148" width="20" height="50" rx="8" fill="#2c1810"/>
    </g>

    <!-- CUERPO saco café -->
    <rect x="22" y="108" width="66" height="52" rx="12" fill="#3d1f12"/>
    <!-- suéter morado asomando -->
    <path d="M 42 108 Q 55 116 68 108 L 65 122 Q 55 128 45 122 Z" fill="#9b59b6"/>
    <!-- solapa izq -->
    <path d="M 42 108 L 34 148 L 50 148 L 54 120 Z" fill="#4a2418"/>
    <!-- solapa der -->
    <path d="M 68 108 L 76 148 L 60 148 L 56 120 Z" fill="#4a2418"/>
    <!-- botones dobles -->
    <circle cx="46" cy="128" r="2.5" fill="#1a0e08"/>
    <circle cx="64" cy="128" r="2.5" fill="#1a0e08"/>
    <circle cx="46" cy="138" r="2.5" fill="#1a0e08"/>
    <circle cx="64" cy="138" r="2.5" fill="#1a0e08"/>
    <circle cx="46" cy="148" r="2.5" fill="#1a0e08"/>
    <circle cx="64" cy="148" r="2.5" fill="#1a0e08"/>

    <!-- BRAZO DER (con mic) -->
    <g id="h-arm-r">
      <rect x="74" y="112" width="18" height="40" rx="8" fill="#3d1f12"/>
      <rect x="80" y="150" width="12" height="7" rx="3" fill="#aec6e8"/>
      <ellipse cx="86" cy="161" rx="8" ry="7" fill="#d4956a"/>
      <!-- MICRÓFONO -->
      <g id="h-mic">
        <rect x="10" y="155" width="6" height="22" rx="3" fill="#555"/>
        <ellipse cx="13" cy="153" rx="8" ry="8" fill="#333"/>
        <ellipse cx="13" cy="153" rx="5" ry="5" fill="#666"/>
      </g>
    </g>

    <!-- BRAZO IZQ (con anillo) -->
    <g id="h-arm-l">
      <rect x="18" y="112" width="18" height="40" rx="8" fill="#3d1f12"/>
      <rect x="18" y="150" width="12" height="7" rx="3" fill="#aec6e8"/>
      <ellipse cx="24" cy="161" rx="8" ry="7" fill="#d4956a"/>
      <!-- anillo dorado -->
      <rect x="20" y="162" width="7" height="4" rx="2" fill="#d4a017"/>
    </g>

    <!-- CUELLO -->
    <rect x="46" y="96" width="18" height="16" rx="6" fill="#d4956a"/>

    <!-- ═══ CABEZA GRANDE ═══ -->
    <g id="h-head">
      <!-- pelo base oscuro lados -->
      <ellipse cx="55" cy="55" rx="46" ry="42" fill="#2d1b00"/>
      <ellipse cx="14" cy="66" rx="16" ry="24" fill="#2d1b00"/>
      <ellipse cx="96" cy="66" rx="16" ry="24" fill="#2d1b00"/>

      <!-- CARA -->
      <ellipse cx="55" cy="60" rx="38" ry="42" fill="#d4956a"/>

      <!-- PELO ALBOROTADO arriba -->
      <g id="h-hair-top">
        <path d="M 14 42 Q 18 10 34 4 Q 44 0 46 18 Q 50 2 58 0 Q 66 -2 66 18 Q 72 2 82 10 Q 92 20 88 42" fill="#2d1b00"/>
        <path d="M 20 36 Q 16 14 28 6 Q 38 0 42 18 Z" fill="#3d2600"/>
        <path d="M 52 30 Q 48 8  58 2  Q 66 -2 66 20 Z" fill="#3d2600"/>
        <path d="M 74 34 Q 78 12 86 18 Q 92 24 86 40 Z" fill="#3d2600"/>
        <!-- mechón rebelde frontal -->
        <path d="M 36 38 Q 44 52 48 62" fill="none" stroke="#2d1b00" stroke-width="6" stroke-linecap="round"/>
        <path d="M 68 36 Q 74 48 72 58" fill="none" stroke="#2d1b00" stroke-width="5" stroke-linecap="round"/>
      </g>

      <!-- CEJAS -->
      <path d="M 28 52 Q 38 47 46 50" fill="none" stroke="#2d1b00" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 64 50 Q 72 47 82 52" fill="none" stroke="#2d1b00" stroke-width="2.5" stroke-linecap="round"/>

      <!-- OJOS azul-gris -->
      <ellipse cx="37" cy="62" rx="10" ry="9" fill="white"/>
      <ellipse cx="73" cy="62" rx="10" ry="9" fill="white"/>
      <ellipse cx="37" cy="63" rx="6"  ry="6"  fill="#6b8fa8"/>
      <ellipse cx="73" cy="63" rx="6"  ry="6"  fill="#6b8fa8"/>
      <ellipse cx="37" cy="63" rx="3"  ry="3"  fill="#111"/>
      <ellipse cx="73" cy="63" rx="3"  ry="3"  fill="#111"/>
      <circle cx="39" cy="60" r="1.5" fill="white"/>
      <circle cx="75" cy="60" r="1.5" fill="white"/>
      <!-- parpadeo -->
      <g id="h-blink">
        <ellipse cx="37" cy="62" rx="10" ry="9" fill="#d4956a"/>
        <ellipse cx="73" cy="62" rx="10" ry="9" fill="#d4956a"/>
      </g>

      <!-- NARIZ -->
      <ellipse cx="55" cy="76" rx="7" ry="5" fill="#c4845a" opacity="0.45"/>
      <path d="M 49 79 Q 55 83 61 79" fill="none" stroke="#b07040" stroke-width="1.5" stroke-linecap="round"/>

      <!-- BIGOTE leve -->
      <path d="M 44 87 Q 55 84 66 87" fill="none" stroke="#6b4226" stroke-width="2" stroke-linecap="round" opacity="0.55"/>

      <!-- BOCA -->
      <path d="M 43 93 Q 55 99 67 93" fill="none" stroke="#a05030" stroke-width="2" stroke-linecap="round"/>

      <!-- OREJAS -->
      <ellipse cx="17" cy="68" rx="9"  ry="12" fill="#c8855a"/>
      <ellipse cx="93" cy="68" rx="9"  ry="12" fill="#c8855a"/>
      <ellipse cx="17" cy="68" rx="5"  ry="7"  fill="#b87048" opacity="0.4"/>
      <ellipse cx="93" cy="68" rx="5"  ry="7"  fill="#b87048" opacity="0.4"/>

      <!-- PENDIENTE derecho -->
      <circle cx="93" cy="74" r="3" fill="#d4a017" stroke="#b8860b" stroke-width="0.8"/>
      <circle cx="93" cy="79" r="2" fill="#d4a017"/>

      <!-- TATUAJE en cuello (mariposa) -->
      <path d="M 47 93 Q 51 89 55 93 Q 59 89 63 93" fill="none" stroke="#6b4226" stroke-width="1" opacity="0.5"/>

    </g><!-- fin head -->

    <!-- NOTA MUSICAL flotante -->
    <text id="h-note" x="85" y="90" font-size="14" fill="#9b59b6" opacity="0" font-family="serif">♪</text>
  </svg>`;



  const dog = document.createElement('div');
  dog.id = 'walking-dog';
  dog.innerHTML = `
    <div class="dog-body">
      <div class="dog-bubble" id="dog-bubble"></div>
      ${svgDog}
    </div>
  `;
  document.body.appendChild(dog);

  const bubble  = document.getElementById('dog-bubble');
  const svg     = document.getElementById('dog-svg');
  const legL    = document.getElementById('h-leg-l');
  const legR    = document.getElementById('h-leg-r');
  const armL    = document.getElementById('h-arm-l');
  const armR    = document.getElementById('h-arm-r');
  const note    = document.getElementById('h-note');

  let x       = -120;
  let dir     = 1;
  let t       = 0;
  let paused  = false;
  let speed   = 1.3;
  let trick   = null;   // animación especial activa
  let trickT  = 0;

  // ── Parpadeo periódico ──
  setInterval(() => {
    const b = document.getElementById('h-blink');
    if (!b) return;
    b.setAttribute('opacity','1');
    setTimeout(() => b.setAttribute('opacity','0'), 130);
  }, 3500 + Math.random() * 2000);

  // ── Notas musicales flotantes ──
  setInterval(() => {
    if (Math.random() < 0.5) {
      note.setAttribute('opacity','1');
      let ny = 90, nopacity = 1;
      const floatNote = setInterval(() => {
        ny -= 1.5; nopacity -= 0.04;
        note.setAttribute('y', ny);
        note.setAttribute('opacity', Math.max(0, nopacity));
        if (nopacity <= 0) { clearInterval(floatNote); note.setAttribute('y','90'); }
      }, 40);
    }
  }, 2500);

  function showBubble(msg) {
    clearTimeout(window._harryBubbleTimer);
    const text = msg || SPEECH[Math.floor(Math.random() * SPEECH.length)];
    bubble.textContent = text;
    bubble.classList.add('visible');
    window._harryBubbleTimer = setTimeout(() => bubble.classList.remove('visible'), 2800);
  }

  // ── TRUCOS CHISTOSOS ──────────────────────
  const TRICKS = [
    // 1. Moonwalk — camina al revés
    function moonwalk() {
      showBubble('🕺 Moonwalk!');
      const origDir = dir;
      dir *= -1;
      svg.style.transform = dir === 1 ? 'scaleX(-1)' : 'scaleX(1)';
      setTimeout(() => {
        dir = origDir;
        svg.style.transform = dir === 1 ? 'scaleX(-1)' : 'scaleX(1)';
      }, 2200);
    },
    // 2. Spin — gira como en concierto
    function spin() {
      showBubble('🎤 ¡Esto es para ti! 🌟');
      let deg = 0;
      const spinInt = setInterval(() => {
        deg += 18;
        svg.style.transform = `rotate(${deg}deg)`;
        if (deg >= 360) {
          clearInterval(spinInt);
          svg.style.transform = dir === 1 ? 'scaleX(-1)' : 'scaleX(1)';
        }
      }, 30);
    },
    // 3. Salto con split
    function jump() {
      showBubble('🎵 Watermelon Sugar! 🍉');
      let dy = 0, going = true;
      const jumpInt = setInterval(() => {
        dy = going ? dy - 4 : dy + 4;
        if (dy <= -50) going = false;
        if (dy >= 0 && !going) { clearInterval(jumpInt); dy = 0; }
        dog.style.bottom = (10 - dy) + 'px';
      }, 20);
    },
    // 4. Temblor de emoción
    function shake() {
      showBubble('😱 ¡Es mi canción! 🎶');
      let s = 0;
      const shakeInt = setInterval(() => {
        s++;
        dog.style.marginLeft = (Math.sin(s * 1.2) * 8) + 'px';
        if (s > 30) { clearInterval(shakeInt); dog.style.marginLeft = '0'; }
      }, 30);
    },
    // 5. Crece la cabeza (ego 😂)
    function bigHead() {
      showBubble('💇 ¿Alguien dijo Harry? 😎');
      const head = document.getElementById('h-head');
      if (!head) return;
      head.style.transition = 'transform 0.3s ease';
      head.style.transform  = 'scale(1.35)';
      setTimeout(() => { head.style.transform = 'scale(1)'; }, 1200);
    },
    // 6. Se para y toca el mic
    function sing() {
      showBubble('🎤 ♪ As It Waaas ♪');
      paused = true;
      let angle = 0, dir2 = 1;
      const singInt = setInterval(() => {
        angle += dir2 * 5;
        if (Math.abs(angle) > 25) dir2 *= -1;
        armR.style.transform = `rotate(${angle}deg)`;
        armR.style.transformOrigin = '86px 112px';
      }, 40);
      setTimeout(() => {
        clearInterval(singInt);
        armR.style.transform = '';
        paused = false;
      }, 2500);
    },
  ];

  function doRandomTrick() {
    const fn = TRICKS[Math.floor(Math.random() * TRICKS.length)];
    fn();
  }

  // Truco automático cada cierto tiempo
  setInterval(doRandomTrick, 7000 + Math.random() * 6000);

  function tick() {
    if (!paused) {
      x += speed * dir;
      t += 0.1;

      // Piernas caminando
      const swing    = Math.sin(t) * 16;
      const swingOpp = Math.sin(t + Math.PI) * 16;
      legL.setAttribute('transform', `rotate(${swing}, 40, 148)`);
      legR.setAttribute('transform', `rotate(${swingOpp}, 70, 148)`);
      armL.setAttribute('transform', `rotate(${swingOpp * 0.7}, 27, 112)`);
      armR.setAttribute('transform', `rotate(${swing * 0.7}, 83, 112)`);

      // Bounce del cuerpo
      const bounce = Math.abs(Math.sin(t * 2)) * 2.5;
      svg.style.marginBottom = bounce + 'px';

      // Bordes
      const maxX = window.innerWidth + 120;
      if (x > maxX) {
        dir = -1; x = maxX;
        paused = true;
        setTimeout(() => { paused = false; showBubble(); }, 700);
      } else if (x < -120) {
        dir = 1; x = -120;
        paused = true;
        setTimeout(() => { paused = false; showBubble(); }, 700);
      }

      svg.style.transform = dir === 1 ? 'scaleX(-1)' : 'scaleX(1)';
      dog.style.left = x + 'px';
    }

    if (Math.random() < 0.001) showBubble();
    requestAnimationFrame(tick);
  }

  // Click → truco aleatorio + confetti
  dog.addEventListener('click', () => {
    doRandomTrick();
    const r = dog.getBoundingClientRect();
    burstAt(r.left + r.width / 2, r.top + r.height / 2, 40,
      ['#9b59b6','#d4a017','#2c1810','#aec6e8','#fff','#ffd600']);
  });

  requestAnimationFrame(tick);
})();




// ── REPRODUCTOR DE MÚSICA 🎵 ──────────────
(function initPlayer() {
  const player   = document.getElementById('music-player');
  const btnPlay  = document.getElementById('btn-play');
  const btnPrev  = document.getElementById('btn-prev');
  const btnNext  = document.getElementById('btn-next');
  const btnShuffle = document.getElementById('btn-shuffle');
  const titleEl  = document.getElementById('player-title');
  const bar      = document.getElementById('player-bar');
  const barWrap  = document.getElementById('player-bar-wrap');

  const tracks   = Array.from(document.querySelectorAll('.hs-track'));
  if (!tracks.length) return;

  let current  = 0;
  let shuffle  = true;   // aleatorio por defecto
  let playing  = false;
  let audio    = null;

  btnShuffle.classList.toggle('active', shuffle);

  function getTrack(idx) { return tracks[idx]; }

  function loadTrack(idx) {
    if (audio) { audio.pause(); audio.currentTime = 0; }
    current = (idx + tracks.length) % tracks.length;
    audio   = getTrack(current);
    titleEl.textContent = audio.dataset.title || `Canción ${current + 1}`;
    bar.style.width = '0%';

    audio.addEventListener('timeupdate', onProgress);
    audio.addEventListener('ended', onEnded);

    if (playing) {
      audio.play().catch(() => {});
    }
  }

  function onProgress() {
    if (!audio.duration) return;
    bar.style.width = (audio.currentTime / audio.duration * 100) + '%';
  }

  function onEnded() {
    playNext();
  }

  function playNext() {
    const next = shuffle
      ? Math.floor(Math.random() * tracks.length)
      : (current + 1) % tracks.length;
    loadTrack(next);
    audio.play().catch(() => {});
    playing = true;
    updateUI();
  }

  function updateUI() {
    btnPlay.textContent = playing ? '⏸' : '▶';
    player.classList.toggle('playing', playing);
  }

  // Play / Pausa
  btnPlay.addEventListener('click', () => {
    if (!audio) loadTrack(current);
    if (playing) {
      audio.pause();
      playing = false;
    } else {
      audio.play().catch(() => {});
      playing = true;
    }
    updateUI();
  });

  // Anterior
  btnPrev.addEventListener('click', () => {
    const prev = shuffle
      ? Math.floor(Math.random() * tracks.length)
      : (current - 1 + tracks.length) % tracks.length;
    loadTrack(prev);
    if (playing) audio.play().catch(() => {});
  });

  // Siguiente
  btnNext.addEventListener('click', () => {
    playNext();
  });

  // Shuffle toggle
  btnShuffle.addEventListener('click', () => {
    shuffle = !shuffle;
    btnShuffle.classList.toggle('active', shuffle);
  });

  // Click en barra → saltar posición
  barWrap.addEventListener('click', (e) => {
    if (!audio || !audio.duration) return;
    const rect = barWrap.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  });

  // Cargar primera canción (sin reproducir hasta que el usuario haga clic)
  loadTrack(shuffle ? Math.floor(Math.random() * tracks.length) : 0);
})();



const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0) scale(1)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.gift-card, .wish-card').forEach((el, i) => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(40px) scale(0.95)';
  el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
  observer.observe(el);
});