import React from 'react';
import { Bell, Check, Clock, AlertCircle, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Notificacoes: React.FC = () => {
  const notifications = [
    { 
      id: 1, 
      type: 'appointment', 
      title: 'Novo Agendamento', 
      desc: 'Mariana Vaz agendou Volume Russo para amanhã às 14:00.', 
      time: 'Há 5 min', 
      icon: Calendar, 
      color: 'bg-blue-500' 
    },
    { 
      id: 2, 
      type: 'finance', 
      title: 'Meta Batida!', 
      desc: 'Parabéns! Você atingiu 80% da sua meta de faturamento mensal.', 
      time: 'Há 2 horas', 
      icon: TrendingUp, 
      color: 'bg-green-500' 
    },
    { 
      id: 3, 
      type: 'alert', 
      title: 'Gasto Elevado', 
      desc: 'Seus gastos com insumos aumentaram 15% em relação ao mês passado.', 
      time: 'Há 5 horas', 
      icon: AlertCircle, 
      color: 'bg-orange-500' 
    },
    { 
      id: 4, 
      type: 'reminder', 
      title: 'Cliente Chegando', 
      desc: 'Ana Paula tem um horário em 15 minutos.', 
      time: 'Há 10 min', 
      icon: Clock, 
      color: 'bg-primary' 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-secondary">Notificações</h2>
        <button className="text-sm font-bold text-primary">Limpar tudo</button>
      </div>

      <div className="space-y-4 pb-8">
        {notifications.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-5 rounded-3xl border border-gray-100 shadow-premium flex gap-4 relative overflow-hidden"
          >
            <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-white shrink-0`}>
              <item.icon size={24} />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-secondary text-sm">{item.title}</h4>
                <span className="text-[10px] text-gray-400 font-medium">{item.time}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-[2rem] text-center space-y-2 border-2 border-dashed border-gray-200">
        <div className="w-12 h-12 rounded-full bg-white mx-auto flex items-center justify-center text-gray-300">
          <Check size={24} />
        </div>
        <p className="text-xs font-bold text-gray-400">Tudo em dia por aqui!</p>
      </div>
    </div>
  );
};

export default Notificacoes;
