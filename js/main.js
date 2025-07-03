// Função para expandir as cortinas com animação ao fechar

document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('cortinasExpandir');
  const barra = document.getElementById('cortinasBarra');
  const botaoFechar = document.getElementById('fecharCortinas');

  const fecharComAnimacao = () => {
    if (barra.classList.contains('ativo')) {
      barra.classList.remove('ativo');
      barra.classList.add('fechar');
      setTimeout(() => barra.classList.remove('fechar'), 500); // tempo igual ao transition
    }
  };

  // Abrir ou fechar ao clicar no trigger
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (barra.classList.contains('ativo')) {
      fecharComAnimacao();
    } else {
      barra.classList.add('ativo');
    }
  });

  // Prevenir o fechamento ao clicar dentro da barra
  barra.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Botão de fechar interno
  botaoFechar.addEventListener('click', (e) => {
    e.stopPropagation();
    fecharComAnimacao();
  });

  // Fechar ao clicar fora
  document.addEventListener('click', () => {
    fecharComAnimacao();
  });
});

//Função de carrossel do submenu
function criarCarrossel(id) {
  const c = document.getElementById(id), i = c.querySelector('.carrosselContent');
  let a = Array.from(i.children), n = 0, t;

  const firstClone = a[0].cloneNode(true);
  const lastClone = a[a.length - 1].cloneNode(true);
  i.insertBefore(lastClone, a[0]);
  i.appendChild(firstClone);

  a = Array.from(i.children);
  n = 1;
  i.style.transition = 'none';
  i.style.transform = `translateX(-${n * 100}%)`;

  const update = () => {
    i.style.transition = 'transform 0.5s ease-in-out';
    i.style.transform = `translateX(-${n * 100}%)`;
  };

  const next = () => {
    if (n >= a.length - 1) return;
    n++;
    update();
    if (n === a.length - 1) {
      setTimeout(() => {
        i.style.transition = 'none';
        n = 1;
        i.style.transform = `translateX(-${n * 100}%)`;
      }, 500);
    }
  };

  const prev = () => {
    if (n <= 0) return;
    n--;
    update();
    if (n === 0) {
      setTimeout(() => {
        i.style.transition = 'none';
        n = a.length - 2;
        i.style.transform = `translateX(-${n * 100}%)`;
      }, 500);
    }
  };

  const stop = () => clearInterval(t);
  const start = () => { stop(); t = setInterval(next, 1900); };

  c.querySelector('.carrosselButton.right').onclick = () => { next(); start(); };
  c.querySelector('.carrosselButton.left').onclick = () => { prev(); start(); };
  c.onmouseenter = stop;
  c.onmouseleave = start;

  start();
}

// Ativa carrossel apenas ao hover em .li-wrapper
const liWrappers = document.querySelectorAll('.li-wrapper');
liWrappers.forEach((wrapper) => {
  const carrossel = wrapper.querySelector('.carrosselSubmenu');
  if (carrossel) {
    let iniciado = false;
    wrapper.addEventListener('mouseenter', () => {
      if (!iniciado) {
        criarCarrossel(carrossel.id);
        iniciado = true;
      }
    });
  }
});

// Função para mudar cor de fundo da header e expandi-la ao scroll para cima
let lastScrollTop = 0;
const header = document.querySelector('header');
const cortinasBarra = document.getElementById('cortinasBarra');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const barraAtiva = cortinasBarra.classList.contains('ativo');

  if (scrollTop > 10) {
    header.classList.add('scrolled');
    cortinasBarra.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
    cortinasBarra.classList.remove('scrolled');
  }

  if (scrollTop < lastScrollTop) {
    header.classList.add('expandida');
    cortinasBarra.classList.add('acompanhar-expansao');
  } else {
    header.classList.remove('expandida');
    cortinasBarra.classList.remove('acompanhar-expansao');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
