import { BrowserModule } from '@angular/platform-browser'; 
import { NgModule }      from '@angular/core'; 
import { FormsModule } from '@angular/forms'; 
import { AppComponent }  from './app.component'; 
import { HttpClientModule } from '@angular/common/http'; 
import { PageDefault }    from './app.pagedefault';
import { PageAComponent } from './app.page-a';
import { PageBComponent } from './app.page-b';
import { routing }        from './app.routing';
import {NgxPaginationModule} from 'ngx-pagination';
import {DatePipe} from '@angular/common';


@NgModule({ 

  declarations: [ 
    AppComponent, PageDefault,
    PageAComponent, PageBComponent,
  ], 
  imports: [ 
    BrowserModule, FormsModule, HttpClientModule, routing, NgxPaginationModule
  ], 
  providers: [DatePipe], 
  bootstrap: [AppComponent, PageDefault,
    PageAComponent, PageBComponent
] 
}) 

export class AppModule { } 