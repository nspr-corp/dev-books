// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Schema común para todas las colecciones
const baseSchema = z.object({
    title: z.string(),
    author: z.string(),
    publishDate: z.date(),
    description: z.string(),
    image: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()),
    isIntro: z.boolean().default(false), 
    order: z.number(),
    
    githubUrl: z.string().optional(),
    linkedinUrl: z.string().optional(),
    authorImage: z.string().optional(),
    level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    readingTime: z.number().optional(),
    status: z.boolean().optional(),
});

export const collections = {
    'linux': defineCollection({ schema: baseSchema }),
    'linux-2': defineCollection({ schema: baseSchema }),
};