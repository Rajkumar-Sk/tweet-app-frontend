
import './App.css';
import './bootstrap.css';
import './components/js/TweetApp';
import React,{ Component } from 'react';
import TweetApp from './components/js/TweetApp';



class App extends Component {
  render() {
    return (
      <div className="App">
        <TweetApp></TweetApp>
      </div>
    );
  }
}

export default App;
