import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface TableSearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear?: () => void;
  placeholder?: string;
  searching?: boolean;
  children?: ReactNode;
}

export function TableSearch({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = "Buscar...",
  searching = false,
  children,
}: TableSearchProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-2 mt-4 w-full max-w-xl">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="rounded-lg border px-4 py-2 flex-1 h-10"
      />
      <Button type="submit" className="rounded-lg h-10 px-4 flex items-center justify-center min-w-[48px]">
        <Search />
      </Button>
      {searching && onClear && (
        <Button type="button" variant="outline" onClick={onClear} className="rounded-lg h-10 px-4">Limpar</Button>
      )}
      {children}
    </form>
  );
}
