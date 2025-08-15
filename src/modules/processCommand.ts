/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { commandHandlers as handlers } from "../config/handlers.js";
import type { Command } from "../interfaces/command.js";

/**
 * Process a command interaction.
 * @param pavelle - The Pavelle instance.
 * @param interaction - The interaction to process.
 */
export const processCommand: Command = async(pavelle, interaction) => {
  await interaction.deferReply();
  const { commandName } = interaction;
  // eslint-disable-next-line no-underscore-dangle -- Accessing private property for command handler.
  await (handlers[commandName] ?? handlers._default)(pavelle, interaction);
};
