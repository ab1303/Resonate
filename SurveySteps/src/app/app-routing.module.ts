import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found.component";
import { StartComponent } from "./start/start.component";
import { FinishComponent } from "./finish/finish.component";
import { ImprovementComponent } from "./improvement/improvement.component";
import { FeedbackComponent } from "./Feedback/feedback.component";

@NgModule({
    imports:[
        RouterModule.forRoot([
            { path: 'start', component: StartComponent },
            { path: 'improve', component: ImprovementComponent },
            { path: 'feedback', component: FeedbackComponent },
            { path: 'finish', component: FinishComponent },
            { path: '', redirectTo: 'start', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ])      
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}