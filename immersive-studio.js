(() => {
  'use strict';
  const announcement = 'https://mk.lpr-reg.ru/14195-afisha-vyhodnogo-dnja-luganskij-respublikanskij-akademicheskij-teatr-kukol-priglashaet.html';
  const shows = [
    {date:'2026-10-03',day:'03',month:'ОКТЯБРЯ',title:'«Маугли»',time:'11:00 и 13:00',image:'1790238945_maugli1.jpg',description:'История о дружбе, смелости и верности по мотивам сказки о Маугли.'},
    {date:'2026-10-04',day:'04',month:'ОКТЯБРЯ',title:'«Незнайка и его друзья»',time:'11:00 и 13:00',image:'1790238952_photo_2025-09-12_13-43-06.jpg',description:'Приключения Незнайки и его друзей в необычной сказочной стране.'},
    {date:'2026-10-10',day:'10',month:'ОКТЯБРЯ',title:'«Моя усатая мама»',time:'11:00 и 13:00',image:'1790239018_nq2vvwivv0o.jpg',description:'Тёплая сказка о любви мамы к своему ребёнку.'},
    {date:'2026-10-11',day:'11',month:'ОКТЯБРЯ',title:'«Птицы»',time:'11:00 и 13:00',image:'1790238965_qngmnisljjs.jpg',description:'Сказка-притча о дружбе, природе и жизни нового леса.'}
  ];
  const ideas = [
    {symbol:'✳',place:'АЛЧЕВСК · ИСТОРИЧЕСКИЙ МУЗЕЙ',title:'«Город, который помнит»',format:'Спектакль-маршрут · 35–45 минут',description:'История одной воображаемой семьи проходит через разные эпохи жизни города.',role:'Зритель получает карточку героя и выбирает, какие следы прошлого исследовать.',plot:'В каждом зале актёр передаёт фрагмент семейной истории. У экспонатов участники сопоставляют голоса, фотографии и воспоминания, а в финале составляют общую карту памяти.',source:'https://mk.lpr-reg.ru/14169-v-alchevskom-muzee-posle-remonta-otkrylis-dva-obnovlennyh-jekspozicionnyh-zala.html'},
    {symbol:'❞',place:'СЛАВЯНОСЕРБСК · БИБЛИОТЕКА',title:'«Между строк»',format:'Литературный квест-спектакль · 30–40 минут',description:'Пропала последняя страница вымышленной книги; чтобы вернуть её, нужно услышать разные версии истории.',role:'Участник становится редактором: слушает героев и решает, какую концовку сохранить.',plot:'Маршрут проходит между книжными полками и читальными зонами. Подсказки спрятаны в текстах, звуках и предметах; общая концовка рождается из решений группы.',source:'https://mk.lpr-reg.ru/14168-v-slavjanoserbske-otkrylas-pervaja-modelnaja-biblioteka.html'},
    {symbol:'◈',place:'БЕЛОВОДСК · КРАЕВЕДЧЕСКИЙ МУЗЕЙ',title:'«Голоса края»',format:'Аудиоспектакль · 30–40 минут',description:'Вымышленный рассказчик собирает звуковой портрет места по музейным предметам.',role:'Зритель выбирает предмет и добавляет к истории свою ассоциацию или вопрос.',plot:'Свет и звук направляют группу от экспоната к экспонату. Финал — совместная звуковая открытка о том, каким зрители увидели край.',source:'https://mk.lpr-reg.ru/13217-v-belovodske-posle-kapitalnogo-remonta-torzhestvenno-otkrylsja-obnovlennyj-kraevedcheskij-muzej.html'},
    {symbol:'⌘',place:'АЛЧЕВСК · ИСТОРИЧЕСКИЙ МУЗЕЙ',title:'«Письмо из будущего»',format:'Семейный маршрут · 25–35 минут',description:'Группа получает письмо от воображаемого жителя будущего с просьбой сохранить важные истории города.',role:'Зрители выступают хранителями: выбирают предметы, которые объяснят будущим поколениям жизнь города.',plot:'В каждой точке маршрута открывается новый вопрос. Завершение — коллективное письмо в будущее, составленное из найденных смыслов.',source:'https://mk.lpr-reg.ru/14169-v-alchevskom-muzee-posle-remonta-otkrylis-dva-obnovlennyh-jekspozicionnyh-zala.html'},
    {symbol:'✦',place:'СЛАВЯНОСЕРБСК · БИБЛИОТЕКА',title:'«Книга выбирает тебя»',format:'Спектакль для семьи · 30 минут',description:'Герои разных вымышленных книг спорят, чья история должна быть рассказана сегодня.',role:'Каждый зритель берёт закладку с заданием и помогает героям найти общую сюжетную нить.',plot:'Чтение вслух, тихие аудиосцены и выбор пути объединяются в живой финал, который зависит от решений участников.',source:'https://mk.lpr-reg.ru/14168-v-slavjanoserbske-otkrylas-pervaja-modelnaja-biblioteka.html'},
    {symbol:'◎',place:'БЕЛОВОДСК · КРАЕВЕДЧЕСКИЙ МУЗЕЙ',title:'«Музей после звонка»',format:'Камерный спектакль · 35 минут',description:'Вымышленный музейный смотритель оставляет гостям цепочку вопросов о знакомых вещах.',role:'Зритель становится исследователем и раскрывает значение предмета через детали и версии других участников.',plot:'Вместо готовых ответов — диалоги с актёром, звук и проекции. Развязка показывает, как по-разному можно смотреть на один и тот же предмет.',source:'https://mk.lpr-reg.ru/13217-v-belovodske-posle-kapitalnogo-remonta-torzhestvenno-otkrylsja-obnovlennyj-kraevedcheskij-muzej.html'}
  ];
  const content = document.getElementById('playbill-content');
  const note = document.getElementById('playbill-note');
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const upcomingShows = () => shows.filter(show => show.date >= new Date().toLocaleDateString('sv-SE'));
  function render(tab) {
    document.querySelector('[data-tab="real"] span').textContent = String(upcomingShows().length).padStart(2, '0');
    document.querySelectorAll('[data-tab]').forEach(button => {const selected = button.dataset.tab === tab; button.classList.toggle('active', selected); button.setAttribute('aria-pressed', String(selected));});
    if (tab === 'real') {
      const upcoming = upcomingShows();
      content.innerHTML = upcoming.length ? `<div class="show-grid">${upcoming.map(show => `<article class="show-card"><div class="show-visual"><img src="https://mk.lpr-reg.ru/uploads/posts/2026-09/${escapeHTML(show.image)}" alt="" loading="lazy"><span class="show-date">${show.day}<small>${show.month}</small></span></div><div class="show-info"><span class="show-meta">ПОДТВЕРЖДЁННЫЙ АНОНС · ${show.time}</span><h3>${escapeHTML(show.title)}</h3><p>${escapeHTML(show.description)}</p><span class="show-location">◎ Луганский республиканский академический театр кукол · Луганск</span><a href="${announcement}" target="_blank" rel="noopener noreferrer">Анонс на сайте министерства ↗</a></div></article>`).join('')}</div>` : '<div class="empty-show">На ближайшие даты подтверждённых показов из этой публикации нет. Проверьте новую афишу на сайте театра или министерства.</div>';
      note.innerHTML = `Источник: <a href="${announcement}" target="_blank" rel="noopener noreferrer">афиша театра кукол на сайте Минкультуры ЛНР ↗</a>, опубликована 24.09.2026. Спектакли театра кукол не обозначены источником как иммерсивные. Перед посещением уточните репертуар и наличие билетов у театра.`;
    } else {
      content.innerHTML = `<div class="show-grid idea-grid">${ideas.map(idea => `<article class="show-card idea-card"><div class="show-visual idea-visual" aria-hidden="true">${idea.symbol}</div><div class="show-info"><span class="show-meta">КОНЦЕПЦИЯ · ДАТА НЕ НАЗНАЧЕНА</span><h3>${escapeHTML(idea.title)}</h3><p>${escapeHTML(idea.description)}</p><span class="idea-format">${escapeHTML(idea.format)}</span><details class="idea-details"><summary>Как это происходит</summary><p><strong>Роль зрителя.</strong> ${escapeHTML(idea.role)}</p><p><strong>Ход истории.</strong> ${escapeHTML(idea.plot)}</p></details><span class="show-location">◎ ${escapeHTML(idea.place)}</span><a href="${idea.source}" target="_blank" rel="noopener noreferrer">Об учреждении на сайте министерства ↗</a></div></article>`).join('')}</div>`;
      note.innerHTML = 'Это сценарные предложения студии, а не анонсы мероприятий. Длительность указана ориентировочно; сотрудничество с учреждениями и даты показов не подтверждены. <a href="#suggest-scenario">Предложить свой сценарий ↗</a>';
    }
  }
  document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => render(button.dataset.tab)));
  const menu = document.querySelector('.menu-button');
  const nav = document.getElementById('navigation');
  menu.addEventListener('click', () => {const opened = nav.classList.toggle('open');menu.setAttribute('aria-expanded', String(opened));menu.setAttribute('aria-label', opened ? 'Закрыть меню' : 'Открыть меню');});
  nav.addEventListener('click', event => {if (event.target.closest('a')) {nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');}});
  document.querySelectorAll('form[data-issue]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const isScenario = form.dataset.issue === 'scenario';
    const title = form.elements.title.value.trim();
    const body = isScenario
      ? `Предложение сценария для «Внутри истории»\n\nПлощадка: ${form.elements.venue.value.trim()}\n\nСюжет и участие зрителя:\n${form.elements.story.value.trim()}`
      : `Отзыв о сайте «Внутри истории»\n\n${form.elements.message.value.trim()}`;
    const url = new URL('https://github.com/alekseevasvetlana8-dev/vnutri-istorii-lnr/issues/new');
    url.searchParams.set('title', `${isScenario ? 'Сценарий' : 'Отзыв'}: ${title}`);
    url.searchParams.set('body', body);
    const link = document.createElement('a');
    link.href = url.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Открыть заполненный черновик на GitHub ↗';
    const status = form.querySelector('.form-status');
    status.replaceChildren('Черновик подготовлен. Если новая вкладка не открылась, перейдите по ссылке: ', link);
    link.click();
  }));
  render('real');
})();
