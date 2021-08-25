//CLASES DE CSS
let tabs = Array.from(document.querySelectorAll('.nav__item'));
let panels = Array.from(document.querySelectorAll('.panel'));
//LE DOY EVENTO CLICK A TODOS LOS CONTENEDORES DENTRO DE NAV
document.querySelector('#nav').addEventListener('click', e => {

    if (e.target.classList.contains('nav__item')) {
        let i = tabs.indexOf(e.target);
        tabs.map(tab => tab.classList.remove('activa'));
        tabs[i].classList.add('activa');
        panels.map(panel => panel.classList.remove('activa'));
        panels[i].classList.add('activa');
    }
})


//CRONOMETRO
//ARREGLO CON LAS CLASES

let clases = [
    ['github',
        'breve historia github',
        'registro github',
        'creacion de repositorio',
        'break',
        'creacion de readme en github',
        'activacion de github pages'
    ],
    ['sass',
        ' anecdota de niko',
        'descarga de node.js',
        'instalacion de paquetes npm',
        'inciacion de sass',
        'break',
        'creando carpetas scss'
    ]

];

let marcadoresGuardados = [];

let marcadores = [];

//DECLARANDO VARIABLES
let iniciarBtn = document.querySelector('.contenedor__btn--iniciar');
let reiniciarBtn = document.querySelector('.contenedor__btn--reiniciar');
let marcarBtn = document.querySelector('.contenedor__btn--marcar');
let temporizador = document.querySelector('.contenedor__temporizador');
let tiempoContenedor = document.querySelector('.contenedor__resultados');
let seleccionarClase = document.querySelector('select');
let errorSpan = document.querySelector('.contenedor__error');
let btnGuardar = document.querySelector('#btn-guardado');
//VARIABLES DE TIEMPO
let tiempo = 0;
let hora = 0;
let minutos = 0;
let mls = 0;
let segundos = 0;
let horaMax, minutosMax, segundosMax;
let intervalo = 0;
let verificador = false;
let posicion = 0;

//LLAMADO DE FUNCION 
empezarConteo()

//FUNCION INICADOR DE CONTADOR
function iniciarContador() {
    //VERIFICAR SI NO ESTA INICIADO PARA COMENZAR A CORRER EL TIEMPO
    if (verificador == false) {
        iniciarBtn.innerHTML = 'Parar';
        iniciarBtn.classList.remove("contenedor__btn--iniciar");
        iniciarBtn.classList.add("contenedor__btn--parar");
        intervalo = setInterval(function() {

            mls++;

            if (mls > 59) {
                segundos++;
                mls = 0;
            }
            if (segundos > 59) {
                minutos++;
                segundos = 0;
            }
            if (minutos > 59) {
                hora++;
                minutos = 0;
            }

            if (segundos < 10) { segundosMax = "0" + segundos; } else { segundosMax = segundos; }
            if (minutos < 10) { minutosMax = "0" + minutos; } else { minutosMax = minutos; }
            if (hora < 10) { horaMax = "0" + hora; } else { horaMax = hora; }


            temporizador.innerHTML = `${horaMax}:${minutosMax}:${segundosMax}`;
        }, 10);
        verificador = true;
    } else { // Y SI ESTA TRUE LO VUELVE FALSO Y FRENA EL INTERVALO DE TIEMPO
        verificador = false;
        iniciarBtn.innerHTML = 'Iniciar';
        iniciarBtn.classList.remove("contenedor__btn--parar");
        iniciarBtn.classList.add("contenedor__btn--iniciar");
        clearInterval(intervalo);
    }
}

//FUNCION CON LOS EVENTOS CLICK
function empezarConteo() {
    iniciarBtn.addEventListener('click', validar);
    reiniciarBtn.addEventListener('click', reiniciarContador);
    btnGuardar.addEventListener('click', guardarMarcador);

}

//FUNCION RESETEAR CONTADOR 
function reiniciarContador() {
    verificador = false;
    iniciarBtn.innerHTML = 'Iniciar';
    iniciarBtn.classList.remove("contenedor__btn--parar");
    iniciarBtn.classList.add("contenedor__btn--iniciar");
    tiempo = 0;
    temporizador.innerHTML = `00:00:00
    `;
    tiempoContenedor.innerHTML = ` <li> 00:00:00 - Inicio </li>`;
    clearInterval(intervalo);
}

//FUNCION VALIDA QUE SE SELECCIONE UNA CLASE PARA INICIAR
function validar() {
    if (seleccionarClase.value === "") {
        console.log('selecciona')
        errorSpan.innerHTML = `<p>Selecciona una clase por favor.</p>`
    } else {
        errorSpan.innerHTML = "";

        iniciarContador();
        marcarBtn.addEventListener('click', grabarMarcador);
    }
}
//FUNCION GRABAR MARCADOR

function grabarMarcador() {
    let eleccion = seleccionarClase.value;

    posicion++;
    tiempoContenedor.innerHTML +=
        `<p>${horaMax}:${minutosMax}:${segundosMax} - ${clases[eleccion][posicion]}</p>`;
}

//FUNCION GUARDAR MARCADOR POR LOCALSTORAGE

function guardarMarcador() {

    let eleccion = seleccionarClase.value;
    let date = new Date()
    let dia = date.getDate()
    let mes = date.getMonth() + 1
    let anio = date.getFullYear()

    let fecha = `${dia}-${mes}-${anio} `;

    marcadores.push(`${fecha}`, `${clases[eleccion][0]}`, `${tiempoContenedor}`);

    localStorage.setItem('datosGuardados', JSON.stringify(marcadores));
    console.info(marcadores + 'se guardo');


}


//SECCION TRES DEL MARCADOR

let contenedorGuardado = document.querySelector('.contenedor__guardado');

let marcadorLocal = JSON.parse(localStorage.getItem('datosGuardados'));

contenedorGuardado.innerHTML += `<div class="contenedor__marcadoresGuardados">
<button class="contenedor__btn-borrar" id="btn-borrar">X</button>
<p>Fecha: ${marcadorLocal[0]}</p>
<p>Clase: ${marcadorLocal[1]}</p>
<p>Marcadores:</p>
${marcadorLocal[2]}
</div>
`;

let contenedorHijo = document.querySelector('.contenedor__marcadoresGuardados')
let btnBorrar = document.querySelector('#btn-borrar');
btnBorrar.addEventListener('click', borrar)

function borrar() {
    contenedorGuardado.removeChild(contenedorHijo);

}
console.log(`${marcadorLocal[0]} -  ${marcadorLocal[1]} - ${marcadorLocal[2]} `)