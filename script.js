/*
   Personal Trainer - Consultoria Fitness Online
   Script para efeitos de rolagem e interatividade
*/

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Variáveis
    const header = document.getElementById('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const backToTop = document.getElementById('back-to-top');
    const faqItems = document.querySelectorAll('.faq-item');
    const sliderTrack = document.querySelector('.depoimentos-track');
    const sliderDots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Header fixo ao rolar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
    });

    // Menu mobile
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        // Animar barras do menu
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Fechar menu mobile ao clicar em links
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Efeito Parallax no Hero
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const hero = document.getElementById('hero');
        
        if (hero) {
            // Ajusta a posição do background conforme o scroll
            hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
        }
    });

    // Contador animado para estatísticas (exemplo)
    function animateCounter(element, start, end, duration) {
        let startTime = null;
        
        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            element.textContent = value;
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }

    // Implementar contadores quando necessário
    // Exemplo: const counterElements = document.querySelectorAll('.counter');
    // counterElements.forEach(counter => {...});

    // FAQ Acordeão
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Abre/fecha o item atual
            item.classList.toggle('active');
        });
    });

    // Slider de Depoimentos
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.depoimento-card').length;
    
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentSlide = index;
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Atualiza os dots
        sliderDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Botões de navegação do slider
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
    }
    
    // Dots do slider
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Auto-play do slider
    let sliderInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
    
    // Pausa o auto-play quando o mouse está sobre o slider
    const sliderContainer = document.querySelector('.depoimentos-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        });
    }

    // Botão Voltar ao Topo
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Rolagem suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efeito de revelação progressiva para elementos com classe .reveal
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Verificar elementos visíveis no carregamento inicial

    // Formulário de contato
    const contactForm = document.getElementById('formulario-contato');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio de formulário
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            // Simular tempo de envio
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        });
    }

    // Adicionar classe 'active' aos links do menu quando a seção correspondente estiver visível
    const sections = document.querySelectorAll('section[id]');
    
    function highlightMenuOnScroll() {
        const scrollPosition = window.scrollY + 200; // Ajuste para o header fixo
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.desktop-nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightMenuOnScroll);
    highlightMenuOnScroll(); // Verificar seção visível no carregamento inicial
    document.addEventListener('DOMContentLoaded', function() {
    // Elementos do carrossel
    const track = document.querySelector('.depoimentos-track');
    const cards = document.querySelectorAll('.depoimento-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Configurações
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth;
    let autoplayInterval;
    const autoplayDelay = 5000; // 5 segundos para cada slide
    
    // Inicialização
    function initCarousel() {
        // Configurar largura do track baseado no número de cards
        track.style.width = `${cardWidth * cards.length}px`;
        
        // Iniciar autoplay
        startAutoplay();
        
        // Event listeners para os botões
        prevBtn.addEventListener('click', () => {
            moveSlide('prev');
            resetAutoplay();
        });
        
        nextBtn.addEventListener('click', () => {
            moveSlide('next');
            resetAutoplay();
        });
        
        // Event listeners para os dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay();
            });
        });
        
        // Pausar autoplay quando o mouse estiver sobre o carrossel
        document.querySelector('.depoimentos-slider').addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });
        
        // Retomar autoplay quando o mouse sair do carrossel
        document.querySelector('.depoimentos-slider').addEventListener('mouseleave', () => {
            startAutoplay();
        });
        
        // Ajustar para telas menores
        window.addEventListener('resize', updateCarouselLayout);
        updateCarouselLayout();
    }
    
    // Mover para o slide anterior ou próximo
    function moveSlide(direction) {
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % cards.length;
        } else {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        }
        
        updateCarousel();
    }
    
    // Ir para um slide específico
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Atualizar a posição do carrossel
    function updateCarousel() {
        // Atualizar posição do track
        const position = -currentIndex * getVisibleCardWidth();
        track.style.transform = `translateX(${position}px)`;
        
        // Atualizar dots ativos
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Iniciar autoplay
    function startAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(() => {
            moveSlide('next');
        }, autoplayDelay);
    }
    
    // Resetar autoplay
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Obter largura do card visível (responsivo)
    function getVisibleCardWidth() {
        // Em telas menores, mostramos menos cards por vez
        return cards[0].offsetWidth;
    }
    
    // Atualizar layout do carrossel para responsividade
    function updateCarouselLayout() {
        const newCardWidth = cards[0].offsetWidth;
        track.style.width = `${newCardWidth * cards.length}px`;
        updateCarousel();
    }
    
    // Inicializar o carrossel
    initCarousel();
});

});
