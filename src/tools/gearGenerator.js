import { getRandomArbitrary } from './random.js';

const CLOTHES = require('./../data/clothes');
const ARMORS = require('./../data/armor');
const WEAPONS = require('./../data/weapons');
const GEAR = require('./../data/gear');

const flatten = function(arr, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
};

const getRandomArrayItem = (arr) => {
	return arr[getRandomArbitrary(0, (arr.length - 1))];
};

/*
 * parseEntryText Example:
 *	INPUT:  (String) 'one-hander+shield,two-hander|secondary'
 *	OUTPUT: (Nested Array)
 *		[
 *			[
 *				["one-hander", "shield"],
 *				["two-hander"]
 *			],
 *			[
 *				["secondary"]
 *			]
 *		]
 * 
 *	INUT: 'light,medium'
 *	OUTPUT:
 *		[
 *			[
 *				["light"],
 *				["medium"]
 *			]
 *		]
 *
*/
const parseEntryText = (entryText) => {
	var superEntries = entryText.split('|'),
		entriesList = [],
		subEntries, entry, subEntry;

	superEntries.map((sEntry) => {
		entry = sEntry.split(',');
	    subEntries = [];
	    
	    entry.map((sbEntry) =>
	    	subEntries.push(sbEntry.split('+'))
	    );
	    
	    entriesList.push(subEntries);
	});

	return entriesList;
};

/*
 * getRandomEntrySet Example:
 *	INPUT: (String) -> (Nested Array)
 *		[
 *			[
 *				["one-hander", "shield"],
 *				["two-hander"]
 *			],
 *			[
 *				["secondary"]
 *			]
 *		]
 * 
 *	INUT: (String) -> (Nested Array)
 *		[
 *			[
 *				["light"],
 *				["medium"]
 *			]
 *		]
 *
*/
const getRandomEntrySet = (entrySet) => {
	var entries = [], entry, subEntry;

	if(typeof entrySet === 'string') {
		entrySet = parseEntryText(entrySet);
	}

	entrySet.map((entry) => {
		if(entry.length < 2) {
			entries.push(entry[0]);
		} else {
			entries.push(getRandomArrayItem(entry));
		}
	});

	return entries;
};

const getRandomEntry = (entry, dataset) => {
	let output = [],
		temp = [],
		randomEntry, items, data, rnd;

	data = dataset.ALL? dataset.ALL : dataset;

	randomEntry = getRandomEntrySet(entry);

	randomEntry.map((n) => {
		items = fetchDataEntries(n, dataset);

		if(items.length < 2) {
			temp.push(items[0]);
		} else {
			temp.push(getRandomArrayItem(items));
		}
	});

	temp = flatten(temp);

	temp.map((t) => {
		output.push(drillDownEntries(t, dataset));
	});

	return output;
};

const fetchDataEntries = (entry, dataset) => {
	var data = dataset.ALL? dataset.ALL : dataset;

	return data[entry]? data[entry] : [ entry ];
};

const drillDownEntries = (entry, dataset) => {
	let output, data, rnd;

	data = dataset.ALL? dataset.ALL : dataset;

	if(data[entry]) {
		rnd = getRandomArrayItem(data[entry]);

		if(data[rnd]) {
			if(data[rnd].length > 1) {
				rnd = drillDownEntries(rnd, dataset);
			} else {
				return data[rnd][0];
			}
		}
		return rnd;
	} else {
		return entry;
	}
};

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

	var armorSet = getRandomEntry(occ.state.job.Armor, ARMORS);

	return armorSet.join(', ');
};

export const getWeapon = (occ) => {
	var weaponList = WEAPONS.ALL,
		weaponSet = [], finalWeaponSet = [],
		temp, type, weapons, weapon, len;

	if(!occ.state || !occ.state.job || !occ.state.job.Weapon) {
		type = 'simple';
	} else {
		type = occ.state.job.Weapon;
	}

	weaponSet = getRandomEntry(type, WEAPONS);

	return weaponSet.join(', ');
};

export const getGear = (occ) => {
	if(!occ.state || !occ.state.job || !occ.state.job.Gear) {
		return '';
	}

	var gearSet = getRandomEntry(occ.state.job.Gear, GEAR);

	return gearSet.join(', ');
};
