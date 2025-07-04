import {
  Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle,
} from '@/components/ui/dialog';
import { Input }  from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Property } from '@/types/Property';

interface Props {
  open     : boolean;
  editing  : Property | null;
  form     : Omit<Property, 'id'>;
  onChange : (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit : (e: React.FormEvent) => void;
  onClose  : () => void;
}

export function PropertyDialog({
  open, editing, form, onChange, onSubmit, onClose,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>{editing ? 'Editar Imóvel' : 'Novo Imóvel'}</DialogTitle>
          </DialogHeader>

          <Input name="title"       value={form.title}       onChange={onChange} placeholder="Título"       required />
          <Input name="address"     value={form.address}     onChange={onChange} placeholder="Endereço"     required />
          <Input name="price"       value={form.price}       onChange={onChange} placeholder="Preço"        required type="number" min="0" step="0.01" />
          <select
            name="status"
            value={form.status}
            onChange={onChange}
            className="w-full border rounded-md px-3 py-2"
            required
          >
            <option value="disponível">Disponível</option>
            <option value="ocupado">Ocupado</option>
            <option value="reservado">Reservado</option>
          </select>
          <Input name="description" value={form.description} onChange={onChange} placeholder="Descrição curta" />

          <DialogFooter>
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{editing ? 'Salvar' : 'Criar'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
