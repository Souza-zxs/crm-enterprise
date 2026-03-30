import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, BarChart3, Users, MessageSquare, Zap, Settings, 
  LogOut, ChevronDown, Bell, Search 
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Avatar } from './ui/Avatar';

export const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, setCurrentPage, user, company } = useStore();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, href: '/' },
    { id: 'leads', label: 'Leads', icon: Users, href: '/leads' },
    { id: 'conversations', label: 'Conversas', icon: MessageSquare, href: '/conversations' },
    { id: 'campaigns', label: 'Campanhas', icon: Zap, href: '/campaigns' },
    { id: 'settings', label: 'Configurações', icon: Settings, href: '/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white rounded-lg shadow-md hover:bg-slate-50 transition-colors"
      >
        {sidebarOpen ? <X size={24} className="text-slate-700" /> : <Menu size={24} className="text-slate-700" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700/50">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CRM Pro</h1>
              <p className="text-xs text-slate-400">{company?.name || 'Enterprise'}</p>
            </div>
          </Link>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-2">
          <div className="mb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Menu Principal
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.id}
                to={item.href}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/25'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50">
          {/* User Profile */}
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer mb-3">
            <Avatar name={user?.name || 'Admin'} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name || 'Administrador'}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email || 'admin@crm.com'}</p>
            </div>
            <ChevronDown size={16} className="text-slate-400" />
          </div>

          {/* Notifications */}
          <div className="flex items-center gap-2 mb-3">
            <button className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-slate-800/50 hover:bg-slate-700 rounded-lg transition-colors">
              <Bell size={18} className="text-slate-400" />
              <span className="text-sm text-slate-300">Notificações</span>
              <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">3</span>
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};