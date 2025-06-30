import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Customer } from "@/types/Customer";

interface CustomerDialogProps {
  open: boolean;
  editing: Customer | null;
  form: Omit<Customer, "id">;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CustomerDialog({ open, editing, form, onChange, onClose, onSubmit }: CustomerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary mb-2">{editing ? "Editar Cliente" : "Novo Cliente"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-2">
          <Input name="name" placeholder="Nome" value={form.name} onChange={onChange} required className="rounded-lg" />
          <Input name="email" placeholder="E-mail" value={form.email} onChange={onChange} required type="email" className="rounded-lg" />
          <Input name="phone" placeholder="Telefone" value={form.phone} onChange={onChange} required className="rounded-lg" />
          <Input name="type" placeholder="Tipo (ex: comprador, locatário)" value={form.type} onChange={onChange} required className="rounded-lg" />
          <Input name="document" placeholder="Documento" value={form.document} onChange={onChange} required className="rounded-lg" />
          <div className="flex gap-2 justify-end mt-2">
            <Button type="button" variant="destructive" onClick={onClose} className="rounded-lg">Cancelar</Button>
            <Button type="submit" className="rounded-lg">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
