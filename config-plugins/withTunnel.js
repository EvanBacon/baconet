function withDevLinks(config, subdomain = process.env.EXPO_TUNNEL_SUBDOMAIN) {
  if (!process.env.EXPO_TUNNEL_SUBDOMAIN) {
    process.env.EXPO_TUNNEL_SUBDOMAIN = subdomain;
  }

  if (!subdomain) {
    throw new Error("No subdomain provided to withDevLinks");
  }

  const withDomains = require("./withDomains");
  if (!config.plugins) config.plugins = [];

  // Add the domains using the ngrok subdomain
  // from `npx expo start --tunnel`
  return withDomains(config, {
    domains: [subdomain + ".ngrok.io"],
    mode: "developer",
  });
}

module.exports = withDevLinks;
