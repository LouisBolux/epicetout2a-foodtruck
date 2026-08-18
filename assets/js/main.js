function toggleNav(btn) {
  btn.classList.toggle('open');
  btn.setAttribute('aria-expanded', btn.classList.contains('open'));
  document.getElementById('navMobile').classList.toggle('open');
}
function closeNav() {
  const btn = document.querySelector('.nav-burger');
  btn?.classList.remove('open');
  btn?.setAttribute('aria-expanded', 'false');
  document.getElementById('navMobile')?.classList.remove('open');
}
function toggleFaq(btn) {
  const item = btn.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}
// Consent gate : les iframes tierces (Google Forms, Google Maps) ne chargent
// leur src qu'après acceptation du bandeau ou clic explicite sur l'embed concerné.
function loadConsentFrame(wrapper) {
  if (!wrapper) return;
  const iframe = wrapper.querySelector('iframe[data-src]');
  if (!iframe || iframe.getAttribute('src')) return;
  iframe.setAttribute('src', iframe.dataset.src);
  iframe.classList.remove('hidden');
  wrapper.querySelector('.consent-gate')?.classList.add('hidden');
}
function loadAllConsentFrames() {
  document.querySelectorAll('[data-consent-frame]').forEach(loadConsentFrame);
}
function acceptRgpd() {
  document.getElementById('rgpdBanner')?.classList.add('hidden');
  try { localStorage.setItem('rgpd_ok', '1'); } catch(e) {}
  loadAllConsentFrames();
}
function refuseRgpd() {
  document.getElementById('rgpdBanner')?.classList.add('hidden');
  try { localStorage.setItem('rgpd_ok', '0'); } catch(e) {}
}
document.querySelectorAll('[data-consent-frame] [data-consent-load]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    // Un clic explicite sur un embed vaut acceptation globale : évite de re-demander sur chaque page.
    loadConsentFrame(btn.closest('[data-consent-frame]'));
    acceptRgpd();
  });
});
function manageCookies(el) {
  try { localStorage.removeItem('rgpd_ok'); } catch(e) {}
  if (document.getElementById('rgpdBanner')) {
    location.reload();
    return;
  }
  if (!el) return;
  if (!el.dataset.originalText) el.dataset.originalText = el.textContent;
  clearTimeout(el._resetTimer);
  el.textContent = 'Cookies réinitialisés ✓';
  el._resetTimer = setTimeout(function() { el.textContent = el.dataset.originalText; }, 2500);
}
(function() {
  let choice = null;
  try { choice = localStorage.getItem('rgpd_ok'); } catch(e) {}
  if (choice !== null) {
    document.getElementById('rgpdBanner')?.classList.add('hidden');
    if (choice === '1') loadAllConsentFrames();
  }
})();

// Sticky CTA : se masque quand un CTA en-page est visible
(function() {
  const stickyCta = document.querySelector('.sticky-cta');
  if (!stickyCta) return;

  // CTAs en-page qui "remplacent" le flottant
  // transition-band link, cta-inline (après "comment ça marche"), cta-offres, et la section contact elle-même
  const anchors = document.querySelectorAll('.transition-band a, .cta-inline, .cta-offres, #contact');

  let visibleCount = 0;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        visibleCount++;
      } else {
        visibleCount = Math.max(0, visibleCount - 1);
      }
    });
    if (visibleCount > 0) {
      stickyCta.classList.add('hidden-cta');
    } else {
      stickyCta.classList.remove('hidden-cta');
    }
  }, {
    threshold: 0.3   // au moins 30% du CTA visible pour déclencher
  });

  anchors.forEach(function(el) { observer.observe(el); });

  // Masquer aussi dans le hero (pas besoin de devis avant même d'avoir lu)
  const hero = document.querySelector('.hero-daily');
  if (hero) observer.observe(hero);
})();
