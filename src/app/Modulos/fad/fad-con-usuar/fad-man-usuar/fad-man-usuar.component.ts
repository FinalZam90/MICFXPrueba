import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarService } from '../../../../SL/FAD_USUAR';
import { EnteService } from '../../../../SL/FCL_ENTE';
import { DeptoService } from '../../../../SL/DeptoP';
import { GrusuService } from '../../../../SL/FAD_GRUSU';
import { SucurService } from '../../../../SL/FGR_SUCUR';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, SelectControlValueAccessor, AbstractControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Messg } from "../../../../ML/Message";
import { UsuarModel } from "../../../../ML/FAD_USUAR";
import { Depto } from "../../../../ML/FGR_DEPTO";
import { EnteModel } from "../../../../ML/FCL_ENTE";
import { Result } from "../../../../ML/Result";
import { GrusuModel } from "../../../../ML/FAD_GRUSU";
import { SucurModel } from "../../../../ML/FGR_SUCUR";
import  *  as ut from "utf8";
import { MergeScanSubscriber } from 'rxjs/internal/operators/mergeScan';
@Component({
  selector: 'app-fad-man-usuar',
  templateUrl: './fad-man-usuar.component.html',
  styleUrls: ['./fad-man-usuar.component.scss']
})
export class FadManUsuarComponent{
  @ViewChild('teams') teams!: ElementRef;
  constructor(public UsuSer:UsuarService, private SucSer: SucurService, private GruSer: GrusuService, public DepSer: DeptoService, private cook: CookieService, public EntSer: EnteService, private formBuilder: FormBuilder, private route: ActivatedRoute, private location: Location)
  {
    this.formPost = new FormGroup({CVE_USUAR: new FormControl(''), NUM_ENTE: new FormControl(''), NOM_ENTE: new FormControl(new Array<EnteModel>()), DES_DEPTO: new FormControl(new Array<Depto>()), DES_SUCUR: new FormControl(new Array<SucurModel>()), DES_GRUSU: new FormControl(''), CARGO: new FormControl(''), TELEFONO: new FormControl(''), PASSTiemp: new FormControl(''), PASS1: new FormControl(''), PASS2: new FormControl('') });
  
    
  }
  public usuar: UsuarModel
  
  public formPost : FormGroup

  public show: boolean;
  public FormShow: boolean;
  public imprimirdef: any
  public EnteSelect: any
  public Id: string
  public DeptoSelect = new Depto()
  public SucurSelect = new SucurModel()
  public GrusuSelect = new GrusuModel()
  public msg = new Messg()
  public mostrar: boolean = false;
  public counter = 6;
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
    this.Id = this.route.snapshot.paramMap.get('CVE_USUAR');
    
    if (this.Id != "?") 
    {
     
      this.usuar.Cve_Usuar= this.Id
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

          this.usuar.Ban_Inac = imprimir.BAN_DATO1;
          this.usuar.Ban_Bloq = imprimir.BAN_DATO3;
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
          if(this.usuar.Ban_Inac == true)
          {
            $('#Inac1').prop('checked', true)
          }
          else
          {
            $('#Inac1').prop('checked', false)
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
            this.usuar.Num_Tel = "SIN NUMERO"
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
      let SucurS = new SucurModel()
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
          SucurS = Suc;
          this.formPost.setControl('DES_SUCUR', new FormControl(Suc))
        }
        else
        {
          result.Objects.push(Suc)
        }
        
      }
      if (SucurGet.Cve_Sucur != 0)
      {
        this.SucurSelect = SucurS
      }
      else
      {
        SucurS.Cve_Sucur = null;
        SucurS.Des_Sucur = '--------- Selecciona una Sucursal ---------'
        
        result.Objects.unshift(SucurS)
        this.SucurSelect = result.Objects[0]
      }
      result.Correct = true
      this.usuar.Sucur.Sucurs = result.Objects
      
    }, (e) => {console.log(e)})
    console.log(this.usuar.Sucur.Sucurs)
    return this.usuar.Sucur.Sucurs;
  }
  identify(index, item) {
    return item.label;
 }
 public selectedTeam: any;
  GetEnte(EnteGet: EnteModel)
  {
    let imprimir: any
    this.EntSer.GetAll().subscribe((r) => 
    {
      let result = new Result()
      let EnteS = new EnteModel()
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
          EnteS = En
          this.formPost.setControl('NOM_ENTE', new FormControl(En))
          
        }
        else
        {
          result.Objects.push(En);
        }
        
      }
      result.Objects.sort(function (a, b) {
        
        if (a.Nom_Ente1 < b.Nom_Ente1)
            return -1;
        
        else if (a.Nom_Ente1 > b.Nom_Ente1)
            return 1;
        
        else 
            return 0;
    })
    if (EnteGet.Num_Ente >= 0 ) 
    {
      
      this.EnteSelect = EnteS
      
      
    }
    else
    {
      EnteS.Num_Ente = null;
      EnteS.Nom_Com = "--------- SELECCIONA UN ENTE ---------"
      result.Objects.unshift(EnteS)
      this.EnteSelect = EnteS
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
      let GrusS = new GrusuModel()
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
          GrusS = Grus;
          this.formPost.setControl('DES_GRUSU', new FormControl(Grus))

        }
        else
        {
          result.Objects.push(Grus)
          
          
        }
      }
      if (GrusuGet.Cve_Grusu > 0)
      {
        this.GrusuSelect = GrusS
      }
      else
      {
        GrusS.Cve_Grusu = null;
        GrusS.Des_Grusu = '--------- Selecciona un Grupo ---------'
        GrusS.Def_Grusu = false
        result.Objects.unshift(GrusS)
        this.GrusuSelect = result.Objects[0]
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
      let DeptoS = new Depto()
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
            DeptoS = Dept
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
            DeptoS = Dept
            this.formPost.setControl('DES_DEPTO', new FormControl(Dept))
          }
        }
          
        
        result.Correct = true;
      }
      if (DeptoGet.Cve_Depto > 0)
      {
        this.DeptoSelect = DeptoS
      }
      else
      {
        DeptoS.Cve_Depto = null;
        DeptoS.Des_Depto = '--------- Selecciona un Departamento ---------'
        DeptoS.Def_Depto = false
        result.Objects.unshift(DeptoS)
        this.DeptoSelect = result.Objects[0]
      }
      this.usuar.Depto1.Deptos = result.Objects
      console.log(this.usuar.Depto1.Deptos)
    }, (e) => {console.log(e); })
  }

  Form()
  {
    this.show = true;
    this.FormShow = false;
    
    this.usuar.Ente.Entes = new Array<EnteModel>()
    this.usuar.Depto1.Deptos = new Array<Depto>()
    this.usuar.Grusu.Grusus = new Array<GrusuModel>()
    this.usuar.Sucur.Sucurs = new Array<SucurModel>()
    
    this.usuar.Cve_Usuar = this.formPost.controls['CVE_USUAR'].value
    this.usuar.Ente.Num_Ente = Number(this.formPost.controls['NUM_ENTE'].value)
    this.usuar.Ente = this.formPost.controls['NOM_ENTE'].value
    this.usuar.Des_Cargo = this.formPost.controls['CARGO'].value
    this.usuar.Num_Tel = this.formPost.controls['TELEFONO'].value
    this.usuar.Pass_Cad = this.formPost.controls['PASSTiemp'].value
    this.usuar.Pass_1 = this.formPost.controls['PASS1'].value
    this.usuar.Pass_2 = this.formPost.controls['PASS2'].value
    this.usuar.Depto1 = this.formPost.controls['DES_DEPTO'].value
    this.usuar.Sucur = this.formPost.controls['DES_SUCUR'].value
    this.usuar.Grusu = this.formPost.controls['DES_GRUSU'].value
    this.msg.tabla = 'FAD_USUAR'
    this.UsuSer.Form(this.usuar).subscribe((r) => 
    {
      console.log(r)
      this.imprimirdef = r; 
      if(this.imprimirdef.Código  == 200)
      {
        this.msg.message = this.imprimirdef.Mensaje + " Correctamente"
      }
      else
      {
        this.msg.message = this.imprimirdef.Mensaje + " Sin Éxito"
      } 
      this.FormShow = false;
      this.show = true;
      this.Timer();
    }, (e) => {console.log(e)})
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
        
        console.log(this.imprimirdef.Código)
        this.show = false;
        this.mostrar = true;
        clearInterval(intervalId)
      }
    }, 1000)
    
  }
  CambioEnte(newEnte, num)
  {
    if(num == null)
    {
      num = 1
    }
    let Ent = new EnteModel()
    if(num != 0)
    {
      Ent.Num_Ente = Number(newEnte)
      this.EnteSelect = this.usuar.Ente.Entes.find(element => element.Num_Ente === Ent.Num_Ente);
      this.formPost.setControl('NOM_ENTE', new FormControl(this.EnteSelect))
    }
    else
    {
      this.usuar.Ente.Num_Ente = newEnte.Num_Ente
      this.EnteSelect = newEnte
      this.formPost.setControl('NOM_ENTE', new FormControl(this.EnteSelect))
    }
    
    console.log(newEnte)
    
  }
  CambioDepto(newDepto)
  {
    this.DeptoSelect = newDepto
    this.formPost.setControl('DES_DEPTO', new FormControl(this.DeptoSelect))
  }
  CambioSucur(newSucur)
  {
    this.SucurSelect = newSucur
    this.formPost.setControl('DES_SUCUR', new FormControl(this.SucurSelect))
  }
  CambioGrusu(newGrusu)
  {
    this.GrusuSelect = newGrusu
    this.formPost.setControl('DES_GRUSU', new FormControl(this.GrusuSelect))
  }
  CambioNivel(nivel)
  {
    this.usuar.Num_Nivel = Number(nivel)
  }
  CambioBloq(banbloqu)
  {
    this.usuar.Ban_Bloq = banbloqu.checked
  }
  CambioInac(baninac)
  {
    this.usuar.Ban_Inac = baninac.checked
  }
}
