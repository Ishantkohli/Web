document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mousedown", () => {
    btn.classList.add("pressed");
  });
  btn.addEventListener("mouseup", () => {
    btn.classList.remove("pressed");
  });
  btn.addEventListener("mouseleave", () => {
    btn.classList.remove("pressed");
  });
});
