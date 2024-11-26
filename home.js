// Prendas disponibles
const prendasDisponibles = [
    { nombre: "remera", precio: 10000 },
    { nombre: "jean", precio: 20000 },
    { nombre: "short", precio: 5000 },
    { nombre: "buzo", precio: 30000 },
    { nombre: "campera", precio: 50000 },
    { nombre: "ojotas", precio: 40000},
    { nombre: "zapatos", precio: 50000 },
    { nombre: "zapatillas", precio: 50000 },
    { nombre: "pantalon", precio: 20000 },
    { nombre: "gorro", precio: 5000 },
    { nombre: "gorra", precio: 5000 },
    { nombre: "vestido", precio: 25000 },
    { nombre: "mochila", precio: 50000},
    { nombre: "pulsera", precio: 2500}
];

// Valores Iniciales
let productos = [];
let totalCompra = 0;

// Elementos del DOM
let barra = document.getElementById("prenda")
let boton = document.getElementById("boton")
let lista = document.getElementById("lista")
let contenedor = document.getElementById("contenedor")
let botonTotal = document.getElementById("botonTotal")
let precioTotal = document.getElementById("precioTotal")
let subitemList = document.getElementById("subitemList")
let miCuenta = document.getElementById("miCuenta")

// Cuenta
let cuenta = JSON.parse(localStorage.getItem("Objeto"))

let miNombre = cuenta.nombre

miCuenta.innerHTML = `Bienvenido ${miNombre}`

// Agregar prenda
boton.addEventListener("click", () => {
    let prendaIngresada = barra.value.trim().toLowerCase();
    let buscar = prendasDisponibles.find(p => p.nombre === prendaIngresada);

    if (buscar) {
        Toastify({
            text: `Prenda "${prendaIngresada}" agregada correctamente`,
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
        productos.push(prendaIngresada);
        totalCompra += buscar.precio;
        mostrarTotal(); // Llamada para actualizar el total y verificar el botón
        mostrarCarrito(prendaIngresada);
        barra.value = "";
    } else {
        Toastify({
            text: `"${prendaIngresada}" no esta disponible`,
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #f95959 , #f95959)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
        barra.value = "";
    }
});

// Función para mostrar el carrito
function mostrarCarrito(prendaIngresada) {
    let carrito = document.createElement("li");
    carrito.textContent = prendaIngresada;

    // Agregar botón de eliminar en cada prenda del carrito
    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => {
        eliminarPrenda(carrito, prendaIngresada);
    });

    carrito.appendChild(botonEliminar);
    lista.appendChild(carrito);
}

// Función para eliminar prenda
function eliminarPrenda(carritoElemento, prendaIngresada) {
    lista.removeChild(carritoElemento);

    let prenda = prendasDisponibles.find(p => p.nombre === prendaIngresada);
    if (prenda) {
        totalCompra -= prenda.precio;
        mostrarTotal(); // Llamada para actualizar el total y verificar el botón
    }
}

// Función para mostrar el precio total automáticamente y gestionar el botón "Finalizar Compra"
function mostrarTotal() {
    // Limpiar el precio anterior
    precioTotal.innerHTML = "";
    
    if (totalCompra > 0) {
        // Crear y mostrar el precio total
        let suma = document.createElement("li");
        suma.textContent = "$" + totalCompra;
        precioTotal.appendChild(suma);

        // Verificar si el botón ya existe para no duplicarlo
        if (!document.getElementById("btnFinalizar")) {
            let comprar = document.createElement("button");
            comprar.id = "btnFinalizar";
            comprar.textContent = "Finalizar Compra";

            // Añadir el botón al contenedor principal
            contenedor.appendChild(comprar);

            // Evento de clic para finalizar compra
            comprar.addEventListener("click", () => {
                Swal.fire({
                    title: `Compra realizada por un total de $${totalCompra}`,
                    text: "Gracias por confiar en nosotros",
                    icon: "success"
                  });
                productos = [];
                totalCompra = 0;
                lista.innerHTML = "";
                mostrarTotal(); // Actualizar el total y eliminar el botón
            });
        }
    } else {
        // Eliminar el botón si el total es 0
        const botonFinalizar = document.getElementById("btnFinalizar");
        if (botonFinalizar) {
            contenedor.removeChild(botonFinalizar);
        }
    }
}

// Mostrar / Ocultar Prendas
subitemList.addEventListener('click', (event) => {
    //Objeto de evento
    if(event.target.className === 'item2'){
        if(event.target.children[0].style.display === "block"){
            event.target.children[0].style.display = "none";
        } else {
            event.target.children[0].style.display = "block";
        }
    }
});
