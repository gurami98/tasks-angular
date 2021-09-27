import { Injectable } from '@angular/core';
import {Employee} from "../EmployeeInterface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataManagerServiceService {

  data: any

  constructor(private http: HttpClient) {
    this.http.get(`${environment.api}/employees`).subscribe(resp => this.data = resp)
  }

  addEmployee(employee: Employee) {
    try {
      this.http.post(`${environment.api}/employees`, employee).subscribe(resp => this.data.push(resp))
    }catch (e){
      alert(e.message)
    }
  }

  getOneById(id: number | undefined): Employee | null {
    return this.data.filter((p: Employee) => p.id == id)[0]
  }

  deleteEmployee(id: number | undefined) {
    try {
      this.http.get(`${environment.api}/employees`).subscribe(resp => this.data = resp)
      this.data = this.data.filter((d: Employee) => d.id != id);
    }catch (e){
      alert(e.message)
    }
  }

  updateEmployee(person: Employee, id: number | undefined){
    // this.data = this.data.map(p => {
    //   return p.id === person.id ? person : p
    // })
  }
}
