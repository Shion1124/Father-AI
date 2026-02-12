'use client';

import { useChat } from 'ai/react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex-none p-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Father-AI
          </h1>
          <div className="text-xs text-gray-400 px-2 py-1 rounded bg-gray-800 border border-gray-700">
            Beta
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-6 pb-20">
          {messages.length === 0 && (
            <div className="text-center py-20 px-4 animate-in fade-in zoom-in duration-500">
              <div className="text-6xl mb-6 opacity-80">🪐</div>
              <h2 className="text-2xl font-bold mb-4 text-gray-100">Welcome to Father AI</h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto">
                あなたの興味や好きなことを教えてください。<br />
                AIがあなたの可能性を広げるロードマップを描きます。
              </p>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
            >
              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-6 py-4 shadow-xl backdrop-blur-sm ${m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-800/90 text-gray-100 rounded-bl-none border border-gray-700/50'
                  }`}
              >
                <div className="text-xs font-bold mb-1 opacity-50 uppercase tracking-wider flex items-center gap-2">
                  {m.role === 'user' ? (
                    <>
                      <span>You</span>
                      <span className="w-2 h-2 rounded-full bg-blue-300"></span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      <span>Father AI</span>
                    </>
                  )}
                </div>
                {m.role === 'user' ? (
                  <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
                ) : (
                  <MarkdownRenderer content={m.content} />
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start w-full animate-pulse">
              <div className="bg-gray-800/50 rounded-2xl rounded-bl-none px-6 py-4 border border-gray-700/30">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-none p-4 md:p-6 bg-gray-900/80 backdrop-blur-md border-t border-gray-800">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-30 group-hover:opacity-100 transition duration-500 blur"></div>
            <div className="relative flex items-center gap-2 bg-gray-900 rounded-full p-1 pl-4 pr-1">
              <input
                className="flex-1 bg-transparent text-white focus:outline-none placeholder-gray-500 py-3"
                value={input}
                placeholder="メッセージを入力..."
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-full p-3 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
          </form>
          <p className="text-center text-xs text-gray-600 mt-2">
            AIは間違いを犯す可能性があります。重要な情報は確認してください。
          </p>
        </div>
      </footer>
    </div>
  );
}
