/**
 * Simple debounce function that delay calls of the same function
 *
 * @template {any[]} Args
 * @param {(...args: Args) => void} fn
 * @param {number} delay - in ms
 * @returns {(...args: Args) => void}
 */
export const debounce = (fn, delay = 500) => {
  /**
   * @type {NodeJS.Timeout}
   */
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // console.log('fired!');
      fn(...args);
    }, delay);
  };
};

/**
 * Simple debounce function that delay calls of the same function
 *
 * @template {any[]} Args
 * @template {(...args: Args) => Promise<void>} FN
 * @param {FN} fn
 * @param {number} delay - in ms
 * @returns {(...args: Args) => Promise<void>}
 */
export const debounceAsync = (fn, delay = 500) => {
  /**
   * @type {NodeJS.Timeout}
   */
  let timer;
  return async (...args) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      // console.log('fired!');
      await fn(...args);
    }, delay);
  };
};
