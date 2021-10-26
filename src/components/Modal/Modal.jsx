import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyboardManipulation);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyboardManipulation);
  }

  // function to close modal on ESC press & to switch images when modal is opened
  keyboardManipulation = e => {
    console.log(e);
    const { onClose } = this.props;

    switch (e.code) {
      case 'Escape':
        onClose();
        break;
      default:
        return;
    }
  };

  handleBackdropClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.props.onClose();
  };

  render() {
    const { url, alt } = this.props;

    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src={url} alt={alt} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
