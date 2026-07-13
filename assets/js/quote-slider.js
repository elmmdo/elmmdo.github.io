document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".quote-slider");

  sliders.forEach(function (slider) {
    const slides = Array.from(
      slider.querySelectorAll(".quote-card")
    );

    const dotsContainer = slider.querySelector(
      ".quote-slider__dots"
    );

    const previousButton = slider.querySelector(
      ".quote-slider__arrow--prev"
    );

    const nextButton = slider.querySelector(
      ".quote-slider__arrow--next"
    );

    const controls = slider.querySelector(
      ".quote-slider__controls"
    );

    const progress = slider.querySelector(
      ".quote-slider__progress"
    );

    const interval = Number(slider.dataset.interval) || 6000;

    let currentIndex = slides.findIndex(function (slide) {
      return slide.classList.contains("is-active");
    });

    let autoplayTimer = null;

    if (!slides.length) {
      return;
    }

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    slider.style.setProperty(
      "--quote-duration",
      interval + "ms"
    );

    slides.forEach(function (slide, index) {
      const isCurrent = index === currentIndex;

      slide.classList.toggle("is-active", isCurrent);
      slide.setAttribute(
        "aria-hidden",
        isCurrent ? "false" : "true"
      );

      if (!dotsContainer) {
        return;
      }

      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "quote-slider__dot";
      dot.setAttribute(
        "aria-label",
        "نمایش نقل‌قول شماره " + (index + 1)
      );

      if (isCurrent) {
        dot.classList.add("is-active");
        dot.setAttribute("aria-current", "true");
      }

      dot.addEventListener("click", function () {
        showSlide(index);
        restartAutoplay();
      });

      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer
      ? Array.from(
          dotsContainer.querySelectorAll(".quote-slider__dot")
        )
      : [];

    function restartProgress() {
      slider.classList.remove("is-playing");

      void slider.offsetWidth;

      slider.classList.add("is-playing");
    }

    function showSlide(index) {
      if (index < 0) {
        index = slides.length - 1;
      }

      if (index >= slides.length) {
        index = 0;
      }

      slides.forEach(function (slide, slideIndex) {
        const isCurrent = slideIndex === index;

        slide.classList.toggle("is-active", isCurrent);
        slide.setAttribute(
          "aria-hidden",
          isCurrent ? "false" : "true"
        );
      });

      dots.forEach(function (dot, dotIndex) {
        const isCurrent = dotIndex === index;

        dot.classList.toggle("is-active", isCurrent);

        if (isCurrent) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });

      currentIndex = index;
      restartProgress();
    }

    function showNextSlide() {
      showSlide(currentIndex + 1);
    }

    function showPreviousSlide() {
      showSlide(currentIndex - 1);
    }

    function stopAutoplay() {
      if (autoplayTimer !== null) {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
      }

      slider.classList.remove("is-playing");
    }

    function startAutoplay() {
      if (slides.length <= 1) {
        return;
      }

      stopAutoplay();

      autoplayTimer = window.setInterval(
        showNextSlide,
        interval
      );

      restartProgress();
    }

    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    if (previousButton) {
      previousButton.addEventListener("click", function () {
        showPreviousSlide();
        restartAutoplay();
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        showNextSlide();
        restartAutoplay();
      });
    }

    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", startAutoplay);
    slider.addEventListener("focusin", stopAutoplay);

    slider.addEventListener("focusout", function (event) {
      if (!slider.contains(event.relatedTarget)) {
        startAutoplay();
      }
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    if (slides.length === 1) {
      if (controls) {
        controls.hidden = true;
      }

      if (progress) {
        progress.hidden = true;
      }
    }

    showSlide(currentIndex);
    startAutoplay();
  });
});
