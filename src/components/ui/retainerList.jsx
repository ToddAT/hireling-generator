import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import ModalBox from './ModalBox';
import RetainerDetail from './retainerDetail';
import { logModal } from './../../tools/analytics';

import './../../assets/css/retainerList.css';
import { exportPlainTextDetails } from './../../tools/plainTextGenerator';

class RetainerSummaryList extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleModalContent = this.handleModalContent.bind(this);
    this.handleShowExport = this.handleShowExport.bind(this);

    this.state = {
      showModal: false,
      showExport: false,
      modalTitle: 'Curiculum Vitae',
      active: 0,
    };
  }

  handleShow(e) {
    let active = parseInt(e.currentTarget.getAttribute('data-key'));

    e.preventDefault();

    this.setState({ 'showModal': true, 'active': active });
    logModal('open_single');
    return false;
  }

  handleShowExport(e) {
    e.preventDefault();

    let show = !this.state.showExport,
        button = e.currentTarget,
        card = button.parentNod.querySelector('.retainer-details__card'),
        expTxt = button.parentNod.querySelector('.retainer-details__export');

    card.className = show ? card.className.replace('show', 'hide') : card.className.replace('hide', 'show');

    this.setState({ 'showExport': show });
    logModal('export_single');
    return false;
  }

  handleModalContent() {
    const r = this.props.population[this.state.active],
          content = (
            <RetainerDetail retainer={ r } />
          );

    ReactDOM.render(content, document.getElementById('modalBoxContent'));
  }

  handleHide() {
    this.setState({ showModal: false });
    logModal('close_single');
    return false;
  }

  render() {
  	const retainerListItems = this.props.population.map((r, i) =>
      <li className="retainer-list-item" key={ i } data-key={ i } onClick={ this.handleShow }>
        <strong className="retainer-list-item__name">{ r.name }</strong> the <em className="retainer-summary-list--item__occupation">{ r.occupation.Name }</em>
      </li>
    );

    return (
      <div class="retainer-summary">
        <h2 class="retainer-summary__header">Roll Call</h2>
        <p class="retainer-summary__intro">
          Click on a hireling to see their <em>Curiculum Vitae</em>.
        </p>
        <ul className="retainer-summary-list">
        	{ retainerListItems }
        </ul>

        <ModalBox title={ this.state.modalTitle } show={ this.state.showModal } onHide={ this.handleHide } onEnter={ this.handleModalContent } />
      </div>
    );
  }
}

const propTypes = {
  'population': PropTypes.array.isRequired,
};

export default RetainerSummaryList;