let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')

const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')

mostrarProductos(stockProductos)

function mostrarProductos(array){
    array.forEach(productos => {
        let divProductos = document.createElement('div')
        divProductos.classList.add('productos')
        divProductos.innerHTML +=`
        <div class="card">
            <div class="card-image">
                <img class="img" src= ${productos.img}>
                <span class="card-title"> ${productos.nombre}</span>
                <a id="boton${productos.id}" class="btn-floating halfway-fab waves-light black"><i class="fas fa-cart-plus"></i></a>
            </div>
            <div class="card-content">
                <p>${productos.descrip}</p>
                <p>Talle: ${productos.talle}</p>
                <p>Precio: $${productos.precio}</p>
            </div>
        </div>
        `
        contenedorProductos.appendChild(divProductos)

        let botonAgregar = document.getElementById(`boton${productos.id}`)
        botonAgregar.addEventListener('click', () =>{
            agregarAlCarrito(productos.id)
            Toastify({
                text: "Producto agregado",
                className: "info",
                style: {
                    background: "green",
                }
            }).showToast();
        })
    });
}

function agregarAlCarrito(id){
    let verificar = carritoDeCompras.find(elemento => elemento.id == id) //esto se realiza cuando se agrega mas de un mismo producto al carrito
    if(verificar){
        verificar.cantidad = verificar.cantidad + 1
        document.getElementById(`cantidad${verificar.id}`).innerHTML = `<p id="cantidad${verificar.id}">Cantidad:${verificar.cantidad}</p>`
        ActualizarCarrito()
    }

    let productoAgregar = stockProductos.find(productos => productos.id == id)//busca un solo elemnto del array

    carritoDeCompras.push(productoAgregar)
    ActualizarCarrito()
    let div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML += `
        <p>${productoAgregar.nombre}</p>
        <p>Precio:$${productoAgregar.precio}</p>
        <p id="cantidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</p>
        <button class="boton-eliminar" id='eliminar${productoAgregar.id}'><i class="fas fa-trash-alt"></i></button>
    `
    contenedorCarrito.appendChild(div)

    let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

    botonEliminar.addEventListener('click', ()=>{
        if(productoAgregar.cantidad == 1){
            botonEliminar.parentElement.remove()//elimina el elemtno HTML
        carritoDeCompras = carritoDeCompras.filter(elemento => elemento.id != productoAgregar.id)//trae un array nuevo con los id diferentes al boton eliminar que se esta seleccionando
        ActualizarCarrito()
        }else{
            productoAgregar.cantidad = productoAgregar.cantidad - 1
            document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id="cantidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</p>`
            ActualizarCarrito()
        }
        
    })

}

function ActualizarCarrito(){
    contadorCarrito.innerText = carritoDeCompras.reduce((acumulador, elemento) => acumulador + elemento.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acumulador, elemento)=> acumulador + (elemento.precio * elemento.cantidad), 0)
}