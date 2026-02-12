# Father-AI - 子供の夢を育むAIキャリアメンター 🐻

Father-AIは、小中学生を対象とした、対話型の進路相談・ロードマップ作成AIエージェントです。
優しい「お父さん」のような口調で子供の興味を引き出し、将来の夢に向けた具体的なステップ（ロードマップ）を可視化します。

## � 主な特徴

*   **対話型カウンセリング**: 「何が好き？」から始まり、子供の隠れた興味や才能を深掘りします。
*   **逆算型ロードマップ (Mermaid)**: 夢の職業から現在までを逆算し、フローチャートで可視化。横スクロール対応で長い道のりも見やすく表示します。
*   **実在書籍データベース (Verified RAG)**: ハルシネーション（嘘の情報）を防ぐため、事前に調査された実在する「小中学生向けの名著・入門書」リストに基づいてアドバイスを行います。
    *   *カバー領域: 小説、詩、音楽、プログラミング、科学、デザイン*
*   **優しいUI**: 子供が親しみやすい、視認性の高いダークモードUIを採用。
*   **エラー耐性**: Mermaid図の描画エラーを抑制し、常に安定した情報提供を目指しています。

## �️ 技術スタック

*   **Frontend**: Next.js 15+ (App Router), React 19, TypeScript
*   **Styling**: Tailwind CSS 4, `@tailwindcss/typography`
*   **AI Engine**: Qwen2.5-Coder / Qwen3 (via Ollama)
    *   *OpenAI SDK Compatible*
*   **Visualization**: `mermaid.js` (with scrollable support), `react-markdown`, `remark-gfm`
*   **System Prompt**: `data/Context_Engineering.md` (役割定義と書籍DB)

## 🚀 セットアップ手順

### 1. 前提条件
*   Node.js 18+
*   [Ollama](https://ollama.com/) がインストールされていること

### 2. AIモデルの準備

Ollamaを使用して、ローカルLLM（推奨: `qwen2.5-coder` や `qwen3` 系）をダウンロード・起動します。

```bash
# モデルのダウンロード (例)
ollama pull qwen2.5-coder:7b

# Ollamaサーバーの起動
ollama serve
```

### 3. プロジェクトのインストール

```bash
git clone <repository-url>
cd father-ai
npm install
```

### 4. 環境変数の設定

`.env.local` ファイルを作成し、Ollamaのエンドポイントを設定します。

```env
# Ollama (OpenAI互換エンドポイント)
QWEN_API_ENDPOINT=http://localhost:11434/v1
QWEN_MODEL_NAME=qwen2.5-coder:7b
# API KeyはOllamaでは不要ですが、SDKの仕様上ダミー値を設定
OPENAI_API_KEY=ollama
```

### 5. アプリケーションの起動

```bash
npm run dev
```
ブラウザで `http://localhost:3000` (または表示されたポート) を開いてください。

## 📁 ディレクトリ構造

```
father-ai/
├── data/
│   └── Context_Engineering.md    # システムプロンプト＆書籍データベース
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts     # Chat API (OpenAI Stream)
│   │   ├── globals.css           # Tailwind & Mermaid Styling
│   │   ├── layout.tsx
│   │   └── page.tsx              # メインチャットUI
│   ├── components/
│   │   └── MarkdownRenderer.tsx  # Mermaid/Markdownレンダラー
│   └── lib/
└── README.md
```

## � 貢献について

このプロジェクトは現在ベータ版です。
Mermaid図の生成精度向上や、書籍データベースの拡充など、プルリクエストを歓迎します！

## � ライセンス

MIT License
