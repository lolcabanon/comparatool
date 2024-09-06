import { fail } from '@sveltejs/kit';

import { repoJSONSchema, repoURLSchema } from '$lib/schemas/tool';
import { ZodError } from 'zod';

import { prisma } from '$lib/server/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { ghAuth } from '$lib/server/ghFetch';
import { getNPMpackage } from '$lib/server/getNPM';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const tools = await prisma.tool.findMany({
    where: {
      typeStr: params.type
    },
    include: {
      type: true
    }
  });

  // const pkgs = [] ?? (await getNPMpackages(tools));

  return { tools };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, fetch, params }) => {
    const data = await request.formData();

    try {
      const repoURL = repoURLSchema.parse(data.get('repo_url'));

      console.log('OK', repoURL);

      const repoRoute = new URL(repoURL);

      const repoInfos = await fetch(
        `https://api.github.com/repos${repoRoute.pathname}`,
        ghAuth()
      );

      const repoJSON = repoJSONSchema.parse(await repoInfos.json());

      const [, pkgName] = await getNPMpackage({
        name: repoJSON.name,
        repo: repoURL
      });

      const tool = await prisma.tool.create({
        data: {
          typeStr: params.type,

          name: repoJSON.name,
          repo: repoURL,
          homepage: repoJSON.homepage,
          pkgName,

          license: repoJSON.license?.spdx_id ?? 'Inconnue',

          created_at: repoJSON.created_at,
          updated_at: repoJSON.updated_at,
          pushed_at: repoJSON.pushed_at,

          stargazers_count: repoJSON.stargazers_count,
          open_issues_count: repoJSON.open_issues_count
        },
        include: {
          type: true
        }
      });

      return { tool };
    } catch (err) {
      console.error(err);
      // error(400);

      let message = 'Erreur inconnue';

      if (err instanceof ZodError) {
        message = 'Erreur de validation des champs.';
      } else if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2002':
            message = 'Cet outil est déjà répertorié!';
            break;
          default:
            message = 'Erreur DB inconnue';
        }
      }

      return fail(400, {
        message
      });
    }
  }
};
