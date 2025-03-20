import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../../components/input/input.component';
import { SelectInputComponent } from '../../../../components/select-input/select-input.component';
import { GetCountriesUseCase } from '../../../../core/use-cases/get-countries.use-case';
import { COUNTRY_REPOSITORY_PROVIDER } from '../../../../data/repositories/country-repository.impl';
import { STATE_REPOSITORY_PROVIDER } from '../../../../data/repositories/state-repository.impl';
import { GetStatesByCountryIdUseCase } from '../../../../core/use-cases/get-states-by-country-id.use-case';
import { Country } from '../../../../core/entities/country.entity';
import { State } from '../../../../core/entities/state.entity';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../../../icons/svg-icon/svg-icon.component';
import { Shipping } from '../../../cart/core/entities/shipping.entity';
import { Discount } from '../../../cart/core/entities/discount.entity';
import { Cart } from '../../../cart/core/entities/cart.entity';
import { GetCartUseCase } from '../../../cart/core/use-cases/get-cart.use-case';
import { ApplyShippingUseCase } from '../../../cart/core/use-cases/apply-shipping.use-case';
import { ApplyDiscountUseCase } from '../../../cart/core/use-cases/apply-discount.use-case';
import { RemoveDiscountUseCase } from '../../../cart/core/use-cases/remove-discount.use-case';
import { CART_REPOSITORY_PROVIDER } from '../../../cart/data/repositories/cart-repository.impl';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    SelectInputComponent,
    SvgIconComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  providers: [
    COUNTRY_REPOSITORY_PROVIDER,
    GetCountriesUseCase,
    STATE_REPOSITORY_PROVIDER,
    GetStatesByCountryIdUseCase,
    CART_REPOSITORY_PROVIDER,
    GetCartUseCase,
    ApplyShippingUseCase,
    ApplyDiscountUseCase,
    RemoveDiscountUseCase,
  ],
})
export class CheckoutComponent implements OnInit {
  private shippingMethod = [
    new Shipping(
      'ship', // id
      'truck', //icon
      'Ship to your address', // title
      40.0, // price
      'DHL Shipped' // description
    ),
    new Shipping(
      'pickup', // id
      'building-store', //icon
      'Pickup in store', // title
      0.0, // price
      'Usually ready in 24 hours' // description
    ),
  ];

  private discounts = [
    new Discount( //percentageDiscount
      window.crypto.randomUUID(), // id
      'SUMMER20', // code
      'percentage', // type
      20, // value (20%)
      '20% de descuento en toda la compra' // description
    ),

    new Discount( //fixedDiscount
      window.crypto.randomUUID(), // id
      'NEXGEN25', // code
      'fixed', // type
      25, // value ($25)
      '$25 de descuento en toda la compra' // description
    ),
  ];

  emailContact: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
  });

  shippingForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    note: ['', []],
    postalCode: ['', [Validators.required]],
    city: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });

  creditCardForm: FormGroup = this.formBuilder.group({
    ownersName: ['', [Validators.required]],
    number: ['', [Validators.required]],
    expirationMonth: ['', [Validators.required]],
    expirationYear: ['', [Validators.required]],
    cvv: ['', [Validators.required]],
  });

  visibleStep: string = 'contact';
  deliveryMethod: Shipping = this.shippingMethod[1];
  paymentMethod: string = '';
  contactEmail: string = '';
  subscribeMeToNewsletter: boolean = false;

  countries$: Observable<Country[]> = new Observable();
  states$: Observable<State[]> = new Observable();
  cart$: Observable<Cart> = new Observable();

  constructor(
    private getCountriesUseCase: GetCountriesUseCase,
    private getStatesByCountryIdUseCase: GetStatesByCountryIdUseCase,
    private getCart: GetCartUseCase,
    private applyShipping: ApplyShippingUseCase,
    private applyDiscount: ApplyDiscountUseCase,
    private removeDiscount: RemoveDiscountUseCase,
    private formBuilder: FormBuilder
  ) {}

  shippingMethods = this.shippingMethod;

  ngOnInit(): void {
    this.countries$ = this.getCountriesUseCase.execute();
    this.cart$ = this.getCart.execute();
  }

  changeSteppper(step: 'contact' | 'shipping' | 'payment') {
    this.visibleStep = step;
  }

  setDeliveryMethod(deliveryMethod: Shipping) {
    this.deliveryMethod = deliveryMethod;
  }

  onSelectedCountry(countryId: number) {
    if (countryId > 0)
      this.states$ = this.getStatesByCountryIdUseCase.execute(countryId);
    else this.states$ = new Observable();
  }

  onSelectedState(stateId: number) {
    console.log(stateId);
  }

  setPaymentMethod(paymentMethod: string) {
    this.paymentMethod = paymentMethod;
  }

  onApplyShipping(shipping: Shipping): void {
    this.applyShipping.execute(shipping).subscribe(() => {
      this.cart$ = this.getCart.execute(); // Actualizar el carrito
    });
  }

  onApplyDiscount(code: string): void {
    if (code) {
      // Buscar el cupón que coincida con el código ingresado
      const discount = this.discounts.find(
        (discount) => discount.code === code
      );

      if (discount) {
        this.applyDiscount.execute(discount).subscribe(() => {
          this.cart$ = this.getCart.execute(); // Actualizar el carrito
        });
      } else {
        alert(`Discount with code ${code} not found`);
      }
    }
  }

  onRemoveDiscount(discountId: string): void {
    this.removeDiscount.execute(discountId).subscribe(() => {
      this.cart$ = this.getCart.execute(); // Actualizar el carrito
    });
  }

  onSubmitEmailContact() {
    if (this.emailContact.valid) {
      this.contactEmail = this.emailContact.value.email;
      this.changeSteppper('shipping');
    } else {
      console.error('Invalid Form');
    }
  }

  onSubmitShippingForm() {
    if (this.shippingForm.valid) {
      this.changeSteppper('payment');
    } else {
      console.error('Invalid Form');
    }
  }

  onSubmitPayment() {
    if (this.creditCardForm.valid) {
      this.completeOrder();
    } else {
      console.error('Invalid Form');
    }
  }

  completeOrder() {
    console.log('Order Check Success!');
  }
}
