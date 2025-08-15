/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { randomInt } from "node:crypto";
import { Score } from "../interfaces/score.js";

/**
 * Uses our odds spread to calculate the result of
 * a throw, returning the appropriate score from the
 * enum.
 * @returns The number of points the user earned.
 */
export const generateScore = (): number => {
  const random = randomInt(1, 101);
  if (random < 10) {
    return Score.COUNTER;
  }
  if (random < 50) {
    return Score.FAIL;
  }
  if (random < 95) {
    return Score.SUCCEED;
  }
  return Score.BONUS;
};
