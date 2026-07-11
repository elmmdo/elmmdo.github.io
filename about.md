---
layout: default
title: "درباره من"
description: "درباره نویسنده وبلاگ روایت، مسیر کاری، علایق و راه‌های ارتباطی."
permalink: /about/
body_class: about-page
custom_css: "/assets/css/about.css"
---

{% assign author_name = site.author.name | default: "نویسنده روایت" %}

{% assign instagram_link = site.instagram_url %}
{% if instagram_link == nil or instagram_link == empty %}
  {% if site.instagram_username %}
    {% assign instagram_link = "https://www.instagram.com/" | append: site.instagram_username %}
  {% endif %}
{% endif %}

{% assign telegram_link = site.telegram_url %}
{% if telegram_link == nil or telegram_link == empty %}
  {% if site.telegram_username %}
    {% assign telegram_username_clean = site.telegram_username | remove_first: "@" %}
    {% assign telegram_link = "https://t.me/" | append: telegram_username_clean %}
  {% endif %}
{% endif %}

<main id="main-content" class="about-content">

  <!-- =====================================================
       معرفی اصلی
       ===================================================== -->

  <section
    class="about-hero"
    aria-labelledby="aboutTitle"
  >
    <div class="container about-hero-grid">

      <div class="about-hero-content">

        <span class="eyebrow">
          درباره نویسنده روایت
        </span>

        <h1 id="aboutTitle">
          سلام، من
          <span>{{ author_name }}</span>
          هستم
        </h1>

        <p class="about-lead">
          پژوهشگر، نویسنده و یادگیرنده‌ای هستم که تلاش می‌کنم
          تجربه‌های پراکنده زندگی را به روایت‌هایی روشن،
          صادقانه و قابل استفاده تبدیل کنم.
        </p>

        <p class="about-introduction">
          «روایت» برای من فقط یک وبلاگ نیست؛ فضایی است برای
          ثبت چیزهایی که در مسیر زندگی، پژوهش، ساختن و
          یادگرفتن با آن‌ها روبه‌رو می‌شوم.
        </p>

        <div class="about-hero-actions">

          <a
            class="about-primary-button"
            href="#contact"
          >
            ارتباط با من
          </a>

          <a
            class="about-secondary-button"
            href="{{ '/' | relative_url }}#articles"
          >
            مشاهده نوشته‌ها
          </a>

        </div>

        {% if instagram_link or telegram_link %}
          <div
            class="about-social"
            aria-label="شبکه‌های اجتماعی"
          >
            <span>من را دنبال کنید:</span>

            <div class="social-links">

              {% if instagram_link %}
                <a
                  href="{{ instagram_link }}"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="صفحه اینستاگرام {{ author_name }}"
                  title="اینستاگرام"
                >
                  in
                </a>
              {% endif %}

              {% if telegram_link %}
                <a
                  href="{{ telegram_link }}"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="حساب تلگرام {{ author_name }}"
                  title="تلگرام"
                >
                  tg
                </a>
              {% endif %}

            </div>
          </div>
        {% endif %}

      </div>

      <figure class="about-hero-image">

        <img
          src="{{ '/assets/images/about-author.jpg' | relative_url }}"
          alt="تصویر {{ author_name }}"
          width="900"
          height="1100"
          loading="eager"
          decoding="async"
        >

        <figcaption class="about-image-note">

          <span aria-hidden="true">✦</span>

          <div>
            <strong>در حال یادگیری</strong>
            <small>هر روز، یک قدم بیشتر</small>
          </div>

        </figcaption>

        <span
          class="about-image-decoration"
          aria-hidden="true"
        ></span>

      </figure>

    </div>
  </section>

  <!-- =====================================================
       اطلاعات کوتاه
       ===================================================== -->

  <section
    class="about-stats-section"
    aria-label="اطلاعات کوتاه درباره نویسنده"
  >
    <div class="container">

      <div class="about-stats">

        <article class="about-stat">
          <strong>پژوهش</strong>
          <span>جست‌وجوی پاسخ‌های دقیق</span>
        </article>

        <article class="about-stat">
          <strong>نوشتن</strong>
          <span>تبدیل تجربه به روایت</span>
        </article>

        <article class="about-stat">
          <strong>یادگیری</strong>
          <span>ساختن مهارت‌های تازه</span>
        </article>

        <article class="about-stat">
          <strong>اشتراک</strong>
          <span>انتقال آموخته‌ها به دیگران</span>
        </article>

      </div>

    </div>
  </section>

  <!-- =====================================================
       داستان من
       ===================================================== -->

  <section
    class="about-section about-story-section"
    aria-labelledby="storyTitle"
  >
    <div class="container about-content-grid">

      <header class="about-section-heading">

        <span class="eyebrow">
          داستان من
        </span>

        <h2 id="storyTitle">
          چرا نوشتن را شروع کردم؟
        </h2>

      </header>

      <div class="about-prose">

        <p>
          همیشه برای من یادگرفتن فقط به خواندن کتاب‌ها یا
          شرکت در دوره‌ها محدود نبوده است. بخش مهمی از یادگیری،
          از تجربه‌کردن، اشتباه‌کردن، دوباره تلاش‌کردن و
          فکرکردن درباره مسیر طی‌شده شکل گرفته است.
        </p>

        <p>
          نوشتن را شروع کردم تا بتوانم این تجربه‌ها را
          مرتب کنم. وقتی چیزی را می‌نویسم، مجبور می‌شوم
          آن را دقیق‌تر ببینم، سؤال‌های بهتری بپرسم و
          پاسخ‌های روشن‌تری پیدا کنم.
        </p>

        <blockquote>
          <p>
            نوشتن برای من راهی برای نگه‌داشتن پاسخ‌ها نیست؛
            راهی برای پیداکردن سؤال‌های بهتر است.
          </p>
        </blockquote>

        <p>
          در این وبلاگ درباره تجربه‌های شخصی، مسیر یادگیری،
          پژوهش، فناوری، نوشتن، بهره‌وری و چیزهایی صحبت می‌کنم
          که به بهتر دیدن جهان و زندگی کمک می‌کنند.
        </p>

      </div>

    </div>
  </section>

  <!-- =====================================================
       حوزه‌های فعالیت
       ===================================================== -->

  <section
    class="about-section about-interests-section"
    aria-labelledby="interestsTitle"
  >
    <div class="container">

      <header class="section-heading">

        <div>
          <span class="eyebrow">
            موضوعات مورد علاقه
          </span>

          <h2 id="interestsTitle">
            درباره چه چیزهایی می‌نویسم؟
          </h2>
        </div>

      </header>

      <div class="about-interests-grid">

        <article class="about-interest-card">

          <span
            class="interest-number"
            aria-hidden="true"
          >
            ۰۱
          </span>

          <h3>پژوهش و علم</h3>

          <p>
            یادداشت‌هایی درباره پژوهش، تحلیل علمی، فناوری‌های
            جدید و تجربه‌های دانشگاهی.
          </p>

        </article>

        <article class="about-interest-card">

          <span
            class="interest-number"
            aria-hidden="true"
          >
            ۰۲
          </span>

          <h3>یادگیری و مهارت</h3>

          <p>
            تجربه‌هایی درباره یادگیری عمیق، توسعه مهارت و
            ساختن مسیر حرفه‌ای بهتر.
          </p>

        </article>

        <article class="about-interest-card">

          <span
            class="interest-number"
            aria-hidden="true"
          >
            ۰۳
          </span>

          <h3>نوشتن و خلاقیت</h3>

          <p>
            از فرایند نوشتن، تولید محتوا و تبدیل ایده‌های
            خام به روایت‌هایی خواندنی.
          </p>

        </article>

        <article class="about-interest-card">

          <span
            class="interest-number"
            aria-hidden="true"
          >
            ۰۴
          </span>

          <h3>تجربه و زندگی</h3>

          <p>
            روایت‌هایی درباره تصمیم‌ها، شکست‌ها، شروع‌های
            دوباره و درس‌های مسیر زندگی.
          </p>

        </article>

      </div>

    </div>
  </section>

  <!-- =====================================================
       ارزش‌های وبلاگ
       ===================================================== -->

  <section
    class="about-section about-values-section"
    aria-labelledby="valuesTitle"
  >
    <div class="container about-content-grid">

      <header class="about-section-heading">

        <span class="eyebrow">
          چیزی که برایم مهم است
        </span>

        <h2 id="valuesTitle">
          ارزش‌های این وبلاگ
        </h2>

      </header>

      <div class="about-values">

        <article class="about-value">

          <span aria-hidden="true">
            ۰۱
          </span>

          <div>
            <h3>صداقت در روایت</h3>

            <p>
              تلاش می‌کنم تجربه‌ها را بدون اغراق و با تمام
              پیچیدگی‌ها و ابهام‌هایشان روایت کنم.
            </p>
          </div>

        </article>

        <article class="about-value">

          <span aria-hidden="true">
            ۰۲
          </span>

          <div>
            <h3>دقت در محتوا</h3>

            <p>
              مطالب علمی و آموزشی باید روشن، قابل بررسی و
              تا حد امکان متکی بر منابع معتبر باشند.
            </p>
          </div>

        </article>

        <article class="about-value">

          <span aria-hidden="true">
            ۰۳
          </span>

          <div>
            <h3>کاربردی‌بودن</h3>

            <p>
              هر نوشته باید ایده، پرسش یا نکته‌ای ارائه کند
              که خواننده بتواند از آن استفاده کند.
            </p>
          </div>

        </article>

      </div>

    </div>
  </section>

  <!-- =====================================================
       ارتباط با من
       ===================================================== -->

  <section
    class="about-contact-section"
    id="contact"
    aria-labelledby="contactTitle"
  >
    <div class="container">

      <div class="about-contact-card">

        <div class="about-contact-content">

          <span class="eyebrow">
            ارتباط با من
          </span>

          <h2 id="contactTitle">
            خوشحال می‌شوم از شما بشنوم
          </h2>

          <p>
            اگر درباره یکی از نوشته‌ها پرسشی دارید، پیشنهادی
            برای همکاری دارید یا می‌خواهید گفت‌وگویی را شروع
            کنید، از طریق تلگرام، اینستاگرام یا ایمیل با من
            در ارتباط باشید.
          </p>

        </div>

        <div
          class="about-contact-links"
          aria-label="راه‌های ارتباط با نویسنده"
        >

          {% if telegram_link %}
            <a
              class="about-contact-link"
              href="{{ telegram_link }}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ارتباط با {{ author_name }} از طریق تلگرام"
            >
              <span
                class="contact-link-icon"
                aria-hidden="true"
              >
                tg
              </span>

              <span>
                <strong>تلگرام</strong>

                <small>
                  {% if site.telegram_username %}
                    {{ site.telegram_username }}
                  {% else %}
                    ارسال پیام
                  {% endif %}
                </small>
              </span>

              <i aria-hidden="true">←</i>
            </a>
          {% endif %}

          {% if instagram_link %}
            <a
              class="about-contact-link"
              href="{{ instagram_link }}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="مشاهده صفحه اینستاگرام {{ author_name }}"
            >
              <span
                class="contact-link-icon"
                aria-hidden="true"
              >
                in
              </span>

              <span>
                <strong>اینستاگرام</strong>

                <small>
                  {% if site.instagram_username %}
                    {{ site.instagram_username }}
                  {% else %}
                    مشاهده صفحه
                  {% endif %}
                </small>
              </span>

              <i aria-hidden="true">←</i>
            </a>
          {% endif %}

          {% if site.email %}
            <a
              class="about-contact-link"
              href="mailto:{{ site.email | escape }}"
              aria-label="ارسال ایمیل به {{ author_name }}"
            >
              <span
                class="contact-link-icon"
                aria-hidden="true"
              >
                @
              </span>

              <span>
                <strong>ایمیل</strong>

                <small dir="ltr">
                  {{ site.email }}
                </small>
              </span>

              <i aria-hidden="true">←</i>
            </a>
          {% endif %}

        </div>

      </div>

    </div>
  </section>

</main>
