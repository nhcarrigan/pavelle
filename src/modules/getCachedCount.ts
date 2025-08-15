/**
 * @copyright Naomi
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import type { Pavelle } from "../interfaces/pavelle.js";

/**
 * Returns the cached number of throws a user has remaining.
 * @param pavelle - Pavelle's instance.
 * @param id - The guild and user ID, in `guild-user` format.
 * @returns The number of throws remaining.
 */
export const getCachedCount = (pavelle: Pavelle, id: string): number => {
  return pavelle.throwCache.get(id) ?? 10;
};
