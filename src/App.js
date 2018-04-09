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

    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.updatePopCount = this.updatePopCount.bind(this);
    this.repopRetainers = this.repopRetainers.bind(this);

    this.state = {
      'count': props.count,
      'retainers': generateRetainers(props.count),
    };
  }

  copyToClipboard(e) {
    e.preventDefault();

    let textArea = document.getElementById('retainersPlainText');
    textArea.select();
     
    document.execCommand('copy');
  }

  updatePopCount(e) {
    e.preventDefault();
    this.setState({'count': e.target.value});
    this.repopRetainers(e);
  }

  repopRetainers(e) {
    e.preventDefault();
    this.setState({'retainers': generateRetainers(this.state.count)});
  }

  render() {
    const retainersPlainText = () => {
      let txt = '';

      this.state.retainers.map((r) =>
        txt += r.name + ' the ' + r.occupation.Name + '\r\n'
      );

      return txt;
    };

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fifty Random Hirelings for Your OSR-Style Campaign World</h1>
        </header>

        <select onChange={ this.updatePopCount }>
          <option value="50">Fifty Hirelings</option>
          <option value="25">Twenty-Five Hirelings</option>
          <option value="10">Ten Hirelings</option>
          <option value="5">Five Hirelings</option>
        </select>

        <button onClick={ this.repopRetainers }>
          Get a New Batch of Hirelings
        </button>

        <button onClick={ this.copyToClipboard }>
          Copy These Hirelings to Clipboard
        </button>

        <p className="App-intro">
          <a href="#rolls">The Rolls</a> list the basic index of the generated hirelings. For more details on each individual,
          check their <a href="#cv">curriculum vitae</a> below.
        </p>
        <div className="content-wrapper">
          <header className="section-header" id="rolls">The Rolls</header>
          <RetainerSummaryList population={ this.state.retainers } />

          <textarea id="retainersPlainText">
            { retainersPlainText() }
          </textarea>

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
