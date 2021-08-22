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


//DECLARANDO VARIABLES
let iniciarBtn = document.querySelector('.contenedor__btn--iniciar');
let reiniciarBtn = document.querySelector('.contenedor__btn--reiniciar');
let marcarBtn = document.querySelector('.contenedor__btn--marcar');
let temporizador = document.querySelector('.contenedor__temporizador');
let tiempoContenedor = document.querySelector('.contenedor__resultado');
let seleccionarClase = document.querySelector('select');
//VARIABLES DE TIEMPO
let tiempo = 0;
let intervalo = 0;
let verificador = false;

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
            tiempo += 0.01;
            temporizador.innerHTML = tiempo.toFixed(2);
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
    iniciarBtn.addEventListener('click', iniciarContador);
    reiniciarBtn.addEventListener('click', reiniciarContador);
    marcarBtn.addEventListener('click', grabarMarcador);
}

//FUNCION RESETEAR CONTADOR 
function reiniciarContador() {
    verificador = false;
    iniciarBtn.innerHTML = 'Iniciar';
    iniciarBtn.classList.remove("contenedor__btn--parar");
    iniciarBtn.classList.add("contenedor__btn--iniciar");
    tiempo = 0;
    temporizador.innerHTML = `${tiempo}.00`;
    clearInterval(intervalo);
}

//FUNCION GUARDAR MARCADOR
function grabarMarcador() {
    let eleccion = seleccionarClase.value;
    console.log(clases[eleccion][eleccion]);

}