function Entrar(){

    var login = document.getElementById('user').value;
    var senha = document.getElementById('pass').value;

    axios.post('http://localhost:3333/login', {
        login,
        senha,
    })
    .then(function (response) {
        resposta = response.data;

        if(resposta.resp != "Entrou"){
            alert("Login ou Senha errados");
        }else{
            //alert(`Entrou - Seu id: ${resposta.caronista.id}`);
            sessionStorage.setItem("caronista_id", resposta.caronista.id)
            window.location.href = '../index.html';
        }

    })
    .catch(function (error) {
        console.log(error);
    });
}