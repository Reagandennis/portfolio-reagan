/* =========================================================
   Renoch — Portfolio interactions (vanilla JS, no deps)
   ========================================================= */
(function () {
  "use strict";

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer: fine)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const lerp = (a, b, n) => a + (b - a) * n;

  /* ---------- Hero load reveal ---------- */
  document.documentElement.classList.add("ready");

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  const toggle = $("#themeToggle");
  const label = $(".theme__t");
  const syncLabel = () => { if (label) label.textContent = root.getAttribute("data-theme") === "dark" ? "Light" : "Dark"; };
  syncLabel();
  toggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "dark" ? "#14110E" : "#ECE6DA");
    try { localStorage.setItem("theme", next); } catch {}
    syncLabel();
  });

  /* ---------- Scroll reveal ---------- */
  const reveals = $$(".sec-head, .about__body, .figures, .portrait, .stack__col, .exp, .contact__cols, .hero__foot");
  reveals.forEach((el) => el.setAttribute("data-reveal", ""));
  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Active nav ---------- */
  const links = new Map($$(".topnav a").map((a) => [a.getAttribute("href").slice(1), a]));
  const secs = $$("section[id], section.hero").map((s) => s);
  if ("IntersectionObserver" in window) {
    const sio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((a) => (a.style.color = ""));
          const a = links.get(e.target.id);
          if (a) a.style.color = "var(--ink)";
        }
      });
    }, { threshold: 0.4 });
    $$("section[id]").forEach((s) => sio.observe(s));
  }

  /* desktop-only: cursor, preview, magnetic */
  if (!fine || reduced) return;

  /* ---------- Custom cursor (lerped) ---------- */
  document.body.classList.add("cursor-on");
  const cursor = $(".cursor");
  const cLabel = $(".cursor__label");
  // Start off-screen so no dot shows until a real pointer moves
  // (keeps it invisible on touch/emulators that report a fine pointer).
  let mx = -100, my = -100, cx = -100, cy = -100;
  addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });

  $$("[data-cursor]").forEach((el) => {
    el.addEventListener("pointerenter", () => {
      cursor.classList.add("is-hover");
      const txt = el.getAttribute("data-cursor");
      if (cLabel) cLabel.textContent = txt && txt !== "true" ? txt : "";
    });
    el.addEventListener("pointerleave", () => {
      cursor.classList.remove("is-hover");
      if (cLabel) cLabel.textContent = "";
    });
  });

  /* ---------- Project preview follows cursor ---------- */
  const preview = $(".work-preview");
  const previewImg = preview ? $("img", preview) : null;
  let px = mx, py = my, hoveringWork = false;
  $$(".work").forEach((row) => {
    const cover = row.getAttribute("data-cover");
    const link = $(".work__row", row);
    link.addEventListener("pointerenter", () => {
      if (previewImg && previewImg.getAttribute("src") !== cover) previewImg.setAttribute("src", cover);
      preview.classList.add("is-on");
      hoveringWork = true;
    });
    link.addEventListener("pointerleave", () => {
      preview.classList.remove("is-on");
      hoveringWork = false;
    });
  });

  /* ---------- Magnetic buttons ---------- */
  const magnets = $$(".link-btn, .theme, .contact__email");
  magnets.forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.28}px)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });

  /* ---------- rAF loop ---------- */
  function frame() {
    cx = lerp(cx, mx, 0.2);
    cy = lerp(cy, my, 0.2);
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    if (hoveringWork) {
      px = lerp(px, mx, 0.12);
      py = lerp(py, my, 0.12);
      preview.style.left = px + "px";
      preview.style.top = py + "px";
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
