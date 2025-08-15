/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
  TextDisplayBuilder,
  type ChatInputCommandInteraction,
  type ButtonInteraction,
} from "discord.js";

/**
 * Responds with a default image and a button to subscribe.
 * @param interaction - The interaction object from Discord.
 */
export const sendUnentitledResponse = async(
  interaction: ChatInputCommandInteraction | ButtonInteraction,
): Promise<void> => {
  const components = [
    new TextDisplayBuilder().setContent(
      // eslint-disable-next-line stylistic/max-len -- Big boi string.
      "Oh dear, your community does not seem to have an active subscription! I am afraid I cannot let you throw things until a server admin resolves that.",
    ),
    new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder().
        setStyle(ButtonStyle.Premium).
        setSKUId("1405735774376296460"),
    ),
  ];
  await interaction.editReply({
    components: components,
    flags:      [ MessageFlags.IsComponentsV2 ],
  });
};
