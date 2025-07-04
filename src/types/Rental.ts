export interface Rental {
  id: number;
  propertyId: number;
  tenantId: number;
  startDate: string;     // ISO-8601
  endDate: string;       // ISO-8601
  monthlyValue: number;
  active: boolean;
}
