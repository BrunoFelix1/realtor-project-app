import { CalendarPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Visit } from '@/types/Visit';
import visitsService from '@/api/visitsService';
import { Button } from '@/components/ui/button';
import { TableSearch } from '@/components/common/TableSearch';
import { VisitsTable } from '@/components/visits/VisitsTable';
import { VisitDialog } from '@/components/visits/VisitDialog';
import { DeleteVisitDialog } from '@/components/visits/DeleteVisitDialog';

export default function Visits() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editing, setEditing] = useState<Visit | null>(null);
  const [form, setForm] = useState<Omit<Visit, 'id'>>({
    propertyId: 0,
    customerId: 0,
    scheduledAt: '',
    notes: '',
  });
  const [deleting, setDeleting] = useState<Visit | null>(null);

  const fetchVisits = async () => {
    setLoading(true);
    setError(null);
    try {
      setVisits(await visitsService.list());
    } catch (e: any) {
      setError(e.message || 'Erro ao carregar visitas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  const handleOpenDialog = (visit?: Visit) => {
    if (visit) {
      setEditing(visit);
      setForm({
        propertyId: visit.propertyId,
        customerId: visit.customerId,
        scheduledAt: visit.scheduledAt,
        notes: visit.notes,
      });
    } else {
      setEditing(null);
      setForm({ propertyId: 0, customerId: 0, scheduledAt: '', notes: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditing(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      editing
        ? await visitsService.update(editing.id, form)
        : await visitsService.create(form);
      handleCloseDialog();
      fetchVisits();
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar visita');
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      await visitsService.delete(deleting.id);
      setDeleting(null);
      fetchVisits();
    } catch (err: any) {
      setError(err.message || 'Erro ao deletar visita');
    }
  };

  /* ────────── Busca simples por ID (pode ser expandida depois) ────────── */
  const [search, setSearch] = useState('');
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return fetchVisits();
    const found = visits.filter(v => v.id.toString() === search.trim());
    setVisits(found);
  };

  return (
    <main className="w-full min-h-[85vh] bg-gradient-to-br from-card to-background flex flex-col items-center justify-start pt-16 px-2 md:px-4">
      <section className="w-full flex flex-col items-center mb-10">
        <div className="flex flex-col items-center gap-2 mb-6">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/90 text-white shadow-lg p-3">
            <CalendarPlus className="w-7 h-7" />
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary font-quicksand drop-shadow-sm tracking-tight">
            Visitas
          </h1>
        </div>

        <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-4 max-w-3xl">
          <TableSearch
            value={search}
            onChange={e => setSearch(e.target.value)}
            onSubmit={handleSearch}
            onClear={() => { setSearch(''); fetchVisits(); }}
            placeholder="Buscar por ID da visita"
          />
          <Button
            className="rounded-full text-base font-bold shadow-md bg-primary hover:bg-primary/90 transition-all h-10 px-6 whitespace-nowrap md:ml-4"
            style={{ minWidth: 140 }}
            onClick={() => handleOpenDialog()}
          >
            + Nova Visita
          </Button>
        </div>
      </section>

      <section className="w-full max-w-6xl overflow-x-auto bg-card mt-2">
        <div className="rounded-2xl shadow-md border border-border px-6 py-2 overflow-hidden">
          {loading ? (
            <div className="text-center text-muted-foreground py-12 text-lg animate-pulse">
              Carregando...
            </div>
          ) : error ? (
            <div className="text-center text-destructive py-12 text-lg font-semibold animate-fade-in">
              {error}
            </div>
          ) : visits.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 text-lg">
              Nenhuma visita agendada.
            </div>
          ) : (
            <VisitsTable visits={visits} onEdit={handleOpenDialog} onDelete={setDeleting} />
          )}
        </div>
      </section>

      <VisitDialog
        open={openDialog}
        editing={editing}
        form={form}
        onChange={handleChange}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
      />
      <DeleteVisitDialog
        open={!!deleting}
        visit={deleting}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </main>
  );
}
