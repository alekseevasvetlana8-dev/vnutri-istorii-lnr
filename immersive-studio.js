(() => {
  'use strict';
  const announcement = 'https://mk.lpr-reg.ru/14195-afisha-vyhodnogo-dnja-luganskij-respublikanskij-akademicheskij-teatr-kukol-priglashaet.html';
  const shows = [
    {date:'2026-10-03',day:'03',month:'ОКТЯБРЯ',title:'«Маугли»',time:'11:00 и 13:00',image:'1790238945_maugli1.jpg',description:'История о дружбе, смелости и верности по мотивам сказки о Маугли.'},
    {date:'2026-10-04',day:'04',month:'ОКТЯБРЯ',title:'«Незнайка и его друзья»',time:'11:00 и 13:00',image:'1790238952_photo_2025-09-12_13-43-06.jpg',description:'Приключения Незнайки и его друзей в необычной сказочной стране.'},
    {date:'2026-10-10',day:'10',month:'ОКТЯБРЯ',title:'«Моя усатая мама»',time:'11:00 и 13:00',image:'1790239018_nq2vvwivv0o.jpg',description:'Тёплая сказка о любви мамы к своему ребёнку.'},
    {date:'2026-10-11',day:'11',month:'ОКТЯБРЯ',title:'«Птицы»',time:'11:00 и 13:00',image:'1790238965_qngmnisljjs.jpg',description:'Сказка-притча о дружбе, природе и жизни нового леса.'}
  ];
  const ideas = window.STUDIO_SCENARIOS;
  const zones = [
    {name:'Вход в историю',icon:'01',description:'Световая карта приглашает выбрать направление: люди, книги или предметы. Это начало маршрута, который вы собираете сами.',action:'Назовите тему, с которой хотите познакомиться.'},
    {name:'Ожившая история',icon:'02',description:'Воображаемая сцена оживает с помощью проекции и звука. Выбор зрителя определяет, чей голос прозвучит следующим.',action:'Решите, за каким героем отправиться.'},
    {name:'Голоса поколений',icon:'03',description:'Звуковая стена соединяет интервью, письма и воспоминания — после проверки источников и получения согласия на публикацию.',action:'Выберите голос, который хотите услышать.'},
    {name:'Культурный код',icon:'04',description:'Литература, музыка и народные традиции становятся развилками персонального маршрута.',action:'Найдите символ, который хочется исследовать.'},
    {name:'Создай сам',icon:'05',description:'В творческой лаборатории предмет превращается в короткую сцену, письмо или звуковую открытку.',action:'Перейдите к конструктору своей истории.'},
    {name:'Будущее культуры',icon:'06',description:'Финальная зона собирает ваш выбор в идею новой постановки, которую можно сохранить и предложить студии.',action:'Сохраните эскиз и расскажите о нём другим.'}
  ];
  const content = document.getElementById('playbill-content');
  const note = document.getElementById('playbill-note');
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const upcomingShows = () => shows.filter(show => show.date >= new Date().toLocaleDateString('sv-SE'));
  let activeTab = 'real';
  function render(tab) {
    activeTab = tab;
    document.querySelector('[data-tab="real"] span').textContent = String(upcomingShows().length).padStart(2, '0');
    document.querySelectorAll('[data-tab]').forEach(button => {const selected = button.dataset.tab === tab; button.classList.toggle('active', selected); button.setAttribute('aria-pressed', String(selected));});
    document.getElementById('event-controls').hidden = tab !== 'real';
    if (tab === 'real') {
      const day = document.getElementById('show-date').value;
      const upcoming = upcomingShows().filter(show => !day || show.date === day);
      content.innerHTML = upcoming.length ? `<div class="show-grid">${upcoming.map(show => `<article class="show-card"><div class="show-visual"><img src="https://mk.lpr-reg.ru/uploads/posts/2026-09/${escapeHTML(show.image)}" alt="" loading="lazy"><span class="show-date">${show.day}<small>${show.month}</small></span></div><div class="show-info"><span class="show-meta">ПОДТВЕРЖДЁННЫЙ АНОНС · ${show.time}</span><h3>${escapeHTML(show.title)}</h3><p>${escapeHTML(show.description)}</p><span class="show-location">◎ Луганский республиканский академический театр кукол · Луганск</span><a href="${announcement}" target="_blank" rel="noopener noreferrer">Анонс на сайте министерства ↗</a></div></article>`).join('')}</div>` : '<div class="empty-show">На ближайшие даты подтверждённых показов из этой публикации нет. Проверьте новую афишу на сайте театра или министерства.</div>';
      note.innerHTML = `Источник: <a href="${announcement}" target="_blank" rel="noopener noreferrer">афиша театра кукол на сайте Минкультуры ЛНР ↗</a>, опубликована 24.09.2026. Спектакли театра кукол не обозначены источником как иммерсивные. Перед посещением уточните репертуар и наличие билетов у театра.`;
    } else {
      content.innerHTML = `<div class="show-grid idea-grid">${ideas.map(idea => `<article class="show-card idea-card"><div class="show-visual idea-visual" aria-hidden="true">${idea.symbol}</div><div class="show-info"><span class="show-meta">КОНЦЕПЦИЯ · ДАТА НЕ НАЗНАЧЕНА</span><h3>${escapeHTML(idea.title)}</h3><p>${escapeHTML(idea.description)}</p><span class="idea-format">${escapeHTML(idea.format)} · ${escapeHTML(idea.age)}</span><details class="idea-details"><summary>Как это происходит</summary><p><strong>Роль зрителя.</strong> ${escapeHTML(idea.role)}</p><p><strong>Ход истории.</strong> ${escapeHTML(idea.plot)}</p></details><span class="show-location">◎ ${escapeHTML(idea.place)}</span><a href="scenario.html?id=${encodeURIComponent(idea.id)}">Подробнее о сценарии ↗</a></div></article>`).join('')}</div>`;
      note.innerHTML = 'Это сценарные предложения студии, а не анонсы мероприятий. Длительность указана ориентировочно; сотрудничество с учреждениями и даты показов не подтверждены. <a href="#suggest-scenario">Предложить свой сценарий ↗</a>';
    }
  }
  document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => render(button.dataset.tab)));
  document.getElementById('show-date').addEventListener('change', () => render(activeTab));
  document.getElementById('clear-date').addEventListener('click', () => {document.getElementById('show-date').value = ''; render('real');});
  const journeyNav = document.getElementById('journey-nav');
  const journeyStage = document.getElementById('journey-stage');
  journeyNav.innerHTML = zones.map((zone,index) => `<button type="button" data-zone="${index}" aria-pressed="false"><span>${zone.icon}</span>${zone.name}<b>↗</b></button>`).join('');
  function showZone(index) {
    const zone = zones[index];
    journeyNav.querySelectorAll('button').forEach((button,i) => button.setAttribute('aria-pressed', String(index === i)));
    journeyStage.innerHTML = `<div class="stage-ring" aria-hidden="true">${zone.icon}</div><div class="stage-copy"><small>ЗОНА ${zone.icon} / 06 · ЦИФРОВОЙ ПРОТОТИП</small><h3>${zone.name}</h3><p>${zone.description}</p><strong>${zone.action}</strong><a ${index < 4 ? 'data-open-ideas' : ''} href="${index === 4 ? '#lab' : index === 5 ? '#suggest-scenario' : '#playbill'}">${index === 4 ? 'Создать свою историю' : index === 5 ? 'Предложить идею' : 'Посмотреть сценарии'} ↗</a></div>`;
  }
  journeyNav.addEventListener('click', event => {const button = event.target.closest('[data-zone]'); if (button) showZone(Number(button.dataset.zone));});
  journeyStage.addEventListener('click', event => {if (event.target.closest('[data-open-ideas]')) render('ideas');});
  showZone(0);
  document.getElementById('story-lab').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const place = form.elements.place.value, role = form.elements.role.value, object = form.elements.object.value.trim();
    const draft = `Эскиз истории\nМесто: ${place}\nРоль зрителя: ${role}\nГлавный образ: ${object}\nСюжет: В ${place.toLocaleLowerCase('ru')} ${role.toLocaleLowerCase('ru')} находит ${object} и ищет связанную с ним историю. Какой выбор изменит финал?`;
    const result = document.getElementById('lab-result');
    result.replaceChildren();
    const label = document.createElement('span'); label.className = 'section-label'; label.textContent = 'ВАШ ЦИФРОВОЙ ЭСКИЗ';
    const text = document.createElement('p'); text.textContent = draft;
    const download = document.createElement('button'); download.type = 'button'; download.className = 'btn btn-coral'; download.textContent = 'Скачать эскиз ↓';
    download.addEventListener('click', () => {const url = URL.createObjectURL(new Blob(['\ufeff'+draft],{type:'text/plain;charset=utf-8'})); const a = document.createElement('a'); a.href=url; a.download='moya-istoriya.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(url),1000);});
    const propose = document.createElement('a'); propose.className='inline-link'; propose.href='#suggest-scenario'; propose.textContent='Предложить эту идею ↗';
    propose.addEventListener('click', () => {document.querySelector('#suggest-scenario [name=story]').value = draft;});
    result.append(label,text,download,propose);
  });
  const fromMap = new URLSearchParams(location.search).get('place');
  if (fromMap) document.querySelector('#suggest-scenario [name=venue]').value = fromMap.slice(0,120);
  const menu = document.querySelector('.menu-button');
  const nav = document.getElementById('navigation');
  menu.addEventListener('click', () => {const opened = nav.classList.toggle('open');menu.setAttribute('aria-expanded', String(opened));menu.setAttribute('aria-label', opened ? 'Закрыть меню' : 'Открыть меню');});
  nav.addEventListener('click', event => {if (event.target.closest('a')) {nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');}});
  document.querySelectorAll('form[data-issue]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const isScenario = form.dataset.issue === 'scenario';
    const title = form.elements.title.value.trim();
    const body = isScenario
      ? `Предложение сценария для «Внутри истории»\n\nПлощадка: ${form.elements.venue.value.trim()}\nТема: ${form.elements.topic.value.trim()}\nАудитория: ${form.elements.audience.value}\nФормат: ${form.elements.format.value}\n\nСюжет и участие зрителя:\n${form.elements.story.value.trim()}\n\nПочему это важно:\n${form.elements.why.value.trim()}`
      : `Обращение: ${form.elements.category.value}\n\n${form.elements.message.value.trim()}`;
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
