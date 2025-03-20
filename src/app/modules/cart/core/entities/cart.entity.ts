import { Discount } from './discount.entity';
import { Item } from './item.entity';
import { Shipping } from './shipping.entity';

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
    public cart_level_discount_applications: Discount[], // Descuentos aplicados
    public shipping: Shipping | null // Costo de envío
  ) {}

  // Método para recalcular los valores del carrito
  recalculateCart(): void {
    this.items_subtotal_price = this.items.reduce(
      (total, item) => total + item.final_line_price,
      0
    );

    this.original_total_price = this.items_subtotal_price;

    // Calcular el total de descuentos
    this.total_discount = this.cart_level_discount_applications.reduce(
      (total, discount) => {
        if (discount.type === 'percentage') {
          return total + (this.items_subtotal_price * discount.value) / 100;
        } else {
          return total + discount.value;
        }
      },
      0
    );

    // Calcular el peso total de la compra
    this.total_weight = this.items.reduce((sum, current) => {
      return sum + current.grams;
    }, 0);

    // Calcular el precio total (subtotal - descuentos + envío)
    this.total_price =
      this.items_subtotal_price -
      this.total_discount +
      (this.shipping ? this.shipping.price : 0);

    this.item_count = this.items.length;
    this.requires_shipping = this.items.length > 0;
  }
}
