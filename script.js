/* ============================================================
   SET SOLUTIONS — LOCAL / SIMPLIFIED SITE
   script.js — vanilla JS only, four small jobs, nothing else.
============================================================ */

/* --- 1. Header shadow on scroll ---
   Purely cosmetic — adds a shadow once the page scrolls so the
   sticky call button reads as "above" the content.
------------------------------------------------------------ */
const header = document.getElementById("site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* --- 2. Video facade — click-to-load YouTube embed ---
   No YouTube JS/iframe is requested until the visitor clicks
   play. This keeps first page load light. Uses youtube-nocookie
   for privacy and passes autoplay=1 since the click IS the
   user's play intent.
------------------------------------------------------------ */
const videoFacade = document.getElementById("video-facade");

if (videoFacade) {
  const loadVideo = () => {
    const videoId = videoFacade.dataset.videoId;
    const videoTitle = videoFacade.dataset.videoTitle || "Video";

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    iframe.title = videoTitle;
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.loading = "eager";

    videoFacade.innerHTML = "";
    videoFacade.appendChild(iframe);
    videoFacade.classList.add("is-loaded");
  };

  videoFacade.addEventListener("click", loadVideo);
  videoFacade.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      loadVideo();
    }
  });
}

/* --- 3. FAQ accordion ---
   One item open at a time. CSS handles the height animation.
------------------------------------------------------------ */
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
      openItem
        .querySelector(".faq-question")
        .setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

/* --- 4. Contact form → Google Forms background submit ---
   Same pattern as the main site: submit to a hidden iframe so
   the Google Forms redirect happens silently, then show a
   plain-language success message.
------------------------------------------------------------ */
const form = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");

if (form) {
  form.addEventListener("submit", (e) => {
    const requiredFields = form.querySelectorAll("[required]");
    let valid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "rgba(255,120,120,0.9)";
        valid = false;
      } else {
        field.style.borderColor = "";
      }
    });

    if (!valid) {
      e.preventDefault();
      return;
    }

    setTimeout(() => {
      form.style.display = "none";
      formSuccess.style.display = "block";
    }, 800);
  });
}

/* --- Footer year --- */
const footerYear = document.getElementById("footer-year");
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}
