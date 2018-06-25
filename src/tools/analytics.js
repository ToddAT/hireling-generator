const gtag = window.gtag;

export const logEvent = (evtName, data = {}) => {
	try {
		gtag('event', evtName, data);
	} catch (e) {
		console.log(e);
	}
	
	return true;
}