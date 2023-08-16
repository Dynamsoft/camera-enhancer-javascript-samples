import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import './dce';
import { CameraEnhancerComponent } from './camera-enhancer/camera-enhancer.component';

@NgModule({
  declarations: [
    AppComponent,
    CameraEnhancerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
