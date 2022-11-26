let restartBtn = document.querySelector('.restartbuton');
let boxes = Array.from(document.getElementsByClassName('box'));
let title = document.querySelector('.maintext')
let winnerColor = getComputedStyle(document.body).getPropertyValue("--color-font-general")
let drawIndicator = getComputedStyle(document.body).getPropertyValue("--draw-color-general")
const O_text = "O"
const X_text = "X"
let currentPlayer = X_text
let spaces = Array(9).fill(null)
let countPlayer = 0


const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}
function boxClicked(e) {
    const id = e.target.id
    if (!spaces[id] && countPlayer < 9) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
        if (playerWon() !== false) {
            title.innerHTML = `${currentPlayer} Has Won!`
            let winner = playerWon()
            countPlayer = 10
            winner.map(box => boxes[box].style.backgroundColor = winnerColor)
            return
        }
        countPlayer++
        currentPlayer = currentPlayer == X_text ? O_text : X_text
    }
    if (countPlayer === 9) {
        title.innerHTML = "Draw Game!"
        boxes.forEach(box => box.style.color = drawIndicator)
    }
}
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
function playerWon() {
    for (const combo of winningCombo) {
        let [a, b, c] = combo
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false
}
restartBtn.addEventListener('click', restart);
function restart() {
    spaces.fill(null)
    boxes.forEach(box => {
        box.innerText = ''
        countPlayer = 0;
        box.style.backgroundColor = ''
        box.style.color = '#b8860b'
    })
    currentPlayer = X_text
    title.innerHTML = 'Tic Tac Toc'
}
startGame()