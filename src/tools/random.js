export const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const tossCoin = () => {
  return (Math.random() > .50);
};

export const rollArbitraryDice = (f, n) => {
	var result = 0,
		i = 0;

	if(!Number.isInteger(f) || f < 2 || !Number.isInteger(n) || n < 1 ) {
		return 0;
	}

	for(i=0; i<n; i++) {
		result += getRandomArbitrary(1, f);
	}

	return result;
};

export const d4 = (n) => {
	return rollArbitraryDice(4, n);
};

export const d6 = (n) => {
	return rollArbitraryDice(6, n);
};

export const d8 = (n) => {
	return rollArbitraryDice(8, n);
};

export const d10 = (n) => {
	return rollArbitraryDice(10, n);
};

export const d12 = (n) => {
	return rollArbitraryDice(12, n);
};

export const d20 = (n) => {
	return rollArbitraryDice(20, n);
};

export const d100 = (n) => {
	return rollArbitraryDice(100, n);
};
