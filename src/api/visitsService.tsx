import type { Visit } from '@/types/Visit';

const API_URL = import.meta.env.VITE_API_URL;
const API_BASE = `${API_URL}/visits`;

const getToken = () =>
  localStorage.getItem('token') || sessionStorage.getItem('token');

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

const visitsService = {
  async list(): Promise<Visit[]> {
    const res = await fetch(API_BASE, { headers: headers() });
    if (!res.ok) throw new Error('Erro ao listar visitas');
    return res.json();
  },

  async findById(id: number): Promise<Visit> {
    const res = await fetch(`${API_BASE}/${id}`, { headers: headers() });
    if (!res.ok) throw new Error('Visita não encontrada');
    return res.json();
  },

  async create(data: Omit<Visit, 'id'>): Promise<Visit> {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao criar visita');
    return res.json();
  },

  async update(id: number, data: Partial<Omit<Visit, 'id'>>): Promise<Visit> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao atualizar visita');
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
      headers: headers(),
    });
    if (!res.ok) throw new Error('Erro ao deletar visita');
  },
};

export default visitsService;
