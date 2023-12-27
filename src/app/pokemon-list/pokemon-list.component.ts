import { Component, Input, OnInit, Output } from '@angular/core';

import { PokedexService } from '../service/pokedex.service';

import { PageEvent } from '@angular/material';
import { tap } from 'rxjs';

@Component({
	selector: 'app-pokemon-list',
  	templateUrl: './pokemon-list.component.html',
  	styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
	@Input("length")
	total: number;
	
	public pokemons: any = [];
	private contador = 1;

	constructor(private pokedexService: PokedexService) {
		this.total = 0;
	}

	@Output("page")
	paginacao(event: PageEvent) {
		let totalPokemons = event.length;
		
		let limit = event.pageSize; // Padrão que coloquei foi 12

		let offset = 0;

		let numeroPaginaAnterior = event.previousPageIndex;

		if(numeroPaginaAnterior != undefined) {
			let numeroDaPaginaAtual = event.pageIndex;

			let numeroUltimaPagina = Math.trunc(totalPokemons / 12);

			if(numeroDaPaginaAtual > numeroPaginaAnterior) {
				offset = numeroPaginaAnterior * limit + 12;
			} else {				
				offset = numeroPaginaAnterior * limit - 12;

				if(numeroDaPaginaAtual == 0) {
					offset = 0;
					this.contador = 1; // Caso seja a primeira pagina
				} else {
					this.contador = this.contador - 24;
				}
			}

			if(numeroDaPaginaAtual == numeroUltimaPagina) {
				offset = numeroPaginaAnterior * limit + 12;

				console.log(numeroPaginaAnterior, offset, limit);
				
				this.contador = totalPokemons - 12;

				console.log('ultima pagina');
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
						numero: numeroImagemPokemonFormatado,
						nome: pokemonApi.name.toUpperCase(),
						url: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${numeroImagemPokemonFormatado}.png`,
						classe: ''
					}

					this.pokedexService.buscarHabilidadesPokemon(pokemonApi.url)
						.pipe(tap((response) => {
							let habilidades = response.types;
				
							if(habilidades.length > 0) {
								let nomeHabilidade = habilidades[0].type.name;
								pokemon.classe = nomeHabilidade;
							}
						}))
						.subscribe()
					
					this.pokemons.push(pokemon);
					
					contador++;
				});

				this.contador = contador;
			})
	}

	ngOnInit(): void {
		this.buscarPokemons(0, 12, this.contador);
	}
}