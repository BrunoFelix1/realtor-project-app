import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Visit } from '@/types/Visit';

interface Props {
  open: boolean;
  editing: Visit | null;
  form: Omit<Visit, 'id'>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export function VisitDialog({
  open,
  editing,
  form,
  onChange,
  onSubmit,
  onClose,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>
              {editing ? 'Editar Visita' : 'Nova Visita'}
            </DialogTitle>
          </DialogHeader>

          <Input
            name="propertyId"
            value={form.propertyId}
            onChange={onChange}
            placeholder="ID do Imóvel"
            required
            type="number"
          />
          <Input
            name="customerId"
            value={form.customerId}
            onChange={onChange}
            placeholder="ID do Cliente"
            required
            type="number"
          />
          <Input
            name="scheduledAt"
            value={form.scheduledAt}
            onChange={onChange}
            placeholder="Data e hora (ISO 8601)"
            required
          />
          <Input
            name="notes"
            value={form.notes}
            onChange={onChange}
            placeholder="Observações (opcional)"
          />

          <DialogFooter>
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {editing ? 'Salvar Alterações' : 'Criar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
