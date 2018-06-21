import * as dice from './dice'
import tables from '../data/tables/index'

const getRandomTableEntry = (table) => {
	let len = table.length,
    	rnd;

	if(len < 1) {
		return '';
	}

	if(len < 2) {
		return table[0];
	}

    rnd = dice.getRandomInt(len);
    return table[rnd];
}

const getTable = (id) => {
	let ids = id.toLowerCase().split('.'),
		outerTable = null, innerTable = null;

	outerTable = tables[ids[0]];

	if(outerTable && ids[1]) {
		innerTable = ids[1];

		if(outerTable[innerTable]) {
			return outerTable[innerTable];
		} 
		/*
		else {
			tables.map((t) => {
				if(t[innerTable]) {
					console.log('Guessing table...', id);
					return t[innerTable];
				}
			});
		}
		*/
	}

	console.log('Could not find table...', id);
	return null;
}

const parseTableEntry = (entry, tableID) => {
	let rgxTableCall = /(?:\[)([^\[\]]+)(?:\])/g,
		newEntry = entry, rgx, table;

	while ((rgx = rgxTableCall.exec(entry)) !== null) {
		let match = rgx[1],
			tableName = match.toLowerCase(),
			parsedSubEntry = '', subEntry;

		if(dice.isDiceOrRange(tableName)) {
			parsedSubEntry = dice.roll(tableName);
			console.log('parsing table, found dice entry...', tableName, parsedSubEntry);
		} else {
			if(tableName.indexOf('.') < 0) {
				tableName = tableID + '.' + tableName;
			} else {
				tableID = tableName.split('.')[0];
			}

			table = getTable(tableName);

			if(table) {
				subEntry = getRandomTableEntry(getTable(tableName));
				parsedSubEntry = parseTableEntry(subEntry, tableID);
			}
		}

		newEntry = newEntry.replace('[' + match + ']', parsedSubEntry);
	}

	return newEntry;
}


/*
	{feature:canyon}
	{distance:1000}
	{feature}
	{gender:male}
	{gender:female;class:fighter}
	{art|feature}
	{name?Widdershins}

*/
const parseEntry = (raw, output = { 'meta': {}, 'description': '' }) => {
	let patternMeta = /\{{1}([^\{\}]+)\}{1}/g,
		final = raw, rgx;

	if(!output.meta) {
		output.meta = {};
	}

	if(!output.description) {
		output.description = '';
	}

	while ((rgx = patternMeta.exec(raw)) !== null) {
		let match = rgx[1],
			temp = '', mod = '';


		if(match.indexOf('|') > -1) {
			let t = match.split('|');
			mod = t[0];
			match = t[1];
		} 

		if(match.indexOf(':') < 0) {
			if(output.meta[match]) {
				temp += output.meta[match];
				final = final.replace(rgx[0], output.meta[match]);
			} else {
				switch(match) {
					default:
						break;
				}
			}

			//console.log('parseEntry', 'no meta match');
		} else {
			let args = match.split(':');

			output.meta[args[0]] = args[1];
			final = final.replace(rgx[0], args[1]);
			temp += args[1];
		}

		//console.log('parseEntry', rgx[0], final);
	}

	output.description = final;

	return output;
}


export const generateRandomTableEntry = (t, o = {}) => {
	let raw = '';
	t = t.toLowerCase();

	try {
		let id = t.split('.'),
			outerTable = tables[id[0]] ? tables[id[0]] : null,
			innerTable;

		if(outerTable !== null) {
			innerTable = outerTable[id[1].toLowerCase()] ? outerTable[id[1].toLowerCase()] : null;
		}

		if(innerTable == null) {
			return '';
		}

		raw = parseTableEntry(getRandomTableEntry(innerTable), id[0]);
		return parseEntry(raw, o);
	} catch(e) {
		console.log(e.message);
		return {
			'description': '',
			'error': e
		};
	}
}
