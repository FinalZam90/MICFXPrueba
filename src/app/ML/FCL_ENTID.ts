import { EnteModel } from "./FCL_ENTE";
export class EntIdModel
{
    Cve_TipId: number;
    Num_Identi: number;
    Fec_AddRec: string;
    Fec_Venci: string;
    Cve_Identi: string;
    Des_Identi: string;
    An_Venci: number
    Ente = new EnteModel();
    EntIds: Array<EntIdModel>
    TipIds: Array<EntIdModel>
}