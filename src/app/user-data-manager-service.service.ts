import { Injectable } from '@angular/core';
import {Person} from "./PersonInterface";

@Injectable({
  providedIn: 'root'
})
export class UserDataManagerServiceService {
  data: Person[] = [
    {
      id: 1,
      email: 'chillin@gmail.com',
      password: '1234567',
      confirmPassword: '1234567',
      nickname: 'chilling220',
      phone: '+380123456789',
      website: 'website.com'
    }
  ]
  constructor() { }

  addPerson(person: Person) {
    this.data.push({...person, id: this.data.length > 0 ? this.data[this.data.length - 1].id + 1 : 1})
  }

  getById(id: number): Person | null {
    return this.data.filter(p => p.id == id)[0];
  }

  deletePerson(id: number) {
    this.data = this.data.filter(d => d.id != id);
    return this.data;
  }

  updatePerson(person: Person){
    this.data = this.data.map(p => {
      return p.id == person.id ? person : p
    })
  }
}
