//logEvent('modal', {'action': 'close', 'type': 'export-single'});

const gtag = window.gtag;

const logEvent = (action = "", data = {}) => {
	try {
		gtag('event', action, data);
	} catch (e) {
		console.log(e);
	}
	
	return true;
};

export const logAction = (action = "", cat = "", label = "", val = 0) => {
	return logEvent(action, {
		'event_category': cat,
		'event_label': label,
		'value': val
	});
};

export const logModal = (label = "", val = 0) => {
	return logEvent('view_item', {
		'event_label': 'modal_' + label,
		'value': val
	});
};
