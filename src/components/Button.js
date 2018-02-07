import React, { Component } from 'react';
import styled, { css } from 'react-emotion';

const Button = styled('button')`
  border: 2px solid #4dc5ff;
  background: none;
  border-radius: 3px;
  color: #4dc5ff;
  text-transform: uppercase;
  width: 70px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ isActive }) => isActive && css`
    color: #e04949;
    border-color: #e04949;
  `}
`;

export default class Toggle extends Component {
  state = {
    text: 'add',
  }

  onClick = () => {
    if (this.state.text === 'add') {
      this.setState({ text: 'added' });
    } else if (this.state.text === 'remove') {
      this.setState({ text: 'add' });
    }
  }

  onMouseOver = () => {
    if (this.state.text === 'added') {
      this.setState({ text: 'remove' });
    }
  }

  onMouseLeave = () => {
    if (this.state.text === 'remove') {
      this.setState({ text: 'added' });
    }
  }

  render() {
    const text = this.props.isActive ? 'remove' : 'add';

    return (
      <Button onClick={this.props.onClick} isActive={this.props.isActive}>
        {text}
      </Button>
    );
  }
}
