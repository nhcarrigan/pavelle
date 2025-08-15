/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

/* eslint-disable jsdoc/require-jsdoc -- Typeguards are simple. */

import { successes } from "../config/themes.js";
import type { Theme } from "../interfaces/theme.js";

const isTheme = (theme: string): theme is Theme => {
  return theme in successes;
};

export {
  isTheme,
};
