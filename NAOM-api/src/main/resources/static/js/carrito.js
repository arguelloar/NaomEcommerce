import { addProductCart } from "./items.js";
import { addOrden } from "./usuario.js";

const userArticles = document.getElementById("userArticles");
let totalText = document.getElementById("totalText");
let total = 0; 
let deleteButton = document.getElementsByClassName("delete");
let plusButton = document.getElementsByClassName("plus");
let minusButton = document.getElementsByClassName("minus");
let noItems = document.getElementById("noItems");
let finCompra = document.getElementById("finCompra");

if(localStorage.getItem("carrito") == undefined){
  noItems.style.display = "block";
}

const productosCarrito = Array.from(JSON.parse(localStorage.getItem("carrito")));
productosCarrito.forEach((producto) => {
  userArticles.innerHTML += addProductCart(producto);
  total += parseInt(producto.precio);
});

function findProductId(productos,id){
  return productos.filter(product => product.id == id)[0];
}

totalText.innerHTML = "$"+total+" MXN"


for (let i = 0; i < productosCarrito.length; i++) {
  let a = 1;
  plusButton[i].addEventListener("click", () => {
      let id = plusButton[i].id.split("-")[1];
      let count = document.getElementById("count-"+id);
      let quantity = document.getElementById("quantity-"+id);
      let totalPrice = document.getElementById("totalPrice-"+id);
      a++;
      let cantidad = a;
      a = a < 10 ? "0" + a : a;
      count.innerText = a;
      quantity.innerHTML = "Cantidad: "+cantidad;
      let producto = findProductId(productosCarrito,id);
      totalPrice.innerHTML = `$${producto.precio*cantidad}`
      total += parseInt(producto.precio*cantidad);
      totalText.innerHTML = "$"+total+" MXN"
      productosCarrito.push(producto);
      localStorage.setItem("carrito",JSON.stringify(productosCarrito));
  })

  minusButton[i].addEventListener("click", () => {
      let id = plusButton[i].id.split("-")[1];
      let count = document.getElementById("count-"+id);
      let quantity = document.getElementById("quantity-"+id);
      let totalPrice = document.getElementById("totalPrice-"+id);
      if (a > 1) {
        a--;
        let cantidad = a;
        a = a < 10 ? "0" + a : a;
        count.innerText = a;
        quantity.innerHTML = "Cantidad: "+cantidad;
        let producto = findProductId(productosCarrito,id);
        totalPrice.innerHTML = `$${producto.precio*cantidad}`
        total += parseInt(producto.precio*cantidad);
        totalText.innerHTML = "$"+total+" MXN"
      }  
  })
}

window.onbeforeunload = function(){
  localStorage.removeItem("carrito");
};

finCompra.addEventListener("click", () => {

  const date = new Date();
  console.log(date);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;

  let orden = {
  "cantidad":`${productosCarrito.length}`,
  "totalOrden":`${total}`,
  "estado": `PENDIENTE`,
  "fecha": `${currentDate}`,
  "productos": JSON.parse(JSON.stringify(productosCarrito))
  };

  let token = localStorage.getItem("token");
  addOrden(orden,token).then(response => response.json());
})











// <!-- <h1>Su carrito actualmente está vacío.</h1>
//         <a href="./maquillaje.html">Continúe explorando aquí</a> -->