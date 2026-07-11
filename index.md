---
layout: default
title: روایت — تجربه‌ها، یادداشت‌ها و آموخته‌ها
description: روایت؛ وبلاگ شخصی درباره تجربه‌ها، یادداشت‌ها، یادگیری و زندگی آگاهانه.
permalink: /
---

{% assign published_posts = site.posts
  | where_exp: "post", "post.published != false"
%}

{% assign hero_post = nil %}

{% for post in published_posts %}
  {% if post.featured == true %}
    {% assign hero_post = post %}
    {% break %}
  {% endif %}
{% endfor %}

{% unless hero_post %}
  {% assign hero_post = published_posts.first %}
{% endunless %}

<main id="home">

  <section class="hero-section" aria-labelledby="heroTitle">
    <div class="container">

      <div class="hero-intro">

        <div>
          <span class="eyebrow">وبلاگی برای ثبت مسیر</span>

          <h1 id="heroTitle">
            هر تجربه،
            <span>روایتی برای آموختن</span>
          </h1>
        </div>

        <p>
          اینجا از تجربه‌های واقعی، آموخته‌های شخصی، مسیر ساختن،
          شکست‌خوردن و دوباره آغازکردن می‌نویسم.
        </p>

      </div>

      <div class="hero-layout">

        <div id="heroPost">

          {% if hero_post %}

            {% assign hero_category = hero_post.category | default: "experience" %}
            {% assign hero_image = hero_post.image
              | default: "/images/post-placeholder.jpg"
            %}

            {% case hero_category %}
              {% when "experience" %}
                {% assign hero_category_label = "تجربه" %}
                {% assign hero_category_class = "category-green" %}
              {% when "notes" %}
                {% assign hero_category_label = "یادداشت" %}
                {% assign hero_category_class = "category-purple" %}
              {% when "tutorial" %}
                {% assign hero_category_label = "آموزش" %}
                {% assign hero_category_class = "category-blue" %}
              {% when "learning" %}
                {% assign hero_category_label = "یادگیری" %}
                {% assign hero_category_class = "category-orange" %}
              {% when "life" %}
                {% assign hero_category_label = "زندگی" %}
                {% assign hero_category_class = "category-green" %}
              {% else %}
                {% assign hero_category_label = "مقاله" %}
                {% assign hero_category_class = "category-green" %}
            {% endcase %}

            <article
              class="hero-card"
              data-article
              data-category="{{ hero_category | escape }}"
              data-searchable="{{ hero_post.title | escape }} {{ hero_post.excerpt | strip_html | escape }} {{ hero_post.tags | join: ' ' | escape }}"
            >
              <a
                class="hero-media"
                href="{{ hero_post.url | relative_url }}"
                aria-label="خواندن مقاله {{ hero_post.title | escape }}"
              >
                <img
                  src="{{ hero_image | relative_url }}"
                  alt="{{ hero_post.title | escape }}"
                  width="1400"
                  height="900"
                  fetchpriority="high"
                >

                <span class="image-badge">روایت ویژه</span>
              </a>

              <div class="hero-content">

                <div class="post-meta">
                  <a
                    class="category {{ hero_category_class }}"
                    href="{{ '/category/' | relative_url }}?name={{ hero_category | url_encode }}"
                  >
                    {{ hero_category_label }}
                  </a>

                  <span>
                    {{ hero_post.reading_time | default: "۵ دقیقه مطالعه" }}
                  </span>
                </div>

                <h2>
                  <a href="{{ hero_post.url | relative_url }}">
                    {{ hero_post.title | default: "بدون عنوان" }}
                  </a>
                </h2>

                {% if hero_post.excerpt %}
                  <p>{{ hero_post.excerpt | strip_html | truncatewords: 32 }}</p>
                {% endif %}

                <div class="author-row">

                  {% if hero_post.author_image %}
                    <img
                      src="{{ hero_post.author_image | relative_url }}"
                      alt="تصویر {{ hero_post.author | default: 'نویسنده روایت' | escape }}"
                      width="100"
                      height="100"
                    >
                  {% else %}
                    <img
                      src="https://i.pravatar.cc/80?img=11"
                      alt="تصویر نویسنده روایت"
                      width="100"
                      height="100"
                    >
                  {% endif %}

                  <div>
                    <strong>
                      {{ hero_post.author | default: "نویسنده روایت" }}
                    </strong>

                    <span>
                      <time datetime="{{ hero_post.date | date_to_xmlschema }}">
                        {% if hero_post.display_date %}
                          {{ hero_post.display_date }}
                        {% else %}
                          {{ hero_post.date | date: "%Y/%m/%d" }}
                        {% endif %}
                      </time>
                    </span>
                  </div>

                </div>

              </div>
            </article>

          {% else %}

            <div class="empty-state">
              <p>هنوز مقاله‌ای منتشر نشده است.</p>
            </div>

          {% endif %}

        </div>

        <div class="hero-side-list" id="heroSidePosts">

          {% assign side_post_count = 0 %}

          {% for post in published_posts %}

            {% if post.url != hero_post.url and side_post_count < 3 %}

              {% assign side_post_count = side_post_count | plus: 1 %}
              {% assign post_category = post.category | default: "experience" %}
              {% assign post_image = post.image
                | default: "/images/post-placeholder.jpg"
              %}

              {% case post_category %}
                {% when "experience" %}
                  {% assign category_label = "تجربه" %}
                  {% assign category_class = "category-green" %}
                {% when "notes" %}
                  {% assign category_label = "یادداشت" %}
                  {% assign category_class = "category-purple" %}
                {% when "tutorial" %}
                  {% assign category_label = "آموزش" %}
                  {% assign category_class = "category-blue" %}
                {% when "learning" %}
                  {% assign category_label = "یادگیری" %}
                  {% assign category_class = "category-orange" %}
                {% when "life" %}
                  {% assign category_label = "زندگی" %}
                  {% assign category_class = "category-green" %}
                {% else %}
                  {% assign category_label = "مقاله" %}
                  {% assign category_class = "category-green" %}
              {% endcase %}

              <article
                class="side-card"
                data-article
                data-category="{{ post_category | escape }}"
                data-searchable="{{ post.title | escape }} {{ post.excerpt | strip_html | escape }} {{ post.tags | join: ' ' | escape }}"
              >
                <a
                  class="side-card-image"
                  href="{{ post.url | relative_url }}"
                >
                  <img
                    src="{{ post_image | relative_url }}"
                    alt="{{ post.title | escape }}"
                    width="900"
                    height="650"
                    loading="lazy"
                  >
                </a>

                <div class="side-card-content">

                  <div class="post-meta">
                    <a
                      class="category {{ category_class }}"
                      href="{{ '/category/' | relative_url }}?name={{ post_category | url_encode }}"
                    >
                      {{ category_label }}
                    </a>

                    <span>
                      {{ post.reading_time | default: "۵ دقیقه" }}
                    </span>
                  </div>

                  <h3>
                    <a href="{{ post.url | relative_url }}">
                      {{ post.title | default: "بدون عنوان" }}
                    </a>
                  </h3>

                  <span class="post-date">
                    <time datetime="{{ post.date | date_to_xmlschema }}">
                      {% if post.display_date %}
                        {{ post.display_date }}
                      {% else %}
                        {{ post.date | date: "%Y/%m/%d" }}
                      {% endif %}
                    </time>
                  </span>

                </div>
              </article>

            {% endif %}

          {% endfor %}

        </div>

      </div>

    </div>
  </section>

  <section
    class="section featured-section"
    id="experiences"
    aria-labelledby="featuredTitle"
  >
    <div class="container">

      <div class="section-heading">

        <div>
          <span class="eyebrow">پیشنهادهای من</span>
          <h2 id="featuredTitle">انتخاب نویسنده</h2>
        </div>

        <a class="text-link" href="#articles">
          مشاهده همه
          <span aria-hidden="true">←</span>
        </a>

      </div>

      <div class="featured-grid" id="featuredPosts">

        {% assign featured_count = 0 %}

        {% for post in published_posts %}

          {% if post.editor_choice == true or post.editorChoice == true or post.featured == true %}

            {% if featured_count < 3 %}

              {% assign featured_count = featured_count | plus: 1 %}
              {% assign post_category = post.category | default: "experience" %}
              {% assign post_image = post.image
                | default: "/images/post-placeholder.jpg"
              %}

              {% case post_category %}
                {% when "experience" %}
                  {% assign category_label = "تجربه" %}
                  {% assign category_class = "category-green" %}
                {% when "notes" %}
                  {% assign category_label = "یادداشت" %}
                  {% assign category_class = "category-purple" %}
                {% when "tutorial" %}
                  {% assign category_label = "آموزش" %}
                  {% assign category_class = "category-blue" %}
                {% when "learning" %}
                  {% assign category_label = "یادگیری" %}
                  {% assign category_class = "category-orange" %}
                {% when "life" %}
                  {% assign category_label = "زندگی" %}
                  {% assign category_class = "category-green" %}
                {% else %}
                  {% assign category_label = "مقاله" %}
                  {% assign category_class = "category-green" %}
              {% endcase %}

              <article
                class="post-card"
                data-article
                data-category="{{ post_category | escape }}"
                data-searchable="{{ post.title | escape }} {{ post.excerpt | strip_html | escape }} {{ post.tags | join: ' ' | escape }}"
              >
                <a
                  class="post-card-image"
                  href="{{ post.url | relative_url }}"
                >
                  <img
                    src="{{ post_image | relative_url }}"
                    alt="{{ post.title | escape }}"
                    width="1000"
                    height="700"
                    loading="lazy"
                  >
                </a>

                <div class="post-card-body">

                  <div class="post-meta">
                    <a
                      class="category {{ category_class }}"
                      href="{{ '/category/' | relative_url }}?name={{ post_category | url_encode }}"
                    >
                      {{ category_label }}
                    </a>

                    <span>
                      {{ post.reading_time | default: "۵ دقیقه مطالعه" }}
                    </span>
                  </div>

                  <h3>
                    <a href="{{ post.url | relative_url }}">
                      {{ post.title | default: "بدون عنوان" }}
                    </a>
                  </h3>

                  {% if post.excerpt %}
                    <p>{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
                  {% endif %}

                  <div class="post-card-footer">

                    <div class="mini-author">

                      {% if post.author_image %}
                        <img
                          src="{{ post.author_image | relative_url }}"
                          alt=""
                          width="80"
                          height="80"
                          loading="lazy"
                        >
                      {% else %}
                        <img
                          src="https://i.pravatar.cc/80?img=11"
                          alt=""
                          width="80"
                          height="80"
                          loading="lazy"
                        >
                      {% endif %}

                      <span>
                        {{ post.author | default: "نویسنده روایت" }}
                      </span>
                    </div>

                    <time datetime="{{ post.date | date_to_xmlschema }}">
                      {% if post.display_date %}
                        {{ post.display_date }}
                      {% else %}
                        {{ post.date | date: "%Y/%m/%d" }}
                      {% endif %}
                    </time>

                  </div>

                </div>
              </article>

            {% endif %}

          {% endif %}

        {% endfor %}

        {% if featured_count == 0 %}

          {% for post in published_posts limit: 3 %}

            {% assign post_category = post.category | default: "experience" %}
            {% assign post_image = post.image
              | default: "/images/post-placeholder.jpg"
            %}

            {% case post_category %}
              {% when "experience" %}
                {% assign category_label = "تجربه" %}
                {% assign category_class = "category-green" %}
              {% when "notes" %}
                {% assign category_label = "یادداشت" %}
                {% assign category_class = "category-purple" %}
              {% when "tutorial" %}
                {% assign category_label = "آموزش" %}
                {% assign category_class = "category-blue" %}
              {% when "learning" %}
                {% assign category_label = "یادگیری" %}
                {% assign category_class = "category-orange" %}
              {% when "life" %}
                {% assign category_label = "زندگی" %}
                {% assign category_class = "category-green" %}
              {% else %}
                {% assign category_label = "مقاله" %}
                {% assign category_class = "category-green" %}
            {% endcase %}

            <article
              class="post-card"
              data-article
              data-category="{{ post_category | escape }}"
              data-searchable="{{ post.title | escape }} {{ post.excerpt | strip_html | escape }} {{ post.tags | join: ' ' | escape }}"
            >
              <a
                class="post-card-image"
                href="{{ post.url | relative_url }}"
              >
                <img
                  src="{{ post_image | relative_url }}"
                  alt="{{ post.title | escape }}"
                  width="1000"
                  height="700"
                  loading="lazy"
                >
              </a>

              <div class="post-card-body">

                <div class="post-meta">
                  <a
                    class="category {{ category_class }}"
                    href="{{ '/category/' | relative_url }}?name={{ post_category | url_encode }}"
                  >
                    {{ category_label }}
                  </a>

                  <span>
                    {{ post.reading_time | default: "۵ دقیقه مطالعه" }}
                  </span>
                </div>

                <h3>
                  <a href="{{ post.url | relative_url }}">
                    {{ post.title | default: "بدون عنوان" }}
                  </a>
                </h3>

                {% if post.excerpt %}
                  <p>{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
                {% endif %}

                <div class="post-card-footer">

                  <div class="mini-author">
                    {% if post.author_image %}
                      <img
                        src="{{ post.author_image | relative_url }}"
                        alt=""
                        width="80"
                        height="80"
                        loading="lazy"
                      >
                    {% else %}
                      <img
                        src="https://i.pravatar.cc/80?img=11"
                        alt=""
                        width="80"
                        height="80"
                        loading="lazy"
                      >
                    {% endif %}

                    <span>
                      {{ post.author | default: "نویسنده روایت" }}
                    </span>
                  </div>

                  <time datetime="{{ post.date | date_to_xmlschema }}">
                    {% if post.display_date %}
                      {{ post.display_date }}
                    {% else %}
                      {{ post.date | date: "%Y/%m/%d" }}
                    {% endif %}
                  </time>

                </div>

              </div>
            </article>

          {% endfor %}

        {% endif %}

      </div>

    </div>
  </section>

  <section class="quote-section" aria-label="نقل‌قول منتخب">
    <div class="container">

      <figure class="quote-card">

        <div class="quote-avatar">
          <img
            src="https://i.pravatar.cc/160?img=11"
            alt="تصویر نویسنده روایت"
            width="160"
            height="160"
            loading="lazy"
          >
        </div>

        <div class="quote-content">

          <span class="quote-mark" aria-hidden="true">“</span>

          <blockquote>
            <p>
              نوشتن برای من راهی است برای اینکه تجربه‌های پراکنده
              را به معنایی روشن‌تر تبدیل کنم.
            </p>
          </blockquote>

          <figcaption class="quote-author">
            <strong>نویسنده روایت</strong>
            <span>پژوهشگر، نویسنده و یادگیرنده همیشگی</span>
          </figcaption>

        </div>

      </figure>

    </div>
  </section>

  <section
    class="section content-section"
    id="articles"
    aria-labelledby="articlesTitle"
  >
    <div class="container content-layout">

      <div class="articles-column">

        <div class="section-heading compact-heading">
          <div>
            <span class="eyebrow">تازه منتشر شده</span>
            <h2 id="articlesTitle">آخرین نوشته‌ها</h2>
          </div>
        </div>

        <div
          class="article-filters"
          id="articleFilters"
          aria-label="فیلتر نوشته‌ها"
        >
          <button
            class="active"
            type="button"
            data-filter="all"
            aria-pressed="true"
          >
            همه
          </button>

          <button
            type="button"
            data-filter="experience"
            aria-pressed="false"
          >
            تجربه‌ها
          </button>

          <button
            type="button"
            data-filter="notes"
            aria-pressed="false"
          >
            یادداشت‌ها
          </button>

          <button
            type="button"
            data-filter="tutorial"
            aria-pressed="false"
          >
            آموزش‌ها
          </button>

          <button
            type="button"
            data-filter="learning"
            aria-pressed="false"
          >
            یادگیری
          </button>

          <button
            type="button"
            data-filter="life"
            aria-pressed="false"
          >
            زندگی
          </button>
        </div>

        <div class="article-list" id="articleList">

          {% for post in published_posts %}

            {% assign post_category = post.category | default: "experience" %}
            {% assign post_image = post.image
              | default: "/images/post-placeholder.jpg"
            %}

            {% case post_category %}
              {% when "experience" %}
                {% assign category_label = "تجربه" %}
                {% assign category_class = "category-green" %}
              {% when "notes" %}
                {% assign category_label = "یادداشت" %}
                {% assign category_class = "category-purple" %}
              {% when "tutorial" %}
                {% assign category_label = "آموزش" %}
                {% assign category_class = "category-blue" %}
              {% when "learning" %}
                {% assign category_label = "یادگیری" %}
                {% assign category_class = "category-orange" %}
              {% when "life" %}
                {% assign category_label = "زندگی" %}
                {% assign category_class = "category-green" %}
              {% else %}
                {% assign category_label = "مقاله" %}
                {% assign category_class = "category-green" %}
            {% endcase %}

            <article
              class="article-list-item{% if forloop.index > 6 %} is-extra{% endif %}"
              data-article
              data-category="{{ post_category | escape }}"
              data-searchable="{{ post.title | escape }} {{ post.excerpt | strip_html | escape }} {{ post.tags | join: ' ' | escape }}"
              {% if forloop.index > 6 %}hidden{% endif %}
            >
              <a
                class="article-list-image"
                href="{{ post.url | relative_url }}"
              >
                <img
                  src="{{ post_image | relative_url }}"
                  alt="{{ post.title | escape }}"
                  loading="lazy"
                >
              </a>

              <div class="article-list-content">

                <div class="post-meta">
                  <a
                    class="category {{ category_class }}"
                    href="{{ '/category/' | relative_url }}?name={{ post_category | url_encode }}"
                  >
                    {{ category_label }}
                  </a>

                  <span>
                    {{ post.reading_time | default: "۵ دقیقه مطالعه" }}
                  </span>
                </div>

                <h3>
                  <a href="{{ post.url | relative_url }}">
                    {{ post.title | default: "بدون عنوان" }}
                  </a>
                </h3>

                {% if post.excerpt %}
                  <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
                {% endif %}

                <div class="post-card-footer">

                  <div class="mini-author">

                    {% if post.author_image %}
                      <img
                        src="{{ post.author_image | relative_url }}"
                        alt=""
                        width="80"
                        height="80"
                        loading="lazy"
                      >
                    {% else %}
                      <img
                        src="https://i.pravatar.cc/80?img=11"
                        alt=""
                        width="80"
                        height="80"
                        loading="lazy"
                      >
                    {% endif %}

                    <span>
                      {{ post.author | default: "نویسنده روایت" }}
                    </span>
                  </div>

                  <time datetime="{{ post.date | date_to_xmlschema }}">
                    {% if post.display_date %}
                      {{ post.display_date }}
                    {% else %}
                      {{ post.date | date: "%Y/%m/%d" }}
                    {% endif %}
                  </time>

                </div>

              </div>
            </article>

          {% endfor %}

        </div>

        <p
          class="empty-state"
          id="articlesEmptyState"
          {% if published_posts.size > 0 %}hidden{% endif %}
        >
          مطلبی در این دسته پیدا نشد.
        </p>

        <button
          class="load-more-button"
          id="loadMoreButton"
          type="button"
          aria-controls="articleList"
          {% if published_posts.size <= 6 %}hidden{% endif %}
        >
          نمایش مطالب بیشتر
        </button>

      </div>

      <aside class="sidebar" aria-label="اطلاعات تکمیلی">

        <section class="sidebar-widget about-widget">

          <img
            class="about-avatar"
            src="https://i.pravatar.cc/240?img=11"
            alt="تصویر نویسنده وبلاگ روایت"
            width="240"
            height="240"
            loading="lazy"
          >

          <span class="eyebrow">درباره نویسنده</span>

          <h3>سلام، من نویسنده روایت هستم</h3>

          <p>
            اینجا از تجربه‌های شخصی، مسیر یادگیری، ساختن عادت‌های
            بهتر و پرسش‌هایی می‌نویسم که ذهنم را درگیر می‌کنند.
          </p>

          <div class="social-links">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="اینستاگرام نویسنده"
            >
              in
            </a>

            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تلگرام نویسنده"
            >
              tg
            </a>
          </div>

          <a class="text-link" href="{{ '/about/' | relative_url }}">
            بیشتر درباره من
            <span aria-hidden="true">←</span>
          </a>

        </section>

        <section
          class="sidebar-widget"
          id="categories"
          aria-labelledby="categoriesTitle"
        >
          <div class="widget-title">
            <h3 id="categoriesTitle">دسته‌بندی‌ها</h3>
            <span>موضوعات</span>
          </div>

          <div class="category-list" id="categoryList">

            {% assign experience_posts = published_posts
              | where: "category", "experience"
            %}
            {% assign notes_posts = published_posts
              | where: "category", "notes"
            %}
            {% assign tutorial_posts = published_posts
              | where: "category", "tutorial"
            %}
            {% assign learning_posts = published_posts
              | where: "category", "learning"
            %}
            {% assign life_posts = published_posts
              | where: "category", "life"
            %}

            <a href="{{ '/category/' | relative_url }}?name=experience">
              <span>تجربه‌ها</span>
              <strong>{{ experience_posts.size }}</strong>
            </a>

            <a href="{{ '/category/' | relative_url }}?name=notes">
              <span>یادداشت‌ها</span>
              <strong>{{ notes_posts.size }}</strong>
            </a>

            <a href="{{ '/category/' | relative_url }}?name=tutorial">
              <span>آموزش‌ها</span>
              <strong>{{ tutorial_posts.size }}</strong>
            </a>

            <a href="{{ '/category/' | relative_url }}?name=learning">
              <span>یادگیری</span>
              <strong>{{ learning_posts.size }}</strong>
            </a>

            <a href="{{ '/category/' | relative_url }}?name=life">
              <span>زندگی آگاهانه</span>
              <strong>{{ life_posts.size }}</strong>
            </a>

          </div>

        </section>

        <section
          class="sidebar-widget popular-widget"
          aria-labelledby="popularTitle"
        >
          <div class="widget-title">
            <h3 id="popularTitle">محبوب‌ترین نوشته‌ها</h3>
            <span>این ماه</span>
          </div>

          <div class="popular-list" id="popularPosts">

            {% assign popular_count = 0 %}

            {% for post in published_posts %}

              {% if post.popular == true and popular_count < 3 %}
                {% assign popular_count = popular_count | plus: 1 %}

                <article class="popular-item">
                  <span class="popular-number" aria-hidden="true">
                    ۰{{ popular_count }}
                  </span>

                  <div>
                    <h4>
                      <a href="{{ post.url | relative_url }}">
                        {{ post.title | default: "بدون عنوان" }}
                      </a>
                    </h4>

                    <span>
                      {{ post.reading_time | default: "۵ دقیقه مطالعه" }}
                    </span>
                  </div>
                </article>
              {% endif %}

            {% endfor %}

            {% if popular_count == 0 %}

              {% for post in published_posts limit: 3 %}

                <article class="popular-item">
                  <span class="popular-number" aria-hidden="true">
                    ۰{{ forloop.index }}
                  </span>

                  <div>
                    <h4>
                      <a href="{{ post.url | relative_url }}">
                        {{ post.title | default: "بدون عنوان" }}
                      </a>
                    </h4>

                    <span>
                      {{ post.reading_time | default: "۵ دقیقه مطالعه" }}
                    </span>
                  </div>
                </article>

              {% endfor %}

            {% endif %}

          </div>

        </section>

        <section
          class="sidebar-widget tags-widget"
          aria-labelledby="tagsTitle"
        >
          <div class="widget-title">
            <h3 id="tagsTitle">برچسب‌ها</h3>
          </div>

          <div class="tags" id="tagList">

            {% for tag in site.tags limit: 12 %}
              {% assign tag_name = tag[0] %}

              <a href="{{ '/search/' | relative_url }}?tag={{ tag_name | url_encode }}">
                {{ tag_name }}
              </a>
            {% else %}
              <span>هنوز برچسبی ثبت نشده است.</span>
            {% endfor %}

          </div>

        </section>

      </aside>

    </div>
  </section>

</main>
