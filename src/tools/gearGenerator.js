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
		armorSet = [],
		len;

	occ.state.job.Armor.split('|').map((armorOptions) => {
		var armors = [];

		armorOptions.split(',').map((arm) =>
			armors = armors.concat(armorList[arm])
		);

		len = armors.length;
		armorSet.push(armors[getRandomArbitrary(0, len - 1)]);
	});

	return armorSet.join(', ');
};

export const getWeapon = (occ) => {
	var weaponList = WEAPONS.ALL,
		weaponSet = [], finalWeaponSet = [],
		type, weapons, len;

	if(!occ.state || !occ.state.job || !occ.state.job.Weapon) {
		type = 'simple';
	} else {
		type = occ.state.job.Weapon;
	}

	type.split('|').map((weaponOptions) => {
		var weapons = [];

		weaponOptions.split(',').map((arm) =>
			weapons = weapons.concat(weaponList[arm])
		);

		len = weapons.length;
		weaponSet.push(weapons[getRandomArbitrary(0, len - 1)]);
	});

	finalWeaponSet = weaponSet.map((w) => {
		if(typeof weaponList[w] !== 'undefined') {
			return weaponList[w][getRandomArbitrary(0, weaponList[w].length - 1)];
		} else {
			return w;
		}
	});


	return finalWeaponSet.join(', ');
};

/*
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
*/
