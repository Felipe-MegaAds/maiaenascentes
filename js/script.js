/**
 * ==========================================================================
 * SCRIPT PRINCIPAL - MAIA & NASCENTES ADVOGADOS ASSOCIADOS
 * Funcionalidades: Header fixo dinâmico, Menu Mobile, Acordeão FAQ,
 * Scroll Reveal e Interações do Balão Flutuante de WhatsApp.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------------------------------------------
     1. GERENCIAMENTO DO HEADER FIXO AO ROLAR A PÁGINA
     Adiciona classe visual com fundo condensado e sombra ao rolar além de 50px
     -------------------------------------------------------------------------- */
  const headerNavbar = document.querySelector('.header-navbar');

  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      headerNavbar.classList.add('scrolled');
    } else {
      headerNavbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Chamada inicial para validar o estado da rolagem

  /* --------------------------------------------------------------------------
     2. MENU MOBILE RESPONSIVO (HAMBÚRGUER)
     Abre e fecha o menu de navegação em celulares e tablets
     -------------------------------------------------------------------------- */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    // Alterna o estado do menu ao clicar no botão hambúrguer
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.classList.toggle('active', !isOpen);
      navMenu.classList.toggle('open', !isOpen);
      mobileToggle.setAttribute('aria-expanded', !isOpen);
    });

    // Fecha o menu mobile automaticamente ao clicar em qualquer link da página ou botão de ação
    const allMenuLinks = navMenu.querySelectorAll('a');
    allMenuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Fecha o menu mobile caso clique fora dele
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Fecha o menu mobile caso o usuário aperte a tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. ACORDEÃO INTERATIVO DO FAQ (PERGUNTAS FREQUENTES)
     Abre e fecha cada item suavemente calculando a altura do conteúdo interno
     -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    const answerContainer = item.querySelector('.faq-answer');

    if (questionBtn && answerContainer) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Fecha todos os outros itens do FAQ para manter a interface organizada
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) {
              otherAnswer.style.maxHeight = null;
            }
          }
        });

        // Alterna o item atual selecionado
        if (isActive) {
          item.classList.remove('active');
          answerContainer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answerContainer.style.maxHeight = `${answerContainer.scrollHeight}px`;
        }
      });
    }
  });

  // Abre a primeira pergunta do FAQ por padrão para guiar visualmente o usuário
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstAnswer = firstItem.querySelector('.faq-answer');
    if (firstAnswer) {
      firstItem.classList.add('active');
      firstAnswer.style.maxHeight = `${firstAnswer.scrollHeight}px`;
    }
  }
  /* --------------------------------------------------------------------------
     4. ANIMAÇÃO DE REVELAÇÃO SUAVE AO ROLAR (INTERSECTION OBSERVER)
     Adiciona efeito refinado conforme as seções entram no campo de visão
     -------------------------------------------------------------------------- */
  const animatedElements = document.querySelectorAll(
    '.service-card, .diff-card, .about-card-frame, .about-content, .cta-box, .contact-info-card, .map-card-wrapper'
  );

  animatedElements.forEach((el) => {
    el.classList.add('fade-up-element');
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target); // Anima apenas uma vez para manter a performance alta
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => observer.observe(el));
});
