import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const tool = await prisma.tool.findUniqueOrThrow({
    where: { id: params.tool },
    include: { type: true }
  });

  return { tool };
}
