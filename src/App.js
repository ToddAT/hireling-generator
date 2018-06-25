import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ButtonToolbar, ButtonGroup, DropdownButton, MenuItem, Button, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import ModalBox from './components/ui/ModalBox';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';

import RetainerSummaryList from './components/ui/retainerList';
import RetainerCarousel from './components/ui/retainerCarousel';

import { generateRetainers } from './tools/retainerGenerator';
import { exportPlainTextSimple, exportPlainTextDetails } from './tools/plainTextGenerator';

import { generateRandomTableEntry } from './tools/tableParser';
import { logEvent } from './tools/analytics';

class App extends Component {
  constructor(props) {
    super(props);

    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.updatePopCount = this.updatePopCount.bind(this);
    this.repopRetainers = this.repopRetainers.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
    this.handleModalContent = this.handleModalContent.bind(this);
    this.copyModalContent = this.copyModalContent.bind(this);

    this.state = {
      'count': props.count,
      'showModal': false,
      'modalTitle': 'Export These Hirelings!',
      'retainers': generateRetainers(props.count),
    };
  }

  copyToClipboard(e) {
    e.preventDefault();

    let textArea = document.getElementById('retainersPlainText');
    textArea.value = this.retainersPlainText();
    textArea.select();
     
    document.execCommand('copy');
  }

  updatePopCount(e) {
    e.preventDefault();
    let count = parseInt(e.target.getAttribute('data-key'));

    this.setState({'count': count});
    this.repopRetainers(e, count);
  }

  repopRetainers(e, count = this.state.count) {
    e.preventDefault();
    logEvent('repop', {'count': count});
    this.setState({'retainers': generateRetainers(count)});
  }

  handleShowModal(e) {
    e.preventDefault();

    this.setState({ 'showModal': true });
    logEvent('modal', {'action': 'show', 'type': 'export-multi'});
    return false;
  }

  handleModalContent() {
    let content = (
      <textarea id="retainersPlainText" className="retainer-export-text">
        { this.retainersPlainText() }
      </textarea>
    ), textArea;

    ReactDOM.render(content, document.getElementById('modalBoxContent'));
    logEvent('modal', {'action': 'open', 'type': 'export-multi'});
  }

  copyModalContent() {
    let textArea = document.getElementById('retainersPlainText'),
        message = document.createElement('p');
    textArea.select();

    message.className = 'modal-body__message';
     
    if(document.execCommand('copy')) {
      message.className += ' modal-body__message--success';
      message.innerText = 'Hirelings copied to your clipboard!';
    } else {
      message.className += ' modal-body__message--failure';
      message.innerText = 'Use CTRL+C/Command+C to copy the hirelings to your clipboard.';
    }

    textArea.parentNode.appendChild(message);
    logEvent('modal', {'action': 'copy', 'type': 'export-multi'});
  }

  handleHideModal() {
    this.setState({ showModal: false });
    logEvent('modal', {'action': 'hide', 'type': 'export-multi'});
    return false;
  }

  retainersPlainText() {
    let txtList = '', txtDetails = '';

    this.state.retainers.map((r) => {
      txtList += exportPlainTextSimple(r) + '\r\n';
      txtDetails += exportPlainTextDetails(r)  + '\r\n\r\n';
    });

    return txtList + '\r\n---\r\n\r\n' + txtDetails;
  }

  render() {
    //console.log('test', generateRandomTableEntry('hirelings.start'));

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fifty Random Hirelings for Your OSR-Style Campaign World</h1>
        </header>

        <ButtonToolbar>
          <ButtonGroup>
            <DropdownButton title="Recruit More Hirelings">
              <MenuItem eventKey="1" data-key="50" onClick={ this.updatePopCount }>Fifty</MenuItem>
              <MenuItem eventKey="2" data-key="25" onClick={ this.updatePopCount }>Twenty-Five</MenuItem>
              <MenuItem eventKey="3" data-key="10" onClick={ this.updatePopCount }>Ten</MenuItem>
              <MenuItem eventKey="4" data-key="5" onClick={ this.updatePopCount }>Five</MenuItem>
            </DropdownButton>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={ this.handleShowModal }>
              Copy These Hirelings to Clipboard
            </Button>
          </ButtonGroup>
        </ButtonToolbar>

        <div className="content-wrapper">
          <RetainerSummaryList population={ this.state.retainers } />

          <ModalBox 
            title={ this.state.modalTitle }
            show={ this.state.showModal }
            onHide={ this.handleHideModal }
            onEnter={ this.handleModalContent }
            onEntered={ this.copyModalContent }
          />
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
