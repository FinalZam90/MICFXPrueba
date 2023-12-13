import { Messg } from "../ML/Message";
export class Movi1Model
{
    Cve_Oracs : string;
    Cve_Opera: number;
    Fec_Movim: string
    Latitud: number;
    Longitud: number;
    Ip: string
    Cve_Usuar : string
    Num_Hora: number
    Num_Hora2: string
    Message =  new Messg()
    Des_Panta:string
    Des_Tabla:string
    Des_Movi1?:string
    Movis? = new Array<Movi1Model>();
}