# LINE Auth0 Link Demo With Nuxt

**Repository**

- [GitHub](https://github.com/junpei-8/line-auth0-link-demo-with-nuxt)

**Published**

- [Web](https://line-auth0-link-demo-with-nuxt.pages.dev)
- [LIFF](https://liff.line.me/2005255316-w8rBNrbm)
- <details><summary>Line Official Account</summary>
   <br />
   <img src="./_base/docs/images/readme/line-official-account-qr.png" alt=""
  </details>

**Development**

- [Auth0](https://manage.auth0.com/dashboard/jp/line-auth0-link-demo-with-nuxt/users)
- [LINE Developers](https://developers.line.biz/console/provider/2003246473)
- [Cloudflare Workers & Pages](https://dash.cloudflare.com/274e66e8aa5b5102aa2fd7d58c519e5f/pages/view/line-auth0-link-demo-with-nuxt)
- [Cloudflare D1](https://dash.cloudflare.com/274e66e8aa5b5102aa2fd7d58c519e5f/workers/d1/databases/82dbecf7-e916-425f-9273-59405145da56)

<br />

## 🍀 必須環境

---

- [Node >= 20.13.1](https://nodejs.org)
- [Bun >= 1.0.25](https://bun.sh)

> [!TIP]
> No Docker 🥳

<br />

## 🎱 開発方法

---

※ 起動できる主なコマンドの一覧は [`package.json`](./package.json) の `"scripts"` などを参照してください。

<br />

### 事前準備

#### 依存環境のインストール

```sh
bun i
```

<br />

### 開発環境の起動

```sh
bun dev
```

#### Web のみ

```sh
bun web:dev
```

#### DB のみ

```sh
bun web-db:dev
```

<br />

### 擬似本番環境の起動

```sh
bun preview
```

#### Web のみ

```sh
bun web:preview
```

#### DB のみ

```sh
bun web-db:preview
```

＊ DB は開発環境と同じものが使用されます。

<br />

### デプロイ

```sh
bun deploy
```

#### Web のみ

```sh
bun web:deploy
```

#### DB のみ

```sh
bun web-db:deploy
```

<br />

### DB 開発

#### マイグレーションファイルの生成

```sh
bun web-db:generate
```

#### マイグレーションの実行

```sh
bun web-db:migrate <環境>

# 例
bun web-db:migrate dev
```

＊ マイグレーションは `bun dev` や `bun web-db:dev` で自動的に実行されるので、手動で実行する機会は少ないかもしれません。

<br />

### Line Messaging API の反映

```sh
bun line-messaging <スクリプト>

# 例
bun line-messaging ./rich-menu
```

<br />

### その他開発コマンドセット

#### 依存関係の更新

```sh
# 確認
bun ncu

# Package.json を更新し、再度インストール
bun ncu -u && bun i
```

#### 型の手動生成

型は `bun dev` などで、開発 Web サーバー起動・更新時に自動生成されますが、手動で生成することも可能です。

```sh
bun nuxt prepare
```

<br />

## Auth0 の運用準備

---

Auth0 の運用準備については、[こちら](./_base/docs/auth0-starter-guide.md) を参照してください。

<br />

## LIFF の運用準備

---

1. LINE Developers にログインし、プロバイダーを作成します。
2. アプリケーションを仮デプロイします。
3. LINE ログインを有効化し、デプロイした URL をもとに LIFF として設定します。

...作成中

<br />

## 📁 ディレクトリ構成について

---

### ルートディレクトリの記号

ルートディレクトリ直下の主要なディレクトリには、それぞれのディレクトリ名の先頭には特定の記号が付けられています。これは、ディレクトリの役割を明確にするためです。

#### `@`

`@` が先頭につくディレクトリには、プロジェクトやアプリケーションの機能を構成するためのコードが格納されます。

環境に応じて区分されるため、`@環境`（例： `@client`）という形式でディレクトリを作成します。

#### `@x-`

`@x-` が先頭につくディレクトリは、`@` が先頭につくディレクトリと同様に、プロジェクトやアプリケーションの機能を構成するための外部サービスのコードが格納されます。

環境に応じて区分されるため、`@x-環境`（例： `@x-line`）という形式でディレクトリが作成します。

#### `[]`

`[]` が先頭につくディレクトリは、`Monorepo` 構成でいうところの `packages` や `libs` ディレクトリに相当しており、プロジェクト全体で共有されるスクリプトや設定を格納します。

環境による区分が不要なため、`[core]` というディレクトリのみが存在します。

#### `^`

`^` が先頭につくディレクトリは、アプリケーションの実行環境を構成するためのコードが格納されます。

アプリケーションの実行環境は、主に **コンテキスト** と **環境変数** によって分断されるため、`^context` ディレクトリと `^env` ディレクトリが存在します。

#### `_`

`_` が先頭につくディレクトリは、開発環境・実行環境を動かすための構成や、ファイル自体の設定などを格納します。

環境による区分が不要なため、`_base` というディレクトリだけ存在します。
