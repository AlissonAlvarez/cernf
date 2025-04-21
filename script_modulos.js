const lista = document.querySelector(".lista");
const grid = document.querySelector(".grid");
const contenedor_modulos = document.querySelector(".contenedor_modulos");

lista.addEventListener("click", () => {
    contenedor_modulos.classList.add("lista");
})

grid.addEventListener("click", () => {
    contenedor_modulos.classList.remove("lista");
    // contenedor_modulos.classList.add("grid");
})

$(document).ready(function () {
    $("#input_buscar").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#contenedor_modulos a").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);

        });
    });
});