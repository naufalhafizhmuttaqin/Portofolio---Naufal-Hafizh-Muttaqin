document.documentElement.classList.add("js");

// Navbar: ubah gaya setelah di-scroll
const navbar = document.getElementById("navbar");
const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Reveal: sekali saja, lalu observer dilepas
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("active");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("active"));
}

// Typewriter (hanya di halaman utama)
const target = document.getElementById("typewriter");
if (target) {
  const text = "Hello everyone, my name is";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    target.textContent = text;
  } else {
    let i = 0, deleting = false;
    const tick = () => {
      i += deleting ? -1 : 1;
      target.textContent = text.slice(0, i);
      let delay = deleting ? 60 : 100;
      if (!deleting && i === text.length) { deleting = true; delay = 1800; }
      else if (deleting && i === 0) { deleting = false; delay = 600; }
      setTimeout(tick, delay);
    };
    tick();
  }
}

// Lightbox (hanya di halaman galeri)
const lb = document.getElementById("lightbox");
if (lb) {
  const items = [...document.querySelectorAll(".photo button")];
  const img = lb.querySelector("img");
  const cap = lb.querySelector("figcaption");
  let cur = 0;

  const show = (n) => {
    cur = (n + items.length) % items.length;
    const src = items[cur].querySelector("img");
    img.src = src.currentSrc || src.src;
    img.alt = src.alt;
    const fc = items[cur].parentElement.querySelector("figcaption");
    cap.textContent = fc ? fc.textContent : "";
  };

  items.forEach((b, n) => b.addEventListener("click", () => { show(n); lb.showModal(); }));
  lb.querySelector(".lb-prev").addEventListener("click", () => show(cur - 1));
  lb.querySelector(".lb-next").addEventListener("click", () => show(cur + 1));
  lb.querySelector(".lb-close").addEventListener("click", () => lb.close());
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
}