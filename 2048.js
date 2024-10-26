var board;
var score = 0;
var rows = 4;
var columns = 4;
var highest_score = 0;

window.onload = function () {
    setGame();
}


//////////////////////////game functions//////////////////////

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
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();

    playWithArrows();
}

function restartGame() {
    if (score > highest_score){
        highest_score = score;
    }
    
    score = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("highest_score").innerText = highest_score;

    for (let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++) {   
            board[r][c] = 0; 
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile (tile, num);
        }
    }

    setTwo();
    setTwo();
}

function playWithArrows() {
    document.addEventListener("keyup", (e) => {
        if (e.code == "ArrowLeft") {
            slideLeft();
            // continueGame();
            }
        else if (e.code == "ArrowRight") {
            slideRight();
            // continueGame();
        }
        else if (e.code == "ArrowUp") {
            slideUp();
            // continueGame();
        }
        else if (e.code == "ArrowDown") {
            slideDown();
            // continueGame();
        }
        continueGame();
        document.getElementById("score").innerText = score;
    }
)};

/////////////////base functions (setTwo, boardIsFull, updatTile)//////////////////////////

function setTwo () {
    if (boardIsFull()) {
        return;
    }
    
    let found = false;
    while (!found) {
        //random r, c
        let r = Math.floor(Math.random() * rows); // 0-1 * rows -> 0-rows
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }

}

function boardIsFull(){
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return false;
            }
        }
    }
    return true;
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


//////////////////////////slide functions/////////////////////////

function filterZero(row) {
    return row.filter(num => num !=0); //create a new array without 0
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

    return row;

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

         //update the html
         for (let r = 0; r < rows; r++) {
            board[r][c] = row[r]; //put the value in more elegant way :)
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile (tile, num);
        }
    }
}

////////////////// continueGame and its functions/////////////////

function continueGame(){
    //check if game is overed. if dont - continues the game by setting 2
    if (isWin()){
        if (confirm("Yow Win! press 'אישור' to play again")){
            restartGame();
        } else {
            alert("Thank you for playing, Champion :)")
        }
    }else if (isGameOver()){
        if (confirm("Game over! press 'אישור' to play again")){
            restartGame();
        } else {
            alert("Thank you for playing")
        }
    } else {
        setTwo();
    }
}

function isGameOver(){
    if (!isAvailableMove()){
        return true;
    }
    return false;
}

function isAvailableMove(){
    //check if there is any Available move on the board
    if (boardIsFull()){
        for (let r = 0; r < rows; r++){
            if(isAvailableMoveRow(r)){
                return true;
        }

        for (let c = 0; c < columns; c++){
            if(isAvailableMoveCol(c)){
                return true;
            }
        }
        return false;
        }
    }
    return true;
}

function isAvailableMoveRow(row_num){
    let row_check = board[row_num];
    return(hasAdjacentDuplicates(row_check));
}

function isAvailableMoveCol(col_num){
    //Get a number, create an array of this column, and use hasAdjacentDuplicates()
    let col_check = [board[0][col_num], board[1][col_num], board[2][col_num], board[3][col_num]] //convert column into a row 
    return(hasAdjacentDuplicates(col_check));
}

function hasAdjacentDuplicates(arr){
    for (let i = 0; i < arr.length ; i++){
        if (arr[i] == arr[i+1]) {
            return true;
        }
    }
    return false;
}

function isWin(){
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 2048) {
                return true;
            }
        }
    }
    return false;
}

