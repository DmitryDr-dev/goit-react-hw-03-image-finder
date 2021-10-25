import { Component } from 'react';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
    };
  }

  // function to track changes on input
  handleInputChange = e => {
    this.setState({
      query: e.currentTarget.value,
    });
  };

  // function to submit form
  handleFormSubmit = e => {
    e.preventDefault();

    const {
      state: { query },
      props,
      clearState,
    } = this;

    if (query.trim() === '') {
      return alert('Please enter the search query!');
    }

    props.onSubmit(query);

    clearState();
  };

  // function to clear state
  clearState = () => {
    this.setState({
      query: '',
    });
  };

  render() {
    const {
      state: { query },
      handleInputChange,
      handleFormSubmit,
    } = this;

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleFormSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
