document.addEventListener('DOMContentLoaded', () => { // Espera a página carregar totalmente

    /* Manipulação do Menu */
    const navMenu = document.getElementById('nav'); // Pega o menu
    const navLinks = document.querySelectorAll('.nav-link'); // Pega todos os links do menu
    const menuBtn = document.getElementById('menu-btn'); // Botão do menu
    const menuIcon = menuBtn.querySelector('i'); // Ícone dentro do botão

    menuBtn.addEventListener('click', () => { // Quando clicar no botão
        navMenu.classList.toggle('active'); // Abre ou fecha o menu

        /*Lógica para alterar o icone */
        if (navMenu.classList.contains('active')) { // Se o menu estiver aberto
            menuIcon.classList.replace('ph-list', 'ph-x'); // Troca ícone para X
        } else {
            menuIcon.classList.replace('ph-x', 'ph-list'); // Volta para ícone de lista
        }
    })

    const slides = document.querySelectorAll('.carousel-slide'); // Pega todos os slides
    const btnNext = document.getElementById('btn-next'); // Botão próximo
    const btnPrev = document.getElementById('btn-prev'); // Botão anterior

    let currentSlide = 0; // Slide atual começa no 0
    let autoPlayTimer; // Variável do tempo automático

    function showTargetSlide(index) { // Função que muda o slide
        slides.forEach(slide => slide.classList.remove('active')) // Remove active de todos

        if (index >= slides.length) // Se passar do último
            currentSlide = 0 // volta pro primeiro

        else if (index < 0) // Se voltar antes do primeiro
            currentSlide = slides.length - 1; // vai pro último

        else {
            currentSlide = index; // Usa o índice normal
        }

        slides[currentSlide].classList.add('active'); // Ativa o slide atual
    }

    function runAutoPlay() { // Função de autoplay
        autoPlayTimer = setInterval(() => { showTargetSlide(currentSlide + 1); }, 6000); // Troca slide a cada 6 segundos
    }

    btnNext.addEventListener('click', () => { // Clique no botão próximo
        showTargetSlide(currentSlide + 1); // Vai pra frente
        resetAutoPlay(); // Reinicia o tempo
    });

    btnPrev.addEventListener('click', () => { // Clique no botão anterior
        showTargetSlide(currentSlide - 1); // Vai pra trás
        resetAutoPlay(); // Reinicia
    });

    function resetAutoPlay() { // Função para resetar tempo
        clearInterval(autoPlayTimer); // Para o tempo atual
        runAutoPlay(); // Inicia novamente
    }

    runAutoPlay(); // Inicia o autoplay quando a página carrega
})