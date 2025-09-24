# Gemini Project Context: SAMPEI_U（日本語版）

この文書は、SAMPEI_Uプロジェクトの概要、アーキテクチャ、および開発規約について説明し、Geminiのコンテキストとして使用されます。

## プロジェクト概要

SAMPEI_Uは、TypeScriptベースのモノレポで構築されたフルスタックアプリケーションです。以下の要素で構成されています：

*   **モバイルアプリケーション:** React NativeとExpoで構築され、ファイルベースルーティングにExpo Routerを使用
*   **バックエンドAPI:** Node.js用の軽量Webフレームワーク、Honoで構築
*   **データベース:** PostgreSQL、スキーマはDrizzle ORMで管理

このプロジェクトは機能スライスアーキテクチャに従っており、特定の機能（「コメント」など）のバックエンドとフロントエンドコードが一緒にグループ化されています。

### 主要技術

*   **フロントエンド:** React Native、Expo、Expo Router、Redux Toolkit
*   **バックエンド:** Hono
*   **データベース:** PostgreSQL、Drizzle ORM、Supabase（ホスティングとクライアントアクセス用）
*   **言語:** TypeScript
*   **パッケージマネージャー:** npm

## ビルドと実行

### 前提条件

*   Node.jsとnpm
*   Expo CLI（`npm install -g expo-cli`）
*   以下の変数を含む環境ファイル（`.env`）：
    *   `DATABASE_URL`
    *   `EXPO_PUBLIC_SUPABASE_URL`
    *   `EXPO_PUBLIC_SUPABASE_ANON_KEY`

### コマンド

*   **依存関係のインストール:**
    ```bash
    npm install
    ```

*   **アプリケーションの実行（開発環境）:**
    ```bash
    # Metro bundlerを起動し、プラットフォーム（iOS、Android、web）を選択
    npx expo start
    ```

*   **特定のプラットフォームでの実行:**
    ```bash
    # iOS
    npm run ios
    # Android
    npm run android
    # Web
    npm run web
    ```

*   **コードのlint:**
    ```bash
    npm run lint
    ```

*   **データベースマイグレーションの実行:**
    ```bash
    # TODO: Drizzleマイグレーション実行用のコマンドを追加
    # 恐らく `npx drizzle-kit migrate` だが、確認が必要
    ```

## 開発規約

*   **機能スライスアーキテクチャ:** `features`ディレクトリがアプリケーションのコアです。各機能（例：`comments`、`users`）は、独自の`api`、`schema`、`types`を含みます。

*   **状態管理:** フロントエンドは、グローバル状態管理にRedux Toolkitを使用します。スライスは`slice`ディレクトリで定義されます。

*   **API:** バックエンドAPIはHonoで構築されています。APIルートは`features`ディレクトリで定義され、その後`api/v1/route.ts`で集約されます。APIにはOpenAPIドキュメントが含まれます。

*   **データベーススキーマ:** Drizzle ORMを使用してデータベーススキーマを管理します。スキーマ定義は`features/*/schema/*.ts`にあります。

*   **コーディングスタイル:** プロジェクトはコードlintingにESLintを使用します。既存のコーディングスタイルと規約に従ってください。