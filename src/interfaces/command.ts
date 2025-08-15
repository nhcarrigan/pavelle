/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */
import type { Pavelle } from "./pavelle.js";
import type { ChatInputCommandInteraction } from "discord.js";

export type Command = (
  pavelle: Pavelle,
  interaction: ChatInputCommandInteraction<"cached">
)=> Promise<void>;
