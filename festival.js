/* festival:v1 (8 Nov 2026, Diwali) — Sir: "iitianshometutors.in me Diwali look daal do; saath me date-wise India ke saare festivals
   ka bhi; achhe animation". One file, loaded by every page after site.js. By the visitor's date, from a few days before a festival to
   a few days after it: a garland / ribbon under the header, a wish band, gentle festival pieces drifting over the page (SVG drawn here,
   no picture files), and for Diwali a row of diyas and soft fireworks. Off by itself outside the windows. Reduced-motion: the band and the
   garland only. Phone: fewer pieces. Preview any look: ?festival=diwali (theme) or ?fdate=2027-03-22 (a date). Dates: drikpanchang.com
   2027 Hindu calendar + calendarific / calendarlabs (Islamic dates are provisional, moon-sighting); 2026 dates from the same sources.
   Add a year's lunar dates to CAL when the calendar is out; fixed-date days (MM-DD) repeat every year. */
(function () {
  var D = document, H = D.documentElement, W = window;
  if (!D.body) return;
  var q = {}; try { location.search.replace(/[?&]([^=&]+)=([^&]*)/g, function (m, k, v) { q[k] = decodeURIComponent(v); }); } catch (e) {}
  var still = false; try { still = W.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var phone = W.innerWidth < 720;

  /* n name · d dates (YYYY-MM-DD per year, or MM-DD = every year) · t theme · w wish · b days before · a days after · p priority (higher wins a tie) */
  var CAL = [
    { n: 'New Year', d: ['01-01'], t: 'sparkle', w: 'Happy New Year! A fresh routine, a steady year — one chapter at a time.', b: 1, a: 3, p: 5 },
    { n: 'Makar Sankranti', d: ['2026-01-14', '2027-01-15', '01-14'], t: 'kites', w: 'Happy Makar Sankranti! Let your ideas fly like kites this year.', b: 2, a: 1, p: 6 },
    { n: 'Republic Day', d: ['01-26'], t: 'tricolour', w: 'Happy Republic Day! Proud to learn, proud to grow. Jai Hind.', b: 2, a: 1, p: 7 },
    { n: 'Vasant Panchami', d: ['2027-02-11'], t: 'marigold', w: 'Happy Vasant Panchami! A day for Saraswati — and for every learner.', b: 1, a: 1, p: 4 },
    { n: 'Maha Shivaratri', d: ['2026-02-15', '2027-03-06'], t: 'lamps', w: 'Happy Maha Shivaratri! Calm mind, steady study.', b: 1, a: 1, p: 5 },
    { n: 'Eid ul-Fitr', d: ['2026-03-20', '2027-03-10'], t: 'eid', w: 'Eid Mubarak! Peace, patience and joy to you and your family.', b: 2, a: 2, p: 7 },
    { n: 'Holi', d: ['2026-03-04', '2027-03-22'], t: 'holi', w: 'Happy Holi! Add some colour to your week — and to your revision.', b: 2, a: 2, p: 8 },
    { n: 'Gudi Padwa', d: ['2026-03-19', '2027-04-07'], t: 'marigold', w: 'Happy Gudi Padwa and Ugadi! A new year, a fresh start to every chapter.', b: 2, a: 1, p: 7 },
    { n: 'Ram Navami', d: ['2026-03-26', '2027-04-15'], t: 'marigold', w: 'Happy Ram Navami! Discipline today, results tomorrow.', b: 1, a: 1, p: 5 },
    { n: 'Baisakhi', d: ['04-14'], t: 'kites', w: 'Happy Baisakhi, Vishu and Bihu! New harvests, new beginnings.', b: 1, a: 1, p: 4 },
    { n: 'Ambedkar Jayanti', d: ['04-14'], t: 'banner', w: 'Happy Ambedkar Jayanti! "Educate, agitate, organise" — start with the first.', b: 0, a: 0, p: 3 },
    { n: 'Mahavir Jayanti', d: ['2026-03-31', '2027-04-18'], t: 'lamps', w: 'Happy Mahavir Jayanti! Truth, calm and focus.', b: 1, a: 1, p: 4 },
    { n: 'Hanuman Jayanti', d: ['2027-04-20'], t: 'marigold', w: 'Happy Hanuman Jayanti! Strength, devotion and courage.', b: 1, a: 0, p: 4 },
    { n: 'Good Friday', d: ['2026-04-03', '2027-03-26'], t: 'banner', w: 'Blessed Good Friday and a happy Easter weekend.', b: 0, a: 2, p: 3 },
    { n: 'Akshaya Tritiya', d: ['2027-05-09'], t: 'lamps', w: 'Happy Akshaya Tritiya! May your efforts never diminish.', b: 0, a: 0, p: 3 },
    { n: 'Buddha Purnima', d: ['2026-05-01', '2027-05-20'], t: 'lamps', w: 'Happy Buddha Purnima! One step at a time, every day.', b: 1, a: 1, p: 4 },
    { n: 'Eid ul-Adha', d: ['2026-05-27', '2027-05-17'], t: 'eid', w: 'Eid Mubarak! Share the joy, keep the routine.', b: 2, a: 2, p: 7 },
    { n: 'Muharram', d: ['2026-06-26', '2027-06-16'], t: 'lamps', w: 'A peaceful Muharram to all who observe it.', b: 0, a: 0, p: 3 },
    { n: 'Rath Yatra', d: ['2026-07-16', '2027-07-05'], t: 'marigold', w: 'Happy Rath Yatra! Jai Jagannath.', b: 1, a: 1, p: 4 },
    { n: 'Guru Purnima', d: ['2026-07-29', '2027-07-18'], t: 'lamps', w: 'Happy Guru Purnima! To every teacher who made a concept click — thank you.', b: 1, a: 1, p: 5 },
    { n: 'Nag Panchami', d: ['2027-08-06'], t: 'marigold', w: 'Happy Nag Panchami!', b: 0, a: 0, p: 2 },
    { n: 'Independence Day', d: ['08-15'], t: 'tricolour', w: 'Happy Independence Day! Jai Hind.', b: 2, a: 1, p: 9 },
    { n: 'Raksha Bandhan', d: ['2026-08-28', '2027-08-17'], t: 'rakhi', w: 'Happy Raksha Bandhan! A bond of care, a promise to do well.', b: 2, a: 1, p: 7 },
    { n: 'Janmashtami', d: ['2026-09-04', '2027-08-25'], t: 'krishna', w: 'Happy Janmashtami! Play hard, study smart.', b: 1, a: 1, p: 6 },
    { n: "Teachers' Day", d: ['09-05'], t: 'banner', w: "Happy Teachers' Day! Thank you to every teacher who made a concept click.", b: 1, a: 1, p: 6 },
    { n: 'Ganesh Chaturthi', d: ['2026-09-14', '2027-09-04'], t: 'ganesh', w: 'Ganpati Bappa Morya! May every obstacle in your syllabus melt away.', b: 2, a: 10, p: 8 },
    { n: 'Onam', d: ['2026-08-26', '2027-09-12'], t: 'marigold', w: 'Happy Onam! Prosperity and joy to your home.', b: 1, a: 1, p: 5 },
    { n: 'Navratri', d: ['2026-10-11', '2027-09-30'], t: 'navratri', w: 'Happy Navratri! Nine nights of colour — keep the daily hour of study too.', b: 1, a: 8, p: 6 },
    { n: 'Gandhi Jayanti', d: ['10-02'], t: 'tricolour', w: 'Happy Gandhi Jayanti! Be the change.', b: 0, a: 0, p: 7 },
    { n: 'Dussehra', d: ['2026-10-20', '2027-10-09'], t: 'marigold', w: 'Happy Dussehra! Good preparation wins over every doubt.', b: 1, a: 1, p: 9 },
    { n: 'Karva Chauth', d: ['2026-10-29', '2027-10-18'], t: 'lamps', w: 'Happy Karva Chauth!', b: 0, a: 0, p: 2 },
    { n: 'Diwali', d: ['2026-11-08', '2027-10-29'], t: 'diwali', w: 'Happy Diwali! May this festival of lights brighten your home and your year ahead.', b: 2, a: 2, p: 10 },
    { n: 'Chhath Puja', d: ['2026-11-15', '2027-11-04'], t: 'sun', w: 'Happy Chhath Puja! Gratitude to the sun, and to every steady effort.', b: 1, a: 1, p: 5 },
    { n: "Children's Day", d: ['11-14'], t: 'banner', w: "Happy Children's Day! Keep the curiosity alive.", b: 0, a: 0, p: 6 },
    { n: 'Guru Nanak Jayanti', d: ['2026-11-24', '2027-11-14'], t: 'lamps', w: 'Happy Guru Nanak Jayanti! Learn with humility, share with joy.', b: 1, a: 1, p: 7 },
    { n: 'Christmas', d: ['12-25'], t: 'xmas', w: 'Merry Christmas! Warm wishes and a bright year ahead.', b: 3, a: 2, p: 8 }
  ];

  function day(s, y) { var p = s.split('-'); return p.length === 3 ? new Date(+p[0], +p[1] - 1, +p[2]) : new Date(y, +p[0] - 1, +p[1]); }
  var now = new Date();
  if (q.fdate && /^\d{4}-\d{2}-\d{2}$/.test(q.fdate)) now = day(q.fdate);
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()), on = null, bestKey = -1;
  CAL.forEach(function (f) {
    var years = [today.getFullYear() - 1, today.getFullYear(), today.getFullYear() + 1];
    f.d.forEach(function (ds) {
      var fixed = ds.length === 5;
      /* a year that has its own exact date does not also use the MM-DD fallback */
      if (fixed && f.d.some(function (o) { return o.length === 10 && +o.slice(0, 4) === today.getFullYear(); })) return;
      years.forEach(function (y) {
        var d = day(ds, y), diff = Math.round((today - d) / 864e5);
        if (diff < -f.b || diff > f.a) return;
        var key = (diff === 0 ? 1000 : 500 - Math.abs(diff) * 10) + f.p;   /* on the day beats near the day; then priority */
        if (key > bestKey) { bestKey = key; on = f; }
      });
    });
  });
  if (q.festival) { on = null; CAL.forEach(function (f) { if (!on && (f.t === q.festival || f.n.toLowerCase().replace(/[^a-z]/g, '') === q.festival.toLowerCase().replace(/[^a-z]/g, ''))) on = f; }); }
  if (!on) return;
  var theme = on.t;
  H.setAttribute('data-festival', theme);

  /* ---------- colours per theme: a (deep), b (bright), l (light band), i (band ink) ---------- */
  var COL = {
    diwali:   { a: '#7a2e0e', b: '#ff9f1c', l: 'linear-gradient(90deg,#fff1d6,#ffe3b3 50%,#fff1d6)', i: '#5a2306' },
    holi:     { a: '#6a1b9a', b: '#ff4081', l: 'linear-gradient(90deg,#ffe0f0,#e3f6ff 35%,#fff6c8 70%,#e6ffe9)', i: '#4a1070' },
    tricolour:{ a: '#1b3a7a', b: '#ff9933', l: 'linear-gradient(90deg,#ffe4c4,#ffffff 50%,#d6f5d6)', i: '#1b3a7a' },
    kites:    { a: '#0b5f8a', b: '#ff6f3c', l: 'linear-gradient(90deg,#dff4ff,#fff3dc)', i: '#0b4f73' },
    eid:      { a: '#0f5e4a', b: '#f2c14e', l: 'linear-gradient(90deg,#e3f7ef,#fff7dc)', i: '#0a4a3a' },
    marigold: { a: '#8a3b12', b: '#ff9f1c', l: 'linear-gradient(90deg,#fff0d2,#ffe0b0)', i: '#6a2a08' },
    ganesh:   { a: '#8a3b12', b: '#ff9f1c', l: 'linear-gradient(90deg,#ffe9c8,#ffd9a8)', i: '#6a2a08' },
    navratri: { a: '#7a1d5a', b: '#ff5e9a', l: 'linear-gradient(90deg,#ffe3f0,#fff2c8 50%,#e3f0ff)', i: '#5a1040' },
    lamps:    { a: '#6a4a0a', b: '#f2b63a', l: 'linear-gradient(90deg,#fff5dc,#ffe9b8)', i: '#4a3206' },
    rakhi:    { a: '#8a1f4b', b: '#ff6f9f', l: 'linear-gradient(90deg,#ffe3ee,#fff0c8)', i: '#6a1538' },
    krishna:  { a: '#1b3a7a', b: '#2fb3a0', l: 'linear-gradient(90deg,#e3f0ff,#dff7f2)', i: '#163068' },
    xmas:     { a: '#0f5e2e', b: '#d7263d', l: 'linear-gradient(90deg,#e6f7ea,#ffe3e6)', i: '#0a4a24' },
    sparkle:  { a: '#3b2a7a', b: '#ffd166', l: 'linear-gradient(90deg,#efeaff,#fff3cc)', i: '#2a1c5a' },
    banner:   { a: '#1b5fa8', b: '#ff7a59', l: 'linear-gradient(90deg,#e3efff,#ffe9e0)', i: '#163f7a' },
    sun:      { a: '#8a3b12', b: '#ffb347', l: 'linear-gradient(90deg,#ffe9c8,#ffd7a8)', i: '#6a2a08' }
  };
  var C = COL[theme] || COL.marigold;

  /* ---------- the pieces, drawn as SVG ---------- */
  var SVG = {
    diya: '<svg viewBox="0 0 64 64"><path class="fx-fl" d="M32 4c6 8 10 15 10 21 0 6-4 11-10 11s-10-5-10-11c0-6 4-13 10-21z" fill="#ffb300"/><path class="fx-fl" d="M32 14c3 5 5 9 5 12 0 4-2 7-5 7s-5-3-5-7c0-3 2-7 5-12z" fill="#fff3b0"/><path d="M6 40h52c0 10-11 18-26 18S6 50 6 40z" fill="#9c3f1c"/><path d="M6 40h52c-3 3-9 6-26 6S9 43 6 40z" fill="#d9712f"/><ellipse cx="32" cy="40" rx="26" ry="4.5" fill="#f3b36b"/></svg>',
    spark: '<svg viewBox="0 0 24 24"><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="#ffd166"/></svg>',
    blob: '<svg viewBox="0 0 64 64"><path d="M32 4c10 0 18 6 24 14s6 20-2 28-20 12-30 8S4 40 4 28 18 4 32 4z" fill="currentColor" opacity=".8"/></svg>',
    kite: '<svg viewBox="0 0 64 96"><path d="M32 2L62 32 32 62 2 32z" fill="currentColor"/><path d="M32 2v60M2 32h60" stroke="#fff" stroke-opacity=".55" stroke-width="2"/><path d="M32 62q-10 8-2 16t-4 16" stroke="#555" fill="none" stroke-width="1.6"/><path d="M26 76l6-4 6 4-6 4z" fill="currentColor" opacity=".8"/></svg>',
    marigold: '<svg viewBox="0 0 64 64"><g fill="#ff9f1c"><circle cx="32" cy="10" r="9"/><circle cx="48" cy="16" r="9"/><circle cx="54" cy="32" r="9"/><circle cx="48" cy="48" r="9"/><circle cx="32" cy="54" r="9"/><circle cx="16" cy="48" r="9"/><circle cx="10" cy="32" r="9"/><circle cx="16" cy="16" r="9"/></g><circle cx="32" cy="32" r="12" fill="#ffd166"/><circle cx="32" cy="32" r="5" fill="#d9541e"/></svg>',
    petal: '<svg viewBox="0 0 32 48"><path d="M16 2c10 10 14 22 12 32s-10 14-12 14-10-4-12-14S6 12 16 2z" fill="currentColor"/></svg>',
    leaf: '<svg viewBox="0 0 32 48"><path d="M16 2c12 8 16 22 10 36-3 6-7 8-10 8s-7-2-10-8C0 24 4 10 16 2z" fill="#2e8b57"/><path d="M16 6v38" stroke="#1d6b40" stroke-width="2"/></svg>',
    moon: '<svg viewBox="0 0 64 64"><path d="M44 6a26 26 0 1 0 14 44A22 22 0 0 1 44 6z" fill="#ffd166"/></svg>',
    star: '<svg viewBox="0 0 64 64"><path d="M32 2l8 20 22 2-17 14 6 22-19-12-19 12 6-22L2 24l22-2z" fill="#ffd166"/></svg>',
    lantern: '<svg viewBox="0 0 48 84"><path d="M24 0v10" stroke="#f2c14e" stroke-width="3"/><rect x="10" y="10" width="28" height="8" rx="3" fill="#8a5a1a"/><path d="M8 18h32l4 36H4z" fill="currentColor"/><path d="M14 18l2 36M24 18v36M34 18l-2 36" stroke="#ffe29a" stroke-opacity=".8" stroke-width="2"/><rect x="10" y="54" width="28" height="8" rx="3" fill="#8a5a1a"/><path d="M24 62v16" stroke="#f2c14e" stroke-width="3"/><circle cx="24" cy="80" r="3" fill="#f2c14e"/></svg>',
    snow: '<svg viewBox="0 0 24 24"><path d="M12 1v22M1 12h22M4 4l16 16M20 4L4 20" stroke="#9fc6ff" stroke-width="2" stroke-linecap="round"/></svg>',
    rakhi: '<svg viewBox="0 0 64 64"><path d="M0 32h18M46 32h18" stroke="#c83870" stroke-width="7" stroke-linecap="round"/><circle cx="32" cy="32" r="17" fill="#c83870"/><circle cx="32" cy="32" r="11" fill="#ffd166"/><circle cx="32" cy="32" r="5" fill="#fff"/></svg>',
    lamp: '<svg viewBox="0 0 48 64"><path class="fx-fl" d="M24 2c4 6 7 11 7 15 0 4-3 7-7 7s-7-3-7-7c0-4 3-9 7-15z" fill="#ffb300"/><rect x="18" y="24" width="12" height="6" fill="#8a5a1a"/><path d="M12 30h24l-4 28H16z" fill="#e0a92e"/><rect x="8" y="58" width="32" height="5" rx="2" fill="#8a5a1a"/></svg>',
    balloon: '<svg viewBox="0 0 48 80"><ellipse cx="24" cy="26" rx="20" ry="25" fill="currentColor"/><path d="M20 50l4 6 4-6z" fill="currentColor"/><path d="M24 56q-6 10 0 22" stroke="#777" fill="none" stroke-width="1.5"/><ellipse cx="16" cy="18" rx="5" ry="9" fill="#fff" opacity=".35"/></svg>',
    chakra: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="none" stroke="#1b3a7a" stroke-width="3"/><circle cx="32" cy="32" r="5" fill="#1b3a7a"/><g stroke="#1b3a7a" stroke-width="2">' + (function () { var s = ''; for (var i = 0; i < 24; i++) { var a = i * 15 * Math.PI / 180; s += '<path d="M32 32L' + (32 + 27 * Math.cos(a)).toFixed(1) + ' ' + (32 + 27 * Math.sin(a)).toFixed(1) + '"/>'; } return s; })() + '</g></svg>',
    feather: '<svg viewBox="0 0 40 96"><path d="M20 0c10 20 14 44 8 70-3 12-8 20-8 26-0-6-5-14-8-26C6 44 10 20 20 0z" fill="#1e9f8a"/><path d="M20 10v80" stroke="#f2c14e" stroke-width="2"/><ellipse cx="20" cy="28" rx="7" ry="11" fill="#1b3a7a"/><ellipse cx="20" cy="28" rx="4" ry="7" fill="#2fb3a0"/><circle cx="20" cy="28" r="2.2" fill="#ffd166"/></svg>',
    dandiya: '<svg viewBox="0 0 64 64"><path d="M8 56L56 8" stroke="#d1356f" stroke-width="7" stroke-linecap="round"/><path d="M8 8l48 48" stroke="#ff9f1c" stroke-width="7" stroke-linecap="round"/><path d="M8 56L56 8M8 8l48 48" stroke="#fff" stroke-width="1.5" stroke-dasharray="4 6"/></svg>',
    sun: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="14" fill="#ffb347"/><g stroke="#ff9f1c" stroke-width="4" stroke-linecap="round">' + (function () { var s = ''; for (var i = 0; i < 12; i++) { var a = i * 30 * Math.PI / 180; s += '<path d="M' + (32 + 20 * Math.cos(a)).toFixed(1) + ' ' + (32 + 20 * Math.sin(a)).toFixed(1) + 'L' + (32 + 29 * Math.cos(a)).toFixed(1) + ' ' + (32 + 29 * Math.sin(a)).toFixed(1) + '"/>'; } return s; })() + '</g></svg>',
    modak: '<svg viewBox="0 0 64 64"><path d="M32 6c4 14 14 28 26 44H6C18 34 28 20 32 6z" fill="#f6d58e"/><path d="M32 6c2 14 8 28 14 44M32 6c-2 14-8 28-14 44M32 6v44" stroke="#e0a92e" stroke-width="1.5" fill="none"/><ellipse cx="32" cy="52" rx="26" ry="5" fill="#d9712f"/></svg>',
    bell: '<svg viewBox="0 0 48 64"><path d="M24 4c10 0 16 8 16 20v14l6 8H2l6-8V24C8 12 14 4 24 4z" fill="#ffd166"/><circle cx="24" cy="54" r="6" fill="#d7263d"/><path d="M24 0v6" stroke="#0f5e2e" stroke-width="3"/></svg>',
    light: '<svg viewBox="0 0 24 40"><rect x="9" y="0" width="6" height="8" rx="2" fill="#555"/><path d="M12 8c7 0 10 8 10 16s-4 16-10 16S2 32 2 24 5 8 12 8z" fill="currentColor"/></svg>'
  };
  function piece(k, col) { return '<i class="fx-p' + (col ? ' c' : '') + '"' + (col ? ' style="color:' + col + '"' : '') + '>' + SVG[k] + '</i>'; }

  /* what drifts in the sky, how it moves, how many */
  var SKY = {
    diwali:   { set: ['spark', 'spark', 'diya', 'marigold', 'petal'], move: 'rise', n: 16, col: ['#ffd166', '#ff9f1c', '#ff6f3c'] },
    holi:     { set: ['blob', 'blob', 'blob', 'spark'], move: 'drift', n: 14, col: ['#ff4081', '#7c4dff', '#00c853', '#ffd600', '#00b0ff', '#ff6d00'] },
    tricolour:{ set: ['petal', 'petal', 'petal', 'chakra'], move: 'fall', n: 16, col: ['#ff9933', '#ffffff', '#138808'] },
    kites:    { set: ['kite', 'kite', 'spark'], move: 'glide', n: 9, col: ['#ff6f3c', '#2f68cc', '#ffd166', '#d1356f', '#00a884'] },
    eid:      { set: ['star', 'spark', 'lantern', 'moon'], move: 'float', n: 12, col: ['#0f5e4a', '#f2c14e', '#2fb3a0'] },
    marigold: { set: ['marigold', 'petal', 'petal', 'leaf'], move: 'fall', n: 14, col: ['#ff9f1c', '#ffd166', '#ff6f3c'] },
    ganesh:   { set: ['marigold', 'modak', 'petal', 'leaf', 'spark'], move: 'fall', n: 14, col: ['#ff9f1c', '#ffd166', '#ff6f3c'] },
    navratri: { set: ['dandiya', 'petal', 'spark', 'marigold'], move: 'drift', n: 14, col: ['#ff5e9a', '#ffd166', '#7c4dff', '#00a884', '#ff6f3c'] },
    lamps:    { set: ['lamp', 'spark', 'spark', 'petal'], move: 'float', n: 10, col: ['#f2b63a', '#ffd166', '#ff9f1c'] },
    rakhi:    { set: ['rakhi', 'spark', 'petal'], move: 'float', n: 10, col: ['#c83870', '#ffd166', '#ff6f9f'] },
    krishna:  { set: ['feather', 'spark', 'petal'], move: 'glide', n: 10, col: ['#1e9f8a', '#ffd166', '#2f68cc'] },
    xmas:     { set: ['snow', 'snow', 'snow', 'star', 'bell'], move: 'fall', n: 18, col: ['#9fc6ff', '#ffffff'] },
    sparkle:  { set: ['spark', 'spark', 'star', 'balloon'], move: 'rise', n: 16, col: ['#ffd166', '#7c4dff', '#ff4081', '#00b0ff'] },
    banner:   { set: ['balloon', 'spark', 'petal'], move: 'rise', n: 12, col: ['#ff7a59', '#2f68cc', '#ffd166', '#00a884', '#d1356f'] },
    sun:      { set: ['sun', 'spark', 'petal', 'marigold'], move: 'float', n: 10, col: ['#ffb347', '#ff9f1c', '#ffd166'] }
  };
  var S = SKY[theme] || SKY.marigold;

  /* ---------- CSS ---------- */
  var css = '' +
  '#fx-sky{position:fixed;inset:0;z-index:55;pointer-events:none;overflow:hidden;contain:strict}' +
  '#fx-sky .fx-p{position:absolute;display:block;width:var(--s);height:var(--s);left:var(--x);top:-12vh;opacity:0;will-change:transform,opacity;filter:drop-shadow(0 2px 4px rgba(0,0,0,.12))}' +
  '#fx-sky .fx-p svg{width:100%;height:100%;display:block}' +
  '#fx-sky .fx-p.c svg path,#fx-sky .fx-p.c svg ellipse{fill:currentColor}' +
  '#fx-sky .fx-p.c svg [stroke]{stroke:currentColor}' +
  '#fx-sky .fx-p.c svg .keep{fill:revert}' +
  'html[data-festival=holi] #fx-sky .fx-p{filter:blur(1.5px);opacity:.7;mix-blend-mode:multiply}' +
  /* movements */
  '@keyframes fx-fall{0%{transform:translate3d(0,-12vh,0) rotate(0);opacity:0}8%{opacity:.95}92%{opacity:.9}100%{transform:translate3d(var(--dx),108vh,0) rotate(var(--r));opacity:0}}' +
  '@keyframes fx-rise{0%{transform:translate3d(0,108vh,0) scale(.6);opacity:0}10%{opacity:.95}90%{opacity:.8}100%{transform:translate3d(var(--dx),-12vh,0) scale(1.1);opacity:0}}' +
  '@keyframes fx-drift{0%{transform:translate3d(-10vw,var(--y),0) rotate(0);opacity:0}10%{opacity:.85}90%{opacity:.75}100%{transform:translate3d(110vw,calc(var(--y) + var(--dy)),0) rotate(var(--r));opacity:0}}' +
  '@keyframes fx-glide{0%{transform:translate3d(-14vw,104vh,0) rotate(-8deg);opacity:0}10%{opacity:.95}90%{opacity:.9}100%{transform:translate3d(112vw,-12vh,0) rotate(10deg);opacity:0}}' +
  '@keyframes fx-float{0%{transform:translate3d(0,var(--y),0) scale(.9);opacity:0}15%{opacity:.9}50%{transform:translate3d(var(--dx),calc(var(--y) - 6vh),0) scale(1.05)}85%{opacity:.85}100%{transform:translate3d(calc(var(--dx) * 2),var(--y),0) scale(.95);opacity:0}}' +
  '#fx-sky[data-m=fall] .fx-p{animation:fx-fall var(--d) linear var(--w) infinite}' +
  '#fx-sky[data-m=rise] .fx-p{animation:fx-rise var(--d) ease-in var(--w) infinite}' +
  '#fx-sky[data-m=drift] .fx-p{top:0;left:0;animation:fx-drift var(--d) linear var(--w) infinite}' +
  '#fx-sky[data-m=glide] .fx-p{top:0;left:0;animation:fx-glide var(--d) ease-in-out var(--w) infinite}' +
  '#fx-sky[data-m=float] .fx-p{top:0;left:var(--x);animation:fx-float var(--d) ease-in-out var(--w) infinite}' +
  '@keyframes fx-flame{0%,100%{transform:scaleY(1) translateY(0)}50%{transform:scaleY(1.12) translateY(-1px)}}' +
  '.fx-fl{transform-box:fill-box;transform-origin:50% 100%;animation:fx-flame 1.2s ease-in-out infinite}' +
  /* garland under the header */
  '#fx-top{position:relative;z-index:2;height:30px;overflow:hidden;pointer-events:none;background:transparent}' +
  '#fx-top .fx-row{position:absolute;left:-20px;right:-20px;top:-6px;display:flex;justify-content:space-around;align-items:flex-start}' +
  '#fx-top .fx-row i{display:block;width:26px;height:36px;flex:none;transform-origin:50% 0;animation:fx-sway 3.4s ease-in-out infinite;animation-delay:var(--w)}' +
  '#fx-top .fx-row i svg{width:100%;height:100%;display:block}' +
  '#fx-top .fx-string{position:absolute;left:0;right:0;top:0;height:14px;border-bottom:2px solid ' + C.a + ';opacity:.35;border-radius:0 0 50% 50%/0 0 100% 100%}' +
  '@keyframes fx-sway{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}' +
  '#fx-top.ribbon{height:7px;background:linear-gradient(90deg,#ff9933 0 33.3%,#fff 33.3% 66.6%,#138808 66.6%);box-shadow:0 1px 0 rgba(0,0,0,.08)}' +
  '#fx-top.lights .fx-row i{width:14px;height:24px;animation:fx-blink 1.6s ease-in-out infinite;animation-delay:var(--w)}' +
  '@keyframes fx-blink{0%,100%{opacity:1;filter:drop-shadow(0 0 4px currentColor)}50%{opacity:.45;filter:none}}' +
  /* the wish band */
  '#fx-band{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;gap:12px;padding:9px 44px 9px 16px;background:' + C.l + ';color:' + C.i + ';font:600 15px/1.35 "Nunito",system-ui,sans-serif;text-align:center;overflow:hidden;border-bottom:1px solid rgba(0,0,0,.06)}' +
  '#fx-band b{font:700 17px/1.2 "Baloo 2","Nunito",system-ui,sans-serif;letter-spacing:.2px}' +
  '#fx-band .fx-ic{display:inline-block;width:26px;height:26px;flex:none;vertical-align:middle}' +
  '#fx-band .fx-ic svg{width:100%;height:100%;display:block}' +
  '#fx-band small{display:block;font-weight:600;opacity:.8;font-size:12.5px;margin-top:1px}' +
  '#fx-band::after{content:"";position:absolute;top:0;bottom:0;width:40%;left:-45%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.7),transparent);animation:fx-shine 5.5s ease-in-out infinite}' +
  '@keyframes fx-shine{0%,60%{left:-45%}100%{left:110%}}' +
  '#fx-band button{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:28px;height:28px;border:0;border-radius:50%;background:rgba(0,0,0,.08);color:inherit;font:700 16px/28px system-ui;cursor:pointer;padding:0}' +
  '#fx-band button:hover{background:rgba(0,0,0,.16)}' +
  '@media(max-width:719px){#fx-band{font-size:13.5px;padding:8px 40px 8px 12px;gap:8px}#fx-band b{font-size:15px}#fx-band small{display:none}}' +
  /* Diwali: diyas along the bottom, fireworks */
  '#fx-ground{position:fixed;left:0;right:0;bottom:var(--fx-bar,0px);height:42px;z-index:54;pointer-events:none;display:flex;justify-content:space-around;align-items:flex-end;padding:0 4vw 0;opacity:.95}' +
  '#fx-ground i{display:block;width:36px;height:36px;filter:drop-shadow(0 0 10px rgba(255,179,0,.55))}' +
  '#fx-ground i svg{width:100%;height:100%;display:block}' +
  '#fx-ground i .fx-fl{animation-delay:var(--w)}' +
  '@media(max-width:719px){#fx-ground{height:30px}#fx-ground i{width:24px;height:24px}}' +
  '#fx-fw{position:fixed;inset:0;z-index:55;pointer-events:none;overflow:hidden}' +
  '#fx-fw .b{position:absolute;left:var(--x);top:var(--y);width:0;height:0}' +
  '#fx-fw .b s{position:absolute;left:-4px;top:-4px;width:9px;height:9px;border-radius:50%;background:var(--c);box-shadow:0 0 12px 3px var(--c);transform:rotate(var(--a)) translateY(0);opacity:0;animation:fx-burst 3.2s cubic-bezier(.15,.7,.3,1) var(--w) infinite}' +
  '#fx-fw .b::after{content:"";position:absolute;left:-6px;top:-6px;width:12px;height:12px;border-radius:50%;background:#fff;box-shadow:0 0 18px 6px rgba(255,214,102,.9);opacity:0;animation:fx-core 3.2s ease-out var(--w) infinite}' +
  '@keyframes fx-core{0%{opacity:0;transform:scale(.3)}6%{opacity:1;transform:scale(1.4)}30%{opacity:0;transform:scale(.4)}100%{opacity:0}}' +
  '@keyframes fx-burst{0%{transform:rotate(var(--a)) translateY(0) scale(.6);opacity:0}6%{opacity:1}45%{opacity:.95}100%{transform:rotate(var(--a)) translateY(calc(var(--r) * -1)) scale(.15);opacity:0}}' +
  '@media(max-width:719px){#fx-fw .b s{width:4px;height:4px}}' +
  /* reduced motion: the band and the garland only, nothing moves */
  '@media(prefers-reduced-motion:reduce){#fx-sky,#fx-fw,#fx-ground{display:none!important}#fx-band::after,#fx-top .fx-row i,.fx-fl{animation:none!important}}' +
  '@media print{#fx-sky,#fx-fw,#fx-ground,#fx-top,#fx-band{display:none!important}}';
  var st = D.createElement('style'); st.id = 'fx-css'; st.textContent = css; D.head.appendChild(st);

  /* ---------- build ---------- */
  var hd = D.getElementById('hd') || D.querySelector('header');
  var frag = D.createDocumentFragment();

  /* garland / ribbon / lights under the header */
  var top = D.createElement('div'); top.id = 'fx-top'; top.setAttribute('aria-hidden', 'true');
  var gar = { diwali: ['marigold', 'leaf', 'marigold', 'diya'], marigold: ['marigold', 'leaf'], ganesh: ['marigold', 'leaf', 'marigold', 'modak'], navratri: ['marigold', 'leaf', 'dandiya'],
              sun: ['marigold', 'leaf'], eid: ['star', 'moon', 'lantern'], xmas: ['light'], sparkle: ['light'], banner: ['balloon', 'spark'], rakhi: ['rakhi', 'marigold'], lamps: ['marigold', 'lamp'],
              krishna: ['feather', 'marigold'], kites: ['kite', 'spark'], holi: ['blob', 'spark'] };
  if (theme === 'tricolour') { top.className = 'ribbon'; }
  else {
    var g = gar[theme] || ['marigold', 'leaf'], cnt = phone ? 12 : 26, row = '';
    if (theme === 'xmas' || theme === 'sparkle') top.className = 'lights';
    for (var i = 0; i < cnt; i++) {
      var k = g[i % g.length], col = S.col[i % S.col.length];
      row += '<i style="--w:' + (-(i * 0.37) % 3.4).toFixed(2) + 's' + (k === 'light' || k === 'blob' || k === 'kite' || k === 'balloon' ? ';color:' + col : '') + '">' + SVG[k] + '</i>';
    }
    top.innerHTML = '<div class="fx-string"></div><div class="fx-row">' + row + '</div>';
  }
  frag.appendChild(top);

  /* the wish band */
  var hide = false; try { hide = sessionStorage.getItem('fx-hide') === on.n; } catch (e) {}
  if (!hide) {
    var band = D.createElement('div'); band.id = 'fx-band'; band.setAttribute('role', 'note');
    var icon = { diwali: 'diya', holi: 'blob', tricolour: 'chakra', kites: 'kite', eid: 'moon', marigold: 'marigold', ganesh: 'modak', navratri: 'dandiya', lamps: 'lamp', rakhi: 'rakhi', krishna: 'feather', xmas: 'bell', sparkle: 'star', banner: 'balloon', sun: 'sun' }[theme] || 'marigold';
    var m = on.w.match(/^([^!]+!)\s*(.*)$/);
    band.innerHTML = '<span class="fx-ic" style="color:' + C.b + '">' + SVG[icon] + '</span><span><b>' + (m ? m[1] : on.w) + '</b>' + (m && m[2] ? ' ' + m[2] : '') +
      '<small>Warm wishes from Priyesh Sir &middot; IITians Home Tutors</small></span><button type="button" aria-label="Hide the festival wish">&times;</button>';
    band.querySelector('button').addEventListener('click', function () { band.remove(); try { sessionStorage.setItem('fx-hide', on.n); } catch (e) {} });
    frag.appendChild(band);
  }
  if (hd && hd.parentNode) hd.parentNode.insertBefore(frag, hd.nextSibling); else D.body.insertBefore(frag, D.body.firstChild);

  if (still) return;

  /* the sky */
  var sky = D.createElement('div'); sky.id = 'fx-sky'; sky.setAttribute('data-m', S.move); sky.setAttribute('aria-hidden', 'true');
  var n = phone ? Math.ceil(S.n * 0.55) : S.n, html = '';
  function rnd(a, b) { return a + Math.random() * (b - a); }
  for (var j = 0; j < n; j++) {
    var kind = S.set[j % S.set.length], c = S.col[j % S.col.length], coloured = /blob|petal|kite|balloon|light/.test(kind);
    var size = kind === 'spark' || kind === 'snow' ? rnd(10, 18) : kind === 'kite' ? rnd(44, 70) : kind === 'feather' ? rnd(40, 64) : kind === 'blob' ? rnd(34, 90) : rnd(22, 40);
    if (phone) size *= 0.8;
    var dur = S.move === 'glide' ? rnd(16, 26) : S.move === 'drift' ? rnd(18, 30) : rnd(11, 22);
    html += '<i class="fx-p' + (coloured ? ' c' : '') + '" style="--s:' + size.toFixed(0) + 'px;--x:' + rnd(2, 96).toFixed(1) + 'vw;--y:' + rnd(8, 80).toFixed(1) + 'vh;--dx:' + rnd(-14, 14).toFixed(1) + 'vw;--dy:' + rnd(-12, 12).toFixed(1) + 'vh;--r:' + rnd(-240, 240).toFixed(0) + 'deg;--d:' + dur.toFixed(1) + 's;--w:' + (-rnd(0, dur)).toFixed(1) + 's' + (coloured ? ';color:' + c : '') + '">' + SVG[kind] + '</i>';
  }
  sky.innerHTML = html; D.body.appendChild(sky);

  /* Diwali: a row of diyas and soft fireworks */
  if (theme === 'diwali') {
    var gr = D.createElement('div'); gr.id = 'fx-ground'; gr.setAttribute('aria-hidden', 'true');
    /* keep the diyas above a fixed bar at the foot of the screen (the phone Call / WhatsApp bar) */
    var bar = 0; try { [].forEach.call(D.body.querySelectorAll('div,nav,aside,footer,section'), function (el) { if (bar) return; var cs = getComputedStyle(el); if (cs.position !== 'fixed' || cs.display === 'none') return; var r = el.getBoundingClientRect(); if (r.height > 0 && r.height < 140 && r.width > W.innerWidth * 0.6 && Math.abs(r.bottom - W.innerHeight) < 3) bar = r.height; }); } catch (e) {}
    if (bar) gr.style.setProperty('--fx-bar', bar + 'px');
    var dn = phone ? 5 : 11, gh = '';
    for (var a = 0; a < dn; a++) gh += '<i style="--w:' + (-(a * 0.23) % 1.2).toFixed(2) + 's">' + SVG.diya + '</i>';
    gr.innerHTML = gh; D.body.appendChild(gr);
    var fw = D.createElement('div'); fw.id = 'fx-fw'; fw.setAttribute('aria-hidden', 'true');
    var bursts = phone ? 3 : 5, fh = '', cols = ['#ffd166', '#ff9f1c', '#ff6f9f', '#7c4dff', '#2fb3a0'];
    for (var b = 0; b < bursts; b++) {
      var sp = '', pn = phone ? 12 : 18, r = (phone ? rnd(50, 80) : rnd(90, 150)).toFixed(0);
      for (var p = 0; p < pn; p++) sp += '<s style="--a:' + (p * 360 / pn).toFixed(0) + 'deg;--r:' + r + 'px;--c:' + cols[(b + p) % cols.length] + ';--w:' + (b * 0.9 + 0.3).toFixed(1) + 's"></s>';
      fh += '<span class="b" style="--x:' + rnd(10, 90).toFixed(0) + 'vw;--y:' + rnd(14, 45).toFixed(0) + 'vh;--w:' + (b * 0.9 + 0.3).toFixed(1) + 's">' + sp + '</span>';
    }
    fw.innerHTML = fh; D.body.appendChild(fw);
  }
})();
