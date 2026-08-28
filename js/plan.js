// ===== План масштабирования FesAuto — аккордеон =====
(() => {

  const el = id => document.getElementById(id);
  const SAVE_KEY = "evo_plan_done";

  // ---------- Данные плана ----------
  const PLAN = [
    {
      id: "site",
      num: "01",
      title: "Доработка сайта fesauto.ru",
      desc: "Каталог, карточки и главная — чтобы лиды конвертировались в заявки",
      items: [
        {
          t: "Чистка и актуализация свойств автомобиля",
          d: "Карточки должны отвечать на все вопросы клиента: год, пробег, комплектация, ДВС/КПП, опции, город.",
          steps: [
            "Аудит карточек: найти товары с битыми/пустыми свойствами",
            "Внедрить маппинг полей из источника (АвтоХаб/выгрузка)",
            "Валидация при импорте: без критичных свойств товар не публикуется",
            "Регулярная авто-проверка + ручная ревизия карточек салона"
          ],
          kpi: "100% карточек с заполненными обязательными свойствами · рост конверсии карточки в заявку"
        },
        {
          t: "Фильтры каталога + хлебные крошки",
          d: "Упростить путь клиента от каталога до карточки.",
          steps: [
            "Фильтры по критичным свойствам: цена, год, пробег, марка/модель, статус (в наличии / в пути / под заказ)",
            "Сохранение выбранных фильтров в URL",
            "Хлебные крошки на страницах каталога и карточек"
          ],
          kpi: "Снижение отказов · рост глубины просмотра каталога"
        },
        {
          t: "Единый адаптивный hero-баннер",
          d: "Один управляемый баннер вместо разрозненных блоков.",
          steps: [
            "Единый баннер в блоке hero для всех страниц",
            "Адаптивность под мобильные (70–80% трафика — с телефона)",
            "Управление текстом, картинкой и CTA из админки без правок кода"
          ],
          kpi: "Рост переходов по CTA с главной"
        },
        {
          t: "Товарные блоки на главной по рубрикам",
          d: "Автоподборки, создаваемые автоматически из свойств товара.",
          steps: [
            "Блоки: «Хит продаж», «Лучшее предложение», «Авто в пути», «Авто под заказ»",
            "Настраиваемые правила отбора (продажи / цена ниже рынка / статус поставки)",
            "Автообновление без ручного редактирования"
          ],
          kpi: "Рост заявок с главной страницы"
        },
        {
          t: "Карточка: описание первым табом, без карты",
          d: "Описание — главное в карточке, карту убрать, прокрутку блока убрать.",
          steps: [
            "Убрать карту из вкладки «Описание»",
            "Сделать «Описание» первой вкладкой",
            "Убрать вертикальную прокрутку внутри блока описания"
          ],
          kpi: "Больше времени на карточке · рост запросов по характеристикам"
        },
        {
          t: "Галерея — 1 фото единовременно",
          d: "Сейчас в галерее 2 фото одновременно, нужен показ по одному.",
          steps: [
            "Переключение по одному изображению со стрелками/свайпом",
            "Превью-миниатюры для быстрого перехода",
            "Проверить скорость загрузки изображений"
          ],
          kpi: "Ускорение просмотра фото · рост конверсии в заявку"
        },
        {
          t: "КП: настраиваемый НДС + «Скачать КП в PDF»",
          d: "Сейчас выгрузка КП через иконку принтера, процент НДС задан жёстко.",
          steps: [
            "Настраиваемая ставка НДС (0 / 10 / 20%) для коммерческого предложения",
            "Заменить иконку принтера на кнопку «Скачать КП в PDF»",
            "Проверить корректность расчёта и формата PDF"
          ],
          kpi: "Рост запросов КП · меньше вопросов «где КП?»"
        }
      ]
    },
    {
      id: "geo",
      num: "02",
      title: "Работа с геосервисами",
      desc: "Яндекс Бизнес + 2GIS: контент, акции и отзывы",
      items: [
        {
          t: "Вертикальные посты (истории) в Яндекс Бизнес",
          d: "Регулярный визуальный контент в карточках на картах.",
          steps: [
            "Контент-план на месяц: фото/видео авто в наличии, обзоры, новинки",
            "Постинг 2–4 раза в месяц на карточку",
            "Анализ охватов и переходов из историй"
          ],
          kpi: "Охват историй · переходы в карточку и на сайт"
        },
        {
          t: "Спецпредложения в Яндекс Бизнес (акции и офферы)",
          d: "Акции должны быть видны на картах и совпадать с сайтом.",
          steps: [
            "Публикация акций: трейд-ин, выкуп, скидки на ТО, сезонные офферы тюнинга",
            "Синхронизация офферов с сайтом и рекламой",
            "Обновление после окончания сроков"
          ],
          kpi: "Рост заявок с карт · соответствие офферов на всех площадках"
        },
        {
          t: "Обработка отзывов — Яндекс Бизнес и 2GIS",
          d: "Отвечать на всё и в срок, негатив переводить в диалог.",
          steps: [
            "SLA: ответ ≤ 24 ч, негатив — связь в тот же день",
            "Уведомления о новых отзывах через сервис «Слухи» (см. блок 03)",
            "Назначить ответственного по карточкам"
          ],
          kpi: "100% отзывов с ответом · доля негатива → нейтрал/позитив"
        }
      ]
    },
    {
      id: "serm",
      num: "03",
      title: "Работа с SERM",
      desc: "Репутация в поиске и на картах: собираем, отвечаем, показываем",
      items: [
        {
          t: "Сбор и обработка отзывов через сервис «Слухи»",
          d: "Единый канал для отзывов со всех площадок.",
          steps: [
            "Подключить площадки: Яндекс, 2GIS, Авито, Google, flamp и другие",
            "Автоматические уведомления о новых отзывах",
            "Распределение по ответственным и контроль сроков"
          ],
          kpi: "Ни один отзыв не остался без ответа"
        },
        {
          t: "Скрипты работы с возражениями в отзывах",
          d: "Шаблоны ответов на типовые ситуации для быстрой и корректной реакции.",
          steps: [
            "Библиотека скриптов: цена/торг, срочность ремонта, качество обслуживания, непоставка в срок, сервис после покупки",
            "Формула ответа: признать проблему → предложить решение → перевести в диалог/offline",
            "Обучение сотрудников работе по скриптам"
          ],
          kpi: "Скорость реакции на негатив · конверсия негатива в обращение"
        },
        {
          t: "Социальное доказательство — виджеты SmartWidget",
          d: "Отзывы с фильтрами на сайты fesauto.ru и protuning-company.ru.",
          steps: [
            "Установить виджет SmartWidget на fesauto.ru и protuning-company.ru",
            "Фильтры: свежие положительные отзывы (давность ≤ 30–60 дней, рейтинг ≥ 4)",
            "Отдельные страницы на сайтах под виджет с отзывами (для ссылок из рекламы)"
          ],
          kpi: "Рост доверия к сайтам · использование отзывов в креативах"
        }
      ]
    },
    {
      id: "class",
      num: "04",
      title: "Работа с классифайдами",
      desc: "Единая выгрузка через АвтоХаб + оптимизация бюджета Авито",
      items: [
        {
          t: "Выгрузка товаров через maxposter.ru (АвтоХаб)",
          d: "PEM-агрегатор как единая точка выгрузки объявлений.",
          steps: [
            "Авито, Дром, Авто.Ру — выгрузка объявлений из АвтоХаба",
            "fesauto.ru — разработать коннектор приёма товаров из АвтоХаба",
            "Тестовая выгрузка → сверка полей и фото → автопилот ежедневной синхронизации",
            "Контроль дублей и ошибок выгрузки"
          ],
          kpi: "100% актуальность объявлений и статусов на всех площадках"
        },
        {
          t: "Оптимизация бюджета Авито",
          d: "По данным аудита: Авито 330 ₽/лид против Дром 855 ₽/лид.",
          steps: [
            "Перераспределить бюджет с Дром и убыточных аккаунтов в эффективные (АТ Р263, АСП Р263)",
            "Настроить приоритеты объявлений и расписание показов по CPL/CPA",
            "Проанализировать ставки, суточные лимиты, расписание подъёмов",
            "Еженедельный контроль CPL/CPA по каждому аккаунту"
          ],
          kpi: "Целевой CPL ≤ 330 ₽ · рост лидов без роста бюджета"
        }
      ]
    }
  ];

  const TIMELINE = [
    { n: "01", title: "Квик-винсы (0–1 мес)", d: "КП в PDF + настраиваемый НДС, галерея 1 фото, описание первым табом, подключение «Слухи», выгрузка АвтоХаб → Авито.", tag: "Сайт + отзывы" },
    { n: "02", title: "Сайт (1–2 мес)", d: "Чистка свойств, фильтры каталога + хлебные крошки, единый hero-баннер, автоподборки на главной.", tag: "fesauto.ru" },
    { n: "03", title: "Репутация (постоянно)", d: "Контент-план Яндекс Бизнес, отзывы по SLA, скрипты возражений, виджеты SmartWidget + отдельные страницы.", tag: "SERM + карты" },
    { n: "04", title: "Автоматизация (2–3 мес)", d: "Коннектор fesauto.ru ↔ АвтоХаб, автопилот выгрузки, мониторинг статусов и ошибок.", tag: "Классифайды" },
    { n: "05", title: "Бюджет Авито", d: "Еженедельный пересмотр по CPL/CPA, квартальная оптимизация и перенос бюджетов из неэффективных каналов.", tag: "Экономика" }
  ];

  // ---------- Сохранение прогресса ----------
  let doneSet = new Set();
  try { doneSet = new Set(JSON.parse(localStorage.getItem(SAVE_KEY) || "[]")); } catch (e) {}

  function saveDone() {
    localStorage.setItem(SAVE_KEY, JSON.stringify([...doneSet]));
  }

  function totalCount() {
    return PLAN.reduce((s, group) => s + group.items.length, 0);
  }

  // ---------- Аккордеон ----------
  function renderAccordion() {
    const box = el("accordion");
    PLAN.forEach((group, gi) => {
      const acc = document.createElement("div");
      acc.className = "acc" + (gi === 0 ? " open" : "");
      acc.dataset.g = group.id;
      const doneCount = group.items.filter(it => doneSet.has(group.id + "|" + it.t)).length;

      const head = document.createElement("button");
      head.className = "acc-head";
      head.type = "button";
      head.innerHTML = `
        <span class="acc-num">${group.num}</span>
        <span class="acc-t"><h3>${group.title}</h3><p>${group.desc}</p></span>
        <span class="acc-count">${doneCount}/${group.items.length}</span>
        <span class="acc-arrow"></span>
      `;
      const body = document.createElement("div");
      body.className = "acc-body";
      const inner = document.createElement("div");
      inner.className = "acc-inner";

      group.items.forEach(it => {
        const key = group.id + "|" + it.t;
        const item = document.createElement("div");
        item.className = "acc-item";
        item.innerHTML = `
          <button class="check" data-key="${encodeURIComponent(key)}" aria-label="Выполнено"></button>
          <div class="acc-item-body">
            <h4>${it.t}</h4>
            <div class="acc-desc">${it.d}</div>
            <ul class="acc-steps">${it.steps.map(s => `<li>${s}</li>`).join("")}</ul>
            <span class="acc-kpi">KPI: ${it.kpi}</span>
          </div>
        `;
        inner.appendChild(item);
      });

      inner.appendChild(document.createElement("span")); // placeholder
      body.appendChild(inner);
      acc.appendChild(head);
      acc.appendChild(body);
      box.appendChild(acc);

      const updateCount = () => {
        const c = group.items.filter(x => doneSet.has(group.id + "|" + x.t)).length;
        head.querySelector(".acc-count").textContent = c + "/" + group.items.length;
      };

      head.addEventListener("click", () => {
        acc.classList.toggle("open");
        const b = acc.querySelector(".acc-body");
        b.style.maxHeight = acc.classList.contains("open") ? b.scrollHeight + "px" : "0px";
        acc.querySelector(".acc-count").textContent = group.items.filter(x => doneSet.has(group.id + "|" + x.t)).length + "/" + group.items.length;
      });

      inner.addEventListener("click", e => {
        const check = e.target.closest(".check");
        if (!check) return;
        const key = decodeURIComponent(check.dataset.key);
        if (doneSet.has(key)) doneSet.delete(key); else doneSet.add(key);
        check.classList.toggle("done", doneSet.has(key));
        updateCount();
        saveDone();
        updateStats();
      });
    });

    // применить сохранённое состояние
    document.querySelectorAll(".acc .check").forEach(chk => {
      const key = decodeURIComponent(chk.dataset.key);
      chk.classList.toggle("done", doneSet.has(key));
    });
  }

  // ---------- Статистика ----------
  function updateStats() {
    const box = el("planStats");
    if (!box) return;
    const total = totalCount();
    const done = doneSet.size;
    let html = `
      <div class="plan-stat"><b>${PLAN.length}</b><span>направления</span></div>
      <div class="plan-stat"><b>${total}</b><span>пунктов</span></div>
      <div class="plan-stat"><b>${done}</b><span>выполнено</span></div>
      <div class="plan-stat"><b>${Math.round(done / total * 100)}%</b><span>прогресс</span></div>
    `;
    box.innerHTML = html;
  }

  // ---------- Роадмап ----------
  function renderTimeline() {
    const box = el("timeline");
    if (!box) return;
    TIMELINE.forEach(t => {
      const div = document.createElement("div");
      div.className = "tl-item";
      div.dataset.n = t.n;
      div.innerHTML = `<h3>${t.title}</h3><p>${t.d}</p><span class="tl-tag">${t.tag}</span>`;
      box.appendChild(div);
    });
  }

  // ---------- Раскрытие и reveal ----------
  function openFirst() {
    const first = document.querySelector(".acc.open");
    if (first) {
      const b = first.querySelector(".acc-body");
      b.style.maxHeight = b.scrollHeight + "px";
    }
  }

  function initReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(x => obs.observe(x));
  }

  // ---------- Навигация ----------
  function initNav() {
    const nav = el("nav");
    window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 30));
    el("navBurger").addEventListener("click", () => el("navLinks").classList.toggle("open"));
    el("navLinks").querySelectorAll("a").forEach(a => a.addEventListener("click", () => el("navLinks").classList.remove("open")));
  }

  renderAccordion();
  renderTimeline();
  updateStats();
  openFirst();
  initReveal();
  initNav();

})();