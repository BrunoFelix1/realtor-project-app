import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import type { Visit } from '@/types/Visit';

interface Props {
  open: boolean;
  visit: Visit | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteVisitDialog({
  open,
  visit,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={v => !v && onCancel()}
      title="Excluir visita"
      description={`Tem certeza que deseja excluir a visita #${visit?.id}?`}
      confirmText="Excluir"
      cancelText="Cancelar"
      confirmVariant="destructive"
      onConfirm={onConfirm}
    />
  );
}
