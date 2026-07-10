---
layout: default
title: خانه
description: "آخرین یادداشت‌ها، پژوهش‌ها و نوشته‌های وبلاگ"
---

{% assign featured_post = site.posts | first %}
{% assign secondary_posts = site.posts | slice: 1, 2 %}
{% assign latest_posts = site.posts | slice: 3, 6 %}

<section class="home-hero">
  <div class="container">
    <div class="home-hero__grid">
      <div class="home-hero__content" data-reveal>
        <span class="home-hero__kicker">وبلاگ فارسی مدرن</span>

        <h1>
          روایت‌هایی دربارهٔ
          <span>یادگیری، تجربه و زندگی دیجیتال</span>
        </h1>

        <p>
          اینجا دربارهٔ چیزهایی می‌نویسم که می‌آموزم، تجربه می‌کنم و ارزش ثبت شدن دارند؛
          از یادداشت‌های شخصی تا پژوهش‌ها و مسیرهای فکری.
        </p>

        <div class="home-hero__actions">
          <a class="btn btn--primary" href="{{ '/archive/' | relative_url }}">
            مشاهده نوشته‌ها
            <span aria-hidden="true">←</span>
          </a>

          <a class="btn btn--ghost" href="{{ '/about/' | relative_url }}">
            درباره من
          </a>
        </div>

        <div class="home-hero__stats">
          <div>
            <strong>{{ site.posts | size }}</strong>
            <span>نوشته</span>
          </div>

          <div>
            <strong>{{ site.categories | size }}</strong>
            <span>دسته‌بندی</span>
          </div>

          <div>
            <strong>{{ site.tags | size }}</strong>
            <span>برچسب</span>
          </div>
        </div>
      </div>

      <div class="home-hero__visual" data-reveal>
        {% if featured_post and featured_post.image %}
          <img
            src="{{ featured_post.image | relative_url }}"
            alt="{{ featured_post.image_alt | default: featured_post.title | escape }}"
            loading="eager"
          >
        {% else %}
          <div class="home-hero__placeholder">
            <span>{{ site.title | slice: 0 }}</span>
          </div>
        {% endif %}

        <div class="home-hero__badge">
          <span>تازه‌ترین</span>
          {% if featured_post %}
            <strong>{{ featured_post.title | truncate: 42 }}</strong>
          {% else %}
            <strong>نوشته‌های وبلاگ</strong>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
</section>

{% if featured_post %}
  <section class="magazine-section">
    <div class="container">
      <div class="section-heading section-heading--center" data-reveal>
        <span class="section-kicker">پیشنهاد سردبیر</span>
        <h2>تازه‌ترین نوشته</h2>
        <p>آخرین مطلب منتشرشده در وبلاگ</p>
      </div>

      <article class="editor-card" data-reveal>
        <a class="editor-card__image" href="{{ featured_post.url | relative_url }}">
          {% if featured_post.image %}
            <img
              src="{{ featured_post.image | relative_url }}"
              alt="{{ featured_post.image_alt | default: featured_post.title | escape }}"
              loading="eager"
            >
          {% else %}
            <div class="image-placeholder">
              <span>01</span>
            </div>
          {% endif %}

          {% if featured_post.categories and featured_post.categories.size > 0 %}
            <span class="vertical-label">{{ featured_post.categories | first }}</span>
          {% else %}
            <span class="vertical-label">یادداشت</span>
          {% endif %}
        </a>

        <div class="editor-card__content">
          <div class="post-meta">
            <time datetime="{{ featured_post.date | date_to_xmlschema }}">
              {{ featured_post.date | date: "%Y/%m/%d" }}
            </time>

            {% assign featured_words = featured_post.content | strip_html | number_of_words %}
            {% assign featured_reading_time = featured_words | divided_by: 180 | plus: 1 %}

            <span>{{ featured_reading_time }} دقیقه مطالعه</span>
          </div>

          <h3>
            <a href="{{ featured_post.url | relative_url }}">
              {{ featured_post.title }}
            </a>
          </h3>

          <p>
            {{ featured_post.description
               | default: featured_post.excerpt
               | strip_html
               | strip_newlines
               | truncate: 210 }}
          </p>

          <a class="read-more" href="{{ featured_post.url | relative_url }}">
            خواندن نوشته
            <span aria-hidden="true">←</span>
          </a>
        </div>
      </article>
    </div>
  </section>
{% endif %}

<section class="magazine-section">
  <div class="container">
    <div class="section-heading" data-reveal>
      <div>
        <span class="section-kicker">منتخب‌ها</span>
        <h2>مطالب پیشنهادی</h2>
      </div>

      <a class="section-link" href="{{ '/archive/' | relative_url }}">
        مشاهده همه
        <span aria-hidden="true">←</span>
      </a>
    </div>

    {% if secondary_posts.size > 0 %}
      <div class="spotlight-grid">
        {% for post in secondary_posts %}
          <article class="spotlight-card" data-reveal>
            <a class="spotlight-card__image" href="{{ post.url | relative_url }}">
              {% if post.image %}
                <img
                  src="{{ post.image | relative_url }}"
                  alt="{{ post.image_alt | default: post.title | escape }}"
                  loading="lazy"
                >
              {% else %}
                <div class="image-placeholder">
                  <span>0{{ forloop.index | plus: 1 }}</span>
                </div>
              {% endif %}

              {% if post.categories and post.categories.size > 0 %}
                <span class="vertical-label">{{ post.categories | first }}</span>
              {% else %}
                <span class="vertical-label">وبلاگ</span>
              {% endif %}
            </a>

            <div class="spotlight-card__body">
              <div class="post-meta">
                <time datetime="{{ post.date | date_to_xmlschema }}">
                  {{ post.date | date: "%Y/%m/%d" }}
                </time>

                {% assign words = post.content | strip_html | number_of_words %}
                {% assign reading_time = words | divided_by: 180 | plus: 1 %}

                <span>{{ reading_time }} دقیقه مطالعه</span>
              </div>

              <h3>
                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
              </h3>

              <p>
                {{ post.description
                   | default: post.excerpt
                   | strip_html
                   | strip_newlines
                   | truncate: 130 }}
              </p>

              <a class="read-more" href="{{ post.url | relative_url }}">
                ادامه مطلب
                <span aria-hidden="true">←</span>
              </a>
            </div>
          </article>
        {% endfor %}
      </div>
    {% else %}
      <div class="empty-state" data-reveal>
        <span>✦</span>
        <h3>مطالب بیشتری در راه است</h3>
        <p>بعد از انتشار نوشته‌های بیشتر، این بخش خودکار تکمیل می‌شود.</p>
      </div>
    {% endif %}
  </div>
</section>

<section class="magazine-section magazine-section--soft">
  <div class="container">
    <div class="section-heading section-heading--center" data-reveal>
      <span class="section-kicker">آخرین نوشته‌ها</span>
      <h2>تازه‌ترین مطالب وبلاگ</h2>
      <p>مروری سریع بر جدیدترین نوشته‌های منتشرشده</p>
    </div>

    {% if latest_posts.size > 0 %}
      <div class="post-grid post-grid--magazine">
        {% for post in latest_posts %}
          <article class="post-card" data-reveal>
            <a class="post-card__image" href="{{ post.url | relative_url }}">
              {% if post.image %}
                <img
                  src="{{ post.image | relative_url }}"
                  alt="{{ post.image_alt | default: post.title | escape }}"
                  loading="lazy"
                >
              {% else %}
                <div class="image-placeholder">
                  <span>{{ forloop.index | plus: 3 }}</span>
                </div>
              {% endif %}

              {% if post.categories and post.categories.size > 0 %}
                <span class="post-card__category">{{ post.categories | first }}</span>
              {% endif %}
            </a>

            <div class="post-card__body">
              <div class="post-meta">
                <time datetime="{{ post.date | date_to_xmlschema }}">
                  {{ post.date | date: "%Y/%m/%d" }}
                </time>

                {% assign words = post.content | strip_html | number_of_words %}
                {% assign reading_time = words | divided_by: 180 | plus: 1 %}

                <span>{{ reading_time }} دقیقه</span>
              </div>

              <h3>
                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
              </h3>

              <p>
                {{ post.description
                   | default: post.excerpt
                   | strip_html
                   | strip_newlines
                   | truncate: 115 }}
              </p>
            </div>
          </article>
        {% endfor %}
      </div>
    {% elsif site.posts.size > 0 %}
      <div class="empty-state" data-reveal>
        <span>✍</span>
        <h3>نوشته‌های بیشتری منتشر خواهد شد</h3>
        <p>فعلاً تازه‌ترین نوشته در بخش بالایی نمایش داده شده است.</p>
      </div>
    {% else %}
      <div class="empty-state" data-reveal>
        <span>✍</span>
        <h3>هنوز نوشته‌ای منتشر نشده است</h3>
        <p>پس از انتشار اولین نوشته، صفحه اصلی به‌صورت خودکار تکمیل می‌شود.</p>
      </div>
    {% endif %}
  </div>
</section>

<section class="newsletter-block">
  <div class="container">
    <div class="newsletter-card" data-reveal>
      <div>
        <span class="section-kicker">همراه وبلاگ بمانید</span>
        <h2>برای خواندن مطالب بیشتر آماده‌ای؟</h2>
        <p>
          از آرشیو، دسته‌بندی‌ها و برچسب‌ها می‌توانی مسیر مطالعهٔ خودت را پیدا کنی.
        </p>
      </div>

      <div class="newsletter-card__actions">
        <a class="btn btn--primary" href="{{ '/categories/' | relative_url }}">
          مشاهده دسته‌بندی‌ها
        </a>

        <a class="btn btn--ghost" href="{{ '/search/' | relative_url }}">
          جست‌وجو
        </a>
      </div>
    </div>
  </div>
</section>
