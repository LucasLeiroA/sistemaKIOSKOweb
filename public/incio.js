window.onload=principal;

function principal(){
    document.getElementById("btnInicioSesion").addEventListener("click", validacionInicioSesion)
}

async function validacionInicioSesion() {
    
    let usuario = document.getElementById("email").value;
    let contrasena = document.getElementById("contrasena").value;
    let validacion = false;
    let users= await axios.get("http://localhost:3001/user");

        for (let item of users.data) {
            
            if (usuario == item.nombreUsuario || usuario == item.email  && contrasena == item.contrasena) {
                
                window.open("./PantallaInicial/principal.html")
                window.close();
            
            }else{
                alert("Usuario o Contrasena incorrectos");
            }
        }

    window.close();
   
   
}