$(document).ready(function(){
    VerificarSeEstaLogado()
    SetUpHeader()
});

function VerificarSeEstaLogado(){
    if(!sessionStorage.getItem('caronista_id')){
        window.location.href = 'login/login.html';
    }
}

function SetUpHeader(){
    var header = document.getElementById('header');
    
    axios.get('http://localhost:3333/caronista', {
        headers: {id: sessionStorage.getItem("caronista_id")}     
        })
    .then(function (response) {
        var [PrimeiroNome] = response.data.name.split(" ");
        
        header.innerHTML = `
            <img onclick="TelaInicial()" src="images/Logo DeCarona 200x200 Branco.png">

            <div id="logout">
                <h3 id="nome">Bem Vindo, ${PrimeiroNome}</h3>
                <a onclick="Desconectar()"><img src="images/log-out.svg"></a>
            </div>`;    
    }
    )
    .catch(function (error) {
        console.log(error);
    });
}

function TelaInicial(){
    window.location.href = 'index.html';
}

function Desconectar(){
    localStorage.clear();
    sessionStorage.clear();

    window.location.href = 'login/login.html';
}

function TransformarData(data){
    var [dia, mes, ano] = data.split("/");

    if(mes == 1){
        return (dia + " de Janeiro")
    }
    if(mes == 2){
        return (dia + " de Fevereiro")
    }
    if(mes == 3){
        return (dia + " de Março")
    }
    if(mes == 4){
        return (dia + " de Abril")
    }
    if(mes == 5){
        return (dia + " de Maio")
    }
    if(mes == 6){
        return (dia + " de Junho")
    }
    if(mes == 7){
        return (dia + " de Julho")
    }
    if(mes == 8){
        return (dia + " de Agosto")
    }
    if(mes == 9){
        return (dia + " de Setembro")
    }
    if(mes == 10){
        return (dia + " de Outubro")
    }
    if(mes == 11){
        return (dia + " de Novembro")
    }
    if(mes == 12){
        return (dia + " de Dezembro")
    }
}