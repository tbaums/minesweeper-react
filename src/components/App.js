import React  from 'react';
import BoardHeader from './BoardHeader';
import Board from './Board';
import Sidebar from './Sidebar';
import '../styles/minesweeper.css';


// TODO - deploy! 
// TODO - add tests!


// TODO - abstract to complete site (add react-router, etc)
// TODO - reveal adjacents
// TODO - add animation when revealing squares
// TODO - get a flag icon
// TODO - get a bomb icon

class App extends React.Component {
  constructor(props) {
    super(props);

    let bombSet = new Set();

    while (bombSet.size < 7) {
      bombSet.add(Math.floor(Math.random() * Math.floor(64)))
    }

    this.state = {
      squares: [...Array(64).keys()].map((square) => {
        return {
          id: square,
          type: bombSet.has(square) ? "bomb" : "blank",
          row: Math.floor(square / 8),
          col: square % 8,
          revealed: false,
          flagged: false,
        }
      }),
      gameOver: false,
      gameWon: false
    };
  }

  componentDidMount() {
    this.setState((prevState) => {
      return {
        squares: prevState.squares.map((square) => {
          return {
            ...square,
            adjacents: prevState.squares.filter((comparator) => {
              return (comparator.row === square.row && comparator.col === square.col + 1) || // east
                      (comparator.row === square.row && comparator.col === square.col - 1) || // west
                      (comparator.row === square.row + 1 && comparator.col === square.col + 1) || // southeast
                      (comparator.row === square.row + 1 && comparator.col === square.col - 1) || // southwest
                      (comparator.row === square.row + 1 && comparator.col === square.col) || // south
                      (comparator.row === square.row - 1 && comparator.col === square.col) || // north
                      (comparator.row === square.row - 1 && comparator.col === square.col + 1) || // northeast
                      (comparator.row === square.row - 1 && comparator.col === square.col - 1)// northwest
            }).map((square) => {return square.id})
          };
        })
      };    
    });
  }

  checkGameWon() {
    let squares = this.state.squares.filter((square) => {
      return !square.revealed && !square.flagged
    });

    if (squares.length > 0) {
      return 
    } else if (this.state.squares.filter((square) => square.flagged && square.type !== "bomb").length > 0) {
      return 
    } else {
      this.setState({
        gameOver: true,
        gameWon: true
      });
    }
  }

  flagSquare(i) {
    let newState = [];
    this.state.squares.map((square) => {
      if (square.id === i && !square.revealed) {
        return newState.push({...square, flagged: true, value: "F"});
      } else {
        return newState.push(square);
      } 
    });
    
    this.setState({
      squares: newState,
    }, () => {
      this.checkGameWon();
    });
  }

  handleClick(i) {
    if (this.state.gameOver) {
      return
    }
    this.revealSquare(i);
  }

  handleContextMenu(i) {
    if (this.state.gameOver) {
      return
    }
    this.flagSquare(i);
  }

  resetGame() {
    this.setState((prevState) => {
      return {
        squares: prevState.squares.map((square) =>{
          return {
            ...square,
            revealed: false,
            flagged: false,
            value: null,
          }
        }),
        gameOver: false,
        gameWon: false
      }    
    })
  }

  revealAdjacents(adjacents) {
    // grab all the adjacents
    const adjacentSquares = adjacents.map((adjacent) => this.state.squares[adjacent])
    // console.log(adjacentSquares);

    // adjacentSquares.forEach((square) => this.revealSquare(square.id));
    // 
    // if any adjacents have no adjacents themselves, (1) reveal it, (2) call recursively
  }

  revealSquare(i) {
    let newState = [];
    this.state.squares.map((square) => {

      const adjacentBombCount = square.adjacents.filter((id) => {
        return this.state.squares[id].type === "bomb";
      }).length

      if (square.id === i && square.type === "bomb") {
        this.setState({ gameOver:true });
        return newState.push({...square, flagged: false, revealed: true, value: "B"});
      } else if (square.id === i && adjacentBombCount === 0) {
        this.revealAdjacents(square.adjacents);
        return newState.push({...square, flagged: false, revealed: true, value: "*"});
      } else if (square.id === i) {
        return newState.push({...square, flagged: false, revealed: true, value: adjacentBombCount});
      } else {
        return newState.push(square);
      } 
    });
    
    this.setState({
      squares: newState,
    }, () => {
      this.checkGameWon();
    }); 
  }

  render() {
    return (
      <div className="wrapper">
        <BoardHeader />
        <Board 
          squares={this.state.squares}
          handleClick={(i) => this.handleClick(i)}
          handleContextMenu={(i) => this.handleContextMenu(i)}
        />
        <Sidebar 
          resetGame={() => this.resetGame()}
          gameOver={this.state.gameOver}
          gameWon={this.state.gameWon}
        />
        <div className="footer" />
      </div>
    );
  }
}

export default App;
