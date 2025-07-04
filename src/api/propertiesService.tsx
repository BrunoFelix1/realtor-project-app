import type { Property } from '@/types/Property';

const API_URL  = import.meta.env.VITE_API_URL;
const API_BASE = `${API_URL}/properties`;

const getToken = () =>
  localStorage.getItem('token') || sessionStorage.getItem('token');

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization : `Bearer ${getToken()}`,
});

const propertiesService = {
  async list(): Promise<Property[]> {
    const res = await fetch(API_BASE, { headers: headers() });
    if (!res.ok) throw new Error('Erro ao listar imóveis');
    return res.json();
  },

  async findById(id: number): Promise<Property> {
    const res = await fetch(`${API_BASE}/${id}`, { headers: headers() });
    if (!res.ok) throw new Error('Imóvel não encontrado');
    return res.json();
  },

  async create(data: Omit<Property, 'id'>): Promise<Property> {
    const res = await fetch(API_BASE, {
      method : 'POST',
      headers: headers(),
      body   : JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao criar imóvel');
    return res.json();
  },

  async update(id: number, data: Partial<Omit<Property, 'id'>>): Promise<Property> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method : 'PUT',
      headers: headers(),
      body   : JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao atualizar imóvel');
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method : 'DELETE',
      headers: headers(),
    });
    if (!res.ok) throw new Error('Erro ao deletar imóvel');
  },
};

export default propertiesService;
