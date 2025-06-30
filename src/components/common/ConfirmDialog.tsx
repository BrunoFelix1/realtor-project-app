import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "destructive" | "default" | "outline" | "secondary";
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmVariant = "destructive",
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold mb-2 text-destructive">{title}</DialogTitle>
        </DialogHeader>
        {description && <div className="mb-4 font-medium">{description}</div>}
        <div className="flex gap-2 justify-end mt-4">
          <Button variant="outline" onClick={onCancel || (() => onOpenChange(false))} className="rounded-lg">{cancelText}</Button>
          <Button variant={confirmVariant} onClick={onConfirm} className="rounded-lg">{confirmText}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
