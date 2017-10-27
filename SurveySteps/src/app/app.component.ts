
import { Component, Inject } from "@angular/core";

import '../styles.css';

@Component({
    selector:'survey-app',
    templateUrl:'./app.component.html',    
    styleUrls:[
        './app.component.css'
    ]    
    
})
export class AppComponent {    
    public rate: number = 0;

    constructor(){

    }
    

}