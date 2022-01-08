const o = '<div id="circle" style="background-color: white; border: 1px solid black; border-radius: 70px; width: 70px; height: 70px;"></div>';
const x = `<div id="xi" style="position: relative; margin: 0 30px;"><div style="position: absolute; background-color: white; width: 2px; height: 70px; transform: rotate(45deg);"></div><div style="position: absolute; background-color: white; width: 2px; height: 70px; transform: rotate(135deg);"></div></div>`
let showWinner = document.querySelector('.winner');
let cases = document.querySelectorAll('.block');

let unmarkedCases = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let caseMarkedPlayers = [];
let winner = '';



/* ===================================== Winner ===================================== */
function Wins(XorO) {
    let indexsOfArrayCases = [];
    for (var i = 0; i < cases.length;i++){
        indexsOfArrayCases.push(cases[i].innerHTML)
    }
    if ((indexsOfArrayCases[0] == XorO && indexsOfArrayCases[1] == XorO && indexsOfArrayCases[2] == XorO)
        || (indexsOfArrayCases[3] == XorO && indexsOfArrayCases[4] == XorO && indexsOfArrayCases[5] == XorO)
        || (indexsOfArrayCases[6] == XorO && indexsOfArrayCases[7] == XorO && indexsOfArrayCases[8] == XorO)
        || (indexsOfArrayCases[0] == XorO && indexsOfArrayCases[3] == XorO && indexsOfArrayCases[6] == XorO)
        || (indexsOfArrayCases[1] == XorO && indexsOfArrayCases[4] == XorO && indexsOfArrayCases[7] == XorO)
        || (indexsOfArrayCases[2] == XorO && indexsOfArrayCases[5] == XorO && indexsOfArrayCases[8] == XorO)
        || (indexsOfArrayCases[0] == XorO && indexsOfArrayCases[4] == XorO && indexsOfArrayCases[8] == XorO)
        || (indexsOfArrayCases[2] == XorO && indexsOfArrayCases[4] == XorO && indexsOfArrayCases[6] == XorO)
    ) {
        winner = XorO
    }

    ShowWinner();
}

function ShowWinner(){
    if (winner == x || winner == o) {
        if (winner == x){
            showWinner.innerHTML = 'Winner ' + 'X';
        }else{
            showWinner.innerHTML = 'Winner ' + 'O';
        }

        /* ==== blockad emoves ==== */
        cases = null
        x = null
    }
}


/* ===================================== player ===================================== */
function Player(casa, index){
    casa.innerHTML += x;
    
    caseMarkedPlayers.push(index)
    
    /* ===== update unmarkedCases without the X ===== */
    unmarkedCases = unmarkedCases.filter(x => {
        return JSON.stringify(caseMarkedPlayers).indexOf(JSON.stringify(x)) < 0;
    });
    Wins(x);
}

/* ===================================== Opponent ===================================== */
function Oppnent(parameUnmarkedCases) {

    var random = Math.floor(Math.random() * parameUnmarkedCases.length);
    
    if (cases[parameUnmarkedCases[random]].children[0] == null) {

        cases[parameUnmarkedCases[random]].innerHTML += o;
        
        caseMarkedPlayers.push(parameUnmarkedCases[random])
        
        /* ===== update unmarkedCases without the current position O ===== */
        unmarkedCases = parameUnmarkedCases.filter(o => {
            return JSON.stringify(caseMarkedPlayers).indexOf(JSON.stringify(o)) < 0;
        })
        
    }
    Wins(o);
}

cases.forEach((casa, index) => {
    casa.addEventListener('click', () => {
        /* ===================================== check game ===================================== */
        if (casa.innerHTML == '<p style="display: none;"></p>' || cases == null) {
            alert('game over')
        }
        else if (casa.innerHTML == x || casa.innerHTML == o) {
            alert('Marked Position')
        }
        /* ================= */
        else if (casa.innerHTML == '') {
            Player(casa, index);
            Oppnent(unmarkedCases);

        }

    })
})