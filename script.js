const header=document.querySelector(".site-header");
window.addEventListener("scroll",()=>header.classList.toggle("scrolled",window.scrollY>50));

const menu=document.querySelector(".menu-toggle");
const nav=document.querySelector(".site-header nav");
menu.addEventListener("click",()=>{
  const isOpen=nav.classList.toggle("open");
  document.body.classList.toggle("menu-open",isOpen);
  menu.setAttribute("aria-expanded",String(isOpen));
  menu.textContent=isOpen?"×":"☰";
});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menu.setAttribute("aria-expanded","false");
  menu.textContent="☰";
}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const weddingDate=new Date("2026-08-08T13:00:00-04:00");
function updateCountdown(){
  const diff=Math.max(0,weddingDate-new Date());
  const values={
    days:Math.floor(diff/86400000),
    hours:Math.floor(diff/3600000%24),
    minutes:Math.floor(diff/60000%60),
    seconds:Math.floor(diff/1000%60)
  };
  Object.entries(values).forEach(([key,value])=>{
    document.getElementById(key).textContent=String(value).padStart(key==="days"?3:2,"0");
  });
}
updateCountdown();
setInterval(updateCountdown,1000);

const petals=document.querySelector(".petal-layer");
for(let i=0;i<38;i++){
  const petal=document.createElement("span");
  petal.className="petal";
  petal.style.left=`${Math.random()*100}%`;
  petal.style.animationDuration=`${8+Math.random()*11}s`;
  petal.style.animationDelay=`${-Math.random()*20}s`;
  petal.style.transform=`scale(${.5+Math.random()*1.4})`;
  petal.style.opacity=`${.45+Math.random()*.5}`;
  petals.appendChild(petal);
}

const musicButton=document.getElementById("musicButton");
const music=document.getElementById("music");
const musicState=document.getElementById("musicState");
musicButton.addEventListener("click",async()=>{
  try{
    if(music.paused){
      await music.play();
      musicButton.classList.add("playing");
      musicState.textContent="Pause";
    }else{
      music.pause();
      musicButton.classList.remove("playing");
      musicState.textContent="Musique";
    }
  }catch{
    musicState.textContent="Ajoutez un MP3";
  }
});