import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any[] = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Dashboard',
          url: '/dashboard'
        },
        {
          title: 'Progress',
          url: '/progress'
        },
        {
          title: 'Gráficas',
          url: '/graph1'
        },
        {
          title: 'Promesas',
          url: '/promises'
        },
        {
          title: 'Rxjs',
          url: '/rxjs'
        }
      ]
    }
  ];

  constructor() { }
}