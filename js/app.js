const cells = document.getElementById('game').querySelectorAll('.column')
const tokens = document.getElementById('game').querySelectorAll('.token')
const game = []
let turn = 'yellow'

for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 6; y++) {
        game.push({
            element: cells[x].children[y + 1], x, y, piece: null
        })
    }
}

for (const cell of cells) {
    const tokenDiv = cell.firstChild.nextSibling
    cell.addEventListener('mousemove', () => {
        for (const token of tokens) {
            token.classList.remove('yellow')
            token.classList.remove('red')
        }
        tokenDiv.classList.add(turn)
    })
    cell.addEventListener('click', e => {
        const column = game.filter(el => el.x === e.currentTarget.id - 1)
        let i = 0

        if (column[0].piece) {
            alert('token')
            return
        }

        for (let y = 0; y < 6; y++) {
            if (column[y].piece) break
            i = y
        }

        column[i].piece = turn

        column[i].element.style.backgroundColor = turn
        turn = turn === 'yellow' ? 'red' : 'yellow'

        for (const token of tokens) {
            token.classList.remove('yellow')
            token.classList.remove('red')
        }
        tokenDiv.classList.add(turn)

        console.log(game);

    })
}

function win(move) {

    for (let x = move.x - 1; x <= move.x + 1; x++) {
        for (let y = move.y - 1; y <= move.y + 1; y++) {
            console.log(true);
        }
    }

}

win({ x: 3, y: 3 })