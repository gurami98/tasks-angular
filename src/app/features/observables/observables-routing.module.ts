import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ObservablesComponent} from "./observables.component";

const routes: Routes = [
  {
    path: '',
    component: ObservablesComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObservablesRoutingModule {
}
