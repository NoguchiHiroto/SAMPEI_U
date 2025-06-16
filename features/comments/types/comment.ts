import { z } from 'zod';

export const commentSchema = z.object({
  userId: z.number().positive(),
  groupId: z.number().positive(),
  content: z.string().min(1, 'コメントは必須です').max(500, 'コメントは500文字以内で入力してください'),
  temperature: z.number().min(30).max(45).optional(),
  healthStatus: z.enum(['良好', '普通', '不調']).optional()
});

export const commentResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  groupId: z.number(),
  content: z.string(),
  temperature: z.number().nullable(),
  healthStatus: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type CommentInput = z.infer<typeof commentSchema>;
export type CommentResponse = z.infer<typeof commentResponseSchema>;