import React, { useState } from 'react';
import { Plus, Edit2, Trash2, MessageSquare, Eye } from 'lucide-react';
import { Lead } from '../types';

export const Leads: React.FC = () => {
  const [leads] = useState<Lead[]>([
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '(11) 99999-9999',
      whatsappNumber: '5511999999999',
      company: 'Tech Corp',
      stage: 'QUALIFIED',
      value: 5000,
      score: 85,
      createdAt: '2024-01-15',
      updatedAt: '2024-02-10',
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@example.com',
      phone: '(11) 98888-8888',
      company: 'Innovation Ltd',
      stage: 'PROPOSAL',
      value: 8000,
      score: 90,
      createdAt: '2024-01-10',
      updatedAt: '2024-02-09',
    },
  ]);

  const [filter, setFilter] = useState<string>('ALL');
  const [, setShowForm] = useState(false);

  const stageColors: Record<string, string> = {
    NEW: 'bg-gray-100 text-gray-800',
    CONTACTED: 'bg-blue-100 text-blue-800',
    QUALIFIED: 'bg-green-100 text-green-800',
    PROPOSAL: 'bg-yellow-100 text-yellow-800',
    NEGOTIATION: 'bg-orange-100 text-orange-800',
    WON: 'bg-emerald-100 text-emerald-800',
    LOST: 'bg-red-100 text-red-800',
  };

  const stageLabels: Record<string, string> = {
    NEW: 'Novo',
    CONTACTED: 'Contatado',
    QUALIFIED: 'Qualificado',
    PROPOSAL: 'Proposta',
    NEGOTIATION: 'Negociação',
    WON: 'Ganho',
    LOST: 'Perdido',
  };

  const filteredLeads = filter === 'ALL' ? leads : leads.filter(l => l.stage === filter);

  return (
    <div className="lg:ml-64 p-4 lg:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-2">Gerencie seus leads e oportunidades</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Novo Lead
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'].map((stage) => (
          <button
            key={stage}
            onClick={() => setFilter(stage)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              filter === stage
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {stage === 'ALL' ? 'Todos' : stageLabels[stage]}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Telefone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estágio</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Valor</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Score</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900">{lead.name}</td>
                <td className="px-6 py-4 text-gray-600">{lead.email}</td>
                <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${stageColors[lead.stage]}`}>
                    {stageLabels[lead.stage]}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {lead.value ? `R$ ${lead.value.toLocaleString('pt-BR')}` : '-'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                        style={{ width: `${lead.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{lead.score}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors" title="Ver detalhes">
                      <Eye size={18} className="text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-green-100 rounded-lg transition-colors" title="Enviar mensagem">
                      <MessageSquare size={18} className="text-green-600" />
                    </button>
                    <button className="p-2 hover:bg-yellow-100 rounded-lg transition-colors" title="Editar">
                      <Edit2 size={18} className="text-yellow-600" />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg transition-colors" title="Deletar">
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
