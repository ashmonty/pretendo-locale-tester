const getLocale = require('../../util/getLocale');
const { Router } = require('express');
const router = new Router();
const fetch = require('node-fetch');

const progressLists = require('../progress-lists');

router.get('/', (req, res) => {


	if (req.query.url) {

		fetch(req.query.url)
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				let tmpLocale = data;
				res.render('progress', {
					layout: 'main',
					locale: tmpLocale,
					progressLists,
					queryUrl: req.query.url
				});
			})
	} else {
		let tmpLocale = getLocale('US', 'en')
		res.render('progress', {
			layout: 'main',
			locale: tmpLocale,
			progressLists,
			queryUrl: req.query.url
		});
	}
});

module.exports = router;
