---
layout: default
title: خانه
---

<section class="hero">
  <div class="hero-content">
    <p class="eyebrow">وبلاگ شخصی</p>

    <h1>سلام، به وبلاگ من خوش آمدید</h1>

    <p class="hero-text">
      اینجا درباره یادداشت‌ها، تجربه‌ها، پژوهش‌ها و چیزهایی که یاد می‌گیرم می‌نویسم.
    </p>

    <div class="hero-actions">
      <a class="btn primary" href="{{ '/archive/' | relative_url }}">مشاهده نوشته‌ها</a>
      <a class="btn secondary" href="{{ '/about/' | relative_url }}">درباره من</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="section-title">
    <h2>آخرین نوشته‌ها</h2>
    <p>جدیدترین مطالب منتشرشده در وبلاگ</p>
  </div>

  <div class="post-grid">
    {% for post in site.posts limit:6 %}
      <article class="post-card">
        <a href="{{ post.url | relative_url }}">
          <h3>{{ post.title }}</h3>
        </a>

        <div class="card-meta">
          <span>{{ post.date | date: "%Y/%m/%d" }}</span>
        </div>

        {% if post.excerpt %}
          <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
        {% endif %}

        <a class="read-more" href="{{ post.url | relative_url }}">ادامه مطلب ←</a>
      </article>
    {% endfor %}
  </div>
</section>
