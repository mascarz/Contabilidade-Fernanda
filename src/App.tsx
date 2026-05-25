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
import { useApp } from './context/AppContext';

const AdminLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { theme } = useApp();

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
    <div className={`min-h-screen pb-24 relative transition-colors duration-500 ${theme === 'black' ? 'bg-secondary' : 'bg-white'}`}>
      <header className={`px-6 pt-8 pb-4 flex justify-between items-center sticky top-0 z-40 transition-colors duration-500 ${theme === 'black' ? 'bg-secondary' : 'bg-white'}`}>
        <div>
          <h1 className="text-sm font-medium text-gray-400">Olá, Fernanda</h1>
          <p className={`text-xl font-bold transition-colors ${theme === 'black' ? 'text-white' : 'text-secondary'}`}>Painel Administrativo</p>
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden border-2 ${theme === 'black' ? 'bg-secondary-light border-primary/40' : 'bg-gray-100 border-primary/20'}`}>
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
        <Route path="/" element={<Booking />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
