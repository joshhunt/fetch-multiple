const fetchMultiple = require("./index");

describe("fetch-multiple", () => {
  it("returns data for each url", async () => {
    const results = await fetchMultiple([
      "https://api.clan.report/leaderboards-1.json",
      "https://api.clan.report/leaderboards-2.json",
      "https://api.clan.report/leaderboards-4.json"
    ]);

    expect(results).toHaveLength(3);
  });

  it("parses json", async () => {
    const [result] = await fetchMultiple([
      "https://api.clan.report/status.json"
    ]);

    expect(typeof result).toBe("object");
  });

  it("parses unknown content types to string", async () => {
    const [result] = await fetchMultiple(["https://api.clan.report"]);

    expect(typeof result).toBe("string");
  });

  // doesnt use async/await so we can use expect().rejects
  it("rejects for http errors", () => {
    const promise = fetchMultiple(["https://api.clan.report/error"]);

    return expect(promise).rejects.toThrow("HTTP response error");
  });

  it("returns raw response if option is specified", async () => {
    const [result] = await fetchMultiple(
      ["https://api.clan.report/leaderboards-1.json"],
      { raw: true }
    );

    expect(result).toBeInstanceOf(Response);
  });
});
