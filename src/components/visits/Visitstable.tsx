import { Pencil, Trash2 } from 'lucide-react';
import type { Visit } from '@/types/Visits';
import { Button } from '@/components/ui/button';

interface Props {
  visits: Visit[];
  onEdit: (v: Visit) => void;
  onDelete: (v: Visit) => void;
}

export function VisitsTable({ visits, onEdit, onDelete }: Props) {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b">
          <th className="py-2 px-3">Imóvel</th>
          <th className="py-2 px-3">Cliente</th>
          <th className="py-2 px-3">Data / Hora</th>
          <th className="py-2 px-3">Observações</th>
          <th className="py-2 px-3 w-24 text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        {visits.map(v => (
          <tr key={v.id} className="border-b hover:bg-muted/40">
            <td className="py-2 px-3">{v.propertyId}</td>
            <td className="py-2 px-3">{v.customerId}</td>
            <td className="py-2 px-3">
              {new Date(v.scheduledAt).toLocaleString('pt-BR')}
            </td>
            <td className="py-2 px-3">{v.notes || '—'}</td>
            <td className="py-2 px-3 flex gap-2 justify-center">
              <Button size="icon" variant="outline" onClick={() => onEdit(v)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="destructive" onClick={() => onDelete(v)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
