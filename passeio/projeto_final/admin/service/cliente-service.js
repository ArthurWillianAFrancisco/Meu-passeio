const listaClientes = () =>  {
    return fetch(`http://localhost:3000/profile`)
    .then(resposta => {
        if(resposta.ok){
            return resposta.json()
        }
        throw new Error('Não foi possível listar os clientes')
    })
}

const criaCliente = (nome, nome_lugar, local_pais, cidade, descricao, lati, long) => { 
    return fetch(`http://localhost:3000/profile`, {
        method: 'POST', 
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            nome_lugar: nome_lugar,
            local_pais: local_pais,
            cidade: cidade,
            descricao: descricao,
            lati: objetoCoordenadas.lati,
            long: objetoCoordenadas.long
        })
    })
    .then( resposta => {
        if(resposta.ok){
            return resposta.body
        }
        throw new Error('Não foi possível criar um cliente')
    })
}

const removeCliente = (id) => { 
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'DELETE'
    })
    .then( resposta => { 
        if(!resposta.ok){
        throw new Error('Não foi possível deletar um cliente')
        }
    })
}
 
const detalhaCliente = (id) => { 
    return fetch(`http://localhost:3000/profile/${id}`)
    .then(resposta => { 
        if(resposta.ok){
            return resposta.json()
        }
    
        throw new Error('Não foi possível detalhar um cliente')
    })
}

const atualizaCliente = (id, nome, nome_lugar, local_pais, cidade, descricao) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            nome_lugar: nome_lugar,
            local_pais: local_pais,
            cidade: cidade,
            descricao: descricao,

        })
    })
    .then( resposta => {
        if(resposta.ok){
            return resposta.json()
        }
        throw new Error('Não foi possível detalhar um cliente')
    })
}

export const clienteService = { 
    listaClientes,
    criaCliente, 
    removeCliente,
    detalhaCliente,
    atualizaCliente
}
