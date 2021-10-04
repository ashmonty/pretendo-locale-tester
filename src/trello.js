const Trello =require('trello');
const Redis = require('ioredis');
const JSONCache = require('redis-json');

const trelloKey = process.env.TRELLOKEY
const trelloToken = process.env.TRELLOTOKEN

const trello = new Trello(trelloKey, trelloToken);
const redis = new Redis(process.env.REDIS_URL);
const trelloCache = new JSONCache(redis, { prefix: 'trello:' });

async function getTrelloCache() {
	let cache = await trelloCache.get('latest');
	if (!cache) {
		cache = await updateTrelloCache();
	}

	if (cache.update_time < Date.now() - (1000 * 60 * 60)) {
		cache = await updateTrelloCache();
	}

	return cache;
}

async function updateTrelloCache() {
	const progressData = {
		update_time: Date.now(),
		sections: []
	};

	const boards = await trello.getOrgBoards("pretendo1");

	for (const board of boards) {
		const meta = {
			title: '',
			id: '',
			percentage_complete: 0,
			progress: {
				not_started: [],
				started: [],
				completed: []
			}
		};

		meta.title = board.name;
		meta.id = board.shortLink;

		const lists = await trello.getListsOnBoard(board.id);
		const cards = await trello.getCardsOnBoard(board.id);

		for (const card of cards) {
			const cardList = lists.find(({ id }) => id === card.idList);
			const listName = cardList.name.toLowerCase().replace(' ', '_');

			if (meta.progress[listName]) {
				meta.progress[listName].push(card.name);
			}
		}

		if (meta.progress.not_started.length !== 0 || meta.progress.started.length !== 0 || meta.progress.completed.length !== 0) {
			progressData.sections.push(meta);
		}
	}

	await trelloCache.set('latest', progressData);
	return progressData;
}

module.exports = {
	getTrelloCache,
	updateTrelloCache
};