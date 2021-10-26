import PropTypes from 'prop-types';

import './ImageGalleryItem.css';

function ImageGalleryItem({
  smallImageUrl,
  largeImageUrl,
  imgDescription,
  onImageClick,
}) {
  return (
    <img
      src={smallImageUrl}
      alt={imgDescription}
      className="ImageGalleryItem-image"
      onClick={() => {
        onImageClick(largeImageUrl, imgDescription);
      }}
      data-source={largeImageUrl}
    />
  );
}

ImageGalleryItem.propTypes = {
  smallImageUrl: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
  imgDescription: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
