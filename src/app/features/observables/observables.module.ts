import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

import {ObservablesRoutingModule} from "./observables-routing.module";
import {ObservablesCurrencyExchangeComponent} from "./observables-currency-exchange/observables-currency-exchange.component";
import {ObservablesComponent} from "./observables.component";
import {ObservablesCurrencyExchangeFormarrayComponent} from "./observables-currency-exchange-formarray/observables-currency-exchange-formarray.component";

@NgModule({
  declarations: [
    ObservablesCurrencyExchangeComponent,
    ObservablesCurrencyExchangeFormarrayComponent,
    ObservablesComponent,
  ],
  imports: [
    CommonModule,
    ObservablesRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ObservablesCurrencyExchangeComponent,
    ObservablesComponent,
    ObservablesCurrencyExchangeFormarrayComponent,
  ]
})
export class ObservablesModule { }
