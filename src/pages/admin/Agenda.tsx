import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, User, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const Agenda: React.FC = () => {
  const { appointments } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8h às 19h

  const days = [24, 25, 26, 27, 28, 29, 30]; // Exemplo de dias

  return (
    <div className="space-y-6">
      {/* Header Agenda */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-secondary">Agenda</h2>
        <button className="p-4 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
          <Plus size={24} />
        </button>
      </div>

      {/* Mini Calendário */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-premium overflow-hidden">
        <div className="flex justify-between items-center mb-4 px-2">
          <button className="p-2 rounded-xl bg-gray-50"><ChevronLeft size={18} /></button>
          <span className="font-bold text-secondary">Maio 2026</span>
          <button className="p-2 rounded-xl bg-gray-50"><ChevronRight size={18} /></button>
        </div>
        <div className="flex justify-between overflow-x-auto no-scrollbar gap-2 pb-2">
          {days.map((day, i) => (
            <button
              key={day}
              onClick={() => setSelectedDate(day)}
              className={`flex flex-col items-center justify-center min-w-[50px] py-4 rounded-2xl transition-all ${
                selectedDate === day ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-50 text-gray-400'
              }`}
            >
              <span className="text-[10px] uppercase font-bold mb-1">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][(i + 1) % 7]}
              </span>
              <span className="text-lg font-bold">{day}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative space-y-4 pb-8">
        {hours.map((hour) => {
          const appointment = appointments.find(a => a.hour === hour && a.date === selectedDate);
          
          return (
            <div key={hour} className="flex gap-4">
              <div className="w-12 pt-2 text-right">
                <span className="text-xs font-bold text-gray-400">{hour}:00</span>
              </div>
              
              <div className="flex-1 relative min-h-[80px]">
                {/* Linha de fundo */}
                <div className="absolute left-0 right-0 top-4 border-t border-gray-100" />
                
                {appointment ? (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className={`bg-primary p-4 rounded-3xl text-white shadow-lg relative z-10`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-sm">{appointment.clientName}</h4>
                        <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider">
                          {appointment.serviceName}
                        </p>
                      </div>
                      <div className="p-2 bg-white/20 rounded-xl">
                        <Clock size={14} />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        <User size={12} className="text-white/60" />
                        <span className="text-[10px] font-medium">Confirmado</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-white/60" />
                        <span className="text-[10px] font-medium">Estúdio</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <button className="w-full h-12 mt-2 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center text-gray-300 hover:border-primary/20 hover:text-primary transition-all">
                    <Plus size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Agenda;
