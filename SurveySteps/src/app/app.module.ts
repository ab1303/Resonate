import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app.component";
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'
import { RatingModule } from 'ngx-bootstrap';
import { PageNotFoundComponent } from './page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { StartComponent } from './start/start.component';
import { FinishComponent } from './finish/finish.component';
import { ImprovementComponent } from './improvement/improvement.component';
import { FeedbackComponent } from './Feedback/feedback.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,        
        RatingModule.forRoot(),
        AppRoutingModule
    ],
    declarations : [
        AppComponent,
        StartComponent,
        ImprovementComponent,
        FeedbackComponent,
        FinishComponent,
        PageNotFoundComponent
    ], 
    providers:[        
    ], 
    bootstrap : [AppComponent],    
})
export class AppModule {

}