---
---

@import url("https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap");

/* =========================================================
   Edger-inspired Jekyll Theme
   ========================================================= */

:root {
  --bg: #fff7e9;
  --bg-soft: #f8eddb;
  --surface: #fffaf0;
  --surface-strong: #ffffff;

  --text: #231d19;
  --text-soft: #443a33;
  --muted: #786d64;

  --line: #b6a794;
  --line-soft: rgba(74, 59, 47, 0.18);

  --pink: #efafc5;
  --pink-soft: #f8d9e3;
  --yellow: #f4d98e;
  --yellow-soft: #f8e9b9;
  --green: #a7d8cd;
  --green-soft: #d5eee8;
  --purple: #c7a2db;
  --purple-soft: #eadcf1;
  --peach: #efb39d;
  --peach-soft: #f7d6c9;
  --blue: #a9cfce;

  --primary: #db8ca8;
  --primary-dark: #bd6685;

  --container: 1200px;
  --radius: 22px;
  --radius-small: 12px;

  --font-body: "Vazirmatn", Tahoma, Arial, sans-serif;
  --font-title: "Lora", Georgia, "Times New Roman", serif;

  --shadow-soft: 0 18px 50px rgba(75, 54, 37, 0.08);
  --transition: 220ms ease;
}

/* =========================================================
   Reset
   ========================================================= */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  direction: rtl;
  color: var(--text);
  background:
    radial-gradient(
      circle at 15% 3%,
      rgba(244, 205, 137, 0.25),
      transparent 25rem
    ),
    radial-gradient(
      circle at 92% 12%,
      rgba(243, 179, 172, 0.18),
      transparent 29rem
    ),
    linear-gradient(180deg, #fff9ed 0%, var(--bg) 100%);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.9;
  overflow-x: hidden;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.24;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent 3px,
      rgba(81, 61, 44, 0.018) 4px
    );
}

img {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
  transition:
    color var(--transition),
    background-color var(--transition),
    border-color var(--transition),
    transform var(--transition),
    box-shadow var(--transition);
}

button,
input,
textarea,
select {
  font: inherit;
}

p {
  margin: 0 0 1.2rem;
  color: var(--muted);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0 0 1rem;
  color: var(--text);
  font-weight: 800;
  line-height: 1.45;
}

::selection {
  color: var(--text);
  background: var(--pink-soft);
}

.container {
  width: min(calc(100% - 48px), var(--container));
  margin-inline: auto;
}

/* =========================================================
   Header
   ========================================================= */

.site-header {
  position: relative;
  z-index: 100;
  padding-top: 25px;
  background: transparent;
}

.topbar {
  min-height: 100px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 25px;
}

.topbar__social {
  direction: ltr;
  display: flex;
  justify-self: start;
  align-items: center;
  gap: 14px;
}

.topbar__social a {
  display: grid;
  place-items: center;
  width: 27px;
  height: 27px;
  color: var(--muted);
  font-family: var(--font-title);
  font-size: 0.75rem;
  font-weight: 700;
}

.topbar__social a:nth-child(1) {
  color: #4d79bb;
}

.topbar__social a:nth-child(2) {
  color: #d883aa;
}

.topbar__social a:nth-child(3) {
  color: #5ab7ad;
}

.topbar__social a:hover {
  transform: translateY(-3px);
}

.site-brand {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  color: var(--text);
}

.site-brand__eyebrow {
  display: none;
}

.site-brand__name {
  position: relative;
  font-family: var(--font-title);
  font-size: clamp(2.5rem, 5vw, 4.25rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.07em;
}

.site-brand__name::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: -8px;
  width: 55%;
  height: 2px;
  border-radius: 99px;
  background: var(--text);
}

.topbar__actions {
  direction: ltr;
  display: flex;
  justify-self: end;
  align-items: center;
  gap: 12px;
}

.subscribe-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 39px;
  padding: 5px 21px;
  border: 1px solid #9d7b85;
  border-radius: 999px;
  color: var(--text);
  background: var(--pink-soft);
  box-shadow:
    inset 0 0 0 3px rgba(255, 255, 255, 0.55),
    0 3px 0 rgba(78, 54, 45, 0.08);
  font-size: 0.82rem;
  font-weight: 600;
}

.subscribe-button:hover {
  color: var(--text);
  background: var(--pink);
  transform: translateY(-2px);
}

.nav-toggle {
  display: none;
  width: 43px;
  height: 43px;
  padding: 9px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: var(--yellow-soft);
  cursor: pointer;
}

.nav-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  margin: 5px 0;
  border-radius: 10px;
  background: var(--text);
}

.site-nav {
  min-height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  direction: rtl;
}

.site-nav a {
  position: relative;
  padding: 9px 15px;
  color: var(--text-soft);
  font-size: 0.88rem;
  font-weight: 500;
}

.site-nav a::after {
  content: "";
  position: absolute;
  right: 15px;
  bottom: 5px;
  width: 0;
  height: 1px;
  background: var(--text);
  transition: width var(--transition);
}

.site-nav a:hover::after,
.site-nav a.active::after {
  width: calc(100% - 30px);
}

/* =========================================================
   Buttons
   ========================================================= */

.btn,
.read-more,
.section-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 43px;
  padding: 7px 22px;
  border: 1px solid #9c8a77;
  border-radius: 999px;
  color: var(--text);
  background: var(--surface);
  font-size: 0.83rem;
  font-weight: 600;
  line-height: 1;
}

.btn:hover,
.read-more:hover,
.section-link:hover {
  color: var(--text);
  transform: translateY(-3px);
  box-shadow: 0 10px 22px rgba(75, 54, 37, 0.1);
}

.btn--primary {
  background: var(--pink-soft);
  box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.45);
}

.btn--primary:hover {
  background: var(--pink);
}

.btn--ghost {
  background: var(--yellow-soft);
}

/* =========================================================
   Home Hero
   ========================================================= */

.home-hero {
  position: relative;
  padding: 75px 0 125px;
}

.home-hero::before {
  content: "";
  position: absolute;
  top: -170px;
  right: -7%;
  z-index: -1;
  width: 52%;
  height: 490px;
  opacity: 0.43;
  filter: blur(3px);
  background:
    radial-gradient(
      ellipse at 45% 55%,
      rgba(246, 190, 172, 0.58),
      transparent 65%
    ),
    radial-gradient(
      ellipse at 80% 80%,
      rgba(250, 219, 161, 0.6),
      transparent 58%
    );
  transform: rotate(-8deg);
}

.home-hero__grid {
  display: grid;
  grid-template-columns: minmax(310px, 0.9fr) minmax(390px, 1.1fr);
  align-items: center;
  gap: clamp(55px, 9vw, 135px);
  max-width: 1030px;
  margin-inline: auto;
}

.home-hero__content {
  position: relative;
  z-index: 2;
}

.home-hero__kicker,
.section-kicker {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 14px;
  color: var(--muted);
  font-size: 0.73rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.home-hero__kicker::before,
.section-kicker::before {
  content: "✦";
  color: var(--primary-dark);
  font-size: 0.8rem;
}

.home-hero h1 {
  max-width: 650px;
  margin-bottom: 22px;
  font-family: var(--font-title), var(--font-body);
  font-size: clamp(2.1rem, 4.3vw, 4.25rem);
  font-weight: 700;
  line-height: 1.32;
  letter-spacing: -0.035em;
}

.home-hero h1 span {
  display: block;
}

.home-hero__content > p {
  max-width: 650px;
  margin-bottom: 25px;
  color: var(--text-soft);
  font-size: 0.98rem;
  line-height: 2.05;
}

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 25px;
}

.home-hero__stats {
  display: flex;
  align-items: center;
  gap: 31px;
  margin-top: 34px;
}

.home-hero__stats > div {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.home-hero__stats > div:not(:last-child)::after {
  content: "";
  position: absolute;
  left: -16px;
  top: 50%;
  width: 1px;
  height: 25px;
  background: var(--line-soft);
  transform: translateY(-50%);
}

.home-hero__stats strong {
  font-family: var(--font-title);
  font-size: 1.45rem;
}

.home-hero__stats span {
  color: var(--muted);
  font-size: 0.76rem;
}

.home-hero__visual {
  position: relative;
  width: min(100%, 410px);
  aspect-ratio: 1;
  justify-self: center;
  padding: 13px;
  border: 1px solid rgba(49, 42, 36, 0.7);
  border-radius: 50%;
}

.home-hero__visual::before {
  content: "";
  position: absolute;
  inset: 12px -15px -8px 14px;
  z-index: -1;
  border-radius: 50%;
  background: rgba(238, 205, 177, 0.38);
  transform: rotate(8deg);
}

.home-hero__visual > img,
.home-hero__placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.home-hero__placeholder {
  display: grid;
  place-items: center;
  overflow: hidden;
  color: rgba(44, 35, 29, 0.55);
  background:
    radial-gradient(
      ellipse at 54% 42%,
      rgba(246, 181, 189, 0.72),
      transparent 30%
    ),
    radial-gradient(
      ellipse at 30% 68%,
      rgba(246, 203, 150, 0.8),
      transparent 40%
    ),
    radial-gradient(
      ellipse at 78% 72%,
      rgba(151, 198, 184, 0.7),
      transparent 38%
    ),
    #f8e8d7;
  font-family: var(--font-title);
  font-size: 5rem;
}

.home-hero__badge {
  position: absolute;
  right: -35px;
  bottom: 25px;
  max-width: 245px;
  padding: 13px 17px;
  border: 1px solid var(--line);
  border-radius: 13px;
  background: rgba(255, 249, 238, 0.94);
  box-shadow: var(--shadow-soft);
}

.home-hero__badge span {
  display: block;
  margin-bottom: 3px;
  color: var(--primary-dark);
  font-size: 0.67rem;
  font-weight: 700;
}

.home-hero__badge strong {
  display: block;
  overflow: hidden;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.6;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* =========================================================
   Sections
   ========================================================= */

.magazine-section {
  position: relative;
  padding: 78px 0;
}

.magazine-section--soft {
  background: rgba(249, 237, 219, 0.48);
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 30px;
  margin-bottom: 49px;
}

.section-heading--center {
  display: block;
  max-width: 650px;
  margin-inline: auto;
  margin-bottom: 52px;
  text-align: center;
}

.section-heading h2 {
  margin: 0;
  font-family: var(--font-title), var(--font-body);
  font-size: clamp(1.8rem, 3.3vw, 3rem);
  line-height: 1.35;
}

.section-heading p {
  margin-top: 10px;
  margin-bottom: 0;
}

.section-link {
  flex: 0 0 auto;
  background: var(--green-soft);
}

/* =========================================================
   Featured editor card
   ========================================================= */

.editor-card {
  display: grid;
  grid-template-columns: minmax(340px, 1.1fr) minmax(320px, 0.9fr);
  align-items: center;
  gap: clamp(40px, 7vw, 90px);
  max-width: 1030px;
  margin-inline: auto;
}

.editor-card__image {
  position: relative;
  min-height: 450px;
  padding: 14px;
  border: 1px solid rgba(74, 60, 49, 0.66);
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.18);
}

.editor-card__image::before {
  content: "";
  position: absolute;
  inset: -14px 18px 19px -18px;
  z-index: -1;
  border-radius: 13px;
  background: var(--yellow-soft);
  opacity: 0.7;
  transform: rotate(-2deg);
}

.editor-card__image img,
.editor-card__image .image-placeholder {
  width: 100%;
  height: 100%;
  min-height: 420px;
  border-radius: 8px;
  object-fit: cover;
}

.editor-card__content h3 {
  margin: 16px 0;
  font-family: var(--font-title), var(--font-body);
  font-size: clamp(1.8rem, 3vw, 2.8rem);
}

.editor-card__content p {
  margin-bottom: 26px;
}

.vertical-label {
  position: absolute;
  top: 24px;
  right: -19px;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  max-width: 150px;
  padding: 7px 13px;
  border: 1px solid #8c7866;
  border-radius: 999px;
  color: var(--text);
  background: var(--yellow-soft);
  font-size: 0.68rem;
  font-weight: 600;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 17px;
  color: var(--muted);
  font-size: 0.7rem;
}

.post-meta > *:not(:last-child) {
  position: relative;
}

.post-meta > *:not(:last-child)::after {
  content: "•";
  position: absolute;
  left: -12px;
  color: var(--primary);
}

/* =========================================================
   Spotlight cards
   ========================================================= */

.spotlight-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 65px;
}

.spotlight-card {
  min-width: 0;
}

.spotlight-card:nth-child(even) {
  margin-top: 70px;
}

.spotlight-card__image {
  position: relative;
  display: block;
  height: 470px;
  padding: 13px;
  border: 1px solid rgba(74, 60, 49, 0.64);
  border-radius: 12px;
}

.spotlight-card__image::before {
  content: "";
  position: absolute;
  inset: -15px 19px 16px -17px;
  z-index: -1;
  border-radius: 12px;
  background: var(--pink-soft);
  opacity: 0.72;
  transform: rotate(1.5deg);
}

.spotlight-card:nth-child(even) .spotlight-card__image::before {
  background: var(--green-soft);
  transform: rotate(-1.5deg);
}

.spotlight-card:nth-child(even) .vertical-label {
  background: var(--green-soft);
}

.spotlight-card__image img,
.spotlight-card__image .image-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 7px;
  object-fit: cover;
  transition: transform 500ms ease;
}

.spotlight-card:hover .spotlight-card__image img {
  transform: scale(1.025);
}

.spotlight-card__body {
  padding: 27px 24px 0;
}

.spotlight-card__body h3 {
  margin: 13px 0;
  font-family: var(--font-title), var(--font-body);
  font-size: clamp(1.4rem, 2.4vw, 2rem);
}

.spotlight-card__body h3 a:hover {
  color: var(--primary-dark);
}

.spotlight-card__body .read-more {
  margin-top: 8px;
  background: var(--purple-soft);
}

.spotlight-card:nth-child(even) .read-more {
  background: var(--green-soft);
}

/* =========================================================
   Post grid
   ========================================================= */

.post-grid {
  display: grid;
  gap: 60px 45px;
}

.post-grid--magazine {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
}

.post-card {
  min-width: 0;
}

.post-card:nth-child(3n + 2) {
  margin-top: 65px;
}

.post-card__image {
  position: relative;
  display: block;
  height: 330px;
  padding: 12px;
  border: 1px solid rgba(65, 54, 46, 0.65);
  border-radius: 10px;
}

.post-card__image::before {
  content: "";
  position: absolute;
  inset: -12px 16px 15px -14px;
  z-index: -1;
  border-radius: 11px;
  opacity: 0.72;
  background: var(--yellow-soft);
  transform: rotate(1.5deg);
}

.post-card:nth-child(3n + 2) .post-card__image::before {
  background: var(--green-soft);
  transform: rotate(-1.8deg);
}

.post-card:nth-child(3n) .post-card__image::before {
  background: var(--peach-soft);
  transform: rotate(1deg);
}

.post-card__image img,
.post-card__image .image-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: cover;
  transition: transform 500ms ease;
}

.post-card:hover .post-card__image img {
  transform: scale(1.025);
}

.post-card__category {
  position: absolute;
  top: 18px;
  right: -19px;
  z-index: 4;
  max-height: 130px;
  padding: 11px 7px;
  border: 1px solid #8d7a68;
  border-radius: 999px;
  color: var(--text);
  background: var(--yellow-soft);
  font-size: 0.65rem;
  font-weight: 600;
  line-height: 1;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.post-card:nth-child(3n + 2) .post-card__category {
  background: var(--green-soft);
}

.post-card:nth-child(3n) .post-card__category {
  background: var(--peach-soft);
}

.post-card__body {
  padding: 24px 17px 0;
}

.post-card__body h3 {
  margin: 12px 0;
  font-family: var(--font-title), var(--font-body);
  font-size: clamp(1.25rem, 2vw, 1.75rem);
  line-height: 1.55;
}

.post-card__body h3 a:hover {
  color: var(--primary-dark);
}

.post-card__body p {
  display: -webkit-box;
  overflow: hidden;
  font-size: 0.85rem;
  line-height: 1.9;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

/* =========================================================
   Image placeholders
   ========================================================= */

.image-placeholder {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  color: rgba(59, 47, 39, 0.34);
  background:
    radial-gradient(
      circle at 24% 25%,
      rgba(240, 177, 197, 0.8),
      transparent 24%
    ),
    radial-gradient(
      circle at 76% 34%,
      rgba(244, 213, 137, 0.9),
      transparent 29%
    ),
    radial-gradient(
      circle at 55% 80%,
      rgba(148, 202, 189, 0.85),
      transparent 37%
    ),
    #f7e8d8;
  font-family: var(--font-title);
  font-size: 3rem;
  font-weight: 700;
}

.image-placeholder::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.3;
  background:
    repeating-radial-gradient(
      ellipse at 40% 50%,
      transparent 0,
      transparent 14px,
      rgba(255, 255, 255, 0.7) 16px,
      transparent 18px
    );
}

/* =========================================================
   Empty state
   ========================================================= */

.empty-state {
  max-width: 620px;
  margin-inline: auto;
  padding: 55px 35px;
  border: 1px dashed var(--line);
  border-radius: var(--radius);
  background: rgba(255, 250, 240, 0.62);
  text-align: center;
}

.empty-state > span {
  display: block;
  margin-bottom: 14px;
  color: var(--primary-dark);
  font-size: 2.2rem;
}

.empty-state h3 {
  font-family: var(--font-title), var(--font-body);
  font-size: 1.5rem;
}

/* =========================================================
   Newsletter
   ========================================================= */

.newsletter-block {
  padding: 95px 0 115px;
}

.newsletter-card {
  position: relative;
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  align-items: center;
  gap: 45px;
  overflow: hidden;
  padding: clamp(40px, 6vw, 76px);
  border: 1px solid var(--line);
  border-radius: 25px;
  background:
    radial-gradient(
      circle at 8% 10%,
      rgba(239, 175, 197, 0.46),
      transparent 25%
    ),
    radial-gradient(
      circle at 91% 90%,
      rgba(167, 216, 205, 0.5),
      transparent 30%
    ),
    var(--surface);
  box-shadow: var(--shadow-soft);
}

.newsletter-card::before {
  content: "✦";
  position: absolute;
  top: 17px;
  left: 25px;
  color: var(--primary);
  font-size: 2.2rem;
  transform: rotate(17deg);
}

.newsletter-card h2 {
  max-width: 650px;
  margin-bottom: 12px;
  font-family: var(--font-title), var(--font-body);
  font-size: clamp(1.8rem, 3vw, 2.8rem);
}

.newsletter-card p {
  max-width: 630px;
  margin-bottom: 0;
}

.newsletter-card__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
}

/* =========================================================
   Footer
   ========================================================= */

.site-footer {
  padding: 72px 0 30px;
  border-top: 1px solid var(--line-soft);
  background: rgba(248, 237, 219, 0.55);
}

.site-footer__inner {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 25px 70px;
  align-items: start;
}

.site-footer__brand {
  font-family: var(--font-title);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
}

.site-footer__inner > p:not(.site-footer__copy) {
  max-width: 650px;
  margin: 0;
}

.site-footer__links {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 13px 30px;
  padding: 25px 0;
  border-top: 1px solid var(--line-soft);
  border-bottom: 1px solid var(--line-soft);
}

.site-footer__links a {
  color: var(--muted);
  font-size: 0.84rem;
  font-weight: 600;
}

.site-footer__links a:hover {
  color: var(--primary-dark);
}

.site-footer__copy {
  grid-column: 1 / -1;
  margin: 0;
  font-size: 0.76rem;
}

/* =========================================================
   Post and page content
   ========================================================= */

.page-content,
.post-content {
  width: min(calc(100% - 48px), 850px);
  margin: 60px auto 100px;
}

.page-header,
.post-header {
  margin-bottom: 42px;
  text-align: center;
}

.page-header h1,
.post-header h1 {
  font-family: var(--font-title), var(--font-body);
  font-size: clamp(2.3rem, 5vw, 4rem);
}

.post-content {
  color: var(--text-soft);
  font-size: 1.03rem;
  line-height: 2.2;
}

.post-content h2,
.post-content h3,
.post-content h4 {
  margin-top: 2.2em;
}

.post-content a {
  color: var(--primary-dark);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.post-content img {
  margin: 38px auto;
  border-radius: 16px;
}

.post-content blockquote {
  margin: 35px 0;
  padding: 22px 28px;
  border-right: 4px solid var(--primary);
  border-radius: 12px 0 0 12px;
  background: var(--pink-soft);
}

pre {
  overflow-x: auto;
  padding: 22px;
  border-radius: 14px;
  direction: ltr;
  color: #f8eee7;
  background: #2a211d;
  text-align: left;
}

code {
  font-family: Consolas, Monaco, monospace;
}

/* =========================================================
   Reveal animation
   ========================================================= */

[data-reveal] {
  animation: revealItem 700ms ease both;
}

@keyframes revealItem {
  from {
    opacity: 0;
    transform: translateY(22px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* =========================================================
   Responsive
   ========================================================= */

@media (max-width: 1050px) {
  .topbar {
    min-height: 75px;
    grid-template-columns: 1fr auto;
  }

  .topbar__social {
    display: none;
  }

  .site-brand {
    justify-self: start;
  }

  .site-brand__name {
    font-size: 2.1rem;
  }

  .topbar__actions {
    justify-self: end;
  }

  .nav-toggle {
    display: block;
  }

  .site-nav {
    display: none;
    flex-direction: column;
    align-items: stretch;
    min-height: auto;
    margin-bottom: 15px;
    padding: 14px;
    border: 1px solid var(--line-soft);
    border-radius: 16px;
    background: rgba(255, 250, 240, 0.98);
    box-shadow: var(--shadow-soft);
  }

  .site-nav.is-open,
  .site-nav.open,
  .nav-open .site-nav {
    display: flex;
  }

  .site-nav a {
    padding: 11px 13px;
  }

  .home-hero__grid {
    gap: 55px;
  }

  .post-grid--magazine {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .post-card:nth-child(3n + 2) {
    margin-top: 0;
  }

  .post-card:nth-child(even) {
    margin-top: 55px;
  }
}

@media (max-width: 820px) {
  .home-hero {
    padding: 55px 0 85px;
  }

  .home-hero__grid {
    grid-template-columns: 1fr;
  }

  .home-hero__content {
    order: 2;
    text-align: center;
  }

  .home-hero__visual {
    order: 1;
    width: min(82vw, 390px);
  }

  .home-hero__content > p {
    margin-inline: auto;
  }

  .home-hero__actions,
  .home-hero__stats {
    justify-content: center;
  }

  .editor-card {
    grid-template-columns: 1fr;
  }

  .editor-card__image {
    min-height: 390px;
  }

  .spotlight-grid {
    gap: 50px 28px;
  }

  .spotlight-card__image {
    height: 370px;
  }

  .newsletter-card {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .newsletter-card__actions {
    justify-content: center;
  }

  .site-footer__inner {
    grid-template-columns: 1fr;
  }

  .site-footer__links,
  .site-footer__copy {
    grid-column: auto;
  }
}

@media (max-width: 650px) {
  .container {
    width: min(calc(100% - 30px), var(--container));
  }

  .site-header {
    padding-top: 12px;
  }

  .subscribe-button {
    display: none;
  }

  .home-hero h1 {
    font-size: 2.05rem;
  }

  .home-hero__stats {
    gap: 20px;
  }

  .home-hero__stats > div:not(:last-child)::after {
    left: -10px;
  }

  .home-hero__badge {
    right: 0;
    bottom: -12px;
    max-width: 210px;
  }

  .magazine-section {
    padding: 58px 0;
  }

  .section-heading {
    display: block;
    text-align: center;
  }

  .section-heading .section-link {
    margin-top: 20px;
  }

  .editor-card__image {
    min-height: 320px;
  }

  .editor-card__image img,
  .editor-card__image .image-placeholder {
    min-height: 290px;
  }

  .editor-card__content {
    text-align: center;
  }

  .editor-card__content .post-meta {
    justify-content: center;
  }

  .spotlight-grid,
  .post-grid--magazine {
    grid-template-columns: 1fr;
  }

  .spotlight-card:nth-child(even),
  .post-card:nth-child(even) {
    margin-top: 0;
  }

  .spotlight-card__image {
    height: 390px;
  }

  .post-card__image {
    height: 350px;
  }

  .spotlight-card__body,
  .post-card__body {
    padding-inline: 12px;
    text-align: center;
  }

  .spotlight-card__body .post-meta,
  .post-card__body .post-meta {
    justify-content: center;
  }

  .newsletter-block {
    padding: 65px 0 80px;
  }

  .newsletter-card {
    padding: 42px 23px;
  }

  .newsletter-card__actions {
    flex-direction: column;
  }

  .newsletter-card__actions .btn {
    width: 100%;
  }
}

@media (max-width: 430px) {
  .home-hero__stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    gap: 10px;
  }

  .home-hero__stats > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .home-hero__stats > div:not(:last-child)::after {
    left: -5px;
  }

  .home-hero__visual {
    width: 85vw;
  }

  .spotlight-card__image,
  .post-card__image {
    height: 310px;
  }
}

/* =========================================================
   Reduced motion
   ========================================================= */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
