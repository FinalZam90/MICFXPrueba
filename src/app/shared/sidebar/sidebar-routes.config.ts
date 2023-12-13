import { RouteInfo } from './sidebar.metadata';
import { Component, OnInit } from '@angular/core';
import {GruprService  } from "../../SL/FAD_GRUPR";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


export class j 
{
    imprimir:any;
    constructor(private route: ActivatedRoute)
    {}
    public XD():any
    {
        this.imprimir = this.route.snapshot.paramMap.get('CVE')
        console.log(this.imprimir)
        return this.imprimir
    }
    
    
}

//Sidebar menu Routes and data

/*
 export const ROUTES: RouteInfo[] = 
 
 [
    
    {
        
        path: '', title: 'Proceso con subprocesos', icon: 'bi bi-house-door', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/dashboard/default', title: 'Default', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/dashboard/eCommerce', title: 'eCommerce', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

        ]
    },    
    { path: '/timeline', title: 'WorkFlow', icon: 'bi bi-collection-play', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},  
    { path: '/departamentos', title: 'Departamentos', icon: 'bi bi-award', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},

];*/