// Função para expandir cortinas com animação ao fechar

document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('cortinasExpandir');
  const barra = document.getElementById('cortinasBarra');
  const botaoFechar = document.getElementById('fecharCortinas');
  const seta = trigger.querySelector('img');

  const fecharComAnimacao = () => {
    if (barra.classList.contains('ativo')) {
      barra.classList.remove('ativo');
      barra.classList.add('fechar');
      seta.classList.remove('rotacionado');
      setTimeout(() => barra.classList.remove('fechar'), 500); // tempo igual ao transition
    }
  };

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (barra.classList.contains('ativo')) {
      fecharComAnimacao();
    } else {
      barra.classList.add('ativo');
      seta.classList.add('rotacionado');
    }
  });

  barra.addEventListener('click', (e) => {
    e.stopPropagation();
  });

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

// Função de expanção da lupa
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.inputPesquisar');
  const icone = document.querySelector('.iconeBuscar');
  const form = document.querySelector('.pesquisar');

  const esconderInput = (e) => {
    if (!form.contains(e.target)) {
      input.classList.remove('visivel');
    }
  };

  icone.addEventListener('click', (e) => {
    e.preventDefault();
    input.classList.add('visivel');
    input.focus();
  });

  input.addEventListener('input', () => {
    if (input.value.trim()) {
      input.classList.add('preenchido');
    } else {
      input.classList.remove('preenchido');
    }
  });


  document.addEventListener('click', esconderInput);
});

// Função de carrossel dos produtos da main

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.carrosselWrapper');
  const container = wrapper.querySelector('.carrosselContainer');
  const content = wrapper.querySelector('.carrosselContent');
  const leftBtn = wrapper.querySelector('.carrosselButton.left');
  const rightBtn = wrapper.querySelector('.carrosselButton.right');
  const cards = content.querySelectorAll('.produtoCard');

  let scrollIndex = 0;

  function getItemsPerView() {
    return window.innerWidth <= 1200 ? 3 : 4;
  }

  function updateTransform() {
    const itemsPerView = getItemsPerView();
    const card = cards[0];
    if (!card) return;

    const cardWidth = card.offsetWidth + 40; // margem horizontal aplicada no CSS
    const offset = scrollIndex * cardWidth;

    content.style.transform = `translateX(-${offset}px)`;
    updateButtons(itemsPerView);
  }

  function updateButtons(itemsPerView) {
    const maxIndex = Math.max(0, Math.ceil(cards.length / itemsPerView) - 1);

    leftBtn.classList.toggle('hidden', scrollIndex === 0);
    rightBtn.classList.toggle('hidden', scrollIndex >= maxIndex);
  }

  leftBtn.addEventListener('click', () => {
    if (scrollIndex > 0) {
      scrollIndex--;
      updateTransform();
    }
  });

  rightBtn.addEventListener('click', () => {
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.max(0, Math.ceil(cards.length / itemsPerView) - 1);
    if (scrollIndex < maxIndex) {
      scrollIndex++;
      updateTransform();
    }
  });

  window.addEventListener('resize', () => {
    scrollIndex = 0;
    updateTransform();
  });

  updateTransform();
});


//PRODUTOOOO

let scrollIndex = 0;
const maxVisible = 5;

function trocarImagem(el) {
  document.getElementById('imgPrincipal').src = el.src;
  document.querySelectorAll('.thumbnails img').forEach(img => img.classList.remove('active'));
  el.classList.add('active');
}

function ampliar(e) {
  const img = document.getElementById('imgPrincipal');
  const zoom = document.getElementById('zoom');
  const rect = img.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  zoom.style.display = 'block';
  zoom.style.left = `${x - 50}px`;
  zoom.style.top = `${y - 50}px`;
  zoom.style.background = `url(${img.src}) no-repeat`;
  zoom.style.backgroundSize = `${img.width * 1.1}px ${img.height * 1.1}px`;
  zoom.style.backgroundPosition = `-${x}px -${y}px`;
}

function ocultarZoom() {
  document.getElementById('zoom').style.display = 'none';
}

  function scrollThumbnails(direction) {
    const wrapper = document.getElementById('thumbWrapper');
    const thumbs = wrapper.querySelectorAll('img');
    const totalThumbs = thumbs.length;

    scrollIndex += direction;

    if (scrollIndex < 0) scrollIndex = 0;
    if (scrollIndex > totalThumbs - maxVisible) scrollIndex = totalThumbs - maxVisible;

    const offset = scrollIndex * 66; //
    wrapper.style.transform = `translateY(-${offset}px)`;

    document.getElementById('btnCima').disabled = scrollIndex === 0;
    document.getElementById('btnBaixo').disabled = scrollIndex >= totalThumbs - maxVisible;
  }

  window.onload = () => {
  scrollThumbnails(0);
     };




