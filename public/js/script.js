const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const listaproceso = document.querySelector('#listaproceso');
const listarealizado = document.querySelector('#listarealizado');
const input = document.querySelector('input');
const botonEnter = document.querySelector('#botonEnter');
const check = "fa-check-circle";
const unchecked = "fa-circle";
const realizadoClass = "realizado";
let id = 0;
let LIST = [];
// Cargar las tareas cuando la página se carga
window.addEventListener("load", actualizarTareasPendiente);
window.addEventListener("load", actualizarTareasProceso);
window.addEventListener("load", actualizarTareasRealizadas);

/*creacion de la fecha */
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-ES', {weekday: 'long', month: 'short', day: 'numeric'});

/*funcion para agregar la tarea */
function agregarTarea(tarea) {
    // Enviar la tarea al servidor
    fetch('/agregarTarea', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tarea})
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        actualizarTareasPendiente();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function actualizarTareasPendiente() 
{
    lista.innerHTML = '';
    fetch('/obtenerTareas')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const li = document.createElement('li');
            li.id = "elemento";
            li.innerHTML = `
                <i class="fa-regular fa-check-circle" data="realizado" id="${item.id}"></i>
                <p class="text" contenteditable="true">${item.nombre}</p>
                <i class="fa-solid fa-trash" data="Eliminado" id="${item.id}"></i>
            `;
            lista.appendChild(li);
        });


    })
    .catch(error => {
        console.error('Error cargando las tareas:', error);
    });

}
// en proceso
function actualizarTareasProceso() 
{
    listaproceso.innerHTML = '';
    fetch('/obtenerTareasProceso')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const li = document.createElement('li');
            li.id = "elemento";
            li.innerHTML = `
                <i class="fa-regular fa-check-circle" data="realizado" id="${item.id}"></i>
                <p class="text" contenteditable="true">${item.nombre}</p>
                <i class="fa-solid fa-trash" data="Eliminado" id="${item.id}"></i>
            `;
            listaproceso.appendChild(li);
        });


    })
    .catch(error => {
        console.error('Error cargando las tareas:', error);
    });

}

// actualizar tareas realizadas 
function actualizarTareasRealizadas(){
    listarealizado.innerHTML = '';
    fetch('/obtenerTareasRealizadas')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const li = document.createElement('li');
            li.id = "elemento";
            li.innerHTML = `
                <p class="text" contenteditable="true">${item.nombre}</p>
                <i class="fa-solid fa-trash" data="Eliminado" id="${item.id}"></i>
            `;
            listarealizado.appendChild(li);

        });


    })
    .catch(error => {
        console.error('Error cargando las tareas:', error);
    });

}



function eliminarTarea(item) {
    const id = item.id;
    fetch('/eliminarTarea', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        actualizarTareasPendiente();
        actualizarTareasProceso();
        actualizarTareasRealizadas();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
botonEnter.addEventListener("click", () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea);
        input.value = "";
    }
});
function actualizarEstadoProceso(item){
    const id = item.id;
    fetch('/actualizarEstadoProceso', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        actualizarTareasPendiente();
        actualizarTareasProceso();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function actualizarEstadoRealizado(item){
    const id = item.id;
    fetch('/actualizarEstadoRealizado', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        actualizarTareasProceso();
        actualizarTareasRealizadas();
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function eliminarTareaRealizada(item) {
    const id = item.id;
    fetch('/eliminarTareaRealizada', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        actualizarTareasPendiente();
        obtenerTareasRealizadas();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
// Event listener  le agrega un evento al icono
lista.addEventListener("click", (event) => {
    if (event.target.classList.contains('fa-trash')) {
        eliminarTarea(event.target);
    }
});

// Event listener  le agrega un evento al icono
lista.addEventListener("click", (event) => {
    if (event.target.classList.contains('fa-trash')) {
        eliminarTarea(event.target);
    }
});


lista.addEventListener("click", (event) => {
    if (event.target.classList.contains('fa-check-circle')) {
        actualizarEstadoProceso(event.target);
    }
});
listaproceso.addEventListener("click", (event) => {
    if (event.target.classList.contains('fa-check-circle')) {
        actualizarEstadoRealizado(event.target);
    }
});

listaproceso.addEventListener("click", (event) => {
    if (event.target.classList.contains('fa-trash')) {
        eliminarTarea(event.target);
    }
});

listarealizado.addEventListener("click", (event) => {
    if (event.target.classList.contains('fa-trash')) {
        eliminarTarea(event.target);
    }
});





























/* function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(unchecked);
    element.parentNode.querySelector(".text").classList.toggle(realizadoClass);
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
    localStorage.setItem("TODO", JSON.stringify(LIST));
} */
/* function eliminarTarea(element) {
    const parent = element.parentNode;
    parent.classList.add('removed');
    setTimeout(() => parent.remove(), 300);
    LIST[element.id].eliminado = true;
    localStorage.setItem("TODO", JSON.stringify(LIST));
} */



/* lista.addEventListener("click", function(event) {
    const element = event.target;
    const elementData = element.attributes.data.value;
    if (elementData == "realizado") {
        tareaRealizada(element);
    } else if (elementData == "Eliminado") {
        element.parentNode.parentNode.removeChild(element.parentNode);
        LIST[element.id].eliminado = true;
        localStorage.setItem("TODO", JSON.stringify(LIST));
    }
}); */

// Editar tarea
/* lista.addEventListener("input", function(event) {
    const element = event.target;
    if (element.classList.contains("text")) {
        const id = element.previousElementSibling.id;
        LIST[id].nombre = element.innerText;
        localStorage.setItem("TODO", JSON.stringify(LIST));
    }
}); */
