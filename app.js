// ---- LIBROS ----
let contadorLibros = 1;
const formLibro = document.getElementById("formLibro");
const listaLibros = document.getElementById("listaLibros");

formLibro.addEventListener("submit", function(e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const anio = document.getElementById("anio").value;
    const categoria = document.getElementById("categoria").value;

    const fila = document.createElement("tr");
    fila.innerHTML = `
    <td>${contadorLibros}</td>
    <td>${titulo}</td>
    <td>${autor}</td>
    <td>${anio}</td>
    <td>${categoria}</td>
    <td><button class="btn-delete">❌</button></td>
    `;

    listaLibros.appendChild(fila);
    contadorLibros++;
    formLibro.reset();
});

listaLibros.addEventListener("click", function(e) {
    if (e.target.classList.contains("btn-delete")) {
    e.target.closest("tr").remove();
    }
});

// ---- PRÉSTAMOS ----
let contadorPrestamos = 1;
let editandoPrestamo = null;
const formPrestamo = document.getElementById("formPrestamo");
const listaPrestamos = document.getElementById("listaPrestamos");

formPrestamo.addEventListener("submit", function(e) {
    e.preventDefault();

    const alumno = document.getElementById("alumno").value;
    const idLibro = document.getElementById("idLibro").value;
    const fecha = document.getElementById("fecha").value;

    if (editandoPrestamo) {
    // 🔄 Editar préstamo existente (incluye Libro ID)
    editandoPrestamo.cells[1].innerText = alumno;
    editandoPrestamo.cells[2].innerText = idLibro;
    editandoPrestamo.cells[3].innerText = fecha;
    editandoPrestamo = null;
    } else {
    // ➕ Nuevo préstamo
    const fila = document.createElement("tr");
    fila.innerHTML = `
    <td>${contadorPrestamos}</td>
    <td>${alumno}</td>
    <td>${idLibro}</td>
    <td>${fecha}</td>
    <td>Prestado</td>
    <td>
        <button class="btn-devolver">✔</button>
        <button class="btn-edit">✏</button>
        <button class="btn-delete">❌</button>
    </td>
    `;

    listaPrestamos.appendChild(fila);
    contadorPrestamos++;
    }

    formPrestamo.reset();
});

// 🎯 Acciones en préstamos
listaPrestamos.addEventListener("click", function(e) {
    const fila = e.target.closest("tr");

    if (e.target.classList.contains("btn-devolver")) {
    fila.cells[4].innerText = "Devuelto";
    e.target.remove();
    }

    if (e.target.classList.contains("btn-edit")) {
    // 🔄 Cargar datos de la fila al formulario (incluye Libro ID)
    document.getElementById("alumno").value = fila.cells[1].innerText;
    document.getElementById("idLibro").value = fila.cells[2].innerText;
    document.getElementById("fecha").value = fila.cells[3].innerText;
    editandoPrestamo = fila;
    }

    if (e.target.classList.contains("btn-delete")) {
    fila.remove();
    }
});