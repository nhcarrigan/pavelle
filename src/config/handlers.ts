/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { leaderboard as leaderboardButton } from "../buttons/leaderboard.js";
import { throwButton } from "../buttons/throwButton.js";
import { about } from "../commands/about.js";
import { config } from "../commands/config.js";
import { leaderboard } from "../commands/leaderboard.js";
import { throwCmd } from "../commands/throwCmd.js";
import type { Button } from "../interfaces/button.js";
import type { Command } from "../interfaces/command.js";

const defaultCommandHandler: Command = async(_lynira, interaction) => {
  await interaction.editReply({
    content: "This command is not implemented yet.",
  });
};

const defaultButtonHandler: Button = async(_pavelle, interaction) => {
  await interaction.editReply({
    content: "This button is not implemented yet.",
  });
};

const commandHandlers: { _default: Command } & Record<string, Command> = {
  _default:    defaultCommandHandler,
  about:       about,
  config:      config,
  leaderboard: leaderboard,
  throw:       throwCmd,
};

const buttonHandlers: { _default: Button } & Record<string, Button> = {
  _default:    defaultButtonHandler,
  leaderboard: leaderboardButton,
  throw:       throwButton,
};

export { commandHandlers, buttonHandlers };
