/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

/* eslint-disable @typescript-eslint/max-params, max-lines-per-function -- Lazy. */

import { experts } from "../config/experts.js";
import {
  counters,
  successes,
  failures,
  bonuses,
  successTitles,
  failureTitles,
  counterTitles,
  bonusTitles,
  gifs,
} from "../config/themes.js";
import { Score } from "../interfaces/score.js";
import { getCachedCount } from "../modules/getCachedCount.js";
import { getRandomValue } from "../utils/getRandomValue.js";
import type { Pavelle } from "../interfaces/pavelle.js";
import type { Theme } from "../interfaces/theme.js";
import type { AnyAPIActionRowComponent } from "discord.js";

const getAccentColour = (score: Score): number => {
  if (score === Score.COUNTER) {
    return 15_418_782;
  }
  if (score === Score.FAIL) {
    return 15_277_667;
  }
  if (score === Score.SUCCEED) {
    return 5_763_719;
  }
  return 7_506_394;
};

const interpolate = (
  userId: string,
  targetId: string,
  text: string,
): string => {
  const expert = getRandomValue(experts);
  return text.
    replaceAll("{user}", `<@${userId}>`).
    replaceAll("{target}", `<@${targetId}>`).
    replaceAll("{expert}", expert);
};

const getTitle = (
  theme: Theme,
  score: Score,
): string => {
  if (score === Score.COUNTER) {
    return getRandomValue(counterTitles[theme]);
  }
  if (score === Score.FAIL) {
    return getRandomValue(failureTitles[theme]);
  }
  if (score === Score.SUCCEED) {
    return getRandomValue(successTitles[theme]);
  }
  return getRandomValue(bonusTitles[theme]);
};

const getMessage = (
  userId: string,
  targetId: string,
  theme: Theme,
  score: Score,
): string => {
  if (score === Score.COUNTER) {
    return interpolate(userId, targetId, getRandomValue(counters[theme]));
  }
  if (score === Score.FAIL) {
    return interpolate(userId, targetId, getRandomValue(failures[theme]));
  }
  if (score === Score.SUCCEED) {
    return interpolate(userId, targetId, getRandomValue(successes[theme]));
  }
  return interpolate(userId, targetId, getRandomValue(bonuses[theme]));
};

/**
 * Uses the theme and score value to determine the components to render.
 * @param pavelle - Pavelle's instance.
 * @param userId - The ID of the user who threw.
 * @param targetId - The ID of the target who got hit.
 * @param serverId - The ID of the guild this took place in.
 * @param theme - The theme the server is using.
 * @param score - The score the user earned.
 * @param spoiler - Whether or not the GIF should be spoilered.
 * @param total - The user's new point total.
 * @returns An array of JSON component data.
 */
export const getThrowComponents = (
  pavelle: Pavelle,
  userId: string,
  targetId: string,
  serverId: string,
  theme: Theme,
  score: Score,
  spoiler: boolean,
  total: number,
): Array<AnyAPIActionRowComponent> => {
  const count = getCachedCount(pavelle, `${serverId}-${userId}`);
  const title = getTitle(theme, score);
  const message = getMessage(userId, targetId, theme, score);
  const gif = getRandomValue(gifs[theme]);
  return [
    {
      // eslint-disable-next-line @typescript-eslint/naming-convention -- This is Discord's API requirement.
      accent_color: getAccentColour(score),
      components:   [
        {
          content: `# ${title}`,
          type:    10,
        },
        {
          content: message,
          type:    10,
        },
        {
          divider: true,
          spacing: 1,
          type:    14,
        },
        {
          items: [
            {
              description: null,
              media:       {
                url: gif,
              },
              spoiler: spoiler,
            },
          ],
          type: 12,
        },
        {
          content: `-# You now have ${total.toString()} point(s).\n-# You have ${count.toString()} remaining throws for the hour.`,
          type:    10,
        },
        {
          components: [
            {
              // eslint-disable-next-line @typescript-eslint/naming-convention -- Discord API convention.
              custom_id: "throw",
              disabled:  false,
              label:     "Throw another!",
              style:     3,
              type:      2,
            },
            {
              // eslint-disable-next-line @typescript-eslint/naming-convention -- Discord API convention.
              custom_id: "leaderboard",
              disabled:  false,
              label:     "Check leaderboard",
              style:     1,
              type:      2,
            },
          ],
          type: 1,
        },
      ],
      spoiler: false,
      type:    17,
    },
  ];
};
