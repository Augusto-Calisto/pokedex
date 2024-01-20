import { Component, Input, OnInit, Output } from '@angular/core';

import { PokedexService } from '../service/pokedex.service';

import { PageEvent } from '@angular/material';

import { catchError, tap } from 'rxjs';

@Component({
	selector: 'app-pokemon-list',
  	templateUrl: './pokemon-list.component.html',
  	styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
	@Input("length")
	total: number;

	private quantidadePokemonsPorPagina: number;
	private contador: number;

	public pokemons: any;
	public filtro: string;
	public habilidadeSelecionada: string;

	constructor(private pokedexService: PokedexService) {
		this.pokemons = [];
		this.total = 0;
		this.filtro = '';
		this.contador = 1;
		this.quantidadePokemonsPorPagina = 12;
		this.habilidadeSelecionada = ''
	}

	@Output("page")
	paginacao(event: PageEvent) {		
		let limit = event.pageSize; // Padrão que coloquei foi 12

		let offset = 0;

		let numeroPaginaAnterior = event.previousPageIndex;

		if(numeroPaginaAnterior != undefined) {
			let numeroDaPaginaAtual = event.pageIndex;

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

			let numeroUltimaPagina = Math.trunc(this.total / 12);

			if(numeroDaPaginaAtual == numeroUltimaPagina) {
				offset = numeroUltimaPagina * limit + 12;
				
				this.contador = this.total - 11;
			}
			
			if(limit > this.quantidadePokemonsPorPagina) {
				if(numeroDaPaginaAtual >= numeroPaginaAnterior) {
					offset = numeroDaPaginaAtual * limit;
				} else {
					offset = numeroPaginaAnterior * limit / 2;

					this.contador = offset + 1;

					if(numeroDaPaginaAtual == 0) {
						offset = 0;
						this.contador = 1;
					}
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
				this.total = 1010; // Add na mão, pois, o site das imagens dos pokemons possui até o pokemon nº 1010
				
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

	pesquisarPokemon(e: Event) {
		e.preventDefault();

		if(this.filtro == "" && this.contador == 13) {
			alert("Digite o nome do Pokemon");
		} else {
			this.filtro = this.filtro.toLowerCase();
			
			this.pokedexService.buscarPokemonPeloNome(this.filtro)
				.pipe(catchError(exception => {
					if(exception.status === 404) {					
						alert('Pokemon não encontrado');
					}

					return '';
				}))
				.subscribe((response: any) => {
					let estaVazio = this.filtro == '';

					// console.log('results' in response);
					
					// console.log(Object.getOwnPropertyDescriptor(response, 'results'));

					if(estaVazio) {
						this.buscarPokemons(0, 12, this.contador);
					} else {
						this.renderizarCardPokemon(response);
					}
				})
			}
	}

	habilidadesSelecionadas() {
		if(this.habilidadeSelecionada != "") {
			this.pokedexService.buscarPokemonsPelaHabilidade(this.habilidadeSelecionada)
				.subscribe((response: any) => {
					let pokemonsApi = response.pokemon;

					this.pokemons = [];

					pokemonsApi.forEach((pokemonApi: any) => {
						let pokemonFiltroApi = pokemonApi.pokemon;

						let urlPokemon = pokemonFiltroApi.url;
											
						let numeroDoPokemon = urlPokemon.toString().match(/\/([^\/]+)\/?$/)[1];
						
						let numeroImagemPokemonFormatado = numeroDoPokemon.toString().padStart(3, '0');

						let pokemon = {
							numero: numeroImagemPokemonFormatado,
							nome: pokemonFiltroApi.name.toUpperCase(),
							url: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${numeroImagemPokemonFormatado}.png`,
							classe: this.habilidadeSelecionada
						}

						if(numeroDoPokemon <= 1009) {
							this.pokemons.push(pokemon);
						}
					});

					this.total = this.pokemons.length;
				})
		} else {
			this.buscarPokemons(0, 12, 1);
		}
	}

	renderizarCardPokemon(response: any) {
		this.pokemons = [];

		let pokemon = {
			numero: '',
			nome: '',
			url: '',
			classe: ''
		}	

		let pokemonApi = response;
		let numero = response.id;

		let numeroImagemPokemonFormatado = numero.toString().padStart(3, '0'); // Sempre tem que ter tres caracteres, caso não tenha, preencher com zero na esquerda

		pokemon.numero = numeroImagemPokemonFormatado;
		pokemon.nome = pokemonApi.name.toUpperCase();
		pokemon.url = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${numeroImagemPokemonFormatado}.png`;

		let habilidades = pokemonApi.types;

		if(habilidades.length > 0) {
			let nomeHabilidade = habilidades[0].type.name;
			pokemon.classe = nomeHabilidade;
		}
		
		this.pokemons.push(pokemon);

		this.contador = 1;

		this.total = 1;
	}

	ngOnInit(): void {
		this.buscarPokemons(0, 12, this.contador);
	}
}