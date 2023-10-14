

export const BOARD_ROWS     =   8;
export const BOARD_COLUMNS  =   8;


export const BLACK_PIECE  =   64;
export const WHITE_PIECE  =  128;

export const NO_PIECE   =  0;
export const PAWN       =  1;
export const KNIGHT     =  2;
export const BISHOP     =  4;
export const ROOK       =  8;
export const QUEEN      = 16;
export const KING       = 32;

const PIECE_MASK = PAWN |  KNIGHT | BISHOP | ROOK | QUEEN | KING;


const pieceToImageMap = new Map([
	[ BLACK_PIECE | PAWN     , "black_pawn.png" ],
	[ BLACK_PIECE | KNIGHT   , "black_knight.png" ],
	[ BLACK_PIECE | BISHOP   , "black_bishop.png" ],
	[ BLACK_PIECE | ROOK     , "black_rook.png" ],
	[ BLACK_PIECE | QUEEN    , "black_queen.png" ],
	[ BLACK_PIECE | KING     , "black_king.png" ],

	[ WHITE_PIECE | PAWN     , "white_pawn.png" ],
	[ WHITE_PIECE | KNIGHT   , "white_bishop.png" ],
	[ WHITE_PIECE | BISHOP   , "white_knight.png" ],
	[ WHITE_PIECE | ROOK     , "white_rook.png" ],
	[ WHITE_PIECE | QUEEN    , "white_queen.png" ],
	[ WHITE_PIECE | KING     , "white_king.png" ]
  ]);


export class ChessBoardModel {

    

    constructor(){

        this.#initCells() ;
        //this.display();

        this.testMap();
    }

    #initCells() {
        console.log('Init Cells')

        this.cells = new Array();

        const firstRow = [ WHITE_PIECE | ROOK, WHITE_PIECE | KNIGHT, WHITE_PIECE | BISHOP, WHITE_PIECE | QUEEN,
                           WHITE_PIECE | KING, WHITE_PIECE | BISHOP, WHITE_PIECE | KNIGHT, WHITE_PIECE | ROOK ];

       const secondRow = [ WHITE_PIECE | PAWN, WHITE_PIECE | PAWN, WHITE_PIECE | PAWN, WHITE_PIECE | PAWN,
                           WHITE_PIECE | PAWN, WHITE_PIECE | PAWN, WHITE_PIECE | PAWN, WHITE_PIECE | PAWN ];

                           
      const sevenRow = [ BLACK_PIECE | PAWN, BLACK_PIECE | PAWN, BLACK_PIECE | PAWN, BLACK_PIECE | PAWN,
                         BLACK_PIECE | PAWN, BLACK_PIECE | PAWN, BLACK_PIECE | PAWN, BLACK_PIECE | PAWN ];

       const eightRow = [ BLACK_PIECE | ROOK, BLACK_PIECE | KNIGHT, BLACK_PIECE | BISHOP, BLACK_PIECE | QUEEN,
                          BLACK_PIECE | KING, BLACK_PIECE | BISHOP, BLACK_PIECE | KNIGHT, BLACK_PIECE | ROOK ];
 
 

        this.cells.push(firstRow);
        this.cells.push(secondRow);
        
        
        for (let rows=2; rows<6; rows++) {

            const emptyRow = [NO_PIECE,NO_PIECE,NO_PIECE,NO_PIECE,NO_PIECE,NO_PIECE,NO_PIECE,NO_PIECE];
            this.cells.push(emptyRow);
        } 

        this.cells.push(sevenRow);
        this.cells.push(eightRow);

        
    }

    display() {


        for (let i=BOARD_ROWS-1; i>-1; i--) {

            const nextRow = this.cells[i];

            for (let j=0; j<BOARD_COLUMNS; j++) {
                console.log(`${i},${j}  ${this.getTextDisplayForCell(i,j) }`);
            }
        }        
    }

    // Returns the text description of the piece  at a specific row and columns (i.e 'Black Bishop', 'White Pawn', etc)
    getTextDisplayForCell(row, column) {
        if (row<0 || row>BOARD_ROWS-1)           return "Invalid row/columns"
        if (column<0 || column>BOARD_COLUMNS-1)  return "Invalid row/columns"

        const rowData = this.cells[row];
        const pieceCode =  rowData[column];
        const pieceType = pieceCode & PIECE_MASK;
        let pieceDescription = "";

        if (pieceType === NO_PIECE)  return ".";

        switch (pieceType) {

              case  PAWN:     pieceDescription = "Pawn";    break;
              case  KNIGHT:   pieceDescription = "Knight";  break;
              case  BISHOP:   pieceDescription = "Bishop";  break;
              case  ROOK:     pieceDescription = "Rook";    break;
              case  QUEEN:    pieceDescription = "Queen";   break;
              case  KING:     pieceDescription = "King";    break;
           
              default:    pieceDescription = "Undefined";  break; 
        }

        const pieceColor = (pieceCode & BLACK_PIECE) ? "Black " : "White ";

        return pieceColor + pieceDescription;
    }


        // The mapping is as following: 
        //      BLACK_PIECE | PAWN     --> "black_pawn.png" 
        //      BLACK_PIECE | KNIGHT   --> "black_knight.png" 
        //      BLACK_PIECE | BISHOP   --> "black_bishop.png" 
        //      BLACK_PIECE | ROOK     --> "black_rook.png" 
        //      BLACK_PIECE | QUEEN    --> "black_queen.png"
        //      BLACK_PIECE | KING     --> "black_king.png" 
        
        //      WHITE_PIECE | PAWN     --> "white_pawn.png" 
        //      WHITE_PIECE | KNIGHT   --> "white_bishop.png" 
        //      WHITE_PIECE | BISHOP   --> "white_knight.png" 
        //      WHITE_PIECE | ROOK     --> "white_rook.png" 
        //      WHITE_PIECE | QUEEN    --> "white_queen.png" 
        //      WHITE_PIECE | KING     --> "white_king.png" 

    getImageFileForValue(pieceValue){
        return pieceToImageMap.get(pieceValue);
    }



    testMap() {

        pieceToImageMap.forEach (function(value, key) {
            console.log(`value ${value} key ${key}`);
        })

        const values = [65,66,68,72,80,96,129,130,132,136,144,160 ];
        values.forEach( (element) => console.log(`${element}   ${pieceToImageMap.get(element)} `));
    }
}