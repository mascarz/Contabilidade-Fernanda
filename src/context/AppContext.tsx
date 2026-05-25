import React, { createContext, useContext, useState } from 'react';

export interface Service {
  id: string;
  name: string;
  time: string;
  price: number;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  date: number; 
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

export interface WorkingHours {
  start: number;
  end: number;
}

interface AppContextType {
  appointments: Appointment[];
  clients: Client[];
  transactions: Transaction[];
  services: Service[];
  workingHours: WorkingHours;
  location: string;
  theme: 'white' | 'black';
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  setWorkingHours: (hours: WorkingHours) => void;
  setLocation: (loc: string) => void;
  setTheme: (theme: 'white' | 'black') => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addClient: (client: Omit<Client, 'id'>) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [services, setServices] = useState<Service[]>([
    { id: '1', name: 'Volume Brasileiro', time: '2h', price: 180.00 },
    { id: '2', name: 'Volume Russo', time: '2h 30min', price: 220.00 },
    { id: '3', name: 'Lash Lift', time: '1h', price: 120.00 },
    { id: '4', name: 'Sobrancelha', time: '40min', price: 45.00 },
  ]);
  const [workingHours, setWorkingHoursState] = useState<WorkingHours>({ start: 8, end: 19 });
  const [location, setLocationState] = useState('São Paulo, SP');
  const [theme, setThemeState] = useState<'white' | 'black'>('white');

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

    addTransaction({
      title: appointment.serviceName,
      clientName: appointment.clientName,
      value: appointment.value,
      type: 'in',
      category: 'Serviço',
      date: new Date().toLocaleDateString('pt-BR')
    });
  };

  const addTransaction = (newTrans: Omit<Transaction, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setTransactions(prev => [ { ...newTrans, id }, ...prev]);
  };

  return (
    <AppContext.Provider value={{ 
      appointments, clients, transactions, services, workingHours, location, theme,
      setServices,
      setWorkingHours: setWorkingHoursState,
      setLocation: setLocationState,
      setTheme: setThemeState,
      addAppointment, addTransaction, addClient
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useApp must be used within an AppProvider');
  return context;
};
