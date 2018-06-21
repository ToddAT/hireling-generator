import { isDiceOrRange } from '../../tools/dice'
import hirelings from './hirelings.txt';
import name from './name.txt';
import weapon from './weapon.txt';
import kit from './kit.txt';
import gear from './gear.txt';
import personality from './personality.txt';
//import utility from './utility.txt';
//import inscriptions from './inscriptions.txt';
//import color from './color.txt';
//import weapon from './weapon.txt';
//import fantasyMaleMilitaryHero from './fantasy-male-military-hero.txt';
//import obstacle from './obstacle.txt';

let fixTableCalls = (l, tbl) => {
  let rgxTableCall = /(?:\[)([^\[\]]+)(?:\])/g,
      out = l,
      rgx;

  while ((rgx = rgxTableCall.exec(l)) !== null) {
    let match = rgx[1],
        tableName = match.toLowerCase();

    /**
        If the entry isn't a dice roll (ie. 3d6) or a range (ie. 3-18), then fix the table
        call to include the containing table.
    **/
    if (!isDiceOrRange(tableName)) {
      if(match.indexOf('.') < 0) {
        out = out.replace('[' + match + ']', '[' + tbl.toLowerCase() + '.' + tableName + ']');
      } else {
        out = out.replace('[' + match + ']', '[' + tableName + ']');
      }
    }
  }

  return out;
}

let parseTableText = (t, label) => {
  let out = {},
      regex = new RegExp('^([0-9]+)\,{1}([^]+)'),
      lines = t.split('\n'),
      tbl, fixed;
  
  lines.forEach((line) => {
    let trimmed = line.trim(), i = 0, len = 0, rxp;
    
    if(trimmed.indexOf(';') == 0) {
      tbl = trimmed.replace(';', '').toLowerCase();
      out[tbl] = [];
    } else if(trimmed.length > 0) {
      rxp = regex.exec(trimmed);
      
      if(rxp !== null) {
        len = parseInt(rxp[1]);

        if(len > 0) {
          fixed = fixTableCalls(rxp[2], label);

          for(i=0; i<len; i++) {
            out[tbl].push(fixed);
          }
        }
      }
    }
  });
  
  return out;
};

const tables = {
  'hirelings': parseTableText(hirelings, 'hirelings'),
  'name': parseTableText(name, 'name'),
  'weapon': parseTableText(weapon, 'weapon'),
  'kit': parseTableText(kit, 'kit'),
  'gear': parseTableText(gear, 'gear'),
  'personality': parseTableText(personality, 'personality')
	//'swords': parseTableText(swords, 'swords'),
  //'utility': parseTableText(utility, 'utility'),
  //'inscriptions': parseTableText(inscriptions, 'inscriptions'),
  //'color': parseTableText(inscriptions, 'color'),
  //'weapon': parseTableText(inscriptions, 'weapon'),
  //'fantasy male military hero': parseTableText(fantasyMaleMilitaryHero, 'fantasy male military hero')
}

export default tables