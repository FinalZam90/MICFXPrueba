import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { ClService } from '../../SL/FCL_TIPCL';
import { EnteService } from '../../SL/FCL_ENTE';
import { SucurService } from '../../SL/FGR_SUCUR';
import { LugnaService } from '../../SL/FGR_LUGNA';
import { PaisService } from '../../SL/FGR_PAIS';
import { EstadoService } from '../../SL/FGR_ESTDO';
import { MunicService } from '../../SL/FGR_MUNIC';
import { LocalService } from '../../SL/FGR_LOCAL';
import { LocalCNBService } from '../../SL/FLD_LOCAL';
import { TidomService } from '../../SL/FCL_TIDOM';
import { DirecService } from '../../SL/FCL_DIREC';
import { EntIdService } from '../../SL/FCL_ENTID';
import { RefmiService } from '../../SL/FCL_REFMI';

import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, SelectControlValueAccessor, AbstractControl, Form } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location, formatDate } from '@angular/common';
import { HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Messg } from "../../ML/Message";
import { TipClModel } from "../../ML/FCL_TIPCL";
import { LugnaModel } from "../../ML/FGR_LUGNA";
import { EnteModel } from "../../ML/FCL_ENTE";
import { EstuModel } from "../../ML/NivEstu";
import { EstadoModel } from "../../ML/FGR_ESTDO";
import { MunicModel } from "../../ML/FGR_MUNIC";
import { LocalModel } from "../../ML/FGR_LOCAL";
import { FldLocalModel } from "../../ML/FLD_LOCAL";
import { TidoModel } from "../../ML/FCL_TIDOM";
import { DirecModel } from "../../ML/FCL_DIREC";
import { EntIdModel } from "../../ML/FCL_ENTID";
import { RefmiModel } from "../../ML/FCL_REFMI";
import { CivModel } from "../../ML/EdoCiv";
import { Result } from "../../ML/Result";
import { SexGenModel } from "../../ML/TipSex";
import { PaisModel } from "../../ML/FGR_PAIS";
import { SucurModel } from "../../ML/FGR_SUCUR";
import { AegenModel } from "../../ML/FCR_AEGEN";
import { GrusoModel } from "../../ML/FCL_GRUSO";
import { IngreModel } from "../../ML/NivIngreso";

import *  as ut from "utf8";
import { FormModule } from 'src/app/form/form.module';
import { tr } from 'date-fns/locale';
import { arrayMax } from 'highcharts';
import { ajax } from 'jquery';

@Component({
  selector: 'app-fgr-man-clien',
  templateUrl: './fgr-man-clien.component.html',
  styleUrls: ['./fgr-man-clien.component.scss']
})
export class FgrManClienComponent implements OnInit {

  constructor(private SucSer: SucurService, private ClSer: ClService, private EnteSer: EnteService, private PaiSer: PaisService, private LuSer: LugnaService, private LocSer: LocalService, private LocCNBSer: LocalCNBService, private EdoSer: EstadoService, private MuniSSer: MunicService, private TidoSer: TidomService, private DirSer: DirecService, private EntIdSer: EntIdService, private RefSer: RefmiService, private cook: CookieService, private formBuilder: FormBuilder, private route: ActivatedRoute, private location: Location) {
    this.formPost = new FormGroup(
      {
        //PASO 1
        NOM1_ENTE: new FormControl(''),
        NOM2_ENTE: new FormControl(''),
        APE1_ENTE: new FormControl(''),
        APE2_ENTE: new FormControl(''),
        FEC_NAC: new FormControl(''),
        TIP_SEX: new FormControl(new Array<SexGenModel>()),
        DES_SUCUR: new FormControl(new Array<SucurModel>()),
        DES_LUGNA: new FormControl(new Array<LugnaModel>()),
        DES_TIPCL: new FormControl(new Array<TipClModel>()),
        DES_NAC: new FormControl(new Array<PaisModel>()),
        RFC: new FormControl(''),
        CURP: new FormControl('')
        // PASO 2

      });

    this.formPost2 = new FormGroup(
      {
        EDO_CIV: new FormControl(new Array<CivModel>()),
        NIV_ES: new FormControl(new Array<EstuModel>()),
        NUM_DECLI: new FormControl(''),
        TEL1: new FormControl(''),
        TEL2: new FormControl(''),
        TEL3: new FormControl(''),
        EMAIL: new FormControl(''),
        NIV_ING: new FormControl(new Array<IngreModel>()),
        GPO_ECO: new FormControl(new Array<GrusoModel>()),
        CNB: new FormControl(new Array<AegenModel>()),
        FEC_INICIO: new FormControl('')
      });

    this.formPost3 = new FormGroup(
      {
        CVE_PAIS: new FormControl(new Array<PaisModel>()),
        CVE_ESTDO: new FormControl(new Array<EstadoModel>()),
        CVE_MUNIC: new FormControl(new Array<MunicModel>()),
        LOCALIDAD: new FormControl(new Array<LocalModel>()),
        LOCALCNB: new FormControl(new Array<FldLocalModel>()),
        VIVIENDA: new FormControl(new Array<TidoModel>()),

        CP: new FormControl(''),
        CIUDAD: new FormControl(''),
        COLONIA: new FormControl(''),
        CALLE: new FormControl(''),
        NUM_EXT: new FormControl(''),
        NUM_INT: new FormControl(''),
        APPOS: new FormControl(''),
        AÑRES: new FormControl(''),
        REFERENCIAS: new FormControl('')
      });
      this.formPostIdenti = new FormGroup(
      {
        TIPID: new FormControl(new Array<EntIdModel>()),
        AN_VENC: new FormControl(''),
        FEC_ALT: new FormControl(''),
        NUM_IDENTI: new FormControl(''),
        FOLIO_IDENTI: new FormControl('')
      });
      this.formPostRefmi = new FormGroup(
        {
          NOMBRE: new FormControl(''),
          TEL: new FormControl(''),
          DIREC: new FormControl(''),
          AN_CON: new FormControl(''),
          CVE_RESP: new FormControl(new Array),
          COMEN: new FormControl('')
        });
  }


  public formPost: FormGroup
  public formPost2: FormGroup
  public formPost3: FormGroup
  public formPostIdenti: FormGroup
  public formPostRefmi: FormGroup
  public ente: EnteModel
  public direc: DirecModel
  public entid: EntIdModel
  public refmi: RefmiModel
  public show: boolean;
  public FormShow: boolean;
  public imprimirdef: any
  public EnteSelect: any
  public Id: string;
  

  public LocalSelect = new LocalModel()
  public TipSexSelect = new SexGenModel()
  public SucurSelect = new SucurModel()
  public PaisSelect = new PaisModel()
  public LugnaSelect = new LugnaModel()
  public ClienSelect = new TipClModel()
  public NivesSelect = new EstuModel()
  public EdoCivSelect = new CivModel()
  public AegenSelect = new AegenModel()
  public IngSelect = new IngreModel()
  public GrusoSelect = new GrusoModel()

  public EstadoSelect = new EstadoModel()
  public MunicSelect = new MunicModel()
  public LocalidadSelect = new LocalModel()
  public LocalCNBSelect = new FldLocalModel()
  public ViviendaSelect = new TidoModel()
  
  public EntIdSelect = new EntIdModel()
  
  
  public msg = new Messg()
  public arregloPaisesSelect = new Array<PaisModel>();
  public arregloGrusoSelect = new Array<GrusoModel>();
  public arregloTipIdsSelect = new Array<EntIdModel>();
  public mostrarModal: boolean = false;
  public mostrar: boolean = false;
  public counter = 6;
  public contadorNacionalidades = 0;
  public contadorGrusos = 0;
  public contadorGuardadoSelectores: number;

  ngOnInit(): void {
    this.contadorGuardadoSelectores = 0;
    $('#next-btn').prop('disabled', true);
    this.ente = new EnteModel();
    this.direc = new DirecModel();
    this.entid = new EntIdModel();
    this.refmi = new RefmiModel();
    
    this.LlenarListas();
    this.LlenarLista2();
    $.getScript('./assets/plugins/smartwizard/dist/js/jquery.smartWizard.min.js');
    $.getScript('./assets/js/custom-smartWizard.js');
    $.getScript('./assets/plugins/select2/select2.min.js');
    $.getScript('./assets/js/custom-select2.js');
    $.getScript('./assets/js/form-validations.js');
    $.getScript('./assets/js/bs-custom-file-input.min.js');
  }
  GetSucurs() {
    let result = new Result()
    this.SucSer.GetAll().subscribe((r) => {
      this.imprimirdef = r;
      if (this.imprimirdef != null) {
        result.Objects = new Array<SucurModel>();
        let SucInicio = new SucurModel();
        SucInicio.Cve_Sucur = null
        SucInicio.Des_Sucur = "------------ SELECCIONA UNA SUCURSAL --------------"
        if (this.contadorGuardadoSelectores > 0) {
          SucInicio.Cve_Sucur = this.SucurSelect.Cve_Sucur
          SucInicio.Des_Sucur = this.SucurSelect.Des_Sucur
        }


        for (let index of this.imprimirdef) {
          let SucMo = new SucurModel()
          SucMo.Cve_Sucur = index.CVE_SUCUR;
          SucMo.Des_Sucur = index.DES_SUCUR;

          if (this.contadorGuardadoSelectores > 0) {
            if (SucInicio.Cve_Sucur != SucMo.Cve_Sucur) {
              result.Objects.push(SucMo)
            }
          }
          else {
            result.Objects.push(SucMo)
          }

        }
        this.SucurSelect = SucInicio
        result.Objects.unshift(SucInicio)
        this.ente.Sucur.Sucurs = result.Objects
        result.Correct = true;
      }
    })
  }
  GetTipCl() {
    let result = new Result()
    this.ClSer.GetAll().subscribe((r) => {
      this.imprimirdef = r;
      if (this.imprimirdef != null) {
        result.Objects = new Array<TipClModel>();
        let ClInicio = new TipClModel();
        ClInicio.Cve_TipCl = null
        ClInicio.Des_TipCl = "------------ SELECCIONA UN TIPO DE CLIENTE --------------"
        if (this.contadorGuardadoSelectores > 0) {
          ClInicio = this.ClienSelect
        }
        for (let index of this.imprimirdef) {
          let ClMo = new TipClModel()
          ClMo.Cve_TipCl = index.CVE_TIPCL;
          ClMo.Des_TipCl = index.DES_TIPCL;
          if (this.contadorGuardadoSelectores > 0) {
            if (ClMo.Cve_TipCl != ClInicio.Cve_TipCl) {
              result.Objects.push(ClMo)
            }
          }
          else {
            result.Objects.push(ClMo)
          }
        }
        this.ClienSelect = ClInicio
        result.Objects.unshift(ClInicio)
        this.ente.TipCl.TipCls = result.Objects
        result.Correct = true;
      }
    })
  }
  GetPais() {
    let result = new Result()
    this.PaiSer.GetAll().subscribe((r) => {
      this.imprimirdef = r;
      if (this.imprimirdef != null) {
        result.Objects = new Array<PaisModel>();
        let PaiInicio = new PaisModel();
        PaiInicio.Cve_Pais = null
        PaiInicio.Des_Nac = "------------ SELECCIONA UN PAIS --------------"
        if (this.contadorGuardadoSelectores > 0) {
          PaiInicio = this.PaisSelect
        }
        for (let index of this.imprimirdef) {
          let PaMo = new PaisModel()
          PaMo.Cve_Pais = index.CVE_PAIS;
          PaMo.Des_Nac = index.DES_CIVIL;
          PaMo.Nom_Pais = index.NOM_PAIS;

          if (this.contadorGuardadoSelectores > 0) {
            if (PaiInicio.Cve_Pais != PaMo.Cve_Pais) {
              result.Objects.push(PaMo)
            }
          }
          else {
            result.Objects.push(PaMo)
          }
        }
        this.PaisSelect = PaiInicio
        result.Objects.unshift(PaiInicio)
        this.ente.Pais.Paises = result.Objects
        this.direc.Pais.Paises = result.Objects
        result.Correct = true;
      }
    })
  }
  GetLugna() {
    let result = new Result()
    this.LuSer.GetAll().subscribe((r) => {
      this.imprimirdef = r;
      if (this.imprimirdef != null) {
        result.Objects = new Array<LugnaModel>();
        let LugInicio = new LugnaModel();
        LugInicio.Cve_Lugna = 0
        LugInicio.Des_Lugna = "------------ SELECCIONA UN LUGAR DE NACIMIENTO --------------"
        if (this.contadorGuardadoSelectores > 0) {
          LugInicio = this.LugnaSelect
        }
        for (let index of this.imprimirdef) {
          let LugMo = new LugnaModel()
          LugMo.Cve_Lugna = index.CVE_LUGNA;
          LugMo.Des_Lugna = index.DES_LUGNA;
          if (this.contadorGuardadoSelectores > 0) {
            if (LugMo.Cve_Lugna != LugInicio.Cve_Lugna) {
              result.Objects.push(LugMo)
            }
          }
          else {
            result.Objects.push(LugMo)
          }
        }
        this.LugnaSelect = LugInicio
        result.Objects.unshift(LugInicio)
        this.ente.Lugna.Lugnas = result.Objects
        result.Correct = true;
      }
    })
  }
  GetSexGen() 
  {
    let result = new Result()
    result.Objects = new Array<SexGenModel>()
    let SeGenInicio = new SexGenModel();
    SeGenInicio.Cve_TipSex = null
    SeGenInicio.Des_TipSex = "------------ SELECCIONA UN GENERO --------------"
    if (this.contadorGuardadoSelectores > 0) {
      SeGenInicio = this.TipSexSelect
    }
    for (let i = 0; i < 2; i++) {
      let SeGenMo = new SexGenModel()
      if (i == 0) {
        SeGenMo.Cve_TipSex = "F"
        SeGenMo.Des_TipSex = "Femenino"
      }
      else {
        SeGenMo.Cve_TipSex = "M"
        SeGenMo.Des_TipSex = "Masculino"
      }
      if (this.contadorGuardadoSelectores > 0) {
        if (SeGenInicio.Cve_TipSex != SeGenMo.Cve_TipSex) {
          result.Objects.push(SeGenMo)
        }

      }
      else {
        result.Objects.push(SeGenMo)
      }
    }
    result.Objects.unshift(SeGenInicio)
    this.TipSexSelect = SeGenInicio
    this.ente.SexGen.SexGenArray = result.Objects
  }
  GetNives() {
    let result = new Result()
    this.EnteSer.GetNivEst().subscribe((r) => {
      this.imprimirdef = r;
      if (this.imprimirdef != null) {
        result.Objects = new Array<EstuModel>();
        let NivInicio = new EstuModel();
        NivInicio.Cve_Nives = null
        NivInicio.Des_Nives = "------------ SELECCIONA UN NIVEL --------------"
        if (this.contadorGuardadoSelectores > 0) {
          NivInicio = this.NivesSelect
        }
        for (let index of this.imprimirdef) {
          let NivMo = new EstuModel()
          NivMo.Cve_Nives = index.CVE_NIVES;
          NivMo.Des_Nives = index.DES_NIVES;
          if (this.contadorGuardadoSelectores > 0) {
            if (NivMo.Cve_Nives != NivInicio.Cve_Nives) {
              result.Objects.push(NivMo)
            }
          }
          else {
            result.Objects.push(NivMo)
          }

        }
        this.NivesSelect = NivInicio
        result.Objects.unshift(NivInicio)
        this.ente.Nives.Estus = result.Objects
        result.Correct = true;
      }
    })
  }
  GetEdoCi() {
    let result = new Result()
    this.EnteSer.GetEdoCiv().subscribe((r) => {
      this.imprimirdef = r;
      if (this.imprimirdef != null) {
        result.Objects = new Array<CivModel>();
        let CivInicio = new CivModel();
        CivInicio.Cve_EdoCi = null
        CivInicio.Tip_EdoCi = "------------ SELECCIONA UN ESTADO CIVIL --------------"
        if (this.contadorGuardadoSelectores > 0) {
          CivInicio = this.EdoCivSelect
        }
        for (let index of this.imprimirdef) {
          let CivMo = new CivModel()
          CivMo.Cve_EdoCi = index.CveTipEdoCi;
          CivMo.Tip_EdoCi = index.TIP_EDOCI;
          if (this.contadorGuardadoSelectores > 0) {
            if (CivMo.Cve_EdoCi == CivInicio.Cve_EdoCi) {
              result.Objects.push(CivMo)
            }
          }
          else {
            result.Objects.push(CivMo)
          }

        }
        this.EdoCivSelect = CivInicio
        result.Objects.unshift(CivInicio)
        this.ente.EdoCi.EdoCivs = result.Objects
        result.Correct = true;
      }
    })
  }
  GetNivIng() {
    let result = new Result()
    this.EnteSer.GetNivIng().subscribe((r) => {
      this.imprimirdef = r;
      if (this.imprimirdef != null) {
        result.Objects = new Array<IngreModel>();
        let IngInicio = new IngreModel();

        IngInicio.Des_Nivel = "------------ SELECCIONA UN NIVEL --------------"
        for (let index of this.imprimirdef) {
          let IngMo = new IngreModel()

          IngMo.Des_Nivel = index.DesNivPD;
          result.Objects.push(IngMo)
        }
        this.IngSelect = IngInicio
        result.Objects.unshift(IngInicio)
        this.ente.Ingr.Ingres = result.Objects
        result.Correct = true;
      }
    })
  }
  GetGruso() {
    let result = new Result()
    this.EnteSer.GetGruso().subscribe((r) => {
      this.imprimirdef = r;
      if (this.imprimirdef != null) {
        result.Objects = new Array<GrusoModel>();
        let GruInicio = new GrusoModel();
        GruInicio.Cve_Gruso = null
        GruInicio.Des_Gruso = "------------ SELECCIONA UN GRUPO --------------"
        for (let index of this.imprimirdef) {
          let GruMo = new GrusoModel()
          GruMo.Cve_Gruso = index.CVE_GRUSO
          GruMo.Des_Gruso = index.DES_GRUSO;
          result.Objects.push(GruMo)
        }
        this.GrusoSelect = GruInicio
        result.Objects.unshift(GruInicio)
        this.ente.Gruso.Grusos = result.Objects
        result.Correct = true;
      }
    })
  }
  GetAegen() {
    let result = new Result()
    this.EnteSer.GetCNB().subscribe((r) => {
      this.imprimirdef = r;
      if (this.imprimirdef != null) {
        result.Objects = new Array<AegenModel>();
        let AeInicio = new AegenModel();
        AeInicio.Cve_Aegen = null
        AeInicio.Des_Aegen = "------------ SELECCIONA UN GRUPO --------------"
        for (let index of this.imprimirdef) {
          let AeMo = new AegenModel()
          AeMo.Cve_Aegen = index.CVE_AEGEN
          AeMo.Des_Aegen = index.DES_AEGEN;
          result.Objects.push(AeMo)
        }
        this.AegenSelect = AeInicio
        result.Objects.unshift(AeInicio)
        this.ente.Aegen.Aegens = result.Objects
        result.Correct = true;
      }
    })
  }
  public GetEstado() {
    let result = new Result()
    this.EdoSer.GetAll().subscribe((r) => {
      this.imprimirdef = r;
      if (this.imprimirdef != null) {
        result.Objects = new Array<EstadoModel>()
        for (let index of this.imprimirdef) {
          let EdoMod = new EstadoModel()
          EdoMod.Cve_Estdo = index.CVE_ESTDO;
          EdoMod.Nom_Estdo = index.NOM_ESTDO;
          EdoMod.Nom_Abrev = index.NOM_ABREV;
          result.Objects.push(EdoMod)
        }
        result.Correct = true;
        this.direc.Estado.Estados = result.Objects;
      }
      else {
        result.Correct = false;
        result.ErrorMessage = "Sin Estados";
      }
    }, (e) => { console.log(e) })
  }
  public GetMunicipio(EdoProv: EstadoModel) 
  {
    let result = new Result()

    this.MuniSSer.GetAll(EdoProv).subscribe((r) => {
      this.imprimirdef = r;
      if (this.imprimirdef != null) 
      {
        result.Objects = new Array<MunicModel>()
        for (let index of this.imprimirdef) 
        {
          let MunicMod = new MunicModel()
          MunicMod.Cve_Munic = index.CVE_MUNIC;
          MunicMod.Nom_Munic = index.NOM_MUNIC;

          result.Objects.push(MunicMod)
        }
        result.Correct = true;
        this.direc.Municipio.Municipios = result.Objects;
      }
      else 
      {
        result.Correct = false;
        result.ErrorMessage = "Sin Municipios";
      }
    }, (e) => { console.log(e) })
  }
  public GetLocalidad(MuniProv: MunicModel) 
  {


    let result = new Result();
    this.LocSer.GetAll(MuniProv).subscribe((r) => {
      this.imprimirdef = r;
      if (this.imprimirdef != null) {
        result.Objects = new Array<LocalModel>()
        let LocalInicio = new LocalModel()

        for (let index of this.imprimirdef) {
          let LocalMo = new LocalModel()
          LocalMo.Cve_Local = index.CVE_LOCAL;
          LocalMo.Nom_Local = index.NOM_LOCAL;
          result.Objects.push(LocalMo)
        }
        result.Correct = true;
        this.direc.Localidad.Localidades = result.Objects;
      }
      else {
        result.Correct = false;
      }
    },
      (e) => { console.log(e) })
  }
  public GetLocalidadCNB(MunicCons: MunicModel) {

    let result = new Result();
    this.LocCNBSer.GetAll(MunicCons).subscribe((r) => {
      this.imprimirdef = r;
      if (this.imprimirdef != null) {
        result.Objects = new Array<FldLocalModel>()
        let LocalCNBInicio = new FldLocalModel()

        for (let index of this.imprimirdef) {
          let LocCNBMo = new FldLocalModel()
          LocCNBMo.Cve_LoPLD = index.CVE_LOCAL;
          LocCNBMo.Des_LoPLD = index.DES_LOCAL;
          result.Objects.push(LocCNBMo)
        }
        result.Correct = true;
        this.direc.LocalCNB.FLDLocalis = result.Objects;
      }
      else {
        result.Correct = false;
      }
    },
      (e) => { console.log(e) })
  }
  public GetVivienda() {
    let result = new Result()
    this.TidoSer.GetAll().subscribe((r) => {
      this.imprimirdef = r;
      if (this.imprimirdef != null) {
        result.Objects = new Array<TidoModel>()
        let VivInicio = new TidoModel()
        for (let index of this.imprimirdef) {
          let TidoMo = new TidoModel()
          TidoMo.Cve_Tidom = index.CVE_TIDOM;
          TidoMo.Des_Tidom = index.DES_TIDOM;
          result.Objects.push(TidoMo)
        }
        result.Correct = true;
        this.direc.Vivienda.Tidoms = result.Objects
      }
      else {
        result.Correct = false;
        result.ErrorMessage = "No hay tipo de vivienda existente."
      }
    })
  }
  GetTipId() 
  {
    let result = new Result()
    this.EntIdSer.GetTipId().subscribe((r) => 
    {
      this.imprimirdef = r;
      if (this.imprimirdef != null) 
      {
        result.Objects = new Array<EntIdModel>()
        let EntIdInicio = new EntIdModel()
        for (let index of this.imprimirdef) 
        {
          let EntIdMo = new EntIdModel()
          EntIdMo.Cve_TipId = index.CVE_TIPID;
          EntIdMo.Des_Identi = index.DES_TIPID;
          result.Objects.push(EntIdMo)
        }
        result.Correct = true;
        this.entid.TipIds = result.Objects
      }
      else 
      {
        result.Correct = false;
        result.ErrorMessage = "No hay tipo de Identificación existente."
      }
    })
  }
  GetIdenti() 
  {
    let result = new Result()
    this.EntIdSer.GetAll(this.entid).subscribe((r) => 
    {
      this.imprimirdef = r;
      if (this.imprimirdef != null) 
      {
        result.Objects = new Array<EntIdModel>()
        let EntIdInicio = new EntIdModel()
        for (let index of this.imprimirdef) 
        {
          let EntIdMo = new EntIdModel()
          EntIdMo.Fec_Venci = index.FEC_VENCI;
          EntIdMo.Des_Identi = index.DES_TIPID;
          EntIdMo.Fec_AddRec = index.FEC_ADDREC;
          EntIdMo.Num_Identi = index.NUM_IDENTI;
          EntIdMo.Cve_Identi = index.CVE_IDENT;
          result.Objects.push(EntIdMo)
        }
        result.Correct = true;
        this.entid.EntIds = result.Objects
      }
      else 
      {
        result.Correct = false;
        result.ErrorMessage = "El cliente no tiene Identificación existente."
      }
    })
  }
  GetRefmi() 
  {
    let result = new Result()
    this.RefSer.GetAll(this.refmi).subscribe((r) => 
    {
      this.imprimirdef = r;
      if (this.imprimirdef != null) 
      {
        result.Objects = new Array<RefmiModel>()
        let RefmiInicio = new RefmiModel()
        for (let index of this.imprimirdef) 
        {
          for(let i=0; i<5; i++)
          {
            let RefmiMo = new RefmiModel()
            RefmiMo.Nom_Refer = index.NOM_REFER[i];
            RefmiMo.Des_Dirre = index.DES_DIRRE[i];
            RefmiMo.Num_TelRe = index.NUM_TELRE[i];
            RefmiMo.Num_AnoCo = index.Num_AnoCo[i];
            RefmiMo.Ban_Reco = index.BAN_Recom[i];
            RefmiMo.Des_Comen = index.Des_Comen;
            result.Objects.push(RefmiMo)
          }
          
        }
        result.Correct = true;
        this.refmi.Refs = result.Objects
      }
      else 
      {
        result.Correct = false;
        result.ErrorMessage = "El cliente no tiene Referenciados."
      }
    })
  }
  GetDirecsByEnte() 
  {
    let result = new Result()
    this.DirSer.GetAll(this.direc).subscribe((r) => 
    {
      this.imprimirdef = r;
      if (this.imprimirdef != null) 
      {
        result.Objects = new Array<DirecModel>()
        let DirecInicio = new DirecModel()
        for (let index of this.imprimirdef) 
        {
          let DirMo = new DirecModel()
          DirMo.Num_Direc = index.NUM_DIREC;
          DirMo.Direc_Com = index.DIREC;
          DirMo.Vivienda = new TidoModel();
          DirMo.Vivienda.Des_Tidom = index.TIDOM;
         
          result.Objects.push(DirMo)
          
        }
        result.Correct = true;
        this.direc.Direcciones = result.Objects
      }
      else 
      {
        result.Correct = false;
        result.ErrorMessage = "El cliente no tiene direcciones."
      }
    })
  }
  public Form() {
    let Cadena = this.formPost.controls['FEC_NAC'].value
    let PruebaFecha = formatDate(new Date(Cadena), "dd/MM/yyyy", "en-US").toString()
    this.ente.Fec_Na2 = new Date(PruebaFecha)
    let CadenaFecha = Cadena.split("-")
    /*
    this.ente.Lugna = new LugnaModel()
    this.ente.Pais = new PaisModel()
    this.ente.TipCl = new TipClModel()
    this.ente.SexGen = new SexGenModel()
    this.ente.Sucur = new SucurModel()
    */
    /*
    this.ente.Lugna = this.formPost.controls['DES_LUGNA'].value
    this.ente.SexGen = this.formPost.controls['TIP_SEX'].value
    this.ente.Pais = this.formPost.controls['DES_NAC'].value
    this.ente.TipCl = this.formPost.controls['DES_TIPCL'].value
    this.ente.Sucur = this.formPost.controls['DES_SUCUR'].value
    */
    this.ente.Lugna = this.LugnaSelect
    this.ente.SexGen = this.TipSexSelect
    this.ente.Pais.Paises = this.arregloPaisesSelect
    this.ente.TipCl = this.ClienSelect
    this.ente.Sucur = this.SucurSelect
    this.contadorNacionalidades = 0;
    this.ente.Nom_Ente1 = this.formPost.controls['NOM1_ENTE'].value
    this.ente.Nom_Ente2 = this.formPost.controls['NOM2_ENTE'].value
    this.ente.Ape_Ente1 = this.formPost.controls['APE1_ENTE'].value
    this.ente.Ape_Ente2 = this.formPost.controls['APE2_ENTE'].value
    this.ente.Fec_Nac = CadenaFecha[2] + "-" + CadenaFecha[1] + "-" + CadenaFecha[0];
    //this.ente.Fec_Nac = CadenaFecha[1] + "-" + CadenaFecha[2] + "-" + CadenaFecha[0]
    this.ente.RFC = this.formPost.controls['RFC'].value
    this.ente.CURP = this.formPost.controls['CURP'].value
    this.ente.Nom_Com = this.ente.Nom_Ente1 + " " + this.ente.Nom_Ente2 + " " + this.ente.Ape_Ente1 + " " + this.ente.Ape_Ente2;
    let CadenaMsg = '';
    this.EnteSer.Validacion(this.ente).subscribe((r) => {
      console.log(r);
      this.imprimirdef = r;
      if (this.imprimirdef.BAN == true) {
        $('#next-btn').prop('disabled', false);
        this.LlenarLista2();

      }
      else {
        for (let x of this.imprimirdef.Errores) {
          CadenaMsg += x.DES_TERROR + ". "
        }
        this.msg.message = CadenaMsg + "  " + this.imprimirdef.Mensaje; this.mostrarModal = true
        alert(this.msg.message)
      }
      this.ente.Num_Ente = this.imprimirdef.Numero;
      this.ente.RFC = this.imprimirdef.RFC;
      this.ente.CURP = this.imprimirdef.CURP

    })
    this.contadorGuardadoSelectores = 1;

    this.LlenarListas()

  }
  public LlenarListas() {
    this.GetSucurs()
    this.GetPais()
    this.GetLugna()
    this.GetSexGen()
    this.GetTipCl()

  }
  public LlenarLista2() {
    this.GetAegen()
    this.GetNivIng()
    this.GetGruso()
    this.GetEdoCi()
    this.GetNives()
    this.GetEstado()
    this.GetVivienda()
    this.GetTipId()
    this.GetDirecsByEnte()
    this.GetRefmi()
    this.GetIdenti()
  }
  public Form2() {
    this.ente.EdoCi = this.formPost2.controls['EDO_CIV'].value
    this.ente.Nives = this.formPost2.controls['NIV_ES'].value
    this.ente.Aegen = this.formPost2.controls['CNB'].value
    this.ente.Ingr = this.formPost2.controls['NIV_ING'].value
    this.ente.Gruso = this.formPost2.controls['GPO_ECO'].value

    this.ente.Email = this.formPost2.controls['EMAIL'].value
    this.ente.NumDependientes = this.formPost2.controls['NUM_DECLI'].value
    this.ente.Tel_1 = this.formPost2.controls['TEL1'].value
    this.ente.Tel_2 = this.formPost2.controls['TEL2'].value
    this.ente.Tel_3 = this.formPost2.controls['TEL3'].value
    this.ente.Fec_Inicio = this.formPost2.controls['FEC_INICIO'].value
    this.contadorGrusos = 0;
    this.EnteSer.MaPaso2(this.ente).subscribe((r) => { console.log(r) }, (e) => { console.log(e) })

  }
  public Form3() 
  {
    this.direc.Ente = this.ente;
    this.direc.Pais = this.formPost3.controls['CVE_PAIS'].value
    this.direc.Estado = this.formPost3.controls['CVE_ESTDO'].value
    this.direc.Municipio = this.formPost3.controls['CVE_MUNIC'].value
    this.direc.Localidad = this.formPost3.controls['LOCALIDAD'].value
    this.direc.LocalCNB = this.formPost3.controls['LOCALCNB'].value
    this.direc.Vivienda = this.formPost3.controls['VIVIENDA'].value

    this.direc.Cve_CP = this.formPost3.controls['CP'].value
    this.direc.Des_Ciuda = this.formPost3.controls['CIUDAD'].value
    this.direc.Nom_Colon = this.formPost3.controls['COLONIA'].value
    this.direc.Des_Calle = this.formPost3.controls['CALLE'].value
    this.direc.Num_Ext = this.formPost3.controls['NUM_EXT'].value
    this.direc.Num_Int = this.formPost3.controls['NUM_INT'].value
    this.direc.Num_Appos = this.formPost3.controls['APPOS'].value
    this.direc.Num_Resen = this.formPost3.controls['AÑRES'].value
    this.direc.Num_Cpent = this.formPost3.controls['REFERENCIAS'].value

  }
  public FormIdenti()
  {
    this.entid.Ente =  this.ente;

    this.entid.An_Venci = this.formPostIdenti.controls['AN_VENC'].value;
    this.entid.Fec_AddRec = this.formPostIdenti.controls['FEC_ALT'].value;
    this.entid.Num_Identi = this.formPostIdenti.controls['NUM_IDENTI'].value;
    this.entid.Cve_Identi = this.formPostIdenti.controls['FOLIO_IDENTI'].value;

    this.EntIdSer.Add(this.entid).subscribe()
    
    this.GetIdenti()
  }
  public FormRefmi()
  {
    this.refmi.Ente = this.ente;

    this.refmi.Nom_Refer = this.formPostRefmi.controls['NOMBRE'].value;
    this.refmi.Num_TelRe = this.formPostRefmi.controls['TEL'].value;
    this.refmi.Des_Dirre = this.formPostRefmi.controls['DIREC'].value;
    this.refmi.Num_AnoCo = this.formPostRefmi.controls['AN_CON'].value;
    this.refmi.Des_Comen = this.formPostRefmi.controls['COMEN'].value;

    this.RefSer.Add(this.refmi).subscribe()
  }
  public Regresar(): void {
    this.location.back();
  }
  CambioCl(newCl) {
    this.ClienSelect = newCl
    this.formPost.setControl('DES_TIPCL', new FormControl(this.ClienSelect))
  }
  CambioLugna(newLugna) {
    this.LugnaSelect = newLugna
    this.formPost.setControl('DES_LUGNA', new FormControl(this.LugnaSelect))
  }
  CambioPais(newPais) {
    this.PaisSelect = newPais
    this.formPost.setControl('DES_NAC', new FormControl(this.PaisSelect))
  }
  CambioSexGen(newSexGen) {
    this.TipSexSelect = newSexGen
    this.formPost.setControl('TIP_SEX', new FormControl(this.TipSexSelect))
  }
  CambioSucur(newSucur) {
    this.SucurSelect = newSucur
    this.formPost.setControl('DES_SUCUR', new FormControl(this.SucurSelect))
  }
  CambioNives(newNives) {
    this.NivesSelect = newNives
    this.formPost2.setControl('NIV_ES', new FormControl(this.NivesSelect))
  }
  CambioEdoCi(newEdoCi) {
    this.EdoCivSelect = newEdoCi
    this.formPost2.setControl('EDO_CIV', new FormControl(this.EdoCivSelect))
  }
  CambioCNB(newCNB) {
    this.AegenSelect = newCNB
    this.formPost2.setControl('CNB', new FormControl(this.AegenSelect))
  }
  CambioGruso(newGruso) {
    this.GrusoSelect = newGruso
    this.formPost2.setControl('GPO_ECO', new FormControl(this.GrusoSelect))
  }
  CambioIng(newIng) {
    this.IngSelect = newIng
    this.formPost2.setControl('NIV_ING', new FormControl(this.IngSelect))
  }
  CambioPais2(newPais) {
    this.PaisSelect = newPais
    this.formPost3.setControl('CVE_PAIS', new FormControl(this.PaisSelect))
  }
  CambioEstado(newEstado) {
    this.EstadoSelect = newEstado
    this.formPost3.setControl('CVE_ESTDO', new FormControl(this.EstadoSelect))
    let EdoEnvio = new EstadoModel()
    EdoEnvio = this.EstadoSelect;
    EdoEnvio.Pais = this.PaisSelect;
    this.GetMunicipio(EdoEnvio)
  }
  CambioMunicipio(newMunicipio) {
    this.MunicSelect = newMunicipio
    this.formPost3.setControl('CVE_MUNIC', new FormControl(this.MunicSelect))
    let MuniEnvio = new MunicModel()
    MuniEnvio = this.MunicSelect
    MuniEnvio.Estado = this.EstadoSelect
    MuniEnvio.Pais = this.PaisSelect
    this.GetLocalidad(MuniEnvio)
    this.GetLocalidadCNB(MuniEnvio)
  }
  CambioLocalidad(newLocalidad) {
    this.LocalidadSelect = newLocalidad
    this.formPost3.setControl('LOCALIDAD', new FormControl(this.LocalidadSelect))
  }
  CambioLocalidadCNB(newLocalidadCNB) {
    this.LocalCNBSelect = newLocalidadCNB
    this.formPost3.setControl('LOCALCNB', new FormControl(this.LocalCNBSelect))
  }
  CambioVivienda(newVivienda) {
    this.ViviendaSelect = newVivienda
    this.formPost3.setControl('VIVIENDA', new FormControl(this.ViviendaSelect))
  }
  Prueba() {

  }


  PaisSelec(event) {
    if (this.contadorNacionalidades <= 4) {
      if (event.isUserInput == true) {
        if (event.source.selected == true) {

          this.arregloPaisesSelect.push(event.source.value)
          this.contadorNacionalidades++;
        }
        else {
          let ModelitoPruebaXD = new PaisModel()
          ModelitoPruebaXD = event.source.value;

          let indiceArreglo = this.arregloPaisesSelect.findIndex((r) => r == ModelitoPruebaXD)

          this.arregloPaisesSelect.splice(indiceArreglo, 1)
          this.contadorNacionalidades--;
        }

      }

    }
    else {
      alert('Solo escoge 5')

      let arregloDisabled = new Array<PaisModel>()
      /*
      for(let index of this.ente.Pais.Paises)
      {
        for(let index2 of this.arregloPaisesSelect)
        {

          if(index != index2)
          {
            console.log(index);
            let MomentaneoPais = new PaisModel()
            MomentaneoPais = index

            MomentaneoPais.DisableSelect = true
            index.DisableSelect = true
            arregloDisabled.push(MomentaneoPais)
          }
        }
        
      }
      
      for(let index of arregloDisabled)
      {
        for(let index2 of this.ente.Pais.Paises)
        {
          
          let ModelitoPruebaXD = new PaisModel()
          ModelitoPruebaXD = index
          let i = this.ente.Pais.Paises.findIndex((r) => r == ModelitoPruebaXD)
          
          if(index2.Cve_Pais == index.Cve_Pais)
          {
            index2.DisableSelect = true
            this.ente.Pais.Paises[i] = ModelitoPruebaXD
          }
          else
          {
            index2.DisableSelect = false
          }
        }
      }
      */
      let jj = 0
      do {
        console.log('holi')
        for (let index2 of this.ente.Pais.Paises) {
          if (this.arregloPaisesSelect[jj] == index2) {

            index2.DisableSelect = false
            this.arregloPaisesSelect.splice(jj, 1)
            jj = 0
            break;

          }
          else {
            index2.DisableSelect = true
          }
        }
        jj++
      } while (jj < 5 || this.arregloPaisesSelect.length == 0);


    }

  }

  GrusoSelec(event) {
    if (this.contadorGrusos <= 4) {
      if (event.isUserInput == true) {
        if (event.source.selected == true) {

          this.arregloGrusoSelect.push(event.source.value)
          this.contadorGrusos++;
        }
        else {
          this.contadorGrusos--;
        }
        console.log(this.contadorGrusos);
      }

    }
    else {
      alert('Solo escoge 5')

    }

  }

  TipIdSelect(event) {
    if (event.isUserInput == true) {
      if (event.source.selected == true) {

        this.arregloTipIdsSelect.push(event.source.value)
        
      }
      
      console.log(this.contadorGrusos);
    }

  }
}
