import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-elements',
  templateUrl: './form-elements.component.html',
  styleUrls: ['./form-elements.component.scss']
})
export class FormElementsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $.getScript("./assets/plugins/input-tags/js/tagsinput.js");
  }

}
