/**
 *
 * @param {Event} e
 * @param {string} pkgName
 */
export const copyPkgNAme = (e, pkgName) => {
  navigator.clipboard.writeText(`pn i -D ${pkgName}`);
};
