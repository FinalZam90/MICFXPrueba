import { Component, OnInit } from '@angular/core';

import { Movi1Service } from "../../../SL/FGR_MOVI1";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Movi1Model } from "../../../ML/MOVI1";
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import  *  as ut from "utf8";
import { utf8Encode } from '@angular/compiler/src/util';
@Component({
  selector: 'app-fad-con-audit',
  templateUrl: './fad-con-audit.component.html',
  styleUrls: ['./fad-con-audit.component.scss']
})
export class FadConAuditComponent implements OnInit {

  constructor(public MoviService:Movi1Service) { }
  public mov: any;
  public mov2: any;
  public hora: any
  public imprimir: any
  public MovMod = new Movi1Model()
  ngOnInit(): void 
  {
    let calculo: any
    let diferencia:any
    let Movis = new Array()
    this.MoviService.getPruebas().subscribe((r) => {console.log(r); this.mov = r;
      for (let index of this.mov) 
      {
        this.MovMod = new Movi1Model()
        if(index.NUM_HORA >= 60)
        {
          calculo = Math.floor(index.NUM_HORA/60); 
          diferencia = (index.NUM_HORA - (calculo*60) ); 
          if(diferencia >= 10)
          {
            this.hora = ""+calculo+":"+diferencia+" hrs";
          }
          else
          {
            this.hora = ""+calculo+":0"+diferencia+" hrs";
          }
        }
        
        else
        {
         
          if(index.NUM_HORA < 10)
          {
            this.hora = "00:0"+index.NUM_HORA+" hrs";
          }
          else
          {
            this.hora = "00:"+index.NUM_HORA+" hrs";
          }
          
        }
        
          this.MovMod.Num_Hora2 = this.hora;
          this.MovMod.Latitud = index.CVE_LATIT;
          this.MovMod.Longitud = index.CVE_LONGI;
          this.MovMod.Ip = index.CVE_NETIP;
          this.MovMod.Cve_Opera = index.CVE_OPERA;
          this.MovMod.Cve_Oracs = index.CVE_ORACS;
          this.MovMod.Cve_Usuar = index.CVE_USUAR;
          this.MovMod.Message.message = index.DES_LLAVE[1]
          this.MovMod.Des_Movi1 = index.DES_MOVI1;
          this.MovMod.Des_Panta = index.DES_PANTA;
          this.MovMod.Des_Tabla = index.DES_TABLA;
          this.MovMod.Fec_Movim = index.FEC_MOVIM;


          Movis.push(this.MovMod)
      }
      this.mov =Movis
      
    })
  }
  GetAll(): any
  {
    
    this.MoviService.getPruebas().subscribe((r) => {console.log(r); this.imprimir = r; return this.imprimir})
    console.log(this.imprimir)
    
  }
  GetByParam()
  {
    var x = $("#fecha1").val();
    var y = $("#sel").val();
    let Mov = new Movi1Model()
    let Cadena = x.toString().split('-')
    Mov.Fec_Movim = Cadena[2] + '/'+ Cadena[1] + "/" + Cadena[0];
    Mov.Cve_Oracs = ""+ y;
    let calculo: any
    let diferencia:any
    let Movis = new Array()
    this.MoviService.GetByParams(Mov).subscribe((r) => {console.log(r); this.mov = r;
      for (let index of this.mov) 
      {
        this.MovMod = new Movi1Model()
        if(index.NUM_HORA >= 60)
        {
          calculo = Math.floor(index.NUM_HORA/60); 
          diferencia = (index.NUM_HORA - (calculo*60) ); 
          if(diferencia >= 10)
          {
            this.hora = ""+calculo+":"+diferencia+" hrs";
          }
          else
          {
            this.hora = ""+calculo+":0"+diferencia+" hrs";
          }
        }
        
        else
        {
         
          if(index.NUM_HORA < 10)
          {
            this.hora = "00:0"+index.NUM_HORA+" hrs";
          }
          else
          {
            this.hora = "00:"+index.NUM_HORA+" hrs";
          }
          
        }
        
          this.MovMod.Num_Hora2 = this.hora;
          this.MovMod.Latitud = index.CVE_LATIT;
          this.MovMod.Longitud = index.CVE_LONGI;
          this.MovMod.Ip = index.CVE_NETIP;
          this.MovMod.Cve_Opera = index.CVE_OPERA;
          this.MovMod.Cve_Oracs = index.CVE_ORACS;
          this.MovMod.Cve_Usuar = index.CVE_USUAR;
          this.MovMod.Message.message = index.DES_LLAVE[1]
          this.MovMod.Des_Movi1 = index.DES_MOVI1;
          this.MovMod.Des_Panta = index.DES_PANTA;
          this.MovMod.Des_Tabla = index.DES_TABLA;
          this.MovMod.Fec_Movim = index.FEC_MOVIM;


          Movis.push(this.MovMod)
      }
      this.mov =Movis
      
    })
  }

}
