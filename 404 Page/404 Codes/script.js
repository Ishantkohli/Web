const canvas = document.getElementById("canvas");
//Cursor follow code //
const follower = document.createElement("div");
follower.classList.add("follower");
document.body.appendChild(follower);

let xTo = gsap.quickTo(follower, "x", { duration: 0.3, ease: "power3" });
let yTo = gsap.quickTo(follower, "y", { duration: 0.3, ease: "power3" });

window.addEventListener("mousemove", (e) => {
  xTo(e.clientX);
  yTo(e.clientY);
});

// create floating shapes
for (let i = 0; i < 25; i++) {
  const div = document.createElement("div");
  div.classList.add("shape");

  div.style.left = Math.random() * window.innerWidth + "px";
  div.style.top = Math.random() * window.innerHeight + "px";

  canvas.appendChild(div);

  gsap.to(div, {
    x: "random(-200,200)",
    y: "random(-200,200)",
    rotation: 360,
    duration: "random(4,10)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

// click explosion 💥
window.addEventListener("click", (e) => {
  for (let i = 0; i < 20; i++) {
    const dot = document.createElement("div");
    dot.classList.add("shape");

    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";

    canvas.appendChild(dot);

    gsap.to(dot, {
      x: "random(-300,300)",
      y: "random(-300,300)",
      scale: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => dot.remove()
    });
  }
});

