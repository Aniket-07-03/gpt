import React from 'react';
import { MessageSquareText, User, Eye, Download, FileText, Image, File } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  status: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getFileIcon = (format: string) => {
    const lowerFormat = (format || '').toLowerCase();
    if (lowerFormat.includes('pdf') || lowerFormat === 'application/pdf') {
      return <FileText className="w-4 h-4 text-red-600" />;
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'image/'].some(type => lowerFormat.includes(type))) {
      return <Image className="w-4 h-4 text-blue-600" />;
    }
    return <File className="w-4 h-4 text-gray-600" />;
  };

  // Parse file info from content similar to GPT MessageBubble
  const parseFileFromContent = (content: string): { file: { file_name: string; format: string; file_url: string } | null, cleanContent: string } => {
    const text = content || '';
    // Newline-separated format
    const lines = text.split('\n');
    if (lines.length >= 3) {
      const fileNameMatch = lines[0].match(/^File name\s*:\s*(.+)$/i);
      const formatMatch = lines[1].match(/^format\s*:\s*(.+)$/i);
      const urlMatch = lines[2].match(/^file-url\s*:\s*(.+)$/i);
      if (fileNameMatch && formatMatch && urlMatch) {
        return {
          file: {
            file_name: fileNameMatch[1].trim(),
            format: formatMatch[1].trim(),
            file_url: urlMatch[1].trim()
          },
          cleanContent: ''
        };
      }
    }

    // Single-line format
    const singleLinePattern = /File name\s*:\s*(.+?)\s+format\s*:\s*(.+?)\s+file-url\s*:\s*(.+)/i;
    const singleLineMatch = text.match(singleLinePattern);
    if (singleLineMatch) {
      return {
        file: {
          file_name: singleLineMatch[1].trim(),
          format: singleLineMatch[2].trim(),
          file_url: singleLineMatch[3].trim()
        },
        cleanContent: ''
      };
    }

    // Pattern: content ending with "at: URL"
    const urlAtEndPattern = /^(.*?)\s+at:\s+(https?:\/\/[^\s]+)$/i;
    const urlAtEndMatch = text.match(urlAtEndPattern);
    if (urlAtEndMatch) {
      const textContent = urlAtEndMatch[1].trim();
      const fileUrl = urlAtEndMatch[2].trim();
      const quotedNameMatch = textContent.match(/"([^"]+)"/);
      let fileName = quotedNameMatch ? quotedNameMatch[1] : 'Document';
      if (!fileName.includes('.')) fileName += '.pdf';
      return {
        file: {
          file_name: fileName,
          format: 'PDF',
          file_url: fileUrl
        },
        cleanContent: textContent
      };
    }

    return { file: null, cleanContent: text };
  };

  const handlePreview = (url: string) => {
    window.open(url, '_blank');
  };

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parseResult = parseFileFromContent(message.text);
  const parsedFile = parseResult.file;
  const displayContent = parseResult.cleanContent;

  return (
    <div className={`flex gap-3 animate-fade-in ${message.isBot ? 'justify-start' : 'justify-end'} notranslate`}>
      {/* Bot Avatar */}
      {message.isBot && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
          <MessageSquareText className="text-red-800" />
        </div>
      )}

      {/* Message Bubble */}
      <div className={`max-w-xs lg:max-w-md ${message.isBot ? 'order-1' : 'order-2'}`}>
        <div
          className={` 
            px-4 py-2 rounded-2xl shadow-sm
          ${message.status !== "received"
  ? 'bg-indigo-200 text-gray-900 text-md text-sm'
  : 'bg-blue-200 text-gray-900 text-sm'}

          `}
        >
          {displayContent && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
            >
              {displayContent}
            </ReactMarkdown>
          )}

          {/* Parsed file block with preview/download */}
          {parsedFile && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between p-3 bg-white bg-opacity-60 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {getFileIcon(parsedFile.format)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{parsedFile.file_name}</p>
                    <p className="text-xs text-gray-600">{(parsedFile.format || '').toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <button
                    onClick={() => handlePreview(parsedFile.file_url)}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors group"
                    title="Preview File"
                    aria-label="Preview File"
                  >
                    <Eye className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDownload(parsedFile.file_url, parsedFile.file_name)}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors group"
                    title="Download File"
                    aria-label="Download File"
                  >
                    <Download className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <p className={`text-xs text-gray-500 mt-1 ${message.isBot ? 'text-left' : 'text-right'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>

      {/* User Avatar */}
      {!message.isBot && (
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-gray-600" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
