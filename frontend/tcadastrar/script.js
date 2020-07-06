function CadastrarTransporte(){
    var placa = document.getElementById('placa').value;
    var tipo = document.getElementById('tipo').value;
    var valor = document.getElementById('valor').value;
    var capacidade = document.getElementById('capacidade').value;

    Cadastrar(placa, tipo, valor, capacidade);
}

function Cadastrar(placa, tipo, valor, capacidade){
    axios.post('https://localhost:3333/transportes', {
        placa,
        tipo,
        valor,
        capacidade
    },{
        headers: {
            'dono_id': sessionStorage.getItem('caronista_id')
        }
    })
    .then(function (response) {
        console.log(response);

        resposta = response.data;

        if(resposta.resp != "Entrou"){
            alert("Algum dado errado");
        }else{
            alert("Veículo cadastrado");
            Redirecionar();
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function Redirecionar(){
    window.location.href = "../tgerenciar/index.html";
}