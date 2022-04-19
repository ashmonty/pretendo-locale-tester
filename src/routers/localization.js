const { Router } = require('express');
const util = require('../util');
const router = new Router();

//localetester
const { fetchLocaleFile } = require('../fetchlocalefile');

router.get('/', async (request, response) => {

	const reqLocale = request.locale;
	let locale = util.getLocale(reqLocale.region, reqLocale.language);
	//localetester
	if (request.query.url) {
		locale = await fetchLocaleFile(request.query.url);
	}

	response.render('localization', {
		layout: 'main',
		locale,
		localeString: reqLocale.toString(),
		queryUrl: request.query.url
	});
});

module.exports = router;
