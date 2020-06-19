const btnEmpezar = document.getElementById('btnEmpezar');
const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const divNivel = document.getElementById('p-nivel');
const ULTIMO_NIVEL = 20;


class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        this.siguienteNivel()
    }
    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1;
        divNivel.innerHTML = this.nivel
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde

        }
    }
    toggleBtnEmpezar(){
        if (btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide');
        }else {
            btnEmpezar.classList.add('hide');
        }
    }
    generarSecuencia() {

        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    siguienteNivel() {
        this.subnivel = 0;
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }
    transformarDeNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'violeta'
            case 1:
                return 'celeste'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }
    transformarColorANumero(color) {
        switch (color) {
            case 'violeta':
                return 0
            case 'celeste':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }
    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarDeNumeroAColor(this.secuencia[i]);
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }

    }
    iluminarColor(color) {

        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)

    }
    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
        this.colores.naranja.addEventListener('click', this.elegirColor);
        this.colores.violeta.addEventListener('click', this.elegirColor);
    }
    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
        this.colores.naranja.removeEventListener('click', this.elegirColor);
        this.colores.violeta.removeEventListener('click', this.elegirColor);

    }
    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.transformarColorANumero(nombreColor)
        console.log(numeroColor)
        this.iluminarColor(nombreColor);

        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++

            if (this.subnivel === this.nivel) {
                this.nivel++
                divNivel.innerHTML = this.nivel
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                } else {
                 setTimeout(this.siguienteNivel, 1500)
                }
            }
        } else {
            //perdio
            this.perdioElJuego()
        }
    }
    ganoElJuego(){
     swal('Simon Dice', 'FELICITACIOES!!! Ganaste el juego', 'success')
     .then( this.inicializar)
    
    }


    perdioElJuego(){
        swal('Simon Dice', 'Lo lamentamos, perdiste :(', 'error')
        .then(()=> {
            this.eliminarEventosClick()
            this.inicializar()
          
        })
    }
}



function empezarJuego() {
    window.juego = new Juego();
}