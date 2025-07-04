import { Building2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Property } from '@/types/Property';
import propertiesService from '@/api/propertiesService';
import { Button } from '@/components/ui/button';
import { TableSearch } from '@/components/common/TableSearch';
import { PropertiesTable } from '@/components/properties/PropertiesTable';
import { PropertyDialog } from '@/components/properties/PropertyDialog';
import { DeletePropertyDialog } from '@/components/properties/DeletePropertyDialog';

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading,    setLoading   ] = useState(true);
  const [error,      setError     ] = useState<string | null>(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [editing,    setEditing   ] = useState<Property | null>(null);
  const [form, setForm] = useState<Omit<Property, 'id'>>({
    title: '', address: '', price: 0, status: 'disponível', description: '',
  });
  const [deleting,   setDeleting  ] = useState<Property | null>(null);

  const fetchProperties = async () => {
    setLoading(true); setError(null);
    try   { setProperties(await propertiesService.list()); }
    catch (e: any) { setError(e.message || 'Erro ao carregar imóveis'); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchProperties(); }, []);

  /* ────────── CRUD helpers ────────── */
  const openForm = (p?: Property) => {
    if (p) {
      setEditing(p);
      setForm({ title: p.title, address: p.address, price: p.price, status: p.status, description: p.description });
    } else {
      setEditing(null);
      setForm({ title: '', address: '', price: 0, status: 'disponível', description: '' });
    }
    setOpenDialog(true);
  };
  const closeForm = () => { setOpenDialog(false); setEditing(null); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      editing
        ? await propertiesService.update(editing.id, form)
        : await propertiesService.create(form);
      closeForm(); fetchProperties();
    } catch (err: any) { setError(err.message || 'Erro ao salvar imóvel'); }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try { await propertiesService.delete(deleting.id); setDeleting(null); fetchProperties(); }
    catch (err: any) { setError(err.message || 'Erro ao deletar imóvel'); }
  };

  /* ────────── Busca simples pelo título ────────── */
  const [search, setSearch] = useState('');
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return fetchProperties();
    const found = properties.filter(p =>
      p.title.toLowerCase().includes(search.trim().toLowerCase()),
    );
    setProperties(found);
  };

  return (
    <main className="w-full min-h-[85vh] bg-gradient-to-br from-card to-background flex flex-col items-center justify-start pt-16 px-2 md:px-4">
      {/* Header da página */}
      <section className="w-full flex flex-col items-center mb-10">
        <div className="flex flex-col items-center gap-2 mb-6">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/90 text-white shadow-lg p-3">
            <Building2 className="w-7 h-7" />
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary font-quicksand drop-shadow-sm tracking-tight">
            Propriedades
          </h1>
        </div>

        <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-4 max-w-3xl">
          <TableSearch
            value={search}
            onChange={e => setSearch(e.target.value)}
            onSubmit={handleSearch}
            onClear={() => { setSearch(''); fetchProperties(); }}
            placeholder="Buscar pelo título do imóvel"
          />
          <Button
            className="rounded-full text-base font-bold shadow-md bg-primary hover:bg-primary/90 transition-all h-10 px-6 whitespace-nowrap md:ml-4"
            style={{ minWidth: 140 }}
            onClick={() => openForm()}
          >
            + Novo Imóvel
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
          ) : properties.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 text-lg">Nenhum imóvel cadastrado.</div>
          ) : (
            <PropertiesTable properties={properties} onEdit={openForm} onDelete={setDeleting} />
          )}
        </div>
      </section>

      {/* Diálogos */}
      <PropertyDialog
        open     ={openDialog}
        editing  ={editing}
        form     ={form}
        onChange ={handleChange}
        onClose  ={closeForm}
        onSubmit ={handleSubmit}
      />
      <DeletePropertyDialog
        open     ={!!deleting}
        property ={deleting}
        onCancel ={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </main>
  );
}
