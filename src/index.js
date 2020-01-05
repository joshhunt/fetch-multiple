require("isomorphic-fetch");

function fetchAndParse(url) {
  return fetch(url).then(resp => {
    if (!resp.ok) {
      const error = new Error("HTTP response error");
      error.response = resp;

      throw error;
    }

    const contentType = resp.headers.get("content-type") || "";

    if (contentType.toLowerCase().includes("application/json")) {
      return resp.json();
    } else {
      return resp.text();
    }
  });
}

function fetchMultiple(urls, options = {}) {
  const promises = urls.map(url => {
    return options.raw ? fetch(url) : fetchAndParse(url);
  });

  return Promise.all(promises);
}

module.exports = fetchMultiple;
