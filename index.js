let btnRef = document.querySelectorAll(".button-option")
let popupRef = document.querySelector(".popup")
let newgameBtn =document.getElementById("new-game")
let restartBtn = document.getElementById("restart")
let msgRef = document.getElementById("message")
let xScoreDisplay = document.getElementById("x-wins")
let oScoreDisplay = document.getElementById("o-wins")
let xScore = 0;
let oScore = 0;

let winningPattern = [
    [0,1,2],
    [0,3,6],
    [2,5,8],
    [6,7,8],
    [3,4,5],
    [1,4,7],
    [0,4,8],
    [2,4,6],
]

let xTurn = true;
let count = 0

const toggleButtons = (enable) => {
    if (!enable) {
        btnRef.forEach(b => {b.disabled = true})
        popupRef.classList.remove("hide")
    } else {
        btnRef.forEach(b => {
            b.disabled = false
            b.innerText = ""
        })
        popupRef.classList.add("hide")
    }
}

newgameBtn.addEventListener("click", () => {
    count = 0;
    toggleButtons(true);
})

restartBtn.addEventListener("click", () => {
    count = 0;
    toggleButtons(true);
})

const checkGame = (letter) => {
    toggleButtons(false);
    if(letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins"
        xScore++;
        xScoreDisplay.innerText = `X: ${xScore}`
    }
    else if(letter == "O"){
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins"
        oScore++;
        oScoreDisplay.innerText = `O: ${oScore}`
    }
    else{
        msgRef.innerHTML = "&#x1F60E; <br> It's a Draw"
    }
}


const winChecker = () => {
    for(let i of winningPattern) {
        let[e1, e2, e3] = [btnRef[i[0]].innerText, btnRef[i[1]].innerText, btnRef[i[2]].innerText]
        if((e1 != "" && e2 != "") && (e3 != "")) {
            if (e1 == e2 && e2 == e3) {

                checkGame(e1);
            }
        }
    }
}

btnRef.forEach(e => {
    e.addEventListener("click", () => {
        if(xTurn) {
            xTurn = false;
            e.innerText = "X";
            e.disabled = true;
        } else {
            xTurn = true;
            e.innerText = "O";
            e.disabled = true;
        }

        count++
        if(count === 9) {
            checkGame("D")
        }
        winChecker();
    })
})

window.onload = () => {
    toggleButtons(true);
    xScore = 0;
    oScore = 0;
}