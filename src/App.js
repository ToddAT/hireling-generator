import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';

import RetainerSummaryList from './components/ui/retainerList';
import RetainerMatrix from './components/ui/retainerMatrix';

import { generateRetainers } from './tools/retainerGenerator';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'count': props.count,
      'retainers': generateRetainers(props.count),
    };
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fifty Random Hirelings for Your OSR-Style Campaign World</h1>
        </header>
        <p className="App-intro">
          <a href="#rolls">The Rolls</a> list the basic index of the generated hirelings. For more details on each individual,
          check their <a href="#cv">curriculum vitae</a> below.
        </p>
        <div className="content-wrapper">
          <header className="section-header" id="rolls">The Rolls</header>
          <RetainerSummaryList population={ this.state.retainers } />

          <header className="section-header" id="cv">Curriculum Vitae</header>
          <RetainerMatrix population={ this.state.retainers } />
        </div>
        <footer className="App-footer">
          <p>
            A generator by <a href="http://hexed.press">Hexed Press</a>. Support us via <a href="https://www.patreon.com/hexedpress">Patreon</a>.
          </p>
        </footer>
      </div>
    );
  }
}

const propTypes = {
  'count': PropTypes.number.isRequired,
};

export default App;
