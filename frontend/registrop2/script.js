function Registrar(){
    console.log("Chamou")

    var cpf = document.getElementById('cpf').value;
    var rg = document.getElementById('rg').value;
    var name = document.getElementById('nome').value;
    var age = document.getElementById('idade').value;

    var login = sessionStorage.getItem("login");
    var senha = sessionStorage.getItem("senha");

    axios.post('https://decarona-backend.herokuapp.com/caronistas', {
        login,
        senha,
        cpf,
        rg,
        name,
        age
    })
    .then(function (response) {
        if(response.data.name){
            alert("Registado com Sucesso");
            window.location.href = '../login/login.html';
        }else{
            alert("Ocorreu algum erro na hora do registro");
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}