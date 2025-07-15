const produtosPorPagina = 10;
let paginaAtual = 1;

const produtos = Array.from(document.querySelectorAll('.itemProduto'));
const totalPaginas = Math.ceil(produtos.length / produtosPorPagina);

const paginacao = document.querySelector('.paginacao');

function renderizarProdutos() {
  produtos.forEach((produto, index) => {
    produto.style.display =
      index >= (paginaAtual - 1) * produtosPorPagina && index < paginaAtual * produtosPorPagina
        ? 'block'
        : 'none';
  });
}

function renderizarPaginacao() {
  paginacao.innerHTML = '';

  const btnAnterior = document.createElement('button');
  btnAnterior.textContent = '<';
  btnAnterior.className = 'btnPaginacao';
  btnAnterior.disabled = paginaAtual === 1;
  btnAnterior.onclick = () => {
    paginaAtual--;
    atualizarPaginacao();
  };
  paginacao.appendChild(btnAnterior);

  for (let i = 1; i <= totalPaginas; i++) {
    const bolinha = document.createElement('span');
    bolinha.className = 'pagina';
    if (i === paginaAtual) bolinha.classList.add('ativa');
    bolinha.onclick = () => {
      paginaAtual = i;
      atualizarPaginacao();
    };
    paginacao.appendChild(bolinha);
  }

  const btnProximo = document.createElement('button');
  btnProximo.textContent = '>';
  btnProximo.className = 'btnPaginacao';
  btnProximo.disabled = paginaAtual === totalPaginas;
  btnProximo.onclick = () => {
    paginaAtual++;
    atualizarPaginacao();
  };
  paginacao.appendChild(btnProximo);
}

function atualizarPaginacao() {
  renderizarProdutos();
  renderizarPaginacao();
}

// Inicialização
atualizarPaginacao();