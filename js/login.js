const loginTab = document.getElementById('login-tab');
const cadastroTab = document.getElementById('cadastro-tab');
const container = document.getElementById('formContainer');
const campos = document.getElementById('campos');
const titulo = document.getElementById('titulo');
const formulario = document.getElementById('formulario');
const botaoSubmit = formulario.querySelector('button');

loginTab.addEventListener('click', () => {
  container.classList.remove('expandido');
  setTimeout(() => {
    titulo.innerText = 'Entrar';
    formulario.action = 'login.php';
    campos.innerHTML = `
        <div class="agrupaFormulario">
          <label for="loginEmail">E-mail</label>
          <input type="email" id="loginEmail" name="loginEmail">
        </div>
        <div class="agrupaFormulario">
          <label for="loginSenha">Senha</label>
          <input type="password" id="loginSenha" name="loginSenha">
        </div>
      `;
    botaoSubmit.innerText = 'Entrar';
  }, 1);
});

cadastroTab.addEventListener('click', () => {
  container.classList.add('expandido');
  setTimeout(() => {
    titulo.innerText = 'Criar Conta';
    formulario.action = 'cadastro.php';
    campos.innerHTML = `
        <div class="agrupaFormulario">
          <label for="nome">Nome</label>
          <input type="text" id="nome" name="nome">
        </div>
        <div class="agrupaFormulario">
          <label for="telefone">Telefone</label>
          <input type="text" id="telefone" name="telefone">
        </div>
        <div class="agrupaFormulario">
          <label for="email">E-mail</label>
          <input type="email" id="email" name="email">
        </div>
        <div class="agrupaFormulario">
          <label for="senha">Senha</label>
          <input type="password" id="senha" name="senha">
        </div>
        <div class="agrupaFormulario">
          <label for="confirmaSenha">Confirmar Senha</label>
          <input type="password" id="confirmaSenha" name="confirmaSenha">
        </div>
      `;
    botaoSubmit.innerText = 'Cadastrar';
  }, 1);
});