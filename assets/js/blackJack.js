
// C = trebol
// D = diamantes
// H = corazon
// S = espadas


let baraja      = [];

let tipos       = ['D','C','H','S'];
let especiales  = ['A','J','Q','K'];

//eventos DOM document objet model (id de HTML)

let pedir   = document.querySelector('#btn-pedir');
let detener = document.querySelector('#btn-detener');

let puntosJ = document.querySelector('#puntosJ');
let puntosC = document.querySelector('#puntosC');

let divJugadorCartas = document.querySelector('#jugador-cartas');
let divComputadora = document.querySelector('#computadora');


let puntosJugador = 0;
let puntosComputadora = 0;


const crearBaraja = () => {
    
    for (let i = 2; i < 11; i++) {
        for (let j of tipos) {
            baraja.push( i + j);
        }
    }

    for (const i of tipos) {
        for (const j of especiales) {
            baraja.push( j + i);
        }
    }
    baraja = _.shuffle(baraja);
    console.log(baraja);

    return baraja;
        
}

crearBaraja();

const perdirCarta = () => {
    
    if (baraja.length === 0) {
        throw 'No hay más cartas en la baraja';
    }

    carta = baraja.pop()
    console.log(carta)
    
    return carta;
}

const valorCarta = ( carta ) => {

    let valor = carta.substring(0, carta.length-1);
    let puntaje = 0;

    
    if (isNaN( valor )) {
        puntaje = (valor === 'A') ? 11 : 10;
    }

    else{
        puntaje = valor * 1;
    }
    console.log('puntaje: ' + puntaje);
    return puntaje;
}


const turnoComputadora = (puntos) => {
    

    do {
        
        const cart = perdirCarta();
    
        puntosComputadora += valorCarta(cart);
    
        puntosC.innerText = puntosComputadora;
    
        // console.log(puntosJugador);
        const img = document.createElement('img');
        img.src = `assets/cartas/${ cart }.png`;
        img.classList = 'carta';
        divComputadora.append(img);

        if( puntos > 21 ) {
            break;
        }
        
    } while ( (puntosComputadora < puntos)  && (puntos <= 21 ) );

        setTimeout(() => {
        if( puntosComputadora === puntos ) {
            alert('Nadie gana :(');
        } else if ( puntos > 21 ) {
            alert('Computadora gana')
        } else if( puntosComputadora > 21 ) {
            alert('Jugador Gana');
        } else {
            alert('Computadora Gana')
        }
    }, 100 );


}




// Eventos pedir otra carta

pedir.addEventListener('click', () => {
    
    const cart = perdirCarta();

    puntosJugador += valorCarta(cart);

    puntosJ.innerText = puntosJugador;

    // console.log(puntosJugador);
    const img = document.createElement('img');
    img.src = `assets/cartas/${ cart }.png`;
    img.classList = 'carta';
    divJugadorCartas.append(img);

})


//evento detener

detener.addEventListener('click', () => {
    pedir.disabled = true;
    detener.disabled = true;

    turnoComputadora(puntosJugador);

})

