window.onload=principal;


function principal(){
    document.getElementById("btn_admin").addEventListener("click",ingresoAdmin)
}

var usuario = "lucasleiro"
var correo = "lucasleiroa@gmail.com"
var password = "lucas1248759"

function ingresoAdmin(){

    let input_usuario = document.getElementById("nombre_admin").value;
    let input_password = document.getElementById("contrasena_admin").value;

    if ((input_usuario == usuario || input_usuario == correo) && input_password == password) {
         window.open("./RegistrarStock.html")
         window.close();
    }else{
        alert("Usuario o Contraseña Incorrectos")
    }



}
