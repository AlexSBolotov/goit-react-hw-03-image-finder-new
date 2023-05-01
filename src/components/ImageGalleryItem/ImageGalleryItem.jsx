import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ images, openModal }) {
  return images.map(({ id, webformatURL, largeImageURL }, idx) => (
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
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  openModal: PropTypes.func,
};
