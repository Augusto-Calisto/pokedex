import { Component, Input, OnInit, Output } from '@angular/core';

import { PokedexService } from '../service/pokedex.service';

import { PageEvent } from '@angular/material';

@Component({
	selector: 'app-pokemon-list',
  	templateUrl: './pokemon-list.component.html',
  	styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
	@Input("length")
	total: number;
	
	public pokemons: any = []
	private contador = 1;

	constructor(private pokedexService: PokedexService) {
		this.total = 0;
	}

	@Output("page")
	paginacao(event: PageEvent) {
		let limit = event.pageSize; // Padrão que coloquei foi 12

		let offset = 0;

		if(event.previousPageIndex != undefined) {
			let numeroDaPagina = event.pageIndex;

			let indicePagina = event.previousPageIndex;

			if(numeroDaPagina > indicePagina) {
				offset = indicePagina * limit + 12;
			} else {				
				offset = indicePagina * limit - 12;

				if(numeroDaPagina == 0) {
					this.contador = 1; // Caso seja a primeira pagina
				} else {
					this.contador = this.contador - 24;
				}
			}
		}

		this.buscarPokemons(offset, limit, this.contador);

		window.scroll({ 
			top: 0, 
			left: 0, 
			behavior: 'smooth' 
		});
	}

	buscarPokemons(offset: number, limit: number, contador: number) {
		this.pokedexService.carregarPokemons(offset, limit)
			.subscribe((response) => {
				this.total = response.count;

				let pokemonsResponseApi = response.results;

				this.pokemons = [];

				pokemonsResponseApi.forEach((pokemonApi: any) => {
					let numeroImagemPokemonFormatado = contador.toString().padStart(3, '0'); // Sempre tem que ter tres caracteres, caso não tenha, preencher com zero na esquerda
					
					let pokemon = {
						nome: pokemonApi.name.toUpperCase() + ' - ' + contador,
						url: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${numeroImagemPokemonFormatado}.png`
					}

					this.pokemons.push(pokemon);

					contador++;

					this.contador = contador;
				});
			})
	}

	ngOnInit(): void {
		this.buscarPokemons(0, 12, this.contador);
	}
}