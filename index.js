let o = '<div id="circle" style="background-color: white; border: 1px solid black; border-radius: 70px; width: 70px; height: 70px;"></div>';
let x = `<div id="xi" style="position: relative; margin: 0 30px;"><div style="position: absolute; background-color: white; width: 2px; height: 70px; transform: rotate(45deg);"></div><div style="position: absolute; background-color: white; width: 2px; height: 70px; transform: rotate(135deg);"></div></div>`
let showWinner = document.querySelector('.winner');
let divBlock = document.querySelectorAll('.block');

let unmarkedCases = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let caseMarkedPlayer = []
let caseMarkedOpponent = []


/* ===================================== Winner ===================================== */
let winner = '';
function Wins() {
    let indexs = [divBlock[0].innerHTML, divBlock[1].innerHTML,
    divBlock[2].innerHTML, divBlock[3].innerHTML, divBlock[4].innerHTML,
    divBlock[5].innerHTML, divBlock[6].innerHTML, divBlock[7].innerHTML,
    divBlock[8].innerHTML];

    if ((indexs[0] == x && indexs[1] == x && indexs[2] == x)
        || (indexs[3] == x && indexs[4] == x && indexs[5] == x)
        || (indexs[6] == x && indexs[7] == x && indexs[8] == x)
        || (indexs[0] == x && indexs[3] == x && indexs[6] == x)
        || (indexs[1] == x && indexs[4] == x && indexs[7] == x)
        || (indexs[2] == x && indexs[5] == x && indexs[8] == x)
        || (indexs[0] == x && indexs[4] == x && indexs[8] == x)
        || (indexs[2] == x && indexs[4] == x && indexs[6] == x)
    ) {
        winner = 'X'
    }
    if ((indexs[0] == o && indexs[1] == o && indexs[2] == o)
        || (indexs[3] == o && indexs[4] == o && indexs[5] == o)
        || (indexs[6] == o && indexs[7] == o && indexs[8] == o)
        || (indexs[0] == o && indexs[3] == o && indexs[6] == o)
        || (indexs[1] == o && indexs[4] == o && indexs[7] == o)
        || (indexs[2] == o && indexs[5] == o && indexs[8] == o)
        || (indexs[0] == o && indexs[4] == o && indexs[8] == o)
        || (indexs[2] == o && indexs[4] == o && indexs[6] == o)
    ) {
        winner = 'O';
    }

    /* ========== Show Winner ========== */
    if (winner == 'X' || winner == 'O') {
        showWinner.innerHTML = 'Winner ' + winner;

        /* ==== block moves ==== */
        divBlock = null
        x = null
    }
}


/* ===================================== Opponent ===================================== */
function Oppnent(parUnmarkedCases) {
    /* ===== Winners (do not mark O when x win) ===== */
    Wins();
    /*  ============= opponent move ============= */
    var random = Math.floor(Math.random() * parUnmarkedCases.length);

    if (divBlock[parUnmarkedCases[random]].children[0] == null) {
        /* ===== marked move opponent in game ===== */
        divBlock[parUnmarkedCases[random]].innerHTML += o;

        /* ===== mark opponent move in array ===== */
        caseMarkedOpponent.push(parUnmarkedCases[random])

        /* ===== update unmarkedCases without the o ===== */
        unmarkedCases = parUnmarkedCases.filter(o => {
            return JSON.stringify(caseMarkedOpponent).indexOf(JSON.stringify(o)) < 0;
        })

    }
    /* ===== Winners (show winner) ===== */
    Wins();
}

/* ===================================== Player ===================================== */
divBlock.forEach((casa, index) => {
    casa.addEventListener('click', function () {
        /* ========= check if it's over ========= */
        if (casa.innerHTML == '<p style="display: none;"></p>' || divBlock == null) {
            alert('game over')
        }
        /* ========= check position marked ========= */
        else if (casa.innerHTML == x || casa.innerHTML == o) {
            alert('Marked Position')
        }
        /* ========= Unmarked Position, Mark X ========= */
        else if (casa.innerHTML == '') {
            /* ===== marked move player in game ===== */
            casa.innerHTML += x;

            /* ===== mark player move in array ===== */
            caseMarkedPlayer.push(index)

            /* ===== update unmarkedCases without the x ===== */
            unmarkedCases = unmarkedCases.filter(x => {
                return JSON.stringify(caseMarkedPlayer).indexOf(JSON.stringify(x)) < 0;
            });

            /* =============== opponent's move =============== */
            Oppnent(unmarkedCases);

        }

    })
})