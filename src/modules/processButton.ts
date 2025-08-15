/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { buttonHandlers as handlers } from "../config/handlers.js";
import type { Button } from "../interfaces/button.js";

/**
 * Process a button interaction.
 * @param pavelle - The Pavelle instance.
 * @param interaction - The interaction to process.
 */
export const processButton: Button = async(pavelle, interaction) => {
  await interaction.deferReply();
  const commandName = interaction.customId;
  // eslint-disable-next-line no-underscore-dangle -- Accessing private property for command handler.
  await (handlers[commandName] ?? handlers._default)(pavelle, interaction);
};
