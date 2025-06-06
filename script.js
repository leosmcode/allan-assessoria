/*
   Personal Trainer - Consultoria Fitness Online
   Script para efeitos de rolagem e interatividade
*/

document.addEventListener("DOMContentLoaded", function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 500, // Reduzido de 800ms para 500ms
        easing: "ease",
        once: true,
        offset: 100,
        disable: "mobile" // Desativa em dispositivos móveis para melhorar o desempenho
    });

    // Variáveis
    const header = document.getElementById("header");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mobileNav = document.querySelector(".mobile-nav");
    const backToTop = document.getElementById("back-to-top");
    const faqItems = document.querySelectorAll(".faq-item");
    const sliderTrack = document.querySelector(".depoimentos-track");
    const sliderDots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    // Header fixo ao rolar
    window.addEventListener("scroll", function() {
        if (window.scrollY > 100) {
            header.classList.add("scrolled");
            if (backToTop) backToTop.classList.add("active");
        } else {
            header.classList.remove("scrolled");
            if (backToTop) backToTop.classList.remove("active");
        }
    });

    // Menu mobile
    mobileMenuBtn.addEventListener("click", function() {
        this.classList.toggle("active");
        mobileNav.classList.toggle("active");
        
        // Animar barras do menu
        const spans = this.querySelectorAll("span");
        if (this.classList.contains("active")) {
            spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
        } else {
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
        }
    });

    // Fechar menu mobile ao clicar em links
    document.querySelectorAll(".mobile-nav a").forEach(link => {
        link.addEventListener("click", function() {
            mobileNav.classList.remove("active");
            mobileMenuBtn.classList.remove("active");
            
            const spans = mobileMenuBtn.querySelectorAll("span");
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
        });
    });

    // Efeito Parallax no Hero - desativado em dispositivos móveis para melhor desempenho
    if (window.innerWidth > 768) {
        window.addEventListener("scroll", function() {
            const scrollPosition = window.scrollY;
            const hero = document.getElementById("hero");
            
            if (hero) {
                // Ajusta a posição do background conforme o scroll
                hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
            }
        });
    }

    // FAQ Acordeão
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        
        question.addEventListener("click", () => {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains("active")) {
                    otherItem.classList.remove("active");
                }
            });
            
            // Abre/fecha o item atual
            item.classList.toggle("active");
        });
    });

    // Slider de Depoimentos
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll(".depoimento-card").length;
    
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentSlide = index;
        
        // Calcula a largura do card com base no tamanho da tela
        let cardWidth = 100;
        if (window.innerWidth > 992) {
            cardWidth = 33.333; // Desktop: 3 cards por vez
        } else if (window.innerWidth > 768) {
            cardWidth = 50; // Tablet: 2 cards por vez
        } else {
            cardWidth = 100; // Mobile: 1 card por vez
        }
        
        sliderTrack.style.transitionDuration = "0.3s"; // Adicionado para controlar a velocidade da transição do slider
        sliderTrack.style.transform = `translateX(-${currentSlide * cardWidth}%)`;
        
        // Atualiza os dots
        sliderDots.forEach((dot, i) => {
            dot.classList.toggle("active", i === Math.floor(currentSlide / 3));
        });
    }
    
    // Botões de navegação do slider
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            goToSlide(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            goToSlide(currentSlide + 1);
        });
    }
    
    // Dots do slider
    sliderDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            goToSlide(index * 3); // Cada dot representa 3 slides
        });
    });
    
    // Rolagem suave para links internos
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Ajuste para o header fixo com base no tamanho da tela
                const headerOffset = window.innerWidth <= 768 ? 70 : 80;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerOffset,
                    behavior: "smooth"
                });
            }
        });
    });

    // Atualizar layout do carrossel quando a janela for redimensionada
    window.addEventListener("resize", function() {
        goToSlide(currentSlide);
    });
    
    // Inicializar o carrossel
    goToSlide(0);
    
    // Melhorar o desempenho do scroll em dispositivos móveis
    if ("ontouchstart" in window) {
        document.body.classList.add("touch-device");
    }
});


