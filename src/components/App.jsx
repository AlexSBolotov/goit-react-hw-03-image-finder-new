import s from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
// import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
// import getImages from 'helpers/cardsAPI';
import Modal from './Modal/Modal';
// import Loader from './Loader/Loader';
import { Component } from 'react';

export class App extends Component {
  state = {
    // images: [],
    searchQuery: '',
    page: 0,
    imageURL: '',
    showButton: false,
    showModal: false,
    // isLoading: false,
    // error: null,
  };

  openModal = largeImageURL => {
    this.setState({ showModal: true, imageURL: largeImageURL });
  };
  closeModal = () => {
    this.setState({ showModal: false, imageURL: '' });
  };
  setQuery = query => {
    this.setState({ page: 1, searchQuery: query });
  };
  setPage = page => {
    this.setState({ page: page });
  };

  render() {
    const { searchQuery, showModal, page, imageURL } = this.state;
    return (
      <div className={s.app}>
        <Searchbar setQuery={this.setQuery} />
        <ImageGallery
          query={searchQuery}
          page={page}
          setPage={this.setPage}
          openModal={this.openModal}
        />
        {showModal && (
          <Modal imageURL={imageURL} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}

// componentDidMount() {
//   this.setState({ images: [] });
// }
// async componentDidMount() {
//   this.setState({ isLoading: true });
//   const { searchQuery, page } = this.state;
//   try {
//     const response = await getImages(searchQuery, page);
//     this.setState({ images: [...response.hits] });
//   } catch (error) {
//     this.setState({ error });
//   } finally {
//     this.setState({ isLoading: false });
//   }
// }
// async componentDidUpdate(prevProps, prevState) {
//   if (prevState.page !== this.state.page) {
//     console.log(this.state.page);
//     this.setState({ isLoading: true });
//     const { searchQuery, page } = this.state;
//     try {
//       // this.setState({ isLoading: true });
//       const response = await getImages(searchQuery, page);
//       this.setState(prev => ({
//         images: [...prev.images, ...response.hits],
//         // page: prev.page + 1,
//       }));
//     } catch (error) {
//       this.setState({ error });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   }
// }
