import { getRandomEntry } from './dataInterfaces.js';

const ARMORS = require('./../data/armor');

export const getArmor = (occupation) => {
	if(!occupation.Armor) {
		return '';
	}

	var armorSet = getRandomEntry(occupation.Armor, ARMORS);

	return armorSet.join(', ');
};
