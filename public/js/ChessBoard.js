

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


export class ChessBoard {

    

    constructor(){

        this.#initCells() ;

        this.display();



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

    getTextDisplayForCell(row, column) {
        if (row<0 || row>BOARD_ROWS-1)           return "Invalid row/columns"
        if (column<0 || column>BOARD_COLUMNS-1)  return "Invalid row/columns"

        const rowData = this.cells[row];
        const pieceCode =  rowData[column];
        const pieceType = pieceCode & PIECE_MASK;
        let pieceDescription = "";

       

        if (pieceType === NO_PIECE)  return ".";

        switch (pieceType) {

              case  PAWN:     pieceDescription = "Pawn";  break;
              case  KNIGHT:   pieceDescription = "Knight";  break;
              case  BISHOP:   pieceDescription = "Bishop";  break;
              case  ROOK:     pieceDescription = "Rook";  break;
              case  QUEEN:    pieceDescription = "Queen";  break;
              case  KING:     pieceDescription = "King";  break;
           
              default:    pieceDescription = "Undefined";  break; 
        }

        
        const pieceColor = (pieceCode & BLACK_PIECE) ? "Black " : "White ";

       

        return pieceColor + pieceDescription;

    }
}