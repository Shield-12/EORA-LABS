(() => {
  "use strict";

  const root = document.documentElement;
  let dismissed = false;
  let reduce = false;
  try {
    reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (error) {
    reduce = false;
  }

  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    root.classList.remove("eora-booting");
    if (document.body) document.body.classList.remove("is-loading");
    const loader = document.getElementById("eoraLoader");
    if (!loader) return;
    const remove = () => {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    };
    if (reduce) remove();
    else window.setTimeout(remove, 180);
  }

  function onKey(event) {
    if (event.key === "Escape") dismiss();
  }

  function arm() {
    if (dismissed) return;
    const body = document.body;
    if (!body || !body.getAttribute("data-page")) return;
    root.classList.add("eora-booting");
    if (reduce) root.classList.add("eora-reduce");
    const loader = document.createElement("div");
    loader.id = "eoraLoader";
    loader.className = "eora-loader";
    loader.setAttribute("aria-hidden", "true");
    loader.innerHTML = '<div class="eora-loader-card"><p class="eora-loader-kicker">Eora Labs</p><p class="eora-loader-title">Langston Brown</p><span class="eora-loader-rule"></span><p class="eora-loader-note">Opening the portfolio</p></div>';
    body.insertBefore(loader, body.firstChild);
    document.addEventListener("keydown", onKey);
    window.setTimeout(dismiss, 1800);
    window.addEventListener("error", dismiss);
  }

  window.EORA_BOOT = { dismiss, reduce };

  if (document.body) arm();
  else document.addEventListener("DOMContentLoaded", arm);
})();
