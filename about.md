---
layout: default
title: "درباره من"
description: "درباره نویسنده روایت، مسیر شخصی، علایق و راه‌های ارتباطی"
permalink: /about/
---

<main class="about-page">

  <section class="about-hero">
    <div class="container about-hero-grid">

      <div class="about-hero-content">

        <span class="eyebrow">
          درباره من
        </span>

        <h1>
          سلام؛ من پشت این روایت‌ها هستم.
        </h1>

        <p class="about-lead">
          اینجا درباره تجربه‌ها، آموخته‌ها و چیزهایی می‌نویسم
          که در مسیر زندگی و یادگیری با آن‌ها روبه‌رو می‌شوم.
        </p>

        <div class="about-actions">

          <a
            class="button button-primary"
            href="{{ '/' | relative_url }}#articles"
          >
            مشاهده نوشته‌ها
          </a>

          <a
            class="button button-secondary"
            href="#contact"
          >
            ارتباط با من
          </a>

        </div>

      </div>

      <figure class="about-portrait">

        <img
          src="{{ '/assets/images/author.jpg' | relative_url }}"
          alt="تصویر نویسنده وبلاگ روایت"
          width="700"
          height="850"
          loading="eager"
        >

        <figcaption>
          نویسنده و سازنده وبلاگ روایت
        </figcaption>

      </figure>

    </div>
  </section>

  <section class="about-story">
    <div class="container about-content-grid">

      <article class="about-main-content">

        <span class="eyebrow">
          داستان این وبلاگ
        </span>

        <h2>
          روایت، جایی برای ثبت تجربه‌هاست
        </h2>

        <p>
          همیشه بخشی از آموخته‌های ما در میان شتاب زندگی فراموش
          می‌شوند. این وبلاگ را ساختم تا تجربه‌ها، ایده‌ها و
          آموخته‌هایی را که برایم ارزشمند هستند ثبت کنم.
        </p>

        <p>
          مطالب اینجا حاصل تجربه شخصی، مطالعه، آزمون‌وخطا و
          کنجکاوی‌اند. هدفم ارائه پاسخ قطعی نیست؛ بلکه می‌خواهم
          مسیر یادگیری و نگاه خودم را با دیگران به اشتراک بگذارم.
        </p>

        <blockquote>
          <p>
            نوشتن برای من راهی است برای دقیق‌تر دیدن،
            بهتر فهمیدن و فراموش نکردن.
          </p>
        </blockquote>

        <h2>
          درباره چه موضوعاتی می‌نویسم؟
        </h2>

        <div class="about-topics">

          <article class="about-topic-card">
            <span aria-hidden="true">۰۱</span>

            <h3>تجربه‌ها</h3>

            <p>
              روایت مسیرها، تصمیم‌ها، موفقیت‌ها و اشتباه‌هایی
              که می‌توان از آن‌ها چیزی آموخت.
            </p>
          </article>

          <article class="about-topic-card">
            <span aria-hidden="true">۰۲</span>

            <h3>یادگیری</h3>

            <p>
              یادداشت‌هایی درباره مطالعه، تمرکز، مهارت‌آموزی
              و ساختن یک فرایند یادگیری پایدار.
            </p>
          </article>

          <article class="about-topic-card">
            <span aria-hidden="true">۰۳</span>

            <h3>زندگی آگاهانه</h3>

            <p>
              فکرهایی درباره سادگی، توجه، انتخاب‌های روزمره
              و داشتن زندگی معنادارتر.
            </p>
          </article>

        </div>

      </article>

      <aside class="about-sidebar">

        <div class="about-sidebar-card">

          <span class="eyebrow">
            خلاصه
          </span>

          <h2>
            چند نکته درباره من
          </h2>

          <ul>
            <li>
              علاقه‌مند به یادگیری و تجربه‌کردن
            </li>

            <li>
              در حال ثبت مسیر شخصی و حرفه‌ای
            </li>

            <li>
              دوستدار نوشتن، تحقیق و ساختن
            </li>

            <li>
              معتقد به یادگیری از آزمون‌وخطا
            </li>
          </ul>

        </div>

        <div class="about-sidebar-card">

          <span class="eyebrow">
            شبکه‌های اجتماعی
          </span>

          <h2>
            من را دنبال کنید
          </h2>

          <div class="about-social-links">

            <a
              href="{{ site.instagram_url | default: 'https://instagram.com/' }}"
              target="_blank"
              rel="noopener noreferrer"
            >
              اینستاگرام
              <span aria-hidden="true">←</span>
            </a>

            <a
              href="{{ site.telegram_url | default: 'https://t.me/' }}"
              target="_blank"
              rel="noopener noreferrer"
            >
              تلگرام
              <span aria-hidden="true">←</span>
            </a>

          </div>

        </div>

      </aside>

    </div>
  </section>

  <section class="contact-section" id="contact">

    <div class="container">

      <div class="contact-box">

        <div>

          <span class="eyebrow">
            ارتباط با من
          </span>

          <h2>
            پیشنهادی دارید یا می‌خواهید گفت‌وگو کنیم؟
          </h2>

          <p>
            برای ارسال نظر، پیشنهاد یا شروع یک گفت‌وگو می‌توانید
            از طریق ایمیل یا شبکه‌های اجتماعی با من در ارتباط باشید.
          </p>

        </div>

        <a
          class="button button-primary"
          href="mailto:{{ site.email | default: 'hello@example.com' }}"
        >
          ارسال ایمیل
        </a>

      </div>

    </div>

  </section>

</main>
