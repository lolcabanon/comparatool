import { ghAuth } from './ghFetch';

/**
 * @typedef {string} ToolName
 * @typedef {string?} PackageName
 */

/**
 *
 * @param {Pick<import('@prisma/client').Tool, 'name' | 'repo'>} tool
 * @returns {Promise<[ToolName, PackageName]>}
 */
export const getNPMpackage = async (tool) => {
  const ghURL = tool.repo;
  const urlObject = new URL(ghURL);

  try {
    const { default_branch } = await (
      await fetch(`https://api.github.com/repos${urlObject.pathname}`, ghAuth())
    ).json();

    // console.log('default_branch', default_branch, tool.name);

    const json = await (
      await fetch(
        `https://raw.githubusercontent.com${urlObject.pathname}/${default_branch ?? 'main'}/package.json`,
        ghAuth()
      )
    ).json();

    return [tool.name, json.name];
  } catch (e) {
    console.error(e);
    console.log('failed getting package.json for', tool.name);
  }

  try {
    const { download_url } = await (
      await fetch(
        `https://api.github.com/repos${urlObject.pathname}/readme`,
        ghAuth()
      )
    ).json();

    const readme = await (await fetch(download_url, ghAuth())).text();

    for (let line of readme.split('\n')) {
      const matches = line.match(/npm i(?:nstall)?(?: --.*)? (\b.*\b)/);

      // matches && console.log(matches);
      if (matches) {
        return [tool.name, matches[1]];
      }
    }
  } catch (e) {
    console.error(e);
    console.log('failed getting readme for', tool.name);
  }

  return [tool.name, null];
};

/**
 *
 * @param {Pick<import('@prisma/client').Tool, 'name' | 'repo'>[]} tools
 * @returns {Promise<[ToolName, PackageName][]>}
 */
export const getNPMpackages = async (tools) => {
  return Promise.all(tools.map(getNPMpackage));
};
