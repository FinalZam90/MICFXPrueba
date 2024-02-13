import { Component, OnInit, ViewChild } from '@angular/core';
import { CreditosModule } from './creditos.module';
import { FgrManClienComponent } from "../Modulos/fgr/fgr-man-clien/fgr-man-clien.component";
@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.scss'],

})
export class CreditosComponent implements OnInit {

  contador: number = 0;
  @ViewChild(FgrManClienComponent) man;
  constructor() { }

  ngOnInit(): void {
  }

  next() {
    this.contador++;
  }

}
