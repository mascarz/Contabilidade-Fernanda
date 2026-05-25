import React from 'react';
import { TrendingUp, Users, Calendar, ArrowRight, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useApp } from '../../context/AppContext';

const Dashboard: React.FC = () => {
  const { transactions, clients, appointments } = useApp();

  const faturamentoHoje = transactions
    .filter(t => t.type === 'in' && t.date === new Date().toLocaleDateString('pt-BR'))
    .reduce((acc, curr) => acc + curr.value, 0);

  const lucroMensal = transactions
    .filter(t => t.type === 'in')
    .reduce((acc, curr) => acc + curr.value, 0) - 
    transactions
    .filter(t => t.type === 'out')
    .reduce((acc, curr) => acc + curr.value, 0);

  const nextAppointment = appointments
    .filter(a => a.date >= new Date().getDate())
    .sort((a, b) => a.hour - b.hour)[0];

  // Dados fictícios para o gráfico baseado nas transações (ou vazio se não houver)
  const chartData = [
    { name: 'Seg', value: 0 },
    { name: 'Ter', value: 0 },
    { name: 'Qua', value: 0 },
    { name: 'Qui', value: 0 },
    { name: 'Sex', value: 0 },
    { name: 'Sáb', value: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Resumo Financeiro */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          whileTap={{ scale: 0.95 }}
          className="bg-secondary p-5 rounded-3xl text-white space-y-2 shadow-xl shadow-secondary/20"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
            <TrendingUp size={20} className="text-primary" />
          </div>
          <p className="text-xs text-gray-400">Faturamento Hoje</p>
          <h3 className="text-xl font-bold">R$ {faturamentoHoje.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
        </motion.div>

        <motion.div 
          whileTap={{ scale: 0.95 }}
          className="bg-white p-5 rounded-3xl border border-gray-100 space-y-2 shadow-premium"
        >
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Wallet size={20} className="text-primary" />
          </div>
          <p className="text-xs text-gray-500">Lucro Mensal</p>
          <h3 className="text-xl font-bold text-secondary">R$ {lucroMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
        </motion.div>
      </div>

      {/* Gráfico Rápido */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-premium">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-secondary">Desempenho Semanal</h3>
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {transactions.length > 0 ? '+100%' : '0%'}
          </span>
        </div>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#FF6B00" 
                strokeWidth={3} 
                dot={false}
              />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Próximo Cliente */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-secondary">Próximo Cliente</h3>
          <button className="text-xs font-bold text-primary flex items-center gap-1">
            Ver agenda <ArrowRight size={14} />
          </button>
        </div>
        
        {nextAppointment ? (
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-primary p-4 rounded-3xl text-white flex items-center gap-4 shadow-lg shadow-primary/30"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white/30">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${nextAppointment.clientName}`} alt="Cliente" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold">{nextAppointment.clientName}</h4>
              <p className="text-xs text-white/80">{nextAppointment.serviceName} • {nextAppointment.hour}:00</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-full uppercase">Hoje</span>
            </div>
          </motion.div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-200 text-center">
            <p className="text-xs text-gray-400 font-bold">Nenhum agendamento para hoje</p>
          </div>
        )}
      </div>

      {/* Stats Rápidos */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-3xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm">
            <Users size={18} className="text-secondary" />
          </div>
          <div>
            <p className="text-[10px] text-gray-500">Clientes</p>
            <p className="font-bold text-secondary">{clients.length}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-3xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm">
            <Calendar size={18} className="text-secondary" />
          </div>
          <div>
            <p className="text-[10px] text-gray-500">Agendados</p>
            <p className="font-bold text-secondary">{appointments.length} total</p>
          </div>
        </div>
      </div>

      {/* IA Financeira Card */}
      <div className="space-y-3">
        <h3 className="font-bold text-secondary">IA Financeira</h3>
        <div className="bg-orange-50 p-5 rounded-3xl border border-primary/10 flex gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0">
            <TrendingUp size={24} className="text-white" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-secondary">Dica de Lucro</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              {transactions.length === 0 
                ? "Comece a cadastrar seus serviços para receber dicas personalizadas de lucro e economia."
                : "Clientes de cílios geram 25% mais retorno. Foque em pacotes de manutenção para aumentar seu lucro real."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
