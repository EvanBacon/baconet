function withLinks(config, url) {
  const withDomains = require("./withDomains");
  return withDomains(config, {
    domains: [url],
  });
}

module.exports = withLinks;
