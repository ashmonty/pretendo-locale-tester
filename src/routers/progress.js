const { Router } = require('express');
const util = require('../util');
const { boards } = require('../../boards/boards.json');
const router = new Router();

//localetester
const { fetchLocaleFile } = require('../fetchlocalefile');

const { getTrelloCache } = require('../trello');

router.get('/', async (request, response) => {

	const reqLocale = request.locale;
	let locale = util.getLocale(reqLocale.region, reqLocale.language);
	//localetester
	if (request.query.url) {
		locale = await fetchLocaleFile(request.query.url);
	}

	const cache = await getTrelloCache();

	response.render('progress', {
		layout: 'main',
		boards,
		locale,
		localeString: reqLocale.toString(),
		progressLists: cache,
		queryUrl: request.query.url
	});
});

module.exports = router;
