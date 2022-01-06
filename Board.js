class Board
{
    constructor(size, uiContainer){
        this.size = size;
        this.DIAGONAL_RIGHT = 1;
        this.DIAGONAL_LEFT = 2;
        this.DIAGONAL_BOTH = 3;
        this.valueTable = [];
        this.locationMap = {row:{}, column: {}, diagonal: {}};
        this.container = uiContainer;
    }

    init() {
        let index = 0;
        for(let row = 0; row < this.size; ++row) {
            for(let column = 0; column < this.size; ++column) {
                let diagonal = null;
                if( row === column) {
                    diagonal = this.DIAGONAL_RIGHT;
                }
                if (row + column === this.size - 1) {
                    diagonal = diagonal == this.DIAGONAL_RIGHT ? this.DIAGONAL_BOTH : this.DIAGONAL_LEFT;
                }
                this.buildLocationMap(index, row, column, diagonal);
                this.renderHTMLCell(index, row, column, diagonal);
                ++index;
            }
        }
    }

    renderHTMLCell(index, row, column, diagonal) {
        const cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.dataset.index = index;
        cell.dataset.row = row;
        cell.dataset.column = column;
        cell.dataset.diagonal = diagonal;
        this.container.appendChild(cell);
    }

    buildLocationMap(index, row, column, diagonal) {
        ( this.locationMap['row'][row] || (this.locationMap['row'][row] = []) ).push(index);
        ( this.locationMap['column'][column] || (this.locationMap['column'][column] = []) ).push(index);
        ( this.locationMap['diagonal'][diagonal] || (this.locationMap['diagonal'][diagonal] = []) ).push(index);
    }

    playRound(cell, player) {
        if( this.mark(cell, player) ) {
            return this.checkWinner(cell, player);
        }
        return false
    }

    mark(cell, player) {
        const index = cell.dataset.index;
        if( this.valueTable[index] === undefined ) {
            this.valueTable[index] = player;
            cell.innerHTML = player;
            return true;
        }
        return false;
    }

    checkWinner(cell, player) {
        const index = cell.dataset.index;
        const row = cell.dataset.row;
        const column = cell.dataset.column;
        return this.checkBlockMatch(player, this.locationMap['row'][row]) 
            || this.checkBlockMatch(player, this.locationMap['column'][column]);
    }

    checkBlockMatch(value, indices) {
        let matchFound = true;
        for (let index of indices) {
            if( this.valueTable[index] == value) {
                continue;
            } else {
                matchFound = false;
                break;
            }
        }
        return matchFound ? value : false;
    }
}