let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 1000;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML= texto;
    return;
}

function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número, en ${intentos} ${intentos==1 ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        //El usuario no acertó
        if(numeroDeUsuario>numeroSecreto){
            asignarTextoElemento('p',`El número secreto es menor, ${intentos} ${intentos==1 ? 'intento' : 'intentos'}`);
        } else{
            asignarTextoElemento('p',`El número secreto es mayor, ${intentos} ${intentos==1 ? 'intento' : 'intentos'}`);
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    //querySelector tambien puede usarse por ID (como si fuera getElementById) pero debe usarse #NombreID
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    if (listaNumerosSorteados.length==numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles')
    } else {
        //si el numero generado esta en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego de número secreto');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos=1;
}
function reiniciarJuego() {
    limpiarCaja();
    //indicar mensaje de inicio
    condicionesIniciales();
    //desabilitar el botón nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();
