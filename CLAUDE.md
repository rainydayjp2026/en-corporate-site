# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

株式会社えん（en-solutions.jp）のコーポレートサイト。鳥取を拠点にDX支援・Web制作・アプリ開発を行う会社のブランドサイト。

## アーキテクチャ

ビルドステップなしの静的サイト。

- `index.html` — エントリポイント。React/ReactDOM/Babel をCDN経由で読み込む
- `assets/js/main.js` — JSX で書かれた全コンポーネント（`type="text/babel"` でブラウザ上でトランスパイル）
- `assets/css/style.css` — スクロールアニメーション・キーフレームのみ。残りのスタイルはすべてインラインスタイル（Reactコンポーネント内）
- `assets/images/` — ロゴ画像（`logo-en.png`）

フレームワーク・バンドラー・npm は一切不使用。ファイルを直接ブラウザで開いて動作確認できる。

## デプロイ

`main` ブランチへの push で GitHub Actions が起動し、rsync で Heteml サーバーへデプロイされる。  
接続先: `ssh-rainyday-design.heteml.net:2222` / パス: `/home/users/1/rainyday-design/web/en-solutions.jp/`  
必要なシークレット: `SSH_PRIVATE_KEY`, `SSH_USER`

## デザインシステム

採用バリアントは **B「墨」**（深い黒 × ゴールドクリームのダークテーマ）。

`assets/js/main.js` 冒頭の `TWEAK_DEFAULTS.variant` で切り替える。バリアント定義は `VARIANTS` オブジェクト参照。  
バリアント B のデザイントークン・セクション仕様・アニメーション詳細は `design_handoff_en_solutions/README.md` が正典。

スタイリングはすべてインライン。`v`（バリアントオブジェクト）を props として各コンポーネントに渡し、`v.bg` / `v.accent` 等のトークンを参照する。角丸は0（シャープエッジ固定）。

## スクロールアニメーション

`useReveal()` フック（IntersectionObserver）で `.reveal` クラスを持つ要素を監視し、交差時に `.visible` を付与。`assets/css/style.css` に定義済み。遅延は `.reveal-delay-1` 〜 `.reveal-delay-4` クラスで制御。

## その他

- `bak/` — 旧バージョン・デザインリファレンスのバックアップ（`.gitignore` 対象、変更不要）
- ロゴ画像はダーク背景では `filter: invert(1)` で反転して使用
