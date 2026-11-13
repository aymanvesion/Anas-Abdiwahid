/* =====================================================================
   XAYEYSIIN (Ads box) — frontend kaliya
   ---------------------------------------------------------------------
   SIDA LOO DARO XAYEYSIIN CUSUB:
   Ku dar link liiska ADS hoose. Link kasta wuxuu noqon karaa:
     - Bost Facebook   → https://www.facebook.com/.../posts/...
     - Video Facebook  → https://www.facebook.com/.../videos/...  ama  /reel/...
     - Video YouTube   → https://www.youtube.com/watch?v=...  ama  https://youtu.be/...
     - Video MP4       → magaca faylka, tusaale: "Vedio_edite.mp4"
     - Sawir           → magaca faylka, tusaale: "Boster.jpg"  (link: meesha uu geynayo)

   FIIRO GAAR AH (Facebook): link-ga "share" (facebook.com/share/p/...) ma shaqeeyo.
   Fur link-ga browser-ka, kadibna koobi link-ga buuxa ee ka muuqda address bar-ka.

   Haddii xayeysiino badan jiraan, mid ayaa si random ah u soo baxa marka bogga la furo.
   ===================================================================== */

const ADS = [
  {
    // Xayeysiinta adeegyadayda: "Ganacsigaagu ma leeyahay website?" (8 Nov 2026)
    url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid02unGHAshUjAGjNmbj88VP5BxsRPJCxYcvciYhxSkZAsYEbBhEDMTV2YpeHhf1Rgn8l&id=61588240124486',
    title: {
      en: 'Does your business have a website? – Websites, Apps, UI/UX & Branding',
      so: 'Ganacsigaagu ma leeyahay website? – Website, App, UI/UX & Branding',
      ar: 'هل لدى عملك موقع إلكتروني؟ – مواقع وتطبيقات وتصميم وهوية'
    }
  },
  {
    // Shaacinta Guddiga Doorashada Ardayda (5 Nov 2026) — Anas waa Guddoomiye Ku-xigeen
    url: 'https://www.facebook.com/HormuudUniFACT/posts/pfbid02rHa2giumfrmisS6Eg2ax8h4amZ2n8bHMxK8kpqo6ngDYz8WXDk72DsqcH5TobdMPl',
    title: {
      en: 'Announcement: Student Elections Committee 2026–2027 – Hormuud University',
      so: 'Shaacinta Guddiga Doorashada Ardayda 2026–2027 – Jaamacadda Hormuud',
      ar: 'إعلان: لجنة انتخابات الطلاب 2026–2027 – جامعة هرمود'
    },
    role: {
      en: 'Vice Chairman, Elections Committee – Faculty of Computer Science & IT (2026)',
      so: 'Guddoomiye Ku-xigeenka Guddiga Doorashooyinka – Kulliyadda Computer Science & IT (2026)',
      ar: 'نائب رئيس لجنة الانتخابات – كلية علوم الحاسوب وتقنية المعلومات (2026)'
    }
  },
  {
    // NTW 2026 — Our Media & Technology Pioneers (23 Sep 2026)
    url: 'https://www.facebook.com/HormuudUni/posts/pfbid03rZPaMoQSQ3K8MmZ8P6PN4dBvCYPnYPeQhqji3eoajRqkZR7JdJhXjsoggcmvJ71l',
    title: {
      en: 'NTW 2026 | Our Media & Technology Pioneers – Hormuud University',
      so: 'NTW 2026 | Hormuudyada Warbaahinta & Tignoolajiyada – Jaamacadda Hormuud',
      ar: 'أسبوع التدريب الوطني 2026 | رواد الإعلام والتكنولوجيا – جامعة هرمود'
    },
    role: {
      en: 'Technology & Media Pioneer – National Training Week (NTW 2026)',
      so: 'Technology & Media Pioneer – Toddobaadka Tababarka Qaranka (NTW 2026)',
      ar: 'رائد التكنولوجيا والإعلام – أسبوع التدريب الوطني (NTW 2026)'
    }
  },
  {
    url: 'https://www.facebook.com/HormuudUniFACT/posts/pfbid0KWCp4jQL7jUpFBccTWyW1ed7ej3rk2P2rWksUmMWh6DtDw5JnxQVeevsXdKjDMqml',
    title: 'Musharraxiinta Guddoomiyaha Ardayda – Hormuud University',
    // Doorkaaga (ikhtiyaari) — wuxuu ka muuqanayaa korka xayeysiinta
    role: {
      en: 'Vice Chairman, Elections Committee – Faculty of Computer Science & IT (2026)',
      so: 'Guddoomiye Ku-xigeenka Guddiga Doorashooyinka – Kulliyadda Computer Science & IT (2026)',
      ar: 'نائب رئيس لجنة الانتخابات – كلية علوم الحاسوب وتقنية المعلومات (2026)'
    }
  },
  {
    // Video (reel) sharaxaya waaxaha Kulliyadda Computer Science & IT
    url: 'https://www.facebook.com/reel/2041271103389788/',
    title: {
      en: 'Video: Departments of Computer Science & IT – Hormuud University',
      so: 'Video: Sharaxaadda Waaxaha Computer Science & IT – Jaamacadda Hormuud',
      ar: 'فيديو: أقسام علوم الحاسوب وتقنية المعلومات – جامعة هرمود'
    }
  }
  // ,{ url: 'https://www.youtube.com/watch?v=XXXXXXXX', title: 'Video-ga xafladda' }
  // ,{ url: 'Boster.jpg', link: 'https://www.facebook.com/...', title: 'Poster cusub' }
];

(function () {
  const slot = document.getElementById('adSlot');
  const ads = ADS.filter(a => a && a.url);
  if (!slot || !ads.length) { if (slot) slot.style.display = 'none'; return; }

  const TXT = {
    en: { myRole: 'My role', label: 'HIGHLIGHTS', close: 'Hide highlights', closed: 'Highlights hidden.', undo: 'Show again', open: 'Open', watch: 'Watch', why: 'Not interested? Press ✕ to hide.' },
    so: { myRole: 'Doorkayga', label: 'XUSUUSO MUHIIM AH', close: 'Qari', closed: 'Waa la qariyay.', undo: 'Soo celi', open: 'Fur', watch: 'Daawo', why: 'Ma xiisaynaysid? Riix ✕ si aad u qariso.' },
    ar: { myRole: 'دوري', label: 'أبرز اللحظات', close: 'إخفاء', closed: 'تم الإخفاء.', undo: 'إظهار مجدداً', open: 'فتح', watch: 'شاهد', why: 'غير مهتم؟ اضغط ✕ للإخفاء.' }
  };
  const tx = k => (TXT[document.documentElement.getAttribute('lang')] || TXT.en)[k];
  const esc = s => String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const pick = v => (v && typeof v === 'object') ? (v[document.documentElement.getAttribute('lang')] || v.en || '') : (v || '');
  /* how many ads fit next to each other (2 on computer, 1 on phone) */
  const GAP = 20;
  // each ad needs at least ~340px (Facebook's minimum); up to 3 side by side
  // (avoids leaving one ad alone on the last row, e.g. 4 ads → 2 + 2)
  const cols = () => {
    const n = ads.length;
    const fit = Math.max(1, Math.min(n, 3, Math.floor((slot.clientWidth + GAP) / (340 + GAP))));
    for (let c = fit; c > 1; c--) if (n % c === 0 || n % c >= c - 1) return c;
    return 1;
  };
  const isPhone = () => slot.clientWidth < 600 && ads.length > 1;   // swipe carousel (see ads.css)
  const colWidth = () => isPhone()
    ? Math.floor((slot.clientWidth + 24) * 0.86 * 0.86)          // 86% of the grid's inner width
    : Math.floor((slot.clientWidth - GAP * (cols() - 1)) / cols());

  /* Work out what kind of link this is and how to show it */
  function media(a) {
    const u = a.url.trim();
    a = Object.assign({}, a, { title: pick(a.title) });
    let m;
    if ((m = u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/))) {
      return { kind: 'video', link: `https://www.youtube.com/watch?v=${m[1]}`, html: `<iframe src="https://www.youtube-nocookie.com/embed/${m[1]}?rel=0" title="${esc(a.title)}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>`, ratio: '16 / 9' };
    }
    if (/facebook\.com|fb\.watch/.test(u)) {
      const isVideo = /\/videos?\/|\/reel\/|fb\.watch|watch\/?\?v=/.test(u);
      const fbW = Math.max(280, Math.min(420, (colWidth() || 420) - 2));
      const src = `https://www.facebook.com/plugins/${isVideo ? 'video' : 'post'}.php?href=${encodeURIComponent(u)}&show_text=${isVideo ? 'false' : 'true'}&width=${fbW}`;
      return { kind: isVideo ? 'video' : 'post', link: u, html: `<iframe src="${src}" title="${esc(a.title)}" scrolling="no" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>`, ratio: isVideo ? '16 / 9' : null };
    }
    if (/\.(mp4|webm|ogg)(\?|$)/i.test(u)) {
      return { kind: 'video', link: a.link || u, html: `<video src="${esc(u)}" controls playsinline preload="metadata"></video>`, ratio: '16 / 9' };
    }
    if (/\.(jpe?g|png|gif|webp|svg)(\?|$)/i.test(u)) {
      return { kind: 'image', link: a.link || u, html: `<a href="${esc(a.link || u)}" target="_blank" rel="noopener noreferrer"><img src="${esc(u)}" alt="${esc(a.title)}" loading="lazy" /></a>` };
    }
    return { kind: 'link', link: u, html: `<a class="ad-plain" href="${esc(u)}" target="_blank" rel="noopener noreferrer"><i class="fas fa-link"></i><span>${esc(a.title || u)}</span></a>` };
  }
  let closed = false;
  try { closed = sessionStorage.getItem('adClosed') === '1'; } catch (e) { }

  function render() {
    if (closed) {
      slot.innerHTML = `
        <div class="ad-closed">
          <span><i class="fas fa-eye-slash"></i> ${esc(tx('closed'))}</span>
          <button type="button" class="ad-undo">${esc(tx('undo'))}</button>
        </div>`;
      return;
    }
    slot.style.setProperty('--ad-cols', cols());
    slot.style.setProperty('--ad-gap', GAP + 'px');
    slot.innerHTML = `
      <div class="ad-topbar">
        <span class="ad-label">${esc(tx('label'))}</span>
        <span class="ad-info" tabindex="0" title="${esc(tx('why'))}"><i class="fas fa-circle-info"></i></span>
        <button type="button" class="ad-close" aria-label="${esc(tx('close'))}" title="${esc(tx('close'))}"><i class="fas fa-xmark"></i></button>
      </div>
      <div class="ad-grid">${ads.map(unit).join('')}</div>
      ${ads.length > 1 ? `<div class="ad-dots">${ads.map((_, i) => `<button type="button" aria-label="${i + 1}" data-dot="${i}"${i === 0 ? ' class="active"' : ''}></button>`).join('')}</div>` : ''}`;
    const grid = slot.querySelector('.ad-grid');
    if (grid) grid.addEventListener('scroll', updateDots, { passive: true });
  }

  /* highlight the dot of the card that is in the middle of the carousel */
  function updateDots() {
    const grid = slot.querySelector('.ad-grid');
    const dots = slot.querySelectorAll('.ad-dots button');
    if (!grid || !dots.length) return;
    const g = grid.getBoundingClientRect();
    const mid = g.left + g.width / 2;
    let best = 0, bestD = Infinity;
    grid.querySelectorAll('.ad-unit').forEach((u, i) => {
      const r = u.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestD) { bestD = d; best = i; }
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === best));
  }

  function unit(ad) {
    const md = media(ad);
    return `
      <div class="ad-unit">
        ${ad.role ? `
        <div class="ad-role">
          <img src="Sawir Logo.png" alt="Anas Abdiwahid" />
          <div>
            <span class="ad-role-label"><i class="fas fa-user-tie"></i> ${esc(tx('myRole'))} · Anas Abdiwahid</span>
            <strong>${esc(typeof ad.role === 'object' ? (ad.role[document.documentElement.getAttribute('lang')] || ad.role.en) : ad.role)}</strong>
          </div>
        </div>` : ''}
        <div class="ad-box ad-${md.kind}"${md.ratio ? ` style="aspect-ratio:${md.ratio}"` : ''}>${md.html}</div>
        <a class="ad-footer" href="${esc(md.link)}" target="_blank" rel="noopener noreferrer">
          <span class="ad-title">${esc(pick(ad.title))}</span>
          <span class="ad-cta">${md.kind === 'video' ? '<i class="fas fa-play"></i> ' + esc(tx('watch')) : esc(tx('open')) + ' <i class="fas fa-arrow-up-right-from-square"></i>'}</span>
        </a>
      </div>`;
  }

  slot.addEventListener('click', e => {
    if (e.target.closest('.ad-close')) {
      closed = true;
      try { sessionStorage.setItem('adClosed', '1'); } catch (err) { }
      slot.classList.add('is-closing');
      setTimeout(() => { slot.classList.remove('is-closing'); render(); }, 250);
    } else if (e.target.closest('.ad-dots button')) {
      const i = +e.target.closest('.ad-dots button').dataset.dot;
      const u = slot.querySelectorAll('.ad-unit')[i];
      const grid = slot.querySelector('.ad-grid');
      if (u && grid) {
        // works for left-to-right and Arabic right-to-left
        const g = grid.getBoundingClientRect(), r = u.getBoundingClientRect();
        const dx = (r.left + r.width / 2) - (g.left + g.width / 2);
        const start = grid.scrollLeft;
        grid.scrollBy({ left: dx, behavior: 'smooth' });
        // some browsers ignore smooth scrolling together with scroll-snap → jump instead
        setTimeout(() => { if (grid.scrollLeft === start && Math.abs(dx) > 2) grid.scrollLeft = start + dx; }, 350);
        setTimeout(updateDots, 450);
        setTimeout(updateDots, 900);
      }
    } else if (e.target.closest('.ad-undo')) {
      closed = false;
      try { sessionStorage.removeItem('adClosed'); } catch (err) { }
      render();
    }
  });

  render();
  // re-size the Facebook embed when the screen width changes a lot (e.g. phone rotated)
  let lastW = slot.clientWidth, rt = null;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      if (Math.abs(slot.clientWidth - lastW) > 40) { lastW = slot.clientWidth; render(); }
    }, 300);
  });
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
