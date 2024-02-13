import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FadConAuditComponent } from '../fad-con-audit/fad-con-audit.component';
import { FadConUsuarComponent } from "../fad-con-usuar/fad-con-usuar.component";
import { FadManUsuarComponent } from "./fad-man-usuar/fad-man-usuar.component";
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Formulario/:CVE_USUAR',
        component: FadManUsuarComponent,
        data: {
          title: 'Formulario Usuarios'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FadUsuarRoutingModule { }
