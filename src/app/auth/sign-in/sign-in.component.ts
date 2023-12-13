import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { GruprService } from "../../SL/FAD_GRUPR";
import { Movi1Service } from "../../SL/FGR_MOVI1";
import { Loca } from "../../SL/GeoLoc";
import { Ips } from "../../SL/Ip";
import { Login } from "../../ML/Login";
import { Result } from "../../ML/Result";
import { GeoModel } from "../../ML/GeoLoc";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { useAnimation } from '@angular/animations';
import { Movi1Model } from "../../ML/MOVI1";
import { QuejaService } from "../../SL/FGR_QUEJAS";
import { ms } from 'date-fns/locale';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements AfterViewInit, OnInit
{

    constructor(private router: Router, private route: ActivatedRoute, public Gru: GruprService, public Movi1: Movi1Service, public Ips1: Ips, public Queja: QuejaService ) { }
    public Usuar:Login = {Cve_Usuar: '', Password: '', Emp: ''};
    public formLogin = new FormGroup({CVE_USUAR: new FormControl(''), PASSWORD: new FormControl(''), EMP: new FormControl('')});
    public resDep: any;
    public Side:SidebarComponent;
    public BL = new Loca()
    public V:any
    public Ip = ''
    public result = new Result()
    public imp: any
    public Mensaje: string
    public EnviaQueja()
    {
      let P1 = $('#TextArea1').val();
      console.log(P1)
      this.Queja.Form(P1.toString()).subscribe((r) => {this.imp = r; console.log(this.imp)})
      
    }
    public Vaciado()
    {
      $('#TextArea1').val("")
    }
    mostrarPassword(): any 
    {
      var tipo = document.getElementById("inputChoosePassword") as HTMLInputElement | null;
      if(tipo.type == "password"){
          tipo.type = "text";
      }else{
          tipo.type = "password";
      }
    }
    // On Forgotpassword link click
    onForgotpassword() 
    {
      this.router.navigate(['forgot-password'], { relativeTo: this.route.parent });
    }
  
    // On Signup link click
    onSignup() {
      this.router.navigate(['sign-up'], { relativeTo: this.route.parent });
    }
  
    Form():any
    {
      
      this.BL = new Loca()
      
      
      this.result = this.BL.get(this.V)
      
      let XD = new GeoModel()
      
      this.Ips1.GetIp().subscribe((s) => {console.log(s.query); this.Ip = s.query}, (e)=> { console.error(e)})
      this.Usuar.Cve_Usuar = this.formLogin.controls["CVE_USUAR"].value;
     
      let Cadena;
      
      let CV;
      Cadena = this.Usuar.Cve_Usuar.split('');
        //CV = Cadena[0];
      CV = 1;
      this.Usuar.Password = this.formLogin.controls["PASSWORD"].value;
      this.Usuar.Emp = this.formLogin.controls["EMP"].value;
      this.Gru.Login(this.Usuar).subscribe((r) => {console.log(r);
        this.resDep = r;
        if(this.resDep == null)
        {
          this.Mensaje = "Empresa no válida"
          alert(this.Mensaje)
        }
        else
        {
      let Hora = new Date().getHours()
      let Minuto = new Date().getMinutes()
      let Minutos = (Hora * 60) + Minuto

      XD = this.result.Object
      let Mov = new Movi1Model()
      Mov.Cve_Usuar = this.Usuar.Cve_Usuar;
      Mov.Message.message = this.resDep.Mensaje
      this.Mensaje = this.resDep.Mensaje
      Mov.Cve_Oracs = "WEB"
      Mov.Num_Hora = Minutos
      Mov.Latitud = XD.Latitud
      Mov.Ip = this.Ip
      Mov.Longitud = XD.Longitud
      Mov.Des_Panta = "Login"
      this.Movi1.Login(Mov).subscribe((w) => {console.log(w)})
      if(this.resDep.Código != 0)
      {
        if(this.resDep.Código == true)
        {
          if(this.result.Correct == true)
          {
            this.Usuar.Emp = this.resDep.Empresa
            this.Gru.Cookie(this.Usuar)
            //this.router.navigate(['/dashboard/default/:!'+Cadena[0]+'ñPO?O1!i|y1x3dr:!'+Cadena[1]+'$&gI!UY!=)|¿hg:!'+Cadena[2]]);
            this.router.navigateByUrl(this.Usuar.Cve_Usuar+'/dashboard/default');
            
          }
          else
          {
            alert(this.result.ErrorMessage)
            window.location.reload()
          }
        }
        else
        {
          alert(this.Mensaje)
        }
      }
      else
      {
        alert(this.Mensaje)
      }
    }});
      
    }
    
    ngAfterViewInit(): void 
    {
      this.V = navigator.geolocation
      let x = "XCG"
      this.BL.get(this.V)
    
      
      
    }
    ngOnInit(): void 
    {
      this.router.initialNavigation()
    }
  public counter = 1;
  public Timer() 
  {
    
    let intervalId = setInterval(() => 
    {
      console.log(this.counter)  
      this.counter = this.counter - 1;
            
      if(this.counter === 0)
      { 
        
        let result = new Result()
        
        let V = navigator.geolocation
        
        result = this.BL.get(V)
        if(result.Correct == false)
        {
          alert(result.ErrorMessage)
          window.location.reload()
        }
        clearInterval(intervalId)
      }
    }, 1000)
    
  }

}

