import { Pencil, Trash2 } from 'lucide-react';
import type { Rental } from '@/types/Rental';
import { Button } from '@/components/ui/button';

interface Props {
  rentals  : Rental[];
  onEdit   : (r: Rental) => void;
  onDelete : (r: Rental) => void;
}

export function RentalsTable({ rentals, onEdit, onDelete }: Props) {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b">
          <th className="py-2 px-3">Imóvel</th>
          <th className="py-2 px-3">Inquilino</th>
          <th className="py-2 px-3">Início</th>
          <th className="py-2 px-3">Fim</th>
          <th className="py-2 px-3">Valor (R$)</th>
          <th className="py-2 px-3">Ativo?</th>
          <th className="py-2 px-3 w-24 text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        {rentals.map(r => (
          <tr key={r.id} className="border-b hover:bg-muted/40">
            <td className="py-2 px-3">{r.propertyId}</td>
            <td className="py-2 px-3">{r.tenantId}</td>
            <td className="py-2 px-3">{new Date(r.startDate).toLocaleDateString('pt-BR')}</td>
            <td className="py-2 px-3">{new Date(r.endDate).toLocaleDateString('pt-BR')}</td>
            <td className="py-2 px-3">{r.monthlyValue.toLocaleString('pt-BR')}</td>
            <td className="py-2 px-3">{r.active ? 'Sim' : 'Não'}</td>
            <td className="py-2 px-3 flex gap-2 justify-center">
              <Button size="icon" variant="outline"      onClick={() => onEdit(r)}   >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="destructive" onClick={() => onDelete(r)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
