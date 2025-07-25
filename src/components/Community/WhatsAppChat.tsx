import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Phone, Video, MoreVertical, Search, Paperclip, Smile, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: number;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  isGroup: boolean;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline?: boolean;
  members?: number;
}

const WhatsAppChat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chats: Chat[] = [
    {
      id: 'group1',
      name: 'Bangalore Girls Community',
      avatar: 'https://images.unsplash.com/photo-1595073499011-98ef8f8a9b8c?w=100&h=100&fit=crop',
      isGroup: true,
      lastMessage: 'Priya: Anyone looking for a roommate in Koramangala?',
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
      unreadCount: 3,
      members: 1250
    },
    {
      id: 'user1',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop',
      isGroup: false,
      lastMessage: 'Hey! Are you free to visit the PG tomorrow?',
      lastMessageTime: new Date(Date.now() - 15 * 60 * 1000),
      unreadCount: 1,
      isOnline: true
    },
    {
      id: 'group2',
      name: 'Koramangala PG Girls',
      avatar: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=100&h=100&fit=crop',
      isGroup: true,
      lastMessage: 'Ananya: The wifi will be down for maintenance tomorrow',
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
      unreadCount: 0,
      members: 25
    },
    {
      id: 'user2',
      name: 'Sneha Reddy',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
      isGroup: false,
      lastMessage: 'Thanks for the recommendation! 😊',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 'group3',
      name: 'Mumbai Living Network',
      avatar: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
      isGroup: true,
      lastMessage: 'Kavya: Best areas for PG in Bandra?',
      lastMessageTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      unreadCount: 7,
      members: 890
    }
  ];

  const messages: { [key: string]: Message[] } = {
    'group1': [
      {
        id: 1,
        senderId: 'user1',
        senderName: 'Priya',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop',
        content: 'Hey everyone! I\'m looking for a roommate in Koramangala area. Anyone interested?',
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
        isOwn: false
      },
      {
        id: 2,
        senderId: 'user3',
        senderName: 'Ananya',
        senderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        content: 'I might be interested! Can you share more details?',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        isOwn: false
      },
      {
        id: 3,
        senderId: 'me',
        senderName: 'You',
        senderAvatar: '',
        content: 'I know a great PG in that area. Let me share the details!',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        isOwn: true
      }
    ],
    'user1': [
      {
        id: 1,
        senderId: 'user1',
        senderName: 'Priya',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop',
        content: 'Hi! I saw your message in the group about PG recommendations',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isOwn: false
      },
      {
        id: 2,
        senderId: 'me',
        senderName: 'You',
        senderAvatar: '',
        content: 'Hey Priya! Yes, I can definitely help. Are you looking in any specific area?',
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        isOwn: true
      },
      {
        id: 3,
        senderId: 'user1',
        senderName: 'Priya',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop',
        content: 'Preferably Koramangala or HSR. Budget around 15-20k',
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
        isOwn: false
      },
      {
        id: 4,
        senderId: 'user1',
        senderName: 'Priya',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop',
        content: 'Hey! Are you free to visit the PG tomorrow?',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        isOwn: false
      }
    ]
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChatData = selectedChat ? chats.find(c => c.id === selectedChat) : null;
  const selectedChatMessages = selectedChat ? messages[selectedChat] || [] : [];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChatMessages]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    // Simulate sending message
    toast.success('Message sent!');
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="h-[600px] flex bg-white/5 backdrop-blur-lg rounded-lg overflow-hidden">
      {/* Chat List */}
      <div className="w-1/3 border-r border-white/10 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <h3 className="font-semibold mb-3">Chats</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass-card border-white/20"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-3 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${
                selectedChat === chat.id ? 'bg-white/10' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {!chat.isGroup && chat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium truncate">{chat.name}</h4>
                      {chat.isGroup && (
                        <Badge variant="secondary" className="text-xs">
                          {chat.members} members
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(chat.lastMessageTime)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">
                      {chat.lastMessage}
                    </p>
                    {chat.unreadCount > 0 && (
                      <Badge className="bg-green-500 text-white text-xs min-w-[20px] h-5 rounded-full">
                        {chat.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChatData ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedChat(null)}
                  className="md:hidden"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedChatData.avatar} />
                  <AvatarFallback>{selectedChatData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedChatData.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedChatData.isGroup ? 
                      `${selectedChatData.members} members` : 
                      selectedChatData.isOnline ? 'Online' : 'Last seen recently'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {!selectedChatData.isGroup && (
                  <>
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                  </>
                )}
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedChatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                    {!msg.isOwn && selectedChatData.isGroup && (
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={msg.senderAvatar} />
                          <AvatarFallback className="text-xs">{msg.senderName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-primary">{msg.senderName}</span>
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-lg ${
                        msg.isOwn
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-white/10 backdrop-blur-sm'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="glass-card border-white/20 pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="gradient-button"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Select a chat</h3>
              <p className="text-sm text-muted-foreground">
                Choose a conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppChat;