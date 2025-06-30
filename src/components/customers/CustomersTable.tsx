import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import type { Customer } from "@/types/Customer";

interface CustomersTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

function formatCPF(cpf: string) {
  return cpf.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatPhone(phone: string) {
  return phone.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

function mapType(type: string) {
  if (type.toLowerCase() === "locatario") return "Locatário";
  if (type.toLowerCase() === "locador") return "Locador";
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function CustomersTable({ customers, onEdit, onDelete }: CustomersTableProps) {
  return (
    <Table className="rounded-2xl overflow-hidden">
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Documento</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id} className="hover:bg-primary/5 transition">
            <TableCell className="font-semibold text-primary/90">{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{formatPhone(customer.phone)}</TableCell>
            <TableCell>
              <Badge variant={customer.type.toLowerCase() === "locatario" ? "secondary" : "default"}>
                {mapType(customer.type)}
              </Badge>
            </TableCell>
            <TableCell>{formatCPF(customer.document)}</TableCell>
            <TableCell className="flex gap-2 justify-end items-center">
              <Button size="sm" variant="outline" onClick={() => onEdit(customer)}>
                Editar
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onDelete(customer)}>
                Excluir
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
