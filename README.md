# fetch-multiple

Fetches and returns an array of urls, parsing JSON if appliciable. Rejects if the https status code of _any_ url is not 2xx.

## Usage

```javascript
fetchMultiple([
  "https://api.clan.report/leaderboards-1.json",
  "https://api.clan.report/leaderboards-2.json",
  "https://api.clan.report/"
]).then(results => {
  console.log(results[0]); // <object>
  console.log(results[1]); // <object>
  console.log(results[2]); // <text>
});
```

If `{ raw: true }` is specified as the second argument, the Response object for each URL will be returned instead. Any parsing will be skipped. The promise will _not_ be rejected if any status code is not 2xx.

```javascript
fetchMultiple(["https://api.clan.report/leaderboards-1.json"], {
  raw: true
}).then(results => {
  console.log(results[0].headers.get("content-type")); // "application/json"
});
```

## Tests

There are tests, which can be ran within the repo with `yarn test`.
