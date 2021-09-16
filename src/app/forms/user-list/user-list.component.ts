import {Component, OnInit, Output} from '@angular/core';
import {Person} from "../../PersonInterface";
import {UserDataManagerServiceService} from "../../user-data-manager-service.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  get usersList(): Person[] {
    return this.userDataManagerService.data;
  }

  @Output() currentPerson: Person | null = null;

  constructor(private userDataManagerService: UserDataManagerServiceService) { }

  deleteUser(id: number) {
    let person = this.usersList.filter(user => user.id === id)[0];
    if(confirm('This action will remove a user with this email: ' +  person.email + '\nAre you sure ?')) {
      this.userDataManagerService.deletePerson(id);
    }
  }

  editUser(id: number) {
    this.currentPerson = this.userDataManagerService.getById(id);
    console.log(this.currentPerson)
  }

  ngOnInit(): void {

  }

}
