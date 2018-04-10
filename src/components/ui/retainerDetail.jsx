import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import IndexCard from './indexCard';
import RetainerCard from './retainerCard';

import './../../assets/css/retainerDetail.css';

import { exportPlainTextDetails } from './../../tools/plainTextGenerator';

const labelShowExport = 'Export this Hireling!';
const labelHideExport = 'Finished';

class RetainerDetail extends Component {
  constructor(props) {
    super(props);

    this.handleShowExport = this.handleShowExport.bind(this);

    this.state = {
      showExport: false,
      btnLabel: labelShowExport,
      content: this.generateDetailContent(false),
    };
  }

  generateDetailContent(show = this.state.showExport) {
    const r = this.props.retainer;

    return show ? (
      <div className="retainer-details__export">
        <textarea className="retainer-export__text }">
          { exportPlainTextDetails(r) }
        </textarea>
        <p className="retainer-export__info">
          Copy the hireling's character to your clipboard.
        </p>
      </div>
    ) : (
      <div className="retainer-details__card }">
        <IndexCard>
          <RetainerCard retainer={ r } size="large" />
        </IndexCard>
      </div>
    );
  }

  handleShowExport(e) {
    e.preventDefault();

    let show = !this.state.showExport;

    this.setState({
      'showExport': show,
      'btnLabel': show ? labelHideExport : labelShowExport,
      'content': this.generateDetailContent(show),
    });
  }

  render() {
    return (
      <div className="retainer-details">
        { this.state.content }
        <div className="retainer-details__button">
          <Button onClick={ this.handleShowExport }>{ this.state.btnLabel }</Button>
        </div>
      </div>
    );
  }
}

const propTypes = {
  'retainer': PropTypes.object.isRequired,
};

export default RetainerDetail;