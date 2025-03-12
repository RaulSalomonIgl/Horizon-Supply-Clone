import { Item } from './item.entity';

export class Cart {
  constructor(
    public token: string,
    public note: string,
    public attributes: {},
    public original_total_price: number,
    public total_price: number,
    public total_discount: number,
    public total_weight: number,
    public item_count: number,
    public items: Item[],
    public requires_shipping: boolean,
    public currency: string,
    public items_subtotal_price: number,
    public cart_level_discount_applications: any[]
  ) {}

  // Método para recalcular los valores del carrito
  private recalculateCart(): void {
    this.items_subtotal_price = this.items.reduce(
      (total, item) => total + item.final_line_price,
      0
    );
    this.total_price = this.items_subtotal_price - this.total_discount;
    this.item_count = this.items.length;
  }

  // Método para actualizar la cantidad de un ítem
  updateItemQuantity(itemId: number, quantity: number): void {
    const item = this.items.find((i) => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.recalculateCart(); // Recalcular los valores del carrito
    }
  }
}
