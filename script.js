// ===============================
// Portfolio JavaScript
// Jeric Albar Portfolio
// ===============================

// ---------- LOADER ----------
window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){
        setTimeout(()=>{
            loader.classList.add("hidden");
        },800);
    }

});

// ---------- TYPING EFFECT ----------

const typing = document.querySelector("#typing");

const words = [
    "IT Support Specialist",
    "Network Administrator",
    "Printer Technician",
    "CCTV Support",
    "Adobe Photoshop Designer",
    "Web Developer"
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeEffect(){

    if(!typing) return;

    const current = words[wordIndex];

    if(!deleting){

        typing.textContent = current.substring(0,letterIndex);

        letterIndex++;

        if(letterIndex > current.length){

            deleting = true;

            setTimeout(typeEffect,1500);

            return;

        }

    }else{

        typing.textContent = current.substring(0,letterIndex);

        letterIndex--;

        if(letterIndex < 0){

            deleting = false;

            wordIndex++;

            if(wordIndex >= words.length){

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect,deleting ? 45 : 90);

}

typeEffect();


// ---------- SCROLL ANIMATION ----------

const reveals = document.querySelectorAll(".reveal");

function revealElements(){

    const windowHeight = window.innerHeight;

    reveals.forEach(element=>{

        const top = element.getBoundingClientRect().top;

        if(top < windowHeight - 120){

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll",revealElements);

revealElements();


// ---------- ACTIVE NAVIGATION ----------

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 120;

        if(pageYOffset >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")=="#"+current){

            link.classList.add("active");

        }

    });

});


// ---------- STICKY NAVBAR ----------

const navbar = document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        navbar.classList.add("sticky");

    }else{

        navbar.classList.remove("sticky");

    }

});


// ---------- MOBILE MENU ----------

const menu = document.querySelector(".menu-btn");

const nav = document.querySelector(".nav-links");

if(menu){

menu.addEventListener("click",()=>{

    nav.classList.toggle("show");

});

}

document.querySelectorAll(".nav-links a").forEach(link=>{

    link.addEventListener("click",()=>{

        if(nav){

            nav.classList.remove("show");

        }

    });

});


// ---------- SMOOTH SCROLL ----------

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior:"smooth"

        });

    });

});


// ---------- CURSOR GLOW ----------

const glow = document.querySelector(".cursor-glow");

if(glow){

document.addEventListener("mousemove",(e)=>{

    glow.style.left=e.clientX+"px";

    glow.style.top=e.clientY+"px";

});

}


// ---------- THEME TOGGLE ----------

const toggle=document.getElementById("themeToggle");

if(toggle){

toggle.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        toggle.innerHTML="☀️";

        localStorage.setItem("theme","light");

    }else{

        toggle.innerHTML="🌙";

        localStorage.setItem("theme","dark");

    }

});

const savedTheme=localStorage.getItem("theme");

if(savedTheme==="light"){

    document.body.classList.add("light");

    toggle.innerHTML="☀️";

}

}


// ---------- COUNTER ANIMATION ----------

const counters=document.querySelectorAll(".counter");

const speed=200;

counters.forEach(counter=>{

const update=()=>{

const target=+counter.getAttribute("data-target");

const count=+counter.innerText;

const inc=target/speed;

if(count<target){

counter.innerText=Math.ceil(count+inc);

requestAnimationFrame(update);

}else{

counter.innerText=target;

}

}

update();

});


// ---------- BACK TO TOP ----------

const topBtn=document.getElementById("topBtn");

if(topBtn){

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.classList.add("show");

}else{

topBtn.classList.remove("show");

}

});

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

console.log("Jeric Portfolio Loaded Successfully 🚀");
