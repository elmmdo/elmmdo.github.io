---
layout: default
title: "درباره من"
description: "درباره نویسنده، زمینه‌های فعالیت، علایق و راه‌های ارتباطی"
permalink: /about/
body_class: about-page

custom_css:
  - /assets/css/about.css
---

{% assign author_name = site.author.name | default: site.title %}
{% assign author_image = site.author.image | default: "/assets/images/uploads/about-author.jpg" %}
{% assign contact_email = site.email | default: site.author.email %}

{% assign instagram_link = site.instagram_url %}
{% if instagram_link == nil or instagram_link == empty %}
  {% if site.instagram_username %}
    {% assign instagram_username = site.instagram_username
      | remove_first: "@"
      | strip
    %}
    {% assign instagram_link = "https://www.instagram.com/"
      | append: instagram_username
    %}
  {% endif %}
{% endif %}

{% assign telegram_link = site.telegram_url %}
{% if telegram_link == nil or telegram_link == empty %}
  {% if site.telegram_username %}
    {% assign telegram_username = site.telegram_username
      | remove_first: "@"
      | strip
    %}
    {% assign telegram_link = "https://t.me/"
      | append: telegram_username
    %}
  {% endif %}
{% endif %}

<div class="about-content">

  <!-- ==========================================
       معرفی اصلی
  =========================================== -->

  <section
    class="about-hero"
    aria-labelledby="about-title"
  >
    <div class="container">

      <div class="about-hero__grid">

        <!-- تصویر نویسنده -->

        <div class="about-hero__media">

          <div class="about-hero__image-wrapper">

            <img
              class="about-hero__image"
              src="{{ author_image | relative_url }}"
              alt="تصویر {{ author_name | escape }}"
              width="640"
              height="760"
              loading="eager"
              decoding="async"
            >

            <span
              class="about-hero__image-decoration"
              aria-hidden="true"
            ></span>

          </div>

        </div>

        <!-- متن معرفی -->

        <div class="about-hero__content">

          <p class="eyebrow">
            درباره من
          </p>

          <h1
            id="about-title"
            class="about-hero__title"
          >
            سلام، من
            <span class="about-hero__name">
              {{ author_name | escape }}
            </span>
            هستم.
          </h1>

          <p class="about-hero__lead">
            پژوهشگر و علاقه‌مند به علم، فناوری، نوشتن و تولید محتوای
            تخصصی هستم. در این وب‌سایت درباره تجربه‌ها، مطالعات،
            پروژه‌ها و موضوعاتی که برایم اهمیت دارند می‌نویسم.
          </p>

          <p class="about-hero__description">
            تمرکز اصلی فعالیت‌های من بر پژوهش‌های علمی و میان‌رشته‌ای،
            فناوری‌های نوین، چاپ سه‌بعدی، هیدروژل‌ها، نانوسلولز و
            انتقال مفاهیم تخصصی به زبانی روشن و قابل‌فهم است.
          </p>

          <!-- شبکه‌های اجتماعی -->

          {% if instagram_link or telegram_link or contact_email %}

            <nav
              class="social-links about-hero__socials"
              aria-label="راه‌های ارتباطی"
            >

              {% if instagram_link %}

                <a
                  class="social-link"
                  href="{{ instagram_link | escape }}"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="مشاهده صفحه اینستاگرام {{ author_name | escape }}"
                  title="اینستاگرام"
                >
                  <span aria-hidden="true">
                    Instagram
                  </span>
                </a>

              {% endif %}

              {% if telegram_link %}

                <a
                  class="social-link"
                  href="{{ telegram_link | escape }}"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ارتباط با {{ author_name | escape }} در تلگرام"
                  title="تلگرام"
                >
                  <span aria-hidden="true">
                    Telegram
                  </span>
                </a>

              {% endif %}

              {% if contact_email %}

                <a
                  class="social-link"
                  href="mailto:{{ contact_email | strip | escape }}"
                  aria-label="ارسال ایمیل به {{ author_name | escape }}"
                  title="ایمیل"
                >
                  <span aria-hidden="true">
                    Email
                  </span>
                </a>

              {% endif %}

            </nav>

          {% endif %}

        </div>

      </div>

    </div>
  </section>

  <!-- ==========================================
       داستان و مسیر من
  =========================================== -->

  <section
    class="about-section about-story"
    aria-labelledby="about-story-title"
  >
    <div class="container">

      <header class="section-heading">

        <p class="eyebrow">
          داستان من
        </p>

        <h2
          id="about-story-title"
          class="section-heading__title"
        >
          پژوهش، یادگیری و روایت تجربه‌ها
        </h2>

      </header>

      <div class="about-story__grid">

        <div class="about-story__intro">

          <p class="about-story__highlight">
            برای من، پژوهش فقط یافتن پاسخ نیست؛ بلکه فرایندی برای
            طرح پرسش‌های بهتر، تجربه‌کردن و به‌اشتراک‌گذاشتن دانشی
            است که در این مسیر به دست می‌آید.
          </p>

        </div>

        <div class="about-story__content">

          <p>
            علاقه من به علم و فناوری از جایی آغاز شد که متوجه شدم
            بسیاری از مسائل پیچیده را می‌توان با ترکیب دانش،
            خلاقیت و تجربه عملی به راه‌حل‌هایی کاربردی تبدیل کرد.
          </p>

          <p>
            بخش مهمی از فعالیت‌های من به مطالعه و پژوهش در زمینه
            مواد پیشرفته، چاپ سه‌بعدی، هیدروژل‌ها و نانوسلولز
            اختصاص دارد. در کنار آن، به نگارش علمی، ترجمه تخصصی
            و انتقال روشن مفاهیم پیچیده نیز علاقه‌مندم.
          </p>

          <p>
            این وب‌سایت فضایی برای ثبت آموخته‌ها، معرفی پروژه‌ها،
            انتشار یادداشت‌ها و ارائه محتوایی است که شاید برای
            پژوهشگران، دانشجویان و دیگر علاقه‌مندان مفید باشد.
          </p>

        </div>

      </div>

    </div>
  </section>

  <!-- ==========================================
       زمینه‌های فعالیت
  =========================================== -->

  <section
    class="about-section about-expertise"
    aria-labelledby="expertise-title"
  >
    <div class="container">

      <header class="section-heading">

        <p class="eyebrow">
          زمینه‌های فعالیت
        </p>

        <h2
          id="expertise-title"
          class="section-heading__title"
        >
          موضوعاتی که روی آن‌ها کار می‌کنم
        </h2>

        <p class="section-heading__description">
          فعالیت‌ها و مطالعات من مجموعه‌ای از پژوهش علمی،
          فناوری، نگارش و تولید محتوای تخصصی را شامل می‌شود.
        </p>

      </header>

      <div class="about-expertise__grid">

        <!-- چاپ سه‌بعدی -->

        <article class="expertise-card">

          <span
            class="expertise-card__number"
            aria-hidden="true"
          >
            ۰۱
          </span>

          <h3 class="expertise-card__title">
            چاپ سه‌بعدی و DIW
          </h3>

          <p class="expertise-card__description">
            مطالعه فرمولاسیون جوهرهای قابل چاپ، رفتار رئولوژیکی
            مواد و فرایند چاپ سه‌بعدی به روش نوشتن مستقیم جوهر.
          </p>

        </article>

        <!-- هیدروژل -->

        <article class="expertise-card">

          <span
            class="expertise-card__number"
            aria-hidden="true"
          >
            ۰۲
          </span>

          <h3 class="expertise-card__title">
            هیدروژل‌ها
          </h3>

          <p class="expertise-card__description">
            بررسی ساختار، خواص مکانیکی، شبکه‌ای‌شدن و کاربردهای
            هیدروژل‌ها در سامانه‌های مهندسی و زیستی.
          </p>

        </article>

        <!-- نانوسلولز -->

        <article class="expertise-card">

          <span
            class="expertise-card__number"
            aria-hidden="true"
          >
            ۰۳
          </span>

          <h3 class="expertise-card__title">
            نانوسلولز
          </h3>

          <p class="expertise-card__description">
            استفاده از نانوفیبر سلولزی و نانوکریستال سلولزی برای
            اصلاح خواص رئولوژیکی، مکانیکی و ساختاری مواد.
          </p>

        </article>

        <!-- نگارش علمی -->

        <article class="expertise-card">

          <span
            class="expertise-card__number"
            aria-hidden="true"
          >
            ۰۴
          </span>

          <h3 class="expertise-card__title">
            نگارش و ارتباطات علمی
          </h3>

          <p class="expertise-card__description">
            نگارش، ترجمه و بازنویسی متون تخصصی با تمرکز بر
            دقت علمی، ساختار مناسب و انتقال شفاف مفاهیم.
          </p>

        </article>

      </div>

    </div>
  </section>

  <!-- ==========================================
       ارزش‌ها و رویکرد کاری
  =========================================== -->

  <section
    class="about-section about-values"
    aria-labelledby="values-title"
  >
    <div class="container">

      <div class="about-values__layout">

        <header class="section-heading">

          <p class="eyebrow">
            رویکرد من
          </p>

          <h2
            id="values-title"
            class="section-heading__title"
          >
            اصولی که در کار دنبال می‌کنم
          </h2>

          <p class="section-heading__description">
            کیفیت یک پروژه فقط به نتیجه نهایی وابسته نیست؛
            بلکه روش رسیدن به آن نتیجه نیز اهمیت دارد.
          </p>

        </header>

        <div class="about-values__list">

          <article class="value-item">

            <span
              class="value-item__marker"
              aria-hidden="true"
            ></span>

            <div class="value-item__content">

              <h3 class="value-item__title">
                دقت علمی
              </h3>

              <p class="value-item__description">
                استفاده از منابع معتبر، بررسی دقیق داده‌ها و
                پرهیز از ساده‌سازی‌هایی که معنای علمی را تغییر می‌دهند.
              </p>

            </div>

          </article>

          <article class="value-item">

            <span
              class="value-item__marker"
              aria-hidden="true"
            ></span>

            <div class="value-item__content">

              <h3 class="value-item__title">
                یادگیری مستمر
              </h3>

              <p class="value-item__description">
                به‌روزماندن، پرسیدن، آزمایش‌کردن و پذیرفتن اینکه
                همیشه موضوع تازه‌ای برای آموختن وجود دارد.
              </p>

            </div>

          </article>

          <article class="value-item">

            <span
              class="value-item__marker"
              aria-hidden="true"
            ></span>

            <div class="value-item__content">

              <h3 class="value-item__title">
                بیان روشن
              </h3>

              <p class="value-item__description">
                تبدیل مطالب تخصصی و پیچیده به محتوایی منظم،
                دقیق و قابل‌فهم، بدون از دست‌رفتن مفهوم اصلی.
              </p>

            </div>

          </article>

        </div>

      </div>

    </div>
  </section>

  <!-- ==========================================
       نقل‌قول
  =========================================== -->

  <section
    class="about-section about-quote"
    aria-label="دیدگاه شخصی"
  >
    <div class="container">

      <figure class="about-quote__box">

        <blockquote class="about-quote__text">

          <p>
            «دانش زمانی ارزش بیشتری پیدا می‌کند که بتوان آن را
            با دقت آموخت، با تجربه آزمود و به زبانی روشن با
            دیگران به اشتراک گذاشت.»
          </p>

        </blockquote>

        <figcaption class="about-quote__caption">
          {{ author_name | escape }}
        </figcaption>

      </figure>

    </div>
  </section>

  <!-- ==========================================
       دعوت به ارتباط
  =========================================== -->

  <section
    id="contact"
    class="about-section about-contact"
    aria-labelledby="contact-title"
  >
    <div class="container">

      <div class="about-contact__box">

        <div class="about-contact__content">

          <p class="eyebrow">
            ارتباط با من
          </p>

          <h2
            id="contact-title"
            class="about-contact__title"
          >
            درباره یک ایده یا پروژه صحبت کنیم
          </h2>

          <p class="about-contact__description">
            اگر درباره موضوعات پژوهشی، همکاری علمی، نگارش تخصصی
            یا محتوای این وب‌سایت پرسشی دارید، می‌توانید از طریق
            ایمیل یا شبکه‌های اجتماعی با من در ارتباط باشید.
          </p>

        </div>

        <div class="about-contact__actions">

          {% if contact_email %}

            <a
              class="about-button about-button--primary"
              href="mailto:{{ contact_email | strip | escape }}"
            >
              ارسال ایمیل
            </a>

          {% endif %}

          {% if telegram_link %}

            <a
              class="about-button about-button--secondary"
              href="{{ telegram_link | escape }}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ارتباط در تلگرام
            </a>

          {% endif %}

          <a
            class="about-button about-button--secondary"
            href="{{ '/' | relative_url }}"
          >
            بازگشت به صفحه اصلی
          </a>

        </div>

      </div>

    </div>
  </section>

</div>
