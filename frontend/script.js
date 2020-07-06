$(document).ready(function(){
    SetUpData();
    Iniciar();
});

var DataHoje;
var RegistroViagens = [];
var quantMax;

function Iniciar(){
    axios.get('http://localhost:3333/vindex',
    {
        headers: { data: sessionStorage.getItem("dataAt") }
    })
    .then(response => MapearDados(response.data))
    .catch(function (error) {
        console.log(error);
    });
    const MapearDados = ( viagens ) => {
    
        RegistroViagens = [];
        const Content = document.getElementById('content');
        Content.innerHTML = '';
        quantMax = viagens.length;
        for (i = 0; i < viagens.length; i++) {      
            const teste = document.createElement('div');
            RegistroViagens.push(viagens[i].id);
            teste.innerHTML = 
                `<div class="viagem-container">
                    <div class="viagem-tituloedata">
                        <h2>${viagens[i].local}</h2>
                        <p>Data: ${TransformarData(viagens[i].data)}</p>
                    </div>
                    <div class="viagem-content-position">
                        <div id="esquerda">
                            <p>Veículo: ${viagens[i].tipo} - ${viagens[i].placa}</p>
                            <p>Horario Saida: ${viagens[i].saida}</p>
                            <p>Local saida: ${viagens[i].localsaida}</p>
                            <p>Capacidade Total: ${viagens[i].capacidade}</p>
                        </div>
                        <div id="direita">
                            <p>Valor: R$${viagens[i].valor}.00</p>
                            <p>Horario Chegada: ${viagens[i].retorno}</p>
                            <p>Local Chegada: ${viagens[i].localretorno}</p>
                            <p>Quantidade Atual: ${viagens[i].quantAtual}</p>
                        </div>
                    </div>
                    <div class="online1">
                        <button id="${viagens[i].id}">Registrar-se</button>
                        <h1 id="id=${viagens[i].id}">+</h1>
                    </div>
                <div>`;
            //        <img src="../../images/3pontos.svg">
            Content.appendChild(teste);
        }
        ColocarEventos();
    }
}

function ColocarEventos(){
    for(i = 0; i <= quantMax; i++){
      
        var el = document.getElementById(`${RegistroViagens[i]}`); 
        el.addEventListener("click", function(){
            IrParaProximoPasso()
        }, false);
        var el = document.getElementById(`id=${RegistroViagens[i]}`); 
        el.addEventListener("click", function(){
            PopUp()
        }, false);
    }
}

function IrParaProximoPasso(){

    var id1 = parseInt(event.currentTarget.id);

    axios.post('http://localhost:3333/viagens/registo',
    {
        id_car: sessionStorage.getItem("caronista_id"),
        id: id1, 
        headers: { 
            id_car: sessionStorage.getItem("caronista_id"),
            id: id1 
        }
    })
    .then(function(response) {
        console.log(response.data.resp);
        if(response.data.resp === "Existe"){
            alert("Você ja se cadastrou nesse veículo");
            return;
        }
        location.reload();
    })
    .catch(function (error) {
        console.log(error);
    });
}

function PopUp(){
    var idv = parseInt(event.currentTarget.id.replace('id=', ''));
    var popup = document.getElementById('modal-promocao');
    
    popup.classList.remove('fechar');
    popup.classList.add('mostrar');

    ListarNomes(idv);
}

function FecharPopUp(){
    var popup = document.getElementById('modal-promocao');

    popup.classList.remove('mostrar');
    popup.classList.add('fechar');
    
}

function ListarNomes(id){
    axios.get('http://localhost:3333/viagens/listagem',
    {
        headers: { id: id }
    })
    .then(response => MapearDados(response.data))
    .catch(function (error) {
        console.log(error);
    });
    const MapearDados = ( nomes ) => {

        const Content = document.getElementById('mostrarNomes');
        Content.innerHTML = "";

        for (i = 0; i < nomes.length; i++) {      
            const teste = document.createElement('p');
            teste.innerHTML = `${nomes[i].name}`;
            //        <img src="../../images/3pontos.svg">
            Content.appendChild(teste);
        }
    }
}


function SetUpData(){
    var select = document.getElementById('select-data');
    var option;

    const data = new Date();
    var stringData;   

    for(var i = 0; i < 8; i++){
        var j = i;
        if((data.getDate() + j) < 10){
            stringData = data.getDate()+i;
            stringData = "0" + stringData;
        }else{
            stringData = data.getDate()+i;
        }

        mes = data.getMonth()+1;

        if((data.getMonth()+1) < 10){
            stringData += "/0" + mes + "/";
        }else{
            stringData += "/" + mes + "/";
        }

        stringData += data.getFullYear();

        if(i == 0){
            option = document.createElement('option');
            option.innerHTML = `<option value="${stringData}">Hoje</option>`;
            sessionStorage.setItem("dataAt", stringData)
            DataHoje = stringData;
            select.appendChild(option);
            continue;
        }

        option = document.createElement('option');
        option.innerHTML = `<option value="${stringData}">${stringData}</option>`;
        select.appendChild(option);
    }
}

function PesquisarPonto(){
    var nome = document.getElementById('pesquisar').value;

    axios.get('http://localhost:3333/vindexpl', {
        headers: {nome , data: sessionStorage.getItem("dataAt")}     
        })
    .then(/*function (response) {
        console.log(response);
        viagens = response.data;
    }*/
    response => MapearDados(response.data)
    )
    .catch(function (error) {
        console.log(error);
    });

    const MapearDados = ( viagens ) => {

        const Content = document.getElementById('content')
        Content.innerHTML = '';
        for (i = 0; i < viagens.length; i++) {
            const teste = document.createElement('div');
            console.log(viagens[i])
            teste.innerHTML = 
                `<div class="viagem-container">
                    <div class="viagem-tituloedata">
                        <h2>${viagens[i].local}</h2>
                        <p>Data: ${TransformarData(viagens[i].data)}</p>
                    </div>
                    <div class="viagem-content-position">
                        <div id="esquerda">
                            <p>Veículo: ${viagens[i].tipo} - ${viagens[i].placa}</p>
                            <p>Horario Saida: ${viagens[i].saida}</p>
                            <p>Local saida: ${viagens[i].localsaida}</p>
                            <p>Capacidade Total: ${viagens[i].capacidade}</p>
                        </div>
                        <div id="direita">
                            <p>Valor: R$${viagens[i].valor}.00</p>
                            <p>Horario Chegada: ${viagens[i].retorno}</p>
                            <p>Local Chegada: ${viagens[i].localretorno}</p>
                            <p>Quantidade Atual: ${viagens[i].quantAtual}</p>
                        </div>
                    </div>
                    <button id="${viagens[i].id}">Registrar-se</button>
                <div>`;
            
            Content.appendChild(teste);
        }
        ColocarEventos();
    }
}

function MudarDataAt(){
    var select = document.getElementById('select-data').value;

    sessionStorage.setItem("dataAt", select);

    if(select == "Hoje"){
        sessionStorage.setItem("dataAt", DataHoje);
    }

    var h3 = document.getElementById('VisaoViagem').innerHTML = `Você Esta Vendo Viagens de ${select}`;

    var nome = document.getElementById('pesquisar').value;
    if(nome){
        PesquisarPonto();
    }else{
        Iniciar();
    }
}
