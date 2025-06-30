import type { Customer } from '../types/Customer';

const API_URL = import.meta.env.VITE_API_URL;
const API_BASE = `${API_URL}/clients`;

const getToken = () => localStorage.getItem('token');

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

const customersService = {
  async list(): Promise<Customer[]> {
    const res = await fetch(API_BASE, { headers: headers() });
    if (!res.ok) throw new Error('Erro ao listar clientes');
    return res.json();
  },

  async findByEmail(email: string): Promise<Customer> {
    const res = await fetch(`${API_BASE}/email/${encodeURIComponent(email)}`, { headers: headers() });
    if (!res.ok) throw new Error('Cliente não encontrado');
    return res.json();
  },

  async findByName(name: string): Promise<Customer[]> {
    const res = await fetch(`${API_BASE}/name/${encodeURIComponent(name)}`, { headers: headers() });
    if (!res.ok) throw new Error('Erro ao buscar clientes por nome');
    return res.json();
  },

  async findById(id: number): Promise<Customer> {
    const res = await fetch(`${API_BASE}/${id}`, { headers: headers() });
    if (!res.ok) throw new Error('Cliente não encontrado');
    return res.json();
  },

  async findByDocument(document: string): Promise<Customer> {
    const res = await fetch(`${API_BASE}/document/${encodeURIComponent(document)}`, { headers: headers() });
    if (!res.ok) throw new Error('Cliente não encontrado');
    return res.json();
  },

  async create(data: Omit<Customer, 'id'>): Promise<Customer> {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao criar cliente');
    return res.json();
  },

  async update(id: number, data: Partial<Omit<Customer, 'id'>>): Promise<Customer> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao atualizar cliente');
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
      headers: headers(),
    });
    if (!res.ok) throw new Error('Erro ao deletar cliente');
  },
};

export default customersService;
