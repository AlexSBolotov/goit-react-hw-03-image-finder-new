import s from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import getImages from 'helpers/cardsAPI';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { Component } from 'react';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 0,
    imageURL: '',
    showButton: false,
    showModal: false,
    isLoading: false,
    error: null,
  };

  getSnapshotBeforeUpdate() {
    return document.body.clientHeight - 286;
  }

  async componentDidUpdate(_, prevState, snapshot) {
    const { searchQuery, page, images } = this.state;
    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      this.setState({ isLoading: true });
      try {
        const response = await getImages(searchQuery, page);
        this.setState(prev => ({
          images: [...prev.images, ...response.hits],
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
    if (prevState.images !== images && page !== 1) {
      window.scrollTo({
        top: snapshot,
        behavior: 'smooth',
      });
    }
  }

  openModal = largeImageURL => {
    this.setState({ showModal: true, imageURL: largeImageURL });
  };
  closeModal = () => {
    this.setState({ showModal: false, imageURL: '' });
  };
  setQuery = query => {
    this.setState({ page: 1, searchQuery: query, images: [] });
  };
  setPage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { images, showModal, imageURL, error, isLoading } = this.state;
    return (
      <div className={s.app}>
        <Searchbar setQuery={this.setQuery} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {images.length >= 12 &&
          (isLoading ? <Loader /> : <Button loadMore={this.setPage} />)}

        {showModal && (
          <Modal imageURL={imageURL} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
