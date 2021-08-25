const { Router } = require('express');
const util = require('../util');

const { fetchLocaleFile } = require("../fetchlocalefile");
const router = new Router();

router.get('/', async (request, response) => {

	const reqLocale = request.locale
	let locale = util.getLocale(reqLocale.region, reqLocale.language);

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
