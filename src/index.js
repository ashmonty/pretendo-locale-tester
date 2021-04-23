const logger = require('./logger');
const express = require('express');
const handlebars = require('express-handlebars');

const cfg = require('../config.json');

const app = express();

const routers = {
	home: require('./routers/home'),
	faq: require('./routers/faq'),
	progress: require('./routers/progress')
};

app.use('*', (req, res, next) => {
	logger.info(`${req.method.toUpperCase()} ${req.originalUrl}`);
	next();
});

app.use('/', routers.home);
app.use('/faq', routers.faq);
app.use('/progress', routers.progress);

app.engine('handlebars', handlebars({
	helpers: {
		doFaq(value, options) {
			let htmlLeft = '';
			let htmlRight = '';
			for(const [i, v] of Object.entries(value)) {
				const appendHtml = options.fn({
					...v
				}); // Tis is an HTML string
				if(i % 2 === 0) {
					htmlLeft += appendHtml;
				} else {
					htmlRight += appendHtml;
				}
			}
			return `
			<div class="left questions-left">
				${htmlLeft}
			</div>
			<div class="right questions-right">
				${htmlRight}
			</div>
			`;
		}
	}
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.listen(cfg.http.port, () => {
	logger.info(`Server listening on *:${cfg.http.port}`);
});