import {Component, Input, OnInit} from '@angular/core';
import {Person} from "../PersonInterface";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  @Input() currentPerson: Person | null = null

  constructor() { }

  ngOnInit(): void {
  }

}
