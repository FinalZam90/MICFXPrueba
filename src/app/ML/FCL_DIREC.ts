import { PaisModel } from "./FGR_PAIS";
import { MunicModel } from "./FGR_MUNIC";
import { EstadoModel } from "./FGR_ESTDO";
import { LocalModel } from "./FGR_LOCAL";
import { TidoModel } from "./FCL_TIDOM";
import { FldLocalModel } from "./FLD_LOCAL";
import { EnteModel } from "./FCL_ENTE";
export class DirecModel
{
    Cve_CP : number
    Des_Ciuda: string
    Nom_Colon: string
    Des_Calle: string
    Num_Ext: number
    Num_Int: number
    Num_Appos: number
    Num_Resen: number
    Num_Cpent: string
    LMunicipioLMunicipio
    Direcciones: Array<DirecModel>
    Ente = new EnteModel()
    Pais = new PaisModel()
    Estado = new EstadoModel()
    Municipio = new MunicModel()
    Localidad = new LocalModel()
    LocalCNB = new FldLocalModel()
    Vivienda = new TidoModel()
}