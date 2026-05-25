import React from 'react';
import { Search, Filter, Star, Phone, MessageCircle, MoreVertical, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const Clientes: React.FC = () => {
  const { clients } = useApp();

  return (
    <div className="space-y-6">
      {/* Header Clientes */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-secondary">Clientes</h2>
        <div className="flex gap-2">
          <button className="p-3 rounded-2xl bg-gray-50 text-secondary">
            <Filter size={20} />
          </button>
          <button className="p-3 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
            <Star size={20} />
          </button>
        </div>
      </div>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Buscar cliente por nome ou celular..." 
          className="input-premium pl-12"
        />
      </div>

      {/* Lista de Clientes */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-secondary">Todos os Clientes</h3>
          <span className="text-xs text-gray-400">{clients.length} cadastrados</span>
        </div>

        {clients.length > 0 ? (
          <div className="space-y-3 pb-8">
            {clients.map((client) => (
              <motion.div 
                key={client.id}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-premium flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${client.name}`} alt={client.name} />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary flex items-center gap-2">
                        {client.name}
                        {client.favorite && <Star size={14} className="fill-primary text-primary" />}
                      </h4>
                      <p className="text-xs text-gray-400">{client.phone}</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-50">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Última</p>
                    <p className="text-xs font-bold text-secondary">{client.lastVisit || '-'}</p>
                  </div>
                  <div className="text-center border-x border-gray-50">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Visitas</p>
                    <p className="text-xs font-bold text-secondary">{client.totalVisits}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Total</p>
                    <p className="text-xs font-bold text-primary">R$ {client.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 text-secondary rounded-xl text-xs font-bold transition-all active:bg-gray-100">
                    <Calendar size={14} />
                    Agendar
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center bg-green-50 text-green-500 rounded-xl transition-all active:bg-green-100">
                    <MessageCircle size={20} />
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-500 rounded-xl transition-all active:bg-blue-100">
                    <Phone size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-10 rounded-[2.5rem] border-2 border-dashed border-gray-200 text-center">
            <p className="text-sm text-gray-400 font-bold">Nenhum cliente cadastrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clientes;
