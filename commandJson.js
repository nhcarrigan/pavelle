import { ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";

const about = new SlashCommandBuilder()
  .setName("about")
  .setDescription("Get information about this application.")
  .setContexts([InteractionContextType.Guild])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall]);

const throwCmd = new SlashCommandBuilder()
      .setName("throw")
      .setDescription("Throw an item at a random or specific server member!")
      .setContexts([InteractionContextType.Guild])
      .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
      .addUserOption(option => option.setName("target").setDescription("The user you want to throw at. Random if omitted."));

const leaderboard = new SlashCommandBuilder()
      .setName("leaderboard")
      .setDescription("See your server's leaderboard!")
      .setContexts([InteractionContextType.Guild])
      .setIntegrationTypes([ApplicationIntegrationType.GuildInstall]);

const config = new SlashCommandBuilder()
      .setName("config")
      .setDescription("Configure your server's settings.")
      .addStringOption(option => option.setName("theme").setDescription("The theme you want to use. Determines what gets thrown.")).addBooleanOption(option => option.setName("spoiler").setDescription("Whether or not to hide GIFs behind a spoiler for accessibility."))

console.log(JSON.stringify([
    about.toJSON(),
    throwCmd.toJSON(),
  leaderboard.toJSON(),
  config.toJSON()
]));
