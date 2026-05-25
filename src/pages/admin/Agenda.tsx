import React, { useState } from 'react';
import { Plus, Clock, User, Phone, DollarSign, Tag, X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const Agenda: React.FC = () => {
  const { appointments, addAppointment, services, workingHours, addClient } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [selectedHour, setSelectedHour] = useState(8);

  const hours = Array.from(
    { length: workingHours.end - workingHours.start + 1 }, 
    (_, i) => i + workingHours.start
  );

  const days = Array.from({ length: 7 }, (_, i) => 24 + i); // Exemplo de dias

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const service = services.find(s => s.id === selectedServiceId);
    if (!clientName || !clientPhone || !service) return;

    const clientId = addClient({
      name: clientName,
      phone: clientPhone,
      lastVisit: new Date().toLocaleDateString('pt-BR'),
      totalVisits: 0,
      totalSpent: 0,
      favorite: false
    });

    addAppointment({
      clientId,
      clientName,
      clientPhone,
      serviceId: service.id,
      serviceName: service.name,
      date: selectedDate,
      hour: selectedHour,
      value: customValue ? parseFloat(customValue.replace(',', '.')) : service.price,
      status: 'confirmed'
    });

    // Reset
    setIsModalOpen(false);
    setClientName('');
    setClientPhone('');
    setSelectedServiceId('');
    setCustomValue('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-secondary">Agenda</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="p-4 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 active:scale-95 transition-all"
        >
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
                <div className="absolute left-0 right-0 top-4 border-t border-gray-100" />
                
                {appointment ? (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-primary p-4 rounded-3xl text-white shadow-lg relative z-10"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-sm">{appointment.clientName}</h4>
                        <p className="text-[10px] text-white/80 uppercase font-bold tracking-wider">
                          {appointment.serviceName} • R$ {appointment.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="p-2 bg-white/20 rounded-xl">
                        <Clock size={14} />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Phone size={12} className="text-white/60" />
                        <span className="text-[10px] font-medium">{appointment.clientPhone}</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <button 
                    onClick={() => { setSelectedHour(hour); setIsModalOpen(true); }}
                    className="w-full h-12 mt-2 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center text-gray-300 hover:border-primary/20 hover:text-primary transition-all"
                  >
                    <Plus size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Novo Agendamento */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full bg-white rounded-t-[3rem] p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-secondary">Novo Agendamento</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Nome da Cliente</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" placeholder="Nome completo" className="input-premium pl-12"
                        value={clientName} onChange={(e) => setClientName(e.target.value)} required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Telefone</label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="tel" placeholder="(00) 00000-0000" className="input-premium pl-12"
                        value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase ml-2">Horário</label>
                      <select 
                        className="input-premium appearance-none"
                        value={selectedHour} onChange={(e) => setSelectedHour(parseInt(e.target.value))}
                      >
                        {hours.map(h => <option key={h} value={h}>{h}:00</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase ml-2">Data (Maio)</label>
                      <select 
                        className="input-premium appearance-none"
                        value={selectedDate} onChange={(e) => setSelectedDate(parseInt(e.target.value))}
                      >
                        {days.map(d => <option key={d} value={d}>Dia {d}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Serviço</label>
                    <div className="relative">
                      <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <select 
                        className="input-premium pl-12 appearance-none"
                        value={selectedServiceId} onChange={(e) => setSelectedServiceId(e.target.value)} required
                      >
                        <option value="">Selecione um serviço</option>
                        {services.map(s => <option key={s.id} value={s.id}>{s.name} - R$ {s.price}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Valor Cobrado (Opcional)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" placeholder="Usar valor padrão do serviço" className="input-premium pl-12"
                        value={customValue} onChange={(e) => setCustomValue(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full py-5 shadow-primary/30">
                  Confirmar Agendamento
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Agenda;
