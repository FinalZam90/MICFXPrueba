import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditosComponent } from "./creditos.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'credind',
        component: CreditosComponent,
        data: {
          title: 'Crédito Individual'
        }
        
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditosRoutingModule { }
