var quantMax;
var TodosVeiculos = [];

$(document).ready(function(){
    Iniciar();
});
          
function Iniciar(){

    axios.get('https://decarona-backend.herokuapp.com/tindexId', { params:{}, headers: { 'id': sessionStorage.getItem('caronista_id') } })
    .then(/*function (response) {
        console.log(response);
        viagens = response.data;
    }*/
    response => MapearDados(response.data)
    )
    .catch(function (error) {
        console.log(error);
    });

    const MapearDados = ( transportes ) => {

        TodosVeiculos = [];
        const Content = document.getElementById('content')
        for (i = 0; i < transportes.length; i++) {
            quantMax = transportes.length;

            TodosVeiculos.push(transportes[i].id);

            var teste = document.createElement('div');
            teste.innerHTML = 
                `<div class="transporte-container">
                    <div class="texto">
                        <div>
                            <p>Placa: ${transportes[i].placa}</p>
                            <p>Tipo: ${transportes[i].tipo}</p>
                        </div>
                        <div>
                            <p>Valor: R$${transportes[i].valor}.00</p>
                            <p>Capacidade: ${transportes[i].capacidade}</p>
                        </div>
                    </div>
                    
                    <div class="botao">
                        <button id="${transportes[i].id}">Escolher</button>
                    </div> 
                      
                </div>`;

            Content.append(teste);

        }
        ColocarEventos(); 
    }
}

function ColocarEventos(){
    for(i = 0; i <= quantMax; i++){
        
        var el = document.getElementById(`${TodosVeiculos[i]}`); 
        el.addEventListener("click", function(){
            IrParaProximoPasso()
        }, false);
    }
}

function IrParaProximoPasso(){
    console.log(event.currentTarget);

    var id = event.currentTarget.id;

    sessionStorage.setItem("transporte_id", id);

    window.location.href = '../vcadastrar/index.html';
}
