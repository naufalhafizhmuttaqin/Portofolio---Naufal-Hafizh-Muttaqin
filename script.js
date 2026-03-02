// Navbar scroll effect
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// Scroll Reveal (repeatable)
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

reveals.forEach(reveal => observer.observe(reveal));

//typewriter
const text = "Hello everyone, my name is";
const typingSpeed = 120;
const deletingSpeed = 100;
const delayAfterTyping = 1600;
const delayAfterDeleting = 700;

let index = 0;
let isDeleting = false;
const target = document.getElementById("typewriter");

function typeLoop() {
  if (!isDeleting) {
    target.textContent = text.slice(0, index + 1);
    index++;

    if (index === text.length) {
      setTimeout(() => (isDeleting = true), delayAfterTyping);
    }
  } else {
    target.textContent = text.slice(0, index - 1);
    index--;

    if (index === 0) {
      isDeleting = false;
      setTimeout(() => {}, delayAfterDeleting);
    }
  }

  setTimeout(typeLoop, isDeleting ? deletingSpeed : typingSpeed);
}

document.addEventListener("DOMContentLoaded", typeLoop);

