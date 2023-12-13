import { MunicModel } from "./FGR_MUNIC";
import { EstadoModel } from "./FGR_ESTDO";
import { PaisModel } from "./FGR_PAIS";
export class LocalModel
{
    Cve_Local : number
    Nom_Local : string

    Localidades: Array<LocalModel>
    Pais = new PaisModel()
    Estado = new EstadoModel()
    Municipio = new MunicModel()
}