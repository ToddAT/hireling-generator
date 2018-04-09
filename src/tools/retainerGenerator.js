import { d4, d6, tossCoin } from './random.js';
import { generateName } from './nameGenerator.js';
import { generateOccupation } from './occupationGenerator.js';
import { getClothes } from './clothingGenerator.js';
import { getArmor } from './armorGenerator.js';
import { getWeapon } from './weaponGenerator.js';
import { generateGear } from './gearGenerator.js';

const generateAlignment = () => {
  var rnd = d6(1);

  switch(rnd) {
    case 1:
    case 2:
      return 'chaotic';
      break;
    case 3:
    case 4:
      return 'neutral';
      break;
    case 5:
    case 6:
      return 'lawful';
      break;
  }
};

export const generateRetainers = (count = 1) => {
  let retainers = [], i;

  for(i=0; i<count; i++) {
    let gender = tossCoin() ? 'male' : 'female',
        occupation = generateOccupation(),
        retainer;

    retainer = {
      'gender': gender,
      'name': generateName(gender),
      'occupation': occupation,
      'clothes': getClothes(occupation.Wealth),
      'armor': getArmor(occupation),
      'weapon': getWeapon(occupation),
      'gear': generateGear(occupation),
      'attributes': {
        'str': d6(3),
        'int': d6(3),
        'wis': d6(3),
        'dex': d6(3),
        'con': d6(3),
        'cha': d6(3),
        'hp': d6(1),
      }
    };

    retainers.push(retainer);
  }

  return retainers;
};