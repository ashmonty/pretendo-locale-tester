const getLocale = require('../../util/getLocale');
const { Router } = require('express');
const router = new Router();
const fetch = require('node-fetch');

const progressLists = require('../progress-lists');

router.get('/', (req, res) => {


	if (req.query.url) {


		let url = req.query.url

		if (!url.startsWith('http')) {
			url = `https://${url}`
		}

		fetch(url)
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				let tmpLocale = data;
				res.render('progress', {
					layout: 'main',
					locale: tmpLocale,
					progressLists,
					queryUrl: url
				});
			})
			.catch((error) => {
				let tmpLocale = getLocale('US', 'en')
				res.render('error', {
					layout: 'main',
					locale: tmpLocale,
					progressLists,
					error
				})
			})
	}
	else {
		let tmpLocale = getLocale('US', 'en')
		res.render('progress', {
			layout: 'main',
			locale: tmpLocale,
			progressLists
		});
	}
});

module.exports = router;
