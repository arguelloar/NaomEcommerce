import { getUser } from "./auth.js";

let tableOrders = document.getElementById("tableOrders");
let userInfo = document.getElementById("userInfo");
let userAddress = document.getElementById("userAddress");
let putUsuario = document.getElementById("putUsuario");
let putNombre = document.getElementById("putNombre");
let putTelefono = document.getElementById("putTelefono");
let token = localStorage.getItem("token");
console.log(token);
let buttonCancelar = document.getElementsByClassName("cancel");

//Bloque de try catch para obtener el token y obtener la informacion del usuario
try {
        const usuario = await getUser(token).then(response => response.json()); 
        usuario.ordenes.forEach(orden => { tableOrders.insertAdjacentHTML("beforeend",addUserOrders(orden, usuario.direccion)) })

        userInfo.innerHTML =
                `Nombre: ${usuario.nombre} ${usuario.apellido}<br><br>
        Correo: ${usuario.correo}<br><br>
        Telefono: ${usuario.telefono}<br>`;

        userAddress.innerHTML = `${usuario.direccion}`;
} catch {
        localStorage.removeItem("carrito");
        window.location = "/"
}

Array.from(buttonCancelar).forEach(button => button.addEventListener("click", () => {
        let id = button.id;
        editOrden("CANCELADO",token,id).then(res => {
                if(res.ok){
                        location.reload();
                }
        })
}))




//Funcion de fetch para anadir ordenes.
async function editOrden(estado, token,id) {
        const response = await fetch(`https://naomecommerce-production.up.railway.app/api/orden/${id}?estado=${estado}`, {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer: ${token.replaceAll('"', "")}`,
                },
        });
        return response;
}
//Funcion para agregar en la tabla las ordenes
function addUserOrders(orden, direccion) {
        return `
      <tr>
      <td>${orden.id}</td>
      <td>${orden.fecha}</td>
      <td>${direccion}</td>
      <td>${orden.totalOrden}</td>
      <td>${orden.estado}</td>
      <td><button class="cancel" id="${orden.id}">Cancelar</button></td>
      </tr>
      `;
}