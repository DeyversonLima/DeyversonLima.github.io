// Menu Mobile Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = menuBtn.querySelector('i');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-xmark');
});

// Fechar menu mobile ao clicar em um link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-xmark');
    });
});

// Alternador de Tema (Claro/Escuro)
const html = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
const themeIcon = document.getElementById('theme-toggle-icon');
const themeIconMobile = document.getElementById('theme-toggle-icon-mobile');

function toggleTheme() {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        themeIcon.className = 'fas fa-moon text-slate-700';
        themeIconMobile.className = 'fas fa-moon text-slate-700';
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        themeIcon.className = 'fas fa-sun text-yellow-400';
        themeIconMobile.className = 'fas fa-sun text-yellow-400';
        localStorage.setItem('theme', 'dark');
    }
}

themeToggleBtn.addEventListener('click', toggleTheme);
themeToggleMobileBtn.addEventListener('click', toggleTheme);

// Verificar preferência anterior do usuário
if (localStorage.getItem('theme') === 'light') {
    html.classList.remove('dark');
    themeIcon.className = 'fas fa-moon text-slate-700';
    themeIconMobile.className = 'fas fa-moon text-slate-700';
}

// ==========================================================================
// LÓGICA DO CARROSSEL INTERATIVO
// ==========================================================================

const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const cards = document.querySelectorAll('.carousel-item');
const sectionProjetos = document.getElementById('projetos');

let index = 0;
let autoPlayTimer = null;

// Função atualizada para suportar até 4 cards simultâneos
function getVisibleCardsCount() {
    if (window.innerWidth >= 1280) return 4; // Se a tela for grande, exibe os 4 juntos
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
}

// Move o trilho calculando a largura exata + o espaçamento real
function moveCarousel() {
    const visibleCards = getVisibleCardsCount();
    const maxIndex = cards.length - visibleCards;
    
    if (index > maxIndex) index = 0; 
    if (index < 0) index = maxIndex;

    const cardWidth = cards[0].getBoundingClientRect().width;
    // Move exatamente a largura do card + os 24px de gap configurados no Tailwind
    const amountToMove = (cardWidth + 24) * index; 
    
    track.style.transform = `translateX(-${amountToMove}px)`;
}

// Avança um card
function nextSlide() {
    index++;
    moveCarousel();
}

// Volta um card
function prevSlide() {
    index--;
    moveCarousel();
}

// Inicia o temporizador automático (Muda a cada 3.5 segundos)
function startAutoPlay() {
    if (autoPlayTimer === null) {
        autoPlayTimer = setInterval(nextSlide, 3500);
    }
}

// Para o temporizador automático
function stopAutoPlay() {
    if (autoPlayTimer !== null) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }
}

// Event Listeners das Setas nas extremidades
nextBtn.addEventListener('click', () => {
    nextSlide();
    // Reinicia o tempo se ele clicar manualmente
    stopAutoPlay();
    startAutoPlay();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoPlay();
    startAutoPlay();
});

// EFEITO INTELIGENTE: Pausa quando o mouse está sobre a seção de projetos
sectionProjetos.addEventListener('mouseenter', stopAutoPlay);
sectionProjetos.addEventListener('mouseleave', startAutoPlay);

// Reajusta o cálculo caso o usuário mude o tamanho da tela do navegador
window.addEventListener('resize', () => {
    index = 0;
    moveCarousel();
});

// Inicializa o carrossel
startAutoPlay();