---
layout: default
title: خانه
---

<section class="hero">
  <h1>سلام، من [نام شما] هستم</h1>
  <p>
    اینجا درباره پژوهش‌ها، یادداشت‌ها و تجربه‌های شخصی‌ام می‌نویسم.
  </p>
</section>

<section class="intro">
  <h2>درباره این وبلاگ</h2>
  <p>
    در این وبلاگ می‌توانید نوشته‌هایی درباره علم، فناوری، آموزش و تجربه‌های من بخوانید.
  </p>
</section>

<section class="latest-posts">
  <h2>آخرین نوشته‌ها</h2>

  <ul>
    {% for post in site.posts limit:5 %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <span>{{ post.date | date: "%Y/%m/%d" }}</span>
      </li>
    {% endfor %}
  </ul>
</section>
.
