import { EstadoModel } from "./FGR_ESTDO";
import { MunicModel } from "./FGR_MUNIC";
import { FuercModel } from "./FGR_FUERC";
import { CnenvModel } from "./FCR_CNENV";
import { PerioModel } from "./Periodicidad";
import { DestiModel } from "./FCR_DESTI";
import { FopagModel } from "./FCR_FOPAG";
import { EnteModel } from "./FCL_ENTE";
export class MdPagModel
{
    
    Fec_MdPag: string;
    Mon_LiqAn: number;
    Mon_Gasto: number;
    Mon_PrePa: number;
    Mon_Util: number;
    Mon_Umbra: number;
    
    AplRc = new DestiModel();
    Ente = new EnteModel();
    Cnenv = new CnenvModel();
    MdPag = new FopagModel();
    Pagcu1 = new PerioModel();
    Pagcu2 = new PerioModel();
    EstadoOp = new EstadoModel();
    MunicOp = new MunicModel();
    EstadoAc = new EstadoModel();
    MunicAc = new MunicModel();
    Fuerc = new FuercModel();
}