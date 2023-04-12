class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
              return false
            }
        }
        return true
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
    if(despesa.validarDados()){
       // db.gravar(despesa)
        console.log('sucesso');
        document.getElementById('gravacaoTitle').innerHTML='Sucesso na Gravação';
        document.getElementById('modal-title').className = 'modal-header text-success';
        document.getElementById('modalBody').innerHTML="Gravação bem Sucedida";
        $('#gravacaoDispesa').modal('show')
    }else {
       // return falha
       console.log('falha')
       document.getElementById('gravacaoTitle').innerHTML='Erro na Gravação';
       document.getElementById('modal-title').className = 'modal-header text-danger';
       document.getElementById('modalBody').innerHTML="Por favor preencher todos os campos";
       $('#gravacaoDispesa').modal('show')
    }
    
}
