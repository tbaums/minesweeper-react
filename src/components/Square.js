import React from 'react';


class Square extends React.Component {
    constructor(props) {
        super(props);

        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.handleClick(this.props.id);
    }
    handleContextMenu(e) {
        e.preventDefault();
        this.props.handleContextMenu(this.props.id);
    }

    render() {
        return (
            <button 
                className={`square 
                            ${this.props.revealed ? "revealed" : ""}
                            ${this.props.value === "F" ? "flagged" : ""}
                        `}
                onContextMenu={this.handleContextMenu}
                onClick={() => {
                    this.handleClick()
                }}
                revealed={`${this.props.revealed}`} // needs to be a string
            >
                {this.props.value}
            </button>
        );
    }
}

export default Square;