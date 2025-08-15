/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { logger } from "../utils/logger.js";
import { isTheme } from "../utils/typeguards.js";
import type { Pavelle } from "../interfaces/pavelle.js";
import type { Theme } from "../interfaces/theme.js";

/**
 * Get a config object from the database, with a
 * fallback value where needed.
 * @param pavelle - Pavelle's instance.
 * @param guildId - The ID of the server to find the config for.
 * @returns A config object containing theme and spoiler.
 */
export const getConfig = async(
  pavelle: Pavelle, guildId: string,
): Promise<{ theme: Theme; spoiler: boolean }> => {
  try {
    const config = await pavelle.db.servers.findUnique({
      where: {
        serverId: guildId,
      },
    });
    if (!config) {
      return { spoiler: false, theme: "cake" };
    }
    return {
      spoiler: config.spoiler,
      theme:   isTheme(config.theme)
        ? config.theme
        : "cake",
    };
  } catch (error) {
    if (error instanceof Error) {
      await logger.error("get theme module", error);
    }
    return { spoiler: false, theme: "cake" };
  }
};
