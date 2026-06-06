"use strict";

/**
 * ESTADO LOCAL
 */
let tarjetas = JSON.parse(localStorage.getItem("tarjetas")) || [];

/**
 * ELEMENTOS DOM
 */
const inputNombre = document.getElementById("inputNombre");
const inputDescripcion = document.getElementById("inputDescripcion");
const inputImagen = document.getElementById("inputImagen");
const btnAgregar = document.getElementById("btnAgregar");
const btnLimpiar = document.getElementById("btnLimpiar");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");

/**
 * GUARDAR EN LOCALSTORAGE
 */
function guardar() {
    localStorage.setItem("tarjetas", JSON.stringify(tarjetas));
}

/**
 * RENDER TARJETAS
 */
function renderTarjetas() {
    contenedorTarjetas.innerHTML = "";

    tarjetas.forEach((tarjeta, index) => {
        const article = document.createElement("article");
        article.className = "card";

        const img = document.createElement("img");
        img.setAttribute("src", tarjeta.imagen);
        img.setAttribute("alt", tarjeta.nombre);

        const content = document.createElement("div");
        content.className = "content";

        const h2 = document.createElement("h2");
        h2.textContent = "Nombre: " + tarjeta.nombre;

        const p = document.createElement("p");
        p.textContent = "Descripcion: " + tarjeta.descripcion;

        const btn = document.createElement("button");
        btn.textContent = "Eliminar";
        btn.className = "eliminar";
        btn.setAttribute("data-index", index);

        content.appendChild(h2);
        content.appendChild(p);
        content.appendChild(btn);

        article.appendChild(img);
        article.appendChild(content);

        contenedorTarjetas.appendChild(article);
    });
}

/**
 * AGREGAR TARJETA
 */
btnAgregar.addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    const descripcion = inputDescripcion.value.trim();
    const imagen = inputImagen.value.trim();

    if (!nombre || !descripcion || !imagen) return;

    tarjetas.push({ nombre, descripcion, imagen });

    guardar();
    renderTarjetas();

    inputNombre.value = "";
    inputDescripcion.value = "";
    inputImagen.value = "";
});

/**
 * ELIMINAR TARJETA
 */
contenedorTarjetas.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
        const index = e.target.dataset.index;
        tarjetas.splice(index, 1);
        guardar();
        renderTarjetas();
    }
});

/**
 * LIMPIAR TODO
 */
btnLimpiar.addEventListener("click", () => {
    tarjetas = [];
    guardar();
    renderTarjetas();
});

renderTarjetas();