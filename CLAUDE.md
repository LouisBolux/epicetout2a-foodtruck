# Épicétout2A — Site foodtruck Corse-du-Sud

Site statique single-page pour foodtruck Airstream en Corse-du-Sud (Propriano).
Hébergé sur OVH Cloud, domaine epicetout2a.fr.

## Stack
- HTML/CSS/JS vanilla — aucun framework, aucun build
- CSS : `assets/css/style.css`
- JS : `assets/js/main.js`
- Images : `assets/images/` (voir liste ci-dessous)

## Images attendues dans assets/images/
- `hero.jpg` — photo hero fond du bandeau principal
- `logo.jpg` — logo rond du foodtruck (nav + hero)
- `foodtruck-photo.jpg` — photo du foodtruck dans la section quotidien
- `favicon.png` — favicon 16×16 ou 32×32
- `favicon-32x32.png` — favicon 32×32
- `apple-touch-icon.png` — icône iOS 180×180

## Sections de la page (dans l'ordre)
1. **Nav** — `#quotidien` · `#privatisation` · `#contact`
2. **Hero** (`#hero`) — accroche principale + CTA devis
3. **Quotidien** (`#quotidien`) — menu du jour, Instagram, photo foodtruck
4. **Transition band** — lien privatisation
5. **Social proof** — témoignages clients
6. **Comment ça marche** (`.how`) — 3 étapes privatisation
7. **Offres** (`.offres-bg`) — formules accordion (wildcard, événement, tournage...)
8. **Contact/Devis** (`#contact`) — iframe Google Forms
9. **FAQ** (`#faq`) — accordion questions fréquentes
10. **Footer** + sticky CTA mobile + bannière RGPD

## Variables CSS (dans style.css)
```
--rouge: couleur principale
--rouge-profond: hover rouge
--terracotta: sections offres
--or: accents, témoignages
--safran: CTAs secondaires
--maquis: section testimonials (vert sombre)
--creme: fond principal
--ecru: fond alternatif
--brun: couleur texte
--noir: footer, RGPD
```

## Déploiement
GitHub Pages — automatique sur push vers `main`.
DNS géré chez OVH (hébergement = GitHub, pas OVH).

```bash
git add . && git commit -m "..." && git push
# → live sur epicetout2a.fr en ~1 minute
```

## Pour tester localement
```bash
npx serve . -p 3000
# ou
python3 -m http.server 3000
```
