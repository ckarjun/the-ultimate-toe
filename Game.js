class Game
{
    constructor(boardObject, messageElement) {
        this.active = false;
        this.winner = false;
        this.player = 'X'
        this.board = boardObject;
        this.messageElement = messageElement;
    }

    start() {
        this.board.init();
        this.active = true;
    }

    changeTurn(player) {
        this.player = this.player == 'X' ? 'O' : 'X';
    }

    handleClick(e) {
        if( !this.active ) {
            return;
        }
        if(this.winner = this.board.playRound(e.target, this.player)) {
            this.messageElement.innerHTML = `Winner is ${this.winner}`;
            this.end();
        } else {
            this.changeTurn();
        }
    }

    end() {
        this.active = false;
    }
}