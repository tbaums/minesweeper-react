import React from 'react';

const BoardHeader = (props) => {
    // TODO - implement count up
    // TODO - freeze time when game won / lost
    return (
        <div>
            <h1>Minesweeper</h1>
            {props.gameOver && <h2>Game Over</h2>}
            {props.gameWon && <h2>You Won!</h2>}
            <button onClick={props.resetGame}>Reset Game</button>
        </div>
    );
};

export default BoardHeader;



