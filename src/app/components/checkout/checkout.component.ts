import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { Luv2ShopValidators } from '../../validators/luv2-shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: false
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup = new FormGroup({});

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private luv2ShopFormService: Luv2ShopFormService
  ) { }

  ngOnInit(): void {
    
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', 
                              [Validators.required, 
                               Validators.minLength(2),
                               Luv2ShopValidators.notOnlyWhitespace]),
        lastName: new FormControl('', 
                              [Validators.required, 
                               Validators.minLength(2),
                               Luv2ShopValidators.notOnlyWhitespace]),
        email: new FormControl('',
                              [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), 
                                     Luv2ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), 
                                   Luv2ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), 
                                      Luv2ShopValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), 
                                     Luv2ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), 
                                   Luv2ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), 
                                      Luv2ShopValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), 
                                          Luv2ShopValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    // populate credit card months

    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    // populate credit card years

    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    // populate countries

    this.luv2ShopFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );

  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName') as FormControl; }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName') as FormControl; }
  get email() { return this.checkoutFormGroup.get('customer.email') as FormControl; }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street') as FormControl; }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city') as FormControl; }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state') as FormControl; }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode') as FormControl; }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country') as FormControl; }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street') as FormControl; }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city') as FormControl; }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state') as FormControl; }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode') as FormControl; }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country') as FormControl; }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType') as FormControl; }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard') as FormControl; }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber') as FormControl; }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode') as FormControl; }

  copyShippingAddressToBillingAddress(event: Event) {

    const target = event.target as HTMLInputElement;

    if (target.checked) {
      this.checkoutFormGroup.get('billingAddress')?.setValue(
        this.checkoutFormGroup.get('shippingAddress')?.value
      );
    }
    else {
      this.checkoutFormGroup.get('billingAddress')?.reset();
    }

  }

  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log("The email address is " + this.checkoutFormGroup.get('customer')?.value?.email);
  
    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress')?.value?.country?.name);
    console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress')?.value?.state?.name);
  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    if (!creditCardFormGroup) {
      return;
    }

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.get('expirationYear')?.value ?? 0);

    // if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    if (!formGroup) {
      return;
    }

    const selectedCountry = formGroup.get('country')?.value;

    if (!selectedCountry) {
      return;
    }

    const countryCode = selectedCountry.code;
    const countryName = selectedCountry.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.luv2ShopFormService.getStates(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data; 
        }
        else {
          this.billingAddressStates = data;
        }

        // select first item by default
        const stateControl = formGroup.get('state');
        if (stateControl) {
          stateControl.setValue(data[0]);
        }
      }
    );
  }

}
