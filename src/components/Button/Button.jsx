import s from './Button.module.css';
import PropTypes from 'prop-types';
export default function Button({ loadMore }) {
  return (
    <button onClick={loadMore} type="button" className={s.button}>
      Load More
    </button>
  );
}
Button.propTypes = {
  loadMore: PropTypes.func,
};
