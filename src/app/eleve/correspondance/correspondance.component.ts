import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-correspondance',
  templateUrl: './correspondance.component.html',
  styleUrls: ['./correspondance.component.css']
})
export class CorrespondanceComponent implements OnInit {

  panelOpenState: Boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
