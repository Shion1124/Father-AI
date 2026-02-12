import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [mermaidRendered, setMermaidRendered] = useState(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'inherit',
      flowchart: {
        useMaxWidth: false, // Don't scale down, allow scrolling
        htmlLabels: true,
      },
    });
  }, []);

  useEffect(() => {
    if (mermaidRef.current) {
      const mermaidElements = mermaidRef.current.querySelectorAll('.mermaid-chart');

      mermaidElements.forEach(async (element, index) => {
        const id = `mermaid-${index}-${Math.random().toString(36).substr(2, 9)}`;
        const definition = element.getAttribute('data-definition');

        if (!definition || definition === 'undefined' || definition.trim() === '' || element.innerHTML) {
          return;
        }

        try {
          // Validate syntax first to avoid "bomb" error UI
          if (await mermaid.parse(definition)) {
            const { svg } = await mermaid.render(id, definition);
            element.innerHTML = svg;
          }
        } catch (error) {
          // Fallback to displaying the code if parsing or rendering fails
          // console.warn('Mermaid error:', error);
          element.innerHTML = `<div class="p-4 bg-gray-800 border border-gray-700 rounded text-gray-400 text-xs font-mono whitespace-pre-wrap overflow-auto" title="Click to copy source">Mermaid Source:\n${definition}</div>`;
        }
      });
      setMermaidRendered(true);
    }
  }, [content]);

  return (
    <div ref={mermaidRef} className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-table:border-collapse prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:p-3 prose-td:p-3 prose-th:border prose-td:border prose-th:border-gray-300 dark:prose-th:border-gray-700 prose-td:border-gray-200 dark:prose-td:border-gray-800">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';

            if (!inline && language === 'mermaid') {
              return (
                <div
                  className="mermaid-chart my-6 flex justify-center bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto"
                  data-definition={String(children).replace(/\n$/, '')}
                />
              );
            }

            return !inline && match ? (
              <div className="rounded-lg overflow-hidden my-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-xs font-mono text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 flex justify-between">
                  <span>{language}</span>
                </div>
                <pre className="!m-0 !p-4 !bg-gray-50 dark:!bg-gray-900 overflow-x-auto">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            ) : (
              <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-pink-500 dark:text-pink-400" {...props}>
                {children}
              </code>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return (
              <thead className="bg-gray-50 dark:bg-gray-800">
                {children}
              </thead>
            );
          },
          th({ children }) {
            return (
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-700 dark:text-gray-300">
                {children}
              </td>
            );
          },
          a({ href, children }) {
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                {children}
              </a>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
