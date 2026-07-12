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
     Permanent light mode
  ======================================================= */

  function forceLightMode() {
    root.setAttribute("data-theme", "light");
    root.style.colorScheme = "light";

    root.classList.remove(
      "dark",
      "dark-mode",
      "night",
      "night-mode",
      "theme-dark"
    );

    body.classList.remove(
      "dark",
      "dark-mode",
      "night",
      "night-mode",
      "theme-dark"
    );

    body.classList.add("light-mode");

    body.removeAttribute("data-theme");
    body.setAttribute("data-theme", "light");

    try {
      localStorage.removeItem("site-theme");
      localStorage.removeItem("dark-mode");
      localStorage.removeItem("darkMode");
      localStorage.removeItem("color-theme");
      localStorage.removeItem("night-mode");

      localStorage.setItem("theme", "light");
      localStorage.setItem("site-theme", "light");
    } catch (error) {
      /*
       * در صورت غیرفعال‌بودن localStorage،
       * ظاهر روشن همچنان از طریق HTML حفظ می‌شود.
       */
    }
  }

  forceLightMode();

  /*
   * اگر اسکریپت دیگری بعداً تلاش کند حالت تاریک
   * را فعال کند، دوباره حالت روشن اعمال می‌شود.
   */

  const themeObserver = new MutationObserver(() => {
    const rootHasDarkClass =
      root.classList.contains("dark") ||
      root.classList.contains("dark-mode") ||
      root.classList.contains("night") ||
      root.classList.contains("night-mode") ||
      root.classList.contains("theme-dark");

    const bodyHasDarkClass =
      body.classList.contains("dark") ||
      body.classList.contains("dark-mode") ||
      body.classList.contains("night") ||
      body.classList.contains("night-mode") ||
      body.classList.contains("theme-dark");

    const rootTheme =
      root.getAttribute("data-theme");

    const bodyTheme =
      body.getAttribute("data-theme");

    if (
      rootHasDarkClass ||
      bodyHasDarkClass ||
      rootTheme !== "light" ||
      bodyTheme !== "light"
    ) {
      forceLightMode();
    }
  });

  themeObserver.observe(root, {
    attributes: true,
    attributeFilter: ["class", "data-theme"]
  });

  themeObserver.observe(body, {
    attributes: true,
    attributeFilter: ["class", "data-theme"]
  });

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
    menuButton.setAttribute("aria-expanded", "true");
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
    searchPanel.setAttribute("aria-hidden", "false");

    searchButton.setAttribute("aria-expanded", "true");
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
    searchPanel.setAttribute("aria-hidden", "true");

    searchButton.setAttribute("aria-expanded", "false");
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

  let searchItems = [];
  let searchIndexLoaded = false;
  let searchIndexLoading = false;
  let searchIndexPromise = null;
  let latestSearchRequest = 0;
  let searchInputTimeout;

  function getSearchIndexUrl() {
    const baseUrl =
      document
        .querySelector('meta[name="baseurl"]')
        ?.getAttribute("content")
        ?.trim() || "";

    return `${baseUrl.replace(/\/$/, "")}/search.json`;
  }

  function createSearchableItem(item = {}) {
    const title = item.title || "";
    const description = item.description || "";
    const category = item.category || "";

    const itemTags = Array.isArray(item.tags)
      ? item.tags
      : typeof item.tags === "string"
        ? item.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [];

    const searchableTags = itemTags.join(" ");

    return {
      title,
      description,
      category,
      tags: itemTags,
      url: item.url || "",
      date: item.date || "",
      searchableText: normalizePersianText(
        `${title} ${description} ${category} ${searchableTags}`
      )
    };
  }

  /*
   * نسخه اصلاح‌شده:
   * querySelectorAll تمام کارت‌های صفحه را برمی‌گرداند.
   */

  function collectSearchItemsFromPage() {
    const selectors = [
      "[data-search-item]",
      ".post-card",
      ".article-card",
      ".featured-card",
      "article.post-preview",
      "[data-journal-card]"
    ];

    const elements = Array.from(
      document.querySelectorAll(
        selectors.join(",")
      )
    );

    const uniqueElements = [
      ...new Set(elements)
    ];

    return uniqueElements
      .map((element) => {
        const titleElement =
          element.querySelector(
            "[data-search-title], h1, h2, h3, .post-title, .card-title, .journal-card-title"
          );

        const descriptionElement =
          element.querySelector(
            "[data-search-description], .post-excerpt, .card-excerpt, .journal-card-excerpt, p"
          );

        const categoryElement =
          element.querySelector(
            "[data-search-category], .post-category, .card-category, .journal-card-category"
          );

        const linkElement =
          element.matches("a[href]")
            ? element
            : element.querySelector("a[href]");

        const tags =
          element.dataset.searchTags
            ?.split(",")
            .map((tag) => tag.trim())
            .filter(Boolean) || [];

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
            element.dataset.category ||
            categoryElement?.textContent?.trim() ||
            "",

          tags,

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
        const response = await fetch(
          getSearchIndexUrl(),
          {
            headers: {
              Accept: "application/json"
            },
            cache: "no-cache"
          }
        );

        if (!response.ok) {
          throw new Error(
            `Search index request failed: ${response.status}`
          );
        }

        const data = await response.json();

        searchItems = Array.isArray(data)
          ? data
              .map(createSearchableItem)
              .filter(
                (item) => item.title && item.url
              )
          : [];

        /*
         * اگر search.json خالی بود، اطلاعات
         * از کارت‌های صفحه دریافت می‌شود.
         */

        if (searchItems.length === 0) {
          searchItems =
            collectSearchItemsFromPage();
        }

        searchIndexLoaded = true;

        return searchItems;
      } catch (error) {
        searchItems =
          collectSearchItemsFromPage();

        searchIndexLoaded = true;

        return searchItems;
      } finally {
        searchIndexLoading = false;
        searchIndexPromise = null;
      }
    })();

    return searchIndexPromise;
  }

  function clearSearchResults() {
    latestSearchRequest += 1;

    if (searchResults) {
      searchResults.innerHTML = "";
    }

    if (searchMessage) {
      searchMessage.textContent = "";
    }
  }

  function renderSearchResultItems(results) {
    if (!searchResults) return;

    const resultList =
      document.createElement("div");

    resultList.className =
      "search-results-list";

    results.forEach((item) => {
      const result =
        document.createElement("a");

      result.className =
        "search-result-item";

      result.href = item.url;

      result.innerHTML = `
        <span class="search-result-content">
          ${
            item.category
              ? `<small>${escapeHTML(
                  item.category
                )}</small>`
              : ""
          }

          <strong>
            ${escapeHTML(item.title)}
          </strong>

          ${
            item.description
              ? `<span>${escapeHTML(
                  item.description
                )}</span>`
              : ""
          }
        </span>

        <span
          class="search-result-arrow"
          aria-hidden="true"
        >
          ←
        </span>
      `;

      resultList.appendChild(result);
    });

    searchResults.appendChild(resultList);
  }

  async function renderSearchResults(query) {
    if (!searchResults || !searchMessage) {
      return;
    }

    const requestId =
      ++latestSearchRequest;

    const normalizedQuery =
      normalizePersianText(query);

    searchResults.innerHTML = "";

    if (normalizedQuery.length < 2) {
      searchMessage.textContent =
        "برای جست‌وجو دست‌کم دو نویسه وارد کنید.";

      return;
    }

    searchMessage.textContent =
      "در حال جست‌وجو...";

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

  searchForm?.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      window.clearTimeout(searchInputTimeout);

      renderSearchResults(
        searchInput?.value || ""
      );
    }
  );

  searchInput?.addEventListener(
    "input",
    () => {
      const query =
        searchInput.value.trim();

      window.clearTimeout(searchInputTimeout);

      if (!query) {
        clearSearchResults();
        return;
      }

      searchInputTimeout =
        window.setTimeout(() => {
          renderSearchResults(query);
        }, 180);
    }
  );

  searchTagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const term =
        button.dataset.searchTerm || "";

      window.clearTimeout(searchInputTimeout);

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
      window.scrollY + viewportReferenceOffset;

    const readableDistance = Math.max(
      contentHeight - viewportReferenceOffset,
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
     Modern journal section
  ======================================================= */

  const journalSection =
    document.querySelector(".journal-section");

  const journalGrid =
    document.getElementById("articleList");

  const journalCards = Array.from(
    document.querySelectorAll(
      "[data-journal-card]"
    )
  );

  const journalFilterButtons = Array.from(
    document.querySelectorAll(
      ".journal-filter"
    )
  );

  const journalLoadMoreButton =
    document.getElementById("loadMoreButton");

  const journalEmptyState =
    document.getElementById(
      "articlesEmptyState"
    );

  const journalReducedMotion =
    prefersReducedMotion();

  const journalInitialLimit = 7;
  const journalLoadStep = 6;

  let journalActiveFilter = "all";
  let journalVisibleLimit =
    journalInitialLimit;

  /* =======================================================
     Journal helpers
  ======================================================= */

  function getJournalCardCategories(card) {
    const rawCategories =
      card.dataset.category ||
      card.dataset.categories ||
      card.dataset.filter ||
      "all";

    return normalizePersianText(rawCategories)
      .split(/[,،|]/)
      .map((category) => category.trim())
      .filter(Boolean);
  }

  function journalCardMatchesFilter(card) {
    if (journalActiveFilter === "all") {
      return true;
    }

    const categories =
      getJournalCardCategories(card);

    return categories.includes(
      normalizePersianText(
        journalActiveFilter
      )
    );
  }

  function revealJournalCard(
    card,
    delay = 0
  ) {
    if (!card || card.hidden) return;

    if (journalReducedMotion) {
      card.classList.add("is-revealed");
      return;
    }

    window.setTimeout(() => {
      if (!card.hidden) {
        card.classList.add(
          "is-revealed"
        );
      }
    }, delay);
  }

  /* =======================================================
     Journal IntersectionObserver
  ======================================================= */

  let journalObserver = null;

  if (
    "IntersectionObserver" in window &&
    !journalReducedMotion
  ) {
    journalObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            revealJournalCard(
              entry.target
            );

            journalObserver?.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -35px 0px"
        }
      );
  }

  function observeVisibleJournalCards() {
    const visibleCards =
      journalCards.filter(
        (card) => !card.hidden
      );

    visibleCards.forEach(
      (card, index) => {
        if (
          journalReducedMotion ||
          !journalObserver
        ) {
          revealJournalCard(
            card,
            Math.min(index * 60, 300)
          );

          return;
        }

        journalObserver.unobserve(card);
        journalObserver.observe(card);
      }
    );
  }

  /* =======================================================
     Render journal cards
  ======================================================= */

  function renderJournalCards() {
    if (
      !journalSection ||
      journalCards.length === 0
    ) {
      return;
    }

    const matchingCards =
      journalCards.filter(
        journalCardMatchesFilter
      );

    journalCards.forEach((card) => {
      card.hidden = true;
      card.classList.remove(
        "is-visible"
      );
    });

    matchingCards.forEach(
      (card, index) => {
        const shouldShow =
          index < journalVisibleLimit;

        card.hidden = !shouldShow;

        card.classList.toggle(
          "is-visible",
          shouldShow
        );

        if (!shouldShow) {
          card.classList.remove(
            "is-revealed"
          );
        }
      }
    );

    const visibleCards =
      matchingCards.slice(
        0,
        journalVisibleLimit
      );

    if (journalEmptyState) {
      const isEmpty =
        matchingCards.length === 0;

      journalEmptyState.hidden =
        !isEmpty;

      journalEmptyState.setAttribute(
        "aria-hidden",
        isEmpty ? "false" : "true"
      );
    }

    if (journalLoadMoreButton) {
      const hasMore =
        matchingCards.length >
        journalVisibleLimit;

      journalLoadMoreButton.hidden =
        !hasMore;

      journalLoadMoreButton.setAttribute(
        "aria-hidden",
        hasMore ? "false" : "true"
      );

      journalLoadMoreButton.disabled =
        !hasMore;
    }

    if (journalGrid) {
      journalGrid.classList.toggle(
        "is-empty",
        matchingCards.length === 0
      );

      journalGrid.setAttribute(
        "aria-live",
        "polite"
      );
    }

    visibleCards.forEach(
      (card, index) => {
        if (card.classList.contains(
          "is-revealed"
        )) {
          return;
        }

        if (
          journalReducedMotion ||
          !journalObserver
        ) {
          revealJournalCard(
            card,
            Math.min(index * 60, 300)
          );
        }
      }
    );

    observeVisibleJournalCards();
  }

  /* =======================================================
     Journal category filters
  ======================================================= */

  journalFilterButtons.forEach(
    (button) => {
      button.addEventListener(
        "click",
        () => {
          const selectedFilter =
            button.dataset.filter ||
            button.dataset.category ||
            "all";

          journalActiveFilter =
            normalizePersianText(
              selectedFilter
            ) || "all";

          journalVisibleLimit =
            journalInitialLimit;

          journalFilterButtons.forEach(
            (filterButton) => {
              const isActive =
                filterButton === button;

              filterButton.classList.toggle(
                "is-active",
                isActive
              );

              filterButton.setAttribute(
                "aria-pressed",
                isActive
                  ? "true"
                  : "false"
              );
            }
          );

          renderJournalCards();
        }
      );
    }
  );

  /* =======================================================
     Journal load more
  ======================================================= */

  journalLoadMoreButton?.addEventListener(
    "click",
    () => {
      const previousVisibleLimit =
        journalVisibleLimit;

      journalVisibleLimit +=
        journalLoadStep;

      renderJournalCards();

      const matchingCards =
        journalCards.filter(
          journalCardMatchesFilter
        );

      const firstNewCard =
        matchingCards[
          previousVisibleLimit
        ];

      if (firstNewCard) {
        window.setTimeout(() => {
          firstNewCard.scrollIntoView({
            behavior:
              journalReducedMotion
                ? "auto"
                : "smooth",
            block: "center"
          });
        }, 120);
      }
    }
  );

  /* =======================================================
     Journal card mouse tilt
  ======================================================= */

  function resetJournalCardTilt(card) {
    card.style.removeProperty(
      "--journal-rotate-x"
    );

    card.style.removeProperty(
      "--journal-rotate-y"
    );

    card.style.removeProperty(
      "--journal-pointer-x"
    );

    card.style.removeProperty(
      "--journal-pointer-y"
    );

    card.classList.remove(
      "is-tilting"
    );
  }

  if (
    !journalReducedMotion &&
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches
  ) {
    journalCards.forEach((card) => {
      card.addEventListener(
        "pointermove",
        (event) => {
          if (card.hidden) return;

          const rect =
            card.getBoundingClientRect();

          const pointerX =
            event.clientX - rect.left;

          const pointerY =
            event.clientY - rect.top;

          const normalizedX =
            pointerX / rect.width;

          const normalizedY =
            pointerY / rect.height;

          const rotateY =
            (normalizedX - 0.5) * 4;

          const rotateX =
            (0.5 - normalizedY) * 4;

          card.style.setProperty(
            "--journal-rotate-x",
            `${rotateX.toFixed(2)}deg`
          );

          card.style.setProperty(
            "--journal-rotate-y",
            `${rotateY.toFixed(2)}deg`
          );

          card.style.setProperty(
            "--journal-pointer-x",
            `${(normalizedX * 100).toFixed(
              1
            )}%`
          );

          card.style.setProperty(
            "--journal-pointer-y",
            `${(normalizedY * 100).toFixed(
              1
            )}%`
          );

          card.classList.add(
            "is-tilting"
          );
        }
      );

      card.addEventL
