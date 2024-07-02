import { error } from '@sveltejs/kit';

import { prisma } from '$lib/server/prisma';
import { repoJSONSchema, repoURLSchema } from '$lib/schemas/tool';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  const tools = prisma.tool.findMany();

  return { tools };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const { request, fetch } = event;

    const data = await request.formData();

    try {
      const repoURL = repoURLSchema.parse(data.get('repo_url'));

      console.log('OK', repoURL);

      const repoRoute = new URL(repoURL);

      const repoInfos = await fetch(
        `https://api.github.com/repos${repoRoute.pathname}`
      );

      const repoJSON = repoJSONSchema.parse(await repoInfos.json());

      const id = await prisma.tool.create({
        data: {
          name: repoJSON.name,
          repo: repoURL,
          homepage: repoJSON.homepage,

          license: repoJSON.license.spdx_id,

          created_at: repoJSON.created_at,
          updated_at: repoJSON.updated_at,
          pushed_at: repoJSON.pushed_at,

          stargazers_count: repoJSON.stargazers_count,
          open_issues_count: repoJSON.open_issues_count
        }
      });

      return { id };
    } catch (err) {
      console.error(err);
      error(400);
    }
  }
};
