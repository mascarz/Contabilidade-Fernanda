import React, { useState } from 'react';
import { Plus, Minus, TrendingDown, TrendingUp, PieChart, Download, X, DollarSign, Tag, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const Financeiro: React.FC = () => {
  const { transactions, addTransaction } = useApp();
  const [view, setView] = useState<'overview' | 'entries' | 'expenses'>('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [type, setType] = useState<'in' | 'out'>('in');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [clientName, setClientName] = useState('');

  const totalIn = transactions
    .filter(t => t.type === 'in')
    .reduce((acc, curr) => acc + curr.value, 0);

  const totalOut = transactions
    .filter(t => t.type === 'out')
    .reduce((acc, curr) => acc + curr.value, 0);

  const saldo = totalIn - totalOut;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !value) return;

    addTransaction({
      title,
      clientName: clientName || (type === 'in' ? 'Cliente Avulso' : 'Fornecedor'),
      value: parseFloat(value.replace(',', '.')),
      type,
      category: category || (type === 'in' ? 'Serviço' : 'Geral'),
      date: new Date().toLocaleDateString('pt-BR')
    });

    // Reset Form
    setTitle('');
    setValue('');
    setCategory('');
    setClientName('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Financeiro */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-secondary">Financeiro</h2>
        <div className="flex gap-2">
          <button className="p-3 rounded-2xl bg-gray-50 text-secondary active:scale-95 transition-all">
            <Download size={20} />
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="p-3 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 active:scale-95 transition-all"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Saldo Card */}
      <div className="bg-secondary p-8 rounded-[2.5rem] text-white space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <PieChart size={120} />
        </div>
        <p className="text-sm text-gray-400">Saldo Disponível</p>
        <h1 className="text-4xl font-bold tracking-tight">
          R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </h1>
        <div className="flex gap-6 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <TrendingUp size={14} className="text-green-400" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase">Lucros</p>
              <p className="text-sm font-bold text-green-400">
                + R$ {totalIn.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
              <TrendingDown size={14} className="text-red-400" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase">Gastos</p>
              <p className="text-sm font-bold text-red-400">
                - R$ {totalOut.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-50 p-1.5 rounded-2xl">
        {[
          { id: 'overview', label: 'Geral' },
          { id: 'entries', label: 'Lucros' },
          { id: 'expenses', label: 'Gastos' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setView(tab.id as any)}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
              view === tab.id
                ? 'bg-white text-secondary shadow-sm'
                : 'text-gray-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* IA Financeira Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10 space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <TrendingUp size={20} className="text-white" />
          </div>
          <h4 className="font-bold text-secondary">IA Financeira</h4>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {transactions.length === 0 
            ? "Seu financeiro está pronto. Adicione seus primeiros lucros ou gastos clicando no botão (+) acima."
            : saldo < 0 
              ? "Atenção: Seus gastos superaram seus lucros este mês. Analise onde pode economizar."
              : "Parabéns! Você está operando no azul. Considere reinvestir parte do lucro em novos kits."}
        </p>
      </motion.div>

      {/* Lista de Transações Recentes */}
      <div className="space-y-4">
        <h3 className="font-bold text-secondary">Transações Recentes</h3>
        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions
              .filter(t => {
                if (view === 'entries') return t.type === 'in';
                if (view === 'expenses') return t.type === 'out';
                return true;
              })
              .map((item) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={item.id} 
                  className="bg-white p-4 rounded-3xl border border-gray-100 flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    item.type === 'in' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
                  }`}>
                    {item.type === 'in' ? <Plus size={20} /> : <Minus size={20} />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-secondary text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-400">{item.clientName} • {item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${item.type === 'in' ? 'text-green-500' : 'text-red-500'}`}>
                      {item.type === 'in' ? '+' : '-'} R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-gray-300 font-medium">{item.date}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-10 rounded-[2.5rem] border-2 border-dashed border-gray-200 text-center">
            <p className="text-sm text-gray-400 font-bold">Nenhuma transação registrada</p>
          </div>
        )}
      </div>

      {/* Modal de Nova Transação */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            {/* Content */}
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full bg-white rounded-t-[3rem] p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-secondary">Nova Transação</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-gray-50 rounded-xl text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tipo Switch */}
                <div className="flex bg-gray-50 p-1.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setType('in')}
                    className={`flex-1 py-4 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                      type === 'in' ? 'bg-white text-green-500 shadow-sm' : 'text-gray-400'
                    }`}
                  >
                    <TrendingUp size={18} /> Lucro
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('out')}
                    className={`flex-1 py-4 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                      type === 'out' ? 'bg-white text-red-500 shadow-sm' : 'text-gray-400'
                    }`}
                  >
                    <TrendingDown size={18} /> Gasto
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Título / Descrição</label>
                    <div className="relative">
                      <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Ex: Cílios Marrom, Compra de Cola..." 
                        className="input-premium pl-12"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Valor (R$)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="0,00" 
                        className="input-premium pl-12"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Nome (Opcional)</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder={type === 'in' ? "Nome da Cliente" : "Nome do Fornecedor"}
                        className="input-premium pl-12"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Categoria</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Insumos, Serviço, Aluguel..." 
                      className="input-premium"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className={`w-full py-5 rounded-[2rem] font-bold text-white shadow-lg transition-all active:scale-95 ${
                    type === 'in' ? 'bg-green-500 shadow-green-200' : 'bg-red-500 shadow-red-200'
                  }`}
                >
                  Salvar {type === 'in' ? 'Lucro' : 'Gasto'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Financeiro;
