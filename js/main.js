
// Função para expandir as cortinas
document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('cortinasExpandir');
  const barra = document.getElementById('cortinasBarra');
  const botaoFechar = document.getElementById('fecharCortinas');

  // Abrir ou fechar ao clicar no trigger
  trigger.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede que o clique vá para o document
    barra.classList.toggle('ativo');
  });

  // Prevenir o fechamento ao clicar dentro da barra
  barra.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Botão de fechar interno
  botaoFechar.addEventListener('click', (e) => {
    e.stopPropagation();
    barra.classList.remove('ativo');
  });

  // Fechar ao clicar fora
  document.addEventListener('click', () => {
    barra.classList.remove('ativo');
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
