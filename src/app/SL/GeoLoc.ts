import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { GeoModel } from "../ML/GeoLoc";
import { Result } from "../ML/Result";
import { Observable } from "rxjs";


export class Loca
{
    public http: HttpClient
    public get(V = navigator.geolocation) : Result
    {
        let result = new Result()
        let Gps = new GeoModel()
        
        if (V != null) 
        {
            navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => 
            {
                console.log(position); 
                Gps.Latitud = position.coords.latitude; 
                Gps.Longitud = position.coords.longitude; 
                Gps.Ip=''
                result.Correct = true; 
                result.Object = Gps 
                
            }, 
                (err: GeolocationPositionError) => 
                {
                    let msg;
                    switch(err.code) {
                        case err.PERMISSION_DENIED:
                            msg = "No nos has dado permiso para obtener tu posición";
                            break;
                        case err.POSITION_UNAVAILABLE:
                            msg = "Tu posición actual no está disponible";
                            break;
                        case err.TIMEOUT:
                            msg = "No se ha podido obtener tu posición en un tiempo prudencial";
                            break;
                        default:
                            msg = "Error desconocido";
                            break;
                }
                Gps.Latitud = 0
                Gps.Longitud = 0
                Gps.Ip = ''
                result.Object = Gps
                result.ErrorMessage = msg; 
                result.Correct = false;
                
            });
        }
        return result
    }
    
}