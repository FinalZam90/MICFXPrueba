import { Component , OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { Location, formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ModfeService } from "../../SL/FGR_MODFE";
import { CookieService } from "ngx-cookie-service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{

    
    default : any;
    public url:string
    public usuar: string
    public emp: string
    public FechaHoy: string
    public FechaCorte: string;

    constructor(public sidebarservice: SidebarService, location: Location, router: Router, private route: ActivatedRoute, private Mod: ModfeService, private cook: CookieService) {

        router.events.subscribe((val) => {
            if(location.path() == '/dashboard/default'){
                $('body').removeAttr('class')
                this.default =true; 
                $('body').addClass('bg-theme bg-theme1')
            } else {
                this.default =false;
                if(location.path() == '/dashboard/eCommerce'){
                    $('body').removeAttr('class')
                    $('body').addClass('bg-theme bg-theme2')
                    } else {
                        if(location.path() == '/dashboard/sales'){
                            $('body').removeAttr('class')
                            $('body').addClass('bg-theme bg-theme6')
                        } else{
                            if(location.path() == '/dashboard/analytics'){
                                $('body').removeAttr('class')
                                $('body').addClass('bg-theme bg-theme9')
                            } else {
                                if(location.path() == '/dashboard/alternate'){
                                    $('body').removeAttr('class')
                                    $('body').addClass('bg-theme bg-theme3')

                                    }   else {
                                        if(location.path() == '/dashboard/digital-marketing'){
                                            $('body').removeAttr('class')
                                            $('body').addClass('bg-theme bg-theme4')

                                            } else {
                                                    if(location.path() == '/dashboard/human-resources'){
                                                        $('body').removeAttr('class')
                                                        $('body').addClass('bg-theme bg-theme7')

                                                    }

                                                }

                                    }
                        }
                    }
                }
            }
          });

     }
        
    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    }
    
    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    ngOnInit() 
    {
        this.url = this.route['_routerState'].snapshot.url
        let Cadena = this.url.split('/')
        this.usuar = Cadena[1]
        if(this.cook.check('Login'+this.usuar) == true)
        {
            let Cad = this.cook.get('Login'+this.usuar)
            let spl = Cad.split('&')
            let spl2 = spl[2].split('=')
            this.emp = spl2[1]
        }
        console.log(this.usuar)
        this.FechaHoy = formatDate(new Date(), "dd/MM/yyyy", "en-US").toString()
        this.Mod.GetFecha().subscribe((r) => {console.log(r); let imprimir :any = r; this.FechaCorte = formatDate(imprimir.FechaCorte, "dd/MM/yyyy", "en-US").toString()}, (e) => {console.log(e)})
        /* Search Bar */

        $(".mobile-search-icon").on("click", function() {
			
            $(".search-bar").addClass("full-search-bar")
           
          }), 
      
        $(".search-close").on("click", function() {
           $(".search-bar").removeClass("full-search-bar")
        }), 
 
        // header color change on scrol
        $(document).ready(function () {
			$(window).on("scroll", function () {
				if ($(this).scrollTop() > 60) {
					$('.topbar').addClass('bg-dark');
				} else {
					$('.topbar').removeClass('bg-dark');
				}
			});
			
		});

    }
}
