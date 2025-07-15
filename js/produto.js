
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
    if (window.innerWidth <= 768) return;

    const wrapper = document.getElementById('thumbWrapper');
    const thumbs = wrapper.querySelectorAll('img');
    const totalThumbs = thumbs.length;

    const visibleArea = document.querySelector('.thumbnails').clientHeight;
    const thumbHeight = 90;
    const visibleCount = Math.floor(visibleArea / thumbHeight);

    scrollIndex += direction;

    if (scrollIndex < 0) scrollIndex = 0;
    if (scrollIndex > totalThumbs - visibleCount) scrollIndex = totalThumbs - visibleCount;

    const offset = scrollIndex * thumbHeight;
    wrapper.style.transform = `translateY(-${offset}px)`;

    document.getElementById('btnCima').disabled = scrollIndex === 0;
    document.getElementById('btnBaixo').disabled = scrollIndex >= totalThumbs - visibleCount;
}

window.onload = () => {
    scrollThumbnails(0);
};

document.querySelectorAll('.cor').forEach(cor => {
  cor.addEventListener('click', () => {
    document.querySelectorAll('.cor').forEach(c => c.classList.remove('selecionada'));

    cor.classList.add('selecionada');

    document.getElementById('nomeCor').textContent = `( ${cor.dataset.nome} )`;
  });
});

window.addEventListener('load', () => {
  const primeiraCor = document.querySelector('.cor');
  if (primeiraCor) {
    primeiraCor.click();
  }
});

function alterarQuantidade(delta) {
  const input = document.getElementById('quantidade');
  let valor = parseInt(input.value) || 1;
  valor += delta;
  if (valor < 1) valor = 1;
  input.value = valor;
}

document.querySelectorAll('.acordeao-header').forEach(header => {
  header.addEventListener('click', () => {
    const acordeao = header.parentElement;
    acordeao.classList.toggle('ativo');
  });
});


