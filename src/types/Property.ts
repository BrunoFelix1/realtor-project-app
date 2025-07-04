export interface Property {
  id: number;
  title: string;        // “Apartamento 2 qts – Centro”
  address: string;      // rua, nº, bairro, cidade …
  price: number;        // valor de venda ou aluguel (R$)
  status: 'disponível' | 'ocupado' | 'reservado';
  description: string;
}
