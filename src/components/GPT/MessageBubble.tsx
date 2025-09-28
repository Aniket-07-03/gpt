import React from 'react';
import { MessageSquareText, User, Eye, Download, FileText, Image, File } from 'lucide-react';

interface Attachment {
  file_name: string;
  format: string;
  file_url: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  status?: string;
  attachments?: Attachment[];
}

interface MessageBubbleProps {
  message: Message;
  className?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, className }) => {
  const isUser = message.sender === 'user';

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getFileIcon = (format: string) => {
    const lowerFormat = format.toLowerCase();
    if (lowerFormat.includes('pdf') || lowerFormat === 'application/pdf') {
      return <FileText className="w-4 h-4 text-red-600" />;
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'image/'].some(type => lowerFormat.includes(type))) {
      return <Image className="w-4 h-4 text-blue-600" />;
    }
    return <File className="w-4 h-4 text-gray-600" />;
  };

  const parseFileFromContent = (content: string): { file: Attachment | null, cleanContent: string } => {
    // First, try parsing newline-separated format
    const lines = content.split('\n');
    if (lines.length >= 3) {
      const fileNameMatch = lines[0].match(/^File name\s*:\s*(.+)$/i) ||lines[0].match(/^फाईलचे नाव\s*:\s*(.+)$/i) ||lines[0].match(/^फ़ाइल का नाम\s*:\s*(.+)$/i) ;
      const formatMatch = lines[1].match(/^format\s*:\s*(.+)$/i) || lines[1].match(/^स्वरूप\s*:\s*(.+)$/i)|| lines[1].match(/^प्रारूप\s*:\s*(.+)$/i);
      const urlMatch = lines[2].match(/^file-url\s*:\s*(.+)$/i) || lines[2].match(/^फाईल-URL\s*:\s*(.+)$/i)|| lines[2].match(/^फ़ाइल-यूआरएल\s*:\s*(.+)$/i);
      
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
    
    // Try single-line format: "File name : ... format : ... file-url : ..."
    const singleLinePattern = /File name\s*:\s*(.+?)\s+format\s*:\s*(.+?)\s+file-url\s*:\s*(.+)/i;
    const singleLineMatch = content.match(singleLinePattern);
    
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
    
    // Try your new format: content ending with "at: URL"
    const urlAtEndPattern = /^(.+?)\s+at:\s+(https?:\/\/[^\s]+)$/i;
    const urlAtEndMatch = content.match(urlAtEndPattern);
    
    if (urlAtEndMatch) {
      const textContent = urlAtEndMatch[1].trim();
      const fileUrl = urlAtEndMatch[2].trim();
      
      // Extract file name from quoted text or use a default
      const quotedNameMatch = textContent.match(/"([^"]+)"/);
      let fileName = quotedNameMatch ? quotedNameMatch[1] : 'Document';
      
      // Add extension if not present
      if (!fileName.includes('.')) {
        fileName += '.pdf';
      }
      
      return {
        file: {
          file_name: fileName,
          format: 'PDF',
          file_url: fileUrl
        },
        cleanContent: textContent
      };
    }
    
    return { file: null, cleanContent: content };
  };

  const handlePreview = (url: string) => {
    window.open(url, '_blank');
  };

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Parse file from content if no attachments are provided
  const parseResult = !message.attachments?.length ? parseFileFromContent(message.content) : { file: null, cleanContent: message.content };
  const parsedFile = parseResult.file;
  const hasAttachments = (message.attachments && message.attachments.length > 0) || parsedFile;
  
  // Use clean content (without the URL part)
  const displayContent = parseResult.cleanContent;

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} ${className || ''}`}>
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
          <MessageSquareText className="text-red-800" />
        </div>
      )}

      {/* Message Bubble */}
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-4 py-2 rounded-2xl shadow-sm text-sm ${
            message.status !== 'received'
              ? 'bg-indigo-200 text-gray-900'
              : 'bg-blue-200 text-gray-900'
          }`}
        >
          {/* Display content only if it's not parsed file info */}
          {displayContent && (
            <div className="whitespace-pre-wrap">
              {displayContent}
            </div>
          )}

          {/* Attachments - either from props or parsed from content */}
          {hasAttachments && (
            <div className="mt-3 space-y-2">
              {/* Regular attachments */}
              {message.attachments?.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white bg-opacity-60 rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {getFileIcon(attachment.format)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {attachment.file_name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {attachment.format.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-3">
                    <button
                      onClick={() => handlePreview(attachment.file_url)}
                      className="p-2 rounded-full hover:bg-gray-200 transition-colors group"
                      title="Preview File"
                    >
                      <Eye className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDownload(attachment.file_url, attachment.file_name)}
                      className="p-2 rounded-full hover:bg-gray-200 transition-colors group"
                      title="Download File"
                    >
                      <Download className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Parsed file from content */}
              {parsedFile && (
                <div className="flex items-center justify-between p-3 bg-white bg-opacity-60 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {getFileIcon(parsedFile.format)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {parsedFile.file_name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {parsedFile.format.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-3">
                    <button
                      onClick={() => handlePreview(parsedFile.file_url)}
                      className="p-2 rounded-full hover:bg-gray-200 transition-colors group"
                      title="Preview File"
                    >
                      <Eye className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDownload(parsedFile.file_url, parsedFile.file_name)}
                      className="p-2 rounded-full hover:bg-gray-200 transition-colors group"
                      title="Download File"
                    >
                      <Download className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <p className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-gray-600" />
        </div>
      )}
    </div>
  );
};

// Example usage component to demonstrate the functionality
const ExampleUsage = () => {
  const sampleMessages: Message[] = [
    {
      id: '1',
      content: 'Here is the report you requested: "GP Unspent Financial Summary" in PDF format. You can access it at: https://egram.onpointsoft.com/Gram%20Panchayat%20Financial%20Balance%20Sheet.pdf',
      sender: 'assistant',
      timestamp: new Date(),
      status: 'received'
    },
    {
      id: '2',
      content: 'File name : Traditional Format.pdf format : application/pdf file-url : https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
      sender: 'assistant',
      timestamp: new Date(),
      status: 'received'
    },
    {
      id: '3',
      content: 'Can you please send me the latest financial report?',
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    },
    {
      id: '4',
      content: 'The document "Annual Budget Report" is ready for download at: https://example.com/annual-budget.pdf',
      sender: 'assistant',
      timestamp: new Date(),
      status: 'received'
    },
    {
      id: '5',
      content: 'Here is another document with traditional attachment format.',
      sender: 'assistant',
      timestamp: new Date(),
      status: 'received',
      attachments: [
        {
          file_name: 'Traditional Attachment.pdf',
          format: 'pdf',
          file_url: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf'
        }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Message Bubble with File Parsing</h2>
      <div className="space-y-4">
        {sampleMessages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default ExampleUsage;