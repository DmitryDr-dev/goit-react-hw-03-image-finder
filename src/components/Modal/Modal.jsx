import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import './Modal.css';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: this.props?.url,
      alt: this.props?.alt,
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyboardManipulation);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyboardManipulation);
  }

  // function to update state on keyboard manipulation
  changeImage(index) {
    this.setState({
      url: this.props.imgArr[index].largeImageURL,
      alt: this.props.imgArr[index].tags,
    });
  }

  // function to close modal on ESC press & to switch images when modal is opened
  keyboardManipulation = e => {
    const { onClose, imgArr } = this.props;
    let activeIndex = imgArr.findIndex(
      image => image?.largeImageURL === this.state.url,
    );

    switch (e.code) {
      case 'Escape':
        onClose();
        break;
      case activeIndex === imgArr.length - 1 && 'ArrowRight':
        activeIndex = 0;
        this.changeImage(activeIndex);
        break;
      case activeIndex < imgArr.length - 1 && 'ArrowRight':
        activeIndex += 1;
        this.changeImage(activeIndex);
        break;
      case activeIndex === 0 && 'ArrowLeft':
        activeIndex = imgArr.length - 1;
        this.changeImage(activeIndex);
        break;
      case activeIndex > 0 && 'ArrowLeft':
        activeIndex -= 1;
        this.changeImage(activeIndex);
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
    const { url, alt } = this.state;

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
  imgArr: PropTypes.arrayOf(
    PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ),
};

export default Modal;
