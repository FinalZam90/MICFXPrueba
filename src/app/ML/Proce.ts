import { FGRSubProce } from "./SubProce";
export class FGRProce{
    Cve_Proce: string;
    Des_Icon: string;
    Nom_Proce: string;
    Dep_Proce: boolean;
    Ban_Wrflw: boolean;
    Ban_Activo: boolean;
    Cve_Orden: number;
    Des_WebAp: string;

    SubProces: FGRSubProce;
    Proces: FGRProce[];
}
