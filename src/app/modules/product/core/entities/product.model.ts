import { Variant } from './variant.model';
import { Medum } from './medum.model';

export class Product {
  constructor(
    public id: number,
    public title: string,
    public handle: string,
    public description: string,
    public published_at: string,
    public created_at: string,
    public vendor: string,
    public type: string,
    public tags: string[],
    public price: number,
    public price_min: number,
    public price_max: number,
    public available: boolean,
    public price_varies: boolean,
    public compare_at_price_min: number,
    public compare_at_price_max: number,
    public compare_at_price_varies: boolean,
    public variants: Variant[],
    public images: string[],
    public featured_image: string,
    public options: string[],
    public media: Medum[],
    public requires_selling_plan: boolean,
    public selling_plan_groups: any[],
    public content: string,
    public compare_at_price?: number
  ) {}
}
