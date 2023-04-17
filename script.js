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

    recuperarTodosRegistros(){
        let despesas = Array()
        

       let id = localStorage.getItem('id')
       for(let i = 1; i <= id; i++){
        //recuperando a dispesa
        let despesa = JSON.parse(localStorage.getItem(i))
        if(despesa === null){
            continue
        }
        despesas.push(despesa)
       }
       return despesas
      
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
        tipo.value,
        descricao.value,
        valor.value
    )
    
    
    if(despesa.validarDados()){
        db.gravar(despesa)
        console.log('sucesso');
        document.getElementById('gravacaoTitle').innerHTML='Sucesso na Gravação';
        document.getElementById('modal-title').className = 'modal-header text-success';
        document.getElementById('modalBody').innerHTML="Gravação bem Sucedida";
        $('#gravacaoDispesa').modal('show')
        document.getElementById('botao-voltar').innerHTML="Fechar"
        document.getElementById('botao-voltar').className = "botao-voltar btn-success"
        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';
    }else {
       // return falha
       console.log('falha')
       document.getElementById('gravacaoTitle').innerHTML='Erro na Gravação';
       document.getElementById('modal-title').className = 'modal-header text-danger';
       document.getElementById('modalBody').innerHTML="Por favor preencher todos os campos";
       $('#gravacaoDispesa').modal('show')
       document.getElementById('botao-voltar').innerHTML="Voltar e corrigir"
        document.getElementById('botao-voltar').className = "botao-voltar btn-danger"
    }
   
}

function carregaListaDispesas(){
    let despesas = Array()
   despesas = db.recuperarTodosRegistros()
   let listaDespesas = document.getElementById('listaDespesas')

   despesas.forEach(function(d) {

   //criando linha(tr)
   let linha = listaDespesas.insertRow()

   //criando colunas(td)
   linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`


   //ajustar tipo
   switch(d.tipo){
    case "1": d.tipo = 'Alimentação'
      break
    case "2": d.tipo = 'Educação'
      break
    case "3": d.tipo = 'Lazer'
      break
    case "4": d.tipo = 'Saúde'
      break
    case "5": d.tipo = 'Transporte'
      break
   }
   
   linha.insertCell(1).innerHTML = d.tipo
   linha.insertCell(2).innerHTML = d.descricao
   linha.insertCell(3).innerHTML = d.valor
});
}