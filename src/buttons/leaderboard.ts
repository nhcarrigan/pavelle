/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { MessageFlags } from "discord.js";
import { checkGuildEntitlement } from "../modules/checkEntitlement.js";
import { sendUnentitledResponse } from "../modules/sendUnentitledResponse.js";
import { errorHandler } from "../utils/errorHandler.js";
import type { Button } from "../interfaces/button.js";

/**
 * Handles the `/leaderboard` button.
 * @param pavelle - Pavelle's instance.
 * @param interaction - The interaction payload from Discord.
 */
// eslint-disable-next-line max-lines-per-function -- Lazy.
export const leaderboard: Button = async(pavelle, interaction) => {
  try {
    const isEntitled = await checkGuildEntitlement(pavelle, interaction.guild);
    if (!isEntitled) {
      await sendUnentitledResponse(interaction);
      return;
    }
    const members = await pavelle.db.users.findMany({
      where: {
        serverId: interaction.guild.id,
      },
    });

    const sorted = members.sort((a, b) => {
      return b.points - a.points;
    });

    const topTen = sorted.slice(0, 10).map((member, index) => {
      return `- **#${(index + 1).toString()}:** <@${member.userId}> - ${member.points.toString()} point(s).`;
    }).
      join("\n");
    const yourScore = sorted.find((member) => {
      return member.userId === interaction.member.id;
    });
    const yourRank = yourScore
      ? `You are rank #${(sorted.indexOf(yourScore) + 1).toString()} with ${yourScore.points.toString()} points.`
      : "You are not ranked. Try throwing some stuff!";
    await interaction.editReply({
      allowedMentions: {
        parse: [],
      },
      components: [
        {
          // eslint-disable-next-line @typescript-eslint/naming-convention -- Discord API convention.
          accent_color: null,

          components: [
            {
              content: "# Leaderboard",
              type:    10,
            },
            {
              divider: true,
              spacing: 1,
              type:    14,
            },
            {
              content: "## Top 10 Members",
              type:    10,
            },
            {
              content: topTen,
              type:    10,
            },
            {
              content: `-# ${yourRank}`,
              type:    10,
            },
          ],
          spoiler: false,
          type:    17,
        },
      ],
      flags: [ MessageFlags.IsComponentsV2 ],
    });
  } catch (error) {
    const id = await errorHandler(error, "leaderboard command");
    await interaction.editReply({
      content:
      `An error occurred while processing your request. Please try again later, or join our support server and provide this ID: ${id}`,
    });
  }
};
