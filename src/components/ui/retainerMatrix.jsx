import PropTypes from 'prop-types';
import React, { Component } from 'react';
import IndexCard from './indexCard';
import AttributeTable from './attributeTable';

import './../../assets/css/retainerMatrix.css';

class RetainerMatrix extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	const retainerMatrixItems = this.props.population.map((r, i) =>
      <li className="retainer-matrix__item" key={ i }>
        <IndexCard>
          <header className="retainer-matrix__header">
            <strong>{ r.name }</strong> <em>the { r.occupation.Name }</em>
          </header>
          <div className={  'retainer-matrix__alignment retainer-matrix__alignment--' + r.alignment }>
            { r.alignment }
          </div>
          <AttributeTable
            str={ r.attributes.str }
            int={ r.attributes.int }
            wis={ r.attributes.wis }
            dex={ r.attributes.dex }
            con={ r.attributes.con }
            cha={ r.attributes.cha }
            hp ={ r.attributes.hp }
          />

          <p className="retainer-matrix__gear-list">
            <strong className="retainer-matrix__gear-list__header">Gear:</strong>
            { r.clothes }
            { r.armor !== '' ? ', ' + r.armor : ''  }
            { r.weapon !== '' ? ', ' + r.weapon : ''  }
            { r.gear !== '' ? ', ' + r.gear : ''  }
          </p>
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