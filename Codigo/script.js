const WHATSAPP = "555399609031";
const MESSAGE = "Olá, vim pelo site e gostaria de agendar um horário.";

document.querySelectorAll(".whatsapp-link").forEach(link => {
  link.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MESSAGE)}`;
  link.target = "_blank";
  link.rel = "noopener";
});

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

toggle.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", opened);
});

document.querySelectorAll(".nav a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

function setupCarousel(id, dotsId){
  const carousel = document.getElementById(id);
  const dots = document.getElementById(dotsId);
  const cards = [...carousel.children];
  let index = 0;

  function renderDots(){
    dots.innerHTML = "";
    const count = Math.max(1, Math.ceil(cards.length / (window.innerWidth < 700 ? 1 : 4)));
    for(let i=0;i<count;i++){
      const s=document.createElement("span");
      if(i===index) s.classList.add("active");
      s.addEventListener("click",()=>scrollToIndex(i));
      dots.appendChild(s);
    }
  }
  function scrollToIndex(i){
    const step = cards[0].offsetWidth + 12;
    const visible = window.innerWidth < 700 ? 1 : 4;
    index = Math.max(0, Math.min(i, Math.max(0,cards.length-visible)));
    carousel.scrollTo({left: step*index* (window.innerWidth < 700 ? 1 : 1), behavior:"smooth"});
    [...dots.children].forEach((d,n)=>d.classList.toggle("active",n===index));
  }
  document.querySelector(`[data-target="${id}"].prev`).addEventListener("click",()=>{
    scrollToIndex(Math.max(0,index-1));
  });
  document.querySelector(`[data-target="${id}"].next`).addEventListener("click",()=>{
    scrollToIndex(index+1);
  });
  renderDots();
  window.addEventListener("resize",renderDots);
}
setupCarousel("tattooCarousel","tattooDots");

const sections = [...document.querySelectorAll("main section[id], header[id]")];
const navLinks = [...document.querySelectorAll(".nav a[href^='#']")];
window.addEventListener("scroll",()=>{
  let current = "inicio";
  sections.forEach(section=>{
    if(window.scrollY >= section.offsetTop - 100) current = section.id;
  });
  navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+current));
});
