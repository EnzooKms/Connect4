const cells = document.getElementById('game').querySelectorAll('.column')
const tokens = document.getElementById('game').querySelectorAll('.token')
const game = []
let turn = 'yellow'

for (let x = 0; x < 7; x++) {
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

        win(column[i], game)

    })
}

function win(move, states, count = 1, dir) {

    if (!dir) {
        for (let y = move.y - 1; y <= move.y + 1; y++) {
            for (let x = move.x - 1; x <= move.x + 1; x++) {
                const state = states.find(el => el.x === x && el.y === y)

                if (state === move || !state) continue

                const dir = { x: move.x - state.x, y: move.y - state.y }
                const adjacent = states.find(el => el.x === move.x - dir.x && el.y === move.y - dir.y)

                // console.log(dir, state.element, adjacent);

                if (adjacent.piece === move.piece) {
                    win(adjacent, game, count + 1, dir)
                }
            }
        }
    }

    else {

        if (count === 4) {
            setTimeout(() => {
                alert('yes')
                window.location.reload()
            }, 0.1 * 1000);
            return
        }

        const adjacent = states.find(el => el.x === move.x - dir.x && el.y === move.y - dir.y)
        if (adjacent && adjacent.piece === move.piece) {
            win(adjacent, game, count + 1, dir)
        }
        else if (count === 3) {
            win(move, game)
        }
    }

}