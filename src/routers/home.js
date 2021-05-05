const getLocale = require("../../util/getLocale");
const { Router } = require("express");
const router = new Router();
const fetch = require("node-fetch");

const progressLists = require("../progress-lists");

router.get("/", (req, res) => {
  if (req.query.url) {
    let url = req.query.url;

    if (!url.startsWith("http")) {
      url = `https://${url}`;
    }

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((locale) => {

        if (locale.progressPage) {
          res.render("home", {
            layout: "main",
            locale,
            featuredFeatureList: progressLists[0],
            queryUrl: url,
          });
        } else {
          let tmpLocale = getLocale("US", "en");
          res.render("error", {
            layout: "main",
            locale: tmpLocale,
            error:
              "Are you sure you're localizing the right file? Make sure you're localizing the file in the dev branch.",
          });
        }
      })
      .catch((error) => {
        let tmpLocale = getLocale("US", "en");
        res.render("error", {
          layout: "main",
          locale: tmpLocale,
          error,
        });
      });
  } else {
    let tmpLocale = getLocale("US", "en");
    res.render("home", {
      layout: "main",
      locale: tmpLocale,
      featuredFeatureList: progressLists[0],
    });
  }
});

module.exports = router;
