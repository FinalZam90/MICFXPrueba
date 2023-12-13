import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadConAuditComponent } from '../fad-con-audit/fad-con-audit.component';
import { FadConUsuarComponent } from "../fad-con-usuar/fad-con-usuar.component";
import { FadManUsuarComponent } from "./fad-man-usuar/fad-man-usuar.component";
import { FadUsuarRoutingModule } from './fadusuar-routing.module';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FadManUsuarComponent],
  imports: [
    CommonModule,
    FadUsuarRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FadModule{ }
