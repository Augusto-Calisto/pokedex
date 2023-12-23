import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [
    	AppComponent
  	],

  	imports: [
    	BrowserModule,
		BrowserAnimationsModule,
    	AppRoutingModule,
		MatPaginatorModule,
		MatInputModule,
		MatButtonModule
  	],

  	bootstrap: [AppComponent]
})
export class AppModule {}