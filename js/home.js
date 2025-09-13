document.addEventListener("DOMContentLoaded", () => {
  const [startBtn, uploadBtn] = document.querySelectorAll(".custom-button");
  if (startBtn)
    startBtn.addEventListener(
      "click",
      () => (location.href = "./leaderboard.html")
    );
  if (uploadBtn)
    uploadBtn.addEventListener(
      "click",
      () => (location.href = "./uploads.html")
    );
});
