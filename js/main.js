// Particle canvas
(function(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let pts = [];
  function resize(){
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  for(let i=0;i<55;i++){
    pts.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*2+0.5,
      vx: (Math.random()-.5)*0.3,
      vy: (Math.random()-.5)*0.3,
      o: Math.random()*0.5+0.2
    });
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pts.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>canvas.width) p.vx*=-1;
      if(p.y<0||p.y>canvas.height) p.vy*=-1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(0,212,255,${p.o})`;
      ctx.fill();
    });
    pts.forEach((a,i)=>{
      pts.slice(i+1).forEach(b=>{
        const d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<110){
          ctx.beginPath();
          ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle=`rgba(30,95,194,${0.25*(1-d/110)})`;
          ctx.lineWidth=.6;
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// Nav scroll
window.addEventListener('scroll',()=>{
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY>30);
});

// Mobile menu
function toggleMenu(){
  const l=document.getElementById('navLinks');
  l.style.display = l.style.display==='flex' ? 'none' : 'flex';
  l.style.flexDirection='column';
  l.style.position='absolute';
  l.style.top='70px';
  l.style.left='0'; l.style.right='0';
  l.style.background='rgba(10,22,40,0.98)';
  l.style.padding='20px';
  l.style.gap='20px';
}

// Modals
function openModal(id){
  document.getElementById('modal-'+id).classList.add('show');
}
function closeModal(id){
  document.getElementById('modal-'+id).classList.remove('show');
}
function closeAllModals(){
  document.querySelectorAll('.modal-overlay').forEach(m=>m.classList.remove('show'));
}
document.querySelectorAll('.modal-overlay').forEach(m=>{
  m.addEventListener('click',function(e){
    if(e.target===this) this.classList.remove('show');
  });
});

function claimOffer(){
  closeAllModals();
  openModal('success');
}

function handleFormSubmit(){
  closeAllModals();
  openModal('success');
}

// Auto popup after 8s
setTimeout(()=>{ openModal('free-audit'); }, 8000);