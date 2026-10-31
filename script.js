document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b===button));
 const selected=button.dataset.filter;
 document.querySelectorAll('.project-card').forEach(card=>card.hidden=selected!=='all'&&card.dataset.category!==selected);
}));