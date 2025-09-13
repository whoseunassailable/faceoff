// Example data (swap to your API later)
const smallDesigns = [
  {
    title: "Sunset Badge",
    author: "rohan",
    img: "thumbs/design-123.jpg",
    href: "design-123.html",
  },
  {
    title: "Neon Grid",
    author: "sana",
    img: "thumbs/design-124.jpg",
    href: "design-124.html",
  },
  {
    title: "Glass Morph",
    author: "li",
    img: "thumbs/design-125.jpg",
    href: "design-125.html",
  },
  {
    title: "Retro VHS",
    author: "alex",
    img: "thumbs/design-126.jpg",
    href: "design-126.html",
  },
  {
    title: "Pixel Wave",
    author: "mira",
    img: "thumbs/design-127.jpg",
    href: "design-127.html",
  },
  {
    title: "Aurora UI",
    author: "kim",
    img: "thumbs/design-128.jpg",
    href: "design-128.html",
  },
];

function renderGrid(items) {
  const grid = document.getElementById("designs-grid");
  grid.innerHTML = items
    .slice(0, 6)
    .map(
      (item) => `
    <a class="design-card" href="${item.href}" aria-label="${item.title} by ${item.author}">
      <img class="design-thumb" src="${item.img}" alt="${item.title} thumbnail">
      <div class="design-info">
        <div>${item.title}</div>
        <div class="author">@${item.author}</div>
      </div>
    </a>
  `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => renderGrid(smallDesigns));
