import { EnteModel } from "./FCL_ENTE";
import { Depto } from "./FGR_DEPTO";
import { GrusuModel } from "./FAD_GRUSU";
import { SucurModel } from "./FGR_SUCUR";
export class UsuarModel
{
    Cve_Usuar: string
    Cve_Sucur : number
    Cve_Grusu: number
    Nom_Usuar?: string
    Des_Cargo: string;
    Num_Tel: string;
    Pass_Cad: number;
    Pass_1: string
    Path: string
    Pass_2: string
    Ban_Bloq: boolean
    Ban_Inac: boolean
    Num_Nivel: number
    Emp: string
    Ente = new EnteModel()
    Depto1 = new Depto()
    Sucur = new SucurModel()
    Grusu = new GrusuModel()
    Usuars: Array<UsuarModel>
}