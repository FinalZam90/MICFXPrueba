import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HighchartsChartModule } from 'highcharts-angular';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from '@angular/material/dialog';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FgrDeptoComponent } from "../Modulos/fgr/fgr-depto/fgr-depto.component";
import { FgrDeptoManComponent } from "../Modulos/fgr/fgr-depto-man/fgr-depto-man.component";
import { FgrRoutingModule } from "../Modulos/fgr/fgr-routing.module";
import { FgrModule } from "../Modulos/fgr/fgr.module";
import { FormModule } from 'src/app/form/form.module';
import { FgrManClienComponent } from "../Modulos/fgr/fgr-man-clien/fgr-man-clien.component";
import { CreditosComponent } from "./creditos.component";
import { CreditosRoutingModule } from "./creditos-routing.module";
@NgModule({
  declarations: [
   
    CreditosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FgrModule,
    CreditosRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class CreditosModule { }