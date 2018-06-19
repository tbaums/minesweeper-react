import React from 'react';
import Square from './Square';


class Board extends React.Component {
    renderSquare(square) {
        return (
            <Square 
                handleClick={(id) => {
                    this.props.handleClick(id)
                }}
                handleContextMenu={(id) => {
                    this.props.handleContextMenu(id)
                }}
                key={square.id}
                id={square.id}
                value={square.value}
                revealed={square.revealed}
            />
        );
    }
    render() {
        return (
            <div className="board">
                {this.props.squares.map((square) => {                  
                    return this.renderSquare(square);
                })}
            </div>
        )
    }
}

export default Board;