const { Router } = require("express");
const util = require("../util");

const { fetchLocaleFile } = require("../fetchlocalefile");
const { boards } = require("../../boards/boards.json");
const router = new Router();

const { getTrelloCache } = require("../trello");

router.get("/", async (request, response) => {

  const reqLocale = request.locale;
  let locale = util.getLocale(reqLocale.region, reqLocale.language);

  if (request.query.url) {
    locale = await fetchLocaleFile(request.query.url);
  }

  const cache = await getTrelloCache();

  response.render("home", {
    layout: "main",
    featuredFeatureList: cache.sections[0],
    boards,
    locale,
    localeString: reqLocale.toString(),
    queryUrl: request.query.url
  });
});

module.exports = router;
