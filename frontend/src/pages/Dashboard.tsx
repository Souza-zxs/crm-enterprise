import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { 
  TrendingUp, Users, MessageSquare, Zap, DollarSign, ArrowUp, ArrowDown,
  Eye, MousePointer, Target, Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Avatar, AvatarGroup } from '../components/ui';
import { FunnelStats } from '../types';

export const Dashboard: React.FC = () => {
  const [funnelData] = useState<FunnelStats[]>([
    { stage: 'Novo', count: 45, percentage: 100, value: 45000 },
    { stage: 'Contatado', count: 32, percentage: 71, value: 32000 },
    { stage: 'Qualificado', count: 24, percentage: 53, value: 24000 },
    { stage: 'Proposta', count: 18, percentage: 40, value: 18000 },
    { stage: 'Negociação', count: 12, percentage: 27, value: 12000 },
    { stage: 'Ganho', count: 8, percentage: 18, value: 8000 },
  ]);

  const [chartData] = useState([
    { name: 'Jan', leads: 40, conversões: 24, receita: 12000 },
    { name: 'Fev', leads: 30, conversões: 13, receita: 8000 },
    { name: 'Mar', leads: 20, conversões: 9, receita: 5500 },
    { name: 'Abr', leads: 27, conversões: 15, receita: 9200 },
    { name: 'Mai', leads: 35, conversões: 21, receita: 15000 },
    { name: 'Jun', leads: 45, conversões: 32, receita: 22000 },
  ]);

  const [performanceData] = useState([
    { subject: 'Leads', A: 85, fullMark: 100 },
    { subject: 'Conversão', A: 72, fullMark: 100 },
    { subject: 'Receita', A: 90, fullMark: 100 },
    { subject: 'Tempo', A: 65, fullMark: 100 },
    { subject: 'Qualidade', A: 78, fullMark: 100 },
  ]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const stats = [
    { 
      label: 'Total de Leads', 
      value: '245', 
      change: '+12%',
      trend: 'up',
      icon: Users, 
      color: 'bg-blue-500' 
    },
    { 
      label: 'Conversas Ativas', 
      value: '18', 
      change: '+5%',
      trend: 'up',
      icon: MessageSquare, 
      color: 'bg-green-500' 
    },
    { 
      label: 'Campanhas', 
      value: '12', 
      change: '-2%',
      trend: 'down',
      icon: Zap, 
      color: 'bg-yellow-500' 
    },
    { 
      label: 'Receita', 
      value: 'R$ 71.7K', 
      change: '+28%',
      trend: 'up',
      icon: DollarSign, 
      color: 'bg-purple-500' 
    },
  ];

  const recentLeads = [
    { id: 1, name: 'João Silva', company: 'Tech Corp', value: 5000, stage: 'QUALIFIED' },
    { id: 2, name: 'Maria Santos', company: 'Innovation Ltd', value: 8000, stage: 'PROPOSAL' },
    { id: 3, name: 'Pedro Costa', company: 'StartUp Brasil', value: 3500, stage: 'NEW' },
    { id: 4, name: 'Ana Oliveira', company: 'Digital Solutions', value: 6200, stage: 'NEGOTIATION' },
  ];

  return (
    <div className="lg:ml-64 p-4 lg:p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-2">Bem-vindo ao seu CRM Enterprise</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} variant="elevated" className="hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                  <div className={`flex items-center gap-1 mt-2 text-sm ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stat.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    <span className="font-semibold">{stat.change}</span>
                    <span className="text-slate-400">vs mês anterior</span>
                  </div>
                </div>
                <div className={`${stat.color} p-4 rounded-xl shadow-lg`}>
                  <Icon size={28} className="text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Area Chart - Receita */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign size={20} className="text-emerald-500" />
              Receita Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Receita']}
                />
                <Area type="monotone" dataKey="receita" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorReceita)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart - Leads vs Conversões */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} className="text-blue-500" />
              Leads vs Conversões
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="leads" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Leads" />
                <Bar dataKey="conversões" fill="#10b981" radius={[4, 4, 0, 0]} name="Conversões" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pie Chart - Distribuição */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target size={20} className="text-violet-500" />
              Distribuição por Estágio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={funnelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ stage, percentage }) => `${stage}: ${percentage}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {funnelData.map((_, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Radar Chart - Performance */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} className="text-amber-500" />
              Performance Geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={performanceData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" fontSize={10} />
                <Radar name="Performance" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} className="text-cyan-500" />
              Leads Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar name={lead.name} size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{lead.name}</p>
                      <p className="text-xs text-slate-500">{lead.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">R$ {lead.value.toLocaleString('pt-BR')}</p>
                    <Badge variant={lead.stage === 'QUALIFIED' ? 'success' : lead.stage === 'PROPOSAL' ? 'warning' : 'default'} size="sm">
                      {lead.stage === 'QUALIFIED' ? 'Qualificado' : lead.stage === 'PROPOSAL' ? 'Proposta' : 'Novo'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funnel */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target size={20} className="text-red-500" />
            Funil de Vendas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funnelData.map((stage, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-slate-700">{stage.stage}</span>
                  <span className="text-sm text-slate-500">
                    {stage.count} leads • R$ {stage.value.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 h-full flex items-center justify-center text-white text-xs font-semibold transition-all"
                    style={{ width: `${stage.percentage}%` }}
                  >
                    {stage.percentage > 15 && `${stage.percentage}%`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};