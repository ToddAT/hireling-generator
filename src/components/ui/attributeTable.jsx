import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './../../assets/css/attributeTable.css';

class AttributeTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="attribute-table">
        <thead className="attribute-table__head">
          <tr className="attribute-table__head__row">
            <th className="attribute-table__head__head-cell">STR</th>
            <th className="attribute-table__head__head-cell">INT</th>
            <th className="attribute-table__head__head-cell">WIS</th>
            <th className="attribute-table__head__head-cell">DEX</th>
            <th className="attribute-table__head__head-cell">CON</th>
            <th className="attribute-table__head__head-cell">CHA</th>
            <th className="attribute-table__head__head-cell">HEALTH</th>
          </tr>
        </thead>
        <tbody className="attribute-table__body">
          <tr className="attribute-table__body__row">
            <td className="attribute-table__body__cell">{ this.props.str }</td>
            <td className="attribute-table__body__cell">{ this.props.int }</td>
            <td className="attribute-table__body__cell">{ this.props.wis }</td>
            <td className="attribute-table__body__cell">{ this.props.dex }</td>
            <td className="attribute-table__body__cell">{ this.props.con }</td>
            <td className="attribute-table__body__cell">{ this.props.cha }</td>
            <td className="attribute-table__body__cell">{ this.props.hp }</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const propTypes = {
  'str': PropTypes.number.isRequired,
  'int': PropTypes.number.isRequired,
  'wis': PropTypes.number.isRequired,
  'dex': PropTypes.number.isRequired,
  'con': PropTypes.number.isRequired,
  'cha': PropTypes.number.isRequired,
  'hp' : PropTypes.number.isRequired,
};

export default AttributeTable;
