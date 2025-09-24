import commentsApp from '@/features/comments/api/comments';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from "@hono/zod-openapi";
import "dotenv/config";
/** ルートパス */
const ROOT = '/' as const;
/** Honoアプリケーション */
const app = new OpenAPIHono();
// OpenAPIドキュメントの追加
app
  // OpenAPIドキュメントURLパス
  .doc('/api/v1/specification', {
    openapi: '3.0.0',
    info: {
      title: 'SAMPEI_U API',
      description:
        'Typeset の API ドキュメントです。（Open API Specification 3.0.0 準拠）',
      version: '1.0.0',
    },
    /** Open APIのテスト実行サーバー */
    servers: [
      {
        url: '/',
        description: 'ローカル開発環境',
      },
    ],
    tags: [
      {
        name: 'User',
        description: 'ユーザー関連の操作',
      },
      {
        name: 'Auth',
        description: '認証関連の操作',
      },
      {
        name: 'Post',
        description: '投稿関連の操作',
      },
      {
        name: 'Comment',
        description: 'コメント関連の操作',
      },
    ],
  })
  .get('/api/v1/', swaggerUI({url: '/api/v1/specification'}));
app.route('/api', commentsApp);


export default app;