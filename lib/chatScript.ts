// src/lib/chatScript.ts
import { ChatScript } from './types';

export const initialChatScript: ChatScript = {
  initialStep: 'welcome',
  steps: {
    welcome: {
      botMessage: "Hello Fabio Rossi, welcome to ORAVOX, I'm OraclA, your sales intelligence agent. To tailor your experience, please select your role",
      expectedUserResponses: ['I am an Owner/Manager', 'I am a Realtor', 'I am an Admin'],
      suggestions: [
        {
          id: 'owner',
          content: 'I am an Owner/Manager',
          type: 'clarification',
          score: 15,
          scoreLabel: 'Clarifies position'
        },
        {
          id: 'realtor',
          content: 'I am a Realtor',
          type: 'clarification',
          score: 15,
          scoreLabel: 'Clarifies position'
        }
      ],
      nextStepTrigger: 'askRealtors'
    },
    askRealtors: {
      botMessage: "Understood, how many Realtors are in your organization? (You can give an approximate number.)",
      expectedUserResponses: ['We have less then 9 realtors.', 'Between 10 to 19 realtors', '20 or more realtors'],
      suggestions: [
        {
          id: 'less-9',
          content: 'We have less then 9 realtors.',
          type: 'clarification',
          score: 15,
          scoreLabel: 'Clarifies position'
        },
        {
          id: '10-19',
          content: 'Between 10 to 19 realtors',
          type: 'clarification',
          score: 15,
          scoreLabel: 'Clarifies position'
        }
      ],
      nextStepTrigger: 'askCompanyName'
    },
    askCompanyName: {
      botMessage: "Roger that, what's the name of the real estate company? (Please type it or use suggestion)",
      expectedUserResponses: ['Evolua Imóveis', 'Century 21', 'RE/MAX', 'Other'],
      suggestions: [
        {
          id: 'evolua',
          content: 'Evolua Imóveis',
          type: 'clarification',
          score: 15,
          scoreLabel: 'Clarifies position'
        },
        {
          id: 'century',
          content: 'Century 21',
          type: 'clarification',
          score: 15,
          scoreLabel: 'Clarifies position'
        }
      ],
      nextStepTrigger: 'askCompanyAddress'
    },
    askCompanyAddress: {
      botMessage: "Great name! In order for me enhance my intelligence recommendation system to your company, please provide me the company's address",
      expectedUserResponses: ['Skip for now'],
      suggestions: [
        {
          id: 'skip',
          content: 'Skip for now',
          type: 'next-step',
          score: 15,
          scoreLabel: 'Clarifies position'
        }
      ],
      nextStepTrigger: 'thankYou'
    },
    thankYou: {
      botMessage: "Thank you for the information. Now I have a better understanding of your business and can provide more tailored recommendations. What specific area of your real estate business would you like to improve first?",
      expectedUserResponses: ['Lead generation', 'Sales process', 'Agent productivity', 'Marketing'],
      suggestions: [
        {
          id: 'leads',
          content: 'Lead generation',
          type: 'next-step',
          score: 15,
          scoreLabel: 'Clarifies position'
        },
        {
          id: 'sales',
          content: 'Sales process',
          type: 'next-step',
          score: 15,
          scoreLabel: 'Clarifies position'
        }
      ],
      nextStepTrigger: 'welcome' // Loop back for demo purposes
    }
  }
};