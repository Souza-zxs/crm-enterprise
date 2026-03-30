export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  whatsappNumber?: string;
  company?: string;
  assignedToId?: number;
  assignedToName?: string;
  campaignId?: number;
  campaignName?: string;
  stage: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST';
  notes?: string;
  value?: number;
  score?: number;
  createdAt: string;
  updatedAt: string;
  lastInteraction?: string;
}

export interface Message {
  id: number;
  conversationId: number;
  content: string;
  direction: 'INCOMING' | 'OUTGOING';
  status: 'SENT' | 'RECEIVED' | 'READ' | 'FAILED';
  senderName?: string;
  senderPhone?: string;
  createdAt: string;
}

export interface Conversation {
  id: number;
  leadId: number;
  leadName: string;
  leadPhone: string;
  channel: 'WHATSAPP' | 'EMAIL' | 'SMS' | 'PHONE' | 'FACEBOOK' | 'INSTAGRAM';
  status: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
}

export interface Campaign {
  id: number;
  name: string;
  description?: string;
  source: 'FACEBOOK' | 'GOOGLE_ADS' | 'INSTAGRAM' | 'TIKTOK' | 'LINKEDIN' | 'OTHER';
  status: string;
  budget?: number;
  spent?: number;
  impressions?: number;
  clicks?: number;
  leads?: number;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  endedAt?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'ADMIN' | 'MANAGER' | 'AGENT' | 'VIEWER';
  status: string;
}

export interface Company {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  phone?: string;
  email?: string;
  status: string;
}

export interface WhatsAppConnection {
  id: number;
  phoneNumber: string;
  businessAccountId: string;
  status: string;
  qrCode?: string;
  connectedAt?: string;
}

export interface FunnelStats {
  stage: string;
  count: number;
  percentage: number;
  value: number;
}
