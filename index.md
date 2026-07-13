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
                    {% include reading-time.html content=hero_post.content %}
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
                      {% include reading-time.html content=post.content %}
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
                      {% include reading-time.html content=post.content %}
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
                    {% include reading-time.html content=post.content %}
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
    class="latest-section"
    id="articles"
    aria-labelledby="latestTitle"
  >
    <div class="container">
  
      <!-- عنوان و فیلترها -->
      <header class="latest-header">
  
        <div class="latest-heading">
          <span class="latest-eyebrow">
            <span aria-hidden="true"></span>
            تازه منتشر شده
          </span>
  
          <h2 id="latestTitle">
            آخرین روایت‌ها
          </h2>
  
          <p>
            تازه‌ترین تجربه‌ها، یادداشت‌ها و آموخته‌هایی که
            در مسیر زندگی و یادگیری ثبت کرده‌ام.
          </p>
        </div>
  
        <div
          class="latest-filters"
          id="latestFilters"
          aria-label="فیلتر نوشته‌ها"
        >
          <button
            class="latest-filter is-active"
            type="button"
            data-filter="all"
            aria-pressed="true"
          >
            همه
          </button>
  
          <button
            class="latest-filter"
            type="button"
            data-filter="experience"
            aria-pressed="false"
          >
            تجربه‌ها
          </button>
  
          <button
            class="latest-filter"
            type="button"
            data-filter="notes"
            aria-pressed="false"
          >
            یادداشت‌ها
          </button>
  
          <button
            class="latest-filter"
            type="button"
            data-filter="tutorial"
            aria-pressed="false"
          >
            آموزش‌ها
          </button>
  
          <button
            class="latest-filter"
            type="button"
            data-filter="learning"
            aria-pressed="false"
          >
            یادگیری
          </button>
  
          <button
            class="latest-filter"
            type="button"
            data-filter="life"
            aria-pressed="false"
          >
            زندگی
          </button>
        </div>
  
      </header>
  
      {% if published_posts.size > 0 %}
  
        <!-- فهرست مطالب -->
        <div
          class="latest-list"
          id="latestList"
          aria-live="polite"
        >
  
          {% for post in published_posts %}
  
            {% assign post_category = post.category | default: "experience" %}
            {% assign post_image = post.image | default: "/images/post-placeholder.jpg" %}
  
            {% case post_category %}
              {% when "experience" %}
                {% assign category_label = "تجربه" %}
                {% assign category_class = "latest-category--green" %}
  
              {% when "notes" %}
                {% assign category_label = "یادداشت" %}
                {% assign category_class = "latest-category--purple" %}
  
              {% when "tutorial" %}
                {% assign category_label = "آموزش" %}
                {% assign category_class = "latest-category--blue" %}
  
              {% when "learning" %}
                {% assign category_label = "یادگیری" %}
                {% assign category_class = "latest-category--orange" %}
  
              {% when "life" %}
                {% assign category_label = "زندگی" %}
                {% assign category_class = "latest-category--rose" %}
  
              {% else %}
                {% assign category_label = "مقاله" %}
                {% assign category_class = "latest-category--gray" %}
            {% endcase %}
  
            <article
              class="latest-card{% if forloop.first %} latest-card--featured{% endif %}"
              data-latest-card
              data-category="{{ post_category | escape }}"
              data-index="{{ forloop.index0 }}"
              data-searchable="{{ post.title | escape }} {{ post.excerpt | strip_html | escape }} {{ post.tags | join: ' ' | escape }}"
            >
  
              <!-- تصویر مطلب -->
              <a
                class="latest-card__media"
                href="{{ post.url | relative_url }}"
                aria-label="خواندن مطلب: {{ post.title | escape }}"
              >
                <img
                  src="{{ post_image | relative_url }}"
                  alt="{{ post.title | escape }}"
                  width="{% if forloop.first %}1400{% else %}900{% endif %}"
                  height="{% if forloop.first %}900{% else %}650{% endif %}"
                  {% if forloop.first %}
                    loading="eager"
                  {% else %}
                    loading="lazy"
                  {% endif %}
                >
  
                <span class="latest-card__overlay" aria-hidden="true"></span>
  
                {% if forloop.first %}
                  <span class="latest-card__new">
                    جدیدترین روایت
                  </span>
                {% endif %}
              </a>
  
              <!-- محتوای مطلب -->
              <div class="latest-card__content">
  
                <div class="latest-card__meta">
  
                  <a
                    class="latest-category {{ category_class }}"
                    href="{{ '/category/' | relative_url }}?name={{ post_category | url_encode }}"
                  >
                    {{ category_label }}
                  </a>
  
                  <span class="latest-reading-time">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="8.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                      />
  
                      <path
                        d="M12 7.5V12L15 14"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
  
                    {% include reading-time.html content=post.content %}
                  </span>
  
                </div>
  
                <h3 class="latest-card__title">
                  <a href="{{ post.url | relative_url }}">
                    {{ post.title | default: "بدون عنوان" }}
                  </a>
                </h3>
  
                {% if post.excerpt %}
                  <p class="latest-card__excerpt">
                    {% if forloop.first %}
                      {{ post.excerpt | strip_html | truncatewords: 35 }}
                    {% else %}
                      {{ post.excerpt | strip_html | truncatewords: 22 }}
                    {% endif %}
                  </p>
                {% endif %}
  
                <footer class="latest-card__footer">
  
                  <div class="latest-author">
  
                    {% if post.author_image %}
                      <img
                        src="{{ post.author_image | relative_url }}"
                        alt=""
                        width="64"
                        height="64"
                        loading="lazy"
                      >
                    {% else %}
                      <img
                        src="https://i.pravatar.cc/80?img=11"
                        alt=""
                        width="64"
                        height="64"
                        loading="lazy"
                      >
                    {% endif %}
  
                    <div>
                      <strong>
                        {{ post.author | default: "نویسنده روایت" }}
                      </strong>
  
                      <time datetime="{{ post.date | date_to_xmlschema }}">
                        {% if post.display_date %}
                          {{ post.display_date }}
                        {% else %}
                          {{ post.date | date: "%Y/%m/%d" }}
                        {% endif %}
                      </time>
                    </div>
  
                  </div>
  
                  <a
                    class="latest-read-more"
                    href="{{ post.url | relative_url }}"
                    aria-label="مطالعه مطلب {{ post.title | escape }}"
                  >
                    <span>مطالعه</span>
  
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M19 12H5M11 18L5 12L11 6"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
  
                </footer>
  
              </div>
  
            </article>
  
          {% endfor %}
  
        </div>
  
        <!-- حالت نبود مطلب در فیلتر انتخاب‌شده -->
        <div
          class="latest-empty"
          id="latestEmpty"
          role="status"
          hidden
        >
          <span class="latest-empty__icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="32"
              height="32"
              fill="none"
            >
              <path
                d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 16.5v-9Z"
                stroke="currentColor"
                stroke-width="1.5"
              />
  
              <path
                d="M8.5 9H15.5M8.5 12H15.5M8.5 15H13"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </span>
  
          <h3>مطلبی پیدا نشد</h3>
  
          <p>
            هنوز روایتی در این دسته منتشر نشده است.
          </p>
        </div>
  
        <!-- دکمه نمایش بیشتر -->
        <div
          class="latest-load-more-wrapper"
          id="latestLoadMoreWrapper"
        >
          <button
            class="latest-load-more"
            id="latestLoadMore"
            type="button"
            aria-controls="latestList"
          >
            <span>نمایش روایت‌های بیشتر</span>
  
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
  
      {% else %}
  
        <div class="latest-empty latest-empty--initial">
  
          <span class="latest-empty__icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="32"
              height="32"
              fill="none"
            >
              <path
                d="M6 4.5H14L18 8.5V19.5H6V4.5Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
  
              <path
                d="M14 4.5V8.5H18M9 12H15M9 15H14"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </span>
  
          <h3>هنوز روایتی منتشر نشده است</h3>
  
          <p>
            اولین نوشته به‌زودی در این قسمت قرار می‌گیرد.
          </p>
  
        </div>
  
      {% endif %}
  
    </div>
  </section>

