(() => {
  const titles = {
    'support.html': { en: 'Support · Pocket Accordion', zh: '技术支持 · 口袋手风琴' },
    'privacy.html': { en: 'Privacy Policy · Pocket Accordion', zh: '隐私政策 · 口袋手风琴' }
  };
  function setLanguage(language) {
    const selected = language === 'zh' ? 'zh' : 'en';
    document.documentElement.lang = selected === 'zh' ? 'zh-Hans' : 'en';
    document.querySelectorAll('[data-language]').forEach(element => {
      element.hidden = element.dataset.language !== selected;
    });
    document.querySelectorAll('[data-switch]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.switch === selected));
    });
    const page = location.pathname.split('/').pop();
    document.title = titles[page]?.[selected] || (selected === 'zh' ? '口袋手风琴' : 'Pocket Accordion');
    try { localStorage.setItem('pocket-accordion-language', selected); } catch (_) {}
  }
  let saved = 'en';
  try { saved = localStorage.getItem('pocket-accordion-language') || 'en'; } catch (_) {}
  setLanguage(location.hash === '#english' ? 'en' : saved);
  document.querySelectorAll('[data-switch]').forEach(button => {
    button.addEventListener('click', () => setLanguage(button.dataset.switch));
  });
})();
