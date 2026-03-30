import React, { useState } from 'react';
import { Send, Phone, Video, MoreVertical } from 'lucide-react';
import { Conversation, Message } from '../types';

export const Conversations: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      leadId: 1,
      leadName: 'João Silva',
      leadPhone: '(11) 99999-9999',
      channel: 'WHATSAPP',
      status: 'ACTIVE',
      messages: [
        {
          id: 1,
          conversationId: 1,
          content: 'Olá! Gostaria de saber mais sobre seus serviços',
          direction: 'INCOMING',
          status: 'READ',
          senderName: 'João Silva',
          createdAt: '2024-02-10T10:30:00',
        },
        {
          id: 2,
          conversationId: 1,
          content: 'Oi João! Claro, posso ajudá-lo. Qual é sua necessidade?',
          direction: 'OUTGOING',
          status: 'SENT',
          senderName: 'Você',
          createdAt: '2024-02-10T10:31:00',
        },
      ],
      createdAt: '2024-02-10T10:30:00',
      updatedAt: '2024-02-10T10:31:00',
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: (selectedConversation.messages?.length || 0) + 1,
      conversationId: selectedConversation.id,
      content: messageText,
      direction: 'OUTGOING',
      status: 'SENT',
      senderName: 'Você',
      createdAt: new Date().toISOString(),
    };

    setConversations(
      conversations.map((conv) =>
        conv.id === selectedConversation.id
          ? { ...conv, messages: [...(conv.messages || []), newMessage] }
          : conv
      )
    );

    setMessageText('');
  };

  return (
    <div className="lg:ml-64 p-4 lg:p-8 h-screen flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {/* Conversations List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-gray-900">Conversas</h2>
          </div>
          <div className="overflow-y-auto flex-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-4 border-b text-left hover:bg-gray-50 transition-colors ${
                  selectedConversation?.id === conv.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                }`}
              >
                <p className="font-semibold text-gray-900">{conv.leadName}</p>
                <p className="text-sm text-gray-600">{conv.leadPhone}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {conv.channel === 'WHATSAPP' ? '💬 WhatsApp' : '📧 Email'}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <div>
                <h3 className="font-bold text-lg">{selectedConversation.leadName}</h3>
                <p className="text-sm opacity-90">{selectedConversation.leadPhone}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <Phone size={20} />
                </button>
                <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <Video size={20} />
                </button>
                <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages?.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.direction === 'OUTGOING' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.direction === 'OUTGOING'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(msg.createdAt).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md flex items-center justify-center">
            <p className="text-gray-500">Selecione uma conversa para começar</p>
          </div>
        )}
      </div>
    </div>
  );
};
