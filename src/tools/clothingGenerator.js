import { getRandomArbitrary } from './random.js';

const CLOTHES = require('./../data/clothes');

export const getClothes = (wealth = 0) => {
	var clothes = CLOTHES.ALL,
		min = 0;

	if(!Number.isInteger(wealth)) {
		return clothes[0];
	}

	return clothes[getRandomArbitrary(Math.round(wealth/2) - 1, (wealth - 1))];
};
