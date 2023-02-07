window.onload=principal;

function principal(){
    document.getElementById("btn_admin").addEventListener("click",ingresoAdmin)
}


let url = window.location.href;

localStorage.setItem("urlAdmin" , url);

let pantalla = localStorage.getItem("urlPatallaIncial");
let ventas = localStorage.getItem("urlVentas");
let anulacion = localStorage.getItem("urlAnulacion");
let movimientos = localStorage.getItem("UrlMovimientos");
let registrar = localStorage.getItem("urlRegistrarClientes");
let cobranza = localStorage.getItem("urlCobranza");
let reportes = localStorage.getItem("urlReportes");

 

var usuario = "lucasleiro"
var correo = "lucasleiroa@gmail.com"
var password = "lucas1248759"

function ingresoAdmin(){

    let input_usuario = document.getElementById("nombre_admin").value;
    let input_password = document.getElementById("contrasena_admin").value;

    if ((input_usuario == usuario || input_usuario == correo) && input_password == password) {
         window.location="./RegistrarStock.html";
         window.close();
    }else{
        alert("Usuario o Contraseña Incorrectos")
    }



}