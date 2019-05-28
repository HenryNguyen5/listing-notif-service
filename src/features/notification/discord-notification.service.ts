import Discord from "discord.js";
import { AppConfig } from "../../config";

export async function createNotificationService(config: AppConfig) {
  const client = new Discord.Client();
  await client.login(config.discord.token);
  return new DiscordNotificationService(
    client,
    config.discord.channelIds,
    config.discord.guildIds
  );
}

class DiscordNotificationService {
  constructor(
    private client: Discord.Client,
    private channelIds: string[],
    private guildIds: string[]
  ) {}

  public async sendMessage(msg: string): Promise<void> {
    const guilds = this.getGuilds();
    const channels = this.getTextChannels(guilds);
    for (const c of channels) {
      c.send(`<@&582789477295063056> ${msg}`);
    }
  }

  private getGuilds() {
    return this.guildIds
      .map(gId => this.client.guilds.get(gId))
      .filter((g): g is Discord.Guild => !!g);
  }

  private getTextChannels(guilds: Discord.Guild[]): Discord.TextChannel[] {
    const channels: Discord.TextChannel[] = [];
    for (const g of guilds) {
      for (const cId of this.channelIds) {
        const channel = g.channels.get(cId);
        if (this.isTextChannel(channel)) {
          channels.push(channel);
        }
      }
    }

    return channels;
  }

  private isTextChannel(
    channel?: Discord.GuildChannel
  ): channel is Discord.TextChannel {
    return !!(channel && channel.type === "text");
  }
}
