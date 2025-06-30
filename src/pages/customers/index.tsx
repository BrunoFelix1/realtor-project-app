import { useEffect, useState } from "react";
import type { Customer } from "@/types/Customer";
import customersService from "@/api/customersService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [form, setForm] = useState<Omit<Customer, "id">>({ name: "", email: "", phone: "", type: "", document: "" });
  const [deleting, setDeleting] = useState<Customer | null>(null);

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

  return (
    <main className="w-full min-h-[85vh] bg-gradient-to-br from-card to-background flex flex-col items-center justify-start pt-16 px-4">
      <section className="flex flex-col items-center text-center mb-10">
        <h1 className="text-5xl font-extrabold text-primary font-quicksand mb-3 drop-shadow-sm tracking-tight">
          Clientes
        </h1>
        <p className="text-lg text-muted-foreground mb-0 max-w-xl">
          Gerencie seus clientes de forma eficiente.
        </p>
        <Button className="mt-6" onClick={() => handleOpenDialog()}>Novo Cliente</Button>
      </section>
      <section className="w-full max-w-6xl overflow-x-auto">
        {loading ? (
          <div className="text-center text-muted-foreground py-8">Carregando...</div>
        ) : error ? (
          <div className="text-center text-destructive py-8">{error}</div>
        ) : customers.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">Nenhum cliente cadastrado.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.type}</TableCell>
                  <TableCell>{customer.document}</TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <Button size="sm" variant="outline" onClick={() => handleOpenDialog(customer)}>Editar</Button>
                    <Button size="sm" variant="destructive" onClick={() => setDeleting(customer)}>Excluir</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
      {/* Dialog de criar/editar */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Editar Cliente" : "Novo Cliente"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <Input name="name" placeholder="Nome" value={form.name} onChange={handleChange} required />
            <Input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} required type="email" />
            <Input name="phone" placeholder="Telefone" value={form.phone} onChange={handleChange} required />
            <Input name="type" placeholder="Tipo (ex: comprador, locatário)" value={form.type} onChange={handleChange} required />
            <Input name="document" placeholder="Documento" value={form.document} onChange={handleChange} required />
            <div className="flex gap-2 justify-end mt-2">
              <Button type="button" variant="destructive" onClick={handleCloseDialog}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {/* Dialog de confirmação de exclusão */}
      <Dialog open={!!deleting} onOpenChange={() => setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Cliente</DialogTitle>
          </DialogHeader>
          <div>Tem certeza que deseja excluir o cliente <span className="font-bold">{deleting?.name}</span>?</div>
          <div className="flex gap-2 justify-end mt-4">
            <Button variant="outline" onClick={() => setDeleting(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}