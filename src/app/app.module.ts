import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';

import { MaterialComponentsModule } from './material-components.module';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from "@angular/flex-layout";
import { ClipEditorComponent } from './clip-editor/clip-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    ClipEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    HttpClientModule,
     ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {



}
