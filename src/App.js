import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';

import Name from './Name';
import RetainerList from './RetainerList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <header className="App-header">
            <h1 className="App-title">Fifty Random Hirelings for Your OSR-Style Campaign World</h1>
          </header>
          <p className="App-intro">
            <a href="#rolls">The Rolls</a> list the basic index of the generated hirelings. For more details on each individual,
            check their <a href="#cv">curriculum vitae</a> below.
          </p>
          <div className="content-wrapper">
            <RetainerList count="50" />
          </div>
          <footer className="App-footer">
            <p>
              A generator by <a href="http://hexed.press">Hexed Press</a>. Support us via <a href="https://www.patreon.com/hexedpress">Patreon</a>.
            </p>
          </footer>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
