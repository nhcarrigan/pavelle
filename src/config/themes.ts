/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

/* eslint-disable stylistic/max-len -- Lots of large strings here. */

import type { Theme } from "../interfaces/theme.ts";

const successes: Record<Theme, Array<string>> = {
  cake: [
    "Using simple trigonometry, {user} calculated and threw the cake that successfully hit {target}!",
    "{user} has thrown the cake with all their strength and managed to hit {target}!",
    "Gotcha! {user} has successfully hit {target} right in the face!",
    "{target} made no efforts to {user}'s throw.",
    "{user} threw the cake their mother made with love and hit {target}! A great throw but at what cost?",
    "{user} has skillfully thrown the cake and hit {target} right in the face!",
    "{user} nailed it! {target} didn’t see that one coming!",
    "That cake throw to hit {target} was so perfect! The cake must feel honored.",
    "Score! {target} just got a face full of {user}'s throwing skills.",
    "That was a direct hit on {target}! {user} should join the Olympics!",
    "{user} is basically a professional athlete now after that one. There was nothing you could do, {target}.",
    "{user}'s cake throw at {target} was so smooth, it deserves a slow-motion action replay.",
    "{user} just threw that cake at {target} like the cake owed them money!",
    "Bullseye! {user} deserves a trophy for that throw at {target}!",
    "That was a perfect throw, {user}! Cake just gave {target} a new hairstyle. Trendy!",
    "{user} threw cake like a pro, and {target} didn’t stand a chance.",
  ],
};

const bonuses: Record<Theme, Array<string>> = {
  cake: [
    "{user} threw the cake with might comparable to {expert}'s and hit {target} so hard they fell down!",
    "{user} should consider a career in demolition with that cake throw at {target}.",
    "{user} just launched cake like a rocket, and it hit {target} square in the face!",
    "{user} threw cake like {expert}, and {target} didn’t stand a chance!",
    "That throw was so epic, {user} just made {target} go viral!",
    "{user} hit {target} with cake and created a new dance move: 'The Impact Shuffle!'",
  ],
};

const failures: Record<Theme, Array<string>> = {
  cake: [
    "{user} got distracted at the last possible second of the throw and ended up missing {target}!",
    "{user} threw the cake as far as they can, but they don't have enough arm strength and the cake missed {target}!",
    "Although {user} has tried their best, the cake was thrown without sufficient strength and speed and fell right in front of {target}!",
    "{user} threw cake and it landed in a tree! Nature wins this round!",
    "Well, that was a swing and a miss! {target} is still standing, {user}!",
    "{user} aimed for {target} but hit a passing bird instead. Oops!",
    "{target} just dodged {user}'s cake like Neo!",
    "{user} threw cake like a champ, but {target} dodged expertly!",
  ],
};

const counters: Record<Theme, Array<string>> = {
  cake: [
    "{user} successfully threw the cake towards {target} with the right strength and accuracy, though {target} caught it mid-air and threw it right back at {user}!",
    "{user} aimed for {target} but hit their own foot instead. Whoops.",
    "Wait, what? {target} just caught cake and threw it back at {user}!",
    "{user} threw cake, and {target} just intercepted it like a pro and threw it back!",
    "{user} did their best but {target} caught it and turned the tables! Now {user} knows what it's like to be hit by cake!",
    "Counterattack! {user} thought they were the thrower, but now THEY'RE the target of the cake!",
    "{user} got hit with their own cake like it was a boomerang!",
    "Welp, that throw backfired! {target} just served cake right back to {user}!",
    "Just as {user} was about to hit {target}, they appeared with their own cake and hit {user} instead!",
  ],
};

const gifs: Record<Theme, Array<string>> = {
  cake: [
    "https://i.hep.gg/6UlAYgr34.gif",
    "https://i.hep.gg/UVPwXKHLP.gif",
    "https://i.hep.gg/SdzCbTRVR.gif",
    "https://i.hep.gg/nB6DsoeH5.gif",
    "https://i.hep.gg/kPoEOhyaQ.gif",
    "https://i.hep.gg/qEfn3EGG8.gif",
    "https://i.hep.gg/ZVv86odHak.gif",
    "https://i.hep.gg/2NSMExuNI.gif",
    "https://c.tenor.com/pVLQQYSX2rIAAAAd/tenor.gif",
    "https://c.tenor.com/S-Ch14cZ0L8AAAAd/tenor.gif",
    "https://c.tenor.com/P0wUffEoLHIAAAAd/tenor.gif",
  ],
};

const successTitles: Record<Theme, Array<string>> = {
  cake: [
    "💪  Nice throw!",
    "🎯  Bullseye!",
    "🔥  Direct hit!",
    "🏆  Nailed it!",
    "🥳  Perfect shot!",
    "👏  Well done!",
    "⭐  Amazing aim!",
    "💥  Solid hit!",
    "😎  Too easy!",
    "🥇  Champion throw!",
  ],
};

const failureTitles: Record<Theme, Array<string>> = {
  cake: [
    "💔  So close!",
    "🙈  Missed it!",
    "😅  Better luck next time!",
    "🤷  Oops!",
    "📉  Not quite!",
    "🥴  Swing and a miss!",
    "🤦  That didn’t go as planned!",
    "💨  Just missed!",
    "😬  Whiffed it!",
    "🫠  Embarrassing miss!",
  ],
};

const bonusTitles: Record<Theme, Array<string>> = {
  cake: [
    "✨  Bonus round!",
    "🎉  Double points!",
    "🍀  Lucky shot!",
    "💖  Crowd goes wild!",
    "🤑  Jackpot throw!",
    "🌟  Critical hit!",
    "🥂  Celebration time!",
    "🍰  Extra cake for you!",
    "🔮  Magical throw!",
    "🎆  Fireworks-worthy!",
  ],
};

const counterTitles: Record<Theme, Array<string>> = {
  cake: [
    "🔄  Counterattack!",
    "🛡️  Deflected!",
    "⚔️  Reversal!",
    "👀  Watch out!",
    "😱  Incoming!",
    "🥶  Right back at you!",
    "🚀  Return to sender!",
    "🤯  Unexpected twist!",
    "🎭  Tables have turned!",
    "💥  Boom! Counter hit!",
  ],
};

export {
  successes,
  bonuses,
  failures,
  counters,
  gifs,
  successTitles,
  failureTitles,
  bonusTitles,
  counterTitles,
};
