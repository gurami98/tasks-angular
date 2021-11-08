import { Injectable } from '@angular/core';
import {Person} from "../models/Person.model";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserDataManagerServiceService {
  data: Person[] | any = []
  constructor(private http: HttpClient) {
    try {
      this.http.get(`${environment.api}/users`).subscribe(resp => {
        this.data = resp
      })
    }catch (e){
      alert(e.message)
    }
  }

  addPerson(person: Person) {
    try {
      this.http.post(`${environment.api}/users`, person).subscribe((resp: any) => {
        this.data.push(resp.user)
      })
    }catch (e){
      alert(e.message)
    }
  }

  getCurrentById(id: number): Person | null {
    return this.data.filter((p: Person) => p.id == id)[0];
  }

  deletePerson(id: number) {
    try {
      this.http.delete(`${environment.api}/users/${id}`).subscribe()
      this.data = this.data.filter((d: Person) => d.id != id);
    }catch (e){
      alert(e.message)
    }
  }

  updatePerson(person: Person){
    try {
      this.http.put(`${environment.api}/users/${person.id}`, person).subscribe((resp: any) => {
        this.data = this.data.map((p: Person) => {
          return p.id === resp.id ? resp : p
        })
      })
    }catch (e){
      alert(e.message)
    }
  }
}
