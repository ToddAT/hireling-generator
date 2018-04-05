import PropTypes from 'prop-types';
import React, { Component } from 'react';
import indexCard from './assets/img/index-card.png';
import './assets/css/retainerList.css';
import Paper from 'material-ui/Paper';
import Retainer from './Retainer';

const STYLES = {
  chip: {
    display: 'inline-block',
    margin: 4,
  },
  paper: {
    height: 150,
    width: 300,
    margin: 20,
    background: "url('./img/index-card.png')",
    display: 'inline-block',
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    'vertical-align': 'middle',
  },
};

class RetainerList extends Component {
  constructor(props) {
    super(props);

    var retainers = [];

    for(var i=0; i < props.count; i++) {
      retainers.push(new Retainer());
    }

    this.state = {
      'retainers': retainers,
    };
  }

  render() {
    /*
    const retainerListItems = this.state.retainers.map(function(retainer) {
      <li>{ retainer.render() }</li>
    });
  */
    //console.log(retainerListItems);
    /*
    return (
      "ul",
      {
        className: "retainerListBlock"
      },
        this.state.retainers.map(function(retainer, index) {
            return (
              React.createElement(
                "li",
                {
                  className: "retainerListItem",
                  key: index,
                },
                retainer.state.Name
              )
            );
        })
    );
    */

    const retainerListSummaryItems = this.state.retainers.map((r, i) =>
      <li className="retainer-summary-item" key={ i }>
        <strong>{ r.state.name }</strong> <em>the { r.state.occupation.state.job.Name }</em>
      </li>
    );

    const retainerListItems = this.state.retainers.map((r, i) =>
      <li className="index-card-holder" key={ i }>
        <div class="index-card">
          <header className="hireling-name"><strong>{ r.state.name }</strong> <em>the { r.state.occupation.state.job.Name }</em></header>
          <table className="attribute-list-table">
            <thead>
              <tr>
                <th className="attribute-list-header">STR</th>
                <th className="attribute-list-header">INT</th>
                <th className="attribute-list-header">WIS</th>
                <th className="attribute-list-header">DEX</th>
                <th className="attribute-list-header">CON</th>
                <th className="attribute-list-header">CHA</th>
                <th className="attribute-list-header">HEALTH</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="attribute-list-item">{ r.state.str }</td>
                <td className="attribute-list-item">{ r.state.int }</td>
                <td className="attribute-list-item">{ r.state.wis }</td>
                <td className="attribute-list-item">{ r.state.dex }</td>
                <td className="attribute-list-item">{ r.state.con }</td>
                <td className="attribute-list-item">{ r.state.cha }</td>
                <td className="attribute-list-item">{ r.state.hp }</td>
              </tr>
            </tbody>
          </table>

          <p className="gear-list">
            <strong className="gear-list-head">Gear:</strong>
            { r.state.clothes }
            { r.state.armor !== '' ? ', ' + r.state.armor : ''  }
            { r.state.weapon !== '' ? ', ' + r.state.weapon : ''  }
          </p>
        </div>
      </li>
    );

    return (
      <div>
        <header className="section-header" id="rolls">The Rolls</header>
        <ul className="retainer-list-summary">
          { retainerListSummaryItems }
        </ul>

        <header className="section-header" id="cv">Curriculum Vitae</header>
        <ul className="retainer-list">
          { retainerListItems }
        </ul>
      </div>
    );
  }
}

const propTypes = {
  'count': PropTypes.number.isRequired,
};


export default RetainerList;