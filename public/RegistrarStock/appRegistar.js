window.onload=principal;

//obteniendo la url desde el localstorage

let url = localStorage.getItem("url");
console.log(url);
UrlAnterior = document.referrer;
if(UrlAnterior !== url){
    alert('no intentes hackear')
   window.location= "./Admin.html";
}






function principal(){
   
    document.getElementById("mostarStock").addEventListener("click", mostarStock);
    document.getElementById("agregarArticulo").addEventListener("click", agregarStock);
    document.getElementById("modificarArticulo").addEventListener("click", modificarStock);
}

 var var_id;

 async function mostarStock(){
    document.getElementById("CuerpoTabla").innerHTML = " ";
    let stock = await axios.get("http://localhost:3001/articulo")
    let cat;

    try {      
                    
        for (let item of stock.data) {

          switch (item.categoriaId) {
             case 1:
                  cat="comestibles";
                  break;
            case 2:
                  cat="bebidas";
               break;
           case 3:
                  cat="cigarrilos";
               break;
         case 4:
                 cat="golosinas";
             break;
          
              default:
                  break;
          }

                    document.getElementById("CuerpoTabla").innerHTML+= 
                `<tr>
                    <th scope="row">${item.id}</th>
                    <td>${item.nombre}</td>
                    <td>${item.cantidad}</td>
                    <td>${cat}</td>
                    <td>$${item.PrecioCompra}</td>
                    <td>$${item.PrecioVenta}</td>
                    <td><button onclick="modArticulo(${item.id})">M</button></td>
                    <td><button onclick="elimArticulo(${item.id})">X</button></td>
                </tr>`;
        }

        }catch (err) {

            alert(err)
        }          
}
async function elimArticulo(id){
    
    
    try {
     const borrar = await axios.delete("http://localhost:3001/articulo/"+id); 
     alert("Articulo Eliminado Correctamente")
    } catch (err) {
        alert(err)
    }
    
}


 async function agregarStock(){
   
    let arti=document.getElementById("idArticulo").value;
    let cant=document.getElementById("idCantidad").value;
    let precioComp=document.getElementById("idPrecioCompra").value;
    let precioVent=document.getElementById("idPrecioVenta").value;
    let cat=document.getElementById("categorias").value;
    let catId;
     if (arti!="" && cant>0 && precioComp>0 && precioVent>0) {
         
     
    try {

    let categoria=await axios.get("http://localhost:3001/categoria");

    for (let item of categoria.data) {
        if (item.tipo==cat) {
            catId=item.id;
        }
    }
     
        let art = await axios.post("http://localhost:3001/articulo",{
        nombre:arti,
        cantidad:cant,
        PrecioCompra:precioComp,
        PrecioVenta:precioVent,
        categoriaId:catId
        });
        alert("Articulo Guardado Correctamente")
    } catch (err) {
        alert(err)
    }
    }else{
        alert("Todos los campos deben estas cargados correctamente")
    }
       limpiarCeldas();
}
async function modArticulo(Id){ 
    limpiarCeldas();
    var_id=Id;
    try {
        
        let arti=await axios.get("http://localhost:3001/articulo");
        for (let item of arti.data) {
            if (item.id==var_id) {

        document.getElementById("idArticulo").value+=item.nombre;
        document.getElementById("idCantidad").value+=item.cantidad;
        document.getElementById("idPrecioCompra").value+=item.PrecioCompra;
        document.getElementById("idPrecioVenta").value+=item.PrecioVenta;         
    }          
        }     
    } catch (err) {
        alert(err)
    }
    
   
   
}

 async function modificarStock(){

    let nombre = document.getElementById("idArticulo").value;
    let cantidad =  document.getElementById("idCantidad").value;
    let categoria =document.getElementById("categorias").value;
    let precioCompra = document.getElementById("idPrecioCompra").value;
    let precioVenta = document.getElementById("idPrecioVenta").value;
    let cat=await axios.get("http://localhost:3001/categoria");
    let idCat;

    for (let item of cat.data ) {
        if (categoria==item.tipo) {
            idCat=item.id;
        }
    }
try {
     let articulo = axios.put("http://localhost:3001/articulo/"+var_id,{
        nombre: nombre,
        cantidad: cantidad,
        PrecioCompra: precioCompra,
        PrecioVenta: precioVenta,
        categoriaId: idCat
        });
        alert("Dato Modificado Correctamente");
} catch (err) {
    alert(err);
}




}
function limpiarCeldas(){
    document.getElementById("idArticulo").value="";
    document.getElementById("idCantidad").value="";
    document.getElementById("idPrecioCompra").value="";
    document.getElementById("idPrecioVenta").value="";
}