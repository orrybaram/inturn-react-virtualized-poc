import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('portal-root');

export default class SizesRow extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');

    this.el.position = 'absolute';
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    const {
      top, sizesVisible, data, width, close,
    } = this.props;
    return !Number.isFinite(sizesVisible) ? null : createPortal(
      <div style={{
        position: 'absolute',
        background: 'red',
        top: top || 0,
        left: 0,
        height: 100,
        width,
      }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={close}>
            X
          </button>
        </div>
        {Object.entries(data[0]).map(([name, value]) => (
          <span key={name}>
            <h3 style={{ display: 'inline-block', margin: '0 8px' }}>{name}</h3>
            <input defaultValue={value} />
          </span>
      ))}
      </div>,
      this.el,
    );
  }
}
