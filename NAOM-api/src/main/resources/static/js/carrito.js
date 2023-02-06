import { addProductCart } from "./items.js";


let totalText = document.getElementById("totalText");
let noItems = document.getElementById("noItems");
let subtotal = document.getElementById("subtotal");
let finCompra = document.getElementById("finCompra");
let totalOrden = 0;

let carritoProductos = JSON.parse(localStorage.getItem("carrito"));
const userArticles = document.getElementById("userArticles");
let productos;
try{
        productos = productsToMap(carritoProductos);
        productos.forEach((cantidad, id) => {

                //Agregando Articulos al DOM
                let product = findProduct(id);
                userArticles.insertAdjacentHTML('beforeend', addProductCart(product, cantidad));
                let a = cantidad;
                let count = document.getElementById(`count-${id}`);
                let quantity = document.getElementById(`quantity-${id}`);
                let totalPrice = document.getElementById(`totalPrice-${id}`);
                totalOrden += product.precio * productos.get(id);
                totalText.innerHTML = `$${totalOrden}`
                totalPrice.innerHTML = `$${product.precio * productos.get(id)}`;
        
        
                //Anadiendo evento del boton de borrar
                let deleteButton = document.getElementById(`delete-${id}`);
                let item = document.getElementById(`product-${id}`);
                deleteButton.addEventListener("click", () => {
                        carritoProductos = deleteProduct(id);
                        totalOrden -= product.precio * productos.get(id);
                        totalText.innerHTML = `$${totalOrden}`
                        productos.delete(id);
                        localStorage.setItem("carrito", JSON.stringify(carritoProductos));
                        if (productos.size == 0) {
                                localStorage.removeItem("carrito");
                                noItems.style.display = "block";
                                subtotal.style.display = "none";
                        }
                        item.remove();
                })
        
        
                //Eventos para los contadores de cantidad
                //Contador de suma
                let plusButton = document.getElementById(`plus-${id}`);
                plusButton.addEventListener("click", () => {
                        if (a < 10) {
                                a++;
                                count.innerHTML = a;
                                quantity.innerHTML = `Cantidad: ${a}`;
                                totalPrice.innerHTML = `$${a * product.precio}`;
                                productos.set(id, productos.get(id) + 1);
                                totalOrden += product.precio;
                                carritoProductos.push(findProduct(id));
                                console.log(carritoProductos);
                                totalText.innerHTML = `$${totalOrden}`;
                                localStorage.setItem("carrito", JSON.stringify(carritoProductos));
                        }
                })
        
                //Contador de resta
                let minusButton = document.getElementById(`minus-${id}`);
                minusButton.addEventListener("click", () => {
                        if (a > 1) {
                                a--;
                                count.innerHTML = a;
                                quantity.innerHTML = `Cantidad: ${a}`;
                                totalPrice.innerHTML = `$${a * product.precio}`;
                                productos.set(id, productos.get(id) - 1);
                                totalOrden -= product.precio;
                                totalText.innerHTML = `$${totalOrden}`;
                                deleteOneProduct(id);
                                console.log(carritoProductos);
                                localStorage.setItem("carrito", JSON.stringify(carritoProductos));
                        }
                })
        })
}catch{
        //Si no puede obtener los objetos del carrito, mostrara el mensaje de carrito vacio.
        noItems.style.display = "block";
        subtotal.style.display = "none";    
}








//Finalizamos la compra
finCompra.addEventListener("click", () => {

        let productos = JSON.parse(localStorage.getItem("carrito"));

        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${year}-${month}-${day}`;

        let orden = {
                "cantidad": `${productos.length}`,
                "totalOrden": `${totalOrden}`,
                "estado": `PENDIENTE`,
                "fecha": `${currentDate}`,
                "productos": JSON.parse(JSON.stringify(productos))
        };

        let token = localStorage.getItem("token");
        if (token != null) {
                addOrden(orden, token).then(response => response.json());
                localStorage.removeItem("carrito");
                window.location = "../HTML/usuario.html";
        } else {
                window.location = "../HTML/login.html";
        }

})





//Funcion de fetch para anadir ordenes.
async function addOrden(orden, token) {
        const response = await fetch("https://naomecommerce-production.up.railway.app/api/usuario/orden", {
                method: "POST",
                body: JSON.stringify(orden),
                headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer: ${token.replaceAll('"', "")}`,
                },
        });
        return response;
}


//Mappeo de productos a un map para saber los duplicados.
function productsToMap(products) {
        let map1 = new Map();
        for (let i = 0; i < products.length; i++) {
                let id = products[i].id;
                if (map1.get(id)) {
                        map1.set(id, (map1.get(id) + 1))
                } else {
                        map1.set(id, 1);
                }
        }
        return map1;
}

//Funcion para encontrar un producto en la lista segun su id.
function findProduct(id) {
        return carritoProductos.find(producto => producto.id == id);
}


//Funcion para borrar un producto independientemente de la cantidad
function deleteProduct(id) {
        return carritoProductos.filter(producto => producto.id != id);
}




//Borra un producto segun el id
function deleteOneProduct(id){
        carritoProductos.splice(findIndex(id), 1);
}


//Encuentra la posicion del producto segun su id.
function findIndex(id){
        for (let i = 0; i < carritoProductos.length; i++) {
                if(carritoProductos[i].id == id){
                        return i;
                }
        }
        return -1;
}













// <!-- <h1>Su carrito actualmente está vacío.</h1>
//         <a href="./maquillaje.html">Continúe explorando aquí</a> -->