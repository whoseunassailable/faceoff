// ===== Config =====
const MAX_MB = 10;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/gif"];

// ===== Elements =====
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");
const fileError = document.getElementById("fileError");
const preview = document.getElementById("preview");
const previewImg = document.getElementById("previewImg");
const meta = document.getElementById("meta");
const progressWrap = document.getElementById("progressWrap");
const progressBar = document.getElementById("progressBar");
const form = document.getElementById("uploadForm");
const resetBtn = document.getElementById("resetBtn");
const titleEl = document.getElementById("title");
const titleError = document.getElementById("titleError");
const categoryEl = document.getElementById("category");
const categoryError = document.getElementById("categoryError");

// ===== Helpers =====
function bytesToSize(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return bytes.toFixed(1) + " " + units[i];
}

function resetForm() {
  form.reset();
  fileInput.value = "";
  preview.style.display = "none";
  previewImg.src = "";
  meta.innerHTML = "";
  fileError.textContent = "";
  titleError.textContent = "";
  categoryError.textContent = "";
  progressWrap.style.display = "none";
  progressBar.style.width = "0%";
}

function validateFile(file) {
  if (!file) return "Please choose an image.";
  if (!ACCEPTED_TYPES.includes(file.type))
    return "Unsupported file type. Use JPG, PNG, or GIF.";
  const mb = file.size / (1024 * 1024);
  if (mb > MAX_MB)
    return `File is too large (${mb.toFixed(1)}MB). Max ${MAX_MB}MB.`;
  return "";
}

function showPreview(file) {
  preview.style.display = "grid";
  previewImg.src = URL.createObjectURL(file);
  meta.innerHTML = `
    <div><strong>Name:</strong> ${file.name}</div>
    <div><strong>Type:</strong> ${file.type || "n/a"}</div>
    <div><strong>Size:</strong> ${bytesToSize(file.size)}</div>
    <div id="dimNote" style="opacity:.9;">Reading image size…</div>
  `;
  const img = new Image();
  img.onload = () => {
    const dim = document.getElementById("dimNote");
    if (dim)
      dim.textContent = `Dimensions: ${img.naturalWidth}×${img.naturalHeight}px`;
    URL.revokeObjectURL(img.src);
  };
  img.src = URL.createObjectURL(file);
}

function handleFile(file) {
  fileError.textContent = "";
  const err = validateFile(file);
  if (err) {
    fileError.textContent = err;
    preview.style.display = "none";
    return;
  }
  showPreview(file);
}

// ===== Dropzone Events =====
dropzone.addEventListener("click", () => fileInput.click());
dropzone.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fileInput.click();
  }
});
["dragenter", "dragover"].forEach((evt) =>
  dropzone.addEventListener(evt, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.add("dragover");
  })
);
["dragleave", "drop"].forEach((evt) =>
  dropzone.addEventListener(evt, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.remove("dragover");
  })
);
dropzone.addEventListener("drop", (e) => {
  const file = e.dataTransfer.files && e.dataTransfer.files[0];
  if (file) handleFile(file);
});
fileInput.addEventListener("change", (e) => {
  const file = e.target.files && e.target.files[0];
  if (file) handleFile(file);
});
resetBtn.addEventListener("click", resetForm);

// ===== Submit (mock upload for now) =====
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Basic field validation
  let valid = true;
  titleError.textContent = "";
  categoryError.textContent = "";
  if (!fileInput.files[0]) {
    fileError.textContent = "Please choose an image to upload.";
    valid = false;
  }
  if (!titleEl.value.trim()) {
    titleError.textContent = "Please enter a title.";
    valid = false;
  }
  if (!categoryEl.value) {
    categoryError.textContent = "Please choose a category.";
    valid = false;
  }
  const rights = document.getElementById("rights");
  const agree = document.getElementById("agree");
  if (!rights.checked || !agree.checked) {
    fileError.textContent =
      "Please confirm rights and agree to Terms & Privacy.";
    valid = false;
  }
  if (!valid) return;

  // Fake progress (replace later with real Supabase upload)
  progressWrap.style.display = "block";
  progressWrap.setAttribute("aria-hidden", "false");
  progressBar.style.width = "0%";

  let p = 0;
  const tick = () => {
    p = Math.min(100, p + Math.random() * 18);
    progressBar.style.width = p.toFixed(0) + "%";
    if (p < 100) requestAnimationFrame(tick);
    else {
      setTimeout(() => {
        alert("Upload complete! Your design is queued for Faceoff.");
        resetForm();
        // Optional: redirect to voting or gallery:
        // location.href = "start-voting.html";
      }, 250);
    }
  };
  requestAnimationFrame(tick);
});
