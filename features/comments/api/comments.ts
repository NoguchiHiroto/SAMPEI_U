import { createClient } from '@supabase/supabase-js';
import { desc, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { Hono } from 'hono';
import postgres from 'postgres';
import { commentSchema } from '../../../types/comment';
import { comments } from '../schema/comment';

const app = new Hono();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const databaseUrl = process.env.DATABASE_URL!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const sql = postgres(databaseUrl);
const db = drizzle(sql);

app.post('/comments', async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = commentSchema.parse(body);

    const [newComment] = await db
      .insert(comments)
      .values(validatedData)
      .returning();

    return c.json({ success: true, data: newComment }, 201);
  } catch (error) {
    console.error('Error creating comment:', error);
    return c.json({ success: false, error: 'Failed to create comment' }, 400);
  }
});

app.get('/comments/group/:groupId', async (c) => {
  try {
    const groupId = parseInt(c.req.param('groupId'));
    
    const groupComments = await db
      .select()
      .from(comments)
      .where(eq(comments.groupId, groupId))
      .orderBy(desc(comments.createdAt));

    return c.json({ success: true, data: groupComments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return c.json({ success: false, error: 'Failed to fetch comments' }, 500);
  }
});

app.get('/comments/user/:userId/latest', async (c) => {
  try {
    const userId = parseInt(c.req.param('userId'));
    
    const [latestComment] = await db
      .select()
      .from(comments)
      .where(eq(comments.userId, userId))
      .orderBy(desc(comments.createdAt))
      .limit(1);

    return c.json({ success: true, data: latestComment || null });
  } catch (error) {
    console.error('Error fetching latest comment:', error);
    return c.json({ success: false, error: 'Failed to fetch latest comment' }, 500);
  }
});

export default app;