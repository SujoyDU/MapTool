import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from "angular2-google-maps/core"

import { AppComponent } from './app.component';
import { DirectionsServiceDirective } from './directions-service.directive';
import { LineChartComponent } from './line-chart/line-chart.component';
import { CompositeChartComponent } from './composite-chart/composite-chart.component';
import { GroupedChartComponent } from './grouped-chart/grouped-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    DirectionsServiceDirective,
    LineChartComponent,
    CompositeChartComponent,
    GroupedChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAqtpQpp6lXTf_QRxHxUlOuHziI-OCvXlk",
      libraries: ["places"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
