import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Name from './Name';
import Occupation from './Occupation';
import { d4, d6, tossCoin } from './tools/random.js';
import { getClothes, getArmor, getWeapon } from './tools/gearGenerator.js';

class Retainer extends Component {
  constructor(props) {
    super(props);

    var gender = tossCoin() ? 'male' : 'female',
    	name = new Name({ 'gender': gender }),
    	occupation = new Occupation(),
    	wealth = parseInt(occupation.state.wealth),
    	armor, weapon, alignment;

    if(wealth > 0) {
    	wealth += (d4(1) - 1);
    }

    armor = getArmor(occupation);
    weapon = getWeapon(occupation);
    alignment = this._generateAlignment();

    this.state = {
      'name': name.state.name,
      'str': d6(3),
      'int': d6(3),
      'wis': d6(3),
      'dex': d6(3),
      'con': d6(3),
      'cha': d6(3),
      'hp' : d6(1),
      'occupation': occupation,
      'gender': gender,
      'wealth': wealth,
      'clothes': getClothes(wealth),
      'armor': armor,
      'weapon': weapon,
      'alignment': alignment,
    };
  }

  _generateAlignment() {
    var rnd = d6(1);

    switch(rnd) {
      case 1:
      case 2:
        return 'chaotic';
        break;
      case 3:
      case 4:
        return 'neutral';
        break;
      case 5:
      case 6:
        return 'lawful';
        break;
    }
  }

  render() {
    return (
      <span className="retainer">
      	<strong>{ this.state.name }</strong> the { this.state.occupation.state.job.Name },
      	STR: { this.state.str },
      	INT: { this.state.int },
      	WIS: { this.state.wis },
      	DEX: { this.state.dex },
      	CON: { this.state.con },
      	CHA: { this.state.cha },
      	HP: { this.state.hp },
      </span>
    );
  }
}


export default Retainer;