document.addEventListener('DOMContentLoaded', () => {
    let trun0 = true;
    const cells = document.querySelectorAll(".cell");
    const winnerElement = document.querySelector(".winner");
    const resetBtn = document.querySelector(".reset-btn");
    const winningCondition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const disabledBox = () => {
        cells.forEach((cell) => {
            cell.setAttribute("data-disabled", "true");
        })
    }
    const winner = (cell) => {
        for (let winningCond of winningCondition) {
          let cell0 = cells[winningCond[0]].innerText;
          let cell1 = cells[winningCond[1]].innerText;
          let cell2 = cells[winningCond[2]].innerText;
          if (cell0 !== "" && cell1 !== "" && cell2 !== 0) {
              if (cell0 === cell1 && cell1 === cell2) {
                  const winner = cell0 === '0' ? 'Priyanka' :'Vamsi'
                  winnerElement.innerText = `Winner is ${winner}`;
                  cell.setAttribute("data-disabled", "true");
                  disabledBox();
                   confetti();
            }
          }
        }
    }

    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            if (trun0) {
              cell.innerText = '0';
                trun0 = false;
            } else {
              cell.innerText = 'X';
                trun0 = true;
            }
            cell.setAttribute("data-disabled", "true");
            winner(cell)
        })
    });
        const reset = () => {
          cells.forEach((cell) => {
            cell.innerText = "";
            trun0 = true;
            cell.setAttribute("data-disabled", "false");
            winnerElement.innerText = "";
          });
        };
        resetBtn.addEventListener("click", reset);
})
