import { Component, OnInit } from '@angular/core';
import { SucurService } from "../../SL/FGR_SUCUR";
import { EnteService } from "../../SL/FCL_ENTE";
import { UsuarService } from "../../SL/FAD_USUAR";
import { GrusuService } from "../../SL/FAD_GRUSU";
import { UsuarModel } from "../../ML/FAD_USUAR";
import { CookieService } from "ngx-cookie-service";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-fad-con-usuar',
  templateUrl: './fad-con-usuar.component.html',
  styleUrls: ['./fad-con-usuar.component.scss']
})
export class FadConUsuarComponent implements OnInit {

  constructor(private SucSer: SucurService, private EntSer: EnteService, private UsuSer:UsuarService, private GruSer: GrusuService, private cook: CookieService) { }
  public llenarSucus: any;
  public llenarGrusu: any;
  public formGet = new FormGroup({NOM_USUAR: new FormControl('') });
  public usuar:any
  ngOnInit(): void 
  {
    this.SucSer.GetAll().subscribe((r) => {this.llenarSucus = r}, (e) => {console.log(e)})
    this.UsuSer.GetAll().subscribe((r) => {this.usuar = r, console.log(r)}, (e) => {console.log(e)})
    this.GruSer.GetAll().subscribe((r) => {this.llenarGrusu = r}, (e) => {console.log(e)})
  }
  GetByParams()
  {
    let usuario = new UsuarModel()
   
    var x=document.getElementsByTagName("select")[0].value;
    
    usuario.Cve_Sucur= Number(document.getElementsByClassName(x)[0].id);
    var y=document.getElementsByTagName("select")[1].value;
    usuario.Cve_Grusu= Number(document.getElementsByClassName(y)[0].id);
    usuario.Nom_Usuar = $("#P").val().toString()
    //var nombre = this.formGet?.controls['NOM_USUAR'].value?.toString();
    console.log(usuario.Cve_Grusu, usuario.Cve_Sucur)
    this.UsuSer.GetBy(usuario).subscribe((r) => {this.usuar = r, console.log(r)}, (e) => {console.log(e)})
  }

}
