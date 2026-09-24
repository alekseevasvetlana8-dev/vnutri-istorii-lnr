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
    {symbol:'✳',place:'АЛЧЕВСК · ИСТОРИЧЕСКИЙ МУЗЕЙ',title:'«Город, который помнит»',description:'Спектакль-маршрут по залам: голоса разных поколений и предметы городской памяти.',source:'https://mk.lpr-reg.ru/14169-v-alchevskom-muzee-posle-remonta-otkrylis-dva-obnovlennyh-jekspozicionnyh-zala.html'},
    {symbol:'❞',place:'СЛАВЯНОСЕРБСК · БИБЛИОТЕКА',title:'«Между строк»',description:'Литературная прогулка: зритель собирает историю по книгам, голосам и письмам.',source:'https://mk.lpr-reg.ru/14168-v-slavjanoserbske-otkrylas-pervaja-modelnaja-biblioteka.html'},
    {symbol:'◈',place:'БЕЛОВОДСК · КРАЕВЕДЧЕСКИЙ МУЗЕЙ',title:'«Голоса края»',description:'Камерная постановка с аудиоисториями и предметами местной коллекции.',source:'https://mk.lpr-reg.ru/13217-v-belovodske-posle-kapitalnogo-remonta-torzhestvenno-otkrylsja-obnovlennyj-kraevedcheskij-muzej.html'}
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
      content.innerHTML = `<div class="show-grid">${ideas.map(idea => `<article class="show-card idea-card"><div class="show-visual idea-visual" aria-hidden="true">${idea.symbol}</div><div class="show-info"><span class="show-meta">КОНЦЕПЦИЯ · ДАТА НЕ НАЗНАЧЕНА</span><h3>${escapeHTML(idea.title)}</h3><p>${escapeHTML(idea.description)}</p><span class="show-location">◎ ${escapeHTML(idea.place)}</span><a href="${idea.source}" target="_blank" rel="noopener noreferrer">Об учреждении на сайте министерства ↗</a></div></article>`).join('')}</div>`;
      note.textContent = 'Это сценарные предложения студии, а не анонсы мероприятий. Сотрудничество с перечисленными учреждениями, даты показов и продажа билетов не подтверждены.';
    }
  }
  document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => render(button.dataset.tab)));
  const menu = document.querySelector('.menu-button');
  const nav = document.getElementById('navigation');
  menu.addEventListener('click', () => {const opened = nav.classList.toggle('open');menu.setAttribute('aria-expanded', String(opened));menu.setAttribute('aria-label', opened ? 'Закрыть меню' : 'Открыть меню');});
  nav.addEventListener('click', event => {if (event.target.closest('a')) {nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');}});
  document.getElementById('proposal-form').addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const text = `Предложение для иммерсивной студии «Внутри истории»\nУчреждение и город: ${form.elements.venue.value.trim()}\nИстория / идея: ${form.elements.story.value.trim()}`;
    const status = document.getElementById('form-status');
    try { await navigator.clipboard.writeText(text); status.textContent = 'Предложение скопировано. Вставьте его в письмо или сообщение команде проекта.'; }
    catch { status.textContent = 'Скопируйте текст предложения ниже вручную.'; let draft = document.getElementById('proposal-draft'); if (!draft) {draft = document.createElement('textarea');draft.id = 'proposal-draft';draft.readOnly = true;draft.setAttribute('aria-label','Текст предложения');form.append(draft);} draft.value = text; draft.focus(); draft.select(); }
  });
  render('real');
})();
