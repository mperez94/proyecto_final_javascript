///////////////////////////////// VARIABLES //////////////////////////////

let precioEnvio = 200;
let totalDescuento = 0;
let botonCompra = $(".botonCompra").get()
let carrito = [];
let botonAceptar = $('.btnComprar').get()
let miUsuario = 'Mariano';
let miPass = '123';
let conectado = 0;
let envio = 0;
let botonEliminar = $('.btnEliminar').get()



///////////////////////////////// FUNCIONES //////////////////////////////

window.onload = function() {

    let storage = JSON.parse(localStorage.getItem('carrito'))
    if (storage){
        carrito = storage;
        render()
    }

  }

for (let boton of botonCompra ) {

    boton.addEventListener("click" , agregarCarritoItem)

}

function agregarCarritoItem(e) {

    notificacion()

    let hijo = e.target;
    let padre = hijo.parentNode.parentNode.parentNode;
    
    let nombreProducto = padre.querySelector('h5').textContent;
    let precio = parseInt(padre.querySelector('h6').textContent);
    let idProducto = padre.querySelector('.botonCompra').dataset.id
    
    const producto = {

        nombre: nombreProducto,
        valor: precio,
        cantidad: 1,
        id: idProducto
        
    }

    
    carritoPush(producto);
    render()
    

}

function notificacion (){

    const myNotification = window.createNotification({
        positionClass: 'nfc-bottom-right',
        closeOnClick: true,
        showDuration: 2000,
        theme: 'success'
    });
    
    myNotification({ 
    title: 'Notificacion',
    message: 'Producto Agregado al Carrito' 
    });
}

function carritoPush (producto){

    
    for ( i = 0 ; i < carrito.length ; i ++){

        if ( carrito[i].id === producto.id){
            carrito[i].cantidad ++;

            return null;
        }        

        
    }

    
    carrito.push(producto)

    carritoTotal()


}

function carritoTotal (producto){
    var total = 0
    const cartTotal = $('#carrito').get()
    carrito.forEach((producto) => {
        const precio = Number(producto.valor)
        total = total + precio*producto.cantidad
    })
    if (total === 0){
        $('.btnComprar').hide();
        $('.btnLimpiar').hide();
        $('#compra').hide();
        $('.tablaItems').html(`
        <th></th>
        <th>CARRITO VACIO</th>
        <th></th>`)
    }
    $(cartTotal).html(`<i class="bi bi-currency-dollar"></i>${total}`)

    addLocalStorage()


}

function compraFinal(){

    let totalF = parseInt($('#carrito').text());
    let nombreForm = $('.nombre').val()
    let apellido = $('.apellido').val()
    let direccion = $('.direccion').val()
    let departamento = $('.departamento').val()
    let telefono = $('.telefono').val()
    let aclaraciones = $('.aclaraciones').val()
         
    if(envio == 1 && conectado == 0){
     
        if(nombreForm == '' || direccion == '' || telefono == ''){
            alert('COMPLETE LOS DATOS OBLIGATORIOS DE ENVIO')

            let sinDatos = $('.obligatorio').get();
            for (i = 0 ; i < sinDatos.length; i++){
              
                if(sinDatos[i].value === ''){
                    $( sinDatos[i] ).next().css( "color", "red" );
                
                }else{
                    $( sinDatos[i] ).next().css( "color", "white" );
                }
                
            }
            
            
        }else{
            let envio = 200
            totalF = totalF + envio
            let contFactura = `
            <p style="color: white;">Su ha generado con exito su N° de ticket: <span style="color: green; text-decoration: underline;">A4e321s213894fds</span></p>
            <p style="color: white;">Su Total a pagar con el envio es de <span style="color: green;">$${totalF}</span></p>
            <p style="color: white;">${nombreForm}, tu pedido sera armado y enviado a la siguiente Direccion: <span style="color: green; text-decoration: underline;">${direccion} ${departamento}</span></p>
            <p style="color: white;">Gracias por tu Compra!</p>
            <a href="index.html"><button href="" type="button" class="btn btn-success btnFin" style="align-items: center ;width: 500px ;color: white; margin: 20px auto;">FINALIZAR COMPRA</button></a>    
            `
            $('.btnFin').on('click',vaciarCarrito)
            $('.factura').html(contFactura);
            renderTicket()
        
        }
    

    }else if(envio == 0 && conectado == 1){

        let descuento = totalF * 0.10
        totalF = (totalF - descuento)
        let contFactura = `
        <p style="color: white;">Se ha generado con exito su N° de ticket: <span style="color: green; text-decoration: underline;">h467820se987f8ds</span></p>
        <p style="color: white;">Su Total a pagar con el descuento de usuario es de <span style="color: green;">$${totalF}</span></p>
        <p style="color: white;">Retirar pedido en el local, Direccion: <span style="color: green; text-decoration: underline;">Calle Falsa 123</span></p>
        <p style="color: white;">Gracias por tu Compra!</p>
        <a href="index.html"><button href="" type="button" class="btn btn-success btnFin" style="align-items: center ;width: 500px ;color: white; margin: 20px auto;">FINALIZAR COMPRA</button></a>    
        `
        $('.btnFin').on('click',vaciarCarrito)
        $('.factura').html(contFactura);
        renderTicket()
    

    }else if(envio == 1 && conectado == 1){

        if(nombreForm == '' || direccion == '' || telefono == ''){
            alert('COMPLETE LOS DATOS OBLIGATORIOS DE ENVIO')
            let sinDatos = $('.obligatorio').get();
            for (i = 0 ; i < sinDatos.length; i++){
              
                if(sinDatos[i].value === ''){
                    $( sinDatos[i] ).next().css( "color", "red" );
                
                }else{
                    $( sinDatos[i] ).next().css( "color", "white" );
                }
                
            }
            
        }else{
            let envio = 200
            let descuento = totalF * 0.10
            totalF = (totalF - descuento) + envio
            let contFactura = `
            <p style="color: white;">Se ha generado con exito su N° de ticket: <span style="color: green; text-decoration: underline;">j23451R321rs23s</span></p>
            <p style="color: white;">Su Total a pagar con el descuento y el envio es de <span style="color: green;">$${totalF}</span></p>
            <p style="color: white;">${nombreForm}, tu pedido sera armado y enviado a la siguiente Direccion: <span style="color: green; text-decoration: underline;">${direccion}${departamento}</span></p>
            <p style="color: white;">Gracias por tu Compra!</p>
            <a href="index.html"><button href="" type="button" class="btn btn-success btnFin" style="align-items: center ;width: 500px ;color: white; margin: 20px auto;">FINALIZAR COMPRA</button></a>
    
            `;
            $('.btnFin').on('click',vaciarCarrito)
            $('.factura').html(contFactura);
            renderTicket()
        
        }

    }else{

        let contFactura = `
        <p style="color: white;">Se ha generado con exito su N° de ticket: <span style="color: green;">Ha27986s2345321</span></p>
        <p style="color: white;">Su Total a pagar es de $${totalF}</p>
        <p style="color: white;">Retirar pedido en el local, Direccion: <span style="color: green; text-decoration: underline;">Calle Falsa 123</span></p>
        <p style="color: white;">Gracias por su Compra!</p>
        <a href="index.html"><button href="" type="button" class="btn btn-success btnFin" style="align-items: center ;width: 500px ;color: white; margin: 20px auto;">FINALIZAR COMPRA</button></a>
        `;
    
        $('.factura').html(contFactura);
        renderTicket()

    }
    $('.btnFin').on('click',vaciarCarrito)
}

function render (){

    $('.tablaItems').html('');

    carrito.map(producto=> {
        const tr = document.createElement('tr')
        tr.classList.add('itemCarrito')
            
        const contenido = `
        <td class='title' style="color: white;">${producto.nombre}</td>
        <td style="color: white;">${producto.cantidad} x </td>
        <td style="color: white;">$${producto.valor}</td>
        <td><button type='button' class='btn btn-danger btn-sm btnEliminar'>X</button>
        `
        tr.innerHTML = contenido
        $('.tablaItems').append(tr);

        
        tr.querySelector('.btnEliminar').addEventListener('click' , eliminarItem)

    })

    $('.tablaFinal').html('');

    carrito.map(producto=> {
        const trF = document.createElement('tr')
        trF.classList.add('itemCarrito')
            
        const contF = `
        <td class='title' style="color: white;">${producto.nombre}</td>
        <td style="color: white;">${producto.cantidad} x </td>
        <td style="color: white;">$${producto.valor}</td>
        <td><button type='button' class='btn btn-danger btn-sm btnEliminar'>X</button>
        `
        trF.innerHTML = contF
        $('.tablaFinal').append(trF);


        trF.querySelector('.btnEliminar').addEventListener('click' , eliminarItem)

    })

    $('.btnComprar').show();
    $('.btnLimpiar').show();

    carritoTotal()
}

function renderTicket(){

    $('.tablaFinal').html('');
    $('.trashIcon').hide();
    $('.formEnvio').hide();
    $('.btn-check').hide();
    $('.bt').hide();
    carrito.map(producto=> {
        const trF = document.createElement('tr')
        trF.classList.add('itemCarrito')
            
        const contF = `
        <td class='title' style="color: white;">${producto.nombre}</td>
        <td style="color: white;">${producto.cantidad} x </td>
        <td style="color: white;">$${producto.valor}</td>
        
        `
        trF.innerHTML = contF
        $('.tablaFinal').append(trF);

    })



}

function tablafin (){
    $('#compra').show()
}

function eliminarItem (e){
    const buttonDelete = e.target
    const item = buttonDelete.closest('.itemCarrito')
    const itemTitle = item.querySelector('.title').textContent
    for (i=0 ; i < carrito.length ; i++){
        if(carrito[i].nombre.trim() === itemTitle.trim()){
            carrito.splice(i , 1);
        }
    }
    item.remove()

    const myNotification = window.createNotification({
        positionClass: 'nfc-bottom-right',
        closeOnClick: true,
        showDuration: 2000,
        theme: 'error'
    });
    
    myNotification({ 
    title: 'Notificacion',
    message: 'Producto Eliminado del Carrito' 
    });

    carritoTotal()
    render()
    
}
   
function notificacionVacio(){

    const myNotification = window.createNotification({
        positionClass: 'nfc-bottom-right',
        closeOnClick: true,
        showDuration: 2000,
        theme: 'error'
    });
    
    myNotification({ 
    title: 'Notificacion',
    message: 'Carrito Vacio' 
    });

}

function vaciarCarrito (){
    
    carrito.length = 0
    render()
}

function addLocalStorage() {

    localStorage.setItem('carrito', JSON.stringify(carrito))
    localStorage.setItem('linksDatos', JSON.stringify(carrito))

}

function iniciarSesion (){

    let usuario = $('#usuario').val();
    let password = $('#contrasenia').val();

    if (usuario == miUsuario && password == miPass){

        console.log('Aceptado');
        $('.error').hide();
        $('.aceptado').show()
        $('.aceptado').fadeIn(100000, loginOut);
        usuarioLogeado()
        conectado = 1
        console.log(conectado)
        

        

    }else {

        console.log(conectado)
        $('.error').show();

    }
}

function usuarioLogeado (){

    let ul = $('.usuarioLogin').get()
    let user = $('#usuario').val();
    let contenidoLogin = `
    <li class="nav-item dropdown bg-dark rounded-pill logeado">
    <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style='color:white;'><i class="bi bi-person-fill"></i><span> </span>${user}</a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
    <li><a class="dropdown-item btnLogout" role="button" >Cerrar Sesion</a></li>
    </ul>
    </li>
    ` 
    $(ul).html(contenidoLogin);

    $('.btnLogout').on('click', cerrarSesion)

}

function cerrarSesion(){

    location.reload();
    return false;


}

function conEnvio(){

    $('.formEnvio').show();
    envio = 1;
    console.log(envio)

}

function sinEnvio(){

    $('.formEnvio').hide();
    envio = 0;
    console.log(envio)

}


let urlCLIMA = "http://api.openweathermap.org/data/2.5/weather?q=Cordoba&appid=bbf8893c6e8030e157bb633d11a66e17"

$("#CLIMA").click(function(){

    $.get(urlCLIMA , function( datos){

        console.log( datos );
    })
})



$.ajax({
    url:'http://api.openweathermap.org/data/2.5/weather',
    type:"GET",
    data:{
        q:'Buenos Aires',
        appid: 'bbf8893c6e8030e157bb633d11a66e17',
        dataType:"jsonp",
        units: 'metric'
    },
    success:function(data){

        console.log( data);
        let icono = data.weather[0].icon;
        let iconoURL = "http://openweathermap.org/img/w/" + icono + ".png";
        $("#icono").attr("src" , iconoURL);
        let contenido = ` 
                <p style="margin: 0px 5px;">${data.name}</p>                            
                <p style="margin: 0px 5px;">${data.weather[0].main}</p>
                `

        $("#clima").append(contenido);
    }
})

$('.btnComprar').on('click', tablafin)
$('.btnNoEnvio').on('click', sinEnvio)
$('.btnEnvio').on('click', conEnvio)
$('.btnFin').on('click', compraFinal)

///////////////////////////////// ANIMACIONES //////////////////////////////

$('.btnLogin').on('click' , loginIn);
$('.btnIngresar').on('click' , iniciarSesion);
$('.btnCancelar').on('click' , loginOut);
$('.btnLimpiar').on('click', vaciarCarrito)
$('.btnLimpiar').on('click',notificacionVacio)

function loginIn(){
    $('.glops').fadeOut('swing' , entraLogin)

} 

function loginOut(){
    $('#login').fadeOut('swing' , saleLogin)
}

function entraLogin(){
    $('#login').fadeIn('swing')  
} 

function saleLogin(){
    $('.glops').fadeIn('swing')
}

$('#listaCarrito').on('click', function(e){
    e.stopPropagation();
});

$('.btnComprar').hide();
$('.btnLimpiar').hide();
$('#login').hide();
$('.error').hide();
$('.aceptado').hide();
$('#compra').hide();
$('.formEnvio').hide();