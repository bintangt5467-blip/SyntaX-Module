// ===== Canvas Background Animation =====
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function initParticles() {
  particles = [];
  const count = Math.min(90, Math.floor((W * H) / 16000));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      a: Math.random() * 0.5 + 0.3
    });
  }
}
initParticles();
window.addEventListener("resize", initParticles);

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 26, 26, ${0.18 * (1 - dist / 130)})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.fillStyle = "rgba(10, 0, 0, 0.35)";
  ctx.fillRect(0, 0, W, H);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 26, 26, ${p.a})`;
    ctx.shadowColor = "rgba(255, 26, 26, 0.9)";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  drawLines();
  requestAnimationFrame(animate);
}
animate();

// ===== Modal Payment =====
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalProduct = document.getElementById("modalProduct");
const modalPrice = document.getElementById("modalPrice");
const tgLink = document.getElementById("tgLink");
const waLink = document.getElementById("waLink");

const TG_BASE = "https://t.me/BinnXxT";
const WA_BASE = "https://wa.me/6283823978564";

document.querySelectorAll(".buy").forEach(btn => {
  btn.addEventListener("click", () => {
    const product = btn.dataset.product;
    const price = btn.dataset.price;

    modalProduct.textContent = "Produk: " + product;
    modalPrice.textContent = "Harga: " + price;

    const msg = encodeURIComponent(
      `Confirm Payment to admin\nberikan detail bukti transfer dan sebutkan produk apa yang di beli\n\nProduk: ${product}\nHarga: ${price}`
    );

    tgLink.href = TG_BASE + "?text=" + msg;
    waLink.href = WA_BASE + "?text=" + msg;

    modal.classList.add("active");
  });
});

closeModal.addEventListener("click", () => modal.classList.remove("active"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});