import { Component, OnInit, Input } from '@angular/core';
import { DeptoService } from '../../SL/DeptoP';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Depto } from "../../ML/FGR_DEPTO";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Messg } from "../../ML/Message";
import { FgrDeptoComponent } from "../fgr-depto/fgr-depto.component";
import  *  as ut from "utf8";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
@Component({
  selector: 'app-fgr-depto-man',
  templateUrl: './fgr-depto-man.component.html',
  styleUrls: ['./fgr-depto-man.component.scss']
})
export class FgrDeptoManComponent implements OnInit 
{
  //@Input() GetIdDepto: any;
  public GetIdDepto? : object;
  public Formulario?: FgrDeptoComponent;
  public Id: any;
  public imprimir : any = {
    Cve_Depto: "",
    Des_Depto: "",
    Def_Depto: ""
  };
  public XD : any;
  public code : any;
  public imprimir2 : any;
  public show: boolean = false;
  public FormShow: boolean = true;
  public mostrar: boolean = false;
  public counter = 6;
  public msg: Messg = {
    message: "",
    tabla: "FGR_DEPTO"
  }
  public DepS?: DeptoService;
  public ResDepto: any;
  
  ngOnInit(): void 
  {
    
    this.imprimir= this.GetDepto();
  
    
    /*
    if (this.GetIdDepto != null) 
    {
      this.imprimir = this.GetIdDepto;
    }
    else
    {
      this.imprimir = {
        Cve_Depto: "",
        Des_Depto: "",
        Def_Depto: ""
      }
    }
*/
    console.log(this.imprimir)
  }
  constructor(public prueba:DeptoService, private formBuilder: FormBuilder, private route: ActivatedRoute, private location: Location)
  {
    
    
  }
  public formPost = new FormGroup({CVE_DEPTO: new FormControl(''), DES_DEPTO: new FormControl(''), DEF_DEPTO: new FormControl('') });
  
  public GetDepto(): any
  {
    this.Id = this.route.snapshot.paramMap.get('CVE_DEPTO');
    if (this.Id == "0") 
    {
      this.imprimir = 
      {
        Cve_Depto: "",
        Des_Depto: "",
        Def_Depto: ""
      }
    } 
    else 
    {
      this.prueba.GetById(this.Id).subscribe(
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
          Departamento2.Des_Depto = ut.decode(index[0].DES_DEPTO);
          
          this.imprimir = Departamento2;
          
          
          console.log(this.imprimir) 
        },
        (e)=> { console.error(e)}
      )
      console.log(this.formPost?.controls['CVE_DEPTO'].value)
      
    }
    
    return this.imprimir;
  }
  public Regresar(): void 
  {
    this.location.back();
  }
  public Timer() 
  {
    
    let intervalId = setInterval(() => 
    {
      console.log(this.counter)  
      this.counter = this.counter - 1;
            
      if(this.counter === 0)
      { 
        
        console.log(this.code)
        this.show = false;
        this.mostrar = true;
        clearInterval(intervalId)
      }
    }, 1000)
    
  }
  public Form(): any
  {
    this.Id = this.route.snapshot.paramMap.get('CVE_DEPTO');
    
    let Departamento : Depto = {
      Cve_Depto: 0,
      Def_Depto: false,
      Des_Depto: ""
    }
    Departamento.Cve_Depto = Number(this.formPost.controls['CVE_DEPTO'].value);
    
    if( $('#flexSwitchCheckDefault').prop('checked') ) 
    {
      Departamento.Def_Depto = true;
    }
    else
    {
      Departamento.Def_Depto = false;
    }
    /*
    if (this.formPost.controls['DEF_DEPTO'].value == "true" || this.formPost.controls['DEF_DEPTO'].value == "TRUE" || this.formPost.controls['DEF_DEPTO'].value =="True") 
    {
       Departamento.Def_Depto = true;
    } 
    else 
    {
      Departamento.Def_Depto = false;
    }*/
    //Departamento.Def_Depto = Boolean(this.formPost.controls.DEF_DEPTO.value);
    Departamento.Des_Depto = this.formPost.controls['DES_DEPTO'].value?.toString();
    this.imprimir2 = Departamento;
    this.prueba.Form(this.imprimir2).subscribe((r)=>
    {
      console.log(r);
      let p1: any;
      p1 = r.status
      this.code = p1; 
      if (this.code == 200) 
      {
        if (this.Id == "0")
        {
          this.msg.message = "El Departamento  " + Departamento.Des_Depto +" Ha Sido Registrado Exitosamente"
        }
        else
        {
          this.msg.message = "El Departamento  " + Departamento.Des_Depto +" Ha Sido Actualizado Exitosamente"
        }
        
      }
      
    }, 
    (e: HttpErrorResponse) =>
    { 
      let p1: any;
      let Ms1 : string;
      p1 = e.status
      this.code = p1;  
      Ms1 = e.message;
      
      if (this.code == 200) 
      {

        if (this.Id == "0")
        {
          this.msg.message = "El Departamento  " + Departamento.Des_Depto +" Ha Sido Registrado Exitosamente"
        }
        else
        {
          this.msg.message = "El Departamento  " + Departamento.Des_Depto +" Ha Sido Actualizado Exitosamente"
        }
        
      }
      else
      {
        this.msg.message = "El Departamento  " + Departamento.Des_Depto +" Tuvo Errores en Su Carga Por: " + Ms1;
      }
      console.log(e.status); 
      
    });
    
    console.log(this.code)
    this.FormShow = false;
    this.show = true;
    this.Timer();
    
    /*if (Cve == 0 && (Cve.toString() == "") || Cve.toString() == null) 
    {
      
    } 
    else 
    {
      
    }*/
  }
  
}
