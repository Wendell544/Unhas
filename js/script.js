const CHECKOUT_URL = "";

// Facebook Pixel (substitua o ID real)
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '123456789012345');
fbq('track', 'PageView');

document.addEventListener('DOMContentLoaded', function() {
    // Botão checkout
    const btn = document.getElementById('checkoutButton');
    if(btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if(CHECKOUT_URL && CHECKOUT_URL.trim() !== "") window.location.href = CHECKOUT_URL;
            else alert("🔗 Link de checkout em breve. Entre na lista VIP.");
        });
    }

    // Reveal scroll
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('revealed');
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
    setTimeout(() => reveals.forEach(el => el.classList.add('revealed')), 500);

    // Carrossel: destaque card central
    const carousel = document.getElementById('carousel');
    const cards = document.querySelectorAll('.carousel-card');
    function highlightCenter() {
        if(!carousel) return;
        const rect = carousel.getBoundingClientRect();
        const center = rect.left + rect.width/2;
        let closest = null, minDist = Infinity;
        cards.forEach(card => {
            const r = card.getBoundingClientRect();
            const dist = Math.abs(r.left + r.width/2 - center);
            if(dist < minDist) { minDist = dist; closest = card; }
        });
        cards.forEach(c => c.classList.remove('active'));
        if(closest) closest.classList.add('active');
    }
    if(carousel) {
        carousel.addEventListener('scroll', () => requestAnimationFrame(highlightCenter));
        window.addEventListener('resize', highlightCenter);
        highlightCenter();
        // drag to scroll
        let isDown = false, startX, scrollLeft;
        carousel.addEventListener('mousedown', (e) => { isDown = true; startX = e.pageX - carousel.offsetLeft; scrollLeft = carousel.scrollLeft; });
        carousel.addEventListener('mouseleave', () => isDown = false);
        carousel.addEventListener('mouseup', () => isDown = false);
        carousel.addEventListener('mousemove', (e) => { if(!isDown) return; e.preventDefault(); const x = e.pageX - carousel.offsetLeft; const walk = (x - startX) * 1.5; carousel.scrollLeft = scrollLeft - walk; });
    }
});