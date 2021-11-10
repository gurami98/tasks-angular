import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from 'rxjs/operators';
import {FormBuilder, Validators} from "@angular/forms";

const API_URL = 'https://api.fastforex.io'
const API_KEY = 'api_key=1cf147dcb1-d2f79588bb-r2df8i'

@Component({
  selector: 'app-observables-currency-exchange',
  templateUrl: './observables-currency-exchange.component.html',
  styleUrls: ['./observables-currency-exchange.component.scss']
})
export class ObservablesCurrencyExchangeComponent implements OnInit {
  form
  currencies: any[] = []

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      selectedCurrency1: ['USD', Validators.required],
      currencyAmount1: [0, Validators.required],
      selectedCurrency2: ['GEL', Validators.required],
      currencyAmount2: [0, Validators.required],
    })
  }

  convertCurrency() {
    this.http.get(`${API_URL}/fetch-one?from=${this.form.get('selectedCurrency1')?.value}&to=${this.form.get('selectedCurrency2')?.value}&${API_KEY}`).pipe(
      tap( (value: any) => {
          let val = value.result[`${this.form.get('selectedCurrency2')?.value}`]
          this.form.get('currencyAmount2')?.setValue(this.form.get('currencyAmount1')?.value * val, {emitEvent: false, onlySelf: true})
        }
      )
    ).subscribe()
  }

  convertCurrencyReverse() {
    this.http.get(`${API_URL}/fetch-one?from=${this.form.get('selectedCurrency2')?.value}&to=${this.form.get('selectedCurrency1')?.value}&${API_KEY}`).pipe(
      tap( (value: any) => {
          let val = value.result[`${this.form.get('selectedCurrency1')?.value}`]
          this.form.get('currencyAmount1')?.setValue(this.form.get('currencyAmount2')?.value * val, {emitEvent: false, onlySelf: true})
        }
      )
    ).subscribe()
  }

  ngOnInit(): void {
    // initialise currencies array
    this.http.get(`${API_URL}/currencies?${API_KEY}`).pipe(
      tap((val: any) => {
          this.currencies = Object.keys(val.currencies)
        }
      )
    ).subscribe()

    // listen to form inputs to convert
    this.form.get('selectedCurrency1')?.valueChanges
      .pipe(
        tap( (value) => {
            this.convertCurrency()
          }
        )
      ).subscribe()
    this.form.get('selectedCurrency2')?.valueChanges
      .pipe(
        tap( (value) => {
            this.convertCurrency()
          }
        )
      ).subscribe()
    this.form.get('currencyAmount1')?.valueChanges
      .pipe(
        tap( (value) => {
            this.convertCurrency()
          }
        )
      ).subscribe()
    this.form.get('currencyAmount2')?.valueChanges
      .pipe(
        tap( (value) => {
            this.convertCurrencyReverse()
          }
        )
      ).subscribe()
  }
}
