import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PokedexService {
	private baseURL = 'https://pokeapi.co/api/v2';

  	constructor(private httpClient: HttpClient) { }

	public carregarPokemons(offset: number, limit: number): Observable<any> {		
		return this.httpClient.get<any>(`${this.baseURL}/pokemon?offset=${offset}&limit=${limit}`);
  	}

	public buscarPokemonPeloNome(nome: string): Observable<any> {
		return this.httpClient.get<any>(`${this.baseURL}/pokemon/${nome}`);
	}

	public buscarHabilidadesPokemon(urlHabilidades: string): Observable<any> {		
		return this.httpClient.get<any>(urlHabilidades);
  	}
}