import React from 'react';
import { Home, Calendar, DollarSign, Users, Bell, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Início' },
    { id: 'agenda', icon: Calendar, label: 'Agenda' },
    { id: 'financeiro', icon: DollarSign, label: 'Financeiro' },
    { id: 'clientes', icon: Users, label: 'Clientes' },
    { id: 'notificacoes', icon: Bell, label: 'Avisos' },
    { id: 'perfil', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 pb-6 pt-2 flex justify-around items-center z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 min-w-[60px] ${
              isActive ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-primary/10' : ''}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-medium">{tab.label}</span>
            {isActive && (
              <div className="w-1 h-1 rounded-full bg-primary" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
