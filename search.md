---
layout: default
title: جست‌وجو
permalink: /search/
---

<section class="search-page" aria-labelledby="search-page-title">

  <!-- عنوان صفحه -->
  <header class="search-page__header">
    <span class="search-page__eyebrow">جست‌وجو در روایت</span>

    <h1 id="search-page-title" class="search-page__title">
      دنبال چه روایتی هستید؟
    </h1>

    <p class="search-page__description">
      عنوان، موضوع، دسته‌بندی یا برچسب موردنظر خود را جست‌وجو کنید.
    </p>
  </header>

  <!-- فرم جست‌وجو -->
  <form
    id="search-form"
    class="search-form"
    role="search"
    autocomplete="off"
  >
    <label class="visually-hidden" for="search-input">
      جست‌وجو در نوشته‌ها
    </label>

    <div class="search-form__field">

      <span class="search-form__icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="7"></circle>
          <path d="m20 20-3.5-3.5"></path>
        </svg>
      </span>

      <input
        type="search"
        id="search-input"
        class="search-form__input"
        name="q"
        placeholder="مثلاً: فرهنگ، جامعه یا فناوری..."
        autocomplete="off"
        spellcheck="false"
        enterkeyhint="search"
        aria-describedby="search-help search-status"
        disabled
      >

      <button
        type="button"
        id="search-clear"
        class="search-form__clear"
        aria-label="پاک‌کردن عبارت جست‌وجو"
        title="پاک‌کردن"
        hidden
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M6 6l12 12"></path>
          <path d="M18 6 6 18"></path>
        </svg>
      </button>

    </div>

    <p id="search-help" class="search-form__help">
      برای شروع جست‌وجو حداقل دو حرف وارد کنید.
    </p>
  </form>

  <!-- وضعیت جست‌وجو -->
  <div
    id="search-status"
    class="search-status"
    role="status"
    aria-live="polite"
  >
    در حال آماده‌سازی جست‌وجو...
  </div>

  <!-- نتایج -->
  <section
    id="search-results"
    class="search-results"
    aria-label="نتایج جست‌وجو"
  ></section>

  <!-- حالت خالی اولیه -->
  <div id="search-empty" class="search-empty">
    <span class="search-empty__icon" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        width="42"
        height="42"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="7"></circle>
        <path d="m20 20-3.5-3.5"></path>
      </svg>
    </span>

    <h2 class="search-empty__title">
      جست‌وجوی خود را آغاز کنید
    </h2>

    <p class="search-empty__text">
      می‌توانید در عنوان، خلاصه، دسته‌بندی‌ها و برچسب‌های نوشته‌ها جست‌وجو کنید.
    </p>
  </div>

</section>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const clearButton = document.getElementById("search-clear");
    const searchStatus = document.getElementById("search-status");
    const searchResults = document.getElementById("search-results");
    const emptyState = document.getElementById("search-empty");

    const searchDataURL = "{{ '/search.json' | relative_url }}";

    const minimumQueryLength = 2;
    const maximumResults = 24;

    let posts = [];
    let debounceTimer = null;

    /*
     * نرمال‌سازی متن فارسی
     * تبدیل حروف عربی به فارسی و حذف اعراب
     */
    function normalizeText(value) {
      return String(value || "")
        .toLowerCase()
        .replace(/ي/g, "ی")
        .replace(/ى/g, "ی")
        .replace(/ك/g, "ک")
        .replace(/ة/g, "ه")
        .replace(/ۀ/g, "ه")
        .replace(/\u200c/g, " ")
        .replace(/[\u064B-\u065F\u0670]/g, "")
        .replace(/[^\p{L}\p{N}\s]/gu, " ")
        .replace(/\s+/g, " ")
        .trim();
    }

    /*
     * تبدیل مقادیر مختلف به آرایه
     */
    function toArray(value) {
      if (Array.isArray(value)) {
        return value;
      }

      if (typeof value === "string" && value.trim()) {
        return value.split(",").map(function (item) {
          return item.trim();
        });
      }

      return [];
    }

    /*
     * پاک‌سازی خلاصه مطلب
     */
    function cleanExcerpt(value) {
      const temporaryElement = document.createElement("div");

      temporaryElement.innerHTML = String(value || "");

      return temporaryElement.textContent
        .replace(/\s+/g, " ")
        .trim();
    }

    /*
     * کوتاه‌کردن خلاصه
     */
    function truncateText(value, maximumLength) {
      const text = cleanExcerpt(value);

      if (text.length <= maximumLength) {
        return text;
      }

      return text.slice(0, maximumLength).trim() + "…";
    }

    /*
     * ایجاد آدرس امن برای مطلب
     */
    function getPostURL(post) {
      if (!post || typeof post.url !== "string") {
        return "#";
      }

      return post.url;
    }

    /*
     * آماده‌سازی متن قابل جست‌وجوی هر مطلب
     */
    function preparePost(post) {
      const categories = toArray(post.categories);
      const tags = toArray(post.tags);

      return Object.assign({}, post, {
        categories: categories,
        tags: tags,
        searchableText: normalizeText([
          post.title,
          post.excerpt,
          post.content,
          post.author,
          categories.join(" "),
          tags.join(" ")
        ].join(" "))
      });
    }

    /*
     * ساخت برچسب دسته‌بندی
     */
    function createCategory(category) {
      const item = document.createElement("span");

      item.className = "search-result-card__category";
      item.textContent = category;

      return item;
    }

    /*
     * ساخت کارت نتیجه
     */
    function createResultCard(post) {
      const article = document.createElement("article");
      article.className = "search-result-card";

      const content = document.createElement("div");
      content.className = "search-result-card__content";

      const meta = document.createElement("div");
      meta.className = "search-result-card__meta";

      const categories = toArray(post.categories).slice(0, 2);

      categories.forEach(function (category) {
        meta.appendChild(createCategory(category));
      });

      if (post.date) {
        const time = document.createElement("time");

        time.className = "search-result-card__date";
        time.textContent = post.date;

        if (post.date_iso) {
          time.dateTime = post.date_iso;
        }

        meta.appendChild(time);
      }

      const title = document.createElement("h2");
      title.className = "search-result-card__title";

      const titleLink = document.createElement("a");
      titleLink.href = getPostURL(post);
      titleLink.textContent = post.title || "بدون عنوان";

      title.appendChild(titleLink);

      const excerptText = truncateText(post.excerpt, 180);

      if (meta.children.length > 0) {
        content.appendChild(meta);
      }

      content.appendChild(title);

      if (excerptText) {
        const excerpt = document.createElement("p");

        excerpt.className = "search-result-card__excerpt";
        excerpt.textContent = excerptText;

        content.appendChild(excerpt);
      }

      const footer = document.createElement("div");
      footer.className = "search-result-card__footer";

      if (post.author) {
        const author = document.createElement("span");

        author.className = "search-result-card__author";
        author.textContent = post.author;

        footer.appendChild(author);
      }

      const readMore = document.createElement("a");

      readMore.className = "search-result-card__link";
      readMore.href = getPostURL(post);
      readMore.setAttribute(
        "aria-label",
        "مطالعه مطلب " + (post.title || "")
      );

      const readMoreText = document.createElement("span");
      readMoreText.textContent = "مطالعه روایت";

      const readMoreArrow = document.createElement("span");
      readMoreArrow.setAttribute("aria-hidden", "true");
      readMoreArrow.textContent = "←";

      readMore.appendChild(readMoreText);
      readMore.appendChild(readMoreArrow);
      footer.appendChild(readMore);

      content.appendChild(footer);
      article.appendChild(content);

      return article;
    }

    /*
     * نمایش حالت اولیه
     */
    function showInitialState() {
      searchResults.replaceChildren();
      emptyState.hidden = false;
      searchStatus.textContent =
        "برای شروع جست‌وجو حداقل دو حرف وارد کنید.";
    }

    /*
     * نمایش حالت بدون نتیجه
     */
    function showNoResults(query) {
      searchResults.replaceChildren();
      emptyState.hidden = true;

      const message = document.createElement("div");
      message.className = "search-no-results";

      const title = document.createElement("h2");
      title.className = "search-no-results__title";
      title.textContent = "نتیجه‌ای پیدا نشد";

      const text = document.createElement("p");
      text.className = "search-no-results__text";
      text.textContent =
        "برای «" +
        query +
        "» مطلبی پیدا نشد. عبارت کوتاه‌تر یا متفاوتی را امتحان کنید.";

      message.appendChild(title);
      message.appendChild(text);
      searchResults.appendChild(message);

      searchStatus.textContent =
        "هیچ نتیجه‌ای برای «" + query + "» پیدا نشد.";
    }

    /*
     * نمایش نتایج
     */
    function renderResults(results, query) {
      searchResults.replaceChildren();
      emptyState.hidden = true;

      if (results.length === 0) {
        showNoResults(query);
        return;
      }

      const fragment = document.createDocumentFragment();

      results.forEach(function (post) {
        fragment.appendChild(createResultCard(post));
      });

      searchResults.appendChild(fragment);

      const resultLabel =
        results.length === 1
          ? "یک نتیجه"
          : results.length.toLocaleString("fa-IR") + " نتیجه";

      searchStatus.textContent =
        resultLabel + " برای «" + query + "» پیدا شد.";
    }

    /*
     * اجرای جست‌وجو
     */
    function performSearch() {
      const rawQuery = searchInput.value.trim();
      const normalizedQuery = normalizeText(rawQuery);

      clearButton.hidden = rawQuery.length === 0;

      if (normalizedQuery.length < minimumQueryLength) {
        showInitialState();
        updateAddress("");
        return;
      }

      const queryWords = normalizedQuery
        .split(" ")
        .filter(Boolean);

      const filteredPosts = posts
        .filter(function (post) {
          return queryWords.every(function (word) {
            return post.searchableText.includes(word);
          });
        })
        .slice(0, maximumResults);

      renderResults(filteredPosts, rawQuery);
      updateAddress(rawQuery);
    }

    /*
     * قرار دادن عبارت جست‌وجو در آدرس صفحه
     */
    function updateAddress(query) {
      if (!window.history || !window.history.replaceState) {
        return;
      }

      const url = new URL(window.location.href);

      if (query) {
        url.searchParams.set("q", query);
      } else {
        url.searchParams.delete("q");
      }

      window.history.replaceState({}, "", url);
    }

    /*
     * خواندن عبارت جست‌وجو از آدرس
     */
    function getQueryFromAddress() {
      const parameters = new URLSearchParams(window.location.search);

      return parameters.get("q") || "";
    }

    /*
     * جلوگیری از ارسال فرم و بارگذاری مجدد صفحه
     */
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      clearTimeout(debounceTimer);
      performSearch();
    });

    /*
     * جست‌وجوی زنده با تأخیر کوتاه
     */
    searchInput.addEventListener("input", function () {
      clearTimeout(debounceTimer);

      clearButton.hidden = searchInput.value.length === 0;

      debounceTimer = window.setTimeout(function () {
        performSearch();
      }, 250);
    });

    /*
     * پاک‌کردن جست‌وجو
     */
    clearButton.addEventListener("click", function () {
      clearTimeout(debounceTimer);

      searchInput.value = "";
      clearButton.hidden = true;

      showInitialState();
      updateAddress("");

      searchInput.focus();
    });

    /*
     * دریافت اطلاعات مطالب
     */
    fetch(searchDataURL, {
      headers: {
        "Accept": "application/json"
      }
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(
            "دریافت اطلاعات جست‌وجو با خطا مواجه شد."
          );
        }

        return response.json();
      })
      .then(function (data) {
        if (!Array.isArray(data)) {
          throw new Error(
            "ساختار فایل search.json معتبر نیست."
          );
        }

        posts = data.map(preparePost);

        searchInput.disabled = false;
        searchInput.placeholder =
          "مثلاً: فرهنگ، جامعه یا فناوری...";

        const initialQuery = getQueryFromAddress();

        if (initialQuery) {
          searchInput.value = initialQuery;
          clearButton.hidden = false;
          performSearch();
        } else {
          showInitialState();
        }

        searchInput.focus();
      })
      .catch(function (error) {
        console.error(error);

        searchInput.disabled = true;
        searchInput.placeholder =
          "جست‌وجو در حال حاضر در دسترس نیست";

        clearButton.hidden = true;
        emptyState.hidden = true;

        searchStatus.textContent =
          "خطا در بارگذاری اطلاعات جست‌وجو.";

        const errorMessage = document.createElement("div");
        errorMessage.className = "search-error";

        const errorTitle = document.createElement("h2");
        errorTitle.className = "search-error__title";
        errorTitle.textContent = "جست‌وجو بارگذاری نشد";

        const errorText = document.createElement("p");
        errorText.className = "search-error__text";
        errorText.textContent =
          "لطفاً اتصال اینترنت و فایل search.json را بررسی کرده و دوباره صفحه را باز کنید.";

        errorMessage.appendChild(errorTitle);
        errorMessage.appendChild(errorText);

        searchResults.replaceChildren(errorMessage);
      });
  });
</script>
