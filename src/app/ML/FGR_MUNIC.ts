import { EstadoModel} from "./FGR_ESTDO";
import { PaisModel } from "./FGR_PAIS";
export class MunicModel
{
    Cve_Munic: number
    Nom_Munic: string

    Municipios: Array<MunicModel>
    Pais = new PaisModel()
    Estado = new EstadoModel()
}