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





