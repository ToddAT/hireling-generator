import { getRandomArbitrary } from './random.js';

const WORDS = require('../data/name-words');

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

const getNameSegment = (words = WORDS.ALL) => {
  var len = words.length,
      rand = getRandomArbitrary(0, (len - 1));

  return words[rand];
}

const transformName = (name, transforms = TRANSFORMS) => {
  let reg;

  transforms.map((t) => {
    reg = new RegExp(t[0]);
    name = name.replace(reg, t[1]);
  });

  return name;
}

export const generateName = (gender = 'male', segments = 2, words = WORDS) => {
  let names = [], name;

  for(var i=0; i<segments; i++) {
    names.push(getNameSegment());
  }

  name = names.map((segment) => {
    return segment.Syllable;
  }).join('');

  name = transformName(name);

  return name.charAt(0).toUpperCase() + name.slice(1)
};
