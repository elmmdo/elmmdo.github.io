"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     Element references
  ======================================================= */

  const root = document.documentElement;
  const body = document.body;

  const siteHeader = document.getElementById("siteHeader");

  const menuButton = document.getElementById("menuButton");
  const closeMenuButton = document.getElementById("closeMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  const searchButton = document.getElementById("searchButton");
  const mobileSearchButton =
    document.getElementById("mobileSearchButton");
  const closeSearchButton =
    document.getElementById("closeSearchButton");
  const searchPanel = document.getElementById("searchPanel");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchMessage = document.getElementById("searchMessage");
  const searchResults = document.getElementById("searchResults");
  const searchTagButtons =
    document.querySelectorAll("[data-search-term]");

  const pageOverlay = document.getElementById("pageOverlay");
  const readingProgress =
    document.getElementById("readingProgress");
  const postContent = document.querySelector(".post-content");

  const backToTop = document.getElementById("backToTop");
  const currentYear = document.getElementById("currentYear");

  let lastSearchTrigger = searchButton;

  /* =======================================================
     Force light mode
  ======================================================= */

  root.dataset.theme = "light";
  root.style.colorScheme = "light";

  body.classList.remove(
    "dark",
    "dark-mode",
    "night",
    "night-mode"
  );

  try {
    localStorage.removeItem("site-theme");
    localStorage.removeItem("theme");
    localStorage.removeItem("dark-mode");
    localStorage.removeItem("darkMode");
    localStorage.removeItem("color-theme");
  } catch (error) {
    // localStorage may be unavailable in private browsing.
  }

  /* =======================================================
     Utilities
  ======================================================= */

  function setBodyScrollLock(locked) {
    body.classList.toggle("no-scroll", locked);
  }

  function normalizePersianText(value = "") {
    return String(value)
      .toLocaleLowerCase("fa")
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/ۀ/g, "ه")
      .replace(/ة/g, "ه")
      .replace(/ؤ/g, "و")
      .replace(/[إأٱآ]/g, "ا")
      .replace(/\u200c/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function prefersReducedMotion() {
    return Boolean(
      window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      ).matches
    );
  }

  function isMobileMenuOpen() {
    return Boolean(
      mobileMenu?.classList.contains("is-open")
    );
  }

  function isSearchOpen() {
    return Boolean(
      searchPanel?.classList.contains("is-open")
    );
  }

  function updateOverlay() {
    const shouldShowOverlay =
      isMobileMenuOpen() || isSearchOpen();

    if (pageOverlay) {
      pageOverlay.classList.toggle(
        "is-visible",
        shouldShowOverlay
      );

      pageOverlay.setAttribute(
        "aria-hidden",
        shouldShowOverlay ? "false" : "true"
      );
    }

    setBodyScrollLock(shouldShowOverlay);
  }

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

    const firstFocusableElement = mobileMenu.querySelector(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    window.setTimeout(() => {
      firstFocusableElement?.focus();
    }, 100);
  }

  function closeMobileMenu(returnFocus = true) {
    if (!mobileMenu || !menuButton) return;

    const wasOpen = isMobileMenuOpen();

    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");

    menuButton.classList.remove("is-active");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute(
      "aria-label",
      "بازکردن منوی اصلی"
    );

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

  function openSearchPanel(trigger = searchButton) {
    if (!searchPanel) return;

    lastSearchTrigger = trigger || searchButton;

    closeMobileMenu(false);

    searchPanel.classList.add("is-open");
    searchPanel.setAttribute("aria-hidden", "false");

    searchButton?.setAttribute("aria-expanded", "true");
    searchButton?.setAttribute(
      "aria-label",
      "بستن جست‌وجو"
    );

    mobileSearchButton?.setAttribute(
      "aria-expanded",
      "true"
    );

    updateOverlay();

    loadSearchIndex();

    window.setTimeout(() => {
      searchInput?.focus();
    }, 100);
  }

  function closeSearchPanel(returnFocus = true) {
    if (!searchPanel) return;

    const wasOpen = isSearchOpen();

    searchPanel.classList.remove("is-open");
    searchPanel.setAttribute("aria-hidden", "true");

    searchButton?.setAttribute("aria-expanded", "false");
    searchButton?.setAttribute(
      "aria-label",
      "بازکردن جست‌وجو"
    );

    mobileSearchButton?.setAttribute(
      "aria-expanded",
      "false"
    );

    updateOverlay();

    if (wasOpen && returnFocus) {
      lastSearchTrigger?.focus();
    }
  }

  searchButton?.addEventListener("click", () => {
    if (isSearchOpen()) {
      closeSearchPanel();
    } else {
      openSearchPanel(searchButton);
    }
  });

  mobileSearchButton?.addEventListener("click", () => {
    openSearchPanel(mobileSearchButton);
  });

  closeSearchButton?.addEventListener("click", () => {
    closeSearchPanel();
  });

  searchPanel?.addEventListener("click", (event) => {
    if (event.target === searchPanel) {
      closeSearchPanel();
    }
  });

  pageOverlay?.addEventListener("click", () => {
    closeMobileMenu(false);
    closeSearchPanel(false);
    updateOverlay();
  });

  /* =======================================================
     Search index
  ======================================================= */

  let searchItems = [];
  let searchIndexLoaded = false;
  let searchIndexLoading = false;
  let searchIndexPromise = null;
  let latestSearchRequest = 0;
  let searchInputTimeout = null;

  function getSearchIndexUrl() {
    const baseUrl =
      document
        .querySelector('meta[name="baseurl"]')
        ?.getAttribute("content")
        ?.trim() || "";

    return `${baseUrl.replace(/\/$/, "")}/search.json`;
  }

  function normalizeList(value) {
    if (Array.isArray(value)) {
      return value.filter(Boolean);
    }

    if (typeof value === "string" && value.trim()) {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  }

  function createSearchableItem(item = {}) {
    const title = item.title || "";
    const excerpt =
      item.excerpt ||
      item.description ||
      "";

    const content = item.content || "";

    const categories = normalizeList(
      item.categories || item.category
    );

    const tags = normalizeList(item.tags);
    const author = item.author || "";

    const categoryLabel = categories.join("، ");

    return {
      title,
      excerpt,
      content,
      categories,
      categoryLabel,
      tags,
      author,
      authorAvatar: item.author_avatar || "",
      image: item.image || "",
      url: item.url || "",
      date: item.date || "",
      dateIso: item.date_iso || "",

      searchableText: normalizePersianText(
        [
          title,
          excerpt,
          content,
          categories.join(" "),
          tags.join(" "),
          author
        ].join(" ")
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

        const linkElement = element.matches("a[href]")
          ? element
          : element.querySelector("a[href]");

        return createSearchableItem({
          title:
            element.dataset.searchTitle ||
            titleElement?.textContent?.trim() ||
            "",

          excerpt:
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
    if (searchIndexLoaded) {
      return searchItems;
    }

    if (searchIndexLoading && searchIndexPromise) {
      return searchIndexPromise;
    }

    searchIndexLoading = true;

    searchIndexPromise = (async () => {
      try {
        const response = await fetch(getSearchIndexUrl(), {
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(
            `Search index request failed: ${response.status}`
          );
        }

        const data = await response.json();

        searchItems = Array.isArray(data)
          ? data
              .map(createSearchableItem)
              .filter((item) => item.title && item.url)
          : [];

        searchIndexLoaded = true;

        return searchItems;
      } catch (error) {
        console.error(
          "Unable to load search.json:",
          error
        );

        searchItems = collectSearchItemsFromPage();
        searchIndexLoaded = true;

        return searchItems;
      } finally {
        searchIndexLoading = false;
        searchIndexPromise = null;
      }
    })();

    return searchIndexPromise;
  }

  /* =======================================================
     Search results
  ======================================================= */

  function clearSearchResults() {
    latestSearchRequest += 1;

    if (searchResults) {
      searchResults.replaceChildren();
    }

    if (searchMessage) {
      searchMessage.textContent = "";
    }
  }

  function createResultMeta(item) {
    const values = [
      item.categoryLabel,
      item.author,
      item.date
    ].filter(Boolean);

    if (!values.length) {
      return null;
    }

    const meta = document.createElement("span");
    meta.className = "search-result-meta";

    values.forEach((value) => {
      const part = document.createElement("small");
      part.textContent = value;
      meta.appendChild(part);
    });

    return meta;
  }

  function createSearchResult(item) {
    const result = document.createElement("a");
    result.className = "search-result-item";
    result.href = item.url;

    const content = document.createElement("span");
    content.className = "search-result-content";

    const meta = createResultMeta(item);

    if (meta) {
      content.appendChild(meta);
    }

    const title = document.createElement("strong");
    title.textContent = item.title;
    content.appendChild(title);

    if (item.excerpt) {
      const excerpt = document.createElement("span");
      excerpt.className = "search-result-excerpt";
      excerpt.textContent = item.excerpt;
      content.appendChild(excerpt);
    }

    const arrow = document.createElement("span");
    arrow.className = "search-result-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "←";

    result.append(content, arrow);

    return result;
  }

  function renderSearchResultItems(results) {
    if (!searchResults) return;

    const resultList = document.createElement("div");
    resultList.className = "search-results-list";

    const fragment = document.createDocumentFragment();

    results.forEach((item) => {
      fragment.appendChild(createSearchResult(item));
    });

    resultList.appendChild(fragment);
    searchResults.replaceChildren(resultList);
  }

  async function renderSearchResults(rawQuery) {
    if (!searchResults || !searchMessage) {
      return;
    }

    const requestId = ++latestSearchRequest;
    const query = rawQuery.trim();
    const normalizedQuery = normalizePersianText(query);

    searchResults.replaceChildren();

    if (!normalizedQuery) {
      searchMessage.textContent = "";
      return;
    }

    if (normalizedQuery.length < 2) {
      searchMessage.textContent =
        "برای جست‌وجو دست‌کم دو نویسه وارد کنید.";
      return;
    }

    searchMessage.textContent = "در حال جست‌وجو...";

    const items = await loadSearchIndex();

    if (requestId !== latestSearchRequest) {
      return;
    }

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

    searchResults.replaceChildren();

    if (!results.length) {
      searchMessage.textContent =
        `نتیجه‌ای برای «${query}» پیدا نشد.`;
      return;
    }

    searchMessage.textContent =
      `${results.length.toLocaleString("fa-IR")} نتیجه پیدا شد.`;

    renderSearchResultItems(results);
  }

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    window.clearTimeout(searchInputTimeout);

    renderSearchResults(
      searchInput?.value || ""
    );
  });

  searchInput?.addEventListener("input", () => {
    const query = searchInput.value.trim();

    window.clearTimeout(searchInputTimeout);

    if (!query) {
      clearSearchResults();
      return;
    }

    if (normalizePersianText(query).length < 2) {
      renderSearchResults(query);
      return;
    }

    searchInputTimeout = window.setTimeout(() => {
      renderSearchResults(query);
    }, 220);
  });

  searchTagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const term =
        button.dataset.searchTerm?.trim() || "";

      if (!term) return;

      window.clearTimeout(searchInputTimeout);

      if (searchInput) {
        searchInput.value = term;
      }

      openSearchPanel(button);
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

    const contentRect =
      postContent.getBoundingClientRect();

    const contentTop =
      window.scrollY + contentRect.top;

    const contentHeight = postContent.offsetHeight;

    const viewportReferenceOffset =
      window.innerHeight * 0.35;

    const viewportReference =
      window.scrollY + viewportReferenceOffset;

    const readableDistance = Math.max(
      contentHeight - viewportReferenceOffset,
      1
    );

    const progress = Math.min(
      Math.max(
        (viewportReference - contentTop) /
          readableDistance,
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
      const shouldShowButton =
        scrollPosition > 600;

      backToTop.classList.toggle(
        "is-visible",
        shouldShowButton
      );

      backToTop.setAttribute(
        "aria-hidden",
        shouldShowButton ? "false" : "true"
      );

      backToTop.tabIndex =
        shouldShowButton ? 0 : -1;
    }

    siteHeader?.classList.toggle(
      "is-scrolled",
      scrollPosition > 20
    );

    updateReadingProgress();
  }

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion()
        ? "auto"
        : "smooth"
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

  window.addEventListener("resize", () => {
    updateScrollInterface();

    if (
      window.innerWidth > 900 &&
      isMobileMenuOpen()
    ) {
      closeMobileMenu(false);
    }
  });

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

      return;
    }

    const activeElement = document.activeElement;
    const activeTag = activeElement?.tagName;

    const isTyping =
      activeTag === "INPUT" ||
      activeTag === "TEXTAREA" ||
      activeTag === "SELECT" ||
      activeElement?.isContentEditable;

    if (
      event.key === "/" &&
      !isTyping &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      event.preventDefault();
      openSearchPanel(searchButton);
    }
  });

  /* =======================================================
     Latest journal section
  ======================================================= */

  function initializeLatestSection() {
    const section =
      document.querySelector(".latest-section");

    if (!section) return;

    const cards = Array.from(
      section.querySelectorAll("[data-latest-card]")
    );

    const filterButtons = Array.from(
      section.querySelectorAll(".latest-filter")
    );

    const emptyState =
      section.querySelector("#latestEmpty");

    const loadMoreButton =
      section.querySelector("#latestLoadMore");

    const loadMoreWrapper =
      section.querySelector("#latestLoadMoreWrapper");

    if (!cards.length) {
      if (emptyState) {
        emptyState.hidden = false;
      }

      if (loadMoreWrapper) {
        loadMoreWrapper.hidden = true;
      }

      return;
    }

    const initialVisibleCount = 7;
    const loadMoreStep = 4;

    let activeFilter = "all";
    let visibleCount = initialVisibleCount;

    function getFilteredCards() {
      return cards.filter((card) => {
        const category =
          card.dataset.category || "";

        return (
          activeFilter === "all" ||
          category === activeFilter
        );
      });
    }

    function showCard(card, shouldAnimate) {
      card.hidden = false;

      if (shouldAnimate) {
        card.classList.remove("is-visible");

        window.requestAnimationFrame(() => {
          card.classList.add("is-visible");
        });
      } else {
        card.classList.add("is-visible");
      }
    }

    function renderCards({ animate = false } = {}) {
      const filteredCards = getFilteredCards();

      cards.forEach((card) => {
        card.hidden = true;
        card.classList.remove("is-visible");
      });

      filteredCards
        .slice(0, visibleCount)
        .forEach((card) => {
          showCard(card, animate);
        });

      if (emptyState) {
        emptyState.hidden =
          filteredCards.length !== 0;
      }

      if (loadMoreWrapper) {
        loadMoreWrapper.hidden =
          filteredCards.length === 0 ||
          visibleCount >= filteredCards.length;
      }
    }

    function setActiveFilter(activeButton) {
      filterButtons.forEach((button) => {
        const isActive =
          button === activeButton;

        button.classList.toggle(
          "is-active",
          isActive
        );

        button.setAttribute(
          "aria-pressed",
          String(isActive)
        );
      });
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter =
          button.dataset.filter || "all";

        visibleCount = initialVisibleCount;

        setActiveFilter(button);
        renderCards({ animate: true });
      });
    });

    loadMoreButton?.addEventListener("click", () => {
      const filteredCards = getFilteredCards();
      const previouslyVisible = visibleCount;

      visibleCount += loadMoreStep;

      renderCards({ animate: true });

      const firstNewCard =
        filteredCards[previouslyVisible];

      if (!firstNewCard) return;

      firstNewCard.setAttribute("tabindex", "-1");
      firstNewCard.focus({
        preventScroll: true
      });

      firstNewCard.scrollIntoView({
        behavior: prefersReducedMotion()
          ? "auto"
          : "smooth",
        block: "center"
      });
    });

    renderCards();
  }

  /* =======================================================
     Footer year
  ======================================================= */

  if (currentYear) {
    currentYear.textContent =
      new Intl.DateTimeFormat("fa-IR", {
        year: "numeric"
      }).format(new Date());
  }

  /* =======================================================
     Initial state
  ======================================================= */

  clearSearchResults();
  updateOverlay();
  updateScrollInterface();
  initializeLatestSection();
});
