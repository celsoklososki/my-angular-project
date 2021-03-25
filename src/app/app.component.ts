import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template:   
      ` <h1 style="text-align: center;">MovieFlix</h1>
        <nav style="text-align: center;">
        <a style="text-decoration: none; color: black;" routerLink="/page-a" routerLinkActive="active">HOME</a> |
        <a style="text-decoration: none; color: black;" routerLink="/page-b" routerLinkActive="active">ABOUT</a>
        </nav>
        <router-outlet></router-outlet>`,
    styles: ['h1, a{font-family: "Lucida Console", "Courier New", monospace;}']
})
export class AppComponent { }