import { z } from 'zod';

import normalizeUrl from 'normalize-url';

export const repoURLSchema = z
  .string()
  .url()
  .transform((str) =>
    normalizeUrl(str, {
      forceHttps: true,
      removeTrailingSlash: true,
      stripHash: true,
      removeQueryParameters: true
    })
  );

export const repoJSONSchema = z
  .object({
    name: z.string(),
    full_name: z.string(),
    html_url: z.string().url(),
    description: z.string(),
    homepage: z.string().url().or(z.string().max(0)).nullish(),

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
