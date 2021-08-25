const { Router } = require('express');
const router = new Router();

router.get('/', (request, response) => {
	response.redirect(`/?url=${request.query.url}#faq`);
});

module.exports = router;
