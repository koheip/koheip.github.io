(() => {
  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // theme
  const savedTheme = localStorage.getItem('theme');
  const preferLight = matchMedia('(prefers-color-scheme: light)').matches;
  const setTheme = t => { root.dataset.theme = t; $('#theme').textContent = t === 'dark' ? '☾ DARK' : '☀ LIGHT'; localStorage.setItem('theme', t); };
  setTheme(savedTheme || (preferLight ? 'light' : 'dark'));
  $('#theme').onclick = () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');

  // language
  const setLang = l => {
    root.lang = l;
    $$('[data-ja]').forEach(el => { el.innerHTML = el.dataset[l] ?? el.dataset.ja; });
    document.title = l === 'ja' ? '松延 弘平 | ポートフォリオ' : 'Kohei Matsunobe | Portfolio';
    $('#lang').textContent = l === 'ja' ? 'EN' : '日本語';
    localStorage.setItem('lang', l);
  };
  setLang(localStorage.getItem('lang') || ((navigator.language || '').startsWith('ja') ? 'ja' : 'en'));
  $('#lang').onclick = () => setLang(root.lang === 'ja' ? 'en' : 'ja');

  // reveal
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  $$('.rv').forEach(el => io.observe(el));

  // progress + active nav
  const bar = $('#progress'), links = $$('nav ul a'), secs = links.map(a => $(a.getAttribute('href')));
  const onScroll = () => {
    const h = document.documentElement;
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
    const y = h.scrollTop + 140;
    secs.forEach((s, i) => links[i].classList.toggle('active', s.offsetTop <= y && s.offsetTop + s.offsetHeight > y));
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // card spotlight
  $$('.card').forEach(c => c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));

})();
