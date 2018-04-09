import React, { Component } from 'react';

import indexCard from './../../assets/img/index-card.png';
import './../../assets/css/indexCard.css';

class IndexCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="index-card">
        <div className="index-card__content">
      	 { this.props.children }
        </div>
      </div>
    );
  }
}

export default IndexCard;