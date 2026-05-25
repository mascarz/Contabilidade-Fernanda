import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/admin/Dashboard';
import Agenda from './pages/admin/Agenda';
import Financeiro from './pages/admin/Financeiro';
import Clientes from './pages/admin/Clientes';
import Notificacoes from './pages/admin/Notificacoes';
import Perfil from './pages/admin/Perfil';
import Booking from './pages/client/Booking';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const AdminLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderAdminContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'agenda': return <Agenda />;
      case 'financeiro': return <Financeiro />;
      case 'clientes': return <Clientes />;
      case 'notificacoes': return <Notificacoes />;
      case 'perfil': return <Perfil />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24 relative">
      <header className="px-6 pt-8 pb-4 flex justify-between items-center bg-white sticky top-0 z-40">
        <div>
          <h1 className="text-sm font-medium text-gray-400">Olá, Fernanda</h1>
          <p className="text-xl font-bold text-secondary">Painel Administrativo</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-primary/20">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda" 
            alt="Fernanda" 
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      <main className="px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderAdminContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota do Cliente: Raiz do site */}
        <Route path="/" element={<Booking />} />
        
        {/* Rota da Fernanda: /admin */}
        <Route path="/admin" element={<AdminLayout />} />
        
        {/* Redirecionar qualquer outra rota para o cliente */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
