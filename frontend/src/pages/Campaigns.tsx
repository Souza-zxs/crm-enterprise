import React, { useState } from 'react';
import { Plus, Edit2, Trash2, TrendingUp } from 'lucide-react';
import { Campaign } from '../types';

export const Campaigns: React.FC = () => {
  const [campaigns] = useState<Campaign[]>([
    {
      id: 1,
      name: 'Campanha Facebook - Verão',
      description: 'Campanha de verão no Facebook Ads',
      source: 'FACEBOOK',
      status: 'ACTIVE',
      budget: 5000,
      spent: 3200,
      impressions: 125000,
      clicks: 3500,
      leads: 45,
      createdAt: '2024-01-15',
      updatedAt: '2024-02-10',
    },
    {
      id: 2,
      name: 'Google Ads - Search',
      description: 'Campanha de busca no Google',
      source: 'GOOGLE_ADS',
      status: 'ACTIVE',
      budget: 8000,
      spent: 6800,
      impressions: 250000,
      clicks: 8200,
      leads: 82,
      createdAt: '2024-01-20',
      updatedAt: '2024-02-10',
    },
  ]);

  const [, setShowForm] = useState(false);

  const sourceLabels: Record<string, string> = {
    FACEBOOK: 'Facebook',
    GOOGLE_ADS: 'Google Ads',
    INSTAGRAM: 'Instagram',
    TIKTOK: 'TikTok',
    LINKEDIN: 'LinkedIn',
    OTHER: 'Outro',
  };

  const sourceColors: Record<string, string> = {
    FACEBOOK: 'bg-blue-100 text-blue-800',
    GOOGLE_ADS: 'bg-red-100 text-red-800',
    INSTAGRAM: 'bg-pink-100 text-pink-800',
    TIKTOK: 'bg-black/10 text-black',
    LINKEDIN: 'bg-blue-200 text-blue-900',
    OTHER: 'bg-gray-100 text-gray-800',
  };

  const calculateROI = (spent: number, leads: number) => {
    if (spent === 0) return 0;
    return ((leads * 500 - spent) / spent * 100).toFixed(1);
  };

  return (
    <div className="lg:ml-64 p-4 lg:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campanhas</h1>
          <p className="text-gray-600 mt-2">Gerencie suas campanhas de tráfego pago</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Nova Campanha
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{campaign.name}</h3>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${sourceColors[campaign.source]}`}>
                  {sourceLabels[campaign.source]}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-yellow-100 rounded-lg transition-colors">
                  <Edit2 size={18} className="text-yellow-600" />
                </button>
                <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Impressões</p>
                <p className="text-lg font-bold text-blue-600">{campaign.impressions?.toLocaleString('pt-BR')}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Cliques</p>
                <p className="text-lg font-bold text-green-600">{campaign.clicks?.toLocaleString('pt-BR')}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Leads</p>
                <p className="text-lg font-bold text-purple-600">{campaign.leads}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">CTR</p>
                <p className="text-lg font-bold text-orange-600">
                  {campaign.impressions ? ((campaign.clicks! / campaign.impressions) * 100).toFixed(2) : 0}%
                </p>
              </div>
            </div>

            {/* Budget */}
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Orçamento</span>
                <span className="text-sm text-gray-600">
                  R$ {campaign.spent?.toLocaleString('pt-BR')} / R$ {campaign.budget?.toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                  style={{ width: `${Math.min((campaign.spent! / campaign.budget!) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* ROI */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-green-600" />
                <span className="text-sm font-semibold text-gray-700">ROI</span>
              </div>
              <span className="text-lg font-bold text-green-600">
                {calculateROI(campaign.spent || 0, campaign.leads || 0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
