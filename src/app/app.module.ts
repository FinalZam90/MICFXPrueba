import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "./shared/shared.module";
// import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//SERVICIOS
import { GruprService } from "../app/SL/FAD_GRUPR";
import { DeptoService } from "../app/SL/DeptoP";
import { Movi1Service } from "../app/SL/FGR_MOVI1";
import { SucurService } from "../app/SL/FGR_SUCUR";
import { EnteService } from "../app/SL/FCL_ENTE";
import { UsuarService } from "../app/SL/FAD_USUAR";
import { GrusuService } from "../app/SL/FAD_GRUSU";
import { CookieService } from "ngx-cookie-service";
//FIN SERVICIOS
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {MatFormFieldModule} from '@angular/material/form-field';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

import * as $ from 'jquery';
import { CreditosComponent } from './CredIndividual/creditos.component';


@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent

 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    // AgmCoreModule.forRoot({apiKey: 'AIzaSyDKXKdHQdtqgPVl2HI2RnUa_1bjCxRCQo4'}),
    PerfectScrollbarModule
  ],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }, GruprService, DeptoService, Movi1Service, SucurService, GruprService, EnteService, UsuarService, GrusuService, CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
