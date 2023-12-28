import { EnteModel } from "./FCL_ENTE";
export class RefmiModel
{
    Nom_Refer: string;
    Des_Dirre: string;
    Contador: number;
    Num_AnoCo: number;
    Cve_Respr = new Array<number>(4);
    Des_Comen: string;
    Num_TelRe: string;
    Ente = new EnteModel();
    Refs: Array<RefmiModel>

}