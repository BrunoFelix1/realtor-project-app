import { KeyRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Rental } from '@/types/Rental';
import rentalsService from '@/api/rentalsService';
import { Button } from '@/components/ui/button';
import { TableSearch } from '@/components/common/TableSearch';
import { RentalsTable } from '@/components/rentals/RentalsTable';
import { RentalDialog } from '@/components/rentals/RentalDialog';
import { DeleteRentalDialog } from '@/components/rentals/DeleteRentalDialog';

export default function Rentals() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError  ] = useState<string | null>(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [editing,    setEditing   ] = useState<Rental | null>(null);
  const [form, setForm] = useState<Omit<Rental, 'id'>>({
    propertyId: 0, tenantId: 0, startDate: '', endDate: '', monthlyValue: 0, active: true,
  });
  const [deleting, setDeleting] = useState<Rental | null>(null);

  const fetchRentals = async () => {
    setLoading(true); setError(null);
    try   { setRentals(await rentalsService.list()); }
    catch (e: any) { setError(e.message || 'Erro ao carregar aluguéis'); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchRentals(); }, []);

  /* Form helpers */
  const openForm = (r?: Rental) => {
    if (r) {
      setEditing(r);
      setForm({ propertyId: r.propertyId, tenantId: r.tenantId, startDate: r.startDate, endDate: r.endDate, monthlyValue: r.monthlyValue, active: r.active });
    } else {
      setEditing(null);
      setForm({ propertyId: 0, tenantId: 0, startDate: '', endDate: '', monthlyValue: 0, active: true });
    }
    setOpenDialog(true);
  };
  const closeForm = () => { setOpenDialog(false); setEditing(null); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]:
        name === 'monthlyValue' || name === 'propertyId' || name === 'tenantId'
          ? Number(value)
          : name === 'active'
            ? value === 'true' || value === 'on'
            : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      editing
        ? await rentalsService.update(editing.id, form)
        : await rentalsService.create(form);
      closeForm(); fetchRentals();
    } catch (err: any) { setError(err.message || 'Erro ao salvar aluguel'); }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try { await rentalsService.delete(deleting.id); setDeleting(null); fetchRentals(); }
    catch (err: any) { setError(err.message || 'Erro ao deletar aluguel'); }
  };

  /* Busca simples por propertyId ou tenantId */
  const [search, setSearch] = useState('');
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return fetchRentals();
    const id = Number(search.trim());
    if (isNaN(id)) return;
    const found = rentals.filter(r => r.propertyId === id || r.tenantId === id);
    setRentals(found);
  };

  return (
    <main className="w-full min-h-[85vh] bg-gradient-to-br from-card to-background flex flex-col items-center justify-start pt-16 px-2 md:px-4">
      {/* Cabeçalho */}
      <section className="w-full flex flex-col items-center mb-10">
        <div className="flex flex-col items-center gap-2 mb-6">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/90 text-white shadow-lg p-3">
            <KeyRound className="w-7 h-7" />
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary font-quicksand drop-shadow-sm tracking-tight">
            Aluguéis
          </h1>
        </div>

        <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-4 max-w-3xl">
          <TableSearch
            value={search}
            onChange={e => setSearch(e.target.value)}
            onSubmit={handleSearch}
            onClear={() => { setSearch(''); fetchRentals(); }}
            placeholder="Buscar por ID do imóvel ou inquilino"
          />
          <Button
            className="rounded-full text-base font-bold shadow-md bg-primary hover:bg-primary/90 transition-all h-10 px-6 whitespace-nowrap md:ml-4"
            style={{ minWidth: 140 }}
            onClick={() => openForm()}
          >
            + Novo Aluguel
          </Button>
        </div>
      </section>

      {/* Tabela */}
      <section className="w-full max-w-6xl overflow-x-auto bg-card mt-2">
        <div className="rounded-2xl shadow-md border border-border px-6 py-2 overflow-hidden">
          {loading ? (
            <div className="text-center text-muted-foreground py-12 text-lg animate-pulse">Carregando...</div>
          ) : error ? (
            <div className="text-center text-destructive py-12 text-lg font-semibold animate-fade-in">{error}</div>
          ) : rentals.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 text-lg">Nenhum aluguel cadastrado.</div>
          ) : (
            <RentalsTable rentals={rentals} onEdit={openForm} onDelete={setDeleting} />
          )}
        </div>
      </section>

      {/* Diálogos */}
      <RentalDialog
        open     ={openDialog}
        editing  ={editing}
        form     ={form}
        onChange ={handleChange}
        onClose  ={closeForm}
        onSubmit ={handleSubmit}
      />
      <DeleteRentalDialog
        open   ={!!deleting}
        rental ={deleting}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </main>
  );
}
