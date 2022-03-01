var turno = 1;
var conteo = 0;
var botones = document.getElementsByClassName("col-4");
var ganadasX = 0, ganadasO = 0;

var lugar = document.getElementById("tablero");

var tablero = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

var alto = lugar.clientHeight;
var largo = lugar.clientWidth;


for (var i = 0; i < 9; i++) {

    botones[i].setAttribute("y", Math.trunc(i / 3));
    botones[i].setAttribute("x", Math.trunc(i % 3));
    botones[i].addEventListener("click", function () {
        if (this.getAttribute("value") == 0) {
            conteo++;
            if (turno == 1) {
                this.innerHTML = '<i class="fas fa-times fa-9x"></i>';
                this.setAttribute("value", "2");
                var y = this.getAttribute("y");
                var x = this.getAttribute("x");
                tablero[y][x] = turno;
                document.getElementById("container").style.backgroundColor = "#4079BF";
                document.getElementsByClassName("arriba")[0].style.borderBottomColor = "#6D2431";
                turno = 2;
            } else {
                this.innerHTML = '<i class="far fa-circle fa-7x"></i>';
                this.setAttribute("value", "1");
                var y = this.getAttribute("y");
                var x = this.getAttribute("x");
                tablero[y][x] = turno;
                document.getElementById("container").style.backgroundColor = "#B13B56"
                document.getElementsByClassName("arriba")[0].style.borderBottomColor = "#2B2C82";
                turno = 1;
            }
            verificar();
        }
    });
}

function ganar(X,O) {
    if (X > O){
        ganadasX++;
        document.getElementById("X").innerHTML = ganadasX;
    }
    else {
        ganadasO++;
        document.getElementById("O").innerHTML = ganadasO;
    }
    for (var i = 0; i < 9; i++){
        botones[i].setAttribute("value", 3);
    }
    setTimeout(reiniciar, 2500);
}

function reiniciar() {
    for (var y = 0; y < 3; y++){
        for (var x = 0; x < 3; x++){
            tablero[y][x] = 0;
        }
    }
    for (var i = 0; i < 9; i++){
        botones[i].setAttribute("value", "0");
        botones[i].innerHTML = "";
    }
    conteo = 0;
}

function verificar() {
    var conteoX = 0;
    var conteoO = 0;
    //HORIZONTAL
    for (var y = 0; y < 3; y++) {
        conteoO = 0;
        conteoX = 0;
        for (var x = 0; x < 3; x++) {
            switch (tablero[y][x]) {
                case 1:
                    conteoX++;
                    conteoO = 0;
                    break;
                case 2:
                    conteoO++;
                    conteoX = 0;
                    break;
                case 0:
                    conteoO = 0;
                    conteoX = 0;
                    break;
            }
            if (conteoO == 3 || conteoX == 3) {
                for (var i = y*3; i <= y*3+2; i++) {botones[i].firstChild.style.color = "#BAB33E";}
                ganar(conteoX, conteoO);
                break;
                break;
            }
        }
    }
    //VERTICAL
    for (var y = 0; y < 3; y++) {
        conteoO = 0;
        conteoX = 0;
        for (var x = 0; x < 3; x++) {
            switch (tablero[x][y]) {
                case 1:
                    conteoX++;
                    conteoO = 0;
                    break;
                case 2:
                    conteoO++;
                    conteoX = 0;
                    break;
                case 0:
                    conteoO = 0;
                    conteoX = 0;
                    break;
            }
            if (conteoO == 3 || conteoX == 3) {
                for (var i = y; i <= y+6; i+= 3){
                    botones[i].firstChild.style.color = "#BAB33E";
                }
                ganar(conteoX, conteoO);
                break;
                break;
            }
        }
    }
    //ESQUINEADO 00-22
    conteoO = 0;
    conteoX = 0;
    for (var x = 0; x < 3; x++) {
        switch (tablero[x][x]) {
            case 1:
                conteoX++;
                conteoO = 0;
                break;
            case 2:
                conteoO++;
                conteoX = 0;
                break;
            case 0:
                conteoO = 0;
                conteoX = 0;
                break;
        }
        if (conteoO == 3 || conteoX == 3) {
            for(var i = 0; i < 3; i++){botones[i*4].firstChild.style.color = "#BAB33E";}
            ganar(conteoX, conteoO);
            break;
        }
    }
    //ESQUINEADO 20-02
    conteoO = 0;
    conteoX = 0;
    for (var x = 0; x < 3; x++) {
        switch (tablero[x][2 - x]) {
            case 1:
                conteoX++;
                conteoO = 0;
                break;
            case 2:
                conteoO++;
                conteoX = 0;
                break;
            case 0:
                conteoO = 0;
                conteoX = 0;
                break;
        }
        if (conteoO == 3 || conteoX == 3) {
            for (var i = 1; i <= 3; i++ ){botones[i*2].firstChild.style.color = "#BAB33E";}
            ganar(conteoX, conteoO);
            break;
        }
    }
    if (conteo == 9) {
        reiniciar();
    }
}

document.getElementById("reiniciar").addEventListener("click", reiniciar );
