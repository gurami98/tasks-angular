import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

const API_URL = 'https://api.fastforex.io'
const API_KEY = 'api_key=2f562a17e1-3e1a4b24a0-qznkk6'

@Component({
  selector: 'app-observables-currency-exchange-formarray',
  templateUrl: './observables-currency-exchange-formarray.component.html',
  styleUrls: ['./observables-currency-exchange-formarray.component.scss']
})
export class ObservablesCurrencyExchangeFormarrayComponent implements OnInit {
  form
  currencyNames: string[] = []
  sum: number = 0
  get allCurrencies() : FormArray {
    return this.form.get("currencies") as FormArray
  }

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      currencies: this.fb.array([this.fb.group({
        selectedCurrency: ['USD', Validators.required],
        currencyAmount: [0, Validators.required],
      })]),
      selectedCurrency2: ['GEL', Validators.required],
      currencyAmount2: [0, Validators.required],
    })
  }

  newCurrency(): FormGroup {
    return this.fb.group({
      selectedCurrency: ['USD', Validators.required],
      currencyAmount: [0, Validators.required],
    })
  }

  convertCurrency(currency: string, amount: number) {
    this.sum = 0;
    this.http.get(`${API_URL}/fetch-one?from=${currency}&to=${this.form.get('selectedCurrency2')?.value}&${API_KEY}`).pipe(
      tap( (value: any) => {
        let val = value.result[`${this.form.get('selectedCurrency2')?.value}`]
        this.sum += amount * val
        this.form.get('currencyAmount2')?.setValue(this.sum, {emitEvent: false, onlySelf: true})
        }
      )
    ).subscribe()
  }

  addCurrency() {
    this.allCurrencies.push(this.newCurrency());
  }

  ngOnInit(): void {
    // initialise currencies array
    this.http.get(`${API_URL}/currencies?${API_KEY}`).pipe(
      tap((val: any) => {
          this.currencyNames = Object.keys(val.currencies)
        }
      )
    ).subscribe()
    this.form.get('currencies')?.valueChanges.pipe(
      tap( (value) => {
        for (let i = 0; i < value.length; i++){
          this.convertCurrency(value[i]?.selectedCurrency, value[i].currencyAmount)
        }
        }
      )
    ).subscribe();
    this.form.get('selectedCurrency2')?.valueChanges.pipe(
      tap( (value) => {
        let currencyArr = this.form.get('currencies')?.value
        for (let i = 0; i < currencyArr.length; i++){
          this.convertCurrency(currencyArr[i]?.selectedCurrency, currencyArr[i].currencyAmount)
        }
        }
      )
    ).subscribe();
  }

}
