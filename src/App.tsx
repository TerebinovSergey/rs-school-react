import { Component } from 'react';
import './App.css';
import NewsList from './components/news-list/NewsList.tsx';
import Search from './components/search/Search.tsx';

class App extends Component {
  state = {
    serachQuery: '',
  };

  onSearch = (serachQuery: string): void => {
    this.setState({ serachQuery });
    console.log(serachQuery);
  };

  render() {
    return (
      <>
        <Search onSubmit={this.onSearch} />
        <NewsList query={this.state.serachQuery} />
      </>
    );
  }
}

export default App;
