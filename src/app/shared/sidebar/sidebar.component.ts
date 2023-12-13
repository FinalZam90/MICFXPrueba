import { Component, Input, OnInit } from '@angular/core';
import { RouteInfo } from './sidebar.metadata';
import { FADGrupr } from "../../ML/Gupr";
import { Login } from "../../ML/Login";
import { SignInComponent } from "../../auth/sign-in/sign-in.component";
import { j } from './sidebar-routes.config';
import {GruprService  } from "../../SL/FAD_GRUPR";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';
import { SidebarService } from "./sidebar.service";
import { DefaultComponent } from "../../dashboard/default/default.component";
import * as $ from 'jquery';
import { newArray } from '@angular/compiler/src/util';
import { empty } from 'rxjs';
import { de, id } from 'date-fns/locale';
import { CookieService } from "ngx-cookie-service";


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})

export class SidebarComponent{
    
    public menuItems: any[];
    public ComposArray: any[];
    public imprimir:any;
    public Routes?:RouteInfo[] = [];
    public Routes2?:object[] = new Array();
    public Route:RouteInfo;
    public def= new DefaultComponent(this.route, this.cook, this.router);
    public gg:any[];
    public url:string
    public ResProce:any; 
    public Id:any;
    constructor( public sidebarservice: SidebarService,private route: ActivatedRoute,private router: Router, public prueba:GruprService, private cook: CookieService) {
        
        router.events.subscribe( (event: Event) => {

            if (event instanceof NavigationStart) {
                // Show loading indicator
            }

            if (event instanceof NavigationEnd && $(window).width() < 1025 && ( document.readyState == 'complete' || false ) ) {

                this.toggleSidebar();
                // Hide loading indicator
               
            }

            if (event instanceof NavigationError) {
                // Hide loading indicator

                // Present error to user
                console.log(event.error);
            }
        });

    }

        
    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
        
        if ($(".wrapper").hasClass("nav-collapsed")) {
            // unpin sidebar when hovered
            $(".wrapper").removeClass("nav-collapsed");
            $(".sidebar-wrapper").unbind( "hover");
        } else {
            $(".wrapper").addClass("nav-collapsed");
            $(".sidebar-wrapper").hover(
                function () {
                    $(".wrapper").addClass("sidebar-hovered");
                },
                function () {
                    $(".wrapper").removeClass("sidebar-hovered");
                }
            )
      
        }

    }

    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }
    

    ngOnInit(Cve:any) 
    {
        
        
        const url2 = this.router.url;
        this.url = this.route['_routerState'].snapshot.url
        let Cadena = this.url.split('/')
        /*
        console.log(url2)
        let Cadena2 = Cadena[3].split(':')
        let Cv1 = Cadena2[1].split('')
        let Cv2 = Cadena2[2].split('')
        let Cv3 = Cadena2[3].split('')
        let CVE = Cv1[1] + Cv2[1] + Cv3[1]
        */
        let CVE = Cadena[1]
        this.Id = CVE
        
        console.log(this.Id)
       
        this.prueba.GetAll(this.Id).subscribe((r) => 
        {
            this.ResProce = r;
            
            console.log(r)
            for (let index of this.ResProce)
            {
                
                
                for(let index2 of index.Proces)
                {
                    let Rut : RouteInfo={path: '', title: '', icon:'', class: 'sub', badge:'', badgeClass: '', isExternalLink: false, submenu:[]}
                    
                    for(let index3 of index2.SubProces)
                    {
                        let Rut2 : RouteInfo={path: '', title: '', icon:'', class: '', badge:'', badgeClass: '', isExternalLink: false, submenu: []}
                        
                        Rut2.title= index3.NOM_SUBPR;
                    
                        for(let index4 of index3.Compos)
                        {
                            Rut2.path = Cadena[1] + index4.NOM_PATH;
                            Rut2.icon = index4.DES_ICON;
                            
                            
                        }
                        let a = Rut.submenu.push(Rut2);
                        console.log(a)
                    }
                    
                    Rut.title = index2.NOM_PROCE;
                    Rut.icon = index2.DES_ICON;
                    let b = this.Routes.push(Rut);
                    console.log(b)
                }
                
                
                
            }
                
            this.menuItems = this.Routes.filter(menuItem => menuItem);
            console.log(this.menuItems);
        }  );
       
        

        
        $.getScript('./assets/js/app-sidebar.js');

    }
    public jjh()
    {
        
        
        return this.Routes;
        
    }

}
