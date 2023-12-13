import { PaisModel } from "./FGR_PAIS";
export class EstadoModel
{
    Cve_Estdo: number
    Nom_Estdo: string
    Nom_Abrev: string
    
    Estados: Array<EstadoModel>
    Pais = new PaisModel()
}