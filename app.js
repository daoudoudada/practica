// Genera un número aleatorio de 5 dígitos al cargar la página
const numeroAleatorio = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
const numeroAleatorioSeparado = numeroAleatorio.toString().split('');
console.log(numeroAleatorio);  //para ver el numero en la consola

const pistasDiv = document.getElementById('pistas');
const mensaje = document.getElementById('mensaje');

let intentos = 1;
const maxIntentos = 5;

function verificar() {
    const elementoNum = document.getElementById('input');
    const numeroAdivi = elementoNum.value;

    if (numeroAdivi.length !== 5 || isNaN(numeroAdivi)) {
        mostrarMensaje('Por favor, ingresa un número de 5 dígitos válido.', 'mensaje-rojo');
        return;
    }

    const numeroAdiviSeparado = numeroAdivi.split('');
    generarCeldas(numeroAdiviSeparado);
    verificarResultado(numeroAdiviSeparado);
}

function generarCeldas(vectorUsuario) {
    let resultadoHTML = '<div class="fila">';
    for (let i = 0; i < 5; i++) {
        resultadoHTML += `<div class="caja" id="caja-${intentos}-${i}">${vectorUsuario[i]}</div>`;
    }
    resultadoHTML += '</div>';
    pistasDiv.innerHTML += resultadoHTML;
}

function verificarResultado(vectorUsuario) {
    let aciertos = 0;

    for (let i = 0; i < 5; i++) {
        const celda = document.getElementById(`caja-${intentos}-${i}`);
        if (numeroAleatorioSeparado[i] === vectorUsuario[i]) {
            celda.classList.add('verde');
            aciertos++;
        } else if (numeroAleatorioSeparado.includes(vectorUsuario[i])) {
            celda.classList.add('amarillo');
        } else {
            celda.classList.add('gris');
        }
    }

    intentos++;
    if (aciertos === 5) {
        ganarJuego();
        intentos=6
    } else if (intentos > maxIntentos) {
        perderJuego();
    } else {
        actualizarMensajeIntentos();
    }
}

function actualizarMensajeIntentos() {
    const intentosRestantes = maxIntentos - intentos + 1;
    mostrarMensaje(`Te quedan ${intentosRestantes} intentos.`, 'mensaje-rojo');
}

function mostrarMensaje(texto, clase) {
    mensaje.className = clase;
    mensaje.textContent = texto;
}

function ganarJuego() {
    mostrarMensaje('¡Felicidades! Has adivinado el número.', 'mensaje-verde');
    mostrarNumeroSecreto();
}

function perderJuego() {
    mostrarMensaje(`Has perdido. El número era ${numeroAleatorio}.`, 'mensaje-rojo');
    mostrarNumeroSecreto();
}

function mostrarNumeroSecreto() {
    for (let i = 0; i < 5; i++) {
        document.getElementById(`azul${i + 1}`).textContent = numeroAleatorioSeparado[i];
    }
}
