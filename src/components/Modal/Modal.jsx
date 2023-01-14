import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';
import IconButton from '../IconButton/IconButton';
import { ReactComponent as CloseIcon } from '../../images/close.svg';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handelBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="modal-backdrop" onClick={this.handelBackdropClick}>
        <div className="modal-content">
          <IconButton
            className="modal-close icon-button"
            aria-label="Close Modal icon"
            onClick={this.props.onClose}
          >
            <CloseIcon width="32" height="32" fill="#black" />
          </IconButton>
          {this.props.children}
        </div>
      </div>,
      modalRoot,
    );
  }
}
