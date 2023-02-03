import { getUser } from "./auth.js";

let tableOrders = document.getElementById("tableOrders");
let userInfo = document.getElementById("userInfo");
let userAddress = document.getElementById("userAddress");
let putUsuario = document.getElementById("putUsuario");
let putNombre = document.getElementById("putNombre");
let putTelefono = document.getElementById("putTelefono");
try {
        const usuario = await getUser(localStorage.getItem("token")).then(response => response.json()); 
        usuario.ordenes.forEach(orden => { tableOrders.innerHTML += addUserOrders(orden, usuario.direccion) })

        userInfo.innerHTML =
                `Nombre: ${usuario.nombre} ${usuario.apellido}<br><br>
        Correo: ${usuario.correo}<br><br>
        Telefono: ${usuario.telefono}<br>`;

        userAddress.innerHTML = `${usuario.direccion}`;
} catch {
        console.log("No estas logeado");
}




function addUserOrders(orden, direccion) {
        return `
      <tr>
      <td>${orden.id}</td>
      <td>${orden.fecha}</td>
      <td>${direccion}</td>
      <td>${orden.totalOrden}</td>
      <td>${orden.estado}</td>
      </tr>
      `;
}


export async function addOrden(orden, token) {
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