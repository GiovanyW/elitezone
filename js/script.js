document.addEventListener('DOMContentLoaded', () => { // Espera a página carregar totalmente antes de executar o script

    /* Manipulação do Menu */
    const navMenu = document.getElementById('nav'); // Seleciona o menu de navegação pelo ID
    const navLinks = document.querySelectorAll('.nav-link'); // Seleciona todos os links do menu
    const menuBtn = document.getElementById('menu-btn'); // Seleciona o botão do menu (mobile)
    const menuIcon = menuBtn.querySelector('i'); // Seleciona o ícone dentro do botão

    menuBtn.addEventListener('click', () => { // Adiciona evento de clique no botão do menu
        navMenu.classList.toggle('active'); // Adiciona ou remove a classe "active" (abre/fecha menu)

        /* Lógica para alterar o ícone */
        if (navMenu.classList.contains('active')) { // Verifica se o menu está aberto
            menuIcon.classList.replace('ph-list', 'ph-x'); // Troca o ícone de lista para "X"
        } else { // Caso contrário (menu fechado)
            menuIcon.classList.replace('ph-x', 'ph-list'); // Volta o ícone para lista
        }
    });

    const slides = document.querySelectorAll('.carousel-slide'); // Seleciona todos os slides do carrossel
    const btnNext = document.getElementById('btn-next'); // Seleciona o botão "próximo"
    const btnPrev = document.getElementById('btn-prev'); // Seleciona o botão "anterior"

    let currentSlide = 0; // Define o slide inicial como 0
    let autoPlayTimer; // Variável para armazenar o intervalo do autoplay

    function showTargetSlide(index) { // Função responsável por mostrar um slide específico
        slides.forEach(slide => slide.classList.remove('active')); // Remove a classe "active" de todos os slides

        if (index >= slides.length) // Se o índice for maior que o número de slides
            currentSlide = 0; // Volta para o primeiro slide

        else if (index < 0) // Se o índice for menor que 0
            currentSlide = slides.length - 1; // Vai para o último slide

        else {
            currentSlide = index; // Caso válido, usa o índice recebido
        }

        slides[currentSlide].classList.add('active'); // Adiciona a classe "active" ao slide atual
    }

    function runAutoPlay() { // Função que inicia o autoplay
        autoPlayTimer = setInterval(() => { // Cria um intervalo
            showTargetSlide(currentSlide + 1); // Avança automaticamente para o próximo slide
        }, 6000); // A cada 6 segundos
    }

    btnNext.addEventListener('click', () => { // Evento de clique no botão "próximo"
        showTargetSlide(currentSlide + 1); // Avança um slide
        resetAutoPlay(); // Reinicia o autoplay
    });

    btnPrev.addEventListener('click', () => { // Evento de clique no botão "anterior"
        showTargetSlide(currentSlide - 1); // Volta um slide
        resetAutoPlay(); // Reinicia o autoplay
    });

    function resetAutoPlay() { // Função para reiniciar o autoplay
        clearInterval(autoPlayTimer); // Para o intervalo atual
        runAutoPlay(); // Inicia novamente o autoplay
    }

    runAutoPlay(); // Inicia o autoplay assim que a página carrega

    /////////////////////////
    // INÍCIO DOS CONTADORES
    /////////////////////////

    // Seleciona todos os elementos que possuem números animados
    const counters = document.querySelectorAll('.stat-num');

    // Função responsável por animar a contagem dos números
    function runCounterAnimation(el){

        // Obtém o valor final do contador (atributo data-target)
        const targetNumber = parseInt(el.getAttribute('data-target'));

        // Define o tempo total da animação (2 segundos)
        const durationLimit = 2000;

        // Inicializa o valor do contador
        let counterValue = 0;

        // Define quanto o número vai aumentar a cada intervalo
        const incrementAmount = targetNumber / (durationLimit / 20);

        // Cria um intervalo que roda a cada 20ms
        const updateVisuaisTimer = setInterval(()=>{

            // Incrementa o valor atual
            counterValue += incrementAmount;

            // Se já atingiu ou passou do valor alvo
            if(counterValue >= targetNumber){
                el.innerText = targetNumber; // Define o valor final correto
                clearInterval(updateVisuaisTimer); // Para a animação
            }
            else{
                // Caso ainda não tenha chegado no valor final
                el.innerText = Math.ceil(counterValue); // Atualiza com valor arredondado pra cima
            }

        },20); // Intervalo de 20 milissegundos
    } // Fim da função de animação

    // Cria um observer que detecta quando o elemento aparece na tela
    const scrollObserver = new IntersectionObserver((entries, observerInstance)=>{

        // Percorre todos os elementos observados
        entries.forEach(entry=>{

            if(entry.isIntersecting){ // Se o elemento estiver visível na tela
                runCounterAnimation(entry.target); // Executa a animação
                observerInstance.unobserve(entry.target); // Para de observar (roda só uma vez)
            }

        });

    }, {
        threshold: 0.6 // O elemento precisa estar 60% visível para ativar
    });

    // Aplica o observer para cada contador
    counters.forEach(counterItem => {
        scrollObserver.observe(counterItem); // Começa a observar o elemento
    });

    //Dark-mode e Light Mode
   /*Selecionar o botão que faz a troca*/
   const themeBtn = document.getElementById('theme-toggle');
   /*Selecionar o ícone para troca*/
   const themeIcon = themeBtn.querySelector('i'); 

   //Recuperar tema salvo anteriormente
   const currentTheme = localStorage.getItem('theme');
   if (currentTheme === 'dark'){
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('ph-moon','ph-sun');
   }


   //Adiciona o evento no botão
   themeBtn.addEventListener('click',()=> {
    //Liga a classe quando está desligada e desliga quando está ligada
    document.body.classList.toggle('dark-mode');
    //Verifica se está no darkmode (true) ou não (false)
    const isDark = document.body.classList.contains('dark-mode');

    if (isDark){
        themeIcon.classList.replace('ph-moon','ph-sun');
        localStorage.setItem('theme','dark');
    } else {
        themeIcon.classList.replace('ph-sun','ph-moon');
        localStorage.setItem('theme','light');
    }

   });

}); // Fim do DOMContentLoaded