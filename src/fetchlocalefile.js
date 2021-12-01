// Not sure why neither import nor require want to work and I have to do this, but I'm lazy so...
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function fetchLocaleFile(url) {
	let fixedURL = url;

	if (
		fixedURL.startsWith('https://github.com/') &&
    RegExp('/blob/').test(fixedURL)
	) {
		fixedURL = fixedURL.replace(
			'https://github.com/',
			'https://raw.githubusercontent.com/'
		);
		fixedURL = fixedURL.replace(RegExp('/blob/'), '/');
	}

	const jsonLocale = await fetch(fixedURL)
		.then((response) => {
			return response.json();
		})
		.then((locale) => {
			return locale;
		});

	return jsonLocale;
}

module.exports = {
	fetchLocaleFile,
};
