class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
}
class Bd{

    constructor(){
     let id = localStorage.getItem('id')   
     if(id === null){
        localStorage.setItem('id', 0)
     }
    }
    getProximoId(){
        //get serve para guardar
        let proximoId = localStorage.getItem('id') //nul
        return parseInt(proximoId) +1
    }

//transformando meus dados em json
    gravar(d){
    //Aqui é o identificador e o d é quem eu quero transformar em json
    
    let id = this.getProximoId()
    localStorage.setItem(id, JSON.stringify(d))
    localStorage.setItem('id', id)
    }
}

let db = new Bd()

function cadastrarDespesa(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        descricao.value,
        tipo.value,
        valor.value
    )

    db.gravar(despesa)
}
