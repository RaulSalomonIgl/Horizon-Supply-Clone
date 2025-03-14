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

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
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
  ],
})
export class CheckoutComponent implements OnInit {
  visibleStep: string = 'contact';
  deliveryMethod: string = '';
  paymentMethod: string = '';
  contactEmail: string = '';
  shippingAddress: string = '';
  subscribeMeToNewsletter: boolean = false;

  countries$: Observable<Country[]> = new Observable();
  states$: Observable<State[]> = new Observable();

  constructor(
    private getCountriesUseCase: GetCountriesUseCase,
    private getStatesByCountryIdUseCase: GetStatesByCountryIdUseCase
  ) {}

  ngOnInit(): void {
    this.countries$ = this.getCountriesUseCase.execute();
  }

  changeSteppper(step: 'contact' | 'shipping' | 'payment') {
    this.visibleStep = step;
  }

  setDeliveryMethod(deliveryMethod: string) {
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

  completeOrder() {}
}
