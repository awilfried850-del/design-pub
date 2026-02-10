// ---------- TEXTE MACHINE A ECRIRE ----------
const text = "DISPONIBLE POUR TOUT MINI-SITE 👨‍💻";
let i = 0;
function typing(){
    const target = document.getElementById("typeText");
    if(target && i < text.length){
        target.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 80);
    }
}
typing();

// ---------- MUSIQUE ----------
// ---------- SYSTÈME DE MUSIQUE (DÉCLENCHÉ AU CLIC) ----------
function playMusic() {
    const audio = document.getElementById("music");
    const btn = document.getElementById("musicBtn");

    // On force le chargement et la lecture
    audio.play().then(() => {
        // Si ça marche, on change le texte du bouton
        btn.innerHTML = "🎶 Musique en cours...";
        btn.style.opacity = "0.7"; 
        console.log("Lecture réussie !");
    }).catch(error => {
        // Si ça échoue (ex: fichier introuvable)
        console.error("Erreur de lecture : ", error);
        alert("Attention : Le fichier 'music.mp3' est introuvable ou mal nommé.");
    });
}



// ---------- SYSTÈME DE DIAPORAMA RÉPARÉ ----------
const photosCount = 17; // Nombre de photos
const container = document.querySelector('.container');
const letter = document.querySelector('.letter');

// Création du conteneur de slides s'il n'existe pas
let slidesContainer = document.querySelector('.slideshow-container');
if (!slidesContainer) {
    slidesContainer = document.createElement('div');
    slidesContainer.className = 'slideshow-container';
    container.insertBefore(slidesContainer, letter);
}

// Génération des slides
for(let n=1; n<=photosCount; n++){
    const slide = document.createElement('div');
    slide.className = (n === 1) ? 'slide active' : 'slide';
    
    const img = document.createElement('img');
    img.src = "photos/" + n + ".jpg"; 
    // Image de secours si le fichier est introuvable
    img.onerror = function() { 
        this.src = "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=500&auto=format&fit=crop"; 
    };
    
    slide.appendChild(img);
    slidesContainer.appendChild(slide);
}

// Moteur de rotation (vitesse : 3 secondes)
let currentSlide = 0;
function nextSlide() {
    const allSlides = document.querySelectorAll('.slide');
    if(allSlides.length === 0) return;

    allSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % allSlides.length;
    allSlides[currentSlide].classList.add('active');
}

// Lancement automatique
setInterval(nextSlide, 3000);
// ---------- ROSES FLOTTANTES (CANVAS) ----------
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const roses = [];
// On crée des "roses" (cercles rouges avec des petits traits)
for(let i=0; i<50; i++){
    roses.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: Math.random()*5 + 2,
        speed: Math.random()*2 + 1,
        drift: Math.random() * 2 - 1
    });
}

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#ff4d4d";
    roses.forEach(r => {
        ctx.beginPath();
        // Dessine une forme de petite fleur simple
        ctx.arc(r.x, r.y, r.size, 0, Math.PI*2);
        ctx.fill();
        
        r.y += r.speed;
        r.x += r.drift;
        if(r.y > canvas.height) r.y = -10;
    });
    requestAnimationFrame(draw);
}
draw();

