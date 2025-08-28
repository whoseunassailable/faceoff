// Example data — replace with your real items or fetch() from an API
const designs = [
  {
    id: "123",
    title: "Sunset Badge",
    author: "rohan",
    votes: 4782,
    img: "thumbs/design-123.jpg",
    href: "design-123.html",
    posClass: "c1", // which drift path/starting spot to use
  },
  {
    id: "124",
    title: "Neon Grid",
    author: "sana",
    votes: 2310,
    img: "thumbs/design-124.jpg",
    href: "design-124.html",
    posClass: "c2",
  },
  {
    id: "125",
    title: "Glass Morph",
    author: "li",
    votes: 892,
    img: "thumbs/design-125.jpg",
    href: "design-125.html",
    posClass: "c3",
  },
  {
    id: "126",
    title: "Retro VHS",
    author: "alex",
    votes: 1603,
    img: "thumbs/design-126.jpg",
    href: "design-126.html",
    posClass: "c4",
  },
  {
    id: "127",
    title: "Pixel Wave",
    author: "mira",
    votes: 5120,
    img: "thumbs/design-127.jpg",
    href: "design-127.html",
    posClass: "c5",
  },
];

// helper: format 1000s with commas
const formatVotes = (n) => n.toLocaleString();

function renderCards(list) {
  const root = document.getElementById("float-area");
  root.innerHTML = ""; // clear

  list.forEach((item) => {
    const card = document.createElement("div");
    card.className = `float-card ${item.posClass}`;

    card.innerHTML = `
      <a class="card-img-link" href="${item.href}" aria-label="Open ${item.title} by ${item.author}">
        <img class="card-img" src="${item.img}" alt="${item.title} thumbnail">
      </a>

      <h3 class="card-title">${item.title}</h3>
      <p class="card-author">@${item.author}</p>
      <p class="card-meta">Votes: ${formatVotes(item.votes)}</p>
      <a class="card-btn" href="${item.href}">View Design</a>
    `;

    root.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => renderCards(designs));
