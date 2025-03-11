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
}
