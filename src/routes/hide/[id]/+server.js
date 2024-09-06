import { json, error } from '@sveltejs/kit';

import { prisma } from '$lib/server/prisma.js';

export let POST = async (event) => {
  const { request, params } = event;

  try {
    const hide = (await request.json()).hide;
    // console.log({ hide });
    await prisma.tool.update({ data: { hide }, where: { id: params.id } });
  } catch (err) {
    console.error(err);

    return error(500, { message: 'Server error' });
  }

  return json({ ok: true });
};
