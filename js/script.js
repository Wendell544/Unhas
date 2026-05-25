// LINK DO CHECKOUT (coloque o seu)
const CHECKOUT_URL = "";

// FACEBOOK PIXEL
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', '123456789012345'); // SUBSTITUA PELO SEU ID
fbq('track', 'PageView');
fbq('track', 'ViewContent', { content_name: 'Curso Esmaltaria Premium' });

document.addEventListener('DOMContentLoaded', function() {
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

    // animação suave
    const elements = document.querySelectorAll('.feature-row, .info-card, .bonus-area, .card-premium');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(el);
    });
});