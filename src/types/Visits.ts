export interface Visit {
  id: number;
  propertyId: number;   // imóvel visitado
  customerId: number;   // cliente que fará a visita
  scheduledAt: string;  // ISO-8601: “2025-07-01T14:00:00Z”
  notes: string;
}
