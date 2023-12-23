import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-pokemon-card',
  	templateUrl: './pokemon-card.component.html',
  	styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
	@Input("nome")
	nome: string;

	@Input("url")
	url: string;

	constructor() {
		this.nome = "",
		this.url = ""
	}
}