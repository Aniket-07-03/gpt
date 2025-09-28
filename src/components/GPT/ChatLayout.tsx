import React from 'react';
import { ChatInterface } from './ChatInterface';
import { ArrowLeft, Link } from 'lucide-react';
// import Link from 'next/link'; // if not using Next.js, replace with <a href="">

export const ChatLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 hidden sm:flex flex-col bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-md">AI</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">E-Gram Swaraj</h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          <Link href="/dashboard">
            <div className="flex items-center space-x-2 text-sm text-blue-600 hover:underline cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </div>
          </Link>
        </nav>
      </aside>

      {/* Main Chat Interface */}
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
};
