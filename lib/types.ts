
export type Role = 'Owner/Manager' | 'Realtor' | 'Admin';

export type BuyerEmotion = 'Excited' | 'Interested' | 'Neutral' | 'Concerned' | 'Confused';

export type OnboardingStage = 'Role & Personalization' | 'Company Details' | 'Team Info' | 'Goals';

export type CurrentGoal = 'Identify user role' | 'Get company details' | 'Understand team size' | 'Establish goals';

export type MessageSender = 'bot' | 'user';

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  avatar?: string;
}

export interface ChatSuggestion {
  id: string;
  content: string;
  type: 'clarification' | 'next-step' | 'question';
  score: number;
  scoreLabel: string;
  nextMessages?: string[];
}

export interface ScriptStep {
  botMessage: string;
  expectedUserResponses: string[];
  suggestions: ChatSuggestion[];
  nextStepTrigger?: string;
}

export interface ChatScript {
  steps: Record<string, ScriptStep>;
  initialStep: string;
}

export interface OraclAStats {
  buyerEmotion: BuyerEmotion;
  onboardingStage: OnboardingStage;
  currentGoal: CurrentGoal;
}