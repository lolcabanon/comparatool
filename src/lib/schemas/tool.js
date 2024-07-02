import { z } from 'zod';

export const repoURLSchema = z.string().url();

export const repoJSONSchema = z
  .object({
    name: z.string(),
    full_name: z.string(),
    html_url: z.string().url(),
    description: z.string(),
    homepage: z.string().url().nullable(),

    license: z.object({
      key: z.string(),
      name: z.string(),
      spdx_id: z.string()
    }),

    created_at: z.coerce.date(),

    updated_at: z.coerce.date(),
    pushed_at: z.coerce.date(),

    stargazers_count: z.number(),
    open_issues_count: z.number()
  })
  .passthrough();
