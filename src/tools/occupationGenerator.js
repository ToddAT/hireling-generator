import { getRandomArbitrary, d100 } from './random.js';

const OCCUPATIONS = require('./../data/occupations');
const UNSKILLEDOCCUPATIONS = require('./../data/unskilled-occupations');
const SKILLEDOCCUPATIONS = require('./../data/skilled-occupations');
const SPECOCCUPATIONS = require('./../data/specialist-occupations');
const MERCS = require('./../data/mercenaries');
const HENCHMEN = require('./../data/henchmen');
const CRAFTSMEN = require('./../data/craftsmen');

const getOccupationPool = (occupations = OCCUPATIONS.ALL) => {
  let rand = d100(1);

    if(rand <= OCCUPATIONS.ALL.unskilled) {
      return UNSKILLEDOCCUPATIONS.ALL;
    } else if(rand <= OCCUPATIONS.ALL.skilled) {
      return SKILLEDOCCUPATIONS.ALL;
    } else {
      return SPECOCCUPATIONS.ALL;
    }
};

const getRandomOccupation = (list) => {
  let occupations = list.ALL? list.ALL : list,
    len = occupations.length,
    rand = getRandomArbitrary(0, (len - 1)),
    job = occupations[rand];

  return job;
};

export const generateOccupation = (occupations = OCCUPATIONS.ALL) => {
  let pool = getOccupationPool(occupations),
      occupation = getRandomOccupation(pool),
      wealth;

  if(occupation.Special) {
    switch(occupation.Special) {
      case 'merc':
        occupation = getRandomOccupation(MERCS);
        break;
      case 'henchman':
        occupation = getRandomOccupation(HENCHMEN);
        break;
      case 'craft':
        occupation = getRandomOccupation(CRAFTSMEN);
        break;
      default:
        break;
    }
  }

  occupation.Wealth = parseInt(occupation.Wealth);

  return occupation;
};
