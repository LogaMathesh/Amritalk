import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Ollama = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // System prompt to set behavior of the chatbot
  const systemPrompt = `
You are a mental health support assistant.
You provide kind, empathetic, supportive, and non-judgmental responses.
You help users who are feeling stressed, anxious, sad, or overwhelmed.
You are not a therapist, so avoid giving medical advice or diagnosis.
Respond in a calm and understanding tone. Keep answers short and gentle.
`;

  const buildPrompt = () => {
    // Optional: include a few past messages for context
    const recentMessages = messages.slice(-4).map(msg => {
      return `${msg.sender === 'user' ? 'User' : 'AI'}: ${msg.text}`;
    }).join('\n');

    return `
${systemPrompt.trim()}

${recentMessages}
User: ${input}
AI:
`.trim();
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setIsLoading(true);

    setMessages((prev) => [...prev, { sender: 'user', text: input }]);

    const fullPrompt = buildPrompt();

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'tinyllama',
          prompt: fullPrompt,
          stream: true
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let botResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const parsed = JSON.parse(line);
            botResponse += parsed.response;

            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.sender === 'bot') {
                return [...prev.slice(0, -1), { sender: 'bot', text: botResponse }];
              } else {
                return [...prev, { sender: 'bot', text: botResponse }];
              }
            });
          } catch (err) {
            console.error('Streaming parse error:', err);
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Sorry, something went wrong. Please try again later.',
        },
      ]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <Card className="flex-1 flex flex-col bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-blue-600 p-4">
          <h1 className="text-2xl font-bold text-white text-center">
            Mental Health Support Assistant
          </h1>
        </div>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              Start a conversation to get support and guidance.
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="2"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                       flex items-center justify-center min-w-[4rem]"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Ollama;
