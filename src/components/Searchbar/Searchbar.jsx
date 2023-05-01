import s from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  setQuery = e => {
    this.setState({
      query: e.currentTarget.value,
    });
  };
  onFormSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      return;
    }
    this.props.setQuery(this.state.query.trim().toLowerCase());
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={s.searchbar}>
        <form onSubmit={this.onFormSubmit} className={s.searchForm}>
          <button type="submit" className={s.searchFormButton}>
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.searchFormInput}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.setQuery}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  setQuery: PropTypes.func,
};
