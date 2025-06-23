import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, title }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative">
      {title && (
        <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-medium rounded-t-lg border-b border-gray-700">
          {title}
        </div>
      )}
      <div className="relative bg-gray-900 rounded-b-lg overflow-hidden">
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors z-10"
          title="Copy code"
        >
          {copied ? (
            <Check size={16} className="text-emerald-400" />
          ) : (
            <Copy size={16} className="text-gray-400" />
          )}
        </button>
        
        <pre className="p-4 pr-12 overflow-x-auto text-sm">
          <code className={`language-${language} text-gray-100`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;