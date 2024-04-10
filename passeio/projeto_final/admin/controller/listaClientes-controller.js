import { clienteService } from '../service/cliente-service.js'

const criaNovaLinha = (nome, nome_lugar, local_pais, cidade, descricao ,id) =>  { 
  const linhaNovoCliente = document.createElement('card')
  const conteudo = `
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <div class="p-3">
        <img src="../img/monte-fugi.jpg" class="card-img-top" alt="Imagem do local"> 
        <div class="fs-1 mb-3 text-center fw-bold">${nome_lugar}</div>
        <div class="fs-5 mb-3">País: ${local_pais}</div>
        <div class="fs-5 mb-3">Cidade: ${cidade}</div>
        <div class="fs-5 mb-3">Sobre o lugar: <br> <span class="p-2 borde">${descricao}</span></div>
        <div class="fs-5 mb-3">Publicado por: ${nome}</div>
        
        <div class="m-2">
            <a href="../telas/edita_cliente.html?id=${id}" class="btn btn-success botao-simples botao-simples--editar">Editar</a></li>
            <button class="btn btn-danger botao-simples botao-simples--excluir" type="button">Excluir</button></li>
            <a href="../telas/mapa.html"<button type="button" class="btn btn-info">Mapa</button></a>
        </div>
        <div class="border-bottom border-dark"></div>
    </div>
                  `

  linhaNovoCliente.innerHTML = conteudo
  linhaNovoCliente.dataset.id = id
  return linhaNovoCliente
}


const tabela = document.querySelector('[data-tabela]')

tabela.addEventListener('click', async (evento)=> {
    let ehBotaoDeDeleta = evento.target.className === 'btn btn-danger botao-simples botao-simples--excluir'
    if(ehBotaoDeDeleta){
        try {
            const linhaCliente = evento.target.closest('[data-id]')
            let id = linhaCliente.dataset.id
            await clienteService.removeCliente(id)
            linhaCliente.remove()
        }
        catch(erro){
            console.log(erro)
            window.location.href="../telas/erro.html"
        }
    }
})


const render = async () =>  {
    try {
        const listaClientes = await clienteService.listaClientes()
        listaClientes.forEach(elemento => {
            tabela.appendChild(criaNovaLinha(elemento.nome, elemento.nome_lugar,  elemento.local_pais,  elemento.cidade,  elemento.descricao, elemento.id))
    })
    }
    catch(erro){
        console.log(erro)
        window.location.href="../telas/erro.html"
    }
    
}

