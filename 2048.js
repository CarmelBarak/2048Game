var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
    setGame();
}

function setGame() {
    board = [
        [0,0,0,0,],
        [0,0,0,0,],
        [0,0,0,0,],
        [0,0,0,0,]
    ]

    for (let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++) {
            //<div id="0-0"></div>
            let tile = documentCreateElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function setTwo () {
    if (!hasEmptyTile()) {
        return
    }
    
    let found = false;
    while (!found) {
        //random r, c
        let r = Math.floor(Math.random() * rows); // 0-1 * rows -> 0-rows
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString)
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }

}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        tile.classList.add("x"+num.toString());
    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
})

function filterZero(row) {
    return row.filterZero(num => num !=0); //create a new array without 0
}

function slide (row) {
    //[0,2,2,2]
    row = filterZero(row); // -> [2,2,2]

    //slide
    for (let i = 0; i < row.length-1; i++) {
        //check every 2
        if (row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i]
        } // [2,2,2] -> [4,0,2]
    }

    row = filterZero(row) // [4,2]

    //add zeroes
    while (row.length<columns) {
        row.push(0);
    } // [4,2,0,0]

    return row

}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row

        //update the html
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile (tile, num);
        }
    }
}

function slideRight() { 
    //similer to slideLeft() but reversing the row before and after the slide
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse(); //reverse
        row = slide(row);
        row.reverse(); //reverse again
        board[r] = row

        //update the html
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile (tile, num);
        }
    }
}

function slideUp() {
    //similer to slideLeft() but conveting to column into a row  before and after the slide
    for (let c = 0; c < columns; c++){ 
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]] //convert column into a row
        row = slide(row);

        //put the values of to row back to the coloumn
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

         //update the html
         for (let r = 0; r < rows; r++) {
            board[r][c] = row[r]; //put the value in more elegant way :)
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile (tile, num);
        }
    }
}


function slideDown() {
     //similer to slideUp() but reversing the row before and after the slide
    for (let c = 0; c < columns; c++){ 
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]] //convert column into a row
        row.reverse(); //reversing
        row = slide(row);
        row.reverse(); //reversing again

        //put the values of to row back to the coloumn
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

         //update the html
         for (let r = 0; r < rows; r++) {
            board[r][c] = row[r]; //put the value in more elegant way :)
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile (tile, num);
        }
    }
}
