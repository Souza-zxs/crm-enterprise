import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Leads
export const leadsAPI = {
  getAll: (companyId: number) => api.get(`/leads?companyId=${companyId}`),
  getById: (id: number) => api.get(`/leads/${id}`),
  create: (data: any) => api.post('/leads', data),
  update: (id: number, data: any) => api.put(`/leads/${id}`, data),
  delete: (id: number) => api.delete(`/leads/${id}`),
  getByStage: (companyId: number, stage: string) => api.get(`/leads/stage/${stage}?companyId=${companyId}`),
  assignToUser: (leadId: number, userId: number) => api.put(`/leads/${leadId}/assign/${userId}`),
  moveToStage: (leadId: number, stage: string) => api.put(`/leads/${leadId}/stage/${stage}`),
};

// Conversations
export const conversationsAPI = {
  getByLead: (leadId: number) => api.get(`/conversations/lead/${leadId}`),
  getById: (id: number) => api.get(`/conversations/${id}`),
  create: (leadId: number, channel: string) => api.post('/conversations', { leadId, channel }),
  addMessage: (conversationId: number, data: any) => api.post(`/conversations/${conversationId}/messages`, data),
  close: (id: number) => api.put(`/conversations/${id}/close`),
};

// Campaigns
export const campaignsAPI = {
  getAll: (companyId: number) => api.get(`/campaigns?companyId=${companyId}`),
  getById: (id: number) => api.get(`/campaigns/${id}`),
  create: (data: any) => api.post('/campaigns', data),
  update: (id: number, data: any) => api.put(`/campaigns/${id}`, data),
  delete: (id: number) => api.delete(`/campaigns/${id}`),
};

// WhatsApp
export const whatsappAPI = {
  getConnections: (companyId: number) => api.get(`/whatsapp/connections?companyId=${companyId}`),
  createConnection: (data: any) => api.post('/whatsapp/connections', data),
  deleteConnection: (id: number) => api.delete(`/whatsapp/connections/${id}`),
  sendMessage: (phoneNumber: string, message: string) => api.post('/whatsapp/send', { phoneNumber, message }),
};

// Dashboard/Stats
export const statsAPI = {
  getFunnelStats: (companyId: number) => api.get(`/stats/funnel?companyId=${companyId}`),
  getCampaignStats: (companyId: number) => api.get(`/stats/campaigns?companyId=${companyId}`),
};

export default api;
