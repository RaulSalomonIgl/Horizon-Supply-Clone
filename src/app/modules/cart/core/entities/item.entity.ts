import { Product } from '../../../product/core/entities/product.model';
import { Variant } from '../../../product/core/entities/variant.model';
import { FeaturedImage } from './featured-image.entity';
import { OptionsWithValue } from './options-with-value.entity';

export class Item {
  constructor(
    public id: number,
    public properties: {},
    public quantity: number,
    public variant_id: number,
    public key: string,
    public title: string,
    public price: number,
    public original_price: number,
    public presentment_price: number,
    public discounted_price: number,
    public line_price: number,
    public original_line_price: number,
    public total_discount: number,
    public discounts: any[],
    public sku: string,
    public grams: number,
    public vendor: string,
    public taxable: boolean,
    public product_id: number,
    public product_has_only_default_variant: boolean,
    public gift_card: boolean,
    public final_price: number,
    public final_line_price: number,
    public url: string,
    public featured_image: FeaturedImage,
    public image: string,
    public handle: string,
    public requires_shipping: boolean,
    public product_type: string,
    public product_title: string,
    public product_description: string,
    public variant_options: string[],
    public options_with_values: OptionsWithValue[],
    public line_level_discount_allocations: any[],
    public line_level_total_discount: number,
    public has_components: boolean,
    public variant_title?: string
  ) {}

  recalculateLinePrice(): void {
    this.line_price = this.price * this.quantity;
    this.original_line_price = this.price * this.quantity;
    this.final_line_price = this.price * this.quantity;
  }

  // Método estático para crear un Item a partir de un Product
  static fromProduct(
    product: Product,
    quantity: number = 1,
    variant: Variant,
    discounts: number[]
  ): Item {
    return new Item(
      product.id, //item id
      {}, // properties
      quantity,
      variant.id,
      `${product.handle}-${variant.sku}`, // key
      variant.name, //title
      product.price,
      product.compare_at_price || product.price, // original_price
      product.price, // presentment_price
      product.price, // discounted_price
      product.price * quantity, // line_price
      (product.compare_at_price || product.price) * quantity, // original_line_price
      discounts.reduce((sum, current) => sum + current, 0), // total_discount
      discounts,
      variant.sku, // sku
      Math.random() * (800 - 10) + 10, // grams
      product.vendor,
      true, // taxable
      product.id,
      variant.id === product.variants[0].id ? true : false, // product_has_only_default_variant
      product.id === 394982640, // gift_card
      product.price, // final_price
      product.price * quantity, // final_line_price
      `/products/product/${product.id}`, // url
      new FeaturedImage(1.0, product.title, 1080, product.images[0], 1080), // featured_image
      product.featured_image, // image
      product.handle,
      true, // requires_shipping
      product.type,
      product.title,
      product.description,
      [variant.title], // variant_options
      product.options.map(
        (option) => new OptionsWithValue(option, variant.title)
      ), // options_with_values
      [], // line_level_discount_allocations
      0, // line_level_total_discount
      false, // has_components
      variant.title
    );
  }
}
