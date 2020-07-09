import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule, MatCheckboxModule} from '@angular/material';
import { Routes, RouterModule }  from '@angular/router';
import { FindhopperComponent } from './findhopper/findhopper.component';
import { HomeComponent } from './home/home.component';
import { MumbaiAdLandingComponent } from './mumbai-ad-landing/mumbai-ad-landing.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'mumbai-ad-landing', component: MumbaiAdLandingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'findhopper', component: FindhopperComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FindhopperComponent,
    HomeComponent,
    MumbaiAdLandingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
     RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSelectModule,MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
