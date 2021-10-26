import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
// component import
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: '',
    };
  }

  // function to update App state on Form submit
  formSubmitHandler = newQuery => {
    this.setState({ searchQuery: newQuery });
  };

  render() {
    const {
      state: { searchQuery },
      formSubmitHandler,
    } = this;

    return (
      <>
        <Searchbar onSubmit={formSubmitHandler} />
        <ImageGallery query={searchQuery} />
        <ToastContainer autoClose={3000} position="top-right" />
      </>
    );
  }
}

export default App;
