
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

