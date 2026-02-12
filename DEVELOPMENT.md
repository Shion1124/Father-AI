# Father AI Development Guide

## 🎯 開発の進め方

### 現在の状態
✅ Next.jsプロジェクトのセットアップ完了
✅ AI SDK（Qwen + Gemini）の統合完了
✅ チャットUIの実装完了
✅ Markdown/Mermaidレンダラーの実装完了
✅ Context Engineeringプロンプトの組み込み完了

### 次のステップ

#### 1. Qwenモデルのセットアップ（必須）

```bash
# Ollamaのインストール
brew install ollama

# Qwenモデルのダウンロード
ollama pull qwen3:8b

# サーバー起動（別ターミナルで）
ollama serve
```

**注意**: `qwen3-coder-next3b`がまだOllamaで利用できない場合は、`qwen2.5-coder:3b`を使用してください。
その場合、`.env.local`の`QWEN_MODEL_NAME`を更新してください。

#### 2. 環境変数の設定

`.env.local`ファイルを編集：

```bash
# 必須: Gemini APIキーを設定（フォールバック用）
GOOGLE_GENERATIVE_AI_API_KEY=your_actual_api_key_here

# Qwen設定（Ollama使用時）
QWEN_API_ENDPOINT=http://localhost:11434/v1
QWEN_MODEL_NAME=qwen2.5-coder:3b
```

#### 3. 開発サーバーの起動

```bash
cd /Users/yoshihisashinzaki/AI_agent/father-ai
npm run dev
```

ブラウザで http://localhost:3000 を開く

#### 4. テスト

以下のような質問でテストしてください：

```
「絵を描くことが好きです」
「ロボットを作りたいです」
「医者になりたいです」
```

AIは以下を返すはずです：
- 興味の深掘り質問
- 具体的な職業提案
- Mermaidダイアグラムによるロードマップ
- 段階別のアクションテーブル
- 推薦書籍リスト

### MCP Tools統合（今後）

`context7`と`Serena`の統合は、以下のファイルに実装予定：
- `src/lib/utils.ts` - mcpToolsオブジェクト
- `src/app/api/chat/route.ts` - ツール呼び出しロジック

### トラブルシューティング

#### Qwenモデルが動かない場合
1. Ollamaが起動しているか確認: `ps aux | grep ollama`
2. モデルがダウンロードされているか確認: `ollama list`
3. フォールバックとしてGeminiを使用: `src/lib/ai-client.ts`の`getModel(true)`

#### Mermaidが表示されない場合
- ブラウザのコンソールでエラーを確認
- Mermaid記法が正しいか確認
- `MarkdownRenderer.tsx`のセキュリティレベル設定を確認

## 📚 参考資料

- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Qwen Models](https://github.com/QwenLM/Qwen)
- [Mermaid Documentation](https://mermaid.js.org/)
