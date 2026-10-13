import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  RotateCcw,
  Send,
  Bot,
  User,
  Sparkles,
  Plane,
} from 'lucide-react';
import { ChatMessage } from '../../types';
import {
  PREDEFINED_QUESTIONS,
  matchBotIntent,
  FALLBACK_RESPONSE,
} from './chatbotKnowledge';
import { ChatLeadForm } from './ChatLeadForm';

const STORAGE_KEY = 'dronetv_chatbot_history_v1';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'init-msg-1',
  sender: 'bot',
  text: "Hello! 👋 Welcome to **DroneTV AI Support & Lead Assistant**.\n\nI can help you explore our DGCA pilot academy, commercial aerial mapping, agricultural spraying services, and registration details.\n\nHow may I assist you today?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestedQuestions: PREDEFINED_QUESTIONS,
};

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read chat history from sessionStorage', e);
    }
    return [INITIAL_MESSAGE];
  });

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync with sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn('Could not write chat history to sessionStorage', e);
    }
  }, [messages]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Handle Clear / Reset Conversation
  const handleReset = () => {
    const fresh: ChatMessage = {
      id: 'reset-' + Date.now(),
      sender: 'bot',
      text: "Conversation cleared. 🔄 How can DroneTV assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedQuestions: PREDEFINED_QUESTIONS,
    };
    setMessages([fresh]);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  // Handle Sending a Question
  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate natural AI response delay
    setTimeout(() => {
      const result = matchBotIntent(query);

      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: result.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: result.chips,
        showLeadForm: result.triggerForm,
        preselectedUserType: result.userType,
        preselectedService: result.service,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  // Render text with bold and newlines
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, lIdx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={lIdx} className="block leading-relaxed">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-cyan-300">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </span>
      );
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Toggle Button - Solid Clean Surface */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg shadow-lg border border-cyan-400 transition-colors"
          aria-label="Open DroneTV AI Assistant"
        >
          <Plane className="w-4 h-4 text-slate-950 -rotate-45" />
          <span className="text-sm font-semibold tracking-wide">DroneTV AI Assistant</span>
          <span className="bg-slate-950 text-cyan-400 text-[10px] px-1.5 py-0.5 rounded font-mono">
            Online
          </span>
        </button>
      )}

      {/* Expanded Chat Window - Solid Clean Borders */}
      {isOpen && (
        <div className="flex flex-col w-[360px] sm:w-[420px] h-[580px] max-h-[85vh] bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm text-white">DroneTV AI Assistant</h3>
                  <span className="text-[10px] bg-slate-950 text-cyan-400 border border-slate-800 px-1 py-0.2 rounded font-mono">
                    Lead Bot
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">DGCA & Commercial Operations</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset Conversation"
                className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Assistant"
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container - Solid Dark Slate */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-950 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`rounded-lg px-3.5 py-2.5 ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600 text-white rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <div className="text-xs sm:text-[13px] leading-relaxed">
                      {renderFormattedText(msg.text)}
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-500 mt-1 px-1 block">
                    {msg.timestamp}
                  </span>

                  {/* Inline Lead Capture Form */}
                  {msg.showLeadForm && (
                    <ChatLeadForm
                      defaultUserType={msg.preselectedUserType}
                      defaultService={msg.preselectedService}
                      onSuccessSubmitted={(name) => {
                        const confirmMsg: ChatMessage = {
                          id: 'confirm-' + Date.now(),
                          sender: 'bot',
                          text: `🎉 Thank you, **${name}**! Your enquiry is registered with our admissions and technical sales team. An SMS & email acknowledgment has been logged.\n\nIs there anything else I can assist you with?`,
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          suggestedQuestions: [
                            'What services does DroneTV provide?',
                            'What courses / training are available?',
                            'How can I contact DroneTV?',
                          ],
                        };
                        setMessages((prev) => [...prev, confirmMsg]);
                      }}
                    />
                  )}

                  {/* Suggested Question Chips */}
                  {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="mt-2.5 space-y-1.5">
                      <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span>Suggested Queries:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedQuestions.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(chip)}
                            className="text-left text-[11px] bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-slate-800 hover:border-slate-700 px-2.5 py-1 rounded transition-colors"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="ml-1 text-[11px]">DroneTV Assistant is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-slate-900 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about courses, services, registration..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputText.trim()}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-2 rounded-lg transition-colors disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-500">
              <span>Rule-based Assistant</span>
              <button
                onClick={handleReset}
                className="hover:text-cyan-400 transition-colors"
              >
                Clear history
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
