const fetch = require("node-fetch");

async function fetchLocaleFile(url) {
  let fixedURL = url;

  if (
    fixedURL.startsWith("https://github.com/") &&
    RegExp("/blob/").test(fixedURL)
  ) {
    fixedURL = fixedURL.replace(
      "https://github.com/",
      "https://raw.githubusercontent.com/"
    );
    fixedURL = fixedURL.replace(RegExp("/blob/"), "/");
  }

  const jsonLocale = await fetch(fixedURL)
    .then((response) => {
      return response.json();
    })
    .then((locale) => {
      return locale;
    });

   return jsonLocale
}

module.exports = {
  fetchLocaleFile,
};
