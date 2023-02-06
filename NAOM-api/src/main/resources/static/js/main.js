import { addItem, getAllProducts } from "./items.js";

const itemsContainer = document.getElementById("list-items");
const productos = await getAllProducts().then((response) => response.json());
productos.forEach((product) => novedadesItems(product));

try{
  productos.forEach((product) => novedadesItems(product));
}catch{
console.log("Cant load products from Maquillaje");
}

const addCartProd = document.getElementsByClassName("addCartProd");
let carrito = JSON.parse(localStorage.getItem("carrito"));

if(carrito == null){
  carrito = [];
}


function novedadesItems(product) {
  itemsContainer.innerHTML += addItem(product);
}

// Carousel
let swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    600: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    680: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 40,
    },
  },
});


Array.from(addCartProd).forEach(button => {
  button.addEventListener("click", () => {
    const product = JSON.parse(button.dataset.product);
    carrito.push(product);
    localStorage.setItem("carrito",JSON.stringify(carrito));
  })
})
