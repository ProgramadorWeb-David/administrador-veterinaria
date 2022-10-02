
// campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
// UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

// editar formulario
let editando;


// clases
class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(aux => aux.id !== id);
    }

    editarCita(citaEditada) {
        this.citas = this.citas.map(aux => aux.id === citaEditada.id ? citaEditada : aux);
    }
}

class UI {
    imprimirAlerta(mje, tipo) {
        // crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agregar clase si es de tipo "error"
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // mensaje de error
        divMensaje.textContent =  mje;

        // agregar al html (dom)
        const aux = document.querySelector('.agregar-cita');

        document.querySelector('#contenido').insertBefore(divMensaje, aux);

        // lueg de 3 segundos quitar la alerta
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    imprimirCitas( {citas} ) {

        this.limpiarHTML();
        
        citas.forEach(aux => {
            // extraer la informacion del objeto de citas.
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = aux;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;


            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;


            // boton para eliminar esta cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>`;

            // para eliminar una cita
            btnEliminar.onclick = () => eliminarCita(id);



            // añade un boton para editar una cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>`;

            // para editar la cita
            btnEditar.onclick = () => cargarEdicion(aux);



            // agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            // agregar la cita al HTML
            contenedorCitas.appendChild(divCita);
        });
    }

    // limpiar el HTML
    limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}


// instanciar clases
const ui = new UI();
const administrarCitas = new Citas();



// registra eventos
eventListeners();

function eventListeners() {
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

// objeto de la informacion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// agrega datos al objeto de la cita
function datosCita(e) {
    citaObj[ e.target.name ] = e.target.value;
}


// valida y agrega una nueva cita a la clase Citas
function nuevaCita(e) {
    e.preventDefault();

    // extraer la informacion del objeto de citas.
    const { mascota,propietarios, telefono, fecha, hora, sintomas } = citaObj;

    // validando
    if (mascota === '' || propietarios === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

    if (editando) {
        ui.imprimirAlerta('Editado correctamente!');

        // pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj});
        
        // cambiar el texto del boton
        formulario.querySelector('button[type="submit"]').textContent = "Crear Cita";

        // quitar modo de edicion
        editando = false;
    } else {
        // generar un id único para poder editar o eliminar
        // cada una de esas tarjetas (objetos)
        citaObj.id = Date.now();

        // creando una nueva cita
        administrarCitas.agregarCita({...citaObj});

        // mensaje de agregado correctamente
        ui.imprimirAlerta('Se agrego correctamente!');
    }

    // reiniciar el objeto
    reiniciarObjeto();

    // una vez que se paso la nueva cita reiniciar el formulario
    formulario.reset();


    // por ultimo mostrar el html en el dom
    ui.imprimirCitas(administrarCitas);
}



function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}



function eliminarCita(id) {
    // eliminar la cita
    administrarCitas.eliminarCita(id);

    // mostrar el mensaje
    ui.imprimirAlerta('Eliminado con exito!');

    // refrescar las citas
    ui.imprimirCitas(administrarCitas);
}


// carga los datos y el modo de edicion
function cargarEdicion( aux ) {
    // extraer la informacion del objeto de citas.
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = aux;

    // llenar los input
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;


    // cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = "Guardar Cambios";

    // cuando editamos cambia a true para luego tomarlo con
    // un if y hacer algo...
    editando = true;
}