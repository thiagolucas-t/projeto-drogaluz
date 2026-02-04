// Carrossel simples + dots + autoplay
(function () {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;

  const track = root.querySelector("[data-track]");
  const slides = Array.from(root.querySelectorAll("[data-slide]"));
  const dotsWrap = root.querySelector("[data-dots]");
  const btnPrev = root.querySelector("[data-prev]");
  const btnNext = root.querySelector("[data-next]");

  let index = 0;
  let timer = null;

  function renderDots() {
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.className = "dot" + (i === index ? " is-active" : "");
      b.type = "button";
      b.setAttribute("aria-label", `Ir para o banner ${i + 1}`);
      b.addEventListener("click", () => goTo(i, true));
      dotsWrap.appendChild(b);
    });
  }

  function update() {
    track.style.transform = `translateX(${-index * 100}%)`;
    renderDots();
  }

  function goTo(nextIndex, userAction = false) {
    index = (nextIndex + slides.length) % slides.length;
    update();
    if (userAction) restartAutoplay();
  }

  function next(userAction = false) { goTo(index + 1, userAction); }
  function prev(userAction = false) { goTo(index - 1, userAction); }

  function startAutoplay() {
    timer = setInterval(() => next(false), 4500);
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  btnNext?.addEventListener("click", () => next(true));
  btnPrev?.addEventListener("click", () => prev(true));

  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", startAutoplay);

  // Init
  update();
  startAutoplay();
})();

// Favoritar (coração) nos produtos
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".product__fav");
  if (!btn) return;
  btn.classList.toggle("is-on");
  btn.textContent = btn.classList.contains("is-on") ? "♥" : "♡";
});





/* =============================  TELA DE LOGIN  =============================== */

// Mostrar/ocultar senha (login)
document.addEventListener("click", (e) => {
  const btn = e.target.closest("#toggleSenha");
  if (!btn) return;

  const input = document.querySelector("#senha");
  if (!input) return;

  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  btn.textContent = isPassword ? "OCULTAR" : "MOSTRAR";
});
