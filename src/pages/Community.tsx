import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MessageSquare, MapPin, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LocationGroups from '@/components/Community/LocationGroups';
import WhatsAppChat from '@/components/Community/WhatsAppChat';
import EventManager from '@/components/Community/EventManager';

const Community: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Main Community 👭
          </h1>
        </div>

        <Tabs defaultValue="location" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 glass-card">
            <TabsTrigger value="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location Groups
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Interest Groups
            </TabsTrigger>
          </TabsList>

          <TabsContent value="location">
            <LocationGroups />
          </TabsContent>

          <TabsContent value="chat">
            <WhatsAppChat />
          </TabsContent>

          <TabsContent value="events">
            <EventManager />
          </TabsContent>

          <TabsContent value="groups">
            <LocationGroups />
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8">
          <Button onClick={() => navigate('/')} variant="outline" className="glass-card">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Community;