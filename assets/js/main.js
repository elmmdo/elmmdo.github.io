"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     Element references
     ======================================================= */

  const root = document.documentElement;
  const body = document.body;

  const siteHeader = document.getElementById("siteHeader");

  const themeButton = document.getElementById("themeButton");
  const themeIcon = document.getElementById("themeIcon");

  const menuButton = document.getElementById("menuButton");
  const closeMenuButton = document.getElementById("closeMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  const searchButton = document.getElementById("searchButton");
  const closeSearchButton = document.getElementById("closeSearchButton");
  const searchPanel = document.getElementById("searchPanel");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchMessage = document.getElementById("searchMessage");
  const searchResults = document.getElementById("searchResults");
  const searchTagButtons = document.querySelectorAll("[data-search-term]");

  const pageOverlay = document.getElementById("pageOverlay");
  const readingProgress = document.getElementById("readingProgress");
  const postContent = document.querySelector(".post-content");

  const backToTop = document.getElementById("backToTop");
  const currentYear = document.getElementById("currentYear");

  /* =======================================================
     Small utilities
     ======================================================= */

  function setBodyScrollLock(locked) {
    body.classList.toggle("no-scroll", locked);
  }

  function normalizePersianText(value = "") {
    return String(value)
      .toLocaleLowerCase("fa")
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/\u200c/g, " ")
      .replace(/[إأٱآ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeHTML(value = "") {
    const temporaryElement = document.createElement("div");
    temporaryElement.textContent = String(value);
    return temporaryElement.innerHTML;
  }

  function isMobileMenuOpen() {
    return mobileMenu?.classList.contains("is-open") ?? false;
  }

  function isSearchOpen() {
    return searchPanel?.classList.contains("is-open") ?? false;
  }

  function updateOverlay() {
    if (!pageOverlay) return;

    const shouldShowOverlay =
      isMobileMenuOpen() || isSearchOpen();

    pageOverlay.classList.toggle("is-visible", shouldShowOverlay);
    pageOverlay.setAttribute(
      "aria-hidden",
      shouldShowOverlay ? "false" : "true"
    );

    setBodyScrollLock(shouldShowOverlay);
  }

  /* =======================================================
     Theme
     ======================================================= */

  const THEME_STORAGE_KEY = "site-theme";

  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      // Local storage may be unavailable in privacy mode.
    }
  }

  function getPreferredTheme() {
    const savedTheme = getSavedTheme();

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    return "light";
  }

  function applyTheme(theme, persist = true) {
    const isDark = theme === "dark";

    root.dataset.theme = isDark ? "dark" : "light";
    root.style.colorScheme = isDark ? "dark" : "light";

    if (themeButton) {
      themeButton.setAttribute(
        "aria-label",
        isDark
          ? "فعال‌کردن حالت روشن"
          : "فعال‌کردن حالت تاریک"
      );

      themeButton.setAttribute(
        "aria-pressed",
        isDark ? "true" : "false"
      );

      themeButton.title = isDark
        ? "حالت روشن"
        : "حالت تاریک";
    }

    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀" : "☾";
    }

    if (persist) {
      saveTheme(isDark ? "dark" : "light");
    }
  }

  applyTheme(getPreferredTheme(), false);

  themeButton?.addEventListener("click", () => {
    const nextTheme =
      root.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
  });

  /* =======================================================
     Mobile menu
     ======================================================= */

  function openMobileMenu() {
    if (!mobileMenu || !menuButton) return;

    closeSearchPanel(false);

    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");

    menuButton.classList.add("is-active");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "بستن منوی اصلی");

    updateOverlay();

    const firstLink = mobileMenu.querySelector("a");

    window.setTimeout(() => {
      firstLink?.focus();
    }, 100);
  }

  function closeMobileMenu(returnFocus = true) {
    if (!mobileMenu || !menuButton) return;

    const wasOpen = isMobileMenuOpen();

    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");

    menuButton.classList.remove("is-active");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "بازکردن منوی اصلی");

    updateOverlay();

    if (wasOpen && returnFocus) {
      menuButton.focus();
    }
  }

  menuButton?.addEventListener("click", () => {
    if (isMobileMenuOpen()) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  closeMenuButton?.addEventListener("click", () => {
    closeMobileMenu();
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu(false);
    });
  });

  /* =======================================================
     Search panel
     ======================================================= */

  function openSearchPanel() {
    if (!searchPanel || !searchButton) return;

    closeMobileMenu(false);

    searchPanel.classList.add("is-open");
    searchPanel.setAttribute("aria-hidden", "false");

    searchButton.setAttribute("aria-expanded", "true");
    searchButton.setAttribute("aria-label", "بستن جست‌وجو");

    updateOverlay();

    window.setTimeout(() => {
      searchInput?.focus();
    }, 100);
  }

  function closeSearchPanel(returnFocus = true) {
    if (!searchPanel || !searchButton) return;

    const wasOpen = isSearchOpen();

    searchPanel.classList.remove("is-open");
    searchPanel.setAttribute("aria-hidden", "true");

    searchButton.setAttribute("aria-expanded", "false");
    searchButton.setAttribute("aria-label", "بازکردن جست‌وجو");

    updateOverlay();

    if (wasOpen && returnFocus) {
      searchButton.focus();
    }
  }

  searchButton?.addEventListener("click", () => {
    if (isSearchOpen()) {
      closeSearchPanel();
    } else {
      openSearchPanel();
    }
  });

  closeSearchButton?.addEventListener("click", () => {
    closeSearchPanel();
  });

  pageOverlay?.addEventListener("click", () => {
    closeMobileMenu(false);
    closeSearchPanel(false);
    updateOverlay();
  });

  /* =======================================================
     Search data and search results
     ======================================================= */

   /* =======================================================
     Search data and search results
     ======================================================= */

  let searchItems = [];
  let searchIndexLoaded = false;
  let searchIndexLoading = false;

  function getSearchIndexUrl() {
    const baseUrl = document
      .querySelector('meta[name="baseurl"]')
      ?.getAttribute("content") || "";

    return `${baseUrl.replace(/\/$/, "")}/search.json`;
  }

  function createSearchableItem(item) {
    const title = item.title || "";
    const description = item.description || "";
    const category = item.category || "";
    const tags = Array.isArray(item.tags) ? item.tags.join(" ") : "";

    return {
      title,
      description,
      category,
      tags: item.tags || [],
      url: item.url || "",
      date: item.date || "",
      searchableText: normalizePersianText(
        `${title} ${description} ${category} ${tags}`
      )
    };
  }

  function collectSearchItemsFromPage() {
    const selectors = [
      "[data-search-item]",
      ".post-card",
      ".article-card",
      ".featured-card",
      "article.post-preview"
    ];

    const elements = Array.from(
      document.querySelectorAll(selectors.join(","))
    );

    const uniqueElements = [...new Set(elements)];

    return uniqueElements
      .map((element) => {
        const titleElement = element.querySelector(
          "[data-search-title], h2, h3, .post-title, .card-title"
        );

        const descriptionElement = element.querySelector(
          "[data-search-description], .post-excerpt, .card-excerpt, p"
        );

        const categoryElement = element.querySelector(
          "[data-search-category], .post-category, .card-category"
        );

        const linkElement =
          element.matches("a[href]")
            ? element
            : element.querySelector("a[href]");

        return createSearchableItem({
          title:
            element.dataset.searchTitle ||
            titleElement?.textContent?.trim() ||
            "",
          description:
            element.dataset.searchDescription ||
            descriptionElement?.textContent?.trim() ||
            "",
          category:
            element.dataset.searchCategory ||
            categoryElement?.textContent?.trim() ||
            "",
          url:
            element.dataset.searchUrl ||
            linkElement?.getAttribute("href") ||
            ""
        });
      })
      .filter((item) => item.title && item.url);
  }

  async function loadSearchIndex() {
    if (searchIndexLoaded || searchIndexLoading) {
      return searchItems;
    }

    searchIndexLoading = true;

    try {
      const response = await fetch(getSearchIndexUrl(), {
        headers: {
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Search index request failed: ${response.status}`);
      }

      const data = await response.json();

      searchItems = Array.isArray(data)
        ? data.map(createSearchableItem).filter((item) => item.title && item.url)
        : [];

      searchIndexLoaded = true;
    } catch (error) {
      // Fallback keeps search usable on pages that already render post cards.
      searchItems = collectSearchItemsFromPage();
      searchIndexLoaded = true;

      if (searchMessage) {
        searchMessage.textContent =
          "جست‌وجوی سراسری در دسترس نیست؛ نتایج همین صفحه نمایش داده می‌شود.";
      }
    } finally {
      searchIndexLoading = false;
    }

    return searchItems;
  }

  function clearSearchResults() {
    if (searchResults) {
      searchResults.innerHTML = "";
    }

    if (searchMessage) {
      searchMessage.textContent = "";
    }
  }

  function renderSearchResultItems(results) {
    if (!searchResults) return;

    const resultList = document.createElement("div");
    resultList.className = "search-results-list";

    results.forEach((item) => {
      const result = document.createElement("a");
      result.className = "search-result-item";
      result.href = item.url;

      result.innerHTML = `
        <span class="search-result-content">
          ${
            item.category
              ? `<small>${escapeHTML(item.category)}</small>`
              : ""
          }

          <strong>${escapeHTML(item.title)}</strong>

          ${
            item.description
              ? `<span>${escapeHTML(item.description)}</span>`
              : ""
          }
        </span>

        <span class="search-result-arrow" aria-hidden="true">
          ←
        </span>
      `;

      resultList.appendChild(result);
    });

    searchResults.appendChild(resultList);
  }

  async function renderSearchResults(query) {
    if (!searchResults || !searchMessage) return;

    const normalizedQuery = normalizePersianText(query);

    searchResults.innerHTML = "";

    if (normalizedQuery.length < 2) {
      searchMessage.textContent =
        "برای جست‌وجو دست‌کم دو نویسه وارد کنید.";
      return;
    }

    searchMessage.textContent = "در حال جست‌وجو...";

    const items = await loadSearchIndex();

    const queryWords = normalizedQuery
      .split(" ")
      .filter(Boolean);

    const results = items
      .filter((item) =>
        queryWords.every((word) =>
          item.searchableText.includes(word)
        )
      )
      .slice(0, 10);

    searchResults.innerHTML = "";

    if (results.length === 0) {
      searchMessage.textContent =
        "مطلبی مطابق عبارت واردشده پیدا نشد.";
      return;
    }

    searchMessage.textContent =
      `${results.length} نتیجه پیدا شد.`;

    renderSearchResultItems(results);
  }

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    renderSearchResults(searchInput?.value || "");
  });

  let searchInputTimeout;

  searchInput?.addEventListener("input", () => {
    const query = searchInput.value.trim();

    window.clearTimeout(searchInputTimeout);

    if (!query) {
      clearSearchResults();
      return;
    }

    searchInputTimeout = window.setTimeout(() => {
      renderSearchResults(query);
    }, 180);
  });

  searchTagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const term = button.dataset.searchTerm || "";

      if (searchInput) {
        searchInput.value = term;
      }

      renderSearchResults(term);
      searchInput?.focus();
    });
  });


  /* =======================================================
     Reading progress
     ======================================================= */

  function updateReadingProgress() {
    if (!readingProgress) return;

    if (!postContent) {
      readingProgress.style.transform = "scaleX(0)";
      readingProgress.hidden = true;
      return;
    }

    readingProgress.hidden = false;

    const contentRect = postContent.getBoundingClientRect();
    const contentTop = window.scrollY + contentRect.top;
    const contentHeight = postContent.offsetHeight;

    const viewportReference =
      window.scrollY + window.innerHeight * 0.35;

    const readableDistance = Math.max(contentHeight, 1);

    const progress = Math.min(
      Math.max(
        (viewportReference - contentTop) / readableDistance,
        0
      ),
      1
    );

    readingProgress.style.transform =
      `scaleX(${progress})`;
  }

  /* =======================================================
     Back to top and sticky header
     ======================================================= */

  function updateScrollInterface() {
    const scrollPosition = window.scrollY;

    if (backToTop) {
      const shouldShowButton = scrollPosition > 600;

      backToTop.classList.toggle(
        "is-visible",
        shouldShowButton
      );

      backToTop.setAttribute(
        "aria-hidden",
        shouldShowButton ? "false" : "true"
      );

      backToTop.tabIndex = shouldShowButton ? 0 : -1;
    }

    if (siteHeader) {
      siteHeader.classList.toggle(
        "is-scrolled",
        scrollPosition > 20
      );
    }

    updateReadingProgress();
  }

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  let scrollFrameRequested = false;

  window.addEventListener(
    "scroll",
    () => {
      if (scrollFrameRequested) return;

      scrollFrameRequested = true;

      window.requestAnimationFrame(() => {
        updateScrollInterface();
        scrollFrameRequested = false;
      });
    },
    { passive: true }
  );

  window.addEventListener("resize", updateScrollInterface);

  /* =======================================================
     Keyboard interactions
     ======================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (isSearchOpen()) {
        closeSearchPanel();
        return;
      }

      if (isMobileMenuOpen()) {
        closeMobileMenu();
      }
    }

    const activeTag = document.activeElement?.tagName;
    const isTyping =
      activeTag === "INPUT" ||
      activeTag === "TEXTAREA" ||
      activeTag === "SELECT";

    if (
      event.key === "/" &&
      !isTyping &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      event.preventDefault();
      openSearchPanel();
    }
  });

  /* =======================================================
     Footer year
     ======================================================= */

  if (currentYear) {
    currentYear.textContent = new Intl.DateTimeFormat(
      "fa-IR",
      { year: "numeric" }
    ).format(new Date());
  }

  /* =======================================================
     Initial state
     ======================================================= */

  clearSearchResults();
  updateScrollInterface();
});
