import { addItems, getProducts } from "./items.js";

const cardWrapper = document.getElementById("card-wrapper");
let maxVal = document.getElementById("maxVal");
let minVal = document.getElementById("minVal");
const filtrarBtn = document.getElementById("filtrarBtn");
const productos = await getProducts(2).then((response) => response.json());

let carrito = JSON.parse(localStorage.getItem("carrito"));
if(carrito == null){
  carrito = [];
}


try{
    productos.forEach((product) => maquillajeItems(product));
    const addCartProd = document.getElementsByClassName("addCartProd");
    buttonEvents(addCartProd);
}catch{
  console.log("Cant load products from Maquillaje");
}

function maquillajeItems(product) {
  cardWrapper.innerHTML += addItems(product);
}

filtrarBtn.addEventListener("click", () => {
  if(minVal.value === ""){
    minVal.value = 0;
  }

  if(maxVal.value === ""){
    maxVal.value = 1500;
  }

  cardWrapper.innerHTML = "";
  const filteredProducts = productos.filter(producto => producto.precio >= minVal.value && producto.precio <= maxVal.value);
  filteredProducts.forEach(product => maquillajeItems(product));
  const addCartProd = document.getElementsByClassName("addCartProd");
  buttonEvents(addCartProd);
})

function buttonEvents(products){
  Array.from(products).forEach(button => {
    button.addEventListener("click", () => {
      const product = JSON.parse(button.dataset.product);
      carrito.push(product);
      localStorage.setItem("carrito",JSON.stringify(carrito));
    })
  })
}