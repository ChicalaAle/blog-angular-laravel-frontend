import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  public page_title: string;
  constructor() {
    this.page_title = "(404) Oopss... Página no encontrada!";
   }

  ngOnInit(): void {
  }

}