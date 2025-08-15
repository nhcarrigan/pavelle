/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */
import {
  TextDisplayBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  ContainerBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  MessageFlags,
} from "discord.js";
import { errorHandler } from "../utils/errorHandler.js";
import type { Command } from "../interfaces/command.js";

/**
 * Handles the `/about` command interaction.
 * @param _pavelle - Pavelle's Discord instance (unused).
 * @param interaction - The command interaction payload from Discord.
 */
// eslint-disable-next-line max-lines-per-function -- It's mostly components.
export const about: Command = async(_pavelle, interaction) => {
  try {
    const components = [
      new ContainerBuilder().
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent("# About Pavelle"),
        ).
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent(
            // eslint-disable-next-line stylistic/max-len -- Big boi string.
            "Hi there~! I am Pavelle, a bot that allows you to throw items (like cake!) at your fellow server members. My creation was inspired by the Steve Aoki CakeThrow Bot!",
          ),
        ).
        addSeparatorComponents(
          new SeparatorBuilder().
            setSpacing(SeparatorSpacingSize.Small).
            setDivider(true),
        ).
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent("## What can I do?"),
        ).
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent(
            // eslint-disable-next-line stylistic/max-len -- Big boi string.
            "To get started, a server admin will need to subscribe to our service. Then your members can begin throwing objects at each other, either randomly or to a specific target with `/throw`. Make sure to check your `/leaderboard` to see who has the most points!",
          ),
        ).
        addSeparatorComponents(
          new SeparatorBuilder().
            setSpacing(SeparatorSpacingSize.Small).
            setDivider(true),
        ).
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent("## What if I need help?"),
        ).
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent(
            // eslint-disable-next-line stylistic/max-len -- Big boi string.
            "My deepest apologies if I have made a mistake! Please reach out to us in our Discord server or on the forum, and we will do our best to assist you.",
          ),
        ),
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder().
          setStyle(ButtonStyle.Link).
          setLabel("Discord Server").
          setURL("https://chat.nhcarrigan.com"),
        new ButtonBuilder().
          setStyle(ButtonStyle.Link).
          setLabel("Forum").
          setURL("https://forum.nhcarrigan.com"),
      ),
    ];
    await interaction.editReply({
      components: components,
      flags:      MessageFlags.IsComponentsV2,
    });
  } catch (error) {
    const id = await errorHandler(error, "about command");
    await interaction.editReply({
      content:
      `An error occurred while processing your request. Please try again later, or join our support server and provide this ID: ${id}`,
    });
  }
};
