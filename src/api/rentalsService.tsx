import type { Rental } from '@/types/Rental';

const API_URL  = import.meta.env.VITE_API_URL;
const API_BASE = `${API_URL}/rentals`;

const getToken = () =>
  localStorage.getItem('token') || sessionStorage.getItem('token');

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization : `Bearer ${getToken()}`,
});

const rentalsService = {
  async list(): Promise<Rental[]> {
    const res = await fetch(API_BASE, { headers: headers() });
    if (!res.ok) throw new Error('Erro ao listar aluguéis');
    return res.json();
  },

  async findById(id: number): Promise<Rental> {
    const res = await fetch(`${API_BASE}/${id}`, { headers: headers() });
    if (!res.ok) throw new Error('Aluguel não encontrado');
    return res.json();
  },

  async findByProperty(propertyId: number): Promise<Rental[]> {
    const res = await fetch(`${API_BASE}/property/${propertyId}`, {
      headers: headers(),
    });
    if (!res.ok) throw new Error('Erro ao buscar aluguéis por imóvel');
    return res.json();
  },

  async findByTenant(tenantId: number): Promise<Rental[]> {
    const res = await fetch(`${API_BASE}/tenant/${tenantId}`, {
      headers: headers(),
    });
    if (!res.ok) throw new Error('Erro ao buscar aluguéis por inquilino');
    return res.json();
  },

  async create(data: Omit<Rental, 'id'>): Promise<Rental> {
    const res = await fetch(API_BASE, {
      method : 'POST',
      headers: headers(),
      body   : JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao criar aluguel');
    return res.json();
  },

  async update(id: number, data: Partial<Omit<Rental, 'id'>>): Promise<Rental> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method : 'PUT',
      headers: headers(),
      body   : JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao atualizar aluguel');
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method : 'DELETE',
      headers: headers(),
    });
    if (!res.ok) throw new Error('Erro ao deletar aluguel');
  },
};

export default rentalsService;
