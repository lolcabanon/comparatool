import { prisma } from '$lib/server/prisma.js';
import { json } from '@sveltejs/kit';

export const DELETE = async (event) => {
  const type = event.params.type;
  let status, message;

  console.log('DELETE requested', type);

  try {
    await prisma.toolType.delete({ where: { type } });
    status = 200;
    message = 'OK';
  } catch (e) {
    console.error(e);
    status = 500;
    message = e instanceof Error ? e.message : 'Erreur inconnue';
  }

  return json({ message }, { status });
};
