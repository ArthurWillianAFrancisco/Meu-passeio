import { clienteService } from '../service/cliente-service.js'

const formulario = document.querySelector('[data-form]')



formulario.addEventListener('submit', async (evento) => {

  try {
    const nome = evento.target.querySelector('[data-nome]').value
    const nome_lugar = evento.target.querySelector('[data-nome_luagr]').value
    const local_pais = evento.target.querySelector('[data-local_pais]').value
    const cidade = evento.target.querySelector('[data-cidade]').value
    const descricao = evento.target.querySelector('[data-descricao]').value


  
    await clienteService.criaCliente(nome, nome_lugar, local_pais, cidade, descricao, lati, long)
    window.location.href = '../telas/cadastro_concluido.html'
  }
  catch (erro) {
    console.log(erro)
    window.location.href = "../telas/erro.html"
  }
})