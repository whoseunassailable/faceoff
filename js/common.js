document.addEventListener("DOMContentLoaded", async () => {
  const slots = document.querySelectorAll("[data-include]");
  for (const slot of slots) {
    const name = slot.getAttribute("data-include");
    try {
      const res = await fetch(`./partials/${name}.html`);
      slot.innerHTML = await res.text();
    } catch (e) {
      console.warn(`Could not include partial: ${name}`, e);
    }
  }
});
