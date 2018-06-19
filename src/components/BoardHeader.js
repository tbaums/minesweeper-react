import React from 'react';
import moment from 'moment';

const BoardHeader = (props) => {
    // TODO - implement count up
    // TODO - freeze time when game won / lost
    return (
        <div className="board-header">
            <h1>Minesweeper</h1>
            {props.gameOver && <h2>Game Over</h2>}
            {props.gameWon && <h2>You Won!</h2>}
            {/* {`${moment()}`} */}
        </div>
    );
};

export default BoardHeader;



