const boton_abrir_menu = document.querySelector(".boton_abrir_menu");
const menu_izquierdo = document.querySelector(".menu_aplicacion");
const opcion_menu_izquierdo = document.querySelector(".contenedor_menu_aplicacion");
const boton_cerrar_menu = document.querySelector(".boton_cerrar_menu");

boton_abrir_menu.addEventListener("click", () => {
  abrir_menu();
})

boton_cerrar_menu.addEventListener("click", () => {
  cerrar_menu();
})

opcion_menu_izquierdo.addEventListener("click", (e) => {
  cerrar_menu();
})

opcion_menu_herramientas.addEventListener("click", (herramientas) => {
  abrir_menu_herramientas();
})

function abrir_menu() {
  opcion_menu_izquierdo.style.transition = "all 0.5s ease";
  opcion_menu_izquierdo.classList.add("open");
  menu_izquierdo.style.transition = "all 0.3s ease 0.5s";
  menu_izquierdo.classList.add("open");
}

function cerrar_menu() {
  menu_izquierdo.style.transition = "all 0.3s ease";
  menu_izquierdo.classList.remove("open");
  opcion_menu_izquierdo.style.transition = "all 0.5s ease 0.3s";
  opcion_menu_izquierdo.classList.remove("open");
}


