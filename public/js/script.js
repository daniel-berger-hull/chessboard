
import { ChessBoardModel } from './ChessBoardModel.js';

let currentSelectedCell = 'A1';
let previousSelectCell  = 'A1';
let cellToRestore       = 'A1';

let chessBoardModel = new ChessBoardModel();


const ASCII_CODE_A = 65;
const ASCII_CODE_H = 72;

     

export function myFunction() {
  document.getElementById("demo").innerHTML = "Hello World";
}


export function buildChessBoard() {
  console.log('Will build Chess Board...');


  const chessBoard = document.getElementById("chessboard");
                                              
  
 for (let rowIndex = 1; rowIndex <= 8; rowIndex++) {

    //Since column have a Character index, we will loop through the ASCII code directly, instead of using 1 to 8  (for Code 65[A] to 72[H])
    for (let colACIICode =  ASCII_CODE_A; colACIICode <= ASCII_CODE_H; colACIICode++) {
 
       // Rebuild the index of the cell, which is a letter and number toghetter...
       const cellIndex = String.fromCharCode(colACIICode) + rowIndex;

       const newCell = document.createElement("div");
        newCell.id = cellIndex;   // "A8";
        newCell.className = 'black';
        newCell.className = getStyleForCell(cellIndex);

        newCell.style.backgroundImage = "url('images/black_knight.png')";         
        newCell.style.backgroundRepeat = "no-repeat"; 
        newCell.style.backgroundPosition = "center"; 
        //newCell.style.backgroundSize = "cover"; 
            
      newCell.onclick = highlightCell;
      
       chessBoard.appendChild(newCell);
    }
  }


}

function displayPieces() {

  // To Do make sure to leverage the pieceToImageMap object from the CheckBoardModel, to find the image file for each type of piece on the board
  //  1 - CheckBoardModel --> Give the int value of each cell on the board
  //     2-  CheckBoardModel::pieceToImageMap --> Will give the image file name for each int value of a piece
  //        3 - script.js :: displayPieces   --> Will set the backgroud image with image file found in step 2
  
  //chessBoardModel

}

export function highlightCell (cellObject) {

    if (cellObject === null || cellObject.currentTarget === null)  return;

    const cellID = cellObject.currentTarget.id;

    console.log(`highlightCell called with ${cellID}`);
    if ( !isValidCell(cellID) ){
        
         console.log(cellID + ' appears to be an invalid cell name..');
         return;
    }


    const oldColor = getBackgroundColorForCell(previousSelectCell);

    // A 2 stages highlight selection mecanism requires to keep track of the cell that was selected before, but also,  
    // the very first one in the sequence, which needs to be restored to a normal unselected state
    // So current selected will  be red  --> The cell previously selected will switch from red to blue --> And this one before that will switch from blue to its normal color (Either black/white  or Green/beige etc)
    cellToRestore  = previousSelectCell;
    previousSelectCell = currentSelectedCell;
    currentSelectedCell = cellID;  

    // Apply the respective colors to the appropriate cell (i.e Current selction is red, previous is blue, and restore the initial cell to its orginial color[white or black])
    document.getElementById(cellToRestore).style.backgroundColor = oldColor;
    document.getElementById(previousSelectCell).style.backgroundColor = "blue";
    document.getElementById(currentSelectedCell).style.backgroundColor = "red";
  
}

function isValidCell  (cellName) {

    if (cellName === "")   return false;

    const regex = /[A-H][1-8]/g;
    return regex.test(cellName);
}


function getBackgroundColorForCell  (cellName) {

    if ( !isValidCell(cellName) )   return "black";
    
  const columnLetter = cellName.charCodeAt(0) - ASCII_CODE_A + 1;
  const rowIndex    = parseInt(cellName[1]);

  const odd = (columnLetter & 1)
  const rowBit = (rowIndex & 1)
  
  const color =  ((odd ^ rowBit) === 1) ? "#EEEED2" : "#769656";
  
  return color;
}


function getStyleForCell  (cellName) {

  if ( !isValidCell(cellName) )   return "not-defined";
  
  const columnLetter = cellName.charCodeAt(0) - ASCII_CODE_A + 1;
  const rowIndex    = parseInt(cellName[1]);

  const odd = (columnLetter & 1);
  const rowBit = (rowIndex & 1);

  const styleName =  ((odd ^ rowBit) === 1) ? "white" : "black";

  return styleName;
}



 

window.onload = function() {
  buildChessBoard();
}


