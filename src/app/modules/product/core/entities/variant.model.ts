export class Variant {
  constructor(
    public id: number,
    public title: string,
    public option1: string,
    public option2: any,
    public option3: any,
    public sku: string,
    public requires_shipping: boolean,
    public taxable: boolean,
    public featured_image: any,
    public available: boolean,
    public name: string,
    public options: string[],
    public price: number,
    public weight: number,
    public inventory_quantity: number,
    public inventory_policy: string,
    public requires_selling_plan: boolean,
    public selling_plan_allocations: any[],
    public barcode?: string,
    public inventory_management?: string,
    public compare_at_price?: number,
    public public_title?: string
  ) {}
}
