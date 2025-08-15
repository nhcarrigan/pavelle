/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

/**
 * Returns a random value from the provided array.
 * @template T - The type of the elements in the array.
 * @param array - The array to select a random value from.
 * @returns A random value from the array.
 */
export const getRandomValue = <T>(array: Array<T>): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- We know the array is not empty.
  return array[randomIndex] as T;
};
