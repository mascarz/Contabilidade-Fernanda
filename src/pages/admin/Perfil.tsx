import React, { useState } from 'react';
import { Settings, Shield, HelpCircle, LogOut, ChevronRight, Camera, Scissors, Clock, MapPin, X, Trash2, Plus, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const Perfil: React.FC = () => {
  const { 
    services, setServices, 
    workingHours, setWorkingHours, 
    location, setLocation, 
    theme, setTheme 
  } = useApp();

  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Edit States
  const [editingServices, setEditingServices] = useState(services);
  const [editingHours, setEditingHours] = useState(workingHours);
  const [editingLocation, setEditingLocation] = useState(location);

  const saveServices = () => {
    setServices(editingServices);
    setActiveModal(null);
  };

  const saveHours = () => {
    setWorkingHours(editingHours);
    setActiveModal(null);
  };

  const saveLocation = () => {
    setLocation(editingLocation);
    setActiveModal(null);
  };

  const menuItems = [
    { id: 'services', icon: Scissors, label: 'Meus Serviços', desc: 'Gerenciar preços e durações' },
    { id: 'hours', icon: Clock, label: 'Horários', desc: 'Definir sua jornada de trabalho' },
    { id: 'location', icon: MapPin, label: 'Localização', desc: 'Endereço do seu estúdio' },
    { id: 'settings', icon: Settings, label: 'Configurações', desc: 'Preferências do aplicativo' },
    { id: 'security', icon: Shield, label: 'Segurança', desc: 'Senha e privacidade' },
    { id: 'help', icon: HelpCircle, label: 'Ajuda', desc: 'Suporte e tutoriais' },
  ];

  return (
    <div className={`space-y-8 pb-8 transition-colors duration-500 ${theme === 'black' ? 'bg-secondary -mx-6 px-6 pt-4 min-h-screen text-white' : ''}`}>
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className={`w-32 h-32 rounded-[2.5rem] p-1 border-4 ${theme === 'black' ? 'bg-secondary-light border-primary/40' : 'bg-gray-100 border-primary/20'}`}>
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
          <h2 className={`text-2xl font-bold ${theme === 'black' ? 'text-white' : 'text-secondary'}`}>Fernanda Amorim</h2>
          <p className="text-sm text-gray-400 font-medium">Especialista em Estética</p>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className={`grid grid-cols-3 gap-4 p-6 rounded-[2.5rem] ${theme === 'black' ? 'bg-secondary-light' : 'bg-gray-50'}`}>
        <div className="text-center">
          <p className={`text-lg font-bold ${theme === 'black' ? 'text-white' : 'text-secondary'}`}>4.9</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">Avaliação</p>
        </div>
        <div className={`text-center border-x ${theme === 'black' ? 'border-white/10' : 'border-gray-200'}`}>
          <p className={`text-lg font-bold ${theme === 'black' ? 'text-white' : 'text-secondary'}`}>1.2k</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">Clientes</p>
        </div>
        <div className="text-center">
          <p className={`text-lg font-bold ${theme === 'black' ? 'text-white' : 'text-secondary'}`}>5 anos</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">Exp.</p>
        </div>
      </div>

      {/* Menu List */}
      <div className="space-y-3">
        {menuItems.map((item) => (
          <motion.button 
            key={item.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveModal(item.id)}
            className={`w-full p-5 rounded-3xl border shadow-premium flex items-center gap-4 transition-all ${
              theme === 'black' ? 'bg-secondary-light border-white/5' : 'bg-white border-gray-100'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme === 'black' ? 'bg-white/5 text-white' : 'bg-gray-50 text-secondary'}`}>
              <item.icon size={22} />
            </div>
            <div className="flex-1 text-left">
              <h4 className={`font-bold text-sm ${theme === 'black' ? 'text-white' : 'text-secondary'}`}>{item.label}</h4>
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

      {/* Modais de Edição */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="relative w-full bg-white rounded-t-[3rem] p-8 shadow-2xl max-h-[90vh] overflow-y-auto text-secondary"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold">
                  {menuItems.find(i => i.id === activeModal)?.label}
                </h3>
                <button onClick={() => setActiveModal(null)} className="p-2 bg-gray-50 rounded-xl">
                  <X size={20} />
                </button>
              </div>

              {activeModal === 'services' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    {editingServices.map((s, idx) => (
                      <div key={s.id} className="bg-gray-50 p-4 rounded-2xl space-y-3 relative">
                        <button 
                          onClick={() => setEditingServices(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute top-2 right-2 p-2 text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                        <input 
                          className="w-full bg-transparent font-bold text-sm border-b border-gray-200 pb-1"
                          value={s.name}
                          onChange={(e) => {
                            const newS = [...editingServices];
                            newS[idx].name = e.target.value;
                            setEditingServices(newS);
                          }}
                        />
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Duração</label>
                            <input 
                              className="w-full bg-transparent text-sm border-b border-gray-200"
                              value={s.time}
                              onChange={(e) => {
                                const newS = [...editingServices];
                                newS[idx].time = e.target.value;
                                setEditingServices(newS);
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Preço (R$)</label>
                            <input 
                              className="w-full bg-transparent text-sm border-b border-gray-200"
                              value={s.price}
                              onChange={(e) => {
                                const newS = [...editingServices];
                                newS[idx].price = parseFloat(e.target.value) || 0;
                                setEditingServices(newS);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => setEditingServices([...editingServices, { id: Math.random().toString(), name: 'Novo Serviço', time: '1h', price: 0 }])}
                      className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold flex items-center justify-center gap-2"
                    >
                      <Plus size={18} /> Adicionar Serviço
                    </button>
                  </div>
                  <button onClick={saveServices} className="btn-primary w-full py-5">Salvar Alterações</button>
                </div>
              )}

              {activeModal === 'hours' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase ml-2">Início da Jornada</label>
                      <select 
                        className="input-premium appearance-none"
                        value={editingHours.start}
                        onChange={(e) => setEditingHours({ ...editingHours, start: parseInt(e.target.value) })}
                      >
                        {Array.from({ length: 24 }, (_, i) => <option key={i} value={i}>{i}:00</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase ml-2">Fim da Jornada</label>
                      <select 
                        className="input-premium appearance-none"
                        value={editingHours.end}
                        onChange={(e) => setEditingHours({ ...editingHours, end: parseInt(e.target.value) })}
                      >
                        {Array.from({ length: 24 }, (_, i) => <option key={i} value={i}>{i}:00</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-2xl border border-primary/10">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Os horários definidos aqui serão os únicos disponíveis para agendamento na sua página pública.
                    </p>
                  </div>
                  <button onClick={saveHours} className="btn-primary w-full py-5">Confirmar Horários</button>
                </div>
              )}

              {activeModal === 'location' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Endereço do Estúdio</label>
                    <div className="relative">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        className="input-premium pl-12"
                        value={editingLocation}
                        onChange={(e) => setEditingLocation(e.target.value)}
                        placeholder="Ex: Rua das Flores, 123 - São Paulo"
                      />
                    </div>
                  </div>
                  <button onClick={saveLocation} className="btn-primary w-full py-5">Atualizar Localização</button>
                </div>
              )}

              {activeModal === 'settings' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Tema do Aplicativo</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setTheme('white')}
                        className={`p-6 rounded-[2rem] border-2 flex flex-col items-center gap-3 transition-all ${
                          theme === 'white' ? 'border-primary bg-primary/5' : 'border-gray-100'
                        }`}
                      >
                        <Sun className={theme === 'white' ? 'text-primary' : 'text-gray-400'} size={32} />
                        <span className={`font-bold text-sm ${theme === 'white' ? 'text-primary' : 'text-gray-400'}`}>Modo White</span>
                      </button>
                      <button 
                        onClick={() => setTheme('black')}
                        className={`p-6 rounded-[2rem] border-2 flex flex-col items-center gap-3 transition-all ${
                          theme === 'black' ? 'border-primary bg-primary/5' : 'border-gray-100'
                        }`}
                      >
                        <Moon className={theme === 'black' ? 'text-primary' : 'text-gray-400'} size={32} />
                        <span className={`font-bold text-sm ${theme === 'black' ? 'text-primary' : 'text-gray-400'}`}>Modo Black</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Perfil;
