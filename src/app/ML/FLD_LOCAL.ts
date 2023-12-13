import { EstadoModel } from "./FGR_ESTDO";
import { MunicModel } from "./FGR_MUNIC";
import { PaisModel } from "./FGR_PAIS";
import { LocalModel } from "./FGR_LOCAL";
export class FldLocalModel
{
    Cve_LoPLD: number
    Des_LoPLD: string

    FLDLocalis: Array<FldLocalModel>

    Estado = new EstadoModel()
    Municipio = new MunicModel()
    Pais = new PaisModel()
    Localidad = new LocalModel()
}