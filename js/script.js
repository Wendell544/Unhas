// LINK DO CHECKOUT (coloque seu link real do Hotmart, Kiwify, etc.)
const CHECKOUT_URL = "";

// FACEBOOK PIXEL (substitua pelo seu ID real)
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', '123456789012345'); // ATENÇÃO: coloque seu ID do Pixel aqui
fbq('track', 'PageView');
fbq('track', 'ViewContent', { content_name: 'Curso Esmaltaria Premium' });

document.addEventListener('DOMContentLoaded', function() {
    // Botão de checkout
    const btn = document.getElementById('checkoutButton');
    if (btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (CHECKOUT_URL && CHECKOUT_URL.trim() !== "") {
                window.location.href = CHECKOUT_URL;
            } else {
                alert("🔗 Link de checkout em breve. Entre na lista de espera VIP.");
            }
        });
    }

    // Animação de reveal ao scroll
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
    
    reveals.forEach(el => observer.observe(el));
    
    // Fallback para elementos que não ativarem o observer
    setTimeout(() => {
        reveals.forEach(el => {
            if (!el.classList.contains('revealed')) {
                el.classList.add('revealed');
            }
        });
    }, 1000);

    // Carrossel premium: destaca o card central dinamicamente
    const carousel = document.getElementById('carouselContainer');
    const cards = document.querySelectorAll('.carousel-card');
    
    function highlightCenterCard() {
        if (!carousel) return;
        const containerRect = carousel.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        let closestCard = null;
        let minDist = Infinity;
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const dist = Math.abs(cardCenter - centerX);
            if (dist < minDist) {
                minDist = dist;
                closestCard = card;
            }
        });
        
        cards.forEach(card => card.classList.remove('active-card'));
        if (closestCard) closestCard.classList.add('active-card');
    }
    
    if (carousel) {
        carousel.addEventListener('scroll', () => {
            requestAnimationFrame(highlightCenterCard);
        });
        window.addEventListener('resize', highlightCenterCard);
        highlightCenterCard();
    }
    
    // Efeito de "grab" suave no carrossel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        carouselContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            carouselContainer.style.cursor = 'grabbing';
            startX = e.pageX - carouselContainer.offsetLeft;
            scrollLeft = carouselContainer.scrollLeft;
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            isDown = false;
            carouselContainer.style.cursor = 'grab';
        });
        
        carouselContainer.addEventListener('mouseup', () => {
            isDown = false;
            carouselContainer.style.cursor = 'grab';
        });
        
        carouselContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carouselContainer.offsetLeft;
            const walk = (x - startX) * 1.5;
            carouselContainer.scrollLeft = scrollLeft - walk;
        });
        
        carouselContainer.style.cursor = 'grab';
    }
});