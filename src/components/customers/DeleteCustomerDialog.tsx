import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Customer } from "@/types/Customer";

interface DeleteCustomerDialogProps {
  open: boolean;
  customer: Customer | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteCustomerDialog({ open, customer, onCancel, onConfirm }: DeleteCustomerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-destructive mb-2">Excluir Cliente</DialogTitle>
        </DialogHeader>
        <div className="mb-4">Tem certeza que deseja excluir o cliente <span className="font-bold">{customer?.name}</span>?</div>
        <div className="flex gap-2 justify-end mt-4">
          <Button variant="outline" onClick={onCancel} className="rounded-lg">Cancelar</Button>
          <Button variant="destructive" onClick={onConfirm} className="rounded-lg">Excluir</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
