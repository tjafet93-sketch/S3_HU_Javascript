// ==========================================
// TASK 2: Selección de elementos del DOM
// ==========================================
const inputNota = document.getElementById("inputNota");
const btnAgregar = document.querySelector("#btnAgregar"); // Usando querySelector para variar método
const listaNotas = document.getElementById("listaNotas");

// Comprobamos en consola que el script se cargó y ve los elementos
console.log("--- [TASK 2: Verificación de Nodos] ---");
console.log("Input:", inputNota);
console.log("Botón:", btnAgregar);
console.log("Lista UL:", listaNotas);

// ==========================================
// TASK 5: Estado de la aplicación (Arreglo en memoria)
// ==========================================
let notas = [];

// Función para recuperar lo que guardamos previamente en el navegador
function cargarNotasDesdeLocalStorage() {
    const notasGuardadas = localStorage.getItem("notas");
    
    if (notasGuardadas) {
        // Transformamos el texto JSON plano de vuelta a un array de JS
        notas = JSON.parse(notasGuardadas);
        console.log(`Se cargaron con éxito ${notas.length} notas desde Local Storage.`);
        
        // Las recorremos y las pintamos en el HTML una a una
        notas.forEach(nota => {
            renderizarNotaEnDOM(nota);
        });
    } else {
        console.log("No se encontraron datos guardados en Local Storage. Empezando vacío.");
    }
}

// ==========================================
// TASK 3 & 4: Manipulación directa del DOM
// ==========================================

// Esta función se encarga de crear las etiquetas HTML "al vuelo"
function renderizarNotaEnDOM(textoNota) {
    // 1. Creamos la etiqueta <li>
    const nuevoLi = document.createElement("li");
    
    // 2. Le inyectamos el texto de la nota usando textContent de forma segura
    nuevoLi.textContent = textoNota;

    // 3. Creamos su propio botón de eliminación
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "btn-eliminar"; // Le asignamos la clase CSS

    // TASK 4: Escuchamos el evento de eliminación para ESTA nota
    btnEliminar.addEventListener("click", () => {
        // Quitamos el elemento <li> de su padre <ul> usando removeChild
        listaNotas.removeChild(nuevoLi);
        console.log(`Se eliminó del DOM: "${textoNota}"`);

        // Filtramos el arreglo para sacar la nota que el usuario borró
        notas = notas.filter(n => n !== textoNota);
        
        // Guardamos la nueva lista en el Local Storage
        localStorage.setItem("notas", JSON.stringify(notas));
        console.log("Local Storage actualizado con éxito.");
    });

    // 4. Armamos la estructura: Metemos el botón dentro del li, y el li dentro de la ul
    nuevoLi.appendChild(btnEliminar);
    listaNotas.appendChild(nuevoLi);
}

// Evento Principal: Escuchar cuando el usuario hace click en "Agregar"
btnAgregar.addEventListener("click", () => {
    const textoNota = inputNota.value.trim(); // .trim() remueve espacios fantasmas al inicio/final

    // Validamos que el usuario no envíe un campo vacío
    if (textoNota === "") {
        alert("¡Error! No puedes agregar una nota vacía.");
        return; // Detiene la ejecución por completo
    }

    // Agregamos el texto al array en memoria
    notas.push(textoNota);

    // Guardamos el array actualizado en Local Storage (JSON.stringify lo convierte a texto plano)
    localStorage.setItem("notas", JSON.stringify(notas));
    console.log(`Guardada en Local Storage la nota: "${textoNota}"`);

    // Invocamos la función para pintarla de inmediato en la pantalla
    renderizarNotaEnDOM(textoNota);

    // Limpieza de interfaz para comodidad del usuario
    inputNota.value = "";
    inputNota.focus(); // El cursor se queda parpadeando en el input listo para otra nota
});

// ==========================================
// INICIALIZACIÓN
// ==========================================
// Arrancamos buscando datos guardados apenas se abre o refresca la página
cargarNotasDesdeLocalStorage();