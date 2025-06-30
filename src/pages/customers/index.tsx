import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import type { Customer } from "@/types/Customer";
import customersService from "@/api/customersService";
import { Button } from "@/components/ui/button";
import { CustomersTable } from "@/components/customers/CustomersTable";
import { CustomerDialog } from "@/components/customers/CustomerDialog";
import { DeleteCustomerDialog } from "@/components/customers/DeleteCustomerDialog";
import { TableSearch } from "@/components/common/TableSearch";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [form, setForm] = useState<Omit<Customer, "id">>({ name: "", email: "", phone: "", type: "", document: "" });
  const [deleting, setDeleting] = useState<Customer | null>(null);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await customersService.list();
      setCustomers(data);
    } catch (e: any) {
      setError(e.message || "Erro ao carregar clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleOpenDialog = (customer?: Customer) => {
    if (customer) {
      setEditing(customer);
      setForm({ name: customer.name, email: customer.email, phone: customer.phone, type: customer.type, document: customer.document });
    } else {
      setEditing(null);
      setForm({ name: "", email: "", phone: "", type: "", document: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditing(null);
    setForm({ name: "", email: "", phone: "", type: "", document: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await customersService.update(editing.id, form);
      } else {
        await customersService.create(form);
      }
      handleCloseDialog();
      fetchCustomers();
    } catch (err: any) {
      setError(err.message || "Erro ao salvar cliente");
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      await customersService.delete(deleting.id);
      setDeleting(null);
      fetchCustomers();
    } catch (err: any) {
      setError(err.message || "Erro ao deletar cliente");
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    setLoading(true);
    setError(null);
    setSearching(true);
    try {
      let results: Customer[] = [];
      //  e-mail
      if (search.includes("@")) {
        const customer = await customersService.findByEmail(search);
        results = customer ? [customer] : [];
      } else if (/^\d{11,}$/.test(search.replace(/\D/g, ""))) { // documento (apenas números, 11+)
        const customer = await customersService.findByDocument(search);
        results = customer ? [customer] : [];
      } else {
        results = await customersService.findByName(search); // nome normal
      }
      setCustomers(results);
    } catch (e: any) {
      setError(e.message || "Nenhum cliente encontrado");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    setSearching(false);
    fetchCustomers();
  };

  return (
    <main className="w-full min-h-[85vh] bg-gradient-to-br from-card to-background flex flex-col items-center justify-start pt-16 px-2 md:px-4">
      <section className="w-full flex flex-col items-center mb-10">
        <div className="flex flex-col items-center gap-2 mb-6">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/90 text-white shadow-lg p-3">
            <Users className="w-7 h-7" />
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary font-quicksand drop-shadow-sm tracking-tight">
            Clientes
          </h1>
        </div>
        <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-4 max-w-3xl">
          <TableSearch
            value={search}
            onChange={e => setSearch(e.target.value)}
            onSubmit={handleSearch}
            onClear={handleClearSearch}
            placeholder="Buscar por nome, e-mail ou documento"
            searching={searching}
          />
          <Button
            className="rounded-full text-base font-bold shadow-md bg-primary hover:bg-primary/90 transition-all h-12 px-8 whitespace-nowrap md:ml-4"
            style={{ minWidth: 180 }}
            onClick={() => handleOpenDialog()}
          >
            + Novo Cliente
          </Button>
        </div>
      </section>
      <section className="w-full max-w-6xl overflow-x-auto bg-card mt-2">
        <div className="rounded-2xl shadow-md border border-border px-6 py-2 overflow-hidden">
          {loading ? (
            <div className="text-center text-muted-foreground py-12 text-lg animate-pulse">Carregando...</div>
          ) : error ? (
            <div className="text-center text-destructive py-12 text-lg font-semibold animate-fade-in">{error}</div>
          ) : customers.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 text-lg">Nenhum cliente cadastrado.</div>
          ) : (
            <CustomersTable
              customers={customers}
              onEdit={handleOpenDialog}
              onDelete={setDeleting}
            />
          )}
        </div>
      </section>
      <CustomerDialog
        open={openDialog}
        editing={editing}
        form={form}
        onChange={handleChange}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
      />
      <DeleteCustomerDialog
        open={!!deleting}
        customer={deleting}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </main>
  );
}