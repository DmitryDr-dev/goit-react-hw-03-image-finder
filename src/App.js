import { Component } from 'react';

// component import
import Searchbar from './components/Searchbar';

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
    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandler} />
      </>
    );
  }
}

export default App;
