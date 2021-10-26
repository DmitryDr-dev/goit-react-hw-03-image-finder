import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

// component import
import { PixabayApi } from '../../services';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal/';
import Button from '../Button';

const pixabayApi = new PixabayApi();

// state machine
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  constructor() {
    super();

    this.state = {
      imageArray: [],
      status: Status.IDLE,
      showModal: false,
      largeImageUrl: '',
      imageAlt: '',
    };
  }

  // function to change state status & invoke new images fetch on new props / state
  componentDidUpdate(prevProps) {
    const prevQuery = prevProps?.query;
    const newQuery = this.props?.query;

    if (prevQuery !== newQuery) {
      this.setState({ status: Status.PENDING });

      try {
        pixabayApi.page = 1;
        pixabayApi.query = newQuery;
        this.setState({
          imageArray: [],
        });
        this.renderImages();
      } catch (error) {
        this.setState({ status: Status.REJECTED });
        console.log("Okay, Houston, we've got a problem here", error.message);
      }
    }
  }

  // function to update activeIndex by click on image
  imageClickHandler = (url, alt) => {
    this.setState({
      largeImageUrl: url,
      imageAlt: alt,
    });

    this.toggleModal();
  };

  // function to fetch images & update current state
  renderImages = () => {
    try {
      pixabayApi.fetchImages().then(fetchedImages => {
        // alert on empty arrays
        if (fetchedImages.hits.length === 0) {
          toast.error('Nothing found! Please enter the correct query!');
          return;
        }

        this.setState(prevState => {
          return {
            imageArray: [...prevState.imageArray, ...fetchedImages.hits],
            status: Status.RESOLVED,
          };
        });

        // smooth scrolling
        this.smoothScrolling();
      });
    } catch (error) {
      this.setState({ status: Status.REJECTED });
      console.log("Okay, Houston, we've got a problem here", error.message);
    }
  };

  // function to toggle modal
  toggleModal = () => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
      };
    });
  };

  // function to render more images by click on load more button
  loadMoreBtnClickHandler = () => {
    try {
      pixabayApi.page += 1;
      this.renderImages();
    } catch (error) {
      this.setState({ status: Status.REJECTED });
      console.log("Okay, Houston, we've got a problem here:", error.message);
    }
  };

  smoothScrolling() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  render() {
    const {
      state: { imageArray, status, showModal, imageAlt, largeImageUrl },
      imageClickHandler,
      toggleModal,
      loadMoreBtnClickHandler,
    } = this;

    switch (status) {
      case 'idle':
        return <div className="">Enter smth</div>;
      case 'pending':
        return <div className="">Wait</div>;
      case 'resolved':
        return (
          <>
            <ul className="ImageGallery">
              {imageArray.map(({ id, largeImageURL, webformatURL, tags }) => {
                return (
                  <li key={id} className="ImageGalleryItem">
                    <ImageGalleryItem
                      largeImageUrl={largeImageURL}
                      smallImageUrl={webformatURL}
                      imgDescription={tags}
                      onImageClick={imageClickHandler}
                    />
                  </li>
                );
              })}
            </ul>

            {showModal && (
              <Modal
                alt={imageAlt}
                url={largeImageUrl}
                onClose={toggleModal}
                imgArr={imageArray}
              />
            )}

            {imageArray.length !== 0 && (
              <Button onClick={loadMoreBtnClickHandler} />
            )}
          </>
        );
      case 'rejected':
        return <div className="">Ooops</div>;
      default:
        return;
    }
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
