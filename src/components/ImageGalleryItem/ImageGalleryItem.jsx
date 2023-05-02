import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ image, openModal }) {
  const { webformatURL, largeImageURL } = image;
  return (
    <li className={s.imageGalleryItem}>
      <img
        onClick={() => openModal(largeImageURL)}
        className={s.imageGalleryItemImage}
        src={webformatURL}
        alt={largeImageURL}
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),

  openModal: PropTypes.func,
};
