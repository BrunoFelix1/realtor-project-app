import { Pencil, Trash2 } from 'lucide-react';
import type { Property } from '@/types/Property';
import { Button } from '@/components/ui/button';

interface Props {
  properties: Property[];
  onEdit   : (p: Property) => void;
  onDelete : (p: Property) => void;
}

export function PropertiesTable({ properties, onEdit, onDelete }: Props) {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b">
          <th className="py-2 px-3">Título</th>
          <th className="py-2 px-3">Endereço</th>
          <th className="py-2 px-3">Preço (R$)</th>
          <th className="py-2 px-3">Status</th>
          <th className="py-2 px-3 w-24 text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        {properties.map(p => (
          <tr key={p.id} className="border-b hover:bg-muted/40">
            <td className="py-2 px-3">{p.title}</td>
            <td className="py-2 px-3">{p.address}</td>
            <td className="py-2 px-3">{p.price.toLocaleString('pt-BR')}</td>
            <td className="py-2 px-3 capitalize">{p.status}</td>
            <td className="py-2 px-3 flex gap-2 justify-center">
              <Button size="icon" variant="outline"      onClick={() => onEdit(p)}   >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="destructive" onClick={() => onDelete(p)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
