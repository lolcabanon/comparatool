import { repoJSONSchema, repoURLSchema } from '$lib/schemas/tool.js';
import { prisma } from '$lib/server/prisma.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ fetch }) => {
  const tools = await prisma.tool.findMany();

  tools.forEach(async (tool) => {
    const repoURL = repoURLSchema.parse(tool.repo);

    console.log('OK', repoURL);

    const repoRoute = new URL(repoURL);

    const repoInfos = await fetch(
      `https://api.github.com/repos${repoRoute.pathname}`
    );

    const {
      license,
      created_at,
      updated_at,
      pushed_at,
      stargazers_count,
      open_issues_count
    } = repoJSONSchema.parse(await repoInfos.json());

    await prisma.tool.update({
      where: {
        id: tool.id
      },
      data: {
        license: license.spdx_id,

        created_at,
        updated_at,
        pushed_at,

        stargazers_count,
        open_issues_count
      }
    });
  });

  return json({ ok: true });
};
