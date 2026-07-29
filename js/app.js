(function () {
  "use strict";

  const LS_THEME = "emu_theme";
  const SUN = "☀";
  const MOON = "☽";

  const PAGES = {
    "rules": { file: "content/emu-rules.md", title: "EMU Rules" },
    "adapt-in-your-club": { file: "content/adapt-in-your-club.md", title: "Adapt in Your Club" },
    "committee": { file: "content/committee.md", title: "EMU Committee" },
    "copyright": { file: "content/copyright.md", title: "Copyright", licenseFile: "LICENSE" }
  };
  const DEFAULT_PAGE = "rules";

  const $ = (id) => document.getElementById(id);
  const contentEl = $("content");
  const tocEl = $("toc");
  const tocNavEl = $("tocNav");
  const topNavEl = $("topNav");
  const themeToggle = $("themeToggle");

  // ---- theme ----
  let currentTheme = localStorage.getItem(LS_THEME) || "day";

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", currentTheme);
    themeToggle.textContent = currentTheme === "day" ? SUN : MOON;
  }

  function toggleTheme() {
    currentTheme = currentTheme === "day" ? "night" : "day";
    localStorage.setItem(LS_THEME, currentTheme);
    applyTheme();
  }

  // ---- slug helpers ----
  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function getPageFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    return PAGES.hasOwnProperty(page) ? page : DEFAULT_PAGE;
  }

  // ---- table of contents ----
  function buildToc() {
    const headings = contentEl.querySelectorAll("h1, h2");
    tocNavEl.innerHTML = "";

    if (headings.length === 0) {
      tocEl.hidden = true;
      return;
    }

    const used = new Set();
    headings.forEach((h) => {
      let id = h.id || slugify(h.textContent);
      if (!id) id = "section";
      let unique = id;
      let n = 2;
      while (used.has(unique)) {
        unique = `${id}-${n++}`;
      }
      used.add(unique);
      h.id = unique;

      const a = document.createElement("a");
      a.href = `#${unique}`;
      a.textContent = h.textContent;
      a.className = h.tagName === "H2" ? "toc-h2" : "toc-h1";
      tocNavEl.appendChild(a);
    });

    tocEl.hidden = false;
  }

  // ---- nav active state ----
  function updateActiveNav(page) {
    topNavEl.querySelectorAll("a").forEach((a) => {
      a.classList.toggle("active", a.dataset.page === page);
    });
  }

  // ---- page loading ----
  async function loadPage(page, pushState) {
    const meta = PAGES[page];
    updateActiveNav(page);
    contentEl.innerHTML = '<p class="loading">Loading&hellip;</p>';
    tocEl.hidden = true;

    try {
      const response = await fetch(meta.file);
      if (!response.ok) throw new Error(`Could not load ${meta.file} (${response.status})`);
      const raw = await response.text();
      contentEl.innerHTML = window.marked.parse(raw);
      document.title = `${meta.title} — English Mafia Unified`;

      if (meta.licenseFile) {
        try {
          const licRes = await fetch(meta.licenseFile);
          if (!licRes.ok) throw new Error(`status ${licRes.status}`);
          const licenseText = await licRes.text();
          const pre = document.createElement("pre");
          pre.className = "license-text";
          pre.textContent = licenseText;
          contentEl.appendChild(pre);
        } catch (licErr) {
          console.error(`Could not load ${meta.licenseFile}:`, licErr);
        }
      }

      buildToc();
    } catch (err) {
      contentEl.innerHTML = `<p class="error-msg">Sorry, this page could not be loaded. (${err.message})</p>`;
    }

    if (pushState) {
      const url = `?page=${page}`;
      history.pushState({ page }, "", url);
    }
  }

  // ---- client-side routing: any link with href="?page=slug", anywhere on the page ----
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="?page="]');
    if (!a) return;
    e.preventDefault();
    const params = new URLSearchParams(a.getAttribute("href").split("?")[1]);
    const page = params.get("page");
    if (!PAGES.hasOwnProperty(page)) return;
    loadPage(page, true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("popstate", () => {
    loadPage(getPageFromUrl(), false);
  });

  themeToggle.addEventListener("click", toggleTheme);

  // ---- init ----
  applyTheme();
  loadPage(getPageFromUrl(), false);
})();
