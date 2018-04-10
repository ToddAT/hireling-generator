import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import './../../assets/css/modalBox.css';

class ModalBox extends Modal {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    return (
      <Modal
        {...this.props}
        bsSize="large"
      >
        <Modal.Header closeButton>
          {this.props.title &&
            <h1 class="modal-header__title">
              { this.props.title }
            </h1>
          }
        </Modal.Header>
        <Modal.Body id="modalBoxContent">
          { this.props.children }
        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalBox;