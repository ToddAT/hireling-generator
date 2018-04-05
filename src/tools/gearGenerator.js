import { getRandomArbitrary } from './random.js';

const CLOTHES = require('./../data/clothes');
const ARMORS = require('./../data/armor');
const WEAPONS = require('./../data/weapons');

export const getClothes = (n) => {
	var clothes = CLOTHES.ALL,
		min = 0;

	if(!Number.isInteger(n)) {
		return clothes[0];
	}

	return clothes[getRandomArbitrary(Math.round(n/2) - 1, (n - 1))];
};

export const getArmor = (occ) => {
	if(!occ.state || !occ.state.job || !occ.state.job.Armor) {
		return '';
	}

	var armorList = ARMORS.ALL,
		armors = armorList[occ.state.job.Armor],
		len = armors.length;

	return armors[getRandomArbitrary(0, len - 1)];
};

export const getWeapon = (occ) => {
	var weaponList = WEAPONS.ALL,
		type, weapons, len;

	if(!occ.state || !occ.state.job || !occ.state.job.Weapon) {
		type = 'simple';
	} else {
		type = occ.state.job.Weapon;
	}

	weapons = weaponList[type] ? weaponList[type] : weaponList['simple'];
	len = weapons.length;
	
	return weapons[getRandomArbitrary(0, len - 1)];
};