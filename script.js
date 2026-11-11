document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b===button));
 const selected=button.dataset.filter;
 document.querySelectorAll('.project-card').forEach(card=>card.hidden=selected!=='all'&&card.dataset.category!==selected);
}));
/* Hero: jendela miring halus mengikuti kursor (hanya perangkat dengan mouse) */
(function () {
  const scene = document.querySelector('.lux');
  if (!scene || !matchMedia('(hover:hover) and (pointer:fine)').matches || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  let raf;
  addEventListener('pointermove', (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = scene.getBoundingClientRect();
      const clamp = (v) => Math.max(-1, Math.min(1, v));
      const x = clamp((e.clientX - (r.left + r.width / 2)) / (innerWidth / 2));
      const y = clamp((e.clientY - (r.top + r.height / 2)) / (innerHeight / 2));
      scene.style.setProperty('--mx', x.toFixed(3));
      scene.style.setProperty('--my', y.toFixed(3));
      scene.style.setProperty('--rx', (-y * 7).toFixed(2) + 'deg');
      scene.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg');
    });
  }, { passive: true });
})();
