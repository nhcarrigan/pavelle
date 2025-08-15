/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { getRandomValue } from "../utils/getRandomValue.js";
import type { GuildMember, ChatInputCommandInteraction } from "discord.js";

/**
 * Determines the target for an item throw. If the user specified a target,
 * use that. Otherwise, attempt to fetch all members (to refresh cache), then
 * return a random member from the cache.
 * @param interaction - The interaction payload from Discord.
 * @returns A member from the server.
 */
export const getTarget
  = async(
    interaction: ChatInputCommandInteraction<"cached">,
  ): Promise<GuildMember> => {
    const selectedTarget = interaction.options.getMember("target");
    if (selectedTarget) {
      return selectedTarget;
    }
    await interaction.guild.members.fetch().catch(() => {
      return null;
    });
    return getRandomValue([ ...interaction.guild.members.cache.values() ]);
  };
