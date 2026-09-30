const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
const header = document.querySelector("[data-elevate]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = Number(entry.target.dataset.count || "0");
      const duration = 1200;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        entry.target.textContent = new Intl.NumberFormat("es-BO").format(value);

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
      countObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.45 }
);

counters.forEach((counter) => countObserver.observe(counter));

const elevateHeader = () => {
  if (!header) return;
  header.style.boxShadow = window.scrollY > 12 ? "0 14px 36px rgba(13, 75, 37, 0.12)" : "none";
};

elevateHeader();
window.addEventListener("scroll", elevateHeader, { passive: true });
