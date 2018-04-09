import { getRandomArbitrary } from './random.js';

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

export const getRandomEntry = (entry, dataset) => {
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
