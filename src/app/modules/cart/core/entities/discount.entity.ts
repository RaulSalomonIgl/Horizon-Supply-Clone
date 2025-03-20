export class Discount {
  constructor(
    public id: string,
    public code: string,
    public type: 'percentage' | 'fixed', // Tipo de descuento
    public value: number, // Valor del descuento (porcentaje o monto fijo)
    public description: string
  ) {}
}
