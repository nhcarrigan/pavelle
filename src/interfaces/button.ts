/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */
import type { Pavelle } from "./pavelle.js";
import type { ButtonInteraction } from "discord.js";

export type Button = (
  pavelle: Pavelle,
  interaction: ButtonInteraction<"cached">
)=> Promise<void>;
