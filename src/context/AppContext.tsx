import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Service {
  id: number;
  name: string;
  time: string;
  price: number;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  serviceId: number;
  serviceName: string;
  date: number; // dia do mês para o exemplo simplificado
  hour: number;
  value: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  lastVisit: string;
  totalVisits: number;
  totalSpent: number;
  favorite: boolean;
}

export interface Transaction {
  id: string;
  title: string;
  clientName: string;
  value: number;
  type: 'in' | 'out';
  category: string;
  date: string;
}

interface AppContextType {
  appointments: Appointment[];
  clients: Client[];
  transactions: Transaction[];
  services: Service[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addClient: (client: Omit<Client, 'id'>) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicializando tudo zerado conforme solicitado
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const services: Service[] = [
    { id: 1, name: 'Volume Brasileiro', time: '2h', price: 180.00 },
    { id: 2, name: 'Volume Russo', time: '2h 30min', price: 220.00 },
    { id: 3, name: 'Lash Lift', time: '1h', price: 120.00 },
    { id: 4, name: 'Sobrancelha', time: '40min', price: 45.00 },
    { id: 5, name: 'Manutenção', time: '1h 30min', price: 130.00 },
  ];

  const addClient = (newClient: Omit<Client, 'id'>) => {
    const existingClient = clients.find(c => c.phone === newClient.phone);
    if (existingClient) return existingClient.id;

    const id = Math.random().toString(36).substr(2, 9);
    setClients(prev => [...prev, { ...newClient, id }]);
    return id;
  };

  const addAppointment = (newApp: Omit<Appointment, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const appointment = { ...newApp, id };
    
    setAppointments(prev => [...prev, appointment]);

    // Ao confirmar agendamento, adicionamos ao financeiro como entrada futura/pendente
    // Neste exemplo simplificado, adicionamos direto como transação realizada
    addTransaction({
      title: appointment.serviceName,
      clientName: appointment.clientName,
      value: appointment.value,
      type: 'in',
      category: 'Serviço',
      date: new Date().toLocaleDateString('pt-BR')
    });

    // Atualiza estatísticas do cliente
    setClients(prev => prev.map(c => {
      if (c.phone === appointment.clientPhone) {
        return {
          ...c,
          totalVisits: c.totalVisits + 1,
          totalSpent: c.totalSpent + appointment.value,
          lastVisit: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
        };
      }
      return c;
    }));
  };

  const addTransaction = (newTrans: Omit<Transaction, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setTransactions(prev => [ { ...newTrans, id }, ...prev]);
  };

  return (
    <AppContext.Provider value={{ 
      appointments, 
      clients, 
      transactions, 
      services, 
      addAppointment, 
      addTransaction,
      addClient
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
