import { Hono } from 'hono';
import { cors } from 'hono/cors';
import commentsApp from '../features/comments/api/comments';

const app = new Hono();

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.route('/api', commentsApp);

export default app;