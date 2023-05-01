import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ images, openModal }) {
  return images.map(({ webformatURL, largeImageURL }, idx) => (
    <li key={idx} className={s.imageGalleryItem}>
      <img
        onClick={() => openModal(largeImageURL)}
        className={s.imageGalleryItemImage}
        src={webformatURL}
        alt={largeImageURL}
      />
    </li>
  ));
}
ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  openModal: PropTypes.func,
};
