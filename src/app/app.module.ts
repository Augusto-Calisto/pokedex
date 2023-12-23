import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
    	AppRoutingModule,
		MatPaginatorModule,
		MatInputModule,
		MatButtonModule
  	],

	providers: [PokedexService],

  	bootstrap: [AppComponent]
})
export class AppModule {}