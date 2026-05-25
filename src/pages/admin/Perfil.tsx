import React from 'react';
import { User, Settings, Shield, HelpCircle, LogOut, ChevronRight, Camera, Scissors, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Perfil: React.FC = () => {
  const menuItems = [
    { id: 1, icon: Scissors, label: 'Meus Serviços', desc: 'Gerenciar preços e durações' },
    { id: 2, icon: Clock, label: 'Horários', desc: 'Definir sua jornada de trabalho' },
    { id: 3, icon: MapPin, label: 'Localização', desc: 'Endereço do seu estúdio' },
    { id: 4, icon: Settings, label: 'Configurações', desc: 'Preferências do aplicativo' },
    { id: 5, icon: Shield, label: 'Segurança', desc: 'Senha e privacidade' },
    { id: 6, icon: HelpCircle, label: 'Ajuda', desc: 'Suporte e tutoriais' },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-[2.5rem] bg-gray-100 border-4 border-primary/20 p-1">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda" 
              alt="Fernanda Amorim" 
              className="w-full h-full object-cover rounded-[2.2rem]"
            />
          </div>
          <button className="absolute bottom-0 right-0 p-3 bg-primary text-white rounded-2xl shadow-lg border-4 border-white">
            <Camera size={18} />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary">Fernanda Amorim</h2>
          <p className="text-sm text-gray-400 font-medium">Especialista em Estética</p>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-3 gap-4 bg-gray-50 p-6 rounded-[2.5rem]">
        <div className="text-center">
          <p className="text-lg font-bold text-secondary">4.9</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">Avaliação</p>
        </div>
        <div className="text-center border-x border-gray-200">
          <p className="text-lg font-bold text-secondary">1.2k</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">Clientes</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-secondary">5 anos</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">Exp.</p>
        </div>
      </div>

      {/* Menu List */}
      <div className="space-y-3">
        {menuItems.map((item) => (
          <motion.button 
            key={item.id}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white p-5 rounded-3xl border border-gray-100 shadow-premium flex items-center gap-4 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-secondary">
              <item.icon size={22} />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-bold text-secondary text-sm">{item.label}</h4>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </motion.button>
        ))}
      </div>

      {/* Logout Button */}
      <button className="w-full py-5 rounded-3xl bg-red-50 text-red-500 font-bold flex items-center justify-center gap-2 transition-all active:bg-red-100">
        <LogOut size={20} />
        Sair da Conta
      </button>

      {/* Version info */}
      <p className="text-center text-[10px] text-gray-300 font-medium">
        Fernanda Amorim App v1.0.4 • Desenvolvido com carinho
      </p>
    </div>
  );
};

export default Perfil;
