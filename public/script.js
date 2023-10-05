let currentSelectedCell = 'A1';
let previousSelectCell  = 'A1';
let cellToRestore       = 'A1';


const ASCII_CODE_A = 65;
     

function myFunction() {
  document.getElementById("demo").innerHTML = "Hello World";
}




highlightCell = (cellName) => {

    if ( !isValidCell(cellName) ){
        
         console.log(cellName + ' appears to be an invalid cell name..');
         return;
    }


    const oldColor = getBackgroundColorForCell(previousSelectCell);

    // A 2 stages highlight selection mecanism requires to keep track of the cell that was selected before, but also,  
    // the very first one in the sequence, which needs to be restored to a normal unselected state
    // So current selected will  be red  --> The cell previously selected will switch from red to blue --> And this one before that will switch from blue to its normal color (Either black/white  or Green/beige etc)
    cellToRestore  = previousSelectCell;
    previousSelectCell = currentSelectedCell;
    currentSelectedCell = cellName;  

    document.getElementById(cellToRestore).style.backgroundColor = oldColor;
    document.getElementById(previousSelectCell).style.backgroundColor = "blue";
    document.getElementById(currentSelectedCell).style.backgroundColor = "red";
    
    // console.log(cellName);
}

isValidCell  = (cellName) => {

    if (cellName === "")   return false;

    const regex = /[A-H][1-8]/g;
    return regex.test(cellName);
}


getBackgroundColorForCell  = (cellName) => {


  if ( !isValidCell(cellName) )   return "black";
  
 const columnLetter = cellName.charCodeAt(0) - ASCII_CODE_A + 1;
 const rowIndex    = parseInt(cellName[1]);



 const odd = (columnLetter & 1)
 const rowBit = (rowIndex & 1)
 
 const color =  ((odd ^ rowBit) === 1) ? "#EEEED2" : "#769656";
 
 return color;
}


// const main = () => {

//     const cellNames = ["A1", "A2", "A3","A4", "B1" ,"B2", "B3", "B4" ,"B5" , "D1", "D2" , "D4"];

//     cellNames.forEach( (cell) => {  console.log(cell + "  " +  getStyleForCell(cell))  });
    
// }

// main();