const boton_abrir_menu = document.querySelector(".boton_abrir_menu");
const menu_izquierdo = document.querySelector(".menu_aplicacion");
const opcion_menu_izquierdo = document.querySelector(".contenedor_menu_aplicacion");
const boton_cerrar_menu = document.querySelector(".boton_cerrar_menu");

// Elementos para cambiar foto de perfil
const foto_perfil = document.getElementById("foto_perfil");
const foto_perfil_wrapper = document.querySelector(".foto_perfil_wrapper");
const input_foto_perfil = document.getElementById("input_foto_perfil");

boton_abrir_menu.addEventListener("click", () => {
  abrir_menu();
})

boton_cerrar_menu.addEventListener("click", () => {
  cerrar_menu();
})

opcion_menu_izquierdo.addEventListener("click", (e) => {
  // Evitar que se cierre el menú al hacer clic en la foto de perfil
  if (!e.target.closest('.foto_perfil_wrapper') && !e.target.closest('.menu_aplicacion')) {
    cerrar_menu();
  }
})

// Agregar event listener para el contenedor de la foto de perfil
foto_perfil_wrapper.addEventListener("click", () => {
  input_foto_perfil.click();
});

// Agregar event listener para el input de tipo file
input_foto_perfil.addEventListener("change", (e) => {
  cambiarFotoPerfil(e);
});

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

// Función para cambiar la foto de perfil
function cambiarFotoPerfil(e) {
  const archivo = e.target.files[0];
  
  // Verificar si se seleccionó un archivo
  if (archivo) {
    // Verificar que sea una imagen
    if (archivo.type.startsWith('image/')) {
      const lector = new FileReader();
      
      lector.onload = function(evento) {
        // Actualizar la imagen con la nueva foto seleccionada
        foto_perfil.src = evento.target.result;
        
        // Opcional: Guardar la imagen en localStorage para persistencia
        localStorage.setItem('foto_perfil', evento.target.result);
      }
      
      // Leer el archivo como URL de datos
      lector.readAsDataURL(archivo);
    } else {
      alert("Por favor, selecciona un archivo de imagen válido.");
    }
  }
}

// Cargar la foto de perfil guardada al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
  const fotoPerfil = localStorage.getItem('foto_perfil');
  if (fotoPerfil) {
    foto_perfil.src = fotoPerfil;
  }
  
  // Corregir error en script original
  // Verificar si el elemento opcion_menu_herramientas existe antes de agregar el event listener
  const opcion_menu_herramientas = document.querySelector(".submenu_herramientas");
  if (opcion_menu_herramientas) {
    opcion_menu_herramientas.addEventListener("click", (e) => {
      // Evitar propagación para que no se cierre el menú al hacer clic en herramientas
      e.stopPropagation();
    });
  }
});