document.addEventListener("DOMContentLoaded", function () {
  const dateElements = document.querySelectorAll("time[datetime]");

  dateElements.forEach(el => {
    const isoDate = el.getAttribute("datetime");
    if (!isoDate) return;

    const date = new Date(isoDate);
    if (isNaN(date)) return;

    const jalali = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);

    el.textContent = jalali;
  });
});
