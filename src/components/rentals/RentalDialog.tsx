import {
  Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle,
} from '@/components/ui/dialog';
import { Input }  from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Rental } from '@/types/Rental';

interface Props {
  open     : boolean;
  editing  : Rental | null;
  form     : Omit<Rental, 'id'>;
  onChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit : (e: React.FormEvent) => void;
  onClose  : () => void;
}

export function RentalDialog({ open, editing, form, onChange, onSubmit, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>{editing ? 'Editar Aluguel' : 'Novo Aluguel'}</DialogTitle>
          </DialogHeader>

          <Input name="propertyId"  value={form.propertyId}  onChange={onChange} placeholder="ID do Imóvel"  type="number" required />
          <Input name="tenantId"    value={form.tenantId}    onChange={onChange} placeholder="ID do Inquilino" type="number" required />
          <Input name="startDate"   value={form.startDate}   onChange={onChange} placeholder="Início (AAAA-MM-DD)" required />
          <Input name="endDate"     value={form.endDate}     onChange={onChange} placeholder="Fim (AAAA-MM-DD)"   required />
          <Input name="monthlyValue" value={form.monthlyValue} onChange={onChange} placeholder="Valor Mensal" type="number" min="0" step="0.01" required />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={e => onChange({
                ...e,
                target: { ...e.target, name: 'active', value: String(e.target.checked) },
              } as any)}
            />
            Ativo
          </label>

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
