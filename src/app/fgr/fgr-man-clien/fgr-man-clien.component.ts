import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, HostListener, Renderer2, ChangeDetectorRef } from '@angular/core';

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
import { FuercService } from '../../SL/FGR_FUERC';
import { CnenvService } from '../../SL/FCR_CNENV';
import { DestiService } from '../../SL/FCR_DESTI';
import { FopagService } from '../../SL/FCR_FOPAG';
import { RhogaService } from '../../SL/FGR_RHOGA';
import { MdPagService } from '../../SL/FCL_MDPAG';

import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, SelectControlValueAccessor, AbstractControl, Form, Validators } from '@angular/forms';
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
import { FuercModel } from "../../ML/FGR_FUERC";
import { CnenvModel } from "../../ML/FCR_CNENV";
import { DestiModel } from "../../ML/FCR_DESTI";
import { FopagModel } from "../../ML/FCR_FOPAG";
import { RhogaModel } from "../../ML/FGR_RHOGA";
import { PerioModel } from "../../ML/Periodicidad";
import { MdPagModel } from "../../ML/FCL_MDPAG";

import *  as ut from "utf8";
import { FormModule } from 'src/app/form/form.module';
import { tr } from 'date-fns/locale';
import { arrayMax } from 'highcharts';

import {
  MatDialog,

} from '@angular/material/dialog';

import { FgrDeptoComponent } from '../fgr-depto/fgr-depto.component';
import { event } from 'jquery';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-fgr-man-clien',
  templateUrl: './fgr-man-clien.component.html',
  styleUrls: ['./fgr-man-clien.component.scss']
})
export class FgrManClienComponent implements OnInit {

  constructor(
    private SucSer: SucurService,
    private ClSer: ClService,
    private EnteSer: EnteService,
    private PaiSer: PaisService,
    private LuSer: LugnaService,
    private LocSer: LocalService,
    private LocCNBSer: LocalCNBService,
    private EdoSer: EstadoService,
    private MuniSSer: MunicService,
    private TidoSer: TidomService,
    private DirSer: DirecService,
    private EntIdSer: EntIdService,
    private RefSer: RefmiService,
    private CnvSer: CnenvService,
    private FuerSer: FuercService,
    private DestiSer: DestiService,
    private FopSer: FopagService,
    private RhoSer: RhogaService,
    private MdPSer: MdPagService,
    private cook: CookieService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,

    public dialog: MatDialog,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {

    /*
        this.formPost = this.fb.group({
          //PASO 1
          NOM1_ENTE: [''],
          NOM2_ENTE: [''],
          APE1_ENTE: [''],
          APE2_ENTE: [''],
          FEC_NAC: [''],
          TIP_SEX: this.fb.array<SexGenModel>([]),
          DES_SUCUR: this.fb.array<SucurModel>([]),
          DES_LUGNA: this.fb.array<LugnaModel>([]),
          DES_TIPCL: this.fb.array<TipClModel>([]),
          DES_NAC: this.fb.array<PaisModel>([]),
          RFC: [''],
          CURP: ['']
        })*/

    this.formPost = new FormGroup(
      {
        //PASO 1
        NOM1_ENTE: new FormControl('',
          [
            Validators.required,
            Validators.minLength(2)
          ]),

        NOM2_ENTE: new FormControl(''),
        APE1_ENTE: new FormControl('',
          [
            Validators.required,
            Validators.minLength(2)
          ]),

        APE2_ENTE: new FormControl('',
          [
            Validators.required,
            Validators.minLength(2)
          ]),

        FEC_NAC: new FormControl('',
          [
            Validators.required
          ]),

        TIP_SEX: new FormControl(new Array<SexGenModel>(), [
          Validators.required
        ]),

        DES_SUCUR: new FormControl(new Array<SucurModel>(), [
          Validators.required
        ]),
        DES_LUGNA: new FormControl(new Array<LugnaModel>(), [
          Validators.required
        ]),
        DES_TIPCL: new FormControl(new Array<TipClModel>(), [
          Validators.required
        ]),
        DES_NAC: new FormControl(new Array<PaisModel>(), [
          Validators.required,
          Validators.max(5)
        ]),

        RFC: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^[A-Z&Ñ]{3,4}[0-9]{6}[A-V1-9][A-Z0-9]{3}$')
        ]),

        CURP: new FormControl('',
          [
            Validators.required,
            Validators.minLength(18),
            Validators.pattern('^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9]{2}$')
          ])
        // PASO 2

      });

    this.formPost2 = new FormGroup(
      {
        EDO_CIV: new FormControl(new Array<CivModel>(), [
          Validators.required
        ]),

        NIV_ES: new FormControl(new Array<EstuModel>(), [
          Validators.required
        ]),

        NUM_DECLI: new FormControl('', [
          Validators.required,
          Validators.max(5),
          Validators.min(0)
        ]),

        TEL1: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13)
        ]),

        TEL2: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13)
        ]),
        TEL3: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13)
        ]),

        EMAIL: new FormControl('', [
          Validators.required,
          Validators.pattern('^(.+)@(\\S+)$')
        ]),

        NIV_ING: new FormControl(new Array<IngreModel>(), [
          Validators.required
        ]),

        GPO_ECO: new FormControl(new Array<GrusoModel>(), [
          Validators.required
        ]),

        CNB: new FormControl(new Array<AegenModel>(), [
          Validators.required
        ]),

        FEC_INICIO: new FormControl('', [
          Validators.required
        ]),

        //NUEVOS POR CONECTAR
        FUE_REC: new FormControl(new Array(), [
          Validators.required
        ]),

        PRC1: new FormGroup({
          PER: new FormControl(new Array(), [
            Validators.required
          ]),

          SIG: new FormControl(0, [
            Validators.required,
            Validators.min(0)
          ]),
        }),

        PRC2: new FormGroup({
          PER: new FormControl(new Array(), [
            Validators.required
          ]),

          SIG2: new FormControl(0, [
            Validators.required,
            Validators.min(0)
          ]),
        }),

        GAST_MEN: new FormControl(0, [
          Validators.required,
          Validators.min(0)
        ]),

        //pago de credito        
        INS_MON: new FormControl(new Array()),
        APLI_REC: new FormControl(new Array()),
        CAN_ENV: new FormControl(new Array()),

        LGR_OPE: new FormGroup({
          LGRO_ESTDO: new FormControl(new Array()),
          LGRO_MUNIC: new FormControl(new Array()),
        }),

        LGR_ACT: new FormGroup({
          LGRA_ESTDO: new FormControl(new Array<EstadoModel>()),
          LGRA_MUNIC: new FormControl(new Array<MunicModel>()),
          LGRA_ESTDO2: new FormControl(new Array<EstadoModel>()),
          LGRA_MUNIC2: new FormControl(new Array<MunicModel>()),
        }),

        //conocimiento del cliente
        IDEN: new FormGroup({
          PROV_REC: new FormControl(''),
          PROP_REA: new FormControl(''),
          CUEN_TER: new FormControl(''),
        }),

        PROM: new FormControl(),

        OTR_DAT: new FormGroup({
          CAP_DIF: new FormControl(''),
          ACTIV: new FormControl(''),
        }),

        DAT_FON: new FormGroup({
          LEN_IND: new FormControl(''),
          RED_SOC: new FormControl(''),
          US_INT: new FormControl(''),
        }),

        ROL_HOG: new FormControl(''),

      });

    this.formPost3 = new FormGroup
      ({
        CVE_PAIS: new FormControl(new Array<PaisModel>()),
        CVE_ESTDO: new FormControl(new Array<EstadoModel>()),
        CVE_MUNIC: new FormControl(new Array<MunicModel>()),
        LOCALIDAD: new FormControl(new Array<LocalModel>()),
        LOCALCNB: new FormControl(new Array<FldLocalModel>()),
        VIVIENDA: new FormControl(new Array<TidoModel>()),

        CP: new FormControl('', [
          Validators.required
        ]),

        CIUDAD: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150)
        ]),

        COLONIA: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150)
        ]),

        CALLE: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150)
        ]),

        NUM_EXT: new FormControl('', [
          Validators.required,
          Validators.min(1)
        ]),

        NUM_INT: new FormControl('', [
          Validators.required,
          Validators.min(1)
        ]),

        APPOS: new FormControl('', [
          Validators.required,
          Validators.minLength(2)
        ]),

        AÑRES: new FormControl('', [
          Validators.required,
          Validators.min(0),
          Validators.max(100)
        ]),

        REFERENCIAS: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(300)
        ])
      });

    this.formPostIdenti = new FormGroup
      ({

        TIPID: new FormControl(new Array<EntIdModel>()),

        AN_VENC: new FormControl('', [
          Validators.required,
          Validators.min(1700)
        ]),

        FEC_ALT: new FormControl('', [
          Validators.required,
          Validators.min(1700)
        ]),

        NUM_IDENTI: new FormControl('', [
          Validators.required
        ]),

        FOLIO_IDENTI: new FormControl('', [
          Validators.required
        ])

      });


    this.formPostRefmi = new FormGroup(
      {
        NOMBRE: new FormControl('', [
          Validators.required,
          Validators.minLength(2)
        ]),

        TEL: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13)
        ]),

        DIREC: new FormControl('', [
          Validators.required,
          Validators.minLength(50)
        ]),

        AN_CON: new FormControl('', [
          Validators.required,
          Validators.max(150),
          Validators.min(0)
        ]),

        CVE_RESP: new FormControl(new Array),
        COMEN: new FormControl('')
      });
  }


  //Manejo de mensaje de errores.

  errorHandle(field: string, form: FormGroup): boolean | null {

    if (!form.controls[field]) return null;

    return form.controls[field].errors
      && form.controls[field].touched;
  }

  textError(field: string, form: FormGroup): string {

    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {

      switch (key) {

        case 'required':
          return '*Este campo es obligatorio.';

        case 'minlength':
          return `*Este campo requiere un mínimo de ${errors['minlength'].requiredLength} caracteres`;

        case 'pattern':
          return '*Formato no válido.';

        case 'max':
          return `*Este campo admite un valor máximo ${errors['max'].max} elementos`;

        case 'min':
          return `*Este campo admite un valor mínimo de ${errors['min'].min} elementos`;
      }
    }

    return null;
  }

  // Variables
  public formPost: FormGroup
  public formPost2: FormGroup
  public formPost3: FormGroup
  public formPostIdenti: FormGroup
  public formPostRefmi: FormGroup
  public ente: EnteModel
  public direc: DirecModel
  public entid: EntIdModel
  public refmi: RefmiModel
  public fopag: FopagModel
  public cnen: CnenvModel
  public fuerc: FuercModel
  public desti: DestiModel
  public rhog: RhogaModel
  public mdpag: MdPagModel
  public perio1: PerioModel
  public perio2: PerioModel
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
  public EstadoSelectOp = new EstadoModel()
  public MunicSelectOp = new MunicModel()
  public EstadoSelectAc = new EstadoModel()
  public MunicSelectAc = new MunicModel()
  public LocalidadSelect = new LocalModel()
  public LocalCNBSelect = new FldLocalModel()
  public ViviendaSelect = new TidoModel()
  public FuercSelect = new FuercModel()
  public CnvenSelect = new CnenvModel()
  public DestiSelect = new DestiModel()
  public FopaSelect = new FopagModel()
  public EntIdSelect = new EntIdModel()
  public RhogaSelect = new RhogaModel()
  public Perio1Select = new PerioModel()
  public Perio2Select = new PerioModel()

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

  public errorBanner: boolean = false;

  ngOnInit(): void {
    this.contadorGuardadoSelectores = 0;
    $('#next-btn').prop('disabled', true);

    this.ente = new EnteModel();
    this.direc = new DirecModel();
    this.entid = new EntIdModel();
    this.refmi = new RefmiModel();
    this.cnen = new CnenvModel();
    this.desti = new DestiModel();
    this.fopag = new FopagModel();
    this.fuerc = new FuercModel();
    this.rhog = new RhogaModel()

    this.perio1 = new PerioModel();
    this.perio2 = new PerioModel();
    this.mdpag = new MdPagModel();

    this.LlenarListas();
    this.LlenarLista2();

    $.getScript('./assets/plugins/smartwizard/dist/js/jquery.smartWizard.min.js');
    $.getScript('./assets/js/custom-smartWizard.js');
    $.getScript('./assets/plugins/select2/select2.min.js');
    $.getScript('./assets/js/custom-select2.js');
    $.getScript('./assets/js/form-validations.js');
    $.getScript('./assets/js/bs-custom-file-input.min.js');
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
    this.GetCnenv()
    this.GetDesti()
    this.GetFopag()
    this.GetFuerc()
    this.GetRhoga()
    this.GetPeriod()
  }

  // SECCIÓN PROYECCIÓN DE DATOS
  GetSucurs() {
    this.SucSer.GetSucurs(this.contadorGuardadoSelectores, this.SucurSelect)
      .subscribe(result => {

        if (result.Correct) {
          this.ente.Sucur.Sucurs = result.Objects
        } else {
          console.log("Error obteniendo sucursales:", result.ErrorMessage)
        }
      })
  }

  GetTipCl() {
    this.ClSer.GetTipCl(this.contadorGuardadoSelectores, this.ClienSelect)
      .subscribe(result => {
        if (result.Correct) {
          this.ente.TipCl.TipCls = result.Objects
        } else {
          console.log("Error obteniendo tipo cliente:", result.ErrorMessage)
        }
      })
  }

  GetPais() {
    this.PaiSer.GetPais(this.contadorGrusos, this.PaisSelect)
      .subscribe(result => {
        if (result.Correct) {
          this.ente.Pais.Paises = result.Objects
          this.direc.Pais.Paises = result.Objects
        } else {
          console.log("Error obteniendo país:", result.ErrorMessage)
        }
      })
  }

  GetLugna() {
    this.LuSer.GetLugna(this.contadorGuardadoSelectores, this.LugnaSelect)
      .subscribe(result => {
        if (result.Correct) {
          this.ente.Lugna.Lugnas = result.Objects
        }
      })
  }

  GetSexGen() {
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
    this.EnteSer.GetNives(this.contadorGuardadoSelectores, this.NivesSelect)
      .subscribe(result => {
        if (result.Correct) {
          this.ente.Nives.Estus = result.Objects
        }
      })
  }

  GetEdoCi() {
    this.EnteSer.GetEdoCi(this.contadorGuardadoSelectores, this.EdoCivSelect)
      .subscribe(result => {
        if (result.Correct) {
          this.ente.EdoCi.EdoCivs = result.Objects
        }
      })
  }

  GetNivIng() {
    this.EnteSer.GetNivIngOb()
      .subscribe(result => {
        if (result.Correct) {
          this.ente.Ingr.Ingres = result.Objects
        }
      })
  }

  GetRhoga() {
    this.RhoSer.GetRhoga()
      .subscribe(result => {
        if (result.Correct) {
          this.rhog.Rhogas = result.Objects
        }
      })
  }

  GetPeriod() {
    this.perio2.Perios = new Array<PerioModel>();
    this.perio1.Perios = new Array<PerioModel>();
    let Pmo = new PerioModel()
    Pmo.Cve = 0;
    Pmo.Des = "Ninguno";
    this.perio1.Perios.push(Pmo)
    this.perio2.Perios.push(Pmo)

    Pmo = new PerioModel()
    Pmo.Cve = 1;
    Pmo.Des = "Diario";
    this.perio1.Perios.push(Pmo)
    this.perio2.Perios.push(Pmo)

    Pmo = new PerioModel()
    Pmo.Cve = 2;
    Pmo.Des = "Semanal";
    this.perio1.Perios.push(Pmo)
    this.perio2.Perios.push(Pmo)

    Pmo = new PerioModel()
    Pmo.Cve = 3;
    Pmo.Des = "Quincenal";
    this.perio1.Perios.push(Pmo)
    this.perio2.Perios.push(Pmo)

    Pmo = new PerioModel()
    Pmo.Cve = 4;
    Pmo.Des = "Mensual";
    this.perio1.Perios.push(Pmo)
    this.perio2.Perios.push(Pmo)

    Pmo = new PerioModel()
    Pmo.Cve = 5;
    Pmo.Des = "Único";
    this.perio1.Perios.push(Pmo)
    this.perio2.Perios.push(Pmo)

    this.Perio1Select = this.perio1.Perios[0]
    this.Perio2Select = this.perio2.Perios[0]
  }

  GetGruso() {
    this.EnteSer.GetGrusoOb()
      .subscribe(result => {
        if (result.Correct) {
          this.ente.Gruso.Grusos = result.Objects
        }
      })
  }

  GetAegen() {
    this.EnteSer.GetAegen()
      .subscribe(result => {
        if (result.Correct) {
          this.ente.Aegen.Aegens = result.Objects
        }
      })
  }

  GetEstado() {
    this.EdoSer.GetEstado()
      .subscribe(result => {
        if (result.Correct) {
          this.direc.Estado.Estados = result.Objects;
          this.mdpag.EstadoAc.Estados = result.Objects;
          this.mdpag.EstadoOp.Estados = result.Objects;
        }
      })
  }

  GetMunicipio(EdoProv: EstadoModel) {
    this.MuniSSer.GetMunicipio(EdoProv)
      .subscribe(result => {
        if (result.Correct) {
          this.direc.Municipio.Municipios = result.Objects;
          this.mdpag.MunicOp.Municipios = result.Objects
          this.mdpag.MunicAc.Municipios = result.Objects
        }
      })
  }

  GetMunicipioM(EdoProv: EstadoModel, n: number) {
    this.MuniSSer.GetMunicipioM(EdoProv)
      .subscribe(result => {
        if (result.Correct) {

          if (n = 1) {
            //this.MunicSelectOp = MunInicio
            this.mdpag.MunicOp.Municipios = result.Objects
          }

          if (n = 2) {
            //this.MunicSelectAc = MunInicio
            this.mdpag.MunicAc.Municipios = result.Objects
          }

        }
      })
  }

  GetLocalidad(MuniProv: MunicModel) {
    this.LocSer.GetLocalidad(MuniProv)
      .subscribe(result => {
        if (result.Correct) {
          this.direc.Localidad.Localidades = result.Objects;
        }
      })
  }

  GetLocalidadCNB(MunicCons: MunicModel) {
    this.LocCNBSer.GetLocalidadCNB(MunicCons)
      .subscribe(result => {
        if (result.Correct) {
          this.direc.LocalCNB.FLDLocalis = result.Objects;
        }
      })
  }

  GetVivienda() {
    this.TidoSer.GetVivienda()
      .subscribe(result => {
        if (result.Correct) {
          this.direc.Vivienda.Tidoms = result.Objects
        }
      })
  }

  GetTipId() {
    this.EntIdSer.GetTipId2()
      .subscribe(result => {
        if (result.Correct) {
          this.entid.TipIds = result.Objects
        }
      })
  }

  GetIdenti() {
    this.EntIdSer.GetIdenti(this.entid)
      .subscribe(result => {
        if (result.Correct) {
          this.entid.EntIds = result.Objects;
        }
      })
  }

  GetRefmi() {
    this.RefSer.GetRefmi(this.refmi)
      .subscribe(result => {
        if (result.Correct) {
          this.refmi.Refs = result.Objects
        }
      })
  }

  GetDirecsByEnte() {
    this.DirSer.GetDirecsByEnte(this.direc)
      .subscribe(result => {
        if (result.Correct) {
          this.direc.Direcciones = result.Objects
        }
      })
  }

  GetFuerc() {
    this.FuerSer.GetFuerc()
      .subscribe(result => {
        if (result.Correct) {
          this.fuerc.Fuercs = result.Objects
        }
      })
  }

  GetFopag() {
    this.FopSer.GetFopag()
      .subscribe(result => {
        if (result.Correct) {
          this.fopag.Fopags = result.Objects
        }
      })
  }

  GetDesti() {
    this.DestiSer.GetDesti()
      .subscribe(result => {
        if (result.Correct) {
          this.desti.Destis = result.Objects
        }
      });
  }

  GetCnenv() {
    this.CnvSer.GetCnenv()
      .subscribe(result => {
        if (result.Correct) {
          this.cnen.Cnenvs = result.Objects
        }
      })
  }

  GetUti() {
    this.mdpag.Pagcu1 = this.Perio1Select
    this.mdpag.Pagcu2 = this.Perio2Select
    this.mdpag.Pagcu1.Sig = this.formPost2.controls['SIG'].value
    this.mdpag.Pagcu2.Sig = this.formPost2.controls['SIG2'].value
    this.mdpag.Mon_Gasto = this.formPost2.controls['GAST_MEN'].value
    this.MdPSer.GetUtil(this.mdpag).subscribe((r) => {
      this.imprimirdef = r;
      if (this.imprimirdef != null) {
        this.mdpag.Mon_Util = this.imprimirdef.UTIL;
        this.mdpag.Mon_PrePa = this.imprimirdef.PREPA;
        this.mdpag.Mon_LiqAn = this.imprimirdef.LIQA;
        this.mdpag.Mon_Umbra = this.imprimirdef.UMBR;
      }
    })
  }

  // ASIGNACIÓN DE VARIABLES Y FORMS
  Form() {
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
    this.ente.Pais.Cve_Pais = 1;
    this.ente.Lugna.Cve_Lugna = 1;
    this.ente.Sucur.Cve_Sucur = 1;
    this.ente.TipCl.Cve_TipCl = 1
    this.EnteSer.Validacion(this.ente).subscribe((r) => {

      console.log('bandera')

      console.log(r);
      this.imprimirdef = r;
      console.log(this.imprimirdef.BAN)

      if (this.imprimirdef.BAN == true) {
        $('#next-btn').prop('disabled', false);
        this.LlenarLista2();

        this.errorBanner = false;
        
      } else {

        for (let x of this.imprimirdef.Errores) {
          CadenaMsg += x.DES_TERROR + ". "
        }

        this.msg.message = CadenaMsg + "  " + this.imprimirdef.Mensaje; this.mostrarModal = true;
        this.errorBanner = true;
        //alert(this.msg.message)
      }

      this.ente.Num_Ente = this.imprimirdef.Numero;
      this.ente.RFC = this.imprimirdef.RFC;
      this.ente.CURP = this.imprimirdef.CURP
    })

    this.contadorGuardadoSelectores = 1;
    this.LlenarListas();
  }
  Form2() {

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

    //NUEVOS CONECTADOS PENDIENTES POR FORMULARIOS Y CLASES PROPI@S
    this.mdpag.Fuerc = this.FuercSelect
    this.mdpag.Pagcu1 = this.Perio1Select
    this.mdpag.Pagcu2 = this.Perio2Select
    this.mdpag.EstadoOp = this.EstadoSelectOp
    this.mdpag.EstadoAc = this.EstadoSelectAc
    this.mdpag.MunicOp = this.MunicSelectOp
    this.mdpag.MunicAc = this.MunicSelectAc
    this.mdpag.Cnenv = this.CnvenSelect
    this.mdpag.AplRc = this.DestiSelect
    this.mdpag.MdPag = this.FopaSelect
    this.mdpag.Ente = this.ente
    this.mdpag.Fec_MdPag = "" + new Date()

    this.mdpag.Pagcu1.Sig = this.formPost2.controls['PRC1'].value
    this.mdpag.Pagcu2.Sig = this.formPost2.controls['PRC2'].value
    this.mdpag.Mon_Gasto = this.formPost2.controls['GAST_MEN'].value

    //FIN
    this.contadorGrusos = 0;
    this.EnteSer.MaPaso2(this.ente).subscribe((r) => { console.log(r) }, (e) => { console.log(e) })

  }
  Form3() {
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
  FormIdenti() {
    this.entid.Ente = this.ente;

    this.entid.An_Venci = this.formPostIdenti.controls['AN_VENC'].value;
    this.entid.Fec_AddRec = this.formPostIdenti.controls['FEC_ALT'].value;
    this.entid.Num_Identi = this.formPostIdenti.controls['NUM_IDENTI'].value;
    this.entid.Cve_Identi = this.formPostIdenti.controls['FOLIO_IDENTI'].value;

    this.EntIdSer.Add(this.entid).subscribe()

    this.GetIdenti()
  }
  FormRefmi() {
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
  CambioEstadoM(newEstado, n) {
    if (n = 1) {
      this.EstadoSelectOp = newEstado
      this.formPost2.setControl('LGRO_ESTDO', new FormControl(this.EstadoSelectOp))
      let EdoEnvio = new EstadoModel()
      EdoEnvio = this.EstadoSelectOp;
      EdoEnvio.Pais.Cve_Pais = 1
      this.GetMunicipioM(EdoEnvio, 1)
    }
    if (n = 2) {
      this.EstadoSelectAc = newEstado
      this.formPost2.setControl('LGRO_ESTDO2', new FormControl(this.EstadoSelectAc))
      let EdoEnvio = new EstadoModel()
      EdoEnvio = this.EstadoSelectAc;
      EdoEnvio.Pais.Cve_Pais = 1
      this.GetMunicipioM(EdoEnvio, 2)
    }
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
  CambioMunicipioM(newMunicipio, n) {
    if (n = 1) {
      this.MunicSelectOp = newMunicipio
      this.formPost2.setControl('LGRA_MUNIC', new FormControl(this.MunicSelectOp))

    }
    if (n = 2) {
      this.MunicSelectAc = newMunicipio
      this.formPost2.setControl('LGRA_MUNIC2', new FormControl(this.MunicSelectAc))

    }
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
  CambioCNENV(newCnenv) {
    this.CnvenSelect = newCnenv;
  }
  CambioDesti(newDesti) {
    this.DestiSelect = newDesti;
  }
  CambioInstr(newInstr) {
    this.FopaSelect = newInstr;
  }
  CambioRecursos(newRecu) {
    this.FuercSelect = newRecu;
  }
  CambioRhoga(newRhoga) {
    this.RhogaSelect = newRhoga;
  }
  CambioPer1(newPer1) {
    this.Perio1Select = newPer1
  }
  CambioPer2(newPer2) {
    this.Perio2Select = newPer2
  }

  // FUNCIONES SELECCIÓN MÚLTIPLE
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