
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
