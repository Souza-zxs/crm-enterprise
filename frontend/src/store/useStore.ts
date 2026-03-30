import { create } from 'zustand';
import { Lead, Campaign, User, Company } from '../types';

interface AppState {
  // Auth
  user: User | null;
  company: Company | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setCompany: (company: Company | null) => void;

  // Leads
  leads: Lead[];
  selectedLead: Lead | null;
  setLeads: (leads: Lead[]) => void;
  setSelectedLead: (lead: Lead | null) => void;
  addLead: (lead: Lead) => void;
  updateLead: (lead: Lead) => void;
  removeLead: (id: number) => void;

  // Campaigns
  campaigns: Campaign[];
  setCampaigns: (campaigns: Campaign[]) => void;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (campaign: Campaign) => void;
  removeCampaign: (id: number) => void;

  // UI
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const useStore = create<AppState>((set) => ({
  // Auth
  user: null,
  company: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setCompany: (company) => set({ company }),

  // Leads
  leads: [],
  selectedLead: null,
  setLeads: (leads) => set({ leads }),
  setSelectedLead: (lead) => set({ selectedLead: lead }),
  addLead: (lead) => set((state) => ({ leads: [...state.leads, lead] })),
  updateLead: (lead) => set((state) => ({
    leads: state.leads.map((l) => (l.id === lead.id ? lead : l)),
    selectedLead: state.selectedLead?.id === lead.id ? lead : state.selectedLead,
  })),
  removeLead: (id) => set((state) => ({
    leads: state.leads.filter((l) => l.id !== id),
    selectedLead: state.selectedLead?.id === id ? null : state.selectedLead,
  })),

  // Campaigns
  campaigns: [],
  setCampaigns: (campaigns) => set({ campaigns }),
  addCampaign: (campaign) => set((state) => ({ campaigns: [...state.campaigns, campaign] })),
  updateCampaign: (campaign) => set((state) => ({
    campaigns: state.campaigns.map((c) => (c.id === campaign.id ? campaign : c)),
  })),
  removeCampaign: (id) => set((state) => ({
    campaigns: state.campaigns.filter((c) => c.id !== id),
  })),

  // UI
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  currentPage: 'dashboard',
  setCurrentPage: (page) => set({ currentPage: page }),
}));
