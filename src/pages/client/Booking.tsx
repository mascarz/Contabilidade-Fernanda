import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, CheckCircle2, ChevronRight, ArrowLeft, Scissors, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const Booking: React.FC = () => {
  const { services, addAppointment, addClient, workingHours, location } = useApp();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const days = [
    { day: 'Seg', date: 25 },
    { day: 'Ter', date: 26 },
    { day: 'Qua', date: 27 },
    { day: 'Qui', date: 28 },
    { day: 'Sex', date: 29 },
  ];

  // Gerar horários dinâmicos com base nas configurações do dono
  const times = Array.from(
    { length: workingHours.end - workingHours.start + 1 }, 
    (_, i) => `${(i + workingHours.start).toString().padStart(2, '0')}:00`
  );

  const handleConfirm = () => {
    if (!selectedService || !selectedDate || !selectedTime || !formData.name || !formData.phone) return;

    const clientId = addClient({
      name: formData.name,
      phone: formData.phone,
      lastVisit: new Date().toLocaleDateString('pt-BR'),
      totalVisits: 0,
      totalSpent: 0,
      favorite: false
    });

    addAppointment({
      clientId,
      clientName: formData.name,
      clientPhone: formData.phone,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date: selectedDate,
      hour: parseInt(selectedTime.split(':')[0]),
      value: selectedService.price,
      status: 'confirmed'
    });

    nextStep();
  };

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Client Header */}
      <div className="bg-secondary p-8 rounded-b-[3rem] text-white space-y-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Scissors size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Fernanda Amorim</h1>
            <p className="text-sm text-gray-400">Estética & Cílios</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-white/10 p-3 rounded-2xl border border-white/5">
            <p className="text-[10px] text-gray-400 uppercase font-bold">Local</p>
            <p className="text-[10px] font-medium truncate">{location}</p>
          </div>
          <div className="flex-1 bg-white/10 p-3 rounded-2xl border border-white/5">
            <p className="text-[10px] text-gray-400 uppercase font-bold">Avaliação</p>
            <p className="text-xs font-medium">4.9 (Novo)</p>
          </div>
        </div>
      </div>

      <main className="px-6 py-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-secondary">Escolha um serviço</h2>
              <div className="space-y-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => { setSelectedService(service); nextStep(); }}
                    className="w-full bg-white p-5 rounded-3xl border border-gray-100 shadow-premium flex items-center justify-between transition-all active:scale-95"
                  >
                    <div className="text-left">
                      <h4 className="font-bold text-secondary">{service.name}</h4>
                      <p className="text-xs text-gray-400">{service.time} • R$ {service.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <ChevronRight size={20} className="text-primary" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <button onClick={prevStep} className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                <ArrowLeft size={16} /> Voltar
              </button>
              
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-secondary">Data e Horário</h2>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {days.map((d) => (
                    <button
                      key={d.date}
                      onClick={() => setSelectedDate(d.date)}
                      className={`flex flex-col items-center justify-center min-w-[70px] py-6 rounded-3xl transition-all ${
                        selectedDate === d.date ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-50 text-gray-400'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold mb-1">{d.day}</span>
                      <span className="text-xl font-bold">{d.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-secondary text-sm">Horários Disponíveis</h3>
                <div className="grid grid-cols-3 gap-3">
                  {times.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-4 rounded-2xl text-sm font-bold transition-all ${
                        selectedTime === t ? 'bg-secondary text-white shadow-lg' : 'bg-gray-50 text-gray-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                disabled={!selectedDate || !selectedTime}
                onClick={nextStep}
                className="btn-primary w-full disabled:opacity-50 disabled:bg-gray-200"
              >
                Continuar
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <button onClick={prevStep} className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                <ArrowLeft size={16} /> Voltar
              </button>

              <div className="space-y-6">
                <h2 className="text-xl font-bold text-secondary">Seus Dados</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Nome Completo</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Como podemos te chamar?" 
                        className="input-premium pl-12"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="tel" 
                        placeholder="(00) 00000-0000" 
                        className="input-premium pl-12"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-[2rem] space-y-3">
                  <h4 className="font-bold text-secondary text-sm">Resumo do Agendamento</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Serviço</span>
                      <span className="font-bold text-secondary">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Data e Hora</span>
                      <span className="font-bold text-secondary">{selectedDate} de Maio, às {selectedTime}</span>
                    </div>
                    <div className="flex justify-between text-xs pt-2 border-t border-gray-200">
                      <span className="text-gray-400">Total</span>
                      <span className="font-bold text-primary">R$ {selectedService?.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                <button 
                  disabled={!formData.name || !formData.phone}
                  onClick={handleConfirm}
                  className="btn-primary w-full shadow-primary/30"
                >
                  Confirmar Agendamento
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center space-y-6 py-10"
            >
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-4">
                <CheckCircle2 size={64} />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-secondary">Agendado!</h2>
                <p className="text-gray-400 leading-relaxed px-6">
                  Tudo certo, {formData.name.split(' ')[0]}! Seu horário foi reservado com sucesso. Enviamos os detalhes para seu WhatsApp.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-[2.5rem] w-full space-y-3">
                <div className="flex items-center gap-3 text-left">
                  <Calendar className="text-primary" size={20} />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Data</p>
                    <p className="text-sm font-bold text-secondary">{selectedDate} de Maio, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <Clock className="text-primary" size={20} />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Horário</p>
                    <p className="text-sm font-bold text-secondary">{selectedTime}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setStep(1)}
                className="text-primary font-bold text-sm"
              >
                Fazer outro agendamento
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Booking;
