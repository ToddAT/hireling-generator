import React, { Component } from 'react';
import { getRandomArbitrary } from './tools/random.js';

const OCCUPATIONS = require('./data/occupations');
const UNSKILLEDOCCUPATIONS = require('./data/unskilled-occupations');
const SKILLEDOCCUPATIONS = require('./data/skilled-occupations');
const SPECOCCUPATIONS = require('./data/specialist-occupations');
const MERCS = require('./data/mercenaries');
const HENCHMEN = require('./data/henchmen');
const CRAFTSMEN = require('./data/craftsmen');

class Occupation extends Component {
  constructor(props) {
    super(props);

    var rand = getRandomArbitrary(1, 100),
    	gear = [],
    	job, wealth, clothes;

    if(rand <= OCCUPATIONS.ALL.unskilled) {
    	job = this._getRandomOccupation(UNSKILLEDOCCUPATIONS);
    } else if(rand <= OCCUPATIONS.ALL.skilled) {
    	job = this._getRandomOccupation(SKILLEDOCCUPATIONS);
    } else {
    	job = this._getRandomOccupation(SPECOCCUPATIONS);
    }
    
    if (job.Special == 'merc') {
    	job = this._getMercOccupation();
    } else if (job.Special == 'henchman') {
    	job = this._getHenchmanClass();
    } else if (job.Special == 'craft') {
    	job = this._getCraftsmanClass();
    }

    wealth = parseInt(job.Wealth);

    this.state = {
      'job': job,
      'wealth': wealth,
    };
    
  }

  _getRandomOccupation(list) {
  	var occupations = list.ALL,
  		len = occupations.length,
  		rand = getRandomArbitrary(0, (len - 1)),
  		job = occupations[rand];

  	return job;
  }

  _getMercOccupation() {
  	return this._getRandomOccupation(MERCS);
  }

  _getHenchmanClass() {
  	return this._getRandomOccupation(HENCHMEN);
  }

  _getCraftsmanClass() {
  	return this._getRandomOccupation(CRAFTSMEN);
  }

  render() {
    return (
      <React.Fragment>
        { this.state.job.name }
      </React.Fragment>
    );
  }
}

export default Occupation;