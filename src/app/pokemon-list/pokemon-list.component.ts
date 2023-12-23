import { Component, OnInit } from '@angular/core';

import { PokedexService } from '../service/pokedex.service';

@Component({
	selector: 'app-pokemon-list',
  	templateUrl: './pokemon-list.component.html',
  	styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
	public pokemons: any = []

	constructor(private pokedexService: PokedexService) {}

	buscarPokemons(offset=0, limit=12) {
		this.pokedexService.carregarPokemons(offset, limit)
			.subscribe((response) => {
				let pokemonsResponseApi = response.results;

				this.pokemons = [];

				pokemonsResponseApi.forEach((pokemonApi: any, i: number) => {
					let numeroImagemPokemonFormatado = i.toString().padStart(3, '0'); // Sempre tem que ter tres caracteres, caso não tenha, preencher com zero na esquerda
					
					let pokemon = {
						nome: pokemonApi.name.toUpperCase() + ' - ' + i,
						urlImagem: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${numeroImagemPokemonFormatado}.png`
					}

					this.pokemons.push(pokemon);					
				});
				
				console.log(this.pokemons);
			})
	}

	ngOnInit(): void {
		this.buscarPokemons();
	}
}