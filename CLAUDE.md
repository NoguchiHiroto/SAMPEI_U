# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際にClaude Code (claude.ai/code) にガイダンスを提供します。

## 開発コマンド

```bash
# 開発サーバーの起動
npm start
# または
npx expo start

# プラットフォーム固有の開発
npm run android      # Androidエミュレータで起動
npm run ios          # iOSシミュレータで起動  
npm run web          # Web版で起動

# コード品質
npm run lint         # ESLintの実行

# データベース操作
npx drizzle-kit generate    # データベースマイグレーションの生成
npx drizzle-kit migrate     # データベースマイグレーションの実行
npx drizzle-kit studio     # データベース管理用Drizzle Studioの起動
```

## アーキテクチャ概要

### プロジェクト構造
これは、健康・体温追跡に焦点を当てたファイルベースルーティングを使用するReact Native Expoアプリケーションです。

**コア技術:**
- **フロントエンド**: React Native 0.79.3 + Expo 53 + TypeScript
- **ルーティング**: ファイルベースルーティングのExpo Router
- **状態管理**: 型付きフックのRedux Toolkit
- **データベース**: Drizzle ORM + SupabaseのPostgreSQL
- **API**: バックエンドエンドポイント用Hono.js

### ナビゲーション アーキテクチャ
- **ルートレイアウト** (`app/_layout.tsx`): Reduxストア、テーマ、フォント読み込みを提供
- **タブナビゲーション** (`app/(tabs)/_layout.tsx`): `assets/common/footer.ts`で設定された3つのメインタブ
  - `input`: カスタムSwipeNumberInputコンポーネントによる体温・健康データ入力
  - `graph`: データ可視化（プレースホルダー）  
  - `group`: グループ管理（プレースホルダー）

### 状態管理
`store/store.ts`にある型付きReduxセットアップ:
- **Comment Slice** (`slice/commentSlice.ts`): API呼び出し用非同期thunksで健康コメントを処理
- **User Slice** (`slice/userSlice.ts`): ユーザーとグループ管理
- **初期状態**: userName、temperature、symptoms、commentsを含む

### データベーススキーマ
Drizzle ORMを使用した`features/*/schema/*.ts`のスキーマファイル:

**Usersテーブル**:
- id, name, email, groupId, timestamps

**Groupsテーブル**:  
- id, name, timestamps

**Commentsテーブル**:
- id, userId, groupId, content, temperature (numeric 3,1), healthStatus, timestamps

### 機能ベースアーキテクチャ
各機能は以下の構造に従います:
```
features/[feature]/
├── api/          # APIエンドポイントとハンドラー
├── schema/       # データベーススキーマ定義  
├── types/        # TypeScript型定義
```

### API アーキテクチャ
- **バックエンド**: CORS有効化済みの`api/index.ts`のHono.jsサーバー
- **エンドポイント**: 機能ベースルーティング（現在はcommentsが実装済み）
- **データベース**: スキーマ生成付きDrizzle ORMのPostgreSQL

## 主要コンポーネント

### SwipeNumberInput
`app/(tabs)/input/components/SwipeNumberInput/SwipeNumberInput.tsx`にあります - ハプティックフィードバック付きのカスタム水平スクロール体温ピッカー（35.0-45.0°C範囲）。

### テーマシステム
- 自動ダーク・ライトモード付きReact Navigationテーマを使用
- `hooks/useColorScheme.ts`によるカラースキーム検出
- iOSブラー効果付きプラットフォーム固有スタイリング
```Typescript
const a:number = 'aa';
```


## 開発メモ

### データベースセットアップ
`DATABASE_URL`環境変数が必要です。`features/*/schema/*.ts`ファイルからのスキーマ生成には`drizzle.config.ts`を使用してください。

### タブ設定  
ナビゲーションタブの追加・変更は`assets/common/footer.ts`を修正してください。現在はプレースホルダーアイコン（すべて"house.fill"）を使用しています。

### Redux統合
すべてのコンポーネントは`store/store.ts`の型付きフックを使用します:
- 状態アクセス用`useSelector`
- アクション用`useDispatch`

### 体温入力
アプリのコア機能は、0.1°C精度、ハプティックフィードバック、特定の体温値への滑らかなスクロール機能を持つカスタムFlatListベースの水平ピッカーを使用しています。