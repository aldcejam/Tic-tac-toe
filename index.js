const o = '<div id="circle" style="background-color: white; border: 1px solid black; border-radius: 70px; width: 70px; height: 70px;"></div>';
const x = `<div id="xi" style="position: relative; margin: 0 30px;"><div style="position: absolute; background-color: white; width: 2px; height: 70px; transform: rotate(45deg);"></div><div style="position: absolute; background-color: white; width: 2px; height: 70px; transform: rotate(135deg);"></div></div>`
let showWinner = document.querySelector('.winner');
let cases = document.querySelectorAll('.block');

let unmarkedCases = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let caseMarkedPlayers = []


/* ===================================== Winner ===================================== */
let winner = '';
function Wins(X_or_O) {
    let indexs = [cases[0].innerHTML, cases[1].innerHTML,
    cases[2].innerHTML, cases[3].innerHTML, cases[4].innerHTML,
    cases[5].innerHTML, cases[6].innerHTML, cases[7].innerHTML,
    cases[8].innerHTML];

    if ((indexs[0] == X_or_O && indexs[1] == X_or_O && indexs[2] == X_or_O)
        || (indexs[3] == X_or_O && indexs[4] == X_or_O && indexs[5] == X_or_O)
        || (indexs[6] == X_or_O && indexs[7] == X_or_O && indexs[8] == X_or_O)
        || (indexs[0] == X_or_O && indexs[3] == X_or_O && indexs[6] == X_or_O)
        || (indexs[1] == X_or_O && indexs[4] == X_or_O && indexs[7] == X_or_O)
        || (indexs[2] == X_or_O && indexs[5] == X_or_O && indexs[8] == X_or_O)
        || (indexs[0] == X_or_O && indexs[4] == X_or_O && indexs[8] == X_or_O)
        || (indexs[2] == X_or_O && indexs[4] == X_or_O && indexs[6] == X_or_O)
    ) {
        winner = X_or_O
    }

    /* ========== Show Winner ========== */
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


/* ===================================== Opponent ===================================== */
function Oppnent(parameUnmarkedCases) {
    /*  ================= opponent move ================= */
    var random = Math.floor(Math.random() * parameUnmarkedCases.length);

    if (cases[parameUnmarkedCases[random]].children[0] == null) {
        /* ===== marked move opponent in game ===== */
        cases[parameUnmarkedCases[random]].innerHTML += o;

        /* ===== mark opponent move in array ===== */
        caseMarkedPlayers.push(parameUnmarkedCases[random])

        /* ===== update unmarkedCases without the current position O ===== */
        unmarkedCases = parameUnmarkedCases.filter(o => {
            return JSON.stringify(caseMarkedPlayers).indexOf(JSON.stringify(o)) < 0;
        })

    }
    /* ===== check if O won ===== */
    Wins(o);
}

/* ===================================== Player ===================================== */
cases.forEach((casa, index) => {
    casa.addEventListener('click', function () {
        /* ========= check if it's over ========= */
        if (casa.innerHTML == '<p style="display: none;"></p>' || cases == null) {
            alert('game over')
        }
        /* ========= check position marked ========= */
        else if (casa.innerHTML == x || casa.innerHTML == o) {
            alert('Marked Position')
        }
        /* ========= Unmarked Position, Mark X(player) ========= */
        else if (casa.innerHTML == '') {
            /* ===== marked move player in game ===== */
            casa.innerHTML += x;

            /* ===== mark player move in array ===== */
            caseMarkedPlayers.push(index)

            /* ===== update unmarkedCases without the X ===== */
            unmarkedCases = unmarkedCases.filter(x => {
                return JSON.stringify(caseMarkedPlayers).indexOf(JSON.stringify(x)) < 0;
            });

            /* =============== opponent's move and check if X won =============== */
            Wins(x);
            Oppnent(unmarkedCases);

        }

    })
})