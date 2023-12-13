import { SucurModel } from "./FGR_SUCUR";
import { SexGenModel } from "./TipSex";
import { PaisModel } from "./FGR_PAIS";
import { LugnaModel } from "./FGR_LUGNA";
import { TipClModel } from "./FCL_TIPCL";
import {CivModel} from "./EdoCiv";
import { EstuModel } from "./NivEstu";
import { AegenModel } from "./FCR_AEGEN";
import { GrusoModel } from "./FCL_GRUSO";
import { IngreModel } from "./NivIngreso";
export class EnteModel
{
    Num_Ente: number
    Nom_Com: string
    Nom_Ente1: string
    Nom_Ente2: string
    Nom_Ente3: string
    Ape_Ente1: string
    Ape_Ente2: string
    Ape_Ente3: string
    Fec_Nac: string
    Fec_Na2: Date
    Fec_Inicio: string
    RFC: string
    CURP: string
    Email: string
    NumDependientes: number
    Tel_1: string
    Tel_2: string
    Tel_3: string
    Ban_PvRec: boolean
    Ban_ProRe: boolean
    Ban_CtaTe: boolean
    Ban_Paral: boolean
    Ban_Activ: boolean
    Num_Lirpe: number
    Ingr = new IngreModel()
    Gruso = new GrusoModel()
    Aegen = new AegenModel()
    EdoCi = new CivModel()
    Nives = new EstuModel()
    Pais = new PaisModel()
    Lugna = new LugnaModel()
    SexGen = new SexGenModel()
    Sucur = new SucurModel()
    TipCl = new TipClModel()
    Entes: Array<EnteModel>
}