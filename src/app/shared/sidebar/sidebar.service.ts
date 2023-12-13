import { Injectable } from '@angular/core';
import { tr } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }
}
