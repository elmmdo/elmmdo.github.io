(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const siteNav = document.querySelector("[data-site-nav]");
  const progressBar = document.querySelector("[data-reading-progress]");
  const revealItems = document.querySelectorAll("[data-reveal]");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme = root.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      root.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);
    });
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  if (progressBar) {
    window.addEventListener("scroll", function () {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      progressBar.style.width = progress + "%";
    });
  }

  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }
})();
/* ========================================
   Single Post Enhancements
======================================== */

(() => {
  "use strict";

  const whenReady = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
      return;
    }

    callback();
  };

  const normalizePersianNumbers = (value) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

    return String(value).replace(/\d/g, (digit) => persianDigits[Number(digit)]);
  };

  const createHeadingId = (heading, index, usedIds) => {
    if (heading.id && !usedIds.has(heading.id)) {
      usedIds.add(heading.id);
      return heading.id;
    }

    const baseId = heading.textContent
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || `section-${index + 1}`;

    let uniqueId = baseId;
    let suffix = 2;

    while (usedIds.has(uniqueId) || document.getElementById(uniqueId)) {
      uniqueId = `${baseId}-${suffix}`;
      suffix += 1;
    }

    usedIds.add(uniqueId);
    heading.id = uniqueId;

    return uniqueId;
  };

  const buildTableOfContents = () => {
    const article = document.querySelector("[data-post-content]");
    const toc = document.querySelector("[data-toc]");

    if (!article || !toc) {
      return;
    }

    const headings = [...article.querySelectorAll("h2, h3")].filter(
      (heading) => heading.textContent.trim().length > 0
    );

    if (headings.length === 0) {
      toc.innerHTML =
        '<p class="post-toc__empty">این نوشته فهرست مطالب ندارد.</p>';
      return;
    }

    const usedIds = new Set();
    const rootList = document.createElement("ol");
    const links = [];
    let currentSublist = null;

    headings.forEach((heading, index) => {
      const headingId = createHeadingId(heading, index, usedIds);
      const listItem = document.createElement("li");
      const link = document.createElement("a");

      link.href = `#${encodeURIComponent(headingId)}`;
      link.textContent = heading.textContent.trim();
      link.dataset.targetId = headingId;

      link.addEventListener("click", (event) => {
        event.preventDefault();

        heading.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        if (window.history.pushState) {
          window.history.pushState(null, "", `#${encodeURIComponent(headingId)}`);
        }
      });

      listItem.appendChild(link);
      links.push(link);

      if (heading.tagName === "H2") {
        rootList.appendChild(listItem);
        currentSublist = null;
        return;
      }

      const lastRootItem = rootList.lastElementChild;

      if (!lastRootItem) {
        rootList.appendChild(listItem);
        return;
      }

      if (!currentSublist) {
        currentSublist = document.createElement("ol");
        lastRootItem.appendChild(currentSublist);
      }

      currentSublist.appendChild(listItem);
    });

    toc.replaceChildren(rootList);

    activateCurrentHeading(headings, links);
  };

  const activateCurrentHeading = (headings, links) => {
    if (!("IntersectionObserver" in window)) {
      if (links[0]) {
        links[0].classList.add("is-active");
      }

      return;
    }

    const visibleHeadings = new Map();

    const setActiveLink = () => {
      let activeHeading = null;

      headings.forEach((heading) => {
        const state = visibleHeadings.get(heading.id);

        if (!state?.isIntersecting) {
          return;
        }

        if (
          !activeHeading ||
          Math.abs(state.top) < Math.abs(visibleHeadings.get(activeHeading.id).top)
        ) {
          activeHeading = heading;
        }
      });

      if (!activeHeading) {
        const scrollPosition = window.scrollY + 160;

        activeHeading =
          [...headings]
            .reverse()
            .find((heading) => heading.offsetTop <= scrollPosition) ||
          headings[0];
      }

      links.forEach((link) => {
        const isActive = link.dataset.targetId === activeHeading?.id;

        link.classList.toggle("is-active", isActive);

        if (isActive) {
          link.setAttribute("aria-current", "location");
          link.scrollIntoView({ block: "nearest" });
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleHeadings.set(entry.target.id, {
            isIntersecting: entry.isIntersecting,
            top: entry.boundingClientRect.top
          });
        });

        setActiveLink();
      },
      {
        rootMargin: "-110px 0px -65% 0px",
        threshold: [0, 1]
      }
    );

    headings.forEach((heading) => observer.observe(heading));

    window.addEventListener("scroll", setActiveLink, { passive: true });
    setActiveLink();
  };

  const initializeCopyLink = () => {
    const copyButton = document.querySelector("[data-copy-link]");

    if (!copyButton) {
      return;
    }

    const label = copyButton.querySelector("[data-copy-label]");
    const initialLabel = label?.textContent || "کپی لینک";
    let resetTimer;

    const updateButton = (message, copied = false) => {
      if (label) {
        label.textContent = message;
      }

      copyButton.classList.toggle("is-copied", copied);

      window.clearTimeout(resetTimer);

      resetTimer = window.setTimeout(() => {
        if (label) {
          label.textContent = initialLabel;
        }

        copyButton.classList.remove("is-copied");
      }, 2200);
    };

    const fallbackCopy = (text) => {
      const textarea = document.createElement("textarea");

      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.select();

      const copied = document.execCommand("copy");
      textarea.remove();

      return copied;
    };

    copyButton.addEventListener("click", async () => {
      const pageUrl = window.location.href;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(pageUrl);
        } else if (!fallbackCopy(pageUrl)) {
          throw new Error("Copy operation failed");
        }

        updateButton("لینک کپی شد", true);
      } catch {
        updateButton("کپی انجام نشد");
      }
    });
  };

  const initializeArticleProgress = () => {
    const article = document.querySelector("[data-post-content]");
    const progressBar = document.querySelector("[data-article-progress]");
    const progressLabel = document.querySelector(
      "[data-article-progress-label]"
    );

    if (!article || (!progressBar && !progressLabel)) {
      return;
    }

    let ticking = false;

    const updateProgress = () => {
      const articleRect = article.getBoundingClientRect();
      const articleTop = window.scrollY + articleRect.top;
      const readableDistance = Math.max(
        article.offsetHeight - window.innerHeight * 0.45,
        1
      );

      const currentDistance = window.scrollY - articleTop + 140;
      const progress = Math.min(
        100,
        Math.max(0, (currentDistance / readableDistance) * 100)
      );

      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }

      if (progressLabel) {
        progressLabel.textContent = `${normalizePersianNumbers(
          Math.round(progress)
        )}٪`;
      }

      ticking = false;
    };

    const requestProgressUpdate = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", requestProgressUpdate, {
      passive: true
    });

    window.addEventListener("resize", requestProgressUpdate, {
      passive: true
    });

    requestProgressUpdate();
  };

  const openInitialHeading = () => {
    if (!window.location.hash) {
      return;
    }

    try {
      const headingId = decodeURIComponent(window.location.hash.slice(1));
      const heading = document.getElementById(headingId);

      if (!heading) {
        return;
      }

      window.setTimeout(() => {
        heading.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 150);
    } catch {
      // آدرس‌های دارای fragment نامعتبر نادیده گرفته می‌شوند.
    }
  };

  whenReady(() => {
    buildTableOfContents();
    initializeCopyLink();
    initializeArticleProgress();
    openInitialHeading();
  });
})();
