import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load(_event) {
  const types = await prisma.toolType.findMany();

  return { types };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const data = await event.request.formData();

    const type = data.get('type');
    const label = data.get('label');

    if (typeof type === 'string' && typeof label === 'string')
      await prisma.toolType.create({
        data: {
          type,
          label
        }
      });
    else return error(400, 'Remplir toute!!!');
  }
};
