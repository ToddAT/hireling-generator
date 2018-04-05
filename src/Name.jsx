import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getRandomArbitrary } from './tools/random.js';

const WORDS = require('./data/name-words');

const TRANSFORMS = [
  ['dst', 'st'],
  ['fv', 'v'],
  ['gng', 'ng'],
  ['hh', 'h'],
  ['hl', 'h'],
  ['lbeo', 'lebo'],
  ['lror', 'lor'],
  ['mbg', 'mg'],
  ['mhr', 'mr'],
  ['mrk', 'mark'],
  ['ndb', 'nb'],
  ['nnrr|nnr|nrr', 'nr'],
  ['nanu', 'nau'],
  ['nh', 'nn'],
  ['nng', 'ng'],
  ['nrk', 'nk'],
  ['hl', 'h'],
  ['ltg', 'lg'],
  ['rhr', 'ror'],
  ['rleo', 'erlo'],
  ['sll', 'll'],
  ['slgn', 'slagun'],
  ['thg', 'thig'],
  ['^oh', 'ho'],
  ['agn$', 'ang'],
  ['dd$', 'd'],
  ['ah$', 'a'],
  ['mb$', 'mba'],
  ['nn$', 'n'],
  ['oh$', 'o'],
  ['rn$', 'ron'],
  ['sl$', 'sol'],
  ['unr$', 'urn'],
  ['nnn', 'nn'],
  ['rrr', 'rr'],
];

class Name extends Component {
  constructor(props) {
    super(props);

    var segs = 2,
        gender = 'male',
    	  name = [],
        names = [];

    if(props) {
    	segs = props.segments ? props.segments : 2;
      gender = props.gender ? props.gender : gender;
    }

    for(var i=0; i<segs; i++) {
    	names.push(this._getNameSegment());
    }

    name = names.map((segment) => {
      return segment.Syllable;
    }).join('');

    name = this._transformName(name);

    console.log('Name', name);

    this.state = {
      'name': (name.charAt(0).toUpperCase() + name.slice(1))
    };
  }

  _getNameSegment() {
  	var words = WORDS.ALL,
  		len = words.length,
  		rand = getRandomArbitrary(0, (len - 1));

	  console.log(words[rand]);
  	return words[rand];
  }

  _transformName(name) {
    for(var i=0; i < TRANSFORMS.length; i++) {
      var reg = new RegExp(TRANSFORMS[i][0]);
      name = name.replace(reg, TRANSFORMS[i][1]);
    }

    return name;
  }

  render() {
    return (
      <React.Fragment>
        { this.state.name }
      </React.Fragment>
    );
  }
}

export default Name;
