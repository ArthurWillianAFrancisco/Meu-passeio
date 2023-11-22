import { clienteService } from '../service/cliente-service.js'


(async () => { 
  const pegaURL = new URL(window.location)

  const id = pegaURL.searchParams.get('id')
  
  const inputNome = document.querySelector('[data-nome]')
  const inputnome_luagr = document.querySelector('[data-nome_luagr]')
  const inputlocal_pais = document.querySelector('[data-local_pais]')
  const inputcidade = document.querySelector('[data-cidade]')
  const inputdescricao = document.querySelector('[data-descricao]')



  
  try { 
    const dados = await clienteService.detalhaCliente(id)
    inputNome.value = dados.nome
    inputnome_luagr.value = dados.nome_luagr
    inputlocal_pais.value = dados.local_pais
    inputcidade.value = dados.cidade
    inputdescricao.value = dados.descricao

  }
  catch(erro){
    console.log(erro)
    window.location.href="../telas/erro.html"
  }

  
  const formulario = document.querySelector('[data-form]')
  
  
  formulario.addEventListener('submit', async (evento)=> { 
    evento.preventDefault()
    try {
      await clienteService.atualizaCliente(id, inputNome.value, inputnome_luagr.value, inputlocal_pais.value, inputcidade.value, inputdescricao.value)
      window.location.href = "../telas/edicao_concluida.html"
    }
    catch(erro){
      console.log(erro)
      window.location.href="../telas/erro.html"
    }
  })
})()
