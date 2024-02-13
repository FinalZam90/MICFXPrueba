import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarService } from '../../../SL/FAD_USUAR';
import { EnteService } from '../../../SL/FCL_ENTE';
import { DeptoService } from '../../../SL/DeptoP';
import { GrusuService } from '../../../SL/FAD_GRUSU';
import { SucurService } from '../../../SL/FGR_SUCUR';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, SelectControlValueAccessor, AbstractControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Messg } from "../../../ML/Message";
import { UsuarModel } from "../../../ML/FAD_USUAR";
import { Depto } from "../../../ML/FGR_DEPTO";
import { EnteModel } from "../../../ML/FCL_ENTE";
import { Result } from "../../../ML/Result";
import { GrusuModel } from "../../../ML/FAD_GRUSU";
import { SucurModel } from "../../../ML/FGR_SUCUR";
import  *  as ut from "utf8";
@Component({
  selector: 'app-fad-man-usuar',
  templateUrl: './fad-man-usuar.component.html',
  styleUrls: ['./fad-man-usuar.component.scss']
})
export class FadManUsuarComponent implements OnInit, AfterViewInit {
  @ViewChild('teams') teams!: ElementRef;
  constructor(public UsuSer:UsuarService, private SucSer: SucurService, private GruSer: GrusuService, public DepSer: DeptoService, private cook: CookieService, public EntSer: EnteService, private formBuilder: FormBuilder, private route: ActivatedRoute, private location: Location)
  {
    
    
  }
  public usuar: UsuarModel
  ENTES =[
    {name: 'Arizona', abbrev: 'AZ'},
    {name: 'California', abbrev: 'CA'},
    {name: 'Colorado', abbrev: 'CO'},
    {name: 'New York', abbrev: 'NY'},
    {name: 'Pennsylvania', abbrev: 'PA'},
  ];
  public formPost = new FormGroup({CVE_USUAR: new FormControl(''), NUM_ENTE: new FormControl(''), NOM_ENTE: new FormControl(new Array<EnteModel>()), DES_DEPTO: new FormControl(new Array<Depto>()), DES_SUCUR: new FormControl(''), DES_GRUSU: new FormControl(''), CARGO: new FormControl(''), TELEFONO: new FormControl(''), PASSTiemp: new FormControl(''), PASS1: new FormControl(''), PASS2: new FormControl('') });
  
  public show: boolean;
  public FormShow: boolean;
  public imprimirdef: any
  ngOnInit(): void 
  {
    this.show = false;
    
    
    $.getScript('./assets/plugins/select2/select2.min.js');
    $.getScript('./assets/js/custom-select2.js');
  }
 
  ngAfterViewInit(): void 
  {
    this.FormShow = true;
    this.usuar = new UsuarModel()
    this.usuar.Ente = new EnteModel()
    this.usuar.Depto1 = new Depto()
    this.usuar.Grusu = new GrusuModel()
    this.usuar.Sucur = new SucurModel()
    
    let imprimir: any
    let Id = this.route.snapshot.paramMap.get('CVE_USUAR');
    
    if (Id != "?") 
    {
      this.usuar.Cve_Usuar= Id
      this.UsuSer.GetById(this.usuar).subscribe((r) => 
      {
        imprimir = r[0]; 
        if(imprimir != null)
        {
          this.usuar.Cve_Usuar = imprimir.CVE_USUAR;
          this.usuar.Ente.Num_Ente = imprimir.NUM_ENTE;
          this.usuar.Ente.Nom_Com = imprimir.NOM_USUAR;
          this.GetEnte(this.usuar.Ente)
          
          console.log(this.formPost.controls)
          this.usuar.Des_Cargo = imprimir.DES_CARUS;
          this.usuar.Num_Nivel = imprimir.NUM_NIVEL;
          
          this.usuar.Pass_Cad = imprimir.NUM_DIAVA;
          this.usuar.Num_Tel = imprimir.NUM_TELUS;
          this.usuar.Sucur.Des_Sucur = imprimir.Sucur[0].DES_SUCUR;
          this.usuar.Sucur.Cve_Sucur = imprimir.Sucur[0].CVE_SUCUR;
          this.GetSucur(this.usuar.Sucur)

          this.usuar.Ban_Bloq = imprimir.BAN_DATO;
          this.usuar.Grusu.Cve_Grusu = imprimir.Grusu[0].CVE_GRUSU;
          this.usuar.Grusu.Des_Grusu = imprimir.Grusu[0].DES_GRUSU;
          this.usuar.Grusu.Def_Grusu = imprimir.Grusu[0].DEF_GRUSU;
          this.GetGrusu(this.usuar.Grusu)

          this.usuar.Depto1.Cve_Depto = imprimir.Depto[0].CVE_DEPTO;
          this.usuar.Depto1.Des_Depto = ut.decode(imprimir.Depto[0].DES_DEPTO);
          console.log(this.usuar.Depto1)
          this.GetDepto(this.usuar.Depto1)
          if(this.usuar.Ban_Bloq == true)
          {
            $('#Bloq1').prop('checked', true)
          }
          else
          {
            $('#Bloq1').prop('checked', false)
          }
          switch(this.usuar.Num_Nivel)
          {
            case 1:
              $('#Niv1').prop('checked', true)
              break;
            case 2:
              $('#Niv2').prop('checked', true)
              break;
            case 3:
              $('#Niv3').prop('checked', true) 
              break; 
          }
          if(this.usuar.Num_Tel == "")
          {
            this.usuar.Num_Tel = "SIN NUMERO DE TELEFONO REGISTRADO"
          }
        }
        console.log(this.usuar)
        console.log(imprimir)
      }, (e) => {console.log(e)})
    }
    else
    {
      this.usuar.Ente.Num_Ente = 0;
      this.usuar.Grusu.Cve_Grusu = 0;
      this.usuar.Depto1.Cve_Depto = 0;
      this.usuar.Sucur.Cve_Sucur = 0;

      this.GetDepto(this.usuar.Depto1)
      this.GetEnte(this.usuar.Ente)
      this.GetGrusu(this.usuar.Grusu)
      this.GetSucur(this.usuar.Sucur)
    }
    
  }
  
  GetSucur(SucurGet: SucurModel)
  {
    
    
    let imprimir : any
    this.SucSer.GetAll().subscribe((r) => 
    {
      let result = new Result()
      imprimir = r; 
      result.Objects = new Array<SucurModel>()

      for(let index of imprimir)
      {
        let Suc = new SucurModel()
        Suc.Cve_Sucur = index.CVE_SUCUR;
        Suc.Des_Sucur = index.DES_SUCUR;
        if(SucurGet.Cve_Sucur != 0 && SucurGet.Cve_Sucur == Suc.Cve_Sucur)
        {
          result.Objects.unshift(Suc)
        }
        else
        {
          result.Objects.push(Suc)
        }
        
      }
      result.Correct = true
      this.usuar.Sucur.Sucurs = result.Objects
      
    }, (e) => {console.log(e)})
    console.log(this.usuar.Sucur.Sucurs)
    return this.usuar.Sucur.Sucurs;
  }

  GetEnte(EnteGet: EnteModel)
  {
    let imprimir: any
    this.EntSer.GetAll().subscribe((r) => 
    {
      let result = new Result()
      imprimir = r
      result.Objects = new Array<EnteModel>()
      for(let index of imprimir)
      {
        let En = new EnteModel()
        En.Num_Ente = index.NUM_ENTE;
        En.Nom_Ente1 = index.NOM_1ENTE;
        En.Nom_Ente2 = index.NOM_2ENTE;
        En.Nom_Ente3 = index.NOM_3ENTE;
        En.Ape_Ente1 = index.APE_1ENTE;
        En.Ape_Ente2 = index.APE_2ENTE;
        En.Ape_Ente3 = index.APE_3ENTE;
        En.Nom_Com = En.Nom_Ente1 + " " + En.Nom_Ente2 + " " + En.Ape_Ente1 + " " + En.Ape_Ente2;
        if (EnteGet.Num_Ente >= 0 && En.Num_Ente == EnteGet.Num_Ente) 
        {
          result.Objects.unshift(En);
          this.formPost.setControl('NOM_ENTE', new FormControl(En))
        }
        else
        {
          result.Objects.push(En);
        }
        
      }
      this.usuar.Ente.Entes = result.Objects
      console.log(this.usuar.Ente.Entes)
      let XD = this.usuar.Ente.Entes
      
      //this.formPost.addControl('NOM_ENTE', new FormControl(new Array<EnteModel>()))
      console.log(this.formPost.controls)
    }, (e) => {console.log(e)})
  }

  GetGrusu(GrusuGet: GrusuModel)
  {
    let imprimir: any;
    this.GruSer.GetAll().subscribe((r) => 
    {
      imprimir = r; 
      let result = new Result()
      result.Objects = new Array<GrusuModel>()
      for(let index of imprimir)
      {
        let Grus = new GrusuModel();
        Grus.Cve_Grusu = index.CVE_GRUSU;
        Grus.Des_Grusu = index.DES_GRUSU;
        Grus.Def_Grusu = index.DEF_GRUSU;
        
        if(GrusuGet.Cve_Grusu > 0 && Grus.Cve_Grusu == GrusuGet.Cve_Grusu)
        {
          result.Objects.unshift(Grus)
        }
        else
        {
          result.Objects.push(Grus)
        }
      }
     
      this.usuar.Grusu.Grusus = result.Objects
      console.log(this.usuar.Grusu.Grusus)
      result.Correct = true
    }, (e) => {console.log(e)})
  }
  GetDepto(DeptoGet: Depto)
  {
    let imprimir: any;
    this.DepSer.GetById('').subscribe((r) => 
    {
      imprimir = r; 
      let result = new Result()
      result.Objects = new Array<Depto>(); 
      console.log(r)
      for(let index of imprimir.TTFGR_DEPTO)
      {
        let Dept = new Depto()
        Dept.Cve_Depto = index.CVE_DEPTO
        Dept.Des_Depto = ut.decode(index.DES_DEPTO) 
        if (index.DEF_DEPTO == true) 
        {
          if(DeptoGet.Cve_Depto > 0 && Dept.Cve_Depto == DeptoGet.Cve_Depto)
          {
          
            result.Objects.unshift(Dept)
            this.formPost.setControl('DES_DEPTO', new FormControl(Dept))
          }
          else
          {
            result.Objects.push(Dept)
          }
          
        }
        else
        {
          if(DeptoGet.Cve_Depto > 0 && Dept.Cve_Depto == DeptoGet.Cve_Depto)
          {
            Dept.Des_Depto += " ----> INACTIVO"
            result.Objects.unshift(Dept)
            this.formPost.setControl('DES_DEPTO', new FormControl(Dept))
          }
        }
          
        
        result.Correct = true;
      }
      this.usuar.Depto1.Deptos = result.Objects
      console.log(this.usuar.Depto1.Deptos)
    }, (e) => {console.log(e); })
  }

  Form()
  {
    this.show = true;
    this.FormShow = false;
    this.usuar = new UsuarModel()
    this.usuar.Ente = new EnteModel()
    this.usuar.Depto1 = new Depto()
    this.usuar.Grusu = new GrusuModel()
    this.usuar.Sucur = new SucurModel()
    //public formPost = new FormGroup({CVE_USUAR: new FormControl(''), NUM_ENTE: new FormControl(''), NOM_ENTE: new FormControl(''), DES_DEPTO: new FormControl(''), DES_SUCUR: new FormControl(''), DES_GRUSU: new FormControl(''), CARGO: new FormControl(''), TELEFONO: new FormControl(''), PASSTiemp: new FormControl(''), PASS1: new FormControl(''), PASS2: new FormControl('') });
  
    this.usuar.Cve_Usuar = this.formPost.controls['CVE_USUAR'].value
    this.usuar.Ente.Num_Ente = Number(this.formPost.controls['NUM_ENTE'].value)
    console.log(this.formPost.get('NOM_ENTE'))
    console.log(this.formPost.controls['NOM_ENTE'].value)
    this.usuar.Des_Cargo = this.formPost.controls['CARGO'].value
    this.usuar.Num_Tel = this.formPost.controls['TELEFONO'].value
    this.usuar.Pass_Cad = this.formPost.controls['PASSTiemp'].value
    this.usuar.Pass_1 = this.formPost.controls['PASS1'].value
    this.usuar.Pass_2 = this.formPost.controls['PASS2'].value
    this.usuar.Depto1 = this.formPost.controls['DES_DEPTO'].value
    console.log(this.usuar.Depto1)
  }
  get cityName() {
    return this.formPost.get('NOM_ENTE');
  }
  CambioEnte(e:any)
  {
    this.cityName?.setValue(e.target.value, {
      onlySelf: true,
    });
    console.log("FGHJJIYTRFGVBHJ")
    
  }
}
