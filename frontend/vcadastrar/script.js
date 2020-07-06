$(document).ready(function(){
    Iniciar();
});

function Iniciar(){
    axios.get('https://localhost:3333/ptindex')
    .then(/*function (response) {
        console.log(response);
        viagens = response.data;
    }*/
    response => MapearDados(response.data)
    )
    .catch(function (error) {
        console.log(error);
    });
    const MapearDados = ( pontos ) => {
        
        console.log(pontos);

        const Select = document.getElementById('pontos')
        for (i = 0; i < pontos.length; i++) {
            const teste = document.createElement('option');
            console.log(pontos[i])
            teste.innerHTML = `<option value="${pontos[i].nome}">${pontos[i].nome}</option>`;
            
            Select.appendChild(teste);
        }
    }

}

function CadastrarViagem(){
    ponto = $('#pontos').val();
    var data = document.getElementById('data').value;
    var saida = document.getElementById('saida').value;
    var localsaida = document.getElementById('localsaida').value;
    var data = document.getElementById('data').value;
    var retorno = document.getElementById('retorno').value;
    var localretorno = document.getElementById('localretorno').value;
    var transporte = sessionStorage.getItem("transporte");

    console.log(data)

    var separado = data.split("/")

    const date = new Date();
    
    var hoje = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

    if(separado[2] < date.getFullYear()){
        alert("Data Invalida! Note que Não se pode marcar viagens para o mesmo dia ou antes.");
        return;
    }else if(separado[1] < date.getMonth()+1){
        alert("Data Invalida! Note que Não se pode marcar viagens para o mesmo dia ou antes.");
        return;
    }else if(separado[0] <= date.getDate()){
        alert("Data Invalida! Note que Não se pode marcar viagens para o mesmo dia ou antes.");
        return;
    }

    console.log(separado);
    
    Cadastrar(data, ponto, saida, localsaida, data, retorno, localretorno, transporte)
}

function Cadastrar(saida, local, saida, localsaida, data, retorno, localretorno, transporte){
    axios.post('https://localhost:3333/viagens', {
        data,
        saida,
        localsaida,
        retorno,
        localretorno,
    },{
        headers: {
            transporte: sessionStorage.getItem('transporte_id'),
            local
        }
    })
    .then(function (response) {
        console.log(response);

        resposta = response.data;

        if(resposta.resp != "Viagem Cadastrada !"){
            alert("Viagem Não Cadastrada !");
        }else{
            alert("Viagem Cadastrada !");
            TelaInicial();
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function mascaraData(val) {
    var pass = val.value;
    var expr = /[0123456789]/;

    for (i = 0; i < pass.length; i++) {
        // charAt -> retorna o caractere posicionado no índice especificado
        var lchar = val.value.charAt(i);
        var nchar = val.value.charAt(i + 1);

        if (i == 0) {
        // search -> retorna um valor inteiro, indicando a posição do inicio da primeira
        // ocorrência de expReg dentro de instStr. Se nenhuma ocorrencia for encontrada o método retornara -1
        // instStr.search(expReg);
        if ((lchar.search(expr) != 0) || (lchar > 3)) {
            val.value = "";
        }

        } else if (i == 1) {

        if (lchar.search(expr) != 0) {
            // substring(indice1,indice2)
            // indice1, indice2 -> será usado para delimitar a string
            var tst1 = val.value.substring(0, (i));
            val.value = tst1;
            continue;
        }

        if ((nchar != '/') && (nchar != '')) {
            var tst1 = val.value.substring(0, (i) + 1);

            if (nchar.search(expr) != 0)
            var tst2 = val.value.substring(i + 2, pass.length);
            else
            var tst2 = val.value.substring(i + 1, pass.length);

            val.value = tst1 + '/' + tst2;
        }

        } else if (i == 4) {

        if (lchar.search(expr) != 0) {
            var tst1 = val.value.substring(0, (i));
            val.value = tst1;
            continue;
        }

        if ((nchar != '/') && (nchar != '')) {
            var tst1 = val.value.substring(0, (i) + 1);

            if (nchar.search(expr) != 0)
            var tst2 = val.value.substring(i + 2, pass.length);
            else
            var tst2 = val.value.substring(i + 1, pass.length);

            val.value = tst1 + '/' + tst2;
        }
        }

        if (i >= 6) {
        if (lchar.search(expr) != 0) {
            var tst1 = val.value.substring(0, (i));
            val.value = tst1;
        }
        }
    }

    if (pass.length > 10)
        val.value = val.value.substring(0, 10);
    return true;
}

function Redirecionar(){
    window.location.href = "../vescolher/index.html";
}