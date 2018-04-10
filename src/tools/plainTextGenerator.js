export const exportPlainTextSimple = (r) => {
  let plainTxt = '';

  try {
    plainTxt = r.name + ' the ' + r.occupation.Name;
  } catch(e) {
    return '';
  }

  return plainTxt;
};

export const exportPlainTextDetails = (r) => {
  let plainTxt = '';

  try {
    plainTxt += 'Name: ' + r.name + '\r\n' +
      'Alignment: ' + r.alignment + '\r\n' +
      'Occupation: ' + r.occupation.Name + '\r\n' +
      (
        Object.keys(r.attributes).map((attr) =>
          attr + ': ' + r.attributes[attr]
        ).join('\r\n')
      ) + '\r\n' +
      'Gear: ' + r.clothes +
      ( r.armor !== '' ? ', ' + r.armor : ''  ) +
      ( r.weapon !== '' ? ', ' + r.weapon : ''  ) +
      ( r.gear !== '' ? ', ' + r.gear : ''  );
  } catch(e) {
    return '';
  }

  return plainTxt;
};
