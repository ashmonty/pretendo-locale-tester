const getLocale = require('../../util/getLocale');
const { Router } = require('express');
const router = new Router();
const fetch = require('node-fetch');

const pgoressLists = require('../progress-lists');



router.get('/', (req, res) => {

	if (req.query.url) {

		fetch(req.query.url)
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				let tmpLocale = data;
				res.render('home', {
					layout: 'main',
					locale: tmpLocale,
					featuredFeatureList: pgoressLists[0],
					queryUrl: req.query.url
				});
			})
	} else {
		let tmpLocale = getLocale('US', 'en')
		res.render('home', {
			layout: 'main',
			locale: tmpLocale,
			featuredFeatureList: pgoressLists[0]
		});
	}
});

module.exports = router;
