// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react'
import ChatInterface from '@/components/ChatInterface';
import { ChatMessage, ChatScript, OraclAStats } from '@/lib/types';
import { initialChatScript } from '@/lib/chatScript';



export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<string>(initialChatScript.initialStep);
  const [stats, setStats] = useState<OraclAStats>({
    buyerEmotion: 'Excited',
    onboardingStage: 'Role & Personalization',
    currentGoal: 'Identify user role'
  });
  const [username, setUsername] = useState<string>('Fabio Rossi');
  const [progress, setProgress] = useState<number>(30);

  // Initialize chat with first message
  useEffect(() => {
    const initialMessage: ChatMessage = {
      id: '1',
      sender: 'bot',
      content: initialChatScript.steps[initialChatScript.initialStep].botMessage,
      timestamp: '12:00',
      avatar: '/images/oracla-avatar.png'
    };
    setMessages([initialMessage]);
  }, []);

  const sendMessage = (content: string) => {
    // Add user message
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content,
      timestamp: '12:00',
      avatar: '/public/user-avatar.png'
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Find next step in script
    const currentScriptStep = initialChatScript.steps[currentStep];
    const nextStep = currentScriptStep.nextStepTrigger || currentStep;
    
    // Add bot response after a short delay
    setTimeout(() => {
      const newBotMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        content: initialChatScript.steps[nextStep].botMessage,
        timestamp: '12:00',
        avatar: '/sale_icon.png'
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setCurrentStep(nextStep);
      
      // Update progress
      setProgress(prev => Math.min(prev + 10, 100));
    }, 1000);
  };


  return (
    <main className="flex h-screen bg-white">
      
        <div className="flex h-full ml-8 mr-8 border border-gray-200">
          <ChatInterface 
            messages={messages} 
            sendMessage={sendMessage} 
          />
          
        </div>
      
    </main>
  );
}