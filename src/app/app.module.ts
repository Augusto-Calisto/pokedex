import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { PokedexService } from './service/pokedex.service';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

@NgModule({
	declarations: [
    	AppComponent,
		PokemonListComponent,
		PokemonCardComponent
  	],

  	imports: [
    	BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
    	AppRoutingModule,
		MatPaginatorModule,
		MatInputModule,
		MatButtonModule,
		MatTooltipModule,
		MatSelectModule
  	],

	providers: [PokedexService],

  	bootstrap: [AppComponent]
})
export class AppModule {}