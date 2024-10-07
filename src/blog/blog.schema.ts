import { z } from 'zod';
const blogSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).min(1),
});

const createBlogSchema = blogSchema.required();
const updateBlogSchema = createBlogSchema.partial();
type updateBlogDto = z.infer<typeof updateBlogSchema>;
type createBlogDto = z.infer<typeof createBlogSchema>;
export { createBlogSchema, createBlogDto, updateBlogDto, updateBlogSchema };
