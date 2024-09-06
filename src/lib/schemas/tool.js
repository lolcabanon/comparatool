import { z } from 'zod';

import normalizeUrl from 'normalize-url';

const URL = z
  .string()
  .url()
  .transform(
    (str) => (
      console.dir(str),
      normalizeUrl(str, {
        forceHttps: true,
        removeTrailingSlash: true,
        stripHash: true,
        removeQueryParameters: true
      })
    )
  );

export const repoURLSchema = URL;

export const repoJSONSchema = z
  .object({
    name: z.string(),
    full_name: z.string(),
    html_url: URL,
    description: z.string().nullable(),
    homepage: z.string().max(0).or(URL).nullish(),

    license: z
      .object({
        key: z.string(),
        name: z.string(),
        spdx_id: z.string()
      })
      .nullable(),

    created_at: z.coerce.date(),

    updated_at: z.coerce.date(),
    pushed_at: z.coerce.date(),

    stargazers_count: z.number(),
    open_issues_count: z.number()
  })
  .passthrough();
