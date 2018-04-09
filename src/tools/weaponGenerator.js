import { getRandomEntry } from './dataInterfaces.js';

const WEAPONS = require('./../data/weapons');

export const getWeapon = (occupation) => {
	var weaponList = WEAPONS.ALL,
		weaponSet = [], finalWeaponSet = [],
		temp, type, weapons, weapon, len;

	if(!occupation.Weapon) {
		type = 'simple';
	} else {
		type = occupation.Weapon;
	}

	weaponSet = getRandomEntry(type, WEAPONS);

	return weaponSet.join(', ');
};
