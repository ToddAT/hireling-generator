import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './../../assets/css/retainerList.css';

class RetainerSummaryList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	const retainerListItems = this.props.population.map((r, i) =>
      <li className="retainer-summary-list--item" key={ i }>
        <strong className="retainer-summary-list--item__name">{ r.name }</strong> the <em className="retainer-summary-list--item__occupation">{ r.occupation.Name }</em>
      </li>
    );

    return (
      <ul className="retainer-summary-list">
      	{ retainerListItems }
      </ul>
    );
  }
}

const propTypes = {
  'population': PropTypes.array.isRequired,
};

export default RetainerSummaryList;