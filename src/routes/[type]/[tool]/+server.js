import { prisma } from '$lib/server/prisma.js';
import { json } from '@sveltejs/kit';

export const POST = async (event) => {
  const tool = event.params.tool;
  let status, message;

  console.log('POST requested', tool);

  const notes = await event.request.text();

  try {
    await prisma.tool.update({ data: { notes }, where: { id: tool } });
    status = 200;
    message = 'OK';
  } catch (e) {
    console.error(e);
    status = 500;
    message = e instanceof Error ? e.message : 'Erreur inconnue';
  }

  return json({ message }, { status });
};

export const DELETE = async (event) => {
  const tool = event.params.tool;
  let status, message;

  console.log('DELETE requested', tool);

  try {
    await prisma.tool.delete({ where: { id: tool } });
    status = 200;
    message = 'OK';
  } catch (e) {
    console.error(e);
    status = 500;
    message = e instanceof Error ? e.message : 'Erreur inconnue';
  }

  return json({ message }, { status });
};
