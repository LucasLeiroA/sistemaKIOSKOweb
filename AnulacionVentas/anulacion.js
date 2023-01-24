window.onload=principal;

function principal(){
     document.getElementById("btnAceptar").addEventListener("click",mostrarTabla)
}

var var_id;
var var_cliente;

async function mostrarTabla(){
    document.getElementById("cabezaTabla").innerHTML="";
    document.getElementById("tablaMuestra").innerHTML="";

    try {
         
            let articulo;
            let Cliente;
            let nombre;
        
            let TipoVenta=document.getElementById("selector").value;
           
          
            if (TipoVenta=="Contado") {
            
                
                document.getElementById("cabezaTabla").innerHTML+=
                `
                <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Articulo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">total</th>
                </tr>

                `


                let ventaContado=await axios.get("http://localhost:3000/ventas");
                
                for (let item of ventaContado.data) {
                    if (item.tipoVentaId==1 && item.estadoVentaId!=2) {

                        let art=await axios.get("http://localhost:3000/articulo");
                        nuevaCantidad=item.catidad;
                        for (let item2 of art.data) {
                            if (item2.id==item.articuloId) {
                                nombre=item2.nombre;
                                break;
                            }
                        }
                        document.getElementById("tablaMuestra").innerHTML+=
                        `<tr>
                        <th scope="row">${item.id}</th>
                        <td>${nombre}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.totalVenta}</td>
                        <td><button onclick="elimVenta(${item.id})">X</button></td>
                    </tr>`;
                    }
                }

               


            }

            if (TipoVenta=="CuentaCorriente") {
                document.getElementById("cabezaTabla").innerHTML+=
                `
                <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Articulo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">total</th>
                </tr>

                `

                let ventaCuentaCorriente=await axios.get("http://localhost:3000/ventas"); 
                
                for (let item of ventaCuentaCorriente.data) {
                    if (item.tipoVentaId==2 && item.estadoVentaId!=2) {
                        
                        let arti=await axios.get("http://localhost:3000/articulo");
                    
                        for (let item2 of arti.data) {
                            if (item2.id==item.articuloId) {
                                articulo=item2.nombre;
                                break;

                            }
                        }

                        let cli=await axios.get("http://localhost:3000/clientes");

                        for (let item3 of cli.data) {
                            if (item3.id==item.clientesId) {
                                Cliente=item3.nomYape;
                                break;
                            }
                        }

                        document.getElementById("tablaMuestra").innerHTML+=
                        `<tr>
                        <th scope="row">${item.id}</th>
                        <td>${Cliente}</td>
                        <td>${articulo}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.totalVenta}</td>
                        <td><button onclick="elimVenta(${item.id})">X</button></td>
                    </tr>`;
                    }
                    
                }
            }
      

    } catch (err) {
        alert(err)
    }
}


async function elimVenta(id){

    try {
        
        let cliente;
            var_id=id;
        let ventaTOTAL;
        let cli;
        let deuda;
        let modificarSaldo;
        let nuevaDeuda;
        let tipoVenta=document.getElementById("selector").value;
        let venta=await axios.get("http://localhost:3000/ventas");
        

  

     
    
    
        if (tipoVenta=="CuentaCorriente") {
            let nuevaCantidad;
            for (let item of venta.data) {
                    if (item.id==var_id) {
                        ventaTOTAL=parseInt(item.totalVenta)
                        cliente=item.clientesId ;
                }
               
            }
            

            deudaCliente=await axios.get("http://localhost:3000/cuentaCorriente")
            for (let item of deudaCliente.data) {
                if (item.clientesId==cliente) {
                    nombre=item.cliente;
                    deuda=parseInt(item.deuda);
                    cli=item.id;
                }
            }

            nuevaDeuda=deuda-ventaTOTAL;
       
            

            modificarSaldo=await axios.put("http://localhost:3000/cuentaCorriente/"+cli,{
                cliente:nombre,
                deuda: nuevaDeuda,
                clientesId:cliente,
                estadoVentaId:2
                });
                
            
         }
              let ventass=await axios.get("http://localhost:3000/ventas");  
              let tip;
              let artId;
              let cantidad;
              let ventaT;
              let client;

            for (let item of ventass.data) {
                if (item.id==var_id) {
                    tip=item.tipoVentaId;
                    artId=item.articuloId;
                    cantidad=item.cantidad;
                    ventaT=item.totalVenta;
                    client=item.clientesId;
                    nuevaCantidad=item.cantidad;

                }
            }

        const borrar = await axios.put("http://localhost:3000/ventas/"+var_id,{
            tipoVentaId:2,
            articuloId: artId,
            cantidad: cantidad,
            totalVenta:ventaT,
            clientesId:client,
            estadoVentaId:2
        }); 

        let idArticulo;
        let nombreArt;
        let cantidad3;
        let PC;
        let PV;
        let CatID;
        
     
        let articulo=await axios.get("http://localhost:3000/articulo");
        for (let item of articulo.data) {
            if (item.id==artId) {
                idArticulo=item.id;
                nombreArt=item.nombre;
                cantidad3=item.cantidad;
                PC=item.PrecioCompra;
                PV=item.PrecioVenta;
                CatID=item.categoriaId;
               break; 
            }
            
        }
        
        let modArcticulo=await axios.put("http://localhost:3000/articulo/"+idArticulo,{
            nombre:nombreArt,
            cantidad:parseInt(cantidad3+nuevaCantidad),
            PrecioCompra:PC,
            PrecioVenta:PV,
            categoriaId:CatID,
        })

        if (tipoVenta=="CuentaCorriente") {
             let estado=await axios.get("http://localhost:3000/EstadoDeCaja")
        let totales;
        let final;
        for (let item of estado.data) {
            if (item.id==2) {
                totales=item.ventasEnCuentaCorriente;
            }
        }
        final=parseInt(totales)-parseInt(ventaT);

        let modiEstado=await axios.put("http://localhost:3000/EstadoDeCaja/2",{
            ventasEnCuentaCorriente:final
        })
        }
        if (tipoVenta=="Contado") {
            let estado=await axios.get("http://localhost:3000/EstadoDeCaja")
            let totales;
            let final;
            for (let item of estado.data) {
                if (item.id==1) {
                    totales=item.efectivo;
                }
            }
            final=parseInt(totales)-parseInt(ventaT);
            let modiEstado=await axios.put("http://localhost:3000/EstadoDeCaja/1",{
                efectivo:final
            })

        }
       


    } catch (err) {
        alert(err)
    }

}

