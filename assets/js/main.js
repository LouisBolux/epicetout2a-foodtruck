function toggleNav(btn) {
  btn.classList.toggle('open');
  document.getElementById('navMobile').classList.toggle('open');
}
function closeNav() {
  document.querySelector('.nav-burger')?.classList.remove('open');
  document.getElementById('navMobile')?.classList.remove('open');
}
function toggleOffre(el) {
  const wasOpen = el.classList.contains('open');
  document.querySelectorAll('.offre-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) el.classList.add('open');
}
function toggleFaq(btn) {
  const item = btn.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}
function closeRgpd() {
  document.getElementById('rgpdBanner').classList.add('hidden');
  try { localStorage.setItem('rgpd_ok', '1'); } catch(e) {}
}
try { if (localStorage.getItem('rgpd_ok')) document.getElementById('rgpdBanner').classList.add('hidden'); } catch(e) {}

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
