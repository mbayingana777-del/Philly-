document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Email opt-in -> Google Sheets (Apps Script Web App)
const form = document.getElementById("leadForm");
const statusEl = document.getElementById("leadStatus");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const endpoint = form.getAttribute("data-endpoint");
    if (!endpoint || endpoint.includes("PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE")) {
      statusEl.textContent = "Connect Google Sheets endpoint first (Apps Script URL).";
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    statusEl.textContent = "Submitting…";

    try {
      // Apps Script should accept JSON POST
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Bad response");
      statusEl.textContent = "You’re in! Watch for deals soon.";
      form.reset();
    } catch (err) {
      statusEl.textContent = "Submission failed. Try again or call the shop.";
    }
  });
}
