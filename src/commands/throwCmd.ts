/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { MessageFlags } from "discord.js";
import { checkGuildEntitlement } from "../modules/checkEntitlement.js";
import { generateScore } from "../modules/generateScore.js";
import { getCachedCount } from "../modules/getCachedCount.js";
import { getConfig } from "../modules/getConfig.js";
import { getTarget } from "../modules/getTarget.js";
import { getThrowComponents } from "../modules/getThrowComponents.js";
import { sendUnentitledResponse } from "../modules/sendUnentitledResponse.js";
import { errorHandler } from "../utils/errorHandler.js";
import type { Command } from "../interfaces/command.js";

/**
 * Handles the `/throw` command interaction.
 * @param pavelle - Pavelle's Discord instance.
 * @param interaction - The command interaction payload from Discord.
 */
// eslint-disable-next-line max-lines-per-function -- Big logic, but lotsa components
export const throwCmd: Command = async(pavelle, interaction) => {
  try {
    const { member, guild } = interaction;
    const count = getCachedCount(pavelle, `${guild.id}-${member.id}`);
    if (count <= 0) {
      await interaction.editReply({
        components: [
          {
            // eslint-disable-next-line @typescript-eslint/naming-convention -- Discord API convention.
            accent_color: null,
            components:   [
              {
                content:
                  // eslint-disable-next-line stylistic/max-len -- long string.
                  "Oopsie! You are out of throws! Your count resets at the top of every hour.",
                type: 10,
              },
            ],
            spoiler: false,
            type:    17,
          },
        ],
        flags: [ MessageFlags.IsComponentsV2 ],
      });
      return;
    }
    const isEntitled = await checkGuildEntitlement(pavelle, guild);
    if (!isEntitled) {
      await sendUnentitledResponse(interaction);
      return;
    }
    pavelle.throwCache.set(`${guild.id}-${member.id}`, count - 1);
    const target = await getTarget(interaction);
    const score = generateScore();
    const { theme, spoiler } = await getConfig(pavelle, guild.id);
    const updated = await pavelle.db.users.upsert({
      create: {
        points:   score,
        serverId: guild.id,
        userId:   member.id,
      },
      update: {
        points: {
          increment: score,
        },
      },
      where: {
        // eslint-disable-next-line @typescript-eslint/naming-convention -- Prisma index convention.
        serverId_userId: {
          serverId: guild.id,
          userId:   member.id,
        },
      },
    });
    const components = getThrowComponents(
      pavelle,
      member.id,
      target.id,
      guild.id,
      theme,
      score,
      spoiler,
      updated.points,
    );
    await interaction.editReply({
      allowedMentions: {
        parse: [ ],
      },
      components: components,
      flags:      [ MessageFlags.IsComponentsV2 ],
    });
  } catch (error) {
    const id = await errorHandler(error, "throw command");
    await interaction.editReply({
      content:
      `An error occurred while processing your request. Please try again later, or join our support server and provide this ID: ${id}`,
    });
  }
};
