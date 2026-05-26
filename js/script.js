// LINK DO CHECKOUT (coloque o seu)
const CHECKOUT_URL = "";

// FACEBOOK PIXEL (substitua pelo seu ID)
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', '123456789012345'); // SUBSTITUA PELO SEU ID REAL
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

    // Verificar se o CSS foi carregado (útil para debug)
    const checkCSS = () => {
        const testColor = window.getComputedStyle(document.body).backgroundColor;
        if (testColor !== 'rgb(255, 249, 244)' && testColor !== '#fff9f4') {
            console.warn('⚠️ CSS não carregou corretamente. Verifique o caminho do arquivo style.css');
        }
    };
    setTimeout(checkCSS, 100);

    // Efeito de entrada suave (sem sumir com os elementos)
    const elements = document.querySelectorAll('.feature-row, .info-card, .bonus-area, .card-premium');
    
    // Garantir que os elementos já estão visíveis no CSS (não aplicamos opacity:0 direto)
    // Apenas adicionamos uma animação sutil quando entram na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
    
    elements.forEach(el => {
        // Define estado inicial APENAS se o elemento não tiver estilo definido.
        // Mas sem tornar invisível caso o observer falhe.
        if (!el.style.opacity) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(15px)';
            el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            observer.observe(el);
        } else {
            observer.observe(el);
        }
    });
    
    // Fallback: após 1 segundo, torna visível qualquer elemento que ainda esteja invisível
    // (caso o observer não tenha disparado por algum motivo)
    setTimeout(() => {
        elements.forEach(el => {
            if (el.style.opacity === '0') {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }, 1000);
});