export class Shipping {
  constructor(
    public id: string,
    public icon: string,
    public title: string, // Nombre o título del método de envío
    public price: number, // Costo del envío
    public description: string
  ) {}
}
