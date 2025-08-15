/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { errorHandler } from "../utils/errorHandler.js";
import { isTheme } from "../utils/typeguards.js";
import type { Command } from "../interfaces/command.js";

/**
 * Handles the `/config` command.
 * @param pavelle - Pavelle's instance.
 * @param interaction - The interaction payload from Discord.
 */
export const config: Command = async(pavelle, interaction) => {
  try {
    const theme = interaction.options.getString("theme");
    const spoiler = interaction.options.getBoolean("spoiler");
    const query: { theme?: string; spoiler?: boolean } = {};

    if (theme !== null && isTheme(theme)) {
      query.theme = theme;
    }
    if (spoiler !== null) {
      query.spoiler = spoiler;
    }

    const result = await pavelle.db.servers.upsert({
      create: {
        serverId: interaction.guild.id,
        spoiler:  spoiler ?? false,
        theme:    theme !== null && isTheme(theme)
          ? theme
          : "cake",
      },
      update: query,
      where:  {
        serverId: interaction.guild.id,
      },
    });
    await interaction.editReply({
      content: `Your settings have been updated! Your new settings are now:\nTheme: ${result.theme}\nSpoiler GIFs: ${result.spoiler.toString()}\n-# Omitted settings were not updated. If ${String(theme)} was not a valid theme, that setting has not been updated.`,
    });
  } catch (error) {
    const id = await errorHandler(error, "config command");
    await interaction.editReply({
      content:
      `An error occurred while processing your request. Please try again later, or join our support server and provide this ID: ${id}`,
    });
  }
};
