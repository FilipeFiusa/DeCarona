function IrParaProximaParte(){
    var user = document.getElementById('user').value;
    var senha = document.getElementById('senha').value;
    var senha2 = document.getElementById('senha2').value;

    if(user && (senha == senha2)){

        sessionStorage.setItem("login", user);
        sessionStorage.setItem("senha", senha);

        window.location.href = '../registrop2/registrarpt2.html';

    }else{
        alert("Senha não igual")
    }
  
}