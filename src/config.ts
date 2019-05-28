const enum BinanceEnv {
  API_KEY = "BINANCE_API_KEY",
  API_SECRET = "BINANCE_API_SECRET"
}

const enum DiscordEnv {
  API_TOKEN = "DISCORD_TOKEN"
}

type EnvKeys = BinanceEnv | DiscordEnv;

function getEnv(k: EnvKeys): string {
  const v = process.env[k];
  if (typeof v === undefined) {
    console.error(`Required environment variable ${k} does not exist!`);
    process.exit(1);
  }

  return v as string;
}

export type BinanceConfig = typeof binance;
const binance = {
  apiKey: getEnv(BinanceEnv.API_KEY),
  apiSecret: getEnv(BinanceEnv.API_SECRET)
};

export type DiscordConfig = typeof discord;
const discord = {
  token: getEnv(DiscordEnv.API_TOKEN),
  guildIds: ["348975939826483203"],
  channelIds: ["348976269280673792"]
};

export type AppConfig = typeof appConfig;
export const appConfig = {
  binance,
  discord
};
