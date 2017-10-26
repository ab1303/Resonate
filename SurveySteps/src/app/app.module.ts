import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app.component";
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'
import { RatingModule } from 'ngx-bootstrap';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RatingModule.forRoot()
    ],
    declarations : [
        AppComponent
    ], 
    providers:[        
    ], 
    bootstrap : [AppComponent],    
})
export class AppModule {

}