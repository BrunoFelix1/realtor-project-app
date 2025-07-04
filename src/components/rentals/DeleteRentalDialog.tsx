import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import type { Rental } from '@/types/Rental';

interface Props {
  open   : boolean;
  rental : Rental | null;
  onConfirm: () => void;
  onCancel : () => void;
}

export function DeleteRentalDialog({ open, rental, onCancel, onConfirm }: Props) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={v => !v && onCancel()}
      title="Excluir aluguel"
      description={`Tem certeza que deseja excluir o aluguel #${rental?.id}?`}
      confirmText="Excluir"
      cancelText="Cancelar"
      confirmVariant="destructive"
      onConfirm={onConfirm}
    />
  );
}
