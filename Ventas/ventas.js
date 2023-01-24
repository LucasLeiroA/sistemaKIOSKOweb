window.onload=principal;

function principal(){
    document.getElementById("cancelarVenta2").addEventListener("click", cancelarVentaCuentaCorriente)
    document.getElementById("aceptarVenta2").addEventListener("click", aceptarVentaCuentaCorriente )
    document.getElementById("calcularCuentaCorriente").addEventListener("click" ,calcularVentaCuentaCorriente)
    document.getElementById("cancelarVenta2").addEventListener("click",cancelarVentaContado)
    document.getElementById("buscador1").addEventListener("click", buscardorArticulosCuentaCorriente)
    document.getElementById("buscarClientes").addEventListener("click", buscadorClienteCuentaCorriente)
    document.getElementById("buscador").addEventListener("click", buscarArticuloContado)
    document.getElementById("calcular").addEventListener("click", calcularVentaContado)
    document.getElementById("cancelarVenta").addEventListener("click",cancelarVentaContado)
    document.getElementById("aceptarVenta").addEventListener("click", aceptarVentaContado)
}
var var_id;
var var_idCliente;
var fecha = new Date;

async function buscarArticuloContado(){

    document.getElementById("selectorArticulos").innerHTML=`<td></td>`;
    
        let productos=await axios.get("http://localhost:3000/articulo");

         let nombreSolicitado=document.getElementById("articuloContado").value;
         
        let texto=nombreSolicitado.toLowerCase();
       let nombre;

        for (let item of productos.data) {
         nombre=item.nombre.toLowerCase();
        if (nombre.indexOf(texto)!= -1) {

            document.getElementById("selectorArticulos").innerHTML+=`<td><button id="btn" class="btn btn-outline-dark" onclick="selecArticulo(${item.id})">${item.nombre}</button></td><br>`
        }
    }
    
    if ( nombre =="") {
        document.getElementById("selectorArticulos").innerHTML+=` <td>No se encontraron resultados de la busqueda</td>`
    }    
    
   
}
async function selecArticulo(id){
    let artc=await axios.get("http://localhost:3000/articulo");
    var_id=id;

    try {
       for (let item of artc.data) {
        if (item.id==var_id) {
            document.getElementById("articuloContado").value=item.nombre;
        }
    } 
    } catch (err) {
        alert(err)
    }
    document.getElementById("selectorArticulos").innerHTML="";
    
}

async function calcularVentaContado(){
    let precio;
    
    let total;
    let nombreArt=document.getElementById("articuloContado").value;
    let articulo=await axios.get("http://localhost:3000/articulo");
    let cantidad=document.getElementById("cantidadContado").value;

    for (let item of articulo.data) {
        if (nombreArt==item.nombre) {
            precio=item.PrecioVenta;
        }
    }
    
    total=parseInt(precio*cantidad) ;

    document.getElementById("totalContado").value=total;

}

function cancelarVentaContado(){
    document.getElementById("cliente").value="";
    document.getElementById("articuloContado").value="";
    document.getElementById("cantidadContado").value="";
    document.getElementById("totalContado").value="0";
}

async function aceptarVentaContado(){
   


    let articulo=await axios.get("http://localhost:3000/articulo");
    let nombre=document.getElementById("articuloContado").value;
    let cantidad=parseInt(document.getElementById("cantidadContado").value) ;
    let total=document.getElementById("totalContado").value;
    let PC;
    let PV;
    let idCat;
    let artId;
    let cant;
  
    
   
        for (let item of articulo.data) {
        if (item.nombre==nombre) {
            artId=item.id
            cant=item.cantidad;
            PV=item.PrecioVenta;
            PC=item.PrecioCompra;
            idCat=item.categoriaId;
        }
    }
         
    if (cantidad>0 && cantidad<=cant) {
        
     try {
         let totales=await axios.get("http://localhost:3000/EstadoDeCaja");
         let totalViejo;
         for (let item of totales.data) {
             if (item.id==1) {
                 totalViejo= item.efectivo;
             }
         }
     
    
        let total1= parseInt(totalViejo) + parseInt(total);

         let estado=await axios.put("http://localhost:3000/EstadoDeCaja/1",{
             efectivo:total1
         });

       
       let article=await axios.post("http://localhost:3000/ventas",{
            tipoVentaId:1,
            articuloId: artId,
             cantidad: cantidad,
             totalVenta:total,
             estadoVenta:1,
             dia:fecha.getDate(),
             mes:fecha.getMonth()
        });  
        
       
        let nuevaCantidad=cant-cantidad;

      let  restaDeCantidad=await axios.put("http://localhost:3000/articulo/"+artId,{
            nombre: nombre,
            cantidad: nuevaCantidad,
            PrecioCompra: PC,
            PrecioVenta: PV,
            categoriaId: idCat
            });
        
        alert("Venta Realizada");
    

    } catch (err) {
        alert(err)   
    }

    }
    else{
        alert("La cantidad selecciona tiene que se mayor a 0 o menor que "+cant+" ya que esa es la cantidad de "+nombre+" disponible.")
        document.getElementById("articuloContado").value="";
        document.getElementById("cantidadContado").value="";
        document.getElementById("totalContado").value="0";
        
    }

}

async function buscadorClienteCuentaCorriente(){
    document.getElementById("SelectorClientes").innerHTML=`<td></td>`;
    let clientes=await axios.get("http://localhost:3000/clientes");
    let nombresolicitado=document.getElementById("cliente").value;
    let texto=nombresolicitado.toLowerCase();
    let nombre;
    for (let item of clientes.data) {
        nombre=item.nomYape.toLowerCase();
       if (nombre.indexOf(texto)!= -1) {

           document.getElementById("SelectorClientes").innerHTML+=`<td><button id="btn" class="btn btn-outline-dark" onclick="selecCliente(${item.id})">${item.nomYape}</button></td><br>`
       }
   }
}

async function selecCliente(id){
    
    let cliente=await axios.get("http://localhost:3000/clientes");
    var_idCliente=id;
    try {
        for (let item of cliente.data) {
            if (item.id==var_idCliente) {
                document.getElementById("cliente").value=item.nomYape;
            }
        }
    } catch (err) {
        alert(err)
    }
    document.getElementById("SelectorClientes").innerHTML="";
}

async function buscardorArticulosCuentaCorriente(){
    document.getElementById("SelectorClientes").innerHTML=`<td></td>`;
    
        let productos=await axios.get("http://localhost:3000/articulo");
         let nombreSolicitado=document.getElementById("articuloCuentaCorriente").value;
        let texto=nombreSolicitado.toLowerCase();
       let nombre;

        for (let item of productos.data) {
         nombre=item.nombre.toLowerCase();
        if (nombre.indexOf(texto)!= -1) {

            document.getElementById("SelectorClientes").innerHTML+=`<td><button id="btn" class="btn btn-outline-dark" onclick="selecArticuloCuentaCorriente(${item.id})">${item.nombre}</button></td><br>`
        }
    }
    
    if ( nombre =="") {
        document.getElementById("SelectorClientes").innerHTML+=` <td>No se encontraron resultados de la busqueda</td>`
    } 
}

async function selecArticuloCuentaCorriente(id){
    let artc=await axios.get("http://localhost:3000/articulo");
    var_id=id;

    try {
       for (let item of artc.data) {
        if (item.id==var_id) {
            document.getElementById("articuloCuentaCorriente").value=item.nombre;
        }
    } 
    } catch (err) {
        alert(err)
    }
    document.getElementById("SelectorClientes").innerHTML="";
}

async function calcularVentaCuentaCorriente(){

    let precio;
    
    let total;
    let nombreArt=document.getElementById("articuloCuentaCorriente").value;
    let articulo=await axios.get("http://localhost:3000/articulo");
    let cantidad=document.getElementById("cantidadCuentaCorriente").value;

    for (let item of articulo.data) {
        if (nombreArt==item.nombre) {
            precio=item.PrecioVenta;
        }
    }
    
    total=parseInt(precio*cantidad) ;

    document.getElementById("TotalCuentaCorriente").value=total;

}

async function aceptarVentaCuentaCorriente(){

   
    let articulo=await axios.get("http://localhost:3000/articulo");
    let nombreCliente=document.getElementById("cliente").value;
    let nombre=document.getElementById("articuloCuentaCorriente").value;
    let cantidad=parseInt(document.getElementById("cantidadCuentaCorriente").value) ;
    let total=document.getElementById("TotalCuentaCorriente").value;
    let PC;
    let PV;
    let idCat;
    let artId;
    let cant;
    let comprobacion;
    let idCuenta;
    let TotalCuenta;
    let total1;
    let clienteid;
  
  
    try{
        let cliente=await axios.get("http://localhost:3000/clientes");
            for (let item of cliente.data) {
                if (item.nomYape==nombreCliente) {
                    clienteid=item.id;
                }
            }

      
                    for (let item of articulo.data) {
                    if (item.nombre==nombre) {
                        artId=item.id
                        cant=item.cantidad;
                        PV=item.PrecioVenta;
                        PC=item.PrecioCompra;
                        idCat=item.categoriaId;

                    }
                }
                    
                if (cantidad>0 && cantidad<=cant) {
                    
                let estado=await axios.get("http://localhost:3000/EstadoDeCaja");
                let totales;
                let final;
                for (let item of estado.data) {
                    if (item.id==2) {
                        totales=item.ventasEnCuentaCorriente;
                    }
                }
                 final=parseInt(totales)+parseInt(total);   

                 let modi=await axios.put("http://localhost:3000/EstadoDeCaja/2",{
                    ventasEnCuentaCorriente:final 
                 })
                let article=await axios.post("http://localhost:3000/ventas",{
                        tipoVentaId:2,
                        articuloId: artId,
                        cantidad: cantidad,
                        totalVenta:total,
                        clientesId:clienteid,
                        estadoVentaId:1,        
                        dia:fecha.getDate(),
                        mes:fecha.getMonth()

                    });  
                
                    let nuevaCantidad=cant-cantidad;

                let  restaDeCantidad=await axios.put("http://localhost:3000/articulo/"+artId,{
                        nombre: nombre,
                        cantidad: nuevaCantidad,
                        PrecioCompra: PC,
                        PrecioVenta: PV,
                        categoriaId: idCat
                        });
                
            
              let cuenta=await axios.get("http://localhost:3000/cuentaCorriente");
           
           
              for (let item of cuenta.data) {
                 if (item.cliente==nombreCliente) {
                     idCuenta=item.id;                     
                     comprobacion = true;
                     total1=item.deuda;

              }
            }
            
            TotalCuenta= parseInt(total1) + parseInt(total);
           
             if (comprobacion==true) {
               
                 let cuenta=await axios.put("http://localhost:3000/cuentaCorriente/"+idCuenta,{
                     cliente:nombreCliente,
                     clientesId:clienteid,
                     deuda:TotalCuenta
                 })

             
             }
             else{
                   let cuenta=await axios.post("http://localhost:3000/cuentaCorriente",{
                    cliente:nombreCliente,
                    clientesId:clienteid,
                   deuda: total
                })  
             }




                    alert("Venta Realizada");
                
    }else{
        alert("La cantidad selecciona tiene que se mayor a 0 o menor que "+cant+" ya que esa es la cantidad de "+nombre+" disponible.")
        document.getElementById("cliente").value="";
        document.getElementById("articuloCuentaCorriente").value="";
        document.getElementById("cantidadCuentaCorriente").value="";
        document.getElementById("TotalCuentaCorriente").value="0";
    }

    } catch (err) {
        alert(err)   
    }  
 }

 function cancelarVentaCuentaCorriente(){
     
    document.getElementById("cliente").value="";
    document.getElementById("articuloCuentaCorriente").value="";
    document.getElementById("cantidadCuentaCorriente").value="";
    document.getElementById("TotalCuentaCorriente").value="0";
 }
