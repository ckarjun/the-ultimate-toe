const container =  document.querySelector('.box');
const messageElement = document.querySelector('.message');
let game = {};

init = () => {
    container.addEventListener('click', (e) => {
        game.handleClick(e);
    });

    document.getElementById('clear_board').addEventListener('click', (e) => {
        container.innerHTML = '';
        messageElement.innerHTML = '';
        run();
    });
}

run = () => {
    const boardSize = 5;
    boardObj = new Board(boardSize, container);
    container.style['grid-template-columns'] = `repeat(${boardSize}, auto)`;
    game = new Game(boardObj, messageElement);
    game.start();
}

init();
run();