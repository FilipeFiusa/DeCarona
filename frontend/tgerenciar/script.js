$(document).ready(function(){
    Iniciar();
});

function Iniciar(){
    console.log("abriu aqui");

   
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

        const Content = document.getElementById('content')
        for (i = 0; i < transportes.length; i++) {
            const teste = document.createElement('div');
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

                    <div class="icones">
                        <img src="../images/Edit.svg">
                        <img src="../images/Delete.svg">
                    </div>
                </div>`;
            
            Content.appendChild(teste);
        }
    }

}