import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().min(1, '名前は必須です').max(255),
  email: z.string().email('有効なメールアドレスを入力してください'),
  groupId: z.number().positive()
});

export const UserResponseSchema = UserSchema.extend(
  {
  id: z.number(),
  name: z.string(),
  email: z.string(),
  groupId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type UserInput = z.infer<typeof UserSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;