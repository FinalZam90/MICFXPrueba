import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FgrDeptoComponent } from "./fgr-depto/fgr-depto.component";
import { FgrDeptoManComponent } from "./fgr-depto-man/fgr-depto-man.component";
import { FgrManClienComponent } from "./fgr-man-clien/fgr-man-clien.component";
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'departamentos',
        component: FgrDeptoComponent,
        data: {
          title: 'Consulta Departamentos'
        }
        
      },
      {
        path: 'manclien',
        component: FgrManClienComponent,
        data: {
          title: 'Mantenimiento De Clientes'
        }
        
      },
      {
        path: 'Formulario/:CVE_DEPTO',
        component: FgrDeptoManComponent,
        data: {
          title: 'Formulario'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FgrRoutingModule { }
