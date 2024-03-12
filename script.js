let gameInfo = document.querySelector(".game-info");
let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector(".btn");

// initialvariables
let count = 0;
let turn = true;

// winningPositions
let winningPositions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

// applying Event listeners for each box 
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        handleClickBox(box);
    });
});


// function to check turn of X And Y 
function handleClickBox(box) {
    if (turn) {
        gameInfo.innerText = "Current Player - O";
        box.innerText = "X"
        turn = false;
    }
    else {
        gameInfo.innerText = "Current Player - X";
        box.innerText = "O"
        turn = true;
    };

    // once box click then make it unclick
    box.style.pointerEvents = "none";

    // function to check winner 
    checkWinner();

    // logic of if all box has clicked and no winner found then match is tied 
    if (box.innerText !== "") {
        count++;
        console.log(count, "count");
    };

    if (count === 9) {
        gametied();
    }

};

function gametied() {
    gameInfo.innerText = "Match is Tied";
    newGameBtn.classList.add("active")
    disableboxes();
}

function showWinner(winner) {
    gameInfo.innerText = `Winner is - ${winner}`;
    newGameBtn.classList.add("active");
    disableboxes();
};

function disableboxes() {
    boxes.forEach((box) => {
        box.style.pointerEvents = "none";
    });
};

function enableboxes() {
    boxes.forEach((box) => {
        box.style.pointerEvents = "All";
        box.innerText = "";
    });
}

function checkWinner() {
    winningPositions.forEach((position) => {
        let pos1val = boxes[position[0]].innerText;
        let pos2val = boxes[position[1]].innerText;
        let pos3val = boxes[position[2]].innerText;
        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");

            }
        }
    });
};

function removewingbackcolor() {
    boxes.forEach((box) => {
        box.classList.remove("win")
    })
}

function resetgame() {
    turn = true
    enableboxes();
    removewingbackcolor();
    gameInfo.innerText = "Current Player - X";
    newGameBtn.classList.remove("active");
    count = 0;
}

newGameBtn.addEventListener("click", () => {
    resetgame();
})


