# 📋 Spec Builder - AI仕様書ビルダー

<p align="center">
  <strong>AIと対話しながらプロダクト仕様書を作成するツール</strong>
</p>

<p align="center">
  <a href="#特徴">特徴</a> •
  <a href="#デモ">デモ</a> •
  <a href="#クイックスタート">クイックスタート</a> •
  <a href="#使い方">使い方</a> •
  <a href="#技術スタック">技術スタック</a> •
  <a href="#貢献">貢献</a>
</p>

---

## 概要

**Spec Builder** は、Claude (Anthropic) と対話しながらプロダクトの仕様書を段階的に作成できるWebアプリケーションです。

新しいプロダクトのアイデアがあるけど、仕様書を書くのが面倒... そんな時に、AIと壁打ちしながら自然に仕様を固めていくことができます。

## ✨ 特徴

- 🤖 **Claude (Anthropic) 対応** - 高品質な対話でプロダクト仕様を整理
- 📝 **5フェーズの構造化ヒアリング** - プロジェクト概要から技術スタックまで段階的に整理
- 👀 **リアルタイムプレビュー** - チャット内容がリアルタイムで仕様書に反映
- 📊 **Mermaidフロー図対応** - 画面遷移図を自動生成・表示
- 📤 **エクスポート機能** - Markdownファイルとしてダウンロード・コピー可能
- 🔐 **セキュアなAPIキー管理** - APIキーはブラウザのみに保存（サーバーには送信されません）

## 📸 デモ

![Spec Builder Demo](https://via.placeholder.com/800x400?text=Spec+Builder+Demo)

*※ 実際のスクリーンショットに置き換えてください*

## 🚀 クイックスタート

### 前提条件

- Node.js 18.x 以上
- npm または yarn または pnpm
- Claude APIキー（[console.anthropic.com](https://console.anthropic.com/) で取得）

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/your-username/spec-builder.git
cd spec-builder

# 依存関係をインストール
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

**初回アクセス時にClaude APIキーの入力を求められます。**

### 本番ビルド

```bash
npm run build
npm start
```

## 🔐 APIキーについて

### セキュリティ

- APIキーは **ブラウザのlocalStorage** に保存されます
- サーバーには保存されません
- HTTPリクエストに自動送信されることはありません

### 注意事項

- 共有PCでは使用後に設定画面からAPIキーを削除してください
- APIキーは [console.anthropic.com](https://console.anthropic.com/settings/keys) で取得できます

## 📖 使い方

### 5つのフェーズ

Spec Builderは、以下の5つのフェーズで仕様書を作成していきます：

| フェーズ | 内容 | 決めること |
|---------|------|-----------|
| 1 | プロジェクト概要 | サービス名、説明、ターゲット、課題、類似サービス |
| 2 | ユーザー種別と機能一覧 | 誰が使うか、何ができるか |
| 3 | 画面一覧と画面フロー | どんな画面が必要か、画面遷移 |
| 4 | 各画面の詳細 | 何が表示され、何ができるか |
| 5 | 技術スタック提案 | フロントエンド、バックエンド、認証、デプロイ先 |

### 基本的な流れ

1. **APIキーを入力** - 初回アクセス時にClaude APIキーを入力
2. **チャットを開始** - 左側のチャットエリアでAIと対話を開始
3. **質問に回答** - AIからの質問に答えていく
4. **プレビューを確認** - 右側のプレビューエリアでリアルタイムに仕様書を確認
5. **エクスポート** - 完成した仕様書をMarkdownでダウンロード

### 設定

右上の設定ボタンから以下の設定が可能です：

- **APIキーの変更** - 別のAPIキーに変更する場合
- **APIキーの削除** - 共有PCで使用後にAPIキーを削除

## 🛠 技術スタック

- **フレームワーク**: [Next.js 16](https://nextjs.org/) (App Router)
- **言語**: TypeScript
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **UIコンポーネント**: [Radix UI](https://www.radix-ui.com/)
- **状態管理**: [Zustand](https://zustand-demo.pmnd.rs/)
- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/)
- **AI**: [Claude (Anthropic)](https://www.anthropic.com/)
- **図表**: [Mermaid](https://mermaid.js.org/)
- **Markdownレンダリング**: react-markdown + remark-gfm

## 📁 プロジェクト構成

```
spec-builder/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/          # チャットAPI（ストリーミング対応）
│   │   │   └── preview/       # プレビューAPI
│   │   ├── page.tsx           # メインページ
│   │   └── layout.tsx         # レイアウト
│   ├── components/
│   │   ├── chat/              # チャット関連コンポーネント
│   │   ├── preview/           # プレビュー関連コンポーネント
│   │   ├── settings/          # 設定関連コンポーネント
│   │   └── ui/                # 共通UIコンポーネント
│   ├── lib/
│   │   └── ai/                # AI関連ユーティリティ
│   ├── store/                 # Zustandストア
│   └── types/                 # TypeScript型定義
├── public/                    # 静的ファイル
└── package.json
```

## 🤝 貢献

貢献を歓迎します！詳細は [CONTRIBUTING.md](./CONTRIBUTING.md) をご覧ください。

### 開発に参加する

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

### Issue

バグ報告や機能リクエストは [Issues](https://github.com/your-username/spec-builder/issues) からお願いします。

## 📜 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](./LICENSE) をご覧ください。

## 🙏 謝辞

- [Anthropic](https://www.anthropic.com/) - Claude API
- [Vercel](https://vercel.com/) - Next.js & AI SDK
- すべてのコントリビューター

---

## 🚀 StartPack - Next.js スターターキット

<p align="center">
  <a href="https://startpack.shingoirie.com/">
    <img src="https://startpack.shingoirie.com/og-image.png" alt="StartPack" width="600">
  </a>
</p>

**Webサービスを高速に立ち上げたいですか？**

[StartPack](https://startpack.shingoirie.com/) は、SaaS、AIツール、Webアプリを素早くNext.jsで構築するためのスタートパックです。

✅ **認証** - ログイン・サインアップ実装済み  
✅ **決済** - Stripe連携でサブスクリプション対応  
✅ **お問い合わせ** - フォーム機能を標準搭載  
✅ **データベース** - すぐに使えるDB設計  

**👉 [startpack.shingoirie.com](https://startpack.shingoirie.com/)**

---

<p align="center">
  Made with ❤️ for Product Managers & Developers
</p>
