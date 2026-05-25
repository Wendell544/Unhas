// Configuração do checkout
const CHECKOUT_URL = ""; // Insira o link do checkout aqui

// Facebook Pixel
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

// Substitua '123456789012345' pelo seu ID de pixel real
fbq('init', '123456789012345');
fbq('track', 'PageView');
fbq('track', 'ViewContent', {
    content_name: 'Curso Esmaltaria Premium',
    content_category: 'Beauty',
    content_type: 'product'
});

// Fallback para navegadores com bloqueio de script
document.addEventListener('DOMContentLoaded', function() {
    // Botão de checkout
    const checkoutBtn = document.getElementById('checkoutButton');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (CHECKOUT_URL && CHECKOUT_URL.trim() !== "") {
                window.location.href = CHECKOUT_URL;
            } else {
                alert("🔗 Link de checkout em breve. Entre na lista de espera VIP.");
            }
        });
    }

    // Animações suaves ao rolar a página
    const animatedItems = document.querySelectorAll('.feature-row, .info-card, .bonus-area, .card-premium');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    animatedItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(15px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
});