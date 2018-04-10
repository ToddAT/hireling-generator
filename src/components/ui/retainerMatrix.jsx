import PropTypes from 'prop-types';
import React, { Component } from 'react';
import IndexCard from './indexCard';
import RetainerCard from './retainerCard';

import './../../assets/css/retainerMatrix.css';

class RetainerMatrix extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	const retainerMatrixItems = this.props.population.map((r, i) =>
      <li className="retainer-matrix__item" key={ i }>
        <IndexCard>
          <RetainerCard retainer={ r } />
        </IndexCard>
      </li>
    );

    return (
      <ul className="retainer-matrix">
      	{ retainerMatrixItems }
      </ul>
    );
  }
}

const propTypes = {
  'population': PropTypes.array.isRequired,
};

export default RetainerMatrix;