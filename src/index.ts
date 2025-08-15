/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { PrismaClient } from "@prisma/client";
import {
  Client,
  GatewayIntentBits,
  Events,
} from "discord.js";
import { scheduleJob } from "node-schedule";
import { processButton } from "./modules/processButton.js";
import { processCommand } from "./modules/processCommand.js";
import { instantiateServer } from "./server/serve.js";
import { logger } from "./utils/logger.js";
import type { Pavelle } from "./interfaces/pavelle.js";

const pavelle: Pavelle = {
  db:      new PrismaClient(),
  discord: new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
    ],
  }),
  throwCache: new Map<string, number>(),
};

pavelle.discord.once(Events.ClientReady, () => {
  void logger.log("debug", `Logged in as ${pavelle.discord.user?.username ?? "unknown"}`);
});

pavelle.discord.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.inCachedGuild()) {
    return;
  }
  if (interaction.isChatInputCommand()) {
    void processCommand(pavelle, interaction);
  }
  if (interaction.isButton()) {
    void processButton(pavelle, interaction);
  }
});

pavelle.discord.on(Events.Error, (error) => {
  void logger.error("Client error", error);
});

pavelle.discord.on(Events.Warn, (message) => {
  void logger.log("info", message);
});

await pavelle.discord.login(process.env.BOT_TOKEN);
scheduleJob("bust-cache", "0 * * * *", () => {
  pavelle.throwCache = new Map<string, number>();
});
instantiateServer();
