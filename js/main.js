// ===== FesAuto EVO — данные аудита + рендер лендинга =====
(() => {

  const fmt = n => n.toLocaleString("ru-RU");

  // ---------- Данные ----------
  const HERO = [
    { label: "лидов в год", value: 33740, note: "Битрикс24, 12 мес" },
    { label: "продаж за год", value: 3357, note: "стадия «забрал машину»" },
    { label: "конверсия воронки", value: 24.3, decimals: 1, suffix: "%", note: "8205 лидов в работе" },
    { label: "лидов — мусор", value: 44.4, decimals: 1, suffix: "%", tone: "bad", note: "СПАМ + некачественные" }
  ];

  const SOURCES = [
    { name: "Авито", value: 9860 },
    { name: "Сайт", value: 2804 },
    { name: "Яндекс.Карты", value: 1905 },
    { name: "2ГИС", value: 1579 },
    { name: "Гугл.Карты", value: 1260 },
    { name: "Наружка", value: 1115 },
    { name: "Ватсап", value: 1094 },
    { name: "АвтоРу", value: 713 },
    { name: "Контекст", value: 642 },
    { name: "Дром", value: 481 }
  ];

  const DIRS = [
    { id: "new", num: "01", title: "FesAuto — Новые", desc: "Основной поток продаж. 77% всех лидов.", metric: 26138, metricLabel: "лидов / год", color: "#de0e14", href: "#new" },
    { id: "used", num: "02", title: "FesAuto — С пробегом", desc: "Модель АСП Р263. Бюджет 1,12 млн ₽/год.", metric: 1585, metricLabel: "лидов / год", color: "#ff3b40", href: "#used" },
    { id: "service", num: "03", title: "FesService — Сервис", desc: "Самый качественный канал: 21,2% в продажу.", metric: 1401, metricLabel: "лидов / год", color: "#f59e0b", href: "#service" },
    { id: "tuning", num: "04", title: "PRO-Tuning — Тюнинг", desc: "Топ-5 в 2ГИС, но 0,2% конверсии в продажу.", metric: 568, metricLabel: "лидов / год", color: "#3b82f6", href: "#tuning" }
  ];

  // Сегменты потока: продано / в работе / на будущее / мусор
  const SEGS = [
    { key: "done", label: "Продано", color: "#22c55e" },
    { key: "conv", label: "В работе (сконвертировано)", color: "#f59e0b" },
    { key: "fut", label: "На будущее", color: "#6b7280" },
    { key: "garbage", label: "Мусор (СПАМ + некачественные)", color: "#de0e14" }
  ];

  const BLOCKS = {
    new: {
      metrics: [
        { label: "Лидов в год", value: 26138 },
        { label: "Продаж", value: 2637, tone: "good" },
        { label: "Конверсия воронки", value: 25.3, decimals: 1, suffix: "%" },
        { label: "Мусор в потоке", value: 11020, tone: "bad" }
      ],
      segs: { done: 2637, conv: 3985, fut: 8496, garbage: 11020 },
      problems: [
        "<b>42% потока — мусор:</b> 11 020 лидов (СПАМ + некачественные) тонут в работе менеджеров.",
        "<b>Невидим в 2ГИС:</b> позиция 38,9 и лишь 14 947 показов (6% всех) у автосалона.",
        "<b>35,6% лидов без источника</b> («НеКлассифицирован» 12 011) — непонятно, откуда клиенты."
      ],
      plan: [
        { t: "Масштабировать Авито", d: "Больше объявлений АТ Р263 — 330 ₽/лид, дешевле рынка." },
        { t: "Перенести бюджет с Дром", d: "855 ₽/лид Дром против 330 ₽ на Авито — в Авито и АвтоРу." },
        { t: "Подключить АвтоРу", d: "Воронка 43,5% — лучший канал при почти нулевой цене. Платные поднятия." },
        { t: "Усилить SEO сайта", d: "2 804 лида бесплатно, воронка 31% — лендинги под импорт и формы." },
        { t: "Раскрутить карточку 2ГИС", d: "Позиция 38,9 → топ по образцу Pro-Tuning: показы уже растут 740 → 4 267/мес, потенциал ×10." },
        { t: "Настроить коллтрекинг", d: "Убрать «НеКлассифицирован» и понять реальные каналы входящих звонков." }
      ]
    },
    used: {
      metrics: [
        { label: "Лидов в год", value: 1585 },
        { label: "Сконвертировано", value: 324 },
        { label: "Бюджет в год", value: 1118135, prefix: "₽ " },
        { label: "Мусор в потоке", value: 1013, tone: "bad" }
      ],
      segs: { done: 0, conv: 324, fut: 248, garbage: 1013 },
      problems: [
        "<b>56,7% лидов некачественные</b> (899 из 1 585) — самая высокая доля по направлениям.",
        "<b>Продажи не фиксируются:</b> стадия «забрал» = 0, реальная конверсия неизвестна.",
        "<b>Дром дорого:</b> 1 769 ₽ за звонок против 560 ₽ на Авито АСП."
      ],
      plan: [
        { t: "Автоматизировать квалификацию", d: "Вопросы: марка, год, бюджет, город — уберут 56% мусора на входе." },
        { t: "Настроить воронку АСП в CRM", d: "Фиксировать продажи, чтобы видеть реальную конверсию." },
        { t: "Перенести бюджет с Дром на Авито АСП", d: "560 ₽/контакт — самый дешёвый контакт в портфеле." },
        { t: "Масштабировать объявления Авито АСП", d: "1 692 контакта при 560 ₽ — канал работает, нужен объём." }
      ]
    },
    service: {
      metrics: [
        { label: "Лидов в год", value: 1401 },
        { label: "Выполнено заявок", value: 297, tone: "good" },
        { label: "Конверсия в продажу", value: 21.2, decimals: 1, suffix: "%", tone: "good" },
        { label: "Показов в 2ГИС", value: 154619 }
      ],
      segs: { done: 297, conv: 22, fut: 616, garbage: 466 },
      problems: [
        "<b>Лидов мало:</b> 1 401 в год при потенциале 2ГИС (154 619 показов, позиция 7,3).",
        "<b>Сайт и запись онлайн недоиспользованы</b> — поток приходит, но не превращается в заявки.",
        "<b>Мобильный трафик 70–80%:</b> без клик-ту-колл и мессенджеров теряются звонки."
      ],
      plan: [
        { t: "Конвертировать топ 2ГИС в заявки", d: "Отзывы, фото, кнопки звонка — 154 619 показов должны стать обращениями." },
        { t: "Запись онлайн + клик-ту-колл", d: "Для мобильного трафика: один тап до записи." },
        { t: "Приём заявок в мессенджерах", d: "WhatsApp и чаты — быстрый ответ повышает конверсию." },
        { t: "SEO услуг сервиса", d: "Тематические страницы (диагностика, замена ГРМ) под запросы." }
      ]
    },
    tuning: {
      metrics: [
        { label: "Лидов в год", value: 568 },
        { label: "Продаж", value: 1, tone: "bad" },
        { label: "Конверсия в продажу", value: 0.2, decimals: 1, suffix: "%", tone: "bad" },
        { label: "Показов в 2ГИС", value: 76919 }
      ],
      segs: { done: 1, conv: 123, fut: 180, garbage: 264 },
      problems: [
        "<b>1 продажа из 568 лидов</b> — конверсия 0,2%, направление почти не продаёт.",
        "<b>Лиды есть, продаж нет:</b> топ-5 в 2ГИС (76 919 показов), поток не доходит до сделки.",
        "<b>Воронка 21,8%,</b> но процесс продаж тюнинга не выстроен."
      ],
      plan: [
        { t: "Разобрать процесс продаж PRO-Tuning", d: "Качество лидов и работа менеджеров — где теряется поток." },
        { t: "Настроить CRM-воронку тюнинга", d: "Скоринг лидов и стадии, чтобы видеть каждую потерю." },
        { t: "Конвертировать 2ГИС в заявки", d: "76 919 показов: лендинги под обвесы, полировку, химчистку, антикор." },
        { t: "Уточнить ЦА и цены", d: "Кто реально покупает тюнинг — под это выстроить предложение." }
      ]
    }
  };

  const TIMELINE = [
    { n: "01", title: "Чистка потока — убрать 44% мусора", d: "Авто-квалификация и скоринг лидов во всех направлениях. Менеджеры работают с реальными заявками.", tag: "Все направления" },
    { n: "02", title: "Перераспределение бюджета", d: "Авито + АвтоРу вместо Дром. Экономия ~1 млн ₽/год с ростом конверсии.", tag: "Новые + АСП" },
    { n: "03", title: "2ГИС для автосалона: 38,9 → топ", d: "Раскрутить карточку по образцу Pro-Tuning. Показы уже растут ×6 — потенциал ещё ×10.", tag: "Новые" },
    { n: "04", title: "Воронка АСП в CRM", d: "Фиксация продаж и квалификация — увидеть реальную конверсию и убрать 56% мусора.", tag: "АСП" },
    { n: "05", title: "Процесс продаж PRO-Tuning", d: "Из 0,2% конверсии в рабочие 20%+: скоринг, CRM, лендинги под услуги.", tag: "Тюнинг" }
  ];

  // ---------- Утилиты ----------
  const el = id => document.getElementById(id);
  const money = n => n >= 1e6 ? (n / 1e6).toLocaleString("ru-RU", { maximumFractionDigits: 2 }) + " млн ₽" : fmt(n) + " ₽";

  function animateCount(node, target, opts = {}) {
    const dur = opts.dur || 1400;
    const decimals = opts.decimals || 0;
    const prefix = opts.prefix || "";
    const suffix = opts.suffix || "";
    const start = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - start) / dur);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = target * ease;
      node.textContent = prefix + (decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString("ru-RU")) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else node.textContent = prefix + (decimals ? target.toFixed(decimals) : target.toLocaleString("ru-RU")) + suffix;
    }
    requestAnimationFrame(tick);
  }

  // ---------- Хиро KPI ----------
  function renderHero() {
    const grid = el("heroKpis");
    HERO.forEach((k, i) => {
      const c = document.createElement("div");
      c.className = "kpi";
      c.innerHTML = `<div class="kpi-value"></div><div class="kpi-label">${k.label} · ${k.note}</div>`;
      grid.appendChild(c);
      const v = c.querySelector(".kpi-value");
      if (k.tone === "bad") v.style.color = "#ff3b40";
      animateCount(v, k.value, { decimals: k.decimals, suffix: k.suffix || "" });
    });
  }

  // ---------- Карточки направлений ----------
  function renderDirs() {
    const grid = el("dirGrid");
    DIRS.forEach(d => {
      const a = document.createElement("a");
      a.className = "dir-card";
      a.href = d.href;
      a.style.setProperty("--dc", d.color);
      a.innerHTML = `
        <div class="num">${d.num} / ${d.id === "new" ? "новые" : d.id === "used" ? "с пробегом" : d.id === "service" ? "сервис" : "тюнинг"}</div>
        <h3>${d.title}</h3>
        <p>${d.desc}</p>
        <div class="dir-metric"><span>${d.metricLabel}</span><br>${fmt(d.metric)}</div>
      `;
      grid.appendChild(a);
    });
  }

  // ---------- Источники (бары) ----------
  function renderSources() {
    const box = el("sourceBars");
    const max = SOURCES[0].value;
    SOURCES.forEach((s, i) => {
      const row = document.createElement("div");
      row.className = "src-row";
      const op = Math.max(0.4, 1 - i * 0.06);
      row.innerHTML = `
        <div class="src-name">${s.name}</div>
        <div class="src-track"><div class="src-fill" style="background:linear-gradient(90deg,#a30006,#de0e14);opacity:${op}" data-w="${(s.value / max) * 100}"></div></div>
        <div class="src-val">${fmt(s.value)}</div>
      `;
      box.appendChild(row);
    });
    requestAnimationFrame(() => {
      box.querySelectorAll(".src-fill").forEach(b => b.style.width = b.dataset.w + "%");
    });
  }

  // ---------- Блок направления ----------
  function renderBlock(key) {
    const B = BLOCKS[key];
    const mBox = el("m-" + key);
    B.metrics.forEach(m => {
      const c = document.createElement("div");
      c.className = "metric";
      const toneCls = m.tone === "good" ? " good" : m.tone === "bad" ? " bad" : "";
      c.innerHTML = `<div class="m-val${toneCls}"></div><div class="m-label">${m.label}</div>`;
      mBox.appendChild(c);
      const v = c.querySelector(".m-val");
      const val = m.value;
      if (m.prefix === "₽ ") animateCount(v, val, { prefix: "₽ " });
      else animateCount(v, val, { decimals: m.decimals, suffix: m.suffix || "" });
    });

    // состав потока
    const total = Object.values(B.segs).reduce((s, n) => s + n, 0);
    const stack = el("stack-" + key);
    const legend = el("legend-" + key);
    let acc = 0;
    SEGS.forEach(seg => {
      const val = B.segs[seg.key];
      if (!val) return;
      const pct = (val / total) * 100;
      const segEl = document.createElement("div");
      segEl.className = "seg";
      segEl.style.background = seg.color;
      segEl.dataset.w = pct;
      segEl.innerHTML = val >= total * 0.12 ? `<span>${fmt(val)}</span>` : "";
      stack.appendChild(segEl);
      const li = document.createElement("li");
      li.innerHTML = `<span class="dot" style="background:${seg.color}"></span>${seg.label}<b>${fmt(val)} · ${pct.toFixed(0)}%</b>`;
      legend.appendChild(li);
      acc += val;
    });

    // проблемы
    const pBox = el("p-" + key);
    B.problems.forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = p;
      pBox.appendChild(li);
    });

    // план
    const planBox = el("plan-" + key);
    B.plan.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<b>${item.t}</b><span>${item.d}</span>`;
      planBox.appendChild(li);
    });

    requestAnimationFrame(() => {
      stack.querySelectorAll(".seg").forEach(s => s.style.width = s.dataset.w + "%");
    });
  }

  // ---------- Таймлайн ----------
  function renderTimeline() {
    const box = el("timeline");
    TIMELINE.forEach(t => {
      const div = document.createElement("div");
      div.className = "tl-item reveal";
      div.dataset.n = t.n;
      div.innerHTML = `<h3>${t.title}</h3><p>${t.d}</p><span class="tl-tag">${t.tag}</span>`;
      box.appendChild(div);
    });
  }

  // ---------- Scroll reveal ----------
  function initReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
  }

  // ---------- Навигация ----------
  function initNav() {
    const nav = el("nav");
    const links = el("navLinks");
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 30);
      let current = "";
      document.querySelectorAll("section[id], section.block[id]").forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      });
      links.querySelectorAll("a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
    });
    el("navBurger").addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", e => {
        const id = a.getAttribute("href");
        if (id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - 64;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      });
    });
  }

  // ---------- Запуск ----------
  renderHero();
  renderDirs();
  renderSources();
  ["new", "used", "service", "tuning"].forEach(renderBlock);
  renderTimeline();
  initReveal();
  initNav();

})();
