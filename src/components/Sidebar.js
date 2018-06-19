import React from 'react';

const Sidebar = (props) => {
    return (
        <div className="sidebar">
            <button id="reset" onClick={props.resetGame}>Reset Game</button>
            {props.gameOver && <h2>Game Over</h2>}
            {props.gameWon && <h2>You Won!</h2>}
        </div>
    )
}

export default Sidebar;