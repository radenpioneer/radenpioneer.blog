import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const site = defineCollection({
    loader: glob({
        base: 'src/content/site',
        pattern: '**/*.json'
    }),
    schema: z.object({
        title: z.string(),
        description: z.string()
    })
})