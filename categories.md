---
layout: default
title: موضوعات
permalink: /categories/
---

<section class="page-heading">
  <h1>موضوعات</h1>
  <p>نوشته‌ها بر اساس دسته‌بندی</p>
</section>

<section class="category-list">
  {% assign categories = site.categories | sort %}

  {% for category in categories %}
    {% assign category_name = category[0] %}
    {% assign posts = category[1] %}

    <div class="category-block">
      <h2>{{ category_name }}</h2>

      <ul>
        {% for post in posts %}
          <li>
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            <time>{{ post.date | date: "%Y/%m/%d" }}</time>
          </li>
        {% endfor %}
      </ul>
    </div>
  {% endfor %}
</section>
