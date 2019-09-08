import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { VideocallComponent } from './videocall/videocall.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
import { MatCardModule, MatInputModule, MatIconModule, MatButtonModule } from '@angular/material';
 

@NgModule({
  declarations: [
    AppComponent,
    VideocallComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatVideoModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
