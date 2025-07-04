import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import type { Property } from '@/types/Property';

interface Props {
  open    : boolean;
  property: Property | null;
  onConfirm: () => void;
  onCancel : () => void;
}

export function DeletePropertyDialog({ open, property, onCancel, onConfirm }: Props) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={v => !v && onCancel()}
      title="Excluir imóvel"
      description={`Tem certeza que deseja excluir "${property?.title}"?`}
      confirmText="Excluir"
      cancelText="Cancelar"
      confirmVariant="destructive"
      onConfirm={onConfirm}
    />
  );
}
