import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadConAuditComponent } from './fad-con-audit/fad-con-audit.component';
import { FadConUsuarComponent } from "./fad-con-usuar/fad-con-usuar.component";
import { FadManUsuarComponent } from "./fad-man-usuar/fad-man-usuar.component";
import { FadRoutingModule } from './fad-routing.module';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FadConUsuarComponent,FadConAuditComponent, FadManUsuarComponent],
  imports: [
    CommonModule,
    FadRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FadModule{ }
