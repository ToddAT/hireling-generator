import PropTypes from 'prop-types';
import React, { Component } from 'react';
import IndexCard from './indexCard';
import AttributeTable from './attributeTable';

import './../../assets/css/retainerCard.css';

class RetainerCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const r = this.props.retainer;

    return (
      <div className={ this.props.size ? 'retainer-card retainer-card--large' : 'retainer-card' }>
        <header className="retainer-card__header">
          <strong>{ r.name }</strong> <em>the { r.occupation.Name }</em>
        </header>
        <div className={  'retainer-card__alignment retainer-card__alignment--' + r.alignment }>
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

        <p className="retainer-card__gear-list">
          <strong className="retainer-card__gear-list__header">Gear:</strong>
          { r.clothes }
          { r.armor !== '' ? ', ' + r.armor : ''  }
          { r.weapon !== '' ? ', ' + r.weapon : ''  }
          { r.gear !== '' ? ', ' + r.gear : ''  }
        </p>
      </div>
    );
  }
}

const propTypes = {
  'retainer': PropTypes.object.isRequired,
};

export default RetainerCard;