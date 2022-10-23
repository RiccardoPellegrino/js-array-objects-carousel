// Milestone 0:
// Come sempre focalizziamoci prima sulla creazione del markup statico: 
//costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.

// Milestone 1:
// Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali 
//per popolare dinamicamente il carosello.
// Al click dell'utente sulle frecce verso sinistra o destra, 
// l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.

// Milestone 2:
// Aggiungere il **ciclo infinito** del carosello. 
// Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, 
// la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura 
// se l'utente clicca la freccia verso sinistra.

// BONUS 1:
// Aggiungere le thumbnails (sottoforma di miniatura) ed al click 
// attivare l’immagine corrispondente.

// BONUS 2:
// Aggiungere funzionalità di autoplay: 
// dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.

// BONUS 3:
// Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.


const images = [
    {
        url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
        title: 'Svezia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Perù',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
        title: 'Chile',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Argentina',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
        title: 'Colombia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
];

const DURATA_AUTOPLAY_IN_MILLISECONDI = 3000;
const AUTOPLAY_AVANTI = 'AVANTI';
const AUTOPLAY_INDIETRO = 'INDIETRO';
const titolo = document.getElementById('titolo');
const scritta = document.getElementById('scritta');
const immagine = document.getElementById('immagine');
const bottoneSuccessivo = document.getElementById('successivo');
const bottonePrecedente = document.getElementById('precedente');
const bottoneStopAutoplay = document.getElementById('stop');
const bottoneInvertiAutoplay = document.getElementById('inverti');
let indiceImmagineAttuale = 0;
const numeroDiImmagini = images.length;
let idDelTimer;
let direzioneAutoplayAttuale;
const contenitoreAnteprime = document.getElementById('contenitore-anteprime');
const anteprime = [];


function impostaTutteLeAnteprimeOpache() {
    for (let immagine of anteprime) {
        immagine.style.opacity = 0.4;
    }
}

function impostaAnteprimaChiaraTramiteIndice(indiceImmagine) {
    anteprime[indiceImmagine].style.opacity = 1;
}

function aggiornaVisualizzazioneAnteprime(indiceNuovaImmagine) {
    impostaTutteLeAnteprimeOpache();
    impostaAnteprimaChiaraTramiteIndice(indiceNuovaImmagine);
}

function impostaImmagineTramiteIndice(indiceNuovaImmagine) {
    indiceImmagineAttuale = indiceNuovaImmagine;
    titolo.innerHTML = images[indiceImmagineAttuale].title
    scritta.innerHTML = images[indiceImmagineAttuale].description
    immagine.src = images[indiceImmagineAttuale].url;

    aggiornaVisualizzazioneAnteprime(indiceNuovaImmagine);
}

for (let i=0; i < images.length; i++) {

    const unaImmagine = document.createElement('img');
    unaImmagine.src = images[i].url;
    unaImmagine.style.width = 'calc(100% / ' + images.length + ')'; 
    unaImmagine.addEventListener('click', () => {
        impostaImmagineTramiteIndice(i);
    });

    anteprime.push(unaImmagine);
    contenitoreAnteprime.appendChild(unaImmagine);   
}

function vaiAdImmagineSuccessiva() {
    let indiceImmagineSuccessiva = indiceImmagineAttuale + 1;
    if (indiceImmagineSuccessiva >= images.length) {
        indiceImmagineSuccessiva = 0;
    }
    impostaImmagineTramiteIndice(indiceImmagineSuccessiva);
}

function vaiAdImmaginePrecedente() {
    let indiceImmaginePrecedente = indiceImmagineAttuale - 1;
    if (indiceImmaginePrecedente < 0) {
        indiceImmaginePrecedente = images.length - 1;
    }
    impostaImmagineTramiteIndice(indiceImmaginePrecedente);
}

function stopAutoplay() {
    console.log('Stop dell\'autoplay');
    clearTimeout(idDelTimer);
}

function avviaAutoplay(direzione) {
    console.log('Avvio dell\'autoplay');
    if (direzione === AUTOPLAY_AVANTI) {
        direzioneAutoplayAttuale = AUTOPLAY_AVANTI;
        idDelTimer = setInterval(vaiAdImmagineSuccessiva, DURATA_AUTOPLAY_IN_MILLISECONDI);
    } else if (direzione === AUTOPLAY_INDIETRO) {
        direzioneAutoplayAttuale = AUTOPLAY_INDIETRO;
        idDelTimer = setInterval(vaiAdImmaginePrecedente, DURATA_AUTOPLAY_IN_MILLISECONDI);
    } else {
        console.warn('Non è stato impostato nessun valore')
    }
}

function resetAutoplay() {
    console.log('Reset dell\'autoplay');
    stopAutoplay();
    avviaAutoplay();
}

bottoneSuccessivo.addEventListener('click', function () {
    console.log('Ho cliccato sul pulsante "successivo"');
    vaiAdImmagineSuccessiva();
});

bottonePrecedente.addEventListener('click', function () {
    console.log('Ho cliccato sul pulsante "precedente"');
    vaiAdImmaginePrecedente();
});

bottoneStopAutoplay.addEventListener('click', () => {
    console.log('Ho cliccato sul pulsante "Stop Autoplay"');
    stopAutoplay();
    bottoneStopAutoplay.innerHTML = 'L\'autoplay è in pausa';
})

bottoneInvertiAutoplay.addEventListener('click', () => {
    stopAutoplay();
    if (direzioneAutoplayAttuale === AUTOPLAY_AVANTI) {
        avviaAutoplay(AUTOPLAY_INDIETRO);
        bottoneStopAutoplay.innerHTML = 'interrompi scorrimento';
    } else {
        avviaAutoplay(AUTOPLAY_AVANTI);
        bottoneStopAutoplay.innerHTML = 'interrompi scorrimento';
    }
})


impostaTutteLeAnteprimeOpache();
impostaImmagineTramiteIndice(0);
avviaAutoplay(AUTOPLAY_AVANTI);