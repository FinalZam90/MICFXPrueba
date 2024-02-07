import { Component, OnInit } from '@angular/core';
import { Depto } from "../../../ML/FGR_DEPTO";
import { DeptoService } from "../../../SL/DeptoP";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import  *  as ut from "utf8";
import { utf8Encode } from '@angular/compiler/src/util';
@Component({
  selector: 'app-fgr-depto',
  templateUrl: './fgr-depto.component.html',
  styleUrls: ['./fgr-depto.component.scss']
})
export class FgrDeptoComponent implements OnInit {
   title="Departamentos"; 
   cve?: string;
  
   pruebas: any;
 
   ResDepto: any;
   show: boolean = false;
   public Departamento? : Depto ={
     Cve_Depto : 0,
     Def_Depto: false,
     Des_Depto : '',
     Deptos : new Array()
     
   };
   imprimir: any;
   imprimir2: any;
   constructor(public prueba:DeptoService, private formBuilder: FormBuilder){
     
     
   }
 
   public formGet = new FormGroup({CVE_DEPTO: new FormControl('') });
   
   ngOnInit(): void
   {
    
     this.prueba.getPruebas().subscribe(
       (r) => {this.pruebas = r; console.log(r) },
       (e)=> { console.error(e)}
     )
     
     this.prueba.GetById('').subscribe(
       (r) => {this.ResDepto = r; for (let index of this.ResDepto.TTFGR_DEPTO) 
     {
       let Departamento2 : Depto ={
         Cve_Depto : 0,
         Def_Depto: false,
         Des_Depto : ''
       }
       Departamento2.Cve_Depto = index.CVE_DEPTO;
       Departamento2.Def_Depto = index.DEF_DEPTO;
       Departamento2.Des_Depto = ut.decode(index.DES_DEPTO);
       
       this.Departamento?.Deptos?.push(Departamento2);
     }; this.imprimir= this.Departamento?.Deptos; console.log(this.Departamento?.Deptos)  },
       (e)=> { console.error(e)}
     )
     
     
   }
   GetById(): any
   {
     this.cve = this.formGet?.controls['CVE_DEPTO'].value?.toString();
     this.prueba.GetById(this.cve).subscribe(
       (r) => 
       {
         this.ResDepto = r;
         let Departamento2 : Depto ={
           Cve_Depto : 0,
           Def_Depto: false,
           Des_Depto : ''
         } 
         let index = this.ResDepto.TTFGR_DEPTO; 
         let kl : object[] = [];
         if (index.length != 0) 
         {
           
           if (index.length > 1) 
           {
             for (let index of this.ResDepto.TTFGR_DEPTO) 
             {
               let Departamento2 : Depto =
               {
                 Cve_Depto : 0,
                 Def_Depto: false,
                 Des_Depto : ''
               }
               Departamento2.Cve_Depto = index.CVE_DEPTO;
               Departamento2.Def_Depto = index.DEF_DEPTO;
               Departamento2.Des_Depto = ut.decode(index.DES_DEPTO);
               kl.push(Departamento2);
             }; 
             this.imprimir= kl;
           } 
           else 
           {
             Departamento2.Cve_Depto = index[0].CVE_DEPTO;
             Departamento2.Def_Depto = index[0].DEF_DEPTO;
             Departamento2.Des_Depto = ut.decode(index[0].DES_DEPTO);
             kl.push(Departamento2);
             this.imprimir = kl;
           }
           if (this.cve == '0') 
           {
             kl = [];
             this.imprimir= kl;
           }
         } 
         else 
         {
           this.imprimir = kl;
           
           Departamento2.Des_Depto = "";
         }
         
         console.log(this.imprimir) 
       },
       (e)=> { console.error(e)}
     )
     console.log(this.formGet?.controls['CVE_DEPTO'].value)
   }
   GetByIdBtn(Cve : string): any
   {
     this.show = false; 
     let btn = document.getElementById(Cve);
     this.cve = btn?.id;
     this.prueba.GetById(this.cve).subscribe(
       (r) => 
       {
         this.ResDepto = r;
         let Departamento2 : Depto ={
           Cve_Depto : 0,
           Def_Depto: false,
           Des_Depto : ''
         } 
         let index = this.ResDepto.TTFGR_DEPTO; 
         let kl : object[] = [];
         Departamento2.Cve_Depto = index[0].CVE_DEPTO;
         Departamento2.Def_Depto = index[0].DEF_DEPTO;
         Departamento2.Des_Depto = index[0].DES_DEPTO;
         
         this.imprimir2 = Departamento2;
         
         this.show = true;
         console.log(this.imprimir2) 
       },
       (e)=> { console.error(e)}
     )
     console.log(this.cve)
   }
 }
 
