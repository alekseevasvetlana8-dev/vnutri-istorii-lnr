(() => {
  const id = new URLSearchParams(location.search).get('id');
  const idea = window.STUDIO_SCENARIOS.find(item => item.id === id);
  const content = document.getElementById('scenario-content');
  if (!idea) {
    content.innerHTML = '<div class="empty-show"><h1>Сценарий не найден</h1><p>Вернитесь к каталогу сценариев и выберите постановку.</p><a href="index.html#playbill">Смотреть все сценарии ↗</a></div>';
    return;
  }
  document.title = `${idea.title} — сценарий студии «Внутри истории»`;
  const hero = document.createElement('section'); hero.className = 'scenario-hero';
  const mark = document.createElement('span'); mark.className='scenario-symbol'; mark.setAttribute('aria-hidden','true'); mark.textContent=idea.symbol;
  const intro = document.createElement('div');
  const label = document.createElement('span'); label.className='section-label'; label.textContent='СЦЕНАРНАЯ КОНЦЕПЦИЯ · ПОКАЗ НЕ АНОНСИРОВАН';
  const h = document.createElement('h1'); h.textContent=idea.title;
  const lead = document.createElement('p'); lead.textContent=idea.description;
  intro.append(label,h,lead); hero.append(intro,mark);
  const facts = document.createElement('div'); facts.className='scenario-facts';
  [['Формат',idea.format],['Аудитория (предложение)',idea.age],['Размер группы (предложение)',idea.group],['Площадка для обсуждения',idea.place]].forEach(([key,value]) => {
    const box = document.createElement('div'); const small=document.createElement('small'); small.textContent=key; const strong=document.createElement('strong');strong.textContent=value;box.append(small,strong);facts.append(box);
  });
  const story = document.createElement('section'); story.className='scenario-story';
  [['01 / ЗАВЯЗКА',idea.description],['02 / РОЛЬ ЗРИТЕЛЯ',idea.role],['03 / КАК РАЗВИВАЕТСЯ ИСТОРИЯ',idea.plot],['04 / ВОЗМОЖНЫЕ ИНСТРУМЕНТЫ',idea.tech]].forEach(([key,value])=>{const item=document.createElement('article');const heading=document.createElement('h2');heading.textContent=key;const text=document.createElement('p');text.textContent=value;item.append(heading,text);story.append(item);});
  const notice = document.createElement('div'); notice.className='scenario-notice';notice.textContent='Это авторский эскиз, а не утверждённая программа учреждения. Возраст, длительность, оснащение и состав участников уточняются после согласования. Трейлер, дата и бронирование появятся только после подтверждения показа.';
  const source=document.createElement('a');source.href=idea.source;source.target='_blank';source.rel='noopener noreferrer';source.textContent='Публикация министерства об учреждении ↗';source.className='inline-link';
  const propose=document.createElement('a');propose.href=`index.html?place=${encodeURIComponent(idea.place)}#suggest-scenario`;propose.textContent='Предложить свою историю для этой площадки ↗';propose.className='btn btn-coral';
  const actions=document.createElement('div');actions.className='scenario-actions';actions.append(source,propose);
  content.append(hero,facts,story,notice,actions);
})();
