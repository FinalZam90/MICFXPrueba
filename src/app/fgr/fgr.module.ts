import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HighchartsChartModule } from 'highcharts-angular';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FgrDeptoComponent } from "./fgr-depto/fgr-depto.component";
import { FgrDeptoManComponent } from "./fgr-depto-man/fgr-depto-man.component";
import { FgrRoutingModule } from "./fgr-routing.module";
import { FormModule } from 'src/app/form/form.module';
import { FgrManClienComponent } from "./fgr-man-clien/fgr-man-clien.component";
@NgModule({
  declarations: [
     FgrDeptoComponent,
     FgrDeptoManComponent,
     FgrManClienComponent
  ],
  imports: [
    CommonModule,
    FgrRoutingModule,
    FormModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class FgrModule { }
