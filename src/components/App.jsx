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

  // getSnapshotBeforeUpdate() {
  //   console.log(document.body.clientHeight);
  //   return document.body.clientHeight + 1200;
  // }

  async componentDidUpdate(_, prevState, snapshot) {
    const { searchQuery, page } = this.state;
    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      console.log(this.state.page);

      if (prevState.searchQuery !== searchQuery) {
        this.setState({ images: [], page: 1 });
      }
      this.setState({ isLoading: true });
      try {
        const response = await getImages(searchQuery, page);
        this.setState(prev => ({
          images: [...prev.images, ...response.hits],
        }));
        // window.scrollTo({
        //   top: snapshot,
        //   behavior: 'smooth',
        // });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  openModal = largeImageURL => {
    this.setState({ showModal: true, imageURL: largeImageURL });
  };
  closeModal = () => {
    this.setState({ showModal: false, imageURL: '' });
  };
  setQuery = query => {
    this.setState({ page: 1, searchQuery: query });
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
