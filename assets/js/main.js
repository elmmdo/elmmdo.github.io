"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     Element references
  ======================================================= */

  const root = document.documentElement;
  const body = document.body;

  const siteHeader = document.getElementById("siteHeader");

  const menuButton = document.getElementById("menuButton");
  const closeMenuButton =
    document.getElementById("closeMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  const searchButton =
    document.getElementById("searchButton");
  const closeSearchButton =
    document.getElementById("closeSearchButton");
  const searchPanel =
    document.getElementById("searchPanel");
  const searchForm =
    document.getElementById("searchForm");
  const searchInput =
    document.getElementById("searchInput");
  const searchMessage =
    document.getElementById("searchMessage");
  const searchResults =
    document.getElementById("searchResults");
  const searchTagButtons =
    document.querySelectorAll("[data-search-term]");

  const pageOverlay =
    document.getElementById("pageOverlay");
  const readingProgress =
    document.getElementById("readingProgress");
  const postContent =
    document.querySelector(".post-content");

  const backToTop =
    document.getElementById("backToTop");
  const currentYear =
    document.getElementById("currentYear");

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
    /*
     * localStorage ممکن است در حالت خصوصی مرورگر
     * یا به‌دلیل تنظیمات امنیتی در دسترس نباشد.
     */
  }

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
    const temporaryElement =
      document.createElement("div");

    temporaryElement.textContent = String(value);

    return temporaryElement.innerHTML;
  }

  function prefersReducedMotion() {
    return Boolean(
      window.matchMedia &&
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
    );
  }

  function isMobileMenuOpen() {
    return (
      mobileMenu?.classList.contains("is-open") ??
      false
    );
  }

  function isSearchOpen() {
    return (
      searchPanel?.classList.contains("is-open") ??
      false
    );
  }

  function updateOverlay() {
    if (!pageOverlay) return;

    const shouldShowOverlay =
      isMobileMenuOpen() || isSearchOpen();

    pageOverlay.classList.toggle(
      "is-visible",
      shouldShowOverlay
    );

    pageOverlay.setAttribute(
      "aria-hidden",
      shouldShowOverlay ? "false" : "true"
    );

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
    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );
    menuButton.setAttribute(
      "aria-label",
      "بستن منوی اصلی"
    );

    updateOverlay();

    const firstFocusableElement =
      mobileMenu.querySelector(
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
    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );
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

  closeMenuButton?.addEventListener(
    "click",
    () => {
      closeMobileMenu();
    }
  );

  mobileMenu
    ?.querySelectorAll("a")
    .forEach((link) => {
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
    searchPanel.setAttribute(
      "aria-hidden",
      "false"
    );

    searchButton.setAttribute(
      "aria-expanded",
      "true"
    );
    searchButton.setAttribute(
      "aria-label",
      "بستن جست‌وجو"
    );

    updateOverlay();

    window.setTimeout(() => {
      searchInput?.focus();
    }, 100);
  }

  function closeSearchPanel(returnFocus = true) {
    if (!searchPanel || !searchButton) return;

    const wasOpen = isSearchOpen();

    searchPanel.classList.remove("is-open");
    searchPanel.setAttribute(
      "aria-hidden",
      "true"
    );

    searchButton.setAttribute(
      "aria-expanded",
      "false"
    );
    searchButton.setAttribute(
      "aria-label",
      "بازکردن جست‌وجو"
    );

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

  closeSearchButton?.addEventListener(
    "click",
    () => {
      closeSearchPanel();
    }
  );

  pageOverlay?.addEventListener("click", () => {
    closeMobileMenu(false);
    closeSearchPanel(false);
    updateOverlay();
  });

 document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const pageOverlay = document.getElementById("pageOverlay");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuButton = document.getElementById("menuButton");
  const closeMenuButton = document.getElementById("closeMenuButton");

  const searchPanel = document.getElementById("searchPanel");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchMessage = document.getElementById("searchMessage");
  const searchResults = document.getElementById("searchResults");
  const closeSearchButton = document.getElementById("closeSearchButton");
  const searchOpenButtons = document.querySelectorAll(".js-open-search");
  const searchTagButtons = document.querySelectorAll("[data-search-term]");

  let searchIndex = [];
  let searchIndexLoaded = false;
  let searchIndexLoading = false;

  function setOverlayState(isVisible) {
    if (!pageOverlay) return;
    pageOverlay.classList.toggle("is-visible", isVisible);
    pageOverlay.setAttribute("aria-hidden", String(!isVisible));
  }

  function closeMobileMenu() {
    if (!mobileMenu || !menuButton) return;
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuButton.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
    setOverlayState(false);
  }

  function openMobileMenu() {
    if (!mobileMenu || !menuButton) return;
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    menuButton.setAttribute("aria-expanded", "true");
    body.classList.add("menu-open");
    setOverlayState(true);
  }

  function openSearchPanel() {
    if (!searchPanel) return;

    closeMobileMenu();

    searchPanel.classList.add("is-open");
    searchPanel.setAttribute("aria-hidden", "false");
    body.classList.add("search-open");
    setOverlayState(true);

    searchOpenButtons.forEach((button) => {
      button.setAttribute("aria-expanded", "true");
    });

    window.setTimeout(() => {
      searchInput?.focus();
    }, 60);

    if (!searchIndexLoaded && !searchIndexLoading) {
      loadSearchIndex();
    }
  }

  function closeSearchPanel() {
    if (!searchPanel) return;

    searchPanel.classList.remove("is-open");
    searchPanel.setAttribute("aria-hidden", "true");
    body.classList.remove("search-open");

    searchOpenButtons.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });

    setOverlayState(false);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  }

  function renderSearchResults(items, query) {
    if (!searchResults || !searchMessage) return;

    if (!query) {
      searchMessage.textContent = "برای شروع، عبارتی را وارد کنید.";
      searchResults.innerHTML = "";
      return;
    }

    if (!items.length) {
      searchMessage.textContent = `نتیجه‌ای برای «${query}» پیدا نشد.`;
      searchResults.innerHTML = "";
      return;
    }

    searchMessage.textContent = `${items.length} نتیجه برای «${query}» پیدا شد.`;

    searchResults.innerHTML = items
      .map((item) => {
        const excerpt = item.excerpt || item.content || "";
        return `
          <article class="search-result-item">
            <a class="search-result-link" href="${item.url}">
              <div class="search-result-meta">
                <span>${escapeHtml(item.date || "")}</span>
              </div>
              <h3>${escapeHtml(item.title || "بدون عنوان")}</h3>
              <p>${escapeHtml(excerpt)}</p>
            </a>
          </article>
        `;
      })
      .join("");
  }

  function runSearch(rawQuery) {
    const query = normalizeText(rawQuery);

    if (!query) {
      renderSearchResults([], "");
      return;
    }

    const results = searchIndex.filter((item) => {
      const haystack = normalizeText([
        item.title,
        item.excerpt,
        item.content,
        Array.isArray(item.categories) ? item.categories.join(" ") : "",
        Array.isArray(item.tags) ? item.tags.join(" ") : ""
      ].join(" "));

      return haystack.includes(query);
    });

    renderSearchResults(results, rawQuery.trim());
  }

  async function loadSearchIndex() {
    searchIndexLoading = true;

    if (searchMessage) {
      searchMessage.textContent = "در حال بارگذاری جست‌وجو...";
    }

    try {
      const response = await fetch("/search.json", {
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to load search index.");
      }

      const data = await response.json();
      searchIndex = Array.isArray(data) ? data : [];
      searchIndexLoaded = true;

      if (searchInput?.value.trim()) {
        runSearch(searchInput.value);
      } else if (searchMessage) {
        searchMessage.textContent = "برای شروع، عبارتی را وارد کنید.";
      }
    } catch (error) {
      if (searchMessage) {
        searchMessage.textContent = "بارگذاری جست‌وجو انجام نشد.";
      }
      searchResults.innerHTML = "";
      console.error(error);
    } finally {
      searchIndexLoading = false;
    }
  }

  menuButton?.addEventListener("click", () => {
    const isOpen = mobileMenu?.classList.contains("is-open");
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  closeMenuButton?.addEventListener("click", closeMobileMenu);

  searchOpenButtons.forEach((button) => {
    button.addEventListener("click", openSearchPanel);
  });

  closeSearchButton?.addEventListener("click", closeSearchPanel);

  pageOverlay?.addEventListener("click", () => {
    closeMobileMenu();
    closeSearchPanel();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
      closeSearchPanel();
    }
  });

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    runSearch(searchInput?.value || "");
  });

  searchInput?.addEventListener("input", (event) => {
    runSearch(event.target.value);
  });

  searchTagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const term = button.getAttribute("data-search-term") || "";
      if (!searchInput) return;

      searchInput.value = term;
      runSearch(term);
      searchInput.focus();
    });
  });

  if (searchMessage) {
    searchMessage.textContent = "برای شروع، عبارتی را وارد کنید.";
  }
});

  /* =======================================================
     Reading progress
  ======================================================= */

  function updateReadingProgress() {
    if (!readingProgress) return;

    if (!postContent) {
      readingProgress.style.transform =
        "scaleX(0)";

      readingProgress.hidden = true;

      return;
    }

    readingProgress.hidden = false;

    const contentRect =
      postContent.getBoundingClientRect();

    const contentTop =
      window.scrollY + contentRect.top;

    const contentHeight =
      postContent.offsetHeight;

    const viewportReferenceOffset =
      window.innerHeight * 0.35;

    const viewportReference =
      window.scrollY +
      viewportReferenceOffset;

    const readableDistance = Math.max(
      contentHeight -
        viewportReferenceOffset,
      1
    );

    const progress = Math.min(
      Math.max(
        (
          viewportReference -
          contentTop
        ) / readableDistance,
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
        shouldShowButton
          ? "false"
          : "true"
      );

      backToTop.tabIndex =
        shouldShowButton ? 0 : -1;
    }

    if (siteHeader) {
      siteHeader.classList.toggle(
        "is-scrolled",
        scrollPosition > 20
      );
    }

    updateReadingProgress();
  }

  backToTop?.addEventListener(
    "click",
    () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion()
          ? "auto"
          : "smooth"
      });
    }
  );

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
    {
      passive: true
    }
  );

  window.addEventListener(
    "resize",
    () => {
      updateScrollInterface();

      /*
       * اگر عرض صفحه از حالت موبایل بزرگ‌تر شد،
       * منوی موبایل به‌صورت خودکار بسته می‌شود.
       */

      if (
        window.innerWidth > 900 &&
        isMobileMenuOpen()
      ) {
        closeMobileMenu(false);
      }
    }
  );

  /* =======================================================
     Keyboard interactions
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {
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

      const activeElement =
        document.activeElement;

      const activeTag =
        activeElement?.tagName;

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
        openSearchPanel();
      }
    }
  );

  /* =======================================================
     Footer year
  ======================================================= */

  if (currentYear) {
    currentYear.textContent =
      new Intl.DateTimeFormat(
        "fa-IR",
        {
          year: "numeric"
        }
      ).format(new Date());
  }

  /* =======================================================
     Initial state
  ======================================================= */

  clearSearchResults();
  updateOverlay();
  updateScrollInterface();
  /* =======================================================
   Modern journal section
======================================================= */

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(".latest-section");

    if (!section) {
      return;
    }

    const cards = Array.from(
      section.querySelectorAll("[data-latest-card]")
    );

    const filterButtons = Array.from(
      section.querySelectorAll(".latest-filter")
    );

    const emptyState = section.querySelector("#latestEmpty");
    const loadMoreButton = section.querySelector("#latestLoadMore");
    const loadMoreWrapper = section.querySelector(
      "#latestLoadMoreWrapper"
    );

    if (!cards.length) {
      return;
    }

    const initialVisibleCount = 7;
    const loadMoreStep = 4;

    let activeFilter = "all";
    let visibleCount = initialVisibleCount;

    /**
     * کارت‌های سازگار با فیلتر فعلی را برمی‌گرداند.
     */
    function getFilteredCards() {
      return cards.filter(function (card) {
        const category = card.dataset.category;

        return (
          activeFilter === "all" ||
          category === activeFilter
        );
      });
    }

    /**
     * وضعیت کارت‌ها، حالت خالی و دکمه نمایش بیشتر را به‌روزرسانی می‌کند.
     */
    function renderCards(options = {}) {
      const shouldAnimate = options.animate === true;
      const filteredCards = getFilteredCards();

      cards.forEach(function (card) {
        card.hidden = true;
        card.classList.remove("is-visible");
      });

      filteredCards.forEach(function (card, index) {
        if (index < visibleCount) {
          card.hidden = false;

          if (shouldAnimate) {
            requestAnimationFrame(function () {
              card.classList.add("is-visible");
            });
          }
        }
      });

      if (emptyState) {
        emptyState.hidden = filteredCards.length !== 0;
      }

      if (loadMoreWrapper) {
        loadMoreWrapper.hidden =
          filteredCards.length === 0 ||
          visibleCount >= filteredCards.length;
      }
    }

    /**
     * فعال‌سازی دکمه فیلتر انتخاب‌شده
     */
    function setActiveFilter(button) {
      filterButtons.forEach(function (filterButton) {
        const isCurrentButton = filterButton === button;

        filterButton.classList.toggle(
          "is-active",
          isCurrentButton
        );

        filterButton.setAttribute(
          "aria-pressed",
          String(isCurrentButton)
        );
      });
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        activeFilter = button.dataset.filter || "all";
        visibleCount = initialVisibleCount;

        setActiveFilter(button);
        renderCards({ animate: true });
      });
    });

    if (loadMoreButton) {
      loadMoreButton.addEventListener("click", function () {
        const previouslyVisible = visibleCount;

        visibleCount += loadMoreStep;
        renderCards({ animate: true });

        const filteredCards = getFilteredCards();
        const firstNewCard = filteredCards[previouslyVisible];

        if (firstNewCard) {
          firstNewCard.setAttribute("tabindex", "-1");
          firstNewCard.focus({
            preventScroll: true
          });

          firstNewCard.scrollIntoView({
            behavior: window.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches
              ? "auto"
              : "smooth",
            block: "center"
          });
        }
      });
    }

    renderCards();
  });
</script>

});
